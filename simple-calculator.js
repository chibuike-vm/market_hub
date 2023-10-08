 /**
     * tableData: Contains the Necessary Global Data.
     * 
     * @tdData: NodeList that contains all the 'td' DOM objects.
     * @screenDisplay: DOM object that serves as screen. 
     */
 const tableData = {
    tdData: document.querySelectorAll(".td"),
    screenDisplay: document.getElementById("calc_display"),
    valueHolder: ""
};

/**
 * registerClickEven: Registers Click Event.
 * 
 * @inputContainer: Represents the 'td' DOM objects which serve as the
 * click event Listeners.
 * 
 * Description: This function basically registers the click event on 
 * 'td' DOM objects which serve as the event listeners.
 * 
 * Return: The function returns 'undefined' upon successful execution.
 */ 
function registerClickEvent(inputContainer) {
    inputContainer.addEventListener("click", function() {
        /* if tableData.valueHolder === "" */
        if (!(tableData.valueHolder)) {
            tableData.screenDisplay.textContent = tableData.valueHolder;
        }

        tableData.screenDisplay.textContent += inputContainer.textContent;
        tableData.valueHolder += inputContainer.textContent;
    });
}

/**
 * pushLeadingZeros: Pushes Leading Zeros to the arrVariable.
 * 
 * @counter: This parameter represents the loop counter.
 * @arrVariable: This parameter repesents the arrVariable that holds the
 * leading zeros as array elements.
 * 
 * Description: This Function basically checks the data input by the user
 * for leading zeros, then pushes them if found into the arrVariable.
 * 
 * Return: The function returns 'undefined' upon successful execution.
 */
function pushLeadingZeros(counter, arrVariable) {
    let firstAfterOperator = tableData.storedValueHolder[counter + 1];
    let secondAfterOperator = tableData.storedValueHolder[counter + 2];
    let found;

    if (Number(firstAfterOperator) === 0 && Number(secondAfterOperator) >= 0) {
        found = firstAfterOperator;
        arrVariable.push(found);
    }
}

/**
 * pushRecurringOperators: Pushes Arithmetic Operators to the arrVariable.
 * 
 * @counter: This parameter represents the loop counter.
 * @arrVariable: This parameter repesents the arrVariable that holds the 
 * operators as array elements.
 * @arithOperator: This parameter represents the arithmetic operators to look 
 * out for.
 * 
 * Description: This Function checks the data entered by the user for recurring 
 * operators and operators that were not followed immediately by number values, 
 * then pushes them if found into the arrVariable.
 * 
 * Return: The function returns 'undefined' upon successful execution.
 */
function pushRecurringOperators(counter, arrVariable, arithOperator) {
    let firstAfterOperator = tableData.storedValueHolder[counter + 1];
    let found;

    if (firstAfterOperator === arithOperator) {
        found = firstAfterOperator;
        arrVariable.push(found);
    }

    if (firstAfterOperator === undefined) {
        arrVariable.push(arithOperator);
    }
}

 /**
 * detectingLeadingOperators: Pushes Arithmetic Operators to the arrVariable.
 * 
 * @counter: This parameter represents the loop counter.
 * @arrVariable: This parameter repesents the arrVariable that holds the 
 * operators as array elements.
 * @arithOperator: This parameter represents the arithmetic operators to look 
 * out for.
 * 
 * Description: This Function checks the data entered by the user for leading
 * operators, then pushes them if found into the arrVariable.
 * 
 * Return: The function returns 'undefined' upon successful execution.
 */
function detectingLeadingOperators(counter, arrVariable, arithOperator) {
    let firstAfterOperator = tableData.storedValueHolder[counter - 1];

    if (firstAfterOperator === undefined) {
        arrVariable.push(arithOperator);
    }
}


/**
 * findOperator: Searches for Arithmetic Operators.
 * 
 * @itemToFind: This parameter represents parsed data during the arrVariable loop 
 * search.
 * 
 * Description: This Function searches for arithmetic operators, then returns the 
 * arithmetic operator if found.
 * 
 * Return: This Function returns the found arithmetic operator.
 */
