import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITask } from 'src/app/app.model';
import { TasksService } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less']
})
export class TasksListComponent implements OnInit, OnChanges {
  allTasks: any;
  tasksList: ITask[] = [];

  constructor(protected tasksService: TasksService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllTasks();
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  async getAllTasks() {
    this.tasksList = await this.tasksService.getAllTasks();
    // this.tasksList.concat(this.allTasks);
    console.log(this.allTasks)
  }

  async addTask() {
    const data: ITask = {
      task_id: 2,
      task_title: "second task",
      task_describtion: "not so important",
      task_status: 1
    };
    
    this.allTasks = await this.tasksService.addTask(data);
    console.log(this.allTasks)
  } 
}
