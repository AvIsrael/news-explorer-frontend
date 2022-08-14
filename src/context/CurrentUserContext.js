import React from 'react';
import { DEFAULT_USER } from '../utils/constants';

const CurrentUserContext = React.createContext(DEFAULT_USER);

export default CurrentUserContext;
