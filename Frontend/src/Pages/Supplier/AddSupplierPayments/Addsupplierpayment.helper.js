import axios from "axios"
import { serverUrl } from "../../../Config"

export function addSupplierPayment(data) {
  const url = `${serverUrl}/supplier_payments`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}

export function updateoutStanding(data) {
  const url = `${serverUrl}/supplier/updateoutstanding/`

  return axios.put(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
