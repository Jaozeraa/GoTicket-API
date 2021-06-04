import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  promo_image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: 'Show' | 'Festa' | 'Teatro';

  @Column()
  state_city: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  CEP: string;

  @Column('timestamp')
  date: Date;

  @Column('decimal')
  available_tickets: number;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'promo_image_url' })
  getPromo_image_url(): string | null {
    if (!this.promo_image) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.promo_image}`;
  }
}

export default Event;
