const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");

function openMenu(){
  nav.classList.add("open");
  menuButton.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu(){
  nav.classList.remove("open");
  menuButton.classList.remove("active");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click",()=>{
  if(nav.classList.contains("open")){
    closeMenu();
  }else{
    openMenu();
  }
});

document.querySelectorAll(".nav a").forEach(link=>{
  link.addEventListener("click",closeMenu);
});

function openModal(){
  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeModal(){
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

openModalButton.addEventListener("click",openModal);

document.querySelectorAll("[data-close]").forEach(element=>{
  element.addEventListener("click",closeModal);
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    closeModal();
    closeMenu();
  }
});

document.querySelectorAll(".faq-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const isOpen=item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach(other=>{
      other.classList.remove("open");
    });

    if(!isOpen){
      item.classList.add("open");
    }
  });
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{
  threshold:.12
});

document.querySelectorAll(".reveal").forEach(element=>{
  revealObserver.observe(element);
});

const counters=document.querySelectorAll("[data-number]");

const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting){
      return;
    }

    const element=entry.target;
    const target=Number(element.dataset.number);
    const duration=1300;
    const start=performance.now();

    function animate(currentTime){
      const progress=Math.min((currentTime-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);

      element.textContent=Math.round(target*eased);

      if(progress<1){
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    counterObserver.unobserve(element);
  });
},{
  threshold:.6
});

counters.forEach(counter=>{
  counterObserver.observe(counter);
});

const dashboardWindow=document.querySelector(".dashboard-window");

if(dashboardWindow){

  dashboardWindow.addEventListener("mousemove",event=>{
    if(window.innerWidth<=1100){
      return;
    }

    const rect=dashboardWindow.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;

    dashboardWindow.style.transform=
      `perspective(1500px) rotateY(${x*5}deg) rotateX(${-y*4}deg) translateY(-3px)`;
  });

  dashboardWindow.addEventListener("mouseleave",()=>{
    dashboardWindow.style.transform=
      "perspective(1500px) rotateY(-3deg) rotateX(2deg)";
  });
}

window.addEventListener("resize",()=>{
  if(window.innerWidth>800){
    closeMenu();
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",event=>{
    const targetId=link.getAttribute("href");

    if(!targetId || targetId==="#"){
      return;
    }

    const target=document.querySelector(targetId);

    if(target){
      event.preventDefault();

      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  });
});

function updateDashboardHeading() {
  const dateElement = document.getElementById("dashboardDate");
  const greetingElement = document.getElementById("greetingTime");
  const nameElement = document.getElementById("userName");

  if (!dateElement || !greetingElement || !nameElement) return;

  const now = new Date();

  const dateText = now
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    })
    .toUpperCase()
    .replace(",", " ·");

  dateElement.textContent = dateText;

  const hour = now.getHours();

  let greeting = "morning";

  if (hour >= 12 && hour < 17) {
    greeting = "afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "evening";
  } else if (hour >= 21 || hour < 5) {
    greeting = "night";
  }

  greetingElement.textContent = greeting;

  const savedName = localStorage.getItem("smartClassroomUserName");

  nameElement.textContent = savedName || "User";
}

updateDashboardHeading();

setInterval(updateDashboardHeading, 60000);
