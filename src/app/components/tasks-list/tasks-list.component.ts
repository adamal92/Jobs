import { Component, OnInit } from '@angular/core';
import { ITask, TaskStatus } from 'src/app/app.model';
import { TasksService } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less']
})
export class TasksListComponent implements OnInit {
  allTasks: any;
  tasksList: ITask[] = [];
  describtion: string = "";
  title: string = "";
  selectedTasks: ITask[] = [];

  constructor(protected tasksService: TasksService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  async onSelected(task: ITask) {
    task.task_id = task.task_status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO;
    await this.deleteTask(task.task_id);
    await this.tasksService.addTask(task);
  }

  async getAllTasks() {
    this.tasksList = await this.tasksService.getAllTasks();
  }

  async addTask() {
    const data: ITask = {
      task_id: NaN,
      task_title: this.title,
      task_describtion: this.describtion,
      task_status: TaskStatus.TODO
    };
    
    await this.tasksService.addTask(data);
    this.getAllTasks();
  }

  async deleteTask(task_id: number) {
    await this.tasksService.deleteTask(task_id);
    this.getAllTasks();
  }
}
