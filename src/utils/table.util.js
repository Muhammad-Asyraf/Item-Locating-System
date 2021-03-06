exports.references = (table, tableName, notNullable = true, columnName = '') => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade')
    .index();

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
};
