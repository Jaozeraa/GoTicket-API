import { Repository, getRepository } from 'typeorm';

import ITicketsRepository from '../../../repositories/ITicketsRepository';
import ICreateTicketDTO from '../../../dtos/ICreateTicketDTO';
import Ticket from '../entities/Ticket';

class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;
  constructor() {
    this.ormRepository = getRepository(Ticket);
  }
  public async create({
    event_id,
    info,
    price,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.ormRepository.create({
      event_id,
      info,
      price,
    });

    await this.ormRepository.save(ticket);

    return ticket;
  }

  public async findAllByEventId(event_id: string): Promise<Ticket[]> {
    const tickets = await this.ormRepository.find({
      where: { event_id },
    });

    return tickets;
  }

  public async findById(id: string): Promise<Ticket | undefined> {
    const ticket = await this.ormRepository.findOne({
      where: { id },
    });

    return ticket;
  }
}

export default TicketsRepository;
