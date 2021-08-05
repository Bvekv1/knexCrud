const knex = require("../data/db");

module.exports.up= async (req, res) => {
await knex.schema.hasTable('tbl_profile').then(async(exists)=>{
    if(!exists){
        await knex.schema.createTable('tbl_profile',async(table)=>{
            table.increments('profileId')
            table.string('imageName')
            table.string('type').notNullable()
            table.string('path').notNullable()
            table.integer('personId').unsigned().references('tbl_person.personId')
        }).then(()=>{
            console.log("tbl_profile created")
        }).catch((err)=>{
            console.log(err)
        })
    }
})
}
module.exports.down = knex=>knex.schema.dropTable("tbl_profile")