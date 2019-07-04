import axios from 'axios';

export default class QuotationService {

    initNewQuotation() {
        return axios.get("http://localhost:8000/quotations?action=init");
    }

    saveQuotation(createQuotationInput) {
        return axios.post("http://localhost:8000/quotations?action=save", JSON.stringify(createQuotationInput),
            {
                headers: {
                    'Content-Type': 'application/json'
                }});
    };

    getQuotationOverviewByCustomerId(customerId) {
        return axios.get("http://localhost:8000/quotations?action=getByCustomerId&customerId=" + customerId);
    }

    getAllQuotations() {
        return axios.get("http://localhost:8000/quotations?action=getAll");
    }

    getQuotationByQuotationId(quotationId) {
        return axios.get("http://localhost:8000/quotations?action=getQuotationDetailByQuotationId&quotationId=" + quotationId);
    }
}