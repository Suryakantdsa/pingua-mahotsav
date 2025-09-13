import { create } from "zustand";

interface FormState {
  showSponsorForm: boolean;
  showBloodDonationForm: boolean;
  showParticipationForm: boolean;
  setShowSponsorForm: (value: boolean) => void;
  setShowBloodDonationForm: (value: boolean) => void;
  setShowParticipationForm: (value: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  showSponsorForm: false,
  showBloodDonationForm: false,
  showParticipationForm: false,

  setShowSponsorForm: (value) => set({ showSponsorForm: value }),
  setShowBloodDonationForm: (value) => set({ showBloodDonationForm: value }),
  setShowParticipationForm: (value) => set({ showParticipationForm: value }),
}));
