import { Global, Module } from "@nestjs/common";
import { ServicesModule } from "./shared/services/services.module";
import { UserController } from "./controllers/user/user.controller";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User, UserSchema } from "./db/user.schema";
import { Charge, ChargeSchema } from "./db/charge.schema";
import { ChargeController } from "./controllers/charge/charge.controller";
import { LoggerModule, Params } from "nestjs-pino";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService): Promise<Params> {
        return {
          pinoHttp: {
            prettyPrint: configService.get('NODE_ENV') === 'production',
          },
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService): MongooseModuleOptions {
        // const certString = configService.get('MONGO_CERT');
        // const decoded = Buffer.from(certString, 'base64').toString('utf-8');
        const uri = configService.get<string>('MONGO_URI');
        return {
          uri,
          dbName: 'rent-buddy',
        };
      },
    }),
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: ChargeSchema, name: Charge.name },
    ]),
    ServicesModule,
  ],
  controllers: [UserController, ChargeController],
  providers: [],
  exports: [MongooseModule],
})
export class AppModule {}
