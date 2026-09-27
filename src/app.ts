import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';

const app: Express = express();

// Middleware
const allowedOrigins = [
  'https://localhost:5173',
  'https://localhost:5173'
];
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        'status': 'success',
        'message': 'Hello World GET'
    });
});

app.post('/', (req: Request, res: Response) => {
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