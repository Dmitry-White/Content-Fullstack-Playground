import { useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import siteMetadataQuery from '../graphql/queries/siteMetadata';

const Seo = ({ description = '', lang = 'en', meta = [], title, image }) => {
  const { site } = useStaticQuery(siteMetadataQuery);

  const customMetada = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `image`,
      content: image,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: image,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const htmlAttributes = { lang };

  return (
    <Helmet
      title={title}
      defaultTitle={defaultTitle}
      htmlAttributes={htmlAttributes}
      meta={customMetada.concat(meta)}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
    />
  );
};

export default Seo;
