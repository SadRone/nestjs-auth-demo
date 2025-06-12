import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')  // table name in DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
