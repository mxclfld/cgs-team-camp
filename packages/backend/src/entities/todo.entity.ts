import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
