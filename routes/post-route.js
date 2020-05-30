const postService = require("../services/post-service");
function addRoutes(App) {
  App.get("/post/feed", (req, res) => {
    postService
      .getFeed()
      .then(posts => res.json(posts))
      .catch(err => res.status(500).send("couldnt get feed, sorry"));
  });
  App.post(`/post/addpost`, (req, res) => {
    const post = req.body;
    postService
      .addPost(post)
      .then(post => res.json(post))
      .catch(err => {
        res.status(500).send("couldnt add, sorry");
      });
  });
}
module.exports = addRoutes;
