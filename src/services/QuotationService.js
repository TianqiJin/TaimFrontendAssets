import axios from 'axios';

export default class QuotationService {

    initNewQuotation() {
        return axios.get("http://localhost:8000/quotations/init")
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}