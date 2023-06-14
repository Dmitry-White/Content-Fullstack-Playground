import { useStaticQuery } from 'gatsby';
import get from 'lodash/get';
import React from 'react';

import ArticlePreview from '../components/article-preview';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Seo from '../components/seo';
import blogIndexQuery from '../graphql/queries/blogIndex';

class BlogIndex extends React.Component {
  state = {
    data: {},
  };

  componentDidMount() {
    const data = {} // useStaticQuery(blogIndexQuery);

    this.setState({ data });
  }

  render() {
    const posts = get(this.state, 'data.allContentfulBlogPost.nodes', []);

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
