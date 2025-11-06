import React from "react";
import { View, Button, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";

export default function PaymentScreen() {
  const payNow = () => {
    const options = {
      description: "Solar Project Payment",
      image: "https://cdn.prod.website-files.com/65b217df08a6f1f6aba3d4a7/6683d04ec8416f53bf29770f_arka360.svg",
      currency: "INR",
      key: "rzp_test_irnPQxt2hSfRUv", 
      amount: 50000, 
      name: "Arka India App",
      order_id:1,
      prefill: {
        email: "arka@gmail.com",
        contact: "9876543210",
        name: "Arka Customer",
      },
      theme: { color: "#3A5FE8" },
    };

    RazorpayCheckout.open(options as any)
      .then((data: { razorpay_payment_id: any; }) => {
        Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error: { code: any; description: any; }) => {
        Alert.alert(
          "Error",
          `Code: ${error.code} | Description: ${error.description}`
        );
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Button title="Pay ₹500" onPress={payNow} />
    </View>
  );
}
