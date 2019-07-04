import Reflux from 'reflux';

const NewVendorActions = Reflux.createActions(
    [
        "updateFirstName",
        "updateLastName",
        "updateEmail",
        "updatePhoneNumber",
        "updateUserType",
        "updateStoreVendor",
        "saveNewVendor"
    ]
);

export default NewVendorActions;