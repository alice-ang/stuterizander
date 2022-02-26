import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import Breadcrumbs from 'components/Breadcrumbs';
import Hero from 'components/Hero';
import styles from 'styles/pages/Page.module.scss';
import TemplatePosts from 'templates/posts';
import Title from 'components/Title';

export default function Page({ page, breadcrumbs, posts }) {
  const { title, metaTitle, description, slug, content, featuredImage, children, hero } = page;
  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const hasChildren = Array.isArray(children) && children.length > 0;
  const hasBreadcrumbs = Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Header>
        {hasBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {featuredImage && <Hero image={featuredImage} title={hero.heroText} subtitle={hero.heroSubtitle}></Hero>}
      </Header>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>

        {hasChildren && (
          <Section className={styles.sectionChildren}>
            <Container>
              <aside>
                <p className={styles.childrenHeader}>
                  <strong>{title}</strong>
                </p>
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.id}>
                        <Link href={child.uri}>
                          <a>{child.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Container>
          </Section>
        )}
      </Content>
      {posts && posts.length > 0 && (
        <Section>
          <TemplatePosts title={title} Title={<Title title={title} />} posts={posts} slug={slug} metadata={metadata} />
        </Section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;
  const { categories } = await getAllCategories();

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  const isMatching = categories.find((category) => category.slug == page.slug ?? null);

  const getMatching = async (matching) => {
    if (!matching) {
      return null;
    }
    const { category } = await getCategoryBySlug(page.slug);
    const { posts } = await getPostsByCategoryId(category.databaseId);
    return posts;
  };

  const { pages } = await getAllPages();
  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);
  return {
    props: {
      page,
      posts: await getMatching(isMatching),
      breadcrumbs,
    },
  };
}

export async function getStaticPaths() {
  const { pages } = await getAllPages();

  // Take all the pages and create path params. The slugParent will always be
  // the top level parent page, where the slugChild will be an array of the
  // remaining segments to make up the path or URI

  const paths = pages
    .filter(({ uri }) => typeof uri === 'string')
    .map(({ uri }) => {
      const segments = uri.split('/').filter((seg) => seg !== '');

      return {
        params: {
          slugParent: segments.shift(),
          slugChild: segments,
        },
      };
    });

  return {
    paths,
    fallback: false,
  };
}
