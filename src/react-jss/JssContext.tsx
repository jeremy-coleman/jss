import React, { Context } from 'react';
import { Context as JssContextValue } from './types';

const JssContext: Context<JssContextValue> = React.createContext({
  sheetOptions: {},
  disableStylesGeneration: false
})

export default JssContext
