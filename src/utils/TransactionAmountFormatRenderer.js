import React from "react";
import NumberFormat from "react-number-format";

export default class TransactionAmountFormatRenderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount : this.props.value
        }
    }

    render() {
        return <NumberFormat value={this.state.amount}
                             displayType={'text'}
                             decimalScale={2}
                             thousandSeparator={true}
                             prefix={'$'}/>
    }


}