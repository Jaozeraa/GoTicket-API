import { Repository, getRepository } from 'typeorm';

import IUserTicketsRepository from '../../../repositories/IUserTicketsRepository';
import ICreateUserTicketDTO from '../../../dtos/ICreateUserTicketDTO';
import UserTicket from '../entities/UserTicket';

class UserTicketsRepository implements IUserTicketsRepository {
  private ormRepository: Repository<UserTicket>;
  constructor() {
    this.ormRepository = getRepository(UserTicket);
  }
  public async create({
    event_id,
    info,
    price,
    owner_id,
  }: ICreateUserTicketDTO): Promise<UserTicket> {
    const userTicket = this.ormRepository.create({
      event_id,
      info,
      price,
      owner_id,
    });

    await this.ormRepository.save(userTicket);

    return userTicket;
  }

  public async findAllByOwnerId(owner_id: string): Promise<UserTicket[]> {
    const userTickets = await this.ormRepository.find({
      where: { owner_id },
      relations: ['event'],
    });

    return userTickets;
  }
}

export default UserTicketsRepository;
