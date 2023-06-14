import { useStaticQuery } from 'gatsby';
import get from 'lodash/get';
import React from 'react';

import ArticlePreview from '../components/article-preview';
import Hero from '../components/hero';
import Layout from '../components/layout';
import homeQuery from '../graphql/queries/home';

class RootIndex extends React.Component {
  state = {
    data: {},
  };

  componentDidMount() {
    console.log('Query: ', homeQuery);
    const data = {}//useStaticQuery(homeQuery);

    console.log('Data: ', data);
    this.setState({ data });
  }

  render() {
    const posts = get(this.state, 'data.allContentfulBlogPost.nodes', []);
    const [author] = get(this.state, 'data.allContentfulPerson.nodes', [{}]);

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

export default RootIndex;
