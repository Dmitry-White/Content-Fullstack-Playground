import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import PropTypes from 'prop-types';
import React from 'react';

import { ContentProps, ImageProp } from '../core/propTypes';

import * as styles from './hero.module.css';

const Hero = ({ image, title, content }) => (
  <div className={styles.hero}>
    {image && (
      <GatsbyImage className={styles.image} alt={title} image={image} />
    )}
    <div className={styles.details}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
    </div>
  </div>
);

Hero.propTypes = {
  image: ImageProp,
  title: PropTypes.string,
  content: ContentProps,
};

export default Hero;
