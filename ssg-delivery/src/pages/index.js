import React from 'react';
import get from 'lodash/get';

import Layout from '../components/layout';
import Hero from '../components/hero';
import ArticlePreview from '../components/article-preview';

class RootIndex extends React.Component {
  render() {
    const posts = get(this.props, 'data.allContentfulBlogPost.nodes', []);
    const [author] = get(this.props, 'data.allContentfulPerson.nodes', [{}]);

    return (
      <Layout location={this.props.location}>
        <Hero
          image={author.heroImage.gatsbyImage}
          title={author.name}
          content={author.shortBio}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    );
  }
}

export default RootIndex;
