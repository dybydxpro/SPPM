import axios from "axios"
import { serverUrl } from "../../../Config"

export function addwarehouse(data) {
  const url = `${serverUrl}/warehouse`
  return axios.post(url, data,{
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}