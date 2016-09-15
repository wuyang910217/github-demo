import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/access_deny.html';
import '../ui/not_found.html';
import '../ui/github.html';

FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [logRoute],
  action: function(){
    BlazeLayout.render('homeLayout', {home: 'home'});
  }
});

var mainRoutes = FlowRouter.group({
  prefix: '/main',
  name: 'main',
  triggersEnter: [logRoute,accessCheck]
});

function accessCheck(context) {
  if (!Meteor.userId()) {
    FlowRouter.go('/deny');
  }
}

function logRoute(context){
  console.log('当前路由：--->'+context.path);
}

mainRoutes.route('/',{
  action: function(){
    BlazeLayout.render('mainLayout', {main: 'main'});
  }
});

mainRoutes.route('/github',{
  action: function(){
    BlazeLayout.render('mainLayout', {main: 'github'});
  }
});

mainRoutes.route('/picUpLoad',{
  action: function(){
    BlazeLayout.render('mainLayout', {main: 'picUpLoad'});
  }
});

mainRoutes.route('/other',{
  action: function(){
    BlazeLayout.render('mainLayout', {main: 'other'});
  }
});

FlowRouter.route('/deny',{
  name: 'deny',
  triggersEnter: [logRoute],
  action: function(){
    BlazeLayout.render('accessDeny');
  }
});

FlowRouter.notFound = {
  action: function(){
    BlazeLayout.render('notFound');
    // FlowRouter.go('/deny');
  }
}

