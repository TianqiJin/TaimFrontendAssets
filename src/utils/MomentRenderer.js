import React from "react";
import Moment from "react-moment";
import moment from 'moment';
import Locale from 'browser-locale';

export default class MomentRenderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date : this.props.value
        }
    }

    render() {
        return <Moment format={"MMM DD YYYY"}>{this.state.date}</Moment>
    }


}