import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./Components/Product/Product";
import Stock from "./Components/Stock/Stock";
import Customer from "./Components/Customer/Customer";
import Header from "./Components/Header/Header";
import BillingPage from "./Components/Billing/BillingPage";
import BillingTable from "./Components/Billing/BillingTable";
import SignInSide from "./Components/SignIn/SignIn";
import Checking from "./Components/Checking";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/product"
          element={
            <Layout>
              <Product />
              {/* <Checking /> */}
            </Layout>
          }
        />
        <Route
          path="/stock"
          element={
            <Layout>
              <Stock />
            </Layout>
          }
        />
        <Route
          path="/customer"
          element={
            <Layout>
              <Customer />
            </Layout>
          }
        />
        <Route
          path="/billing"
          element={
            <Layout>
              <BillingPage />
            </Layout>
          }
        />
        <Route
          path="/billinghistory"
          element={
            <Layout>
              <BillingTable />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>{children}</div>
    </div>
  );
}

function Home() {
  return <h1>Welcome to the Home Page</h1>;
}

export default App;
