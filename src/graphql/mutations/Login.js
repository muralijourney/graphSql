var {GraphQLNonNull, GraphQLString} = require('graphql');
var AuthorType = require('../queries/AuthorType');
var Author = require('../../models/Author')

const loginPost = {
    type: AuthorType,
    args: {
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async function(root, param) {
        console.log("dsakfkdsakdsk")
        return await Author.find({email:param.email}, (err, auth) => {
    });
    //    console.log(uAuthor)
    //    if(!uAuthor) {
    //        throw new Error('Error')
    //    }
    //    return uAuthor
    }
}

module.exports = { loginPost }
