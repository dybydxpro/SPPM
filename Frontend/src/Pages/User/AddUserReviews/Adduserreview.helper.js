import axios from "axios"
import { serverUrl } from "../../../Config"

export function addUserReview(data) {
  const url = `${serverUrl}/userreview`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}

