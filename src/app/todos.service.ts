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
}
