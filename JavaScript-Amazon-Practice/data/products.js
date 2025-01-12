import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  // normalizing the data and extracting it now that we actually need it
  products.forEach((product) => {   
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.image;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">
    Size chart
    </a>
    `
  }
}

const tshirt = new Clothing({
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: [
    "tshirts",
    "apparel",
    "mens"
  ],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
});

const date = new Date();
// console.log(date);
// console.log(date.toLocaleTimeString());

// console.log(this);
// const object2 = {
//   a: 2, 
//   b: this.a //the object hasn't been created completely yet so this.a doesn't exist
// };

// function logThis() {
//   console.log(this);
// }

// logThis();
// logThis.call('hello');

// const object3 = {
//   method: () => {
//     console.log(this);
//   }
// };
// object3.method();

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });

    console.log('load products');
  }).catch((errpr) => {
    console.log('Unexpected error. Please try again laterz.');
  });
  return promise;
}

// loadProductsFetch().then(() => {
//   console.log("next step")
// });

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response)
      .map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });

    console.log('load products');

    fun();
  });

  xhr.addEventListener('error', () => {
    console.log('Unexpected error. Please try again later.');
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send(); 
}


