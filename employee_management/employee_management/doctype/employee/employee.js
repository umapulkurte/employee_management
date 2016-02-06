//Mobile No. Validation
cur_frm.cscript.contact_no = function (doc,cdt,cdn)
{
  var num = doc.contact_no;
  var str=String(num);
  var gth = str.length;
  if (gth != 10)
    { 
      cur_frm.set_value('contact_no','')
      frappe.throw('Enter 10 digit number!')
    }
}

//Email_Id Verification
cur_frm.cscript.email_id=function(doc,cdt,cdn)
{
	var str=doc.email_id;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str))
  	{
  		return (true)
  	}
  	else
  	{
	     cur_frm.set_value('email_id','')  
  	   frappe.throw("You have entered an invalid email address!")
    	 return (false)
    }
}