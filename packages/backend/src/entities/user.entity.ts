import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Todo } from './todo.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.userId)
  todos: Todo[];
}
