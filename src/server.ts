import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';



// route imports


class Server {
    app: express.Application;
    mongoose = mongoose

    public static bootstrap(): Server {
        return new Server();
    }

    constructor(){
        this.app = express();


        this.mongoose.Promise = global.Promise;
        this.mongoose.connect('');

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