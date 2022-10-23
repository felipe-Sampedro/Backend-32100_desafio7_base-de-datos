const knex = require('knex')

module.exports = class SQLClients {
    Constructor(config){
        this.knex = knex(config);
    }

    createTable(tableName){
        return this.knex.schema.hasTable(tableName)
        .then((resp) => {
            if(!resp){
                return this.knex.schema.createTable(tableName,() =>{
                    table.increments('id').notNullable().primary();
                    table.string('nombre',15).notNullable();
                    table.string('codigo',10).notNullable();
                    table.float('price');
                    table.integer('stock');
                });
            }
        })
    }

    insertRecords(tableName,items){
        return this.knex(tableName).insert(items);
    }


    getRecords(tableName){
        return this.knex.from(tableName).select(
            'id',
            'nombre',
            'codigo',
            'precio',
            'stock'
        );
    }

    deleteById(tableName, id){
        return this.knex.from(tableName).where({id}).del();
    }

    updateRecordById(tableName, id,payload){
        return this.knex.from(tableName).where({id}).update(payload);
    }


    disconnect(){
        this.knex.distroy()
    }

}