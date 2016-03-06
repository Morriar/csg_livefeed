//  Copyright 2015 Alexandre Terrasa <alexandre@moz-code.org>.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

// Use this tool to load the database from a compes.json file.
//
// usage:
//	node loadCompes.js compes.json

var fs = require("fs");
var compes = require('./model/compes.js');

var argv = process.argv;
if(argv.length != 3) {
	console.log("usage:\n");
	console.log("node loadCompes.js compes.json");
	process.exit(1);
}

var json_file = argv[2];
var json = JSON.parse(fs.readFileSync(json_file, 'utf-8'))

compes.drop();
json.forEach(function(compe) {
	compes.save(compe);
});
compes.find({}, function(cs) {
	console.log("Loaded " + cs.length + " compes.")
	process.exit(0);
});
