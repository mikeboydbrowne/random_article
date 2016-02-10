var express = require('express');
var router = express.Router();

// Mongoose variables
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Article = mongoose.model('Article');  // Start adding article information

// Auth variables
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// Getting posts
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) { return next(err); }

    res.json(posts);
  });
});

// Getting articles
router.get('/articles', function(req, res, next) {
  Article.find(function(err, articles) {
    if (err) { return next(err); }

    res.json(articles);
  });
});

// Adding a post
router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// Get a post's ID
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) {
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

// Get a comment's ID
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

// NEW
// Get an article's ID
//router.param('article', function(req, res, next, id) {
//  var query = Article.findById(id);
//
//  query.exec(function (err, article) {
//    if (err) {
//      return next(err);
//    }
//    if (!article) {
//      return next(new Error('can\'t find article'));
//    }
//    req.article = article;
//    return next();
//  });
//});

// Getting a specific post
router.get('/posts/:post', function(req, res) {
  req.post.populate('comments', function(err,post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// NEW
// Getting a specific article
//router.get('/articles/:article', function(req, res) {
//  req.post.populate('comments', function(err, article) {
//    if (err) { return next (err); }
//
//    res.json(article);
//  });
//});

// Upvoting a post
router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// Upvoting a comment
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) { return next(err); }

    res.json(comment);
  });
});

// NEW
// Upvoting an article
//router.put('/articles/:article/upvote', auth, function(req, res, next) {
//  req.post.upvote(function(err, comment) {
//    if (err) { return next(err); }
//
//    res.json(article);
//  })
//});

// Adding a comment to a post
router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment) {
    if (err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if (err) { return next(err); }

      res.json(comment);
    });
  });
});

// User endpoints
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) { return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
