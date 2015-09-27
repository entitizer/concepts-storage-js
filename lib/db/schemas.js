'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var NAMES = ['Concept', 'WikiPage', 'Entity'];

function BaseSchema() {
	Schema.apply(this, arguments);

	if (!this.paths.createdAt) {
		this.add({
			createdAt: {
				type: Date,
				default: Date.now
			}
		});
	}
	if (!this.paths.updatedAt) {
		this.add({
			updatedAt: {
				type: Date
			}
		});
	}

	this.pre('save', function(next) {
		this.updatedAt = Date.now();
		next();
	});
}

util.inherits(BaseSchema, Schema);

var Concept = new BaseSchema({
	// md5(COUNTRY_LANG_NAME)
	_id: String,
	// md5(LANG_NAME)
	nameHash: {
		type: String,
		required: true,
		index: true
	},
	// md5(LANG_ATONIC)
	atonicHash: {
		type: String,
		required: true,
		index: true
	},
	// md5(LANG_ROOT_ATONIC)
	rootAtonicHash: {
		type: String,
		required: true
	},
	// md5(LANG_ROOT_NAME)
	rootNameHash: {
		type: String,
		required: true
	},
	lang: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2,
		trim: true
	},
	country: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2,
		trim: true,
		index: true
	},
	name: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	abbr: {
		type: String,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	atonic: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	rootName: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	rootAtonic: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	countWords: {
		type: Number,
		default: 1,
		min: 1,
		index: true
	},
	// FBI, CIA, USA
	isAbbr: {
		type: Boolean
	},
	// Eurovision 2014, iBook, etc.
	isIrregular: {
		type: Boolean
	},
	wikiId: {
		type: String,
		index: true
	},
	popularity: {
		type: Number,
		default: 1
	},
	entityId: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 60 * 24 * 2 // 2 days
	}
});

var WikiPage = new BaseSchema({
	title: {
		type: String,
		required: true
	},
	titleHash: {
		type: String,
		required: true,
		index: true
	},
	_id: {
		type: String
	},
	wikiId: {
		type: Number,
		required: true
	},
	lang: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2,
		trim: true
	},
	englishId: {
		type: Number
	},
	englishTitle: {
		type: String
	},
	names: [String],
	description: {
		type: String
	},
	category: {
		type: Number
	},
	type: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 60 * 24 * 14 // 14 days
	}
});

var Entity = new BaseSchema({
	// NO md5(COUNTRY_LANG_NAME)
	// md5(country_lang_uniqueName)
	_id: String,
	// slug(atonic)
	uniqueName: {
		type: String,
		required: true,
		index: true
	},
	// md5(country_lang_uniqueName)
	// key: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
	culture: {
		type: String,
		required: true,
		index: true,
		minlength: 5,
		maxlength: 5
	},
	lang: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2,
		trim: true
	},
	country: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 2,
		maxlength: 2,
		trim: true,
		index: true
	},
	name: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	atonic: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	abbr: {
		type: String,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	popularity: {
		type: Number,
		min: 1,
		required: true
	},
	wikiPage: WikiPage,
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 60 * 24 * 2 // 2 days
	}
});

// settings: ==============

Concept.set('toObject', {
	getters: true
});
WikiPage.set('toObject', {
	getters: true
});
Entity.set('toObject', {
	getters: true
});


// exports: ===============
exports.Concept = Concept;
exports.WikiPage = WikiPage;
exports.Entity = Entity;
exports.NAMES = NAMES;
