import { IsNotEmpty } from 'class-validator';

export class SubmittedFormDataDto {
  @IsNotEmpty()
  readonly data: Record<string, string>;
}
