import { Types } from "mongoose";

// eslint-disable-next-line no-explicit-any
// Types
export enum BloodGroup {
  A_POS = "A+",
  A_NEG = "A-",
  B_POS = "B+",
  B_NEG = "B-",
  AB_POS = "AB+",
  AB_NEG = "AB-",
  O_POS = "O+",
  O_NEG = "O-",
}

export interface BloodDonor_GET {
  _id: Types.ObjectId;
  name: string;
  age: number;
  bloodGroup: BloodGroup;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodDonor_POST {
  name: string;
  age: number;
  bloodGroup: BloodGroup;
  phone: string;
}

export interface BloodDonor_PATCH {
  name?: string;
  age?: number;
  bloodGroup?: BloodGroup;
  phone?: string;
}

export interface BloodDonor_QUERY {
  _id?: any;
  name?: any;
  age?: any;
  bloodGroup?: any;
  phone?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface BloodDonor_FIND {
  total: number;
  skip: number;
  limit: number;
  data: Array<BloodDonor_GET>;
}
