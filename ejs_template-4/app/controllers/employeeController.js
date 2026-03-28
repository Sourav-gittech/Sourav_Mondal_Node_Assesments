const employeeModel = require("./../models/employeeModels");
const fs = require("fs");

class EmployeeController {

    async addEmployeePage(req, res) {
        res.render("pages/addEmployee", {
            title: "Add Employee"
        });
    }

    async allEmployee(req, res) {
        try {
            const employees = await employeeModel.find();

            return res.render("pages/allEmployee", {
                title: "All Employee",
                employees
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async viewEmployeeDetails(req, res) {
        try {
            const employeeId = req.params.id;
            const employee = await employeeModel.findById(employeeId);

            return res.render("pages/employeeDetails", {
                title: "Employee Details",
                employee
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async updateEmployeePage(req, res) {
        try {
            const employeeId = req.params.id;
            const employee = await employeeModel.findById(employeeId);

            return res.render("pages/updateEmployee", {
                title: "Update Employee",
                employee
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async addEmployeeDetails(req, res) {
        try {
            const { name, contact: { phone, email, address, full_address, city }, department: { department_name }, salary } = req.body;
            const employeeObj = new employeeModel({ name, contact: { phone, email, address, full_address, city }, department: { department_name }, salary });

            if (req.file) {
                employeeObj.profile_pic = req.file.path;
            }

            const employee = await employeeObj.save();

            if (employee) {
                res.redirect("/employee/");
            }
            else {
                res.render("pages/addEmployee");
            }
        }
        catch (err) {
            console.log("Error occured", err);
        }
    }

    async updateEmployeeDetails(req, res) {
        try {
            const employeeId = req.params.id;

            if (req.file) {
                const employee = await employeeModel.findById(employeeId);

                if (employee && employee.profile_pic) {
                    if (fs.existsSync(employee.profile_pic)) {
                        fs.unlinkSync(employee.profile_pic);
                    }
                }

                req.body.profile_pic = req.file.path;
            }
            const employee = await employeeModel.findByIdAndUpdate(employeeId, req.body, { new: true });

            res.redirect("/employee/");
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async deleteEmployeeDetails(req, res) {
        try {
            const employeeId = req.params.id;

            const employee = await employeeModel.findById(employeeId);

            if (employee && employee.profile_pic) {
                if (fs.existsSync(employee.profile_pic)) {
                    fs.unlinkSync(employee.profile_pic)
                }
            }

            await employeeModel.findByIdAndDelete(employeeId);

           res.redirect("/employee/");
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }
}

module.exports = new EmployeeController();