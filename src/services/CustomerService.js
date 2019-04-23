import axios from 'axios';

export default class CustomerService {

    getAllCustomers() {
        return axios.get("http://localhost:8000/customers?action=getAll")
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    createNewCustomer(customer) {
        return axios.post("http://localhost:8000/customers?action=new", JSON.stringify(customer),  {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}