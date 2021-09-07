import { DynamicModule, Logger, Module } from '@nestjs/common';
import { PubsubService } from './pubsub.service';
import { PubsubConfig } from '@pubsub/pubsub.model';

@Module({})
export class PubsubModule {
  static register(config: PubsubConfig): DynamicModule {
    return {
      module: PubsubModule,
      providers: [
        Logger,
        {
          provide: PubsubConfig,
          useValue: config,
        },
        PubsubService,
      ],
      exports: [PubsubService],
    };
  }
}
