import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import {
  SQSClient,
  SendMessageCommand
} from "@aws-sdk/client-sqs";
import { sendLog } from "./logger.js";

// express app
const app: Express = express();

// Middleware
const allowedOrigins = [
  'https://localhost:5173',
  'https://philipj.net',
  'https://www.philipj.net'
];
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    sendLog(`Request ${req.method} ${req.originalUrl} AZ: ${process.env.AWS_AZ}`)
    next();
});

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        'status': 'success',
        'message': 'Hello World GET'
    });
});

app.post('/', async (req: Request, res: Response) => {

    // test sqs queue
    sendLog(`------> Sending SQS Queue Message to :${process.env.SQS_QUEUE_URL}`);
    const sqs = new SQSClient({
        region: "eu-west-2"
    });

    await sqs.send(
        new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            MessageBody: JSON.stringify({
            message: "Hello from Express"
            })
        })
    );

    res.status(200).send({
        'status': 'success',
        'message': 'Hello World POST'
    });
});

app.patch('/', (req: Request, res: Response) => {
    res.status(200).send({
        'status': 'success',
        'message': 'Hello World PATCH'
    });
});

app.put('/', (req: Request, res: Response) => {
    res.status(200).send({
        'status': 'success',
        'message': 'Hello World PUT'
    });
});

app.delete('/', (req: Request, res: Response) => {
    res.status(200).send({
        'status': 'success',
        'message': 'Hello World DELETE'
    });
});

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).send({
        'status': 'error',
        'message': '404 - Page not found'
    });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: err.message || 'Internal Server Error' });
});

export default app;