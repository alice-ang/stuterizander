import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';
import { FaMapPin } from 'react-icons/fa';
import styled from 'styled-components';
import { Breakpoints, theme } from 'styles';

const PostCardWrapper = styled.div({
  position: 'relative',
  padding: '1.2em',
  color: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  backgroundColor: theme.brand.light,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  borderRadius: 4,

  '& > a': {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    width: 'fit-content',
    '&:hover': {
      h3: {
        color: 'tomato',
      },
    },
  },
});

const PostCardStickyWrapper = styled.div({
  border: 'solid 0.02em grey',
  borderRadius: '1em',

  svg: {
    position: 'absolute',
    top: '1.2em',
    right: '1em',
    color: 'grey',
  },
});

const CardTitle = styled.h3({
  margin: 0,
});

const CardImage = styled.img({
  float: 'right',
  padding: 0,
  [Breakpoints.Medium]: {
    padding: '0px 0px 10px 10px',
  },
});

const CardContent = styled.div({
  margin: 0,

  p: {
    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const StyledMetadata = styled(Metadata)({
  margin: '-0.8em -0.8em 0.4em',
});

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;
  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  return (
    <>
      {isSticky ? (
        <PostCardStickyWrapper>
          {isSticky && <FaMapPin aria-label="Sticky Post" />}
          <Link href={postPathBySlug(slug)}>
            <a>
              <CardTitle
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </a>
          </Link>
          <StyledMetadata {...metadata} />
          {excerpt && (
            <CardContent
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
          )}
        </PostCardStickyWrapper>
      ) : (
        <PostCardWrapper>
          <Link href={postPathBySlug(slug)}>
            <a>
              <CardTitle
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </a>
          </Link>
          {featuredImage && (
            <CardImage
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
          <StyledMetadata {...metadata} />
          {excerpt && (
            <CardContent
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
          )}
        </PostCardWrapper>
      )}
    </>
  );
};

export default PostCard;
