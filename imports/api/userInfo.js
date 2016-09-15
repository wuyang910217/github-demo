import { Meteor } from 'meteor/meteor';
import { SimpleSchema, attachSchema } from 'meteor/aldeed:simple-schema';

// Meteor.publish('user.info',)

let Schema = {};

Schema.Profile = new SimpleSchema({
  username: {
    type: String
  },
  avatar_url: {
    type: String
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});


Schema.GithubInfo = new SimpleSchema({
  id: {
    type: Number
  },
  username: {
    type: String
  },
  nickname: {
    type: String,
    optional: true
  },
  avatar_url: {
    type: String
  },
  api_url: {
    type: String
  },
  html_url: {
    type: String
  },
  followers_url: {
    type: String
  },
  following_url: {
    type: String
  },
  starred_url: {
    type: String
  },
  subscriptions_url: {
    type: String
  },
  organizations_url: {
    type: String,
    optional: true
  },
  repos_url: {
    type: String
  },
  type: {
    type: String,
    optional: true
  },
  company: {
    type: String,
    optional: true
  },
  blog: {
    type: String,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  email: {
    type: String
  },
  hireable: {
    type: Boolean,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  public_repos: {
    type: Number
  },
  public_gists: {
    type: Number
  },
  followers: {
    type: Number
  },
  following: {
    type: Number
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if(this.isUpsert){
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heratbeat: {
    type: Date,
    optional: true
  },
  profile: {
    type: Schema.Profile
  },
  githubInfo: {
    type: Schema.GithubInfo
  }
});

Meteor.users.attachSchema(Schema.User);
