import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WrapperStyles from '../../styles/Wrapper';

class Wrapper extends Component {
  render() {
    const {classes, children, padding} = this.props;

    return (
        <div className={padding ? classes.root : null}>
          {children}
        </div>
    );
  }
}

Wrapper.prototypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool
};

Wrapper.defaultProps = {
  padding: true
};

export default withStyles(WrapperStyles)(Wrapper);