import { type CheckoutInformation } from "../../pages/CheckoutPage";

export const checkoutInformation: CheckoutInformation = {
  firstName: "Test",
  lastName: "User",
  postalCode: "12345",
};

export const backpack = {
  name: "Sauce Labs Backpack",
  price: "$29.99",
  tax: "$2.40",
  total: "$32.39",
} as const;
