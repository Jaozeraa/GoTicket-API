import { Repository, getRepository } from 'typeorm';

import IEventsRepository from '../../../repositories/IEventsRepository';
import ICreateEventDTO from '../../../dtos/ICreateEventDTO';
import Event from '../entities/Event';

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;
  constructor() {
    this.ormRepository = getRepository(Event);
  }
  public async create({
    name,
    CEP,
    date,
    description,
    neighborhood,
    number,
    state_city,
    street,
    type,
    available_tickets,
    owner_id,
    promo_image,
  }: ICreateEventDTO): Promise<Event> {
    const event = this.ormRepository.create({
      name,
      CEP,
      date,
      description,
      neighborhood,
      number,
      state_city,
      street,
      type,
      available_tickets,
      owner_id,
      promo_image,
    });

    await this.ormRepository.save(event);

    return event;
  }

  public async findAll(): Promise<Event[]> {
    const events = await this.ormRepository.find();

    return events;
  }

  public async findAllByOwnerId(owner_id: string): Promise<Event[]> {
    const events = await this.ormRepository.find({
      where: { owner_id },
    });

    return events;
  }

  public async findById(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      where: { id },
    });

    return event;
  }

  public async deleteByEvent(event: Event): Promise<void> {
    await this.ormRepository.remove(event);

    return;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }
}

export default EventsRepository;
