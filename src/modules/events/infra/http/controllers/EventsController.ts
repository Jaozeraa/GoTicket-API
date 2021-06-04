import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventService from '@modules/events/services/CreateEventService';
import ListUserEventsService from '@modules/events/services/ListUserEventsService';
import ListEventsService from '@modules/events/services/ListEventsService';
import DeleteEventService from '@modules/events/services/DeleteEventService';
import ShowEventService from '@modules/events/services/ShowEventService';

export default class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      CEP,
      available_tickets,
      date,
      description,
      name,
      neighborhood,
      number,
      state_city,
      street,
      type,
    } = request.body;

    const createEvent = container.resolve(CreateEventService);

    const event = await createEvent.execute({
      CEP,
      available_tickets,
      date: parseISO(date),
      description,
      name,
      neighborhood,
      number,
      owner_id: request.user.id,
      promo_image_filename: request.file.filename,
      state_city,
      street,
      type,
    });

    return response.json(classToClass(event));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const me = request.query.me;
    const { id: user_id } = request.user;

    if (me) {
      const listUserEvents = container.resolve(ListUserEventsService);

      const events = await listUserEvents.execute({
        user_id,
      });

      return response.json(classToClass(events));
    }

    const listEvents = container.resolve(ListEventsService);

    const events = await listEvents.execute();

    return response.json(classToClass(events));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { event_id } = request.params;

    const deleteEvent = container.resolve(DeleteEventService);

    await deleteEvent.execute({
      event_id,
      user_id: request.user.id,
    });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const showEvent = container.resolve(ShowEventService);

    const event = await showEvent.execute({
      event_id,
    });

    return response.json(classToClass(event));
  }
}
