import { Inject, Injectable, Logger } from '@nestjs/common';
import { Message, PubSub, Subscription } from '@google-cloud/pubsub';
import { PubsubConfig } from '@pubsub/pubsub.model';

@Injectable()
export class PubsubService {
  private readonly pubsubClient: PubSub;
  private readonly subscription: Subscription;
  constructor(
    private logger: Logger,
    @Inject(PubsubConfig) private readonly config: PubsubConfig,
  ) {
    this.logger.setContext(this.constructor.name);
    this.pubsubClient = new PubSub({
      projectId: config.projectId,
    });
    this.subscription = this.pubsubClient
      .topic(this.config.topic)
      .subscription(this.config.subscription);
    this.listenPubsub();
    this.logger.debug('PubsubService constructor called');
  }

  /**
   * message 가 수신됐을 경우 실행되는 함수
   * data 를 출력하고 ack 해줍니다.
   * @param message
   */
  messageHandler(message: Message) {
    try {
      // console.log(message);
      const data = JSON.parse(message.data.toString());
      const attributes = message.attributes;
      console.log(
        'name:',
        this.subscription.name,
        'data:',
        data,
        'attributes:',
        attributes,
      );
      message.ack();
    } catch (err) {
      this.logger.error(`onPubsubMessageErr => ${err}`);
      this.logger.error(
        `Err data => ${JSON.stringify(JSON.parse(message.data.toString()))}`,
      );
    }
  }

  /**
   * error 가 수신됐을 경우 실행되는 함수
   * @param error
   */
  errorHandler(error: Message) {
    console.error(`ERROR:  ${error}`);
  }

  /**
   * 구독한 topic 을 publish 해주는 것을 기다리는 함수
   */
  listenPubsub() {
    this.subscription.on('message', (message: Message) => {
      this.messageHandler(message);
    });
    this.subscription.on('error', this.errorHandler);
  }
}
