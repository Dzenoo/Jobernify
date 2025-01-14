'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

const VerifyEmail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const router = useRouter();
  const { token, type } = searchParams;
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    if (token) {
      setVerificationStatus('verifying');
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/${type}s/verify-email?token=${token}`,
        )
        .then(() => {
          setVerificationStatus('success');
          setTimeout(() => router.push('/login'), 2500);
        })
        .catch((error) => {
          setVerificationStatus('error');
        });
    }
  }, [token, type, router]);

  const renderMessage = () => {
    switch (verificationStatus) {
      case 'pending':
        return 'Preparing to verify your email...';
      case 'verifying':
        return 'Verifying your email...';
      case 'success':
        return 'Email verified successfully! Redirecting to login...';
      case 'error':
        return 'Error verifying email. Please try again or contact support.';
      default:
        return 'Verifying your email...';
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-muted-foreground text-sm animate-pulse">
        {renderMessage()}
      </p>
    </div>
  );
};

export default VerifyEmail;
