import axios from "axios"
import { serverUrl } from "../../../Config"

export function updateCustomer(data) {
  const url = `${serverUrl}/customer`

  return axios.put(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
