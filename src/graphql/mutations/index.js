var { addUser, updateUser, deleteUser,loginUser } = require('./AuthorMutation');
var { createPost, updatePost, deletePost} = require('./PostMutation')
var { loginPost } = require('./Login')


module.exports = {
    addUser,
    updateUser,
    deleteUser,
    createPost,
    updatePost,
    deletePost,
    loginPost,
    loginUser
}