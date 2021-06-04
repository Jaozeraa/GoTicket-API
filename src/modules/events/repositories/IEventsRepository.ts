import ICreateEventDTO from '../dtos/ICreateEventDTO';
import Event from '../infra/typeorm/entities/Event';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findAll(): Promise<Event[]>;
  findAllByOwnerId(owner_id: string): Promise<Event[]>;
  findById(id: string): Promise<Event | undefined>;
  deleteByEvent(event: Event): Promise<void>;
  save(event: Event): Promise<Event>;
}
