import axios from "axios"
import { serverUrl } from "../../../Config"

export function addcustomer(data) {
  const url = `${serverUrl}/customer`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
