import React, { useState, useEffect } from 'react';

import { Heart, Lock, CheckCircle, ArrowRight, Users } from 'lucide-react';
import { PROJECTS_DATA, NGO_DETAILS } from '../data';
import { useAppState } from '../context/StateContext';






export const DonationPortal = ({
  prefilledProjectTitle,
  onClearPrefilledProject
}) => {
  const { donations, addDonation, totalDonationAmount } = useAppState();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [targetProject, setTargetProject] = useState('General Fund (Any Program Needed)');
  const [frequency, setFrequency] = useState('one-time');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Donor details
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [fpxBank, setFpxBank] = useState('maybank2u');

  // Submit errors
  const [errorText, setErrorText] = useState('');

  // Handle prefilled project selections
  useEffect(() => {
    if (prefilledProjectTitle) {
      setTargetProject(prefilledProjectTitle);
    }
  }, [prefilledProjectTitle]);

  const handleAmountPreset = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  const validateStep1 = () => {
    if (amount <= 0) {
      setErrorText('Please select or specify a valid donation amount.');
      return false;
    }
    setErrorText('');
    return true;
  };

  const validateStep2 = () => {
    if (!isAnonymous && !donorName.trim()) {
      setErrorText('Please specify your name or select "Donate anonymously".');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorText('Please enter a valid supporter email address.');
      return false;
    }
    setErrorText('');
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorText('');

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        setErrorText('Please enter all requested simulated credit card details.');
        return;
      }
    }

    // Process donation to global Context state
    addDonation({
      donorName: isAnonymous ? 'Anonymous Supporter' : donorName,
      email: email,
      amount: amount,
      isAnonymous: isAnonymous,
      frequency: frequency,
      targetProject: targetProject,
      paymentMethod: paymentMethod
    });

    // Move to success receipt
    setStep(4);
    onClearPrefilledProject();
  };

  const resetForm = () => {
    setStep(1);
    setAmount(100);
    setCustomAmount('');
    setDonorName('');
    setEmail('');
    setIsAnonymous(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  // Convert to beautiful Malaysia currency format
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const presets = [
  { value: 35, impact: "Sponsors 1 standard school kit and Orang Asli reading book" },
  { value: 100, impact: "Provides half a bio-sand clean water filtering unit" },
  { value: 250, impact: "Co-builds 1 custom solar classroom hanging grid lantern" },
  { value: 500, impact: "Equips full toolbelt & supplies for 1 homestay upgrade" }];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16">
      
      {/* LEFT: Complete Multi-Step Form panel */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative">
        <div className="absolute top-8 right-8 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3.5 py-1 rounded-full flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Simulated Secure Portal</span>
        </div>

        {/* Process Header */}
        <div className="space-y-4 mb-8">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">Sovereignty Sponsor</span>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Supporting MOVE Programs
          </h1>
          
          {/* Progress state banner */}
          {step < 4 &&
          <div className="flex items-center gap-2 pt-2">
              {[1, 2, 3].map((s) =>
            <div key={s} className="flex-1 h-2 rounded-full relative bg-slate-100">
                  <div className={`absolute inset-y-0 left-0 rounded-full bg-emerald-600 transition-all duration-300 ${step >= s ? 'w-full' : 'w-0'}`}></div>
                </div>
            )}
            </div>
          }
        </div>

        {errorText &&
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-xs font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
            <span>{errorText}</span>
          </div>
        }

        {/* STEP 1: AMOUNT SPECIFICATION */}
        {step === 1 &&
        <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-800 font-sans block">Select Contribution Impact Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {presets.map((p) =>
              <button
                key={p.value}
                id={`preset-btn-${p.value}`}
                type="button"
                onClick={() => handleAmountPreset(p.value)}
                className={`p-5 rounded-2xl text-left border cursor-pointer transition flex flex-col justify-between h-28 ${
                amount === p.value && !customAmount ?
                'border-emerald-600 bg-emerald-50/50 shadow-sm shadow-emerald-600/5' :
                'border-slate-100 hover:border-slate-200'}`
                }>
                
                    <span className="text-lg font-extrabold text-slate-900">{formatCurrency(p.value)}</span>
                    <span className="text-[10px] text-slate-500 font-medium leading-normal block mt-1">{p.impact}</span>
                  </button>
              )}
              </div>
            </div>

            {/* Custom inputs */}
            <div className="space-y-3">
              <label htmlFor="custom-donation-input" className="text-sm font-bold text-slate-800 font-sans block">Or enter custom amount (RM):</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-400 text-sm font-semibold">RM</span>
                <input
                id="custom-donation-input"
                type="number"
                placeholder="Other amount..."
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800" />
              
              </div>
            </div>

            {/* Designated causes */}
            <div className="space-y-3">
              <label htmlFor="designated-project-select" className="text-sm font-bold text-slate-800 font-sans block">Designate to project:</label>
              <select
              id="designated-project-select"
              value={targetProject}
              onChange={(e) => setTargetProject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 cursor-pointer">
              
                <option value="General Fund (Any Program Needed)">General Fund (Mobilize wherever urgent)</option>
                {PROJECTS_DATA.map((p) =>
              <option key={p.id} value={p.title}>{p.title}</option>
              )}
              </select>
            </div>

            {/* Frequency selection */}
            <div className="flex items-center gap-8 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Donation Cycle:</span>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                  type="radio"
                  name="freq"
                  checked={frequency === 'one-time'}
                  onChange={() => setFrequency('one-time')}
                  className="text-emerald-600 focus:ring-emerald-500" />
                
                  <span>One-time Support</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                  type="radio"
                  name="freq"
                  checked={frequency === 'monthly'}
                  onChange={() => setFrequency('monthly')}
                  className="text-emerald-600 focus:ring-emerald-500" />
                
                  <span>Monthly Contribution</span>
                </label>
              </div>
            </div>

            {/* S1 Next controls */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
              id="donate-step1-next"
              onClick={() => validateStep1() && setStep(2)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md inline-flex">
              
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        }

        {/* STEP 2: SUPPORTER PROFILE */}
        {step === 2 &&
        <div className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-slate-600 mb-4">
              <span>Contribution Selected:</span>
              <span className="text-emerald-800 text-sm font-extrabold">{formatCurrency(amount)} / {frequency === 'monthly' ? 'monthly' : 'one-time'}</span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-widest cursor-pointer">
                <input
                id="donate-is-anonymous-checkbox"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500" />
              
                <span>Donate anonymously on the public feed</span>
              </label>
              <p className="text-[10px] text-slate-400 leading-normal pl-6">
                If checked, your name won't appear on the live donation feed log but we will still send a private receipt to your email address listed below.
              </p>
            </div>

            {!isAnonymous &&
          <div className="space-y-2">
                <label htmlFor="donor-full-name" className="text-sm font-bold text-slate-800 block">Your Name</label>
                <input
              id="donor-full-name"
              type="text"
              placeholder="Full Name / Corporate Sponsor name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400" />
            
              </div>
          }

            <div className="space-y-2">
              <label htmlFor="donor-email-address" className="text-sm font-bold text-slate-800 block">Email Address (For Tax Receipt)</label>
              <input
              id="donor-email-address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400" />
            
            </div>

            {/* S2 Navigation Button group */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
              id="donate-step2-back"
              onClick={() => setStep(1)}
              className="text-slate-500 hover:text-slate-850 font-semibold cursor-pointer text-sm">
              
                Back to amount
              </button>
              <button
              id="donate-step2-next"
              onClick={() => validateStep2() && setStep(3)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md inline-flex">
              
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        }

        {/* STEP 3: PAYMENT SIMULATION */}
        {step === 3 &&
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-slate-600 mb-4">
              <span>Allocating to:</span>
              <span className="text-emerald-800 text-xs sm:text-sm font-extrabold max-w-[200px] text-right truncate">{targetProject}</span>
            </div>

            {/* Selector methods */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">Choose payment route:</span>
              <div className="grid grid-cols-3 gap-3">
                {[
              { id: 'card', label: 'Credit Card / Visa' },
              { id: 'fpx', label: 'FPX Internet Banking (MY)' },
              { id: 'paypal', label: 'PayPal Account' }].
              map((p) =>
              <button
                key={p.id}
                id={`pay-method-${p.id}`}
                type="button"
                onClick={() => setPaymentMethod(p.id)}
                className={`py-3.5 border rounded-xl text-center cursor-pointer font-bold text-[10px] sm:text-xs transition ${
                paymentMethod === p.id ?
                'border-emerald-600 bg-emerald-50/40 text-emerald-800' :
                'border-slate-200 text-slate-600 hover:bg-slate-50'}`
                }>
                
                    {p.label}
                  </button>
              )}
              </div>
            </div>

            {/* Card form */}
            {paymentMethod === 'card' &&
          <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="simulate-card-num" className="text-xs font-bold text-slate-700 block">Simulated Card Number</label>
                  <input
                id="simulate-card-num"
                type="text"
                placeholder="4111 2222 3333 4444"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 font-mono" />
              
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="simulate-card-exp" className="text-xs font-bold text-slate-700 block">Expiration Date</label>
                    <input
                  id="simulate-card-exp"
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 font-mono text-center" />
                
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="simulate-card-cvv" className="text-xs font-bold text-slate-700 block">Secure CVV</label>
                    <input
                  id="simulate-card-cvv"
                  type="password"
                  placeholder="•••"
                  maxLength={3}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 font-mono text-center" />
                
                  </div>
                </div>
              </div>
          }

            {/* FPX Select */}
            {paymentMethod === 'fpx' &&
          <div className="space-y-3">
                <label htmlFor="simulate-fpx-bank" className="text-xs font-bold text-slate-700 block">Select Malaysian Bank</label>
                <select
              id="simulate-fpx-bank"
              value={fpxBank}
              onChange={(e) => setFpxBank(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-200 focus:border-emerald-500 text-slate-700">
              
                  <option value="maybank2u">Maybank2U</option>
                  <option value="cimb_clicks">CIMB Clicks</option>
                  <option value="public_bank">Public Bank</option>
                  <option value="rhb_now">RHB Now</option>
                  <option value="bank_islam">Bank Islam</option>
                </select>
                <p className="text-[10px] text-slate-400">FPX Direct Debit is optimized for local Malaysian bank clearing operations. Fully simulated securely.</p>
              </div>
          }

            {/* Paypal block */}
            {paymentMethod === 'paypal' &&
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                <p className="text-sm font-semibold text-slate-700">Simulate PayPal Checkout Single Sign-On</p>
                <p className="text-xs text-slate-400">Will redirect to a local simulation checkout popup. Press submit to finish.</p>
              </div>
          }

            {/* S3 Controls */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
              id="payment-back-btn"
              type="button"
              onClick={() => setStep(2)}
              className="text-slate-500 hover:text-slate-850 font-semibold cursor-pointer text-sm">
              
                Back to info
              </button>
              
              <button
              id="submit-payment-btn"
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl cursor-pointer shadow-lg inline-flex items-center gap-2 text-sm">
              
                <Heart className="w-4.5 h-4.5 text-white fill-white" />
                <span>Authorize {formatCurrency(amount)} Donation</span>
              </button>
            </div>
          </form>
        }

        {/* STEP 4: SUCCESS RECEIPT */}
        {step === 4 &&
        <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce pb-1.5">
              <CheckCircle className="w-10 h-10 shrink-0" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-sans tracking-tight">Receipt Authenticated!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Thank you for co-creating hope! Your simulated donation of <strong className="text-emerald-700">{formatCurrency(amount)}</strong> has been registered dynamically on the organization log.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left text-xs space-y-2 max-w-sm mx-auto font-mono">
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2 mb-2">
                <span className="font-bold text-slate-400">RECEIPT NO</span>
                <span className="text-slate-800 font-bold">MVR-{(Math.random() * 1000000).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sponsor Agency</span>
                <span className="text-slate-700 font-semibold">{NGO_DETAILS.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Billing Name</span>
                <span className="text-slate-700 font-semibold">{isAnonymous ? 'Anonymous Supporter' : donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Allocated Area</span>
                <span className="text-slate-700 font-semibold truncate max-w-[200px] text-right">{targetProject}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 mt-2">
                <span className="font-bold text-slate-800">TOTAL PAID</span>
                <span className="text-emerald-800 font-extrabold text-sm">{formatCurrency(amount)} {frequency === 'monthly' ? '/ mo' : ''}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
              id="reset-donation-btn"
              onClick={resetForm}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl cursor-pointer shadow-md inline-flex text-xs tracking-wider uppercase font-sans">
              
                Make Another Donation
              </button>
            </div>
          </div>
        }
      </div>

      {/* RIGHT: Live Donation Wall Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Dynamic global tracker box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono block">Real-time Fund Metrics</span>
            <div className="space-y-1">
              <span className="block text-[11px] text-slate-400 font-medium uppercase font-sans">Corporate & Public Aid Mobilized</span>
              <span className="text-3xl font-extrabold text-white block">
                {formatCurrency(850000 + totalDonationAmount)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Includes preloaded corporate matching allocations of RM850k + live session contributions from this sandbox browser tab.
            </p>
          </div>
        </div>

        {/* Live Wall List */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Sponsor Wall ({donations.length})</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-4 h-[350px] overflow-y-auto pr-1">
            {donations.map((d) =>
            <div key={d.id} className="p-3 bg-slate-50 border border-slate-100/55 rounded-xl space-y-1.5 transition hover:bg-slate-100/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 truncate max-w-[150px]">
                    {d.isAnonymous ? 'Anonymous' : d.donorName}
                  </span>
                  <span className="font-extrabold text-emerald-800 shrink-0">
                    +{formatCurrency(d.amount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                  <span className="truncate max-w-[160px]">{d.targetProject}</span>
                  <span>{new Date(d.date).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};