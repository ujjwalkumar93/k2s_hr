import frappe
from datetime import date

def set_date_to_checkin(doc, method=None):
    doc.date = date.today()

@frappe.whitelist()
def make_checkin(employee):
    doc = frappe.new_doc("Employee Checkin")
    doc.employee = employee
    doc.log_type = "IN"
    doc.date = date.today()
    doc.insert()
    frappe.db.commit()
    return doc.name

@frappe.whitelist()
def make_checkout(employee):
    doc = frappe.new_doc("Employee Checkin")
    doc.employee = employee
    doc.log_type = "OUT"
    doc.date = date.today()
    doc.insert()
    frappe.db.commit()
    return doc.name