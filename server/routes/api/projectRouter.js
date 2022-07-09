const Router = require("express-promise-router");

const {
    getAllProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require("../../controllers/projectController");

const router = new Router();

router.get("/", getAllProject);
router.get("/:projectid", getProjectById);
router.post("/create", createProject);
router.put("/:projectid", updateProject);
router.delete("/:projectid", deleteProject);

module.exports = router;
