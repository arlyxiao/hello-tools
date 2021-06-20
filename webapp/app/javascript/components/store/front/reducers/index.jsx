import { combineReducers } from 'redux';


const repoList = (state = [], action) => {
  if (action.type === 'repoList') {
    return [
      ...action.value
    ].reverse();
  }

  return state;
};



const rootReducer = combineReducers({
  repoList
});


export default rootReducer;
