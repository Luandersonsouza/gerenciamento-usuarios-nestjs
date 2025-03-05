import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  
  @Exclude()
  @Column()
  password: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ default: 'user' })
  role: string;
}