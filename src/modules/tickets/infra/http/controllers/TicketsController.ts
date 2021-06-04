import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;
    const { tickets } = request.body;

    const createTicket = container.resolve(CreateTicketService);

    const ticket = await createTicket.execute({
      event_id,
      tickets,
      user_id: request.user.id,
    });

    return response.json(classToClass(ticket));
  }
}
