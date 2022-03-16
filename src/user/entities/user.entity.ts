import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  userName: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
