import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
