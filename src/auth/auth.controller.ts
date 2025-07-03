import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from 'src/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // getAuth() {
  //   return this.authService.getAuth();
  // }

  // @Get(':login')
  // getAuthLogin(@Body() authLogin: Auth) {
  //   return this.authService.getAuthLogin(authLogin);
  // }

  @Post('signin')
  signIn(@Body() credentials: LoginDTO) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  postUsers(@Body() user: CreateUserDTO) {
    return this.authService.createUser(user);
  }
}
