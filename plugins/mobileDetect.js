import { isMobile, isBrowser } from 'mobile-device-detect'

export default (ctx, inject) => {
  inject('isMobile', isMobile)
  inject('isBrowser', isBrowser)
}
