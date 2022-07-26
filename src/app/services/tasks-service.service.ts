import { Injectable } from '@angular/core';
import { ITask } from '../app.model';
import appConfig from '../app.config.json' 

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  async getAllTasks(): Promise<ITask[]> {
    const res = await fetch(appConfig.backendUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    return await res.json();
  }

  async addTask(newTask: ITask) {
    const res = await fetch(appConfig.backendUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });
    return await res.text();
  }
  
  async updateTask(task: ITask) {
    return (await fetch(appConfig.backendUrl, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })).text();
  }

  async deleteTask(task_id: number) {
    const res = await fetch(appConfig.backendUrl, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task_id})
    });
    return await res.text();
  }
}
