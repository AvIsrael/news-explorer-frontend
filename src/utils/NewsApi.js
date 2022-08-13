import Api from './api';
import {
  NEWS_URL,
  API_KEY,
  RES_SIZE,
} from './constants';
import { DATE_CURRENT, DATE_LAST } from './parsedata';

class NewsApi extends Api {
  searchNews(searchQuery) {
    return this.sendReq(
      '/everything'
      + `?apiKey=${API_KEY}`
      + `&q=${encodeURIComponent(searchQuery)}`
      + `&from=${DATE_LAST.toISOString()}`
      + `&to=${DATE_CURRENT.toISOString()}`
      + `&pageSize=${RES_SIZE}`,
    ).then(this._reformatResults);
  }

  _reformatResults(response) {
    return {
      ...response,
      articles: response.articles
        .map((articleData) => ({
          title: articleData.title,
          text: articleData.description,
          date: articleData.publishedAt,
          source: articleData.source.name,
          link: articleData.url,
          image: articleData.urlToImage,
        })),
    };
  }
}

export default new NewsApi(NEWS_URL);
