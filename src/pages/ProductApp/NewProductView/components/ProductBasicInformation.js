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

class ProductBasicInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditSku = (event) => {
        NewProductActions.updateSku(event.target.value);
    };

    onEditDisplayName = (event) => {
        NewProductActions.updateDisplayName(event.target.value);
    };

    onEditTexture = (event) => {
        NewProductActions.updateTexture(event.target.value);
    };

    onEditColor = (event) => {
        NewProductActions.updateColor(event.target.value);
    };

    onEditUnitPrice = (event) => {
        NewProductActions.updateUnitPrice(event.target.value);
    };


    render() {

        const {classes} = this.props;

        return <React.Fragment>
            <Typography variant="h6" className={classes.subtitle}>
                Basic Information
            </Typography>

            <Grid container spacing={3} direction="row">
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.product.sku}
                               id="sku"
                               label="SKU"
                               onChange={this.onEditSku}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField required
                               value={this.props.product.displayName}
                               id="display-name"
                               label="Display Name"
                               onChange={this.onEditDisplayName}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField id="texture"
                               label="Texture"
                               value={this.props.product.texture}
                               onChange={this.onEditTexture}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={6}>
                    <TextField id="color"
                               label="Color"
                               value={this.props.product.color}
                               onChange={this.onEditColor}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={12}>
                    <TextField required
                               type="number"
                               id="unit-price"
                               label="Unit Price"
                               value={this.props.product.unitPrice}
                               onChange={this.onEditUnitPrice}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(ProductBasicInformation);