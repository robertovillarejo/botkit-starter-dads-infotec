import { injectable } from 'inversify';
import { IJokeService } from './jokeService';

import 'reflect-metadata';
const request = require('request-promise');

@injectable()
export class ChuckNorrisJokeService implements IJokeService {

    constructor() {
    }

    public getJoke(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request({
                "method": "GET",
                "uri": "https://api.chucknorris.io/jokes/random",
                "json": true,
                "headers": {
                }
            })
                .then((parsedBody) => {
                    resolve({
                        "speech": parsedBody.value,
                        "messages": [
                            {
                                "type": 0,
                                "platform": "facebook",
                                "speech": parsedBody.value
                            },
                            {
                                "type": 0,
                                "speech": parsedBody.value
                            }
                        ],
                        "data": {
                        },
                        "contextOut": [
                            {
                                "name": "event",
                                "lifespan": 5,
                                "parameters": {
                                    "param": "VALOR1"
                                }
                            }
                        ],
                        "source": "fullfillment-system",
                        "followupEvent": {
                        }
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}