const { User, Todo } = require('./../models');

module.exports = {
    addTodo: async (req,res) => {
        const { text, userId } = req.body;

        if(!text) {
            return res.status(403).json({ error: 'You must provide a text' });
        }


        try {
            const newTodo = await new Todo({ text, user: userId}).save();
            const user = await User.findById(userId);
            user.todos.push(newTodo);
            await user.save();
            return res.status(200).json(newTodo);
        } catch (e) {
            return res.json(403).json({ e });
        }
    }
}