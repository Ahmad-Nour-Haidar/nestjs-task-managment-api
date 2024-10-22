import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // Create a user_id column in the tasks table
  @Column({ name: 'user_id' })
  user_id: string;

  // Define the relationship with the User entity
  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @JoinColumn({ name: 'user_id' }) // Explicitly name the foreign key column
  @Exclude() // Exclude the user object from the response
  user: User;
}
