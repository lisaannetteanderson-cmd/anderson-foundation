import { Header, Footer } from '../../components/SiteChrome';

export default function CleaningAssistant() {
  return (
    <>
      <Header active="Careers" />
      <main>
        <section className="page-hero">
          <p className="eyebrow">CLEANING ASSISTANT</p>
          <h1>Cleaning Assistant</h1>
          <p className="lead">
            Help homes and businesses feel fresh, clean, and welcoming as part of the Anderson field team.
          </p>
        </section>

        <section className="content-section">
          <div className="content-card">
            <h2>Position Overview</h2>
            <p>
              This role includes residential and commercial cleaning, maintaining professional standards,
              and working respectfully in customer spaces.
            </p>

            <h3>Applicant Information</h3>
            <p>
              Submit only information needed for initial employment consideration. Do not submit a Social
              Security number, driver&apos;s-license number, passport number, bank-account information,
              passwords, medical records, or other highly sensitive identifiers through this public page.
            </p>

            <form action="mailto:careers@andersoncleaningservices.com" method="post" encType="text/plain">
              <p>
                <label htmlFor="name">Legal name *</label><br />
                <input id="name" name="legal_name" required autoComplete="name" />
              </p>
              <p>
                <label htmlFor="preferred">Preferred name</label><br />
                <input id="preferred" name="preferred_name" autoComplete="nickname" />
              </p>
              <p>
                <label htmlFor="email">Email *</label><br />
                <input id="email" name="email" type="email" required autoComplete="email" />
              </p>
              <p>
                <label htmlFor="phone">Phone *</label><br />
                <input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </p>
              <p>
                <label htmlFor="availability">Availability</label><br />
                <input id="availability" name="availability" placeholder="e.g. Mon–Fri, mornings" />
              </p>
              <p>
                <label htmlFor="experience">Relevant experience</label><br />
                <textarea id="experience" name="experience" rows={5} />
              </p>

              <div className="content-card" style={{ marginTop: 24 }}>
                <h3>Background Check &amp; Identity Verification</h3>
                <p>
                  Selected applicants may be required to complete an employment background check,
                  subject to applicable law. Any required disclosure, summary of rights, and authorization
                  will be provided before a screening is initiated.
                </p>
                <p>
                  If identity information is required for screening, including an SSN or government-issued
                  identification document, it should be submitted only through a secure background-screening
                  or identity-verification workflow provided by Anderson Cleaning Services. This website
                  does not collect or store those documents.
                </p>
                <div className="notice">
                  <strong>Secure verification step:</strong> A secure verification link will be provided
                  separately to applicants who reach the screening stage. Do not email or upload an SSN,
                  driver&apos;s license, state ID, passport, or financial credentials through this website.
                </div>
              </div>

              <h3>Terms &amp; Consent</h3>
              <div className="content-card">
                <p>
                  I understand that the information I provide is used to evaluate my employment application
                  and communicate with me about the hiring process. I understand that a background check,
                  when required and permitted by law, may involve a separate disclosure and authorization
                  process. I understand that sensitive identity information required for screening will be
                  requested through a separate secure workflow.
                </p>
                <p>
                  This application is not itself a standalone Fair Credit Reporting Act disclosure or
                  authorization for a consumer report. Any legally required documents and authorization
                  will be provided separately before a report is obtained.
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="application_consent" required /> I consent to the use of
                    the information in this application for employment consideration. *
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="screening_acknowledgment" required /> I acknowledge the
                    background-screening notice and agree to complete any separate disclosure and
                    authorization required by law if selected for screening. *
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="truthfulness" required /> I certify that the information
                    submitted is accurate to the best of my knowledge. *
                  </label>
                </p>
              </div>

              <p>
                <button className="btn btn-primary" type="submit">Submit Application</button>
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
