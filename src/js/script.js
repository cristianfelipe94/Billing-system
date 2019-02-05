(function () {
    const tableContent = document.getElementById('js-tableBody-content');
    const totalContent = document.getElementById('js-totalBody-content');

    const inputName = document.getElementById('js-name-input');
    const inputAmount = document.getElementById('js-amount-input');
    const inputDate = document.getElementById('js-date-input');
    const inputType = document.getElementById('js-type-input');

    const resetBtn = document.getElementById('js-reset-btn');
    const saveBtn = document.getElementById('js-save-btn');

    // Main array, where bills are going to be stored.
    const billsArray = [];

    // This arrays are for every Bill Type.
    // To store the result of every adding.
    const arrayTypeA = [0];
    const arrayTypeB = [0];
    const arrayTypeC = [0];

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
        if (elementTypeKey === 'a') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeA[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeA.pop();
            arrayTypeA.push(sumTotal);
            console.log(arrayTypeA);
        } else if (elementTypeKey === 'b') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeB[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeB.pop();
            arrayTypeB.push(sumTotal);
            console.log(arrayTypeB);
        } else if (elementTypeKey === 'c') {
            const amountParsed = parseInt(elementAmountKey, 0);
            const amountTotalParsed = parseInt(arrayTypeC[0], 0);
            const sumTotal = amountParsed + amountTotalParsed;
            arrayTypeC.pop();
            arrayTypeC.push(sumTotal);
            console.log(arrayTypeC);
        }
    }

    function resetValues() {
        inputName.value = '';
        inputAmount.value = '';
        inputDate.value = '';
        inputType.value = '';
    }

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
