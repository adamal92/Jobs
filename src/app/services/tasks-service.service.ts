import { Injectable } from '@angular/core';
import { ITask } from '../app.model';
import * as appConfig from '../app.config.json' 

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  async getAllTasks(): Promise<string> {
    const res = await fetch(appConfig.postgreDbUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    return await res.text();
  }

  async addTask(newTask: ITask) {
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });
    return await res.text();
  } 
}
