import Link from 'next/link';

import config from '../../../package.json';
import { Helmet } from 'react-helmet';

import { GrPrevious as PreviousIcon, GrNext as NextIcon } from 'react-icons/gr';
import { HiOutlineDotsHorizontal as Dots } from 'react-icons/hi';

import styled from 'styled-components';
import { theme, Breakpoints } from 'styles';

const NavWrapper = styled.nav({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '6em',

  '> *': {
    display: 'flex',
    gap: '0.3em',
    alignItems: 'center',
    justifyContent: 'center',
  },

  a: {
    color: 'grey',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid grey',
    borderRadius: '0.4em',
    padding: '0.2em 0.8em',
    '&:hover': {
      color: theme.brand.link,
      backgroundColor: 'grey',
    },
    svg: {
      width: '0.8rem',
    },
  },
  ul: {
    listStyleType: 'none',
  },
});

const Active = styled.span({
  fontWeight: 600,
  padding: '0.2em 0.8em',
});

const Pages = styled.ul({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  [Breakpoints.Medium]: {
    display: 'none',
  },
});

const Prev = styled.a({
  marginRight: 'auto',
});

const DotsWrapper = styled.li({
  display: 'flex',
  alignSelf: 'flex-end',
  margin: '0 0.2rem -0.2rem 0.2rem',
});

const MAX_NUM_PAGES = 9;

const { homepage = '' } = config;

const Pagination = ({ pagesCount, currentPage, basePath, addCanonical = true }) => {
  const path = `${basePath}/page/`;

  const hasPreviousPage = pagesCount > 1 && currentPage > 1;
  const hasNextPage = pagesCount > 1 && currentPage < pagesCount;

  let hasPrevDots = false;
  let hasNextDots = false;

  function getPages() {
    let pages = pagesCount;
    let start = 0;
    // If the number of pages exceeds the max
    if (pagesCount > MAX_NUM_PAGES) {
      // Set number of pages to the max
      pages = MAX_NUM_PAGES;
      const half = Math.ceil(MAX_NUM_PAGES / 2);
      const isHead = currentPage <= half;
      const isTail = currentPage > pagesCount - half;
      hasNextDots = !isTail;
      // If the current page is at the head, the start variable remains 0
      if (!isHead) {
        hasPrevDots = true;
        // If the current page is at the tail, the start variable is set to
        // the last chunk. Otherwise the start variable will place the current
        // page at the middle
        start = isTail ? pagesCount - MAX_NUM_PAGES : currentPage - half;
      }
    }
    return [...new Array(pages)].map((_, i) => i + 1 + start);
  }

  const pages = getPages();

  return (
    <>
      <Helmet>
        {addCanonical && !hasPreviousPage && <link rel="canonical" href={`${homepage}${basePath}`} />}
        {hasPreviousPage && <link rel="prev" href={`${homepage}${path}${currentPage - 1}`} />}
        {hasNextPage && <link rel="next" href={`${homepage}${path}${currentPage + 1}`} />}
      </Helmet>

      <NavWrapper role="navigation" aria-label="Pagination Navigation">
        {hasPreviousPage && (
          <Link href={`${path}${currentPage - 1}`} passHref>
            <Prev aria-label="Goto Previous Page">
              <PreviousIcon /> Previous
            </Prev>
          </Link>
        )}

        <Pages>
          {hasPrevDots && (
            <DotsWrapper>
              <Dots aria-label={`Navigation to pages 1-${pages[0] - 1} hidden`} />
            </DotsWrapper>
          )}
          {pages.map((page) => {
            const active = page === currentPage;
            return active ? (
              <li key={page}>
                <Active aria-label={`Current Page, Page ${page}`} aria-current="true">
                  {page}
                </Active>
              </li>
            ) : (
              <li key={page}>
                <Link href={`${path}${page}`} passHref>
                  <a aria-label={`Goto Page ${page}`}>
                    <span>{page}</span>
                  </a>
                </Link>
              </li>
            );
          })}
          {hasNextDots && (
            <DotsWrapper>
              <Dots aria-label={`Navigation to pages ${pages[pages.length - 1] + 1}-${pagesCount} hidden`} />
            </DotsWrapper>
          )}
        </Pages>

        {hasNextPage && (
          <Link href={`${path}${currentPage + 1}`} passHref>
            <a aria-label="Goto Next Page">
              Next <NextIcon />
            </a>
          </Link>
        )}
      </NavWrapper>
    </>
  );
};

export default Pagination;
