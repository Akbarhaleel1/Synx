// const chargebee = require('chargebee');

// chargebee.configure({
//     site: "your-site",
//     api_key: "your-api-key"
//   });

//   chargebee.customer.create({
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com"
//   }).request((error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       const customer = result.customer;
//       console.log("Customer created: ", customer);
//     }
//   });

//   chargebee.subscription.create({
//     plan_id: "your-plan-id", 
//     customer: {
//       id: "customer_id_here"
//     }
//   }).request((error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       const subscription = result.subscription;
//       console.log("Subscription created: ", subscription);
//     }
//   });
  
