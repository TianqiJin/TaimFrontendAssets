import Reflux from 'reflux';

const NewCustomerActions = Reflux.createActions(
    [
        "updateFirstName",
        "updateLastName",
        "updateEmail",
        "updatePhoneNumber",
        "updatePstNumber",
        "updateStoreCredit",
        "updateCustomerClass",
        "updateUserType",
        "getAllCustomerClasses",
        "getAllUserTypes",
        "initNewCustomer",
        "saveNewCustomer"
    ]
);

export default NewCustomerActions;