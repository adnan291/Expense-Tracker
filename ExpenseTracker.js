const myForm = document.querySelector('#my-form');
const expenseInput = document.querySelector('#expenseAmount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('click',displayUsers);

function onSubmit(e) {
    e.preventDefault();
    
    if(expenseInput.value === '' || descriptionInput.value === '' || categoryInput.value === '') {
      msg.classList.add('error');
      msg.innerHTML = 'Please enter all fields';
      setTimeout(() => msg.remove(), 3000);
    } else {
      let myObj = {
        ExpenseAmount: expenseInput.value,
        Description: descriptionInput.value,
        Category: categoryInput.value
      };
      let myObj_serial = JSON.stringify(myObj);
      localStorage.setItem(descriptionInput.value, myObj_serial);
      msg.classList.add('success');
      msg.innerHTML = 'User Added Successfully';
      setTimeout(() => msg.remove(), 3000);
      expenseInput.value = '';
      descriptionInput.value = '';
      categoryInput.value = '';
  
      displayUsers()
    }
  }

  var userList = document.getElementById('users');

function displayUsers(){
    // Get input values
    var expense = document.getElementById('expenseAmount').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;

    // Clear the list
    userList.innerHTML = '';

    // Loop through all items in localStorage
    for (var i = 0; i < localStorage.length; i++) {
        // Get the key of the current item
        var key = localStorage.key(i);
        
        // Parse the JSON string into an object
        var user = JSON.parse(localStorage.getItem(key));
        
        // Create new li element
        var li = document.createElement('li');
        // Add class
        li.className = 'list-group-item';
        // Add text node with input value
        li.appendChild(document.createTextNode('Expense Amount:'));
        li.appendChild(document.createTextNode(user.ExpenseAmount));

        li.appendChild(document.createTextNode(', description: '));
        li.appendChild(document.createTextNode(user.Description));
       
        li.appendChild(document.createTextNode(', Categry: '));
        li.appendChild(document.createTextNode(user.Category));
   
        
        // Create delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);

          // Create Edit button
          var editBtn = document.createElement('button');
          editBtn.className = 'btn btn-secondary btn-sm float-right edit';
          editBtn.appendChild(document.createTextNode('Edit'));
          li.appendChild(editBtn);

        // Append li to list
        userList.appendChild(li);
    }
}
// Remove User
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            var li = e.target.parentElement;
            var key = li.childNodes[3].textContent;
            localStorage.removeItem(key);
            li.remove();
        }
    }
}

// Edit User
function editItem(e){
    if(e.target.classList.contains('edit')){
      
            var li = e.target.parentElement;
            var key = li.childNodes[3].textContent;
           var user=JSON.parse(localStorage.getItem(key));
           expenseInput.value=user.ExpenseAmount;
           descriptionInput.value=user.Description;
           categoryInput.value = user.Category;
            localStorage.removeItem(key);
            li.remove();
        
    }
}

// Event listener for delete button
userList.addEventListener('click', removeItem);
userList.addEventListener('click', editItem);