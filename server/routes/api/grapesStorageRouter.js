const Router = require("express-promise-router");

const { Project } = require("../../db");
const { 
  getProject,
  updateProject 
} = require("../../controllers/grapesStorageController");

const router = new Router();

router.get("/storage/:projectId", getProject);

router.post("/storage/:projectId", updateProject);

module.exports = router;
