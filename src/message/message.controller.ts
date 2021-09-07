import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { MessageService } from './message.service';
import { AllExceptionsFilter } from '../filters/exception.filter';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseFilters(new AllExceptionsFilter())
  async sendMessage(@Body() data: Request) {
    await this.messageService.sendMessage(data);
  }
}
