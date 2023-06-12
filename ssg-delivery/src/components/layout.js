import React from 'react';

import './variables.css';
import './global.css';
import Footer from './footer';
import Navigation from './navigation';
import Seo from './seo';

class Template extends React.Component {
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

export default Template;
