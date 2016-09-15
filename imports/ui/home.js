import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './layout/home_layout.html';
import './home.html';

Template.home.onCreated(function() {
  this.error = new ReactiveVar('');
});
Template.home.helpers({
  profile() {
    if (Meteor.user()) {
      //此方法不行
      // const userId = Meteor.userId();
      // return Meteor.users.find({userId}).profile;

      //此方法可行
      return Meteor.users.findOne().profile;
    }
  },
  loginError(){
    const instance = Template.instance();
    return (instance.error.get()!= '');
  },
  errorReason(){
    const instance = Template.instance();
    return instance.error.get();
  }
});

Template.home.events({
  'click #login'(event,instance){
    event.preventDefault();

    Meteor.loginWithGithub(function(err){
      if (err) {
        console.log("错误信息："+err.reason);
        instance.error.set(err.reason);
      }
    });
  },
  'click #go'(event){
    event.preventDefault();

    FlowRouter.go('/main');
  }
});
