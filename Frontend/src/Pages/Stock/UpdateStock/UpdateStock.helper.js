import axios from "axios"
import { serverUrl } from "../../../Config"

export function updateProduct(data) {
  const url = `${serverUrl}/stock`

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