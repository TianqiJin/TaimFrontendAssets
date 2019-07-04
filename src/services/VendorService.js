import axios from 'axios';

export default class VendorService {

    getAllVendors() {
        return axios.get("http://localhost:8000/vendors?action=getAll")
    }
}