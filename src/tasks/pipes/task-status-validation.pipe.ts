import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-statu.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
