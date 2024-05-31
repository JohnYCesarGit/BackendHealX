import jwt from "jsonwebtoken";
import {TOKEN} from '../secretk.js'

export function crearToken(payload) {
 return new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        TOKEN,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          resolve(token);
        }
      );
 })
}
