// write javascript here
const name = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const category = document.getElementById("category");
const add = document.getElementById("add");
const table = document.getElementById("table");
const total = document.getElementById("total");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
function updateTotal() {
  const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  total.textContent = `₹${sum.toFixed(2)}`;
}
function renderExpenses() {
  table.innerHTML = "";
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>₹${expense.amount.toFixed(2)}</td>
      <td>${new Date(expense.date).toLocaleDateString()}</td>
      <td>${expense.category}</td>
      <td><button class="delete" data-index="${index}">delete</button></td>
    `;
    table.appendChild(row);
  });
  updateTotal();
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
function addExpense() {
  const expenseName = name.value.trim();
  const expenseAmount = parseFloat(amount.value);
  const expenseDate = date.value;
  const expenseCategory = category.value;
  if (
    !expenseName ||
    isNaN(expenseAmount) ||
    !expenseDate ||
    !expenseCategory
  ) {
    alert("fill in all fields");
    return;
  }
  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    date: expenseDate,
    category: expenseCategory,
  };
  expenses.push(newExpense);
  renderExpenses();
  name.value = "";
  amount.value = "";
  date.value = "";
  category.value = "";
}
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}
add.addEventListener("click", addExpense);
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const index = e.target.getAttribute("data-index");
    deleteExpense(index);
  }
});
renderExpenses();
