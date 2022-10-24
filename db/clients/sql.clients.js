const knex = require('knex')

module.exports = class SQLClient {
    constructor(config){
        this.knex = knex(config);
    }


    createTableProducts(tableName){
        return this.knex.schema.hasTable(tableName)
            .then((response)=>{
                if(!response){
                   return this.knex.schema.createTable(tableName, (table)=>{
                        table.increments('id').notNullable().primary();
                        table.string('nombre').notNullable();                        
                        table.float('precio');
                        table.string('imagen');
                    });
                }            
            }).catch((err) => console.log("error en constructor productos", err));    
    }


    createTableMessagges(tableName){
        return this.knex.schema.hasTable(tableName)
        .then((resp) => {
            if(!resp){
                return this.knex.schema.createTable(tableName,(table) =>{
                    table.increments('id').notNullable().primary();
                    // table.string('id').notNullable().primary();
                    table.string('userName',40).notNullable();
                    table.string('time').notNullable();
                    table.string('text');
                });
            }
            console.log('the table was created');
        }).catch((err) => console.log("error en constructor mensajes", err));    
    }

    insertRecords(tableName,items){
        return this.knex(tableName).insert(items)
        .then(console.log('product inserted succesfully'));
    }


    getRecords(tableName){
        return this.knex.from(tableName).select(
            'id',
            'nombre',
            'precio',
            'imagen',
        );
    }

    deleteById(tableName, id){
        return this.knex.from(tableName).where({id}).del()
        .then(console.log('the product was deleted'));
    }

    updateRecordById(tableName, id,payload){
        return this.knex.from(tableName).where({id}).update(payload)
        .then(console.log('the product was updated'));
    }


    getMessages(tableName){
        const messages = this.knex(tableName).select('id','userName','time','text')
        return messages
    }


    disconnect(){
        this.knex.distroy()
    }

}