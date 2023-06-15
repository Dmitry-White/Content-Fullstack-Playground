import { graphql } from 'gatsby';
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
          image={author.heroImage?.gatsbyImage}
          title={author.name}
          content={author.shortBio}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    );
  }
}

export const query = graphql`
  query Home {
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        ...PersonFields
      }
    }
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        ...HomeFields
      }
    }
  }
`;

export default RootIndex;
