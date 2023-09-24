import React from "react";

export default function TermsPage() {
    return (
        <section className="flex flex-col items-center justify-center mb-32">
            <div className="font-museo text-4xl mt-32 mb-16">
                NightBloom Terms of Service (ToS)
            </div>
            <div className="flex flex-col justify-start gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <div className="text-[var(--pink)] text-xl">
                        1. Introduction
                    </div>
                    <div className="text-base">
                        Welcome to NightBloom. Please read these Terms of
                        Service &#40;&quot;Terms&quot; &#41; carefully as they
                        govern your access to and use of our services, including
                        our web application, content, and functionality.
                    </div>
                </div>
                {termsOfService.map((item: termType) => {
                    return (
                        <div className="gap-y-3 flex flex-col" key={item.name}>
                            <div className="text-[var(--pink)] text-xl">
                                {item.name}
                            </div>
                            {item.subsections.map((sub: subSectionType) => {
                                return (
                                    <div
                                        className="flex gap-x-3 pl-5 text-base"
                                        key={sub.name}
                                    >
                                        <div>{sub.name}</div>
                                        <div>{sub.content}</div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

type termType = {
    name: string;
    subsections: subSectionType[];
};

type subSectionType = {
    name: string;
    content: string;
};

const termsOfService: termType[] = [
    {
        name: "2. Relationship with MidJourney",
        subsections: [
            {
                name: "2.1.",
                content:
                    "NightBloom operates independently of MidJourney and is not affiliated, endorsed, or sponsored by MidJourney.",
            },
            {
                name: "2.2.",
                content:
                    "The images accessible through NightBloom are sourced from a public database hosted by MidJourney. We neither claim ownership nor copyright over these images.",
            },
            {
                name: "2.3.",
                content:
                    "NightBloom is a platform to facilitate the search for images in MidJourney\u0027s public database. We don\u0027t host or store these images but provide users a gateway to access them.",
            },
            {
                name: "2.4.",
                content:
                    "Users should respect the intellectual property rights of MidJourney and other relevant entities. NightBloom disclaims responsibility for any misuse or infringement actions by users.",
            },
        ],
    },
    {
        name: "3. User Registration and Responsibilities",
        subsections: [
            {
                name: "3.1.",
                content:
                    "Users may need to register to access certain features. Registration requires accurate and complete information.",
            },
            {
                name: "3.2.",
                content:
                    "Users are responsible for safeguarding their login credentials. NightBloom cannot and will not be liable for any loss arising from unauthorized use.",
            },
            {
                name: "3.3.",
                content:
                    "Users agree not to share, sell, or transfer their access rights to another individual or entity.",
            },
        ],
    },
    {
        name: "4. Usage Guidelines",
        subsections: [
            {
                name: "4.1.",
                content:
                    "NightBloom provides services \u0022as is.\u0022 Users agree to use the service lawfully and in good faith.",
            },
            {
                name: "4.2.",
                content:
                    "Users must not misuse our services by attempting unauthorized access, disrupting functionality, or distributing malicious software.",
            },
            {
                name: "4.3.",
                content:
                    "Unauthorized scraping or automated access of our platform is prohibited.",
            },
        ],
    },
    {
        name: "5. Subscription Services",
        subsections: [
            {
                name: "5.1.",
                content:
                    "We may offer subscription packages with additional features for a fee. Detailed terms will be provided upon subscription.",
            },
            {
                name: "5.2.",
                content:
                    "Payments once made for subscription services are generally non-refundable. Exceptions will be clearly stated.",
            },
        ],
    },
    {
        name: "6. Intellectual Property",
        subsections: [
            {
                name: "6.1.",
                content:
                    "Other than the third-party content, NightBloom owns or licenses all rights, title, and interest in and to the services, including all associated intellectual property rights.",
            },
            {
                name: "6.2.",
                content:
                    "Users must not use, reproduce, or distribute our content without our permission.",
            },
        ],
    },
    {
        name: "7. Limitation of Liability & Disclaimer",
        subsections: [
            {
                name: "7.1.",
                content:
                    "NightBloom, to the maximum extent permitted by law, disclaims all liabilities arising from or related to the use, misuse, or reliance on the services or content accessed through our platform.",
            },
            {
                name: "7.2.",
                content:
                    "Our services are provided without warranties of any kind, either express or implied.",
            },
        ],
    },
    {
        name: "8. Privacy",
        subsections: [
            {
                name: "8.1.",
                content:
                    "Our Privacy Policy, accessible on our website, governs the collection and use of personal information.",
            },
        ],
    },
    {
        name: "9. Termination",
        subsections: [
            {
                name: "9.1.",
                content:
                    "NightBloom reserves the right to suspend or terminate user access for violations of these Terms, illegal activities, or other reasons at our discretion.",
            },
            {
                name: "9.2.",
                content:
                    "Users can terminate their accounts at their discretion.",
            },
        ],
    },
    {
        name: "10. Amendments",
        subsections: [
            {
                name: "10.1.",
                content:
                    "We may periodically update these Terms. Continued use following changes constitutes acceptance.",
            },
        ],
    },
    {
        name: "11. Governing Law & Jurisdiction",
        subsections: [
            {
                name: "11.1.",
                content:
                    "These Terms are governed by laws of the jurisdiction in which NightBloom operates, without regard to conflict of law principles.",
            },
        ],
    },
    {
        name: "12. Feedback and Reporting",
        subsections: [
            {
                name: "12.1.",
                content:
                    "Users can provide feedback or report violations of these Terms through our website nightbloom.ai",
            },
        ],
    },
];
