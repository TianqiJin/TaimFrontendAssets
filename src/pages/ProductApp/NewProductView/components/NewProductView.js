import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import NewProductStore from "../stores/NewProductStore";
import {Wrapper} from "../../../../components";
import {Typography, withStyles} from "@material-ui/core";
import ProductCreationModel from "../../Model/ProductCreationModel";
import NewProductActions from "../actions/NewProductActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import HorizontalProductCreationStepper from "./HorizontalProductCreationStepper";

const styles = theme => ({
    appBar: {
        marginBottom: theme.spacing(3),
        boxShadow: 'none'
    },
    paper: {
        marginLeft: theme.spacing(9),
        marginRight: theme.spacing(9),
        padding: theme.spacing(3)
    },
});

class NewProductView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: new ProductCreationModel(),
            processing: false
        };
    }

    componentDidMount() {
        this.unsubscribe_store = NewProductStore.listen(this.onStoreUpdate.bind(this));
        NewProductActions.updateStoreProduct(this.state.product);
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(product) {
        this.setState({
            product: product,
            processing: false
        });
    }

    render() {
        const {classes} = this.props;

        return <Wrapper>
            <BlockUi tag={"div"} blocking={this.state.processing}>
                <AppBar position="static" color={"default"} className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className="flexSpacer">Create New Product</Typography>
                    </Toolbar>
                </AppBar>

                <Paper className={classes.paper}>
                    <HorizontalProductCreationStepper product={this.state.product}/>
                </Paper>
            </BlockUi>
        </Wrapper>
    }
}

export default withStyles(styles)(NewProductView);