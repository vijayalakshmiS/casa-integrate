var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

var Entity = bookshelf.Model.extend({
  tableName: 'entity',
  fields: function() {
    return this.hasMany(Fields);
  }
});

var Fields = bookshelf.Model.extend({
  tableName: 'fields',
   entity: function() {
    return this.belongsTo(Entity);
   }
});

var Rule = bookshelf.Model.extend({
  tableName: 'rule',
   singleconditions: function() {
    return this.hasMany(Singleconditions);
   },

   nestedconditions: function() {
      return this.hasMany(Nestedconditions);
    },

   customersegments: function() {
      return this.hasMany(Customersegments);
     }
});

var Singleconditions = bookshelf.Model.extend({
  tableName: 'singleconditions',
   rule: function() {
    return this.belongsTo(Rule);
   }
});

var Nestedconditions = bookshelf.Model.extend({
  tableName: 'nestedconditions',
   ruleid: function() {
    return this.belongsTo(Rule);
   }
});

var Customersegments = bookshelf.Model.extend({
  tableName: 'customersegments',
   ruleno: function() {
    return this.belongsTo(Rule);
   }
});

var Groups = bookshelf.Model.extend({
  tableName: 'groups',
   peoples: function() {
    return this.belongsToMany(Peoples);
   }
});

var Peoples = bookshelf.Model.extend({
  tableName: 'peoples',
   groups: function() {
    return this.belongsToMany(Groups);
   }
});

var peoples_groups = bookshelf.Model.extend({
   tableName: 'groups_peoples'
  //   group: function() {
  //     return this.belongsTo(Groups);
  //   },
  //   people: function() {
  //     return this.belongsTo(Peoples);
  //    }
});

module.exports = Entity;
module.exports = Fields;
module.exports = Rule;
module.exports = Singleconditions;
module.exports = Nestedconditions;
module.exports = Customersegments;
module.exports = Groups;
module.exports = Peoples;
module.exports = peoples_groups;