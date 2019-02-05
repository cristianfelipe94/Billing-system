(function () {
    const tableContent = document.getElementById('js-tableBody-content');
    const totalContent = document.getElementById('js-totalBody-content');

    const inputName = document.getElementById('js-name-input');
    const inputAmount = document.getElementById('js-amount-input');
    const inputDate = document.getElementById('js-date-input');
    const inputType = document.getElementById('js-type-input');

    const nameSortBtn = document.getElementById('js-name-order');
    const amountSortBtn = document.getElementById('js-amount-order');
    const typeSortBtn = document.getElementById('js-type-order');

    const resetBtn = document.getElementById('js-reset-btn');
    const saveBtn = document.getElementById('js-save-btn');

    // Main array, where bills are going to be stored.
    const billsArray = [];

    // This arrays are for every Bill Type.
    // To store the result of every adding.
    const arrayTypeA = [0];
    const arrayTypeB = [0];
    const arrayTypeC = [0];

    let toggleNameState = true;
    let toggleTypeState = true;
    let toggleAmountState = true;

    function NewBill(nameKey, typeKey, dateKey, amountKey) {
        this.nameKey = nameKey;
        this.typeKey = typeKey;
        this.dateKey = dateKey;
        this.amountKey = amountKey;
    }

    function createBillDom(billArrayKey) {
        billArrayKey.forEach(element => {
            const newTableRow = document.createElement('tr');
            for (const keyValue in element) {
                const newTableCellValue = document.createElement('td');

                newTableCellValue.innerHTML = element[keyValue];
                newTableCellValue.setAttribute('class', 'table-cells');

                newTableRow.appendChild(newTableCellValue);
                newTableRow.setAttribute('class', 'table-rows');


                tableContent.appendChild(newTableRow);
            }
        });
    }

    function createBillTotalDom(billArrayKey, billTypeKey) {
        billArrayKey.forEach(element => {
            const newTableRow = document.createElement('tr');
            const newTypeCellValue = document.createElement('td');
            const newAmountCellValue = document.createElement('td');

            newAmountCellValue.innerHTML = element;
            newTypeCellValue.innerHTML = billTypeKey;

            newAmountCellValue.setAttribute('class', 'table-cells');
            newTypeCellValue.setAttribute('class', 'table-cells');
            newTableRow.setAttribute('class', 'table-rows');

            newTableRow.appendChild(newTypeCellValue);
            newTableRow.appendChild(newAmountCellValue);

            totalContent.appendChild(newTableRow);
        });
    }

    // This function will add new bill's amounts into an array.
    // Every array is for as ingle Type of bill.
    // Parameters: elementTypeKey = Type of bill.
    // Parameters: elementAmountKey = New amount to be added.
    function createTotalBillDom(elementTypeKey, elementAmountKey) {
        if (elementTypeKey === 'A') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeA[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeA.pop();
            arrayTypeA.push(sumTotal);
        } else if (elementTypeKey === 'B') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeB[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeB.pop();
            arrayTypeB.push(sumTotal);
        } else if (elementTypeKey === 'C') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeC[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeC.pop();
            arrayTypeC.push(sumTotal);
        }
    }

    function resetValues() {
        inputName.value = '';
        inputAmount.value = '';
        inputDate.value = '';
        inputType.value = '';
    }

    function sortByNameForward() {
        const sortedByName = billsArray.sort(function (a, b) {
            const nameOne = a.nameKey.toUpperCase();
            const nameTwo = b.nameKey.toUpperCase();
            if (nameOne < nameTwo) {
                return -1;
            } else if ( nameOne > nameTwo) {
                return 1;
            } else return 0;
        });
        return sortedByName;
    }

    function sortByNameBackward() {
        const sortedByName = billsArray.sort(function (a, b) {
            const nameOne = a.nameKey.toUpperCase();
            const nameTwo = b.nameKey.toUpperCase();
            if (nameOne > nameTwo) {
                return -1;
            } else if ( nameOne < nameTwo) {
                return 1;
            } else return 0;
        });
        return sortedByName;
    }

    function sortByTypeForward() {
        const sortedByType = billsArray.sort(function (a, b) {
            const typeOne = a.typeKey.toUpperCase();
            const typeTwo = b.typeKey.toUpperCase();
                if (typeOne < typeTwo) {
                    return -1;
                } else if ( typeOne > typeTwo) {
                    return 1;
                } else {
                    return 0;
                }
        });
        return sortedByType;
    }

    function sortByTypeBackward() {
        const sortedByType = billsArray.sort(function (a, b) {
            const typeOne = a.typeKey.toUpperCase();
            const typeTwo = b.typeKey.toUpperCase();
                if (typeOne > typeTwo) {
                    return -1;
                } else if ( typeOne < typeTwo) {
                    return 1;
                } else {
                    return 0;
                }
        });
        return sortedByType;
    }

    function sortByAmountForward() {
        const sortedByAmount = billsArray.sort(function (a, b) {
            return a.amountKey - b.amountKey;
        });
        return sortedByAmount;
    }

    function sortByAmountBackward() {
        const sortedByAmount = billsArray.sort(function (a, b) {
            return b.amountKey - a.amountKey;
        });
        return sortedByAmount;
    }

    nameSortBtn.addEventListener('click', function () {
        tableContent.innerHTML = '';
        if (toggleNameState === true) {
            createBillDom(sortByNameForward());
            toggleNameState = false;
        } else if (toggleNameState === false) {
            createBillDom(sortByNameBackward());
            toggleNameState = true;
        }
    });

    typeSortBtn.addEventListener('click', function () {
        tableContent.innerHTML = '';
        if (toggleTypeState === true) {
            createBillDom(sortByTypeForward());
            toggleTypeState = false;
        } else if (toggleTypeState === false) {
            createBillDom(sortByTypeBackward());
            toggleTypeState = true;
        }
    });

    amountSortBtn.addEventListener('click', function () {
        tableContent.innerHTML = '';
        if (toggleAmountState === true) {
            createBillDom(sortByAmountForward());
            toggleAmountState = false;
        } else if (toggleAmountState === false) {
            createBillDom(sortByAmountBackward());
            toggleAmountState = true;
        }
    });


    resetBtn.addEventListener('click', function () {
        resetValues();
    });

    // This function will check if Inputs has information.
    // Return: True if any of them is empty.
    // Return: False if all of them are completed.
    function checkInputs() {
        if (inputName.value &&
            inputAmount.value &&
            inputDate.value &&
            inputType.value === '') {
            return true;
        } else if (inputName.value &&
            inputAmount.value &&
            inputDate.value &&
            inputType.value !== '') {
            return false;
        } else return true;
    }

    saveBtn.addEventListener('click', function () {
        if (checkInputs()) {
            alert("Error por favor segurese de ingresar toda la información.");
        } else if (!checkInputs()) {
            const newTableCellName = inputName.value;
            const newTableCellType = inputType.value;
            const newTableCellDate = inputDate.value;
            const newTableCellAmount = inputAmount.value;

            const newBillElement = new NewBill(
                newTableCellName,
                newTableCellType,
                newTableCellDate,
                newTableCellAmount,
            );

            billsArray.push(newBillElement);
            console.log(billsArray);

            tableContent.innerHTML = '';
            totalContent.innerHTML = '';

            createBillDom(billsArray);

            createTotalBillDom(newTableCellType, newTableCellAmount);

            createBillTotalDom(arrayTypeA, 'A');
            createBillTotalDom(arrayTypeB, 'B');
            createBillTotalDom(arrayTypeC, 'C');

            resetValues();
        }
    });

} ());
