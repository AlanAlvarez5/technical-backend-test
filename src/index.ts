import 'reflect-metadata';
import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './service/user/user.route';
import { errorHandler } from './utils/middleware/error';
import { AppDataSource } from './utils/database/dataSource';

async function bootstrap() {
  try {
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT ?? 3000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Rutas
    const apiRouter = Router();
    apiRouter.use('/user', userRouter);

    app.use('/api', apiRouter);

    // Ruta raíz
    app.get('/', (_req: Request, res: Response) => {
      res.send('Aura Backend API - 2025');
    });

    // Manejo de errores genérico
    app.use(errorHandler);

    await AppDataSource.initialize();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
}

bootstrap();