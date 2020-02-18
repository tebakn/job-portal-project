
document.getElementById("billing_to").addEventListener("change",(event)=>{
    if(event.path[0].value==="Client")
        document.getElementById("clientspan").hidden=false
    else
        document.getElementById("clientspan").hidden=true
})


let rbuttons = Array.from(document.getElementsByName("category"))
 rbuttons.forEach((rbutton)=>{
     if(rbutton.id!=="other"){
        rbutton.addEventListener("click", (event) => {display(event.path[0].id+"bill")
        document.getElementById("requireremark").hidden=true;
        document.getElementById("remark").required=false;
        })
    }
    else{
        rbutton.addEventListener("click", (event) => {display(event.path[0].id+"bill")
        document.getElementById("remark").required=true;
        document.getElementById("requireremark").hidden=false;
        })
    }
})

document.getElementById("billdate1").max=getTodayHTML()

document.getElementById("addmore").addEventListener("click",(event)=>{
    let invoices=document.getElementsByName("billandinvoice")
    newinv=document.createElement("div")
    newinv.setAttribute("id","bill"+(invoices.length+1))
    newinv.setAttribute("name","billandinvoice")
    newinv.setAttribute("class","divinline")
    newinv["innerHTML"]=`\
    <p>\
            <label for='${'invoice'+(invoices.length+1)}'>Bill and Invoice</label>\
            <input type='file'  id='${'invoice'+(invoices.length+1)}' name='${('invoice'+invoices.length+1)}' accepts='image/*' >\
        </p>\
        <p>\
            <label for='${'amount'+(invoices.length+1)}'>Amount</label>\
            <input type='number' id='${'amount'+(invoices.length+1)}' name='${('amount'+invoices.length+1)}' min=0>\
        </p>\
                <label for='${'billdate'+(invoices.length+1)}'>Bill Date</label>\
                <input type='date' id='${'billdate'+(invoices.length+1)}' name='${('billdate'+invoices.length+1)}'>\
    `
    console.log(newinv)
    invoices[0].parentNode.insertBefore(newinv,document.getElementById("addmore"))
    newlistenerforimage((invoices.length))
})


document.getElementById("todate").max=getTodayHTML()

document.getElementById('expenses').onsubmit = function() {
    return isValidForm();
};
function isValidForm(){
    rbc=Array.from(document.getElementsByName("category")).filter((value)=>{return value.checked})

    if (rbc[0].value==="stay" && document.getElementById("fromdate").value>= document.getElementById("todate").value){
        alert("From must be less than to")
        return false
    }
    return true
}

 function display(fieldname){
    Array.from(document.getElementById("extrafields").getElementsByTagName("input")).forEach((element)=>{
        element.required=false
    })
    let fieldsets=Array.from(document.getElementById("extrafields").getElementsByTagName("fieldset"))
    fieldsets.forEach((element)=>{
        element.hidden=true
        if(element.id===fieldname){
            element.hidden=false
            Array.from(element.getElementsByTagName("input")).forEach((inpelement)=>{
                inpelement.required=true
            })
        }
        
    })
};
function getTodayHTML(){
    let today=new Date()
    dd=today.getDate()
    dd=dd<10?'0'+dd:dd
    mm=today.getMonth()
    mm=(mm+1)<10?'0'+(mm+1):mm+1
    return `${today.getFullYear()}-${mm}-${dd}`
}
function newlistenerforimage(idnum){

    document.getElementById("invoice"+idnum).addEventListener("change",(event)=>{
        if(event.path[0].value!==""){
            document.getElementById("amount"+idnum).required=true
            document.getElementById("billdate"+idnum).required=true
        }
        else{
            document.getElementById("amount"+idnum).required=false
            document.getElementById("billdate"+idnum).required=false
        }
    })

}