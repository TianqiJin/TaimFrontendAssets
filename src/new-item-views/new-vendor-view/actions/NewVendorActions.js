import Reflux from 'reflux';

const NewVendorActions = Reflux.createActions(
    [
        "updateFirstName",
        "updateLastName",
        "updateEmail",
        "updatePhoneNumber",
        "updateUserType",
        "getAllUserTypes",
        "initNewVendor",
        "saveNewVendor"
    ]
);

export default NewVendorActions;