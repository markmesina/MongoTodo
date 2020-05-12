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
            const userTodos = await User.find({},'todo' );
            return res.status(200).json(userTodos);
        } catch (e) { return res.status(403).json({ e });}
        
    },
}