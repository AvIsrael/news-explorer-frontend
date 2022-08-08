import React, { useState, useEffect } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardsList/NewsCardsList';
import Footer from '../Footer/Footer';
import { savedCards } from '../../utils/data/data';

const SavedNews = ({ onSignOutClick }) => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setNewsData(savedCards);
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      <SavedNewsHeader
        onSignOutClick={onSignOutClick}
      />
      <main>
        <NewsCardList
          data={newsData}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedNews;
