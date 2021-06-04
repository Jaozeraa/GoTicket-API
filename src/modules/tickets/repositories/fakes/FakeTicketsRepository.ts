import { v4 as uuid } from 'uuid';
import ITicketsRepository from '../ITicketsRepository';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];
  public async create({
    event_id,
    info,
    price,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket();

    Object.assign(ticket, {
      id: uuid(),
      event_id,
      info,
      price,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.tickets.unshift(ticket);

    return ticket;
  }

  public async findAllByEventId(event_id: string): Promise<Ticket[]> {
    const tickets = this.tickets.filter(
      filteredTicket => filteredTicket.event_id === event_id,
    );

    return tickets;
  }

  public async findById(id: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.find(findTicket => findTicket.id === id);

    return ticket;
  }
}

export default FakeTicketsRepository;
