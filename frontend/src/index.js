// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
// import AlertTemplate from "react-alert-template-basic";
// import { transitions, positions, Provider as AlertProvider } from "react-alert";

// // optional configuration
// const options = {
//   // you can also just use 'bottom center'
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: "30px",
//   // you can also just use 'scale'
//   transition: transitions.SCALE,
// };

// ReactDOM.render(
//   <Provider store={store}>
//     <AlertProvider template={AlertTemplate} {...options}>
//       <App />
//     </AlertProvider>
//   </Provider>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>{" "}
  </Provider>,
  document.getElementById("root")
);
