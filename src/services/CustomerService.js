import axios from 'axios';

export default class CustomerService {

    getAllCustomers() {
        return axios.get("http://localhost:8000/customers?action=getAll");
    }

    createNewCustomer(customer) {
        return axios.post("http://localhost:8000/customers?action=new", JSON.stringify(customer),  {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    getCustomerByCustomerId(customerId) {
        return axios.get("http://localhost:8000/customers?action=getById&id=" + customerId)
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}