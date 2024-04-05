import axios from "axios"
import { serverUrl } from "../../../Config"

export function addRequestNote(data) {
  const url = `${serverUrl}/supplierrequestnote`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}

