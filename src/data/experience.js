// Edit this file to update your experience
export const experiences = [
  {
    id: 1,
    company: "Boeing - Vancouver",
    role: "Software Development Intern",
    period: "Sep 2024 - Present",
    description: "Worked on developer tools and platform reliability — modernized CI/CD, observability, and deployment tooling across microservices.",
    details: [
      "Revamped 20+ CI/CD pipelines across 11 microservices using reusable templates, dynamic value injection, and automated versioning (Docker, Kubernetes, Bash).",
      "Built a Bash script to display critical Helm/Kubernetes metrics for 22 microservices and created an Azure Monitor dashboard to speed deployment verification (saved 40+ hours/year).",
      "Designed and implemented an end-to-end deployment pipeline (Python & Bash) integrating Cosmos DB and Azure Service Bus to enable production launches.",
      "Automated vulnerability scanning with Twistlock across 11 CI pipelines, remediating 30+ critical/high CVEs and reducing MTTR.",
      "Architected a version-controlled Artifactory repository strategy for Helm charts, eliminating deployment failures caused by chart overrides.",
      "Automated alert-tagging in Azure alert management scripts to reduce alert noise during deployment windows.",
      "Hardened service principal rotation with Python-based error handling and notifications to ensure credential availability.",
       "Implemented custom runtime metrics with Azure Application Insights, reducing false-positive on-call emergencies by 30%.",
      "Refactored deployment scripts out of a monolithic repo to improve maintainability for a team of 14 developers and reduce pipeline risk."
    ],
    techStack: ["Python", "Bash", "Docker", "Kubernetes", "Azure DevOps", "Helm", "Twistlock", "Azure Monitor", "Cosmos DB", "Azure Service Bus"]
  },
  {
    id: 2,
    company: "University of British Columbia - Directed Studies",
    role: "Software Developer & Research Student",
    period: "Sep 2025 - Present",
    description: "Designing and building an LLM-powered, RAG-based system to generate personalized computer science practice problems and evaluate learning outcomes.",
    details: [
      "Designing an AI system using Retrieval-Augmented Generation (RAG) to personalize CS practice problems based on student profiles and preferences.",
      "Building a full-stack application with React Router v7 and TypeScript; integrating LLM pipelines and adaptive content retrieval.",
      "Planning and conducting an evaluation study targeting 2,000+ CS undergraduates to measure impacts on learning and engagement (supervised by Prof. Abdallah Mohamed)."
    ],
    techStack: ["React", "TypeScript", "React Router v7", "LLM", "RAG", "Python", "Node.js"]
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
    description: "Built interactive transcript visualizations and resilient data ingestion pipelines for the Student University Course Planner.",
    details: [
      "Developed interactive academic transcript visualizations using Java Swing and Apache Commons for a tool used by 10,000+ students.",
      "Built a resilient data-ingestion pipeline to parse CSV/XML transcript exports with validation, error handling, caching, and fast load times."
    ],
    techStack: ["Java", "Java Swing", "Apache Commons", "CSV", "XML"]
  }
]