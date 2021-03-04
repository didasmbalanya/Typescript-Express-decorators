import { NextFunction, Request, RequestHandler, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

export function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`
        <div>
          <p>missing property ${key}</p>
          <a href="/auth/login">Login</a>
        </div>
        `);
        return;
      }
    }

    next();
  };
}

export function controller(routerPrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
        [];

      const validator = requiredBodyProps.length
        ? bodyValidators(requiredBodyProps)
        : [];
      if ((path || path === "") && method) {
        router[method](
          `${routerPrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
