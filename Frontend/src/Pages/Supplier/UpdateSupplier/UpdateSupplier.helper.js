import axios from "axios"
import { serverUrl } from "../../../Config"

export function updateSupplier(data) {
  const url = `${serverUrl}/supplier`

  return axios.put(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
