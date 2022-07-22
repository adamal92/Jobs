import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ITask } from './app.model';

@Injectable()
export class AppService {
  readonly pool: Pool;
  constructor() {
    this.pool = this.initDBPoll();
    this.handleDbErrors();
  }

  initDBPoll() {
    return new Pool({
      user: 'postgres', //process.env.DB_USER,
      host: 'localhost', //process.env.DB_HOST,
      database: 'postgres', //process.env.DB_DATABASE,
      password: '123456', //process.env.DB_PASSWORD,
      port: 5433 //process.env.DB_PORT
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
    console.log(newTask)
    const { task_id, task_title, task_describtion, task_status } = newTask;
    const { rows } = await this.pool.query(`INSERT INTO tasks (task_title, task_describtion, task_status) VALUES('${task_title}', '${task_describtion}', ${task_status})`);
    console.log(rows)
    return `inserted! ${rows}`;
  }
}
