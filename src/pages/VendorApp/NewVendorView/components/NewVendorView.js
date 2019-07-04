import React from 'react';
import NewVendorStore from "../stores/NewVendorStore";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Typography, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Wrapper} from "../../../../components";
import UserTypeService from "../../../../services/UserTypeService";
import VendorCreationModel from "../../Model/VendorCreationModel";
import NewVendorActions from "../actions/NewVendorActions";
import HorizontalVendorCreationStepper from "./HorizontalVendorCreationStepper";

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

class NewVendorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vendor: new VendorCreationModel(),
            userTypes: [],
            processing: false
        };
        this.userTypeService = new UserTypeService();
    }

    componentDidMount() {

        this.unsubscribe_store = NewVendorStore.listen(this.onStoreUpdate.bind(this));
        NewVendorActions.updateStoreVendor(this.state.vendor);

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

    onStoreUpdate(vendor) {
        this.setState({
            vendor: vendor,
            processing: false
        });
    }

    render() {
        const {classes} = this.props;

        return <Wrapper>
            <BlockUi tag={"div"} blocking={this.state.processing}>
                <AppBar position="static" color={"default"} className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Create New Vendor</Typography>
                    </Toolbar>
                </AppBar>

                <Paper className={classes.paper}>
                    <HorizontalVendorCreationStepper userTypes={this.state.userTypes}
                                                     vendor={this.state.vendor}/>
                </Paper>
            </BlockUi>
        </Wrapper>

    }
}

export default withStyles(styles)(NewVendorView);