(function () {
    const tableContent = document.getElementById('js-tableBody-content');
    const inputName = document.getElementById('js-name-input');
    const inputAmount = document.getElementById('js-amount-input');
    const inputDate = document.getElementById('js-date-input');
    const inputType = document.getElementById('js-type-input');

    const resetBtn = document.getElementById('js-reset-btn');
    const saveBtn = document.getElementById('js-save-btn');

    const billsArray = [];

    function NewBill(nameKey, typeKey, dateKey, amountKey) {
        this.nameKey = nameKey;
        this.typeKey = typeKey;
        this.dateKey = dateKey;
        this.amountKey = amountKey;
    }

    function createBillDom() {
        billsArray.forEach(element => {
            const newTableRow = document.createElement('tr');
            newTableRow.setAttribute('class', 'tableRowElement');
            for (const keyValue in element) {
                const newTableCellValue = document.createElement('td');

                newTableCellValue.innerHTML = element[keyValue];

                newTableRow.appendChild(newTableCellValue);

                tableContent.appendChild(newTableRow);
            }
        });
    }

    resetBtn.addEventListener('click', function () {
        console.log('reset');
        inputName.value = '';
        inputAmount.value = '';
        inputDate.value = '';
        inputType.value = '';
    });

    function checkInputs() {
        if (inputName.value && inputAmount.value && inputDate.value && inputType.value === '') {
            return true;
        } else if (inputName.value && inputAmount.value && inputDate.value && inputType.value !== '') {
            return false;
        } else return true;
    }

    saveBtn.addEventListener('click', function () {
        if (checkInputs()) {
            console.log('Error ingrese toda la información.');
        } else if (!checkInputs()) {
            const newTableCellName = inputName.value;
            const newTableCellType = inputType.value;
            const newTableCellDate = inputDate.value;
            const newTableCellAmount = inputAmount.value;

            const newBillElement = new NewBill(newTableCellName, newTableCellType, newTableCellDate, newTableCellAmount);
            billsArray.push(newBillElement);
            createBillDom();

            inputName.value = '';
            inputAmount.value = '';
            inputDate.value = '';
            inputType.value = '';
        }
    });

} ());
