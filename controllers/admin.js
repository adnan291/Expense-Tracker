const Expense = require("../models/expenses");

exports.getAddExpense = (req, res, next) => {
  try {
     Expense.find({ userId: req.user._id }).then((expenses) => {
      res.json(expenses);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddExpense = async (req, res, next) => {
  try {
    const expenseAmount = req.body.expenseAmount;
    const category = req.body.category;
    const description = req.body.description;

    const expense = new Expense({
      expenseAmount: expenseAmount,
      category: category,
      description: description,
      userId: req.user,
    });

    expense.save().then(() => {
      res.json(expense);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteExpense = (req, res, next) => {
  try {
    const expenseId = req.params.id;
 Expense.findByIdAndDelete(expenseId).then(() => {
     res.sendStatus(200);
 })
  } catch (err) {
    console.log(err);
  }
};
