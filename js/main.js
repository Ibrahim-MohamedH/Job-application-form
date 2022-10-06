let alertMessage = document.querySelector("#info-message");
let applicantCount = document.querySelector("h6 span")
let alertting = document.querySelector("#alert-message");


let noTask = function () {
  if(applicantList.length == 0){
    alertMessage.classList.remove("none")
    applicantCount.textContent = applicantList.length
  }else{
    alertMessage.classList.add("none")
    applicantCount.textContent = applicantList.length
  }
}

// ######### Waiting funcion #########
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function displayAlert(q, t) {
  q.classList.remove("none");
  q.innerText = t;
  q.style.opacity = "0.2";
  await sleep(50);
  q.style.opacity = "0.4";
  await sleep(50);
  q.style.opacity = "0.6";
  await sleep(50);
  q.style.opacity = "0.8";
  await sleep(50);
  q.style.opacity = "1";
  await sleep(50);
  await sleep(3000);
  q.style.opacity = "0.8";
  await sleep(50);
  q.style.opacity = "0.6";
  await sleep(50);
  q.style.opacity = "0.4";
  await sleep(50);
  q.style.opacity = "0.2";
  await sleep(50);
  q.classList.add("none")
}

// ###################################
window.addEventListener("load", () =>{
  applicantList = JSON.parse(localStorage.getItem("applicants")) || [];
  let form = document.querySelector("form");
  let name = document.querySelector("#name");
  let img = document.querySelector("#img");
  let title = document.querySelector("#title");
  let salary = document.querySelector("#salary");
  
  // loading spinner
  const spinner = document.querySelector(".loading-spinner")
  spinner.classList.add("none")

  form.addEventListener("submit", (e) =>{
    e.preventDefault();

    // create an object
    let applicants = {
      username: name.value,
      user_img: img.value,
      user_title: title.value,
      user_salary: salary.value,
      createdAt: new Date().getTime()
    };

    if(!name.value.trim() || !img.value.trim() || !title.value.trim() || !salary.value.trim()){
      if(!name.value.trim() && !img.value.trim() && !title.value.trim() && !salary.value.trim()){
        displayAlert(alertting, "Please fill all form inputs");
      }
      else if(!name.value.trim()){
        displayAlert(alertting, "Please enter a valid Name");
        name.value = "";
      }else if(!img.value.trim()){
        displayAlert(alertting, "Please enter a valid URL");
        img.value = "";
      } else if(!title.value.trim()){
        displayAlert(alertting, "Please enter a valid job title");
        title.value = "";
      } else if(!salary.value.trim()){
        displayAlert(alertting, "Please enter a valid salary value");
        salary.value = "";
      }
    } else {
      applicantList.push(applicants);
      localStorage.setItem("applicants", JSON.stringify(applicantList));
      name.value = "";
      img.value = "";
      title.value = "";
      salary.value = "";
    }
    
    addApplicant();
  });
  noTask()
  addApplicant();
});

function addApplicant() {
  const applicationCol = document.querySelector("#applicants");

  applicationCol.innerHTML = "";
  applicantList.sort((a, b) => b.createdAt - a.createdAt);
  
  applicantList.forEach(applicants => {
  
    // Creating elements
    const applicant_div = document.createElement("div");
    applicant_div.classList.add("col-12", "my-5", "applicant");
    const row_div = document.createElement("row");
    row_div.classList.add("row", "justify-content-center")
    const img_div = document.createElement("div");
    img_div.classList.add("col-lg-3", "col-10");
    const text_div = document.createElement("div");
    text_div.classList = "col-lg-9 col-10 pt-md-5 pt-4 text-lg-left text-center";
    const delete_icon = document.createElement("i");
    delete_icon.classList = "delete fa-solid fa-square-xmark";
    const app_img = document.createElement("img")
    app_img.classList = "img-fluid rounded-circle ap-img";
    app_img.src = applicants.user_img;
    app_img.alt = "Applicant Image";
    const h2 = document.createElement("h2");
    h2.textContent = applicants.username;
    const h4 = document.createElement("h4");
    h4.textContent = applicants.user_title;
    const h5 = document.createElement("h5");
    
    // Slicing salary for good looking
    if(applicants.user_salary.length <= 3){
      salary = applicants.user_salary
    } else if (applicants.user_salary.length <= 6){
      salary = `${applicants.user_salary.slice(0, -3)},${applicants.user_salary.slice(-3, applicants.user_salary.length)}`
    }else if (applicants.user_salary.length <= 9){
      salary = `${applicants.user_salary.slice(0, -6)},${applicants.user_salary.slice(-6, -3)},${applicants.user_salary.slice(-3, applicants.user_salary.length)}`
    }else if (applicants.user_salary.length <= 12){
      salary = `${applicants.user_salary.slice(0, -9)},${applicants.user_salary.slice(-9, -6)},${applicants.user_salary.slice(-6, -3)},${applicants.user_salary.slice(-3, applicants.user_salary.length)}`
    }
    h5.textContent = `${salary}$`;
    
    // Turning Millisec to actual date
    let time = new Date(applicants.createdAt);
    time = time.toString()

    const timing_div = document.createElement("h5");
    timing_div.textContent = `${time.substring(4,10)}, ${time.substring(11,15)}`
    timing_div.classList.add("float-lg-right")
    console.log
    // Append Created elements
    text_div.append(timing_div, h2, h4, h5);
    img_div.append(app_img);
    row_div.append(img_div, text_div, delete_icon);
    applicant_div.append(row_div)
    applicationCol.append(applicant_div);
    noTask()
    // Delete button
    delete_icon.addEventListener("click", () =>{
        applicantList = applicantList.filter( a => a != applicants);
        localStorage.setItem("applicants", JSON.stringify(applicantList));
        addApplicant()
        noTask()
    })
  });
}

let styleLink = document.querySelector("#styleMode");
let bigImage = document.querySelector(".modal-like img");
document.addEventListener("click", (e) => {
  if(e.target.classList.contains("fa-moon")){
    styleLink.href = "./css/dark.css"
    e.target.classList.replace("fa-moon", "fa-sun")
  }else if(e.target.classList.contains("fa-sun")){
    styleLink.href = "./css/main.css"
    e.target.classList.replace("fa-sun", "fa-moon")
  }

  if(e.target.classList.contains("ap-img")){
    bigImage.src = e.target.src
    bigImage.parentElement.style.display = "block"
  }

  if(e.target.classList.contains("fa-xmark") || e.target.classList.contains("modal-like-img") || e.target.classList.contains("modal-like")){
    bigImage.parentElement.style.display = ""
  }
  
  if(e.target.classList.contains("arrow-up")){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
  }

})

let top_scroll = document.querySelector("#top-arrow")
let scrolling = function (){
  let y = window.scrollY;
  if(y >= 400){
    top_scroll.classList.remove("none")
  }else{
    top_scroll.classList.add("none")
  }
}

window.addEventListener("scroll", scrolling)