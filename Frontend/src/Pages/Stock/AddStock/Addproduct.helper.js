import axios from "axios"
import { serverUrl } from "../../../Config"

export function addProduct(data) {
  const url = `${serverUrl}/product`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}

// export function getproducts(data) {
//   const url = `${serverUrl}/product`
//   return axios.get(url, data,);
// }