const images = new Array(100).fill(
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTk3NzZ8MXwxfGFsbHwxfHx8fHx8Mnx8MTYzMTI5MDcyMA&ixlib=rb-1.2.1&q=80&w=1080"
);

let maxCols = 0;
const setMaxCols = () => {
  if (window.innerWidth <= 600) {
    maxCols = 2;
  } else {
    maxCols = 3;
  }
};

setMaxCols();

const colDivElements = document.querySelectorAll(".col");
let j = 0;

const addImages = () => {
  for (let i = pageNumber * 10 - 10; i < pageNumber * 10; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = images[i];
    imageElement.alt = i;

    if (j <= 3) {
      colDivElements[j].appendChild(imageElement);
      j++;

      if (j === 3) {
        j = 0;
      }
    }
  }
  pageNumber++;
};

// addImages();

let pageNumber = 1;

let isLoading = false;
let colNumber = 0;

const imagesArray = [];



const fetchImages = (q="") => {
  fetch(
    `https://api.unsplash.com/photos/?client_id=e9P-zSXjnUSqg85MR_KkG4nyfn865Zfxpf53jrysDjA&per_page=10&page=${pageNumber}&q=${q}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach((el, index) => {
        //console.log(el)
       let d = document.createElement("div");
        imagesArray.push(el.urls.small);

        const imageElement = document.createElement("img");
        imageElement.src = el.urls.small;
        imageElement.alt = index;
        let action= document.createElement("div");
          let like_div= document.createElement("div");
          like_div.style.display="flex";
          let like_img = document.createElement("img");
          let unlike_img = document.createElement("img");
          like_img.src="https://cdn-icons-png.flaticon.com/512/126/126473.png";
          like_img.onmouseover = ()=>{like_img.src="https://cdn-icons.flaticon.com/png/512/880/premium/880452.png?token=exp=1640386004~hmac=7fc85519dee99dc4a9bee71c00864e4d"};
          like_img.onmouseout = () => { like_img.src = "https://cdn-icons-png.flaticon.com/512/126/126473.png"; }
          like_img.style.width="35px";
          like_img.style.height="35px";
          like_img.alt="like";
         
          unlike_img.src="https://cdn-icons-png.flaticon.com/512/35/35739.png";
          unlike_img.style.width="35px";
          unlike_img.style.height="35px";
          unlike_img.alt="like";
          unlike_img.onmouseover = ()=>{unlike_img.src="https://cdn-icons.flaticon.com/png/512/5819/premium/5819035.png?token=exp=1640385894~hmac=b3cfd04f2de1179a7e34e10082f5ad07"};
          unlike_img.onmouseout = () => { unlike_img.src = "https://cdn-icons-png.flaticon.com/512/35/35739.png"; }

          let like_count = document.createElement("p");
            like_count.innerText=el.likes;
          like_div.append(like_img,like_count,unlike_img);
          like_div.style.justifyContent="space-evenly"

          like_count.style.margin="1% 2%";

          action.append(like_div)
         
          d.append(imageElement,action);
          d.onclick=()=>{
            localStorage.setItem("id",JSON.stringify(el.id))
            window.location.href="image.html"
          }
          d.style.margin="1%";
          d.style.border=`1px solid ${el.color}`
        colDivElements[colNumber].appendChild(d);
        colNumber++;

        if (colNumber === maxCols) {
          colNumber = 0;
        }
      });

      isLoading = false;
    });

  pageNumber++;
};

fetchImages();

const callback = (entries, _) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isLoading) {
      isLoading = true;

      fetchImages();
    }
  });
};

const options = {
  rootMargin: "500px 0px 0px 0px",
};

const observer = new IntersectionObserver(callback, options);

const target = document.querySelector(".intersection");
observer.observe(target);

let previousMaxCols = maxCols;

window.addEventListener("resize", () => {
  setMaxCols();

  if (previousMaxCols !== maxCols) {
    isLoading = true;
    colDivElements.forEach((col) => {
      col.innerHTML = "";
    });
    colNumber = 0;
    previousMaxCols = maxCols;
    imagesArray.forEach((small, index) => {
      const imageElement = document.createElement("img");
      imageElement.src = small;
      imageElement.alt = index;

      colDivElements[colNumber].appendChild(imageElement);
      colNumber++;

      if (colNumber === maxCols) {
        colNumber = 0;
      }
    });
    setTimeout(() => {
      isLoading = false;
    }, 5000);
  }
});