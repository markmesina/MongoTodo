const { User, Todo } = require('./../models');

module.exports = {
    addTodo: async (req,res) => {
        console.log(req.user);
        const { text } = req.body;

        if(!text) {
            return res.status(403).json({ error: 'You must provide a text' });
        }


        try {
            const newTodo = await new Todo({ text, user: req.user._id}).save();
            const user = await User.findById(req.user._id);
            req.user.todos.push(newTodo);
            await req.user.save();
            return res.status(200).json(newTodo);
        } catch (e) {
            return res.json(403).json({ e });
        }
    },
    getAllUserEmails: async (req, res) => {
        try {
          const userEmails = await User.find({}, 'email');
          if (!userEmails) { return res.status(404).json({ error: 'No user emails found '});}
          return res.status(200).json(userEmails);
        } catch (e) { return res.status(403).json({ e }); }
    },
    getUserTodos: async (req,res) => {
        try {
            // const user = await User.findById(req.user._id)
            // .populate('todos', 'text');
            //.populate('blogs');
            //.populate('comments');

            const userTodos = await Todo.find({ user: req.user._id }, 'competed text')
            return res.status(200).json(userTodos);
        } catch (e) { return res.status(403).json({ e });}
        
    },

    deleteUserTodoById: async (req, res) => {
        const { todoId } = req.params;
        try {
            const todoToDelete = await Todo.findById(todoId);
            if (!todoToDelete) {
                return res.status(401).json({ error: 'No todo with that id' });
            }
            // Check if the current todo belongs to the current logged in user
            if(req.user._id.toString() !== todoToDelete.user.toString()) {
                return res.status(401).json({ error: 'You cannot delete a todo that is not yours!' });
            }
            const deletedTodo = await Todo.findByIdAndDelete(todoId);
            return res.status(200).json(deletedTodo);
        } catch (e) { return res.status(403).json({ e }); }
    },
    
    updateTodoById: async (req,res) => {
        const { todoId } = req.params;
        const { text, completed } = req.body;
        if(!text) {
            return res.status(400).json({ error: 'You must provide a text' });
        }
        try {
            const todoToUpdate = await Todo.findById(todoId);
            if(!todoToUpdate) {
                return res.status(404).json({ error: 'No Todo with that Id' });
            }
            if(req.user._id.toString() !== todoToUpdate.user.toString()) {
                return res.status(401).json({ error: 'You cannot updatedelete a todo that is not yours!' });
            }

            const updatedTodo = await Todo.findByIdAndUpdate(todoId,
                { completed, text },
                { new: true });
            return res.status(200).json(updatedTodo);
        } catch (e) { return res.status(403).json({ e }); }
    },
    
}