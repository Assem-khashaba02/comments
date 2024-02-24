const add = document.querySelector(".add"),
popup = document.querySelector(".popup-app"),
titelpopup = popup.querySelector(".header_popup h4"),
close = popup.querySelector(".close"),
textarea = document.querySelector("textarea"),
button = document.querySelector("button"),
input = document.querySelector("input"),
audio = new Audio("ad.mp3");

const Notes = JSON.parse(localStorage.getItem("Notes")|| "[]") ;


// const Notes =JSON.parse(localStorage.getItem("Notes"));
console.log(Notes)

add.addEventListener("click",() =>{
popup.classList.add("open");
button.innerText="اضف";
titelpopup.innerText="اضف ملحوظه جديده";
textarea.value = '';
input.value = '';
});

close.addEventListener("click",() =>{
    popup.classList.remove("open");
    isEdit = false;
});



let idEdit,
isEdit = false;




const month = [
    "يناير",
    "فبرير",
    "مارس",
    "ابريل",
    "مايو",
    "يوليو",
    "اغسطس",
    "سبتمبر",
    "اكتوبر",
    "نوفمبر",
    "ديسمبر",
];





function addNote(e){
    e.preventDefault();
    let title = input.value.trim(),
    description = textarea.value.trim();
    if(title && description){
        let date = new Date(),
        months= month[date.getMonth()],
        day = date.getDate(),
        year =date.getFullYear();
        let noteinfo = {
            title,
            description,
            date: `${year}, ${months}, ${day}`,
        };
       
        Notes.push(noteinfo); // قم بإضافة الملاحظة إلى المصفوفة
        localStorage.setItem("Notes",JSON.stringify(Notes));
        audio.play();
        showNotes();
        close.click();
    }
}




button.addEventListener("click",addNote);
function addNote(e){
e.preventDefault();
let title = input.value.trim(),
description = textarea.value.trim();
if(title && description){
    let date = new Date(),
   months= month[date.getMonth()],
   day = date.getDate(),
   year =date.getFullYear();
   let noteinfo = {
    title,
    description,
    date: `${year}, ${months}, ${day}`,
   };



   if(isEdit){
    Notes[idEdit] = noteinfo;
   }else{

    Notes.push(noteinfo);
   }
   
   localStorage.setItem("Notes",JSON.stringify(Notes));
   audio.play();
   showNotes();
   close.click();
   
}
}
function showNotes() {
    document.querySelectorAll(".card").forEach((card) => card.remove());
    if(!Notes)  return;

    Notes.forEach((Notes , idx) => {
        
        let card =`
        <div class="card card-style">
    <div class="card_content">
        <h4>${Notes.title}</h4>
        <p>${Notes.description}</p>
    </div>
    <div class="card_details">
        <span>${Notes.date}</span>
        <div class="menu-app">
            <i class='bx bx-dots-horizontal-rounded'></i>
            <ui class="menu">
                <li onclick="editNote(${idx},'${Notes.title}','${Notes.description}')"><i class='bx bx-edit-alt' id="g"></i>تعديل</li>
                <li onclick="removeNote(${idx})"><i class='bx bx-trash-alt' id="r"></i>حذف</li>
            </ui>
           
        </div>
    </div>
</div>`;
add.insertAdjacentHTML('afterend', card);

  });
}
 showNotes(); 


function removeNote(idNote) {
let confrimD = confirm("هل تريد حذف الملحوظه");
if(!confrimD) return;
Notes.splice(idNote, 1);
localStorage.setItem('Notes',JSON.stringify(Notes));
showNotes();
}

function editNote(idNote , title ,description){
    isEdit = true;
    idEdit = idNote;
add.click();
button.innerText="تحديث"
titelpopup.innerText="تحديث الملحوظة";
textarea.value = description;
input.value = title;
}


