# Copyright (c) 2013, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class SalarySlip(Document):
	pass
@frappe.whitelist()
def get_work_days(emp,month,year,cdate,emp_id):
	q1=frappe.db.sql("""select employee_name,salary_date,net_pay from `tabSalary Slip` where employee=%s and MONTH(salary_date)=%s and YEAR(salary_date)=%s""",(emp_id,month,year))
	if q1:
		frappe.throw("Salary paid already for selected month")
	query1=frappe.db.sql("""select employee, date, attendance from `tabMuster Data` where employee=%s and MONTH(date)=%s and attendance='Present'""",(emp,month))
	c1=len(query1)
	query2=frappe.db.sql("""select employee, date, attendance from `tabMuster Data` where employee=%s and MONTH(date)=%s and attendance='Halfday'""",(emp,month))
	c2=len(query2)
	return (c1,c2)

@frappe.whitelist()
def get_bank(emp):
	q=frappe.db.sql("""select bank_name from `tabEmployee` where name=%s""",(emp))[0][0]
	return q
	
@frappe.whitelist()
def get_money_in_words(n):
	from frappe.utils import money_in_words
	from frappe.utils import in_words
	x=money_in_words(n)
	return (x)