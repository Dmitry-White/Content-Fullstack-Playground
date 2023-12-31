import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import ArticlePreview from '../components/article-preview';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { PostProps } from '../core/propTypes';

class BlogIndex extends React.Component {
  render() {
    const posts = get(this.props, 'data.allContentfulBlogPost.nodes', []);

    return (
      <Layout location={this.props.location}>
        <Seo title="Blog" />
        <Hero title="Blog" />
        <ArticlePreview posts={posts} />
      </Layout>
    );
  }
}

BlogIndex.propTypes = {
  posts: PropTypes.arrayOf(PostProps),
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query BlogIndex {
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        ...BlogIndexFields
      }
    }
  }
`;

export default BlogIndex;
