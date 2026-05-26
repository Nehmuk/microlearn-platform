import React from 'react';
import LegalLayout from '../legal/LegalLayout';

const TermsPage = () => {
  // 📝 CONTENT STRUCTURE (Data only)
  const termsSections = [
    {
      title: "1. Usage of Platform",
      content: "MicroLearn is provided strictly for personal, non-commercial learning purposes. By using this platform, you agree to use the content solely for your own educational advancement."
    },
    {
      title: "2. User Responsibility",
      content: "You are responsible for providing accurate information when creating an account and maintaining the confidentiality of your session. Users must engage with the platform and community respectfully."
    },
    {
      title: "3. Content Ownership",
      content: "All learning modules, graphics, design elements, and brand logos are the exclusive intellectual property of MicroLearn. You may not redistribute or claim ownership of any platform content."
    },
    {
      title: "4. Account Management",
      content: "Users are responsible for managing their own account settings and progress. Since data is currently stored locally, you acknowledge that clearing browser data may result in the loss of progress."
    },
    {
      title: "5. Termination",
      content: "We reserve the right to suspend or terminate access to the platform if we detect misuse, unauthorized commercial use, or any activity that compromises the integrity of our learning modules."
    },
    {
      title: "6. Changes to Terms",
      content: "These terms may be updated periodically to reflect new features or legal requirements. Continued use of the platform after updates constitutes acceptance of the modified terms."
    },
    {
      title: "7. Contact",
      content: "For any inquiries regarding these Terms of Service, please contact our legal team at support@microlearn.com."
    }
  ];

  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 2026">
      {/* 🧩 PASSING CONTENT TO SHARED UI */}
      {termsSections.map((section, index) => (
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

export default TermsPage;