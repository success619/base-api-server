const db = require("../../database/db");

const notificationRoute = require("express").Router();

notificationRoute.get("/get-all-notifications/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  await db("notifications")
    .select("*")
    .where("user_id", user_id)
    .orderBy("date_updated", "asc", "last")
    .then((notifications) => {
      console.log(notifications);
      res.status(200).json(notifications);
    })
    .catch((err) => {
      console.log(err);
      res.json("error fetching notifications");
    });
});

notificationRoute.post("/post-notification/", async (req, res) => {
  const { user_id, notification_type, notification } = req.body;
  await db("notifications").insert({
    user_id,
    notification_type,
    notification,
    status: "unread",
    date_updated: new Date(),
  });
});

module.exports = notificationRoute;
