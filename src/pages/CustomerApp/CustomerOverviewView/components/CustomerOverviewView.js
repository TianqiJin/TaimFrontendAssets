import React from "react";
import _ from "lodash";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import BlockUi from "react-block-ui";
import {Wrapper} from "../../../../components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import CustomerService from "../../../../services/CustomerService";
import {Card, TableCell, Typography, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {Link} from "react-router-dom";

const styles = theme => ({
    appBar: {
        marginBottom: theme.spacing(3),
        boxShadow: 'none'
    },
    iconButton: {
        marginLeft: theme.spacing(1),
    }
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class CustomerOverviewView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            processing: false
        };

        this.customerService = new CustomerService();
    }

    componentDidMount() {
        this.setState({
            processing: true
        });

        this.customerService.getAllCustomers()
            .then(result => {
                this.setState({
                    customerList: result.data,
                    processing: false
                })
            }).catch(error => {
                this.setState({
                    processing: false,
                    error: true
                })
        })
    }

    createTableData() {
        const {classes} = this.props;

        const customerDetailLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
        return _.map(this.state.customerList, (customer, index) => {
            return <TableRow key={customer.id}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell>{customer.firstName + customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.userType}</TableCell>
                <TableCell>{customer.userClass}</TableCell>
                <TableCell>
                    <Button component={customerDetailLink} color={'primary'} variant={'contained'} size={'small'} to={"/customers/" + customer.id}>
                        View
                        <OpenInNewIcon className={classes.iconButton} fontSize={'small'}/>
                    </Button>
                </TableCell>
            </TableRow>
        });
    };

    createAlertMessage() {
        // return this.state.error && <Alert type={'danger'} content={'Unable to load customers. Something went wrong.'}/>
    };

    createCustomerTableView() {
        const { classes } = this.props;

        return <div>
            <AppBar position="static" color={"inherit"} className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="flexSpacer">Customer Overview</Typography>
                    <Button variant="contained" color="secondary" aria-label="Add" href={"/customers/new"}>
                        Create New Customer
                    </Button>
                </Toolbar>
            </AppBar>

            <Card>
                <CardContent>
                    <Grid container justify={'center'} >
                        <Grid item sm={12}>
                            <Table size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>#</CustomTableCell>
                                        <CustomTableCell>Name</CustomTableCell>
                                        <CustomTableCell>Phone</CustomTableCell>
                                        <CustomTableCell>Email</CustomTableCell>
                                        <CustomTableCell>Type</CustomTableCell>
                                        <CustomTableCell>Customer Class</CustomTableCell>
                                        <CustomTableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.createTableData()}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>;
    }

    render() {
        return <Wrapper>
            <BlockUi tag={"div"} blocking={this.state.processing}>
                {this.createAlertMessage()}
                {this.createCustomerTableView()}
            </BlockUi>
        </Wrapper>
    }
}

export default withStyles(styles)(CustomerOverviewView)
