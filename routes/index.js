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
		res.render('index', { compes: compes });
	});
});

router.get('/compes/:cid', function(req, res, next) {
	var cid = req.params.cid;
	if(!cid) {
		res.redirect('/');
		return;
	}
	dbcompes.findOne(cid, function(compe) {
		dbcams.find({compe: cid}, function(cams) {
			res.render('compe', { compe: compe, cams: cams });
		});
	});
});

router.get('/compes/:cid/cycle', function(req, res, next) {
	var cid = req.params.cid;
	if(!cid) {
		res.redirect('/');
		return;
	}
	dbcompes.findOne(cid, function(compe) {
		dbcams.find({compe: cid}, function(cams) {
			res.render('cycle', { compe: compe, cams: cams });
		});
	});
});

router.get('/compes/:cid/cams/:cam', function(req, res, next) {
	var cid = req.params.cid;
	var cam = req.params.cam;
	if(!cid || !cam) {
		res.redirect('/');
		return;
	}
	dbcompes.findOne(cid, function(compe) {
		dbcams.findOne(cam, function(cam) {
			res.render('cam', { compe: compe, cam: cam });
		});
	});
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.post('/login', function(req, res, next) {
	if(req.body.user == 'admin' && req.body.pass == 'blackminoutte') {
		req.session.admin = true;
		res.redirect('/admin');
		return;
	}
	res.redirect('/login');
});

module.exports = router;
