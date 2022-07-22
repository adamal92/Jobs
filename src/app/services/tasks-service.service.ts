import { Injectable } from '@angular/core';
import { ITask } from '../app.model';
import appConfig from '../app.config.json' 

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  async getAllTasks(): Promise<ITask[]> {
    const res = await fetch(appConfig.postgreDbUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    return await res.json();
  }

  async addTask(newTask: ITask) {
    const res = await fetch(appConfig.postgreDbUrl, {
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
