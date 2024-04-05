import axios from "axios"
import { serverUrl } from "../../../Config"

export function AddServiceReview(data) {
  const url = `${serverUrl}/servicereview`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
