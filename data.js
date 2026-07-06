// Claude Code 学習マップ用データ
// 1枚のカード = 1つの大きな機能グループ
// tags: 絞り込みカテゴリ（複数可）
// priority: 学習優先度 1〜3（★の数）
const FEATURES = [
  {
    id: "launch",
    num: "01",
    title: "起動コマンド",
    tags: ["初心者におすすめ", "開発効率化"],
    priority: 3,
    summary:
      "ターミナルで Claude Code を起動するための基本コマンド群です。普通に会話するモードだけでなく、1回だけ実行するモード・複数フォルダを見せるモード・別の作業ブランチで動かすモードなどがあります。",
    whenToUse:
      "Claude Codeを使い始める最初の一歩。何か作業を頼みたいときは必ずこのコマンドのどれかを使います。",
    useCase:
      "毎日の開発では `claude` で対話しながら作業し、CIやスクリプトの中では `claude -p` で1回だけ質問を投げる、複数の機能を同時に進めたい時は `claude -w` で作業スペースを分ける、といった使い分けをします。",
    commands: [
      { label: "対話モードで起動", code: "claude" },
      { label: "1回だけ質問して終了（非対話）", code: 'claude -p "このバグの原因は？"' },
      { label: "名前付きの作業スペース（Worktree）で起動", code: "claude -w feature-auth" },
      { label: "別フォルダも読み込ませて起動", code: "claude --add-dir ../shared-lib" },
      { label: "カスタムエージェント定義で起動", code: "claude --agent ./agent.md" },
      { label: "既存のPull Requestを読み込んで起動", code: "claude --from-pr 123" },
    ],
    subItems: [
      { name: "claude", desc: "通常の対話モードで起動する、一番基本の使い方" },
      { name: 'claude -p "prompt"', desc: "1回だけ指示を実行して終了。スクリプトや自動化向き" },
      { name: "claude -w <name>", desc: "Worktree（作業スペース）を指定して起動。複数タスクの並行作業に便利" },
      { name: "claude --add-dir <path>", desc: "現在のフォルダ以外も参照させたい時に追加する" },
      { name: "claude --agent ./agent.md", desc: "決まった役割・振る舞いを持つエージェント定義を読み込んで起動" },
      { name: "claude --from-pr 123", desc: "GitHubの既存Pull Requestの内容を読み込んで続きの作業をする" },
    ],
    tip: "まずは何も付けずに `claude` と打つだけでOK！慣れてきたら他のオプションを覚えましょう。",
  },
  {
    id: "slash",
    num: "02",
    title: "組み込みスラッシュコマンド",
    tags: ["初心者におすすめ", "開発効率化"],
    priority: 3,
    summary:
      "Claude Codeの対話中に `/` から始まる特別なコマンドを打つと、設定変更・履歴整理・状態確認などができます。会話の中で使う『裏コマンド』のようなものです。",
    whenToUse:
      "会話が長くなって重くなった時、モデルを切り替えたい時、権限やコストを確認したい時など、Claude自体の動作をコントロールしたい場面で使います。",
    useCase:
      "作業の区切りで `/compact` して会話を軽くする、新しいプロジェクトに入ったら `/init` でCLAUDE.mdを作る、困った時は `/doctor` で状態を診断する、といった使い方をします。",
    commands: [
      { label: "使えるコマンド一覧を見る", code: "/help" },
      { label: "プロジェクト用CLAUDE.mdを生成", code: "/init" },
      { label: "会話履歴を要約して軽くする", code: "/compact" },
      { label: "会話を完全にリセット", code: "/clear" },
      { label: "現在のコンテキスト使用量を見る", code: "/context" },
      { label: "APIコストを確認", code: "/cost" },
    ],
    subItems: [
      { name: "/help", desc: "使えるコマンドやショートカットの一覧を表示" },
      { name: "/init", desc: "プロジェクトを解析してCLAUDE.mdの雛形を自動生成" },
      { name: "/compact", desc: "長くなった会話履歴を要約してコンテキストを節約" },
      { name: "/clear", desc: "会話履歴を完全に消してまっさらな状態にする" },
      { name: "/context", desc: "今どれくらいコンテキスト（記憶容量）を使っているか確認" },
      { name: "/cost", desc: "このセッションでかかったAPI利用料金の目安を表示" },
      { name: "/model", desc: "使用するAIモデル（Sonnet/Opus/Haikuなど）を切り替える" },
      { name: "/fast", desc: "高速レスポンスのFastモードをON/OFF" },
      { name: "/doctor", desc: "設定や環境に問題がないかを自己診断" },
      { name: "/hooks", desc: "Hooks（自動実行スクリプト）の設定を確認・編集" },
      { name: "/mcp", desc: "接続しているMCPサーバーの管理" },
      { name: "/agents", desc: "サブエージェントの一覧・作成・編集" },
      { name: "/permissions", desc: "ツール実行の許可・拒否ルールを管理" },
      { name: "/resume", desc: "過去のセッションを再開する" },
      { name: "/fork", desc: "今の会話を分岐させて別の会話として続ける" },
      { name: "/sessions", desc: "セッション一覧を表示する" },
      { name: "/chrome", desc: "ブラウザ自動化機能を有効にする" },
      { name: "/copy", desc: "直前の回答やコードをクリップボードにコピー" },
    ],
    tip: "困ったらまず `/help`。会話が重くなったら `/compact` か `/clear` を試しましょう。",
  },
  {
    id: "bundled-skills",
    num: "03",
    title: "バンドルスキル",
    tags: ["開発効率化"],
    priority: 2,
    summary:
      "Claude Codeに最初から用意されている『よく使う定型作業』のショートカットコマンドです。スラッシュコマンドの一種で、コードの簡略化・一括処理・デバッグ・コミット作成といった作業をワンコマンドで頼めます。",
    whenToUse:
      "『このコードを整理したい』『同じ修正を複数ファイルに適用したい』『バグを調査したい』『コミットを作りたい』など、決まった型の作業を頼みたい時に使います。",
    useCase:
      "レビュー前にコードを整理したい時は `/simplify`、複数ファイルに同じ変更をしたい時は `/batch`、原因不明のエラーを追いたい時は `/debug`、変更をまとめてコミットしたい時は `/commit` を使います。",
    commands: [
      { label: "変更部分を整理・簡略化", code: "/simplify" },
      { label: "複数ファイルに一括で指示を適用", code: '/batch "全てのconsole.logを削除して"' },
      { label: "エラーの原因を調査", code: "/debug ログイン後に画面が真っ白になる" },
      { label: "変更内容をコミット", code: "/commit" },
    ],
    subItems: [
      { name: "/simplify", desc: "直近の変更コードを、無駄を削って読みやすく整理する" },
      { name: "/batch <instruction>", desc: "指示した内容を複数ファイル・複数箇所にまとめて適用する" },
      { name: "/debug [description]", desc: "現象を伝えると原因調査からログ確認まで進めてくれる" },
      { name: "/commit", desc: "変更差分を見てわかりやすいコミットメッセージを作り、コミットする" },
    ],
    tip: "作業の最後に `/commit` を打つ習慣をつけると、コミットメッセージ作りに悩まなくて済みます。",
  },
  {
    id: "claudemd",
    num: "04",
    title: "CLAUDE.md",
    tags: ["初心者におすすめ"],
    priority: 3,
    summary:
      "CLAUDE.mdは『Claudeに読ませておく説明書』です。プロジェクトのルールや好みの書き方をあらかじめ書いておくと、毎回同じ説明をしなくてもClaudeが覚えてくれます。",
    whenToUse:
      "プロジェクトごとのコーディング規約、よく使うコマンド、注意点などを毎回説明するのが面倒な時に、最初に一度だけ書いておきます。",
    useCase:
      "『このプロジェクトはTypeScriptで書く』『テストはnpm testで実行する』『DBのマイグレーションは慎重に』など、繰り返し伝えたいルールをCLAUDE.mdに書いておくことで、以後の会話で自動的に読み込まれます。",
    commands: [
      { label: "プロジェクト直下に自動生成", code: "/init" },
      { label: "個人設定（全プロジェクト共通）", code: "~/.claude/CLAUDE.md" },
      { label: "プロジェクト設定（チーム共有・Git管理）", code: "./CLAUDE.md" },
      { label: "ローカル設定（自分だけ・Git管理外）", code: "./CLAUDE.local.md" },
    ],
    subItems: [
      { name: "個人設定", desc: "ホームディレクトリに置き、すべてのプロジェクトで共通して読み込まれる自分用ルール" },
      { name: "プロジェクト設定", desc: "リポジトリ直下に置き、チーム全員に共有されるプロジェクトルール（Gitにコミットする）" },
      { name: "ローカル設定", desc: "自分のPCだけに置く個人的なメモ。Gitには含めない（.gitignore対象）" },
      { name: "親・子ディレクトリでの使い分け", desc: "モノレポなどではサブフォルダごとにCLAUDE.mdを置くと、そのフォルダ専用のルールを追加で読み込める" },
      { name: "推奨構成", desc: "プロジェクト全体のルールはルート直下、個別モジュールの注意点はサブフォルダに書くと整理しやすい" },
      { name: "ベストプラクティス", desc: "長文の説明書ではなく、箇条書きで簡潔に。頻繁に変わる情報より普遍的なルールを書く" },
    ],
    tip: "新しいプロジェクトに入ったら、まず `/init` を打ってCLAUDE.mdを作る癖をつけましょう。",
  },
  {
    id: "settings",
    num: "05",
    title: "Settings（設定ファイル）",
    tags: ["開発効率化", "高度な機能"],
    priority: 2,
    summary:
      "Claude Codeの挙動（権限・環境変数・Sandboxなど）を細かくコントロールするための設定ファイルです。JSON形式で書きます。",
    whenToUse:
      "特定のコマンドを毎回確認なしで実行させたい、逆に危険な操作は絶対禁止にしたい、チームで設定を揃えたいといった時に使います。",
    useCase:
      "`npm test` は毎回許可を聞かれると面倒なので settings.json で自動許可にする、自分のPCだけの秘密の設定は settings.local.json に書く、といった使い分けをします。",
    commands: [
      { label: "プロジェクト共有設定（Git管理する）", code: ".claude/settings.json" },
      { label: "個人用のローカル設定（Git管理しない）", code: ".claude/settings.local.json" },
      { label: "コマンドを常に許可する権限設定の例", code: '{ "permissions": { "allow": ["Bash(npm test:*)"] } }' },
      { label: "Sandbox Modeを有効化", code: '{ "sandbox": { "enabled": true } }' },
    ],
    subItems: [
      { name: "settings.json", desc: "チームで共有するプロジェクト設定。Gitにコミットして全員で揃える" },
      { name: "settings.local.json", desc: "自分だけのローカル設定。APIキーなど秘密情報や個人の好みを書く" },
      { name: "権限設定", desc: "どのツール・コマンドを自動実行OKにするか／絶対NGにするかを細かく指定できる" },
      { name: "Sandbox Mode", desc: "ファイルシステムやネットワークへのアクセスを制限した安全な実行環境で動かす機能" },
    ],
    tip: "秘密にしたい設定は settings.local.json、チームで共有したい設定は settings.json、と覚えると迷いません。",
  },
  {
    id: "skills",
    num: "06",
    title: "Skills（スキル）",
    tags: ["開発効率化", "自動化"],
    priority: 2,
    summary:
      "Skillsは『Claudeに新しい特技を覚えさせる』仕組みです。よく使う作業手順をSKILL.mdというファイルにまとめておくと、必要な時だけ自動で読み込んで実行してくれます。",
    whenToUse:
      "決まった手順の作業（例：レポート作成、特定フォーマットへの変換など）を何度も頼む場合に、毎回説明する代わりにSkillとして登録しておきます。",
    useCase:
      "自分専用の作業手順は Personal Skill として `~/.claude/skills/` に、プロジェクト全体で使う手順は Project Skill として `.claude/skills/` に置きます。会話の内容に応じて必要なSkillだけが自動で読み込まれます（動的コンテキスト注入）。",
    commands: [
      { label: "個人用スキルの置き場所", code: "~/.claude/skills/<skill-name>/SKILL.md" },
      { label: "プロジェクト用スキルの置き場所", code: "./.claude/skills/<skill-name>/SKILL.md" },
      {
        label: "SKILL.mdのフロントマター例",
        code: "---\nname: pdf\ndescription: PDFファイルの作成・編集を行うときに使う\n---",
      },
    ],
    subItems: [
      { name: "Personal Skill", desc: "自分のPCの全プロジェクトで使える個人用スキル" },
      { name: "Project Skill", desc: "特定のプロジェクトに紐づき、チームで共有できるスキル" },
      { name: "SKILL.md", desc: "スキルの内容（手順・知識）を書くMarkdownファイル" },
      { name: "フロントマター", desc: "ファイル冒頭の name / description。これを見てClaudeが『今このスキルが必要か』を判断する" },
      { name: "動的コンテキスト注入", desc: "会話内容に関係あるスキルだけを自動で会話に読み込む仕組み。無関係なスキルは読み込まれないので効率的" },
    ],
    tip: "SkillはCLAUDE.mdより『特定の作業手順』に向いています。手順書を作るイメージで書いてみましょう。",
  },
  {
    id: "hooks",
    num: "07",
    title: "Hooks（フック）",
    tags: ["自動化", "高度な機能"],
    priority: 2,
    summary:
      "Hooksは『Claude Codeの特定のタイミングで自動的にコマンドを実行する』仕組みです。例えば『ファイルを編集した直後に自動でフォーマットをかける』といった自動化ができます。",
    whenToUse:
      "毎回手動でやっている確認作業や後処理を自動化したい時に使います。少し上級者向けの機能です。",
    useCase:
      "コード編集の直後に自動でLintを走らせる（PostToolUse）、危険なコマンド実行前に必ず確認を挟む（PreToolUse）、セッション開始時に環境情報を読み込む（SessionStart）など。",
    commands: [
      {
        label: "settings.jsonでのHooks設定例",
        code:
          '{\n  "hooks": {\n    "PostToolUse": [\n      { "matcher": "Edit", "command": "npx prettier --write $FILE" }\n    ]\n  }\n}',
      },
      { label: "Hooksの設定を確認・編集", code: "/hooks" },
    ],
    subItems: [
      { name: "SessionStart", desc: "セッション開始時に実行" },
      { name: "SessionEnd", desc: "セッション終了時に実行" },
      { name: "UserPromptSubmit", desc: "ユーザーがメッセージを送信した時に実行" },
      { name: "PreToolUse", desc: "ツール実行の直前に実行（チェックやブロックに使える）" },
      { name: "PermissionRequest", desc: "権限確認が発生した時に実行" },
      { name: "PostToolUse", desc: "ツール実行の直後に実行（自動整形やテストなどに便利）" },
      { name: "Notification", desc: "通知が発生した時に実行" },
      { name: "Stop", desc: "Claudeの応答が終わった時に実行" },
      { name: "SubagentStart", desc: "サブエージェントが起動した時に実行" },
      { name: "TaskCompleted", desc: "タスクが完了した時に実行" },
      { name: "ConfigChange", desc: "設定変更があった時に実行" },
      { name: "PreCompact", desc: "会話を圧縮（/compact）する直前に実行" },
    ],
    tip: "最初は『編集後に自動フォーマット』くらいの簡単なHookから試すのがおすすめです。",
  },
  {
    id: "mcp",
    num: "08",
    title: "MCP（外部ツール連携）",
    tags: ["自動化", "高度な機能"],
    priority: 2,
    summary:
      "MCP（Model Context Protocol）は、Claudeが外部のツールやサービス（データベース、Slack、社内APIなど）とやり取りするための共通の橋渡し役です。MCPサーバーをつなぐと、Claudeが使える道具が増えます。",
    whenToUse:
      "Claude標準の機能（ファイル操作やコマンド実行）だけでは足りず、社内システムやSaaSと連携したい時に使います。",
    useCase:
      "GitHubのIssueを直接操作したい、Slackに通知を送りたい、社内DBを検索したい、といった時にそれ用のMCPサーバーを追加します。スコープを分けることで『自分だけ使う』『プロジェクトで共有』『このPC全体で使う』を選べます。",
    commands: [
      { label: "MCPサーバーを追加", code: "claude mcp add my-server --scope project" },
      { label: "接続中のMCPサーバー一覧を見る", code: "claude mcp list" },
      { label: "MCPサーバーを削除", code: "claude mcp remove my-server" },
      { label: "会話中に管理画面を開く", code: "/mcp" },
    ],
    subItems: [
      { name: "MCPとは何か", desc: "AIと外部ツールをつなぐ共通規格。USBのようにいろいろなツールを『差し込める』" },
      { name: "外部ツール連携", desc: "データベース、API、社内ツールなどをClaudeから直接操作できるようにする" },
      { name: "local スコープ", desc: "自分のPCの、このプロジェクトだけで使う設定" },
      { name: "project スコープ", desc: "プロジェクトに紐づき、チーム全員と共有される設定" },
      { name: "user スコープ", desc: "自分のPC全体・全プロジェクトで使える設定" },
      { name: "追加・一覧・削除コマンド", desc: "claude mcp add / list / remove で管理する" },
    ],
    tip: "最初はMCPを使わなくても困りません。『外部サービスと繋ぎたくなったら使う機能』くらいに考えてOKです。",
  },
  {
    id: "subagents",
    num: "09",
    title: "Subagents（サブエージェント）",
    tags: ["開発効率化", "高度な機能"],
    priority: 2,
    summary:
      "Subagentsは、メインのClaudeとは別に動く『専門担当のミニClaude』です。調査だけを任せたり、計画立案だけを任せたりすることで、本体の会話をシンプルに保てます。",
    whenToUse:
      "大きなコードベースを調査したい時、実装前に計画を練りたい時、独立した作業を並行して進めたい時に使います。",
    useCase:
      "『このコードベースでAPIのエンドポイントがどこにあるか探して』は Explore に、『実装方針を考えて』は Plan に任せる。特定の作業パターンが多いなら、自分専用のカスタムエージェントを作ることもできます。",
    commands: [
      { label: "サブエージェントの管理画面を開く", code: "/agents" },
      { label: "コード調査を依頼する（イメージ）", code: '"サブエージェントに認証まわりのコードを調査させて"' },
    ],
    subItems: [
      { name: "Explore", desc: "コードベースを読み取り専用で高速に調査する担当。ファイル検索や仕様確認に強い" },
      { name: "Plan", desc: "実装方針や設計を考える担当。手を動かす前の計画立案に使う" },
      { name: "general-purpose", desc: "特定の型にはまらない、幅広いタスクに対応する汎用担当" },
      { name: "カスタムエージェント", desc: "自分で役割・使えるツールを定義した専用エージェントを作れる" },
      { name: "どんな時に使うか", desc: "調査や計画をメインの会話から切り離したい時、複数の独立作業を同時に進めたい時" },
    ],
    tip: "『調べ物はExplore、考え事はPlan』とざっくり覚えておくと使い分けやすいです。",
  },
  {
    id: "worktree",
    num: "10",
    title: "Worktree（並行作業スペース）",
    tags: ["チーム開発", "開発効率化"],
    priority: 2,
    summary:
      "Worktreeは、同じリポジトリの中で複数のブランチ作業を同時に進めるための仕組みです。作業ごとに別々のフォルダ（作業スペース）を用意して、お互いに干渉せず並行して進められます。",
    whenToUse:
      "2つ以上の機能開発やバグ修正を同時並行で進めたい時、片方の作業を残したまま別の作業をすぐ始めたい時に使います。",
    useCase:
      "ログイン機能の実装中に緊急のバグ修正が入った場合、既存の作業を止めずに `claude -w bugfix-urgent` で別の作業スペースを開いて対応できます。",
    commands: [
      { label: "認証機能用の作業スペースを作成", code: "claude -w feature-auth" },
      { label: "タスク管理機能用の作業スペースを作成", code: "claude -w feature-tasks" },
    ],
    subItems: [
      { name: "claude -w <name>", desc: "指定した名前のWorktree（作業スペース）でClaude Codeを起動する" },
      { name: "複数作業を並行する場面", desc: "並行して別々の機能開発・修正を進めたい時に、作業内容を混ぜずに管理できる" },
      { name: "feature-auth / feature-tasks の例", desc: "機能ごとに名前をつけて作業スペースを分けることで、切り替えてもコードが混ざらない" },
    ],
    tip: "『今どの作業をしているか忘れそう』と思ったら、Worktreeで分けるサインです。",
  },
  {
    id: "agentteams",
    num: "11",
    title: "Agent Teams（エージェントチーム）",
    tags: ["チーム開発", "高度な機能"],
    priority: 1,
    summary:
      "Agent Teamsは、複数のAIエージェントがチームのように協力して1つの作業を進める実験的な機能です。利用には環境変数のフラグ設定が必要で、今後仕様が変わる可能性があります。",
    whenToUse:
      "1人（1エージェント）では手が回らないほど大きなタスクを、役割分担して同時に進めたい時に試す機能です。",
    useCase:
      "大きな機能追加を『実装担当』『テスト担当』のように分担させ、それぞれの進捗をターミナル内またはtmuxの分割ペインで確認しながら進めます。",
    commands: [
      {
        label: "有効化（settings.json）",
        code: '{\n  "env": {\n    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"\n  }\n}',
      },
      { label: "チームメイトを切り替えるショートカット", code: "Shift+Down" },
    ],
    subItems: [
      { name: "実験的機能", desc: "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS フラグの設定が必要。仕様変更の可能性あり" },
      { name: "複数エージェントで作業する場面", desc: "1つの大きなタスクを複数エージェントに分担させたい時" },
      { name: "in-process", desc: "1つのターミナルの中でチームメイトを切り替えながら表示するモード（Shift+Downで切替）" },
      { name: "tmux / auto", desc: "画面を分割ペイン表示にして、複数エージェントの動きを同時に見られるモード" },
    ],
    tip: "実験的機能なので、まずは通常の1体のClaudeに慣れてから触ってみるのがおすすめです。",
  },
  {
    id: "sdk",
    num: "12",
    title: "Claude Agent SDK",
    tags: ["自動化", "高度な機能"],
    priority: 2,
    summary:
      "Claude Agent SDKは、Claude Codeが持つ『自律的に考えて作業を進める』機能を、自分のアプリやツールの中にプログラムとして組み込むためのSDKです。TypeScriptとPythonに対応しています。",
    whenToUse:
      "ターミナルでの対話ではなく、自作のアプリ・Botや社内ツールの中でClaudeのエージェント機能を動かしたい時に使います。",
    useCase:
      "社内向けの自動コードレビューBotを作る、決まった処理を自動実行するバッチツールを作る、といった場面でSDKを使ってエージェントをプログラムに組み込みます。",
    commands: [
      { label: "TypeScriptのインストール", code: "npm install @anthropic-ai/claude-agent-sdk" },
      {
        label: "TypeScriptの基本コード",
        code:
          'import { query } from "@anthropic-ai/claude-agent-sdk";\n\nconst result = await query({\n  prompt: "...",\n  options: {\n    model: "sonnet",\n    allowedTools: ["Read", "Grep"],\n  },\n});',
      },
      { label: "Pythonのインストール", code: "pip install claude-agent-sdk" },
      {
        label: "Pythonの基本コード",
        code:
          "from claude_agent_sdk import query, ClaudeAgentOptions\n\noptions = ClaudeAgentOptions(model=\"sonnet\")\nasync for msg in query(prompt=\"...\", options=options):\n    print(msg)",
      },
    ],
    subItems: [
      { name: "TypeScript", desc: "npm install @anthropic-ai/claude-agent-sdk でJS/TSアプリに組み込める" },
      { name: "Python", desc: "pip install claude-agent-sdk でPythonアプリに組み込める" },
      { name: "組み込む場面", desc: "自社アプリ・自動化ツール・Botなど、対話画面を使わずにエージェント機能だけ使いたい時" },
    ],
    tip: "『Claude Codeそのものをプログラムから呼び出す』機能、とイメージするとわかりやすいです。",
  },
  {
    id: "github-actions",
    num: "13",
    title: "GitHub Actions連携",
    tags: ["自動化", "チーム開発"],
    priority: 2,
    summary:
      "GitHub ActionsとClaude Codeを連携させると、Pull RequestやIssueのコメントをきっかけに、自動でClaudeがコードを確認・修正してくれるようになります。",
    whenToUse:
      "PRが作られた時に自動でレビューさせたい、Issueコメントで『@claude ここ直して』と頼みたい、といったチーム開発の自動化に使います。",
    useCase:
      "PRを開いた時・更新した時に自動でClaudeがレビューコメントを付ける、Issueに指示コメントを書くとClaudeが対応するPRを作る、といった運用ができます。",
    commands: [
      { label: "GitHub Appをインストール", code: "/install-github-app" },
      {
        label: "ワークフロー例（.github/workflows/claude.yml）",
        code:
          "name: Claude Code\non:\n  issue_comment:\n    types: [created]\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  claude:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}",
      },
    ],
    subItems: [
      { name: "/install-github-app", desc: "ClaudeをGitHubリポジトリに連携させるためのセットアップコマンド" },
      { name: "PRやIssueコメントから動かす場面", desc: "コメントで指示するだけでClaudeがコード修正・レビューを行う" },
      { name: "ワークフロー例", desc: "issue_comment や pull_request をトリガーにしてClaude Code Actionを実行する設定" },
    ],
    tip: "チーム開発でレビューの一次チェックを自動化したい時にぴったりの機能です。",
  },
  {
    id: "ide",
    num: "14",
    title: "IDE連携",
    tags: ["開発効率化"],
    priority: 2,
    summary:
      "普段使っているエディタ（Cursor・JetBrains系IDEなど）の中に直接Claude Codeを組み込んで使える機能です。ターミナルとエディタを行き来しなくて済みます。",
    whenToUse:
      "コードを見ながらその場でClaudeに質問・修正を頼みたい時、変更を試してダメだったら元に戻したい時に使います。",
    useCase:
      "Cursorのチャットパネルで `@ファイル名` を使ってそのファイルについて質問する、JetBrainsのプラグインからコード選択範囲を共有して修正を頼む、といった使い方です。",
    commands: [
      { label: "Cursor: ファイルを参照する", code: "@src/components/Button.tsx" },
      { label: "JetBrains: Marketplaceからインストール", code: "Settings > Plugins > Marketplace > Claude Code" },
    ],
    subItems: [
      { name: "Cursor", desc: "拡張機能をインストールし、チャットパネル内で直接Claudeと対話できる" },
      { name: "JetBrains", desc: "IntelliJ IDEA・WebStorm・PyCharmなどにプラグインとして導入できる" },
      { name: "ファイル参照", desc: "`@`でファイルを指定でき、行範囲まで絞って参照できる" },
      { name: "選択コード共有", desc: "エディタで選択したコードが自動でClaudeとの会話に共有される" },
      { name: "チェックポイント・ロールバック", desc: "Claudeによる変更を記録しておき、気に入らなければ元の状態に戻せる" },
    ],
    tip: "エディタから離れずに質問できるので、慣れると一番よく使うようになる連携方法です。",
  },
  {
    id: "chrome",
    num: "15",
    title: "Chrome自動化",
    tags: ["開発効率化", "自動化"],
    priority: 2,
    summary:
      "Claude Codeがブラウザ（Chrome）を実際に操作して、画面表示の確認・スクリーンショット撮影・フォーム操作テストなどを行える機能です。",
    whenToUse:
      "作ったWebページのレイアウトが崩れていないか確認したい時、見た目の変更を画像で確認しながら進めたい時に使います。",
    useCase:
      "フォームに実際に入力してボタンを押す動作テストをする、スクリーンショットを撮ってデザインの崩れをチェックする、といったフロントエンド開発のテスト自動化に活用します。",
    commands: [{ label: "ブラウザ自動化を有効化", code: "/chrome" }],
    subItems: [
      { name: "/chrome", desc: "ブラウザ自動化を有効にするコマンド" },
      { name: "UI確認", desc: "実際の画面表示を見ながらレイアウト崩れやフォーム動作を確認する" },
      { name: "スクリーンショット取得", desc: "画面を画像として取得し、画像入力と組み合わせて見た目の改善に使える" },
      { name: "フロントエンドテスト", desc: "クリックや入力操作を自動で行い、動作確認を自動化する" },
    ],
    tip: "『見た目の確認は結局自分の目で』ではなく、Claudeにスクショを見せてもらう習慣をつけると効率的です。",
  },
  {
    id: "others",
    num: "16",
    title: "その他の便利機能",
    tags: ["チーム開発", "高度な機能"],
    priority: 1,
    summary:
      "リモート接続・デスクトップアプリ・Slack連携・セキュリティ設定など、Claude Codeをより便利に・より安全に使うための周辺機能です。",
    whenToUse:
      "リモートワークで別デバイスから続きの作業をしたい時、GUIで使いたい時、企業でセキュリティ要件を満たす必要がある時に使います。",
    useCase:
      "外出先のスマホやサブPCからセッションに接続する、GUI版のClaude Code Desktopでマウス操作しながら使う、Slackチャンネルから直接指示を送る、機密情報を扱うため会話を保存しない設定にする、など。",
    commands: [
      { label: "（イメージ）Slackから指示", code: "@claude このPRをレビューして" },
    ],
    subItems: [
      { name: "Remote Control", desc: "別のデバイスから今のセッションに接続できる。リモートワーク環境で活躍" },
      { name: "Claude Code Desktop", desc: "CLIと同等の機能を持つGUI版のデスクトップアプリ" },
      { name: "Slack統合", desc: "Slackチャンネルから直接Claudeにプロンプトを送れる（Teams/Enterprise向け）" },
      { name: "Zero Data Retention", desc: "会話データを一切保持しない設定。機密情報や規制対応が必要な環境向け" },
      { name: "Managed Settings", desc: "Enterprise向けに、Admin ConsoleやSSOで設定を組織全体で一元管理する機能" },
    ],
    tip: "個人利用ではまず使わない機能も多いですが、『会社で使う時はこういう機能もある』と覚えておくと安心です。",
  },
  {
    id: "shortcuts",
    num: "17",
    title: "キーボードショートカット",
    tags: ["初心者におすすめ"],
    priority: 3,
    summary:
      "Claude Codeを操作する時によく使うキー操作の一覧です。マウスを使わずキーボードだけでスムーズに操作できるようになります。",
    whenToUse:
      "会話中にモードを切り替えたい時、実行中の作業を止めたい・裏に回したい時、画像を貼り付けたい時など、日常的な操作全般で使います。",
    useCase:
      "作業を止めずにバックグラウンドに回したい時は `Ctrl+B`、じっくり考えさせたい時は `Alt+T` でExtended Thinkingを有効にする、スクリーンショットを貼り付けたい時は `Ctrl+V`、といった使い方をします。",
    commands: [
      { label: "メッセージ送信", code: "Enter" },
      { label: "改行", code: "Shift+Enter" },
      { label: "現在の操作をキャンセル", code: "Ctrl+C" },
      { label: "実行中タスクをバックグラウンドに", code: "Ctrl+B" },
      { label: "Plan Modeの切り替え", code: "Shift+Tab" },
      { label: "Extended ThinkingのON/OFF（Windows）", code: "Alt+T" },
    ],
    subItems: [
      { name: "Enter", desc: "メッセージを送信する" },
      { name: "Shift+Enter", desc: "メッセージ内で改行する（送信しない）" },
      { name: "Ctrl+C", desc: "現在の操作をキャンセルする" },
      { name: "Ctrl+B", desc: "実行中のタスクをバックグラウンドに回す" },
      { name: "Shift+Tab", desc: "Plan Mode（計画モード）に切り替える" },
      { name: "Alt+T（Mac: Option+T）", desc: "Extended Thinking（じっくり考えるモード）をON/OFF" },
      { name: "Shift+Down", desc: "Agent Teamsのチームメイトを切り替える" },
      { name: "Ctrl+V", desc: "画像・スクリーンショットを貼り付ける" },
      { name: "Esc", desc: "入力中の文字をクリアする" },
      { name: "keybindings.json", desc: "~/.claude/keybindings.json でショートカットを自由にカスタマイズできる" },
    ],
    tip: "全部覚えなくてOK。まずは `Shift+Enter`（改行）と `Ctrl+C`（キャンセル）だけ覚えれば十分です。",
  },
];

