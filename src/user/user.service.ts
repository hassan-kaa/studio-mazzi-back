import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { SubmittedFormData } from './schema/submitted-form-data.schema';
import { UserResponseDto } from './dto/UserResponseDto';
import { JwtAuthService } from 'src/jwt/jwt.service';
const generateRandomPassword = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('SubmittedFormData')
    private readonly formDataModel: Model<SubmittedFormData>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async validateUser(email: string, password: string): Promise<boolean> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.findByEmail(email);
    if (user && user.password === passwordHash) {
      return true;
    }
    return false;
  }
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, role } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new NotFoundException(
        'User with the provided email already exists',
      );
    }

    const password = generateRandomPassword(10); // Generate a random password
    const passwordHash = await bcrypt.hash(password, 10); // Hash the password

    const user = new User();
    user.role = role;
    user.active = false;
    user.email = email;
    user.password = passwordHash;

    const createdUser = new this.userModel(user);
    await createdUser.save();

    const userResponse: UserResponseDto = {
      _id: createdUser.id,
      role: createdUser.role,
      email: createdUser.email,
      active: createdUser.active,
    };
    const token = this.jwtAuthService.generateToken({ email: email });
    //await this.mailService.sendPasswordResetEmail(email, token);
    return userResponse;
  }
}
