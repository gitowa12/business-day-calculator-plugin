# 概要
営業日計算プラグインです。
指定の `フィールドX` から `〇〇日前or後` の日付を指定の `フィールドY` に表示します。
計算元のフィールドと出力先のフィールド、何営業日分か、前か後かを指定できます。

営業日計算はJavaScriptカスタマイズでも実装できますが、
非エンジニアの方でも機能を実装できるようにプラグイン化しました。

# 使い方

## 事前準備
このプラグインでは、営業日計算を行う際に、営業日をまとめた日付情報を取得する必要があります.  
以下に従って、日付情報を管理するアプリを事前に作成してください。

### 1. 祝祭日カレンダーアプリの作成  
「祝祭日管理アプリ」という名前でアプリを作成し、以下、2つのフィールドを追加してください。

- **祝日フィールドの追加**   
    このフィールドに祝日の日付を入力します。 
    - フィールド名： 祝日
    - フィールドタイプ：日付
    - フィールドコード：祝日   

-  **備考フィールドの追加**  
    このフィールドに祝日の名前を入力します。  
    - フィールド名： 備考
    - フィールドタイプ：文字列
    - フィールドコード：備考   

### 2.祝日情報の追加
先程作成したフィールドに、日付と祝日名を入力してレコードを追加します。  
※手動で追加しても問題ありませんが、CSVのインポートで行うと一括で入力できるため便利です。
　インポート方法についてはkintoneの公式ドキュメントをご参照ください。

### 3.祝祭日カレンダーのアプリIDの設定
プラグインの設定画面に、作成した祝祭日カレンダーアプリのアプリIDを入力します。
アプリIDを設定しないと、**正常に動作しません。**  
※アプリIDはkintoneのアプリを開いた際のURL `https://hogehoge.cybozu.com//k/アプリID/` 　です。



## 操作の一覧
- **設定の追加**  
上段の項目を入力し、隣の追加ボタンをクリックすると、下の設定リストの最上段に追加されます。

- **設定の編集・保存**  
追加した設定を編集するには、右の編集ボタンをクリックしてください。クリックすると、編集ボタンが完了ボタンに切り替わるので、編集を終えたら完了ボタンをクリックしてください。

- **設定の削除**  
  追加した設定を削除するには、右の削除ボタンをクリックしてください。

- **設定の並べかえ**   
設定リスト左端のハンドルでドラッグアンドドロップでの設定項目の並び替えが可能です。

- **設定の保存・キャンセル**  
設定が完了したら、画面下部の保存をクリックしてください。保存ボタンをクリックせず、画面を切り替えると設定内容は保存されずに破棄されます。  
設定を保存しない場合には、隣のキャンセルボタンをクリックしてください。設定を破棄し、プラグイン画面に遷移します。

# 仕様
## 対応画面
- レコード追加画面
- レコード編集画面

## 対応フィールド
指定できるフィールドタイプは以下です。
- 日付フィールド
- 日時フィールド