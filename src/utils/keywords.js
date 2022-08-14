const createSortedArr = (target) => Object
  .entries(target).sort(([, x], [, y]) => y - x)
  .reduce((res, [key]) => [...res, key], []);

const keywords = (articlesList) => {
  const keywordsCount = {};
  articlesList
    .map((articleData) => articleData.keyword)
    .forEach((keyword) => {
      if (keywordsCount[keyword]) {
        keywordsCount[keyword] += 1;
        return;
      }
      keywordsCount[keyword] = 1;
    });

  return createSortedArr(keywordsCount);
};

export {
  createSortedArr,
  keywords,
};
