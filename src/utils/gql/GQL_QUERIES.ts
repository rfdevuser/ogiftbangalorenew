import { gql } from '@apollo/client';

export const GET_SINGLE_PRODUCT = gql`
query getprod($id: ID!) {
  product(id: $id, idType: DATABASE_ID) {
    id
    name
    databaseId
    shortDescription
    type
    galleryImages {
      nodes {
        sourceUrl
        __typename
      }
      __typename
    }
    image {
      sourceUrl
      __typename
    }
    ... on SimpleProduct {
      id
      name
      price
      regularPrice
      salePrice
      crossSell {
        nodes {
          name
          id
          slug
          image {
            sourceUrl
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    ... on VariableProduct {
      id
      name
      crossSell {
        nodes {
          name
          id
          slug
          image {
            sourceUrl
            __typename
          }
          __typename
        }
        __typename
      }
      variations {
        nodes {
          id
          name
          price
          regularPrice
          salePrice
          attributes {
            nodes {
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

`;

/**
 * Fetch first 4 products from a specific category
 */



/**
 * Fetch first 200 Woocommerce products from GraphQL
 */
export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery {
    products(first: 50) {
      nodes {
        databaseId
        name
        onSale
        slug
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          databaseId
          price
        
        }
        ... on VariableProduct {
          databaseId
          price
          regularPrice
          salePrice
          variations {
            nodes {
              price
       
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch first 20 categories from GraphQL
 */
export const FETCH_ALL_CATEGORIES_QUERY = gql`
  query Categories {
    productCategories(first: 20) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCTS_FROM_CATEGORY = gql`
  query ProductsFromCategory($id: ID!) {
    productCategory(id: $id) {
      id
      name
      products(first: 50) {
        nodes {
          id
          databaseId
          onSale
          averageRating
          slug
          description
          image {
            id
            uri
            title
            srcSet
            sourceUrl
          }
          name
          ... on SimpleProduct {
            salePrice
            regularPrice
            onSale
            price
            id
          }
          ... on VariableProduct {
            salePrice
            regularPrice
            onSale
            price
            id
          }
          ... on ExternalProduct {
            price
            id
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
          }
          variation {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              attributes {
                nodes {
                  id
                  name
                  value
                }
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }

      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

export const GET_STUDENT = gql`
query getstudent($search:String) {
  onestudent(where: {studentID:$search}) {
    edges {
      node {
        firstName
        lastName
        student_id
        
      }
    }
  }
}
`;
