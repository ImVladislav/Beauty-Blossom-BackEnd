const express = require("express");

const ctrl = require("../../controllers/feedback");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/feedback");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

// router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

// router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// router.patch("/:id/checked", authenticate, isValidId, validateBody(schemas.updateChekedSchema), ctrl.updateCheked);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
