"use strict";
$(document).ready(function () {
  let add = $("#addEmp");
  let netPay = 0;
  let totalDisbursed = 0;
  let tax = 0.2;
  let overtime = 0;
  let grossPay = 0;
  let newForm = true;

  add.click(function (e) {
    e.preventDefault();

    let id = $("#empId").val();
    let name = $("#empName").val();
    let hours = $("#empHours").val();
    let rate = $("#empRate").val();

    if (id == "" || name == "" || hours == "" || rate == "") {
      alert("Please fill in all fields!");
      return;
    } else if (isNaN(id)) {
      alert("Employee ID must be a number!");
      return;
    } else if (parseFloat(hours) <= 0) {
      alert("Hours worked must be a positive number!");
      return;
    } else if (parseFloat(rate) <= 0) {
      alert("Pay rate must be a positive number!");
      return;
    }

    if (hours > 40) {
      overtime = hours - 40;
      hours = 40;
    } else {
      overtime = 0;
    }

    let p = $("<p>");

    let output = "ID: " + id;
    p.append(output);
    p.append($("<br>"));

    output = "Name: " + name;
    p.append(output);
    p.append($("<br>"));

    output = "Hours Worked: " + Number(hours).toFixed(1);
    p.append(output);
    p.append($("<br>"));

    output = "Overtime: " + overtime.toFixed(1);
    p.append(output);
    p.append($("</br>"));

    output = "Pay Rate: $" + Number(rate).toFixed(2);
    p.append(output);
    p.append($("<br>"));

    //Calculate grosspay w/ overtime if hours > 40 else calculate grosspay
    if (overtime > 0) {
      grossPay = hours * rate + overtime * rate * 1.5;
    } else {
      grossPay = hours * rate;
    }

    output = "Gross Pay: $" + grossPay.toFixed(2);
    p.append(output);
    p.append($("<br>"));

    //Calculate employees netpay + add to total
    netPay = grossPay - grossPay * tax;
    totalDisbursed += grossPay;

    output = "Tax: $" + grossPay.toFixed(2) * tax.toFixed(2);
    p.append(output);
    p.append($("<br>"));

    output = "Net Pay: $" + netPay.toFixed(2);
    p.append(output);
    p.append($("<br>"));

    if (newForm) {
      $("#results").text("");
      $("#total").text("");
      newForm = false;
    }

    $("#results").append(p);

    clearForm();
  });

  let clear = $("#clear");

  clear.click(clearForm);

  let submit = $("#calculate");
  //add employee to list
  submit.click(function (e) {
    e.preventDefault();

    if (totalDisbursed == 0) {
      return;
    }

    let h = $("<h3>");

    let output = "Total Disbursed: $" + totalDisbursed.toFixed(2);
    h.append(output);
    h.append($("<br>"));

    $("#total").append(h);

    totalDisbursed = 0;
    newForm = true;
  });

  //clear form & inputs
  function clearForm() {
    $("#empForm input").val("");
  }
});
