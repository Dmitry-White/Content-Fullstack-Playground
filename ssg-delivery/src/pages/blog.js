import get from 'lodash/get';
import React from 'react';

import ArticlePreview from '../components/article-preview';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Seo from '../components/seo';

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

export default BlogIndex;
