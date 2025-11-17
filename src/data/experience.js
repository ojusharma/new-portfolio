export const experiences = [
  {
    id: 1,
    company: "Boeing - Vancouver",
    role: "Software Development Co-op Intern",
    period: "Sep 2024 - Present",
    description: "Currently working Part-Time, after a 12 month Co-op. \nEnhanced Java Spring Boot backend systems and platform reliability through strategic refactoring, CI/CD modernization, and security hardening across microservices.",
    details: [
      "Enhanced Java Spring Boot microservice  that scans the database for expiring user-issued OAuth clients, preventing automated revocation of a newly onboarded Azure Service Principal and preserving API availability.",
      "Revamped 20+ CI/CD pipelines across 11 microservices by implementing dynamic value injection, reusable templates & automated versioning (Docker, Kubernetes, Bash, Linux), reducing deployment times & saving 100+ hours annually.",
      "Improved Java Spring Boot backend reliability by implementing custom runtime metrics with Microsoft Azure Application Insights; eliminated redundant runtime errors, and reduced false-positive on-call emergencies by 30%.",
      "Optimized deployment verification by developing a Bash script that displays critical Helm and Kubernetes metrics for 22 microservices (saved 40+ hours/year) and built a complementary Azure Monitor dashboard.",
      "Designed and built an end-to-end deployment pipeline from scratch in Python and Bash, enabling the first production launch of a new feature, with Cosmos DB and Microsoft Azure Service Bus integration.",
      "Bolstered platform security by automating vulnerability scanning with Twistlock in 11 CI pipelines, remediating critical CVEs and reducing the mean time to remediation (MTTR) by an estimated 30%.",
      "Architected and deployed a version-controlled JFrog Artifactory repository strategy for Helm charts, eliminating 100% of deployment failures caused by chart overrides and improving deployment reliability for 9 microservices.",
      "Engineered a dynamic tagging system in an Azure alert management script using Bash and Python, reducing alert noise by cutting false positives during deployment windows by 100%.",
      "Fortified a critical service principal rotation pipeline with a Python-based error handling and notification system, guaranteeing 100% credential availability and preventing potential service outages across the platform.",
      "Refactored a monolithic repository by decoupling deployment scripts, reducing the risk of deployment pipeline failures and improving codebase maintainability for a team of 14 developers.",
      "Led a security initiative to upgrade base Docker images for 10 microservices, patching 30+ critical and high-severity CVEs to reduce the platform's attack surface significantly."
    ],
    techStack: ["Java", "Spring Boot", "Python", "Bash", "Docker", "Kubernetes", "Azure DevOps", "Helm", "Twistlock", "Azure Monitor", "Cosmos DB", "Azure Service Bus", "JFrog Artifactory", "SendGrid"]
  },
  {
    id: 2,
    company: "University of British Columbia - Directed Studies",
    role: "Software Developer",
    period: "Sep 2025 - Present",
    description: "Designing an AI system that leverages Large Language Models (LLMs) to personalize computer science practice problems based on individual student profiles and preferences.",
    details: [
      "Designing an AI system that leverages Large Language Models (LLMs) to personalize computer science practice problems based on individual student profiles and preferences.",
      "Building a full-stack software with React Router and TypeScript; integrating LLM pipelines for adaptive content retrieval.",
      "Conducting an evaluation study with a target population of 2,000+ CS undergraduates to assess impacts on learning outcomes and engagement, under the supervision of Prof. Abdallah Mohamed."
    ],
    techStack: ["React", "TypeScript", "React Router", "LLM", "RAG", "Python", "Node.js"]
  },
  {
    id: 3,
    company: "Technical University of Munich (TUM)",
    role: "Software Development - Lead Intern",
    period: "May 2024 - Aug 2024",
    description: "Led development and productionization of a Dockerized Node-RED research chatbot and supporting infrastructure for multi-country deployment.",
    details: [
      "Led end-to-end development of a Dockerized Node-RED research chatbot deployed to 100+ participants across 4 countries; designed data-capture flows and telemetry.",
      "Automated backup and disaster-recovery procedures on Leibniz Supercomputing Centre servers to raise production uptime.",
      "Optimized Node-RED flows and API handling (JavaScript), refactoring bottlenecks and reducing latency by ~15%."
    ],
    techStack: ["Docker", "Node-RED", "JavaScript", "Linux", "Bash", "Git"]
  },
  {
    id: 4,
    company: "Technical University of Munich (TUM)",
    role: "Software Development - Research Intern",
    period: "Jul 2023 - Aug 2023",
    description: "Supported research infrastructure and telemetry for a Node-RED chatbot and production services.",
    details: [
      "Architected production infrastructure (Docker, relational SQL schema, Git workflows) and validated performance with stress tests for 1,000+ concurrent users.",        
      "Implemented reliable telemetry and data-capture flows for research deployments.",
      "Contributed to infrastructure automation, performance validation, and data integrity workflows."
    ],
    techStack: ["Docker", "SQL", "Git", "Node-RED", "JavaScript", "Linux"]
  },
  {
    id: 5,
    company: "University of British Columbia",
    role: "Software Development Intern",
    period: "May 2023 - Jun 2023",
    description: "Developed interactive academic transcript visualizations and resilient data ingestion pipelines for the Student University Course Planner.",
    details: [
      "Developed interactive academic transcript visualizations (Java Swing, Apache Commons) for the Student University Course Planner, to be used by 10,000+ students, improving course selection workflows and usability.",
      "Built a resilient data-ingestion pipeline to parse multiple transcript export formats (CSV/XML), added validation, error handling and caching to ensure accuracy and fast load times for complex records."
    ],
    techStack: ["Java", "Java Swing", "Apache Commons", "CSV", "XML"]
  }
]