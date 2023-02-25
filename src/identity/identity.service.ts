/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Identity } from './identity.interface';

@Injectable()
export class IdentityService {
//   constructor(private httpService: HttpService) {}
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }


  async processIdentity(bvn: string): Promise<Identity> {
    try {
      const accountsResponse = await this.getAccountsByBVN(bvn);
      const nuban = accountsResponse?.data?.response?.[0]?.account_no;
      const bank = accountsResponse?.data?.response?.[0]?.bank;

      if (!nuban) {
        throw new Error('No account information found for this BVN');
      }

      const nubanResponse = await this.confirmNUBAN(nuban, bank, bvn);
      const { birthdate } = nubanResponse?.data?.response || {};
      
      if (!birthdate) {
        throw new Error('No user information found for this NUBAN');
      }

      const bvnResponse = await this.confirmBVN(birthdate, bvn);

      const {
        FirstName: firstname,
        MiddleName: middlename,
        LastName: lastname,
        DateOfBirth: dob,
        Address: address,
        Gender: gender,
        PhotoId: photo_id,
        Enrollment_Date: enrollment_date,
        Enrollment_Bank: enrollment_bank,
        Phone: phones,
        Email: emails,
        FullName: fullname,
        Nin: nin,
        LGAOrigin: lga_origin,
        LGAOfResidence: lga_residence,
        nationality: nationality,
        State_of_residence: state_residence,
        State_of_origin: state_origin,
        EnnrollmentBbank: enrollment_bank_2,
        Washlist: on_washlist,
        MaritalStatus: marital_status,
        AccountLevel: account_level,
        VerificationCountry: verification_country,
      } = bvnResponse?.data?.response || {};

      if (!lastname) {
        throw new Error('No user information found for this BVN');
      }

      const identity: Identity = {
        firstname,
        middlename,
        lastname,
        dob,
        address,
        gender,
        photo_id,
        enrollment_date,
        enrollment_bank: enrollment_bank_2 || enrollment_bank,
        phones: phones ? (Array.isArray(phones) ? phones : [phones]) : [],
        emails: emails ? (Array.isArray(emails) ? emails : [emails]) : [],
        aliases: [],
        fullname,
        bvn,
        customer: `cus_${Date.now()}`, // Generate a unique customer id
        identity: `idt_${Date.now()}`, // Generate a unique identity id
        nin,
        lga_origin,
        lga_residence,
        nationality,
        state_residence,
        state_origin,
        on_washlist,
        marital_status,
        account_level,
        verification_country,
      };

      return identity;

    } catch (err) {
      throw new Error(`Failed to process identity: ${err.message}`);
    }
  }

  private async getAccountsByBVN(bvn: string) {
    return this.axiosInstance
      .post('https://api.okra.ng/v2/mock-api/accounts-by-bvn', { bvn })
      .then((response: any) => response.data);
  }

  private async confirmNUBAN(nuban: string, bank: string, bvn: string) {
    return this.axiosInstance
      .post('https://api.okra.ng/v2/mock-api/confirm-nuban', { nuban, bank, bvn })
      .then((response: any) => response.data);
   }

  private async confirmBVN(dob: string, bvn: string ) {
    return this.axiosInstance
      .post('https://api.okra.ng/v2/mock-api/bvn-lookup', { dob, bvn })
      .then((response: any) => response.data);
  }
  

}