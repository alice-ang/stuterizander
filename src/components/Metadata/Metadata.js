import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';
import styled from 'styled-components';
import { FaMapPin } from 'react-icons/fa';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

const Meta = styled.ul({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: 'grey',
  listStyle: 'none',
  padding: 0,
  margin: '0 -0.8em',

  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  '& > li': {
    margin: '0.4em 0.8em 0px 0.8em',
  },

  p: {
    margin: 0,
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      color: 'tomato',
    },
  },
});

const Author = styled.li({
  a: {
    marginLeft: '0.2em',
  },

  address: {
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'normal',
  },

  img: {
    width: '1.4em',
    height: 'auto',
    borderRadius: ' 50%',
    marginRight: '0.5em',
  },
});

const Categories = styled.li({
  display: 'inline-block',

  '&:after': {
    content: ', ',
    marginRight: '0.4em',
  },

  '&:last-child': {
    '&:after': {
      content: 'none',
    },
  },
});

const Sticky = styled.li({
  color: 'grey',
});

const Metadata = ({ author, date, categories, options = DEFAULT_METADATA_OPTIONS, isSticky = false }) => {
  const { compactCategories } = options;

  return (
    <Meta>
      {author && (
        <Author>
          <address>
            {author.avatar && (
              <img
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )}
            Av{' '}
            <Link href={authorPathByName(author.name)}>
              <a rel="author">{author.name}</a>
            </Link>
          </address>
        </Author>
      )}
      {date && (
        <li>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <Categories>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Categories>
      )}
      {isSticky && (
        <Sticky>
          <FaMapPin aria-label="Sticky Post" />
        </Sticky>
      )}
    </Meta>
  );
};

export default Metadata;
