const { createStore, applyMiddleware } = require('redux');

const defaultState = {
  courses: [
    {
      name: 'Learning React',
      topic: 'React',
    },
    {
      name: 'Learning Angular',
      topic: 'Angular',
    },
    {
      name: 'Using Redux with Angular',
      topic: 'Angular',
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_COURSE':
      return Object.assign({}, state, {
        courses: [...state.courses, action.course]
      });
    default:
       return state;
  }
}

const logger = store => next => action => {
  console.log('dispatching action = ', action);
  let result = next(action);
  console.log('state after action ', store.getState());
  return result;
}

const store = createStore(reducer, defaultState, applyMiddleware(logger));

// addView accepts function as paramter.  
// The passed in function expects a parameter.
// That parameter is supplied here, in addView's function body. 
// So the call to addView supplies the viewFunc function but the parameter that viewFunc needs is supplied here in addView body. 
function addView(viewFunc) {
//  viewFunc(defaultState);
  store.subscribe( () => {
    viewFunc(store.getState());
  });
}


// the call to addView passes the function body defined below to addView for execution. 
// addView supplies the "state" parameter 
addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView((state) => {
  console.log(`The latest course in the library: "${state.courses[state.courses.length -1].name}"`);
});

store.dispatch({
  type: 'ADD_COURSE', 
  course: {
    name: 'Jason Jones is super cool',
    topic: 'Awesome'
  }
});
