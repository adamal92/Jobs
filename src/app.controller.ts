import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ITask } from './app.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllTasks(): Promise<ITask[]> {
    return await this.appService.getAllTasks();
  }

  @Post()
  async addTask(@Body() newTask): Promise<string> {
    return await this.appService.addTask(newTask);
  }
  
  @Delete()
  async deleteTask(@Body() taskInfo): Promise<string> {
    return await this.appService.deleteTask(taskInfo.task_id);
  }
}
