
 async function explore(){
var dt=[];
 fetch("https://api.unsplash.com/collections?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA").then((data)=>data.json()).then((res)=>{
  //  console.log(res)
    
     Getting_data(res)
 }).catch((err)=>{
  console.log(err)
 });

 
}
async function Getting_data(dt){
    let d=document.getElementById("explore_container")
 for(let i=0;i<dt.length;i++){
     //console.log(dt[i])
     
    
    let div =document.createElement("div");
    div.setAttribute("class","explore_block")
    let img = document.createElement("img");   
    img.src=dt[i].cover_photo.urls.small;
    
    img.setAttribute("class","explore_img");
    let d1 = document.createElement("div");
 
    let h3 = document.createElement("h3");
    h3.setAttribute("class","explore_block_h3")
   h3.innerText= dt[i].title;
   let p1 = document.createElement("p");
   p1.textContent = `${dt[i].total_photos} Posts`;
 p1.setAttribute("class","explore_block_p");
 let d_h = document.createElement("div");
 let random =getRandomColor();
 if(random=="hsl(0,0%,100%)"){
      random=getRandomColor();
 }
 d1.style.backgroundColor=random;
 if(i>=5){
  // console.log(i);
   d1.append(h3,p1);
    d_h.append(img,d1);   
    d_h.style.backgroundColor=random;
    d_h.classList="more";
    d_h.style.visibility="hidden"
}else{
    d1.append(h3,p1);
  
    div.append(img,d1)
}
let final_div= document.createElement("div");
final_div.append(div,d_h)
   final_div.classList="explore_block"
    d.append(final_div);
 }
}



const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit);
  };
  
  const getRandomColor = () => {
    const h = getRandomNumber(360);
    const s = getRandomNumber(100);
    const l = getRandomNumber(100);
  
    return `hsl(${h}deg, ${s}%, ${l}%)`;
  };
explore();


let tagname = document.getElementById("tagName").value;
let sort=document.getElementById("sortBy").value;




async function tags_getting(){

    let data = await fetch("https://api.imgur.com/3/tags",{
        method:"GET",
        headers:{
           Authorization:"Client-ID 80007bf69dcb7ca"
        }
    })
    let res = await  data.json();
    return (res.data.tags)
}

async function Item_getting(tag,sort){
    let div = document.getElementById("item_container");
   
  try{
    let data =await  fetch(`https://api.unsplash.com/photos/?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA&query=${tag}`,{
        method:"GET",
        headers:{
           Authorization:"Client-ID 80007bf69dcb7ca"
        }
    })
    let res = await data.json();
  
  
    return  await res.data

  }catch(err){
    div.innerHTML=`<div>Oops Something went wrong! </div>`
  }
 finally{
    
 }
   
   
}
//Item_getting();

var visible = true;
setInterval(()=>{
    if(visible){
        let d = document.getElementById("show");
        d.textContent="More Tags +";
       // d.onclick=view_more();
        d.addEventListener("click",view_more)
     }else{
         let d = document.getElementById("show");
        d.textContent="Less Tags -";
        d.addEventListener("click",view_less)
     }
},1000)


function view_more(){
    let container  = document.querySelector("#explore_container");
    let d = container.querySelectorAll("div.more");
    for(let i=0;i<d.length;i++)
   d[i].style.visibility= "visible";
    visible=false;
    
}
function view_less(){
    //console.log("njk")
    let container  = document.querySelector("#explore_container");
    let d = container.querySelectorAll("div.more");
    for(let i=0;i<d.length;i++)
   d[i].style.visibility= "hidden";
   visible=true;
}

async function main_call(query,sort){
    let data=await fetch(`https://api.unsplash.com/photos/?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA&query=${query}`);
    let res = await data.json();
    return res;
}

async function search(){
    let query = document.getElementById("q").value;
    if(query==""){
        alert(`Enter the query please`)
    }else{
        //alt_description
          main_call(query,sort);
    }
    document.getElementById("debounce").innerHTML=null;
}

async function debouncing(){
   // console.log("asd")
    let q = document.getElementById("q").value;
    
        let data =await Item_getting(q,sort);
       // console.log(data,"data")
        if(data){
            div.innerHTML=`<h1>Loading ......</h1>`
        let div = document.getElementById("debounce");
        div.innerHTML=null;
        data.forEach((el)=>{
            let d = document.createElement("div");
            d.textContent=el.alt_description;
            d.addEventListener("click",function(){
                q=el.title;
               // q.innerText=el.title;
              //  console.log(q);
            })
            div.append(d);
        })
    }else{
       let debounce= document.getElementById("debounce");
        debounce.innerHTML="Sorry Nothing found";
        setTimeout(()=>{
            debounce.innerHTML=null;
        },5000)
    }
}
var timerId;
function debounce(func, delay) {
    let name = document.getElementById("q").value;

    if (name.length < 1) {
        return false;
    }
    if (timerId) {
        clearTimeout(timerId)
    }
    // setTimeout(func, delay);
    timerId = setTimeout(func, delay)

}



