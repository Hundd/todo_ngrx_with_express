import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { INCREMENT, DECREMENT, RESET } from "./reducers/counter";
import { Todo } from "./reducers/todo";
import { TodosService } from "./todos.service";

interface AppState {
  count: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  count$: Observable<number>;
  todos$: Observable<Todo>;

  constructor(
    private store: Store<AppState>,
    private todosServise: TodosService
  ) {
    this.count$ = store.pipe(select("count"));
    this.todos$ = store.pipe(select("todos"));

    todosServise.todos.subscribe(payload =>
      this.store.dispatch({ type: "INITIALIZE_TODO", payload })
    );
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
    this.store.dispatch({ type: "ADD_TODO", payload: { text } });
  }
}
