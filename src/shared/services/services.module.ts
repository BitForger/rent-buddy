import { Global, Module } from '@nestjs/common';
import { UserService } from './user/user.service';

const services = [UserService];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
