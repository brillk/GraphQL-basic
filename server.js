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

const typeDefs = gql`
  type Query {
    text: String
  }
`; // 이곳에 data의 shape을 다 적자 => Schema definition language
//필수로 적어야하는 type Query

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
// Error: Apollo Server requires either an existing schema, modules or typeDefs
// 위의 에러는 graphQL이 data의 shape를 미리 알고 있어야하기 때문이다
