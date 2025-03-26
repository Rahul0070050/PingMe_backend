import express from "express";
import { Express } from "express";
import Valkey from "ioredis";

export type ExpressType = typeof express;
export type ExpressAppType = Express;
export type ValkeyClient = Valkey;

export type JwtPayload = {
  id: string;
  username: string;
  email: string;
  phone: string;
};
