import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo } from "./reducers/todo";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  constructor(private http: HttpClient) {}

  get todos(): Observable<Todo[]> {
    return this.http.get("http://localhost:1333/todos") as Observable<Todo[]>;
  }

  addTodo(todo: Todo) {
    return this.http.post("http://localhost:1333/todo", todo);
  }

  completeTodo(id: number) {
    return this.http.patch("http://localhost:1333/todo", { id });
  }

  deleteTodo(id: number) {
    return this.http.delete(`http://localhost:1333/todo/${id}`);
  }
}
