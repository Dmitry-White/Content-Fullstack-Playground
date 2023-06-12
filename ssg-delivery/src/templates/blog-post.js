import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import readingTime from 'reading-time';

import Seo from '../components/seo';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Tags from '../components/tags';
import * as styles from './blog-post.module.css';

const Content = ({ previous, next, post }) => {
  const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw));
  const { minutes: timeToRead } = readingTime(plainTextBody);

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target;
        return <GatsbyImage image={getImage(gatsbyImage)} alt={description} />;
      },
    },
  };

  return (
    <div className={styles.container}>
      <span className={styles.meta}>
        {post.author?.name} &middot;{' '}
        <time dateTime={post.rawDate}>{post.publishDate}</time> – {timeToRead}{' '}
        minute read
      </span>
      <div className={styles.article}>
        <div className={styles.body}>
          {post.body?.raw && renderRichText(post.body, options)}
        </div>
        <Tags tags={post.tags} />
        {(previous || next) && (
          <nav>
            <ul className={styles.articleNavigation}>
              {previous && (
                <li>
                  <Link to={`/blog/${previous.slug}`} rel="prev">
                    ← {previous.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <Link to={`/blog/${next.slug}`} rel="next">
                    {next.title} →
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost', {});
    const previous = get(this.props, 'data.previous', {});
    const next = get(this.props, 'data.next', {});

    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw),
    );

    return (
      <Layout location={this.props.location}>
        <Seo
          title={post.title}
          description={plainTextDescription}
          image={`http:${post.heroImage.resize.src}`}
        />
        <Hero
          image={post.heroImage?.gatsbyImage}
          title={post.title}
          content={post.description}
        />
        <Content previous={previous} next={next} post={post} />
      </Layout>
    );
  }
}

export default BlogPostTemplate;
