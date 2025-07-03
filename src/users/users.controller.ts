import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './users.repository';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { CreateUserDTO } from './dtos/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.usersService.getUsers(+page, +limit);
    }

    return this.usersService.getUsers(1, 7);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersById(id);
  }

  // @Post()
  // postUsers(@Body() user: CreateUserDTO) {
  //   return this.usersService.createUser(user);
  // }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  putUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDTO,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
