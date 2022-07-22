import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/app.model';
import { TasksService } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less']
})
export class TasksListComponent implements OnInit {
  word: any;
  tasksList: ITask[] = [];

  constructor(protected tasksService: TasksService) { }

  ngOnInit(): void {
  }

  async getAllTasks() {
    this.word = await this.tasksService.getAllTasks();
    this.tasksList.push(this.word);
    console.log(this.word)
  }

  async addTask() {
    const data: ITask = {
      task_id: 2,
      task_title: "second task",
      task_describtion: "not so important",
      task_status: 1
    };
    
    this.word = await this.tasksService.addTask(data);
    console.log(this.word)
  } 
}
