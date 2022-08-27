module.exports={
    HOST:'localhost',
    USER:'root',
    PASSWORD:'',
    DB:'node_sql',
    dialect:'mysql',

    pool:{
        min:0,
        max:5,
        idle:10000,
        acquire:30000
    }
}