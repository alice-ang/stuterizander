import { gql } from '@apollo/client';

export const QUERY_ALL_HORSES = gql`
  query allHorses {
    horses(first: 10, where: { hasPassword: false }) {
      edges {
        node {
          id
          featuredImageId
          horse {
            name
            isFoal
            fieldGroupName
            pedigree {
              altText
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
`;

export const QUERY_HORSE_BY_SLUG = gql`
  query HorseBySlug($slug: ID!) {
    horse(id: $slug, idType: SLUG) {
      horse {
        date
        fieldGroupName
        isFoal
        name
        pedigree
      }
    }
  }
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query HorseSEOBySlug($slug: ID!) {
    horse(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
