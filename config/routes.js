module.exports = async (app) => {
  const save = app.api.user.save;
  const signin = await app.api.auth.signin;
  app.post("/signup", save);
  app.post("/signin", signin);

  app
    .route("/tasks")
    .all(app.config.passport.authenticate())
    .get(app.api.task.getTasks)
    .post(app.api.task.save);

  app
    .route("/tasks/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.task.remove);

  app
    .route("/tasks/:id/toggle")
    .all(app.config.passport.authenticate())
    .put(app.api.task.toggleTask);
};
