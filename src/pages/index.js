import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

import styled from 'styled-components';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';

const PostList = styled.ul({
  listStyle: 'none',
  paddingLeft: 0,

  '& > li': {
    margin: '2em 0',

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const Description = styled.p({
  textAlign: 'center',
  lineHeight: '1.5',
  fontSize: '1.5rem',
});

const StyledSection = styled(Section)({
  marginTop: '4em',
});

export default function Home({ posts, pagination }) {
  const { metadata = {} } = useSite();

  const { title, description } = metadata;

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

      <StyledSection>
        <Container>
          <h2 className="sr-only">Posts</h2>
          <PostList>
            {posts.map((post) => {
              return (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </PostList>
          {pagination && (
            <Pagination
              addCanonical={false}
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        </Container>
      </StyledSection>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts();
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
