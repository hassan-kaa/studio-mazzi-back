import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';

enum RoleType {
  Client = 'client',
  Admin = 'admin',
  Reviewer = 'reviewer',
}
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  // Add other user-specific fields as needed

  @Prop({ required: true })
  @Exclude()
  password: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Template' }],
    required: true,
  })
  templates: Types.ObjectId[];

  @Prop({ enum: RoleType, required: true })
  role: RoleType;

  @Prop({ required: true })
  active: boolean;

  @Prop({ default: null, type: Date })
  deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
export { RoleType };
