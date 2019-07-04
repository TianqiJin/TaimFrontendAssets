import React, { Component } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { createGenerateClassName, jssPreset } from '@material-ui/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

import AppContext from './AppContext';
import StylesProvider from "@material-ui/styles/StylesProvider";
import {deepOrange} from "@material-ui/core/colors";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

class AppProvider extends Component {
  state = {
    type: 'light',
    direction: 'ltr',
  };

  render() {
    const { direction, type } = this.state;
    const theme = createMuiTheme({
      direction,
      palette: {
        type,
        primary: indigo,
        secondary: deepOrange,
        error: red,

      },
      typography: {
        fontFamily: 'Roboto,"Helvetica Neue",Arial,sans-serif',
        headline: {
          fontSize: '1rem',
        },
        subheading: {
          fontSize: '0.8125rem',
        },
        button: {
          fontWeight: 400,
          textTransform: 'initial'
        }
      },
      shape: {
        borderRadius: 4
      },
      zDepthShadows : ["none"]
    });

    return (
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <AppContext.Provider>
            {this.props.children}
          </AppContext.Provider>
        </MuiThemeProvider>
      </StylesProvider>
    )
  }
}

export default AppProvider;