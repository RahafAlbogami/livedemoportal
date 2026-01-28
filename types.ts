
export type RequestType = 'quotation' | 'renewal' | 'endorsement';

export type EndorsementAction = 'add' | 'update' | 'cancel';

export interface Property {
  id: string;
  interestDescription: string;
  longitude: string;
  latitude: string;
  interestEffectiveDate: string;
  industrySegment: string;
  propertyUsage: number;
  interestType: string;
  riskCategory: string;
  totalArea: string;
  yearOfConstruction: string;
  noOfFloors: string;
  constructionMaterial: string;
  minDeductible: string;
  fireAlarm: boolean;
  securityBurglarAlarm: boolean;
  cctv: boolean;
  sprinklerSystem: boolean;
  locationName: string;
  country: string;
  city: string;
  areThereAnyClaim: string;
  claimAmount: string;
}

export interface Policy {
  id: string;
  referenceNo: string;
  crNumber: string;
  name: string;
  status: 'Active' | 'Renewal' | 'Pending' | 'Expired';
  updatedOn: string;
}

export interface WizardState {
  step: number;
  view: 'form' | 'loading' | 'quotation';
  submissionStatus: 'none' | 'error_gen' | 'delayed_gen' | 'expired_acc' | 'review_disc' | 'payment_form' | 'success_acc' | 'declined';
  requestType: RequestType | null;
  endorsementAction: EndorsementAction | null;
  policyReference: string;
  selectedPolicy: Policy | null;
  effectiveDate: string;
  reason: string;
  details: string;
  properties: Property[];
  quotationDetails: string;
  contactName: string;
  contactId: string;
  mobile: string;
  iban: string;
  paymentMethod: 'online' | 'broker' | null;
}
