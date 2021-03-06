import { auth, basename } from './utils'
import { postWithTimeout } from '../_utils/ajax'

export async function uploadMedia (instanceName, accessToken, file, description) {
  let formData = new FormData()
  formData.append('file', file)
  formData.append('description', description)
  let url = `${basename(instanceName)}/api/v1/media`
  return postWithTimeout(url, formData, auth(accessToken))
}
