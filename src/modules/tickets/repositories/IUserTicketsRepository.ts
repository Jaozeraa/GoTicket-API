import ICreateUserTicketDTO from '../dtos/ICreateUserTicketDTO';
import UserTicket from '../infra/typeorm/entities/UserTicket';

export default interface IUserTicketsRepository {
  create(data: ICreateUserTicketDTO): Promise<UserTicket>;
  findAllByOwnerId(owner_id: string): Promise<UserTicket[]>;
}
