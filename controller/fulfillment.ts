import { IJokeService } from './../service/jokeService';
import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../constant/types';
import { inject } from 'inversify';

/**
 * Endpoint webhook disponible para DialogFlow
 * 
 * Hacia este endpoint se envía la información de todos los intents 
 * que requieren una realización
 * 
 * En este controlador se hacen todas las realizaciones
 * Si la realización es fallida entonces se envía la respuesta del intent
 * En caso contrario se envía un followUp event que dispara un intent
 * previamente definido con un mensaje de éxito
 */
@controller('/')
export class FulfillmentController {

  private jokeService: IJokeService;

  constructor(
    @inject(TYPES.ChuckNorrisJokeService) jokeService: IJokeService
  ) {
    this.jokeService = jokeService;
  }

  @httpPost('api/fulfillment')
  public async fulfillment(request: Request, response: Response) {
    switch (request.body.result.action) {
      case 'chuckNorrisJoke':
        return await this.jokeService.getJoke();

      default:
        break;
    }
  }
}
