
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_POLICIES } from '../constants';
import { Policy, RequestType, EndorsementAction } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAction = (policy: Policy, action: EndorsementAction, type: RequestType) => {
    setOpenMenuId(null);
    // Passing state to wizard to bypass selection steps
    navigate('/wizard', { 
      state: { 
        policy, 
        action, 
        type,
        isDirect: true 
      } 
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Policy Administration
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage and track all insurance policy records across categories
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 text-[#111418] dark:text-white text-sm font-bold leading-normal transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
            <span className="material-symbols-outlined mr-2 text-lg">download</span>
            Export CSV
          </button>
          <button 
            onClick={() => navigate('/wizard')}
            className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal transition-all hover:brightness-110 shadow-lg shadow-primary/30"
          >
            <span className="material-symbols-outlined mr-2 text-lg">add</span>
            New Request
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm flex flex-col gap-4">
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <div className="flex-grow min-w-[300px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:ring-1 focus:ring-primary"
              placeholder="Filter by Policy No, Name, or ID..."
            />
          </div>
          <select className="w-full lg:w-48 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-600 rounded-lg h-12 px-4 text-sm font-medium">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <div className="w-full lg:w-48 flex items-center h-12 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-sm text-[#617589] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined mr-2 text-lg">calendar_today</span>
            Select Dates
          </div>
          <select className="w-full lg:w-48 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-600 rounded-lg h-12 px-4 text-sm font-medium">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden min-h-[400px]">
        <div className="flex border-b border-[#dbe0e6] dark:border-gray-700 px-6 gap-8 bg-gray-50/50 dark:bg-gray-800/30">
          <button 
            onClick={() => setActiveTab('All')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-4 pt-5 transition-colors ${activeTab === 'All' ? 'border-primary text-primary' : 'border-transparent text-[#617589] hover:text-[#111418]'}`}
          >
            <p className="text-sm font-bold leading-normal">All Policies (1,240)</p>
          </button>
          <button 
            onClick={() => setActiveTab('Renewal')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-4 pt-5 transition-colors ${activeTab === 'Renewal' ? 'border-primary text-primary' : 'border-transparent text-[#617589] hover:text-[#111418]'}`}
          >
            <p className="text-sm font-bold leading-normal">Renewal (45)</p>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider">Reference No.</th>
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider">CR Number</th>
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider">Updated On</th>
                <th className="px-6 py-4 text-xs font-bold text-[#617589] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
              {DUMMY_POLICIES.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 text-sm font-bold text-primary group-hover:underline underline-offset-4">{policy.referenceNo}</td>
                  <td className="px-6 py-4 text-sm text-[#111418] dark:text-gray-300">{policy.crNumber}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">{policy.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold 
                      ${policy.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30' : 
                        policy.status === 'Renewal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30' :
                        policy.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30'}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617589]">{policy.updatedOn}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => toggleMenu(e, policy.id)}
                      className="text-[#617589] hover:text-primary dark:hover:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                    {openMenuId === policy.id && (
                      <div 
                        ref={menuRef}
                        className="absolute right-6 top-10 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100] overflow-hidden py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {policy.status === 'Active' && (
                          <>
                            <button 
                              onClick={() => handleAction(policy, 'add', 'endorsement')}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-lg text-primary">add_circle</span>
                              Add Endorsement
                            </button>
                            <button 
                              onClick={() => handleAction(policy, 'update', 'endorsement')}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-lg text-blue-500">edit_document</span>
                              Update Endorsement
                            </button>
                            <button 
                              onClick={() => handleAction(policy, 'cancel', 'endorsement')}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-500"
                            >
                              <span className="material-symbols-outlined text-lg">cancel</span>
                              Cancel Endorsement
                            </button>
                          </>
                        )}
                        {policy.status === 'Expired' && (
                          <button 
                            onClick={() => handleAction(policy, 'add', 'renewal')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-lg text-green-500">autorenew</span>
                            Renew Policy
                          </button>
                        )}
                        {!['Active', 'Expired'].includes(policy.status) && (
                          <div className="px-4 py-2 text-xs text-gray-400 italic">No actions available</div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-white dark:bg-[#1a2632] border-t border-[#dbe0e6] dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 mt-auto">
          <p className="text-sm text-[#617589]">
            Showing <span className="font-bold text-[#111418] dark:text-white">1</span> to <span className="font-bold text-[#111418] dark:text-white">5</span> of <span className="font-bold text-[#111418] dark:text-white">1,240</span> results
          </p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-[#dbe0e6] dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold">1</button>
            <button className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">2</button>
            <button className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">3</button>
            <button className="p-2 rounded-lg border border-[#dbe0e6] dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
