const date = new Date();

var week = new Array();

const dayZero = '2022/01/30'; 

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
];

const teams = new Map();
teams.set('Suite', [false, true, false, false, true, false, false, false, true, false, true, true, false, false]);
teams.set('pro',   [true, false, true, false, false, false, false, true, false, true, true, false, false, false]);
teams.set('DBA',   [true, true, false, true, false, false, false, true, true, false, false, false, false, false]);
teams.set('Mobile',[true, true, false, true, false, false, false, true, true, false, false, false, false, false]);
teams.set('Dror',  [false, false, true, false, true, false, false, false, false, true, true, true, false, false]);
teams.set('QA',    [false, true, false, false, true, false, false, false, true, false, true, true, false, false]);
teams.set('Chaya', [false, true, true, true, false, false, false, false, true, true, false, false, false, false]);
teams.set('Analysis',[true, false, false, false, true, false, false, true, false, false, true, true, false, false]);
teams.set('Configuration',[false, true, true, true, false, false, false, false, true, true, false, false, false, false]);



const Datediff = (thisDay) => {
    var thisDay  = thisDay.toISOString().split('T')[0];
    thisDay = thisDay.split('-').join('/');
  
    var day1 = new Date(dayZero);
    var day2 = new Date(thisDay);
    
    return Math.round((day2 - day1)/(1000*60*60*24));
};

const AddDate = () => {
    document.querySelector(".currentDate h1").innerHTML = months[date.getMonth()];
    document.querySelector(".currentDate p").innerHTML = new Date().toDateString();
};

const BuildWeek = () => {
    var current = new Date();
    current.setDate((current.getDate() - current.getDay()));
    for (var i = 0; i < 14 ; i++) {
        week.push(new Date(current)); 
        current.setDate(current.getDate()+1);
    }
};

const BuildNumbersOfWeek = () => { 
    let days = "";

    for(let i = 0; i < 14 ; i++) {
        let nameDay = "num-" + week[i].toISOString().split('T')[0];
        let numberDay = week[i].getDate(); 
        days += `<div id="${nameDay}">${numberDay}</div>`;
    }

    document.querySelector(".currentDays").innerHTML = days;
};

const AddBorderToCurrentDay = () => {
    var idOfCurrentDay = "#num-" + week[new Date().getDay()].toISOString().split('T')[0];
    document.querySelector(idOfCurrentDay).classList.add("currentDay");
};

const FocusToTeamsSelect = () => {
    var elementTeams = document.getElementById("teams");
    elementTeams.addEventListener('change', (event) => {

        var selectedValue = elementTeams.options[elementTeams.selectedIndex].value;
        var arrayWorkDaysOffice = teams.get(selectedValue);
       
        //remove "officeWork" class
        for(let i = 0; i < 14 ; i++) {
            let id = "#num-" + week[i].toISOString().split('T')[0];
            if(document.querySelector(id) != null)
                document.querySelector(id).classList.remove("officeWork");
        }
    
        //add "officeWork" class
        for(let i = 0; i < 14 ; i++) {
            let day = document.querySelector(".currentDate p").innerHTML;
            day = day.split(' ')[3];

            let diffDay = Datediff(new Date(week[i]))%14;
                       
            if(arrayWorkDaysOffice[diffDay]) {
                let idNumberDay = "#num-" + week[i].toISOString().split('T')[0];
                if(document.querySelector(idNumberDay) != null)
                    document.querySelector(idNumberDay).classList.add("officeWork");  
            }    
        }
    });
};

const Calendar = () => {
    
    AddDate();


    BuildWeek();
    

    BuildNumbersOfWeek(); 
    

    AddBorderToCurrentDay();
    

    FocusToTeamsSelect();
};


Calendar(); 



