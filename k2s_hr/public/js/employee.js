frappe.ui.form.on("Employee", {
    refresh: function(frm){
        let today = new Date();
        // frappe.db.get_list("Employee Checkin", {"employee": frm.doc.name,"date":today,order_by: "creation desc"}, "log_type", (r) => {
        //     console.log(">>>>>>>>>>>>>>1111",r)
        //     if(r.name){
        //         create_check_out_btn(frm)
        //     }
        //     else{
        //         create_check_in_btn(frm)
        //     }
        // });
        frappe.db
				.get_list("Employee Checkin", {
					filters: {"employee": frm.doc.name,"date":today},
					fields: ["name", "log_type"],
					order_by: "creation desc",
					limit: 1,
				})
				.then((result) => {
					if (result.length > 0) {
						if(result[0].log_type === "IN"){
                            create_check_out_btn(frm)
                        }
                        if(result[0].log_type === "OUT"){
                            create_check_in_btn(frm)
                        }
					} else {
                        create_check_in_btn(frm)
                    }
				});
    }
})


function create_check_in_btn(frm){
    frm.add_custom_button(__("Employee Check In"),function () {
        frappe.call({
            method : "k2s_hr.api.make_checkin",
            args: {
                employee: frm.doc.name
            },
            callback: function(rsp){
                if(rsp.message){
                    console.log("rsp.message is: ",rsp.message)
                    frappe.msgprint(`Employee Checkin ${rsp.message} created`)
                    frm.clear_custom_buttons();
                    create_check_out_btn(frm)
                }
            }
        })
      }
    );
}

function create_check_out_btn(frm){
    frm.add_custom_button(__("Employee Check Out"),function () {
        frappe.call({
            method : "k2s_hr.api.make_checkout",
            args: {
                employee: frm.doc.name
            },
            callback: function(rsp){
                if(rsp.message){
                    console.log("rsp.message is: ",rsp.message)
                    frappe.msgprint(`Employee Checkout ${rsp.message} created`)
                    frm.clear_custom_buttons();
                    create_check_in_btn(frm)
                }
            }
        })
      }
    );
}