const graphql=require('graphql')

const{GraphQLObjectType ,
      GraphQLString ,
      GraphQLSchema,
       GraphQLInt,
       GraphQLList
      } = graphql;
const _ = require('lodash')

const books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]

;

const authors =  [
  {name: 'Patrick Rothfuss', age: 44, id:"1"},
  {name: 'Brandon Sanderson', age: 42, id:"2"},
  {name: 'Terry Pratchett', age: 66, id:"3"},
]
;

const BookType = new GraphQLObjectType(
  {
    name: 'Book',
    fields: () => ({
       id : {type:GraphQLString},
       name : {type:GraphQLString},
       genre : {type:GraphQLString},
       author: {
         type: AuthorType,
         resolve(parent,args){
           console.log("parent");
           return _.find(authors,{id:parent.authorid})
         }
       }

    })
  }
);

const AuthorType = new GraphQLObjectType(
  {
    name: 'Author',
    fields: () => ({
       id : {type:GraphQLString},
       name : {type:GraphQLString},
       age : {type:GraphQLInt},
       books: {
         type: new GraphQLList(BookType),
         resolve(parent,args)
         {
           return _.filter (books , {authorId : parent.id})

         }

       }

    })
  }
);


const RootQuery = new GraphQLObjectType(
{
name:'RootQueryType',
fields:{
   book:{
     type: BookType,
     args: {id:{type:GraphQLString}},
     resolve (parents , args)
     {
        console.log(typeof(args.id));
        return _.find (books,{id: args.id}) ;
     }
   },

   author :{
     type: AuthorType,
     args: {id:{type:GraphQLString}},
     resolve (parents , args)
     {
        console.log(typeof(args.id));
        return _.find (authors,{id: args.id}) ;
     }
   }

}

}
);

module.exports =  new GraphQLSchema({
  query: RootQuery
})
