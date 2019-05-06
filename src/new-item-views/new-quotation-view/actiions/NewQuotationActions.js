import Reflux from 'reflux';

const NewQuotationActions = Reflux.createActions([
    'getAllProducts',
    'getAllCustomers',
    'getAllCustomerClass',
    'initQuotation',
    'selectCustomer',
    'selectProduct',
    'editQuotationId',
    'editQuotationDate',
    'editQuotationDueDate',
    'editQuotationItemQuantity',
    'editQuotationNote',
    'editQuotationItemNote',
    'removeQuotationItem',
    'saveQuotation'
]);

export default NewQuotationActions;