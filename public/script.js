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
    let datele=document.createElement("h3");
    let datedata=id.split('-').reverse().join('-');
    let datearr=id.split('-');
    let presentdate=new Date();
    let flag=false;;
    if(Number(datearr[0])>presentdate.getFullYear()){
       flag=true;
    }
    else if(presentdate.getFullYear()===Number(datearr[0])){
        if(presentdate.getMonth()+1<Number(datearr[1])){
            flag=true;
        }
        else if(presentdate.getMonth()+1===Number(datearr[1])){
            if(presentdate.getDate()<=Number(datearr[2])){
                flag=true;
            }
            else{
                flag=false;
            }
        }
        else{
            flag=false;
        }
    }
    else{
        flag=false;
    }
    datele.textContent=datedata;
    datele.style.textAlign="left";
    datele.style.paddingLeft="5px";
    hele.textContent="Subhojanam Booking";

    contentdiv.appendChild(hele);
    contentdiv.appendChild(datele);
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
      }).then(response=>{
        result=response.data;
        console.log(result);
        document.getElementById("viewcontent").style.display="none";
        let s=["BreakFast","Lunch","Dinner","FullDay"];
        for(let session_value of s){
            let outerdiv=document.createElement("div");
            let innerdiv=document.createElement("div");
            let h2ele=document.createElement("p");
            h2ele.classList.add("sessionheading");
            let Donor=document.createElement("p");
            Donor.id="don"+session_value;
            let phone=document.createElement("p");
            phone.id="pon"+session_value;
            h2ele.textContent=session_value;
            Donor.textContent="Donor Name : ----";
            phone.textContent="Devotee Name: --- ";
            let viewbutton=document.createElement("button");
            viewbutton.textContent="Book";
            viewbutton.id="btn"+session_value;
            viewbutton.classList.add("viewbutton");
            viewbutton.onclick = function(){
                let inputdate=document.getElementById("date");
                inputdate.readOnly=false;
                inputdate.value=id;
                inputdate.readOnly=true;
                let ele=session_value;
                    if(ele==="FullDay"){
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
                        // labelele.style.textDecoration = "line-through";
                        // sessionele=document.getElementById("FullDay");
                        // sessionele.disabled=true;
                        // labelele=sessionele.labels[0];
                        // console.log(labelele);
                        labelele.style.textDecoration = "line-through";
                    }
                    else if(ele==="BreakFast"){
                        // let sessionele=document.getElementById("BreakFast");
                        // sessionele.disabled=true;
                        // let labelele=sessionele.labels[0];
                        // console.log(labelele);
                        // labelele.style.textDecoration = "line-through";
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
                    else if(ele==="Lunch"){
                        let sessionele=document.getElementById("BreakFast");
                        sessionele.disabled=true;
                        let labelele=sessionele.labels[0];
                        console.log(labelele);
                        // labelele.style.textDecoration = "line-through";
                        // sessionele=document.getElementById("Lunch");
                        // sessionele.disabled=true;
                        // labelele=sessionele.labels[0];
                        // console.log(labelele);
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
                        let sessionele=document.getElementById("BreakFast");
                        sessionele.disabled=true;
                        let labelele=sessionele.labels[0];
                        console.log(labelele);
                        labelele.style.textDecoration = "line-through";
                        sessionele=document.getElementById("Lunch");
                        sessionele.disabled=true;
                        labelele=sessionele.labels[0];
                        console.log(labelele);
                        // labelele.style.textDecoration = "line-through";
                        // sessionele=document.getElementById("Dinner");
                        // sessionele.disabled=true;
                        // labelele=sessionele.labels[0];
                        // console.log(labelele);
                        labelele.style.textDecoration = "line-through";
                        sessionele=document.getElementById("FullDay");
                        sessionele.disabled=true;
                        labelele=sessionele.labels[0];
                        console.log(labelele);
                        labelele.style.textDecoration = "line-through";
                    }
                form.classList.add("popup");
                contentdiv.style.display="none";
            };   
            outerdiv.appendChild(h2ele);
            innerdiv.appendChild(Donor);
            innerdiv.appendChild(phone);
            outerdiv.id="id"+session_value;
            outerdiv.appendChild(innerdiv);
            outerdiv.appendChild(viewbutton);
            outerdiv.classList.add("outerdiv");
            innerdiv.classList.add("innerdiv");
            contentdiv.appendChild(outerdiv); 
        }
        if(result.length==0){
            console.log("resukt");
        }
        else{
            console.log(result);
            result.forEach(ele=>{
                let id_value=ele.Session;
                if(id_value=="FullDay"){
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
                    s.forEach(val=>{
                        if(val!="FullDay"){
                        let sbtn=document.getElementById("btn"+val);
                        sbtn.textContent="view";
                        sbtn.onclick=()=>{
                            alert("full day wad already booked");
                        }
                        }
                     })
                    
                }
                else{
                    s.forEach(val=>{
                        if(val=="FullDay"){
                        let sbtn=document.getElementById("btn"+val);
                        sbtn.textContent="view";
                        sbtn.onclick=()=>{
                            alert(id_value+" is already booked");
                        }
                        }
                     })
                }
                let donele=document.getElementById("don"+id_value);
                let ponele=document.getElementById("pon"+id_value);
                donele.textContent="Donor Name:"+ele.Donor_Name;
                ponele.textContent="Devotee Name:"+ele.Booked_By;
               
                let viewbutton=document.getElementById("btn"+id_value);
                 viewbutton.textContent="View";

                viewbutton.onclick=()=>{
                contentdiv.style.display="none";
                
                let viewcontent=document.getElementById("viewcontent");
                viewcontent.innerHTML="";
                let leftdiv=document.createElement("div");
                let rightdiv=document.createElement("div");

                let viewdateele=document.createElement("h2");
                viewdateele.textContent="Date  :"+datedata;

                let viewsessionele=document.createElement("p");
                viewsessionele.classList.add("sessionheading");
                viewsessionele.style.fontSize="25px";
                let viewDonorele=document.createElement("p");
                let phonenumber=document.createElement("p");
                let willattend=document.createElement("p");
                let bookedby=document.createElement("p");
                let sevak_name=document.createElement("p");
                let Donor_Id=document.createElement("p");
                let Ocassion=document.createElement("p");
                let Reciept_Number=document.createElement("p"); 
                  
                viewsessionele.textContent=ele.Session;
                viewsessionele.style.fontWeight= "bold";
                viewsessionele.style.textAlign="center";
                viewDonorele.textContent="Donor Name  : "+ele.Donor_Name;
                phonenumber.textContent="Phone  : "+ele.Phone;
                bookedby.textContent="Booked By  : "+ele.Booked_By;
                willattend.textContent="willattend  : "+ele.will_attend;
                sevak_name.textContent="Sevak_Name : "+ele.Sevak_Name;
                Donor_Id.textContent="Donor ID :  "+ele.Donor_id;
                Ocassion.textContent="Ocassion :  "+ele.Occassion;
                Reciept_Number.textContent="Reciept Number : "+ele.Reciept_Number;   
                

                leftdiv.appendChild(viewsessionele);
                leftdiv.appendChild(viewDonorele);
                leftdiv.appendChild(phonenumber);
                leftdiv.appendChild(bookedby);
                leftdiv.appendChild(willattend);

                rightdiv.appendChild(sevak_name);
                rightdiv.appendChild(Donor_Id);
                rightdiv.appendChild(Ocassion);
                rightdiv.appendChild(Reciept_Number);
                leftdiv.classList.add("leftdiv");
                rightdiv.classList.add("rightdiv");
            let viewclosebutton=document.createElement("button");
                 viewclosebutton.textContent="close";
                 viewclosebutton.style.color="white";
                viewclosebutton.classList.add("close");
             viewclosebutton.onclick=()=>{
                 location.href="/";
             }
               viewcontent.appendChild(viewdateele);
               viewcontent.appendChild(leftdiv);
               viewcontent.appendChild(rightdiv);
               viewcontent.appendChild(viewclosebutton);
               viewcontent.style.display="block";
                 }
             })
        }
        if(!flag){
         s.forEach(val=>{
            let sbtn=document.getElementById("btn"+val);
            sbtn.textContent="view";
            sbtn.onclick=()=>{
                alert("Booking cannot be done in completed days");
            }
         })
        }
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



