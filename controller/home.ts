import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserService } from '../service/user';
import TYPES from '../constant/types';
import { inject } from 'inversify';

/**
 * Endpoint webhook disponible para DialogFlow
 * 
 * Hacia este endpoint se envía la información de todos los intents 
 * que requieren una realización
 * 
 * En este controlador se hacen todas las realizaciones
 * Si la realización es exitosa entonces se envía la respuesta del intent
 * En caso contrario se envía un followUp event que dispara un intent
 * previamente definido con un mensaje de error
 */
@controller('/')
export class FulfillmentController {

  constructor(@inject(TYPES.UserService) private userService: UserService) { }

  @httpGet('/')
  public get(): string {
    return 'Home sweet rob';
  }

  @httpGet('api/fulfillment')
  public post(): string {
    return 'Home sweet home';
  }

  @httpPost('api/fulfillment')
  public fulfillment(request: any): any {
    console.log('Message received!!!');
    console.log(request.body);
    return {
      "speech": "FULFILLED!",
      "messages": [
        {
          "type": 0,
          "platform": "facebook",
          "speech": "CHISTE!"
        }
      ],
      "data": {
      },
      "contextOut": [
      ],
      "source": "example.com"
    };
  }
}
