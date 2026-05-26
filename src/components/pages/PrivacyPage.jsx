import React from 'react';
import LegalLayout from '../legal/LegalLayout';

const PrivacyPage = () => {
  // 📝 CONTENT STRUCTURE (Data only)
  const privacySections = [
    {
      title: "1. Information We Collect",
      content: "We collect basic personal information such as your name and email address during registration. Additionally, we track usage data to help us understand how you interact with our learning modules."
    },
    {
      title: "2. How We Use Information",
      content: "The data we collect is used strictly to improve your learning experience, track your daily progress, and maintain your streaks within the MicroLearn ecosystem."
    },
    {
      title: "3. Data Storage",
      content: "Your information is currently stored securely in your browser's local storage. As the platform evolves, we will move to a secure backend database to ensure your progress is synced across all devices."
    },
    {
      title: "4. Sharing Information",
      content: "We have a strict policy against selling or sharing your personal data. We do not provide your information to third-party advertisers or data brokers."
    },
    {
      title: "5. Your Control",
      content: "You have full control over your data. You can edit your profile information at any time or delete your account, which will permanently remove your data from your local browser storage."
    },
    {
      title: "6. Contact",
      content: "If you have any questions regarding this Privacy Policy or how your data is handled, please reach out to us at support@microlearn.com."
    }
  ];

  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 2026">
      {/* 🧩 PASSING CONTENT TO SHARED UI */}
      {privacySections.map((section, index) => (
        <section key={index} className="space-y-2">
          <h2 className="text-lg font-black text-[#0F172A] tracking-tight">
            {section.title}
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm font-medium">
            {section.content}
          </p>
        </section>
      ))}
    </LegalLayout>
  );
};

export default PrivacyPage;