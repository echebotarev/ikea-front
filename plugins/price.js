import { percent, KZT } from '@/constants'

import intl from 'intl'
import locale from 'intl/locale-data/jsonp/en.js'

const getPrice = (num) => {
  if (typeof num === 'string') {
    num = parseInt(num.replace(/ /g, ''))
  }

  num = num * KZT

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

export default (ctx, inject) => {
  inject('getPrice', getPrice)
  inject('getDisplayPrice', getDisplayPrice)
}
