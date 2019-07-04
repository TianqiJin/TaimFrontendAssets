import React from 'react';
import NewCustomerStore from "../stores/NewCustomerStore";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Typography, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Wrapper} from "../../../../components";
import HorizontalCustomerCreationStepper from "./HorizontalCustomerCreationStepper";
import CustomerClassService from "../../../../services/CustomerClassService";
import UserTypeService from "../../../../services/UserTypeService";
import CustomerCreationModel from "../../Model/CustomerCreationModel";
import NewCustomerActions from "../actions/NewCustomerActions";

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

class NewCustomerView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: new CustomerCreationModel(),
            customerClasses: [],
            userTypes: [],
            processing: false
        };
        this.customerClassService = new CustomerClassService();
        this.userTypeService = new UserTypeService();
    }

    componentDidMount() {

        this.unsubscribe_store = NewCustomerStore.listen(this.onStoreUpdate.bind(this));
        NewCustomerActions.updateStoreCustomer(this.state.customer);

        this.customerClassService.getAllCustomerClasses()
            .then(result => {
                this.setState({
                    customerClasses: result.data
                });
            });
        this.userTypeService.getAllUserTypes()
            .then(result => {
                this.setState({
                    userTypes: result.data
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(customer) {
        this.setState({
            customer: customer,
            processing: false
        });
    }

    render() {
        const {classes} = this.props;

        return <Wrapper>
            <BlockUi tag={"div"} blocking={this.state.processing}>
                <AppBar position="static" color={"default"} className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Create New Customer</Typography>
                    </Toolbar>
                </AppBar>

                <Paper className={classes.paper}>
                    <HorizontalCustomerCreationStepper userTypes={this.state.userTypes}
                                                       customerClasses={this.state.customerClasses}
                                                       customer={this.state.customer}/>
                </Paper>
            </BlockUi>
        </Wrapper>

    }
}

export default withStyles(styles)(NewCustomerView);