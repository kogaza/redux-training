import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import { createStore, combineReducers } from 'redux';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render( <App />, document.getElementById('root'));

// ----- counter -----

// const counter = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }

// const Counter = ({
//     value,
//     onIncrement,
//     onDecrement
// }) => (
//         <div>
//             <h1>{value}</h1>
//             <button onClick={onIncrement}>+</button>
//             <button onClick={onDecrement}>-</button>
//         </div>
//     );

// const store = createStore(counter);

// const render = () => {
//     ReactDOM.render(
//         <Counter
//             value={store.getState()}
//             onIncrement={() =>
//                 store.dispatch({
//                     type: 'INCREMENT'
//                 })
//             }
//             onDecrement={() =>
//                 store.dispatch({
//                     type: 'DECREMENT'
//                 })
//             }
//         />,
//         document.getElementById('root'));
// };

// store.subscribe(render);
// render();


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

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span> {children} </span>
    }
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

class FilterLink extends Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <Link
                active={props.filter === state.visibilityFilter}
                onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        );
    }
}
FilterLink.contextTypes = {
    store: PropTypes.object
};

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink
            filter='SHOW_ALL'
        >
            All
        </FilterLink>
        {', '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {', '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
)

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: input.value
                })
                input.value = '';
            }}>
                Add todo
            </button>
        </div>
    );
};
AddTodo.contextTypes = {
    store: PropTypes.object
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}

class VisibleTodoList extends Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })
                }
            />
        );
    }
}
VisibleTodoList.contextTypes = {
    store: PropTypes.object
};

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return this.props.children;
    }
}
Provider.childContextTypes = {
    store: PropTypes.object
};

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);


