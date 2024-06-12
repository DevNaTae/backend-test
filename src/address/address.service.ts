import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Address } from './schema/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  private readonly apiUrl: string;

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = 'https://www.geonames.org/';
  }

  async getCountries() {
    const response = await this.httpService
      .get(`${this.apiUrl}/countryInfoJSON`, {
        params: {
          username: this.configService.get<string>('GEONAMES_USERNAME'),
        },
      })
      .toPromise();
    return response.data.geonames;
  }

  async getStates(countryCode: string) {
    const response = await this.httpService
      .get(`${this.apiUrl}/childrenJSON`, {
        params: {
          geonameId: countryCode,
          username: this.configService.get<string>('GEONAMES_USERNAME'),
        },
      })
      .toPromise();
    return response.data.geonames;
  }

  async getCities(stateId: string) {
    const response = await this.httpService
      .get(`${this.apiUrl}/childrenJSON`, {
        params: {
          geonameId: stateId,
          username: this.configService.get<string>('GEONAMES_USERNAME'),
        },
      })
      .toPromise();
    return response.data.geonames;
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async create(address: Address) {
    return await this.addressRepository.save(address);
  }
}
