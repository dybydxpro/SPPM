import axios from "axios"
import { serverUrl } from "../../../Config"

export function addbatch(data) {
  const url = `${serverUrl}/batches`
  
  return axios.post(url, data,{
    headers:{
      "authorization":localStorage.getItem("token")
    },
  });
}