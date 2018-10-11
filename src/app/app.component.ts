import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { INCREMENT, DECREMENT, RESET } from "./reducers/counter";
import { Todo, TodoActions } from "./reducers/todo";

export interface AppState {
  count: number;
  todos: Todo[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  count$: Observable<number>;
  todos$: Observable<Todo>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select("count"));
    this.todos$ = store.pipe(select("todos"));

    this.store.dispatch({ type: TodoActions[TodoActions.LOAD_TODO] });
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }

  completeTodo(id) {
    this.store.dispatch({ type: "COMPLETE_TODO", payload: { id } });
  }
  deleteTodo(id) {
    this.store.dispatch({ type: "DELETE_TODO", payload: { id } });
  }

  createTodo(text) {
    console.log("creating");
    this.store.dispatch({ type: "ADD_TODO", payload: { text } });
  }
}
