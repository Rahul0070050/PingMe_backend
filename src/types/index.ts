import express from "express";
import { Express } from "express";
import Valkey from "ioredis";
import { Request, Response } from "express";

export type ExpressType = typeof express;
export type ExpressAppType = Express;
export type ValkeyClient = Valkey;

export type UserRequest = Request & {
  user?: JwtPayload;
};
export type UserResponse = Response & {};

export type JwtPayload = {
  id: string;
  username: string;
  email: string;
  phone: string;
};
