const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
// const axios = require('axios/dist/browser/axios.cjs'); 



// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


// storing full name of all months in array
const months = [ "January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "curr" : "";
        let presMonth=currMonth+1;
        if(presMonth<10){
            presMonth="0"+presMonth.toString();
        }
        let presdate=i;
        if(i<10){
            presdate="0"+presdate.toString();
        }
        let dateid=currYear.toString()+"-"+presMonth+"-"+presdate.toString();
        liTag += `<li class="${isToday} activedates dates" id="${dateid}" onclick="selecteddate(this.id)">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 1 || currMonth>11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            // if(currMonth>11){
            //     currMonth=1;
            //     currYear=currYear+1;
            //     date = new Date(currYear, currMonth, new Date().getDate());
            //     currYear = date.getFullYear(); // updating current year with new date year
            //     currMonth = date.getMonth();
            //     console.log(date);
            // }
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

function selecteddate(id) {
    let form=document.getElementById("formcont");
    let contentdiv=document.getElementById("content");
    contentdiv.innerHTML="";
    let hele=document.createElement("h1");
    hele.textContent="Subhojanam Booking";
    contentdiv.appendChild(hele);
    let element = document.getElementById(id);
    let dates = document.querySelectorAll(".dates");
    dates.forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
    const data = {
        date:id,
    };
    let result="";
    axios.post('/events',data,{
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        result=response.data;
        if(result.length==0){
            console.log("hello");
            let divele=document.createElement("div");
            let passageele=document.createElement("p");
            passageele.innerText="No slots booked";
            passageele.classList.add("sessionheading");
            divele.appendChild(passageele);
            contentdiv.appendChild(divele);
        }
        else{
            result.forEach(ele=>{
                let outerdiv=document.createElement("div");
                let innerdiv=document.createElement("div");
                let leftdiv=document.createElement("div");
                let rightdiv=document.createElement("div");
                let h2ele=document.createElement("p");
                h2ele.classList.add("sessionheading");
                let donar=document.createElement("p");
                let phone=document.createElement("p");
                let willattend=document.createElement("p");
                let bookedby=document.createElement("p");
                let sevak_name=document.createElement("p");
                let Donar_Id=document.createElement("p");
                let Ocassion=document.createElement("p");
                let Reciept_Number=document.createElement("p");
             

                h2ele.textContent=ele.Session;
                donar.textContent="Donar Name : "+ele.Donar_Name
                phone.textContent="Phone : "+ele.Phone;
                bookedby.textContent="Booked By : "+ele.Booked_By;
                willattend.textContent="willattend : "+ele.will_attend;
                sevak_name.textContent="Sevak_Name : "+ele.Sevak_Name;
                Donar_Id.textContent="Donar ID : "+ele.Donar_id;
                Ocassion.textContent="Ocassion : "+ele.Occassion;
                Reciept_Number.textContent="Reciept Number : "+ele.Reciept_Number;


                outerdiv.appendChild(h2ele);
                leftdiv.appendChild(donar);
                leftdiv.appendChild(phone);
                leftdiv.appendChild(bookedby);
                leftdiv.appendChild(willattend);

                rightdiv.appendChild(sevak_name);
                rightdiv.appendChild(Donar_Id);
                rightdiv.appendChild(Ocassion);
                rightdiv.appendChild(Reciept_Number);

                innerdiv.appendChild(leftdiv);
                innerdiv.appendChild(rightdiv);
                outerdiv.appendChild(innerdiv);
                leftdiv.classList.add("leftdiv");
                rightdiv.classList.add("rightdiv");
                outerdiv.classList.add("outerdiv");
                innerdiv.classList.add("innerdiv");
               contentdiv.appendChild(outerdiv);
            })
        }
        let buttondivele=document.createElement("div");
        buttondivele.classList.add("buttonele");
        let btnele=document.createElement("button");
        btnele.textContent="+";
        buttondivele.appendChild(btnele);
        console.log('Response from server:',result);
        btnele.onclick = function(){
            // let Session=document.getElementsByTagName("input");
            // Session.forEach(ele=>{
            //     ele.required=true;
            // })
            let inputdate=document.getElementById("date");
            inputdate.readOnly=false;
            inputdate.value=id;
            inputdate.readOnly=true;
            console.log(result);
            result.forEach(ele=>{
                if(ele.Session==="FullDay"){
                    let sessionele=document.getElementById("BreakFast");
                    sessionele.disabled=true;
                    let labelele=sessionele.labels[0];
                    console.log(labelele);
                    labelele.style.textDecoration = "line-through";
                    sessionele=document.getElementById("Lunch");
                    sessionele.disabled=true;
                    labelele=sessionele.labels[0];
                    console.log(labelele);
                    labelele.style.textDecoration = "line-through";
                    sessionele=document.getElementById("Dinner");
                    sessionele.disabled=true;
                    labelele=sessionele.labels[0];
                    console.log(labelele);
                    labelele.style.textDecoration = "line-through";
                    sessionele=document.getElementById("FullDay");
                    sessionele.disabled=true;
                    labelele=sessionele.labels[0];
                    console.log(labelele);
                    labelele.style.textDecoration = "line-through";
                }
                else{
                   let sessionele=document.getElementById(ele.Session);
                   sessionele.disabled=true;
                   let labelele=sessionele.labels[0];
                   labelele.style.textDecoration = "line-through";
                   sessionele=document.getElementById("FullDay");
                   sessionele.disabled=true;
                    labelele=sessionele.labels[0];
                   labelele.style.textDecoration = "line-through";
                }
            })
            form.classList.add("popup");
            contentdiv.style.display="none";
        };
        contentdiv.appendChild(buttondivele);
        contentdiv.style.display="block";
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error submitting data!');
      });
    
}

function close(){
    let Session=document.getElementsByTagName("input");
    Session.forEach(ele=>{
        ele.required=false;
    })
    let element=document.getElementById("formcont");
    element.reset();
}



