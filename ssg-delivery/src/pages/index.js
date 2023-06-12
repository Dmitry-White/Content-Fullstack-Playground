import get from 'lodash/get';
import React from 'react';

import ArticlePreview from '../components/article-preview';
import Hero from '../components/hero';
import Layout from '../components/layout';

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
