import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dogs from './modules/dogs';

const env = process.env.NODE_ENV;

const middlewares = [thunk];

const reducer = combineReducers({ dogs });

// 개발 모드일 때 크롬 개발자툴로 redux 확인 할 수 있도록 추가

let middlewareConfig;

if (env === 'development') {
  middlewareConfig = composeWithDevTools(applyMiddleware(...middlewares));
} else {
  middlewareConfig = applyMiddleware(...middlewares);
}

const store = createStore(reducer, middlewareConfig);

export default store;
