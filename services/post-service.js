const mongoService = require("./mongo-service");
const ObjectId = require("mongodb").ObjectId;



function addPost(post) {
  post.timeStamp = Date.now();
  post.likes=[];
  post.viewCount=0;
  post.comments = [];

  return mongoService
    .connect()
    .then(db => db.collection("posts").insertOne(post))
    .then(res => {
      post._id = res.insertedId;
      return post;
    });
}
function getFeed() {
  return mongoService
    .connect()
    .then(db => db.collection("posts").find({}).sort({timeStamp:-1}).toArray())
}
module.exports = {
  addPost,
  getFeed,
};
