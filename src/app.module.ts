import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/schema/user.entity';
import { Address } from './address/schema/address.entity';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        entities: [User, Address],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    UserModule,
    AddressModule,
    AuthModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
