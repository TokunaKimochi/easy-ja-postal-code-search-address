# easy-ja-postal-code-search-address [![npm version](https://img.shields.io/npm/v/easy-ja-postal-code-search-address.svg?style=flat)](https://www.npmjs.com/package/easy-ja-postal-code-search-address)

郵便番号から住所を簡単に検索するためのヘルパークラス

# Features

- 「easy-ja-postal-code-generate-json」で生成した郵便番号の json ファイルデータから住所を郵便番号経由で検索します
- json ファイルを扱いやすくするためのクラスです。
- 郵便番号データは、全国だと膨大になるため、頭３桁ごとに json ファイルでまとめています。必要なファイルだけ読み込むためです。
- 一度呼び出した json ファイルのデータはキャッシュします。

# Requirement

- Node.js v18.13.0

# Usage

```bash
# install
npm i easy-ja-postal-code-search-address

```

```javascript
import { SearchAddress } from 'easy-ja-postal-code-search-address'
```

使い方の詳細は examples フォルダをご覧ください

# Initialize

```javascript
const afpc = new SearchAddress({
  baseUrl: '/json/zip/',
  fallback: () => alert('初期化に失敗しました'),
})
```

| name     | 説明                                                                                         | require |
| -------- | -------------------------------------------------------------------------------------------- | ------- |
| baseUrl  | json が入っているディレクトリ                                                                | ●       |
| fallback | 初期化に失敗した時の処理を書く,ディレクトリの設定ミスで、index.json が読み込めなかった時など |         |

# Methods

| method                                          | 説明                                                                    |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| search({ zipInput }: { zipInput: string }): any | 郵便番号の文字列を入れると、それに応じた住所 or エラーを返却            |
| afpc.fetchAbort() => void                       | json の fetch を止めたい時に呼ぶ（React で Component の破棄する時など） |

# Return value of hoge method

```typescript

// 検索結果のデータ型
type ZipData = {
  zip: string
  prefectures: string
  city: string
  other: string
}

// 成功したときの返却値
{
  address: ZipData
  error: null
}

// 失敗したときの返却値
{
  address: null
  error: {
    loading?: true // ローディング中
    notReady?: true // 準備に失敗した
    inValid?: true // 入力値が不正
    noFirstThreeDigits?: true // 入力された頭３桁はindexファイルに存在しない
    notFound?: true // 入力された郵便番号から住所は見つからなかった
  }
}

```

# Author

- https://twitter.com/resistance_gowy
- go.nishiduka.1985@gmail.com

# License

"easy-ja-postal-code-search-address" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
