import Link from 'next/link'
import { ChangeEvent, useRef, useState } from 'react'

import { List } from '../components/List'
import { useZip } from '../hooks/useZip'

const padding = { padding: 20 }

export default function OnChangeVersion() {
  const { address, changeZip, zipError } = useZip('/assets/json/zip/')
  const [result, setResult] = useState<string>('')

  const prefecturesRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const otherRef = useRef<HTMLInputElement>(null)

  const onSubmit = () => {
    const prefacture = prefecturesRef.current?.value ?? ''
    const city = cityRef.current?.value ?? ''
    const other = otherRef.current?.value ?? ''
    setResult(() => prefacture + ' / ' + city + ' / ' + other)
  }

  // zipコードが変更されるごとに検索をかける
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await changeZip(e.currentTarget.value)
  }

  if (address) {
    const { prefectures, city, other } = address
    if (prefecturesRef.current) {
      prefecturesRef.current.value = prefectures
    }
    if (cityRef.current) {
      cityRef.current.value = city
    }
    if (otherRef.current) {
      otherRef.current.value = other
    }
  }

  return (
    <div style={padding}>
      <h1>入力ごとに変更バージョン</h1>
      <div>
        〒:
        <input type={'text'} maxLength={7} onChange={onChange} placeholder={'7桁の郵便番号を入力'} />
      </div>
      <div>
        <List title='都道府県'>
          <input type={'text'} ref={prefecturesRef} />
        </List>
        <List title='市区町村'>
          <input type={'text'} ref={cityRef} />
        </List>
        <List title='その他'>
          <input type={'text'} ref={otherRef} />
        </List>
        <div>
          <button onClick={onSubmit}>送信</button>
        </div>
        <div style={{ ...padding, color: '#ff0000' }}>{zipError && <div>エラー : {zipError}</div>}</div>
        <div style={{ ...padding, border: '1px solid #fff' }}>送信結果:{result}</div>
      </div>
      <Link href={'/index2'} style={{ ...padding, background: '#ccc', color: '#000', display: 'inline-block' }}>
        クリックしたら変わるバージョンへ移動
      </Link>
    </div>
  )
}
