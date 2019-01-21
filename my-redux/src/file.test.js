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
  
  const todos = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ];
    default:
    return state;
  }
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
  
  //--------------------------------------------------------------------------------------------

