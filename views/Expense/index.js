const token = localStorage.getItem('token');

function logout() {
  const confirmLogout = confirm('Are you sure you want to logout?');
  if (confirmLogout) {
    localStorage.clear(); 
    alert('User logged out successfully')
    window.location.href = '../login/login.html'; 
  }
}

async function saveToDatabase(event) {
  const msg = document.querySelector(".msg");

  try {
    event.preventDefault();
    const expenseAmount = event.target.expenseAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
      expenseAmount,
      description,
      category,
    };

    const res = await axios.post(
      "http://localhost:4000/expense/add-expense",
      obj,
      {
          headers: { Authorization: token }
      }
    );

    showNewExpenseOnScreen(res.data);

    msg.classList.add("success");
    msg.innerHTML = "Expense Added Successfully";
    setTimeout(() => msg.remove(), 3000);
  } catch (err) {
    console.log(err);
  }
}

function showNewExpenseOnScreen(expense) {
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("expenseAmount").value = "";
  const parentNode = document.getElementById("expenses");
  const childHTML = ` <li id=${expense._id}> ${expense.description} - ${expense.expenseAmount}
   <input class="btn btn-outline-danger" onclick=deleteExpense('${expense._id}') value ="Delete" >
                                  </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:4000/expense/get-expense",
    {
        headers: { Authorization: token }
    });
    for (var i = 0; i < res.data.length; i++) {
      showNewExpenseOnScreen(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

async function deleteExpense(expenseId) {
  try {
    await axios.delete(
      `http://localhost:4000/expense/delete-expense/${expenseId}`,
      {
          headers: { Authorization: token }
      }
    );

    removeExpenseFromScreen(expenseId);
  } catch (err) {
    console.log(err);
  }
}

function removeExpenseFromScreen(expenseId) {
  const parentNode = document.getElementById("expenses");
  const childNodeToBeDeleted = document.getElementById(expenseId);

  parentNode.removeChild(childNodeToBeDeleted);
}
