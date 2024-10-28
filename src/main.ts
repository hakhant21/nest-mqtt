import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const mqttOptions: MicroserviceOptions = {
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL
    },
  };
  app.connectMicroservice(mqttOptions);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
