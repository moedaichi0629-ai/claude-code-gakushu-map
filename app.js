// Claude Code 学習マップ - 表示ロジック
// カードの描画、検索、カテゴリ絞り込み、アコーディオン開閉、ロードマップのジャンプを担当します。

(function () {
  const cardsContainer = document.getElementById("cardsContainer");
  const filterButtonsEl = document.getElementById("filterButtons");
  const searchInput = document.getElementById("searchInput");
  const resultCountEl = document.getElementById("resultCount");
  const noResultEl = document.getElementById("noResult");
  const roadmapListEl = document.getElementById("roadmapList");

  let activeCategories = new Set(); // 空 = 全カテゴリ表示
  let searchTerm = "";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function starHtml(priority) {
    let html = "";
    for (let i = 0; i < 3; i++) {
      html += i < priority ? "★" : '<span class="star-off">☆</span>';
    }
    return html;
  }

  function buildSearchHaystack(feature) {
    const parts = [
      feature.title,
      feature.summary,
      feature.whenToUse,
      feature.useCase,
      ...feature.tags,
      ...(feature.subItems || []).map((s) => s.name + " " + s.desc),
      ...(feature.commands || []).map((c) => c.label + " " + c.code),
    ];
    return parts.join(" ").toLowerCase();
  }

  function matchesFilters(feature) {
    const matchesSearch =
      searchTerm === "" || buildSearchHaystack(feature).includes(searchTerm);
    const matchesCategory =
      activeCategories.size === 0 ||
      feature.tags.some((t) => activeCategories.has(t));
    return matchesSearch && matchesCategory;
  }

  function renderFilterButtons() {
    filterButtonsEl.innerHTML = "";
    ALL_CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        if (activeCategories.has(cat)) {
          activeCategories.delete(cat);
        } else {
          activeCategories.add(cat);
        }
        renderFilterButtons();
        renderCards();
      });
      if (activeCategories.has(cat)) btn.classList.add("active");
      filterButtonsEl.appendChild(btn);
    });

    const resetBtn = document.createElement("button");
    resetBtn.className = "filter-btn";
    resetBtn.textContent = "すべて表示";
    resetBtn.addEventListener("click", () => {
      activeCategories.clear();
      renderFilterButtons();
      renderCards();
    });
    if (activeCategories.size === 0) resetBtn.classList.add("active");
    filterButtonsEl.appendChild(resetBtn);
  }

  function cardTemplate(feature) {
    const tagsHtml = feature.tags
      .map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`)
      .join("");

    const commandsHtml = (feature.commands || [])
      .map(
        (c) => `
        <div>
          <div class="code-item-label">${escapeHtml(c.label)}</div>
          <pre class="code-block">${escapeHtml(c.code)}</pre>
        </div>`
      )
      .join("");

    const subItemsHtml = feature.subItems
      ? `
        <h4><span class="badge-num">📋</span>内訳・詳細一覧</h4>
        <table class="subitem-table">
          <thead><tr><th>名前</th><th>説明</th></tr></thead>
          <tbody>
            ${feature.subItems
              .map(
                (s) =>
                  `<tr><td>${escapeHtml(s.name)}</td><td>${escapeHtml(
                    s.desc
                  )}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>`
      : "";

    return `
      <article class="card" id="card-${feature.id}" data-id="${feature.id}">
        <button class="card-header" aria-expanded="false">
          <span class="card-num">${feature.num}</span>
          <span class="card-title-wrap">
            <span class="card-title">${escapeHtml(feature.title)}</span>
            <span class="card-tags">${tagsHtml}</span>
          </span>
          <span class="card-priority" title="学習優先度">${starHtml(feature.priority)}</span>
          <span class="chevron">▾</span>
        </button>
        <div class="card-body-outer">
          <div class="card-body-inner">
            <div class="card-body">
              <h4>① 機能の概要</h4>
              <p>${escapeHtml(feature.summary)}</p>

              <h4>② どんな時に使うか</h4>
              <p>${escapeHtml(feature.whenToUse)}</p>

              <h4>③ 具体的な使用場面</h4>
              <p>${escapeHtml(feature.useCase)}</p>

              <h4>④ コマンド例</h4>
              <div class="code-list">${commandsHtml}</div>

              ${subItemsHtml}

              <h4>⑤ 初心者向けの一言</h4>
              <div class="tip-box">💡 ${escapeHtml(feature.tip)}</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCards() {
    const filtered = FEATURES.filter(matchesFilters);
    resultCountEl.textContent = `${filtered.length} / ${FEATURES.length} 件の機能を表示中`;

    if (filtered.length === 0) {
      cardsContainer.innerHTML = "";
      noResultEl.hidden = false;
      return;
    }
    noResultEl.hidden = true;

    cardsContainer.innerHTML = filtered.map(cardTemplate).join("");

    cardsContainer.querySelectorAll(".card-header").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const isOpen = card.classList.contains("open");
        // 他のカードは開いたままでOK（複数開けるアコーディオン）
        card.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  function openCardById(id) {
    // 絞り込みで隠れていないように、検索とカテゴリを一旦リセット
    searchTerm = "";
    searchInput.value = "";
    activeCategories.clear();
    renderFilterButtons();
    renderCards();

    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    card.classList.add("open");
    card.querySelector(".card-header").setAttribute("aria-expanded", "true");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderRoadmap() {
    roadmapListEl.innerHTML = ROADMAP.map(
      (r) => `
      <li class="roadmap-item" data-card-id="${r.cardId}">
        <span class="roadmap-step">${r.step}</span>
        <span class="roadmap-label">${escapeHtml(r.label)}</span>
      </li>`
    ).join("");

    roadmapListEl.querySelectorAll(".roadmap-item").forEach((item) => {
      item.addEventListener("click", () => {
        openCardById(item.dataset.cardId);
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderCards();
  });

  renderFilterButtons();
  renderCards();
  renderRoadmap();
})();
