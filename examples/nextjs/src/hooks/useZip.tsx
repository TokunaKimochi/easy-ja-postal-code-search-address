import { useEffect, useState } from 'react'
import { SearchAddress, ZipData } from 'easy-ja-postal-code-search-address'

export const useZip = (baseUrl: string) => {
  const [address, setAddress] = useState<ZipData | null>(null)
  const [zipError, setZipError] = useState<string>('')
  const [afpc, setAfpc] = useState<SearchAddress | null>(null)

  const init = () => {
    setAfpc(
      new SearchAddress({
        baseUrl,
        fallback: () => setZipError('初期化に失敗しました'),
      }),
    )
  }

  const changeZip = async (input: string) => {
    if (!afpc) return
    const result = await afpc.search({ zipInput: input })

    if (result.address) {
      // success
      setZipError('')
      setAddress(result.address)
      return
    }
    // error
    setAddress(null)
    const { inValid, noFirstThreeDigits, notFound } = result.error
    if (inValid) {
      setZipError('7桁の数字を入れてください')
      return
    }
    if (noFirstThreeDigits) {
      setZipError('入力した頭3桁の郵便番号は存在しません')
      return
    }
    if (notFound) {
      setZipError('入力した郵便番号は存在しましせん')
      return
    }
  }

  useEffect(() => {
    init()
    return () => {
      afpc?.fetchAbort()
    }
  }, [])

  return {
    address,
    changeZip,
    zipError,
  }
}
