import { NextFunction, Request, Response } from "express";
import { get, controller, use, post, bodyValidator } from "./decorators";

function logger(req: Request, _res: Response, next: NextFunction) {
  console.log(`>>> ${req.method} request was made to: ${req.headers.referer}`);
  next();
}
@controller("/auth")
export class LoginController {
  @get("/login")
  @use(logger)
  getLogin(_req: Request, res: Response) {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</lable>
        <input name="password" type="password" />
      </div>
      <button></button>
    </form>
    `);
  }

  @post("/login")
  @use(logger)
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "didas" && password === "didas") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.status(403).send(`
      <div>
        <p>You are not logged in</p>
        <a href="/auth/login">Login</a>
      </div>
      `);
    }
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/auth/login");
  }
}

console.log(LoginController);
