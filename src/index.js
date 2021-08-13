import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import configureStore from './configureStore'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { newBingo} from './actions/BingoActions';

const store = configureStore()

store.getState().bingo.socket.on('bingo', (data) => {
  store.dispatch(newBingo(data))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
