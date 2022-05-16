/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("client", (table) => {
    table.increments("id")
    table.string("app_name")
    table.string("client_id")
    table.integer("createdAt")
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("client")

};
