import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoService {
    constructor(){}

    async getAllTasks(): Promise<ITask[]> {
        return ;
      }
    
      async addTask(newTask: ITask): Promise<string> {
        return this.postgresqlService.addTask(newTask);
      }
    
      async deleteTask(taskId) {
        return this.postgresqlService.deleteTask(taskId);
      }
}
