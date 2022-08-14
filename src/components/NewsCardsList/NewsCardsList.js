import React from 'react';
import classNames from 'classnames';
import './NewsCardsList.css';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import NewsCard from '../NewsCard/NewsCard';
import NewsCardsListError from '../NewsCardsListError/NewsCardsListError';
import Buttons from '../Buttons/Buttons';

const NewsCardsList = ({
  data,
  savedArticles = {},
  isVisible = true,
  isLoading = false,
  isError = false,
  isSearchResults = false,
  onSignUpClick = () => {},
  onBookmarkClick = () => {},
  onRemoveClick = () => {},
  onLoadMoreClick = undefined,
}) => (
  <section className={classNames(
    'news-card-list',
    !isVisible && 'news-card-list_hidden',
  )}
  >
    <div className="news-card-list__container">
      {isLoading && (
      <Preloader>
        {
                        isSearchResults
                          ? 'Searching for news...'
                          : 'Loading your saved articles...'
                    }
      </Preloader>
      )}
      {!isLoading && isError && (
        <NewsCardsListError>
          Sorry, something went wrong during the request.
          There may be a connection issue or the server may be down.
          Please try again later.
        </NewsCardsListError>
      )}
      {!isLoading && data.length === 0 && (
      <NothingFound>
        {
                        isSearchResults
                          ? 'Sorry, but nothing matched your search terms.'
                          : 'You did not save any article yet.'
                    }
      </NothingFound>
      )}
      {!isLoading && !isError && data.length > 0 && (
      <>
        {isSearchResults && (
        <h2 className="news-card-list__title">
          Search results
        </h2>
        )}
        <ul className="news-card-list__list">
          {data.map((cardData) => (
            <NewsCard
              key={
                isSearchResults
                  ? cardData.link
                  : cardData._id
              }
              data={cardData}
              savedArticles={savedArticles}
              isSearchResults={isSearchResults}
              onSignUpClick={onSignUpClick}
              onBookmarkClick={onBookmarkClick}
              onRemoveClick={onRemoveClick}
            />
          ))}
        </ul>
        {onLoadMoreClick && (
        <Buttons
          type="button"
          pattern="cards"
          onClick={onLoadMoreClick}
          className="news-card-list__button"
        >
          Show more
        </Buttons>
        )}
      </>
      )}
    </div>
  </section>
);

export default NewsCardsList;
