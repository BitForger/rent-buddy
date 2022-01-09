import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { UserService } from "../../shared/services/user/user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    if (user) {
      return user;
    }

    throw new NotFoundException({
      msg: 'User does not exist',
    });
  }
}
