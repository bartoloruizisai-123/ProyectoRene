import { Router } from "express";
import {
    nuevoProducto,
    mostrarProductos,
    buscarProductoPorID,
    editarProducto,
    borrarProducto,
    buscarProductoPorNombre,
    comprarProducto,
} from "../bd/productosBD.js";

const router = Router();

const categorias = ["Hombre", "Mujer", "Niños", "Accesorios"];

router.get("/", (req, res) => {
    res.render("home", { categorias });
});

router.get("/info/:c/:texto", (req, res) => {
    const c = req.params.c;
    const texto = req.params.texto;
    res.render("info", { c, texto });
});

// Mostrar productos (posible filtro por categoria)
router.get("/productos", async (req, res) => {
    try {
        const { categoria } = req.query;
        let productosBD = await mostrarProductos();
        if (categoria) {
            productosBD = productosBD.filter((p) => p.categoria === categoria);
        }
        console.log("GET /productos - items:", productosBD.length);
        res.render("mostrarProductos", { productosBD });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Formulario nuevo producto
router.get("/nuevoProducto", (req, res) => {
    res.render("nuevoProducto");
});

// Crear producto
router.post("/nuevoProducto", async (req, res) => {
    try {
        console.log('POST /nuevoProducto body:', req.body);
        await nuevoProducto(req.body);
        res.redirect("/productos");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Editar producto (form)
router.get("/editarProducto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productoBD = await buscarProductoPorID(id);
        if (!productoBD) return res.status(404).send("Producto no encontrado");
        console.log('GET /editarProducto id:', id);
        res.render("editarProducto", { productoBD });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Guardar edición
router.post("/editarProducto", async (req, res) => {
    try {
        console.log('POST /editarProducto body:', req.body);
        await editarProducto(req.body);
        res.redirect("/productos");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Borrar producto
router.get("/borrarProducto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log('GET /borrarProducto id:', id);
        await borrarProducto(id);
        res.redirect("/productos");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Comprar producto
router.post("/comprarProducto", async (req, res) => {
    try {
        const { id, cantidad } = req.body;
        console.log('POST /comprarProducto', { id, cantidad });
        await comprarProducto({ id, cantidad });
        res.redirect("/productos");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Buscar por nombre
router.post("/buscarProducto", async (req, res) => {
    try {
        console.log('POST /buscarProducto buscar:', req.body.buscar);
        const productosBD = await buscarProductoPorNombre(req.body.buscar);
        res.render("mostrarProductos", { productosBD });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;