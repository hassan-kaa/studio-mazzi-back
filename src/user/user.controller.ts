import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthService } from 'src/jwt/jwt.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  @Get('get')
  findAll(): string {
    return 'this is user test';
  }
  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: any,
  ): void {
    const isValidUser = this.userService.validateUser(email, password);
    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate and return a JWT token for the authenticated user if needed
    const token = this.jwtAuthService.generateToken({ email: email });

    res
      .status(200)
      .json({ status: 'success', message: 'Login successful', token });
  }
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Post('test')
  test(): string {
    return 'this is just a test';
  }
}
