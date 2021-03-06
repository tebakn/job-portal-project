

function getDatainfo(){
    return gotdata
}

function clearDatainfo(){
    gotdata=undefined
}


async function setDatainfo(obj){
    let failflag=false;
    out=await validate.validateGotData(obj)
    .catch((e)=>{
        failflag=true;
        })
    if (failflag)
        return
    return gotdata=obj
}

function filterdata(filter){
    page=filter.$paginate_page || 1
    limit=filter.$paginate_limit || 5
     delete filter.$paginate_page
     delete filter.$paginate_limit
    if (Object.keys(filter).length===0)
        return paginated(gotdata.data,page,limit);

        try{
        filtered_result= gotdata.data.filter((values)=>{
            values.$sortby_attrval=0
            
            let ret= Object.keys(filter).reduce((tot,filtkey)=>{
            compval=comparator(values,filter,filtkey)
            values.$sortby_attrval+=compval
            return (tot && compval)},true)
        return ret; 
    })
    pag= paginated(filtered_result.sort((a,b)=>b.$sortby_attrval - a.$sortby_attrval),page,limit);

    return pag
    }
    catch(e){throw e;}
}
function comparator(dbrowobj,filterobj,filterkey){
    keyarr=filterkey.split('_')
    last=keyarr.pop()
    filterdbkey=keyarr.join('_')

    if (dbrowobj[filterkey.toLowerCase()]!==undefined){
        if (dbrowobj[filterkey.toLowerCase()] instanceof Array || filterobj[filterkey] instanceof Array){
            //logger.info("Intersection on key "+filterkey )
            return intersection_comparator(dbrowobj[filterkey.toLowerCase()],filterobj[filterkey])
        }
        else{
           // logger.info("Equal_to on key "+filterkey )
            return dbrowobj[filterkey.toLowerCase()]===filterobj[filterkey]
        }
    }

    let compute=last_comparator(last);

    if (dbrowobj[filterdbkey.toLowerCase()]!==undefined && compute!==undefined){
        if(last==="$includes"){
            //logger.info("Intersection on key "+filterkey)
            return compute(dbrowobj[filterdbkey.toLowerCase()].split(' '),filterobj[filterkey].split(' '))
        }
        else{
            //logger.info("Comparison on key"+ filterkey)
            return compute(dbrowobj[filterdbkey.toLowerCase()],filterobj[filterkey])
        }
        }
    else
        throw  {name:'key error', message:`Key ${filterkey} is not valid`}

}
function last_comparator(key_last){
    if (key_last.toLowerCase()==="$isgreater")
    return (a,b)=>{return Number(a) >= Number(b)}

    else if(key_last.toLowerCase()==="$isless")
        return (a,b)=>{return Number(a)<= Number(b)}

    else if (key_last.toLowerCase()==="$isrange")
        return (a,b)=>{return Number(b[0])<=Number(a) && Number(a)<=Number(b[1])}

    else if (key_last.toLowerCase()==="$includes")
        return intersection_comparator
    else
        return undefined
}
function  intersection_comparator(db_attribute,filter_attribute){
    db_attribute=db_attribute instanceof Array?db_attribute:[db_attribute]
    filter_attribute=filter_attribute instanceof Array?filter_attribute:[filter_attribute]
    
    let common=db_attribute.filter((value)=>filter_attribute.includes(value))
//    console.log(common)
    return common.length
}
function paginated(result,page,limit){

    page=parseInt(page)
    start_index=(page-1)*limit
    end_index=page*limit
    ret_obj={}
    ret_obj.results=result.slice(start_index,end_index);
    if (end_index<result.length)
    {
        ret_obj.next={
            page: page+1,
            limit: limit
        }
    }
    if(start_index>0)
    {
        ret_obj.prev={
            page: page-1,
            limit: limit
        }
    }
    return ret_obj
}

module.exports={
    filterdata,
    getDatainfo
}

