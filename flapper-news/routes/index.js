var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/posts', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  Post.find(function(err, posts {
  	if(err) {
  		return next(err);
  	}
  	res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);
	post.save(function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});
//LET'S UPVOTE SOME POSTS
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function(err, post) {
		if(err) {
			return next(err);
		}
		if(!post) {
			return next(new Error('cannot find post'));
		}
		req.post = post;
		return next();
	});
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { 
    	return next(err); 
    }

    	res.json(post);
	});
});

router.put('/posts/:post/upvote', function(req, res, next) {
	req.post.upvote(function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});
//LET'S UPVOTE SOME COMMENTS
router.param('comment', function(req, res, next, id) {
	var query = Comment.findById(id);

	query.exec(function(err, comment) {
		if(err) {
			return next(err);
		}
		if(!post) {
			return next(new Error('cannot find comment'));
		}
		req.comment = comment;
		return next();
	});
});
router.get('/posts/:post/comments/:comment', function (req, res) {
	res.json(req.comment);
});
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
	req.post.upvote(function(err, comment) {
		if(err) {
			return next(err);
		}
		res.json(comment);
	});
});

router.post('/posts/:post/comments' function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.save(function(err, comment) {
		if(err) {
			return next(err);
		}
		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if(err) {
				return next(err);
			}

			res.json(comment);
		});
	});
});
module.exports = router;
