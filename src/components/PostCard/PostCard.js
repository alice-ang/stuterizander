import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';
import { FaMapPin } from 'react-icons/fa';
import styled from 'styled-components';
import { Breakpoints, theme } from 'styles';

const PostCardWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2em',
  color: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  backgroundColor: theme.brand.light,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  borderRadius: 4,
  [Breakpoints.Medium]: {
    flexDirection: 'row',
  },
  '& > a': {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    width: 'fit-content',
  },
});

const PostCardStickyWrapper = styled(PostCardWrapper)({
  boxShadow: 'unset',
  border: 'solid 0.02em grey',
  borderRadius: '1em',
});

const CardTitle = styled.h3({
  margin: 0,
  color: theme.text.neutral,
  '&:hover': {
    color: 'tomato',
  },
});

const CardImageLarge = styled.img({
  padding: 0,
  display: 'none',
  [Breakpoints.Medium]: {
    display: 'block',
    padding: '0px 0px 10px 10px',
  },
});

const CardImageSmall = styled.img({
  padding: 0,
  display: 'block',
  [Breakpoints.Medium]: {
    display: 'none',
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
  '* > li': {
    margin: 0,
  },
});

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  a: {
    textDecoration: 'none',
  },
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
          {isSticky && (
            <div>
              <FaMapPin aria-label="Sticky Post" color="tomato" size={20} />
            </div>
          )}
          <Column>
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
              <CardImageSmall
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
          </Column>
          {featuredImage && (
            <CardImageLarge
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
        </PostCardStickyWrapper>
      ) : (
        <PostCardWrapper>
          <Column>
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
              <CardImageSmall
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
          </Column>
          {featuredImage && (
            <CardImageLarge
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
        </PostCardWrapper>
      )}
    </>
  );
};

export default PostCard;
