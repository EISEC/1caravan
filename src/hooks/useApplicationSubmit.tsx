import { useState } from 'react';
import { ApplicationData } from '@/config/notifications';

interface UseApplicationSubmitResult {
  submitApplication: (data: ApplicationData) => Promise<{
    success: boolean;
    emailSent: boolean;
    telegramSent: boolean;
    error?: string;
  }>;
  isSubmitting: boolean;
  error: string | null;
}

export const useApplicationSubmit = (): UseApplicationSubmitResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (data: ApplicationData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      return {
        success: true,
        emailSent: result.emailSent,
        telegramSent: result.telegramSent,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        emailSent: false,
        telegramSent: false,
        error: errorMessage,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitApplication,
    isSubmitting,
    error,
  };
};
