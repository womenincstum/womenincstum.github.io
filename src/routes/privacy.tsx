import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy · Women in CS @ TUM" },
      { name: "description", content: "Privacy Policy and data protection information for Women in CS @ TUM e.V." },
      { property: "og:title", content: "Privacy Policy · Women in CS @ TUM" },
      { property: "og:description", content: "Privacy Policy and data protection information." },
    ],
  }),
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="mx-auto max-w-3xl px-5 pt-10 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>

      <section className="mx-auto max-w-3xl px-5 py-12 w-full">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Data Protection</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          <span className="text-brand-gradient">Privacy Policy</span>
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-2">1. General Information</h2>
            <p className="text-muted-foreground">
              The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified. Detailed information on the subject of data protection can be found in our privacy policy listed below.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">2. Controller (Data Protection Officer)</h2>
            <p className="text-muted-foreground">
              The party responsible for data processing on this website (controller) under data protection laws, in particular the EU General Data Protection Regulation (GDPR), is:
            </p>
            <p className="text-muted-foreground mt-2">
              Women in CS @ TUM e.V.<br />
              c/o Technical University of Munich<br />
              School of Computation, Information and Technology<br />
              Boltzmannstraße 3<br />
              85748 Garching bei München<br />
              Germany
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Represented by:</strong><br />
              Alina Ignatova, Joy Chaeeun Lee, Sabrina Glatz
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Contact:</strong><br />
              Phone: +49 176 56811362<br />
              Email:{" "}
              <a href="mailto:womenincstum@gmail.com" className="text-primary hover:underline">
                womenincstum@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">3. Data Collection on Our Website</h2>
            <h3 className="text-md font-semibold mt-4 mb-2">Server Log Files & IP Addresses</h3>
            <p className="text-muted-foreground">
              Our website is hosted on GitHub Pages (provided by GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). To serve the website securely and efficiently, GitHub automatically collects and stores information in so-called server log files, which your browser automatically transmits to us/GitHub. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>IP address of the accessing device</li>
              <li>Date and time of the server request</li>
              <li>Name and URL of the retrieved file</li>
              <li>Referrer URL (the page visited prior to this)</li>
              <li>Browser type and version</li>
              <li>Operating system used</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              This data is not merged with other data sources. The collection and processing of this data is necessary to display our website to you, to ensure stability and security, and to enable troubleshooting. The legal basis for this processing is Art. 6(1)(f) GDPR (legitimate interest in the technical provision and security of the website).
            </p>
            <p className="text-muted-foreground mt-2">
              For more information on GitHub's privacy practices, please refer to the{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Privacy Statement
              </a>.
            </p>

            <h3 className="text-md font-semibold mt-4 mb-2">Cookies</h3>
            <p className="text-muted-foreground">
              This website is designed to be privacy-friendly. We do not use any cookies, web beacons, or tracking technologies that track your browsing behavior across other websites or services.
            </p>

            <h3 className="text-md font-semibold mt-4 mb-2">Email Contact</h3>
            <p className="text-muted-foreground">
              If you contact us via email, the information you provide (your email address, name, and the content of your message) will be stored by us for the purpose of processing your inquiry and addressing any follow-up questions. We will not share this data with third parties without your consent. The legal basis for processing this data is Art. 6(1)(f) GDPR (legitimate interest in processing user inquiries) or Art. 6(1)(b) GDPR if the contact aims to enter into or perform a contract.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">4. Your Rights under the GDPR</h2>
            <p className="text-muted-foreground">
              As a data subject, you have the following rights under the GDPR:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
              <li>
                <strong>Art. 15 GDPR (Right of Access):</strong> You have the right to obtain confirmation as to whether or not personal data concerning you is being processed, and access to that data.
              </li>
              <li>
                <strong>Art. 16 GDPR (Right to Rectification):</strong> You have the right to request the rectification of inaccurate personal data or completion of incomplete personal data.
              </li>
              <li>
                <strong>Art. 17 GDPR (Right to Erasure / Right to be Forgotten):</strong> You have the right to request the deletion of your personal data under certain conditions.
              </li>
              <li>
                <strong>Art. 18 GDPR (Right to Restriction of Processing):</strong> You have the right to request the restriction of processing of your personal data under certain conditions.
              </li>
              <li>
                <strong>Art. 20 GDPR (Right to Data Portability):</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format.
              </li>
              <li>
                <strong>Art. 21 GDPR (Right to Object):</strong> You have the right to object, on grounds relating to your particular situation, at any time to processing of your personal data based on Art. 6(1)(f) GDPR.
              </li>
              <li>
                <strong>Art. 7(3) GDPR (Right to Withdraw Consent):</strong> If the processing is based on your consent, you have the right to withdraw your consent at any time.
              </li>
              <li>
                <strong>Art. 77 GDPR (Right to Lodge a Complaint):</strong> You have the right to lodge a complaint with a competent data protection supervisory authority if you believe that the processing of your personal data violates the GDPR.
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, you can contact us at any time using the contact details provided in Section 2.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">5. Data Security</h2>
            <p className="text-muted-foreground">
              For security reasons and to protect the transmission of confidential content (such as inquiries you send to us), this site uses SSL or TLS encryption. You can recognize an encrypted connection by the browser's address bar changing from "http://" to "https://" and by the lock icon in your browser line. When SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Last updated: June 24, 2026
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
