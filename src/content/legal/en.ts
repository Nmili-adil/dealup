import type { LegalContent } from "./types";

export const legalEN: LegalContent = {
  privacy: {
    hero: {
      title: 'Privacy Policy',
      summary: 'How Dealup collects, uses and protects your personal data in compliance with applicable data protection law.',
      lastUpdated: 'Last updated: August 27, 2024',
    },
    sections: [
      {
        title: '1. Introduction',
        blocks: [
        { kind: "p", text: 'Dealup S.A.R.L. ("Dealup", "we", "us" or "our") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website (dealup.ma), use our platform or engage with our services.' },
        { kind: "p", text: 'This policy is drafted in accordance with applicable data protection law and the guidelines issued by the competent supervisory authorities.' },
        { kind: "p", text: 'By using our website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the terms of this policy, please discontinue use of our website and services immediately.' },
        ],
      },
      {
        title: '2. Information We Collect',
        blocks: [
        { kind: "p", text: 'We collect information that you provide directly, information generated through your use of our services, and information from third-party sources.' },
        { kind: "h2", text: 'Information You Provide' },
        { kind: "list", items: [
              'Full name, email address, phone number and business name',
              'Job title, role and company information',
              'Account credentials (username, password)',
              'Billing and payment information (processed securely via our payment providers)',
              'Content you upload or transmit through our platform (messages, media, contact lists)',
              'Communications you send to us (support requests, feedback, survey responses)',
            ] },
        { kind: "h2", text: 'Information Collected Automatically' },
        { kind: "list", items: [
              'IP address, browser type and version, operating system',
              'Device information (type, model, screen resolution, language settings)',
              'Usage data (pages visited, features used, timestamps, click patterns)',
              'Referring URLs and exit pages',
              'Log data and error reports',
            ] },
        { kind: "h2", text: 'Information from Third Parties' },
        { kind: "list", items: [
              'WhatsApp Business Platform data (message delivery status, conversation metadata)',
              'Meta Platform data (ad performance, click-to-WhatsApp ad metrics)',
              'Payment processor data (transaction confirmations, billing status)',
              'Public databases and business directories',
            ] },
        ],
      },
      {
        title: '3. Legal Basis for Processing',
        blocks: [
        { kind: "p", text: 'Under applicable data protection law, we process your personal data only when we have a valid legal basis to do so. The legal bases we rely on include:' },
        { kind: "list", items: [
              'Consent: You have given us clear, informed and explicit consent to process your data for specific purposes. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.',
              'Contractual necessity: Processing is necessary for the performance of a contract to which you are a party, or to take pre-contractual steps at your request.',
              'Legal obligation: Processing is necessary for compliance with a legal obligation to which we are subject.',
              'Legitimate interest: Processing is necessary for our legitimate interests or those of a third party, provided such interests are not overridden by your fundamental rights and freedoms.',
            ] },
        { kind: "p", text: 'When we process sensitive personal data (which we generally do not collect), we obtain your explicit prior consent or rely on another valid legal basis under applicable data protection law.' },
        ],
      },
      {
        title: '4. How We Use Your Information',
        blocks: [
        { kind: "p", text: 'We use your personal data for the following purposes:' },
        { kind: "list", items: [
              'Providing, operating and maintaining our platform and services',
              'Processing transactions and managing your subscription',
              'Creating and authenticating your account',
              'Sending service-related communications (updates, security alerts, support messages)',
              'Personalizing your experience and improving our platform',
              'Analyzing usage patterns to develop new features and improve existing ones',
              'Preventing fraud, unauthorized access and other security threats',
              'Complying with legal obligations and responding to lawful requests from authorities',
              'Running campaigns, automations and message delivery on your behalf through WhatsApp',
              'Providing customer support and responding to your inquiries',
            ] },
        ],
      },
      {
        title: '5. Data Sharing and Disclosure',
        blocks: [
        { kind: "p", text: 'We do not sell your personal data. We may share your information in the following limited circumstances:' },
        { kind: "list", items: [
              'Service providers: We share data with trusted third-party vendors who assist in operating our platform (hosting, payment processing, analytics, customer support tools). These providers are bound by contractual obligations to protect your data.',
              'WhatsApp / Meta Platforms: When you use our WhatsApp-related services, necessary data is transmitted to Meta Platforms to enable message delivery, analytics and ad performance tracking.',
              'Legal requirements: We may disclose your data when required by law, regulation, legal process or governmental request under applicable jurisdiction.',
              'Business transfers: In the event of a merger, acquisition or sale of assets, your data may be transferred as part of that transaction, subject to the same privacy protections.',
              'With your consent: We may share your data for purposes not described here only with your explicit prior consent.',
            ] },
        { kind: "p", text: 'All third-party service providers are required to implement adequate security measures and process your data only on our instructions.' },
        ],
      },
      {
        title: '6. International Data Transfers',
        blocks: [
        { kind: "p", text: 'Your data may be transferred to and processed in countries outside your country of residence, including countries that may not provide the same level of data protection. When we transfer data internationally, we ensure appropriate safeguards are in place, including:' },
        { kind: "list", items: [
              'Standard contractual clauses approved by the relevant supervisory authority or equivalent bodies',
              'Adequacy decisions for jurisdictions recognized as providing adequate protection',
              'Your explicit consent where required',
              'Transfer necessity for the performance of our contract with you',
            ] },
        { kind: "p", text: 'By using our services, you acknowledge and consent to such transfers, subject to the safeguards described in this policy.' },
        ],
      },
      {
        title: '7. Data Retention',
        blocks: [
        { kind: "p", text: 'We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including:' },
        { kind: "list", items: [
              'Account data: Retained for the duration of your account plus 36 months after the last activity.',
              'Transaction data: Retained for 5 years in compliance with applicable tax and commercial regulations.',
              'Campaign and message data: Retained for 24 months to enable analytics and reporting.',
              'Support communications: Retained for 12 months after the last interaction.',
              'Log and usage data: Retained for 12 months for security and debugging purposes.',
            ] },
        { kind: "p", text: 'When data is no longer required, it is securely deleted or anonymized so that it can no longer be associated with you.' },
        ],
      },
      {
        title: '8. Data Security',
        blocks: [
        { kind: "p", text: 'We implement organizational and technical security measures to protect your personal data against unauthorized access, alteration, disclosure or destruction. These measures include:' },
        { kind: "list", items: [
              'Encryption of data in transit (TLS/SSL) and at rest',
              'Regular security audits and vulnerability assessments',
              'Access controls and authentication mechanisms',
              'Employee training on data protection practices',
              'Incident response procedures for data breaches',
            ] },
        { kind: "p", text: 'While we strive to protect your personal data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to promptly notifying you and the relevant supervisory authority of any data breach that poses a risk to your rights and freedoms.' },
        ],
      },
      {
        title: '9. Your Rights Under Data Protection Law',
        blocks: [
        { kind: "p", text: 'Under applicable data protection law, you have the following rights regarding your personal data:' },
        { kind: "list", items: [
              'Right of access: Request a copy of the personal data we hold about you.',
              'Right of rectification: Request correction of inaccurate or incomplete data.',
              'Right of deletion: Request deletion of your data when it is no longer necessary for the purposes collected, or when you withdraw consent.',
              'Right to restrict processing: Request that we limit the processing of your data in certain circumstances.',
              'Right to data portability: Receive your data in a structured, commonly used and machine-readable format.',
              'Right to object: Object to the processing of your data for direct marketing or on grounds relating to your particular situation.',
              'Right to withdraw consent: Withdraw your consent at any time where processing is based on consent.',
            ] },
        { kind: "p", text: 'To exercise any of these rights, please contact our Data Protection Officer at the address or email listed below. We will respond to your request within 30 days.' },
        ],
      },
      {
        title: '10. Cookies and Tracking',
        blocks: [
        { kind: "p", text: 'We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use our site and improve our services.' },
        { kind: "p", text: 'For full details on the cookies we use, how to manage your preferences and how to opt out, please refer to our dedicated Cookie Policy.' },
        { kind: "list", items: [
              'Essential cookies: Required for basic website functionality (authentication, session management).',
              'Analytics cookies: Help us understand how visitors interact with our website (e.g., Google Analytics).',
              'Marketing cookies: Used to deliver relevant advertisements and track campaign performance.',
              'Preference cookies: Remember your settings and preferences (language, region).',
            ] },
        { kind: "p", text: 'You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.' },
        ],
      },
      {
        title: '11. Children\'s Privacy',
        blocks: [
        { kind: "p", text: 'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete that information promptly.' },
        { kind: "p", text: 'If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately.' },
        ],
      },
      {
        title: '12. Data Protection Officer',
        blocks: [
        { kind: "p", text: 'We have appointed a Data Protection Officer (DPO) responsible for overseeing our compliance with applicable data protection law and this Privacy Policy.' },
        { kind: "p", text: 'Contact our DPO at:' },
        { kind: "list", items: [
              'Email: support@dealup.ma',
              'Address: Dealup S.A.R.L., registered office available on request',
              'Phone: available on request',
            ] },
        { kind: "p", text: 'You may also lodge a complaint with the data protection authority in your country of residence.' },
        ],
      },
      {
        title: '13. Changes to This Policy',
        blocks: [
        { kind: "p", text: 'We may update this Privacy Policy from time to time. When we make material changes, we will notify you by posting a prominent notice on our website or by sending you an email. The "Last updated" date at the top of this page indicates when this policy was last revised.' },
        { kind: "p", text: 'We encourage you to review this policy periodically to stay informed about how we protect your data.' },
        ],
      },
      {
        title: '14. Contact Us',
        blocks: [
        { kind: "p", text: 'If you have any questions, concerns or requests regarding this Privacy Policy or our data practices, please contact us:' },
        { kind: "list", items: [
              'Email: support@dealup.ma',
              'Website: dealup.ma/contact',
              'Address: Dealup S.A.R.L., registered office available on request',
            ] },
        ],
      },
    ],
  },
  terms: {
    hero: {
      title: 'Terms of Service',
      summary: 'The rules and conditions governing your use of Dealup\'s platform and services.',
      lastUpdated: 'Last updated: August 27, 2024',
    },
    sections: [
      {
        title: '1. Introduction',
        blocks: [
        { kind: "p", text: 'These Terms of Service ("Terms") govern your access to and use of Dealup\'s website (dealup.ma), platform, mobile applications and related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.' },
        { kind: "p", text: 'Dealup S.A.R.L. ("Dealup", "we", "us" or "our") is a company duly registered in accordance with applicable company law.' },
        { kind: "p", text: 'Please read these Terms carefully before using our Services. If you do not agree to these Terms, you must not access or use our Services.' },
        ],
      },
      {
        title: '2. Eligibility',
        blocks: [
        { kind: "p", text: 'To use our Services, you must:' },
        { kind: "list", items: [
              'Be at least 18 years of age or the age of legal majority in your jurisdiction',
              'Have the legal capacity to enter into a binding agreement',
              'Not be prohibited from using the Services under applicable law',
              'Be located in a jurisdiction where our Services are available',
            ] },
        { kind: "p", text: 'By using the Services, you represent and warrant that you meet these eligibility requirements.' },
        ],
      },
      {
        title: '3. Account Registration',
        blocks: [
        { kind: "p", text: 'To access certain features of the Services, you must create an account. When registering, you agree to:' },
        { kind: "list", items: [
              'Provide accurate, current and complete information',
              'Maintain and promptly update your account information',
              'Keep your password secure and confidential',
              'Accept responsibility for all activities that occur under your account',
              'Notify us immediately of any unauthorized use of your account',
            ] },
        { kind: "p", text: 'We reserve the right to suspend or terminate accounts that provide false or misleading information, or that violate these Terms.' },
        ],
      },
      {
        title: '4. Description of Services',
        blocks: [
        { kind: "p", text: 'Dealup provides a WhatsApp-commerce platform that enables businesses to:' },
        { kind: "list", items: [
              'Send marketing campaigns and broadcasts via WhatsApp',
              'Automate customer conversations using AI-powered chatbots',
              'Manage shared team inboxes for WhatsApp conversations',
              'Create and manage WhatsApp contact lists and segments',
              'Run click-to-WhatsApp advertising campaigns through Meta platforms',
              'Track analytics and performance metrics for WhatsApp communications',
              'Manage WhatsApp Business API integrations',
            ] },
        { kind: "p", text: 'Features and functionality may vary depending on your subscription plan and may change at our discretion with reasonable notice.' },
        ],
      },
      {
        title: '5. Subscriptions and Payments',
        blocks: [
        { kind: "p", text: 'Our Services are offered through various subscription plans. By subscribing to a paid plan, you agree to the following:' },
        { kind: "list", items: [
              'Fees are billed in advance on a monthly or annual basis, depending on your selected billing cycle.',
              'All payments are processed in the currency displayed at checkout.',
              'Accepted payment methods include Visa, Mastercard and other methods displayed at checkout.',
              'Subscriptions automatically renew at the end of each billing cycle unless cancelled.',
              'We reserve the right to modify pricing with at least 30 days\' prior notice.',
              'Late payments may result in suspension of your access to the Services.',
            ] },
        { kind: "p", text: 'A free tier is available with limited features. A 14-day free trial of premium features may be offered from time to time. No charges are incurred during the trial period.' },
        ],
      },
      {
        title: '6. Refund Policy',
        blocks: [
        { kind: "p", text: 'Due to the digital nature of our Services, refunds are generally not provided. However:' },
        { kind: "list", items: [
              'If you experience continuous technical issues that we cannot resolve, you may be eligible for a partial or full refund at our discretion.',
              'For unauthorized or fraudulent charges, contact us immediately for investigation and potential refund.',
              'Cancellations take effect at the end of the current billing period; no refund is issued for the remaining period.',
            ] },
        { kind: "p", text: 'To request a refund, contact us at support@dealup.ma with your transaction details and a description of the issue.' },
        ],
      },
      {
        title: '7. User Content',
        blocks: [
        { kind: "p", text: 'You retain ownership of any content you submit, upload or transmit through the Services ("User Content"), including messages, images, media and contact lists.' },
        { kind: "p", text: 'By submitting User Content, you grant Dealup a non-exclusive, worldwide, royalty-free license to use, reproduce, modify and distribute that content solely for the purpose of providing and improving the Services.' },
        { kind: "p", text: 'You represent and warrant that you have all necessary rights and permissions to submit the User Content, and that it does not violate any applicable law or third-party rights.' },
        ],
      },
      {
        title: '8. Acceptable Use',
        blocks: [
        { kind: "p", text: 'You agree to use the Services in compliance with all applicable laws, including applicable law and WhatsApp\'s Business Policy. You must not:' },
        { kind: "list", items: [
              'Send spam, unsolicited messages or bulk communications that violate WhatsApp\'s policies',
              'Use the Services for any illegal, fraudulent or unauthorized purpose',
              'Impersonate any person or entity, or falsely represent your affiliation',
              'Upload or transmit malware, viruses or other harmful code',
              'Attempt to gain unauthorized access to our systems or other users\' accounts',
              'Interfere with or disrupt the integrity or performance of the Services',
              'Reverse engineer, decompile or disassemble any part of the Services',
              'Resell, sublicense or distribute the Services without our written consent',
              'Use automated systems (bots, scrapers) to access the Services except through our API',
              'Collect or harvest personal data from other users without their consent',
            ] },
        ],
      },
      {
        title: '9. Intellectual Property',
        blocks: [
        { kind: "p", text: 'All intellectual property rights in the Services, including software, text, graphics, logos, trademarks and design elements, are owned by Dealup or its licensors.' },
        { kind: "p", text: 'We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes, subject to these Terms.' },
        { kind: "p", text: 'You may not copy, modify, distribute, sell or lease any part of the Services, nor may you reverse engineer or attempt to extract the source code, except as permitted by applicable law.' },
        ],
      },
      {
        title: '10. Third-Party Services',
        blocks: [
        { kind: "p", text: 'Our Services integrate with third-party platforms, including WhatsApp (Meta Platforms), payment processors and analytics providers. Your use of these third-party services is subject to their respective terms and privacy policies.' },
        { kind: "p", text: 'We are not responsible for the availability, accuracy or practices of third-party services. We encourage you to review their terms before using them through our platform.' },
        ],
      },
      {
        title: '11. Data Protection',
        blocks: [
        { kind: "p", text: 'Your privacy is important to us. Our collection and use of personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference.' },
        { kind: "p", text: 'We process personal data in accordance with applicable data protection regulations. For details, please review our Privacy Policy.' },
        ],
      },
      {
        title: '12. Limitation of Liability',
        blocks: [
        { kind: "p", text: 'To the maximum extent permitted by applicable law, Dealup and its directors, employees and agents shall not be liable for any indirect, incidental, special, consequential or punitive damages, including but not limited to loss of profits, data, use or goodwill, arising out of or in connection with your use of the Services.' },
        { kind: "p", text: 'Our total liability for any claim arising from the Services shall not exceed the amount you paid to Dealup in the twelve (12) months preceding the claim.' },
        ],
      },
      {
        title: '13. Indemnification',
        blocks: [
        { kind: "p", text: 'You agree to indemnify, defend and hold harmless Dealup and its officers, directors, employees and agents from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising from:' },
        { kind: "list", items: [
              'Your use of the Services',
              'Your violation of these Terms',
              'Your violation of any applicable law or third-party rights',
              'Any User Content you submit through the Services',
            ] },
        ],
      },
      {
        title: '14. Termination',
        blocks: [
        { kind: "p", text: 'We may suspend or terminate your access to the Services at any time, with or without cause, with or without notice. Grounds for termination include but are not limited to:' },
        { kind: "list", items: [
              'Violation of these Terms or any applicable law',
              'Non-payment of fees when due',
              'Abuse of the Services or harm to other users',
              'Requests by law enforcement or governmental authorities',
            ] },
        { kind: "p", text: 'Upon termination, your right to use the Services ceases immediately. Provisions that by their nature should survive termination (including intellectual property, limitation of liability and indemnification) shall remain in effect.' },
        ],
      },
      {
        title: '15. Governing Law and Disputes',
        blocks: [
        { kind: "p", text: 'These Terms are governed by and construed in accordance with applicable law. Any dispute arising from or in connection with these Terms shall be submitted to the competent courts of the jurisdiction in which the company is registered.' },
        { kind: "p", text: 'Before initiating any legal proceedings, you agree to first attempt to resolve the dispute through good-faith negotiation by contacting us at support@dealup.ma.' },
        ],
      },
      {
        title: '16. Severability',
        blocks: [
        { kind: "p", text: 'If any provision of these Terms is found to be invalid or unenforceable, that provision shall be enforced to the maximum extent possible, and the remaining provisions shall continue in full force and effect.' },
        ],
      },
      {
        title: '17. Entire Agreement',
        blocks: [
        { kind: "p", text: 'These Terms, together with our Privacy Policy and any supplemental terms, constitute the entire agreement between you and Dealup regarding the Services and supersede all prior agreements and understandings.' },
        { kind: "p", text: 'Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of that right or provision.' },
        ],
      },
      {
        title: '18. Changes to These Terms',
        blocks: [
        { kind: "p", text: 'We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the Services after such changes constitutes acceptance of the updated Terms.' },
        ],
      },
      {
        title: '19. Contact Us',
        blocks: [
        { kind: "p", text: 'If you have any questions about these Terms, please contact us:' },
        { kind: "list", items: [
              'Email: support@dealup.ma',
              'Website: dealup.ma/contact',
              'Address: Dealup S.A.R.L., registered office available on request',
            ] },
        ],
      },
    ],
  },
  cookies: {
    hero: {
      title: 'Cookie Policy',
      summary: 'How Dealup uses cookies and similar technologies on our website and platform.',
      lastUpdated: 'Last updated: August 27, 2024',
    },
    sections: [
      {
        title: '1. What Are Cookies',
        blocks: [
        { kind: "p", text: 'Cookies are small text files that are stored on your device (computer, tablet or mobile) when you visit a website. They are widely used to make websites work efficiently, provide a better user experience and supply information to the website owners.' },
        { kind: "p", text: 'Similar technologies include web beacons, pixel tags, local storage and session storage, which serve comparable purposes.' },
        ],
      },
      {
        title: '2. How We Use Cookies',
        blocks: [
        { kind: "p", text: 'We use cookies and similar technologies for the following purposes:' },
        { kind: "list", items: [
              'Essential cookies: These are necessary for the website to function properly. They enable core features such as authentication, security and session management. Without these cookies, the Services cannot be provided.',
              'Analytics cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve the website and user experience.',
              'Marketing cookies: These are used to track visitors across websites to display relevant and engaging advertisements. They also limit the number of times an ad is shown and help measure the effectiveness of advertising campaigns.',
              'Preference cookies: These allow the website to remember choices you make (such as language or region) and provide enhanced, personalized features.',
            ] },
        ],
      },
      {
        title: '3. Specific Cookies We Use',
        blocks: [
        { kind: "p", text: 'The following table lists the main cookies we use and their purposes:' },
        { kind: "list", items: [
              'Session cookies (Essential): Maintain your session while logged in. Removed when you close your browser.',
              'Authentication cookies (Essential): Remember your login credentials for secure access. Persistent for 30 days.',
              'CSRF tokens (Essential): Protect against cross-site request forgery attacks. Session-based.',
              'Google Analytics (_ga, _gid, _gat): Collect anonymous usage statistics to improve the website. Persistent for up to 2 years.',
              'Meta Pixel (_fbp, _fbc): Track conversions from Facebook and Instagram advertising. Persistent for 90 days.',
              'Hotjar cookies (_hj*): Record session replays and heatmaps for UX improvement. Persistent for up to 1 year.',
              'Language preference cookie: Remembers your selected language (fr, ar, en). Persistent for 1 year.',
            ] },
        ],
      },
      {
        title: '4. Third-Party Cookies',
        blocks: [
        { kind: "p", text: 'Some cookies are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies:' },
        { kind: "list", items: [
              'Google Analytics: Web analytics service provided by Google LLC. Cookie policy: policies.google.com/technologies/cookies',
              'Meta Platforms: Advertising and conversion tracking. Cookie policy: www.facebook.com/policies/cookies',
              'Hotjar: User experience analytics. Cookie policy: www.hotjar.com/privacy',
              'Stripe: Payment processing. Cookie policy: stripe.com/cookies',
            ] },
        { kind: "p", text: 'We do not control these third-party cookies. Please refer to the respective providers\' cookie policies for more information.' },
        ],
      },
      {
        title: '5. Managing Your Cookie Preferences',
        blocks: [
        { kind: "p", text: 'You can manage your cookie preferences in several ways:' },
        { kind: "list", items: [
              'Browser settings: Most browsers allow you to block or delete cookies. Consult your browser\'s help documentation for instructions.',
              'Cookie consent tool: When you first visit our website, you are presented with a cookie consent banner that allows you to accept or reject non-essential cookies.',
              'Opt-out links: For Google Analytics, install the Google Analytics Opt-out Browser Add-on (tools.google.com/dlpage/gaoptout). For Meta, adjust your ad preferences at www.facebook.com/adpreferences.',
            ] },
        { kind: "p", text: 'Please note that disabling essential cookies may impair the functionality of our website and Services.' },
        ],
      },
      {
        title: '6. Impact of Disabling Cookies',
        blocks: [
        { kind: "p", text: 'If you choose to disable cookies, some features of our website may not function properly, including:' },
        { kind: "list", items: [
              'Logging in to your account',
              'Remembering your language and region preferences',
              'Accessing certain areas of the platform',
              'Personalized features and content',
            ] },
        ],
      },
      {
        title: '7. Updates to This Policy',
        blocks: [
        { kind: "p", text: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation or our business practices. When we make material changes, we will update the "Last updated" date and, where appropriate, notify you through our website or by email.' },
        { kind: "p", text: 'We encourage you to review this policy periodically to stay informed about how we use cookies.' },
        ],
      },
      {
        title: '8. Contact Us',
        blocks: [
        { kind: "p", text: 'If you have any questions about our use of cookies, please contact us:' },
        { kind: "list", items: [
              'Email: support@dealup.ma',
              'Website: dealup.ma/contact',
              'Address: Dealup S.A.R.L., registered office available on request',
            ] },
        ],
      },
    ],
  },
};
