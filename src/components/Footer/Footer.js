import { useState } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import useSite from 'hooks/use-site';
import { categoryPathBySlug } from 'lib/categories';
import { GrInstagram, GrFacebook, GrMail } from 'react-icons/gr';
import { Breakpoints, theme } from 'styles';

import Section from 'components/Section';
import Container from 'components/Container';

const FooterWrapper = styled.footer({
  width: '100%',
  paddingTop: '1em',
  backgroundColor: theme.brand.primary,
});

const FooterMenu = styled(Section)({
  padding: '2em 0px',
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  [Breakpoints.Medium]: {
    padding: '2em',
  },
  [Breakpoints.Large]: {
    maxWidth: '60%',
    margin: '0 auto',
  },
});

const FooterMenuColumns = styled.ul({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
  flexWrap: 'wrap',

  [Breakpoints.Medium]: {
    '& > li': {
      maxWidth: '15em',
    },
  },
});

const getMenuTitleStyling = () => css`
  display: inline-block;
  text-decoration: underline;
  margin-bottom: 1.4em;
  margin-top: 0;
  font-size: 1.2em;
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
      color: theme.brand.link,
    },
  },
});

const Legal = styled(Section)({
  color: theme.text.light,
  backgroundColor: theme.brand.dark,
  padding: '0.8rem 0',
  margin: 0,
  p: {
    textAlign: 'center',
    margin: 0,
  },
});

const ContactSection = styled(Section)({
  display: 'flex',
  flexWrap: 'wrap',
  padding: 0,
  justifyContent: 'flex-start',
});

const Contact = styled.div({
  textAlign: 'center',
  height: 'fit-content',
  padding: '0px 1em 1em 1em',
  backgroundColor: theme.brand.alternate,
  color: theme.text.light,
  width: '100%',
  [Breakpoints.Medium]: {
    width: '50%',
  },

  a: {
    color: theme.text.light,
    padding: '0px 1em',
    '&:hover': {
      color: theme.brand.link,
    },
  },
});

const MapSection = styled.div({
  background: 'url(/map.webp)',
  width: '100%',
  minHeight: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [Breakpoints.Medium]: {
    width: '50%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    top: 0,
    left: 0,
  },
});

const Footer = () => {
  const { metadata = {}, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;
  const [mapSrc, setMapSrc] = useState('');
  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  return (
    <FooterWrapper>
      {hasMenu && (
        <FooterMenu>
          <FooterMenuColumns>
            {hasRecentCategories && (
              <li>
                <Link href="/categories/" passHref>
                  <FooterMenuTitle>
                    <strong>Kategorier</strong>
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
                <strong>??vrigt</strong>
              </FooterMenuPTitle>
              <FooterMenuItems>
                {/* <li>
                  <a href="/feed.xml">RSS</a>
                </li> */}
                <li>
                  <a href="/sitemap.xml">Sitemap</a>
                </li>
              </FooterMenuItems>
            </li>
          </FooterMenuColumns>
        </FooterMenu>
      )}
      <ContactSection>
        <Contact>
          <h2>Kontakta Oss</h2>
          <p>
            Stefan & Annika driver Stuteri Zander sedan 2011. Ni ??r Varmt V??lkomna p?? bes??k f??r att se v??ra h??star. Vi
            finns i ??ssby utanf??r Finsp??ng i ??sterg??tlands l??n.
          </p>
          <p>Annika: 0702-189317 Stefan: 0734-427276</p>
          <div>
            <a href="https://www.facebook.com/Stuteri-Zander-819241218112011" target="_blank" rel="noreferrer">
              <GrFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/stuterizander/" target="_blank" rel="noreferrer">
              <GrInstagram size={20} />
            </a>
            <a
              href="mailto:annika.zander71@gmail.com"
              target="_blank"
              rel="noreferrer"
              title="annika.zander71@gmail.com"
            >
              <GrMail size={20} />
            </a>
          </div>
        </Contact>

        <MapSection
          onClick={() =>
            setMapSrc(
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2074.8387085047643!2d15.854333316045535!3d58.66550938143151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465945eff6a53edf%3A0x810086026a55a23a!2s%C3%96ssby%20611%2C%20612%2092%20Finsp%C3%A5ng!5e0!3m2!1ssv!2sse!4v1645982605295!5m2!1ssv!2sse'
            )
          }
        >
          {mapSrc && <iframe src={mapSrc} loading="lazy"></iframe>}
        </MapSection>
      </ContactSection>
      <Legal>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title} | Utvecklad av Alice Anglesj??
          </p>
        </Container>
      </Legal>
    </FooterWrapper>
  );
};

export default Footer;
