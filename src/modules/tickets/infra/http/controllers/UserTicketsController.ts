import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import BuyTicketService from '@modules/tickets/services/BuyTicketService';
import ListUserTicketsService from '@modules/tickets/services/ListUserTicketsService';

export default class UserTicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.params;

    const buyTicket = container.resolve(BuyTicketService);

    const userTicket = await buyTicket.execute({
      ticket_id,
      user_id: request.user.id,
    });

    return response.json(classToClass(userTicket));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserTickets = container.resolve(ListUserTicketsService);

    const userTickets = await listUserTickets.execute({
      user_id: request.user.id,
    });

    return response.json(classToClass(userTickets));
  }
}
