let Todo = require("../models/todo.model");

module.exports.all = async function(req, res, next) {
  let todos = await Todo.find().sort({isDone: 'asc'});
  return res.json(todos);
};

module.exports.add = async function(req, res, next) {
  try {
    const { todo } = req.body;
    console.log(req.body);
    const isDone = req.body.isDone || false;
    let newtodo = new Todo({ todo, isDone });
    newtodo = await newtodo.save();
    return res.json(newtodo);
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.get = async function(req, res, next) {
  let todo = await Todo.findById(req.params.id);
  return res.json(todo);
};

module.exports.delete = async function(req, res, next) {
  let todo = await Todo.findByIdAndDelete(req.params.id);
  return res.json(todo);
};

module.exports.update = async function(req, res, next) {
  const { todo, isDone } = req.body;
  let updatetodo = await Todo.findByIdAndUpdate(req.params.id, {
    todo,
    isDone
  });
  return res.json({_id: updatetodo._id, todo, isDone});
};
