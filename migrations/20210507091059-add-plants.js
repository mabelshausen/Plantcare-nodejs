'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('plants', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
    name: { type: 'string', notNull: true },
    sciName: 'string',
    age: { type: 'int', unsigned: true },
    room_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'plants_room_id_fk',
        table: 'rooms',
        rules: {
          OnDelete: 'RESTRICT',
          OnUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    }
  });
};

exports.down = function(db) {
  return db.removeForeignKey('plants', 'plants_room_id_fk')
      .then(db.dropTable('plants'));
};

exports._meta = {
  "version": 1
};
