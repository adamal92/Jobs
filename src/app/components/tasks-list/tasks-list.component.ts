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

  isSelectedOption(opt: MatListOption) {
    let gotSelected: boolean = false;
    this.tasksList.forEach((task: ITask) => {
      if(opt.value.task_id === task.task_id) {
        task.task_status = TaskStatus.DONE;
        gotSelected = true;
      }
    });
    return gotSelected;    
  }

  async onSelected(task: ITask, selected: MatListOption[]): Promise<void> {
    this.unselectAll();
    selected.forEach((opt: MatListOption) => { 
      task.task_status = this.isSelectedOption(opt) ? task.task_status : TaskStatus.TODO;
    });
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
