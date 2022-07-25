import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoService } from './services/mongo/mongo.service';
import { PostgresqlService } from './services/postgresql/postgresql.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PostgresqlService, MongoService],
})
export class AppModule {}
