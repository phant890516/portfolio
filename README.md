# Portfolio Site

林 恆佑（LIN HENGYOU）の個人ポートフォリオサイトです。
React + Vite + Tailwind CSS で構築されており、自己紹介・スキル・資格・経歴・制作物・お問い合わせフォームをまとめています。

🔗 公開URL: https://portfolio-theta-virid-txweh2p2hf.vercel.app/

## 主な機能

- **TOP（Hero）**: [Unicorn Studio](https://www.unicorn.studio/) によるインタラクティブな3D背景アニメーション
- **スキル**: 言語・フレームワーク、デザイン・3Dツールの習熟度をプログレスバーで表示
- **資格・認定**: 取得済み資格をカード形式で一覧表示
- **開発経歴**: 学歴・プロジェクト経験をタイムライン形式で表示
- **プロジェクト**: 制作したWebアプリ・サイトのギャラリー（外部リンク付き）
- **お問い合わせ**: [Web3Forms](https://web3forms.com/) を利用したメール送信フォーム

## 技術スタック

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)（アイコン）
- [SweetAlert2](https://sweetalert2.github.io/)（通知モーダル）
- [unicornstudio-react](https://www.npmjs.com/package/unicornstudio-react)（3D背景）

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド後のプレビュー
npm run preview
```

## 環境変数

お問い合わせフォームの送信には [Web3Forms](https://web3forms.com/) のAPIキーが必要です。
プロジェクトルートに `.env` ファイルを作成し、以下を設定してください。

```
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

## ディレクトリ構成

```
src/
├── App.jsx       # メインコンポーネント（全セクション）
├── Unicorn.jsx   # 3D背景アニメーションコンポーネント
├── index.css     # グローバルスタイル
└── main.jsx      # エントリーポイント
```
