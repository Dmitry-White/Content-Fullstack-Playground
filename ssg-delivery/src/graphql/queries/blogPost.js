import { graphql } from 'gatsby';

export const query = graphql`
  fragment BlogPostFields on ContentfulBlogPost {
    slug
    title
    author {
      name
    }
    publishDate(formatString: "MMMM Do, YYYY")
    rawDate: publishDate
    heroImage {
      gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
      resize(height: 630, width: 1200) {
        src
      }
    }
    body {
      raw
    }
    tags
    description {
      raw
    }
  }
  fragment IteratePostFields on ContentfulBlogPost {
    slug
    title
  }
`;

export default query;
