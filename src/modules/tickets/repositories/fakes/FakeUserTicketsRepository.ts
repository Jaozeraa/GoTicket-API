import { v4 as uuid } from 'uuid';
import IUserTicketsRepository from '../IUserTicketsRepository';
import ICreateUserTicketDTO from '@modules/tickets/dtos/ICreateUserTicketDTO';
import UserTicket from '@modules/tickets/infra/typeorm/entities/UserTicket';

class FakeUserTicketsRepository implements IUserTicketsRepository {
  private userTickets: UserTicket[] = [];
  public async create({
    event_id,
    info,
    price,
    owner_id,
  }: ICreateUserTicketDTO): Promise<UserTicket> {
    const userTicket = new UserTicket();

    Object.assign(userTicket, {
      id: uuid(),
      event_id,
      info,
      price,
      owner_id,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.userTickets.unshift(userTicket);

    return userTicket;
  }

  public async findAllByOwnerId(owner_id: string): Promise<UserTicket[]> {
    const userTickets = this.userTickets.filter(
      filteredTicket => filteredTicket.owner_id === owner_id,
    );

    return userTickets;
  }
}

export default FakeUserTicketsRepository;
