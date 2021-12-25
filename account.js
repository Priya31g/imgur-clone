let profile_div = document.getElementById("profile_details");
let local_username=JSON.parse(localStorage.getItem("username"))
async function getUserDetails(){
    let data = await fetch(`https://api.unsplash.com/users/${local_username}?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA`);

    let res = await data.json();

    return res;
}

async function fetchuserDetails(){
    let d = await getUserDetails();

   // console.log(d)

    let div_header = document.createElement("div");


    let dp = document.createElement("img");
    dp.src=d.profile_image.medium;
    dp.alt="dp";
    dp.id="dp"
    

    
    let bio_div = document.createElement("div");

    let u_name =d.username;
    
    let username = document.createElement("p");
    username.innerHTML=u_name.toUpperCase();

    let download = document.createElement("p");
    if(d.badge)
    download.innerHTML=d.downloads+" Pts •"+ d.badge+`   •  ` + d.followers_count  ;
    else
    download.innerHTML=d.downloads+" Pts "+ `  •  ` + d.followers_count;

    let bio = document.createElement("p");
    bio.innerHTML= "BIO :  "+d.bio;

    let social_div=document.createElement("div");
    social_div.style.display="flex";
    social_div.id="social";

    let insta_div = document.createElement("div");
    let insta = document.createElement("img");
    if(d.social.instagram_username){
        insta.src="https://cdn-icons-png.flaticon.com/512/2111/2111491.png";
        insta.alt="instagram";
        
        let insta_username = document.createElement("p");;
        insta_username.innerHTML=d.social.instagram_username;
        insta_div.append(insta,insta_username)
    }
    

    let twitter_div = document.createElement("div");
    let twitter = document.createElement("img");
    if(d.social.twitter_username){
        twitter.src="https://cdn-icons-png.flaticon.com/128/2111/2111738.png";
        twitter.alt="twitter";
        let twitter_username = document.createElement("p");
            twitter_username.innerHTML=d.social.instagram_username;
            twitter_div.append(twitter,twitter_username);
    }
   
    let paypal_div =document.createElement("div");

   
    if(d.paypal_email){
        let paypal = document.createElement("img");
        paypal.src="https://cdn-icons-png.flaticon.com/128/174/174861.png";
        paypal.alt="paypal";
           
        paypal.onclick=()=>{
            window.location.href=`mailto:${d.social.paypal_email}`
        }
        paypal_div.append(paypal);
    }
   
   
    let portfolio = document.createElement("img");
    if(d.portfolio_url){
        portfolio.src="https://cdn-icons.flaticon.com/png/512/4309/premium/4309002.png?token=exp=1640464125~hmac=2595454cd0106eff4f270a51e6a2eff4";
        portfolio.alt="portfolio";
            
        portfolio.onclick=()=>{
            window.location.href=d.portfolio_url
        }
    }
   
    social_div.append(insta_div,twitter_div,portfolio,paypal_div)
    

   bio_div.append(username,download,bio,social_div);
   div_header.append(dp,bio_div);
   div_header.style.display="flex"

   profile_div.append(div_header);

   


    let photos_container=document.getElementById("photos_container");

    d.photos.forEach((el) => {
       let div = document.createElement("div")
        let img = document.createElement("img");
        img.src=el.urls.small;
        img.alt="img";
        img.onclick=()=>{
            localStorage.setItem("id",JSON.stringify(el.id))
            window.location.href="image.html"
        };
        img.style.cursor="pointer";
        img.style.width="90%"
       div.append(img);
       div.style.margin="2%";

       photos_container.append(div)
    });


}

fetchuserDetails();