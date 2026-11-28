import type { InterviewQuestion } from '../../types/interview';

export const systemDesignQuestions: InterviewQuestion[] = [
  {
    "id": "SYSTEM-DESIGN-001",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain System design in system design. How would you apply it?",
    "shortAnswer": "Translate requirements into components, interfaces and trade-offs; validate with measurable targets.",
    "detailedAnswer": "Translate requirements into components, interfaces and trade-offs; validate with measurable targets.\n\nIllustrative example:\nrequirements → API → data → components → failure analysis\n\nDesign review: In an enterprise order platform, evaluate system design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ముందుగా requirements, traffic, latency తెలుసుకొని architecture నిర్ణయించాలి.\n\nఉదాహరణ:\nrequirements → API → data → components → failure analysis\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "requirements → API → data → components → failure analysis",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate system design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of system design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate system design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-002",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Functional vs nonfunctional requirements in system design. How would you apply it?",
    "shortAnswer": "Functional requirements describe behavior; nonfunctional requirements constrain latency, availability and security.",
    "detailedAnswer": "Functional requirements describe behavior; nonfunctional requirements constrain latency, availability and security.\n\nIllustrative example:\nPOST /orders; p99 < 300 ms\n\nDesign review: In an enterprise order platform, evaluate functional vs nonfunctional requirements against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Order create చేయడం functional; ఎంత వేగంగా చేయాలి అనేది nonfunctional.\n\nఉదాహరణ:\nPOST /orders; p99 < 300 ms\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "POST /orders; p99 < 300 ms",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate functional vs nonfunctional requirements against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of functional vs nonfunctional requirements using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate functional vs nonfunctional requirements under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-003",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Capacity estimation in system design. How would you apply it?",
    "shortAnswer": "Estimate peak throughput, payload size and retention separately; account for replication and headroom.",
    "detailedAnswer": "Estimate peak throughput, payload size and retention separately; account for replication and headroom.\n\nIllustrative example:\n10M requests/day / 86400 = 116 average RPS; 10x peak = 1160 RPS\n\nDesign review: In an enterprise order platform, evaluate capacity estimation against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "రోజువారీ requests ను seconds తో divide చేసి average RPS లెక్కించాలి; peak వేరుగా అంచనా వేయాలి.\n\nఉదాహరణ:\n10M requests/day / 86400 = 116 average RPS; 10x peak = 1160 RPS\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "10M requests/day / 86400 = 116 average RPS; 10x peak = 1160 RPS",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate capacity estimation against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of capacity estimation using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate capacity estimation under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-004",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Vertical vs horizontal scaling in system design. How would you apply it?",
    "shortAnswer": "Vertical scaling increases machine capacity; horizontal scaling adds instances and requires coordination.",
    "detailedAnswer": "Vertical scaling increases machine capacity; horizontal scaling adds instances and requires coordination.\n\nIllustrative example:\n2 replicas × 500 RPS = 1000 RPS nominal\n\nDesign review: In an enterprise order platform, evaluate vertical vs horizontal scaling against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "పెద్ద server వాడటం vertical; servers సంఖ్య పెంచడం horizontal.\n\nఉదాహరణ:\n2 replicas × 500 RPS = 1000 RPS nominal\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "2 replicas × 500 RPS = 1000 RPS nominal",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate vertical vs horizontal scaling against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of vertical vs horizontal scaling using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate vertical vs horizontal scaling under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-005",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Stateless services in system design. How would you apply it?",
    "shortAnswer": "Keep durable session state outside individual instances so requests can reach any healthy replica.",
    "detailedAnswer": "Keep durable session state outside individual instances so requests can reach any healthy replica.\n\nIllustrative example:\nClient → LB → API replicas → shared session store\n\nDesign review: In an enterprise order platform, evaluate stateless services against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Session ను ఒక్క instance memory లో ఉంచకుండా shared store వాడాలి.\n\nఉదాహరణ:\nClient → LB → API replicas → shared session store\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Client → LB → API replicas → shared session store",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate stateless services against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of stateless services using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate stateless services under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-006",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Latency vs throughput in system design. How would you apply it?",
    "shortAnswer": "Latency measures time per operation; throughput measures completed operations per time unit; saturation raises queue delay.",
    "detailedAnswer": "Latency measures time per operation; throughput measures completed operations per time unit; saturation raises queue delay.\n\nIllustrative example:\n100 concurrent requests / 0.2 seconds ≈ 500 RPS in steady state\n\nDesign review: In an enterprise order platform, evaluate latency vs throughput against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒక్క request సమయం latency; second కు పూర్తయ్యే requests throughput.\n\nఉదాహరణ:\n100 concurrent requests / 0.2 seconds ≈ 500 RPS in steady state\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "100 concurrent requests / 0.2 seconds ≈ 500 RPS in steady state",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate latency vs throughput against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of latency vs throughput using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate latency vs throughput under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-007",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Availability vs reliability in system design. How would you apply it?",
    "shortAnswer": "Availability measures usable service time or successful requests; reliability concerns failure-free operation over a period.",
    "detailedAnswer": "Availability measures usable service time or successful requests; reliability concerns failure-free operation over a period.\n\nIllustrative example:\n99.9% time availability ≈ 43.2 min downtime per 30 days\n\nDesign review: In an enterprise order platform, evaluate availability vs reliability against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Service అందుబాటులో ఉండటం availability; failure లేకుండా పనిచేయడం reliability.\n\nఉదాహరణ:\n99.9% time availability ≈ 43.2 min downtime per 30 days\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "99.9% time availability ≈ 43.2 min downtime per 30 days",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate availability vs reliability against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of availability vs reliability using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate availability vs reliability under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-008",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain SLO and error budget in system design. How would you apply it?",
    "shortAnswer": "Define an SLI and target over a window; use remaining error budget to guide releases.",
    "detailedAnswer": "Define an SLI and target over a window; use remaining error budget to guide releases.\n\nIllustrative example:\n99.9% of 1M eligible requests = 1000 allowed failures\n\nDesign review: In an enterprise order platform, evaluate slo and error budget against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "SLI measurement ఆధారంగా SLO నిర్ణయించి failure budget లెక్కించాలి.\n\nఉదాహరణ:\n99.9% of 1M eligible requests = 1000 allowed failures\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "99.9% of 1M eligible requests = 1000 allowed failures",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate slo and error budget against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of slo and error budget using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate slo and error budget under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-009",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Bottleneck analysis in system design. How would you apply it?",
    "shortAnswer": "Measure utilization, queueing and latency before scaling the limiting resource.",
    "detailedAnswer": "Measure utilization, queueing and latency before scaling the limiting resource.\n\nIllustrative example:\nAPI 1000 RPS; DB 400 RPS → DB is candidate bottleneck\n\nDesign review: In an enterprise order platform, evaluate bottleneck analysis against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఏ component వద్ద queue పెరుగుతుందో metrics తో గుర్తించాలి.\n\nఉదాహరణ:\nAPI 1000 RPS; DB 400 RPS → DB is candidate bottleneck\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "API 1000 RPS; DB 400 RPS → DB is candidate bottleneck",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate bottleneck analysis against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of bottleneck analysis using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate bottleneck analysis under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-010",
    "technology": "system-design",
    "topic": "Fundamentals and Capacity",
    "question": "Explain Back-of-envelope storage in system design. How would you apply it?",
    "shortAnswer": "Multiply records by size and retention; add index, replica and backup overhead.",
    "detailedAnswer": "Multiply records by size and retention; add index, replica and backup overhead.\n\nIllustrative example:\n1M/day × 2 KB × 30 = 60 GB raw\n\nDesign review: In an enterprise order platform, evaluate back-of-envelope storage against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Records సంఖ్య, size, retention ఆధారంగా raw storage లెక్కించాలి.\n\nఉదాహరణ:\n1M/day × 2 KB × 30 = 60 GB raw\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "1M/day × 2 KB × 30 = 60 GB raw",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate back-of-envelope storage against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of back-of-envelope storage using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate back-of-envelope storage under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-011",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Load balancing in system design. How would you apply it?",
    "shortAnswer": "Distribute traffic across healthy backends; choose algorithm based on workload.",
    "detailedAnswer": "Distribute traffic across healthy backends; choose algorithm based on workload.\n\nIllustrative example:\nClient → LB → API A/B/C\n\nDesign review: In an enterprise order platform, evaluate load balancing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Healthy instances మధ్య traffic పంచాలి.\n\nఉదాహరణ:\nClient → LB → API A/B/C\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Client → LB → API A/B/C",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate load balancing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of load balancing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate load balancing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-012",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain L4 vs L7 load balancing in system design. How would you apply it?",
    "shortAnswer": "L4 routes connections by transport attributes; L7 can route by HTTP host/path and headers.",
    "detailedAnswer": "L4 routes connections by transport attributes; L7 can route by HTTP host/path and headers.\n\nIllustrative example:\n/orders → order API; /payments → payment API\n\nDesign review: In an enterprise order platform, evaluate l4 vs l7 load balancing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "L4 TCP స్థాయిలో; L7 HTTP path ఆధారంగా route చేయగలదు.\n\nఉదాహరణ:\n/orders → order API; /payments → payment API\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "/orders → order API; /payments → payment API",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate l4 vs l7 load balancing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of l4 vs l7 load balancing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate l4 vs l7 load balancing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-013",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Round robin vs least connections in system design. How would you apply it?",
    "shortAnswer": "Round robin cycles backends; least connections favors fewer active connections, not necessarily lower CPU.",
    "detailedAnswer": "Round robin cycles backends; least connections favors fewer active connections, not necessarily lower CPU.\n\nIllustrative example:\nA=20 active, B=5 → least connections selects B\n\nDesign review: In an enterprise order platform, evaluate round robin vs least connections against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Requests సమానంగా ఉంటే round robin; long connections ఉంటే least connections పరిశీలించాలి.\n\nఉదాహరణ:\nA=20 active, B=5 → least connections selects B\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "A=20 active, B=5 → least connections selects B",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate round robin vs least connections against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of round robin vs least connections using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate round robin vs least connections under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-014",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Reverse proxy in system design. How would you apply it?",
    "shortAnswer": "A reverse proxy represents backend servers and can terminate TLS, route and enforce limits.",
    "detailedAnswer": "A reverse proxy represents backend servers and can terminate TLS, route and enforce limits.\n\nIllustrative example:\nClient → reverse proxy → private API\n\nDesign review: In an enterprise order platform, evaluate reverse proxy against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Client కు backend details తెలియకుండా proxy requests forward చేస్తుంది.\n\nఉదాహరణ:\nClient → reverse proxy → private API\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Client → reverse proxy → private API",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate reverse proxy against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of reverse proxy using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate reverse proxy under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-015",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Forward proxy in system design. How would you apply it?",
    "shortAnswer": "A forward proxy represents clients and controls outbound access.",
    "detailedAnswer": "A forward proxy represents clients and controls outbound access.\n\nIllustrative example:\nEmployee → proxy → external API\n\nDesign review: In an enterprise order platform, evaluate forward proxy against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Client తరఫున బయటకు requests పంపే proxy ఇది.\n\nఉదాహరణ:\nEmployee → proxy → external API\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Employee → proxy → external API",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate forward proxy against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of forward proxy using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate forward proxy under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-016",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain DNS in system design. How would you apply it?",
    "shortAnswer": "DNS resolves names to records; caching and TTL affect failover propagation.",
    "detailedAnswer": "DNS resolves names to records; caching and TTL affect failover propagation.\n\nIllustrative example:\norders.example.com → A/AAAA or alias\n\nDesign review: In an enterprise order platform, evaluate dns against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Domain name ను address కు resolve చేస్తుంది; TTL వల్ల మార్పు వెంటనే కనిపించకపోవచ్చు.\n\nఉదాహరణ:\norders.example.com → A/AAAA or alias\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "orders.example.com → A/AAAA or alias",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate dns against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of dns using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate dns under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-017",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain CDN in system design. How would you apply it?",
    "shortAnswer": "Cache eligible content at edge locations; define cache keys and invalidation carefully.",
    "detailedAnswer": "Cache eligible content at edge locations; define cache keys and invalidation carefully.\n\nIllustrative example:\nCache-Control: public, max-age=300\n\nDesign review: In an enterprise order platform, evaluate cdn against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Static content ను user దగ్గర edge లో cache చేయాలి; private data cache చేయకూడదు.\n\nఉదాహరణ:\nCache-Control: public, max-age=300\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Cache-Control: public, max-age=300",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cdn against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cdn using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cdn under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-018",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Anycast in system design. How would you apply it?",
    "shortAnswer": "Advertise the same IP from multiple locations; routing selects a network path, not guaranteed nearest geography.",
    "detailedAnswer": "Advertise the same IP from multiple locations; routing selects a network path, not guaranteed nearest geography.\n\nIllustrative example:\nSame service IP advertised in multiple regions\n\nDesign review: In an enterprise order platform, evaluate anycast against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒకే IP ని అనేక locations advertise చేస్తాయి; routing path ఆధారంగా traffic వెళ్తుంది.\n\nఉదాహరణ:\nSame service IP advertised in multiple regions\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Same service IP advertised in multiple regions",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate anycast against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of anycast using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate anycast under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-019",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Connection pooling in system design. How would you apply it?",
    "shortAnswer": "Reuse bounded connections to reduce handshake cost and protect dependencies.",
    "detailedAnswer": "Reuse bounded connections to reduce handshake cost and protect dependencies.\n\nIllustrative example:\n20 connections × 10 replicas = 200 DB connections\n\nDesign review: In an enterprise order platform, evaluate connection pooling against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Connections reuse చేయాలి; అన్ని replicas pool sizes కలిపి DB capacity చూడాలి.\n\nఉదాహరణ:\n20 connections × 10 replicas = 200 DB connections\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "20 connections × 10 replicas = 200 DB connections",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate connection pooling against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of connection pooling using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate connection pooling under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-020",
    "technology": "system-design",
    "topic": "Networking and Load Balancing",
    "question": "Explain Global traffic routing in system design. How would you apply it?",
    "shortAnswer": "Route by health, geography or latency; plan DNS caching and regional data ownership.",
    "detailedAnswer": "Route by health, geography or latency; plan DNS caching and regional data ownership.\n\nIllustrative example:\nGlobal DNS → healthy region A or B\n\nDesign review: In an enterprise order platform, evaluate global traffic routing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Region failure వచ్చినప్పుడు healthy region కు traffic మార్చాలి; data consistency కూడా చూడాలి.\n\nఉదాహరణ:\nGlobal DNS → healthy region A or B\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "Global DNS → healthy region A or B",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate global traffic routing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of global traffic routing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate global traffic routing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-021",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Cache-aside in system design. How would you apply it?",
    "shortAnswer": "Read cache first, load missing data from database and populate cache; invalidate after writes.",
    "detailedAnswer": "Read cache first, load missing data from database and populate cache; invalidate after writes.\n\nIllustrative example:\nGET cache:key → miss → DB → SET with TTL\n\nDesign review: In an enterprise order platform, evaluate cache-aside against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Cache miss అయితే DB నుంచి చదివి cache లో పెట్టాలి.\n\nఉదాహరణ:\nGET cache:key → miss → DB → SET with TTL\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "GET cache:key → miss → DB → SET with TTL",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cache-aside against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cache-aside using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cache-aside under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-022",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Write-through vs write-back in system design. How would you apply it?",
    "shortAnswer": "Write-through updates backing store synchronously; write-back buffers writes and risks loss before flush.",
    "detailedAnswer": "Write-through updates backing store synchronously; write-back buffers writes and risks loss before flush.\n\nIllustrative example:\nwrite-through: write DB before success; write-back: durable queue then flush\n\nDesign review: In an enterprise order platform, evaluate write-through vs write-back against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Write-through లో backing store update కోసం వేచి ఉండాలి; write-back లో durability ముఖ్యం.\n\nఉదాహరణ:\nwrite-through: write DB before success; write-back: durable queue then flush\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "write-through: write DB before success; write-back: durable queue then flush",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate write-through vs write-back against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of write-through vs write-back using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate write-through vs write-back under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-023",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Cache eviction in system design. How would you apply it?",
    "shortAnswer": "Eviction removes entries under memory pressure; TTL expires entries by age.",
    "detailedAnswer": "Eviction removes entries under memory pressure; TTL expires entries by age.\n\nIllustrative example:\nLRU approximates recency; LFU approximates frequency\n\nDesign review: In an enterprise order platform, evaluate cache eviction against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Memory నిండితే eviction; TTL ముగిస్తే expiration.\n\nఉదాహరణ:\nLRU approximates recency; LFU approximates frequency\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "LRU approximates recency; LFU approximates frequency",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cache eviction against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cache eviction using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cache eviction under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-024",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Cache stampede in system design. How would you apply it?",
    "shortAnswer": "Many concurrent misses can overload origin; coalesce loads and jitter expiration.",
    "detailedAnswer": "Many concurrent misses can overload origin; coalesce loads and jitter expiration.\n\nIllustrative example:\nsingle-flight(key, loadFromDB)\n\nDesign review: In an enterprise order platform, evaluate cache stampede against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒకే key miss అయినప్పుడు ఒక request మాత్రమే DB load చేయేలా చూడాలి.\n\nఉదాహరణ:\nsingle-flight(key, loadFromDB)\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "single-flight(key, loadFromDB)",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cache stampede against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cache stampede using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cache stampede under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-025",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Cache penetration in system design. How would you apply it?",
    "shortAnswer": "Repeated nonexistent keys bypass positive cache; use bounded negative caching or Bloom filters.",
    "detailedAnswer": "Repeated nonexistent keys bypass positive cache; use bounded negative caching or Bloom filters.\n\nIllustrative example:\nmissing key → negative cache TTL 10s\n\nDesign review: In an enterprise order platform, evaluate cache penetration against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "లేని records కోసం మళ్లీ మళ్లీ DB calls రాకుండా చిన్న TTL తో negative cache వాడాలి.\n\nఉదాహరణ:\nmissing key → negative cache TTL 10s\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "missing key → negative cache TTL 10s",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cache penetration against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cache penetration using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cache penetration under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-026",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Hot keys in system design. How would you apply it?",
    "shortAnswer": "A popular key can overload one shard; use local replicas, request coalescing or safe key splitting.",
    "detailedAnswer": "A popular key can overload one shard; use local replicas, request coalescing or safe key splitting.\n\nIllustrative example:\nproduct:123 → local cache + shared cache\n\nDesign review: In an enterprise order platform, evaluate hot keys against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒక key పై ఎక్కువ traffic ఉంటే local cache లేదా replication పరిశీలించాలి.\n\nఉదాహరణ:\nproduct:123 → local cache + shared cache\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "product:123 → local cache + shared cache",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate hot keys against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of hot keys using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate hot keys under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-027",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Redis data structures in system design. How would you apply it?",
    "shortAnswer": "Choose strings, hashes, sets, sorted sets or streams according to access patterns.",
    "detailedAnswer": "Choose strings, hashes, sets, sorted sets or streams according to access patterns.\n\nIllustrative example:\nZADD leaderboard 120 user42\n\nDesign review: In an enterprise order platform, evaluate redis data structures against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Ranking కోసం sorted set; simple lookup కోసం string వాడవచ్చు.\n\nఉదాహరణ:\nZADD leaderboard 120 user42\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "ZADD leaderboard 120 user42",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate redis data structures against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of redis data structures using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate redis data structures under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-028",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Redis replication and failover in system design. How would you apply it?",
    "shortAnswer": "Replication is generally asynchronous; failover may lose acknowledged writes depending on configuration.",
    "detailedAnswer": "Replication is generally asynchronous; failover may lose acknowledged writes depending on configuration.\n\nIllustrative example:\nprimary → replicas; Sentinel or Cluster failover\n\nDesign review: In an enterprise order platform, evaluate redis replication and failover against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Replica lag వల్ల failover సమయంలో recent writes పోవచ్చు.\n\nఉదాహరణ:\nprimary → replicas; Sentinel or Cluster failover\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "primary → replicas; Sentinel or Cluster failover",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate redis replication and failover against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of redis replication and failover using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate redis replication and failover under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-029",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Cache consistency in system design. How would you apply it?",
    "shortAnswer": "Coordinate invalidation with database commits; tolerate or explicitly prevent stale reads.",
    "detailedAnswer": "Coordinate invalidation with database commits; tolerate or explicitly prevent stale reads.\n\nIllustrative example:\nDB commit → outbox invalidation event → cache delete\n\nDesign review: In an enterprise order platform, evaluate cache consistency against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "DB commit తర్వాత cache invalidate చేయాలి; race conditions కూడా పరిగణించాలి.\n\nఉదాహరణ:\nDB commit → outbox invalidation event → cache delete\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "DB commit → outbox invalidation event → cache delete",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cache consistency against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cache consistency using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cache consistency under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-030",
    "technology": "system-design",
    "topic": "Caching and Performance",
    "question": "Explain Performance profiling in system design. How would you apply it?",
    "shortAnswer": "Use traces, profiles and load tests to identify expensive operations before optimizing.",
    "detailedAnswer": "Use traces, profiles and load tests to identify expensive operations before optimizing.\n\nIllustrative example:\np99 900ms: DB span 750ms → inspect query plan\n\nDesign review: In an enterprise order platform, evaluate performance profiling against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Guess చేయకుండా traces ద్వారా slow operation గుర్తించాలి.\n\nఉదాహరణ:\np99 900ms: DB span 750ms → inspect query plan\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "intermediate",
    "codeExample": "p99 900ms: DB span 750ms → inspect query plan",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate performance profiling against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of performance profiling using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate performance profiling under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-031",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain SQL vs NoSQL in system design. How would you apply it?",
    "shortAnswer": "Choose by access patterns, transactions, constraints and operational needs rather than scale slogans.",
    "detailedAnswer": "Choose by access patterns, transactions, constraints and operational needs rather than scale slogans.\n\nIllustrative example:\nOrders: relational transactions; flexible catalog: document store if suitable\n\nDesign review: In an enterprise order platform, evaluate sql vs nosql against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Relationships, transactions అవసరమైతే SQL పరిశీలించాలి; access pattern బట్టి NoSQL ఎంచుకోవాలి.\n\nఉదాహరణ:\nOrders: relational transactions; flexible catalog: document store if suitable\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Orders: relational transactions; flexible catalog: document store if suitable",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate sql vs nosql against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of sql vs nosql using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate sql vs nosql under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-032",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Database indexes in system design. How would you apply it?",
    "shortAnswer": "Indexes accelerate matching reads but consume storage and increase write work.",
    "detailedAnswer": "Indexes accelerate matching reads but consume storage and increase write work.\n\nIllustrative example:\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\nDesign review: In an enterprise order platform, evaluate database indexes against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Index వల్ల search వేగంగా ఉంటుంది; writes కు అదనపు ఖర్చు ఉంటుంది.\n\nఉదాహరణ:\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "CREATE INDEX idx_orders_customer ON orders(customer_id);",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate database indexes against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of database indexes using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate database indexes under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-033",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Composite indexes in system design. How would you apply it?",
    "shortAnswer": "Column order matters for query predicates and ordering; verify with execution plans.",
    "detailedAnswer": "Column order matters for query predicates and ordering; verify with execution plans.\n\nIllustrative example:\nCREATE INDEX idx ON orders(customer_id, created_at);\n\nDesign review: In an enterprise order platform, evaluate composite indexes against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Customer ఆధారంగా filter చేసి date sort చేసే query కి composite index ఉపయోగపడవచ్చు.\n\nఉదాహరణ:\nCREATE INDEX idx ON orders(customer_id, created_at);\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "CREATE INDEX idx ON orders(customer_id, created_at);",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate composite indexes against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of composite indexes using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate composite indexes under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-034",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Normalization vs denormalization in system design. How would you apply it?",
    "shortAnswer": "Normalize to reduce update anomalies; denormalize selectively for read performance with consistency costs.",
    "detailedAnswer": "Normalize to reduce update anomalies; denormalize selectively for read performance with consistency costs.\n\nIllustrative example:\norders.customer_id → customers; read model stores customer_name\n\nDesign review: In an enterprise order platform, evaluate normalization vs denormalization against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Duplicate data తగ్గించటం normalization; reads కోసం copy ఉంచటం denormalization.\n\nఉదాహరణ:\norders.customer_id → customers; read model stores customer_name\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "orders.customer_id → customers; read model stores customer_name",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate normalization vs denormalization against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of normalization vs denormalization using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate normalization vs denormalization under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-035",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Database replication in system design. How would you apply it?",
    "shortAnswer": "Replicas improve read capacity or availability; asynchronous replication can lag.",
    "detailedAnswer": "Replicas improve read capacity or availability; asynchronous replication can lag.\n\nIllustrative example:\nprimary write → replica read; read-your-writes via primary\n\nDesign review: In an enterprise order platform, evaluate database replication against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Primary writes replica కు ఆలస్యంగా చేరవచ్చు; తాజా data కోసం primary read అవసరం కావచ్చు.\n\nఉదాహరణ:\nprimary write → replica read; read-your-writes via primary\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "primary write → replica read; read-your-writes via primary",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate database replication against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of database replication using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate database replication under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-036",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Partitioning vs sharding in system design. How would you apply it?",
    "shortAnswer": "Partitioning divides data logically; sharding distributes partitions across independent database nodes.",
    "detailedAnswer": "Partitioning divides data logically; sharding distributes partitions across independent database nodes.\n\nIllustrative example:\norders by month; customers by hash(customer_id)\n\nDesign review: In an enterprise order platform, evaluate partitioning vs sharding against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Table ను భాగాలుగా విభజించటం partitioning; వేర్వేరు nodes లో ఉంచటం sharding.\n\nఉదాహరణ:\norders by month; customers by hash(customer_id)\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "orders by month; customers by hash(customer_id)",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate partitioning vs sharding against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of partitioning vs sharding using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate partitioning vs sharding under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-037",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Shard key selection in system design. How would you apply it?",
    "shortAnswer": "Choose high-cardinality keys that distribute load and support common queries.",
    "detailedAnswer": "Choose high-cardinality keys that distribute load and support common queries.\n\nIllustrative example:\nhash(customer_id) % N; avoid timestamp-only hot shard\n\nDesign review: In an enterprise order platform, evaluate shard key selection against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Traffic సమానంగా పంచే key ఎంచుకోవాలి; queries ఎలా ఉంటాయో చూడాలి.\n\nఉదాహరణ:\nhash(customer_id) % N; avoid timestamp-only hot shard\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "hash(customer_id) % N; avoid timestamp-only hot shard",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate shard key selection against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of shard key selection using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate shard key selection under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-038",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Consistent hashing in system design. How would you apply it?",
    "shortAnswer": "Map keys and nodes onto a ring to reduce remapping on membership changes; virtual nodes improve balance.",
    "detailedAnswer": "Map keys and nodes onto a ring to reduce remapping on membership changes; virtual nodes improve balance.\n\nIllustrative example:\nhash(key) → next clockwise token\n\nDesign review: In an enterprise order platform, evaluate consistent hashing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Node add/remove చేసినప్పుడు అన్ని keys move కాకుండా ring ఉపయోగపడుతుంది.\n\nఉదాహరణ:\nhash(key) → next clockwise token\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "hash(key) → next clockwise token",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate consistent hashing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of consistent hashing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate consistent hashing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-039",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Database transactions in system design. How would you apply it?",
    "shortAnswer": "ACID groups operations atomically with isolation and durability according to engine settings.",
    "detailedAnswer": "ACID groups operations atomically with isolation and durability according to engine settings.\n\nIllustrative example:\nBEGIN; UPDATE accounts ...; INSERT ledger ...; COMMIT;\n\nDesign review: In an enterprise order platform, evaluate database transactions against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Debit, credit వంటి related operations ఒక transaction లో ఉండాలి.\n\nఉదాహరణ:\nBEGIN; UPDATE accounts ...; INSERT ledger ...; COMMIT;\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "BEGIN; UPDATE accounts ...; INSERT ledger ...; COMMIT;",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate database transactions against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of database transactions using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate database transactions under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-040",
    "technology": "system-design",
    "topic": "Database Architecture",
    "question": "Explain Isolation levels in system design. How would you apply it?",
    "shortAnswer": "Isolation controls concurrent anomalies; stronger levels may require retries or reduce concurrency.",
    "detailedAnswer": "Isolation controls concurrent anomalies; stronger levels may require retries or reduce concurrency.\n\nIllustrative example:\nSERIALIZABLE transaction → retry serialization failure\n\nDesign review: In an enterprise order platform, evaluate isolation levels against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Concurrent transactions వల్ల వచ్చే anomalies ను isolation level నియంత్రిస్తుంది.\n\nఉదాహరణ:\nSERIALIZABLE transaction → retry serialization failure\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "SERIALIZABLE transaction → retry serialization failure",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate isolation levels against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of isolation levels using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate isolation levels under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-041",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain CAP theorem in system design. How would you apply it?",
    "shortAnswer": "During a network partition a distributed system cannot guarantee both linearizable consistency and availability for every request.",
    "detailedAnswer": "During a network partition a distributed system cannot guarantee both linearizable consistency and availability for every request.\n\nIllustrative example:\nPartition: reject uncertain write or accept with reconciliation\n\nDesign review: In an enterprise order platform, evaluate cap theorem against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Network partition సమయంలో strong consistency లేదా availability మధ్య నిర్ణయం అవసరం.\n\nఉదాహరణ:\nPartition: reject uncertain write or accept with reconciliation\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Partition: reject uncertain write or accept with reconciliation",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cap theorem against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cap theorem using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cap theorem under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-042",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain PACELC in system design. How would you apply it?",
    "shortAnswer": "Under partition consider availability vs consistency; otherwise consider latency vs consistency.",
    "detailedAnswer": "Under partition consider availability vs consistency; otherwise consider latency vs consistency.\n\nIllustrative example:\nSynchronous cross-region quorum adds RTT\n\nDesign review: In an enterprise order platform, evaluate pacelc against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Partition లేకపోయినా latency మరియు consistency మధ్య trade-off ఉంటుంది.\n\nఉదాహరణ:\nSynchronous cross-region quorum adds RTT\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Synchronous cross-region quorum adds RTT",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate pacelc against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of pacelc using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate pacelc under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-043",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Strong vs eventual consistency in system design. How would you apply it?",
    "shortAnswer": "Linearizable reads reflect completed writes; eventual consistency converges if updates stop and delivery succeeds.",
    "detailedAnswer": "Linearizable reads reflect completed writes; eventual consistency converges if updates stop and delivery succeeds.\n\nIllustrative example:\nBalance read vs product view counter\n\nDesign review: In an enterprise order platform, evaluate strong vs eventual consistency against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Balance కు strong guarantees అవసరం కావచ్చు; view count కొంత ఆలస్యం సహించవచ్చు.\n\nఉదాహరణ:\nBalance read vs product view counter\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Balance read vs product view counter",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate strong vs eventual consistency against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of strong vs eventual consistency using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate strong vs eventual consistency under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-044",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Quorum reads and writes in system design. How would you apply it?",
    "shortAnswer": "Overlapping quorums help observe writes but do not alone guarantee linearizability without protocol details.",
    "detailedAnswer": "Overlapping quorums help observe writes but do not alone guarantee linearizability without protocol details.\n\nIllustrative example:\nN=3, W=2, R=2; R+W>N\n\nDesign review: In an enterprise order platform, evaluate quorum reads and writes against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Read/write replicas overlap అవుతాయి; versioning, protocol కూడా అవసరం.\n\nఉదాహరణ:\nN=3, W=2, R=2; R+W>N\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "N=3, W=2, R=2; R+W>N",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate quorum reads and writes against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of quorum reads and writes using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate quorum reads and writes under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-045",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Consensus in system design. How would you apply it?",
    "shortAnswer": "Consensus agrees on a value or log under a defined failure model; majority protocols need quorum.",
    "detailedAnswer": "Consensus agrees on a value or log under a defined failure model; majority protocols need quorum.\n\nIllustrative example:\n3 Raft nodes tolerate 1 crash if remaining communicate\n\nDesign review: In an enterprise order platform, evaluate consensus against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Majority nodes కలిసి log పై agreement సాధిస్తాయి.\n\nఉదాహరణ:\n3 Raft nodes tolerate 1 crash if remaining communicate\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "3 Raft nodes tolerate 1 crash if remaining communicate",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate consensus against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of consensus using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate consensus under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-046",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Leader election in system design. How would you apply it?",
    "shortAnswer": "Select a coordinator using consensus or leases with fencing to prevent stale leaders acting.",
    "detailedAnswer": "Select a coordinator using consensus or leases with fencing to prevent stale leaders acting.\n\nIllustrative example:\nleader epoch 42; reject writes from epoch 41\n\nDesign review: In an enterprise order platform, evaluate leader election against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Old leader తిరిగి writes చేయకుండా fencing token ఉపయోగించాలి.\n\nఉదాహరణ:\nleader epoch 42; reject writes from epoch 41\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "leader epoch 42; reject writes from epoch 41",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate leader election against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of leader election using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate leader election under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-047",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Distributed locks in system design. How would you apply it?",
    "shortAnswer": "Locks need expiry, ownership and fencing when protecting external resources.",
    "detailedAnswer": "Locks need expiry, ownership and fencing when protecting external resources.\n\nIllustrative example:\nacquire lease → fencing token → resource validates token\n\nDesign review: In an enterprise order platform, evaluate distributed locks against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Lease expire అయినా old process పని చేయవచ్చు; fencing ముఖ్యం.\n\nఉదాహరణ:\nacquire lease → fencing token → resource validates token\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "acquire lease → fencing token → resource validates token",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate distributed locks against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of distributed locks using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate distributed locks under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-048",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Logical clocks in system design. How would you apply it?",
    "shortAnswer": "Logical clocks represent causal ordering rather than wall-clock time.",
    "detailedAnswer": "Logical clocks represent causal ordering rather than wall-clock time.\n\nIllustrative example:\nLamport: receive t → max(local,t)+1\n\nDesign review: In an enterprise order platform, evaluate logical clocks against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Events ordering కోసం logical counter వాడాలి; actual time కాదు.\n\nఉదాహరణ:\nLamport: receive t → max(local,t)+1\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Lamport: receive t → max(local,t)+1",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate logical clocks against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of logical clocks using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate logical clocks under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-049",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Idempotency in system design. How would you apply it?",
    "shortAnswer": "Repeated requests with the same identity should not repeat business side effects.",
    "detailedAnswer": "Repeated requests with the same identity should not repeat business side effects.\n\nIllustrative example:\nUNIQUE(customer_id, idempotency_key)\n\nDesign review: In an enterprise order platform, evaluate idempotency against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Retry వల్ల duplicate payment జరగకుండా unique key వాడాలి.\n\nఉదాహరణ:\nUNIQUE(customer_id, idempotency_key)\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "UNIQUE(customer_id, idempotency_key)",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate idempotency against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of idempotency using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate idempotency under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-050",
    "technology": "system-design",
    "topic": "Distributed Systems",
    "question": "Explain Distributed transactions in system design. How would you apply it?",
    "shortAnswer": "Coordinate cross-resource changes with 2PC or business compensations; account for partial failures.",
    "detailedAnswer": "Coordinate cross-resource changes with 2PC or business compensations; account for partial failures.\n\nIllustrative example:\nreserve stock → authorize payment → confirm or compensate\n\nDesign review: In an enterprise order platform, evaluate distributed transactions against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Multiple services లో ఒక local transaction సరిపోదు; compensation లేదా coordination అవసరం.\n\nఉదాహరణ:\nreserve stock → authorize payment → confirm or compensate\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "reserve stock → authorize payment → confirm or compensate",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate distributed transactions against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of distributed transactions using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate distributed transactions under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-051",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Microservices vs modular monolith in system design. How would you apply it?",
    "shortAnswer": "Microservices allow independent deployment but add network and data coordination costs.",
    "detailedAnswer": "Microservices allow independent deployment but add network and data coordination costs.\n\nIllustrative example:\nOrders module → extract only when boundary and need justify it\n\nDesign review: In an enterprise order platform, evaluate microservices vs modular monolith against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Independent deployment అవసరం లేకపోతే modular monolith సులభం కావచ్చు.\n\nఉదాహరణ:\nOrders module → extract only when boundary and need justify it\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Orders module → extract only when boundary and need justify it",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate microservices vs modular monolith against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of microservices vs modular monolith using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate microservices vs modular monolith under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-052",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Bounded contexts in system design. How would you apply it?",
    "shortAnswer": "Model business capabilities with explicit ownership and language; avoid splitting by technical layer.",
    "detailedAnswer": "Model business capabilities with explicit ownership and language; avoid splitting by technical layer.\n\nIllustrative example:\nOrder context owns order lifecycle; inventory owns stock\n\nDesign review: In an enterprise order platform, evaluate bounded contexts against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Business responsibility ఆధారంగా service boundaries నిర్ణయించాలి.\n\nఉదాహరణ:\nOrder context owns order lifecycle; inventory owns stock\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Order context owns order lifecycle; inventory owns stock",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate bounded contexts against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of bounded contexts using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate bounded contexts under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-053",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain API gateway in system design. How would you apply it?",
    "shortAnswer": "Centralize edge routing and cross-cutting policies; avoid embedding domain orchestration indiscriminately.",
    "detailedAnswer": "Centralize edge routing and cross-cutting policies; avoid embedding domain orchestration indiscriminately.\n\nIllustrative example:\n/api/orders → order service\n\nDesign review: In an enterprise order platform, evaluate api gateway against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Gateway routing, authentication వంటి edge పనులు చేస్తుంది.\n\nఉదాహరణ:\n/api/orders → order service\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "/api/orders → order service",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate api gateway against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of api gateway using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate api gateway under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-054",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Service discovery in system design. How would you apply it?",
    "shortAnswer": "Resolve logical service names to changing endpoints via registry or platform DNS.",
    "detailedAnswer": "Resolve logical service names to changing endpoints via registry or platform DNS.\n\nIllustrative example:\norders.default.svc.cluster.local\n\nDesign review: In an enterprise order platform, evaluate service discovery against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Pod IP మారినా logical service name ద్వారా call చేయవచ్చు.\n\nఉదాహరణ:\norders.default.svc.cluster.local\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "orders.default.svc.cluster.local",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate service discovery against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of service discovery using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate service discovery under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-055",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Synchronous vs asynchronous messaging in system design. How would you apply it?",
    "shortAnswer": "Synchronous calls give immediate response but couple availability; asynchronous messages decouple timing and require eventual outcomes.",
    "detailedAnswer": "Synchronous calls give immediate response but couple availability; asynchronous messages decouple timing and require eventual outcomes.\n\nIllustrative example:\nPOST order → 202 + order ID → event processing\n\nDesign review: In an enterprise order platform, evaluate synchronous vs asynchronous messaging against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Immediate result కావాలంటే sync; background processing కోసం async ఉపయోగపడుతుంది.\n\nఉదాహరణ:\nPOST order → 202 + order ID → event processing\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "POST order → 202 + order ID → event processing",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate synchronous vs asynchronous messaging against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of synchronous vs asynchronous messaging using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate synchronous vs asynchronous messaging under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-056",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Kafka partitions and ordering in system design. How would you apply it?",
    "shortAnswer": "Kafka orders records within a partition; choose key to preserve required entity order.",
    "detailedAnswer": "Kafka orders records within a partition; choose key to preserve required entity order.\n\nIllustrative example:\nkey=orderId → same partition under stable partitioning\n\nDesign review: In an enterprise order platform, evaluate kafka partitions and ordering against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒక order events ఒక partition లో ఉంటే partition ordering పొందవచ్చు.\n\nఉదాహరణ:\nkey=orderId → same partition under stable partitioning\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "key=orderId → same partition under stable partitioning",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate kafka partitions and ordering against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of kafka partitions and ordering using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate kafka partitions and ordering under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-057",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Consumer groups in system design. How would you apply it?",
    "shortAnswer": "A partition is assigned to at most one active consumer per group in normal operation; extra consumers may idle.",
    "detailedAnswer": "A partition is assigned to at most one active consumer per group in normal operation; extra consumers may idle.\n\nIllustrative example:\n6 partitions, 8 consumers → at least 2 idle\n\nDesign review: In an enterprise order platform, evaluate consumer groups against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Partitions సంఖ్య consumer parallelism ను పరిమితం చేస్తుంది.\n\nఉదాహరణ:\n6 partitions, 8 consumers → at least 2 idle\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "6 partitions, 8 consumers → at least 2 idle",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate consumer groups against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of consumer groups using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate consumer groups under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-058",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Transactional outbox in system design. How would you apply it?",
    "shortAnswer": "Persist business update and event in one local transaction; relay publishes with possible duplicates.",
    "detailedAnswer": "Persist business update and event in one local transaction; relay publishes with possible duplicates.\n\nIllustrative example:\nBEGIN; INSERT orders; INSERT outbox; COMMIT;\n\nDesign review: In an enterprise order platform, evaluate transactional outbox against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Order మరియు event ఒక DB transaction లో save చేసి relay ద్వారా publish చేయాలి.\n\nఉదాహరణ:\nBEGIN; INSERT orders; INSERT outbox; COMMIT;\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "BEGIN; INSERT orders; INSERT outbox; COMMIT;",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate transactional outbox against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of transactional outbox using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate transactional outbox under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-059",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain Saga in system design. How would you apply it?",
    "shortAnswer": "Coordinate local transactions and compensating actions; compensation is business-specific and may fail.",
    "detailedAnswer": "Coordinate local transactions and compensating actions; compensation is business-specific and may fail.\n\nIllustrative example:\nreserve → charge → confirm; failure → release/refund\n\nDesign review: In an enterprise order platform, evaluate saga against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Step fail అయితే ముందరి business actions compensate చేయాలి.\n\nఉదాహరణ:\nreserve → charge → confirm; failure → release/refund\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "reserve → charge → confirm; failure → release/refund",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate saga against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of saga using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate saga under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-060",
    "technology": "system-design",
    "topic": "Microservices and Events",
    "question": "Explain CQRS and event sourcing in system design. How would you apply it?",
    "shortAnswer": "CQRS separates read/write models; event sourcing persists events as source of truth; either can exist independently.",
    "detailedAnswer": "CQRS separates read/write models; event sourcing persists events as source of truth; either can exist independently.\n\nIllustrative example:\ncommands → write model → projection → query model\n\nDesign review: In an enterprise order platform, evaluate cqrs and event sourcing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "CQRS read/write models వేరు చేస్తుంది; event sourcing events ను primary history గా ఉంచుతుంది.\n\nఉదాహరణ:\ncommands → write model → projection → query model\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "commands → write model → projection → query model",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cqrs and event sourcing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cqrs and event sourcing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cqrs and event sourcing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-061",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain REST API design in system design. How would you apply it?",
    "shortAnswer": "Use resource-oriented URLs, appropriate methods/status codes and stable contracts.",
    "detailedAnswer": "Use resource-oriented URLs, appropriate methods/status codes and stable contracts.\n\nIllustrative example:\nPOST /orders → 201 Created + Location\n\nDesign review: In an enterprise order platform, evaluate rest api design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Resources ఆధారంగా endpoints రూపొందించి సరైన status codes ఇవ్వాలి.\n\nఉదాహరణ:\nPOST /orders → 201 Created + Location\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "POST /orders → 201 Created + Location",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate rest api design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of rest api design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate rest api design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-062",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain API pagination in system design. How would you apply it?",
    "shortAnswer": "Offset pagination is simple; cursor pagination is often more stable and efficient for large changing datasets.",
    "detailedAnswer": "Offset pagination is simple; cursor pagination is often more stable and efficient for large changing datasets.\n\nIllustrative example:\nGET /orders?after=opaqueCursor&limit=50\n\nDesign review: In an enterprise order platform, evaluate api pagination against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Large data కోసం stable sort key తో cursor pagination ఉపయోగపడుతుంది.\n\nఉదాహరణ:\nGET /orders?after=opaqueCursor&limit=50\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "GET /orders?after=opaqueCursor&limit=50",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate api pagination against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of api pagination using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate api pagination under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-063",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain API versioning in system design. How would you apply it?",
    "shortAnswer": "Evolve compatibly when possible; version breaking changes and plan migration.",
    "detailedAnswer": "Evolve compatibly when possible; version breaking changes and plan migration.\n\nIllustrative example:\n/v1/orders → /v2/orders for incompatible contract\n\nDesign review: In an enterprise order platform, evaluate api versioning against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Existing clients break కాకుండా additive changes చేయాలి.\n\nఉదాహరణ:\n/v1/orders → /v2/orders for incompatible contract\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "/v1/orders → /v2/orders for incompatible contract",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate api versioning against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of api versioning using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate api versioning under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-064",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain Authentication vs authorization in system design. How would you apply it?",
    "shortAnswer": "Authentication verifies identity; authorization checks permitted actions and resources.",
    "detailedAnswer": "Authentication verifies identity; authorization checks permitted actions and resources.\n\nIllustrative example:\nJWT validated → check orders:read and owner\n\nDesign review: In an enterprise order platform, evaluate authentication vs authorization against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "User ఎవరో authentication; ఏ పని చేయగలడో authorization.\n\nఉదాహరణ:\nJWT validated → check orders:read and owner\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "JWT validated → check orders:read and owner",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate authentication vs authorization against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of authentication vs authorization using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate authentication vs authorization under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-065",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain OAuth 2.0 and OIDC in system design. How would you apply it?",
    "shortAnswer": "OAuth delegates authorization; OIDC adds identity on top; validate issuer, audience and token lifetime.",
    "detailedAnswer": "OAuth delegates authorization; OIDC adds identity on top; validate issuer, audience and token lifetime.\n\nIllustrative example:\nAuthorization code + PKCE → access token\n\nDesign review: In an enterprise order platform, evaluate oauth 2.0 and oidc against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "OAuth access permissions కోసం; OIDC login identity కోసం.\n\nఉదాహరణ:\nAuthorization code + PKCE → access token\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Authorization code + PKCE → access token",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate oauth 2.0 and oidc against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of oauth 2.0 and oidc using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate oauth 2.0 and oidc under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-066",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain Rate limiting in system design. How would you apply it?",
    "shortAnswer": "Bound request rates per identity or resource; return 429 and retry guidance when appropriate.",
    "detailedAnswer": "Bound request rates per identity or resource; return 429 and retry guidance when appropriate.\n\nIllustrative example:\ntoken bucket: 10 tokens/s, burst 20\n\nDesign review: In an enterprise order platform, evaluate rate limiting against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒక్క client ఎక్కువ requests పంపకుండా token bucket ద్వారా limit చేయాలి.\n\nఉదాహరణ:\ntoken bucket: 10 tokens/s, burst 20\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "token bucket: 10 tokens/s, burst 20",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate rate limiting against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of rate limiting using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate rate limiting under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-067",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain Circuit breaker in system design. How would you apply it?",
    "shortAnswer": "Stop calls to failing dependency temporarily; probe recovery and restore traffic gradually.",
    "detailedAnswer": "Stop calls to failing dependency temporarily; probe recovery and restore traffic gradually.\n\nIllustrative example:\nclosed → open → half-open\n\nDesign review: In an enterprise order platform, evaluate circuit breaker against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Downstream failures ఎక్కువైతే calls తాత్కాలికంగా ఆపాలి.\n\nఉదాహరణ:\nclosed → open → half-open\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "closed → open → half-open",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate circuit breaker against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of circuit breaker using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate circuit breaker under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-068",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain Retries and jitter in system design. How would you apply it?",
    "shortAnswer": "Retry transient failures only within deadline; exponential backoff and jitter reduce synchronized load.",
    "detailedAnswer": "Retry transient failures only within deadline; exponential backoff and jitter reduce synchronized load.\n\nIllustrative example:\ndelay=random(0,min(cap,base*2^attempt))\n\nDesign review: In an enterprise order platform, evaluate retries and jitter against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Transient failure కు మాత్రమే retry; random delay వల్ల retry storm తగ్గుతుంది.\n\nఉదాహరణ:\ndelay=random(0,min(cap,base*2^attempt))\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "delay=random(0,min(cap,base*2^attempt))",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate retries and jitter against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of retries and jitter using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate retries and jitter under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-069",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain Timeouts and deadlines in system design. How would you apply it?",
    "shortAnswer": "Bound each call by remaining end-to-end budget; cancellation may not undo side effects.",
    "detailedAnswer": "Bound each call by remaining end-to-end budget; cancellation may not undo side effects.\n\nIllustrative example:\nrequest deadline 500ms; DB budget 150ms\n\nDesign review: In an enterprise order platform, evaluate timeouts and deadlines against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "మొత్తం request deadline లో downstream calls పూర్తి కావాలి.\n\nఉదాహరణ:\nrequest deadline 500ms; DB budget 150ms\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "request deadline 500ms; DB budget 150ms",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate timeouts and deadlines against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of timeouts and deadlines using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate timeouts and deadlines under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-070",
    "technology": "system-design",
    "topic": "API Design and Security",
    "question": "Explain API security in system design. How would you apply it?",
    "shortAnswer": "Validate inputs, enforce object authorization, minimize privileges and protect secrets.",
    "detailedAnswer": "Validate inputs, enforce object authorization, minimize privileges and protect secrets.\n\nIllustrative example:\nGET /orders/42 → verify caller owns order 42\n\nDesign review: In an enterprise order platform, evaluate api security against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Token valid అయినా requested resource పై permission ఉందో చూడాలి.\n\nఉదాహరణ:\nGET /orders/42 → verify caller owns order 42\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "GET /orders/42 → verify caller owns order 42",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate api security against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of api security using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate api security under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-071",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain High availability in system design. How would you apply it?",
    "shortAnswer": "Remove single points of failure across independent failure domains; test failover.",
    "detailedAnswer": "Remove single points of failure across independent failure domains; test failover.\n\nIllustrative example:\n3 replicas across 3 zones + redundant DB\n\nDesign review: In an enterprise order platform, evaluate high availability against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Replicas వేర్వేరు zones లో ఉంచి failure impact తగ్గించాలి.\n\nఉదాహరణ:\n3 replicas across 3 zones + redundant DB\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "3 replicas across 3 zones + redundant DB",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate high availability against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of high availability using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate high availability under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-072",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain RPO vs RTO in system design. How would you apply it?",
    "shortAnswer": "RPO is acceptable data loss measured in time; RTO is target recovery duration.",
    "detailedAnswer": "RPO is acceptable data loss measured in time; RTO is target recovery duration.\n\nIllustrative example:\nRPO 5 min; RTO 30 min\n\nDesign review: In an enterprise order platform, evaluate rpo vs rto against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఎంత data loss సహించగలం RPO; ఎంతలో restore చేయాలి RTO.\n\nఉదాహరణ:\nRPO 5 min; RTO 30 min\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "RPO 5 min; RTO 30 min",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate rpo vs rto against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of rpo vs rto using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate rpo vs rto under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-073",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Backup and restore in system design. How would you apply it?",
    "shortAnswer": "Backups must be recoverable; test restores, retention and access controls.",
    "detailedAnswer": "Backups must be recoverable; test restores, retention and access controls.\n\nIllustrative example:\nnightly backup + point-in-time logs + restore drill\n\nDesign review: In an enterprise order platform, evaluate backup and restore against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Backup తీసుకోవడం మాత్రమే కాదు restore పరీక్షించాలి.\n\nఉదాహరణ:\nnightly backup + point-in-time logs + restore drill\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "nightly backup + point-in-time logs + restore drill",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate backup and restore against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of backup and restore using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate backup and restore under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-074",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Active-active vs active-passive in system design. How would you apply it?",
    "shortAnswer": "Active-active serves multiple sites but complicates data coordination; passive site waits for failover.",
    "detailedAnswer": "Active-active serves multiple sites but complicates data coordination; passive site waits for failover.\n\nIllustrative example:\nRegion A/B serve traffic vs A serves, B standby\n\nDesign review: In an enterprise order platform, evaluate active-active vs active-passive against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "రెండు regions active అయితే conflict handling అవసరం; standby అయితే failover సమయం చూడాలి.\n\nఉదాహరణ:\nRegion A/B serve traffic vs A serves, B standby\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "Region A/B serve traffic vs A serves, B standby",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate active-active vs active-passive against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of active-active vs active-passive using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate active-active vs active-passive under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-075",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Observability in system design. How would you apply it?",
    "shortAnswer": "Combine metrics, logs and traces to understand system behavior; correlate with context.",
    "detailedAnswer": "Combine metrics, logs and traces to understand system behavior; correlate with context.\n\nIllustrative example:\ntrace_id links API and DB spans\n\nDesign review: In an enterprise order platform, evaluate observability against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Metrics, logs, traces కలిపి failure root cause గుర్తించాలి.\n\nఉదాహరణ:\ntrace_id links API and DB spans\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "trace_id links API and DB spans",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate observability against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of observability using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate observability under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-076",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Golden signals in system design. How would you apply it?",
    "shortAnswer": "Monitor latency, traffic, errors and saturation; use percentiles and meaningful dimensions.",
    "detailedAnswer": "Monitor latency, traffic, errors and saturation; use percentiles and meaningful dimensions.\n\nIllustrative example:\np99 latency, RPS, error ratio, queue depth\n\nDesign review: In an enterprise order platform, evaluate golden signals against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Latency, traffic, errors, saturation metrics ప్రధానంగా చూడాలి.\n\nఉదాహరణ:\np99 latency, RPS, error ratio, queue depth\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "p99 latency, RPS, error ratio, queue depth",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate golden signals against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of golden signals using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate golden signals under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-077",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Distributed tracing in system design. How would you apply it?",
    "shortAnswer": "Propagate trace context across calls and messaging; sample with awareness of cost and errors.",
    "detailedAnswer": "Propagate trace context across calls and messaging; sample with awareness of cost and errors.\n\nIllustrative example:\ntraceparent header → child spans\n\nDesign review: In an enterprise order platform, evaluate distributed tracing against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ఒక request అనేక services లో ఎలా ప్రయాణించిందో trace చూపుతుంది.\n\nఉదాహరణ:\ntraceparent header → child spans\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "traceparent header → child spans",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate distributed tracing against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of distributed tracing using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate distributed tracing under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-078",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Structured logging in system design. How would you apply it?",
    "shortAnswer": "Emit machine-readable fields and avoid secrets or unnecessary personal data.",
    "detailedAnswer": "Emit machine-readable fields and avoid secrets or unnecessary personal data.\n\nIllustrative example:\n{\"level\":\"ERROR\",\"traceId\":\"abc\",\"service\":\"orders\"}\n\nDesign review: In an enterprise order platform, evaluate structured logging against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "JSON logs ద్వారా search, correlation సులభం; passwords log చేయకూడదు.\n\nఉదాహరణ:\n{\"level\":\"ERROR\",\"traceId\":\"abc\",\"service\":\"orders\"}\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "{\"level\":\"ERROR\",\"traceId\":\"abc\",\"service\":\"orders\"}",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate structured logging against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of structured logging using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate structured logging under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-079",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Blue-green vs canary deployment in system design. How would you apply it?",
    "shortAnswer": "Blue-green switches between environments; canary gradually exposes new version with guardrails.",
    "detailedAnswer": "Blue-green switches between environments; canary gradually exposes new version with guardrails.\n\nIllustrative example:\ncanary 5% → 25% → 100% if SLO healthy\n\nDesign review: In an enterprise order platform, evaluate blue-green vs canary deployment against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "కొద్దిమంది users తో కొత్త version test చేసి metrics బాగుంటే traffic పెంచాలి.\n\nఉదాహరణ:\ncanary 5% → 25% → 100% if SLO healthy\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "canary 5% → 25% → 100% if SLO healthy",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate blue-green vs canary deployment against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of blue-green vs canary deployment using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate blue-green vs canary deployment under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-080",
    "technology": "system-design",
    "topic": "Reliability and Observability",
    "question": "Explain Incident response in system design. How would you apply it?",
    "shortAnswer": "Stabilize service first, communicate impact, preserve evidence and perform blameless review.",
    "detailedAnswer": "Stabilize service first, communicate impact, preserve evidence and perform blameless review.\n\nIllustrative example:\ndetect → mitigate → verify → postmortem\n\nDesign review: In an enterprise order platform, evaluate incident response against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "ముందుగా service restore చేయాలి; తర్వాత root cause, prevention చూడాలి.\n\nఉదాహరణ:\ndetect → mitigate → verify → postmortem\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "advanced",
    "codeExample": "detect → mitigate → verify → postmortem",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate incident response against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of incident response using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate incident response under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-081",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain URL shortener design in system design. How would you apply it?",
    "shortAnswer": "Generate unique short codes, store mapping and cache redirects; handle abuse and expiration.",
    "detailedAnswer": "Generate unique short codes, store mapping and cache redirects; handle abuse and expiration.\n\nIllustrative example:\nPOST /links → code; GET /{code} → 302\n\nDesign review: In an enterprise order platform, evaluate url shortener design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Short code కు original URL mapping save చేసి redirect ఇవ్వాలి.\n\nఉదాహరణ:\nPOST /links → code; GET /{code} → 302\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "POST /links → code; GET /{code} → 302",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate url shortener design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of url shortener design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate url shortener design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-082",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Chat system design in system design. How would you apply it?",
    "shortAnswer": "Use persistent connections, durable message storage, per-conversation ordering and delivery receipts.",
    "detailedAnswer": "Use persistent connections, durable message storage, per-conversation ordering and delivery receipts.\n\nIllustrative example:\nWebSocket gateway → message store → recipient fanout\n\nDesign review: In an enterprise order platform, evaluate chat system design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "WebSocket ద్వారా live messages పంపి offline users కోసం durable storage ఉంచాలి.\n\nఉదాహరణ:\nWebSocket gateway → message store → recipient fanout\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "WebSocket gateway → message store → recipient fanout",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate chat system design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of chat system design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate chat system design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-083",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Video streaming design in system design. How would you apply it?",
    "shortAnswer": "Upload, transcode to multiple bitrates, store segments and distribute via CDN.",
    "detailedAnswer": "Upload, transcode to multiple bitrates, store segments and distribute via CDN.\n\nIllustrative example:\nupload → queue → transcode → object storage → CDN\n\nDesign review: In an enterprise order platform, evaluate video streaming design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Video ను multiple quality segments గా మార్చి CDN ద్వారా అందించాలి.\n\nఉదాహరణ:\nupload → queue → transcode → object storage → CDN\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "upload → queue → transcode → object storage → CDN",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate video streaming design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of video streaming design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate video streaming design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-084",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain E-commerce design in system design. How would you apply it?",
    "shortAnswer": "Separate catalog, cart, order, inventory and payment responsibilities; coordinate checkout with saga.",
    "detailedAnswer": "Separate catalog, cart, order, inventory and payment responsibilities; coordinate checkout with saga.\n\nIllustrative example:\ncart → order → reserve stock → payment → confirm\n\nDesign review: In an enterprise order platform, evaluate e-commerce design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Checkout లో stock reserve, payment, order confirmation steps coordinate చేయాలి.\n\nఉదాహరణ:\ncart → order → reserve stock → payment → confirm\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "cart → order → reserve stock → payment → confirm",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate e-commerce design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of e-commerce design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate e-commerce design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-085",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Payment system design in system design. How would you apply it?",
    "shortAnswer": "Use idempotent requests, immutable ledger, reconciliation and explicit payment states.",
    "detailedAnswer": "Use idempotent requests, immutable ledger, reconciliation and explicit payment states.\n\nIllustrative example:\npayment key → authorization → capture → ledger reconciliation\n\nDesign review: In an enterprise order platform, evaluate payment system design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Duplicate charge నివారించి ledger ద్వారా financial records reconcile చేయాలి.\n\nఉదాహరణ:\npayment key → authorization → capture → ledger reconciliation\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "payment key → authorization → capture → ledger reconciliation",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate payment system design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of payment system design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate payment system design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-086",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Ride booking design in system design. How would you apply it?",
    "shortAnswer": "Index driver locations geographically; match with freshness and atomic assignment.",
    "detailedAnswer": "Index driver locations geographically; match with freshness and atomic assignment.\n\nIllustrative example:\nlocation stream → geo index → matching → assignment\n\nDesign review: In an enterprise order platform, evaluate ride booking design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Nearby drivers గుర్తించి ఒక ride కు ఒక driver మాత్రమే assign చేయాలి.\n\nఉదాహరణ:\nlocation stream → geo index → matching → assignment\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "location stream → geo index → matching → assignment",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate ride booking design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of ride booking design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate ride booking design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-087",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Notification system design in system design. How would you apply it?",
    "shortAnswer": "Queue notifications by channel; respect preferences, retries and provider limits.",
    "detailedAnswer": "Queue notifications by channel; respect preferences, retries and provider limits.\n\nIllustrative example:\nevent → preferences → email/SMS/push queues\n\nDesign review: In an enterprise order platform, evaluate notification system design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "User preferences బట్టి channel ఎంచుకొని queue ద్వారా పంపాలి.\n\nఉదాహరణ:\nevent → preferences → email/SMS/push queues\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "event → preferences → email/SMS/push queues",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate notification system design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of notification system design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate notification system design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-088",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain News feed design in system design. How would you apply it?",
    "shortAnswer": "Choose fanout-on-write or read based on follower distribution; paginate stable ranked results.",
    "detailedAnswer": "Choose fanout-on-write or read based on follower distribution; paginate stable ranked results.\n\nIllustrative example:\npost → fanout queue → timeline cache\n\nDesign review: In an enterprise order platform, evaluate news feed design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Followers తక్కువైతే write fanout; celebrities కోసం read fanout పరిశీలించాలి.\n\nఉదాహరణ:\npost → fanout queue → timeline cache\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "post → fanout queue → timeline cache",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate news feed design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of news feed design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate news feed design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-089",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain Search system design in system design. How would you apply it?",
    "shortAnswer": "Build asynchronous inverted indexes; handle relevance, freshness and reindexing.",
    "detailedAnswer": "Build asynchronous inverted indexes; handle relevance, freshness and reindexing.\n\nIllustrative example:\nDB outbox → indexer → search index → query API\n\nDesign review: In an enterprise order platform, evaluate search system design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "DB updates ను search index కు async గా పంపాలి; కొంత lag ఉండవచ్చు.\n\nఉదాహరణ:\nDB outbox → indexer → search index → query API\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "DB outbox → indexer → search index → query API",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate search system design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of search system design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate search system design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-090",
    "technology": "system-design",
    "topic": "Real-world System Design",
    "question": "Explain File storage design in system design. How would you apply it?",
    "shortAnswer": "Store blobs in object storage and metadata separately; use scoped signed URLs and checksums.",
    "detailedAnswer": "Store blobs in object storage and metadata separately; use scoped signed URLs and checksums.\n\nIllustrative example:\nclient → signed upload URL → object storage → metadata\n\nDesign review: In an enterprise order platform, evaluate file storage design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Large files ను API memory లో పెట్టకుండా object storage కు upload చేయాలి.\n\nఉదాహరణ:\nclient → signed upload URL → object storage → metadata\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "client → signed upload URL → object storage → metadata",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate file storage design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of file storage design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate file storage design under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-091",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Multi-tenant architecture in system design. How would you apply it?",
    "shortAnswer": "Choose isolation model based on security, cost and noisy-neighbor risks.",
    "detailedAnswer": "Choose isolation model based on security, cost and noisy-neighbor risks.\n\nIllustrative example:\ntenant_id enforced in queries; per-tenant quotas\n\nDesign review: In an enterprise order platform, evaluate multi-tenant architecture against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Tenant data ఇతర tenant కు కనిపించకుండా authorization, isolation అమలు చేయాలి.\n\nఉదాహరణ:\ntenant_id enforced in queries; per-tenant quotas\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "tenant_id enforced in queries; per-tenant quotas",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate multi-tenant architecture against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of multi-tenant architecture using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate multi-tenant architecture under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-092",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Event schema evolution in system design. How would you apply it?",
    "shortAnswer": "Prefer additive compatible changes and validate producer/consumer compatibility.",
    "detailedAnswer": "Prefer additive compatible changes and validate producer/consumer compatibility.\n\nIllustrative example:\nadd optional field with default; do not reuse field meaning\n\nDesign review: In an enterprise order platform, evaluate event schema evolution against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Old consumers break కాకుండా optional fields add చేయాలి.\n\nఉదాహరణ:\nadd optional field with default; do not reuse field meaning\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "add optional field with default; do not reuse field meaning",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate event schema evolution against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of event schema evolution using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate event schema evolution under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-093",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Backpressure and queues in system design. How would you apply it?",
    "shortAnswer": "Bound queues and regulate producer rate when consumers cannot keep up.",
    "detailedAnswer": "Bound queues and regulate producer rate when consumers cannot keep up.\n\nIllustrative example:\nqueue depth rising → throttle producers or scale consumers\n\nDesign review: In an enterprise order platform, evaluate backpressure and queues against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Consumer slow అయితే queue unlimited గా పెరగకుండా producer rate నియంత్రించాలి.\n\nఉదాహరణ:\nqueue depth rising → throttle producers or scale consumers\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "queue depth rising → throttle producers or scale consumers",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate backpressure and queues against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of backpressure and queues using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate backpressure and queues under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-094",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Bulkhead pattern in system design. How would you apply it?",
    "shortAnswer": "Isolate resource pools so one dependency cannot exhaust all capacity.",
    "detailedAnswer": "Isolate resource pools so one dependency cannot exhaust all capacity.\n\nIllustrative example:\npayment pool 20; inventory pool 20\n\nDesign review: In an enterprise order platform, evaluate bulkhead pattern against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Payment slow అయినా inventory resources ప్రభావితం కాకుండా pools వేరు చేయాలి.\n\nఉదాహరణ:\npayment pool 20; inventory pool 20\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "payment pool 20; inventory pool 20",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate bulkhead pattern against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of bulkhead pattern using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate bulkhead pattern under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-095",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Graceful degradation in system design. How would you apply it?",
    "shortAnswer": "Preserve critical functionality while disabling optional features under stress.",
    "detailedAnswer": "Preserve critical functionality while disabling optional features under stress.\n\nIllustrative example:\ncheckout remains; recommendations temporarily disabled\n\nDesign review: In an enterprise order platform, evaluate graceful degradation against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Load ఎక్కువైతే optional features ఆపి core functionality కొనసాగించాలి.\n\nఉదాహరణ:\ncheckout remains; recommendations temporarily disabled\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "checkout remains; recommendations temporarily disabled",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate graceful degradation against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of graceful degradation using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate graceful degradation under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-096",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Data migration and zero downtime in system design. How would you apply it?",
    "shortAnswer": "Use expand-migrate-contract with compatible releases and verified backfills.",
    "detailedAnswer": "Use expand-migrate-contract with compatible releases and verified backfills.\n\nIllustrative example:\nadd nullable column → dual-compatible code → backfill → remove old\n\nDesign review: In an enterprise order platform, evaluate data migration and zero downtime against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Schema change సమయంలో old/new application versions రెండూ పని చేయాలి.\n\nఉదాహరణ:\nadd nullable column → dual-compatible code → backfill → remove old\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "add nullable column → dual-compatible code → backfill → remove old",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate data migration and zero downtime against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of data migration and zero downtime using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate data migration and zero downtime under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-097",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Distributed job scheduling in system design. How would you apply it?",
    "shortAnswer": "Use durable job state, leases and idempotent handlers; account for duplicate execution.",
    "detailedAnswer": "Use durable job state, leases and idempotent handlers; account for duplicate execution.\n\nIllustrative example:\nclaim job with lease → execute → mark complete\n\nDesign review: In an enterprise order platform, evaluate distributed job scheduling against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Worker crash అయితే job మళ్లీ run కావచ్చు; handler idempotent కావాలి.\n\nఉదాహరణ:\nclaim job with lease → execute → mark complete\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "claim job with lease → execute → mark complete",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate distributed job scheduling against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of distributed job scheduling using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate distributed job scheduling under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-098",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Cost optimization in system design. How would you apply it?",
    "shortAnswer": "Measure unit cost and utilization; choose scaling, retention and storage tiers without violating SLOs.",
    "detailedAnswer": "Measure unit cost and utilization; choose scaling, retention and storage tiers without violating SLOs.\n\nIllustrative example:\ncost per 1000 orders = monthly cost / orders × 1000\n\nDesign review: In an enterprise order platform, evaluate cost optimization against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Cost తగ్గించే ముందు SLO, usage metrics పరిశీలించాలి.\n\nఉదాహరణ:\ncost per 1000 orders = monthly cost / orders × 1000\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "cost per 1000 orders = monthly cost / orders × 1000",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate cost optimization against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of cost optimization using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate cost optimization under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-099",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain Architecture decision records in system design. How would you apply it?",
    "shortAnswer": "Record context, alternatives, decision and consequences so future teams can revisit assumptions.",
    "detailedAnswer": "Record context, alternatives, decision and consequences so future teams can revisit assumptions.\n\nIllustrative example:\nADR: choose PostgreSQL for order invariants; revisit at measured limit\n\nDesign review: In an enterprise order platform, evaluate architecture decision records against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Architecture ఎందుకు ఎంచుకున్నామో alternatives, trade-offs తో document చేయాలి.\n\nఉదాహరణ:\nADR: choose PostgreSQL for order invariants; revisit at measured limit\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "ADR: choose PostgreSQL for order invariants; revisit at measured limit",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate architecture decision records against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of architecture decision records using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate architecture decision records under peak load and partial failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SYSTEM-DESIGN-100",
    "technology": "system-design",
    "topic": "Enterprise Architecture",
    "question": "Explain End-to-end order platform design in system design. How would you apply it?",
    "shortAnswer": "Combine edge routing, transactional order storage, outbox, saga, idempotent consumers and observability; size from requirements.",
    "detailedAnswer": "Combine edge routing, transactional order storage, outbox, saga, idempotent consumers and observability; size from requirements.\n\nIllustrative example:\nClient → gateway → orders DB/outbox → Kafka → inventory/payment → status projection\n\nDesign review: In an enterprise order platform, evaluate end-to-end order platform design against the measured workload and the required correctness guarantees. State assumptions, measure the relevant behavior under peak load and verify failure recovery before production.",
    "detailedAnswerTelugu": "Requirements నుంచి architecture రూపొందించి failures, consistency, scaling, security అన్నీ వివరించాలి.\n\nఉదాహరణ:\nClient → gateway → orders DB/outbox → Kafka → inventory/payment → status projection\n\nEnterprise design లో requirements, failure scenarios, performance metrics ఆధారంగా ఈ నిర్ణయాన్ని పరీక్షించాలి.",
    "difficulty": "expert",
    "codeExample": "Client → gateway → orders DB/outbox → Kafka → inventory/payment → status projection",
    "codeLanguage": "text",
    "realTimeScenario": "In an enterprise order platform, evaluate end-to-end order platform design against the measured workload and the required correctness guarantees.",
    "commonMistakes": [
      "Treating the illustrative example as a universal production configuration."
    ],
    "interviewTips": [
      "Explain the trade-offs of end-to-end order platform design using a concrete workload."
    ],
    "followUpQuestions": [
      "How would you validate end-to-end order platform design under peak load and partial failure?"
    ],
    "isPublished": true
  }
];
