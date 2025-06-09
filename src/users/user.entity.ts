import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
