import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleType } from '../schema/user.schema';

export class CreateUserDto {
  @IsBoolean()
  @IsOptional()
  readonly active: boolean;

  @IsNotEmpty()
  readonly role: RoleType;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
