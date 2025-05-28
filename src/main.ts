import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowedOrigins: string[] = [process.env.FRONTEND_DOMAIN as string, 'http://localhost:3000']

      if (allowedOrigins.includes(origin) || !origin) callback(null, true)
      else callback(new Error('Origem não permitida'), false)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  await app.listen(process.env.PORT ?? 8000)
}

bootstrap()
