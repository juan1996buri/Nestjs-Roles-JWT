import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'bool', default: true })
  status: boolean;
}
