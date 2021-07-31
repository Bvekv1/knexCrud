const knex = require("../data/db");
module.exports.up = async (req, res) => {
  await knex.schema.hasTable("tbl_favourite").then(async (exists) => {
    if (!exists) {
      await knex.schema
        .createTable("tbl_favourite", async (table) => {
          table.increments("favouriteId");
          table.string("game");
          table.string("book");
          table.string("movie");
          table.string("series");
          table.string("anime");
          table.boolean("isDeleted").defaultTo("false");
          table
            .integer("personId")
            .unsigned()
            .references("tbl_person.personId");
        })
        .then(() => {
          console.log("tbl_favourite created successfully");
        });
    }
  });
};

module.exports.down = (knex) => knex.schema.dropTable("tbl_favourite");
