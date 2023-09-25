import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import * as bodyParser from 'body-parser';
import { initialPermissionsCreation } from './utils/initialPermissions';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.enableCors();
    setupSwagger(app);
    await app.listen(8000);
    initialPermissionsCreation();
}

bootstrap();
