import { RoleType } from '../schema/user.schema';

export class UserResponseDto {
  _id: string;
  role: RoleType;
  email: string;

  active: boolean;
}
