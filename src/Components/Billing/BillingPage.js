import React, { useState, useEffect } from "react";
import axios from "axios";
import BillingForm from "./BillingForm";
import BillingTable from "./BillingTable";

const BillingPage = () => {
  return (
    <div>
      <BillingForm />
    </div>
  );
};

export default BillingPage;
