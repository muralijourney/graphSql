const { GraphQLList, GraphQLObjectType ,GraphQLNonNull,GraphQLString} = require('graphql');
const Author = require('../../models/Author')
const Post = require('../../models/Post')
const PostType = require('./PostType');
const AuthorType = require('./AuthorType')

const BlogQueryRootType = new GraphQLObjectType ({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        login: {
            type: new GraphQLList(AuthorType),
            description: "Vaildate Uuser",
            args:{
                email: {
                    name: 'email',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (root,params) {
              return await  Author.find({email:params.email}, (err, auth) => {
              });
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: async function () {
              return await  Author.find({}, (err, auth) => {
              });
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all posts",
            resolve: async function () {
               var posts = await  Post.find({})
               return posts;
            }
        }
    })
});

module.exports = BlogQueryRootType