let gotdata={
    api:"jobs",

data:[{"id":1,"title":"Computer Systems Analyst II","location":"Russia","category":"Finance","experience":2,"description":"Destruction of Parathyroid Gland, Open Approach","posted_on_date":"5/11/2019","posted_on_time":"10:42 AM"},
{"id":2,"title":"Professor","location":"China","category":"Consumer Services","experience":7,"description":"Plain Radiography of Right Optic Foramina","posted_on_date":"11/13/2019","posted_on_time":"9:49 PM"},
{"id":3,"title":"Office Assistant II","location":"Vietnam","category":"Finance","experience":7,"description":"Excision of Conduction Mechanism, Percutaneous Approach","posted_on_date":"7/29/2019","posted_on_time":"4:48 PM"},
{"id":4,"title":"Recruiter","location":"China","category":"Miscellaneous","experience":6,"description":"Insertion of Infusion Pump into Right Upper Arm Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"1/9/2020","posted_on_time":"4:07 PM"},
{"id":5,"title":"Clinical Specialist","location":"China","category":"Health Care","experience":4,"description":"Computerized Tomography (CT Scan) of Multiple Coronary Artery Bypass Grafts using Low Osmolar Contrast, Unenhanced and Enhanced","posted_on_date":"11/16/2019","posted_on_time":"11:28 AM"},
{"id":6,"title":"Assistant Media Planner","location":"Poland","category":"Public Utilities","experience":5,"description":"Bypass Left Common Iliac Artery to Lower Extremity Artery with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"1/23/2020","posted_on_time":"8:56 PM"},
{"id":7,"title":"Administrative Assistant I","location":"Argentina","category":"n/a","experience":9,"description":"Insertion of Internal Fixation Device into Left Sphenoid Bone, Percutaneous Approach","posted_on_date":"1/27/2020","posted_on_time":"12:31 PM"},
{"id":8,"title":"Accountant II","location":"Japan","category":"n/a","experience":5,"description":"Fluoroscopy of Bilateral Internal Carotid Arteries using Other Contrast, Laser Intraoperative","posted_on_date":"2/8/2020","posted_on_time":"2:40 PM"},
{"id":9,"title":"Dental Hygienist","location":"Thailand","category":"n/a","experience":2,"description":"Revision of Synthetic Substitute in Cranial Cavity, External Approach","posted_on_date":"2/9/2020","posted_on_time":"4:14 AM"},
{"id":10,"title":"Administrative Assistant IV","location":"China","category":"Technology","experience":6,"description":"Repair Right Subclavian Vein, Percutaneous Endoscopic Approach","posted_on_date":"10/4/2019","posted_on_time":"10:12 AM"},
{"id":11,"title":"Nurse","location":"China","category":"Consumer Non-Durables","experience":4,"description":"Insertion of Pacemaker, Single Chamber into Chest Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"8/6/2019","posted_on_time":"5:38 PM"},
{"id":12,"title":"Systems Administrator IV","location":"Philippines","category":"n/a","experience":3,"description":"Release Basal Ganglia, Percutaneous Approach","posted_on_date":"9/15/2019","posted_on_time":"6:08 AM"},
{"id":13,"title":"Staff Scientist","location":"Poland","category":"Consumer Services","experience":5,"description":"Revision of Infusion Device in Left Ankle Joint, Percutaneous Endoscopic Approach","posted_on_date":"4/5/2019","posted_on_time":"10:21 AM"},
{"id":14,"title":"Media Manager III","location":"Portugal","category":"n/a","experience":1,"description":"Reposition Right Thumb Phalanx, External Approach","posted_on_date":"5/14/2019","posted_on_time":"10:19 AM"},
{"id":15,"title":"Tax Accountant","location":"China","category":"Health Care","experience":2,"description":"Excision of Right Ovary, Percutaneous Approach, Diagnostic","posted_on_date":"2/10/2020","posted_on_time":"8:45 AM"},
{"id":16,"title":"Senior Financial Analyst","location":"China","category":"n/a","experience":1,"description":"Revision of Bone Growth Stimulator in Lower Bone, Percutaneous Approach","posted_on_date":"12/25/2019","posted_on_time":"9:17 PM"},
{"id":17,"title":"Human Resources Assistant I","location":"United States","category":"Basic Industries","experience":3,"description":"Removal of Extraluminal Device from Heart, Percutaneous Approach","posted_on_date":"9/28/2019","posted_on_time":"1:27 AM"},
{"id":18,"title":"Assistant Professor","location":"China","category":"n/a","experience":8,"description":"Excision of Right Ankle Region, Open Approach, Diagnostic","posted_on_date":"10/31/2019","posted_on_time":"2:14 PM"},
{"id":19,"title":"Web Designer II","location":"China","category":"n/a","experience":9,"description":"Occlusion of Left Kidney Pelvis, Percutaneous Approach","posted_on_date":"6/25/2019","posted_on_time":"9:01 PM"},
{"id":20,"title":"Senior Sales Associate","location":"Portugal","category":"n/a","experience":5,"description":"Removal of Nonautologous Tissue Substitute from Larynx, Via Natural or Artificial Opening","posted_on_date":"6/27/2019","posted_on_time":"7:33 PM"},
{"id":21,"title":"Marketing Assistant","location":"Russia","category":"Health Care","experience":6,"description":"Supplement Left Posterior Tibial Artery with Nonautologous Tissue Substitute, Percutaneous Approach","posted_on_date":"4/22/2019","posted_on_time":"4:35 PM"},
{"id":22,"title":"Automation Specialist IV","location":"Poland","category":"Consumer Services","experience":1,"description":"Drainage of Perineum Tendon, Open Approach, Diagnostic","posted_on_date":"6/16/2019","posted_on_time":"10:28 PM"},
{"id":23,"title":"Web Designer IV","location":"Indonesia","category":"n/a","experience":10,"description":"Fluoroscopy of Bilateral Upper Extremity Arteries using High Osmolar Contrast","posted_on_date":"5/2/2019","posted_on_time":"1:05 PM"},
{"id":24,"title":"Nurse Practicioner","location":"Vietnam","category":"Health Care","experience":8,"description":"Revision of Radioactive Element in Genitourinary Tract, Open Approach","posted_on_date":"9/30/2019","posted_on_time":"8:29 AM"},
{"id":25,"title":"VP Quality Control","location":"Japan","category":"Finance","experience":2,"description":"Supplement Left Foot Bursa and Ligament with Autologous Tissue Substitute, Open Approach","posted_on_date":"9/30/2019","posted_on_time":"2:08 AM"},
{"id":26,"title":"Recruiter","location":"France","category":"n/a","experience":10,"description":"Excision of Uterine Supporting Structure, Percutaneous Approach, Diagnostic","posted_on_date":"9/12/2019","posted_on_time":"9:06 PM"},
{"id":27,"title":"Staff Scientist","location":"China","category":"Finance","experience":8,"description":"Extirpation of Matter from Left Axillary Artery, Percutaneous Approach","posted_on_date":"1/13/2020","posted_on_time":"10:33 AM"},
{"id":28,"title":"Clinical Specialist","location":"Mexico","category":"Capital Goods","experience":3,"description":"Occlusion of Lingula Bronchus, Percutaneous Endoscopic Approach","posted_on_date":"10/13/2019","posted_on_time":"11:09 AM"},
{"id":29,"title":"Graphic Designer","location":"Kenya","category":"Technology","experience":3,"description":"Replacement of Occipital-cervical Joint with Synthetic Substitute, Open Approach","posted_on_date":"6/10/2019","posted_on_time":"10:38 AM"},
{"id":30,"title":"Analyst Programmer","location":"China","category":"Miscellaneous","experience":10,"description":"Dilation of Right Anterior Tibial Artery, Bifurcation, with Four or More Drug-eluting Intraluminal Devices, Open Approach","posted_on_date":"5/31/2019","posted_on_time":"8:04 AM"},
{"id":31,"title":"Health Coach II","location":"Guatemala","category":"Finance","experience":6,"description":"Removal of Synthetic Substitute from Spinal Cord, Percutaneous Approach","posted_on_date":"3/26/2019","posted_on_time":"11:32 PM"},
{"id":32,"title":"Recruiting Manager","location":"Poland","category":"Consumer Services","experience":7,"description":"Computerized Tomography (CT Scan) of Bilateral Pelvic (Iliac) Veins using Low Osmolar Contrast","posted_on_date":"12/16/2019","posted_on_time":"9:51 AM"},
{"id":33,"title":"Electrical Engineer","location":"Thailand","category":"Finance","experience":4,"description":"Osteopathic Treatment of Cervical Region using Low Velocity-High Amplitude Forces","posted_on_date":"6/12/2019","posted_on_time":"1:24 AM"},
{"id":34,"title":"Account Representative II","location":"Indonesia","category":"Finance","experience":7,"description":"Bypass Abdominal Aorta to Bilateral Femoral Arteries with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"10/22/2019","posted_on_time":"10:51 PM"},
{"id":35,"title":"Systems Administrator IV","location":"Kazakhstan","category":"Energy","experience":3,"description":"Division of Right Lower Leg Tendon, Percutaneous Approach","posted_on_date":"11/29/2019","posted_on_time":"2:40 PM"},
{"id":36,"title":"VP Marketing","location":"Indonesia","category":"Basic Industries","experience":6,"description":"Transfer Left Hand Skin, External Approach","posted_on_date":"5/3/2019","posted_on_time":"2:08 PM"},
{"id":37,"title":"Analog Circuit Design manager","location":"Portugal","category":"Health Care","experience":4,"description":"Removal of Nonautologous Tissue Substitute from Upper Bursa and Ligament, Percutaneous Approach","posted_on_date":"8/7/2019","posted_on_time":"2:44 AM"},
{"id":38,"title":"Quality Control Specialist","location":"Morocco","category":"Capital Goods","experience":6,"description":"Positron Emission Tomographic (PET) Imaging of Myocardium using Nitrogen 13 (N-13)","posted_on_date":"9/22/2019","posted_on_time":"3:20 PM"},
{"id":39,"title":"Marketing Assistant","location":"Brazil","category":"Finance","experience":2,"description":"Drainage of Right Upper Arm Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"1/16/2020","posted_on_time":"3:29 PM"},
{"id":40,"title":"Dental Hygienist","location":"Pakistan","category":"Finance","experience":2,"description":"Destruction of Phrenic Nerve, Open Approach","posted_on_date":"5/25/2019","posted_on_time":"10:23 PM"},
{"id":41,"title":"Project Manager","location":"Indonesia","category":"Consumer Services","experience":2,"description":"Drainage of Left Zygomatic Bone with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"6/15/2019","posted_on_time":"10:01 PM"},
{"id":42,"title":"Design Engineer","location":"Ukraine","category":"Consumer Services","experience":4,"description":"Transfusion of Autologous White Cells into Central Artery, Open Approach","posted_on_date":"3/13/2019","posted_on_time":"9:23 AM"},
{"id":43,"title":"Physical Therapy Assistant","location":"China","category":"Consumer Non-Durables","experience":9,"description":"Insertion of Monitoring Device into Thoracic Aorta, Ascending/Arch, Percutaneous Endoscopic Approach","posted_on_date":"12/7/2019","posted_on_time":"11:59 AM"},
{"id":44,"title":"Structural Engineer","location":"China","category":"Consumer Services","experience":7,"description":"Inspection of Right Sternoclavicular Joint, Open Approach","posted_on_date":"11/19/2019","posted_on_time":"10:24 AM"},
{"id":45,"title":"Research Assistant IV","location":"Bangladesh","category":"n/a","experience":10,"description":"Bypass Right Internal Iliac Artery to Bilateral External Iliac Arteries with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"10/22/2019","posted_on_time":"9:49 AM"},
{"id":46,"title":"Help Desk Technician","location":"Indonesia","category":"Finance","experience":4,"description":"Bypass Inferior Mesenteric Vein to Lower Vein with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"3/13/2019","posted_on_time":"7:12 PM"},
{"id":47,"title":"Assistant Manager","location":"Colombia","category":"Transportation","experience":2,"description":"Dilation of Right External Iliac Artery with Four or More Drug-eluting Intraluminal Devices, Percutaneous Endoscopic Approach","posted_on_date":"6/26/2019","posted_on_time":"5:01 AM"},
{"id":48,"title":"Social Worker","location":"China","category":"Finance","experience":5,"description":"Removal of Internal Fixation Device from Right Metacarpal, External Approach","posted_on_date":"2/14/2020","posted_on_time":"9:59 AM"},
{"id":49,"title":"Structural Engineer","location":"China","category":"Capital Goods","experience":2,"description":"Release Buttock Skin, External Approach","posted_on_date":"1/13/2020","posted_on_time":"1:59 PM"},
{"id":50,"title":"Occupational Therapist","location":"Guatemala","category":"Health Care","experience":1,"description":"Inspection of Bilateral Femoral Region, Open Approach","posted_on_date":"5/1/2019","posted_on_time":"8:28 PM"},
{"id":51,"title":"Mechanical Systems Engineer","location":"Russia","category":"n/a","experience":5,"description":"Computerized Tomography (CT Scan) of Pelvis using Low Osmolar Contrast","posted_on_date":"5/3/2019","posted_on_time":"2:48 AM"},
{"id":52,"title":"Marketing Manager","location":"Poland","category":"Consumer Services","experience":5,"description":"Drainage of Nasal Turbinate, Percutaneous Approach, Diagnostic","posted_on_date":"4/3/2019","posted_on_time":"10:38 AM"},
{"id":53,"title":"Actuary","location":"China","category":"Energy","experience":10,"description":"Fragmentation in Pancreatic Duct, Percutaneous Endoscopic Approach","posted_on_date":"4/2/2019","posted_on_time":"5:03 AM"},
{"id":54,"title":"Director of Sales","location":"Sweden","category":"Health Care","experience":7,"description":"Revision of Drainage Device in Urethra, Percutaneous Endoscopic Approach","posted_on_date":"6/14/2019","posted_on_time":"11:16 PM"},
{"id":55,"title":"Human Resources Assistant II","location":"Indonesia","category":"Consumer Services","experience":5,"description":"Fluoroscopy of Bladder using Low Osmolar Contrast","posted_on_date":"1/2/2020","posted_on_time":"7:36 PM"},
{"id":56,"title":"Quality Engineer","location":"China","category":"n/a","experience":1,"description":"Excision of Left Pelvic Bone, Open Approach, Diagnostic","posted_on_date":"4/18/2019","posted_on_time":"12:07 AM"},
{"id":57,"title":"Pharmacist","location":"Isle of Man","category":"Finance","experience":6,"description":"Fragmentation in Right Pleural Cavity, External Approach","posted_on_date":"6/19/2019","posted_on_time":"7:20 AM"},
{"id":58,"title":"Structural Analysis Engineer","location":"France","category":"n/a","experience":2,"description":"Extirpation of Matter from Right Axillary Artery, Percutaneous Approach","posted_on_date":"4/9/2019","posted_on_time":"5:57 PM"},
{"id":59,"title":"Senior Cost Accountant","location":"Guinea","category":"Finance","experience":1,"description":"Extirpation of Matter from Pericardial Cavity, Percutaneous Approach","posted_on_date":"3/9/2019","posted_on_time":"3:32 PM"},
{"id":60,"title":"Civil Engineer","location":"United States","category":"Miscellaneous","experience":9,"description":"Removal of Spacer from Coccygeal Joint, Percutaneous Approach","posted_on_date":"7/4/2019","posted_on_time":"4:28 PM"},
{"id":61,"title":"Quality Engineer","location":"Morocco","category":"Consumer Services","experience":3,"description":"Excision of Anus, Via Natural or Artificial Opening","posted_on_date":"10/6/2019","posted_on_time":"4:42 PM"},
{"id":62,"title":"Web Developer III","location":"Russia","category":"Consumer Services","experience":7,"description":"Reattachment of Descending Colon, Open Approach","posted_on_date":"1/5/2020","posted_on_time":"2:06 PM"},
{"id":63,"title":"Quality Engineer","location":"Brazil","category":"Consumer Durables","experience":6,"description":"Excision of Right Eye, Open Approach, Diagnostic","posted_on_date":"3/1/2019","posted_on_time":"6:41 PM"},
{"id":64,"title":"Pharmacist","location":"Philippines","category":"n/a","experience":1,"description":"Magnetic Resonance Imaging (MRI) of Left Upper Extremity Veins using Other Contrast, Unenhanced and Enhanced","posted_on_date":"1/5/2020","posted_on_time":"11:20 PM"},
{"id":65,"title":"Librarian","location":"Indonesia","category":"Technology","experience":4,"description":"Control Bleeding in Left Elbow Region, Open Approach","posted_on_date":"1/4/2020","posted_on_time":"4:43 AM"},
{"id":66,"title":"Structural Analysis Engineer","location":"Netherlands","category":"Finance","experience":10,"description":"Release Urethra, Via Natural or Artificial Opening Endoscopic","posted_on_date":"4/24/2019","posted_on_time":"5:19 PM"},
{"id":67,"title":"Dental Hygienist","location":"Macedonia","category":"Capital Goods","experience":3,"description":"Extirpation of Matter from Right Lung, Via Natural or Artificial Opening Endoscopic","posted_on_date":"8/25/2019","posted_on_time":"11:05 PM"},
{"id":68,"title":"Product Engineer","location":"Indonesia","category":"Consumer Services","experience":7,"description":"Stereotactic Particulate Radiosurgery of Ear","posted_on_date":"9/4/2019","posted_on_time":"9:12 AM"},
{"id":69,"title":"Junior Executive","location":"Brazil","category":"Finance","experience":6,"description":"Revision of Synthetic Substitute in Heart, Open Approach","posted_on_date":"2/16/2020","posted_on_time":"3:57 PM"},
{"id":70,"title":"Executive Secretary","location":"Philippines","category":"Capital Goods","experience":8,"description":"Destruction of Medulla Oblongata, Percutaneous Approach","posted_on_date":"9/19/2019","posted_on_time":"12:29 AM"},
{"id":71,"title":"Recruiting Manager","location":"Philippines","category":"n/a","experience":2,"description":"Removal of Infusion Device from Left Pleural Cavity, External Approach","posted_on_date":"1/3/2020","posted_on_time":"8:47 PM"},
{"id":72,"title":"Software Engineer II","location":"Brazil","category":"Finance","experience":1,"description":"Replacement of Papillary Muscle with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"5/23/2019","posted_on_time":"5:34 AM"},
{"id":73,"title":"Legal Assistant","location":"Cambodia","category":"Basic Industries","experience":10,"description":"Supplement Aortic Valve created from Truncal Valve with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"6/3/2019","posted_on_time":"9:24 PM"},
{"id":74,"title":"Geological Engineer","location":"Japan","category":"Public Utilities","experience":7,"description":"Revision of Tissue Expander in Right Breast, Percutaneous Approach","posted_on_date":"11/27/2019","posted_on_time":"2:26 PM"},
{"id":75,"title":"Nurse","location":"United States","category":"Public Utilities","experience":10,"description":"Removal of Synthetic Substitute from Left Humeral Shaft, Percutaneous Approach","posted_on_date":"7/20/2019","posted_on_time":"12:15 AM"},
{"id":76,"title":"Automation Specialist IV","location":"France","category":"n/a","experience":2,"description":"Extirpation of Matter from Appendix, Open Approach","posted_on_date":"6/3/2019","posted_on_time":"5:01 PM"},
{"id":77,"title":"VP Quality Control","location":"Nepal","category":"Consumer Non-Durables","experience":9,"description":"Bypass Right Common Iliac Artery to Left Femoral Artery with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"2/13/2020","posted_on_time":"5:30 AM"},
{"id":78,"title":"VP Quality Control","location":"China","category":"Health Care","experience":5,"description":"Extirpation of Matter from Cystic Duct, Via Natural or Artificial Opening","posted_on_date":"1/24/2020","posted_on_time":"3:47 PM"},
{"id":79,"title":"Legal Assistant","location":"Argentina","category":"Consumer Services","experience":4,"description":"Excision of Right Radius, Percutaneous Approach, Diagnostic","posted_on_date":"4/27/2019","posted_on_time":"11:57 PM"},
{"id":80,"title":"Electrical Engineer","location":"United States","category":"Health Care","experience":9,"description":"Reposition Right Thumb Phalanx, External Approach","posted_on_date":"7/20/2019","posted_on_time":"9:24 AM"},
{"id":81,"title":"Sales Associate","location":"China","category":"n/a","experience":3,"description":"Dilation of Inferior Mesenteric Vein with Intraluminal Device, Percutaneous Endoscopic Approach","posted_on_date":"12/8/2019","posted_on_time":"11:49 AM"},
{"id":82,"title":"Database Administrator II","location":"Russia","category":"Finance","experience":9,"description":"Occlusion of Common Bile Duct with Intraluminal Device, Percutaneous Endoscopic Approach","posted_on_date":"8/17/2019","posted_on_time":"11:36 AM"},
{"id":83,"title":"Social Worker","location":"Peru","category":"Finance","experience":1,"description":"Release Pulmonary Valve, Percutaneous Endoscopic Approach","posted_on_date":"8/10/2019","posted_on_time":"7:49 AM"},
{"id":84,"title":"General Manager","location":"Peru","category":"n/a","experience":5,"description":"Extirpation of Matter from Left Upper Lobe Bronchus, Open Approach","posted_on_date":"5/10/2019","posted_on_time":"4:39 AM"},
{"id":85,"title":"Recruiting Manager","location":"Montenegro","category":"n/a","experience":6,"description":"Drainage of Greater Omentum with Drainage Device, Percutaneous Approach","posted_on_date":"1/24/2020","posted_on_time":"9:55 PM"},
{"id":86,"title":"Legal Assistant","location":"China","category":"n/a","experience":3,"description":"Aural Rehabilitation Treatment using Biosensory Feedback Equipment","posted_on_date":"11/1/2019","posted_on_time":"5:44 AM"},
{"id":87,"title":"Web Designer IV","location":"China","category":"Basic Industries","experience":3,"description":"Removal of Monitoring Device from Kidney, Via Natural or Artificial Opening Endoscopic","posted_on_date":"5/6/2019","posted_on_time":"11:43 PM"},
{"id":88,"title":"Administrative Assistant III","location":"Ukraine","category":"n/a","experience":8,"description":"Supplement Ulnar Nerve with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"2/1/2020","posted_on_time":"11:33 PM"},
{"id":89,"title":"Food Chemist","location":"Finland","category":"Capital Goods","experience":2,"description":"Excision of Pharynx, Via Natural or Artificial Opening","posted_on_date":"4/4/2019","posted_on_time":"11:20 PM"},
{"id":90,"title":"Help Desk Technician","location":"China","category":"n/a","experience":1,"description":"Dilation of Pancreatic Duct, Percutaneous Endoscopic Approach","posted_on_date":"11/17/2019","posted_on_time":"2:55 AM"},
{"id":91,"title":"Staff Scientist","location":"China","category":"n/a","experience":10,"description":"Excision of Left Trunk Muscle, Percutaneous Endoscopic Approach","posted_on_date":"3/14/2019","posted_on_time":"3:42 PM"},
{"id":92,"title":"Geologist IV","location":"China","category":"n/a","experience":3,"description":"Fusion of 2 or more Lumbar Vertebral Joints with Synthetic Substitute, Posterior Approach, Posterior Column, Percutaneous Endoscopic Approach","posted_on_date":"1/22/2020","posted_on_time":"6:32 PM"},
{"id":93,"title":"Health Coach IV","location":"Mongolia","category":"n/a","experience":2,"description":"Alteration of Face Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"6/27/2019","posted_on_time":"3:18 PM"},
{"id":94,"title":"Cost Accountant","location":"China","category":"Health Care","experience":10,"description":"Destruction of Portal Vein, Percutaneous Approach","posted_on_date":"6/26/2019","posted_on_time":"10:10 AM"},
{"id":95,"title":"Information Systems Manager","location":"Russia","category":"Capital Goods","experience":9,"description":"Supplement Superior Vena Cava with Autologous Tissue Substitute, Open Approach","posted_on_date":"5/4/2019","posted_on_time":"7:24 PM"},
{"id":96,"title":"Structural Analysis Engineer","location":"Cameroon","category":"Consumer Non-Durables","experience":3,"description":"Release Right Temporal Bone, Open Approach","posted_on_date":"11/2/2019","posted_on_time":"12:10 PM"},
{"id":97,"title":"Community Outreach Specialist","location":"China","category":"Finance","experience":10,"description":"Revision of Synthetic Substitute in Left Metacarpal, Percutaneous Endoscopic Approach","posted_on_date":"9/20/2019","posted_on_time":"8:44 AM"},
{"id":98,"title":"Paralegal","location":"Ukraine","category":"n/a","experience":2,"description":"Reposition Left Tarsal, Percutaneous Approach","posted_on_date":"4/13/2019","posted_on_time":"11:22 AM"},
{"id":99,"title":"Research Nurse","location":"Costa Rica","category":"Finance","experience":1,"description":"Drainage of Right Lacrimal Gland, Open Approach","posted_on_date":"10/15/2019","posted_on_time":"8:19 PM"},
{"id":100,"title":"Nurse","location":"Argentina","category":"Technology","experience":10,"description":"Revision of Autologous Tissue Substitute in Left Fibula, Percutaneous Endoscopic Approach","posted_on_date":"7/7/2019","posted_on_time":"1:54 AM"},
{"id":101,"title":"Research Associate","location":"Cuba","category":"Technology","experience":9,"description":"Repair of Lower Tooth, All, External Approach","posted_on_date":"3/25/2019","posted_on_time":"4:51 AM"},
{"id":102,"title":"Senior Sales Associate","location":"Poland","category":"n/a","experience":2,"description":"Fusion of 2 or more Lumbar Vertebral Joints with Autologous Tissue Substitute, Posterior Approach, Anterior Column, Open Approach","posted_on_date":"8/7/2019","posted_on_time":"11:43 AM"},
{"id":103,"title":"General Manager","location":"Japan","category":"Consumer Durables","experience":4,"description":"Endocrine System, Reposition","posted_on_date":"11/2/2019","posted_on_time":"6:19 AM"},
{"id":104,"title":"Cost Accountant","location":"Panama","category":"Technology","experience":4,"description":"Repair Right Buttock, Percutaneous Endoscopic Approach","posted_on_date":"7/27/2019","posted_on_time":"2:42 AM"},
{"id":105,"title":"Community Outreach Specialist","location":"Indonesia","category":"n/a","experience":8,"description":"Insertion of Internal Fixation Device into Sternum, Percutaneous Approach","posted_on_date":"9/13/2019","posted_on_time":"12:57 AM"},
{"id":106,"title":"Web Designer IV","location":"Portugal","category":"Consumer Services","experience":7,"description":"Beam Radiation of Abdomen using Electrons","posted_on_date":"11/30/2019","posted_on_time":"3:06 PM"},
{"id":107,"title":"Software Engineer I","location":"Cuba","category":"Finance","experience":9,"description":"Revision of Autologous Tissue Substitute in Mesentery, Open Approach","posted_on_date":"8/30/2019","posted_on_time":"1:22 PM"},
{"id":108,"title":"VP Product Management","location":"France","category":"Finance","experience":7,"description":"Extirpation of Matter from Right Knee Joint, Percutaneous Endoscopic Approach","posted_on_date":"7/13/2019","posted_on_time":"2:10 AM"},
{"id":109,"title":"Associate Professor","location":"Brazil","category":"Public Utilities","experience":4,"description":"Occlusion of Right Hand Artery, Open Approach","posted_on_date":"10/4/2019","posted_on_time":"3:45 PM"},
{"id":110,"title":"Safety Technician IV","location":"Philippines","category":"Consumer Services","experience":5,"description":"Removal of Nonautologous Tissue Substitute from Face, Percutaneous Approach","posted_on_date":"10/15/2019","posted_on_time":"5:12 AM"},
{"id":111,"title":"Senior Sales Associate","location":"Indonesia","category":"Health Care","experience":2,"description":"Drainage of Right External Carotid Artery, Percutaneous Approach, Diagnostic","posted_on_date":"11/13/2019","posted_on_time":"1:22 AM"},
{"id":112,"title":"Compensation Analyst","location":"Indonesia","category":"Health Care","experience":8,"description":"Removal of Nonautologous Tissue Substitute from Right Sternoclavicular Joint, Percutaneous Approach","posted_on_date":"12/6/2019","posted_on_time":"6:36 PM"},
{"id":113,"title":"General Manager","location":"Colombia","category":"Consumer Non-Durables","experience":7,"description":"Repair Clitoris, External Approach","posted_on_date":"10/10/2019","posted_on_time":"1:01 AM"},
{"id":114,"title":"Automation Specialist I","location":"Belarus","category":"Finance","experience":8,"description":"Supplement of Back Subcutaneous Tissue and Fascia with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"12/10/2019","posted_on_time":"3:32 PM"},
{"id":115,"title":"Geological Engineer","location":"Pakistan","category":"Health Care","experience":8,"description":"Dilation of Left Femoral Artery, Bifurcation, Percutaneous Endoscopic Approach","posted_on_date":"9/5/2019","posted_on_time":"3:59 PM"},
{"id":116,"title":"Mechanical Systems Engineer","location":"China","category":"Health Care","experience":10,"description":"Dilation of Left Hand Artery, Bifurcation, with Three Intraluminal Devices, Percutaneous Approach","posted_on_date":"3/21/2019","posted_on_time":"9:32 AM"},
{"id":117,"title":"Help Desk Technician","location":"Iran","category":"Health Care","experience":8,"description":"Supplement Left Atrium with Zooplastic Tissue, Percutaneous Approach","posted_on_date":"3/11/2019","posted_on_time":"4:07 AM"},
{"id":118,"title":"Analyst Programmer","location":"Moldova","category":"Consumer Services","experience":10,"description":"Transfusion of Autologous Red Blood Cells into Peripheral Vein, Percutaneous Approach","posted_on_date":"9/26/2019","posted_on_time":"9:05 AM"},
{"id":119,"title":"Civil Engineer","location":"Serbia","category":"Consumer Durables","experience":3,"description":"Extirpation of Matter from Prostate, Via Natural or Artificial Opening","posted_on_date":"1/25/2020","posted_on_time":"12:00 PM"},
{"id":120,"title":"GIS Technical Architect","location":"France","category":"Basic Industries","experience":2,"description":"Drainage of Left Upper Lung Lobe, Percutaneous Endoscopic Approach","posted_on_date":"11/20/2019","posted_on_time":"5:26 AM"},
{"id":121,"title":"Staff Accountant II","location":"Brazil","category":"n/a","experience":7,"description":"Release Right Toe Phalangeal Joint, Open Approach","posted_on_date":"4/29/2019","posted_on_time":"11:26 PM"},
{"id":122,"title":"Senior Sales Associate","location":"Cuba","category":"n/a","experience":9,"description":"Revision of Synthetic Substitute in Left Metatarsal, Percutaneous Endoscopic Approach","posted_on_date":"11/29/2019","posted_on_time":"1:35 AM"},
{"id":123,"title":"Product Engineer","location":"Russia","category":"Health Care","experience":1,"description":"Computerized Tomography (CT Scan) of Right Elbow","posted_on_date":"12/7/2019","posted_on_time":"5:59 PM"},
{"id":124,"title":"Quality Control Specialist","location":"Portugal","category":"Health Care","experience":1,"description":"Transfusion of Autologous Hematopoietic Stem Cells into Peripheral Vein, Open Approach","posted_on_date":"9/18/2019","posted_on_time":"4:12 AM"},
{"id":125,"title":"Environmental Tech","location":"Indonesia","category":"Consumer Durables","experience":3,"description":"Insertion of Radioactive Element into Respiratory Tract, Via Natural or Artificial Opening Endoscopic","posted_on_date":"10/23/2019","posted_on_time":"12:29 PM"},
{"id":126,"title":"Professor","location":"South Korea","category":"n/a","experience":10,"description":"Revision of Internal Fixation Device in Right Metatarsal, Percutaneous Approach","posted_on_date":"4/22/2019","posted_on_time":"3:48 AM"},
{"id":127,"title":"Nuclear Power Engineer","location":"United States","category":"Consumer Durables","experience":1,"description":"Release Right Thyroid Artery, Percutaneous Endoscopic Approach","posted_on_date":"7/3/2019","posted_on_time":"5:52 AM"},
{"id":128,"title":"Structural Analysis Engineer","location":"China","category":"n/a","experience":2,"description":"Revision of Internal Fixation Device in Left Humeral Shaft, Percutaneous Endoscopic Approach","posted_on_date":"5/31/2019","posted_on_time":"3:13 PM"},
{"id":129,"title":"Engineer IV","location":"Brazil","category":"Finance","experience":4,"description":"Reposition Cervical Vertebral Joint with Internal Fixation Device, Percutaneous Approach","posted_on_date":"7/1/2019","posted_on_time":"3:08 PM"},
{"id":130,"title":"Environmental Specialist","location":"China","category":"n/a","experience":2,"description":"Replacement of Right Hand Artery with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"8/7/2019","posted_on_time":"4:20 AM"},
{"id":131,"title":"Web Designer III","location":"China","category":"Finance","experience":4,"description":"Resection of Left Sacroiliac Joint, Open Approach","posted_on_date":"2/2/2020","posted_on_time":"8:06 PM"},
{"id":132,"title":"Technical Writer","location":"Netherlands","category":"Energy","experience":1,"description":"Repair Right Internal Mammary Lymphatic, Percutaneous Approach","posted_on_date":"1/4/2020","posted_on_time":"9:27 PM"},
{"id":133,"title":"Paralegal","location":"Estonia","category":"Health Care","experience":4,"description":"Fusion of 2 or more Lumbar Vertebral Joints with Nonautologous Tissue Substitute, Posterior Approach, Anterior Column, Open Approach","posted_on_date":"4/1/2019","posted_on_time":"10:40 AM"},
{"id":134,"title":"Human Resources Assistant III","location":"Russia","category":"Basic Industries","experience":10,"description":"Drainage of Right Ulnar Artery with Drainage Device, Open Approach","posted_on_date":"7/2/2019","posted_on_time":"10:25 PM"},
{"id":135,"title":"Food Chemist","location":"China","category":"Health Care","experience":5,"description":"Introduction of Liquid Brachytherapy Radioisotope into Lower GI, Via Natural or Artificial Opening","posted_on_date":"12/7/2019","posted_on_time":"6:27 AM"},
{"id":136,"title":"Structural Engineer","location":"China","category":"Finance","experience":3,"description":"Removal of Drainage Device from Right Finger Phalangeal Joint, Open Approach","posted_on_date":"5/27/2019","posted_on_time":"3:06 PM"},
{"id":137,"title":"VP Marketing","location":"Georgia","category":"Energy","experience":7,"description":"Revision of Intraluminal Device in Lymphatic, External Approach","posted_on_date":"2/17/2020","posted_on_time":"12:02 AM"},
{"id":138,"title":"Web Designer IV","location":"France","category":"Technology","experience":4,"description":"Excision of Left Nipple, Via Natural or Artificial Opening Endoscopic","posted_on_date":"1/10/2020","posted_on_time":"12:38 PM"},
{"id":139,"title":"Physical Therapy Assistant","location":"Brazil","category":"n/a","experience":5,"description":"Drainage of Right Zygomatic Bone, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"2/6/2020","posted_on_time":"6:06 PM"},
{"id":140,"title":"Environmental Tech","location":"Vietnam","category":"Finance","experience":6,"description":"Removal of Drainage Device from Spinal Cord, External Approach","posted_on_date":"12/20/2019","posted_on_time":"3:29 AM"},
{"id":141,"title":"VP Marketing","location":"Philippines","category":"Consumer Services","experience":8,"description":"Beam Radiation of Buttock Skin using Neutron Capture","posted_on_date":"1/5/2020","posted_on_time":"3:41 PM"},
{"id":142,"title":"Financial Analyst","location":"Venezuela","category":"Health Care","experience":3,"description":"Reattachment of Left Thorax Muscle, Percutaneous Endoscopic Approach","posted_on_date":"2/13/2020","posted_on_time":"12:37 AM"},
{"id":143,"title":"Nuclear Power Engineer","location":"China","category":"Capital Goods","experience":4,"description":"Revision of Infusion Device in Cisterna Chyli, External Approach","posted_on_date":"1/25/2020","posted_on_time":"1:15 PM"},
{"id":144,"title":"Business Systems Development Analyst","location":"Russia","category":"Consumer Non-Durables","experience":3,"description":"Removal of Drainage Device from Lower Extremity Subcutaneous Tissue and Fascia, Open Approach","posted_on_date":"5/17/2019","posted_on_time":"1:06 PM"},
{"id":145,"title":"Social Worker","location":"Poland","category":"Consumer Services","experience":1,"description":"Release Toe Nail, External Approach","posted_on_date":"12/18/2019","posted_on_time":"11:50 PM"},
{"id":146,"title":"Electrical Engineer","location":"Czech Republic","category":"Health Care","experience":10,"description":"Revision of Extraluminal Device in Heart, Percutaneous Endoscopic Approach","posted_on_date":"10/30/2019","posted_on_time":"4:37 AM"},
{"id":147,"title":"Automation Specialist II","location":"Mexico","category":"n/a","experience":9,"description":"Drainage of Upper Gingiva, Percutaneous Approach","posted_on_date":"3/15/2019","posted_on_time":"1:04 PM"},
{"id":148,"title":"Desktop Support Technician","location":"Indonesia","category":"Consumer Services","experience":10,"description":"Repair Left Lower Extremity, Percutaneous Approach","posted_on_date":"1/15/2020","posted_on_time":"9:07 AM"},
{"id":149,"title":"Actuary","location":"Indonesia","category":"Consumer Services","experience":2,"description":"Extirpation of Matter from Right Foot Artery, Bifurcation, Percutaneous Approach","posted_on_date":"2/8/2020","posted_on_time":"9:21 AM"},
{"id":150,"title":"Assistant Professor","location":"China","category":"Health Care","experience":1,"description":"Plain Radiography of Left Hip","posted_on_date":"9/1/2019","posted_on_time":"1:52 PM"},
{"id":151,"title":"Health Coach IV","location":"China","category":"n/a","experience":4,"description":"Supplement Right Axillary Artery with Synthetic Substitute, Open Approach","posted_on_date":"7/13/2019","posted_on_time":"10:02 AM"},
{"id":152,"title":"Research Assistant I","location":"Argentina","category":"n/a","experience":1,"description":"Urinary System, Resection","posted_on_date":"7/1/2019","posted_on_time":"10:44 AM"},
{"id":153,"title":"Financial Analyst","location":"Latvia","category":"Health Care","experience":3,"description":"Peripheral Nervous System, Insertion","posted_on_date":"6/12/2019","posted_on_time":"7:27 PM"},
{"id":154,"title":"Budget/Accounting Analyst IV","location":"Indonesia","category":"n/a","experience":8,"description":"Drainage of Female Perineum, Open Approach, Diagnostic","posted_on_date":"9/12/2019","posted_on_time":"6:45 PM"},
{"id":155,"title":"Budget/Accounting Analyst IV","location":"Japan","category":"Finance","experience":1,"description":"Supplement Right Lower Extremity with Synthetic Substitute, Open Approach","posted_on_date":"12/31/2019","posted_on_time":"1:42 AM"},
{"id":156,"title":"Environmental Tech","location":"China","category":"Health Care","experience":1,"description":"Replacement of Right Common Iliac Artery with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"7/20/2019","posted_on_time":"3:43 PM"},
{"id":157,"title":"Food Chemist","location":"Comoros","category":"Consumer Services","experience":9,"description":"Resection of Bilateral Epididymis, Percutaneous Endoscopic Approach","posted_on_date":"8/9/2019","posted_on_time":"2:41 AM"},
{"id":158,"title":"Account Executive","location":"China","category":"Capital Goods","experience":8,"description":"High Dose Rate (HDR) Brachytherapy of Brain Stem using Cesium 137 (Cs-137)","posted_on_date":"4/3/2019","posted_on_time":"10:07 AM"},
{"id":159,"title":"Biostatistician III","location":"United States","category":"n/a","experience":8,"description":"Replacement of Left Knee Joint, Femoral Surface with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"10/22/2019","posted_on_time":"10:19 AM"},
{"id":160,"title":"Senior Financial Analyst","location":"Cape Verde","category":"n/a","experience":10,"description":"Eye, Reattachment","posted_on_date":"11/26/2019","posted_on_time":"7:36 PM"},
{"id":161,"title":"Chemical Engineer","location":"Venezuela","category":"Health Care","experience":2,"description":"Repair Right Knee Joint, Percutaneous Endoscopic Approach","posted_on_date":"4/6/2019","posted_on_time":"3:55 PM"},
{"id":162,"title":"Programmer IV","location":"Brazil","category":"Consumer Services","experience":8,"description":"Reattachment of Right Upper Extremity Bursa and Ligament, Percutaneous Endoscopic Approach","posted_on_date":"7/20/2019","posted_on_time":"9:27 PM"},
{"id":163,"title":"Executive Secretary","location":"Brazil","category":"Miscellaneous","experience":4,"description":"Replacement of Left Metatarsal-Tarsal Joint with Synthetic Substitute, Open Approach","posted_on_date":"9/8/2019","posted_on_time":"8:40 PM"},
{"id":164,"title":"Software Engineer I","location":"Greece","category":"Technology","experience":9,"description":"Therapeutic Exercise Treatment of Musculoskeletal System - Upper Back / Upper Extremity using Mechanical Equipment","posted_on_date":"4/19/2019","posted_on_time":"3:27 PM"},
{"id":165,"title":"Accountant I","location":"Bulgaria","category":"n/a","experience":1,"description":"Revision of Synthetic Substitute in Left Eye, Via Natural or Artificial Opening Endoscopic","posted_on_date":"6/9/2019","posted_on_time":"2:21 AM"},
{"id":166,"title":"Budget/Accounting Analyst IV","location":"Albania","category":"Consumer Durables","experience":3,"description":"Stereotactic Other Photon Radiosurgery of Ileum","posted_on_date":"7/30/2019","posted_on_time":"4:56 AM"},
{"id":167,"title":"VP Accounting","location":"Iceland","category":"Consumer Durables","experience":5,"description":"Occlusion of Right Basilic Vein, Percutaneous Approach","posted_on_date":"3/6/2019","posted_on_time":"2:48 AM"},
{"id":168,"title":"Biostatistician I","location":"Colombia","category":"Finance","experience":3,"description":"Supplement Right Lower Femur with Synthetic Substitute, Percutaneous Approach","posted_on_date":"7/16/2019","posted_on_time":"1:10 PM"},
{"id":169,"title":"Occupational Therapist","location":"Mexico","category":"n/a","experience":8,"description":"Extirpation of Matter from Right Knee Joint, Percutaneous Endoscopic Approach","posted_on_date":"9/28/2019","posted_on_time":"11:57 PM"},
{"id":170,"title":"Account Executive","location":"Vietnam","category":"Capital Goods","experience":1,"description":"Transfer Oculomotor Nerve to Abducens Nerve, Open Approach","posted_on_date":"8/13/2019","posted_on_time":"3:25 PM"},
{"id":171,"title":"Analog Circuit Design manager","location":"Czech Republic","category":"Technology","experience":8,"description":"Removal of Internal Fixation Device from Left Humeral Head, Open Approach","posted_on_date":"1/10/2020","posted_on_time":"4:51 AM"},
{"id":172,"title":"Environmental Specialist","location":"Brazil","category":"Basic Industries","experience":7,"description":"Supplement Left Sacroiliac Joint with Nonautologous Tissue Substitute, Percutaneous Approach","posted_on_date":"5/28/2019","posted_on_time":"10:22 PM"},
{"id":173,"title":"Assistant Professor","location":"Philippines","category":"Consumer Durables","experience":3,"description":"Supplement Thoracic Nerve with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"11/24/2019","posted_on_time":"5:18 PM"},
{"id":174,"title":"Health Coach III","location":"China","category":"Health Care","experience":4,"description":"Dilation of Small Intestine, Percutaneous Endoscopic Approach","posted_on_date":"1/5/2020","posted_on_time":"9:22 AM"},
{"id":175,"title":"Marketing Assistant","location":"Peru","category":"n/a","experience":5,"description":"Drainage of Ulnar Nerve with Drainage Device, Open Approach","posted_on_date":"7/16/2019","posted_on_time":"8:56 AM"},
{"id":176,"title":"Developer I","location":"Philippines","category":"Health Care","experience":4,"description":"Caregiver Training in Gait Training/Functional Ambulation using Orthosis","posted_on_date":"11/20/2019","posted_on_time":"10:45 AM"},
{"id":177,"title":"Analyst Programmer","location":"United States","category":"Capital Goods","experience":5,"description":"Bypass Right Axillary Vein to Upper Vein, Percutaneous Endoscopic Approach","posted_on_date":"4/18/2019","posted_on_time":"1:33 PM"},
{"id":178,"title":"VP Accounting","location":"Indonesia","category":"Consumer Services","experience":9,"description":"Dilation of Left Femoral Artery with Drug-eluting Intraluminal Device, using Drug-Coated Balloon, Open Approach","posted_on_date":"8/29/2019","posted_on_time":"9:44 PM"},
{"id":179,"title":"Senior Financial Analyst","location":"Netherlands","category":"Consumer Durables","experience":9,"description":"Drainage of Right Upper Extremity Lymphatic, Percutaneous Endoscopic Approach","posted_on_date":"6/2/2019","posted_on_time":"12:40 AM"},
{"id":180,"title":"Health Coach III","location":"Brazil","category":"n/a","experience":2,"description":"Change Other Device on Neck","posted_on_date":"1/10/2020","posted_on_time":"4:54 AM"},
{"id":181,"title":"Chemical Engineer","location":"Sweden","category":"Finance","experience":2,"description":"Replacement of Perineum Tendon with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"12/20/2019","posted_on_time":"3:16 PM"},
{"id":182,"title":"Developer II","location":"Ireland","category":"Miscellaneous","experience":7,"description":"Release Left Acetabulum, Open Approach","posted_on_date":"3/19/2019","posted_on_time":"6:52 PM"},
{"id":183,"title":"VP Marketing","location":"Malaysia","category":"Finance","experience":1,"description":"Drainage of Right Wrist Bursa and Ligament, Open Approach","posted_on_date":"4/10/2019","posted_on_time":"12:39 PM"},
{"id":184,"title":"Compensation Analyst","location":"China","category":"n/a","experience":7,"description":"Insertion of Intraluminal Device into Left Radial Artery, Percutaneous Endoscopic Approach","posted_on_date":"7/20/2019","posted_on_time":"9:33 AM"},
{"id":185,"title":"Junior Executive","location":"Indonesia","category":"Finance","experience":7,"description":"Planar Nuclear Medicine Imaging of Right Lower Extremity using Technetium 99m (Tc-99m)","posted_on_date":"2/14/2020","posted_on_time":"9:29 PM"},
{"id":186,"title":"Research Assistant IV","location":"Indonesia","category":"Consumer Services","experience":1,"description":"Occlusion of Bladder Neck with Intraluminal Device, Open Approach","posted_on_date":"7/27/2019","posted_on_time":"9:31 AM"},
{"id":187,"title":"Assistant Media Planner","location":"France","category":"Capital Goods","experience":2,"description":"Bypass Cecum to Transverse Colon, Percutaneous Endoscopic Approach","posted_on_date":"6/4/2019","posted_on_time":"4:12 PM"},
{"id":188,"title":"Junior Executive","location":"Brazil","category":"Finance","experience":2,"description":"Bypass Bilateral Vas Deferens to Right Epididymis, Percutaneous Endoscopic Approach","posted_on_date":"7/14/2019","posted_on_time":"2:41 PM"},
{"id":189,"title":"Accounting Assistant IV","location":"Mauritius","category":"Consumer Services","experience":8,"description":"Dilation of Right Foot Artery with Two Intraluminal Devices, Open Approach","posted_on_date":"5/15/2019","posted_on_time":"6:15 PM"},
{"id":190,"title":"Senior Financial Analyst","location":"Serbia","category":"Health Care","experience":4,"description":"Excision of Abducens Nerve, Percutaneous Approach, Diagnostic","posted_on_date":"2/20/2020","posted_on_time":"9:07 AM"},
{"id":191,"title":"Database Administrator II","location":"Japan","category":"Capital Goods","experience":3,"description":"Repair Lower Esophagus, Via Natural or Artificial Opening","posted_on_date":"8/5/2019","posted_on_time":"8:30 PM"},
{"id":192,"title":"Environmental Specialist","location":"Palestinian Territory","category":"n/a","experience":1,"description":"Resection of Jejunum, Via Natural or Artificial Opening","posted_on_date":"1/13/2020","posted_on_time":"9:14 PM"},
{"id":193,"title":"Geologist IV","location":"Russia","category":"Technology","experience":4,"description":"Extirpation of Matter from Abdominal Aorta, Percutaneous Approach","posted_on_date":"8/4/2019","posted_on_time":"9:05 AM"},
{"id":194,"title":"Teacher","location":"Russia","category":"Health Care","experience":3,"description":"Introduction of Other Therapeutic Substance into Nose, External Approach","posted_on_date":"10/13/2019","posted_on_time":"11:22 AM"},
{"id":195,"title":"Junior Executive","location":"Japan","category":"Capital Goods","experience":4,"description":"Revision of Synthetic Substitute in Cervicothoracic Vertebral Joint, Percutaneous Endoscopic Approach","posted_on_date":"9/2/2019","posted_on_time":"8:51 PM"},
{"id":196,"title":"Analog Circuit Design manager","location":"Poland","category":"n/a","experience":9,"description":"Drainage of Right Middle Lobe Bronchus with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"5/27/2019","posted_on_time":"5:44 PM"},
{"id":197,"title":"Marketing Assistant","location":"Portugal","category":"Energy","experience":2,"description":"Excision of Optic Nerve, Percutaneous Endoscopic Approach","posted_on_date":"8/20/2019","posted_on_time":"5:09 AM"},
{"id":198,"title":"Staff Scientist","location":"Philippines","category":"Basic Industries","experience":4,"description":"Drainage of Right Neck Muscle, Percutaneous Endoscopic Approach","posted_on_date":"7/25/2019","posted_on_time":"2:27 AM"},
{"id":199,"title":"Junior Executive","location":"Kenya","category":"Consumer Services","experience":7,"description":"Revision of Drainage Device in Scrotum and Tunica Vaginalis, Via Natural or Artificial Opening","posted_on_date":"9/9/2019","posted_on_time":"6:42 PM"},
{"id":200,"title":"Web Designer I","location":"China","category":"Finance","experience":3,"description":"Insertion of Hybrid External Fixation Device into Right Humeral Shaft, Percutaneous Endoscopic Approach","posted_on_date":"5/3/2019","posted_on_time":"5:06 PM"},
{"id":201,"title":"Analyst Programmer","location":"China","category":"Consumer Services","experience":9,"description":"Manual Therapy Techniques Treatment of Neurological System - Head and Neck","posted_on_date":"9/3/2019","posted_on_time":"7:26 AM"},
{"id":202,"title":"Recruiting Manager","location":"China","category":"Technology","experience":8,"description":"Introduction of Other Diagnostic Substance into Male Reproductive, Via Natural or Artificial Opening","posted_on_date":"12/8/2019","posted_on_time":"10:25 PM"},
{"id":203,"title":"Developer IV","location":"China","category":"Miscellaneous","experience":7,"description":"Computerized Tomography (CT Scan) of Right Tibia/Fibula using Other Contrast","posted_on_date":"11/24/2019","posted_on_time":"3:51 AM"},
{"id":204,"title":"Cost Accountant","location":"Russia","category":"Miscellaneous","experience":4,"description":"Restriction of Hepatic Vein with Intraluminal Device, Percutaneous Approach","posted_on_date":"3/3/2019","posted_on_time":"4:56 PM"},
{"id":205,"title":"Research Associate","location":"China","category":"Consumer Non-Durables","experience":7,"description":"Caregiver Training in Wheelchair Mobility using Orthosis","posted_on_date":"7/3/2019","posted_on_time":"10:53 AM"},
{"id":206,"title":"Pharmacist","location":"Poland","category":"n/a","experience":4,"description":"Fluoroscopy of Ileal Diversion Loop using Low Osmolar Contrast","posted_on_date":"12/6/2019","posted_on_time":"12:47 PM"},
{"id":207,"title":"Human Resources Assistant II","location":"Brazil","category":"Capital Goods","experience":3,"description":"Revision of Infusion Device in Thoracolumbar Vertebral Disc, Open Approach","posted_on_date":"4/28/2019","posted_on_time":"9:12 PM"},
{"id":208,"title":"Professor","location":"Indonesia","category":"Consumer Non-Durables","experience":2,"description":"Reattachment of Left Hand Tendon, Open Approach","posted_on_date":"10/18/2019","posted_on_time":"2:51 AM"},
{"id":209,"title":"Environmental Specialist","location":"Poland","category":"Consumer Services","experience":3,"description":"Drainage of Left Rib, Open Approach","posted_on_date":"10/21/2019","posted_on_time":"1:07 AM"},
{"id":210,"title":"Physical Therapy Assistant","location":"Iran","category":"Health Care","experience":8,"description":"Extraction of Left Abdomen Bursa and Ligament, Open Approach","posted_on_date":"4/7/2019","posted_on_time":"12:10 PM"},
{"id":211,"title":"Food Chemist","location":"Mexico","category":"Finance","experience":6,"description":"Destruction of Minor Salivary Gland, Open Approach","posted_on_date":"4/5/2019","posted_on_time":"12:23 AM"},
{"id":212,"title":"Structural Engineer","location":"China","category":"Consumer Services","experience":6,"description":"Destruction of Upper Vein, Percutaneous Endoscopic Approach","posted_on_date":"7/20/2019","posted_on_time":"1:03 PM"},
{"id":213,"title":"Human Resources Assistant III","location":"New Zealand","category":"Finance","experience":10,"description":"Restriction of Left Hepatic Duct, Percutaneous Endoscopic Approach","posted_on_date":"1/28/2020","posted_on_time":"1:20 PM"},
{"id":214,"title":"Executive Secretary","location":"Indonesia","category":"n/a","experience":8,"description":"Revision of Neurostimulator Lead in Brain, Percutaneous Endoscopic Approach","posted_on_date":"12/20/2019","posted_on_time":"3:33 AM"},
{"id":215,"title":"Software Engineer I","location":"Indonesia","category":"Finance","experience":8,"description":"Low Dose Rate (LDR) Brachytherapy of Liver using Californium 252 (Cf-252)","posted_on_date":"9/18/2019","posted_on_time":"9:07 PM"},
{"id":216,"title":"Senior Editor","location":"China","category":"Consumer Services","experience":1,"description":"Introduction of High-dose Interleukin-2 into Central Vein, Percutaneous Approach","posted_on_date":"2/21/2020","posted_on_time":"9:19 AM"},
{"id":217,"title":"Sales Associate","location":"China","category":"Capital Goods","experience":10,"description":"Computerized Tomography (CT Scan) of Bilateral Tracheobronchial Trees using High Osmolar Contrast","posted_on_date":"7/1/2019","posted_on_time":"4:11 PM"},
{"id":218,"title":"Computer Systems Analyst II","location":"Venezuela","category":"n/a","experience":7,"description":"Removal of Radioactive Element from Left Lower Extremity, Percutaneous Approach","posted_on_date":"1/4/2020","posted_on_time":"11:45 PM"},
{"id":219,"title":"Clinical Specialist","location":"Yemen","category":"Consumer Services","experience":7,"description":"Release Hard Palate, Percutaneous Approach","posted_on_date":"2/17/2020","posted_on_time":"8:05 PM"},
{"id":220,"title":"VP Sales","location":"Brazil","category":"Technology","experience":4,"description":"Supplement Ileum with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"11/27/2019","posted_on_time":"8:02 PM"},
{"id":221,"title":"Nuclear Power Engineer","location":"Afghanistan","category":"Health Care","experience":7,"description":"Beam Radiation of Bronchus using Electrons","posted_on_date":"10/29/2019","posted_on_time":"1:18 AM"},
{"id":222,"title":"Web Developer I","location":"China","category":"Basic Industries","experience":9,"description":"Supplement Neck with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"2/3/2020","posted_on_time":"2:38 PM"},
{"id":223,"title":"GIS Technical Architect","location":"China","category":"Consumer Services","experience":4,"description":"Excision of Right Common Iliac Vein, Percutaneous Endoscopic Approach","posted_on_date":"3/29/2019","posted_on_time":"7:52 PM"},
{"id":224,"title":"VP Sales","location":"Mozambique","category":"Technology","experience":8,"description":"Destruction of Prostate, Percutaneous Approach","posted_on_date":"1/22/2020","posted_on_time":"7:32 AM"},
{"id":225,"title":"Assistant Professor","location":"Mongolia","category":"Energy","experience":4,"description":"Low Dose Rate (LDR) Brachytherapy of Thymus using Iodine 125 (I-125)","posted_on_date":"6/18/2019","posted_on_time":"11:41 PM"},
{"id":226,"title":"Nurse","location":"Peru","category":"Consumer Services","experience":3,"description":"Supplement Left Metatarsal-Tarsal Joint with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"7/15/2019","posted_on_time":"10:46 AM"},
{"id":227,"title":"Actuary","location":"Libya","category":"Technology","experience":5,"description":"Removal of Contraceptive Device from Uterus and Cervix, Percutaneous Approach","posted_on_date":"2/11/2020","posted_on_time":"12:33 PM"},
{"id":228,"title":"Research Associate","location":"Mexico","category":"Miscellaneous","experience":10,"description":"Excision of Right Finger Phalanx, Open Approach","posted_on_date":"4/26/2019","posted_on_time":"7:58 AM"},
{"id":229,"title":"Electrical Engineer","location":"China","category":"n/a","experience":9,"description":"Change Cast on Left Foot","posted_on_date":"2/8/2020","posted_on_time":"4:54 PM"},
{"id":230,"title":"Compensation Analyst","location":"Brazil","category":"Finance","experience":5,"description":"Excision of Left Acetabulum, Open Approach, Diagnostic","posted_on_date":"12/8/2019","posted_on_time":"9:46 AM"},
{"id":231,"title":"Marketing Assistant","location":"Canada","category":"n/a","experience":6,"description":"Insertion of Radioactive Element into Right Hand, Percutaneous Approach","posted_on_date":"4/1/2019","posted_on_time":"6:40 AM"},
{"id":232,"title":"Human Resources Manager","location":"Honduras","category":"n/a","experience":4,"description":"Intraoperative Radiation Therapy (IORT) of Anus","posted_on_date":"4/11/2019","posted_on_time":"8:29 PM"},
{"id":233,"title":"Information Systems Manager","location":"Japan","category":"Consumer Non-Durables","experience":9,"description":"Dilation of Right Ulnar Artery, Bifurcation, with Three Drug-eluting Intraluminal Devices, Percutaneous Approach","posted_on_date":"2/24/2020","posted_on_time":"8:56 AM"},
{"id":234,"title":"Dental Hygienist","location":"Netherlands","category":"Technology","experience":4,"description":"Drainage of Left Posterior Tibial Artery with Drainage Device, Percutaneous Approach","posted_on_date":"5/23/2019","posted_on_time":"6:18 PM"},
{"id":235,"title":"Assistant Manager","location":"Slovenia","category":"Consumer Durables","experience":3,"description":"Division of Right Knee Tendon, Percutaneous Approach","posted_on_date":"8/25/2019","posted_on_time":"9:46 AM"},
{"id":236,"title":"Desktop Support Technician","location":"Bulgaria","category":"Health Care","experience":9,"description":"Male Reproductive System, Inspection","posted_on_date":"12/25/2019","posted_on_time":"10:43 AM"},
{"id":237,"title":"Automation Specialist III","location":"Philippines","category":"Health Care","experience":7,"description":"Fluoroscopy of Bilateral Upper Extremity Veins using High Osmolar Contrast, Guidance","posted_on_date":"5/23/2019","posted_on_time":"7:08 AM"},
{"id":238,"title":"Assistant Media Planner","location":"China","category":"Basic Industries","experience":3,"description":"Fragmentation in Bladder Neck, Open Approach","posted_on_date":"7/24/2019","posted_on_time":"5:41 PM"},
{"id":239,"title":"Junior Executive","location":"Palestinian Territory","category":"Health Care","experience":10,"description":"Supplement Right Tunica Vaginalis with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"10/8/2019","posted_on_time":"4:29 AM"},
{"id":240,"title":"Business Systems Development Analyst","location":"Albania","category":"Finance","experience":1,"description":"Drainage of Rectum with Drainage Device, Percutaneous Approach","posted_on_date":"10/25/2019","posted_on_time":"9:51 PM"},
{"id":241,"title":"Quality Control Specialist","location":"China","category":"Consumer Services","experience":5,"description":"Extirpation of Matter from Right Pulmonary Vein, Open Approach","posted_on_date":"12/8/2019","posted_on_time":"7:13 AM"},
{"id":242,"title":"Marketing Assistant","location":"China","category":"Consumer Non-Durables","experience":5,"description":"Fluoroscopy of Inferior Vena Cava using High Osmolar Contrast, Guidance","posted_on_date":"10/31/2019","posted_on_time":"4:33 PM"},
{"id":243,"title":"Financial Analyst","location":"France","category":"n/a","experience":8,"description":"Release Left Palatine Bone, Percutaneous Approach","posted_on_date":"1/31/2020","posted_on_time":"6:04 PM"},
{"id":244,"title":"Pharmacist","location":"France","category":"Energy","experience":1,"description":"Bypass Left Kidney Pelvis to Left Kidney Pelvis with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"10/16/2019","posted_on_time":"4:09 AM"},
{"id":245,"title":"Sales Representative","location":"Iran","category":"n/a","experience":9,"description":"Upper Joints, Revision","posted_on_date":"4/22/2019","posted_on_time":"11:07 AM"},
{"id":246,"title":"Safety Technician III","location":"China","category":"n/a","experience":10,"description":"Excision of Azygos Vein, Open Approach","posted_on_date":"8/3/2019","posted_on_time":"1:51 AM"},
{"id":247,"title":"Software Test Engineer III","location":"South Africa","category":"Consumer Non-Durables","experience":7,"description":"Drainage of Left Spermatic Cord, Percutaneous Approach","posted_on_date":"11/15/2019","posted_on_time":"3:16 PM"},
{"id":248,"title":"Budget/Accounting Analyst I","location":"Portugal","category":"Capital Goods","experience":9,"description":"Dilation of Bilateral Ureters, Via Natural or Artificial Opening Endoscopic","posted_on_date":"3/26/2019","posted_on_time":"11:15 AM"},
{"id":249,"title":"VP Product Management","location":"Portugal","category":"Consumer Services","experience":6,"description":"Excision of Face, Open Approach","posted_on_date":"4/2/2019","posted_on_time":"3:19 PM"},
{"id":250,"title":"Systems Administrator I","location":"China","category":"Health Care","experience":7,"description":"Replacement of Sternum with Nonautologous Tissue Substitute, Percutaneous Approach","posted_on_date":"7/31/2019","posted_on_time":"11:35 AM"},
{"id":251,"title":"Assistant Manager","location":"Jamaica","category":"Finance","experience":7,"description":"Excision of Left Finger Phalangeal Joint, Open Approach","posted_on_date":"5/9/2019","posted_on_time":"5:25 PM"},
{"id":252,"title":"Occupational Therapist","location":"China","category":"Finance","experience":7,"description":"Dilation of Abdominal Aorta, Bifurcation, with Intraluminal Device, Percutaneous Approach","posted_on_date":"9/2/2019","posted_on_time":"1:24 PM"},
{"id":253,"title":"Technical Writer","location":"China","category":"Health Care","experience":3,"description":"Replacement of Right Popliteal Artery with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"10/1/2019","posted_on_time":"7:40 AM"},
{"id":254,"title":"VP Marketing","location":"Brazil","category":"n/a","experience":2,"description":"Reattachment of Bilateral Kidneys, Percutaneous Endoscopic Approach","posted_on_date":"2/2/2020","posted_on_time":"5:42 PM"},
{"id":255,"title":"Research Assistant II","location":"Chile","category":"n/a","experience":10,"description":"Supplement Thoracic Vertebral Joint with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"2/1/2020","posted_on_time":"2:11 PM"},
{"id":256,"title":"Account Representative I","location":"Indonesia","category":"n/a","experience":7,"description":"Bypass Inferior Vena Cava to Inferior Mesenteric Vein with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"8/19/2019","posted_on_time":"7:51 PM"},
{"id":257,"title":"General Manager","location":"Indonesia","category":"Health Care","experience":8,"description":"Dilation of Left External Carotid Artery with Four or More Drug-eluting Intraluminal Devices, Percutaneous Approach","posted_on_date":"5/23/2019","posted_on_time":"10:46 PM"},
{"id":258,"title":"Environmental Specialist","location":"Russia","category":"Finance","experience":4,"description":"Insertion of Spacer into Right Metacarpophalangeal Joint, Percutaneous Endoscopic Approach","posted_on_date":"8/27/2019","posted_on_time":"3:18 AM"},
{"id":259,"title":"Statistician I","location":"China","category":"n/a","experience":3,"description":"Drainage of Left Hepatic Duct with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"4/7/2019","posted_on_time":"6:07 PM"},
{"id":260,"title":"Account Coordinator","location":"Mongolia","category":"Finance","experience":2,"description":"Reposition Left Axillary Vein, Percutaneous Approach","posted_on_date":"3/18/2019","posted_on_time":"4:48 AM"},
{"id":261,"title":"Office Assistant II","location":"Philippines","category":"n/a","experience":4,"description":"Bypass Superior Vena Cava to Right Pulmonary Artery with Synthetic Substitute, Open Approach","posted_on_date":"1/12/2020","posted_on_time":"3:00 AM"},
{"id":262,"title":"Help Desk Operator","location":"Brazil","category":"n/a","experience":4,"description":"Repair Right Superior Parathyroid Gland, Open Approach","posted_on_date":"3/12/2019","posted_on_time":"9:22 AM"},
{"id":263,"title":"Structural Analysis Engineer","location":"Indonesia","category":"Technology","experience":2,"description":"Drainage of Right Hand, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"6/19/2019","posted_on_time":"11:38 PM"},
{"id":264,"title":"Compensation Analyst","location":"Finland","category":"Finance","experience":3,"description":"Revision of Autologous Tissue Substitute in Right Scapula, External Approach","posted_on_date":"11/19/2019","posted_on_time":"8:08 PM"},
{"id":265,"title":"Assistant Professor","location":"Bosnia and Herzegovina","category":"Consumer Non-Durables","experience":9,"description":"Bypass Left External Iliac Artery to Foot Artery with Autologous Arterial Tissue, Open Approach","posted_on_date":"8/22/2019","posted_on_time":"4:20 PM"},
{"id":266,"title":"Systems Administrator IV","location":"Canada","category":"Technology","experience":5,"description":"Replacement of Left Knee Joint, Femoral Surface with Synthetic Substitute, Open Approach","posted_on_date":"6/26/2019","posted_on_time":"10:35 PM"},
{"id":267,"title":"Senior Editor","location":"Indonesia","category":"Finance","experience":7,"description":"Supplement Left Vertebral Artery with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"5/13/2019","posted_on_time":"8:34 AM"},
{"id":268,"title":"Account Executive","location":"Laos","category":"n/a","experience":2,"description":"Restriction of Esophagogastric Junction with Extraluminal Device, Percutaneous Approach","posted_on_date":"5/14/2019","posted_on_time":"4:31 PM"},
{"id":269,"title":"Human Resources Assistant IV","location":"United States","category":"n/a","experience":7,"description":"Restriction of Right Ureter, Via Natural or Artificial Opening Endoscopic","posted_on_date":"4/12/2019","posted_on_time":"1:54 PM"},
{"id":270,"title":"Automation Specialist II","location":"Russia","category":"Health Care","experience":1,"description":"Removal of Infusion Device from Spleen, Percutaneous Approach","posted_on_date":"4/14/2019","posted_on_time":"11:31 AM"},
{"id":271,"title":"Food Chemist","location":"Indonesia","category":"Finance","experience":3,"description":"Supplement Left Ureter with Autologous Tissue Substitute, Via Natural or Artificial Opening","posted_on_date":"5/21/2019","posted_on_time":"2:17 AM"},
{"id":272,"title":"Geological Engineer","location":"Russia","category":"Health Care","experience":10,"description":"Replacement of Right Upper Arm Tendon with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"7/27/2019","posted_on_time":"2:33 AM"},
{"id":273,"title":"Physical Therapy Assistant","location":"Belarus","category":"n/a","experience":2,"description":"Dilation of Intracranial Artery, Bifurcation, with Intraluminal Device, Percutaneous Approach","posted_on_date":"4/5/2019","posted_on_time":"4:39 AM"},
{"id":274,"title":"Accounting Assistant IV","location":"Indonesia","category":"Health Care","experience":5,"description":"Revision of Synthetic Substitute in Right Toe Phalangeal Joint, Percutaneous Approach","posted_on_date":"1/13/2020","posted_on_time":"12:31 PM"},
{"id":275,"title":"Automation Specialist III","location":"Ukraine","category":"Health Care","experience":9,"description":"Extirpation of Matter from Chordae Tendineae, Percutaneous Approach","posted_on_date":"3/5/2019","posted_on_time":"9:00 PM"},
{"id":276,"title":"Human Resources Assistant IV","location":"Bolivia","category":"Finance","experience":4,"description":"Insertion of Infusion Device into Spinal Cord, Percutaneous Approach","posted_on_date":"10/25/2019","posted_on_time":"3:52 AM"},
{"id":277,"title":"Programmer Analyst II","location":"Norway","category":"Finance","experience":9,"description":"Removal of Autologous Tissue Substitute from Right Femoral Shaft, Open Approach","posted_on_date":"6/4/2019","posted_on_time":"8:06 PM"},
{"id":278,"title":"Pharmacist","location":"Russia","category":"Capital Goods","experience":3,"description":"Repair Small Intestine, Percutaneous Approach","posted_on_date":"4/6/2019","posted_on_time":"9:59 AM"},
{"id":279,"title":"Assistant Media Planner","location":"Colombia","category":"n/a","experience":2,"description":"Destruction of Right Popliteal Artery, Percutaneous Approach","posted_on_date":"7/20/2019","posted_on_time":"10:02 AM"},
{"id":280,"title":"Assistant Professor","location":"China","category":"Miscellaneous","experience":9,"description":"Revision of Nonautologous Tissue Substitute in Right Shoulder Joint, Percutaneous Endoscopic Approach","posted_on_date":"9/11/2019","posted_on_time":"12:41 PM"},
{"id":281,"title":"Human Resources Assistant II","location":"Liberia","category":"n/a","experience":4,"description":"Insertion of Infusion Device into Left Pulmonary Vein, Percutaneous Endoscopic Approach","posted_on_date":"5/7/2019","posted_on_time":"6:51 AM"},
{"id":282,"title":"GIS Technical Architect","location":"Russia","category":"n/a","experience":3,"description":"Excision of Thorax Lymphatic, Percutaneous Approach, Diagnostic","posted_on_date":"5/30/2019","posted_on_time":"3:39 PM"},
{"id":283,"title":"Business Systems Development Analyst","location":"China","category":"Miscellaneous","experience":3,"description":"Bypass Coronary Artery, Four or More Arteries from Thoracic Artery with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"9/22/2019","posted_on_time":"6:47 AM"},
{"id":284,"title":"Marketing Assistant","location":"Indonesia","category":"Consumer Services","experience":2,"description":"Dilation of Right Subclavian Artery, Bifurcation, with Four or More Drug-eluting Intraluminal Devices, Open Approach","posted_on_date":"11/20/2019","posted_on_time":"5:24 PM"},
{"id":285,"title":"Nuclear Power Engineer","location":"France","category":"Finance","experience":3,"description":"Revision of Autologous Tissue Substitute in Small Intestine, Via Natural or Artificial Opening","posted_on_date":"12/7/2019","posted_on_time":"4:44 AM"},
{"id":286,"title":"Structural Analysis Engineer","location":"Macedonia","category":"Technology","experience":5,"description":"Revision of Internal Fixation Device in Right Metacarpophalangeal Joint, External Approach","posted_on_date":"5/4/2019","posted_on_time":"11:01 AM"},
{"id":287,"title":"Recruiter","location":"Indonesia","category":"n/a","experience":3,"description":"Occlusion of Right Lower Lobe Bronchus with Intraluminal Device, Via Natural or Artificial Opening Endoscopic","posted_on_date":"7/5/2019","posted_on_time":"12:25 AM"},
{"id":288,"title":"Human Resources Manager","location":"Ukraine","category":"Transportation","experience":10,"description":"Release Left Metacarpophalangeal Joint, Open Approach","posted_on_date":"10/13/2019","posted_on_time":"5:04 PM"},
{"id":289,"title":"Systems Administrator III","location":"United States","category":"Finance","experience":2,"description":"Supplement Duodenum with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"8/29/2019","posted_on_time":"3:12 AM"},
{"id":290,"title":"Compensation Analyst","location":"Brazil","category":"Consumer Durables","experience":3,"description":"Extirpation of Matter from Coronary Artery, Two Arteries, Bifurcation, Percutaneous Approach","posted_on_date":"7/18/2019","posted_on_time":"2:43 AM"},
{"id":291,"title":"Computer Systems Analyst III","location":"Japan","category":"Health Care","experience":1,"description":"Magnetic Resonance Imaging (MRI) of Abdomen using Other Contrast","posted_on_date":"5/22/2019","posted_on_time":"2:42 PM"},
{"id":292,"title":"Compensation Analyst","location":"Ukraine","category":"Consumer Services","experience":2,"description":"Dilation of Left Subclavian Artery with Drug-eluting Intraluminal Device, Percutaneous Approach","posted_on_date":"11/9/2019","posted_on_time":"6:31 AM"},
{"id":293,"title":"General Manager","location":"Brazil","category":"Finance","experience":5,"description":"Extraction of Ulnar Nerve, Open Approach","posted_on_date":"7/22/2019","posted_on_time":"2:37 PM"},
{"id":294,"title":"Help Desk Operator","location":"Canada","category":"Public Utilities","experience":1,"description":"Shock Wave Therapy, Musculoskeletal, Multiple","posted_on_date":"2/9/2020","posted_on_time":"1:06 PM"},
{"id":295,"title":"Senior Quality Engineer","location":"Brazil","category":"Finance","experience":6,"description":"Revision of Nonautologous Tissue Substitute in Cervical Vertebral Disc, External Approach","posted_on_date":"12/3/2019","posted_on_time":"3:16 AM"},
{"id":296,"title":"Project Manager","location":"Russia","category":"n/a","experience":2,"description":"Restriction of Stomach, Pylorus, Via Natural or Artificial Opening","posted_on_date":"6/21/2019","posted_on_time":"12:24 AM"},
{"id":297,"title":"Chemical Engineer","location":"Poland","category":"Health Care","experience":3,"description":"Drainage of Mesentery, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"12/20/2019","posted_on_time":"5:30 AM"},
{"id":298,"title":"Quality Control Specialist","location":"Ukraine","category":"Energy","experience":2,"description":"Insertion of Infusion Device into Upper Vein, Percutaneous Approach","posted_on_date":"11/30/2019","posted_on_time":"3:49 PM"},
{"id":299,"title":"Information Systems Manager","location":"Poland","category":"Consumer Services","experience":6,"description":"Excision of Middle Esophagus, Open Approach","posted_on_date":"7/20/2019","posted_on_time":"4:48 AM"},
{"id":300,"title":"Business Systems Development Analyst","location":"Thailand","category":"Consumer Non-Durables","experience":8,"description":"Replacement of Right Common Iliac Vein with Autologous Tissue Substitute, Open Approach","posted_on_date":"5/26/2019","posted_on_time":"1:56 AM"},
{"id":301,"title":"Systems Administrator II","location":"Portugal","category":"Technology","experience":3,"description":"Excision of Right Upper Femur, Percutaneous Approach","posted_on_date":"6/17/2019","posted_on_time":"2:01 PM"},
{"id":302,"title":"Environmental Tech","location":"Russia","category":"n/a","experience":4,"description":"Removal of Autologous Tissue Substitute from Lumbosacral Disc, Open Approach","posted_on_date":"1/19/2020","posted_on_time":"9:55 AM"},
{"id":303,"title":"Registered Nurse","location":"Croatia","category":"Health Care","experience":10,"description":"High Dose Rate (HDR) Brachytherapy of Cervix using Palladium 103 (Pd-103)","posted_on_date":"3/6/2019","posted_on_time":"2:46 AM"},
{"id":304,"title":"Product Engineer","location":"Pakistan","category":"Consumer Durables","experience":5,"description":"Revision of Synthetic Substitute in Kidney, Via Natural or Artificial Opening Endoscopic","posted_on_date":"4/4/2019","posted_on_time":"4:36 AM"},
{"id":305,"title":"Programmer II","location":"United States","category":"Public Utilities","experience":4,"description":"Revision of Autologous Tissue Substitute in Left Metacarpocarpal Joint, Percutaneous Approach","posted_on_date":"12/25/2019","posted_on_time":"9:14 PM"},
{"id":306,"title":"Computer Systems Analyst II","location":"Philippines","category":"Capital Goods","experience":1,"description":"Drainage of Left Mandible, Open Approach, Diagnostic","posted_on_date":"12/3/2019","posted_on_time":"8:15 PM"},
{"id":307,"title":"Cost Accountant","location":"Czech Republic","category":"Technology","experience":7,"description":"Drainage of Right Hand Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"4/11/2019","posted_on_time":"10:58 PM"},
{"id":308,"title":"Editor","location":"Venezuela","category":"Health Care","experience":8,"description":"Extirpation of Matter from Right Hand Artery, Open Approach","posted_on_date":"10/25/2019","posted_on_time":"11:01 PM"},
{"id":309,"title":"Environmental Specialist","location":"Cuba","category":"Finance","experience":9,"description":"Excision of Left Maxilla, Open Approach","posted_on_date":"4/24/2019","posted_on_time":"9:36 AM"},
{"id":310,"title":"Associate Professor","location":"Brazil","category":"Energy","experience":1,"description":"Destruction of Right External Ear, External Approach","posted_on_date":"8/21/2019","posted_on_time":"9:36 AM"},
{"id":311,"title":"Registered Nurse","location":"Philippines","category":"Health Care","experience":7,"description":"Revision of Internal Fixation Device in Coccygeal Joint, Percutaneous Approach","posted_on_date":"10/19/2019","posted_on_time":"2:00 PM"},
{"id":312,"title":"Senior Quality Engineer","location":"Mexico","category":"Consumer Services","experience":3,"description":"Dilation of Gastric Artery with Four or More Intraluminal Devices, Percutaneous Endoscopic Approach","posted_on_date":"8/2/2019","posted_on_time":"4:05 PM"},
{"id":313,"title":"Financial Advisor","location":"Russia","category":"Capital Goods","experience":3,"description":"Extirpation of Matter from Right Lung, Percutaneous Approach","posted_on_date":"6/15/2019","posted_on_time":"7:47 AM"},
{"id":314,"title":"Business Systems Development Analyst","location":"Slovenia","category":"n/a","experience":2,"description":"Destruction of Prostate, Open Approach","posted_on_date":"7/20/2019","posted_on_time":"10:30 AM"},
{"id":315,"title":"Nurse Practicioner","location":"Ukraine","category":"Finance","experience":10,"description":"Control Bleeding in Left Lower Extremity, Open Approach","posted_on_date":"7/31/2019","posted_on_time":"9:44 PM"},
{"id":316,"title":"Database Administrator II","location":"Philippines","category":"Capital Goods","experience":8,"description":"Reattachment of Left Ring Finger, Open Approach","posted_on_date":"8/20/2019","posted_on_time":"11:28 PM"},
{"id":317,"title":"Accountant II","location":"China","category":"Technology","experience":7,"description":"Bypass Innominate Artery to Left Upper Arm Artery with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"10/11/2019","posted_on_time":"9:59 AM"},
{"id":318,"title":"Administrative Assistant III","location":"Netherlands","category":"n/a","experience":1,"description":"Restriction of Left Hypogastric Vein with Intraluminal Device, Percutaneous Endoscopic Approach","posted_on_date":"1/7/2020","posted_on_time":"12:16 AM"},
{"id":319,"title":"Assistant Manager","location":"Mexico","category":"Health Care","experience":9,"description":"High Dose Rate (HDR) Brachytherapy of Esophagus using Palladium 103 (Pd-103)","posted_on_date":"6/24/2019","posted_on_time":"12:30 AM"},
{"id":320,"title":"Research Assistant II","location":"Panama","category":"Technology","experience":6,"description":"Drainage of Thoracic Vertebral Disc with Drainage Device, Open Approach","posted_on_date":"1/1/2020","posted_on_time":"9:15 AM"},
{"id":321,"title":"VP Sales","location":"Philippines","category":"Energy","experience":3,"description":"Supplement Left Ethmoid Bone with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"9/26/2019","posted_on_time":"9:16 PM"},
{"id":322,"title":"Human Resources Manager","location":"Uganda","category":"n/a","experience":2,"description":"Extirpation of Matter from Left Acromioclavicular Joint, Percutaneous Approach","posted_on_date":"12/24/2019","posted_on_time":"5:04 PM"},
{"id":323,"title":"Account Coordinator","location":"Barbados","category":"Consumer Services","experience":5,"description":"Stereotactic Other Photon Radiosurgery of Gallbladder","posted_on_date":"6/25/2019","posted_on_time":"4:36 AM"},
{"id":324,"title":"Engineer II","location":"Mexico","category":"n/a","experience":3,"description":"Excision of Left Trunk Tendon, Percutaneous Approach","posted_on_date":"11/13/2019","posted_on_time":"8:33 PM"},
{"id":325,"title":"Safety Technician II","location":"Cuba","category":"Consumer Services","experience":9,"description":"Replacement of Inferior Mesenteric Artery with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"11/17/2019","posted_on_time":"9:33 AM"},
{"id":326,"title":"Pharmacist","location":"China","category":"Technology","experience":6,"description":"Dilation of Right Internal Carotid Artery, Bifurcation, with Two Drug-eluting Intraluminal Devices, Percutaneous Approach","posted_on_date":"3/12/2019","posted_on_time":"1:45 PM"},
{"id":327,"title":"Help Desk Operator","location":"Venezuela","category":"Basic Industries","experience":6,"description":"Drainage of Bladder with Drainage Device, Via Natural or Artificial Opening Endoscopic","posted_on_date":"3/3/2019","posted_on_time":"1:22 AM"},
{"id":328,"title":"Research Associate","location":"Venezuela","category":"Health Care","experience":4,"description":"Dilation of Coronary Artery, Three Arteries with Two Drug-eluting Intraluminal Devices, Open Approach","posted_on_date":"8/15/2019","posted_on_time":"9:26 AM"},
{"id":329,"title":"Software Consultant","location":"China","category":"n/a","experience":3,"description":"Excision of Vagina, Via Natural or Artificial Opening","posted_on_date":"3/31/2019","posted_on_time":"7:31 PM"},
{"id":330,"title":"Analyst Programmer","location":"Portugal","category":"Health Care","experience":10,"description":"Drainage of Upper Esophagus with Drainage Device, Percutaneous Approach","posted_on_date":"10/9/2019","posted_on_time":"12:19 AM"},
{"id":331,"title":"Teacher","location":"Philippines","category":"Energy","experience":10,"description":"Replacement of Left Ethmoid Bone with Synthetic Substitute, Percutaneous Approach","posted_on_date":"9/19/2019","posted_on_time":"12:36 PM"},
{"id":332,"title":"Database Administrator III","location":"Indonesia","category":"Finance","experience":2,"description":"Supplement Left Large Intestine with Synthetic Substitute, Via Natural or Artificial Opening Endoscopic","posted_on_date":"11/10/2019","posted_on_time":"4:53 PM"},
{"id":333,"title":"Nurse Practicioner","location":"Indonesia","category":"Consumer Services","experience":4,"description":"Bypass Left Fallopian Tube to Uterus with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"4/4/2019","posted_on_time":"4:20 PM"},
{"id":334,"title":"Food Chemist","location":"China","category":"Health Care","experience":9,"description":"Excision of Left Lower Lobe Bronchus, Via Natural or Artificial Opening","posted_on_date":"8/22/2019","posted_on_time":"6:49 AM"},
{"id":335,"title":"Help Desk Technician","location":"Israel","category":"Miscellaneous","experience":5,"description":"Excision of Right Kidney Pelvis, Via Natural or Artificial Opening","posted_on_date":"3/31/2019","posted_on_time":"12:10 PM"},
{"id":336,"title":"Software Engineer III","location":"Russia","category":"n/a","experience":10,"description":"Drainage of Left Carpal, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"9/22/2019","posted_on_time":"7:41 AM"},
{"id":337,"title":"Automation Specialist I","location":"Poland","category":"n/a","experience":8,"description":"Supplement Right Inguinal Region with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"3/31/2019","posted_on_time":"3:04 AM"},
{"id":338,"title":"Developer II","location":"Greece","category":"n/a","experience":6,"description":"Removal of Other Device on Left Toe","posted_on_date":"7/20/2019","posted_on_time":"8:25 AM"},
{"id":339,"title":"Chemical Engineer","location":"Brazil","category":"Basic Industries","experience":6,"description":"Replacement of Right Knee Joint with Unicondylar Synthetic Substitute, Open Approach","posted_on_date":"3/1/2019","posted_on_time":"10:16 PM"},
{"id":340,"title":"Occupational Therapist","location":"Ukraine","category":"n/a","experience":6,"description":"Transfusion of Autologous Serum Albumin into Peripheral Artery, Open Approach","posted_on_date":"11/28/2019","posted_on_time":"7:22 PM"},
{"id":341,"title":"Recruiter","location":"Equatorial Guinea","category":"Technology","experience":8,"description":"Removal of Other Device from Left Lower Extremity, Percutaneous Endoscopic Approach","posted_on_date":"7/12/2019","posted_on_time":"6:29 PM"},
{"id":342,"title":"Community Outreach Specialist","location":"Russia","category":"Energy","experience":5,"description":"Drainage of Buccal Mucosa with Drainage Device, Percutaneous Approach","posted_on_date":"1/26/2020","posted_on_time":"4:10 PM"},
{"id":343,"title":"Actuary","location":"China","category":"n/a","experience":10,"description":"Replacement of Hyoid Bone with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"9/20/2019","posted_on_time":"5:10 AM"},
{"id":344,"title":"Clinical Specialist","location":"France","category":"Finance","experience":5,"description":"Division of Vagus Nerve, Percutaneous Approach","posted_on_date":"1/26/2020","posted_on_time":"5:41 AM"},
{"id":345,"title":"Environmental Specialist","location":"Kosovo","category":"Finance","experience":10,"description":"Revision of Nonautologous Tissue Substitute in Right Upper Extremity, Percutaneous Endoscopic Approach","posted_on_date":"6/7/2019","posted_on_time":"1:37 AM"},
{"id":346,"title":"Software Test Engineer II","location":"Japan","category":"Health Care","experience":1,"description":"Drainage of Right Temporal Artery, Percutaneous Endoscopic Approach","posted_on_date":"4/1/2019","posted_on_time":"7:30 AM"},
{"id":347,"title":"Help Desk Operator","location":"Russia","category":"Consumer Services","experience":1,"description":"Destruction of Left Mastoid Sinus, Open Approach","posted_on_date":"3/29/2019","posted_on_time":"8:40 PM"},
{"id":348,"title":"Assistant Professor","location":"Japan","category":"n/a","experience":9,"description":"Dilation of Right Internal Iliac Artery with Two Drug-eluting Intraluminal Devices, Open Approach","posted_on_date":"3/25/2019","posted_on_time":"5:01 AM"},
{"id":349,"title":"Internal Auditor","location":"Brazil","category":"Technology","experience":6,"description":"Bypass Superior Mesenteric Vein to Lower Vein with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"8/24/2019","posted_on_time":"11:58 PM"},
{"id":350,"title":"Assistant Manager","location":"Greece","category":"n/a","experience":2,"description":"Extirpation of Matter from Right Peroneal Artery, Bifurcation, Open Approach","posted_on_date":"4/7/2019","posted_on_time":"2:35 PM"},
{"id":351,"title":"Social Worker","location":"Cameroon","category":"Technology","experience":2,"description":"Supplement Atrial Septum with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"1/8/2020","posted_on_time":"8:28 PM"},
{"id":352,"title":"Research Associate","location":"Vietnam","category":"Health Care","experience":5,"description":"Immobilization of Right Toe using Other Device","posted_on_date":"6/8/2019","posted_on_time":"8:21 AM"},
{"id":353,"title":"Account Executive","location":"Thailand","category":"n/a","experience":7,"description":"Supplement Left Shoulder Joint with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"3/8/2019","posted_on_time":"1:08 PM"},
{"id":354,"title":"Quality Engineer","location":"Pakistan","category":"Consumer Services","experience":9,"description":"Revision of Drainage Device in Bone Marrow, Percutaneous Endoscopic Approach","posted_on_date":"3/7/2019","posted_on_time":"5:16 AM"},
{"id":355,"title":"Physical Therapy Assistant","location":"China","category":"Health Care","experience":5,"description":"Drainage of Spleen, Percutaneous Endoscopic Approach","posted_on_date":"1/3/2020","posted_on_time":"4:22 PM"},
{"id":356,"title":"Business Systems Development Analyst","location":"China","category":"Capital Goods","experience":3,"description":"Division of Right Hand Subcutaneous Tissue and Fascia, Percutaneous Approach","posted_on_date":"9/24/2019","posted_on_time":"1:00 PM"},
{"id":357,"title":"Environmental Specialist","location":"Ethiopia","category":"Health Care","experience":9,"description":"Occlusion of Right Upper Lobe Bronchus, Percutaneous Endoscopic Approach","posted_on_date":"5/20/2019","posted_on_time":"4:39 PM"},
{"id":358,"title":"Programmer I","location":"Greece","category":"Consumer Durables","experience":7,"description":"Insertion of Infusion Device into Left Radial Artery, Percutaneous Endoscopic Approach","posted_on_date":"8/21/2019","posted_on_time":"12:12 AM"},
{"id":359,"title":"Cost Accountant","location":"China","category":"n/a","experience":3,"description":"Removal of Intraluminal Device from Upper Vein, Percutaneous Endoscopic Approach","posted_on_date":"4/15/2019","posted_on_time":"4:11 PM"},
{"id":360,"title":"Financial Advisor","location":"Tajikistan","category":"Health Care","experience":4,"description":"Reattachment of Upper Back, Open Approach","posted_on_date":"2/3/2020","posted_on_time":"5:51 AM"},
{"id":361,"title":"Legal Assistant","location":"Argentina","category":"Energy","experience":7,"description":"Dilation of Left Colic Artery, Percutaneous Approach","posted_on_date":"10/31/2019","posted_on_time":"12:51 PM"},
{"id":362,"title":"Developer III","location":"Sweden","category":"Basic Industries","experience":10,"description":"Revision of Intraluminal Device in Stomach, Percutaneous Endoscopic Approach","posted_on_date":"5/31/2019","posted_on_time":"9:28 PM"},
{"id":363,"title":"Account Coordinator","location":"Greece","category":"Technology","experience":6,"description":"Drainage of Cervical Nerve, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"12/20/2019","posted_on_time":"3:24 PM"},
{"id":364,"title":"Professor","location":"Russia","category":"Consumer Non-Durables","experience":2,"description":"Bypass Cystic Duct to Common Bile Duct, Open Approach","posted_on_date":"5/4/2019","posted_on_time":"11:30 PM"},
{"id":365,"title":"VP Marketing","location":"China","category":"n/a","experience":9,"description":"Fusion of 2 or more Cervical Vertebral Joints with Nonautologous Tissue Substitute, Posterior Approach, Posterior Column, Percutaneous Endoscopic Approach","posted_on_date":"9/1/2019","posted_on_time":"1:12 AM"},
{"id":366,"title":"Budget/Accounting Analyst III","location":"Peru","category":"n/a","experience":6,"description":"Dilation of Tricuspid Valve with Intraluminal Device, Open Approach","posted_on_date":"5/13/2019","posted_on_time":"11:47 PM"},
{"id":367,"title":"Health Coach I","location":"Zambia","category":"Basic Industries","experience":2,"description":"Drainage of Right Shoulder Bursa and Ligament with Drainage Device, Percutaneous Approach","posted_on_date":"8/11/2019","posted_on_time":"6:16 PM"},
{"id":368,"title":"Paralegal","location":"Israel","category":"Public Utilities","experience":1,"description":"Revision of Infusion Device in Spleen, External Approach","posted_on_date":"12/10/2019","posted_on_time":"9:42 PM"},
{"id":369,"title":"Health Coach I","location":"Japan","category":"Public Utilities","experience":9,"description":"Drainage of Left Abdomen Muscle, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"12/16/2019","posted_on_time":"11:53 PM"},
{"id":370,"title":"Assistant Media Planner","location":"Poland","category":"Capital Goods","experience":4,"description":"Plaque Radiation of Bone Marrow","posted_on_date":"2/1/2020","posted_on_time":"12:57 AM"},
{"id":371,"title":"Senior Sales Associate","location":"China","category":"n/a","experience":9,"description":"Drainage of Left Popliteal Artery, Open Approach, Diagnostic","posted_on_date":"5/6/2019","posted_on_time":"11:10 PM"},
{"id":372,"title":"Systems Administrator I","location":"Portugal","category":"n/a","experience":5,"description":"Release Right Lower Extremity Lymphatic, Percutaneous Approach","posted_on_date":"4/14/2019","posted_on_time":"3:41 AM"},
{"id":373,"title":"Legal Assistant","location":"China","category":"Finance","experience":7,"description":"Bypass Right Internal Iliac Artery to Foot Artery with Nonautologous Tissue Substitute, Open Approach","posted_on_date":"7/23/2019","posted_on_time":"12:32 AM"},
{"id":374,"title":"Operator","location":"Portugal","category":"Finance","experience":6,"description":"Inspection of Pelvic Cavity, Open Approach","posted_on_date":"8/22/2019","posted_on_time":"4:07 AM"},
{"id":375,"title":"Financial Advisor","location":"Philippines","category":"n/a","experience":2,"description":"Repair Chest Wall, Percutaneous Endoscopic Approach","posted_on_date":"7/23/2019","posted_on_time":"11:05 AM"},
{"id":376,"title":"Senior Financial Analyst","location":"China","category":"Health Care","experience":3,"description":"Restriction of Left Brachial Vein, Open Approach","posted_on_date":"10/16/2019","posted_on_time":"5:51 AM"},
{"id":377,"title":"Account Executive","location":"Netherlands","category":"Consumer Services","experience":7,"description":"Insertion of Bone Growth Stimulator into Nasal Bone, Open Approach","posted_on_date":"4/27/2019","posted_on_time":"1:24 PM"},
{"id":378,"title":"Structural Engineer","location":"Thailand","category":"Finance","experience":3,"description":"Division of Thoracic Spinal Cord, Percutaneous Approach","posted_on_date":"4/13/2019","posted_on_time":"7:27 AM"},
{"id":379,"title":"Mechanical Systems Engineer","location":"China","category":"Consumer Services","experience":8,"description":"Excision of Right Upper Arm, Percutaneous Endoscopic Approach","posted_on_date":"1/13/2020","posted_on_time":"6:47 PM"},
{"id":380,"title":"Director of Sales","location":"China","category":"Finance","experience":3,"description":"Low Dose Rate (LDR) Brachytherapy of Thymus using Californium 252 (Cf-252)","posted_on_date":"7/25/2019","posted_on_time":"9:56 PM"},
{"id":381,"title":"Compensation Analyst","location":"Peru","category":"n/a","experience":6,"description":"Bypass Right Renal Vein to Lower Vein with Autologous Arterial Tissue, Percutaneous Endoscopic Approach","posted_on_date":"7/27/2019","posted_on_time":"4:54 AM"},
{"id":382,"title":"Cost Accountant","location":"Latvia","category":"n/a","experience":7,"description":"Restriction of Left Femoral Vein with Intraluminal Device, Percutaneous Approach","posted_on_date":"8/10/2019","posted_on_time":"5:03 PM"},
{"id":383,"title":"Project Manager","location":"Russia","category":"Technology","experience":9,"description":"Replacement of Right Humeral Head with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"3/19/2019","posted_on_time":"12:51 PM"},
{"id":384,"title":"Analog Circuit Design manager","location":"Egypt","category":"Transportation","experience":6,"description":"Repair Right Hip Muscle, Open Approach","posted_on_date":"3/17/2019","posted_on_time":"9:05 AM"},
{"id":385,"title":"Systems Administrator III","location":"Japan","category":"Capital Goods","experience":4,"description":"Supplement Vagina with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"4/17/2019","posted_on_time":"6:22 PM"},
{"id":386,"title":"Tax Accountant","location":"Indonesia","category":"Finance","experience":9,"description":"Release Multiple Parathyroid Glands, Percutaneous Endoscopic Approach","posted_on_date":"10/1/2019","posted_on_time":"11:38 AM"},
{"id":387,"title":"Nurse","location":"China","category":"Capital Goods","experience":4,"description":"Excision of Right Clavicle, Percutaneous Approach, Diagnostic","posted_on_date":"2/10/2020","posted_on_time":"9:37 AM"},
{"id":388,"title":"Senior Sales Associate","location":"Portugal","category":"Consumer Services","experience":1,"description":"Transfusion of Nonautologous Platelets into Peripheral Vein, Open Approach","posted_on_date":"11/24/2019","posted_on_time":"11:13 PM"},
{"id":389,"title":"Software Engineer I","location":"China","category":"Consumer Services","experience":9,"description":"Bypass Superior Vena Cava to Pulmonary Trunk with Autologous Venous Tissue, Percutaneous Endoscopic Approach","posted_on_date":"11/21/2019","posted_on_time":"3:25 PM"},
{"id":390,"title":"Actuary","location":"Antigua and Barbuda","category":"Finance","experience":4,"description":"Drainage of Right Foot with Drainage Device, Percutaneous Approach","posted_on_date":"4/10/2019","posted_on_time":"12:36 PM"},
{"id":391,"title":"Actuary","location":"Poland","category":"Transportation","experience":10,"description":"Excision of Right Extraocular Muscle, Open Approach","posted_on_date":"4/26/2019","posted_on_time":"10:07 AM"},
{"id":392,"title":"Marketing Manager","location":"Tunisia","category":"Consumer Services","experience":5,"description":"Removal of Infusion Device from Thoracic Vertebral Joint, Percutaneous Endoscopic Approach","posted_on_date":"8/25/2019","posted_on_time":"12:16 AM"},
{"id":393,"title":"Electrical Engineer","location":"Brazil","category":"Finance","experience":6,"description":"Drainage of Right Acetabulum with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"9/3/2019","posted_on_time":"5:17 PM"},
{"id":394,"title":"Paralegal","location":"Brazil","category":"Finance","experience":7,"description":"Supplement Right Metatarsal-Tarsal Joint with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"8/10/2019","posted_on_time":"1:14 AM"},
{"id":395,"title":"Engineer II","location":"Dominican Republic","category":"Health Care","experience":10,"description":"Insertion of Other Device into Pelvic Cavity, Open Approach","posted_on_date":"4/27/2019","posted_on_time":"12:21 AM"},
{"id":396,"title":"Electrical Engineer","location":"China","category":"Consumer Services","experience":10,"description":"Destruction of Mesentery, Open Approach","posted_on_date":"5/5/2019","posted_on_time":"12:15 AM"},
{"id":397,"title":"Graphic Designer","location":"Russia","category":"n/a","experience":1,"description":"Revision of Synthetic Substitute in Right Metatarsal-Phalangeal Joint, Percutaneous Approach","posted_on_date":"9/20/2019","posted_on_time":"1:58 PM"},
{"id":398,"title":"Software Test Engineer II","location":"Indonesia","category":"Basic Industries","experience":10,"description":"Drainage of Uvula, External Approach","posted_on_date":"1/1/2020","posted_on_time":"3:14 PM"},
{"id":399,"title":"Account Executive","location":"Sweden","category":"Consumer Non-Durables","experience":4,"description":"Replacement of Mitral Valve with Nonautologous Tissue Substitute, Percutaneous Approach","posted_on_date":"12/23/2019","posted_on_time":"11:32 AM"},
{"id":400,"title":"Nurse Practicioner","location":"Brazil","category":"Miscellaneous","experience":5,"description":"Removal of Synthetic Substitute from Vagina and Cul-de-sac, Percutaneous Endoscopic Approach","posted_on_date":"1/1/2020","posted_on_time":"3:46 AM"},
{"id":401,"title":"Accounting Assistant II","location":"Brazil","category":"n/a","experience":3,"description":"Insertion of Facet Replacement Spinal Stabilization Device into Lumbosacral Joint, Percutaneous Endoscopic Approach","posted_on_date":"11/11/2019","posted_on_time":"6:13 AM"},
{"id":402,"title":"Technical Writer","location":"Canada","category":"Technology","experience":9,"description":"Removal of Autologous Tissue Substitute from Left Humeral Head, Open Approach","posted_on_date":"9/2/2019","posted_on_time":"8:28 PM"},
{"id":403,"title":"Geologist I","location":"Morocco","category":"Health Care","experience":9,"description":"Drainage of Left Fallopian Tube with Drainage Device, Percutaneous Approach","posted_on_date":"5/7/2019","posted_on_time":"2:00 PM"},
{"id":404,"title":"Legal Assistant","location":"Indonesia","category":"n/a","experience":4,"description":"Extirpation of Matter from Cerebral Meninges, Percutaneous Endoscopic Approach","posted_on_date":"9/5/2019","posted_on_time":"7:18 PM"},
{"id":405,"title":"Registered Nurse","location":"China","category":"Energy","experience":9,"description":"Extirpation of Matter from Right Lacrimal Duct, Via Natural or Artificial Opening","posted_on_date":"11/28/2019","posted_on_time":"5:23 PM"},
{"id":406,"title":"VP Quality Control","location":"China","category":"Public Utilities","experience":5,"description":"Inspection of Brain, Percutaneous Approach","posted_on_date":"1/28/2020","posted_on_time":"2:09 AM"},
{"id":407,"title":"Social Worker","location":"China","category":"n/a","experience":7,"description":"Revision of Infusion Device in Right Metacarpocarpal Joint, Open Approach","posted_on_date":"3/24/2019","posted_on_time":"10:15 PM"},
{"id":408,"title":"Web Designer IV","location":"Philippines","category":"Miscellaneous","experience":2,"description":"Removal of Synthetic Substitute from Left Tarsal Joint, Percutaneous Endoscopic Approach","posted_on_date":"9/21/2019","posted_on_time":"12:30 AM"},
{"id":409,"title":"Human Resources Manager","location":"China","category":"n/a","experience":6,"description":"Removal of Synthetic Substitute from Left Breast, Via Natural or Artificial Opening Endoscopic","posted_on_date":"10/2/2019","posted_on_time":"7:07 PM"},
{"id":410,"title":"VP Quality Control","location":"Botswana","category":"n/a","experience":6,"description":"Bypass Right Vas Deferens to Left Epididymis with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"9/18/2019","posted_on_time":"11:07 AM"},
{"id":411,"title":"Recruiter","location":"Ireland","category":"n/a","experience":5,"description":"Drainage of Bilateral Lungs, Percutaneous Endoscopic Approach","posted_on_date":"2/8/2020","posted_on_time":"1:02 PM"},
{"id":412,"title":"Software Engineer IV","location":"South Africa","category":"Finance","experience":4,"description":"Replacement of Right Vocal Cord with Synthetic Substitute, Via Natural or Artificial Opening","posted_on_date":"6/1/2019","posted_on_time":"3:59 PM"},
{"id":413,"title":"Data Coordiator","location":"Philippines","category":"Health Care","experience":10,"description":"Bypass Left Popliteal Artery to Lower Extremity Artery with Autologous Arterial Tissue, Open Approach","posted_on_date":"8/3/2019","posted_on_time":"9:45 PM"},
{"id":414,"title":"Administrative Assistant I","location":"China","category":"Health Care","experience":7,"description":"Revision of Internal Fixation Device in Left Metacarpal, External Approach","posted_on_date":"7/6/2019","posted_on_time":"4:03 PM"},
{"id":415,"title":"Professor","location":"China","category":"n/a","experience":5,"description":"Bypass Cecum to Cecum, Open Approach","posted_on_date":"9/22/2019","posted_on_time":"3:28 PM"},
{"id":416,"title":"Information Systems Manager","location":"Russia","category":"Finance","experience":8,"description":"Repair Radial Nerve, Percutaneous Approach","posted_on_date":"4/15/2019","posted_on_time":"6:12 PM"},
{"id":417,"title":"VP Quality Control","location":"Syria","category":"Technology","experience":5,"description":"Dilation of Small Intestine, Open Approach","posted_on_date":"7/21/2019","posted_on_time":"5:49 PM"},
{"id":418,"title":"VP Accounting","location":"Philippines","category":"Finance","experience":2,"description":"Fragmentation in Urethra, Percutaneous Endoscopic Approach","posted_on_date":"10/5/2019","posted_on_time":"2:51 AM"},
{"id":419,"title":"Junior Executive","location":"Brazil","category":"Consumer Services","experience":10,"description":"Extirpation of Matter from Left Foot Muscle, Open Approach","posted_on_date":"10/31/2019","posted_on_time":"10:30 AM"},
{"id":420,"title":"Programmer III","location":"Poland","category":"Consumer Non-Durables","experience":3,"description":"Revision of Drainage Device in Penis, Via Natural or Artificial Opening Endoscopic","posted_on_date":"6/2/2019","posted_on_time":"3:28 PM"},
{"id":421,"title":"Help Desk Operator","location":"Vietnam","category":"n/a","experience":2,"description":"Supplement Pelvis Lymphatic with Autologous Tissue Substitute, Open Approach","posted_on_date":"3/15/2019","posted_on_time":"7:14 AM"},
{"id":422,"title":"Senior Sales Associate","location":"Sweden","category":"Public Utilities","experience":10,"description":"Destruction of Aortic Lymphatic, Percutaneous Approach","posted_on_date":"9/28/2019","posted_on_time":"3:32 AM"},
{"id":423,"title":"Developer I","location":"United States","category":"Basic Industries","experience":6,"description":"Fragmentation in Left Parotid Duct, Percutaneous Approach","posted_on_date":"6/8/2019","posted_on_time":"1:53 AM"},
{"id":424,"title":"Quality Engineer","location":"China","category":"Energy","experience":3,"description":"Destruction of Left Frontal Sinus, Open Approach","posted_on_date":"11/21/2019","posted_on_time":"12:35 PM"},
{"id":425,"title":"Information Systems Manager","location":"Bolivia","category":"Energy","experience":6,"description":"Plain Radiography of Right Lacrimal Duct using High Osmolar Contrast","posted_on_date":"9/26/2019","posted_on_time":"12:43 AM"},
{"id":426,"title":"Senior Editor","location":"Thailand","category":"Finance","experience":9,"description":"Lower Veins, Repair","posted_on_date":"4/17/2019","posted_on_time":"6:14 PM"},
{"id":427,"title":"Junior Executive","location":"China","category":"Finance","experience":4,"description":"Insertion of Infusion Device into Left Internal Iliac Artery, Percutaneous Approach","posted_on_date":"5/23/2019","posted_on_time":"1:44 PM"},
{"id":428,"title":"Software Engineer I","location":"Mauritius","category":"n/a","experience":3,"description":"Revision of Synthetic Substitute in Nose, Percutaneous Endoscopic Approach","posted_on_date":"9/12/2019","posted_on_time":"3:10 AM"},
{"id":429,"title":"Chemical Engineer","location":"Kuwait","category":"n/a","experience":9,"description":"Reattachment of Left Hepatic Duct, Open Approach","posted_on_date":"9/4/2019","posted_on_time":"1:30 AM"},
{"id":430,"title":"Engineer III","location":"Philippines","category":"Health Care","experience":2,"description":"Drainage of Clitoris, External Approach, Diagnostic","posted_on_date":"8/19/2019","posted_on_time":"1:51 PM"},
{"id":431,"title":"Actuary","location":"Portugal","category":"Technology","experience":8,"description":"Bypass Right Greater Saphenous Vein to Lower Vein with Synthetic Substitute, Open Approach","posted_on_date":"10/5/2019","posted_on_time":"9:28 PM"},
{"id":432,"title":"Database Administrator III","location":"Venezuela","category":"Energy","experience":5,"description":"Reposition Right Internal Mammary Artery, Percutaneous Approach","posted_on_date":"5/3/2019","posted_on_time":"10:04 PM"},
{"id":433,"title":"Senior Financial Analyst","location":"United States","category":"n/a","experience":2,"description":"Removal of Spacer from Right Hip Joint, Open Approach","posted_on_date":"3/21/2019","posted_on_time":"6:38 PM"},
{"id":434,"title":"Automation Specialist IV","location":"Indonesia","category":"Transportation","experience":7,"description":"Destruction of Ileum, Via Natural or Artificial Opening","posted_on_date":"9/25/2019","posted_on_time":"8:30 AM"},
{"id":435,"title":"Geologist IV","location":"Madagascar","category":"Energy","experience":9,"description":"Release Anus, Via Natural or Artificial Opening Endoscopic","posted_on_date":"6/19/2019","posted_on_time":"4:33 PM"},
{"id":436,"title":"Civil Engineer","location":"Portugal","category":"Finance","experience":10,"description":"Fragmentation in Transverse Colon, Via Natural or Artificial Opening Endoscopic","posted_on_date":"2/17/2020","posted_on_time":"10:28 PM"},
{"id":437,"title":"VP Marketing","location":"Honduras","category":"Basic Industries","experience":3,"description":"Dilation of Cervix, Via Natural or Artificial Opening","posted_on_date":"5/11/2019","posted_on_time":"10:10 PM"},
{"id":438,"title":"Nurse","location":"China","category":"Capital Goods","experience":3,"description":"Drainage of Left Hip Tendon with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"12/22/2019","posted_on_time":"2:56 PM"},
{"id":439,"title":"Recruiter","location":"Philippines","category":"Finance","experience":5,"description":"Destruction of Right Ear Skin, External Approach","posted_on_date":"8/26/2019","posted_on_time":"2:08 AM"},
{"id":440,"title":"Structural Analysis Engineer","location":"Egypt","category":"n/a","experience":8,"description":"Change Brace on Left Foot","posted_on_date":"7/23/2019","posted_on_time":"8:32 PM"},
{"id":441,"title":"Civil Engineer","location":"Slovenia","category":"Consumer Services","experience":2,"description":"Destruction of Right Lower Femur, Open Approach","posted_on_date":"12/15/2019","posted_on_time":"10:39 PM"},
{"id":442,"title":"Legal Assistant","location":"China","category":"Finance","experience":3,"description":"Division of Left Ethmoid Bone, Percutaneous Endoscopic Approach","posted_on_date":"7/28/2019","posted_on_time":"9:56 PM"},
{"id":443,"title":"Assistant Manager","location":"South Korea","category":"Technology","experience":5,"description":"Radiation Therapy, Musculoskeletal System, Beam Radiation","posted_on_date":"7/2/2019","posted_on_time":"1:03 PM"},
{"id":444,"title":"Financial Advisor","location":"Greece","category":"n/a","experience":9,"description":"Planar Nuclear Medicine Imaging of Brain using Other Radionuclide","posted_on_date":"12/18/2019","posted_on_time":"6:32 AM"},
{"id":445,"title":"Nurse Practicioner","location":"China","category":"Basic Industries","experience":2,"description":"Introduction of Electrolytic and Water Balance Substance into Genitourinary Tract, Percutaneous Approach","posted_on_date":"2/4/2020","posted_on_time":"1:47 PM"},
{"id":446,"title":"Office Assistant I","location":"Brazil","category":"Health Care","experience":7,"description":"Occlusion of Urethra with Intraluminal Device, Percutaneous Approach","posted_on_date":"3/11/2019","posted_on_time":"4:03 PM"},
{"id":447,"title":"Clinical Specialist","location":"Indonesia","category":"Consumer Services","experience":7,"description":"Reattachment of Right Ovary, Percutaneous Endoscopic Approach","posted_on_date":"3/28/2019","posted_on_time":"10:19 PM"},
{"id":448,"title":"Clinical Specialist","location":"Indonesia","category":"Consumer Durables","experience":5,"description":"Repair Eye in Products of Conception with Other Device, Via Natural or Artificial Opening Endoscopic","posted_on_date":"3/14/2019","posted_on_time":"9:21 AM"},
{"id":449,"title":"Senior Sales Associate","location":"Serbia","category":"Basic Industries","experience":7,"description":"Excision of Abdominal Sympathetic Nerve, Percutaneous Endoscopic Approach","posted_on_date":"12/23/2019","posted_on_time":"7:06 PM"},
{"id":450,"title":"Assistant Manager","location":"Indonesia","category":"n/a","experience":3,"description":"Insertion of Spacer into Lumbar Vertebral Disc, Percutaneous Approach","posted_on_date":"12/17/2019","posted_on_time":"11:08 AM"},
{"id":451,"title":"Technical Writer","location":"Netherlands","category":"Consumer Non-Durables","experience":7,"description":"Destruction of Left Vocal Cord, Open Approach","posted_on_date":"1/26/2020","posted_on_time":"6:44 PM"},
{"id":452,"title":"Executive Secretary","location":"Nigeria","category":"Consumer Services","experience":7,"description":"Destruction of Ampulla of Vater, Via Natural or Artificial Opening","posted_on_date":"1/11/2020","posted_on_time":"1:18 AM"},
{"id":453,"title":"Automation Specialist III","location":"Egypt","category":"Technology","experience":1,"description":"Alteration of Right Lower Extremity with Nonautologous Tissue Substitute, Percutaneous Approach","posted_on_date":"8/1/2019","posted_on_time":"10:10 AM"},
{"id":454,"title":"Payment Adjustment Coordinator","location":"Indonesia","category":"Consumer Services","experience":3,"description":"Dilation of Hepatic Artery with Three Intraluminal Devices, Percutaneous Approach","posted_on_date":"9/13/2019","posted_on_time":"4:19 AM"},
{"id":455,"title":"VP Marketing","location":"Indonesia","category":"Public Utilities","experience":2,"description":"Inspection of Left Shoulder Region, Open Approach","posted_on_date":"9/16/2019","posted_on_time":"11:31 PM"},
{"id":456,"title":"Human Resources Assistant IV","location":"Syria","category":"Finance","experience":2,"description":"Drainage of Middle Colic Artery, Percutaneous Endoscopic Approach, Diagnostic","posted_on_date":"9/22/2019","posted_on_time":"9:19 PM"},
{"id":457,"title":"Computer Systems Analyst II","location":"France","category":"Basic Industries","experience":7,"description":"Insertion of Infusion Device into Pericardial Cavity, Open Approach","posted_on_date":"5/19/2019","posted_on_time":"4:56 PM"},
{"id":458,"title":"Geological Engineer","location":"China","category":"Finance","experience":6,"description":"Occlusion of Accessory Pancreatic Duct with Intraluminal Device, Percutaneous Approach","posted_on_date":"8/25/2019","posted_on_time":"1:05 PM"},
{"id":459,"title":"Director of Sales","location":"Russia","category":"Technology","experience":3,"description":"Revision of Radioactive Element in Mouth and Throat, Via Natural or Artificial Opening","posted_on_date":"9/4/2019","posted_on_time":"10:23 AM"},
{"id":460,"title":"Teacher","location":"Indonesia","category":"Technology","experience":4,"description":"Destruction of Left Adrenal Gland, Percutaneous Endoscopic Approach","posted_on_date":"6/27/2019","posted_on_time":"10:18 PM"},
{"id":461,"title":"Computer Systems Analyst III","location":"Indonesia","category":"n/a","experience":8,"description":"Supplement Tricuspid Valve created from Right Atrioventricular Valve with Autologous Tissue Substitute, Percutaneous Approach","posted_on_date":"5/8/2019","posted_on_time":"2:18 AM"},
{"id":462,"title":"Biostatistician I","location":"Indonesia","category":"Capital Goods","experience":2,"description":"Change Intermittent Pressure Device on Left Hand","posted_on_date":"7/18/2019","posted_on_time":"7:19 AM"},
{"id":463,"title":"Business Systems Development Analyst","location":"Russia","category":"Basic Industries","experience":5,"description":"Transfer Lumbar Nerve to Lumbar Nerve, Open Approach","posted_on_date":"4/2/2019","posted_on_time":"7:08 AM"},
{"id":464,"title":"Staff Accountant II","location":"China","category":"Capital Goods","experience":1,"description":"Repair Left Seminal Vesicle, Percutaneous Endoscopic Approach","posted_on_date":"9/6/2019","posted_on_time":"9:37 PM"},
{"id":465,"title":"Editor","location":"Russia","category":"Consumer Durables","experience":5,"description":"Drainage of Vagus Nerve, Open Approach, Diagnostic","posted_on_date":"8/7/2019","posted_on_time":"12:24 AM"},
{"id":466,"title":"Analog Circuit Design manager","location":"Colombia","category":"Finance","experience":10,"description":"Drainage of Left Lower Arm Subcutaneous Tissue and Fascia with Drainage Device, Percutaneous Approach","posted_on_date":"6/7/2019","posted_on_time":"2:41 PM"},
{"id":467,"title":"Food Chemist","location":"Canada","category":"Consumer Services","experience":2,"description":"Fluoroscopy of Thoraco-Abdominal Aorta using High Osmolar Contrast, Laser Intraoperative","posted_on_date":"4/23/2019","posted_on_time":"10:01 AM"},
{"id":468,"title":"Geologist I","location":"Ethiopia","category":"Consumer Services","experience":10,"description":"Extraction of Face Skin, External Approach","posted_on_date":"6/18/2019","posted_on_time":"5:49 AM"},
{"id":469,"title":"GIS Technical Architect","location":"Argentina","category":"Finance","experience":9,"description":"Skin and Breast, Inspection","posted_on_date":"3/10/2019","posted_on_time":"6:05 PM"},
{"id":470,"title":"Help Desk Technician","location":"Japan","category":"Finance","experience":2,"description":"Destruction of Right Radial Artery, Open Approach","posted_on_date":"1/3/2020","posted_on_time":"8:28 PM"},
{"id":471,"title":"Quality Control Specialist","location":"Iran","category":"n/a","experience":9,"description":"Release Right Kidney, Percutaneous Approach","posted_on_date":"8/11/2019","posted_on_time":"12:04 AM"},
{"id":472,"title":"Nurse","location":"China","category":"n/a","experience":4,"description":"Bypass Peritoneal Cavity to Cutaneous with Synthetic Substitute, Percutaneous Endoscopic Approach","posted_on_date":"10/11/2019","posted_on_time":"1:24 AM"},
{"id":473,"title":"VP Quality Control","location":"Guatemala","category":"Technology","experience":7,"description":"Excision of Hypothalamus, Percutaneous Approach, Diagnostic","posted_on_date":"5/5/2019","posted_on_time":"1:46 AM"},
{"id":474,"title":"Professor","location":"Austria","category":"Energy","experience":9,"description":"Revision of Autologous Tissue Substitute in Lumbosacral Joint, Open Approach","posted_on_date":"1/12/2020","posted_on_time":"2:16 AM"},
{"id":475,"title":"Account Executive","location":"Italy","category":"Consumer Non-Durables","experience":1,"description":"Release Lumbar Vertebral Disc, External Approach","posted_on_date":"6/19/2019","posted_on_time":"12:08 PM"},
{"id":476,"title":"Information Systems Manager","location":"Indonesia","category":"Capital Goods","experience":8,"description":"Insertion of Internal Fixation Device into Right Parietal Bone, Percutaneous Endoscopic Approach","posted_on_date":"11/29/2019","posted_on_time":"2:12 PM"},
{"id":477,"title":"Computer Systems Analyst IV","location":"Philippines","category":"Finance","experience":7,"description":"Drainage of Right Large Intestine with Drainage Device, Via Natural or Artificial Opening Endoscopic","posted_on_date":"8/20/2019","posted_on_time":"7:10 AM"},
{"id":478,"title":"Nuclear Power Engineer","location":"Western Sahara","category":"n/a","experience":4,"description":"Division of Bilateral Ovaries, Percutaneous Endoscopic Approach","posted_on_date":"1/22/2020","posted_on_time":"4:34 PM"},
{"id":479,"title":"Financial Advisor","location":"Philippines","category":"Health Care","experience":8,"description":"Reposition Right Humeral Head, External Approach","posted_on_date":"8/1/2019","posted_on_time":"10:43 AM"},
{"id":480,"title":"Engineer II","location":"Argentina","category":"Consumer Durables","experience":8,"description":"Sensory Awareness/Processing/Integrity Assessment of Neurological System - Head and Neck","posted_on_date":"10/2/2019","posted_on_time":"2:38 AM"},
{"id":481,"title":"Cost Accountant","location":"Morocco","category":"Public Utilities","experience":4,"description":"Insertion of Monitoring Device into Ureter, Via Natural or Artificial Opening Endoscopic","posted_on_date":"12/4/2019","posted_on_time":"1:42 PM"},
{"id":482,"title":"Pharmacist","location":"Bangladesh","category":"Capital Goods","experience":10,"description":"Computerized Tomography (CT Scan) of Temporal Bones using High Osmolar Contrast","posted_on_date":"11/9/2019","posted_on_time":"3:23 PM"},
{"id":483,"title":"Account Executive","location":"Czech Republic","category":"Technology","experience":4,"description":"Destruction of Right Lower Extremity Lymphatic, Open Approach","posted_on_date":"5/17/2019","posted_on_time":"4:24 PM"},
{"id":484,"title":"Recruiter","location":"Indonesia","category":"n/a","experience":7,"description":"Extirpation of Matter from Right Subclavian Vein, Percutaneous Endoscopic Approach","posted_on_date":"9/20/2019","posted_on_time":"12:18 AM"},
{"id":485,"title":"Research Nurse","location":"China","category":"n/a","experience":3,"description":"Insertion of Other Device into Left Ankle Region, Percutaneous Approach","posted_on_date":"7/12/2019","posted_on_time":"9:40 AM"},
{"id":486,"title":"VP Marketing","location":"Greece","category":"Health Care","experience":3,"description":"Supplement Left Lower Eyelid with Nonautologous Tissue Substitute, External Approach","posted_on_date":"2/7/2020","posted_on_time":"3:34 AM"},
{"id":487,"title":"Internal Auditor","location":"Japan","category":"Energy","experience":8,"description":"Sensory Awareness/Processing/Integrity Assessment of Integumentary System - Whole Body using Other Equipment","posted_on_date":"8/25/2019","posted_on_time":"5:49 PM"},
{"id":488,"title":"Business Systems Development Analyst","location":"China","category":"Public Utilities","experience":4,"description":"Removal of Extraluminal Device from Thoracic Duct, Percutaneous Endoscopic Approach","posted_on_date":"6/10/2019","posted_on_time":"12:46 AM"},
{"id":489,"title":"Biostatistician IV","location":"Chile","category":"n/a","experience":5,"description":"Supplement Left Lower Lobe Bronchus with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"5/24/2019","posted_on_time":"4:34 AM"},
{"id":490,"title":"Structural Engineer","location":"China","category":"Finance","experience":7,"description":"Drainage of Left Toe Phalanx with Drainage Device, Percutaneous Endoscopic Approach","posted_on_date":"12/3/2019","posted_on_time":"2:02 PM"},
{"id":491,"title":"Geological Engineer","location":"Syria","category":"Public Utilities","experience":9,"description":"Insertion of Infusion Device into Cervicothoracic Vertebral Disc, Open Approach","posted_on_date":"9/24/2019","posted_on_time":"1:42 AM"},
{"id":492,"title":"Associate Professor","location":"Indonesia","category":"Technology","experience":7,"description":"Occlusion of Thoracic Duct with Intraluminal Device, Percutaneous Approach","posted_on_date":"1/13/2020","posted_on_time":"6:20 AM"},
{"id":493,"title":"Programmer II","location":"Portugal","category":"Technology","experience":8,"description":"Release Left Orbit, Open Approach","posted_on_date":"5/11/2019","posted_on_time":"8:53 AM"},
{"id":494,"title":"Senior Editor","location":"China","category":"Finance","experience":1,"description":"Bypass Ileum to Descending Colon with Autologous Tissue Substitute, Percutaneous Endoscopic Approach","posted_on_date":"1/25/2020","posted_on_time":"5:56 AM"},
{"id":495,"title":"Executive Secretary","location":"Brazil","category":"Health Care","experience":1,"description":"Division of Abducens Nerve, Percutaneous Approach","posted_on_date":"10/13/2019","posted_on_time":"8:32 PM"},
{"id":496,"title":"Research Nurse","location":"China","category":"n/a","experience":6,"description":"Insertion of Infusion Device into Right Common Iliac Artery, Open Approach","posted_on_date":"11/21/2019","posted_on_time":"4:16 AM"},
{"id":497,"title":"Speech Pathologist","location":"Peru","category":"Finance","experience":8,"description":"Fusion of Left Elbow Joint with Synthetic Substitute, Open Approach","posted_on_date":"11/26/2019","posted_on_time":"3:01 PM"},
{"id":498,"title":"Civil Engineer","location":"China","category":"Technology","experience":5,"description":"Measurement of Arterial Flow, Pulmonary, Percutaneous Approach","posted_on_date":"7/11/2019","posted_on_time":"2:22 AM"},
{"id":499,"title":"Actuary","location":"Russia","category":"Finance","experience":3,"description":"Coordination/Dexterity Treatment of Neurological System - Head and Neck","posted_on_date":"12/10/2019","posted_on_time":"11:20 PM"},
{"id":500,"title":"Recruiting Manager","location":"China","category":"n/a","experience":9,"description":"Dilation of Intracranial Artery with Four or More Drug-eluting Intraluminal Devices, Percutaneous Approach","posted_on_date":"2/5/2020","posted_on_time":"9:55 PM"}]}


let array1=[]
gotdata.data.forEach((value)=>{
    array1.push(value.category)
})
console.log(new Set(array1))