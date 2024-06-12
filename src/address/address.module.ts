import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './schema/address.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Address]), ConfigModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
