import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity';

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  isCompleted: boolean;

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}
