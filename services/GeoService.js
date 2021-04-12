import axios from 'axios'
import config from '@/config'

const apiClient = axios.create({
  baseURL: config.geoUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getLocation() {
    return apiClient.get(
      `/?key=UNi2JUR3ENbaflG2&objects=country,city,message,success,latitude,longitude&lang=ru`
    )
  },
}