function findOperator(itemToFind) {
    if (itemToFind === "+" || itemToFind === "*" || itemToFind === "-" || itemToFind === "/" ) {
        return itemToFind;
    }
}

 /**
 * findZero: Searches for Leading Zeros.
 * 
 * @itemToFind: This parameter represents parsed data during the arrVariable loop 
 * search.
 * 
 * Description: This Function searches for Leading Zeros, then returns the 
 * Leading Zeros if found.
 * 
 * Return: This Function returns the found Leading Zeros.
 */
function findZero(itemToFind) {
    if (itemToFind === "0") {
        return itemToFind;
    }
}

/** 
 * sanitizer: Sanitizes User's Data Input before Being Computed.
 * 
 * Description: This function sanitizes user's data input to make sure its to
 * be passed into the 'eval' to be computed. The user input data sanitization
 * became very necessary owing to the dangers the 'eval' function can predipose
 * the program to, if a user happens to be a bad actor.
 * 
 * Return: This function returns the string "its safe to compute" upon successful
 * execution.
 */ 
function sanitizer() {
    let strippedData = "";
    let sanitizeHelper = [];
    let arithOp;
   
    for (let i = 0; i < tableData.valueHolder.length; i++) {
        if (tableData.storedValueHolder[0] === "0" && Number(tableData.storedValueHolder[1]) >= 0) {
            tableData.screenDisplay.textContent = "Leading zeros not allowed! 'Clear Screen' and try again.";
            return "Leading zeros not allowed! 'Clear Screen' and try again.";
        }

        if (tableData.valueHolder[i] === "+") {
            pushLeadingZeros(i, sanitizeHelper);
            pushRecurringOperators(i, sanitizeHelper, "+");
            continue;
        }

        if (tableData.valueHolder[i] === "/") {
            pushLeadingZeros(i, sanitizeHelper);
            pushRecurringOperators(i, sanitizeHelper, "/");
            detectingLeadingOperators(i, sanitizeHelper, "/");
            continue;
        }

        if (tableData.valueHolder[i] === "-") {
            pushLeadingZeros(i, sanitizeHelper);
            pushRecurringOperators(i, sanitizeHelper, "-");
            continue;
        }

        if (tableData.valueHolder[i] === "*") {
            pushLeadingZeros(i, sanitizeHelper);
            pushRecurringOperators(i, sanitizeHelper, "*");
            detectingLeadingOperators(i, sanitizeHelper, "*");
            continue;
        }

        if (tableData.valueHolder[i] === ".") {
            continue;
        }

        strippedData += tableData.valueHolder[i];
    }

    if (sanitizeHelper.find(findZero) === "0") {
        tableData.screenDisplay.textContent = "Leading zeros not allowed! 'Clear Screen' and try again";
        return "Leading zeros not allowed! 'Clear Screen' and try again";
    }

    arithOp = sanitizeHelper.find(findOperator);

    if (arithOp === "+" || arithOp === "*" || arithOp === "-" || arithOp === "/" ) {
        tableData.screenDisplay.textContent = "Invalid input! 'Clear Screen' and try again";
        return "Invalid input! 'Clear Screen' and try again";
    }

    for (let i = 0; i < strippedData.length; i++) {
        if (isNaN(Number(strippedData[i]))) {
            tableData.screenDisplay.textContent = "Invalid input! 'Clear Screen' and try again";
            return "Invalid input! 'Clear Screen' and try again";
        } 
    }
    
    return "its safe to compute";
}   

for (let i = 0; i <= 17; i++) { 
    if (i === 3 || i === 7 || i === 14) {
        i += 1;
    }
    
    registerClickEvent(tableData.tdData[i]);
}

tableData.tdData[7].addEventListener("click", function() {
    tableData.storedValueHolder = tableData.valueHolder;
    let validator = sanitizer();

    if (validator === "its safe to compute") {
        if (tableData.valueHolder) {
            tableData.result = eval(tableData.valueHolder);
            tableData.screenDisplay.textContent = tableData.result;
        }
        
        tableData.valueHolder = "";
    }
});

tableData.tdData[3].addEventListener("click", function() {
    if (tableData.screenDisplay.textContent) {
        tableData.screenDisplay.textContent = tableData.screenDisplay.textContent.slice(0, -1);
        tableData.valueHolder = tableData.valueHolder.slice(0, -1);
    }
});

tableData.tdData[14].addEventListener("click", function() {
    if (tableData.screenDisplay.textContent) {
        tableData.screenDisplay.textContent = "";
        tableData.valueHolder = "";
    }
}); 