// 「まず覚えるべき順番」ロードマップ（対応するカードidにジャンプする）
const ROADMAP = [
  { step: 1, label: "claude", cardId: "launch" },
  { step: 2, label: "/help", cardId: "slash" },
  { step: 3, label: "/init", cardId: "slash" },
  { step: 4, label: "CLAUDE.md", cardId: "claudemd" },
  { step: 5, label: "/clear", cardId: "slash" },
  { step: 6, label: "/compact", cardId: "slash" },
  { step: 7, label: "/commit", cardId: "bundled-skills" },
  { step: 8, label: "/doctor", cardId: "slash" },
  { step: 9, label: "/model", cardId: "slash" },
  { step: 10, label: "/permissions", cardId: "slash" },
  { step: 11, label: "/mcp", cardId: "mcp" },
  { step: 12, label: "/agents", cardId: "subagents" },
  { step: 13, label: "/chrome", cardId: "chrome" },
  { step: 14, label: "Hooks", cardId: "hooks" },
  { step: 15, label: "Skills", cardId: "skills" },
  { step: 16, label: "GitHub Actions", cardId: "github-actions" },
  { step: 17, label: "Agent SDK", cardId: "sdk" },
];

const ALL_CATEGORIES = [
  "初心者におすすめ",
  "開発効率化",
  "自動化",
  "チーム開発",
  "高度な機能",
];
