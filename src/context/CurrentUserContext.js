import React from 'react';
import { defaultUser } from '../utils/constants';

const CurrentUserContext = React.createContext(defaultUser);

export default CurrentUserContext;
