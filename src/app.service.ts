import { Injectable } from '@nestjs/common';
import { ITask } from './app.model';
import { PostgresqlService } from './services/postgresql/postgresql.service';

@Injectable()
export class AppService {
  constructor(protected postgresqlService: PostgresqlService) { }

  async getAllTasks(): Promise<ITask[]> {
    return this.postgresqlService.getAllTasks();
  }

  async addTask(newTask: ITask): Promise<string> {
    return this.postgresqlService.addTask(newTask);
  }

  async deleteTask(taskId) {
    return this.postgresqlService.deleteTask(taskId);
  }
}
