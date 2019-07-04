import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewCustomerActions from "../stores/NewVendorStore";
import VendorBasicInformation from "./VendorBasicInfomration";
import VendorContactInformation from "./VendorContactInformation";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});



class HorizontalVendorCreationStepper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    getSteps() {
        return ['Basic Information', 'Contact Information'];
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <VendorBasicInformation userTypes={this.props.userTypes}
                                               vendor={this.props.vendor}/>;
            case 1:
                return <VendorContactInformation vendor={this.props.vendor}/>;
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

    onSaveNewCustomer = (event) => {
        event.preventDefault();
        NewCustomerActions.saveNewCustomer();
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
                                        onClick={activeStep === steps.length - 1 ? this.onSaveNewCustomer : this.handleNext }
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

HorizontalVendorCreationStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalVendorCreationStepper);
