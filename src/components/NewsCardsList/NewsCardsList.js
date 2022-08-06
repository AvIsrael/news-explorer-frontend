import React from 'react';
import './NewsCardsList.css';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import NewsCard from '../NewsCard/NewsCard';
import Buttons from '../Buttons/Buttons';

const NewsCardsList = ({
  data, isLoading, isSearchResults = false, onSignInClick = () => {}, onLoadMoreClick = () => {},
}) => (
  <section className="news-card-list">
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
      {!isLoading && data.length === 0 && (
      <NothingFound>
        {
                        isSearchResults
                          ? 'Sorry, but nothing matched your search terms.'
                          : 'You did not save any article yet.'
                    }
      </NothingFound>
      )}
      {!isLoading && data.length > 0 && (
      <>
        {isSearchResults && (
        <h2 className="news-card-list__title">
          Search results
        </h2>
        )}
        <ul className="news-card-list__list">
          {data.map((cardData) => (
            <NewsCard
              key={cardData.id}
              cardData={cardData}
              isSearchResults={isSearchResults}
              onSignInClick={onSignInClick}
            />
          ))}
        </ul>
        {isSearchResults && (
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
