import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {withStyles} from "@material-ui/core";
import NewProductActions from "../actions/NewProductActions";

const styles = theme => ({
    subtitle: {
        marginBottom: theme.spacing.unit *3
    }
});

class ProductInventoryInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditTotalNumber = (event) => {
        NewProductActions.updateTotalNumber(event.target.value);
    };

    onEditTotalVirtualNumber = (event) => {
        NewProductActions.updateTotalVirtualNumber(event.target.value);
    };

    render() {

        const {classes} = this.props;

        return <React.Fragment>
            <Typography variant="h6" className={classes.subtitle}>
                Inventory Information
            </Typography>

            <Grid container spacing={3} direction="row">
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.product.totalNumber}
                               id="total-number"
                               label="Total Number"
                               step="any"
                               onChange={this.onEditTotalNumber}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.product.totalNumberVirtual}
                               id="total-number-virtual"
                               label="Total Number Virtual"
                               step="any"
                               onChange={this.onEditTotalVirtualNumber}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(ProductInventoryInformation);