const defaultData={
  classes:[
    {
      id:1,
      name:"Data Structures",
      code:"MCA-DS-301",
      teacher:"Dr. Priya Sharma",
      room:"Lab 2",
      time:"09:00",
      duration:60,
      status:"ongoing",
      color:"purple"
    },
    {
      id:2,
      name:"Web Technologies",
      code:"MCA-WT-302",
      teacher:"Prof. Arjun Rao",
      room:"Room 204",
      time:"10:30",
      duration:60,
      status:"upcoming",
      color:"blue"
    },
    {
      id:3,
      name:"Cloud Computing",
      code:"MCA-CC-303",
      teacher:"Dr. Neha Kulkarni",
      room:"Room 108",
      time:"12:00",
      duration:60,
      status:"upcoming",
      color:"mint"
    },
    {
      id:4,
      name:"Machine Learning",
      code:"MCA-ML-304",
      teacher:"Prof. Kiran Patil",
      room:"Lab 1",
      time:"14:00",
      duration:90,
      status:"upcoming",
      color:"peach"
    }
  ],

  students:[
    {
      id:1,
      name:"Aarav Sharma",
      roll:"MCA001",
      email:"aarav@example.com",
      class:"MCA A",
      attendance:96,
      status:"Active"
    },
    {
      id:2,
      name:"Ananya Rao",
      roll:"MCA002",
      email:"ananya@example.com",
      class:"MCA A",
      attendance:92,
      status:"Active"
    },
    {
      id:3,
      name:"Arjun Kumar",
      roll:"MCA003",
      email:"arjun@example.com",
      class:"MCA A",
      attendance:88,
      status:"Active"
    },
    {
      id:4,
      name:"Diya Patil",
      roll:"MCA004",
      email:"diya@example.com",
      class:"MCA A",
      attendance:97,
      status:"Active"
    },
    {
      id:5,
      name:"Ishaan Joshi",
      roll:"MCA005",
      email:"ishaan@example.com",
      class:"MCA A",
      attendance:84,
      status:"Active"
    },
    {
      id:6,
      name:"Kavya Desai",
      roll:"MCA006",
      email:"kavya@example.com",
      class:"MCA A",
      attendance:91,
      status:"Active"
    },
    {
      id:7,
      name:"Rohan Kulkarni",
      roll:"MCA007",
      email:"rohan@example.com",
      class:"MCA A",
      attendance:79,
      status:"Active"
    },
    {
      id:8,
      name:"Sneha Naik",
      roll:"MCA008",
      email:"sneha@example.com",
      class:"MCA A",
      attendance:94,
      status:"Active"
    },
    {
      id:9,
      name:"Vivek Shetty",
      roll:"MCA009",
      email:"vivek@example.com",
      class:"MCA A",
      attendance:87,
      status:"Active"
    },
    {
      id:10,
      name:"Meera Rao",
      roll:"MCA010",
      email:"meera@example.com",
      class:"MCA A",
      attendance:90,
      status:"Active"
    }
  ],

  assignments:[
    {
      id:1,
      title:"Binary Search Tree Implementation",
      subject:"Data Structures",
      due:"2026-09-16",
      status:"Pending",
      submissions:18,
      total:30,
      priority:"High"
    },
    {
      id:2,
      title:"Responsive Portfolio Website",
      subject:"Web Technologies",
      due:"2026-09-18",
      status:"Pending",
      submissions:24,
      total:30,
      priority:"Medium"
    },
    {
      id:3,
      title:"AWS Architecture Case Study",
      subject:"Cloud Computing",
      due:"2026-09-20",
      status:"Submitted",
      submissions:30,
      total:30,
      priority:"Low"
    },
    {
      id:4,
      title:"Linear Regression Model",
      subject:"Machine Learning",
      due:"2026-09-23",
      status:"Pending",
      submissions:12,
      total:30,
      priority:"High"
    }
  ],

  announcements:[
    {
      id:1,
      title:"Internal Assessment Schedule",
      text:"The first internal assessment schedule has been published. Please check your subject timetable.",
      date:"2026-09-14",
      type:"Academic"
    },
    {
      id:2,
      title:"Lab Maintenance",
      text:"Computer Lab 2 will be unavailable after 4 PM today for scheduled maintenance.",
      date:"2026-09-14",
      type:"Notice"
    },
    {
      id:3,
      title:"Project Review",
      text:"Final year project review starts next Monday. Teams should keep their documentation ready.",
      date:"2026-09-13",
      type:"Academic"
    }
  ],

  activities:[
    {
      icon:"✓",
      title:"Attendance marked",
      text:"Data Structures · MCA A",
      time:"10 min ago"
    },
    {
      icon:"↗",
      title:"Assignment submitted",
      text:"AWS Architecture Case Study",
      time:"35 min ago"
    },
    {
      icon:"!",
      title:"New announcement",
      text:"Internal Assessment Schedule",
      time:"1 hr ago"
    },
    {
      icon:"＋",
      title:"New student added",
      text:"Meera Rao · MCA010",
      time:"2 hrs ago"
    }
  ]
};

