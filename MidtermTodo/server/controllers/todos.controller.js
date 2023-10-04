const { Todo } = require('../models');
const validator = require('validator');


module.exports = {
    findAll: async (req, res) => {
        try {
            const todos = await Todo.findAll();
            console.log(todos);
            res.json(todos).status(200);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    addTodo: async (req, res) => {
        try {
            const todo = req.body;
            console.log("=====" + todo);

            if (validateDataAdd(req, res)) {
                const addTodo = await Todo.create(todo);
                res.json(addTodo).status(201);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    findOneById: async (req, res) => {
        try {
            const id = req.params.id;
            const todo = await Todo.findByPk(id);
            res.json(todo).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    findAllByUserId: async (req, res) => {
        try {
            const id = req.params.id;
            const todos = await Todo.findAll({
                where: {
                    ownerId: id,
                },
                order: [['createdAt', 'DESC']],
            });
            res.json(todos).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    deleteOneTodoById: async (req, res) => {
        try {
            const id = req.params.id;
            const todo = await Todo.destroy({
                where: {
                    id: id
                }
            });
            res.json(todo).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    updateOneTodoById: async (req, res) => {
        const id = req.params.id;
        const updateTodo = req.body;
        try {
            const todo = await Todo.findByPk(id);
            if (todo == null) {
                return res.status(400).json({ message: `Controllers: Todo with id ${id} doesn't exist.` });
            }

            todo.task = updateTodo.task;
            todo.dueDate = updateTodo.dueDate;
            todo.isDone = updateTodo.isDone;

            if (validateDataAdd(req, res)) {
                const newTodo = await todo.save();
                res.json(newTodo).status(200);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    }

}

// validation when add a new record
function validateDataAdd(req, res) {

    const { task, dueDate } = req.body;

    // required, 1-100 characters
    if (validator.isEmpty(task) || !validator.isLength(task, { min: 1, max: 100 })) {
        res.status(400).send({ message: 'Controller: ItemCode must between 2 and 20 characters long, be made up of letters, digits, dashes, dots or spaces' });
        return false;
    }

    //FIXME: DUEDATE SHOULD BE TODAY OR LATER
    return { valid: true };

};

