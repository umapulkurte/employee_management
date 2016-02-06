# Copyright (c) 2013, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
class Muster(Document):
	def validate(self):
		d=self.date
		q6=frappe.db.sql("""select date from `tabMuster` where date=%s""",(d))
		if q6:
			frappe.throw("Entry already exists for selected date")
	#Deleting record from child table 'tabMuster Data' while deleting records from Master table 'tabMuster'
	def on_trash(self):
		dt=self.date
		q7=frappe.db.sql("""delete from `tabMuster Data` where date=%s""",(dt))
@frappe.whitelist()
def put_attendance(d1,sts,e):
	#Updating or inserting records in `Muster Data'
	q3=frappe.db.sql("""select employee,date,attendance from `tabMuster Data` 
	where employee=%s and date=%s""",(e,d1))
	if q3:
		q2=frappe.db.sql("""update `tabMuster Data` set employee=%s, date=%s, attendance=%s 
			where employee=%s and date=%s""",(e,d1,sts,q3[0][0],q3[0][1]))
	else:
		q4=frappe.db.sql("""select max(cast(name as int)) from `tabMuster Data`""")[0][0]
		if q4:
			name=int(q4)+int(1)
		else:
			name=1
		q2=frappe.db.sql("""insert into `tabMuster Data` 
		set name=%s, employee=%s, date=%s, attendance=%s""",(name,e,d1,sts))
@frappe.whitelist()
def get_info(d):
	#Head
	m_head="""<table border=3>
	<tr bgcolor=LightGreen align=center><td width=100 ><b>Employee</td>"""
	e_head=""
	d1=int(d)
	e_present="""<td width=65><b>Present</td>"""
	"""</tr>"""
	e_leave="""<td width=65><b>Leave</td>"""
	e_halfday="""<td width=65><b>Halfday</td>"""
	head=m_head+e_present+e_leave+e_halfday
	#Row
	h_str1=""
	list=[]
	q=frappe.db.sql("""select employee_name from `tabEmployee`""")
	l=len(q)
	for j in range (0, len(q)):
		dict={'Employee Name':q[j][0]}
		h_str="""
		<tr align=center><td id="empid.%s" >%s</td>""" %(j,dict['Employee Name'])
		e="""<td><input type="checkbox" id="c%s%sP" 
		onclick={document.getElementById('c%s%sL').checked=false;document.getElementById('c%s%sH').checked=false}
		></td>""" %(d,j,d,j,d,j)
		e1="""<td><input type="checkbox" id="c%s%sL"
		onclick={document.getElementById('c%s%sP').checked=false;document.getElementById('c%s%sH').checked=false}
		></td>""" %(d,j,d,j,d,j)
		e2="""<td><input type="checkbox" id="c%s%sH"
		onclick={document.getElementById('c%s%sL').checked=false;document.getElementById('c%s%sP').checked=false}
		></td>""" %(d,j,d,j,d,j)
		h_str=h_str+e+e1+e2
		"""</table>"""
		h_str1=h_str1+h_str
		list.append(q[j][0])
	table=head+h_str1
	return(table,l,list)
@frappe.whitelist()
def get_attendance(cdate):
	q5=frappe.db.sql("""select employee,attendance from `tabMuster Data` where date=%s""",(cdate))
	if q5:
		l1=len(q5)
		return(q5)
	else:
		return (0)
		#frappe.msgprint("Empty record for selected Date")