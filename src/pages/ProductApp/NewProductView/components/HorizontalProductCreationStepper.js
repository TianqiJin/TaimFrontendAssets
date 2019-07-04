import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProductBasicInformation from "./ProductBasicInformation";
import NewProductActions from "../actions/NewProductActions";
import ProductInventoryInformation from "./ProductInventoryInformation";
import ProductShippingInformation from "./ProductShippingInformation";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});



class HorizontalProductCreationStepper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    getSteps() {
        return ['Basic Information', 'Inventory Information', 'Shipping Information'];
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ProductBasicInformation product={this.props.product}/>;
            case 1:
                return <ProductInventoryInformation product={this.props.product}/>;
            case 2:
                return <ProductShippingInformation product={this.props.product}/>;
            default:
                return 'Unknown stepIndex';
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    onSaveNewProduct = (event) => {
        event.preventDefault();
        NewProductActions.saveNewProduct();
    };


    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            {this.getStepContent(activeStep)}
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary"
                                        onClick={activeStep === steps.length - 1 ? this.onSaveNewProduct : this.handleNext }
                                        className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

HorizontalProductCreationStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalProductCreationStepper);
