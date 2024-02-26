# business-day-calcurator-plugin

## 概要
営業日計算プラグインです。  
指定のフィールドA から 〇〇日前・後 の日付を 指定のフィールドBに表示します。

## 使い方
### 事前準備
このプラグインでは、営業日計算を行う際に、営業日をまとめた日付情報を取得する必要があります.  
以下に従って、日付情報を管理するアプリを事前に作成してください。

#### 1. 祝祭日カレンダーアプリの作成  
「祝祭日管理アプリ」という名前でアプリを作成し、以下、2つのフィールドを追加してください。

- 祝日フィールドの追加   
    以下の要件に従って、祝日フィールドを追加してください。  
    - フィールド名： 祝日
    - フィールドタイプ：日付
    - フィールドコード：祝日   

-  備考フィールドの追加  
    このフィールドに祝日の名前を入力します。  
    - フィールド名： 備考
    - フィールドタイプ：文字列
    - フィールドコード：備考   

#### 2.祝日情報の追加
先程作成したフィールドに、日付と祝日名を入力してレコードを追加します。  
※手動で追加しても構いませんが、CSVのインポートで行うと簡単にできます。インポート方法についてはkintoneの公式ドキュメントを参照ください。

#### 3.祝祭日カレンダーのアプリIDの設定
プラグインの設定画面に作成した祝祭日カレンダーアプリのアプリIDを入力します。ここを設定しないと、**正常に動作しません。**  
※アプリIDはkintoneのアプリを開いた際のURL `https://hogehoge.cybozu.com//k/アプリID/` です。

### 使い方
- 設定の追加  
上段の項目を入力し、隣の追加ボタンをクリックすると、下の設定リストの最上段に追加されます。

- 設定の編集・保存  
追加した設定を編集するには、右の編集ボタンをクリックしてください。クリックすると、編集ボタンが完了ボタンに切り替わるので、  
編集を終えたら完了ボタンをクリックしてください。

- 設定の削除  
  追加した設定を削除するには、右の削除ボタンをクリックしてください。

- 設定の並べかえ  
設定リスト左端のハンドルでドラッグアンドドロップでの設定項目の並び替えが可能です。

- 設定の保存・キャンセル  
設定が完了したら、画面下部の保存をクリックしてください。保存ボタンをクリックせず、画面を切り替えると設定内容は保存されずに破棄されます。  
設定を保存しない場合には、隣のキャンセルボタンをクリックしてください。設定を破棄し、プラグイン画面に遷移します。


### 対応フィールド
指定できるフィールドタイプは以下です。
- 日付
- 日時