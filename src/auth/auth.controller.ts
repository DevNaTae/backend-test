import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestInterface } from './interface/request.interface';
import { Role } from 'src/role/roles.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  profile(@Req() req: RequestInterface) {
    return this.authService.profile(req.user);
  }
}
