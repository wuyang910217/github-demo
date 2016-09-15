import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout/main_layout.html';
import './main.html';

Template.main.onCreated(function(){
  Meteor.subscribe('githubInfo',Meteor.userId());
});

Template.main.helpers({
  githubInfo() {
    // 不加if语句，刷新页面时，控制台会出现错误信息。
    if (Meteor.user()) {
      return Meteor.users.findOne().githubInfo;
    }
  }
});