let data=JSON.parse(
  localStorage.getItem("smartClassroomData")||"null"
)||structuredClone(defaultData);

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];

function save(){
  localStorage.setItem(
    "smartClassroomData",
    JSON.stringify(data)
  );
}

function initials(name){
  return name
    .split(" ")
    .map(word=>word[0])
    .join("")
    .slice(0,2)
    .toUpperCase();
}

function formatDate(value){
  if(!value)return"—";

  return new Intl.DateTimeFormat("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
  }).format(
    new Date(value+"T00:00:00")
  );
}

function timeFormat(value){
  const [hours,minutes]=value
    .split(":")
    .map(Number);

  const date=new Date();

  date.setHours(hours,minutes);

  return new Intl.DateTimeFormat("en-US",{
    hour:"numeric",
    minute:"2-digit"
  }).format(date);
}

function toast(message){
  const element=$("#toast");

  if(!element)return;

  const text=element.querySelector(".toast-text");

  if(text){
    text.textContent=message;
  }

  element.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer=setTimeout(()=>{
    element.classList.remove("show");
  },2800);
}

function addActivity(icon,title,text){
  data.activities.unshift({
    icon,
    title,
    text,
    time:"just now"
  });

  data.activities=data.activities.slice(0,8);

  save();

  renderActivity();
}

function updateStats(){
  const students=data.students.filter(
    student=>student.status==="Active"
  ).length;

  const classes=data.classes.length;

  const assignments=data.assignments.filter(
    assignment=>assignment.status==="Pending"
  ).length;

  if($("#statStudents")){
    $("#statStudents").textContent=students;
  }

  if($("#statClasses")){
    $("#statClasses").textContent=classes;
  }

  if($("#statAssignments")){
    $("#statAssignments").textContent=assignments;
  }
}

