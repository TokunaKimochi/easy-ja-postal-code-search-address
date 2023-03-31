import { SearchAddress } from 'easy-ja-postal-code-search-address'

class IndexPage {
  constructor() {
    this.init()
    this.setSelectors()
    this.setEvent()
  }
  init() {
    this.ejpc = new SearchAddress({
      baseUrl: '/assets/json/zip/',
      fallback: () => {
        alert('失敗')
      },
    })
  }
  setSelectors() {
    this.zip = document.getElementById('zip')
    this.zipButton = document.getElementById('zibButton')
    this.prefecture = document.getElementById('prefecture')
    this.city = document.getElementById('city')
    this.other = document.getElementById('other')
    this.error = document.getElementById('error')
  }
  updateAddress(prefectures, city, other) {
    this.prefecture.value = prefectures
    this.city.value = city
    this.other.value = other
  }
  updateError(text) {
    this.error.innerHTML = text
  }
  setEvent() {
    this.zipButton?.addEventListener?.('click', async (e) => {
      if (!this.zip) return
      const result = await this.ejpc.search({ zipInput: this.zip.value })
      if (result.address) {
        this.updateError('')
        const { prefectures, city, other } = result.address
        this.updateAddress(prefectures, city, other)
        return
      }
      const { error } = result
      this.updateAddress('', '', '')
      if (error?.inValid) {
        this.updateError('7桁の数字を入力してください')
        return
      }
      if (error?.noFirstThreeDigits) {
        this.updateError('入力された郵便番号の頭３桁は存在しません')
        return
      }
      if (error?.notFound) {
        this.updateError('お探しの住所は存在しません')
        return
      }
      if (error?.notReady) {
        this.updateError('準備ができていません')
        return
      }
    })
  }
}

new IndexPage()
