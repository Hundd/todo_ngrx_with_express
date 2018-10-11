import { Action, ActionReducer } from "@ngrx/store";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

interface TodoAction extends Action {
  payload: Todo | Todo[];
}

const initialState: Todo[] = [];

let lastIndex = Math.max(...initialState.map(({ id }) => id));

const todoReducer: ActionReducer<Todo[], TodoAction> = function todoReducer(
  allTodo = initialState,
  action: TodoAction
) {
  console.log(action);
  switch (action.type) {
    case "INITIALIZE_TODO":
      return action.payload as Todo[];

    case "ADD_TODO":
      const { text } = action.payload as Todo;

      return allTodo.concat([{ text, id: ++lastIndex }]);

    case "DELETE_TODO":
      return allTodo.filter(
        (todo: Todo) => todo.id !== (action.payload as Todo).id
      );

    case "COMPLETE_TODO":
      return allTodo.map(todo => {
        return todo.id === (action.payload as Todo).id
          ? { ...todo, ...{ completed: true } }
          : todo;
      });

    default:
      return allTodo;
  }
};

export { todoReducer };
