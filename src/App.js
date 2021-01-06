import React, { Fragment} from 'react';
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes';

import GlobalStyled from './styles/global';

const App=()=> (

    <BrowserRouter >
      <Fragment>
        <GlobalStyled />
        <Routes/>
      </Fragment>
    </BrowserRouter>
)

export default App;