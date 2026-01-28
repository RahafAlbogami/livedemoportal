import React, { useState, useEffect } from 'react';
import { WizardState, RequestType, EndorsementAction, Policy, Property } from '../../types';
import { 
  ENDORSEMENT_REASONS, 
  DUMMY_POLICIES, 
  INDUSTRY_SEGMENTS, 
  INTEREST_TYPES, 
  RISK_CATEGORIES, 
  CONSTRUCTION_MATERIALS, 
  CITIES, 
  YEARS 
} from '../../constants';
import { generateEndorsementDetails } from '../../services/geminiService';

interface StepProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
  next: () => void;
  back: () => void;
  onGenerate?: () => void;
  isDirect?: boolean;
}

export const Step1: React.FC<StepProps> = ({ data, updateData, next }) => {
  const options: { id: RequestType; title: string; desc: string; icon: string }[] = [
    { id: 'quotation', title: 'New Quotation', desc: 'Create a fresh price quote for a new prospect or lead.', icon: 'note_add' },
    { id: 'renewal', title: 'Renewal', desc: 'Extend an expiring or recently expired policy for another term.', icon: 'autorenew' },
    { id: 'endorsement', title: 'Endorsement', desc: 'Modify coverage, add assets, or update details on an active policy.', icon: 'edit_note' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => updateData({ requestType: opt.id })}
            className={`flex flex-col gap-4 p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg relative
              ${data.requestType === opt.id 
                ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-md' 
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}
          >
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors 
              ${data.requestType === opt.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              <span className="material-symbols-outlined text-3xl">{opt.icon}</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className={`text-xl font-bold ${data.requestType === opt.id ? 'text-primary' : ''}`}>{opt.title}</p>
              <p className="text-[#617589] dark:text-gray-400 text-sm leading-relaxed">{opt.desc}</p>
            </div>
            {data.requestType === opt.id && (
               <div className="absolute top-3 right-3 text-primary">
                 <span className="material-symbols-outlined">check_circle</span>
               </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-12 pt-8 border-t dark:border-gray-800">
        <button onClick={() => window.history.back()} className="font-bold text-gray-500 hover:text-gray-700">Cancel</button>
        <button 
          onClick={next}
          disabled={!data.requestType}
          className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${!data.requestType ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export const Step2: React.FC<StepProps> = ({ data, updateData, next, back }) => {
  const options: { id: EndorsementAction; title: string; desc: string; icon: string; linkText: string; linkIcon: string }[] = [
    { id: 'add', title: 'Add Endorsement', desc: 'Include a new coverage, additional insured, or specific rider.', icon: 'add_circle', linkText: 'Get Started', linkIcon: 'arrow_forward' },
    { id: 'update', title: 'Update Endorsement', desc: 'Modify terms, limits, deductibles, or specific details.', icon: 'edit_document', linkText: 'Modify Terms', linkIcon: 'arrow_forward' },
    { id: 'cancel', title: 'Cancel Endorsement', desc: 'Remove an active endorsement and recalculate premium.', icon: 'cancel', linkText: 'Remove Active', linkIcon: 'delete' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black">What change are we making?</h1>
          <p className="text-gray-500">Choose the type of endorsement modification.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => updateData({ endorsementAction: opt.id })}
            className={`group cursor-pointer flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border-2 transition-all hover:shadow-lg relative
              ${data.endorsementAction === opt.id ? 'border-primary bg-primary/5' : 'border-[#e2e8f0] dark:border-gray-800 hover:border-primary/50'}`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 
              ${opt.id === 'cancel' ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'}`}>
              <span className="material-symbols-outlined text-[32px]">{opt.icon}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{opt.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{opt.desc}</p>
            </div>
            <div className={`mt-auto pt-4 flex items-center font-bold text-sm ${opt.id === 'cancel' ? 'text-red-500' : 'text-primary'}`}>
              <span>{opt.linkText}</span>
              <span className="material-symbols-outlined ml-1 text-[18px] group-hover:translate-x-1 transition-transform">{opt.linkIcon}</span>
            </div>
            {data.endorsementAction === opt.id && (
               <div className="absolute top-3 right-3 text-primary">
                 <span className="material-symbols-outlined">check_circle</span>
               </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-12 pt-8 border-t dark:border-gray-800">
        <button onClick={back} className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-bold">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button 
          onClick={next}
          disabled={!data.endorsementAction}
          className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${!data.endorsementAction ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
        >
          Continue to Policy Selection
        </button>
      </div>
    </div>
  );
};

export const PolicySelectionStep: React.FC<StepProps> = ({ data, updateData, next, back }) => {
  const activePolicies = DUMMY_POLICIES.filter(p => p.status === 'Active');
  
  const handleSelect = (policy: Policy) => {
    updateData({ 
      selectedPolicy: policy,
      policyReference: policy.referenceNo 
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-black">Select Active Policy</h1>
        <p className="text-gray-500">Choose the policy you wish to apply the endorsement to.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activePolicies.map((policy) => (
          <div 
            key={policy.id}
            onClick={() => handleSelect(policy)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group
              ${data.selectedPolicy?.id === policy.id 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'border-[#e2e8f0] dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/30'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`size-12 rounded-lg flex items-center justify-center transition-colors
                ${data.selectedPolicy?.id === policy.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div>
                <p className="font-bold text-lg">{policy.referenceNo}</p>
                <p className="text-sm text-gray-500">{policy.name} • {policy.crNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                 <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Status</p>
                 <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                   {policy.status}
                 </span>
               </div>
               <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors
                 ${data.selectedPolicy?.id === policy.id ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                 {data.selectedPolicy?.id === policy.id && <span className="material-symbols-outlined text-xs">check</span>}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t dark:border-gray-800">
        <button onClick={back} className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-bold">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <button 
          onClick={next}
          disabled={!data.selectedPolicy}
          className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${!data.selectedPolicy ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export const Step3: React.FC<StepProps> = ({ data, updateData, next, back, onGenerate, isDirect }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(data.properties[0]?.id ?? null);

  useEffect(() => {
    // Keep the active card in sync with additions/removals.
    if (activePropertyId && !data.properties.some(p => p.id === activePropertyId)) {
      setActivePropertyId(data.properties[0]?.id ?? null);
    } else if (!activePropertyId && data.properties[0]) {
      setActivePropertyId(data.properties[0].id);
    }
  }, [data.properties, activePropertyId]);

  const createEmptyProperty = (): Property => ({
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
  });

  const handleAddProperty = () => {
    const created = createEmptyProperty();
    updateData({ properties: [...data.properties, created] });
    setActivePropertyId(created.id);
  };

  const handleRemoveProperty = (id: string) => {
    if (data.properties.length <= 1) return;
    updateData({ properties: data.properties.filter(p => p.id !== id) });
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    updateData({
      properties: data.properties.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const handleAiSuggest = async () => {
    setIsGenerating(true);
    const suggestion = await generateEndorsementDetails(data.reason, data.policyReference);
    updateData({ details: suggestion });
    setIsGenerating(false);
  };

  const handleBulkUpload = () => {
    alert("Excel Bulk Upload Triggered - Parsing template...");
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_document</span>
            Endorsement Application Form
          </h2>
          <p className="text-gray-500 text-sm">Policy Ref: <span className="font-bold text-gray-900 dark:text-white">{data.policyReference}</span> ({data.selectedPolicy?.name})</p>
        </div>
        <button 
          onClick={handleBulkUpload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <span className="material-symbols-outlined">table_view</span>
          Bulk Upload Excel
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Overall Effective Date</label>
            <input 
              type="date" 
              className="form-input rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-12 px-4"
              value={data.effectiveDate}
              onChange={(e) => updateData({ effectiveDate: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Reason for Endorsement</label>
            <select 
              className="form-select rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-12 px-4"
              value={data.reason}
              onChange={(e) => updateData({ reason: e.target.value })}
            >
              {ENDORSEMENT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">General Remarks / AI Assistant</label>
            <button 
              onClick={handleAiSuggest}
              disabled={isGenerating}
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              {isGenerating ? 'Analyzing...' : 'Auto-Generate Technical Remark'}
            </button>
          </div>
          <textarea 
            className="form-textarea w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4"
            rows={2}
            placeholder="Technical remarks for this endorsement package..."
            value={data.details}
            onChange={(e) => updateData({ details: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-primary text-white size-7 rounded-full flex items-center justify-center text-sm">
              {data.properties.length}
            </span>
            Listed Properties
          </h3>
          <div className="flex items-center gap-3">
            <p className="hidden md:block text-xs text-gray-400">
              Tip: for large submissions, use <span className="font-bold">Bulk Upload Excel</span>.
            </p>
            <button 
              onClick={handleAddProperty}
              className="text-primary font-bold flex items-center gap-1 text-sm bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              <span className="material-symbols-outlined">add_business</span> Add Another Property
            </button>
          </div>
        </div>

        {/* Efficient layout for large counts: scrollable list + always-visible active form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: property list */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/60 dark:bg-gray-800/30">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Properties</p>
              <p className="text-xs text-gray-400">{data.properties.length} total</p>
            </div>
            <div className="max-h-[60vh] overflow-auto">
              {data.properties.map((property, index) => {
                const isActive = (activePropertyId ?? data.properties[0]?.id) === property.id;
                const title = property.interestDescription?.trim() || `Property #${index + 1}`;
                const subtitleParts = [
                  property.city?.trim(),
                  property.industrySegment?.trim(),
                  property.locationName?.trim()
                ].filter(Boolean);

                return (
                  <div
                    key={property.id}
                    className={`px-5 py-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
                      isActive ? 'bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
                    }`}
                    onClick={() => setActivePropertyId(property.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                          Property #{index + 1}
                        </p>
                        <p className={`font-black text-sm truncate ${isActive ? 'text-primary' : ''}`}>{title}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {subtitleParts.length ? subtitleParts.join(' • ') : 'Select to edit details'}
                        </p>
                      </div>
                      {data.properties.length > 1 && (
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleRemoveProperty(property.id); }}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
                          title="Remove property"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: active property form */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md">
            {(() => {
              const active =
                data.properties.find(p => p.id === (activePropertyId ?? undefined)) ?? data.properties[0];
              if (!active) return null;
              const activeIndex = data.properties.findIndex(p => p.id === active.id);
              return (
                <>
                  <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col">
                      <span className="font-black text-sm uppercase tracking-widest text-gray-400">
                        Property #{activeIndex + 1}
                      </span>
                      <span className="text-sm font-black truncate">
                        {active.interestDescription?.trim() || 'Property Details'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const prev = data.properties[activeIndex - 1];
                          if (prev) setActivePropertyId(prev.id);
                        }}
                        disabled={activeIndex <= 0}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Previous property"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextProp = data.properties[activeIndex + 1];
                          if (nextProp) setActivePropertyId(nextProp.id);
                        }}
                        disabled={activeIndex >= data.properties.length - 1}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Next property"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2 lg:col-span-2">
                <label className="text-sm font-bold">Interest Description</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  placeholder="e.g. Main Warehouse Facility A"
                  value={active.interestDescription}
                  onChange={(e) => updateProperty(active.id, { interestDescription: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Interest Effective Date</label>
                <input 
                  type="date" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.interestEffectiveDate}
                  onChange={(e) => updateProperty(active.id, { interestEffectiveDate: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Location Name</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.locationName}
                  onChange={(e) => updateProperty(active.id, { locationName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Longitude</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.longitude}
                  onChange={(e) => updateProperty(active.id, { longitude: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Latitude</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.latitude}
                  onChange={(e) => updateProperty(active.id, { latitude: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Industry Segment</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.industrySegment}
                  onChange={(e) => updateProperty(active.id, { industrySegment: e.target.value })}
                >
                  <option value="">Select Segment</option>
                  {INDUSTRY_SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Property Usage (%)</label>
                <input 
                  type="number" 
                  max="100" min="0"
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.propertyUsage}
                  onChange={(e) => updateProperty(active.id, { propertyUsage: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Interest Type</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.interestType}
                  onChange={(e) => updateProperty(active.id, { interestType: e.target.value })}
                >
                  <option value="">Select Type</option>
                  {INTEREST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Risk Category</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.riskCategory}
                  onChange={(e) => updateProperty(active.id, { riskCategory: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {RISK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Total Area (sqm)</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.totalArea}
                  onChange={(e) => updateProperty(active.id, { totalArea: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Year of Construction</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.yearOfConstruction}
                  onChange={(e) => updateProperty(active.id, { yearOfConstruction: e.target.value })}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">No. of Floors</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.noOfFloors}
                  onChange={(e) => updateProperty(active.id, { noOfFloors: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Construction Material</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.constructionMaterial}
                  onChange={(e) => updateProperty(active.id, { constructionMaterial: e.target.value })}
                >
                  <option value="">Select Material</option>
                  {CONSTRUCTION_MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Min Deductible (SAR)</label>
                <input 
                  type="text" 
                  className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.minDeductible}
                  onChange={(e) => updateProperty(active.id, { minDeductible: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Country</label>
                <div className="flex items-center gap-2">
                   <input 
                    type="text" 
                    disabled
                    className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11 bg-gray-100 dark:bg-gray-800 flex-1 opacity-70"
                    value={active.country}
                  />
                  <div className="size-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-gray-400">
                    <span className="material-symbols-outlined text-sm">lock</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">City</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.city}
                  onChange={(e) => updateProperty(active.id, { city: e.target.value })}
                >
                  <option value="">Select City</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Claims History</label>
                <select 
                  className="form-select rounded-xl border-gray-200 dark:border-gray-700 h-11"
                  value={active.areThereAnyClaim}
                  onChange={(e) => updateProperty(active.id, { areThereAnyClaim: e.target.value })}
                >
                  <option value="No">No Claims</option>
                  <option value="Yes">Has Claims</option>
                </select>
              </div>

              {active.areThereAnyClaim === 'Yes' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Total Claim Amount (SAR)</label>
                  <input 
                    type="text" 
                    className="form-input rounded-xl border-gray-200 dark:border-gray-700 h-11 border-primary/30"
                    placeholder="Enter total amount..."
                    value={active.claimAmount}
                    onChange={(e) => updateProperty(active.id, { claimAmount: e.target.value })}
                  />
                </div>
              )}

              <div className="md:col-span-2 lg:col-span-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Safety & Security Systems</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                     <input type="checkbox" className="rounded text-primary focus:ring-primary size-5" checked={active.fireAlarm} onChange={(e) => updateProperty(active.id, { fireAlarm: e.target.checked })} />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold">Fire Alarm</span>
                     </div>
                   </label>
                   <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                     <input type="checkbox" className="rounded text-primary focus:ring-primary size-5" checked={active.securityBurglarAlarm} onChange={(e) => updateProperty(active.id, { securityBurglarAlarm: e.target.checked })} />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold">Burglar Alarm</span>
                     </div>
                   </label>
                   <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                     <input type="checkbox" className="rounded text-primary focus:ring-primary size-5" checked={active.cctv} onChange={(e) => updateProperty(active.id, { cctv: e.target.checked })} />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold">CCTV</span>
                     </div>
                   </label>
                   <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                     <input type="checkbox" className="rounded text-primary focus:ring-primary size-5" checked={active.sprinklerSystem} onChange={(e) => updateProperty(active.id, { sprinklerSystem: e.target.checked })} />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold">Sprinklers</span>
                     </div>
                   </label>
                 </div>
              </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-gray-200 dark:border-gray-700">
        <div>
          {!isDirect && (
            <button 
              onClick={back}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white font-bold hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span> Return to Selection
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl text-gray-400 font-bold hover:text-gray-700 transition-colors">Discard Application</button>
          <button 
            onClick={onGenerate}
            className="flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-white font-bold hover:brightness-110 shadow-xl shadow-primary/30 transition-all text-lg"
          >
            Generate Quotation <span className="material-symbols-outlined text-xl">receipt_long</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoadingView: React.FC<{ onCancel?: () => void }> = ({ onCancel }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Analyzing property risk factors...",
    "Consulting historical claim data...",
    "Applying underwriting guidelines...",
    "Calculating adjusted premium rates...",
    "Finalizing endorsement proposal..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center gap-6">
      <div className="relative">
        <div className="size-24 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl animate-pulse">calculate</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-[#111418] dark:text-white">Generating Detailed Quotation</h2>
        <p className="text-gray-500 font-medium h-6">{messages[msgIndex]}</p>
      </div>
      <div className="w-64 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-primary animate-[loading_5s_linear_forwards]"></div>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="mt-4 px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      )}
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export const QuotationView: React.FC<{ data: WizardState, updateData: (d: Partial<WizardState>) => void }> = ({ data, updateData }) => {
  
  const handleAccept = () => {
    const policyId = data.selectedPolicy?.id;
    if (policyId === '7') {
      updateData({ submissionStatus: 'expired_acc' });
    } else if (policyId === '1') {
      updateData({ submissionStatus: 'payment_form' });
    } else {
      alert("Endorsement Issued!");
    }
  };

  const handleDiscuss = () => {
    updateData({ submissionStatus: 'review_disc' });
  };

  const handleClose = () => {
    window.location.href = '#/';
  };

  if (data.submissionStatus === 'payment_form') {
    const canContinue =
      !!data.contactName.trim() &&
      !!data.contactId.trim() &&
      !!data.mobile.trim() &&
      !!data.iban.trim() &&
      !!data.paymentMethod;

    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Before Issuing</p>
              <h1 className="text-2xl font-black">Payment & Contact Details</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Contact Name</label>
              <input
                className="form-input rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-11 px-4"
                value={data.contactName}
                onChange={(e) => updateData({ contactName: e.target.value })}
                placeholder="e.g. Mohammed Alqahtani"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Contact ID</label>
              <input
                className="form-input rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-11 px-4"
                value={data.contactId}
                onChange={(e) => updateData({ contactId: e.target.value })}
                placeholder="National ID / Iqama"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Mobile</label>
              <input
                className="form-input rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-11 px-4"
                value={data.mobile}
                onChange={(e) => updateData({ mobile: e.target.value })}
                placeholder="05xxxxxxxx"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">IBAN</label>
              <input
                className="form-input rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-11 px-4"
                value={data.iban}
                onChange={(e) => updateData({ iban: e.target.value })}
                placeholder="SA00 0000 0000 0000 0000 0000"
              />
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm font-black mb-3">Payment Method</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => updateData({ paymentMethod: 'online' })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  data.paymentMethod === 'online'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                <p className="font-black">Online Client pay</p>
                <p className="text-xs text-gray-500 mt-1">Client completes payment online</p>
              </button>
              <button
                type="button"
                onClick={() => updateData({ paymentMethod: 'broker' })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  data.paymentMethod === 'broker'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                <p className="font-black">Pay By Broker</p>
                <p className="text-xs text-gray-500 mt-1">Broker will handle payment settlement</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => updateData({ submissionStatus: 'none' })}
              className="py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] text-gray-600 dark:text-gray-200 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Back to quotation
            </button>
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => updateData({ submissionStatus: 'success_acc' })}
              className={`py-3 px-6 rounded-xl font-black transition-all shadow-sm ${
                canContinue ? 'bg-primary text-white hover:brightness-110' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue & Issue Endorsement
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (data.submissionStatus === 'success_acc') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1a2632] border-2 border-green-500 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-green-500/10 rounded-full"></div>
          <div className="size-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40">
            <span className="material-symbols-outlined text-4xl">verified</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Endorsement Issued!</h1>
          <p className="text-gray-500 mb-6">
            Your endorsement for <span className="font-bold text-gray-900 dark:text-white">{data.policyReference}</span> is ready.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 text-left mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Summary</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Client</p>
                <p className="font-black">{data.selectedPolicy?.name || 'Client Name'}</p>
                <p className="text-sm text-gray-500">{data.selectedPolicy?.crNumber || 'CR Number'}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Properties</p>
                <p className="font-black">{data.properties.length}</p>
                <p className="text-sm text-gray-500">Assets included</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Contact</p>
                <p className="font-black">{data.contactName || '—'}</p>
                <p className="text-sm text-gray-500">{data.mobile || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment</p>
                <p className="font-black">{data.paymentMethod === 'online' ? 'Online Client pay' : data.paymentMethod === 'broker' ? 'Pay By Broker' : '—'}</p>
                <p className="text-sm text-gray-500">{data.iban || '—'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Downloading Policy Document...")}
            className="w-full py-3 px-6 rounded-xl bg-primary text-white font-black hover:brightness-110 shadow-lg shadow-primary/30 transition-all"
          >
            Download Policy Document
          </button>

          <button onClick={handleClose} className="text-primary font-bold hover:underline text-center w-full mt-5">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (data.submissionStatus === 'error_gen') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1a2632] border-2 border-red-500 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-red-500/10 rounded-full"></div>
          <div className="size-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/40">
            <span className="material-symbols-outlined text-4xl">error</span>
          </div>
          <h1 className="text-2xl font-black mb-2">Unexpected Error</h1>
          <p className="text-gray-500 mb-8">There is an unexpected Error please contact your system admin</p>
          <button onClick={handleClose} className="text-primary font-bold hover:underline text-center w-full">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  if (data.submissionStatus === 'delayed_gen') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1a2632] border-2 border-amber-500 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-amber-500/10 rounded-full"></div>
          <div className="size-20 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/40">
            <span className="material-symbols-outlined text-4xl">schedule</span>
          </div>
          <h1 className="text-2xl font-black mb-2">Taking longer than usual</h1>
          <p className="text-gray-500 mb-8">The Quotation is taking longer than usual please check the result late</p>
          <button onClick={handleClose} className="text-primary font-bold hover:underline text-center w-full">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  if (data.submissionStatus === 'declined') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1a2632] border-2 border-gray-300 dark:border-gray-700 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="size-20 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-4xl">info</span>
          </div>
          <h1 className="text-2xl font-black mb-2">Quotation Declined</h1>
          <p className="text-gray-500 mb-8">Sorry that the quotation was not suitable.</p>
          <button onClick={handleClose} className="text-primary font-bold hover:underline text-center w-full">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-[1200px] mx-auto animate-in fade-in duration-500 text-[#111418] dark:text-white">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Quotation Reference</p>
            <h1 className="text-3xl font-black tracking-tight">
              {data.policyReference || 'Q-2026-205-0000746'}
            </h1>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Review, validate, then issue the quotation.
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Client</p>
          <p className="text-lg font-black">{data.selectedPolicy?.name || 'Client Name'}</p>
          <p className="text-sm text-gray-500 mt-1">{data.selectedPolicy?.crNumber || 'CR Number'}</p>
        </div>
        <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Properties</p>
          <p className="text-3xl font-black">{data.properties.length}</p>
          <p className="text-sm text-gray-500 mt-1">Assets included in this quotation</p>
        </div>
        <div className="bg-gradient-to-r from-[#f1f5e9] to-[#e1e8d4] dark:from-gray-800 dark:to-gray-700 border border-[#d6deca] dark:border-gray-600 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-2">Status</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified</span>
            <p className="text-lg font-black">Ready to issue</p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Validate details before issuing</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Properties */}
          <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">location_on</span>
                <h2 className="text-lg font-black">Properties</h2>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {data.properties.length} total
              </p>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {data.properties.map((prop, idx) => (
                <div
                  key={prop.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/30 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-tight truncate">
                      {prop.interestDescription || `Property #${idx + 1}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {(prop.city || 'City')} • {(prop.industrySegment || 'Industry Segment')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(prop.constructionMaterial || 'Construction')} • Built in {(prop.yearOfConstruction || '—')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Indicative Sum</p>
                    <p className="font-black text-sm">SAR {idx === 0 ? '100,000.00' : '0.00'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Premium Breakdown */}
          <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">payments</span>
              <h2 className="text-lg font-black">Premium Breakdown</h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <p className="text-gray-600 dark:text-gray-300">Actual Premium</p>
                <p className="font-black">SAR 2,500.00</p>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <p className="text-gray-600 dark:text-gray-300">Fee Amount</p>
                <p className="font-black">SAR 25.00</p>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <p className="text-gray-600 dark:text-gray-300">VAT (15%)</p>
                <p className="font-black">SAR 378.75</p>
              </div>
              <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <p className="text-sm font-black">Total Premium</p>
                <p className="text-xl font-black text-green-700 dark:text-green-400">SAR 2,903.75</p>
              </div>

              {/* Inline actions for premium card */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => alert("Downloading PDF...")}
                  className="px-4 py-2 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary/5 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  Download Quotation
                </button>
                <div className="flex gap-2 ml-auto">
                  <button className="flex items-center gap-1 py-2 px-3 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                    Email <span className="material-symbols-outlined text-sm">mail</span>
                  </button>
                  <button className="flex items-center gap-1 py-2 px-3 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                    SMS <span className="material-symbols-outlined text-sm">sms</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick checklist */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/40 dark:to-[#1a2632] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Review Checklist</p>
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary mt-[1px]">check_circle</span>
                Confirm policy reference and client details
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary mt-[1px]">check_circle</span>
                Validate property list and locations
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary mt-[1px]">check_circle</span>
                Review premium breakdown and taxes
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scenario messages (buttons remain unchanged below) */}
      {data.submissionStatus === 'expired_acc' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400">timer_off</span>
            <div className="flex flex-col gap-1">
              <p className="font-black text-red-700 dark:text-red-300">The quotation duration has expired</p>
              <p className="text-sm text-red-700/80 dark:text-red-300/80">Please generate another quote.</p>
            </div>
          </div>
          <button
            onClick={() => updateData({ submissionStatus: 'none', view: 'form' })}
            className="w-full sm:w-auto sm:self-end py-3 px-6 rounded-xl bg-primary text-white font-black hover:brightness-110 shadow-lg shadow-primary/30 transition-all"
          >
            Generate another quote
          </button>
        </div>
      )}

      {data.submissionStatus === 'review_disc' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">hourglass_top</span>
          <div className="flex flex-col gap-1">
            <p className="font-black text-blue-700 dark:text-blue-300">The request is under review by the UW</p>
            <p className="text-sm text-blue-700/80 dark:text-blue-300/80">We’ll notify you once a decision is available.</p>
          </div>
        </div>
      )}

      {data.submissionStatus !== 'expired_acc' && (
        <>
          {/* Action Controls (positive on right, negative on left) */}
          <div className="flex flex-col gap-6 mt-2 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left (meta / negative) */}
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => updateData({ view: 'form', submissionStatus: 'none' })}
                  className="py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] text-primary font-bold text-sm hover:bg-primary/5 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit Info
                </button>
                <button 
                  onClick={() => { if(confirm("Decline this quotation?")) updateData({ submissionStatus: 'declined' }); }}
                  className="py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-[#1a2632] text-red-600 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                  Decline Quote
                </button>
              </div>

              {/* Right (positive actions) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
                <button 
                  onClick={handleDiscuss}
                  className="py-3 px-6 rounded-lg border border-primary/70 text-primary font-bold hover:bg-primary/5 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Discuss Price
                </button>
                <button 
                  onClick={handleAccept}
                  className="py-3 px-6 rounded-lg bg-primary text-white font-bold hover:brightness-110 transition-all text-sm shadow-sm"
                >
                  Issue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
