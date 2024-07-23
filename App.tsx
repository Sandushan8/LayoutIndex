import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Routes} from './src/routes/Routes';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
