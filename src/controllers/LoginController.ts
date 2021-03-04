import { NextFunction, Request, Response } from "express";
import { get, controller, use } from "./decorators"

function logger (req: Request, _res: Response, next: NextFunction) {
  console.log('>>> request was made to:', req.route.path)
  next()
}
@controller("/auth")
class LoginController {


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
  };
}

console.log(LoginController)

