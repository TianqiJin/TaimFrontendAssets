import axios from 'axios';

export default class CustomerClassService {

    getAllCustomerClasses() {
        return axios.get("http://localhost:8000/customerclasses?action=getAll");
    }
}