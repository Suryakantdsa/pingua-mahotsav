import { create } from "zustand";

interface SuccessModalData {
  title: string;
  message: string;
  subMessage?: string;
  badge?: string;
}

interface FormState {
  showSponsorForm: boolean;
  showBloodDonationForm: boolean;
  showParticipationForm: boolean;
  successData: SuccessModalData | null;
  setShowSponsorForm: (value: boolean) => void;
  setShowBloodDonationForm: (value: boolean) => void;
  setShowParticipationForm: (value: boolean) => void;
  setSuccessData: (value: SuccessModalData | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  showSponsorForm: false,
  showBloodDonationForm: false,
  showParticipationForm: false,
  successData: null,

  setShowSponsorForm: (value) => set({ showSponsorForm: value }),
  setShowBloodDonationForm: (value) => set({ showBloodDonationForm: value }),
  setShowParticipationForm: (value) => set({ showParticipationForm: value }),
  setSuccessData: (value) => set({ successData: value }),
}));
