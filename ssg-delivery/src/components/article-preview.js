import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';

import * as styles from './article-preview.module.css';
import Container from './container';
import Tags from './tags';

const renderPost = (post) => (
  <li key={post.slug}>
    <Link to={`/blog/${post.slug}`} className={styles.link}>
      <GatsbyImage alt="" image={post.heroImage.gatsbyImage} />
      <h2 className={styles.title}>{post.title}</h2>
    </Link>
    <div>{post.description?.raw && renderRichText(post.description)}</div>
    <div className={styles.meta}>
      <small className="meta">{post.publishDate}</small>
      {post.tags?.length > 0 && <Tags tags={post.tags} />}
    </div>
  </li>
);

const ArticlePreview = ({ posts }) => {
  if (!posts) return null;
  if (!Array.isArray(posts)) return null;

  const articles = posts.map(renderPost);

  return (
    <Container>
      <ul className={styles.articleList}>{articles}</ul>
    </Container>
  );
};

export default ArticlePreview;
