import { Link } from 'gatsby';
import React from 'react';

import * as styles from './navigation.module.css';

const ROUTES = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Blog',
    url: '/blog/',
  },
];

const renderNavigationItem = ({ name, url }) => (
  <li className={styles.navigationItem}>
    <Link to={url} activeClassName="active">
      {name}
    </Link>
  </li>
);

const Navigation = () => {
  const navigationItems = ROUTES.map(renderNavigationItem);

  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink}>
        <span className={styles.logo} />
        <span className={styles.navigationItem}>Gatsby Starter Contentful</span>
      </Link>
      <ul className={styles.navigation}>{navigationItems}</ul>
    </nav>
  );
};

export default Navigation;
