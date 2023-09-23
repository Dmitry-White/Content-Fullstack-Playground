import { graphql } from 'gatsby';

export const query = graphql`
  fragment BlogIndexFields on ContentfulBlogPost {
    title
    slug
    publishDate(formatString: "MMMM Do, YYYY")
    tags
    heroImage {
      gatsbyImage(
        layout: FULL_WIDTH
        placeholder: BLURRED
        width: 424
        height: 212
      )
    }
    description {
      raw
    }
  }
`;

export default query;
