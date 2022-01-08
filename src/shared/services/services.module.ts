import { Global, Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { ChargeService } from './charge/charge.service';

const services = [UserService, ChargeService];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
