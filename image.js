let down = document.getElementById("vote_d");
down.onmouseover=()=>{
    down.src="https://cdn-icons.flaticon.com/png/512/3148/premium/3148295.png?token=exp=1640456646~hmac=f3ebd554d67fc853770232685207be4e"
}
down.onmouseout=()=>{
    down.src="https://cdn-icons.flaticon.com/png/512/3148/premium/3148114.png?token=exp=1640456582~hmac=ca6d0da418a950436e72a5635398c3f4"
}

let up = document.getElementById("vote_u");
up.onmouseover=()=>{
    up.src="https://cdn-icons.flaticon.com/png/512/3148/premium/3148312.png?token=exp=1640456515~hmac=7970584ae2d0697dec86db7bcdbd7322"
}
up.onmouseout=()=>{
    up.src="https://cdn-icons.flaticon.com/png/512/3148/premium/3148121.png?token=exp=1640456558~hmac=28da0bd1a87f14a338653faeb1057c2a"
}

let like = document.getElementById("gallery_like");
like.onmouseover=()=>{
    like.src="https://cdn-icons-png.flaticon.com/512/6387/6387774.png"
}
like.onmouseout=()=>{
    like.src="https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1640456773~hmac=efcbff88824882717e272088bbdc5969"
}

async function getUser(){
    let id = JSON.parse(localStorage.getItem("id"));
    let data = await fetch(`https://api.unsplash.com/photos/${id}?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA`);
    let res = await data.json();

    return res;
}

async function fetchuser(){
    let d = await getUser();
    //console.log(d);
    let total_score = document.getElementById("total_score");
    total_score.innerHTML=d.likes;

    let div_profile = document.createElement("div");

    let pp = document.createElement("img");
    pp.alt="Profile Photo";
    pp.src=d.user.profile_image.medium;
    

    let username = document.createElement("p");
    username.innerHTML = d.user.username;
    username.style.color="green";
    //username.style.fontSize="15px";

    div_profile.append(pp,username);
    div_profile.style.display="flex";
    div_profile.id="profile";
    div_profile.style.cursor="pointer";
    div_profile.onclick=()=>{
        localStorage.setItem("username",JSON.stringify(d.user.username));
        window.location.href="account.html";
    }

    let image = document.createElement("img");
    image.alt="image";
    image.src=d.urls.small;
    image.id="pp_img"

    document.getElementById("comment").innerHTML=d.height;

   let to_appen_div= document.getElementById("image");
   to_appen_div.append(div_profile,image)
}
fetchuser();