import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import { ImCross } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import Section from 'components/Section';

import NavListItem from 'components/NavListItem';
import { Breakpoints, theme } from 'styles';

const NavWrapper = styled.nav({
  boxShadow: '0 0 20px 0 rgb(0 0 0 / 10%)',
  backgroundColor: theme.brand.dark,
  padding: '0px 1em',
});

const NavSection = styled(Section)({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  height: '100%',
  paddingTop: 0,
  paddingBottom: 0,
  margin: 0,
  justifyContent: 'space-between',
});

const Name = styled.p({
  a: {
    color: theme.text.light,
    fontWeight: 'bold',
    textDecoration: 'none',
    borderBottom: 'solid 2px transparent',
    fontSize: '1.3em',
    [Breakpoints.Small]: {
      padding: '0.5em',
      marginLeft: '-0.5em',
    },
    '&:hover': {
      color: 'tomato',
    },
  },
});

const Search = styled.div({
  flexGrow: 0,
  display: 'none',

  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    height: '100%',
    width: '50%',

    input: {
      border: 'none',
      width: '100vw',
      borderRadius: 5,
      [Breakpoints.Medium]: {
        width: '70%',
      },
    },
    [Breakpoints.Medium]: {
      justifyContent: 'center',
      width: '100%',
    },
  },

  button: {
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',

    '&[disabled]': {
      svg: {
        fill: 'grey',
        transition: 'fill 0.5s',
      },
    },

    svg: {
      color: theme.text.light,
      transform: 'translateY(2px)',
    },

    '&:focus': {
      svg: {
        fill: 'tomato',
      },
    },
  },

  [Breakpoints.Medium]: {
    display: 'block',
  },
});

const SearchResults = styled.div({
  display: 'none',
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: 'white',
  padding: '1em',
  boxShadow: '0 0px 8px 0 rgba(0,0,0,0.2)',
  borderTop: `solid 5px ${theme.brand.alternate}`,
  zIndex: '999',
  '[data-search-is-active="true"] &': {
    display: 'block',
  },

  p: {
    lineHeight: '1.15',
    margin: 0,
  },

  ul: {
    listStyle: 'none',
    padding: 0,
    margin: ' -0.5em 0',
  },

  a: {
    display: 'block',
    color: 'grey',
    textDecoration: 'none',
    '&:hover': {
      color: 'tomato',
    },
  },
});

const SubMenu = styled(NavListItem)({
  display: 'none',
  position: 'absolute',
  whiteSpace: 'nowrap',
  listStyle: 'none',
  backgroundColor: '#fff',
  padding: 0,

  li: {
    margin: 0,
    a: {
      color: theme.text.light,
      padding: '0.3em',
    },
  },
});

const Menu = styled.ul({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 0,
  listStyle: 'none',
  padding: 0,
  margin: 0,

  li: {
    position: 'relative',
    zIndex: 1,
    margin: '0 0.25em',

    '&:first-child': {
      marginLeft: 0,
    },

    '&:last-child': {
      marginRight: 0,
    },

    '&:hover': {
      ' & > a': {
        color: 'tomato',
      },
      [`> ${SubMenu}`]: {
        display: 'block',
      },
    },
    [`& > ${SubMenu}`]: {
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      padding: '0.5em 0.8em',
    },

    [`${SubMenu}`]: {
      top: 0,
      left: '100%',
    },
  },

  a: {
    display: 'block',
    textDecoration: 'none',
    color: theme.text.light,
    padding: '0.5em',
    '&:hover': {
      color: 'tomato',
    },
  },
});

const MobileNav = styled(GiHamburgerMenu)({
  display: 'block',
  [Breakpoints.Medium]: {
    display: 'none',
  },
});

const MenuSectionDesktop = styled.div({
  display: 'none',
  flexDirection: 'row',
  [Breakpoints.Medium]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const MenuSectionMobile = styled.div({
  display: 'block',
  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    span: {
      borderBottom: `1px solid rgb(229, 229, 229)`,
      width: '100%',
      height: 'fit-content',
    },
    li: {
      a: {
        fontSize: '1.3em',
        width: '100%',
        margin: 0,
        fontWeight: 'bold',
        color: theme.text.neutral,
      },
    },
  },
  [Breakpoints.Medium]: {
    display: 'none',
  },
});

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Nav = () => {
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
  const [toggle, setToggle] = useState(false);
  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    // When the search box opens up, additionall find the search input and focus
    // on the element so someone can start typing right away

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }
  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavWrapper>
        <NavSection>
          <Name>
            <Link href="/">
              <a>{title}</a>
            </Link>
          </Name>
          <MenuSectionDesktop>
            <Menu>
              {navigation?.map((listItem) => {
                return <SubMenu key={listItem.id} item={listItem} />;
              })}
            </Menu>
          </MenuSectionDesktop>

          <Search>
            {searchVisibility === SEARCH_HIDDEN && (
              <button onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
                <span className="sr-only">Toggle Search</span>
                <FaSearch color={theme.brand.light} size={20} />
              </button>
            )}
            {searchVisibility === SEARCH_VISIBLE && (
              <form ref={formRef} action="/search" data-search-is-active={!!query}>
                <input
                  type="search"
                  name="q"
                  value={query || ''}
                  onChange={handleOnSearch}
                  autoComplete="off"
                  placeholder="Sök..."
                  required
                />
                <SearchResults>
                  {results.length > 0 && (
                    <ul>
                      {results.map(({ slug, title }, index) => {
                        return (
                          <li key={slug}>
                            <Link tabIndex={index} href={postPathBySlug(slug)}>
                              <a>{title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {results.length === 0 && (
                    <p>
                      Sorry, not finding anything for <strong>{query}</strong>
                    </p>
                  )}
                </SearchResults>
              </form>
            )}
          </Search>
          <span
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {toggle ? <ImCross size={20} color={theme.text.light} /> : <MobileNav size={24} color={theme.text.light} />}
          </span>
        </NavSection>
      </NavWrapper>
      {toggle && (
        <MenuSectionMobile>
          <Menu>
            <li>
              <form ref={formRef} action="/search" data-search-is-active={!!query}>
                <input
                  type="search"
                  name="q"
                  value={query || ''}
                  onChange={handleOnSearch}
                  autoComplete="off"
                  placeholder="Sök..."
                  required
                />
                <SearchResults>
                  {results.length > 0 && (
                    <ul>
                      {results.map(({ slug, title }, index) => {
                        return (
                          <li key={slug}>
                            <Link tabIndex={index} href={postPathBySlug(slug)}>
                              <a>{title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {results.length === 0 && (
                    <p>
                      Sorry, not finding anything for <strong>{query}</strong>
                    </p>
                  )}
                </SearchResults>
              </form>
            </li>

            {navigation?.map((listItem) => {
              return (
                <span
                  key={listItem.id}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <SubMenu item={listItem} />
                </span>
              );
            })}
          </Menu>
        </MenuSectionMobile>
      )}
    </>
  );
};

export default Nav;
