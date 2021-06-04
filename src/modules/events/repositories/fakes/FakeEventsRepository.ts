import { v4 as uuid } from 'uuid';
import IEventsRepository from '../IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';
import Event from '@modules/events/infra/typeorm/entities/Event';

class FakeEventsRepository implements IEventsRepository {
  private events: Event[] = [];
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
    const event = new Event();

    Object.assign(event, {
      id: uuid(),
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
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.events.unshift(event);

    return event;
  }

  public async findAll(): Promise<Event[]> {
    return this.events;
  }

  public async findAllByOwnerId(owner_id: string): Promise<Event[]> {
    const events = this.events.filter(
      filteredEvent => filteredEvent.owner_id === owner_id,
    );

    return events;
  }

  public async findById(id: string): Promise<Event | undefined> {
    const event = this.events.find(findEvent => findEvent.id === id);

    return event;
  }

  public async deleteByEvent(event: Event): Promise<void> {
    const eventIndex = this.events.findIndex(findEvent => findEvent === event);

    delete this.events[eventIndex];

    return;
  }

  public async save(event: Event): Promise<Event> {
    const eventIndex = this.events.findIndex(findEvent => findEvent === event);

    this.events[eventIndex] = event;

    return event;
  }
}

export default FakeEventsRepository;
