import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ITask } from './app.model';
import appConfig from './app.config.json';

@Injectable()
export class AppService {
  readonly pool: Pool;
  constructor() {
    this.pool = this.initDBPoll();
    this.handleDbErrors();
  }

  initDBPoll() {
    return new Pool({
      user: appConfig.user,
      host: appConfig.host,
      database: appConfig.database,
      password: appConfig.password,
      port: appConfig.port
    });
  }

  handleDbErrors() {
    this.pool.on('error', (err, client) => {
      console.error('Unexpected Error:', err);
      process.exit(-1);
    });
  }

  async getAllTasks(): Promise<ITask[]> {
    const { rows } = await this.pool.query('SELECT * FROM tasks');
    console.log(rows)
    return rows;
  }

  async addTask(newTask: ITask): Promise<string> {
    const { task_id, task_title, task_describtion, task_status } = newTask;
    const { rows } = await this.pool.query(`INSERT INTO tasks (task_title, task_describtion, task_status) VALUES('${task_title}', '${task_describtion}', ${task_status})`);
    return `inserted! ${rows}`;
  }
}
