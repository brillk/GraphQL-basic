/*REST API의 문제점
1. over-fetching => receive more info than i need
2. under-fetching => receive less info than i need
정보를 보여주려고 2개 이상의  요청(request) 하는것..

what is GraphQL?
문법이 아닌 하나의 specification이다
장점:
REST API의 단점을 보완
모든 데이터를 받는게 아닌 필요한 데이터를 요청한다
하나의 요청에 모든 정보를 받을 수 있다

Apollo server를 써서 GraphQL을 구현해보자
 */
import { ApolloServer, gql } from "apollo-server";

//allTweets의 로직을 짜보기 위해 가짜 DB를 만들자 => resolver
const tweets = [
  {
    id: "1",
    text: "first",
  },
  {
    id: "2",
    text: "second",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;
/*
이곳에 data의 shape을 다 적자 => Schema definition language
필수로 적어야하는 type Query GET method와 같다

변수의 타입을 다르게 선언된 타입을 넣을 수 있다 => User

Mutations 
POST method와 같다 type Mutation
또한 DELETE, PUT도 Mutation에서 작동한다

기본적으로 타입을 정해줄때, 모든 타입은 null이 될 수도 있다
하지만 타입 끝에 !를 달아준다면 그 타입은 required 돼서 무조건 조건을 적어줘야됨
그리고 절대 null로 리턴하지 않는다고 확신할때 쓴다

*/

// 위처럼 데이터의 타입을 정하고
// 데이터를 받을 수 있는 로직을 짜야하는데
// 그걸 resolver라고 부른다

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      // 아이디를 확인해 트윗을 만듬
      console.log(id);
      return tweets.find(tweet => tweet.id === id);
    },
    //argument를 보낼때, resolver function의 두번째가 args다
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
// Error: Apollo Server requires either an existing schema, modules or typeDefs
// 위의 에러는 graphQL이 data의 shape를 미리 알고 있어야하기 때문이다

/*

Scalar types
GraphQL 객체 타입에는 이름과 필드가 있지만 이 필드는 더욱 구체적인 데이터로 해석되어야 합니다. 그 때 스칼라 타입을 사용할 수 있습니다.

GraphQL은 기본 스칼라 타입 세트와 함께 제공됩니다.
ID: ID 스칼라 타입은 객체를 다시 가져오거나 캐시의 키로 
자주 사용되는 고유 식별자를 나타냅니다

*/
