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

var db = require('mongoskin').db('mongodb://localhost:27017/csg_slurleshow');
var ObjectId = require('mongodb').ObjectID;
db.bind('cams');

exports.create = function(url, compe) {
	return {
		url: url,
		compe: compe
	};
}

exports.find = function(req, callback) {
	db.cams.find(req).toArray(function(err, cams) {
		if(err) {
			console.log(err);
			cams = [];
		}
		callback(cams);
	});
}

exports.findOne = function(_id, callback) {
	db.cams.findOne({_id: ObjectId(_id)}, function(err, cam) {
		callback(cam);
	});
}

exports.save = function(cam) {
	db.cams.save(cam);
}

exports.remove = function(_id) {
	db.cams.remove({_id: ObjectId(_id)});
}

exports.drop = function() {
	db.cams.remove({});
}
