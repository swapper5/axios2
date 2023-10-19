// function display() {
//     const amount = document.getElementById("amount").value;
//     const category = document.getElementById("category").value;

//     const expense = { amount, category };
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     expenses.push(expense);
//     localStorage.setItem('expenses', JSON.stringify(expenses));

//     // displayExpenses(expenses);
// }

// function displayExpenses(expenses) {
//     const expensesList = document.getElementById('expenses-list');
//     expensesList.innerHTML = '';

//     expenses.forEach((expense, index) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `Expense ${index + 1}: Amount - ${expense.amount}, Category - ${expense.category}`;

        
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.addEventListener('click', () => deleteExpense(index));

//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.addEventListener('click', () => editExpense(index));

//         listItem.appendChild(deleteButton);
//         listItem.appendChild(editButton);

//         expensesList.appendChild(listItem);
//     });
// }

// function deleteExpense(index) {
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     if (index >= 0 && index < expenses.length) {
//         expenses.splice(index, 1);
//         localStorage.setItem('expenses', JSON.stringify(expenses));
//         displayExpenses(expenses);
//     }
// }

// function editExpense(index) {
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     if (index >= 0 && index < expenses.length) {
//         const expense = expenses[index];
//         const newAmount = prompt('Edit Amount:', expense.amount);
//         const newCategory = prompt('Edit Category:', expense.category);

//         if (newAmount !== null && newCategory !== null) {
//             expense.amount = newAmount;
//             expense.category = newCategory;

//             localStorage.setItem('expenses', JSON.stringify(expenses));
//             displayExpenses(expenses);
//         }
//     }
// }

// const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
// displayExpenses(storedExpenses);






// index.js
// index.js

function addExpense() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const category2 = document.getElementById('category2').value;

    const expense = { amount, category, category2 };

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);

    localStorage.setItem('expenses', JSON.stringify(expenses));

    const obj={
        Expense,
        Travel,
        Fuel
    }

    axios.post("https://crudcrud.com/api/7ead013eed864176b1299816651983db/AppointmenData",obj)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err);
    })
    displayExpenses();

    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('category2').value = '';
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = 'No expenses to display.';
    } else {
        let html = '<h2>Expense Details:</h2><ul>';
        expenses.forEach((expense, index) => {
            html += `<li>Amount: ${expense.amount}, Expense description: ${expense.category}, Category: ${expense.category2}`;
            html += `<button onclick="editExpense(${index})">Edit</button>`;
            html += `<button onclick="deleteExpense(${index})">Delete</button>`;
            html += '</li>';
        });
        html += '</ul>';
        expenseList.innerHTML = html;
    }
}

function deleteAll() {
    localStorage.removeItem('expenses');
    displayExpenses();
}

function editExpense(index) {
    // You can implement the edit functionality here
    // This function should populate the form with the selected expense data for editing
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Get the expense to edit
    const expenseToEdit = expenses[index];

    // Fill the form fields with the data to be edited
    document.getElementById('amount').value = expenseToEdit.amount;
    document.getElementById('category').value = expenseToEdit.category;
    document.getElementById('category2').value = expenseToEdit.category2;

    // Change the button to "Update" for editing
    const addButton = document.querySelector('button');
    addButton.textContent = 'Update';
    addButton.onclick = function () {
        updateExpense(index);
    };
}

function updateExpense(index) {
    // Retrieve the expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Update the expense with the new data
    expenses[index].amount = document.getElementById('amount').value;
    expenses[index].category = document.getElementById('category').value;
    expenses[index].category2 = document.getElementById('category2').value;

    // Save the updated data back to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Change the button back to "Add Expense"
    const addButton = document.querySelector('button');
    addButton.textContent = 'Add Expense';
    addButton.onclick = addExpense;

    // Clear the form inputs
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('category2').value = '';

    // Display the updated expense list
    displayExpenses();
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Initial call to display existing expenses
displayExpenses();


