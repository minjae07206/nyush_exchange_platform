import * as express from "express";

declare module "express-session" {
  interface SessionData {
    user?: any; // or define a custom type for the user object
    unverifiedUser?: any; // Define type for unverifiedUser
  }
}