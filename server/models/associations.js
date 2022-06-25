const Usuario = require('./usuario');
const Despacho  = require('./despacho');
const Detalle  = require('./detalle');
const Rol      = require('./rol');
const Modulo   = require('./modulo');
const Cliente  = require('./cliente');
const Asignacion = require('./asignacion');

Usuario.belongsTo(Rol,{ foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Rol.hasMany(Usuario,{ foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Asignacion.belongsTo(Rol,{ foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Rol.hasMany(Asignacion,{ foreignKey : "rol_id" ,onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Asignacion.belongsTo(Modulo,{ foreignKey : "modulo_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Modulo.hasMany(Asignacion,{ foreignKey : "modulo_id"  ,onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Detalle.belongsTo(Despacho,{ foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Despacho.hasMany(Detalle, { foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Cliente.belongsTo(Despacho,{ foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Despacho.hasMany(Cliente, { foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


