import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PubsubModule } from '@pubsub/pubsub.module';

@Module({
  imports: [
    PubsubModule.register({
      projectId: 'formal-analyzer-325202',
      subscription: 'sub_one',
      topic: 'hello_topic',
    }),
    PubsubModule.register({
      projectId: 'formal-analyzer-325202',
      subscription: 'sub_two',
      topic: 'hello_topic',
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
