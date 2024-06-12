import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('countries')
  getCountries() {
    return this.addressService.getCountries();
  }

  @Get('countries/:countryCode/states')
  getStates(@Param('countryCode') countryCode: string) {
    return this.addressService.getStates(countryCode);
  }

  @Get('states/:stateId/cities')
  getCities(@Param('stateId') stateId: string) {
    return this.addressService.getCities(stateId);
  }

  @Get()
  getAddress() {
    return this.addressService.findAll();
  }
}
