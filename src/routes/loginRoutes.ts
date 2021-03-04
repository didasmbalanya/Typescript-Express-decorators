import { NextFunction, Request, Response, Router } from "express";

const router = Router();

function requireAuth(req: Request, res: Response, next: NextFunction){
  if(req.session?.loggedIn){
    next();
    return;
  }
  res.status(403).send('not permitted')
}
router.get("/login", (_req: Request, res: Response) => {
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
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "didas@email.com" && password === "didas") {
    res.send("success");
  } else {
    res.status(403).send("Auth Failed");
  }
});

router.get("/protected",requireAuth, (_req: Request, res: Response) => {
  res.send("Welcome to protected page");
});

export { router };
