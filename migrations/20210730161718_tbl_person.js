const knex = require("../data/db");
module.exports.up = async (req, res) => {
  await knex.schema.hasTable("tbl_person").then(async (exists) => {
    if (!exists) {
      await knex.schema
        .createTable("tbl_person", async (table) => {
          table.increments("personId");
          table.string("firstName");
          table.string("middelName");
          table.string("lastName");
          table.string("email");
          table.string("address");
          table.boolean("isDeleted").defaultTo("false");
        })
        .then(() => {
          console.log("User Table created Successfully");
        })
        .catch((err) => console.log(err));
    }
  });
};

module.exports.down = (knex) => knex.schema.dropTable("tbl_person");
