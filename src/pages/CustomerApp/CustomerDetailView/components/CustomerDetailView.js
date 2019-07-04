import React from 'react';
import CustomerDetailStore from "../stores/CustomerDetailStore";
import CustomerDetailActions from "../actions/CustomerDetailActions";
import CustomerQuotations from "./CustomerQuotations";
import Toolbar from "@material-ui/core/Toolbar";
import {Typography, withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";
import Wrapper from "../../../../components/Wrapper/Wrapper";

const QUOTATION_TAB = "Quotations";
const INVOICE_TAB = "Invoices";
const DELIVERY_TAB = "Deliveries";
const TODO_TAB = "TO-DO's";
const NOTE_TAB = "Notes";

const styles = theme => ({
    appBar: {
        marginBottom: theme.spacing(3),
        boxShadow: 'none'
    },
    iconButton: {
        marginLeft: theme.spacing(1),
    }
});

function TabContainer(props) {
    return (
        <div style={{ padding: 8 * 3 }}>
            {props.children}
        </div>
    );
}

class CustomerDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerDetail: {},
            activeCustomerDetailTab: 0
        };
    }

    componentDidMount() {
        this.unsubscribe_store = CustomerDetailStore.listen(this.onStoreUpdate);
        CustomerDetailActions.getCustomerDetailByCustomerId(this.props.match.params.customerId);
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate = (data)  => {
        this.setState({
            customerDetail: data.customerDetail
        });
    };

    toggleCustomerDetailTabs = (event,tab) => {
        if (this.state.activeCustomerDetailTab !== tab) {
            this.setState({
                activeCustomerDetailTab: tab
            });
        }
    };

    isReadyToRenderCustomerDetails() {
        return this.state.customerDetail.id;
    }

    render() {
        const {classes} = this.props;

        let customerQuotationsTabContent = this.isReadyToRenderCustomerDetails() &&
            <CustomerQuotations customerId={this.state.customerDetail.id}/>;

        return <Wrapper>
            <AppBar position="static" color={"white"} className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="flexSpacer">Customer Information</Typography>
                </Toolbar>
            </AppBar>

            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>First Name</TableCell>
                                        <TableCell>{this.state.customerDetail.firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>Last Name</TableCell>
                                        <TableCell>{this.state.customerDetail.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>Email</TableCell>
                                        <TableCell>{this.state.customerDetail.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>Contact Phone</TableCell>
                                        <TableCell>{this.state.customerDetail.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>PST Number</TableCell>
                                        <TableCell>{this.state.customerDetail.pstNumber}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid item sm={4}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>User Type</TableCell>
                                        <TableCell>{this.state.customerDetail.userType}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>Customer Class</TableCell>
                                        <TableCell>{this.state.customerDetail.customerClass}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={'text-bold-700'}>Store Credit</TableCell>
                                        <TableCell>{this.state.customerDetail.storeCredit}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container className={'mt-3'}>
                        <Grid item sm={12}>
                            <AppBar position="static" color={"default"} className={classes.appBar}>
                                <Tabs value={this.state.activeCustomerDetailTab} onChange={this.toggleCustomerDetailTabs}>
                                    <Tab label={QUOTATION_TAB}/>
                                    <Tab label={INVOICE_TAB}/>
                                    <Tab label={DELIVERY_TAB}/>
                                    <Tab label={TODO_TAB}/>
                                    <Tab label={NOTE_TAB}/>
                                </Tabs>
                            </AppBar>
                            {this.state.activeCustomerDetailTab === 0 && <TabContainer>{customerQuotationsTabContent}</TabContainer> }
                            {this.state.activeCustomerDetailTab === 1 && <TabContainer/>}
                            {this.state.activeCustomerDetailTab === 2 && <TabContainer/>}
                            {this.state.activeCustomerDetailTab === 3 && <TabContainer/>}
                            {this.state.activeCustomerDetailTab === 4 && <TabContainer/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Wrapper>
    }
}

export default withStyles(styles)(CustomerDetailView);

