import authCheck from "@/components/auth/authCheck";
import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import Layout from "@/components/layouts/Layout";
import { useThemeContext } from "@/context/theme.context";
import { Stack } from "@mui/system";
import React from "react";

const PrivacyPolicyPage = () => {
    const { theme } = useThemeContext();

    return (
        <Layout>
            <Stack
                className="items-center justify-center"
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    height: "auto",
                }}
            >
                <LogoAndSlogan
                    title={"Privacy Policy"}
                    subtitle={"Effective Date: 8th August 2023"}
                />

                <div className="flex flex-col justify-start gap-y-6">
                    <div className="flex flex-col gap-y-3">
                        <div className="text-[var(--pink)] text-xl">
                            Introduction
                        </div>
                        <div className="text-base">
                            Welcome to NightBloom. We recognize the importance
                            of your privacy and are committed to protecting any
                            personal data we collect about you. This Privacy
                            Policy explains how we collect, use, disclose, and
                            safeguard your information when you visit our web
                            application.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Information We Collect
                        </div>
                        <div className="italic">Personal Data</div>
                        <div className="text-base">
                            When you register for an account or use our
                            services, we may ask for your:
                        </div>
                        <ul className="list-disc ml-6">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>
                                Payment information &#40;for subscription
                                services&#41;
                            </li>
                            <li>Any other information you choose to provide</li>
                        </ul>
                        <div className="italic">Usage Data</div>
                        <div className="text-base">
                            We may also collect information on how the service
                            is accessed and used. This usage data may include:
                        </div>
                        <ul className="list-disc ml-6">
                            <li>Browser type and version</li>
                            <li>IP address</li>
                            <li>Time and date of your visit</li>
                            <li>Pages viewed</li>
                            <li>Time spent on pages</li>
                            <li>Other diagnostic data</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            How We Use Your Information
                        </div>
                        <div className="italic">Personal Data</div>
                        <div className="text-base">
                            We may use the collected data for various purposes:
                        </div>
                        <ul className="list-disc ml-6">
                            <li>To provide and maintain our service</li>
                            <li>To notify you about changes to our service</li>
                            <li>
                                To allow participation in interactive features
                            </li>
                            <li>For customer care and support</li>
                            <li>
                                To provide analysis or valuable information to
                                improve the service
                            </li>
                            <li>
                                To detect, prevent, and address technical issues
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Disclosure of Data
                        </div>
                        <div className="italic">Legal Requirements</div>
                        <div className="text-base">
                            We may disclose your personal data if such action is
                            necessary to:
                        </div>
                        <ul className="list-disc ml-6">
                            <li>Comply with a legal obligation</li>
                            <li>Protect and defend our rights</li>
                            <li>Prevent or investigate possible wrongdoing</li>
                            <li>Protect against legal liability</li>
                        </ul>
                        <div className="italic">
                            Third-party Service Providers
                        </div>
                        <div className="text-base">
                            We may employ third-party companies and individuals
                            to facilitate our service &#40;&quot;Service
                            Providers&quot;&#41;. They have access to your
                            personal data only to perform tasks on our behalf
                            and are obligated not to disclose or use it for
                            other purposes.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Security of Data
                        </div>
                        <div className="text-base">
                            We prioritize the security of your data but remember
                            that no method of transmission over the Internet or
                            electronic storage is 100% secure. While we strive
                            to use commercially acceptable means to protect your
                            personal data, absolute security cannot be
                            guaranteed.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Service Providers
                        </div>
                        <div className="text-base">
                            We may use third-party providers to monitor and
                            analyze the use of our service. For example:
                        </div>
                        <ul className="list-disc ml-6">
                            <li>
                                Payment processors for any subscription services
                            </li>
                            <li>
                                Analytics providers to analyze website usage
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Links to Other Sites
                        </div>
                        <div className="text-base">
                            Our service may contain links to other sites. If you
                            click on a third-party link, you will be directed to
                            their site. We advise reviewing the Privacy Policy
                            of every site you visit.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Children&apos;s Privacy
                        </div>
                        <div className="text-base">
                            Our service is not intended for individuals under
                            18. We do not knowingly collect personally
                            identifiable information from children under 18. If
                            you are a parent/guardian and believe your child
                            provided us with personal data, please contact us.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Changes to This Privacy Policy
                        </div>
                        <div className="text-base">
                            We may update our Privacy Policy periodically. You
                            are advised to review this page periodically for any
                            changes.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-base">
                        <div className="text-[var(--pink)] text-xl">
                            Contact Us
                        </div>
                        <div className="text-base">
                            If you have any questions about this Privacy Policy,
                            please contact us at nightbloom.ai
                        </div>
                    </div>
                </div>
                <div className="h-36"></div>
            </Stack>
        </Layout>
    );
};

export default PrivacyPolicyPage;
