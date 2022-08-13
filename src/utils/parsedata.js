import { RES_INTERVAL } from './constants';

const DATE_CURRENT = new Date();
const DATE_LAST = new Date(new Date().getTime() - RES_INTERVAL);

export {
  DATE_CURRENT,
  DATE_LAST,
};
