import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatListOption } from '@angular/material/list';
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
  describtion: string = "";
  title: string = "";
  selectedTasks: ITask[] = [];

  constructor(protected tasksService: TasksService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllTasks();
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  onSelected(option: MatListOption, task: ITask) {
    if(option.selected) {
      
    }
  }

  onNgModelChange(event: any): void {
    console.log(event)
    console.log(this.selectedTasks)
  }

  async getAllTasks() {
    this.tasksList = await this.tasksService.getAllTasks();
  }

  async addTask() {
    const data: ITask = {
      task_id: 2,
      task_title: this.title,
      task_describtion: this.describtion,
      task_status: 1
    };
    
    // this.allTasks = await this.tasksService.addTask(data);
    console.log(await this.tasksService.addTask(data))
    this.getAllTasks()
  }

  async deleteTask(task_id: number) {
    await this.tasksService.deleteTask(task_id);
    this.getAllTasks();
  }
}
