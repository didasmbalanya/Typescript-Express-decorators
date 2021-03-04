import { Request, Response } from "express";
import { controller, get, use } from "./decorators";
import { requireAuth } from "./middlewares";

@controller("")
export class RootController {

  @get("/")
  @use(requireAuth)
  getRoot(_req: Request, res: Response) {
    res.send(`
    <div>
      <p>You are logged in</p>
      <a href="/auth/logout">Logout</a>
    </div>
    `);
  }
}
