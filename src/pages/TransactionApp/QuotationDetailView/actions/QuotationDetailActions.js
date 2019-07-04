import Reflux from 'reflux';

const QuotationDetailActions = Reflux.createActions([
    'updateStoreQuotation',
    'selectCustomer',
    'selectProduct',
    'editQuotationId',
    'editQuotationDate',
    'editQuotationDueDate',
    'editQuotationItemQuantity',
    'editQuotationNote',
    'editQuotationItemNote',
    'removeQuotationItem',
    'editQuotationBillFromAddress',
    'editQuotationBillToAddress',
    'saveQuotation',
    'selectTaxRate',
    'test'
]);

export default QuotationDetailActions;