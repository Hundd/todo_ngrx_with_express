import { Action, ActionReducer } from "@ngrx/store";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

export enum TodoActions {
  INITIALIZE_TODO,
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  LOAD_TODO
}

export interface TodoAction extends Action {
  payload: Todo | Todo[];
}

const initialState: Todo[] = [];

const todoReducer: ActionReducer<Todo[], TodoAction> = function todoReducer(
  allTodo = initialState,
  action: TodoAction
) {
  if (action.type === TodoActions[TodoActions.INITIALIZE_TODO]) {
    return action.payload as Todo[];
  }

  return allTodo;
};

export { todoReducer };
