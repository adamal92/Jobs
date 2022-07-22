import { Component } from '@angular/core';
import { ITask } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  word: any;
  tasksList: ITask[] = [];

  constructor() {  }

  async getAllTasks() {
    const res = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    this.word = await res.text();
    this.tasksList.push(this.word);
    console.log(this.word)
  }

  async addTask() {
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        task_id: 2,
        task_title: "second task",
        task_describtion: "not so important",
        task_status: 1
      })
    });
    this.word = await res.text();
    console.log(this.word)
  } 
}
