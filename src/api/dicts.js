import request from '@/utils/request'
import store from "@/store"
export async function getDicts(name) {
  return request({
    url: '/api/dicts',
    method: 'post',
    data: {
      name
    }
  })
}
