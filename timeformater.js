//开启严格模式，规范代码，提高浏览器运行效率
"use strict";
// 定义一个存放返回时间类型的数组
var timeType = [{
    type: 1,
    description: 'YYYY-MM-DD'
  },
  {
    type: 2,
    description: 'YYYY/MM/DD'
  },
  {
    type: 3,
    description: 'YYYY-MM-DD hh:mm:ss'
  },
  {
    type: 4,
    description: 'YYYY-MM-DD hh-mm-ss'
  },
  {
    type: 5,
    description: 'YYYY/MM/DD hh:mm:ss'
  },
  {
    type: 6,
    description: 'YYYY/MM/DD hh-mm-ss'
  },
]
var dateType = 3
var timeNumber= null
//定义一个类，通常首字母大写
var TimeFormater = function (input, type) {
  var that = this
  // 默认返回的时间类型是 YYYY-MM-DD hh-mm-ss
  timeType.forEach(function (item) {
    if (item.description === type) {
      dateType = item.type
    }
  })
  if (typeof input === 'string') {
    timeNumber = parseInt(input);
  } else if (typeof input === 'number') {
    timeNumber = parseInt(input);
  } else {
    timeNumber = (new Date()).getTime()
  }
  TimeFormater.fn.timeNumber = timeNumber
  TimeFormater.fn.dateType = dateType
  return TimeFormater.fn.init();
}

//覆写原型链，给继承者提供方法
TimeFormater.fn = TimeFormater.prototype = {
  constructor: TimeFormater,
  init: function () {
    if (dateType === 1) {
      return this.YYYY() + '-' + this.MM() + '-' + this.DD()
    } else if (dateType === 2) {
      return this.YYYY() + '/' + this.MM() + '/' + this.DD()
    } else if (dateType === 3) {
      return this.YYYY() + '-' + this.MM() + '-' + this.DD() + ' ' + this.hh() + ':' + this.mm() + ':' + this.ss()
    } else if (dateType === 4) {
      return this.YYYY() + '-' + this.MM() + '-' + this.DD() + ' ' + this.hh() + '-' + this.mm() + '-' + this.ss()
    } else if (dateType === 5) {
      return this.YYYY() + '/' + this.MM() + '/' + this.DD() + ' ' + this.hh() + ':' + this.mm() + ':' + this.ss()
    } else if (dateType === 6) {
      return this.YYYY() + '/' + this.MM() + '/' + this.DD() + ' ' + this.hh() + '-' + this.mm() + '-' + this.ss()
    } else {
      return this.YYYY() + '-' + this.MM() + '-' + this.DD() + ' ' + this.hh() + ':' + this.mm() + ':' + this.ss()
    }
  },
  YYYY: function () {
    var that = this
    that.year = (new Date(that.timeNumber)).getFullYear()
    return that.year
  },
  MM: function () {
    var that = this
    that.month = ((new Date(that.timeNumber)).getMonth() + 1) < 10 ? ('0' + ((new Date(that.timeNumber)).getMonth() + 1)) : ((new Date(that.timeNumber)).getMonth() + 1)
    return that.month
  },
  DD: function () {
    var that = this
    that.day = (new Date(that.timeNumber)).getDate() < 10 ? ('0' + (new Date(that.timeNumber)).getDate()) : (new Date(that.timeNumber)).getDate()
    return that.day
  },
  hh: function () {
    var that = this
    that.hours = (new Date(that.timeNumber)).getHours() < 10 ? ('0' + (new Date(that.timeNumber)).getHours()) : (new Date(that.timeNumber)).getHours()
    return that.hours
  },
  mm: function () {
    var that = this
    that.minutes = (new Date(that.timeNumber)).getMinutes() < 10 ? ('0' + (new Date(that.timeNumber)).getMinutes()) : (new Date(that.timeNumber)).getMinutes()
    return that.minutes
  },
  ss: function () {
    var that = this
    that.seconds = (new Date(that.timeNumber)).getSeconds() < 10 ? ('0' + (new Date(that.timeNumber)).getSeconds()) : (new Date(that.timeNumber)).getSeconds()
    return that.seconds
  },
}

//兼容CommonJs规范
if (typeof module !== 'undefined' && module.exports) module.exports = TimeFormater;
//兼容AMD/CMD规范
if (typeof define === 'function') define(function () {
  return TimeFormater;
});

TimeFormater.fn.init.prototype = TimeFormater.fn;
module.exports = TimeFormater;