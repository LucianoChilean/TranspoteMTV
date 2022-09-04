const Usuario = require('./usuario');
const Despacho  = require('./despacho');
const Detalle  = require('./detalle');
const Rol      = require('./rol');
const Modulo   = require('./modulo');
const Cliente  = require('./cliente');
const Asignacion = require('./asignacion');
const Direccion  = require('./direccion');
const Puerto = require('./puerto');
const Conductor = require('./conductor');
const Tarifa = require('./tarifa');
const Clientetarifa = require('./clientetarifa');
const Tarifadespacho = require('./tarifadespacho');
const Tarifadetalle = require('./tarifadetalle');
const Vehiculo = require('./vehiculo');
const Comuna = require('./comuna');
const Region = require('./region');
const Ingresos = require('./ingresos');
const Rampla = require('./rampla');

//Comuna
Comuna.belongsTo(Region,{as:'RegionId',foreignKey:'region_id',onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Region.hasMany(Comuna,{as:'RegionId',foreignKey:'region_id',onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

//Usuario
Usuario.belongsTo(Rol,{as:'rolId', foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Rol.hasMany(Usuario,{as:'rolId', foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

//Relaciones con la tabla de Asignacion
Asignacion.belongsTo(Rol,{ foreignKey : "rol_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Rol.hasMany(Asignacion,{ foreignKey : "rol_id" ,onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Asignacion.belongsTo(Modulo,{ foreignKey : "modulo_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Modulo.hasMany(Asignacion,{ foreignKey : "modulo_id"  ,onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


//Relaciones con la tabla DETALLE
Detalle.belongsTo(Despacho,{ foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Despacho.hasMany(Detalle, { foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Detalle.belongsTo(Direccion,{ foreignKey: "direccion_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Direccion.hasMany(Detalle, { foreignKey: "direccion_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Detalle.belongsTo(Puerto,{ foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Puerto.hasMany(Detalle, { foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

//Relaciones con la tabla de despacho
Despacho.belongsTo(Cliente,{ foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Cliente.hasMany(Despacho, { foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Despacho.belongsTo(Puerto,{ foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Puerto.hasMany(Despacho, { foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Despacho.belongsTo(Conductor,{ foreignKey: "conductor_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Conductor.hasMany(Despacho, { foreignKey: "conductor_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


//Tarifa Despacho
Clientetarifa.belongsTo(Tarifa,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Tarifa.hasMany(Clientetarifa,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Tarifadespacho.belongsTo(Tarifa,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Tarifa.hasMany(Tarifadespacho,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Tarifadespacho.belongsTo(Despacho,{ foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Despacho.hasMany(Tarifadespacho,{ foreignKey: "despacho_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
//Tarifa Detalle
Tarifadetalle.belongsTo(Tarifa,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Tarifa.hasMany(Tarifadetalle,{ foreignKey: "tarifa_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Tarifadetalle.belongsTo(Detalle,{ foreignKey: "detalle_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Detalle.hasMany(Tarifadetalle,{ foreignKey: "detalle_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


//Cliente
Clientetarifa.belongsTo(Cliente,{ foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Cliente.hasMany(Clientetarifa,{ foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

//Relacion con la tabla Cliente
Direccion.belongsTo(Cliente,{ foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Cliente.hasMany(Direccion, { foreignKey: "cliente_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


//Relacion de conductor consigo mismo
Conductor.belongsTo(Conductor,{ foreignKey: "propietario_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Conductor.hasMany(Conductor,{foreignKey: "propietario_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

//Vehiculo 

Vehiculo.belongsTo(Conductor,{ foreignKey: "conductor_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Conductor.hasMany(Vehiculo, { foreignKey: "conductor_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Vehiculo.belongsTo(Conductor,{ foreignKey: "propietario_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Conductor.hasMany(Vehiculo, { foreignKey: "propietario_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Vehiculo.belongsTo(Rampla,{as:"ramplaId", foreignKey: "rampla_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Rampla.hasMany(Vehiculo, {as:"ramplaId", foreignKey: "rampla_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});

Ingresos.belongsTo(Conductor,{ foreignKey: "ingreso_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Conductor.hasMany(Ingresos, { foreignKey: "ingreso_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});


Ingresos.belongsTo(Puerto,{as:"puertoId", foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});
Puerto.hasMany(Ingresos, {as:"puertoId", foreignKey: "puerto_id",onDelete: 'NO ACTION',onUpdate: 'NO ACTION'});