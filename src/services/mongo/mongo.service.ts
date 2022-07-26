import { Injectable } from '@nestjs/common';
import { ITask } from 'src/app.model';
import { Collection, Document, MongoClient } from 'mongodb';
import appConfig from '../../app.config.json';
const mongoose = require('mongoose');

@Injectable()
export class MongoService {
    client: MongoClient;
    collection: Collection<Document>;
    TaskSchema: any;
    TaskModel: any;

    constructor(){
        this.connect();
        this.createSchema();
    }

    connect() {
        mongoose.connect(appConfig.mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
    }

    createSchema() {
        this.TaskSchema = new mongoose.Schema({
            task: {
                task_id: Number,
                task_title: String,
                task_describtion: String,
                task_status: Number
            } 
        }, { collection: 'mongo.tasks' });

        this.TaskModel = mongoose.model('Task', this.TaskSchema);
    }

    async getAllTasks() {
        return await this.TaskModel.find();
    }

    async addTask(newTask: ITask) {
        const tasksModel = new this.TaskModel({ task: newTask });
        tasksModel.save(function (err, tasks) {
            if (err) return console.error(err);
          });        
    }

    async updateTask(updatedTask: ITask) {
        const task_id = updatedTask.task_id;
        this.TaskModel.updateOne({ task: { task_id } }, { task: updatedTask });
    }

    async deleteTask(taskId) {
        return this.TaskModel.deleteOne({ task: { taskId } });
    }
}
