import { Injectable } from '@nestjs/common';
import { ITask } from './app.model';
import { MongoService } from './services/mongo/mongo.service';
import { PostgresqlService } from './services/postgresql/postgresql.service';

@Injectable()
export class AppService {
  constructor(protected postgresqlService: PostgresqlService, protected mongoService: MongoService) { 
    this.mongoService.connect();
  }

  async getAllTasks(): Promise<ITask[]> {
    try {
      return this.postgresqlService.getAllTasks();
    } catch (e) {
      return this.mongoService.getAllTasks();
    }
  }

  async addTask(newTask: ITask): Promise<string> {
    this.mongoService.addTask(newTask);
    return this.postgresqlService.addTask(newTask);
  }

  async updateTask(updatedTask: ITask) {
    this.mongoService.updateTask(updatedTask);
    return await this.postgresqlService.updateTask(updatedTask);
  }

  async deleteTask(taskId) {
    this.mongoService.deleteTask(taskId);
    return this.postgresqlService.deleteTask(taskId);
  }
}
