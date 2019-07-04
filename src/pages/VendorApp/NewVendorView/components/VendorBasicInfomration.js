import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import NewVendorActions from "../actions/NewVendorActions";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    subtitle: {
        marginBottom: theme.spacing(3)
    }
});

class VendorBasicInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditFirstName = (event) => {
        NewVendorActions.updateFirstName(event.target.value);
    };

    onEditLastName = (event) => {
        NewVendorActions.updateLastName(event.target.value);
    };

    onChangeUserType = (event) => {
        NewVendorActions.updateUserType(event.target.value);
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

            <Grid container spacing={3} direction="row">
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.vendor.firstName}
                               id="first-name"
                               label="First Name"
                               onChange={this.onEditFirstName}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.vendor.lastName}
                               id="last-name"
                               label="Last Name"
                               onChange={this.onEditLastName}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField select
                               id="vendor-type"
                               label="Vendor Type"
                               value={this.props.vendor.userType}
                               onChange={this.onChangeUserType}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth>
                        {userTypeOptions}
                    </TextField>
                </Grid>

            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(VendorBasicInformation);