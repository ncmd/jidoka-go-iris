import './style';
import App from './components/app';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default () => (
    <div id="outer">
        <Provider store={store}>
            <App />
        </Provider>
    </div>
);