import { gql } from "apollo-server";
export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    coffeeShopId: Int!
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    userId: Int!
    photos: [CoffeeShopPhoto]
    categories: [Category]
  }
  type Category {
    id: Int!
    name: String!
    slug: String
    shops(lastId: Int!): [CoffeeShop]
    totalShops: Int!
  }
`;
