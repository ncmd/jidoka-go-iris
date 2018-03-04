import { Provider } from 'preact-redux';
import App from './components/app';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunk));


export default () => (
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
);