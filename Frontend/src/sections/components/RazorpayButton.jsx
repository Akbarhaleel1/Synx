
// import React, { useState } from 'react';
// import axios from 'axios';

// const RazorpayButton = ({ amount, onSuccess, className, children }) => {

  
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     const isScriptLoaded = await loadRazorpayScript();

//     if (!isScriptLoaded) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     try {
//       const price = Number(amount.split(',').join(''));
      
//       const { data } = await axios.post('http://localhost:3000/payments', { amount: price });
//       console.log('razorpay is working, data:', data);

//       if (!data.success) {
//         alert('Unable to create order. Please try again.');
//         return;
//       }

//       const options = {
//         key: 'rzp_test_xCDHUb0bcZEj1P', 
//         amount: data.amount, 
//         currency: "INR",
//         name: "Synx",
//         description: "Test Transaction",
//         order_id: data.order.id,
//         handler: function (response) {
//           const paymentData = {
//             amount: data.amount,
//             response: response,
//             // plan:plan
//           };
//           onSuccess(paymentData); 
//         },
//         modal: {
//           ondismiss: function () {
//             alert('Payment process has been cancelled.');
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <button onClick={handlePayment} className={className}>
//       {children}
//     </button>
//   );
// };

// export default RazorpayButton;




import React, { useState } from 'react';
import axios from 'axios';

const RazorpayButton = ({ titleId, onSuccess, className, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  let planId;

  switch(titleId){
    case 'DIAMOND':
      console.log('Selected Plan: DIAMOND');
      planId = 'plan_P8CrVYx0VBbRFh'
      break;
    case 'GOLD':
      console.log('slectSILVER');
       planId = 'plan_P89dmItbQLG6dU'
      break;
    case 'SILVER':
      console.log('SILVER');
      planId = 'plan_P8EkuGxrrobxIN'
      break      
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubscription = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setIsLoading(true);

    try {
      const getUser = localStorage.getItem('user');
      const user = JSON.parse(getUser);
      console.log('planid is',planId)
      // Create the subscription on the server
      const { data } = await axios.post('https://synxbackend.synxautomate.com/payments', { planId, user });

      if (!data.subscription) {
        alert('Unable to create subscription. Please try again.');
        return;
      }

      const options = {
        key: 'rzp_test_6aYUU1Lcsfqbw3', 
        subscription_id: data.subscription.id,
        name: "Synx",
        description: "Subscription Payment",
        handler: function (response) {
          onSuccess(response);
        },
        modal: {
          ondismiss: function () {
            alert('Payment process has been cancelled.');
          },
        },
      };

      // Open Razorpay modal for subscription
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSubscription} className={className} disabled={isLoading}>
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

export default RazorpayButton;