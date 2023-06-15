import { graphql } from 'gatsby';

export const query = graphql`
  fragment MetadataFields on Site {
    siteMetadata {
      title
      description
    }
  }
`;

export default query;
