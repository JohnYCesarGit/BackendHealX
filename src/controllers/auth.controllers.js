import { usuario } from "../models/usuario.models.js";
import bcrypt from "bcrypt";
import { crearToken } from "../middlewares/jwt.js";

export const register = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    const usuarioExistente = await usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = await usuario.create({
      nombre,
      correo,
      password: passwordHash,
    });

    const token = await crearToken({ idUsuario: newUsuario.idUsuario });
    res.cookie("token", token);

    res.json(newUsuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuarioEncontrado = await usuario.findOne({ where: { correo } });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const passwordValido = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    if (!passwordValido) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = await crearToken({ idUsuario: usuarioEncontrado.idUsuario });
    res.cookie("token", token);
    res.json(usuarioEncontrado);
  } catch (error) {}
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Sesión cerrada" });
};

export const perfil = async (req, res) => {
  try {
    const usuarioEncontrado = await usuario.findOne({
      where: { idUsuario: req.user.idUsuario },
    });

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "No se encuentra el usuario" });
    }
    return res.json({
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
