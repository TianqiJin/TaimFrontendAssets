import React from 'react';
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';

export default class LinkRenderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer : this.props.value
        }
    }

    render() {
        return<Link component={RouterLink} to={"/customers/" + this.state.customer.id}>
            {this.state.customer.firstName + ' ' + this.state.customer.lastName}
        </Link>
    }


}