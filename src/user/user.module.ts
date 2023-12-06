import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthService } from 'src/jwt/jwt.service';
import { UserSchema } from './schema/user.schema';
import { SubmittedFormDataSchema } from './schema/submitted-form-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'SubmittedFormData', schema: SubmittedFormDataSchema },
    ]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, JwtAuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
