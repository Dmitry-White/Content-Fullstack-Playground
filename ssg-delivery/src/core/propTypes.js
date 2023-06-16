import PropTypes from 'prop-types';

const TagsProps = PropTypes.arrayOf(PropTypes.string);

const ImageProp = PropTypes.shape({
  gatsbyImage: PropTypes.object,
});

const MetaProps = PropTypes.shape({
  name: PropTypes.string,
  content: PropTypes.string,
});

const ContentProps = PropTypes.shape({
  raw: PropTypes.string,
});

const PostProps = {
  title: PropTypes.string,
  slug: PropTypes.string,
  link: PropTypes.string,
  publishDate: PropTypes.string,
  heroImage: ImageProp,
  description: ContentProps,
  tags: TagsProps,
};

export { TagsProps, ImageProp, MetaProps, ContentProps, PostProps };
