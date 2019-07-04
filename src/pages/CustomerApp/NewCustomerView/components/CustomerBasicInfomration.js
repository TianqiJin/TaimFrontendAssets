import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import NewCustomerActions from "../actions/NewCustomerActions";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    subtitle: {
        marginBottom: theme.spacing.unit *3
    }
});

class CustomerBasicInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditFirstName = (event) => {
        NewCustomerActions.updateFirstName(event.target.value);
    };

    onEditLastName = (event) => {
        NewCustomerActions.updateLastName(event.target.value);
    };

    onEditPstNumber = (event) => {
        NewCustomerActions.updatePstNumber(event.target.value);
    };

    onEditStoreCredit = (event) => {
        NewCustomerActions.updateStoreCredit(event.target.value);
    };

    onChangeUserType = (event) => {
        NewCustomerActions.updateUserType(event.target.value);
    };

    onChangeCustomerClass = (event) => {
        NewCustomerActions.updateCustomerClass(event.target.value);
    };

    render() {

        const {classes} = this.props;

        let userTypeOptions = _.map(this.props.userTypes, (userType) => {
            return <MenuItem key={userType} value={userType}>{userType}</MenuItem>;
        });

        let customerClassesOptions = _.map(this.props.customerClasses, (customerClass) => {
            let displayValue = customerClass.customerClassName + ' (' + customerClass.customerDiscount + '% off)';
            return <MenuItem key={customerClass.id} value={customerClass.customerClassName}>{displayValue}</MenuItem>
        });

        return <React.Fragment>
            <Typography variant="h6" className={classes.subtitle}>
                Basic Information
            </Typography>

            <Grid container spacing={3} justify={'center'} direction="row">
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.customer.firstName}
                               id="first-name"
                               label="First Name"
                               onChange={this.onEditFirstName}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.customer.lastName}
                               id="last-name"
                               label="Last Name"
                               onChange={this.onEditLastName}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField select
                               id="customer-type"
                               label="Customer Type"
                               value={this.props.customer.userType}
                               onChange={this.onChangeUserType}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth>
                        {userTypeOptions}
                    </TextField>
                </Grid>

                <Grid item sm={6}>
                    <TextField select
                               id="customer-class"
                               label="Customer Class"
                               value={this.props.customer.customerClass}
                               onChange={this.onChangeCustomerClass}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth>
                        {customerClassesOptions}
                    </TextField>
                </Grid>

                <Grid item sm={6}>
                    <TextField required
                               value={this.props.customer.pstNumber}
                               id="pst-number"
                               label="PST Number"
                               onChange={this.onEditPstNumber}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.customer.storeCredit}
                               id="store-credit"
                               label="Store Credit"
                               onChange={this.onEditStoreCredit}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(CustomerBasicInformation);