import { productos } from "../models/productos.models.js";

export const getProductos = async (req, res) => {
  try {
    const producto = await productos.findAll({
        order: [["id", "ASC"]],
    });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productos.findOne({ where: { id: id } });

    if (!producto)
      return res.status(404).json({ message: "No se encuentra el producto" });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProducto = async (req, res) => {
  const {
    nombremedicamento,
    descripcion,
    marca,
    precio,
    stock,
    unidaddemedida,
  } = req.body;

  try {
    const newProducto = await productos.create({
      nombremedicamento,
      descripcion,
      marca,
      precio,
      stock,
      unidaddemedida,
    });

    res.json(newProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productos.findOne({ where: { id: id } });
    producto.set(req.body);
    await producto.save();
    return res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await productos.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
