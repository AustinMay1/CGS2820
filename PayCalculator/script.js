"use strict";
window.addEventListener("load", function () {
   
    let submit = document.getElementById("calculate");

    submit.addEventListener("click", function (e) {
        e.preventDefault();

        let empId = document.getElementById("empId");
        let empName = document.getElementById("empName");
        let empHours = document.getElementById("empHours");
        let empRate = document.getElementById("empRate");
 
        let id = empId.value;
        let name = empName.value;
        let hours = empHours.value;
        let rate = empRate.value;
        let overtime = 0;
        let grossPay;

        //form validation
        if (id == "" || name == "" || hours == "" || rate == "") {
            alert("Please fill out all form fields!")
            return;
        }
        else if (isNaN(id)) {
            alert("ID must be a number!")
            return;
        }
        else if (parseInt(hours) <= 0) {
            alert("Hours worked must be a positive number!") 
            return;
        }
        else if (parseFloat(rate) <= 0) {
            alert("Hourly rate must be greater than zero!")
            return;
        }
        
        let results = document.getElementById("results");
        let para = document.createElement("p");

        let totalPay = hours * rate;

        let output = "Employee ID: " + id;
        let empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        let br = document.createElement("br");
        para.appendChild(br);

        output = "Employee Name: " + name;
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);

        if (hours > 40) {
            overtime = hours - 40
            hours = 40 
            grossPay = totalPay + (overtime * rate * 1.5);
        }
        else if (hours <= 40) {
            grossPay = totalPay
        }

        output = "Hours Worked: " + (Number(hours).toFixed(1));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);

        output = "Overtime: " + (Number(overtime).toFixed(1));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);
        
        output = "Pay Rate: $" + (Number(rate).toFixed(2));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);
        
        output = "Gross Pay: $" + (Number(grossPay).toFixed(2));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo)
        br = document.createElement("br");
        para.appendChild(br);
    
        let tax = grossPay * 0.2;

        let netPay = grossPay - tax;

        output = "Tax: $" + (Number(tax).toFixed(2));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);

        output = "Total Net Pay: $" + (Number(netPay).toFixed(2));
        empInfo = document.createTextNode(output);
        para.appendChild(empInfo);
        br = document.createElement("br");
        para.appendChild(br);
        
    
        //display results of form
        results.appendChild(para);

        //clear all form values + results
        let clear = document.getElementById("clear");
        clear.addEventListener("click", clearForm);
        
        function clearForm() {
            let form = document.getElementById("employeeForm");
            let formFields = form.getElementsByTagName("input");
            for (let i = 0; i < formFields.length; i++) {
                formFields[i].value = "";
            }
            results.textContent = "";
        }


    });
});