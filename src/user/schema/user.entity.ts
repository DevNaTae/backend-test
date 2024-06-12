import { Address } from 'src/address/schema/address.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string;

  @OneToOne(() => Address, (address) => address.id)
  address: Address;
}