function navigate(page){
  $$(".page").forEach(section=>{
    section.classList.toggle(
      "active",
      section.id===`page-${page}`
    );
  });

  $$(".nav-link").forEach(link=>{
    link.classList.toggle(
      "active",
      link.dataset.page===page
    );
  });

  const title=page.charAt(0).toUpperCase()+page.slice(1);

  if($("#pageTitle")){
    $("#pageTitle").textContent=title;
  }

  history.replaceState(
    null,
    "",
    `#${page}`
  );

  $("#sidebar")?.classList.remove("open");
  $("#mobileBackdrop")?.classList.remove("show");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function renderSchedule(){
  const container=$("#scheduleList");

  if(!container)return;

  container.innerHTML=data.classes.map(item=>`
    <button class="schedule-item" data-page-target="classes">
      <span class="schedule-time">${timeFormat(item.time)}</span>
      <span class="schedule-marker ${item.color}"></span>

      <span class="schedule-copy">
        <strong>${item.name}</strong>
        <span>${item.teacher} · ${item.code}</span>
      </span>

      <span class="schedule-room">${item.room}</span>
    </button>
  `).join("");
}

function renderActivity(){
  const container=$("#activityList");

  if(!container)return;

  container.innerHTML=data.activities.map(item=>`
    <div class="activity-item">
      <div class="activity-icon">${item.icon}</div>

      <div class="activity-copy">
        <strong>${item.title}</strong>
        <span>${item.text}</span>
      </div>

      <time>${item.time}</time>
    </div>
  `).join("");
}

function renderDashboardAssignments(){
  const container=$("#dashboardAssignments");

  if(!container)return;

  container.innerHTML=data.assignments
    .slice(0,4)
    .map(item=>`
      <div class="assignment-row">

        <div class="assignment-icon ${item.priority.toLowerCase()}">
          ${item.priority==="High"?"!":"✓"}
        </div>

        <div class="assignment-copy">
          <strong>${item.title}</strong>
          <span>${item.subject}</span>
        </div>

        <div class="assignment-meta">
          <span class="badge ${item.status.toLowerCase()}">
            ${item.status}
          </span>

          <small>${formatDate(item.due)}</small>
        </div>

      </div>
    `)
    .join("");
}

function renderDashboardAnnouncements(){
  const container=$("#dashboardAnnouncements");

  if(!container)return;

  container.innerHTML=data.announcements
    .slice(0,3)
    .map(item=>`
      <div class="announcement-mini">

        <div>
          <span class="announcement-type">
            ${item.type}
          </span>

          <strong>${item.title}</strong>

          <p>${item.text}</p>
        </div>

        <time>${formatDate(item.date)}</time>

      </div>
    `)
    .join("");
}

function renderClasses(){
  const container=$("#classGrid");

  if(!container)return;

  const search=(
    $("#classSearch")?.value||""
  ).toLowerCase();

  const status=
    $("#classStatus")?.value||"all";

  const sort=
    $("#classSort")?.value||"name";

  let classes=data.classes.filter(item=>{
    const matchesSearch=
      `${item.name} ${item.code} ${item.teacher}`
      .toLowerCase()
      .includes(search);

    const matchesStatus=
      status==="all"||
      item.status===status;

    return matchesSearch&&matchesStatus;
  });

  classes.sort((a,b)=>{
    if(sort==="time"){
      return a.time.localeCompare(b.time);
    }

    if(sort==="teacher"){
      return a.teacher.localeCompare(b.teacher);
    }

    return a.name.localeCompare(b.name);
  });

  if(!classes.length){
    container.innerHTML=`
      <div class="empty-state">
        <strong>No classes found</strong>
        <span>Try changing your search or filter.</span>
      </div>
    `;

    return;
  }

  container.innerHTML=classes.map(item=>`
    <article class="class-card ${item.color}">

      <div class="class-card-top">
        <span class="class-code">${item.code}</span>

        <button
          class="icon-button delete-class"
          data-id="${item.id}">
          ×
        </button>
      </div>

      <div class="class-card-main">

        <div class="class-avatar">
          ${initials(item.name)}
        </div>

        <div>
          <h3>${item.name}</h3>
          <p>${item.teacher}</p>
        </div>

      </div>

      <div class="class-card-details">
        <span>◷ ${timeFormat(item.time)}</span>
        <span>⌂ ${item.room}</span>
      </div>

      <div class="class-card-footer">

        <span class="badge ${item.status}">
          ${item.status}
        </span>

        <button
          class="soft-button mark-class"
          data-id="${item.id}">
          Mark attendance
        </button>

      </div>

    </article>
  `).join("");
}

function renderStudents(){
  const body=$("#studentTableBody");

  if(!body)return;

  const search=(
    $("#studentSearch")?.value||""
  ).toLowerCase();

  const status=
    $("#studentStatus")?.value||"all";

  const students=data.students.filter(student=>{
    const matchesSearch=
      `${student.name} ${student.roll} ${student.email}`
      .toLowerCase()
      .includes(search);

    const matchesStatus=
      status==="all"||
      student.status.toLowerCase()===status;

    return matchesSearch&&matchesStatus;
  });

  if(!students.length){
    body.innerHTML=`
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <strong>No students found</strong>
          </div>
        </td>
      </tr>
    `;

    return;
  }

  body.innerHTML=students.map(student=>`
    <tr>

      <td>
        <div class="person-cell">

          <div class="profile-avatar">
            ${initials(student.name)}
          </div>

          <div>
            <strong>${student.name}</strong>
            <span>${student.email}</span>
          </div>

        </div>
      </td>

      <td>${student.roll}</td>

      <td>${student.class}</td>

      <td>
        <span class="attendance-value ${
          student.attendance<80
            ?"low"
            :student.attendance<90
            ?"medium"
            :"high"
        }">
          ${student.attendance}%
        </span>
      </td>

      <td>
        <span class="status-dot">
          <i></i>
          ${student.status}
        </span>
      </td>

      <td>
        <button
          class="table-action"
          data-student="${student.id}">
          View
        </button>
      </td>

    </tr>
  `).join("");

  if($("#studentCount")){
    $("#studentCount").textContent=
      `${students.length} students`;
  }
}

function renderAttendance(){
  const body=$("#attendanceTableBody");

  if(!body)return;

  const selectedClass=
    $("#attendanceClass")?.value||"all";

  const students=
    selectedClass==="all"
      ?data.students
      :data.students.filter(
        student=>student.class===selectedClass
      );

  body.innerHTML=students.map(
    (student,index)=>{
      const present=index%5!==4;

      return`
        <tr>

          <td>
            <div class="person-cell">

              <div class="profile-avatar">
                ${initials(student.name)}
              </div>

              <div>
                <strong>${student.name}</strong>
                <span>${student.roll}</span>
              </div>

            </div>
          </td>

          <td>${student.class}</td>

          <td>
            <button
              class="attendance-toggle ${
                present?"present":"absent"
              }"
              data-student="${student.id}"
              data-present="${present}">
              ${present?"Present":"Absent"}
            </button>
          </td>

          <td>${student.attendance}%</td>

        </tr>
      `;
    }
  ).join("");

  const present=
    students.filter(
      (student,index)=>index%5!==4
    ).length;

  const absent=
    students.length-present;

  if($("#presentCount")){
    $("#presentCount").textContent=present;
  }

  if($("#absentCount")){
    $("#absentCount").textContent=absent;
  }

  if($("#attendanceRate")){
    $("#attendanceRate").textContent=
      students.length
        ?`${Math.round(
          present/students.length*100
        )}%`
        :"0%";
  }
}

function renderAssignments(){
  const container=$("#assignmentGrid");

  if(!container)return;

  const search=(
    $("#assignmentSearch")?.value||""
  ).toLowerCase();

  const filter=
    $("#assignmentFilter")?.value||"all";

  const assignments=data.assignments.filter(item=>{
    const matchesSearch=
      `${item.title} ${item.subject}`
      .toLowerCase()
      .includes(search);

    const matchesFilter=
      filter==="all"||
      item.status.toLowerCase()===filter;

    return matchesSearch&&matchesFilter;
  });

  if(!assignments.length){
    container.innerHTML=`
      <div class="empty-state">
        <strong>No assignments found</strong>
      </div>
    `;

    return;
  }

  container.innerHTML=assignments.map(item=>{

    const progress=
      item.total
        ?Math.round(
          item.submissions/item.total*100
        )
        :0;

    return`
      <article class="assignment-card">

        <div class="assignment-card-head">

          <span class="badge ${
            item.priority.toLowerCase()
          }">
            ${item.priority}
          </span>

          <button
            class="icon-button delete-assignment"
            data-id="${item.id}">
            ×
          </button>

        </div>

        <h3>${item.title}</h3>

        <p>${item.subject}</p>

        <div class="assignment-due">
          <span>Due date</span>
          <strong>${formatDate(item.due)}</strong>
        </div>

        <div class="progress-label">
          <span>Submissions</span>
          <strong>
            ${item.submissions}/${item.total}
          </strong>
        </div>

        <div class="progress">
          <i style="width:${progress}%"></i>
        </div>

        <div class="assignment-card-foot">

          <span class="badge ${
            item.status.toLowerCase()
          }">
            ${item.status}
          </span>

          <button
            class="soft-button toggle-assignment"
            data-id="${item.id}">
            ${
              item.status==="Submitted"
                ?"Reopen"
                :"Mark submitted"
            }
          </button>

        </div>

      </article>
    `;
  }).join("");
}

function renderTimetable(){
  const container=$("#timetableBody");

  if(!container)return;

  const days=[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const slots=[
    "09:00",
    "10:30",
    "12:00",
    "14:00",
    "15:30"
  ];

  container.innerHTML=
    days.map((day,dayIndex)=>`

      <div class="timetable-column">

        <div class="timetable-day">
          ${day}
          <small>
            Sep ${14+dayIndex}
          </small>
        </div>

        ${
          slots.map(
            (slot,slotIndex)=>{

              const item=
                data.classes[
                  (dayIndex+slotIndex)%
                  data.classes.length
                ];

              const show=
                (dayIndex+slotIndex)%3!==1;

              if(!show){
                return`
                  <div class="timetable-empty"></div>
                `;
              }

              return`
                <div class="timetable-class ${
                  item.color
                }">

                  <strong>${item.name}</strong>

                  <span>
                    ${slot} · ${item.room}
                  </span>

                </div>
              `;
            }
          ).join("")
        }

      </div>
    `).join("");
}

function renderAnnouncements(){
  const container=$("#announcementList");

  if(!container)return;

  container.innerHTML=data.announcements.map(item=>`
    <article class="announcement-card">

      <div class="announcement-card-icon">
        ${item.type==="Notice"?"!":"✦"}
      </div>

      <div>

        <div class="announcement-card-top">
          <span class="announcement-type">
            ${item.type}
          </span>

          <time>${formatDate(item.date)}</time>
        </div>

        <h3>${item.title}</h3>

        <p>${item.text}</p>

      </div>

      <button
        class="icon-button delete-announcement"
        data-id="${item.id}">
        ×
      </button>

    </article>
  `).join("");
}

function openModal(id){
  const modal=$(`#${id}`);

  if(modal){
    modal.classList.add("show");
  }
}

function closeAllModals(){
  $$(".modal.show").forEach(modal=>{
    modal.classList.remove("show");
  });
}

document.addEventListener("click",event=>{

  const nav=event.target.closest("[data-page]");

  if(nav){
    event.preventDefault();
    navigate(nav.dataset.page);
    return;
  }

  const target=event.target.closest(
    "[data-page-target]"
  );

  if(target){
    navigate(target.dataset.pageTarget);
    return;
  }

  const modalTrigger=
    event.target.closest("[data-modal]");

  if(modalTrigger){
    openModal(modalTrigger.dataset.modal);
    return;
  }

  if(
    event.target.closest(".modal-close")||
    event.target.classList.contains("modal")
  ){
    closeAllModals();
  }

  if(event.target.closest("#menuButton")){
    $("#sidebar")?.classList.toggle("open");
    $("#mobileBackdrop")?.classList.toggle("show");
  }

  if(event.target.closest("#mobileBackdrop")){
    $("#sidebar")?.classList.remove("open");
    $("#mobileBackdrop")?.classList.remove("show");
  }

  if(event.target.closest("#notificationButton")){
    toast("You have 3 new classroom notifications");
  }

  const deleteClass=
    event.target.closest(".delete-class");

  if(deleteClass){

    const id=
      Number(deleteClass.dataset.id);

    data.classes=
      data.classes.filter(item=>item.id!==id);

    save();
    renderAll();

    toast("Class removed");
  }

  const markClass=
    event.target.closest(".mark-class");

  if(markClass){

    const item=
      data.classes.find(
        classItem=>
          classItem.id===
          Number(markClass.dataset.id)
      );

    navigate("attendance");

    if(item){
      addActivity(
        "✓",
        "Attendance opened",
        item.name
      );
    }
  }

  const studentAction=
    event.target.closest(".table-action");

  if(studentAction){

    const student=
      data.students.find(
        item=>
          item.id===
          Number(studentAction.dataset.student)
      );

    if(student){
      toast(
        `${student.name} has ${student.attendance}% attendance`
      );
    }
  }

  const attendanceToggle=
    event.target.closest(".attendance-toggle");

  if(attendanceToggle){

    const present=
      attendanceToggle.dataset.present==="true";

    const student=
      data.students.find(
        item=>
          item.id===
          Number(attendanceToggle.dataset.student)
      );

    if(student){

      if(present){
        student.attendance=
          Math.max(
            0,
            student.attendance-1
          );
      }else{
        student.attendance=
          Math.min(
            100,
            student.attendance+1
          );
      }

      save();

      renderAttendance();

      toast(
        `${student.name} marked ${
          present?"absent":"present"
        }`
      );
    }
  }

  const deleteAssignment=
    event.target.closest(".delete-assignment");

  if(deleteAssignment){

    const id=
      Number(deleteAssignment.dataset.id);

    data.assignments=
      data.assignments.filter(
        item=>item.id!==id
      );

    save();
    renderAll();

    toast("Assignment removed");
  }

  const toggleAssignment=
    event.target.closest(".toggle-assignment");

  if(toggleAssignment){

    const item=
      data.assignments.find(
        assignment=>
          assignment.id===
          Number(toggleAssignment.dataset.id)
      );

    if(item){

      item.status=
        item.status==="Submitted"
          ?"Pending"
          :"Submitted";

      item.submissions=
        item.status==="Submitted"
          ?item.total
          :Math.min(
            item.submissions,
            item.total
          );

      save();

      renderAll();

      addActivity(
        "↗",
        "Assignment updated",
        item.title
      );

      toast(
        `Assignment marked ${
          item.status.toLowerCase()
        }`
      );
    }
  }

  const deleteAnnouncement=
    event.target.closest(
      ".delete-announcement"
    );

  if(deleteAnnouncement){

    const id=
      Number(deleteAnnouncement.dataset.id);

    data.announcements=
      data.announcements.filter(
        item=>item.id!==id
      );

    save();
    renderAll();

    toast("Announcement removed");
  }

  if(event.target.closest("#exportStudents")){
    exportStudents();
  }
});

function exportStudents(){

  const rows=[
    [
      "Name",
      "Roll",
      "Email",
      "Class",
      "Attendance",
      "Status"
    ],
    ...data.students.map(student=>[
      student.name,
      student.roll,
      student.email,
      student.class,
      `${student.attendance}%`,
      student.status
    ])
  ];

  const csv=
    rows.map(row=>
      row.map(value=>
        `"${String(value).replaceAll('"','""')}"`
      ).join(",")
    ).join("\n");

  const blob=
    new Blob(
      [csv],
      {type:"text/csv"}
    );

  const url=
    URL.createObjectURL(blob);

  const link=
    document.createElement("a");

  link.href=url;
  link.download=
    "smart-classroom-students.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  toast("Student list exported");
}

$("#classSearch")?.addEventListener(
  "input",
  renderClasses
);

$("#classStatus")?.addEventListener(
  "change",
  renderClasses
);

$("#classSort")?.addEventListener(
  "change",
  renderClasses
);

$("#studentSearch")?.addEventListener(
  "input",
  renderStudents
);

$("#studentStatus")?.addEventListener(
  "change",
  renderStudents
);

$("#assignmentSearch")?.addEventListener(
  "input",
  renderAssignments
);

$("#assignmentFilter")?.addEventListener(
  "change",
  renderAssignments
);

$("#attendanceClass")?.addEventListener(
  "change",
  renderAttendance
);

$("#attendanceDate")?.addEventListener(
  "change",
  ()=>{
    toast("Attendance date updated");
  }
);

$("#globalSearch")?.addEventListener(
  "keydown",
  event=>{

    if(event.key!=="Enter")return;

    const query=
      event.target.value.trim().toLowerCase();

    if(!query)return;

    const studentMatch=
      data.students.some(
        student=>
          `${student.name} ${student.roll}`
          .toLowerCase()
          .includes(query)
      );

    const classMatch=
      data.classes.some(
        item=>
          `${item.name} ${item.code}`
          .toLowerCase()
          .includes(query)
      );

    const assignmentMatch=
      data.assignments.some(
        item=>
          `${item.title} ${item.subject}`
          .toLowerCase()
          .includes(query)
      );

    if(studentMatch){

      navigate("students");

      if($("#studentSearch")){
        $("#studentSearch").value=query;
      }

      renderStudents();

    }else if(classMatch){

      navigate("classes");

      if($("#classSearch")){
        $("#classSearch").value=query;
      }

      renderClasses();

    }else if(assignmentMatch){

      navigate("assignments");

      if($("#assignmentSearch")){
        $("#assignmentSearch").value=query;
      }

      renderAssignments();

    }else{

      toast("No matching record found");
    }
  }
);

$("#classForm")?.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const form=
      new FormData(event.currentTarget);

    const item={
      id:Date.now(),
      name:form.get("name"),
      code:form.get("code"),
      teacher:form.get("teacher"),
      room:form.get("room"),
      time:form.get("time"),
      duration:60,
      status:"upcoming",
      color:[
        "purple",
        "blue",
        "mint",
        "peach"
      ][data.classes.length%4]
    };

    data.classes.push(item);

    save();

    event.currentTarget.reset();

    closeAllModals();

    renderAll();

    navigate("classes");

    addActivity(
      "＋",
      "New class created",
      item.name
    );

    toast("Class created successfully");
  }
);

