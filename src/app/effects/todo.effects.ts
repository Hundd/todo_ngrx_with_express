import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { TodoActions, TodoAction, Todo } from "../reducers/todo";
import { TodosService } from "../todos.service";

@Injectable()
export class TodoEffects {
  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActions[TodoActions.ADD_TODO]),
    switchMap((action: TodoAction) => {
      return this.todoService
        .addTodo(action.payload as Todo)
        .pipe(map(_ => ({ type: "LOAD_TODO" })));
    })
  );

  @Effect()
  loadTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActions[TodoActions.LOAD_TODO]),
    switchMap(_ => {
      return this.todoService.todos.pipe(
        map((todos: Todo[]) => ({
          type: TodoActions[TodoActions.INITIALIZE_TODO],
          payload: todos
        }))
      );
    })
  );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActions[TodoActions.DELETE_TODO]),
    switchMap((action: TodoAction) => {
      return this.todoService
        .deleteTodo((action.payload as Todo).id)
        .pipe(map(_ => ({ type: "LOAD_TODO" })));
    })
  );

  @Effect()
  completeTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActions[TodoActions.COMPLETE_TODO]),
    switchMap((action: TodoAction) => {
      return this.todoService
        .completeTodo((action.payload as Todo).id)
        .pipe(map(_ => ({ type: "LOAD_TODO" })));
    })
  );

  constructor(private actions$: Actions, private todoService: TodosService) {}
}
