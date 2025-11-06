import express from "express";
import rutas from "./routes/rutas.js";
import conectarBD from "./bd/bd.js";

async function main() {
    try {
        await conectarBD();

        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.set("view engine", "ejs");
        app.use("/", rutas);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, function () {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("No se pudo iniciar la aplicación:", err);
        process.exit(1);
    }
}

main();