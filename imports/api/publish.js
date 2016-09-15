import  { Meteor } from "meteor/meteor";
import { check } from 'meteor/check';

Meteor.publish('githubInfo',function(userId){
  check(userId,String);
  return Meteor.users.find({_id: userId},{fields: {githubInfo: 1}});
});
