import { DataTypes } from "sequelize"; // Importar DataTypes
import { sequelize } from "../database/db.js"; // Importar la instancia de Sequelize

// Definición del modelo
const BlogModel = sequelize.define("blogs", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default BlogModel; // Exportar el modelo
