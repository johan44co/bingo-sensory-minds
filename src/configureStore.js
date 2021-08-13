import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';

const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
  }

export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware, customMiddleWare]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}