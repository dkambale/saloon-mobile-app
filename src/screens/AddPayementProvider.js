import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AddPayment from "./AddPayment"; // Import your screen component

const AddPaymentProvider = () => {
  return (
    <PaperProvider>
      <AddPayment />
    </PaperProvider>
  );
};

export default AddPaymentProvider;