$("#studentForm")?.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const form=
      new FormData(event.currentTarget);

    const item={
      id:Date.now(),
      name:form.get("name"),
      roll:form.get("roll"),
      email:form.get("email"),
      class:form.get("class")||"MCA A",
      attendance:100,
      status:"Active"
    };

    data.students.push(item);

    save();

    event.currentTarget.reset();

    closeAllModals();

    renderAll();

    navigate("students");

    addActivity(
      "＋",
      "New student added",
      `${item.name} · ${item.roll}`
    );

    toast("Student added successfully");
  }
);

$("#assignmentForm")?.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const form=
      new FormData(event.currentTarget);

    const item={
      id:Date.now(),
      title:form.get("title"),
      subject:form.get("subject"),
      due:form.get("due"),
      status:"Pending",
      submissions:0,
      total:data.students.length,
      priority:
        form.get("priority")||"Medium"
    };

    data.assignments.push(item);

    save();

    event.currentTarget.reset();

    closeAllModals();

    renderAll();

    navigate("assignments");

    addActivity(
      "＋",
      "New assignment created",
      item.title
    );

    toast(
      "Assignment created successfully"
    );
  }
);

$("#announcementForm")?.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const form=
      new FormData(event.currentTarget);

    const item={
      id:Date.now(),
      title:form.get("title"),
      text:form.get("text"),
      date:new Date()
        .toISOString()
        .slice(0,10),
      type:form.get("type")||"Academic"
    };

    data.announcements.unshift(item);

    save();

    event.currentTarget.reset();

    closeAllModals();

    renderAll();

    navigate("announcements");

    addActivity(
      "!",
      "New announcement",
      item.title
    );

    toast(
      "Announcement published successfully"
    );
  }
);

