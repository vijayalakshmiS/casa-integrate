var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookshelf = require('bookshelf')(knex);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Fields = bookshelf.Model.extend({
	tableName: 'fields',
	 entity: function() {
	 	return this.belongsTo(Entity);
	 }
});

// router.get('/:id', function(req, res){
// 	console.log("get");
// 	var id = req.param('id');
// 	Fields.where({ id : id }).fetch().then(function(table){
// 		res.json(table);
// 	}).catch(function(err){
// 		console.log(err);
// 	})
// });


router.get('/', function(req, res){
	console.log("get");
	Fields.fetchAll().then(function(table){
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
	new Fields(req.body).save().then(function(created){
		res.json(created);
	}).catch(function(err){
		console.log(err);
	})
});

router.put('/:id', function(req, res){
	console.log("put");
	var id = req.param('id');
	var name = req.param('name');
	Fields.where({ id : id }).fetch().then(function(table){
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
	Fields.where({ id : id }).fetch().then(function(table){
		table.destroy()
		.then(function(deleted){
			res.json(deleted);
		}).catch(function(err){
		console.log(err);
	});
	})
});

module.exports = router;
