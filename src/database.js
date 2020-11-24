const mysql=require('mysql');
const {promisify}= require('util');

const {database}= require('./keys');
const { connect } = require('./routes');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('Database HAS TOO MANY CONNECTIONS');
        }
        if(err.code==='ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
})

//Promisify pool querys
pool.query=promisify(pool.query);
module.exports=pool;