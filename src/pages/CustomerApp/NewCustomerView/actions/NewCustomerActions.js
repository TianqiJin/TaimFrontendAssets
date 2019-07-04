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
        "updateStoreCustomer",
        "saveNewCustomer"
    ]
);

export default NewCustomerActions;