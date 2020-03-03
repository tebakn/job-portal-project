document.getElementById("exp_menu").style.display = "none";
document.getElementById("category_area").style.display = "none";
document.getElementById("nextpaginate").value=2;

console.log(document.getElementById("prevpaginate").classList)


function tooglecategory(){
    var x = document.getElementById("category_area");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}
function expslider(){
    var x = document.getElementById("exp_menu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
document.getElementById('vol').onchange = function(){
    let answer = document.getElementById('vol').value;
    document.getElementById('show_vol').innerHTML = answer;
}
res=fetch("http://localhost:8082/joblist").then(async(data)=>{
      await data.json().then((value)=>insertintofeed(value.results))
    }).catch((e)=>{
      console.log(e)
        })



  async function search(page=null){
    if (page!==null){
      pageq='&$paginate_page='+page
      document.getElementById("result span").innerHTML=`Showing ${(page-1)*5+1}-${(page)*5} of 271 jobs`
    }
    else{ 
      pageq=''
      document.getElementById("result span").innerHTML=`Showing 1-5 of 271 jobs`}
    searchfieldval=document.getElementById("searchinput").value.trim()
    searchlocationval=document.getElementById("searchlocation").value.trim()
    console.log(searchlocationval)

    searchlocationquery=''
    searchfieldquery=''
    checkedquery=''
    expquery=''

    if(searchfieldval!=='')
        searchfieldquery="title_$includes="+searchfieldval

    if(searchlocationval!=='')
        searchlocationquery="&location="+searchlocationval

    if(document.getElementById("exp_menu").style.display==='block'){
        expquery="&experience_$isless="+document.getElementById('vol').value
    }

    if(document.getElementById("category_area").style.display==="block")
    {val=Array.from(document.getElementsByName("categories"))
    checkedquery=val.reduce((tot,element)=>{
        if(element.checked===true)
            tot+=`&category=${element.value}`
        return tot;
    },'')}

    console.log("http://localhost:8082/joblist?"+searchfieldquery+searchlocationquery+expquery+checkedquery+pageq)

    res=await fetch("http://localhost:8082/joblist?"+searchfieldquery+searchlocationquery+expquery+checkedquery+pageq).then(async(data)=>{
      await data.json().then((value)=>{
        if(value.prev!==undefined)
        {
          document.getElementById("prevpaginate").className="item"
          document.getElementById("prevpaginate").value=value.prev.page
        }
        else
          document.getElementById("prevpaginate").className="disabled item"
        if(value.next!==undefined)
        {
          document.getElementById("nextpaginate").className="item"
          document.getElementById("nextpaginate").value=value.next.page
        }
        else
          document.getElementById("nextpaginate").className="disabled item"
        insertintofeed(value.results)})
    }).catch((e)=>{
      console.log(e)
        })
      }

  async function prevpage(){
   await search(document.getElementById("prevpaginate").value)
  }
  async function nextpage(){
   await search(document.getElementById("nextpaginate").value)
  }


  function insertintofeed(filtered_results){
    
    feed=document.getElementById("feed_div")
    feed.innerHTML=''
    filtered_results.forEach((filtered_result) => {
      newdiv=document.createElement("div")
    newdiv.id="job"+filtered_result.id
    newdiv.className="ui fluid card"
    newdiv.innerHTML=`                
                  <div class="content">
                    <i class="right floated alternate share icon"></i>
                    <div class="header">${filtered_result.title} </div>
                    <div class="meta">
                      <span class="item">
                        <i class="location arrow icon"></i>${filtered_result.location}
                      </span> <span class="ui divider"> /</span><span class="item">
                        <i class="suitcase icon"></i>${filtered_result.category}
                      </span> <span class="divider">/</span> <span class="item">
                        <i class="outline clock arrow icon"></i>>${filtered_result.experience}
                      </span>
                    </div>
                    <div class="description">
                      <p>${filtered_result.description}</p>
                    </div>
                  </div>
                  <div class="extra content">
                    <span class="right floated">
                      Posted on: ${filtered_result.posted_on_date} |${filtered_result.posted_on_time}

                    </span>
                  </div>
                `
                feed.appendChild(newdiv)
    });
  }

