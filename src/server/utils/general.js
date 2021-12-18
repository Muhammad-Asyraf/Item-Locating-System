const fs = require('fs');

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

const removeFiles = async (files) => {
  if (Array.isArray(files)) {
    for (const file of files) {
      try {
        await fs.unlinkSync(file.path);
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    try {
      await fs.unlinkSync(files.path);
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = {
  getNamespace,
  references,
  removeFiles,
};
