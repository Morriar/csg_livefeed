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

var express = require('express');
var router = express.Router();
var dbcompes = require('../model/compes');
var dbcams = require('../model/cams');

router.get('/', function(req, res, next) {
	dbcompes.find({}, function (compes) {
		res.render('admin/index', { compes: compes });
	});
});

router.get('/compes/:cid', function(req, res, next) {
	var cid = req.params.cid;
	if(!cid) {
		res.redirect('/admin/');
		return;
	}
	dbcompes.findOne(cid, function(compe) {
		dbcams.find({compe: cid}, function(cams) {
			res.render('admin/compe', { compe: compe, cams: cams });
		});
	});
});

router.post('/compes/:cid/cams', function(req, res, next) {
	var cid = req.params.cid;
	var url = req.body.url;
	if(!cid || !url) {
		res.redirect('/admin/');
		return;
	}
	dbcams.save(dbcams.create(url, cid));
	res.redirect('/admin/compes/' + cid);
});

router.get('/compes/:cid/cams/delete/:url', function(req, res, next) {
	var cid = req.params.cid;
	var url = req.params.url;
	if(!cid || !url) {
		res.redirect('/admin/compe');
		return;
	}
	dbcams.remove(url);
	res.redirect('/admin/compes/' + cid);
});

module.exports = router;
