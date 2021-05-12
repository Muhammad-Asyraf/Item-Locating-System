const getNamespace = (path) => {
  return path.replace(/[^a-zA-Z ]/g, '.').substring(1, path.length - 3);
};

const references = (table, tableName, notNullable = true, columnName = '') => {
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

module.exports = {
  getNamespace,
  references,
};
