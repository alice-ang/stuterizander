import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import { FaMapPin } from 'react-icons/fa';
import styled from 'styled-components';

const PostCardWrapper = styled.div({
  position: 'relative',
  padding: '1.2em',
  color: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',

  '& > a': {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      h3: {
        color: 'tomato',
        textDecoration: 'underline',
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
    fontSize: '1.15em',
    color: 'grey',
  },
});

const CardTitle = styled.h3({
  margin: '0 0 1em 0',
  fontSize: '1.5em',
});

const CardContent = styled.div({
  fontSize: '1.25em',
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
  const { title, excerpt, slug, date, author, categories, isSticky = false } = post;
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
