Server instructions


**GETTING STARTED**
npm i
nodemon server.js

**database structure**

##user
-_id-id
-username - str
-password - str
-email - str
-firstName - str
-LastName - str
-posts=[]array of post ids
-likes[] array of likes
createdAt-str date to join

##post
-_id-id
-authorId-id
-createdAt - timestamp
-title-str
-content - str
viewCount-int
likes-[{userId1},{userId2}....]
-comments[{userId,username,comment},{userId,username,comment}...]


api example

************************service*************
const URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "/user";
function checkRegister({ username, password, email, firstName, lastName }) {
  return axios.post(`${URL}/user/register`, {
    username,
    password,
    email,
    firstName,
    lastName,
  });
}
function checkLogin({ username, password }) {
  return axios.post(`${URL}/user/login`, { username, password });
}

 function checkFeed() {
  return axios.get(`${URL}/post/feed`);

}
function checkUserList(){
    return axios.get(`${URL}/user/userlist`)
}

async function checkAddPost({ authorId, title, content }) {
  try {
    const postRes = await axios.post(`${URL}/post/addpost`, {
      authorId,
      title,
      content,
    });
    const postId = postRes.data._id;
    const userId = authorId;
    axios.post(`${URL}/user/addpost`, { userId, postId });
    return Promise.resolve();
  } catch (e) {
    console.log("faild to add post");
    return Promise.reject('faild to add');
  }
}


************************IMPLEMENT*************
//get user list
const feedCheck=async()=>{
  try{
    const res =await checkService.checkUserList();
    console.log('userList is ' ,res.data);
  }
  catch(e){
    console.log('faild to get userlist',e)
  }
}

///get feed
const feedCheck=async()=>{
  try{
    const res =await checkService.checkFeed();
    console.log('feed is ' ,res.data);
  }
  catch(e){
    console.log('faild to get feed',e)
  }
}
//add post
const checkAdd=async()=>{
try{
  const res = await checkService.checkAddPost({authorId:"5ed27494bd82ad62c0e26bb9",title:'hello world first post',content:'first content ever!!!'});
  console.log('succes adding a  post');
}catch(e){
console.log('faild to add post',e)
}

}
//login
const checkLog=async()=>{
  try{
    const res=await checkService.checkLogin({username:'david123',password:'1234'});
    if (res.data){console.log('succes login',res.data)}
    else{console.log('faild to login')}
  }
  catch(e){

  }
}
//register
const checkReg=async()=>{
  console.log('starting to check')
 try{

   const res=await checkService.checkRegister({username:'david123',password:'1234',email:'tralala@lala.com',firstName:'david',lastName:'zakay'})
    if(res.data)
    {console.log('faild to register')}
    else{
      console.log('succes!! user added')
    }
  }
 catch(e){
   console.log('faild to login',e)
 }
}