import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
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

  unselectAll() {
    this.tasksList.forEach((task: ITask) => {
      task.task_status = TaskStatus.TODO;
    })
  }

  async onSelected(task: ITask, selectionModel: SelectionModel<MatListOption> ): Promise<void> {
    this.unselectAll();
    let gotSelected: boolean = false;
    console.log(selectionModel.selected)
    selectionModel.selected.forEach((opt: MatListOption) => {
      console.log(opt.value.task_status)
      console.log(opt)
      if(opt.value.task_status === task.task_id) {
        task.task_status = TaskStatus.TODO;
        gotSelected = true;
      }  
    });
    task.task_status = gotSelected ? task.task_status : TaskStatus.DONE;
    console.log(task.task_status)
    await this.tasksService.updateTask(task);
    await this.getAllTasks();
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
