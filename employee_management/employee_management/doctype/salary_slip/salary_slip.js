var gd;
var gn;
var gabsent_days;
var ghalf_days;
var gpresent_days;
cur_frm.cscript.salary_date=function(doc,cdt,cdn)
{
	var m=doc.salary_date;
	var d= m.split("-")
	var mnth=d[1];
	var yr=d[0];
	var dy= d[2];
	a=['January','February','March','April','May','June','July','August','September','October','November','December']
	cur_frm.set_value('month',a[mnth-1])
	var days;
	if (mnth==01 || mnth==03 || mnth==05||mnth==07||mnth==08||mnth==10||m==12)
		{
			days=31;
		}
	else 
		{
		if (mnth==02)	days=28;	
		else days=30;
		}
	gd=days;

	var cdate=new Date();

	var cy=cdate.getFullYear();
	var cm=cdate.getMonth()+1;
	var cday=cdate.getDate();

	var intmnth=parseInt(mnth);
	var intgd=parseInt(gd);
	var intcy=parseInt(cy);
	var intcm=parseInt(cm);
	var intcday= parseInt(cday);
	
	if (intmnth>=intcm && intcday<intgd)
	{
		alert("Salary Slip Can not be Filled");
		cur_frm.toggle_enable('present_days');
		cur_frm.toggle_enable('absent_days');
		cur_frm.toggle_enable('net_pay');
	}
	else
	{ 
	//alert("Print Salary Slip");
	var e_id=doc.employee;
	var ename=doc.employee_name;
	frappe.call(
	{
	method:'employee_management.employee_management.doctype.salary_slip.salary_slip.get_work_days',
	args:{ 
			emp:ename,
			month:mnth,
			year:yr,
			cdate:m,
			emp_id:e_id
		},
	callback:function(r)
		{
			doclist=frappe.model.sync(r.message)
			cur_frm.set_value('present_days',doclist[0])
			cur_frm.set_value('half_days',doclist[1])
			gpresent_days=doclist[0]
			ghalf_days=doclist[1]
			gabsent_days=gd-(doclist[0]+doclist[1])
			cur_frm.set_value('absent_days',gabsent_days)
		}
	});
	}
}

cur_frm.cscript.absent_days = function (doc,cdt,cdn)
{
	var DA=doc.da;
	var TA=doc.ta;
	var Salary=doc.salary;
	//var work_days=gn;
	//var absent_days=gabsent_days;
	
	var days_in_month=gd;

	var salary1=(Salary/days_in_month)*gpresent_days
	var salary2=((Salary/days_in_month)*ghalf_days)/2
	var extra1=(DA+TA)*gpresent_days;
	var extra2=((DA+TA)*ghalf_days)/2

	var netsalary=salary1+salary2
	var netextra=extra1+extra2
	//var deduction=(Salary/days_in_month)*absent_days;
	var netpay=netsalary+netextra;
	cur_frm.set_value('net_pay',netpay)
	frappe.call({
		method:'employee_management.employee_management.doctype.salary_slip.salary_slip.get_money_in_words',
		args:{n:netpay},
		callback:function(r)
		{
			cur_frm.set_value('net_pay_in_words',r.message)
		}
	})
	
}
cur_frm.cscript.salary_mode=function(doc,cdt,cdn)
{
	e=doc.employee
	if (doc.salary_mode=='Cheque')
	{
		
		cur_frm.toggle_enable('cheque_no',true)
		frappe.call({
			method:'employee_management.employee_management.doctype.salary_slip.salary_slip.get_bank',
			args:{emp:e},
			callback:function(r)
			{
				cur_frm.set_value('bank',r.message)
			}
		})
	}
	else
	{
		cur_frm.set_value('bank','')																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										
		cur_frm.toggle_enable('cheque_no',false)
	}
}