var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('entity').then(function(exists){
  if(!exists){
    bookshelf.knex.schema.createTable('entity', function(table){
      table.increments('id').primary();
      table.string('entityName');

    })
    .createTable('fields', function(table){
      table.increments('id').primary();
      table.string('attributeName');
      table.string('attributeType');
      table.integer('entity_id').unsigned().references('id').inTable('entity').onDelete('CASCADE');
    
    })
    .createTable('groups', function(table){
      table.increments('id').primary();
      table.string('groupName');      
    })
    .createTable('peoples', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.integer('phone');      
    })
    .createTable('groups_peoples', function(table){
      table.increments('id').primary();
      table.integer('people_id').unsigned().references('id').inTable('peoples').onDelete('CASCADE');
      table.integer('group_id').unsigned().references('id').inTable('groups').onDelete('CASCADE');
    })
    .createTable('rule', function(table){
      table.increments('id').primary();
      table.string('newRule');
      table.string('forWhichEntity');
      table.string('trueButton');  
    })
    .createTable('singleconditions', function(table){
      table.increments('id').primary();
      table.string('operand');
      table.string('operatorFunction');
      table.integer('constant');
      table.integer('rule_id').unsigned().references('id').inTable('rule').onDelete('CASCADE');
    })
    .createTable('nestedconditions', function(table){
      table.increments('id').primary();
      table.string('fetchFunction');
      table.string('operand');
      table.string('operatorFunction');
      table.integer('constant');
      table.integer('rule_id').unsigned().references('id').inTable('rule').onDelete('CASCADE');
    })
    .createTable('customersegments', function(table){
      table.increments('id').primary();
      table.string('newCustomerSegment');
      table.integer('ageBetween');
      table.integer('ageTo');
      table.specificType('location', 'text[]') ;
      table.string('gender');
      table.string('spendsBetween');
      table.string('spendsTo');
      table.integer('rule_id').unsigned().references('id').inTable('rule').onDelete('CASCADE');
    })
    .catch(function(err){
      console.log(err);
    })
  }
});

module.exports = bookshelf;