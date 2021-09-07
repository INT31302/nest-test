import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

@Injectable()
export class MessageService {
  async sendMessage(data) {
    const pubSubClient = new PubSub();
    const topicName = 'hello_topic';
    const result = JSON.stringify(data);
    async function publishMessage() {
      // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
      const dataBuffer = Buffer.from(result);
      const customAttributes = {
        test: 'this is test!',
        solar: 'connect',
      };
      console.log(data);
      try {
        const messageId = await pubSubClient
          .topic(topicName)
          .publish(dataBuffer, customAttributes);
        console.log(`Message ${messageId} published.`);
      } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
      }
    }

    await publishMessage();
  }
}
