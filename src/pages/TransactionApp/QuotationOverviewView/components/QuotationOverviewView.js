import React from "react";
import _ from "lodash";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import BlockUi from "react-block-ui";
import {Wrapper} from "../../../../components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import {Card, TableCell, Typography, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import QuotationService from "../../../../services/QuotationService";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

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

}))(TableCell);

class QuotationOverviewView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            quotationList: [],
            processing: false
        };

        this.quotationService = new QuotationService();
    }

    componentDidMount() {
        this.setState({
            processing: true
        });

        this.quotationService.getAllQuotations()
            .then(result => {
                this.setState({
                    quotationList: result.data,
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
        const { classes } = this.props;
        const quotationDetailLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

        return _.map(this.state.quotationList, (quotation, index) => {
            return <TableRow key={quotation.quotationId}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell>{quotation.quotationId}</TableCell>
                <TableCell> <Moment format={"MMM DD YYYY"}>{quotation.quotationDate}</Moment></TableCell>
                <TableCell><Moment format={"MMM DD YYYY"}>{quotation.dueDate}</Moment></TableCell>
                <TableCell>{quotation.taxTotal}</TableCell>
                <TableCell>{quotation.total}</TableCell>
                <TableCell>{quotation.status}</TableCell>
                <TableCell>
                    <Button component={quotationDetailLink} color={'primary'} variant={'contained'} size={'small'} to={"/transactions/quotations/" + quotation.quotationId}>
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

    createQuotationTable() {
        const { classes } = this.props;

        return <React.Fragment>
            <AppBar position="static" color={"inherit"} className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="flexSpacer">Quotation Overview</Typography>
                    <Button variant="contained" color="secondary" aria-label="Add" href={"/transactions/quotations/new"}>
                        Create New Quotation
                    </Button>
                </Toolbar>
            </AppBar>

            <Card>
                <CardContent>
                    <Grid container justify={'center'}>
                        <Grid item sm={12}>
                            <Table size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>#</CustomTableCell>
                                        <CustomTableCell>Quotation ID</CustomTableCell>
                                        <CustomTableCell>Quotation Date</CustomTableCell>
                                        <CustomTableCell>Due Date</CustomTableCell>
                                        <CustomTableCell>Tax Amount</CustomTableCell>
                                        <CustomTableCell>Amount</CustomTableCell>
                                        <CustomTableCell>Status</CustomTableCell>
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
        </React.Fragment>
    }

    render() {
        return <Wrapper  >
            <BlockUi tag={"div"} blocking={this.state.processing}>
                {this.createAlertMessage()}
                {this.createQuotationTable()}
            </BlockUi>
        </Wrapper>
    }
}

export default withStyles(styles)(QuotationOverviewView)
