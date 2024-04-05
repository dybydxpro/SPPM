import axios from "axios"
import { serverUrl } from "../../../Config"

export function addLeaveNote(data) {
  const url = `${serverUrl}/leavenote`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}

