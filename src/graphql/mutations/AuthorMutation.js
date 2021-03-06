var {GraphQLNonNull, GraphQLString} = require('graphql');
var AuthorType = require('../queries/AuthorType');
var Author = require('../../models/Author')

const addUser = {
    type: AuthorType,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        const uModel = new Author(params);
        const newAuthor = await uModel.save();
        if(!newAuthor) {
            throw new Error('Error')
        }
        return newAuthor
    }
}


const loginUser = {
    type: AuthorType,
    args: {
        email: {
            name: 'email',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
        console.log("user"+param.email)
        return await Author.findOne({email:param.email})
    }
}

const updateUser = {
    type: AuthorType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
       let updateAuthor = {};
       if(param.name) {
           updateAuthor.name = param.name
       }
       if(param.email) {
           updateAuthor.email = param.email
       }
       const uAuthor = await Author.findByIdAndUpdate(param._id, updateAuthor, {new: true})
       console.log(uAuthor)
       if(!uAuthor) {
           throw new Error('Error')
       }
       return uAuthor
    }
}

const deleteUser= {
    type: AuthorType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {
      const deleteAuthor =  await Author.findByIdAndRemove(param._id)
      if(!deleteAuthor) {
         throw new Error('Error');
      }
      return deleteAuthor
    }
}
module.exports = {addUser, updateUser, deleteUser,loginUser}