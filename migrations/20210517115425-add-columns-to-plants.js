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
  return db.addColumn('plants', 'waterFreq', {
    type: 'int',
    default: 1
  }).then(
      db.addColumn('plants', 'lastWatered', {
        type: 'DateTime',
        default: new Date()
      })
  );
};

exports.down = function(db) {
  return db.removeColumn('plants', 'waterFreq').then(
      db.removeColumn('plants', 'lastWatered')
  );
};

exports._meta = {
  "version": 1
};
