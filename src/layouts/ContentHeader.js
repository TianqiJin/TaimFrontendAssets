import React from 'react';
import classNames from 'classnames';
import {Row} from "reactstrap";

export default class ContentHeader extends React.Component{

    render() {
        return (
            <div className={classNames('content-header')}>
                <Row>
                    {this.props.children}
                </Row>
            </div>
        );
    }
}

