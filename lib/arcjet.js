import arcjet, { tokenBucket } from "@arcjet/next";
// arcjet is used to limit the number of request of the payment to our app , so that in fututre subscription plans can be added by me 

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["userId"],  // TRack based on Clerk Userid

    rules: [
        // Rate limiting specifically for collection creation
        tokenBucket({
          mode: "LIVE",
          refillRate: 10, // 10 collections refill after per hour
          interval: 3600, // per hour only 10 request 
          capacity: 10, // maximum burst capacity
        }),
      ],
});

export default aj;
