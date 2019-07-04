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

class ProductShippingInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    onEditLength = (event) => {
        NewProductActions.updateLength(event.target.value);
    };

    onEditWidth = (event) => {
        NewProductActions.updateWidth(event.target.value);
    };

    onEditHeight = (event) => {
        NewProductActions.updateHeight(event.target.value);
    };

    onEditPiecesPerBox = (event) => {
        NewProductActions.updatePiecesPerBox(event.target.value);
    };

    render() {

        const {classes} = this.props;

        return <React.Fragment>
            <Typography variant="h6" className={classes.subtitle}>
                Shipping Information
            </Typography>

            <Grid container spacing={3} direction="row">
                <Grid item sm={4}>
                    <TextField required
                               value={this.props.product.length}
                               type="number"
                               id="length"
                               label="Length"
                               step="any"
                               onChange={this.onEditLength}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={4}>
                    <TextField required
                               value={this.props.product.width}
                               type="number"
                               id="width"
                               label="Width"
                               step="any"
                               onChange={this.onEditWidth}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={4}>
                    <TextField required
                               value={this.props.product.height}
                               type="number"
                               id="height"
                               label="Height"
                               step="any"
                               onChange={this.onEditHeight}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
                <Grid item sm={12}>
                    <TextField required
                               value={this.props.product.piecesPerBox}
                               type="number"
                               id="pieces-per-box"
                               label="Pieces Per Box"
                               step="any"
                               onChange={this.onEditPiecesPerBox}
                               variant="outlined"
                               InputLabelProps={{shrink: true}}
                               fullWidth/>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(ProductShippingInformation);