"use client";
import { useFormStore } from "@/store/useFormStore";
import React from "react";
import ParticipationForm from "./ParticipationForm";
import SponsorForm from "./SponsorForm";
import BloodDonationForm from "./BloodDonationForm";

const Form = () => {
  const { showBloodDonationForm, showParticipationForm, showSponsorForm } =
    useFormStore();
  return (
    <>
      {showParticipationForm && <ParticipationForm />}
      {showSponsorForm && <SponsorForm />}
      {showBloodDonationForm && <BloodDonationForm />}
    </>
  );
};

export default Form;
