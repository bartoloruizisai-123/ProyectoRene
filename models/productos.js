import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    precio: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    categoria: { type: String, trim: true },
    // imagen field removed - no longer stored
});

export default mongoose.model("Producto", productoSchema);
