import * as express from "express";
import * as helmet from 'helmet';
import * as path from "path";
import { normalizePort } from './utils/utils';


const hbs = require('express-hbs');
const cookieParser = require('cookie-parser');

const ip = require('ip');
const externalIp = ip.address();
const port = normalizePort(process.env.PORT || '3000');
const host = externalIp + ':' + port;

export function configureApp(app: express.Application) {

    //View engine setup
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    app.engine('hbs', hbs.express4({ partialsDir: __dirname + '/views/partials' }));

    app.set('port', port);
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/embed', function (req, res) {

        res.render('embed', {
            layout: 'layouts/default',
            base_url: host
        });

    });

    app.get('/', function (req, res) {

        res.render('index', {
            layout: 'layouts/default',
            base_url: host
        });

    });
}