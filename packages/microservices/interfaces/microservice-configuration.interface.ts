import { MqttClientOptions } from '@nestjs/common/interfaces/external/mqtt-options.interface';
import {
  KafkaConfig,
  ConsumerConfig,
  ProducerConfig,
  CompressionTypes,
} from '@nestjs/common/interfaces/external/kafka-options.interface';
import { Transport } from '../enums/transport.enum';
import { Server } from '../server/server';
import { CustomTransportStrategy } from './custom-transport-strategy.interface';
import { Deserializer } from './deserializer.interface';
import { Serializer } from './serializer.interface';

export type MicroserviceOptions =
  | GrpcOptions
  | TcpOptions
  | RedisOptions
  | NatsOptions
  | MqttOptions
  | RmqOptions
  | KafkaOptions
  | CustomStrategy;

export interface CustomStrategy {
  strategy: Server & CustomTransportStrategy;
  options?: {};
}

export interface GrpcOptions {
  transport?: Transport.GRPC;
  options: {
    url?: string;
    maxSendMessageLength?: number;
    maxReceiveMessageLength?: number;
    keepalive?: {
      keepaliveTimeMs?: number;
      keepaliveTimeoutMs?: number;
      keepalivePermitWithoutCalls?: number;
      http2MaxPingsWithoutData?: number;
      http2MinTimeBetweenPingsMs?: number;
      http2MinPingIntervalWithoutDataMs?: number;
      http2MaxPingStrikes?: number;
    };
    credentials?: any;
    protoPath: string | string[];
    package: string | string[];
    protoLoader?: string;
    loader?: {
      keepCase?: boolean;
      alternateCommentMode?: boolean;
      longs?: Function;
      enums?: Function;
      bytes?: Function;
      defaults?: boolean;
      arrays?: boolean;
      objects?: boolean;
      oneofs?: boolean;
      json?: boolean;
      includeDirs?: string[];
    };
  };
}

export interface TcpOptions {
  transport?: Transport.TCP;
  options?: {
    host?: string;
    port?: number;
    retryAttempts?: number;
    retryDelay?: number;
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}

export interface RedisOptions {
  transport?: Transport.REDIS;
  options?: {
    url?: string;
    retryAttempts?: number;
    retryDelay?: number;
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}

export interface MqttOptions {
  transport?: Transport.MQTT;
  options?: MqttClientOptions & {
    url?: string;
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}

export interface NatsOptions {
  transport?: Transport.NATS;
  options?: {
    url?: string;
    name?: string;
    user?: string;
    pass?: string;
    maxReconnectAttempts?: number;
    reconnectTimeWait?: number;
    servers?: string[];
    reconnect?: boolean;
    pedantic?: boolean;
    tls?: any;
    queue?: string;
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}

export interface RmqOptions {
  transport?: Transport.RMQ;
  options?: {
    urls?: string[];
    queue?: string;
    prefetchCount?: number;
    isGlobalPrefetchCount?: boolean;
    queueOptions?: any;
    socketOptions?: any;
    noAck?: boolean;
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}

export interface KafkaOptions {
  transport?: Transport.KAFKA;
  options?: {
    client?: KafkaConfig;
    consumer?: ConsumerConfig;
    run?: {
      autoCommit?: boolean;
      autoCommitInterval?: number | null;
      autoCommitThreshold?: number | null;
      eachBatchAutoResolve?: boolean;
      partitionsConsumedConcurrently?: number;
    };
    subscribe?: {
      fromBeginning?: boolean;
    };
    producer?: ProducerConfig;
    send?: {
      acks?: number;
      timeout?: number;
      compression?: CompressionTypes;
    };
    serializer?: Serializer;
    deserializer?: Deserializer;
  };
}
