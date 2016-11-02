var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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

// router.get('/:id',function(req, res){
// 	console.log("get");
// 	var id = req.param('id');
// 	Groups.where({ id : id }).fetchAll({ withRelated: ['peoples'] }).then(function(entity){
// 		res.json(entity);
// 	}).catch(function(err){
// 		console.log(err);
// 	})
// });

router.get('/', function(req, res){
	console.log("get");
	//var id = req.param('id');
	 Groups.fetchAll({ withRelated: ['peoples'] }).then(function(entity){
	 	//console.log(entity);
		res.json(entity);
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
	new Groups(req.body).save().then(function(createEntity){
		res.json(createEntity);
	}).catch(function(err){
		console.log(err);
	})
});

router.put('/:id', function(req, res){
	console.log("put");
	var id = req.param('id');
	var name = req.param('name');
	Groups.where({ id : id }).fetch().then(function(table){
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
	Groups.where({ id : id }).fetch().then(function(table){
		table.destroy()
		.then(function(deleted){
			res.json(deleted);
		}).catch(function(err){
			console.log(err);
		});
	})
});

module.exports = router;