import express from "express";
import { Express } from "express";

export type ExpressType = typeof express;
export type ExpressAppType = Express;

export type JwtPayload = {
  username: string;
  email: string;
  phone: string;
};
