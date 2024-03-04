let inputDay = document.getElementById("day");
let inputMonth = document.getElementById("month");
let inputYear = document.getElementById("year");
let sumbitBtn = document.getElementById("submitBtn");
let labels = document.querySelectorAll("label");
let inputs = document.querySelectorAll("input");
let currentDate = new Date()
let currentYear = currentDate.getFullYear();

//COLOR
lightRed = getComputedStyle(document.documentElement).getPropertyValue('--light-red').trim()


// FUNCTIONS

function showDifferenceDates(currentDate, inputDate) {
    let yearsDiff = currentDate.getFullYear() - inputDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - inputDate.getMonth();
    let daysDiff = currentDate.getDate() - inputDate.getDate();

    //There can be negative months and days
    if (daysDiff < 0) {
        monthsDiff--;
        let lastMonthDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);
        daysDiff = lastMonthDate.getDate() - inputDate.getDate() + currentDate.getDate();
    }
    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    let numberDays = document.getElementById("resultDays");
    let numberMonths = document.getElementById("resultMonths");
    let numberYears = document.getElementById("resultYears");

    numberDays.innerHTML = daysDiff;
    numberMonths.innerHTML = monthsDiff;
    numberYears.innerHTML = yearsDiff;

    
    let daysCount = 0;
    let monthsCount = 0;
    let yearsCount = 0;

    let daysInterval = setInterval(() => {
        if (daysCount <= daysDiff) {
            numberDays.innerHTML = daysCount;
            daysCount++;
        } else {
            clearInterval(daysInterval);
        }
    }, 50); 

    let monthsInterval = setInterval(() => {
        if (monthsCount <= monthsDiff) {
            numberMonths.innerHTML = monthsCount;
            monthsCount++;
        } else {
            clearInterval(monthsInterval);
        }
    }, 80); 

    let yearsInterval = setInterval(() => {
        // If the difference is a lot, speed up
        if (yearsCount <= yearsDiff - 100) {
            numberYears.innerHTML = yearsCount;
            yearsCount += 20;
        } else if (yearsCount <= yearsDiff){
            numberYears.innerHTML = yearsCount;
            yearsCount++;
        } else {
            clearInterval(yearsInterval);
        }
    }, 1); 
}


function errorFieldRequired() {
    let inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        let parent = input.parentElement;
        let small = parent.querySelector("small")
        if (!input.value) {
            small.innerHTML = "This field is required"
            small.classList.remove("hidden")
        }
    });
}


function errorValidDate() {
    let day = parseInt(inputDay.value);
    let month = parseInt(inputMonth.value);
    let year = parseInt(inputYear.value);
    //Call function
    if (!day || !month || !year) {
        errorFieldRequired();
        return;
    }

    // If there´s a message error, hide it
    let allSmall = document.querySelectorAll("small")
    allSmall.forEach(small => {
        small.classList.add("hidden");
    });

    //Reset color of label text and input border
    labels.forEach(label => label.style.color = "")  
    inputs.forEach(input => input.style.borderColor = "")

    
    //Create an array for putting all the errors. 
    let errors = [] 
    

    let inputDate = new Date(year, month - 1, day);
    if (day > 31 || day < 1) {
    errors.push({ field: inputDay, message: "Must be a valid day" });
    }
    if (month > 12 || month < 1) {
        errors.push({ field: inputMonth, message: "Must be a valid month" });
    }
    if (year > currentYear || year < 1) {
         errors.push({ field: inputYear, message: "Must be in the past" });
    }
    //Check if that day actually exists
    if (!(inputDate.getFullYear() === year &&
    inputDate.getMonth() === month - 1 &&
    inputDate.getDate() === day)) {
        //If the "Must be a valid day" error doesn't exists in the array, you can push this error
        //Because if it exists and then we pass this error, it will overwrite the previous error
        if(!errors.some(e => e.message === "Must be a valid day"))
            errors.push({ field: inputDay, message: "Must be a valid date" });
    }


    // If there are errors, show them and stop
    if (errors.length > 0) {
        errors.forEach(error => {
                
            let parent = error.field.parentElement;
            let small = parent.querySelector("small");
            small.innerHTML = error.message;
            small.classList.remove("hidden");

            //Add color 
            labels.forEach(label => label.style.color = lightRed)
            inputs.forEach(input => input.style.borderColor = lightRed)
            })
        return;
    }    
    
    //No errors, show the difference
    showDifferenceDates(currentDate, inputDate);
}

// EVENT LISTENER
sumbitBtn.addEventListener("click", errorValidDate)

