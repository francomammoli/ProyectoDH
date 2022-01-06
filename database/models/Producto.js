module.exports = function(sequelize,dataTypes){
    let alias = "Producto";

    let cols = {
        idproductos:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        precio:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        tipo:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        img:{
            type: dataTypes.STRING,
        },
    }
    
    let config = {
        tableName : "productos",
        timestamps :false,
    }
    let Producto = sequelize.define(alias,cols,config);
    
    Producto.associate = function(models){
        Producto.belongsToMany(models.Usuario,{
            as: "usuarios",
            through:'usuarios_has_productos',
            foreigKey:"idproductos",
            otherKey:"idusuarios",
            timestamps:false,
        })
    }

    return Producto;
}
