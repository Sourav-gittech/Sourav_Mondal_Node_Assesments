const express = require("express");
const employeeController = require("./../controllers/employeeController");
const Upload = require("../utils/employeeFileUpload");

const route = express.Router();

route.get("/add", employeeController.addEmployeePage);
route.get("/", employeeController.allEmployee);
route.get("/update/:id", employeeController.updateEmployeePage);
route.post("/addDetails", Upload.single("pic"), employeeController.addEmployeeDetails);
route.post("/updateData/:id", Upload.single("pic"), employeeController.updateEmployeeDetails);
route.get("/view/:id", employeeController.viewEmployeeDetails);
route.get("/delete/:id", employeeController.deleteEmployeeDetails);

module.exports = route;