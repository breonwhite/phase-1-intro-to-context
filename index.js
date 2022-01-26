function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfObjects = [];
    
    for (let record of arrayOfArrays) {
    let newRecord = createEmployeeRecord(record);
    arrayOfObjects.push(newRecord);
    };
    
    return arrayOfObjects;
};


function createTimeInEvent(object, time) {
    // let timeIn = formatTime(time);
    let splitTime = time.split(" ");
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    };
    object.timeInEvents.push(timeEvent);
    return object;
};

function createTimeOutEvent(object, time) {
    let splitTime = time.split(" ");
    let timeEvent = {
        type: "TimeOut",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    };
    object.timeOutEvents.push(timeEvent);
    return object;
};

function hoursWorkedOnDate(object, time) {
    let objtimeIn = object.timeInEvents.find((e) => e.date === time).hour
    let objtimeOut = object.timeOutEvents.find((e) => e.date === time).hour
    return (objtimeOut - objtimeIn)/100
};

function wagesEarnedOnDate(obj, dateYMD){

    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}