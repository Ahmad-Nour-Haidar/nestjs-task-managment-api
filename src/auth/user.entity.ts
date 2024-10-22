import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// @Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;
}
