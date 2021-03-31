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
    return apiClient.get(`/`)
  },
}
