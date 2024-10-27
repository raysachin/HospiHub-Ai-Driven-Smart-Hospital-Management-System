import React from "react";
import Smart from "../components/Smart";
import AppointmentForm from "../components/AppointmentForm";
import SymptomsForm from "../components/SymptomsForm";

const SmartInsights = () => {
  return (
    <>
      <Smart
        title={"Smart Insights: Leveraging AI for Better Healthcare Decisions"}
        imageUrl={"/signin.png"}
      />
      <SymptomsForm/>
    </>
  );
};

export default SmartInsights;
