import Link from 'next/link';
import styled, { css } from 'styled-components';
import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import { Breakpoints } from 'styles';

import Section from 'components/Section';
import Container from 'components/Container';

const FooterWrapper = styled.footer({
  width: '100%',
  borderTop: '1px solid grey',
});

const FooterMenu = styled(Section)({
  margin: ' 2rem 0',

  ul: {
    listStyle: 'none',
    padding: 0,
  },
});

const FooterMenuColumns = styled.ul({
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  margin: ' 0 -2em',

  [Breakpoints.Small]: {
    justifyContent: 'center',
  },

  '& > li': {
    maxWidth: '15em',
    margin: '2em',
  },
});

const getMenuTitleStyling = () => css`
  display: inline-block;
  color: $color-gray-800;
  text-decoration: none;
  margin-bottom: 1.4em;
  margin-top: 0;
`;

const FooterMenuTitle = styled.a({
  ...getMenuTitleStyling(),
});

const FooterMenuPTitle = styled.p({
  ...getMenuTitleStyling(),
});

const FooterMenuItems = styled.ul({
  li: {
    marginBottom: '1em',

    '&:last-child': {
      marginBottom: 0,
    },
  },

  a: {
    display: 'block',
    overflow: 'hidden',
    color: 'grey',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: 'tomato',
      textDecoration: 'underline',
    },
  },
});

const Legal = styled(Section)({
  color: 'white',
  backgroundColor: 'grey',
  padding: '0.8rem 0',
  margin: 0,

  p: {
    fontSize: '0.9em',
    textAlign: 'center',
    margin: 0,
  },
});

const Footer = () => {
  const { metadata = {}, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  return (
    <FooterWrapper>
      {hasMenu && (
        <FooterMenu>
          <Container>
            <FooterMenuColumns>
              {hasRecentPosts && (
                <li>
                  <Link href="/posts/" passHref>
                    <FooterMenuTitle>
                      <strong>Recent Posts</strong>
                    </FooterMenuTitle>
                  </Link>
                  <FooterMenuItems>
                    {recentPosts.map((post) => {
                      const { id, slug, title } = post;
                      return (
                        <li key={id}>
                          <Link href={postPathBySlug(slug)} passHref>
                            <a>{title}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </FooterMenuItems>
                </li>
              )}
              {hasRecentCategories && (
                <li>
                  <Link href="/categories/" passHref>
                    <FooterMenuTitle>
                      <strong>Categories</strong>
                    </FooterMenuTitle>
                  </Link>
                  <FooterMenuItems>
                    {categories.map((category) => {
                      const { id, slug, name } = category;
                      return (
                        <li key={id}>
                          <Link href={categoryPathBySlug(slug)} passHref>
                            <a>{name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </FooterMenuItems>
                </li>
              )}
              <li>
                <FooterMenuPTitle>
                  <strong>More</strong>
                </FooterMenuPTitle>
                <FooterMenuItems>
                  <li>
                    <a href="/feed.xml">RSS</a>
                  </li>
                  <li>
                    <a href="/sitemap.xml">Sitemap</a>
                  </li>
                </FooterMenuItems>
              </li>
            </FooterMenuColumns>
          </Container>
        </FooterMenu>
      )}

      <Legal>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title}
          </p>
        </Container>
      </Legal>
    </FooterWrapper>
  );
};

export default Footer;
