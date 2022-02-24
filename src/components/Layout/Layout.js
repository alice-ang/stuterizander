import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

const LayoutWrapper = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  minHeight: '100vh',
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata = {} } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }
  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/logo.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/logo.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/logo.png',
        },
        {
          rel: 'manifest',
          href: '/logo.png',
        },
      ],
    }),
  };

  return (
    <LayoutWrapper>
      <Helmet {...helmetSettings} />

      <Nav />

      <Main>{children}</Main>

      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
