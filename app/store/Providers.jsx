"use client";

import { Provider } from "react-redux";
import { store } from "./index";

export default function StoreProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
