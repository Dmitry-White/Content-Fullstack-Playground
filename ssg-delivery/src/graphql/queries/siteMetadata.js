import { graphql } from 'gatsby';

const query = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default query;
