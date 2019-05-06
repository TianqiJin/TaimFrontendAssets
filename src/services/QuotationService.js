import axios from 'axios';

export default class QuotationService {

    initNewQuotation() {
        return axios.get("http://localhost:8000/quotations?action=init")
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    saveQuotation(createQuotationInput) {
        return axios.post("http://localhost:8000/quotations?action=save", JSON.stringify(createQuotationInput),
            {
                headers: {
                    'Content-Type': 'application/json'
                }})
            .then(response => response.data)
            .catch(error => console.log(error));
    };
}