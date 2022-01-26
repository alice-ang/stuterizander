import Link from 'next/link';
import styled from 'styled-components';

const Crumbs = styled.ul({
  display: 'flex',
  listStyle: 'none',
  paddingLeft: 0,
  margin: '0 0 2em',

  li: {
    marginRight: '0.5em',

    '&:after': {
      content: '/',
      marginLeft: '0.5em',
    },

    '&:last-child': {
      '&:after': {
        content: 'none',
      },
    },
  },
  a: {
    color: 'grey',
    textDecoration: 'none',

    '&:hover': {
      color: 'tomato',
      textDecoration: 'underline',
    },
  },
});

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <Crumbs>
      {breadcrumbs.map(({ id, title, uri }) => {
        return (
          <li key={id}>
            {!uri && title}
            {uri && (
              <Link href={uri}>
                <a>{title}</a>
              </Link>
            )}
          </li>
        );
      })}
    </Crumbs>
  );
};

export default Breadcrumbs;
