import { useEffect } from 'react';
import useSite from 'hooks/use-site';
import { WebsiteJsonLd } from 'lib/json-ld';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import Layout from 'components/Layout';
import Header from 'components/Header';

const Description = styled.p({
  textAlign: 'center',
  lineHeight: '1.5',
  fontSize: '1.5rem',
});

export default function Home() {
  const { metadata = {} } = useSite();
  const router = useRouter();

  const { title, description } = metadata;

  useEffect(() => {
    router.push('/valkommen');
  }, [router]);

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header>
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <Description
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Header>
    </Layout>
  );
}
