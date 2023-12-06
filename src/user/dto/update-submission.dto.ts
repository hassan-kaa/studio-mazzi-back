import { IsNotEmpty } from 'class-validator';

export class UpdateSubmissionDto {
  @IsNotEmpty()
  readonly data: Record<string, string>;
}
