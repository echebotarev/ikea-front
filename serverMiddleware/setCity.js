import domains from './../constants/domains.js'

export default function (req, res, next) {
  const { headers } = req

  const city = headers.host.split('.')[0]

  // если есть домен 3го уровня, то выставляем имя города в env
  // если нет, значит редиректим на Актау
  if (domains[city]) {
    process.env.city = city
    next()
  } else {
    res.writeHead(301, {
      Location: `${
        process.env.NODE_ENV === 'production' ? 'https' : 'http'
      }://aktau.${headers.host}${req.url}`,
    })
    res.end()
  }
}
