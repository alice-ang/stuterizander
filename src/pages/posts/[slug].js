import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getAllPosts, getRelatedPosts, postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';
import ImageSlider from 'components/ImageSlider/ImageSlider';

import styles from 'styles/pages/Post.module.scss';
import styled from 'styled-components';
import { Breakpoints } from 'styles';
import { CgCross } from 'react-icons/cg';

const StyledHeader = styled(Header)({
  textAlign: 'center',
});

const Sold = styled.h3({
  marginTop: 0,
  color: 'red',
});

const Deceased = styled.span({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
});

const WpContent = styled.div({
  margin: 'auto',
  figure: {
    img: {
      width: 'fit-content',
      height: 'fit-content',
      [Breakpoints.Large]: {
        objectFit: 'contain',
      },
    },
  },
});

const Title = styled.h1({
  margin: '0px 0px 0.3em 0px',
});

export default function Post({ post, socialImage, relatedPosts }) {
  const { title, metaTitle, description, content, modified, featuredImage, images, currentStatus } = post;
  const [filteredImages, setFilteredImages] = useState(null);
  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { posts: relatedPostsList, title: relatedPostsTitle } = relatedPosts;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  useEffect(() => {
    setFilteredImages(Object.values(images).filter((image) => image !== 'Post_Images' && image !== null));
  }, [images, setFilteredImages]);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <StyledHeader>
        {currentStatus.sold && <Sold>Såld</Sold>}
        {currentStatus.deceased && (
          <Deceased>
            <CgCross size={38} /> - {currentStatus.deceased.split('/')[2]}
          </Deceased>
        )}
        {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
          />
        )}
        <Title
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </StyledHeader>

      <Content>
        <Section>
          <Container>
            <WpContent
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
        {filteredImages && filteredImages.length > 0 && (
          <Section>
            <Container>
              <ImageSlider slides={filteredImages} />
            </Container>
          </Section>
        )}
      </Content>

      <Section className={styles.postFooter}>
        <Container>
          <p className={styles.postModified}>Senast uppdaterad {formatDate(modified)}.</p>
          {!!relatedPostsList.length && (
            <div className={styles.relatedPosts}>
              {relatedPostsTitle.name ? (
                <span>
                  Mer från{' '}
                  <Link href={relatedPostsTitle.link}>
                    <a>{relatedPostsTitle.name}</a>
                  </Link>
                </span>
              ) : (
                <span>Fler inlägg</span>
              )}
              <ul>
                {relatedPostsList.map((post) => (
                  <li key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);
  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { categories, databaseId: postId } = post;
  const category = categories.length && categories[0];
  let { name, slug } = category;

  return {
    props: {
      post,
      socialImage,
      relatedPosts: {
        posts: await getRelatedPosts(category, postId),
        title: {
          name: name || null,
          link: categoryPathBySlug(slug),
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts();

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
