import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { router } from "./routes/loginRoutes";
import { AppRouter } from './AppRouter'

import './controllers/LoginController'

const app = express();
const appRouter = AppRouter.getInstance()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['brrrr']}))
app.use(router)
app.use(appRouter)

const PORT = 4000

app.listen(PORT, () => {
  console.log('listeningon port: ', PORT)
})
