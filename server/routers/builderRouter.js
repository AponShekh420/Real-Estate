const addBuilder = require("../controllers/builderControler/addBuilder");
const deleteBuilder = require("../controllers/builderControler/deleteBuilder");
const getBuilders = require("../controllers/builderControler/getBuilders");
const updateBuilders = require("../controllers/builderControler/updateBuilders");
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");
const checkBuilderValidation = require("../middleware/checkBuilderValidation");
const useValidationResult = require("../middleware/common/useValidationResult");
const express = require("express");
// callback function of configure
const router = express.Router();

// route controller
router.post(
  "/add",
  authCheck,
  adminAuthCheck,
  checkBuilderValidation,
  useValidationResult,
  addBuilder
);
router.put(
  "/update",
  authCheck,
  adminAuthCheck,
  checkBuilderValidation,
  useValidationResult,
  updateBuilders
);
router.delete("/delete", authCheck, adminAuthCheck, deleteBuilder);
router.get("/getall", getBuilders);

module.exports = router;
