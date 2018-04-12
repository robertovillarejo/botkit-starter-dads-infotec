import { User } from './../models/user';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { UserService } from '../service/user';
import TYPES from '../constant/types';
import { inject } from 'inversify';

const request = require('request-promise');
const url = "https://api.chucknorris.io/jokes/random";

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
  public async fulfillment(req: Request, response: Response) {
    console.log('Message received!!!');
    console.log(req.body);
    switch (req.body.result.action) {
      case 'chuckNorrisJoke':
        return await this.getJoke();

      case 'usersList':
        console.log('CASO USERS LIST');
        return await new Promise<any>((resolve, reject) => {
          this.userService.getUser('5ace87fd7c82881a287ea844')
            .then((user) => {
              resolve({
                "speech": user.name,
                "messages": [
                  {
                    "type": 0,
                    "platform": "facebook",
                    "speech": user.name
                  },
                  {
                    "type": 0,
                    "speech": user.name
                  }
                ],
                "data": {
                },
                "contextOut": [
                ],
                "source": "fullfillment-system"
              });
            })
        });

      default:
        break;
    }

  }

  private getJoke(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      request({
        "method": "GET",
        "uri": url,
        "json": true,
        "headers": {
        }
      }).then((parsedBody) => {
        resolve({
          "speech": parsedBody.value,
          "messages": [
            {
              "type": 0,
              "platform": "facebook",
              "speech": parsedBody.value
            },
            {
              "type": 3,
              "platform": "facebook",
              "imageUrl": parsedBody.icon_url
            },
            {
              "type": 0,
              "speech": parsedBody.value
            }
          ],
          "data": {
          },
          "contextOut": [
          ],
          "source": "fullfillment-system"
        });
      })
    });
  }

}
