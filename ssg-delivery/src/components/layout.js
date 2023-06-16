import PropTypes from 'prop-types';
import React from 'react';

import Footer from './footer';
import Navigation from './navigation';
import Seo from './seo';

import './variables.css';
import './global.css';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <Seo />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
