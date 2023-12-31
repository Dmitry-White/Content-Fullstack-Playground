import React from 'react';

import { TagsProps } from '../core/propTypes';

import * as styles from './tags.module.css';

const renderTag = (tag) => (
  <div key={tag} className={styles.tag}>
    {tag}
  </div>
);

const Tags = ({ tags }) => {
  const tagList = tags.map(renderTag);
  return <small className={styles.tags}>{tagList}</small>;
};

Tags.propTypes = {
  tags: TagsProps,
};

export default Tags;
