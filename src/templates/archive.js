import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';

import Pagination from 'components/Pagination/Pagination';
import Grid from 'components/Grid.js/Grid';
import styled from 'styled-components';
import { Breakpoints } from 'styles';

const CardText = styled.div({
  opacity: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  color: '#fff',
  zIndex: 4,
  transition: '.3s ease-in-out',

  [Breakpoints.Large]: {
    opacity: 0,
  },
});

const CardOverlay = styled.div({
  opacity: 0.4,
  top: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  backgroundColor: '#000',

  zIndex: 3,
  display: 'block',
  [Breakpoints.Large]: {
    opacity: 0,
  },
});

const CardImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: '50% 50%',
});

const Card = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',

  [Breakpoints.Large]: {
    [`&:hover > ${CardText}`]: {
      opacity: 1,
    },
    [`&:hover > ${CardOverlay}`]: {
      opacity: 0.4,
    },
  },
});

const CardImageWrapper = styled.div({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export default function TemplateArchive({ title = 'Archive', posts, slug, metadata, pagination }) {
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

      <Section>
        <Container>
          {Array.isArray(posts) && (
            <>
              <Grid title={title}>
                {posts.map((post) => {
                  const { featuredImage } = post;
                  return (
                    <a href={`/posts/${post.slug}`} key={post.id}>
                      <Card post={post}>
                        <CardText>
                          <h3>{post.title}</h3>
                        </CardText>
                        {featuredImage && (
                          <CardImageWrapper>
                            <CardImage
                              {...featuredImage}
                              src={featuredImage.sourceUrl}
                              dangerouslySetInnerHTML={featuredImage.caption}
                            />
                          </CardImageWrapper>
                        )}
                        <CardOverlay />
                      </Card>
                    </a>
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
        </Container>
      </Section>
    </Layout>
  );
}
