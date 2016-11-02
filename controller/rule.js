var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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

router.get('/:id', function(req, res){
	console.log("get");
	var id = req.param('id');
	console.log(id);
	Rule.where({ id : id }).fetch({ withRelated: ['singleconditions', 'nestedconditions', 'customersegments']}).then(function(rule){
		console.log(rule);
		res.json(rule);
	}).catch(function(err){
		console.log(err);
	})
});

router.post('/', jsonParser, function(req, res){
	console.log("post");
	if(!req.body){
		return res.sendStatus(err, 400);
	}
	var name = req.param('name');
	new Rule(req.body).save().then(function(createRule){
		console.log(createRule);
	    //res.json(createRule);
	    console.log(createRule.id);
	    var id = createRule.id;
	    console.log(id);
	    Rule.where({ id : id }).fetch({ withRelated: ['singleconditions', 'nestedconditions', 'customersegments']}).then(function(rule){
		console.log(rule);
		res.json(rule);
	}).catch(function(err){
		console.log(err);
	});
	})
});


// router.post('/', jsonParser, function(req, res){
// 	console.log("post");
// 	if(!req.body){
// 		return res.sendStatus(err, 400);
// 	}
// 	var name = req.param('name');
// 	new Rule(req.body).save().then(function(createRule){
// 		new Singleconditions(req.body).save().then(function(singleconditions){
//             res.json(createRule);
// 		}).catch(function(err){
// 			console.log(err);
// 		})
// 	 })
// });


router.put('/:id', function(req, res){
	console.log("put");
	var id = req.param('id');
	var name = req.param('name');
	Rule.where({ id : id }).fetch().then(function(table){
		table.save(req.body).then(function(updated){
			res.json(updated);
		})
	}).catch(function(err){
		console.log(err);
	})
});

router.delete('/:id', function(req, res){
	console.log("delete");
	var id = req.param('id');
	Rule.where({ id : id }).fetch().then(function(table){
		table.destroy().then(function(deleted){
			res.json(deleted);
		}).catch(function(err){
			console.log(err);
		});
	})
});

module.exports = router;
