jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos"+ "?callback=?", callback);
}
 
jQuery.fn.loadRepositories = function(username) {
  this.html("<span>Querying GitHub for repositories...</span>");
 
  var target = this; 
  $.githubUser(username, function(data) {
    var repos = data.data;
    sortByNumberOfWatchers(repos);
 
    var list = $('<dl style="margin-left:60px" />');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.url +'">' + this.name + '</a></dt>');
      list.append('<dd style="margin-bottom:20px">' + this.description + '</dd>');
    });
  });
 
  function sortByNumberOfWatchers(repos) {
    repos.sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};