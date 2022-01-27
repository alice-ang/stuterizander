import Link from 'next/link';
import styled, { css } from 'styled-components';
import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import { Breakpoints, theme } from 'styles';

import Section from 'components/Section';
import Container from 'components/Container';

const FooterWrapper = styled.footer({
  width: '100%',
  paddingTop: '1em',
  backgroundColor: theme.brand.primary,
});

const FooterMenu = styled(Section)({
  ul: {
    listStyle: 'none',
    padding: 0,
  },
});

const FooterMenuColumns = styled.ul({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  flexWrap: 'wrap',

  '& > li': {},

  [Breakpoints.Medium]: {
    justifyContent: 'space-between',
    '& > li': {
      maxWidth: '15em',
      margin: '2em',
    },
  },
});

const getMenuTitleStyling = () => css`
  display: inline-block;
  text-decoration: underline;
  margin-bottom: 1.4em;
  margin-top: 0;
`;

const FooterMenuTitle = styled.a({
  ...getMenuTitleStyling(),
  color: theme.text.light,
});

const FooterMenuPTitle = styled.p({
  ...getMenuTitleStyling(),
  margin: 0,
  color: theme.text.light,
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
    color: theme.text.light,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: 'tomato',
    },
  },
});

const Legal = styled(Section)({
  color: theme.text.light,
  backgroundColor: theme.brand.alternate,
  padding: '0.8rem 0',
  margin: 0,

  p: {
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
        </FooterMenu>
      )}

      <Legal>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title} | Developed by Alice Anglesjö
          </p>
        </Container>
      </Legal>
    </FooterWrapper>
  );
};

export default Footer;
