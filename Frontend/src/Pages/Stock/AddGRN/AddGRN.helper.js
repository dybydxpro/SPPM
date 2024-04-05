import axios from "axios"
import { serverUrl } from "../../../Config"

export function addgrn(data) {
  const url = `${serverUrl}/grn`

  return axios.post(url, data, {
    headers: {

      "authorization": localStorage.getItem("token")
    },
  });
}

export function updateoutStanding(data) {
  const url = `${serverUrl}/supplier/addoutstanding/`

  return axios.put(url, data, {
    headers: {

      "authorization": localStorage.getItem("token")
    },
  });
}

// export function getproducts(data) {
//   const url = `${serverUrl}/product`
//   return axios.get(url, data,);
// }