import React from "react";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 max-w-screen-xl">
      <section className="flex flex-col items-center justify-center mb-32">
        <div className="font-museo text-4xl mt-32 mb-16 gap-y-3 flex flex-col items-center justify-center">
          NightBloom Privacy Policy
          <div className="text-base">Effective Date: 8th August 2023</div>
        </div>
        <div className="flex flex-col justify-start gap-y-6">
          <div className="flex flex-col gap-y-3">
            <div className="text-[var(--pink)] text-xl">Introduction</div>
            <div className="text-base">
              Welcome to NightBloom. We recognize the importance of your privacy
              and are committed to protecting any personal data we collect about
              you. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our web application.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
