import { Action, ActionReducer } from "@ngrx/store";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

interface TodoAction extends Action {
  payload: Todo;
}

const initialState: Todo[] = [
  { id: 0, text: "learn ngrx" },
  { id: 1, text: "learn rxjs" }
];

let lastIndex = Math.max(...initialState.map(({ id }) => id));

const todoReducer: ActionReducer<Todo[], TodoAction> = function todoReducer(
  allTodo = initialState,
  action: TodoAction
) {
  console.log(action);
  switch (action.type) {
    case "ADD_TODO":
      const { text } = action.payload;
      return allTodo.concat([{ text, id: ++lastIndex }]);
    case "DELETE_TODO":
      return allTodo.filter(todo => todo.id !== action.payload.id);
    case "COMPLETE_TODO":
      return allTodo.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, ...{ completed: true } }
          : todo;
      });
    default:
      return allTodo;
  }
};

export { todoReducer };