$("#markAllPresent")?.addEventListener(
  "click",
  ()=>{

    data.students.forEach(student=>{
      student.attendance=
        Math.min(
          100,
          student.attendance+1
        );
    });

    save();

    renderAttendance();

    toast(
      "All students marked present"
    );
  }
);

$("#saveAttendance")?.addEventListener(
  "click",
  ()=>{

    addActivity(
      "✓",
      "Attendance saved",
      "Today's classroom attendance"
    );

    toast(
      "Attendance saved successfully"
    );
  }
);

$("#compactMode")?.addEventListener(
  "change",
  event=>{

    document.body.classList.toggle(
      "compact",
      event.target.checked
    );

    localStorage.setItem(
      "smartClassroomCompact",
      String(event.target.checked)
    );
  }
);

$("#resetData")?.addEventListener(
  "click",
  ()=>{

    const confirmed=
      confirm(
        "Reset all demo classroom data?"
      );

    if(!confirmed)return;

    data=structuredClone(defaultData);

    save();

    renderAll();

    navigate("dashboard");

    toast("Demo data reset");
  }
);

document.addEventListener(
  "keydown",
  event=>{

    if(
      (event.ctrlKey||event.metaKey)&&
      event.key.toLowerCase()==="k"
    ){
      event.preventDefault();

      $("#globalSearch")?.focus();
    }

    if(event.key==="Escape"){
      closeAllModals();
    }
  }
);

const compactSaved=
  localStorage.getItem(
    "smartClassroomCompact"
  )==="true";

if(compactSaved){

  document.body.classList.add("compact");

  if($("#compactMode")){
    $("#compactMode").checked=true;
  }
}

function renderAll(){
  updateStats();
  renderSchedule();
  renderActivity();
  renderDashboardAssignments();
  renderDashboardAnnouncements();
  renderClasses();
  renderStudents();
  renderAttendance();
  renderAssignments();
  renderTimetable();
  renderAnnouncements();
}

const allowedPages=[
  "dashboard",
  "classes",
  "students",
  "attendance",
  "assignments",
  "timetable",
  "announcements",
  "settings"
];

const initialPage=
  allowedPages.includes(
    location.hash.replace("#","")
  )
    ?location.hash.replace("#","")
    :"dashboard";

renderAll();

navigate(initialPage);
