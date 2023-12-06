import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class SubmittedFormData {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  clientId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  })
  templateId: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  data: Record<string, string>;

  @Prop({ default: null, type: Date })
  deletedAt: Date | null;
}

export const SubmittedFormDataSchema =
  SchemaFactory.createForClass(SubmittedFormData);
