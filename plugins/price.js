import { percent } from '@/constants'

const getPrice = (num) => {
  if (typeof num === 'string') {
    num = parseInt(num.replace(/ /g, ''))
  }
  return Math.ceil(num + (num * percent) / 100)
}

const getDisplayPrice = (num, options = {}) => {
  const { isOnlyFormatted } = options

  if (isOnlyFormatted !== true) {
    num = getPrice(num)
  }

  return new Intl.NumberFormat().format(num)
}

export default (ctx, inject) => {
  inject('getPrice', getPrice)
  inject('getDisplayPrice', getDisplayPrice)
}
