

import { Middleware } from 'redux';

const myMiddleware: Middleware = (store) => (next) => (action: any) => {
  // Middleware logic here
  console.log('Action:', action);

  // Access the dispatch function directly from the store
  const dispatch = store.dispatch;

  console.log(store.getState().map);

  // Continue with the next middleware or reducer in the chain
  return next(action);
};

export default myMiddleware;
