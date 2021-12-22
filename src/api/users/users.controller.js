const express = require("express");
const router = express.Router();

const userService = require("../../services/users/users.service");

router.param("id", userService.validateId);

router.get("/viewAllUsers", userService.viewAllUsers);
router.post("/addNewUser", userService.addNewUser);
router.patch("/updateUser/:id", userService.updateUser);
router.delete("/removeUser/:id", userService.removeUser);

module.exports = router;
