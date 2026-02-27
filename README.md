

# タスク進捗管理アプリ

Laravel (Sanctum) と React を連携させた、SPA（シングルページアプリケーション）構成のタスク管理システムです。

## 🌟 プロジェクトの概要

このシステムは、一般ユーザーが自身のアカウントを作成し、個別のタスクを管理（作成・編集・削除・ステータス更新）できるアプリケーションです。

## 🛠 使用技術 (Tech Stack)

* **Backend**: Laravel 11 (PHP 8.2+) / Laravel Sanctum (手動実装)
* **Frontend**: React 18 / TypeScript / Tailwind CSS
* **Infrastructure**: Docker (Laravel Sail)
* **Tools**: Axios / FormRequest / Policy

---

## 🚀 実装済み・実装予定の機能

### 1. 認証・認可 (Auth)

* **FN001/003 登録・ログイン**: Sanctum によるトークンベースの認証。
* **FN005 ログアウト**: トークンを破棄し、安全にセッションを終了。
* **認可ロジック (Policy)**:
* 自分のタスクのみ編集・削除・ステータス更新が可能。
* 他人のタスクは「閲覧のみ」に制限し、不正なリクエストをバックエンドで遮断。



### 2. タスク管理 (Tasks)

* **FN008 一覧表示**:
* 自分のタスクと他人のタスクを視覚的に区別（自分には編集・削除ボタンを表示）。
* 「全員のタスク」と「自分のタスク」を切り替えるフィルタ機能。


* **FN009~012 CRUD操作**:
* タスクの新規登録・編集・削除。
* ステータス（未着手・進行中・完了）のワンクリック更新。



### 3. バリデーション (Validation)

* **Backend**: Laravel `FormRequest` による厳格な入力チェック。
* **Frontend**: TypeScript の型定義を用いた安全なデータ通信。
* **ルール**: タイトル必須、詳細は255文字以内、ステータス限定（todo, doing, done）。

---

## 📊 データベース設計 (Schema)

### users テーブル

| カラム名 | 型 | 詳細 |
| --- | --- | --- |
| `id` | unsigned bigint | プライマリキー |
| `name` | string | ユーザー名 |
| `email` | string | メールアドレス (Unique) |
| `password` | string | ハッシュ化されたパスワード |

### tasks テーブル

| カラム名 | 型 | 詳細 |
| --- | --- | --- |
| `id` | unsigned bigint | プライマリキー |
| `user_id` | unsigned bigint | 外部キー (users.id) |
| `title` | string | タスクのタイトル (必須) |
| `description` | text | タスクの詳細 |
| `status` | string | todo / doing / done (デフォルト: todo) |

---

## 💡 こだわりポイント

* **認可(Policy)の徹底**: 画面上のボタン非表示（フロントエンド）だけでなく、LaravelのPolicy（バックエンド）でも二重にガードし、セキュリティを高めています。
* **直感的なUI**: 自分のタスクと他人のタスクを色分けやアイコンで区別し、ユーザーが迷わない設計を目指しています。

---




