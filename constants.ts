
import { Policy } from './types';

export const DUMMY_POLICIES: Policy[] = [
  {
    id: '1',
    referenceNo: 'POL-88291-XA',
    crNumber: 'CR-99210-9',
    name: 'Al Rajhi Trading Co.',
    status: 'Active',
    updatedOn: 'Oct 24, 2023',
  },
  {
    id: '2',
    referenceNo: 'POL-11203-BC',
    crNumber: 'CR-44567-2',
    name: 'Saudi Gulf Logistics Ltd.',
    status: 'Renewal',
    updatedOn: 'Oct 22, 2023',
  },
  {
    id: '3',
    referenceNo: 'POL-77612-PP',
    crNumber: 'CR-10293-4',
    name: 'Najd Industrial Services Co.',
    status: 'Pending',
    updatedOn: 'Oct 21, 2023',
  },
  {
    id: '4',
    referenceNo: 'POL-99342-LQ',
    crNumber: 'CR-00129-8',
    name: 'Red Sea Hospitality Group',
    status: 'Expired',
    updatedOn: 'Oct 19, 2023',
  },
  {
    id: '5',
    referenceNo: 'POL-44102-ZX',
    crNumber: 'CR-77621-0',
    name: 'Eastern Petrochem Supplies',
    status: 'Active',
    updatedOn: 'Oct 18, 2023',
  },
  {
    id: '6',
    referenceNo: 'POL-22341-MK',
    crNumber: 'CR-88123-1',
    name: 'Riyadh Construction Partners',
    status: 'Active',
    updatedOn: 'Oct 25, 2023',
  },
  {
    id: '7',
    referenceNo: 'POL-55672-RE',
    crNumber: 'CR-33421-5',
    name: 'Al Noor Manufacturing Co.',
    status: 'Active',
    updatedOn: 'Oct 24, 2023',
  },
  {
    id: '8',
    referenceNo: 'POL-33019-UI',
    crNumber: 'CR-11982-3',
    name: 'Jeddah Retail Holdings',
    status: 'Active',
    updatedOn: 'Oct 23, 2023',
  },
  {
    id: '9',
    referenceNo: 'POL-10293-MN',
    crNumber: 'CR-55610-7',
    name: 'Dammam Cold Storage Co.',
    status: 'Active',
    updatedOn: 'Oct 23, 2023',
  },
  {
    id: '10',
    referenceNo: 'POL-88172-GH',
    crNumber: 'CR-99201-4',
    name: 'Gulf Medical Supplies Co.',
    status: 'Active',
    updatedOn: 'Oct 22, 2023',
  },
  {
    id: '11',
    referenceNo: 'POL-44510-PL',
    crNumber: 'CR-11223-9',
    name: 'Najran Food Industries',
    status: 'Active',
    updatedOn: 'Oct 21, 2023',
  },
  {
    id: '12',
    referenceNo: 'POL-99001-AS',
    crNumber: 'CR-77881-2',
    name: 'Qassim Agriculture Co.',
    status: 'Active',
    updatedOn: 'Oct 20, 2023',
  },
  {
    id: '13',
    referenceNo: 'POL-11223-SD',
    crNumber: 'CR-44551-0',
    name: 'Tabuk Energy Solutions',
    status: 'Active',
    updatedOn: 'Oct 19, 2023',
  },
  {
    id: '14',
    referenceNo: 'POL-77341-WQ',
    crNumber: 'CR-00192-8',
    name: 'Makkah Facilities Management',
    status: 'Active',
    updatedOn: 'Oct 18, 2023',
  },
  {
    id: '15',
    referenceNo: 'POL-55612-VB',
    crNumber: 'CR-33210-6',
    name: 'Khobar IT Services LLC',
    status: 'Active',
    updatedOn: 'Oct 17, 2023',
  },
];

export const ENDORSEMENT_REASONS = [
  'Coverage Limit Update',
  'New Beneficiary Added',
  'Address Change',
  'Premium Adjustment',
  'Other',
];

export const INDUSTRY_SEGMENTS = ['Residential', 'Commercial', 'Industrial', 'Hospitality', 'Educational', 'Healthcare'];
export const INTEREST_TYPES = ['Building', 'Contents', 'Machinery', 'Stocks', 'Fixtures & Fittings'];
export const RISK_CATEGORIES = ['Low', 'Medium', 'High', 'Special Risk'];
export const CONSTRUCTION_MATERIALS = ['Concrete', 'Steel Frame', 'Masonry', 'Wood', 'Other'];
export const CITIES = ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina', 'Tabuk', 'Abha'];
export const YEARS = Array.from({ length: 75 }, (_, i) => (new Date().getFullYear() - i).toString());
