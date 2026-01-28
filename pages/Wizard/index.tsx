import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WizardState, Policy, EndorsementAction, RequestType, Property } from '../../types';
import { Step1, Step2, Step3, PolicySelectionStep, LoadingView, QuotationView } from './WizardSteps';
import { generateDetailedQuotation } from '../../services/geminiService';

const Wizard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const directState = location.state as { policy: Policy, action: EndorsementAction, type: RequestType, isDirect: boolean } | null;

  const initialProperty: Property = {
    id: Math.random().toString(36).substr(2, 9),
    interestDescription: '',
    longitude: '',
    latitude: '',
    interestEffectiveDate: '',
    industrySegment: '',
    propertyUsage: 0,
    interestType: '',
    riskCategory: '',
    totalArea: '',
    yearOfConstruction: '',
    noOfFloors: '',
    constructionMaterial: '',
    minDeductible: '',
    fireAlarm: false,
    securityBurglarAlarm: false,
    cctv: false,
    sprinklerSystem: false,
    locationName: '',
    country: 'Saudi Arabia',
    city: '',
    areThereAnyClaim: 'No',
    claimAmount: '',
  };

  const [wizardData, setWizardData] = useState<WizardState>({
    step: directState?.isDirect ? 4 : 1,
    view: 'form',
    submissionStatus: 'none',
    requestType: directState?.type || null,
    endorsementAction: directState?.action || null,
    policyReference: directState?.policy.referenceNo || '',
    selectedPolicy: directState?.policy || null,
    effectiveDate: new Date().toISOString().split('T')[0],
    reason: 'Coverage Limit Update',
    details: '',
    properties: [initialProperty],
    quotationDetails: '',
    contactName: '',
    contactId: '',
    mobile: '',
    iban: '',
    paymentMethod: null,
  });

  const updateData = (updates: Partial<WizardState>) => {
    setWizardData(prev => ({ ...prev, ...updates }));
  };

  const handleGenerateQuotation = async () => {
    // Show loading view immediately
    updateData({ view: 'loading', submissionStatus: 'none' });

    // Run fake quotation generation and a fixed 2s delay in parallel
    const [details] = await Promise.all([
      generateDetailedQuotation(wizardData),
      new Promise<void>((resolve) => setTimeout(resolve, 2000)),
    ]);

    // Keep scenarios based on policy for your demo behaviour
    const policyId = wizardData.selectedPolicy?.id;
    let status: WizardState['submissionStatus'] = 'none';

    if (policyId === '5') {
      status = 'error_gen';
    } else if (policyId === '6') {
      status = 'delayed_gen';
    }

    // After ~2s, always move to the quotation view
    updateData({
      view: 'quotation',
      quotationDetails: details,
      submissionStatus: status
    });
  };

  const next = () => {
    let nextStep = wizardData.step + 1;
    if (wizardData.step === 1 && wizardData.requestType === 'quotation') nextStep = 4;
    else if (wizardData.step === 1 && wizardData.requestType === 'renewal') nextStep = 3;
    updateData({ step: nextStep });
  };

  // Fixed: Changed 'wizardTab' to 'wizardData' to resolve the reference error
  const back = () => {
    let prevStep = wizardData.step - 1;
    if (wizardData.step === 4 && wizardData.requestType === 'quotation') prevStep = 1;
    else if (wizardData.step === 3 && wizardData.requestType === 'renewal') prevStep = 1;
    else if (wizardData.step === 4 && wizardData.requestType === 'renewal') prevStep = 3;
    updateData({ step: Math.max(1, prevStep) });
  };

  const handleCancelLoading = () => {
    updateData({ 
      view: 'form',
      submissionStatus: 'none'
    });
  };

  const renderStep = () => {
    if (wizardData.step === 4) {
      if (wizardData.view === 'loading') return <LoadingView onCancel={handleCancelLoading} />;
      if (wizardData.view === 'quotation') return <QuotationView data={wizardData} updateData={updateData} />;
      return (
        <Step3
          data={wizardData}
          updateData={updateData}
          next={next}
          back={back}
          onGenerate={handleGenerateQuotation}
          isDirect={!!directState?.isDirect}
        />
      );
    }
    
    switch (wizardData.step) {
      case 1: return <Step1 data={wizardData} updateData={updateData} next={next} back={back} />;
      case 2: return <Step2 data={wizardData} updateData={updateData} next={next} back={back} />;
      case 3: return <PolicySelectionStep data={wizardData} updateData={updateData} next={next} back={back} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">
      {wizardData.view === 'form' && (
        <>
          <div className="flex flex-wrap gap-2 mb-6 items-center text-sm text-gray-500 font-medium">
             <a href="#" className="hover:text-primary text-xs">Policy Management</a>
             <span className="material-symbols-outlined text-[12px]">chevron_right</span>
             <span className="text-gray-900 dark:text-white text-xs">New Request</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black mb-1">
              {directState?.isDirect 
                ? `${directState.action.charAt(0).toUpperCase() + directState.action.slice(1)} ${directState.type.charAt(0).toUpperCase() + directState.type.slice(1)}` 
                : 'New Request'}
            </h1>
            <p className="text-gray-500 text-sm">
              {directState?.isDirect 
                ? `Providing details for ${directState.policy.referenceNo}`
                : (wizardData.requestType === 'endorsement' ? 'Modifying an existing policy' : 
                   wizardData.requestType === 'renewal' ? 'Renewing an existing policy' : 
                   'Starting a new quotation')}
            </p>
          </div>
        </>
      )}

      <div className="min-h-[400px]">
        {renderStep()}
      </div>
    </div>
  );
};

export default Wizard;