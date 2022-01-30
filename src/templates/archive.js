import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
// import SectionTitle from 'components/SectionTitle';
// import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination/Pagination';
import Grid from 'components/Grid.js/Grid';
import styles from 'styles/templates/Archive.module.scss';
import styled from 'styled-components';
// import Image from 'next/image';
const Card = styled.div({
  height: '100%',
  width: '100%',
  position: 'relative',
  color: 'white',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  h1: {
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  overflow: 'auto',
  ul: {
    padding: 0,
    margin: 0,
    li: {
      display: 'inline-block',
      padding: '0px 5px',
    },
  },
});

// const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Archive',
  Title,
  posts,
  // postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Header>
        <Container>
          <h1>{Title || title}</h1>
          {metadata.description && (
            <p
              className={styles.archiveDescription}
              dangerouslySetInnerHTML={{
                __html: metadata.description,
              }}
            />
          )}
        </Container>
      </Header>

      <Section>
        <Container>
          {Array.isArray(posts) && (
            <>
              <Grid title={title}>
                {posts.map((post) => {
                  const { featuredImage } = post;
                  return (
                    <Card post={post} key={post.id}>
                      {/* <Link href={horsePathBySlug(horse.slug)} passHref>
                        <a>{title}</a>
                      </Link> */}
                      {featuredImage && (
                        <img
                          {...featuredImage}
                          src={featuredImage.sourceUrl}
                          dangerouslySetInnerHTML={featuredImage.caption}
                        />
                      )}
                    </Card>
                  );
                })}
              </Grid>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
          {/* {Array.isArray(posts) && (
            <>
              <ul className={styles.posts}>
                {posts.map((post) => {
                  return (
                    <li key={post.slug}>
                      <PostCard post={post} options={postOptions} />
                    </li>
                  );
                })}
              </ul>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )} */}
        </Container>
      </Section>
    </Layout>
  );
}
