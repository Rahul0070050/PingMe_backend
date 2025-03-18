export type CONFIG = {
  port: string;
  ip: string;
  pg: { uri: string; user: string; password: string; database: string };
  ioredis: {
    uri: string;
    host: string;
    port: number;
    username: string;
    password: string;
  };
  jwtSecret: string;
};
