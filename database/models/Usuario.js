module.exports = function(sequelize,dataTypes){
    let alias = "Usuario";

    let cols = {
        idusuarios:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        fecha_nacimiento:{
            type: dataTypes.STRING,
            allowNull: false,
            
        }
    }
    
    let config = {
        tableName : "usuarios",
        timestamps :false,
    }
    let Usuario = sequelize.define(alias,cols,config);

    return Usuario;
}