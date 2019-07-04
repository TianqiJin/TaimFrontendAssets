import React from "react";
import NewCustomerActions from "../actions/NewCustomerActions";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    subtitle: {
        marginBottom: theme.spacing.unit *3
    }
});

class CustomerContactInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditEmail = (event) => {
        NewCustomerActions.updateEmail(event.target.value);
    };

    onEditPhoneNumber = (event) => {
        NewCustomerActions.updatePhoneNumber(event.target.value);
    };

    render() {
        const {classes} = this.props;

        return <React.Fragment>
            <Typography variant="h6" className={classes.subtitle}>
                Contact Information
            </Typography>

            <Grid container spacing={2} justify={'center'} direction="row">
                <Grid item sm={6}>
                    <TextField value={this.props.customer.email}
                               onChange={this.onEditEmail}
                               type="email"
                               label="Email"
                               id="email"
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField value={this.props.customer.phone}
                               onChange={this.onEditPhoneNumber}
                               label="Phone"
                               id="phone"
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
            </Grid>
        </React.Fragment>
    }

}

export default withStyles(styles)(CustomerContactInformation);