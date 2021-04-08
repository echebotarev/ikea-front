import intl from 'intl'
import locale from 'intl/locale-data/jsonp/en.js'

export default ({ store }, inject) => {
  const getPrice = (num) => {
    const percent = store.getters['variables/percent']
    const coefficient = store.getters['variables/coefficient']

    if (typeof num === 'string') {
      num = parseInt(num.replace(/ /g, ''))
    }

    num = num * coefficient

    return Math.ceil(num + (num * percent) / 100)
  }

  const getDisplayPrice = (num, options = {}) => {
    const { isOnlyFormatted } = options

    if (isOnlyFormatted !== true) {
      num = getPrice(num)
    }

    return global.Intl
      ? new Intl.NumberFormat().format(num)
      : new intl.NumberFormat(locale).format(num)
  }

  inject('getPrice', getPrice)
  inject('getDisplayPrice', getDisplayPrice)
}
