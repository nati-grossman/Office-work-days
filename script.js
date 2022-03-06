const date = new Date();

var week = new Array();

var arraySpecialDays = [];
// ימי דממה בעבודה
arraySpecialDays.push("2022-09-14");
arraySpecialDays.push("2022-09-15");
arraySpecialDays.push("2022-09-16");
arraySpecialDays.push("2022-09-17");
arraySpecialDays.push("2022-09-18");
arraySpecialDays.push("2022-09-19");
arraySpecialDays.push("2022-09-20");
arraySpecialDays.push("2022-09-21");

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
teams.set('B',        [false, true, false, false, true, false, false, false, true, false, true, true, false, false]);
teams.set('C',          [true, false, true, false, false, false, false, true, false, true, true, false, false, false]);
teams.set('D',          [true, true, false, true, false, false, false, true, true, false, false, false, false, false]);
teams.set('E',       [true, true, false, true, false, false, false, true, true, false, false, false, false, false]);
teams.set('A',         [false, false, true, false, true, false, false, false, false, true, true, true, false, false]);
teams.set('F',           [false, true, false, false, true, false, false, false, true, false, true, true, false, false]);
teams.set('G',        [false, true, true, true, false, false, false, false, true, true, false, false, false, false]);
teams.set('H',     [true, false, false, false, true, false, false, true, false, false, true, true, false, false]);
teams.set('I',[false, true, true, true, false, false, false, false, true, true, false, false, false, false]);



//Math.round() method round off number passed as parameter to its nearest integer so as to get lower value.
//Math.ceil()  method round off number passed as parameter to its nearest integer so as to get greater value.
const Datediff = (thisDay) => {
    var day1 = new Date(dayZero);
    var day2 = new Date(thisDay.getFullYear(), thisDay.getMonth(), thisDay.getDate());
    
    return Math.round(Math.abs(day2 - day1)/(1000*60*60*24));
    //return Math.ceil(Math.abs(day2 - day1)/(1000*60*60*24));
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

    for(let i = 0; i < 7 ; i++) {
        let nameDay = "num-" + week[i].toISOString().split('T')[0];
        let numberDay = week[i].getDate(); 
        days += `<div id="${nameDay}">${numberDay}</div>`;
    }

    document.querySelector("#firstWeek").innerHTML = days;

    days = "";
    for(let i = 7; i < 14 ; i++) {
        let nameDay = "num-" + week[i].toISOString().split('T')[0];
        let numberDay = week[i].getDate(); 
        days += `<div id="${nameDay}">${numberDay}</div>`;
    }

    document.querySelector("#secondWeek").innerHTML = days;
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
            if(document.querySelector(id) != null) {
                document.querySelector(id).classList.remove("officeWork");
                document.querySelector(id).classList.remove("specialDays");
            }
        }
    
        //add "officeWork" class
        for(let i = 0; i < 14 ; i++) {
            let diffDay = (Datediff(new Date(week[i])))%14;  
            let idNumberDay = "#num-" + week[i].toISOString().split('T')[0];      
            if(arrayWorkDaysOffice[diffDay]) {
                if(document.querySelector(idNumberDay) != null &&
                !arraySpecialDays.includes(week[i].toISOString().split('T')[0])) {
                    document.querySelector(idNumberDay).classList.add("officeWork");
                }  
            }  
            if(arraySpecialDays.includes(week[i].toISOString().split('T')[0])) {
                document.querySelector(idNumberDay).classList.add("specialDays");
            }  
        }
    });
};


const SpecialDays = () => {  

    let currentMonth = new Date().getMonth()+1;

    fetch(`https://www.hebcal.com/hebcal?v=1&cfg=json&min=on&maj=on&i=on&mod=on&year=2022&month=${currentMonth}&geonameid=281184`)
    .then(response => response.json())
    .then(result => {
        let length = result["items"].length;
        for(let i=0; i<length; i++) 
        {
            let category = result["items"][i]["category"];
            if(category == "holiday") {
                arraySpecialDays.push(result["items"][i]["date"]);
            }
        }
        //arraySpecialDays.forEach(value => console.log(value));     
    }).catch(error => console.log('error', error));
}


const Calendar = () => {
    
    AddDate();


    BuildWeek();
    

    BuildNumbersOfWeek(); 
    

    AddBorderToCurrentDay();
    

    SpecialDays();


    FocusToTeamsSelect();
};


Calendar(); 



