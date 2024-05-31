import { Router } from "express";
import { login, logout, perfil, register } from "../controllers/auth.controllers.js";
import { autenticacionRequerida } from "../middlewares/validarToken.js";
const router = Router();

router.post("/usuarios/login", login);
router.post("/usuarios/register", register);
router.post("/usuarios/logout", logout);
router.get("/usuarios/perfil" ,perfil);

export default router;
