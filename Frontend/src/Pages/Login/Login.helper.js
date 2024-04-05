import axios from "axios"
import { serverUrl } from "../../../Config"

export function passwordcheck(data) {
  const url = `${serverUrl}/user/password`
  return axios.post(url, data,);
}