
const addCounter = (list) => {
  list.push(0);
  return list
};

it('Add Counter', () => {
  const listBefore = [];
  const listAfter = [0];
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
})

//--------------------------------------------------------------------------------------------

const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
}

it('Toggle Todo', () => {
  const todoBefore = {
    id: 0,
    text: 'Learb Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learb Redux',
    completed: true
  };
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
})

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};


it('Change state', () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
})


it('Change state 2', () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  const action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn Redux',
      completed: false
    }
  ];
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
})


it('State toggle todo', () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go to the cinema',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go to the cinema',
      completed: true
    }
  ];
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
})