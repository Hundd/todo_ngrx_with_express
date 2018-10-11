import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { counterReducer } from "./reducers/counter";
import { todoReducer } from "./reducers/todo";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer, todos: todoReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
