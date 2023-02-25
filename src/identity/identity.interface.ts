/* eslint-disable prettier/prettier */
export interface Identity {
    firstname: string;
    middlename?: string;
    lastname: string;
    aliases?: string[];
    dob: string;
    address: string;
    gender: string;
    photo_id?: string;
    enrollment_date: string;
    enrollment_bank: string;
    phones?: string[];
    emails?: string[];
    fullname: string;
    bvn: string;
    customer?: string;
    identity?: string;
    nin?: string;
    lga_origin?: string;
    lga_residence?: string;
    nationality?: string;
    state_residence?: string;
    state_origin?: string;
    enrollment?: {
      bank?: string;
      registration_date?: string;
    };
    on_washlist?: boolean;
    marital_status?: string;
    account_level?: string;
    verification_country?: string;
  }
  