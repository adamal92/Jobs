import { Injectable } from '@nestjs/common';
import { ITask } from 'src/app.model';
import { Collection, Document, MongoClient } from 'mongodb';

import appConfig from '../../app.config.json';

@Injectable()
export class MongoService {
    client: MongoClient;
    collection: Collection<Document>;

    constructor(){
    }

    connect() {
        this.client = new MongoClient(appConfig.mongoConnectionString);
        this.client.connect(err => {
            this.collection = this.client.db("mongo").collection("tasks");
        });
    }

    disconnect() {
        this.client.close();
    }

    async getAllTasks() {
        this.connect();
        return this.collection?.find({}).toArray();
    }

    async addTask(newTask: ITask) {
        const mongoose = require('mongoose');
        mongoose.connect(appConfig.mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("connected!!!!!!!!!!!!!!!!")
        // we're connected!
        });
        const kittySchema = new mongoose.Schema({
            name: String
        });

        let itten = mongoose.model('Kitten', kittySchema);
        const silence = new itten({ name: 'Silence' });
        console.log(silence.name); // 'Silence'
        kittySchema.methods.speak = function () {
            const greeting = this.name
                ? "Meow name is " + this.name
                : "I don't have a name";
            console.log(greeting);
        }
        const Kitten = mongoose.model('Kitten', kittySchema);
        const fluffy = new Kitten({ name: 'fluffy' });
        fluffy.save(function (err, fluffy) {
            if (err) return console.error(err);
          });
        // let ret;
        // this.client = new MongoClient(appConfig.mongoConnectionString, { });
        // this.client.connect(async err => {
        //     let db = this.client.db("mongo");
        //     let collection = db.collection("tasks");
        //     await collection.insertOne({});
        //     console.log(collection)
        //     console.log(collection.collectionName)
        //     // this.collection = this.client.db("mongo").collection("tasks");
        //     // ret = this.collection.insertOne(newTask);
        //     this.client.close();
        //   });
        //   this.insert();
        // return ret;
    }


      
    //   async insert() {
    //     const client = new Mongo(appConfig.mongoConnectionString, "", "");
                  
    //       try {
    //       await client.connect();
    //       const database = client.db("mongo");
    //       const movies = database.collection("tasks");
    //       // create a document to be inserted
    //       const doc = { name: "Red", town: "kanto" };
    //       const result = await movies.insertOne(doc);
    //       console.log("Done");
    //     } finally {
    //       await client.close();
    //     }
    // }
    async deleteTask(taskId) {
        return (await this.collection.deleteOne((doc) => doc.task_id === taskId)).toString();
    }
}
