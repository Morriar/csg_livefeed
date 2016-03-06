/*
 * Copyright 2016 Alexandre Terrasa <alexandre@moz-code.org>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var db = require('mongoskin').db('mongodb://localhost:27017/csg_slideshow');
db.bind('compes');

exports.create = function(id, title, startAt) {
	return {
		id: id,
		title: title,
		startAt: startAt
	};
}

exports.find = function(req, callback) {
	db.compes.find(req).toArray(function(err, compes) {
		if(err) {
			console.log(err);
			compes = [];
		}
		callback(compes);
	});
}

exports.findOne = function(compe_id, callback) {
	db.compes.findOne({id: compe_id}, function(err, compe) {
		callback(compe);
	});
}

exports.save = function(compe) {
	db.compes.save(compe);
}

exports.remove = function(id) {
	db.compes.remove({id: id});
}

exports.drop = function() {
	db.compes.remove({});
}
