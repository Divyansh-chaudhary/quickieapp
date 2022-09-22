import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { combineReducers } from "redux";
import Home from "./pages/Home";
import View from "./pages/View";
import appSlice, { setAllData } from "./store/appSlice";

const store = configureStore({
  reducer: combineReducers({
    app: appSlice,
  }),
});

function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}

const Navigations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          "http://api.coinlayer.com/api/list?access_key=8ecebbb76f90dfc09cba935598de8ba4"
        );
        let tempData = [];
        for (let prop in response.data.crypto) {
          tempData.push(response.data.crypto[prop]);
        }
        dispatch(setAllData(tempData));
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/view",
      element: <View />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
