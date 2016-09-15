import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';


ServiceConfiguration.configurations.remove({
    service: "github"
});

ServiceConfiguration.configurations.insert({
    service: "github",
    clientId: '9357fb5499d7d1be1b22',
    loginStyle: "popup",
    secret: '2d7611b135a2d2298059f1ad07f6e72d211db1bf'
});

Accounts.onCreateUser(function(options, user) {
    const accessToken = user.services.github.accessToken;

    const result = Meteor.http.get("https://api.github.com/user", {
        headers: { "User-Agent": "Meteor/1.0" },
        params: {
            access_token: accessToken
        }
    });

    if (result.error)
        throw result.error;

    const profile = {
        username: result.data.login,
        avatar_url: result.data.avatar_url,
        email: result.data.email
    };

    const githubInfo = {
        id: result.data.id,
        username: result.data.login,
        nickname: result.data.name,
        email: result.data.email,
        html_url: result.data.html_url,
        api_url: result.data.html_url,
        avatar_url: result.data.avatar_url,
        followers_url: result.data.followers_url,
        following_url: result.data.following_url,
        starred_url: result.data.starred_url,
        subscriptions_url: result.data.subscriptions_url,
        organizations_url: result.data.organizations_url,
        repos_url: result.data.repos_url,
        type: result.data.type,
        company: result.data.company,
        blog: result.data.blog,
        location: result.data.location,
        hireable: result.data.hireable,
        bio: result.data.bio,
        public_repos: result.data.public_repos,
        public_gists: result.data.public_gists,
        followers: result.data.followers,
        following: result.data.following,
        createdAt: result.data.created_at,
        updatedAt: result.data.updated_at
    };
    user.username = result.data.login;
    user.profile = profile;
    user.githubInfo = githubInfo;
    console.log(user.profile);
    console.log(user.githubInfo);
    return user;
});
