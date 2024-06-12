import { User } from 'src/user/schema/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
