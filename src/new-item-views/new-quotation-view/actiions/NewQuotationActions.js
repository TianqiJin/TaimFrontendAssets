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
    'removeQuotationItem'
]);

export default NewQuotationActions;