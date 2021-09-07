import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { MessageModule } from './message/message.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from './filters/exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [ConfigurationModule, MessageModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
