import domains from './../constants/domains.js'

export default function ({ headers }, res, next) {
  const city = headers.host.split('.')[0]
  // если есть домен 3го уровня, то выставляем имя города в env
  // если нет, значит выставляем Актау
  process.env.city = domains[city] ? city : 'aktau'

  next()
}
