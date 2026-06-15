# Cybersecurity Policy

## 1. Introduction
This document outlines the security policies, protocols, and vulnerability reporting procedures for the MOVE Volunteer NGO website and its associated backend services. Security is a paramount concern to protect the personal data of volunteers, donors, and our partner communities.

## 2. Vulnerability Reporting
We take all security vulnerabilities seriously. If you believe you have found a security vulnerability in our platform, please report it immediately.

### How to Report a Vulnerability
- **Email:** security@move-voluntary.org
- **Process:** Please provide a detailed description of the vulnerability, including steps to reproduce it, the potential impact, and any proof-of-concept (PoC) code if available.
- **Response Time:** We aim to acknowledge receipt of all vulnerability reports within 48 hours and provide regular updates on the remediation process.
- **Confidentiality:** We request that you maintain confidentiality regarding the vulnerability until we have had an opportunity to address it. We will not take legal action against security researchers who act in good faith and follow this policy.

## 3. Secure Development Guidelines
Our development team adheres to the following secure coding practices:

- **Input Validation:** All user input must be strictly validated and sanitized on both the frontend and backend to prevent injection attacks (e.g., XSS, SQL Injection).
- **Authentication & Authorization:** Access to administrative and sensitive endpoints must be protected by robust authentication and authorization mechanisms. 
- **Data Protection:** Sensitive data, such as passwords, must be securely hashed and salted before storage (e.g., using bcrypt or Argon2). Personal information must be encrypted in transit using TLS/SSL and at rest where appropriate.
- **Dependency Management:** All third-party dependencies (npm packages, etc.) must be regularly scanned for known vulnerabilities using automated tools (e.g., `npm audit`). Outdated or vulnerable dependencies must be updated promptly.
- **Error Handling:** Application errors should be handled gracefully, and detailed error messages or stack traces should never be exposed to end-users to prevent information leakage.
- **Security Headers:** HTTP security headers (e.g., CSP, HSTS, X-Content-Type-Options) should be implemented to mitigate common web vulnerabilities.

## 4. Infrastructure Security
- **Access Control:** Access to production servers and databases is strictly limited to authorized personnel on a principle of least privilege.
- **Monitoring & Logging:** Comprehensive logging and monitoring are implemented to detect and respond to suspicious activities and potential security incidents.
- **Environment Variables:** Sensitive configuration data, such as API keys and database credentials, must be managed securely using environment variables and never hardcoded in the source code.

## 5. Regular Security Assessments
We commit to conducting regular security assessments, including code reviews and vulnerability scanning, to proactively identify and address potential security risks.

## 6. Updates to this Policy
This cybersecurity policy may be updated periodically to reflect changes in our platform or evolving security best practices. The latest version will always be available in this repository.

*Last Updated: 2026-06-15*
