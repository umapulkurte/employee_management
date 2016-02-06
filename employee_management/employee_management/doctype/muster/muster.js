//Global Variable Declarations

var g_length;
var g_day;
var g_status;
var emp_list;

cur_frm.cscript.date=function(doc,cdt,cdn)
{
	var date=doc.date
	var d1=date.split("-")
	var y=d1[0]
	var m=d1[1]
	var day=d1[2]
	var today=new Date();
	var current_year=today.getFullYear()
	g_day=day;
	
	//Displaying Attendance Sheet
	
	frappe.call({
		method:'employee_management.employee_management.doctype.muster.muster.get_info',
		args:{d:day},
		callback:function(r)
		{
			var doclist=frappe.model.sync(r.message)
			set_field_options('detail',doclist[0])
			g_length=doclist[1]
			emp_list=doclist[2]
		}
	})
	
	unhide_field('fill_muster')
	//Get attendance of previous date
	
	if(((today.getMonth()+1)>=m) && (current_year>=y))
	{
		frappe.call({
			method:'employee_management.employee_management.doctype.muster.muster.get_attendance',
			args:{cdate:date},
			callback:function(r)
			{
				var j=0
				
				var doclist=frappe.model.sync(r.message)
				 
				 	for(i=0;i<g_length;i++)
						
					{ 	
						if(doclist[j][1]=='Present')
						document.getElementById("c"+day+i+"P").checked=true;
						if(doclist[j][1]=='Leave')
						document.getElementById("c"+day+i+"L").checked=true;
						if(doclist[j][1]=='Halfday')
						document.getElementById("c"+day+i+"H").checked=true;
						j++;
					}
					hide_field('fill_muster')
			}
		});
	}
}

//Update the 'Muster Data'
cur_frm.cscript.fill_muster=function(doc,cdt,cdn)
{
	var emp=frappe.model.sync(emp_list)
	var date=doc.date
	for(i=0;i<g_length;i++)
	{
		if(document.getElementById("c"+g_day+i+"P").checked)
			{
				g_status='Present'
				e_name=emp[i]
				frappe.call({
				method:'employee_management.employee_management.doctype.muster.muster.put_attendance',
				args:{d1:date,sts:g_status,e:e_name},
				callback:function()
					{

					}
				})
				
			}
		
		if(document.getElementById("c"+g_day+i+"L").checked)
			{
				g_status='Leave'
				e_name=emp[i]
				frappe.call({
				method:'employee_management.employee_management.doctype.muster.muster.put_attendance',
				args:{d1:date,sts:g_status,e:e_name},
				callback:function()
					{

					}
				})
			}
		
		if(document.getElementById("c"+g_day+i+"H").checked)
			{	
				g_status='Halfday'
				e_name=emp[i]
				frappe.call({
				method:'employee_management.employee_management.doctype.muster.muster.put_attendance',
				args:{d1:date,sts:g_status,e:e_name},
				callback:function()
					{

					}
				})
			}
	}
			
	alert("Muster Data Updated")
}