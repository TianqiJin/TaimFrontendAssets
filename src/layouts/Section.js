import React from 'react';

export default class Section extends React.Component{

    render() {
        return (
            <section className="row">
                {this.props.children}
            </section>
        );
    }
}