import express, {
    Application,
    NextFunction,
    Request,
    Response
} from 'express';
import {AddressInfo} from 'net';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import {cookieSecret} from './environment';
import {
    CustomError,
    NotFoundError
} from './classes';
import indexRouter from './router';
import databaseRouter from './router/database';
import authorizationRouter from './router/auth';

class Server {
    private readonly app: Application;
    private readonly port: string | number;
    private readonly server: http.Server;

    constructor(port: string | number) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app);

        this.settingApp();
        this.settingRouter();
        this.settingErrorRouter();
    }

    public start = () => {
        this.server.listen(this.port, () => {
            const address = this.server.address();
            console.log(this.logAddress(address));
        })

        // Event listener for HTTP server 'error' event.
        this.server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') throw error;
            const address = this.server.address();
            const bind = this.logAddress(address);
            // Handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(
                        bind + ' requires elevated privileges'
                    );
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        })
    }

    private settingApp() {
        // View engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        // Cors
        this.app.use(cors());
        // Logger
        this.app.use(logger('dev'));
        // Express
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        // Sessions
        this.app.use(cookieParser(cookieSecret, {}));
    }

    private settingRouter() {
        // Routes
        this.app.use('/', indexRouter);
        this.app.use('/auth', authorizationRouter);
        this.app.use('/', databaseRouter);
    }

    private settingErrorRouter() {
        // Catch 404 and forward to error handler
        this.app.use((
            req: Request,
            res: Response,
            _: NextFunction
        ) => {
            const fail = NotFoundError(req.path)
            res.status(fail.message.code).json(fail);
        });
        // Error handler
        this.app.use((
            err: Error,
            req: Request,
            res: Response,
            _: NextFunction
        ) => {
            const fail = CustomError(err)
            res.status(fail.message.code).json(fail);
        });
    }

    private logAddress(address: string | AddressInfo | null): string {
        let bind: string;
        if (address === null) {
            bind = 'Error: Address is null';
        } else if (typeof address === 'string') {
            bind = `Pipe: http://${address}`;
        } else {
            const addressHost = address.address === '::'
                ? 'localhost'
                : address.address;
            const addressPort = address.port || this.port;
            bind = `Port: http://${addressHost}:${addressPort}`;
        }
        return bind;
    }
}

export default Server;