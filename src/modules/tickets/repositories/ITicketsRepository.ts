import ICreateTicketDTO from '../dtos/ICreateTicketDTO';
import Ticket from '../infra/typeorm/entities/Ticket';

export default interface ITicketsRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  findAllByEventId(event_id: string): Promise<Ticket[]>;
  findById(id: string): Promise<Ticket | undefined>;
}
