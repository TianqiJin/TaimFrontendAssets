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
import ProductService from "../../../../services/ProductService";

const styles = theme => ({
    appBar: {
        marginBottom: theme.spacing(3),
        boxShadow: 'none'
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

class ProductOverviewView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            processing: false
        };

        this.productService = new ProductService();
    }

    componentDidMount() {
        this.setState({
            processing: true
        });

        this.productService.getAllProducts()
            .then(result => {
                this.setState({
                    productList: result.data,
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
        return _.map(this.state.productList, (product, index) => {
            return <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.displayName}</TableCell>
                <TableCell>{product.texture}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.totalNum}</TableCell>
                <TableCell>{product.totalNumVirtual}</TableCell>
            </TableRow>
        });
    };

    createAlertMessage() {
        // return this.state.error && <Alert type={'danger'} content={'Unable to load customers. Something went wrong.'}/>
    };

    createProductTableView() {
        const { classes } = this.props;

        return <React.Fragment>
            <AppBar position="static" color={"inherit"} className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="flexSpacer">Product Overview</Typography>
                    <Button variant="contained" color="secondary" aria-label="Add" href={"/product-app/products/new"}>
                        Create New Product
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
                                        <CustomTableCell>SKU</CustomTableCell>
                                        <CustomTableCell>Display Name</CustomTableCell>

                                        <CustomTableCell>Texture</CustomTableCell>
                                        <CustomTableCell>Color</CustomTableCell>
                                        <CustomTableCell>Total Number</CustomTableCell>
                                        <CustomTableCell>Total Number Virtual</CustomTableCell>
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
                {this.createProductTableView()}
            </BlockUi>
        </Wrapper>
    }
}

export default withStyles(styles)(ProductOverviewView)
