'use strict';

var _ = require('lodash');
var util = require('util');
var events = require('events').EventEmitter;

// EventImitter를 상속하는 MyDatabase 클래스를 정의한다
function MyDatabase() {
  events.call(this);
  /*
  {
      name : 'name',
      msg : '내용',
      created_at: '생성시간',
  }
  */
  this.db = [];
}
util.inherits(MyDatabase, events);

// 데이터베이스 조회 메쏘드
MyDatabase.prototype.findAll = function () {
  return this.db;
};

// 신규 데이터 추가 메쏘드
MyDatabase.prototype.create = function (newThing) {
    console.log('db create')
  this.db.push(newThing);
  this.emit('create', newThing);
  return newThing;
};

// 데이터 삭제 메쏘드
MyDatabase.prototype.findAllBy = function (name) {
  _.filter(this.db, function (thing) {
    return thing.name === name;
  });
  this.emit('findAllBy', name);
  return name;
};

var db = new MyDatabase();
exports = module.exports = db;
