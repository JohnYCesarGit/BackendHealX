import jwt from "jsonwebtoken";
import { TOKEN } from "../secretk.js";

export const autenticacionRequerida = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No autorizado, acceso denegado" });
  }


  // Verificar token
  jwt.verify(token, TOKEN, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "No autorizado, token incorrecto" });
    }
    req.user = user;
    next();
  });
};
