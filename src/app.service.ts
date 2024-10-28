import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  client: MqttClient;

  onModuleInit() {
    this.connect();
  }
  private connect() {
    this.client = connect(`${process.env.MQTT_URL}`);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribe('#');
    });
  }

  private subscribe(topic: string) {
      this.client.subscribe(topic, (error) => {
        if (error) {
          console.log(`Failed to subscribe to topic ${topic}: ${error.message}`);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      })

      this.client.on('message', (topic, message) => {
        console.log(`Received message on topic ${topic}: ${message.toString()}`);
      });
  }

  public publish(topic: string, message: string) {
    this.client.publish(topic, message, (error) => {
      if (error) {
        console.log(`Failed to publish to topic ${topic}: ${error.message}`);
      } else {
        console.log(`Published message to topic ${topic}: ${message}`);
      }
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }
}
