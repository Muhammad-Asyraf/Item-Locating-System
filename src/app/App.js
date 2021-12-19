import React from 'react';

// Redux
import ReduxStore from './redux/store';
import { Provider } from 'react-redux';

// Redux persist
import { PersistGate } from 'redux-persist/integration/react';

// Root
import Root from './Root';
import Loading from './components/Loading';

const { store, persistor } = ReduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
