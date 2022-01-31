const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		healthScore: {
			type: DataTypes.FLOAT,
		},
		score: {
			type: DataTypes.FLOAT,
		},
		image: {
			type: DataTypes.STRING,
		},
		steps: {
			type: DataTypes.ARRAY,
		},
	})
}
