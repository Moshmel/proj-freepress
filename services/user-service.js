const mongoService = require("./mongo-service");

const ObjectId = require("mongodb").ObjectId;
async function isUsernameExists(username){
  const res = await  mongoService.connect().then(db =>
    db.collection("users").find({"username":username}).count());

return res>0;
}

function checkLogin(userCredentials) {
  return mongoService.connect().then(db => {
    const collection = db.collection("users");
    return collection
      .findOne({
        $and: [
          { username: userCredentials.username },
          { password: userCredentials.password }
        ]
      })
      .then(user => {
        if (user) {
          delete user.password;
        }
        return user;
      });
  });
}


function register(user) {
  user.posts = [];
  user.likes = [];
  user.createdAt=Date.now();
  return mongoService
    .connect()
    .then(db => db.collection("users").insertOne(user))
    .then(res => {
      user._id = res.insertedId;
      return user;
    });;
}
function addPost(data)
{
  const {userId,postId}=data;
  const id=new ObjectId(userId);
  const obj={type:'post',postId:postId}
  return mongoService.connect().then(db=>db.collection("users").updateOne({"_id":id},
  {
    $push: {
      posts:obj
    }
  }))
}
function update(user) {
  user._id = new ObjectId(user._id);
  return mongoService
    .connect()
    .then(db =>
      db.collection("users").updateOne({ _id: user._id }, { $set: { ...user } })
    );
}
function getUserById(userId) {
  const id = new ObjectId(userId);
  return mongoService
    .connect()
    .then(db => db.collection("users").findOne({ _id: id }));
}
function getUsers(){
  return mongoService
  .connect()
  .then(db => db.collection("users").find({}).toArray());
}
module.exports = {
  checkLogin,
  register,
  update,
  getUserById,addPost,isUsernameExists,getUsers

};
