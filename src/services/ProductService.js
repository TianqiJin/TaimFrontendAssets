import axios from 'axios';

export default class ProductService {

    getAllProducts() {
        return axios.get("http://localhost:8000/products?action=getAll")
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    getProductById(id){
        return axios.get("http://localhost:8000/products?action=getById&id=" + id)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    createNewProduct(product) {
        console.log(product);
        return axios.post("http://localhost:8000/products?action=new", JSON.stringify(product),  {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}