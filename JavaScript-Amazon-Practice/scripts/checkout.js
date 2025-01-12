import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

// Flattened and shortened even more with async await
async function loadPage() {


  // loadProductsFetch().then(() => {
  //  this code is the same as the one below
  // })
  let value;
  try {
    // throw 'error1';
    await loadProductsFetch(); //this method retuns a promise
    value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3')
        resolve('value2');
      });
    })/*.catch((error) => {
      console.log(error);
    })*/
  } catch (error) {
    console.log('Unexpected error. Please try again laterzz.');
    console.log(error);
  }

  renderOrderSummary();
  renderPaymentSummary();
  // return value;
}

loadPage();
// .then((value) => {
//   console.log(value);
// });

// Flattened with Promises.all()
// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   })
// ]).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// // Flattened with promises
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// }).then(() => {
  // renderOrderSummary();
  // renderPaymentSummary();
// });

// // Nested callback example; not flattened with promises
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// })