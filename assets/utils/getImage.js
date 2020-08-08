export default (imgUrl, size = 4) => {
  return imgUrl.replace('_S5.', `_S${size}.`)
}
