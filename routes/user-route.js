const userService = require("../services/user-service");

function addRoutes(App) {
  App.post("/user/details", async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await userService.getUserById(userId);
      res.json({ ...user });
    } catch (err) {
      (err) => res.status(500).send("error on fetching userpage data");
    }
  });

  App.post(`/user/register`, async (req, res) => {
    try {
      const { username, password, email, firstName, lastName } = req.body;
      console.log('user register',username, password, email, firstName, lastName)
      const newUser={ username, password, email, firstName, lastName };
      const isUsernameExist = await userService.isUsernameExists(username);
      if (isUsernameExist) {
        res.status(500).send("error! username taken ");
      } else {
        userService.register(newUser).then((user) => res.json(user));
      }
    } catch (e) {
      res.status(500).send("problem with server or without requierd field check the docks");
    }

  }),
    App.post("/user/login", (req, res) => {
      const { username, password } = req.body;
      userService
        .checkLogin({ username, password })
        .then((user) => {
          req.session.user = user;
          res.json(user);
        })
        .catch((res) => res.catch);
    }),
    App.post("/user/update", (req, res) => {
      const user = req.body;
      userService
        .update(user)
        .then((res) => res.json())
        .catch(() => res.status(500).send("couldnt update user"));
    });
  App.post("/user/addpost", (req, res) => {
    const { userId, postId } = req.body;
    userService
      .addPost({ userId, postId })
      .then(() => res.json())
      .catch(() => res.catch);
  });
  App.get("/user/userlist", (req, res) => {
    userService
      .getUsers()
      .then((usersList) => res.json(usersList))
      .catch(() => res.catch);
  });
}

module.exports = addRoutes;
