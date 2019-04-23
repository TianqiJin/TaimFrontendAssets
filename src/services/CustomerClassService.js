import axios from 'axios';

export default class CustomerClassService {

    getAllCustomerClasses() {
        return axios.get("http://localhost:8000/customerclasses?action=getAll")
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}