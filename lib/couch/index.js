var couch = require('../../conf/config').couch
  , db    = couch.db
  , nano  = require('nano')(couch)
  , users = nano.use(db)
  , VIEWS = require('./views/user')
  ;

function create_users_database(body,retries,cb) {
  nano.db.create(db, function (e,b,h) {
      user_create(body,retries+1,cb);
  });
}

function user_create(body,retries,callback) {
  if(typeof retries === 'function'){
    callback = retries;
    retries  = 0;
  }
  if (!retries) { retries = 0; }
  users.insert( body,
    function (e,b,h) {
      if(e && e.message === 'no_db_file'  && retries < 1) {
        return create_users_database(body,retries,callback);
      }
      callback(e,b,h);
  });
}

function user_update(uri,body,callback) {
  users.insert(body, uri, function(e,b,h) {
    if(e) { return callback(e); }
    return callback(null,b,h);
  });
}

function user_find(view, id, opts, tried, callback) {
  if(typeof tried === 'function') {
    callback = tried;
    tried = {tried:0, max_retries:2};
  }
  users.view('users', view, opts, function (e,b,h) {
    if(e) { 
      var current_view = VIEWS[view];
      if(!current_view) { 
        e.message = 'View is not available';
        return callback(e,b,h); 
      }
      if(tried.tried < tried.max_retries) {
        if(e.message === 'missing' || e.message === 'deleted') { // create design document
          var design_doc = {views: {}};
          design_doc.views[view] = current_view;
          return users.insert(design_doc, '_design/users', function () {
            tried.tried += 1;
            user_find(view,id,opts,tried,callback);
          });
        }
        if(e.message === 'missing_named_view') {
          return users.get('_design/users', function (e,b,h) { // create view
            tried.tried += 1;
            if(e) { return user_find(view,id,opts,tried,callback); }
            b.views[view] = current_view;
            users.insert(b, '_design/users', function (e,b,h) {
              return user_find(view,id,opts,tried,callback);
            });
          });
        }
        else { return callback(e,b,h); }
      }
      else { return callback(e,b,h); } 
    }
    return callback(null,b.rows[0].value,h);
  });
}

function user_first(view, key, callback) {
  return user_find(view, key, {startkey: ('"' + key + '"'), limit: 1}, callback);
}

function first_by_betable_email(key,cb) {
  return user_first('by_betable_id',key,cb);
}

module.exports = { 
  user: 
    { create                 : user_create 
    , update                 : user_update
    , first_by_betable_email : first_by_betable_email
    } 
};