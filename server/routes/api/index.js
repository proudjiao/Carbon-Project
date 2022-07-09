const Router = require("express-promise-router");
const ProjectRouter = require("./projectRouter");
const AdminRouter = require("./adminRouter");
const GrapesStorageRouter = require("./grapesStorageRouter");

const router = new Router();

router.use("/admin", AdminRouter);
router.use("/grapesStorage", GrapesStorageRouter);
router.use("/projects", ProjectRouter);

router.get("/", async (req, res) => {
  console.log(req.user);
  res.status(200).send("Welcome to Carbon's API");
});

router.get("/isAdmin", async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);
  res.json({
    isAdmin: isAdmin,
  });
});

module.exports = router;
