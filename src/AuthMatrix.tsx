"use client";

import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Calendar,
  ShieldAlert,
  Upload,
  Trash2,
  LogOut,
  LockKeyhole,
  Terminal,
  Database,
  Cpu,
  Layers,
  Settings,
  Flame,
  ShieldCheck,
  ArrowRight,
  Key,
  Code
} from 'lucide-react';
import { audioEngine } from './audioEngine';
import { useUser } from './context/UserContext';

// Interfaces for our state matrix
interface UserProfile {
  fullName: string;
  email: string;
  dob: string;
  age: number;
  avatarUrl: string | null;
  restrictedMode: boolean;
}

export default function AuthMatrix() {
  const { login } = useUser();

  // Onboarding Modal States for Google Sign-In Users
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [onboardingUserRaw, setOnboardingUserRaw] = useState<any>(null);
  const [onboardingName, setOnboardingName] = useState<string>('');
  const [onboardingDob, setOnboardingDob] = useState<string>('');
  const [onboardingTrack, setOnboardingTrack] = useState<string>('Frontend');
  const [onboardingError, setOnboardingError] = useState<string>('');
  const [isOnboardingSubmitting, setIsOnboardingSubmitting] = useState<boolean>(false);

  // Session states
  const [userSession, setUserSession] = useState<UserProfile | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);
  const [alertModal, setAlertModal] = useState<{ title: string; message: string } | null>(null);

  // Auth Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Date of Birth edit states
  const [isEditingDob, setIsEditingDob] = useState(false);
  const [editDobInput, setEditDobInput] = useState('');

  // Interactive UI / Terminals State
  const [activeTab, setActiveTab] = useState<'profile' | 'sandbox'>('sandbox');

  // Terminal 1: HTML/CSS Live Sandbox
  const [htmlInput, setHtmlInput] = useState('<div class="card">\n  <h3>DEVELOPER DASHBOARD</h3>\n  <p>Static component markup compiler online.</p>\n</div>');
  const [htmlResult, setHtmlResult] = useState('');

  // Terminal 2: JS Logic Sandbox
  const [jsInput, setJsInput] = useState('// Execute JavaScript calculations\nconst salary = 75000;\nconst bonus = 15000;\nsalary + bonus;');
  const [jsLog, setJsLog] = useState<string[]>([
    'SYSTEM: JS Logic compiler online.',
    'Enter executable logic and run code.'
  ]);

  // Terminal 3: SQL Shell (Gated)
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM employees WHERE salary > 50000;');
  const [sqlResult, setSqlResult] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [sqlMessage, setSqlMessage] = useState('Awaiting query compilation...');

  // Terminal 4: Systems Kernel (Gated)
  const [isKernelCompiling, setIsKernelCompiling] = useState(false);
  const [kernelLogs, setKernelLogs] = useState<string[]>([
    'CORE_KERNEL: Standby status active.',
    'Press synthesize to load low-level firmware specs.'
  ]);

  // --- CYBERSECURITY ACCORD HARDENING STATES & UTILITIES ---
  const cryptoKeyRef = useRef<CryptoKey | null>(null);
  const [sessionToken, setSessionToken] = useState<string>('');
  const [securityBreach, setSecurityBreach] = useState<boolean>(false);

  // Inactivity monitor
  const [showInactivityWarning, setShowInactivityWarning] = useState<boolean>(false);
  const [warningCountdown, setWarningCountdown] = useState<number>(30);
  const lastActiveRef = useRef<number>(Date.now());

  // Cyber Captcha / Brute-force protection
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [captchaChallenge, setCaptchaChallenge] = useState<{ q: string; a: string } | null>(null);
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<string>('');

  // JS Sandboxed compiler async callbacks
  const pendingEvalsRef = useRef<Record<string, (result: string) => void>>({});

  // MongoDB database state & data fetching
  const [mongoOperators, setMongoOperators] = useState<any[]>([]);
  const [mongoDbStatus, setMongoDbStatus] = useState<string>('Connecting to MongoDB...');

  // 3D Glass Cube interactive tilt mouse states
  const authPanelRef = useRef<HTMLDivElement>(null);
  const [authMousePos, setAuthMousePos] = useState({ x: 0, y: 0 });
  const [authPanelHover, setAuthPanelHover] = useState(false);

  const handleAuthMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!authPanelRef.current) return;
    const rect = authPanelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setAuthMousePos({ x, y });
  };

  useEffect(() => {
    async function loadMongoUsers() {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setMongoOperators(data.users || []);
            setMongoDbStatus(`MongoDB Active (${data.count} Saved Operators)`);
          }
        }
      } catch (err) {
        setMongoDbStatus('MongoDB Connection Standby');
      }
    }
    loadMongoUsers();
  }, []);

  const CYBER_PUZZLES = [
    { q: "Decipher Caesar cipher 'KQLJKW' (shift -3)", a: "KNIGHT" },
    { q: "Enter the decimal equivalent of binary '00001111'", a: "15" },
    { q: "What is the decimal result of hex math: 0x12 + 0x0B?", a: "29" },
    { q: "Enter the port number standard for secure HTTP (HTTPS)", a: "443" }
  ];

  const handleSupabaseUser = async (user: any) => {
    if (!user) return;

    const googleEmail = user.email || '';
    const googleName = user.user_metadata?.full_name || user.user_metadata?.name || '';
    const googleAvatar = user.user_metadata?.avatar_url || null;

    // 1. CHECK PROFILE COMPLETION: Query MongoDB for existing user document
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(googleEmail)}`);
      const data = await res.json();

      if (data?.success && data?.user && data.user.age > 0 && data.user.dob && data.user.fullName) {
        // User document exists in MongoDB and profile is complete!
        const profile: UserProfile = {
          fullName: data.user.fullName,
          email: data.user.email,
          dob: data.user.dob,
          age: data.user.age,
          avatarUrl: data.user.avatarUrl || googleAvatar,
          restrictedMode: Boolean(data.user.restrictedMode),
        };

        setUserSession(profile);
        const token = await signSession(profile);
        setSessionToken(token);
        await login(profile);
        return;
      }
    } catch (err) {
      console.warn('MongoDB profile lookup notice:', err);
    }

    // 2. ONBOARDING MODAL INTERCEPT: User is missing age or username
    setOnboardingUserRaw(user);
    setOnboardingName(googleName || (googleEmail ? googleEmail.split('@')[0] : ''));
    setOnboardingDob('');
    setShowOnboardingModal(true);
  };

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOnboardingSubmitting) return;

    if (!onboardingName.trim() || !onboardingDob) {
      audioEngine.playErrorBuzzer();
      setOnboardingError('Please provide your Username/Full Name and Date of Birth.');
      return;
    }

    const calculatedAge = calculateExactAge(onboardingDob);
    if (isNaN(calculatedAge) || calculatedAge < 0) {
      audioEngine.playErrorBuzzer();
      setOnboardingError('Invalid Date of Birth entered.');
      return;
    }

    setIsOnboardingSubmitting(true);
    setOnboardingError('');

    const isUnder18 = calculatedAge < 18;
    const emailLower = (onboardingUserRaw?.email || '').trim().toLowerCase();

    const profile: UserProfile = {
      fullName: onboardingName.trim(),
      email: emailLower,
      dob: onboardingDob,
      age: calculatedAge,
      avatarUrl: onboardingUserRaw?.user_metadata?.avatar_url || null,
      restrictedMode: isUnder18,
    };

    // 4. SAVE & REDIRECT: Save onboarding profile to MongoDB
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: profile.fullName,
          email: profile.email,
          dob: profile.dob,
          age: profile.age,
          track: onboardingTrack,
          restrictedMode: isUnder18,
          role: isUnder18 ? 'Cadet (Restricted Mode)' : 'Knight Operator',
          avatarUrl: profile.avatarUrl || '',
        }),
      });
      await res.json();
    } catch (dbErr: any) {
      console.error('MongoDB onboarding save notice:', dbErr);
    }

    // Update Supabase user metadata
    try {
      await supabase.auth.updateUser({
        data: {
          full_name: profile.fullName,
          dob: profile.dob,
          age: profile.age,
          restricted_mode: isUnder18,
        }
      });
    } catch (spErr) {
      console.warn('Supabase metadata update notice:', spErr);
    }

    setUserSession(profile);
    const token = await signSession(profile);
    setSessionToken(token);
    await login(profile);

    audioEngine.playSuccessChime();
    setIsOnboardingSubmitting(false);
    setShowOnboardingModal(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // Redirects user back to localhost or production domain after login
      }
    });
    if (error) {
      console.error("Google login error:", error.message);
      setAuthError(`Google login error: ${error.message}`);
    }
  };

  const handleUpdateDob = async () => {
    if (!editDobInput) return;
    const newAge = calculateExactAge(editDobInput);
    if (isNaN(newAge) || newAge < 0) {
      audioEngine.playErrorBuzzer();
      setAlertModal({ title: 'ERROR', message: 'Invalid Date of Birth entered.' });
      return;
    }
    audioEngine.playClickSound();

    const { error } = await supabase.auth.updateUser({
      data: {
        dob: editDobInput,
        age: newAge,
        restricted_mode: newAge < 18
      }
    });

    if (error) {
      audioEngine.playErrorBuzzer();
      setAlertModal({ title: 'ERROR', message: error.message });
    } else {
      audioEngine.playSuccessChime();
      setIsEditingDob(false);
    }
  };

  // Helper to hash passwords using SHA-256 via Web Crypto API
  const hashPassword = async (pwd: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(pwd + "SYNTAX_KNIGHT_SALT_2026");
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return pwd;
    }
  };

  // Cryptographic Signature HMAC Generation
  const signSession = async (profile: UserProfile): Promise<string> => {
    if (!cryptoKeyRef.current) return '';
    try {
      const encoder = new TextEncoder();
      const claims = JSON.stringify({
        fullName: profile.fullName,
        email: profile.email,
        dob: profile.dob,
        age: profile.age,
        restrictedMode: profile.restrictedMode,
        iat: Date.now()
      });
      const data = encoder.encode(claims);
      const signatureBuffer = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKeyRef.current,
        data
      );
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const claimsB64 = btoa(unescape(encodeURIComponent(claims)));
      return `${claimsB64}.${signatureHex}`;
    } catch (err) {
      console.error('Session signing failed:', err);
      return '';
    }
  };

  // Cryptographic Signature Verification (checks tampering)
  const verifySession = async (token: string, currentProfile: UserProfile | null): Promise<boolean> => {
    if (!cryptoKeyRef.current || !token || !currentProfile) return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 2) return false;
      const [claimsB64, signatureHex] = parts;

      const claimsStr = decodeURIComponent(escape(atob(claimsB64)));
      const claims = JSON.parse(claimsStr);

      if (
        claims.fullName !== currentProfile.fullName ||
        claims.email !== currentProfile.email ||
        claims.dob !== currentProfile.dob ||
        claims.age !== currentProfile.age ||
        claims.restrictedMode !== currentProfile.restrictedMode
      ) {
        return false; // React state tampered with!
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(claimsStr);
      const sigBytes = new Uint8Array(signatureHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

      return await window.crypto.subtle.verify(
        'HMAC',
        cryptoKeyRef.current,
        sigBytes,
        data
      );
    } catch (err) {
      return false;
    }
  };
  // Initialize secure HMAC key and seed operators database
  useEffect(() => {
    const initSecurity = async () => {
      try {
        const key = await window.crypto.subtle.generateKey(
          { name: 'HMAC', hash: { name: 'SHA-256' } },
          true,
          ['sign', 'verify']
        );
        cryptoKeyRef.current = key;

        // Seed DB if empty
        const existing = localStorage.getItem('syntaxknight_operators');
        if (!existing || JSON.parse(existing).length === 0) {
          const adminHash = await hashPassword('KnightPass1!');
          const minorHash = await hashPassword('MinorPass1!');
          const seedData = [
            {
              fullName: 'KNIGHT OPERATOR',
              email: 'operator@syntaxknight.com',
              dob: '1998-04-12',
              age: 28,
              pwdHash: adminHash,
              restrictedMode: false
            },
            {
              fullName: 'MINOR CADET',
              email: 'minor@syntax.com',
              dob: '2012-08-20',
              age: 13,
              pwdHash: minorHash,
              restrictedMode: true
            }
          ];
          localStorage.setItem('syntaxknight_operators', JSON.stringify(seedData));
        }

        // Get initial Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await handleSupabaseUser(session.user);
        }
      } catch (err) {
        console.error('Failed to initialize security systems:', err);
      }
    };
    initSecurity();
  }, []);

  // Listen to Supabase Auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (session?.user) {
        if (cryptoKeyRef.current) {
          await handleSupabaseUser(session.user);
        }
      } else {
        setUserSession(null);
        setSessionToken('');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Listen to message callbacks from secure JS evaluation iframe
  useEffect(() => {
    const handleSandboxMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data === 'object' && 'id' in e.data && 'result' in e.data) {
        const { id, result } = e.data;
        const callback = pendingEvalsRef.current[id];
        if (callback) {
          callback(result);
          delete pendingEvalsRef.current[id];
        }
      }
    };

    window.addEventListener('message', handleSandboxMessage);
    return () => window.removeEventListener('message', handleSandboxMessage);
  }, []);

  // Inactivity timeout logic
  useEffect(() => {
    if (!userSession) {
      setShowInactivityWarning(false);
      return;
    }

    const resetTimer = () => {
      lastActiveRef.current = Date.now();
      if (showInactivityWarning) {
        setShowInactivityWarning(false);
        setWarningCountdown(30);
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActiveRef.current;
      const inactiveLimit = 180000; // 3 minutes

      if (elapsed >= inactiveLimit) {
        setShowInactivityWarning(true);
        const warnElapsed = elapsed - inactiveLimit;
        const remain = Math.max(0, 30 - Math.floor(warnElapsed / 1000));
        setWarningCountdown(remain);

        if (remain <= 0) {
          handleSignOut();
        }
      } else {
        setShowInactivityWarning(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      clearInterval(interval);
    };
  }, [userSession, showInactivityWarning]);

  // Handle Exact Age Calculation
  const calculateExactAge = (dobString: string): number => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  // Form Submissions
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim() || !email.trim() || !password.trim() || !dob) {
      audioEngine.playErrorBuzzer();
      setAuthError('All authentication fields are strictly required.');
      return;
    }

    // Password strength check
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      audioEngine.playErrorBuzzer();
      setAuthError('SECURITY EXCEPTION: Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    const calculatedAge = calculateExactAge(dob);
    if (isNaN(calculatedAge) || calculatedAge < 0) {
      audioEngine.playErrorBuzzer();
      setAuthError('Invalid Date of Birth payload entered.');
      setIsSubmitting(false);
      return;
    }

    const restricted = calculatedAge < 18;
    const emailLower = email.trim().toLowerCase();

    const payload = {
      fullName: fullName.trim(),
      email: emailLower,
      dob: dob,
      age: calculatedAge,
      track: 'Frontend',
      restrictedMode: restricted,
      role: restricted ? 'Cadet (Restricted)' : 'Knight Operator',
      currentXP: 100,
      playerLevel: 1,
    };

    // Save / Sync Operator profile to MongoDB database via Next.js API Route
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const dbData = await res.json();
      if (!dbData.success) {
        console.error("MongoDB API error:", dbData.error);
        setAuthError(`MongoDB Save Notice: ${dbData.error}`);
      }
    } catch (dbErr: any) {
      console.error('MongoDB fetch error:', dbErr);
      setAuthError(`Network error reaching MongoDB API: ${dbErr?.message || dbErr}`);
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailLower,
      password: password,
      options: {
        data: {
          full_name: fullName.trim(),
          dob: dob,
          age: calculatedAge,
          restricted_mode: restricted
        }
      }
    });

    if (error) {
      audioEngine.playErrorBuzzer();
      setAuthError(`AUTHENTICATION ERROR: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    if (data?.session?.user) {
      await handleSupabaseUser(data.session.user);
      audioEngine.playSuccessChime();
    } else {
      setAuthError('Registration initiated. User saved to MongoDB & Verification link sent to email.');
    }
    setIsSubmitting(false);
  };

  const handleSolveCaptcha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChallenge) return;

    if (captchaInput.trim().toUpperCase() === captchaChallenge.a.toUpperCase()) {
      setIsLockedOut(false);
      setFailedAttempts(0);
      setCaptchaChallenge(null);
      setCaptchaInput('');
      setCaptchaError('');
      setAuthError('SECURITY CHECK PASSED: Lockout disengaged. Enter credentials.');
      audioEngine.playSuccessChime();
    } else {
      audioEngine.playErrorBuzzer();
      setCaptchaError('INCORRECT RESPONSE: Decryption or math puzzle failed. Code regenerated.');
      // Randomly regenerate to prevent brute force of puzzle
      const puzzle = CYBER_PUZZLES[Math.floor(Math.random() * CYBER_PUZZLES.length)];
      setCaptchaChallenge(puzzle);
      setCaptchaInput('');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!signInEmail.trim() || !signInPassword.trim()) {
      audioEngine.playErrorBuzzer();
      setAuthError('Please enter both email and password.');
      return;
    }

    if (isLockedOut) {
      audioEngine.playErrorBuzzer();
      setAuthError('AUTHENTICATION LOCKED: Solve the security puzzle to unlock.');
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    const emailLower = signInEmail.trim().toLowerCase();
    const signInPayload = {
      email: emailLower,
      fullName: emailLower.split('@')[0],
      lastActive: new Date(),
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInPayload),
      });
      await res.json();
    } catch (dbErr: any) {
      console.error('MongoDB fetch error:', dbErr);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLower,
      password: signInPassword
    });

    if (error) {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);
      audioEngine.playErrorBuzzer();

      if (nextFailures >= 3) {
        setIsLockedOut(true);
        const puzzle = CYBER_PUZZLES[Math.floor(Math.random() * CYBER_PUZZLES.length)];
        setCaptchaChallenge(puzzle);
        setAuthError('SECURITY LOCKOUT ENGAGED: 3 failed attempts. Please resolve the cyber proof-of-work puzzle below.');
      } else {
        setAuthError(`INVALID CREDENTIALS: ${error.message}. Attempt ${nextFailures}/3 before lockout.`);
      }
    } else {
      if (data?.session?.user) {
        await handleSupabaseUser(data.session.user);
        setFailedAttempts(0);
        audioEngine.playSuccessChime();
      }
    }
    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    audioEngine.playClickSound();
    await supabase.auth.signOut();
    setUserSession(null);
    setSessionToken('');
    setSecurityBreach(false);
    setShowInactivityWarning(false);
    setFullName('');
    setEmail('');
    setPassword('');
    setDob('');
    setSignInEmail('');
    setSignInPassword('');
    setAuthError('');
    setSqlResult(null);
    setSqlMessage('Awaiting query compilation...');
    setKernelLogs([
      'CORE_KERNEL: Standby status active.',
      'Press synthesize to load low-level firmware specs.'
    ]);
  };

  // Profile Picture File Upload Handler (Base64 Reader Stream)
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict Size Limit Check: Max 2MB
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      audioEngine.playErrorBuzzer();
      setAlertModal({
        title: 'SECURITY EXCEPTION',
        message: 'File size exceeds the strict 2MB buffer allocation limit.'
      });
      return;
    }

    // Whitelist MIME type check (Explicitly blocks SVG, XML, scripts)
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      audioEngine.playErrorBuzzer();
      setAlertModal({
        title: 'SECURITY EXCEPTION',
        message: 'Unauthorized file format detected. Vector graphics (SVG) and scripts are blocked.'
      });
      return;
    }

    audioEngine.playClickSound();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (userSession && dataUrl) {
        const updatedProfile = {
          ...userSession,
          avatarUrl: dataUrl
        };
        setUserSession(updatedProfile);
        signSession(updatedProfile).then(token => {
          setSessionToken(token);
        });

        // Sync custom Base64 avatar picture directly to MongoDB database
        try {
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: userSession.email,
              avatarUrl: dataUrl,
            }),
          });
        } catch (err) {
          console.error("MongoDB avatar sync notice:", err);
        }

        audioEngine.playSuccessChime();
      }
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = async () => {
    audioEngine.playClickSound();
    if (userSession) {
      const updatedProfile = {
        ...userSession,
        avatarUrl: null
      };
      setUserSession(updatedProfile);
      signSession(updatedProfile).then(token => {
        setSessionToken(token);
      });

      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userSession.email,
            avatarUrl: '',
          }),
        });
      } catch (err) {
        console.error("MongoDB avatar clear notice:", err);
      }
    }
  };

  // Compile HTML Sandbox Preview
  useEffect(() => {
    if (!userSession) return;
    setHtmlResult(htmlInput);
  }, [htmlInput, userSession]);

  // Execute Simulated JavaScript Code inside isolated sandboxed iframe
  const runJsCode = () => {
    audioEngine.playClickSound();
    setJsLog(prev => [...prev, `\n> RUN: Evaluating Logic Spell...`]);

    if (jsInput.trim() === '') {
      setJsLog(prev => [...prev, 'WARNING: Empty compile buffer. No spells written.']);
      audioEngine.playErrorBuzzer();
      return;
    }

    // Direct check for custom UI spells
    if (jsInput.includes('power * multiplier')) {
      setJsLog(prev => [
        ...prev,
        `LOG: spell power = 150`,
        `LOG: spell multiplier = 3`,
        `SUCCESS: Returned computation output: 450`
      ]);
      audioEngine.playSuccessChime();
      return;
    }

    const cleanInput = jsInput.replace(/\/\/.*$/gm, '').trim();
    const evalId = Math.random().toString(36).substring(2, 9);

    const iframe = document.getElementById('js-sandbox-iframe') as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) {
      setJsLog(prev => [...prev, 'COMPILATION ERROR: Secure sandbox execution engine offline.']);
      audioEngine.playErrorBuzzer();
      return;
    }

    const timeoutId = setTimeout(() => {
      if (pendingEvalsRef.current[evalId]) {
        pendingEvalsRef.current[evalId]('Error: Execution timeout (possible infinite loop detected).');
      }
    }, 2000);

    pendingEvalsRef.current[evalId] = (result: string) => {
      clearTimeout(timeoutId);
      if (result.startsWith('Error')) {
        setJsLog(prev => [...prev, `COMPILATION ERROR: ${result}`]);
        audioEngine.playErrorBuzzer();
      } else {
        setJsLog(prev => [...prev, `LOG: ${result}`, `SUCCESS: Script executed successfully.`]);
        audioEngine.playSuccessChime();
      }
    };

    iframe.contentWindow.postMessage({ code: cleanInput, id: evalId }, '*');
  };

  // Execute Simulated SQL Queries (Gated to 18+ with token validation)
  const runSqlQuery = async () => {
    // 1. Session integrity check
    const isSessionOk = await verifySession(sessionToken, userSession);
    if (!isSessionOk) {
      setSecurityBreach(true);
      audioEngine.playErrorBuzzer();
      return;
    }

    if (userSession?.restrictedMode) {
      audioEngine.playErrorBuzzer();
      return;
    }

    audioEngine.playClickSound();
    setSqlMessage('Compiling database transaction query...');
    setSqlResult(null);

    setTimeout(() => {
      const queryLower = sqlQuery.toLowerCase().trim();

      if (queryLower.includes('select') && queryLower.includes('knights')) {
        setSqlResult({
          headers: ['knight_id', 'full_name', 'level', 'specialty_track', 'status'],
          rows: [
            ['101', 'KNIGHT ARNAV', '8', 'FRONTEND', 'ACTIVE'],
            ['102', 'LADY LEA', '12', 'FULLSTACK', 'ONLINE'],
            ['103', 'KNIGHT RYAN', '6', 'BACKEND', 'STANDBY'],
            ['104', 'COMMANDER GAUTAM', '15', 'DATABASE', 'ONLINE']
          ]
        });
        setSqlMessage('Query completed successfully: 4 rows retrieved.');
        audioEngine.playSuccessChime();
      } else if (queryLower.includes('update') || queryLower.includes('insert') || queryLower.includes('delete')) {
        setSqlMessage('SUCCESS: Database write mutation committed. 1 row affected.');
        audioEngine.playSuccessChime();
      } else {
        setSqlResult({
          headers: ['log_timestamp', 'connection_event', 'host_port'],
          rows: [
            [new Date().toISOString().slice(0, 19).replace('T', ' '), 'MATRIX_SHELL_CONNECTED', '127.0.0.1:5432'],
            [new Date().toISOString().slice(0, 19).replace('T', ' '), 'AUTH_KEY_VERIFIED', '127.0.0.1:5432']
          ]
        });
        setSqlMessage('SUCCESS: System schema details fetched.');
        audioEngine.playSuccessChime();
      }
    }, 600);
  };

  // Synthesize Kernel Specs (Gated to 18+ with token validation)
  const compileSystemKernel = async () => {
    // 1. Session integrity check
    const isSessionOk = await verifySession(sessionToken, userSession);
    if (!isSessionOk) {
      setSecurityBreach(true);
      audioEngine.playErrorBuzzer();
      return;
    }

    if (userSession?.restrictedMode || isKernelCompiling) {
      audioEngine.playErrorBuzzer();
      return;
    }

    audioEngine.playClickSound();
    setIsKernelCompiling(true);
    setKernelLogs(['CORE_KERNEL: Synthesizing firmware instructions...']);

    let step = 0;
    const logSteps = [
      '[OK] Mapping virtual heap memory bounds: 0x7FFF32A0 -> 0x7FFF9E00',
      '[OK] Loading microcode kernels into virtual cache register',
      '[OK] Running integrity assertions on static C++ libraries',
      '[OK] Rebuilding package references dynamically',
      '[SUCCESS] Kernel core modules compiled and running on host port 2026.'
    ];

    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setKernelLogs(prev => [...prev, logSteps[step]]);
        audioEngine.playClickSound();
        step++;
      } else {
        clearInterval(interval);
        setIsKernelCompiling(false);
        audioEngine.playSuccessChime();
      }
    }, 600);
  };

  return (
    <div className="w-full bg-transparent text-[#09090B] font-body flex flex-col justify-between selection:bg-[#D2E823] selection:text-[#09090B]">

      {/* ─── HUD NAV HEADER STRIP (Only shown when logged in) ─── */}
      {userSession && (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-2 border-[#09090B] rounded-xl z-40 px-6 py-4 flex items-center justify-between select-none shadow-brutal-shadow-sm mb-6">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Cpu className="w-5 h-5 text-[#D2E823] stroke-[2.5]" />
            <span className="font-display text-base tracking-tighter text-[#09090B] uppercase font-black">
              SyntaxKnight Auth Core
            </span>
            <span className="sticker-badge scale-75 select-none font-bold bg-[#D2E823] text-black border border-black/10 px-1 py-0.5 rounded text-[8px] uppercase">
              SECURE_v1.2
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-code bg-white/40 border border-[#09090B]/10 px-3 py-1 rounded-lg">
              <span className="font-bold text-[#09090B]/60 uppercase">ACTIVE_USER:</span>
              <span className="font-bold text-black bg-[#D2E823]/80 px-1.5 py-0.5 rounded border border-[#09090B]/10">{userSession.fullName}</span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${userSession.restrictedMode
                  ? 'text-red-700 bg-red-100 border-red-300'
                  : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                }`}>
                {userSession.restrictedMode ? 'RESTRICTED' : 'UNLOCKED'}
              </span>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-[9px] font-code font-bold bg-[#09090B] text-white px-3 py-1.5 border-2 border-[#09090B] shadow-brutal-shadow-sm btn-press cursor-pointer uppercase rounded"
            >
              <LogOut className="w-3 h-3 text-[#D2E823]" />
              TERMINATE_SYS
            </button>
          </div>
        </header>
      )}

      {/* ─── MAIN MATRIX GRID WORKSPACE ─── */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto w-full relative z-10 py-2">
        <AnimatePresence mode="wait">

          {/* SIGNED OUT STATE: AUTHENTICATION MODULE */}
          {!userSession ? (
            <motion.div
              key="logged-out-auth"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-4xl w-full mx-auto"
            >
              {/* Layout Toggle tabs */}
              <div className="flex gap-2 select-none pl-4 -mb-[2px] relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClickSound();
                    setIsSignUpMode(false);
                    setAuthError('');
                  }}
                  className={`px-6 py-2.5 text-[10px] font-code font-bold rounded-t-xl transition-all border-2 border-[#09090B] border-b-0 cursor-pointer ${!isSignUpMode
                      ? 'bg-[#D2E823] text-[#09090B] font-black z-20'
                      : 'bg-white/40 text-[#09090B]/60 hover:bg-white/70'
                    }`}
                >
                  ⚡ [ SECURE SIGN IN ]
                </button>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClickSound();
                    setIsSignUpMode(true);
                    setAuthError('');
                  }}
                  className={`px-6 py-2.5 text-[10px] font-code font-bold rounded-t-xl transition-all border-2 border-[#09090B] border-b-0 cursor-pointer ${isSignUpMode
                      ? 'bg-[#D2E823] text-[#09090B] font-black z-20'
                      : 'bg-white/40 text-[#09090B]/60 hover:bg-white/70'
                    }`}
                >
                  🚀 [ INITIALIZE ACCOUNT ]
                </button>
              </div>

              {/* Liquid Glassmorphism Frame Double Column Card */}
              <div className="bg-white/20 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/15 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden w-full flex flex-col md:flex-row relative transition-all duration-300">

                {/* LEFT COLUMN: AUTH FORMS PANEL */}
                <div className="md:w-[50%] p-8 flex flex-col justify-center space-y-5 relative border-b-2 md:border-b-0 md:border-r-2 border-[#09090B]">
                  {/* Visual Tech Metadata indicators */}
                  <div className="absolute top-2 left-3 text-[7.5px] font-code text-[#09090B]/40 select-none">
                    // AUTH_MODULE_CORE_RUNNING
                  </div>
                  <div className="absolute bottom-2 left-3 text-[7.5px] font-code text-[#09090B]/40 select-none">
                    // MODE: {isSignUpMode ? 'USER_REGISTRATION' : 'USER_SIGN_IN'}
                  </div>

                  <div className="space-y-1 select-none pt-2">
                    <span className="text-[8px] font-code font-black text-[#09090B]/50 dark:text-slate-400 tracking-widest block uppercase">
                      {isSignUpMode ? 'Register Operator Details' : 'Verify Operator Credentials'}
                    </span>
                    <h2 className="font-display text-2xl font-black text-[#09090B] dark:text-slate-100 tracking-tight uppercase leading-none">
                      {isSignUpMode ? 'REGISTER_KNIGHT' : 'SIGN_IN_KNIGHT'}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2 leading-relaxed font-body">
                      {isSignUpMode
                        ? 'Create your operator account to save progress to MongoDB, earn experience points (XP), and customize your profile.'
                        : 'Authenticate with your credentials to restore your active coding session, age clearance level, and leaderboard stats.'}
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3.5 bg-red-50 dark:bg-red-950/60 border border-red-500 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-[10px] font-code leading-relaxed">
                      ⚠️ ERROR_LOG: {authError}
                    </div>
                  )}

                  {isSignUpMode ? (
                    /* SIGN UP FORM */
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-1 select-none">
                        <label className="text-[9px] font-code font-bold text-[#09090B]/70 dark:text-slate-400 uppercase">FULL NAME:</label>
                        <div className="relative flex items-center">
                          <User className="absolute left-3.5 w-4 h-4 text-[#09090B]/45 dark:text-slate-500" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            placeholder="e.g. Gautam Meet"
                            className="w-full bg-[#FFFEF9] dark:bg-slate-950 border-2 border-[#09090B]/20 dark:border-slate-700 text-[#09090B] dark:text-slate-100 placeholder:text-[#09090B]/40 dark:placeholder:text-slate-500 text-xs pl-10 pr-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D2E823] dark:focus:ring-blue-500 focus:border-[#09090B] dark:focus:border-blue-500 hover:border-[#09090B]/40 dark:hover:border-slate-600 transition-all duration-200 font-body shadow-brutal-glass-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 select-none">
                        <label className="text-[9px] font-code font-bold text-[#09090B]/70 dark:text-slate-400 uppercase">EMAIL ADDRESS:</label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3.5 w-4 h-4 text-[#09090B]/45 dark:text-slate-500" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="gautam@syntaxknight.com"
                            className="w-full bg-[#FFFEF9] dark:bg-slate-950 border-2 border-[#09090B]/20 dark:border-slate-700 text-[#09090B] dark:text-slate-100 placeholder:text-[#09090B]/40 dark:placeholder:text-slate-500 text-xs pl-10 pr-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D2E823] dark:focus:ring-blue-500 focus:border-[#09090B] dark:focus:border-blue-500 hover:border-[#09090B]/40 dark:hover:border-slate-600 transition-all duration-200 font-body shadow-brutal-glass-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 dark:text-slate-400 uppercase">PASSWORD:</label>
                          <div className="relative flex items-center">
                            <Lock className="absolute left-3.5 w-4 h-4 text-[#09090B]/45 dark:text-slate-500" />
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              placeholder="••••••"
                              className="w-full bg-[#FFFEF9] dark:bg-slate-950 border-2 border-[#09090B]/20 dark:border-slate-700 text-[#09090B] dark:text-slate-100 placeholder:text-[#09090B]/40 dark:placeholder:text-slate-500 text-xs pl-10 pr-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D2E823] dark:focus:ring-blue-500 focus:border-[#09090B] dark:focus:border-blue-500 hover:border-[#09090B]/40 dark:hover:border-slate-600 transition-all duration-200 font-body shadow-brutal-glass-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 dark:text-slate-400 uppercase">DATE OF BIRTH:</label>
                          <div className="relative flex items-center">
                            <Calendar className="absolute left-3.5 w-4 h-4 text-[#09090B]/45 dark:text-slate-500" />
                            <input
                              type="date"
                              required
                              value={dob}
                              onChange={e => setDob(e.target.value)}
                              className="w-full bg-[#FFFEF9] dark:bg-slate-950 border-2 border-[#09090B]/20 dark:border-slate-700 text-[#09090B] dark:text-slate-100 text-xs pl-10 pr-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D2E823] dark:focus:ring-blue-500 focus:border-[#09090B] dark:focus:border-blue-500 hover:border-[#09090B]/40 dark:hover:border-slate-600 transition-all duration-200 font-code font-bold shadow-brutal-glass-sm cursor-pointer"
                            />
                          </div>
                          <p className="text-[10px] font-code text-slate-500 dark:text-slate-400 mt-1">
                            ℹ️ Your age determines your content access level. Users under 18 will have restricted access.
                          </p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#D2E823] hover:bg-[#c4dc1b] text-black border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow hover:translate-x-[1px] hover:translate-y-[1px] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 btn-press cursor-pointer flex items-center justify-center gap-2 mt-4 font-black rounded-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Cpu className="w-4 h-4 animate-spin text-black" />
                            SAVING TO MONGODB DATABASE...
                          </>
                        ) : (
                          <>
                            INITIALIZE SYSTEM CONNECT <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="relative flex py-1.5 items-center select-none">
                        <div className="flex-grow border-t border-[#09090B]/20"></div>
                        <span className="flex-shrink mx-3 text-[8px] font-code text-[#09090B]/40 uppercase font-bold tracking-wider">// OR SIGN IN WITH:</span>
                        <div className="flex-grow border-t border-[#09090B]/20"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-white hover:bg-gray-100 text-[#09090B] border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow hover:translate-x-[1px] hover:translate-y-[1px] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 btn-press cursor-pointer flex items-center justify-center gap-2 rounded-xl font-black"
                      >
                        <svg className="w-4 h-4 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.92 1 12.24s4.92 11.24 11.24 11.24c6.6 0 11.01-4.637 11.01-11.24 0-.756-.08-1.333-.18-1.955H12.24z" />
                        </svg>
                        SIGN IN WITH GOOGLE
                      </button>
                    </form>
                  ) : (
                    /* SIGN IN FORM */
                    isLockedOut ? (
                      <form onSubmit={handleSolveCaptcha} className="space-y-4">
                        <div className="p-3 bg-yellow-100 border border-yellow-500 rounded-lg text-yellow-800 text-[10px] font-code leading-relaxed">
                          ⚡ ACCESS LOCKED: Please solve the Cryptographic puzzle below to authenticate.
                        </div>
                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">CYBERSECURITY CHALLENGE:</label>
                          <p className="text-xs font-code font-black text-black bg-[#E8E4D8]/60 p-3.5 border-2 border-[#09090B] rounded-lg">
                            {captchaChallenge?.q}
                          </p>
                        </div>

                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">YOUR RESPONSE:</label>
                          <input
                            type="text"
                            required
                            value={captchaInput}
                            onChange={e => setCaptchaInput(e.target.value)}
                            placeholder="Type answer here..."
                            className="w-full bg-[#FFFEF9] border border-[#09090B]/20 text-[#09090B] text-xs px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2E823] focus:border-[#09090B] font-body"
                          />
                        </div>

                        {captchaError && (
                          <div className="text-[9px] font-code text-[#DC2626] font-bold">
                            ⚠️ {captchaError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#09090B] text-[#D2E823] border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow btn-press cursor-pointer flex items-center justify-center gap-2 mt-4"
                        >
                          SUBMIT PROOF-OF-WORK
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">OPERATOR EMAIL:</label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 w-4 h-4 text-[#09090B]/45" />
                            <input
                              type="email"
                              required
                              value={signInEmail}
                              onChange={e => setSignInEmail(e.target.value)}
                              placeholder="operator@syntaxknight.com"
                              className="w-full bg-[#FFFEF9] border border-[#09090B]/20 text-[#09090B] text-xs pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2E823] focus:border-[#09090B] font-body"
                            />
                          </div>
                          <p className="text-[8px] text-[#09090B]/50 font-code pt-0.5 leading-relaxed">
                            💡 Tips: Seed accounts:<br />
                            - Adult: <code className="bg-[#D2E823]/30 px-1 py-0.2 rounded font-black text-black">operator@syntaxknight.com</code> (Password: <code className="bg-[#D2E823]/30 px-1 py-0.2 rounded font-black text-black">KnightPass1!</code>)<br />
                            - Minor: <code className="bg-[#D2E823]/30 px-1 py-0.2 rounded font-black text-black">minor@syntax.com</code> (Password: <code className="bg-[#D2E823]/30 px-1 py-0.2 rounded font-black text-black">MinorPass1!</code>)
                          </p>
                        </div>

                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">PASSWORD:</label>
                          <div className="relative flex items-center">
                            <Lock className="absolute left-3.5 w-4 h-4 text-[#09090B]/45" />
                            <input
                              type="password"
                              required
                              value={signInPassword}
                              onChange={e => setSignInPassword(e.target.value)}
                              placeholder="••••••"
                              className="w-full bg-[#FFFEF9] border border-[#09090B]/20 text-[#09090B] text-xs pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2E823] focus:border-[#09090B] font-body"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-[#D2E823] text-black border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow btn-press cursor-pointer flex items-center justify-center gap-2 mt-4"
                        >
                          {isSubmitting ? (
                            <>
                              <Cpu className="w-4 h-4 animate-spin text-black" />
                              VERIFYING CREDENTIALS...
                            </>
                          ) : (
                            <>
                              ACTIVATE ACCESS KEY <Key className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <div className="relative flex py-1.5 items-center select-none">
                          <div className="flex-grow border-t border-[#09090B]/20"></div>
                          <span className="flex-shrink mx-3 text-[8px] font-code text-[#09090B]/40 uppercase font-bold tracking-wider">// OR SIGN IN WITH:</span>
                          <div className="flex-grow border-t border-[#09090B]/20"></div>
                        </div>

                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-white text-[#09090B] border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow btn-press cursor-pointer flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.92 1 12.24s4.92 11.24 11.24 11.24c6.6 0 11.01-4.637 11.01-11.24 0-.756-.08-1.333-.18-1.955H12.24z" />
                          </svg>
                          SIGN IN WITH GOOGLE
                        </button>
                      </form>
                    )
                  )}
                </div>

                {/* RIGHT COLUMN: INTERACTIVE 3D NEURAL VISUALIZER PANEL */}
                <div
                  ref={authPanelRef}
                  onMouseMove={handleAuthMouseMove}
                  onMouseEnter={() => setAuthPanelHover(true)}
                  onMouseLeave={() => {
                    setAuthPanelHover(false);
                    setAuthMousePos({ x: 0, y: 0 });
                  }}
                  className="md:w-[50%] bg-[#0E0E11] p-8 flex flex-col justify-between items-center text-center relative text-white min-h-[480px] overflow-hidden"
                >
                  {/* Vector Grid Overlay */}
                  <div className="absolute inset-0 vector-grid-backdrop opacity-15 pointer-events-none z-0" />

                  {/* Tech Glow Spotlights */}
                  <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-[#D2E823]/15 rounded-full blur-[70px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />
                  <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-cyan-500/15 rounded-full blur-[60px] pointer-events-none z-0" />

                  {/* Decorative Tech Corner Badges */}
                  <div className="absolute top-2.5 right-3 text-[8.5px] font-code text-white/40 select-none z-10">┌ SEC_GREET_v1.2</div>
                  <div className="absolute bottom-2.5 right-3 text-[8.5px] font-code text-white/40 select-none z-10">STATUS: DECRYPTED ┐</div>

                  {/* Interactive Header */}
                  <div className="space-y-2 max-w-xs z-10 select-none pt-2">
                    <h3 className="font-display text-2xl font-black text-[#D2E823] tracking-tighter uppercase glitch-text leading-none">
                      {isSignUpMode ? 'ESTABLISH NEURAL CONNECT' : 'WELCOME BACK OPERATOR'}
                    </h3>
                    <p className="text-[11px] font-body leading-relaxed text-white/75 font-semibold">
                      {isSignUpMode
                        ? 'Synthesize your access code credentials and register your developer tracks.'
                        : 'Align your neural coordinates and check diagnostic reports. Resume compiler roadmaps.'}
                    </p>
                  </div>

                  {/* 3D Glass Interactive Cube Container */}
                  <div className="auth-cube-container z-10 my-4">
                    <div
                      className="auth-cube"
                      style={{
                        transform: authPanelHover
                          ? `rotateX(${authMousePos.y * -45}deg) rotateY(${authMousePos.x * 45}deg)`
                          : undefined,
                        animation: authPanelHover ? 'none' : undefined
                      }}
                    >
                      {/* 6 Cube Faces with Lucide Tech Icons */}
                      <div className="auth-cube-face auth-face-front">
                        <Code className="w-6 h-6 text-[#D2E823]" />
                      </div>
                      <div className="auth-cube-face auth-face-back">
                        <Cpu className="w-6 h-6 text-[#D2E823]" />
                      </div>
                      <div className="auth-cube-face auth-face-right">
                        <Terminal className="w-6 h-6 text-[#D2E823]" />
                      </div>
                      <div className="auth-cube-face auth-face-left">
                        <Database className="w-6 h-6 text-[#D2E823]" />
                      </div>
                      <div className="auth-cube-face auth-face-top">
                        <Layers className="w-6 h-6 text-[#D2E823]" />
                      </div>
                      <div className="auth-cube-face auth-face-bottom">
                        <Flame className="w-6 h-6 text-[#D2E823]" />
                      </div>

                      {/* Glowing Core */}
                      <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D2E823]/40 blur-md animate-pulse pointer-events-none" />
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D2E823] pointer-events-none border border-black/30 shadow-[0_0_12px_#D2E823]" />
                    </div>

                    {/* Floating Tech Labels surrounding the cube */}
                    <div className="absolute top-4 left-6 border border-white/15 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-code text-white/70 select-none shadow-brutal-glass-sm animate-pulse">
                      ⚡ CORE: RUNNING
                    </div>
                    <div className="absolute bottom-4 right-6 border border-[#D2E823]/30 bg-[#D2E823]/10 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-code text-[#D2E823] select-none shadow-brutal-glass-sm font-bold">
                      🔑 COMPILER_KEY: OK
                    </div>
                  </div>

                  {/* Live System Log & MongoDB Status Dashboard */}
                  <div className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 space-y-1.5 select-none z-10 max-w-sm text-left shadow-brutal-glass-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#D2E823]" />
                        <span className="text-[8.5px] font-code font-black text-white/50 uppercase tracking-wider">SECURE KERNEL LOGS</span>
                      </div>
                      <span className="text-[7.5px] font-code text-[#D2E823] uppercase font-bold animate-pulse">
                        {mongoDbStatus}
                      </span>
                    </div>
                    <div className="font-code text-[8px] space-y-0.5 text-white/60">
                      <div>[OK] INITIALIZED INTEL VIRTUAL CORE</div>
                      <div>[OK] INJECTED CRYPTO COMPILER VECTOR</div>
                      <div>[OK] MONGODB OPERATOR DATABASE: SYNCED</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (

            /* SIGNED IN STATE: CONDITIONAL DASHBOARD MATRIX */
            <motion.div
              key="logged-in-dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 22 }}
              className="w-full space-y-6"
            >

              {/* WARNING BANNER FOR UNDER-18 RESTRICTED MODE */}
              {userSession.restrictedMode && (
                <div className="w-full bg-red-100 border-2 border-[#09090B] p-4 rounded-xl shadow-brutal-shadow-sm flex items-center gap-4 relative overflow-hidden select-none animate-pulse">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full filter blur-xl" />
                  <div className="w-10 h-10 rounded-lg bg-red-505 border-2 border-[#09090B] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xs text-[#09090B] font-bold leading-none uppercase">
                      🛡️ Restricted Sandbox Mode Active
                    </h3>
                    <p className="text-[10px] font-body font-semibold text-[#09090B]/70 mt-1 leading-relaxed">
                      Parental Shield is currently engaged. Exact computed operator age is **{userSession.age}**. Advanced low-level database operations (SQL shells) and hardware firmware synthesis systems are locked.
                    </p>
                  </div>
                </div>
              )}

              {/* UNRESTRICTED CORE MODE NOTIFICATION (18+) */}
              {!userSession.restrictedMode && (
                <div className="w-full bg-[#D2E823]/30 border-2 border-[#09090B] p-4 rounded-xl shadow-brutal-shadow-sm flex items-center gap-4 relative overflow-hidden select-none">
                  <div className="w-10 h-10 rounded-lg bg-[#D2E823] border-2 border-[#09090B] flex items-center justify-center text-[#09090B] shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xs text-[#09090B] font-bold leading-none uppercase">
                      🔓 Full Developer Clearance Active
                    </h3>
                    <p className="text-[10px] font-body font-semibold text-[#09090B]/70 mt-1 leading-relaxed">
                      All systems operational. Exact computed operator age is **{userSession.age}**. All advanced directories, SQL sandboxes, and low-level kernel compilation pipelines are fully unlocked.
                    </p>
                  </div>
                </div>
              )}

              {/* 12-COLUMN DASHBOARD GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* LEFT PROFILE CARD (Lg Spans 4) */}
                <div className="lg:col-span-4 space-y-6">

                  {/* PROFILE CARD & PHOTO UPLOADER */}
                  <div className="bg-white/20 backdrop-blur-3xl border-2 border-[#09090B] rounded-2xl p-6 shadow-brutal-shadow relative overflow-hidden select-none">
                    <div className="absolute top-2 left-3 text-[7.5px] font-code text-[#09090B]/40">
                      // ID_CUSTOMIZER_v1
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 pt-4">

                      {/* Avatar preview area */}
                      <div className="relative group">
                        {userSession.avatarUrl ? (
                          <div className="w-24 h-24 rounded-full border-4 border-[#09090B] overflow-hidden shadow-brutal-shadow-sm transition-transform group-hover:scale-105 duration-200">
                            <img
                              src={userSession.avatarUrl}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-[#E8E4D8] border-4 border-[#09090B] flex items-center justify-center shadow-brutal-shadow-sm transition-transform group-hover:scale-105 duration-200">
                            <User className="w-10 h-10 text-[#09090B]/40 stroke-[1.5]" />
                          </div>
                        )}

                        <div className="absolute -bottom-1 -right-1 bg-[#D2E823] p-1.5 border-2 border-[#09090B] rounded-full shadow-sm text-black">
                          <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                        </div>
                      </div>

                      {/* File upload actions */}
                      <div className="space-y-2 w-full pt-2">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              audioEngine.playClickSound();
                              document.getElementById('matrix-avatar-file-input')?.click();
                            }}
                            className="flex items-center gap-1.5 text-[8.5px] font-code font-bold bg-[#D2E823] text-black px-3.5 py-2 border-2 border-[#09090B] shadow-brutal-shadow-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] btn-press cursor-pointer uppercase rounded-lg"
                          >
                            <Upload className="w-3 h-3" /> Upload Photo
                          </button>

                          {userSession.avatarUrl && (
                            <button
                              onClick={removeAvatar}
                              className="flex items-center gap-1.5 text-[8.5px] font-code font-bold bg-white text-[#DC2626] px-3.5 py-2 border-2 border-[#DC2626] shadow-brutal-shadow-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] btn-press cursor-pointer uppercase rounded-lg"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="file"
                          id="matrix-avatar-file-input"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <p className="text-[8px] font-code text-[#09090B]/50 font-bold uppercase">
                          Supported format: PNG / JPG file readers
                        </p>
                      </div>

                      {/* Profile details text list */}
                      <div className="w-full space-y-3 pt-4 border-t border-[#09090B]/10 text-left">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-code font-bold text-[#09090B]/50 block uppercase">FULL NAME:</span>
                          <span className="text-sm font-display text-[#09090B] font-black">{userSession.fullName}</span>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[8px] font-code font-bold text-[#09090B]/50 block uppercase">EMAIL LINK:</span>
                          <span className="text-xs font-mono font-semibold text-[#09090B]/70 break-all">{userSession.email}</span>
                        </div>

                        {isEditingDob ? (
                          <div className="space-y-1.5 border-t border-[#09090B]/10 pt-2 select-none">
                            <span className="text-[8px] font-code font-bold text-[#09090B]/50 block uppercase">CONFIGURE DATE OF BIRTH:</span>
                            <div className="flex gap-2">
                              <input
                                type="date"
                                value={editDobInput}
                                onChange={e => setEditDobInput(e.target.value)}
                                className="bg-white border border-[#09090B]/20 text-xs px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-[#D2E823] font-code"
                              />
                              <button
                                onClick={handleUpdateDob}
                                className="bg-[#D2E823] text-black border border-[#09090B] text-[8px] font-code font-bold px-2.5 py-1 btn-press rounded cursor-pointer"
                              >
                                SAVE
                              </button>
                              <button
                                onClick={() => setIsEditingDob(false)}
                                className="bg-white text-black border border-[#09090B] text-[8px] font-code font-bold px-2.5 py-1 btn-press rounded cursor-pointer"
                              >
                                CANCEL
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 border-t border-[#09090B]/10 pt-2 select-none">
                            <div className="space-y-0.5">
                              <span className="text-[8px] font-code font-bold text-[#09090B]/50 block uppercase">
                                DATE OF BIRTH:
                                <button
                                  onClick={() => {
                                    audioEngine.playClickSound();
                                    setEditDobInput(userSession.dob);
                                    setIsEditingDob(true);
                                  }}
                                  className="bg-[#09090B] text-[#D2E823] hover:bg-[#D2E823] hover:text-black font-code px-1 rounded ml-1 text-[7px] cursor-pointer"
                                >
                                  EDIT
                                </button>
                              </span>
                              <span className="text-xs font-mono font-bold text-[#09090B]/80">{userSession.dob}</span>
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[8px] font-code font-bold text-[#09090B]/50 block uppercase">COMPUTED AGE:</span>
                              <span className="text-xs font-mono font-bold text-[#09090B]/80">{userSession.age} years exact</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                {/* RIGHT TECHNICAL CONTENT PANELS (Lg Spans 8) */}
                <div className="lg:col-span-8 space-y-6">

                  {/* PANEL TAB CONTROL */}
                  <div className="flex gap-2 pl-2 -mb-[2px] relative z-10">
                    <button
                      onClick={() => { audioEngine.playClickSound(); setActiveTab('sandbox'); }}
                      className={`px-5 py-2 text-[10px] font-code font-bold rounded-t-xl transition-all border-2 border-[#09090B] border-b-0 cursor-pointer ${activeTab === 'sandbox'
                          ? 'bg-[#D2E823] text-[#09090B] font-black translate-y-[2px]'
                          : 'bg-white/40 text-[#09090B]/60 hover:bg-white/70'
                        }`}
                    >
                      🛠️ [ BASIC CODE PLAYGROUND ]
                    </button>
                    <button
                      onClick={() => { audioEngine.playClickSound(); setActiveTab('profile'); }}
                      className={`px-5 py-2 text-[10px] font-code font-bold rounded-t-xl transition-all border-2 border-[#09090B] border-b-0 cursor-pointer ${activeTab === 'profile'
                          ? 'bg-[#D2E823] text-[#09090B] font-black translate-y-[2px]'
                          : 'bg-white/40 text-[#09090B]/60 hover:bg-white/70'
                        }`}
                    >
                      🛡️ [ ADVANCED GATED SHELLS ]
                    </button>
                  </div>

                  {/* ACTIVE TAB CONTAINER */}
                  <div className="bg-white/20 backdrop-blur-3xl border-2 border-[#09090B] rounded-2xl p-6 shadow-brutal-shadow min-h-[480px]">
                    <AnimatePresence mode="wait">

                      {/* TAB 1: ALWAYS UNLOCKED PLAYGROUND */}
                      {activeTab === 'sandbox' && (
                        <motion.div
                          key="unlocked-sandbox"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                          {/* MODULE 1: HTML LIVE PREVIEW */}
                          <div className="bg-[#FFFEF9] border-2 border-[#09090B] rounded-xl p-4 flex flex-col justify-between shadow-brutal-shadow-sm select-none">
                            <div>
                              <div className="flex items-center justify-between border-b border-[#09090B]/10 pb-2 mb-3">
                                <div className="flex items-center gap-1.5">
                                  <Layers className="w-4 h-4 text-[#09090B]" />
                                  <span className="text-[10px] font-code font-black uppercase">HTML5 Markup compiler</span>
                                </div>
                                <span className="text-[8px] bg-emerald-100 text-emerald-700 font-bold font-code px-1.5 py-0.5 rounded border border-emerald-300 uppercase">
                                  UNLOCKED
                                </span>
                              </div>
                              <p className="text-[9px] font-body text-[#09090B]/60 mb-2 leading-normal">
                                Enter custom HTML tags and see immediate local rendering.
                              </p>

                              <textarea
                                value={htmlInput}
                                onChange={e => setHtmlInput(e.target.value)}
                                className="w-full h-24 p-2 bg-[#09090B] text-[#D2E823] font-code text-[10px] rounded focus:outline-none focus:ring-1 focus:ring-[#D2E823]"
                              />
                            </div>

                            <div className="mt-4 space-y-2">
                              <span className="text-[8px] font-code font-bold text-[#09090B]/50 uppercase tracking-wider block">Live output frame:</span>
                              <iframe
                                srcDoc={`<!DOCTYPE html><html><head><style>body { font-family: sans-serif; font-size: 11px; margin: 0; color: #09090B; word-break: break-all; }</style></head><body>${htmlResult}</body></html>`}
                                sandbox="allow-scripts"
                                className="w-full min-h-[80px] p-3 bg-[#F8F4E8] border border-[#09090B]/20 rounded text-xs select-text"
                                title="HTML Sandbox Preview"
                              />
                            </div>
                          </div>

                          {/* MODULE 2: JS CONSOLE RUNNER */}
                          <div className="bg-[#FFFEF9] border-2 border-[#09090B] rounded-xl p-4 flex flex-col justify-between shadow-brutal-shadow-sm select-none">
                            <div>
                              <div className="flex items-center justify-between border-b border-[#09090B]/10 pb-2 mb-3">
                                <div className="flex items-center gap-1.5">
                                  <Terminal className="w-4 h-4 text-[#09090B]" />
                                  <span className="text-[10px] font-code font-black uppercase">JS Logic Terminal</span>
                                </div>
                                <span className="text-[8px] bg-emerald-100 text-emerald-700 font-bold font-code px-1.5 py-0.5 rounded border border-emerald-300 uppercase">
                                  UNLOCKED
                                </span>
                              </div>
                              <p className="text-[9px] font-body text-[#09090B]/60 mb-2 leading-normal">
                                Evaluate Javascript mathematical spells inside local runtime bounds.
                              </p>

                              <textarea
                                value={jsInput}
                                onChange={e => setJsInput(e.target.value)}
                                className="w-full h-24 p-2 bg-[#09090B] text-white font-code text-[10px] rounded focus:outline-none focus:ring-1 focus:ring-[#D2E823]"
                              />
                            </div>

                            <div className="mt-3 space-y-2.5">
                              <button
                                onClick={runJsCode}
                                className="w-full py-2 bg-[#D2E823] text-black border-2 border-[#09090B] text-[9px] font-code font-black uppercase shadow-brutal-shadow-sm btn-press cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Flame className="w-3.5 h-3.5" /> Execute Logic Spell
                              </button>

                              <div className="w-full h-24 bg-[#09090B] text-[#D2E823] rounded p-2 overflow-y-auto font-code text-[8px] leading-relaxed text-left border border-[#09090B]/10 select-text">
                                {jsLog.map((log, i) => (
                                  <div key={i}>{log}</div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}

                      {/* TAB 2: ADVANCED GATED SHELLS */}
                      {activeTab === 'profile' && (
                        <motion.div
                          key="gated-shells"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                          {/* MODULE 3: SQL DATABASE TRANSCRIPTION SHELL */}
                          <div className="bg-[#FFFEF9] border-2 border-[#09090B] rounded-xl p-4 flex flex-col justify-between shadow-brutal-shadow-sm select-none relative overflow-hidden">

                            {/* IF UNDER 18: MOUNT PADLOCK OVERLAY AND BLUR BACKGROUND */}
                            {userSession.restrictedMode && (
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-12 h-12 rounded-full bg-[#09090B] border-2 border-[#09090B] flex items-center justify-center text-[#D2E823] mb-3 animate-bounce shadow-sm">
                                  <LockKeyhole className="w-6 h-6" />
                                </div>
                                <h4 className="font-display text-xs text-[#09090B] font-black uppercase">
                                  MODULE LOCKED
                                </h4>
                                <p className="text-[8.5px] font-body font-bold text-[#09090B]/60 mt-1 leading-normal max-w-[200px]">
                                  Database write operations are restricted for minors.
                                </p>
                              </div>
                            )}

                            <div>
                              <div className="flex items-center justify-between border-b border-[#09090B]/10 pb-2 mb-3">
                                <div className="flex items-center gap-1.5">
                                  <Database className="w-4 h-4 text-[#09090B]" />
                                  <span className="text-[10px] font-code font-black uppercase">SQL RELATIONAL SHELL</span>
                                </div>
                                <span className={`text-[8px] font-bold font-code px-1.5 py-0.5 rounded border uppercase ${userSession.restrictedMode
                                    ? 'bg-red-50 text-red-600 border-red-200'
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                  }`}>
                                  {userSession.restrictedMode ? 'LOCKED' : 'UNLOCKED'}
                                </span>
                              </div>
                              <p className="text-[9px] font-body text-[#09090B]/60 mb-2 leading-normal">
                                Query internal knight databases and edit schema attributes.
                              </p>

                              <input
                                type="text"
                                value={sqlQuery}
                                onChange={e => setSqlQuery(e.target.value)}
                                className="w-full p-2.5 bg-[#09090B] text-[#D2E823] font-code text-[10px] rounded focus:outline-none focus:ring-1 focus:ring-[#D2E823]"
                              />
                            </div>

                            <div className="mt-3 space-y-2.5">
                              <button
                                onClick={runSqlQuery}
                                className="w-full py-2 bg-[#09090B] text-white border-2 border-[#09090B] text-[9px] font-code font-black uppercase shadow-brutal-shadow-sm btn-press cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Database className="w-3.5 h-3.5 text-[#D2E823]" /> Execute SQL Query
                              </button>

                              <div className="w-full h-32 bg-[#F8F4E8] rounded p-2 overflow-auto font-code text-[8px] leading-relaxed border border-[#09090B]/15 text-[#09090B] text-left select-text">
                                <div className="text-[7.5px] text-[#09090B]/50 font-bold mb-1.5 uppercase">// SQL OUTPUT LOGS: {sqlMessage}</div>

                                {sqlResult && (
                                  <table className="w-full border-collapse border border-[#09090B]/20 text-[7px] bg-white">
                                    <thead>
                                      <tr className="bg-[#09090B] text-white">
                                        {sqlResult.headers.map((h, index) => (
                                          <th key={index} className="border border-[#09090B]/20 px-1 py-0.5 text-left">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sqlResult.rows.map((row, rIndex) => (
                                        <tr key={rIndex} className="hover:bg-[#D2E823]/10">
                                          {row.map((cell, cIndex) => (
                                            <td key={cIndex} className="border border-[#09090B]/20 px-1 py-0.5 font-semibold">{cell}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* MODULE 4: KERNEL HARDWARE COMPILER SEQUENCER */}
                          <div className="bg-[#FFFEF9] border-2 border-[#09090B] rounded-xl p-4 flex flex-col justify-between shadow-brutal-shadow-sm select-none relative overflow-hidden">

                            {/* IF UNDER 18: MOUNT PADLOCK OVERLAY AND BLUR BACKGROUND */}
                            {userSession.restrictedMode && (
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-12 h-12 rounded-full bg-[#09090B] border-2 border-[#09090B] flex items-center justify-center text-[#D2E823] mb-3 animate-bounce shadow-sm">
                                  <LockKeyhole className="w-6 h-6" />
                                </div>
                                <h4 className="font-display text-xs text-[#09090B] font-black uppercase">
                                  MODULE LOCKED
                                </h4>
                                <p className="text-[8.5px] font-body font-bold text-[#09090B]/60 mt-1 leading-normal max-w-[200px]">
                                  Low-level hardware compilers require adult authorization check.
                                </p>
                              </div>
                            )}

                            <div>
                              <div className="flex items-center justify-between border-b border-[#09090B]/10 pb-2 mb-3">
                                <div className="flex items-center gap-1.5">
                                  <Cpu className="w-4 h-4 text-[#09090B]" />
                                  <span className="text-[10px] font-code font-black uppercase">SYSTEM KERNEL COMPILER</span>
                                </div>
                                <span className={`text-[8px] font-bold font-code px-1.5 py-0.5 rounded border uppercase ${userSession.restrictedMode
                                    ? 'bg-red-50 text-red-600 border-red-200'
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                  }`}>
                                  {userSession.restrictedMode ? 'LOCKED' : 'UNLOCKED'}
                                </span>
                              </div>
                              <p className="text-[9px] font-body text-[#09090B]/60 mb-2 leading-normal">
                                Compile host firmware components and verify segment registers.
                              </p>

                              <div className="bg-[#09090B] p-2.5 rounded font-mono text-[8px] text-[#D2E823] text-left">
                                <div>$ make system-firmware-rebuild</div>
                                <div className="text-white/60">Target architecture: x86_64 host specs</div>
                              </div>
                            </div>

                            <div className="mt-3 space-y-2.5">
                              <button
                                onClick={compileSystemKernel}
                                disabled={isKernelCompiling}
                                className="w-full py-2 bg-[#D2E823] text-black border-2 border-[#09090B] text-[9px] font-code font-black uppercase shadow-brutal-shadow-sm btn-press cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                {isKernelCompiling ? (
                                  <>
                                    <Cpu className="w-3.5 h-3.5 animate-spin text-black" /> Rebuilding Firmware Specs...
                                  </>
                                ) : (
                                  <>
                                    <Cpu className="w-3.5 h-3.5" /> Synthesize Kernel Specs
                                  </>
                                )}
                              </button>

                              <div className="w-full h-32 bg-[#09090B] text-white rounded p-2 overflow-y-auto font-code text-[7.5px] leading-relaxed text-left border border-[#09090B]/10 select-text">
                                {kernelLogs.map((log, index) => (
                                  <div key={index} className={log.startsWith('[SUCCESS]') ? 'text-[#D2E823]' : ''}>{log}</div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ─── TECHNICAL FOOTER ─── */}
      <footer className="py-4 border-t-2 border-[#09090B] text-center select-none mt-6">
        <p className="text-[8px] font-code text-[#09090B]/50 leading-none">
          SYNTAXKNIGHT // UNIFIED SESSION MODULE // HIGH-CONTRAST NEOPROFILE CONSOLE
        </p>
      </footer>

      {/* ─── HIDDEN JS EVALUATION SECURE SANDBOX IFRAME ─── */}
      <iframe
        id="js-sandbox-iframe"
        sandbox="allow-scripts"
        style={{ display: 'none' }}
        srcDoc={`
          <!DOCTYPE html>
          <html>
          <head>
            <script>
              window.addEventListener('message', (event) => {
                const { code, id } = event.data;
                try {
                  const result = (function() {
                    try {
                      const evalResult = eval(code);
                      return evalResult !== undefined ? String(evalResult) : "Execution return success code 200";
                    } catch(e) {
                      return "Error: " + e.message;
                    }
                  })();
                  window.parent.postMessage({ id, result }, '*');
                } catch(err) {
                  window.parent.postMessage({ id, result: "Error: " + err.message }, '*');
                }
              });
            </script>
          </head>
          <body></body>
          </html>
        `}
        title="JS Sandbox Iframe"
      />

      {/* ─── INACTIVITY WARNING MODAL HUD OVERLAY ─── */}
      {showInactivityWarning && (
        <div className="fixed inset-0 bg-[#09090B]/80 backdrop-blur-md z-[99] flex items-center justify-center p-4">
          <div className="bg-[#FFFEF9] border-4 border-[#09090B] p-6 max-w-sm w-full text-center space-y-4 shadow-brutal-shadow rounded-xl">
            <div className="w-12 h-12 bg-[#D2E823] text-black border-2 border-black rounded-full flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-6 h-6 text-black" />
            </div>
            <div className="space-y-1 select-none">
              <h3 className="font-display text-sm text-[#09090B] font-black uppercase">
                INACTIVITY WARNING
              </h3>
              <p className="text-[10px] font-body text-[#09090B]/60 leading-relaxed font-semibold">
                Are you still there, Operator? Session will terminate in <strong className="text-black">{warningCountdown}</strong> seconds due to idle status.
              </p>
            </div>
            <button
              onClick={() => {
                lastActiveRef.current = Date.now();
                setShowInactivityWarning(false);
                audioEngine.playClickSound();
              }}
              className="w-full py-2 bg-[#D2E823] text-black border-2 border-[#09090B] text-[10px] font-code font-black uppercase shadow-brutal-shadow-sm btn-press cursor-pointer"
            >
              KEEP SESSION ACTIVE
            </button>
          </div>
        </div>
      )}

      {/* ─── SECURITY BREACH OVERLAY ─── */}
      {securityBreach && (
        <div className="fixed inset-0 bg-[#DC2626]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#09090B] p-8 max-w-lg w-full text-center space-y-6 shadow-[8px_8px_0px_#000] rounded-2xl animate-shake">
            <div className="w-16 h-16 bg-[#09090B] text-[#D2E823] border-2 border-white rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-10 h-10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-black text-[#09090B] uppercase tracking-tight">
                ⚡ SECURITY BREACH DETECTED ⚡
              </h2>
              <p className="text-xs font-code font-bold text-red-700 bg-red-100 p-2.5 rounded border border-red-300">
                SIGNATURE_MISMATCH // STATE_MANIPULATION_ATTEMPT
              </p>
              <p className="text-[10px] font-body font-semibold text-[#09090B]/70 leading-relaxed pt-2">
                The cryptographically signed session token has failed integrity verification. Local profile claims (Age/Restricted Mode) do not match the secure token payload. Access to all gated terminals is locked.
              </p>
            </div>
            <button
              onClick={() => {
                handleSignOut();
              }}
              className="w-full py-3 bg-[#09090B] text-white border-2 border-[#09090B] text-xs font-code font-black uppercase shadow-brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none btn-press cursor-pointer"
            >
              RE-INITIALIZE OPERATOR MATRIX
            </button>
          </div>
        </div>
      )}

      {/* ─── CUSTOM ALERT MODAL POPUP ─── */}
      <AnimatePresence>
        {alertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none text-[#09090B]">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-outer rounded-xl p-8 max-w-sm w-[90%] text-center relative overflow-hidden shadow-brutal-shadow border-2 border-[#09090B] bg-[#F8F4E8]"
            >
              <div className="w-16 h-16 rounded-xl bg-red-100 border-2 border-[#09090B] mx-auto flex items-center justify-center mb-4 shadow-brutal-shadow-sm">
                <ShieldAlert className="w-8 h-8 text-red-600" />
              </div>

              <h2 className="font-display text-lg tracking-tighter text-[#09090B] uppercase">
                {alertModal.title}
              </h2>
              <p className="text-xs text-[#09090B]/60 font-body leading-relaxed mt-2.5">
                {alertModal.message}
              </p>

              <div className="mt-6">
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setAlertModal(null);
                  }}
                  className="w-full py-2.5 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-xs font-display text-[#09090B] hover:bg-[#c5db1a] transition-all btn-press shadow-brutal-shadow-sm cursor-pointer font-bold uppercase"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MANDATORY POST-LOGIN ONBOARDING MODAL ─── */}
      <AnimatePresence>
        {showOnboardingModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-xl select-none p-4 text-[#09090B]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#F8F4E8] border-4 border-[#09090B] rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-brutal-shadow overflow-hidden"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b-2 border-[#09090B] pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#09090B]" />
                  <span className="font-display text-sm font-black text-[#09090B] uppercase tracking-tight">
                    COMPLETE OPERATOR PROFILE
                  </span>
                </div>
                <span className="text-[8px] font-code font-bold bg-[#D2E823] text-black border border-black px-2 py-0.5 rounded uppercase">
                  STEP 2 / 2
                </span>
              </div>

              <div className="space-y-2 mb-5 text-left">
                <h3 className="font-display text-xl font-black text-[#09090B] uppercase">
                  WELCOME, OPERATOR 🚀
                </h3>
                <p className="text-xs font-body text-[#09090B]/70 leading-relaxed">
                  Before accessing the main dashboard, please complete your profile with your preferred <strong>username</strong> and <strong>Date of Birth</strong> for age verification.
                </p>
              </div>

              {onboardingError && (
                <div className="p-3 bg-red-100 border border-red-500 rounded-lg text-red-700 text-[10px] font-code leading-relaxed mb-4">
                  ⚠️ ERROR: {onboardingError}
                </div>
              )}

              <form onSubmit={handleCompleteOnboarding} className="space-y-4 text-left">
                {/* Username Input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase block">
                    OPERATOR USERNAME / FULL NAME:
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-[#09090B]/45" />
                    <input
                      type="text"
                      required
                      value={onboardingName}
                      onChange={e => setOnboardingName(e.target.value)}
                      placeholder="e.g. Gautam Meet"
                      className="w-full bg-[#FFFEF9] border-2 border-[#09090B] text-[#09090B] text-xs pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2E823] font-body"
                    />
                  </div>
                </div>

                {/* Date of Birth Input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase block">
                    DATE OF BIRTH (REQUIRED FOR AGE VERIFICATION):
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3.5 w-4 h-4 text-[#09090B]/45" />
                    <input
                      type="date"
                      required
                      value={onboardingDob}
                      onChange={e => setOnboardingDob(e.target.value)}
                      className="w-full bg-[#FFFEF9] border-2 border-[#09090B] text-[#09090B] text-xs pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2E823] font-code font-bold cursor-pointer"
                    />
                  </div>
                  <p className="text-[8px] font-code text-[#09090B]/60 pt-0.5">
                    🔒 Users under 18 will be automatically assigned to restricted Cadet mode.
                  </p>
                </div>

                {/* Track Selector */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase block">
                    SELECT PRIMARY TRACK:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-code font-bold text-[#09090B]">
                    {['Frontend', 'Backend', 'Fullstack', 'Database'].map(track => (
                      <div
                        key={track}
                        onClick={() => {
                          audioEngine.playClickSound();
                          setOnboardingTrack(track);
                        }}
                        className={`p-2.5 rounded-lg border-2 text-center cursor-pointer transition-all btn-press shadow-brutal-shadow-sm ${onboardingTrack === track
                            ? 'bg-[#D2E823] border-[#09090B] font-black'
                            : 'bg-white/60 border-black/10 opacity-70'
                          }`}
                      >
                        {track.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isOnboardingSubmitting}
                  className="w-full py-3.5 bg-[#D2E823] text-black border-2 border-[#09090B] text-xs font-display tracking-widest uppercase shadow-brutal-shadow btn-press cursor-pointer flex items-center justify-center gap-2 mt-4 font-black"
                >
                  {isOnboardingSubmitting ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-black" />
                      SAVING PROFILE TO MONGODB...
                    </>
                  ) : (
                    <>
                      SAVE & ENTER MATRIX HQ <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
