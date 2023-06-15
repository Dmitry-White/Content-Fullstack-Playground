import { graphql } from 'gatsby';

const contentfulPersonQuery = graphql`
  fragment PersonFields on ContentfulPerson {
    name
    shortBio {
      raw
    }
    title
    heroImage: image {
      gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
    }
  }
`;

const blogPostQuery = graphql`
  fragment HomeFields on ContentfulBlogPost {
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

export { contentfulPersonQuery, blogPostQuery };
