export type CONFIG = {
  port: string;
  ip: string;
  pg: { uri: string; user: string; password: string; database: string };
  redis: { uri: string };
  jwtSecret: string;
};
