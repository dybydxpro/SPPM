import axios from "axios"
import { serverUrl } from "../../../Config"

export function addStock(data) {
  const url = `${serverUrl}/stock`
  return axios.post(url, data,{
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}