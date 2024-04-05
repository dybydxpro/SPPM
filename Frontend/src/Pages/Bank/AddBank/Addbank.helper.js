import axios from "axios"
import { serverUrl } from "../../../Config"

export function addBank(data) {
  const url = `${serverUrl}/bank`

  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
