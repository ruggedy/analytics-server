import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';

import * as mailgun from 'mailgun-js';



// route imports
import userRoutes from './routes/users';

class Server {
    app: express.Application;
    mongoose = mongoose

    public static bootstrap(): Server {
        return new Server();
    }

    constructor(){
        this.app = express();

        process.env['MAILGUN_API_KEY'] = 'key-f901f4658ef67d227243238bb77271cf';
        process.env['MAILGUN_DOMAIN'] = 'sandbox96b40d2c7a4e41edb1a7d4a96bae1f38.mailgun.org';
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect('localhost:27017/weavee-analytics');

        this.ExpressConfiguration();
    }

    ExpressConfiguration = () => {


        this.app.use(express.static(__dirname+ "/public"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cookieParser());

        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, X-Requested-With');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next()
        });

        this.app.use('/api/user', userRoutes);
        this.app.use('/*', (req, res, next) => {
            res.sendFile(__dirname + 'public/index.html');
        });
    }
} 

const port: number = process.env.PORT || 3000;
let httpServer = Server.bootstrap();
let app = httpServer.app;
app.set("port", port);


app.listen(port, function(err){
    console.log('Running server on Port ' + port);
    if(err){
        console.log(err);
    }
})