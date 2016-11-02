var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var peoples_groups = bookshelf.Model.extend({
   tableName: 'groups_peoples'
  //   group: function() {
  //     return this.belongsTo(Groups);
  //   },
  //   people: function() {
  //     return this.belongsTo(Peoples);
  //    }
});

router.get('/:id', function(req, res){
	console.log("get");
	var id = req.param('id');
	peoples_groups.where({ id : id }).fetch().then(function(table){
		res.json(table);
	}).catch(function(err){
		console.log(err);
	})
});

router.post('/', function(req, res){
	console.log("post");
	if(!req.body){
		return res.sendStatus(err, 400);
	}
	var name = req.param('name');	
	console.log(name);
	new peoples_groups(req.body).save().then(function(created){
		console.log(created);
		res.json(created);
	}).catch(function(err){
		console.log(err);
	})
});

router.put('/:id', function(req, res){
	console.log("put");
	var id = req.param('id');
	console.log("id:"+id);
	var name = req.param('name');
	peoples_groups.where({ id : id }).fetch().then(function(table){
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
	peoples_groups.where({ id : id }).fetch().then(function(table){
		table.destroy()
		.then(function(deleted){
			res.json(deleted);
		}).catch(function(err){
		console.log(err);
	});
	})
});

module.exports = router;

