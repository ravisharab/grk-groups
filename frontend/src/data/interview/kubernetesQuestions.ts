import type { InterviewQuestion } from '../../types/interview';

export const kubernetesQuestions: InterviewQuestion[] = [
  {
    "id": "KUBERNETES-001",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What is Kubernetes and why do we need it?",
    "shortAnswer": "Kubernetes reconciles declared workload state across a cluster.",
    "detailedAnswer": "A container runtime starts containers, but Kubernetes coordinates placement, replacement, rollout and service discovery across machines. A Deployment declares replica count and a Pod template; controllers replace missing Pods. Kubernetes does not automatically make an application highly available: replicas, failure domains, readiness and durable data must be designed explicitly.\n\nExample (bash; illustrative):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get deployments,pods\n\nEnterprise scenario: Order API replicas can be replaced after node failure, provided capacity exists.\n\nCommon mistake: Assuming Kubernetes automatically protects application data.\n\nInterview tip: Explain desired state and self-healing rather than just container hosting.\n\nFollow-up: How does a Deployment replace a failed Pod?",
    "detailedAnswerTelugu": "Kubernetes అనేది containers ను cluster లో నిర్వహించే orchestration platform. Deployment లో మూడు replicas కావాలని ప్రకటిస్తే controllers ఆ desired state ను సాధించడానికి ప్రయత్నిస్తాయి. Pod తొలగిపోయినప్పుడు కొత్త Pod వస్తుంది. అయితే database backup, application availability మనమే design చేయాలి.\n\nExample (bash):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get deployments,pods",
    "difficulty": "beginner",
    "codeExample": "kubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get deployments,pods",
    "codeLanguage": "bash",
    "realTimeScenario": "Order API replicas can be replaced after node failure, provided capacity exists.",
    "commonMistakes": [
      "Assuming Kubernetes automatically protects application data."
    ],
    "interviewTips": [
      "Explain desired state and self-healing rather than just container hosting."
    ],
    "followUpQuestions": [
      "How does a Deployment replace a failed Pod?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-002",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What is the difference between Docker and Kubernetes?",
    "shortAnswer": "Docker builds and runs containers; Kubernetes orchestrates container workloads.",
    "detailedAnswer": "Docker images package application dependencies. Kubernetes consumes compatible OCI images through a CRI runtime such as containerd. Docker Engine is not required on Kubernetes nodes. A local docker run command starts a container; a Deployment manages replicas and updates across nodes. Kubernetes removed the built-in dockershim in version 1.24.\n\nExample (bash; illustrative):\ndocker build -t registry.example.com/orders:1.0 .\ndocker push registry.example.com/orders:1.0\nkubectl create deployment orders --image=registry.example.com/orders:1.0\n\nEnterprise scenario: A CI pipeline builds an Order Service image and Kubernetes deploys the published immutable version.\n\nCommon mistake: Installing Docker Engine on every node solely because images were built with Docker.\n\nInterview tip: Distinguish image format from runtime and orchestration.\n\nFollow-up: What is CRI?",
    "detailedAnswerTelugu": "Docker తో application image build చేసి container run చేయవచ్చు. Kubernetes అదే image ను అనేక nodes మీద deploy చేసి replicas, rollout నిర్వహిస్తుంది. Kubernetes కి Docker Engine తప్పనిసరి కాదు; containerd వంటి CRI runtime సరిపోతుంది.\n\nExample (bash):\ndocker build -t registry.example.com/orders:1.0 .\ndocker push registry.example.com/orders:1.0\nkubectl create deployment orders --image=registry.example.com/orders:1.0",
    "difficulty": "beginner",
    "codeExample": "docker build -t registry.example.com/orders:1.0 .\ndocker push registry.example.com/orders:1.0\nkubectl create deployment orders --image=registry.example.com/orders:1.0",
    "codeLanguage": "bash",
    "realTimeScenario": "A CI pipeline builds an Order Service image and Kubernetes deploys the published immutable version.",
    "commonMistakes": [
      "Installing Docker Engine on every node solely because images were built with Docker."
    ],
    "interviewTips": [
      "Distinguish image format from runtime and orchestration."
    ],
    "followUpQuestions": [
      "What is CRI?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-003",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "Explain Kubernetes cluster architecture.",
    "shortAnswer": "A cluster contains a control plane and worker nodes.",
    "detailedAnswer": "The API server exposes the API; etcd stores cluster state; scheduler assigns unscheduled Pods; controllers reconcile resources. Worker kubelets ensure assigned Pods run through the runtime. A networking implementation provides Pod connectivity and Service routing, often using kube-proxy or an alternative. Production control planes typically use redundancy.\n\nExample (bash; illustrative):\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl cluster-info\n\nEnterprise scenario: Order workloads run on workers while control-plane components coordinate scheduling and recovery.\n\nCommon mistake: Assuming scheduler directly starts containers.\n\nInterview tip: Describe the path from API request to running Pod.\n\nFollow-up: What happens when the control plane is unavailable?",
    "detailedAnswerTelugu": "Cluster లో control plane decisions తీసుకుంటుంది, worker nodes applications run చేస్తాయి. API server requests స్వీకరిస్తుంది, etcd state నిల్వ చేస్తుంది, scheduler node ఎంచుకుంటుంది, controllers desired state reconcile చేస్తాయి. Kubelet node లో Pod containers నిర్వహిస్తుంది.\n\nExample (bash):\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl cluster-info",
    "difficulty": "intermediate",
    "codeExample": "kubectl get nodes -o wide\nkubectl get pods -A\nkubectl cluster-info",
    "codeLanguage": "bash",
    "realTimeScenario": "Order workloads run on workers while control-plane components coordinate scheduling and recovery.",
    "commonMistakes": [
      "Assuming scheduler directly starts containers."
    ],
    "interviewTips": [
      "Describe the path from API request to running Pod."
    ],
    "followUpQuestions": [
      "What happens when the control plane is unavailable?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-004",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What is the Kubernetes control plane?",
    "shortAnswer": "The control plane exposes APIs and reconciles cluster state.",
    "detailedAnswer": "API server authenticates, authorizes and admits requests before persisting accepted state. Controllers observe resources and update dependent objects. Scheduler binds Pods to suitable nodes. etcd is the backing state store. Existing workloads can often continue during temporary control-plane outages, but new scheduling and reconciliation are impaired.\n\nExample (bash; illustrative):\nkubectl get --raw=\"/readyz?verbose\"\nkubectl get events -A\n\nEnterprise scenario: During a control-plane incident, existing Order Pods may serve traffic while scaling requests cannot be processed.\n\nCommon mistake: Treating control-plane availability as identical to application availability.\n\nInterview tip: Discuss redundant API servers and etcd quorum.\n\nFollow-up: Why is etcd quorum important?",
    "detailedAnswerTelugu": "Control plane cluster యొక్క management layer. API server request validate చేస్తుంది. Controllers resources ను observe చేసి reconcile చేస్తాయి. Scheduler Pod కి node assign చేస్తుంది. Control plane outage వచ్చినప్పుడు existing Pods కొనసాగవచ్చు కానీ కొత్త deployments ప్రభావితం అవుతాయి.\n\nExample (bash):\nkubectl get --raw=\"/readyz?verbose\"\nkubectl get events -A",
    "difficulty": "intermediate",
    "codeExample": "kubectl get --raw=\"/readyz?verbose\"\nkubectl get events -A",
    "codeLanguage": "bash",
    "realTimeScenario": "During a control-plane incident, existing Order Pods may serve traffic while scaling requests cannot be processed.",
    "commonMistakes": [
      "Treating control-plane availability as identical to application availability."
    ],
    "interviewTips": [
      "Discuss redundant API servers and etcd quorum."
    ],
    "followUpQuestions": [
      "Why is etcd quorum important?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-005",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What are worker nodes and Kubelet?",
    "shortAnswer": "Workers host Pods; kubelet manages their lifecycle on each node.",
    "detailedAnswer": "Kubelet watches assigned Pod specifications, requests container operations through CRI, coordinates volumes and probes, and reports status. Node readiness depends on several conditions and heartbeats. A NotReady node does not imply immediate replacement of every Pod; tolerations and eviction behavior matter.\n\nExample (bash; illustrative):\nkubectl get nodes\nkubectl describe node <node-name>\nkubectl get pods -A -o wide\n\nEnterprise scenario: Investigate a NotReady worker by checking node conditions, kubelet and runtime logs.\n\nCommon mistake: Confusing kubelet with scheduler or deleting nodes before diagnosing failures.\n\nInterview tip: Explain CRI and node conditions.\n\nFollow-up: How do node heartbeats work?",
    "detailedAnswerTelugu": "Worker node లో application Pods run అవుతాయి. Kubelet API server నుంచి assigned Pod specs చూసి runtime ద్వారా containers start చేస్తుంది. Probes, volumes, status నిర్వహిస్తుంది. Node NotReady అయితే eviction rules ఆధారంగా recovery జరుగుతుంది.\n\nExample (bash):\nkubectl get nodes\nkubectl describe node <node-name>\nkubectl get pods -A -o wide",
    "difficulty": "intermediate",
    "codeExample": "kubectl get nodes\nkubectl describe node <node-name>\nkubectl get pods -A -o wide",
    "codeLanguage": "bash",
    "realTimeScenario": "Investigate a NotReady worker by checking node conditions, kubelet and runtime logs.",
    "commonMistakes": [
      "Confusing kubelet with scheduler or deleting nodes before diagnosing failures."
    ],
    "interviewTips": [
      "Explain CRI and node conditions."
    ],
    "followUpQuestions": [
      "How do node heartbeats work?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-006",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "How does kube-apiserver work?",
    "shortAnswer": "It is the authenticated and authorized entry point for Kubernetes resources.",
    "detailedAnswer": "kubectl sends HTTPS requests. Authentication establishes identity, authorization checks permissions, admission can mutate or validate eligible requests, and accepted writes are persisted. Clients watch resources for changes. Controllers use the API rather than editing etcd directly. Resource versions support concurrency and watches.\n\nExample (bash; illustrative):\nkubectl auth can-i create deployments -n default\nkubectl get deployment orders -o yaml\nkubectl get pods --watch\n\nEnterprise scenario: A deployment request from Jenkins is rejected if its service account lacks RBAC permissions.\n\nCommon mistake: Giving CI cluster-admin to bypass authorization failures.\n\nInterview tip: Explain authentication, authorization and admission separately.\n\nFollow-up: What is an admission webhook?",
    "detailedAnswerTelugu": "kubectl HTTPS ద్వారా API server కి request పంపుతుంది. Authentication user identity తెలుసుకుంటుంది; authorization permissions check చేస్తుంది; admission policies request validate లేదా mutate చేస్తాయి. Accepted resource state etcd లో persist అవుతుంది.\n\nExample (bash):\nkubectl auth can-i create deployments -n default\nkubectl get deployment orders -o yaml\nkubectl get pods --watch",
    "difficulty": "advanced",
    "codeExample": "kubectl auth can-i create deployments -n default\nkubectl get deployment orders -o yaml\nkubectl get pods --watch",
    "codeLanguage": "bash",
    "realTimeScenario": "A deployment request from Jenkins is rejected if its service account lacks RBAC permissions.",
    "commonMistakes": [
      "Giving CI cluster-admin to bypass authorization failures."
    ],
    "interviewTips": [
      "Explain authentication, authorization and admission separately."
    ],
    "followUpQuestions": [
      "What is an admission webhook?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-007",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What is etcd and how does it maintain consistency?",
    "shortAnswer": "etcd is a distributed key-value store using Raft consensus.",
    "detailedAnswer": "Kubernetes stores API resource state in etcd. Raft commits writes with majority agreement; a three-member cluster tolerates one member failure, not two. Losing quorum prevents normal progress on writes. Backups and tested restores are essential. Secrets require appropriate encryption at rest and access controls. etcd is not the application database.\n\nExample (bash; illustrative):\nkubectl get --raw=\"/readyz?verbose\"\n# On a self-managed control plane, with authorized TLS credentials:\n# etcdctl endpoint health\n\nEnterprise scenario: A control-plane storage outage blocks deployment updates even while some Order Pods remain healthy.\n\nCommon mistake: Editing etcd directly or assuming base64 protects Secrets.\n\nInterview tip: Explain quorum, backup and restore; managed EKS hides etcd administration.\n\nFollow-up: Why are odd-sized etcd clusters common?",
    "detailedAnswerTelugu": "etcd distributed key-value store. Raft consensus ద్వారా majority members agreement తో writes commit అవుతాయి. మూడు members ఉంటే ఒక failure tolerate చేయవచ్చు. Quorum పోతే writes ప్రభావితం అవుతాయి. Backup restore పరీక్షించాలి; application business data etcd లో పెట్టకూడదు.\n\nExample (bash):\nkubectl get --raw=\"/readyz?verbose\"\n# On a self-managed control plane, with authorized TLS credentials:\n# etcdctl endpoint health",
    "difficulty": "advanced",
    "codeExample": "kubectl get --raw=\"/readyz?verbose\"\n# On a self-managed control plane, with authorized TLS credentials:\n# etcdctl endpoint health",
    "codeLanguage": "bash",
    "realTimeScenario": "A control-plane storage outage blocks deployment updates even while some Order Pods remain healthy.",
    "commonMistakes": [
      "Editing etcd directly or assuming base64 protects Secrets."
    ],
    "interviewTips": [
      "Explain quorum, backup and restore; managed EKS hides etcd administration."
    ],
    "followUpQuestions": [
      "Why are odd-sized etcd clusters common?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-008",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "How does kube-scheduler work?",
    "shortAnswer": "It selects feasible nodes for unscheduled Pods and binds them.",
    "detailedAnswer": "Scheduling filters nodes using resource requests, affinity, taints and other constraints, then scores feasible nodes. The scheduler records the binding; kubelet starts containers. Requests, not instantaneous CPU usage, drive normal resource-fit checks. Unschedulable Pods remain pending until constraints or capacity change.\n\nExample (bash; illustrative):\nkubectl get pods --field-selector=status.phase=Pending\nkubectl describe pod <pending-pod>\n\nEnterprise scenario: An Order Pod requesting 4 CPUs stays Pending when no eligible node has sufficient allocatable unreserved CPU.\n\nCommon mistake: Assuming low observed CPU usage guarantees scheduling capacity.\n\nInterview tip: Explain filtering, scoring and binding.\n\nFollow-up: How do taints and tolerations affect scheduling?",
    "detailedAnswerTelugu": "Scheduler pending Pods కోసం suitable nodes filter చేస్తుంది. CPU memory requests, affinity, taints వంటి constraints పరిశీలించి feasible nodes score చేస్తుంది. Node bind చేసిన తర్వాత kubelet containers start చేస్తుంది. Capacity లేకపోతే Pod Pending లో ఉంటుంది.\n\nExample (bash):\nkubectl get pods --field-selector=status.phase=Pending\nkubectl describe pod <pending-pod>",
    "difficulty": "advanced",
    "codeExample": "kubectl get pods --field-selector=status.phase=Pending\nkubectl describe pod <pending-pod>",
    "codeLanguage": "bash",
    "realTimeScenario": "An Order Pod requesting 4 CPUs stays Pending when no eligible node has sufficient allocatable unreserved CPU.",
    "commonMistakes": [
      "Assuming low observed CPU usage guarantees scheduling capacity."
    ],
    "interviewTips": [
      "Explain filtering, scoring and binding."
    ],
    "followUpQuestions": [
      "How do taints and tolerations affect scheduling?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-009",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "How do controllers and reconciliation loops work?",
    "shortAnswer": "Controllers repeatedly compare observed state with desired state and act to reduce differences.",
    "detailedAnswer": "A Deployment controller manages ReplicaSets; a ReplicaSet controller manages Pods. Controllers watch API objects and reconcile idempotently because events can repeat or be missed. Status reflects observed progress, not an immediate guarantee. A replacement Pod has a new identity and may run on another node.\n\nExample (bash; illustrative):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get pods -l app=orders\n# In a disposable test namespace only:\nkubectl delete pod <one-order-pod>\nkubectl get pods -l app=orders --watch\n\nEnterprise scenario: A failed stateless Order Pod is replaced without an operator manually creating another Pod.\n\nCommon mistake: Expecting replacement Pods to preserve local ephemeral data.\n\nInterview tip: Explain eventual convergence and controller ownership.\n\nFollow-up: What is the difference between a ReplicaSet and Deployment?",
    "detailedAnswerTelugu": "Controller desired state మరియు actual state మధ్య తేడాను గుర్తించి reconcile చేస్తుంది. Deployment controller ReplicaSet నిర్వహిస్తుంది; ReplicaSet controller Pods నిర్వహిస్తుంది. మూడు replicas లో ఒక Pod delete అయితే replacement సృష్టించడానికి ప్రయత్నిస్తుంది. Events repeat కావచ్చు కాబట్టి reconciliation idempotent ఉండాలి.\n\nExample (bash):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get pods -l app=orders\n# In a disposable test namespace only:\nkubectl delete pod <one-order-pod>\nkubectl get pods -l app=orders --watch",
    "difficulty": "advanced",
    "codeExample": "kubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get pods -l app=orders\n# In a disposable test namespace only:\nkubectl delete pod <one-order-pod>\nkubectl get pods -l app=orders --watch",
    "codeLanguage": "bash",
    "realTimeScenario": "A failed stateless Order Pod is replaced without an operator manually creating another Pod.",
    "commonMistakes": [
      "Expecting replacement Pods to preserve local ephemeral data."
    ],
    "interviewTips": [
      "Explain eventual convergence and controller ownership."
    ],
    "followUpQuestions": [
      "What is the difference between a ReplicaSet and Deployment?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-010",
    "technology": "kubernetes",
    "topic": "Kubernetes Fundamentals and Architecture",
    "question": "What is declarative versus imperative Kubernetes management?",
    "shortAnswer": "Declarative management describes desired state; imperative commands request specific actions.",
    "detailedAnswer": "kubectl create or scale can perform imperative changes. kubectl apply reconciles a manifest with live state using field ownership semantics. Version-controlled manifests improve review and repeatability. GitOps controllers can continuously reconcile Git state, whereas kubectl apply alone is a one-time operation. Avoid conflicting field managers and manual drift.\n\nExample (yaml; illustrative):\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: orders\n  template:\n    metadata:\n      labels:\n        app: orders\n    spec:\n      containers:\n        - name: orders\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n\nEnterprise scenario: Review a replica-count change in Git before applying orders.yaml with kubectl apply -f orders.yaml.\n\nCommon mistake: Mixing manual scaling with GitOps without defining ownership.\n\nInterview tip: Explain declarative state, field ownership and drift.\n\nFollow-up: How does server-side apply differ from client-side apply?",
    "detailedAnswerTelugu": "Imperative అంటే command ద్వారా action చేయడం. Declarative అంటే YAML లో desired state ప్రకటించి apply చేయడం. Git లో manifests ఉంచితే review, rollback planning సులభం. GitOps controller నిరంతరం reconcile చేయగలదు; kubectl apply ఒక్కసారి మాత్రమే request పంపుతుంది.\n\nExample (yaml):\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: orders\n  template:\n    metadata:\n      labels:\n        app: orders\n    spec:\n      containers:\n        - name: orders\n          image: nginx:1.27\n          ports:\n            - containerPort: 80",
    "difficulty": "intermediate",
    "codeExample": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: orders\n  template:\n    metadata:\n      labels:\n        app: orders\n    spec:\n      containers:\n        - name: orders\n          image: nginx:1.27\n          ports:\n            - containerPort: 80",
    "codeLanguage": "yaml",
    "realTimeScenario": "Review a replica-count change in Git before applying orders.yaml with kubectl apply -f orders.yaml.",
    "commonMistakes": [
      "Mixing manual scaling with GitOps without defining ownership."
    ],
    "interviewTips": [
      "Explain declarative state, field ownership and drift."
    ],
    "followUpQuestions": [
      "How does server-side apply differ from client-side apply?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-011",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "What is a Pod and its lifecycle?",
    "shortAnswer": "A Pod is the smallest schedulable workload unit.",
    "detailedAnswer": "Containers in a Pod share a network namespace, IP address and optionally volumes. Pod phases include Pending, Running, Succeeded, Failed and Unknown; CrashLoopBackOff is a container waiting reason, not a Pod phase. Kubelet restarts containers according to restartPolicy, whereas a controller creates replacement Pods with new identities. A Running Pod is not necessarily Ready.\n\nExample (bash; illustrative):\nkubectl get pods -o wide\nkubectl describe pod orders-abc\nkubectl logs orders-abc --previous\n\nEnterprise scenario: An Order API container crashes after a configuration error; inspect previous logs and events before restarting.\n\nCommon mistake: Treating CrashLoopBackOff as a Pod phase.\n\nInterview tip: Distinguish container restart from Pod replacement.\n\nFollow-up: What happens to a Pod IP after replacement?",
    "detailedAnswerTelugu": "Pod అనేది Kubernetes లో schedule చేసే చిన్న workload unit. ఒకే Pod లో containers IP, network namespace share చేస్తాయి. Running అంటే traffic తీసుకోవడానికి సిద్ధంగా ఉందని కాదు. Container crash అయితే kubelet restart చేయవచ్చు; Pod పోతే Deployment controller కొత్త Pod సృష్టిస్తుంది.\n\nExample (bash):\nkubectl get pods -o wide\nkubectl describe pod orders-abc\nkubectl logs orders-abc --previous",
    "difficulty": "intermediate",
    "codeExample": "kubectl get pods -o wide\nkubectl describe pod orders-abc\nkubectl logs orders-abc --previous",
    "codeLanguage": "bash",
    "realTimeScenario": "An Order API container crashes after a configuration error; inspect previous logs and events before restarting.",
    "commonMistakes": [
      "Treating CrashLoopBackOff as a Pod phase."
    ],
    "interviewTips": [
      "Distinguish container restart from Pod replacement."
    ],
    "followUpQuestions": [
      "What happens to a Pod IP after replacement?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-012",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "How do multi-container Pods and sidecars work?",
    "shortAnswer": "Co-located containers share a Pod lifecycle and network.",
    "detailedAnswer": "A sidecar provides supporting functionality such as proxying or log shipping. Containers communicate over localhost and can share mounted volumes. Native sidecars are restartable init containers with restartPolicy Always on supported Kubernetes versions; ordinary app containers do not guarantee startup order. Use separate Deployments when independent scaling or isolation is needed.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-demo\nspec:\n  containers:\n  - name: app\n    image: nginx:1.27\n  - name: helper\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"while true; do wget -qO- http://localhost; sleep 30; done\"]\n\nEnterprise scenario: A local proxy accompanies each Order API replica and forwards traffic to localhost.\n\nCommon mistake: Putting unrelated services in one Pod merely to simplify networking.\n\nInterview tip: Explain shared fate and independent scaling trade-offs.\n\nFollow-up: How do native sidecars differ from regular containers?",
    "detailedAnswerTelugu": "Sidecar అనేది main application కి logging లేదా proxy వంటి సహాయం చేసే container. రెండూ localhost ద్వారా communicate చేయగలవు. Native sidecar కోసం initContainers లో restartPolicy Always ఉపయోగిస్తారు. Independent scaling కావాలంటే separate Deployment మంచిది.\n\nExample (yaml):\napiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-demo\nspec:\n  containers:\n  - name: app\n    image: nginx:1.27\n  - name: helper\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"while true; do wget -qO- http://localhost; sleep 30; done\"]",
    "difficulty": "advanced",
    "codeExample": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-demo\nspec:\n  containers:\n  - name: app\n    image: nginx:1.27\n  - name: helper\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"while true; do wget -qO- http://localhost; sleep 30; done\"]",
    "codeLanguage": "yaml",
    "realTimeScenario": "A local proxy accompanies each Order API replica and forwards traffic to localhost.",
    "commonMistakes": [
      "Putting unrelated services in one Pod merely to simplify networking."
    ],
    "interviewTips": [
      "Explain shared fate and independent scaling trade-offs."
    ],
    "followUpQuestions": [
      "How do native sidecars differ from regular containers?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-013",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "What are init containers?",
    "shortAnswer": "Init containers perform prerequisites before application containers start.",
    "detailedAnswer": "Ordinary init containers execute sequentially to successful completion. A failed init container is retried according to Pod restart behavior. They can prepare files on shared volumes or validate prerequisites. Avoid indefinite dependency waits; use bounded attempts and observable failures. Database schema migrations are often better handled by a dedicated coordinated Job rather than every replica.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-init\nspec:\n  initContainers:\n  - name: prepare\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"echo ready > /work/status\"]\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  containers:\n  - name: app\n    image: nginx:1.27\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  volumes:\n  - name: work\n    emptyDir: {}\n\nEnterprise scenario: Prepare a generated configuration file before the application starts.\n\nCommon mistake: Running uncoordinated schema migrations in every replica.\n\nInterview tip: Explain sequential completion and shared volumes.\n\nFollow-up: How would you diagnose Init:CrashLoopBackOff?",
    "detailedAnswerTelugu": "Init containers main application start అయ్యే ముందు sequential గా execute అవుతాయి. Shared volume లో configuration prepare చేయవచ్చు. Dependency కోసం ఎప్పటికీ wait చేయకుండా timeout పెట్టాలి. ప్రతి replica తో database migration చేయడం race conditions కి కారణం కావచ్చు.\n\nExample (yaml):\napiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-init\nspec:\n  initContainers:\n  - name: prepare\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"echo ready > /work/status\"]\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  containers:\n  - name: app\n    image: nginx:1.27\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  volumes:\n  - name: work\n    emptyDir: {}",
    "difficulty": "advanced",
    "codeExample": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: orders-init\nspec:\n  initContainers:\n  - name: prepare\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"echo ready > /work/status\"]\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  containers:\n  - name: app\n    image: nginx:1.27\n    volumeMounts:\n    - {name: work, mountPath: /work}\n  volumes:\n  - name: work\n    emptyDir: {}",
    "codeLanguage": "yaml",
    "realTimeScenario": "Prepare a generated configuration file before the application starts.",
    "commonMistakes": [
      "Running uncoordinated schema migrations in every replica."
    ],
    "interviewTips": [
      "Explain sequential completion and shared volumes."
    ],
    "followUpQuestions": [
      "How would you diagnose Init:CrashLoopBackOff?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-014",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "How does a ReplicaSet provide self-healing?",
    "shortAnswer": "A ReplicaSet maintains a desired number of matching Pods.",
    "detailedAnswer": "The ReplicaSet controller compares matching active Pods with spec.replicas and creates or removes Pods. Selectors and template labels must agree. Deployments normally own ReplicaSets; avoid editing their replica counts directly because the Deployment reconciles them. Replacement depends on scheduling capacity and does not preserve local ephemeral data.\n\nExample (bash; illustrative):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get rs,pods\nkubectl scale deployment orders --replicas=4\n\nEnterprise scenario: Maintain four stateless Order API replicas during normal operation.\n\nCommon mistake: Assuming replica count guarantees four healthy or ready endpoints.\n\nInterview tip: Distinguish ReplicaSet reconciliation from kubelet restarts.\n\nFollow-up: Why should a Deployment own ReplicaSets?",
    "detailedAnswerTelugu": "ReplicaSet desired replicas మరియు actual Pods ని compare చేస్తుంది. మూడు replicas లో ఒకటి delete అయితే controller కొత్త Pod create చేస్తుంది. Deployment manage చేసే ReplicaSet ని direct గా scale చేయకూడదు. Capacity లేకపోతే కొత్త Pod Pending లో ఉండవచ్చు.\n\nExample (bash):\nkubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get rs,pods\nkubectl scale deployment orders --replicas=4",
    "difficulty": "intermediate",
    "codeExample": "kubectl create deployment orders --image=nginx:1.27 --replicas=3\nkubectl get rs,pods\nkubectl scale deployment orders --replicas=4",
    "codeLanguage": "bash",
    "realTimeScenario": "Maintain four stateless Order API replicas during normal operation.",
    "commonMistakes": [
      "Assuming replica count guarantees four healthy or ready endpoints."
    ],
    "interviewTips": [
      "Distinguish ReplicaSet reconciliation from kubelet restarts."
    ],
    "followUpQuestions": [
      "Why should a Deployment own ReplicaSets?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-015",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "How does a Deployment manage desired state?",
    "shortAnswer": "A Deployment manages ReplicaSets and declarative application rollouts.",
    "detailedAnswer": "A Deployment specifies a Pod template, selector, replica count and rollout strategy. Changing the Pod template creates a new ReplicaSet; scaling alone does not create a new rollout revision. Controllers gradually reconcile old and new replicas. Selectors are immutable in apps/v1 Deployments. Readiness, resource requests and rollout status matter for availability.\n\nExample (yaml; illustrative):\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels: {app: orders}\n  template:\n    metadata:\n      labels: {app: orders}\n    spec:\n      containers:\n      - name: orders\n        image: nginx:1.27\n        resources:\n          requests: {cpu: 100m, memory: 64Mi}\n        readinessProbe:\n          httpGet: {path: /, port: 80}\n\nEnterprise scenario: Release a stateless API with three replicas and readiness checks.\n\nCommon mistake: Changing selector labels after creation.\n\nInterview tip: Describe Deployment → ReplicaSet → Pod ownership.\n\nFollow-up: What triggers a new rollout revision?",
    "detailedAnswerTelugu": "Deployment లో replicas, selector, Pod template, strategy define చేస్తాం. Image version మారితే కొత్త ReplicaSet create అవుతుంది. Replicas మాత్రమే scale చేస్తే కొత్త rollout revision అవసరం లేదు. Readiness probe ద్వారా traffic కి సిద్ధమైన Pods ని గుర్తించవచ్చు.\n\nExample (yaml):\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels: {app: orders}\n  template:\n    metadata:\n      labels: {app: orders}\n    spec:\n      containers:\n      - name: orders\n        image: nginx:1.27\n        resources:\n          requests: {cpu: 100m, memory: 64Mi}\n        readinessProbe:\n          httpGet: {path: /, port: 80}",
    "difficulty": "advanced",
    "codeExample": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels: {app: orders}\n  template:\n    metadata:\n      labels: {app: orders}\n    spec:\n      containers:\n      - name: orders\n        image: nginx:1.27\n        resources:\n          requests: {cpu: 100m, memory: 64Mi}\n        readinessProbe:\n          httpGet: {path: /, port: 80}",
    "codeLanguage": "yaml",
    "realTimeScenario": "Release a stateless API with three replicas and readiness checks.",
    "commonMistakes": [
      "Changing selector labels after creation."
    ],
    "interviewTips": [
      "Describe Deployment → ReplicaSet → Pod ownership."
    ],
    "followUpQuestions": [
      "What triggers a new rollout revision?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-016",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "How do rolling updates and rollbacks work?",
    "shortAnswer": "Rolling updates gradually replace Pods; rollback restores a retained Pod template revision.",
    "detailedAnswer": "maxSurge limits extra replicas and maxUnavailable limits unavailable replicas during a rollout. For three replicas, maxSurge 1 and maxUnavailable 0 allow an extra Pod before removing an old one, assuming capacity and readiness. A stalled rollout reports progress failure but does not automatically roll back. Rollback does not undo database migrations or external effects.\n\nExample (bash; illustrative):\nkubectl patch deployment orders --type=merge -p '{\"spec\":{\"strategy\":{\"type\":\"RollingUpdate\",\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":0}}}}'\nkubectl set image deployment/orders orders=nginx:1.28\nkubectl rollout status deployment/orders --timeout=120s\nkubectl rollout history deployment/orders\n# If necessary:\nkubectl rollout undo deployment/orders\n\nEnterprise scenario: Deploy an API version while preserving compatible database schema and available replicas.\n\nCommon mistake: Assuming rollback automatically reverses schema changes.\n\nInterview tip: Discuss readiness, capacity and backward compatibility.\n\nFollow-up: What happens if the new Pods never become Ready?",
    "detailedAnswerTelugu": "Rolling update లో old Pods ని ఒక్కసారిగా తొలగించకుండా కొత్త Pods ready అయిన తర్వాత replace చేస్తారు. maxSurge అదనపు Pods ని, maxUnavailable unavailable replicas ని control చేస్తాయి. Rollback image/template ని restore చేస్తుంది కానీ database changes ని undo చేయదు.\n\nExample (bash):\nkubectl patch deployment orders --type=merge -p '{\"spec\":{\"strategy\":{\"type\":\"RollingUpdate\",\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":0}}}}'\nkubectl set image deployment/orders orders=nginx:1.28\nkubectl rollout status deployment/orders --timeout=120s\nkubectl rollout history deployment/orders\n# If necessary:\nkubectl rollout undo deployment/orders",
    "difficulty": "advanced",
    "codeExample": "kubectl patch deployment orders --type=merge -p '{\"spec\":{\"strategy\":{\"type\":\"RollingUpdate\",\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":0}}}}'\nkubectl set image deployment/orders orders=nginx:1.28\nkubectl rollout status deployment/orders --timeout=120s\nkubectl rollout history deployment/orders\n# If necessary:\nkubectl rollout undo deployment/orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Deploy an API version while preserving compatible database schema and available replicas.",
    "commonMistakes": [
      "Assuming rollback automatically reverses schema changes."
    ],
    "interviewTips": [
      "Discuss readiness, capacity and backward compatibility."
    ],
    "followUpQuestions": [
      "What happens if the new Pods never become Ready?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-017",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "When should you use StatefulSets instead of Deployments?",
    "shortAnswer": "StatefulSets provide stable Pod identities and storage associations.",
    "detailedAnswer": "StatefulSet Pods receive ordinal names such as db-0 and db-1. A governing headless Service supports stable network identity, and volumeClaimTemplates can create per-Pod PVCs. Default ordered creation and termination differ from Deployment behavior. Stable identity does not implement database replication, backups or leader election; those need application logic or an operator. PVC retention depends on policy and storage configuration.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector: {app: db}\n  ports:\n  - {port: 5432}\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: db\nspec:\n  serviceName: db\n  replicas: 1\n  selector:\n    matchLabels: {app: db}\n  template:\n    metadata:\n      labels: {app: db}\n    spec:\n      containers:\n      - name: demo\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]\n        volumeMounts:\n        - {name: data, mountPath: /data}\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      resources:\n        requests: {storage: 1Gi}\n\nEnterprise scenario: Use stable identities for a database operator; this manifest demonstrates identity and storage only, not a working database.\n\nCommon mistake: Scaling a standalone database image and expecting replication.\n\nInterview tip: Explain stable identity separately from data consistency.\n\nFollow-up: What happens to PVCs when a StatefulSet is scaled down?",
    "detailedAnswerTelugu": "StatefulSet లో db-0, db-1 వంటి stable names ఉంటాయి. Headless Service ద్వారా stable DNS identity, volumeClaimTemplates ద్వారా ప్రతి Pod కి storage ఇవ్వవచ్చు. కానీ database replication లేదా backup Kubernetes automatic గా చేయదు. వాటికి database operator లేదా application logic అవసరం.\n\nExample (yaml):\napiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector: {app: db}\n  ports:\n  - {port: 5432}\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: db\nspec:\n  serviceName: db\n  replicas: 1\n  selector:\n    matchLabels: {app: db}\n  template:\n    metadata:\n      labels: {app: db}\n    spec:\n      containers:\n      - name: demo\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]\n        volumeMounts:\n        - {name: data, mountPath: /data}\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      resources:\n        requests: {storage: 1Gi}",
    "difficulty": "expert",
    "codeExample": "apiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector: {app: db}\n  ports:\n  - {port: 5432}\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: db\nspec:\n  serviceName: db\n  replicas: 1\n  selector:\n    matchLabels: {app: db}\n  template:\n    metadata:\n      labels: {app: db}\n    spec:\n      containers:\n      - name: demo\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]\n        volumeMounts:\n        - {name: data, mountPath: /data}\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      resources:\n        requests: {storage: 1Gi}",
    "codeLanguage": "yaml",
    "realTimeScenario": "Use stable identities for a database operator; this manifest demonstrates identity and storage only, not a working database.",
    "commonMistakes": [
      "Scaling a standalone database image and expecting replication."
    ],
    "interviewTips": [
      "Explain stable identity separately from data consistency."
    ],
    "followUpQuestions": [
      "What happens to PVCs when a StatefulSet is scaled down?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-018",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "What is a DaemonSet?",
    "shortAnswer": "A DaemonSet runs a Pod on each eligible node.",
    "detailedAnswer": "DaemonSets are useful for node-level log collectors, monitoring agents and networking components. Node selectors, affinity and taints influence eligible nodes. When a new eligible node joins, a Pod is created there. Unlike Deployments, the desired count follows eligible nodes rather than a fixed replicas field. Host access should be minimized and reviewed.\n\nExample (yaml; illustrative):\napiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: node-demo\nspec:\n  selector:\n    matchLabels: {app: node-demo}\n  template:\n    metadata:\n      labels: {app: node-demo}\n    spec:\n      containers:\n      - name: agent\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]\n\nEnterprise scenario: Deploy a log collection agent on each eligible worker node; the example is a placeholder agent.\n\nCommon mistake: Using privileged host mounts without a clear requirement.\n\nInterview tip: Compare node-driven replica count with Deployment scaling.\n\nFollow-up: How do taints affect DaemonSet placement?",
    "detailedAnswerTelugu": "DaemonSet ప్రతి eligible node మీద ఒక Pod run చేయడానికి ఉపయోగపడుతుంది. Logging agent లేదా monitoring agent కి ఇది సరైన pattern. కొత్త node join అయితే అక్కడ కూడా Pod create అవుతుంది. Node selectors, taints వల్ల అన్ని nodes eligible కాకపోవచ్చు.\n\nExample (yaml):\napiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: node-demo\nspec:\n  selector:\n    matchLabels: {app: node-demo}\n  template:\n    metadata:\n      labels: {app: node-demo}\n    spec:\n      containers:\n      - name: agent\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]",
    "difficulty": "advanced",
    "codeExample": "apiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: node-demo\nspec:\n  selector:\n    matchLabels: {app: node-demo}\n  template:\n    metadata:\n      labels: {app: node-demo}\n    spec:\n      containers:\n      - name: agent\n        image: busybox:1.36\n        command: [\"sleep\", \"3600\"]",
    "codeLanguage": "yaml",
    "realTimeScenario": "Deploy a log collection agent on each eligible worker node; the example is a placeholder agent.",
    "commonMistakes": [
      "Using privileged host mounts without a clear requirement."
    ],
    "interviewTips": [
      "Compare node-driven replica count with Deployment scaling."
    ],
    "followUpQuestions": [
      "How do taints affect DaemonSet placement?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-019",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "What are Jobs and CronJobs?",
    "shortAnswer": "Jobs run finite tasks; CronJobs schedule Jobs periodically.",
    "detailedAnswer": "A Job tracks successful completions and retries failed work subject to backoffLimit and deadlines. CronJob creates Jobs on a schedule; execution can be missed or duplicated, so business operations must be idempotent. concurrencyPolicy Forbid prevents overlapping Jobs from the same CronJob, not other workloads. Specify timeZone explicitly where supported.\n\nExample (yaml; illustrative):\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: reconciliation-demo\nspec:\n  schedule: \"0 2 * * *\"\n  timeZone: America/New_York\n  concurrencyPolicy: Forbid\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      activeDeadlineSeconds: 600\n      template:\n        spec:\n          restartPolicy: Never\n          containers:\n          - name: reconcile\n            image: busybox:1.36\n            command: [\"echo\", \"reconciliation placeholder\"]\n\nEnterprise scenario: Run a nightly finance reconciliation using a unique business date to deduplicate processing.\n\nCommon mistake: Assuming a CronJob guarantees exactly-once execution.\n\nInterview tip: Discuss deadlines, retries and idempotency.\n\nFollow-up: How do you manually trigger a Job from a CronJob?",
    "detailedAnswerTelugu": "Job ఒక finite task పూర్తి చేయడానికి ఉపయోగిస్తాం. CronJob schedule ప్రకారం Jobs create చేస్తుంది. ఒకే task duplicate గా execute అయ్యే అవకాశం ఉంది కాబట్టి idempotency అవసరం. concurrencyPolicy Forbid అదే CronJob లో overlapping runs ని తగ్గిస్తుంది.\n\nExample (yaml):\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: reconciliation-demo\nspec:\n  schedule: \"0 2 * * *\"\n  timeZone: America/New_York\n  concurrencyPolicy: Forbid\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      activeDeadlineSeconds: 600\n      template:\n        spec:\n          restartPolicy: Never\n          containers:\n          - name: reconcile\n            image: busybox:1.36\n            command: [\"echo\", \"reconciliation placeholder\"]",
    "difficulty": "advanced",
    "codeExample": "apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: reconciliation-demo\nspec:\n  schedule: \"0 2 * * *\"\n  timeZone: America/New_York\n  concurrencyPolicy: Forbid\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      activeDeadlineSeconds: 600\n      template:\n        spec:\n          restartPolicy: Never\n          containers:\n          - name: reconcile\n            image: busybox:1.36\n            command: [\"echo\", \"reconciliation placeholder\"]",
    "codeLanguage": "yaml",
    "realTimeScenario": "Run a nightly finance reconciliation using a unique business date to deduplicate processing.",
    "commonMistakes": [
      "Assuming a CronJob guarantees exactly-once execution."
    ],
    "interviewTips": [
      "Discuss deadlines, retries and idempotency."
    ],
    "followUpQuestions": [
      "How do you manually trigger a Job from a CronJob?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-020",
    "technology": "kubernetes",
    "topic": "Pods, ReplicaSets and Deployments",
    "question": "How do liveness, readiness and startup probes differ?",
    "shortAnswer": "Liveness restarts unhealthy containers, readiness controls traffic, and startup protects slow initialization.",
    "detailedAnswer": "A failed readiness probe marks a Pod unready and normally removes it from Service traffic without restarting it. Repeated liveness or startup failures trigger container restart. Startup probes suppress liveness and readiness checks until successful. For Spring Boot Actuator enable health probes and ensure the endpoints are reachable on the intended port. Avoid external dependency checks in liveness because shared outages can cause restart storms.\n\nExample (yaml; illustrative):\nstartupProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 60\nlivenessProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 10\n  failureThreshold: 3\nreadinessProbe:\n  httpGet: {path: /actuator/health/readiness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 3\n\nEnterprise scenario: Allow a Spring Boot service up to roughly five minutes to initialize before normal probes begin.\n\nCommon mistake: Using the same external database health check for every probe.\n\nInterview tip: Explain traffic removal versus restart and startup gating.\n\nFollow-up: Why can a liveness check against a shared database cause cascading failures?",
    "detailedAnswerTelugu": "Readiness fail అయితే Pod కి సాధారణ Service traffic ఆగుతుంది కానీ container restart కాదు. Liveness fail అయితే threshold తర్వాత restart జరుగుతుంది. Startup probe slow initialization కి సమయం ఇస్తుంది. Spring Boot Actuator health endpoints ఉపయోగించవచ్చు. Database outage ని liveness తో link చేస్తే అన్ని replicas restart అయ్యే ప్రమాదం ఉంది.\n\nExample (yaml):\nstartupProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 60\nlivenessProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 10\n  failureThreshold: 3\nreadinessProbe:\n  httpGet: {path: /actuator/health/readiness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 3",
    "difficulty": "expert",
    "codeExample": "startupProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 60\nlivenessProbe:\n  httpGet: {path: /actuator/health/liveness, port: 8080}\n  periodSeconds: 10\n  failureThreshold: 3\nreadinessProbe:\n  httpGet: {path: /actuator/health/readiness, port: 8080}\n  periodSeconds: 5\n  failureThreshold: 3",
    "codeLanguage": "yaml",
    "realTimeScenario": "Allow a Spring Boot service up to roughly five minutes to initialize before normal probes begin.",
    "commonMistakes": [
      "Using the same external database health check for every probe."
    ],
    "interviewTips": [
      "Explain traffic removal versus restart and startup gating."
    ],
    "followUpQuestions": [
      "Why can a liveness check against a shared database cause cascading failures?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-021",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "Explain Kubernetes networking and CNI.",
    "shortAnswer": "CNI plugins configure Pod networking; Kubernetes expects direct Pod IP connectivity.",
    "detailedAnswer": "Each Pod has a network namespace shared by its containers, so localhost connects containers inside the same Pod. Different Pods normally have distinct IPs and communicate without application-level NAT between Pod IPs. A CNI plugin configures interfaces, addresses and routes; implementations may use overlays, native routing or cloud VPC integration. Service forwarding is a separate concern, implemented by kube-proxy or an alternative dataplane. NetworkPolicy enforcement depends on the installed plugin. Inspect addresses and test connectivity before blaming DNS.\n\nExample (bash; illustrative):\nkubectl get pods -n shop -o wide\nkubectl get nodes -o wide\nkubectl -n kube-system get daemonsets\n\nEnterprise scenario: Order and Inventory Pods on different nodes communicate through the cluster dataplane.\n\nCommon mistake: Assuming every CNI implementation uses an overlay or enforces NetworkPolicy.\n\nInterview tip: Separate Pod networking, Service forwarding and policy enforcement.\n\nFollow-up: How would you isolate cross-node packet loss?",
    "detailedAnswerTelugu": "ఒక Pod లోని containers ఒకే network namespace ను share చేస్తాయి. అందువల్ల localhost ద్వారా communicate చేయవచ్చు. వేరే Pods కు వేర్వేరు IP addresses ఉంటాయి. CNI plugin interfaces, IP allocation, routing ను ఏర్పాటు చేస్తుంది. Service traffic forwarding వేరే బాధ్యత. NetworkPolicy support కూడా plugin మీద ఆధారపడుతుంది. Pod IP తో connectivity test చేసి తర్వాత DNS సమస్య ఉందా చూడాలి.\n\nExample (bash):\nkubectl get pods -n shop -o wide\nkubectl get nodes -o wide\nkubectl -n kube-system get daemonsets",
    "difficulty": "advanced",
    "codeExample": "kubectl get pods -n shop -o wide\nkubectl get nodes -o wide\nkubectl -n kube-system get daemonsets",
    "codeLanguage": "bash",
    "realTimeScenario": "Order and Inventory Pods on different nodes communicate through the cluster dataplane.",
    "commonMistakes": [
      "Assuming every CNI implementation uses an overlay or enforces NetworkPolicy."
    ],
    "interviewTips": [
      "Separate Pod networking, Service forwarding and policy enforcement."
    ],
    "followUpQuestions": [
      "How would you isolate cross-node packet loss?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-022",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "What is a Kubernetes Service and how does discovery work?",
    "shortAnswer": "A Service provides a stable endpoint for changing backend Pods.",
    "detailedAnswer": "A selector-based Service matches Pod labels. The EndpointSlice controller tracks backend addresses and readiness conditions. Clients use the Service DNS name and port rather than caching ephemeral Pod IPs. The dataplane typically distributes new connections across eligible endpoints; it does not guarantee equal requests per Pod, especially with persistent HTTP connections. A Service can also be defined without a selector with manually managed EndpointSlices.\n\nExample (bash; illustrative):\nkubectl -n shop get svc orders\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders -o yaml\n\nEnterprise scenario: Payment Service calls orders.shop.svc.cluster.local instead of individual Pod IPs (assuming the default cluster domain).\n\nCommon mistake: Using a Pod IP as a permanent application endpoint.\n\nInterview tip: Explain selector, EndpointSlice and dataplane as distinct parts.\n\nFollow-up: What happens when the Service selector matches no Pods?",
    "detailedAnswerTelugu": "Pods recreate అయినప్పుడు IP మారుతుంది. Service స్థిరమైన DNS name మరియు virtual IP ఇస్తుంది. Selector ద్వారా matching Pods గుర్తించి EndpointSlices లో backend addresses మరియు readiness track చేస్తారు. Client Service name తో call చేస్తుంది. ప్రతి HTTP request సమానంగా distribute అవుతుందని అనుకోకూడదు; persistent connections వల్ల distribution మారుతుంది.\n\nExample (bash):\nkubectl -n shop get svc orders\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders -o yaml",
    "difficulty": "intermediate",
    "codeExample": "kubectl -n shop get svc orders\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders -o yaml",
    "codeLanguage": "bash",
    "realTimeScenario": "Payment Service calls orders.shop.svc.cluster.local instead of individual Pod IPs (assuming the default cluster domain).",
    "commonMistakes": [
      "Using a Pod IP as a permanent application endpoint."
    ],
    "interviewTips": [
      "Explain selector, EndpointSlice and dataplane as distinct parts."
    ],
    "followUpQuestions": [
      "What happens when the Service selector matches no Pods?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-023",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "What is a ClusterIP Service?",
    "shortAnswer": "ClusterIP exposes a stable virtual IP inside the cluster.",
    "detailedAnswer": "ClusterIP is the default Service type. The port is the client-facing Service port; targetPort is the backend application port. The Service IP is virtual and traffic is forwarded by the cluster dataplane. The following manifest assumes Order Pods have app: orders and listen on 8080. Clients use orders:80 in the same namespace. ClusterIP does not by itself expose the service to the public internet.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders\nspec:\n  type: ClusterIP\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080\n\nEnterprise scenario: Inventory calls Order API over internal HTTP without exposing it publicly.\n\nCommon mistake: Confusing port with targetPort or using mismatched labels.\n\nInterview tip: Start troubleshooting with EndpointSlices and application listening ports.\n\nFollow-up: Can a ClusterIP Service be reached from outside the cluster?",
    "detailedAnswerTelugu": "ClusterIP default Service type. Cluster లోపల stable virtual IP ద్వారా application ను access చేయవచ్చు. port అనేది client ఉపయోగించే port; targetPort అనేది Spring Boot container listen చేసే port. Selector labels సరిగ్గా match కావాలి. బయట internet access కోసం వేరే entry point అవసరం.\n\nExample (yaml):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders\nspec:\n  type: ClusterIP\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080",
    "difficulty": "intermediate",
    "codeExample": "apiVersion: v1\nkind: Service\nmetadata:\n  name: orders\nspec:\n  type: ClusterIP\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080",
    "codeLanguage": "yaml",
    "realTimeScenario": "Inventory calls Order API over internal HTTP without exposing it publicly.",
    "commonMistakes": [
      "Confusing port with targetPort or using mismatched labels."
    ],
    "interviewTips": [
      "Start troubleshooting with EndpointSlices and application listening ports."
    ],
    "followUpQuestions": [
      "Can a ClusterIP Service be reached from outside the cluster?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-024",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "What is a NodePort Service?",
    "shortAnswer": "NodePort exposes a Service on an allocated port on eligible node addresses.",
    "detailedAnswer": "NodePort builds on Service forwarding and allocates a port, usually in the default range 30000–32767. A client with network access to a node address can connect to that port. Firewall rules and dataplane configuration determine actual reachability. externalTrafficPolicy Local restricts external forwarding to local eligible endpoints and can preserve client source IP, but nodes without endpoints may drop traffic. NodePort is often an infrastructure building block rather than a public production API entry point.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders-node\nspec:\n  type: NodePort\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080\n      nodePort: 30080\n\nEnterprise scenario: A controlled development environment exposes an Order API through a reachable node.\n\nCommon mistake: Assuming every node is publicly reachable or opening all NodePorts in a firewall.\n\nInterview tip: Discuss source IP, firewall and externalTrafficPolicy trade-offs.\n\nFollow-up: How does externalTrafficPolicy Local affect availability?",
    "detailedAnswerTelugu": "NodePort ద్వారా node IP మరియు allocated port ఉపయోగించి Service ను access చేయవచ్చు. Default range సాధారణంగా 30000–32767. Firewall allow చేయకపోతే బయట నుంచి access రాదు. externalTrafficPolicy Local వాడితే local endpoints ఉన్న nodes మీద traffic పంపాలి. Production లో TLS, authentication కోసం gateway లేదా load balancer ఉపయోగించడం సాధారణం.\n\nExample (yaml):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders-node\nspec:\n  type: NodePort\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080\n      nodePort: 30080",
    "difficulty": "intermediate",
    "codeExample": "apiVersion: v1\nkind: Service\nmetadata:\n  name: orders-node\nspec:\n  type: NodePort\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080\n      nodePort: 30080",
    "codeLanguage": "yaml",
    "realTimeScenario": "A controlled development environment exposes an Order API through a reachable node.",
    "commonMistakes": [
      "Assuming every node is publicly reachable or opening all NodePorts in a firewall."
    ],
    "interviewTips": [
      "Discuss source IP, firewall and externalTrafficPolicy trade-offs."
    ],
    "followUpQuestions": [
      "How does externalTrafficPolicy Local affect availability?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-025",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "How does a LoadBalancer Service work?",
    "shortAnswer": "A supported controller provisions an external or internal load balancer for a Service.",
    "detailedAnswer": "A LoadBalancer Service requests integration with a cloud provider or another load-balancer implementation. The controller reconciles infrastructure and reports ingress addresses in status. Depending on implementation, traffic targets nodes or Pod IPs; a NodePort is not always necessary. Internal versus internet-facing exposure, health checks, TLS and security groups depend on provider configuration. A pending external address can indicate missing controller support or provisioning errors.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders-lb\nspec:\n  type: LoadBalancer\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080\n\nEnterprise scenario: An EKS deployment uses a supported AWS load balancer controller to expose an API.\n\nCommon mistake: Assuming type LoadBalancer always creates a public IP or automatically configures HTTPS.\n\nInterview tip: Explain provisioning, target selection and health checks separately.\n\nFollow-up: Why might EXTERNAL-IP remain pending?",
    "detailedAnswerTelugu": "LoadBalancer type ఇచ్చినప్పుడు supported cloud controller load balancer ను provision చేస్తుంది. Status లో IP లేదా hostname వస్తుంది. Implementation బట్టి traffic nodes లేదా Pods కు వెళ్తుంది. Internal/public exposure, health checks, firewall settings provider మీద ఆధారపడతాయి. EXTERNAL-IP pending అయితే controller events మరియు cloud permissions చూడాలి.\n\nExample (yaml):\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders-lb\nspec:\n  type: LoadBalancer\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080",
    "difficulty": "advanced",
    "codeExample": "apiVersion: v1\nkind: Service\nmetadata:\n  name: orders-lb\nspec:\n  type: LoadBalancer\n  selector:\n    app: orders\n  ports:\n    - port: 80\n      targetPort: 8080",
    "codeLanguage": "yaml",
    "realTimeScenario": "An EKS deployment uses a supported AWS load balancer controller to expose an API.",
    "commonMistakes": [
      "Assuming type LoadBalancer always creates a public IP or automatically configures HTTPS."
    ],
    "interviewTips": [
      "Explain provisioning, target selection and health checks separately."
    ],
    "followUpQuestions": [
      "Why might EXTERNAL-IP remain pending?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-026",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "What is a headless Service and why is it used with StatefulSets?",
    "shortAnswer": "A headless Service uses clusterIP: None and exposes backend addresses through DNS.",
    "detailedAnswer": "A headless Service does not allocate a virtual ClusterIP. DNS returns endpoint addresses rather than a single Service VIP for selector-based Services. A StatefulSet can use a governing headless Service through serviceName to provide stable per-Pod DNS identities, such as db-0.db.shop.svc.cluster.local. Readiness normally affects DNS publication; publishNotReadyAddresses is an explicit option useful for certain peer discovery protocols. The client or database protocol must handle endpoint selection and failover.\n\nExample (yaml; illustrative):\napiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector:\n    app: db\n  ports:\n    - name: postgres\n      port: 5432\n\nEnterprise scenario: A database cluster discovers individual peers using StatefulSet identities.\n\nCommon mistake: Assuming headless DNS automatically selects the database primary.\n\nInterview tip: Contrast stable identity with stable IP and explain client-side selection.\n\nFollow-up: When would publishNotReadyAddresses be appropriate?",
    "detailedAnswerTelugu": "Headless Service లో clusterIP: None ఉంటుంది. DNS ద్వారా backend Pod addresses వస్తాయి. StatefulSet లో serviceName ద్వారా db-0, db-1 వంటి stable DNS identities పొందవచ్చు. Pod IP మారినా identity స్థిరంగా ఉంటుంది. Database replication, leader election, failover మాత్రం application protocol నిర్వహించాలి.\n\nExample (yaml):\napiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector:\n    app: db\n  ports:\n    - name: postgres\n      port: 5432",
    "difficulty": "advanced",
    "codeExample": "apiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  clusterIP: None\n  selector:\n    app: db\n  ports:\n    - name: postgres\n      port: 5432",
    "codeLanguage": "yaml",
    "realTimeScenario": "A database cluster discovers individual peers using StatefulSet identities.",
    "commonMistakes": [
      "Assuming headless DNS automatically selects the database primary."
    ],
    "interviewTips": [
      "Contrast stable identity with stable IP and explain client-side selection."
    ],
    "followUpQuestions": [
      "When would publishNotReadyAddresses be appropriate?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-027",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "How does CoreDNS resolve Kubernetes Service names?",
    "shortAnswer": "CoreDNS typically resolves cluster Service names using Kubernetes API data.",
    "detailedAnswer": "Pods commonly use ClusterFirst DNS policy, which configures a cluster DNS resolver and namespace search suffixes. A same-namespace Service can be resolved by short name; cross-namespace calls can use service.namespace or the full name. The cluster domain is configurable, commonly cluster.local. Normal Services resolve to virtual IPs, headless Services to endpoint addresses. High ndots values and search expansion can increase DNS queries for external names. Inspect resolv.conf, DNS endpoints, CoreDNS logs and network policy when resolution fails.\n\nExample (bash; illustrative):\nkubectl -n shop exec deploy/orders -- cat /etc/resolv.conf\nkubectl -n shop run dns-check --image=busybox:1.36 --restart=Never --rm -it -- nslookup inventory.shop.svc.cluster.local\nkubectl -n kube-system get svc kube-dns\n\nEnterprise scenario: Order Service resolves Inventory Service without hardcoded IP addresses.\n\nCommon mistake: Treating a successful DNS lookup as proof that the application port works.\n\nInterview tip: Differentiate NXDOMAIN, DNS timeout and TCP connection failure.\n\nFollow-up: How can DNS search suffixes increase latency?",
    "detailedAnswerTelugu": "CoreDNS Kubernetes Service names ను resolve చేస్తుంది. ఒకే namespace లో orders అని call చేయవచ్చు; వేరే namespace అయితే orders.shop లేదా పూర్తి DNS name వాడాలి. cluster.local సాధారణ default మాత్రమే. DNS fail అయితే Pod resolv.conf, CoreDNS Pods, DNS Service endpoints, UDP/TCP 53 policies పరిశీలించాలి.\n\nExample (bash):\nkubectl -n shop exec deploy/orders -- cat /etc/resolv.conf\nkubectl -n shop run dns-check --image=busybox:1.36 --restart=Never --rm -it -- nslookup inventory.shop.svc.cluster.local\nkubectl -n kube-system get svc kube-dns",
    "difficulty": "advanced",
    "codeExample": "kubectl -n shop exec deploy/orders -- cat /etc/resolv.conf\nkubectl -n shop run dns-check --image=busybox:1.36 --restart=Never --rm -it -- nslookup inventory.shop.svc.cluster.local\nkubectl -n kube-system get svc kube-dns",
    "codeLanguage": "bash",
    "realTimeScenario": "Order Service resolves Inventory Service without hardcoded IP addresses.",
    "commonMistakes": [
      "Treating a successful DNS lookup as proof that the application port works."
    ],
    "interviewTips": [
      "Differentiate NXDOMAIN, DNS timeout and TCP connection failure."
    ],
    "followUpQuestions": [
      "How can DNS search suffixes increase latency?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-028",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "What is Ingress and how does an Ingress controller work?",
    "shortAnswer": "Ingress declares HTTP routing rules; a controller implements them.",
    "detailedAnswer": "Ingress routes HTTP and HTTPS traffic by host and path to Services. Creating the resource alone does not create a functioning proxy: an installed controller must watch the appropriate IngressClass. TLS can terminate at the controller using a referenced Secret; backend encryption is a separate configuration decision. Prefix path matching is segment-based. Ingress is stable but its API is frozen; Gateway API provides newer routing capabilities. The example assumes a configured ingress class named web.\n\nExample (yaml; illustrative):\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: web\n  tls:\n    - hosts: [shop.example.com]\n      secretName: shop-tls\n  rules:\n    - host: shop.example.com\n      http:\n        paths:\n          - path: /orders\n            pathType: Prefix\n            backend:\n              service:\n                name: orders\n                port:\n                  number: 80\n\nEnterprise scenario: A shared HTTPS entry point routes order and inventory APIs to internal Services.\n\nCommon mistake: Assuming Ingress rewrites paths automatically or supports arbitrary TCP protocols.\n\nInterview tip: Explain resource versus controller, TLS termination and backend health.\n\nFollow-up: How do you investigate an Ingress returning 503?",
    "detailedAnswerTelugu": "Ingress HTTP/HTTPS requests ను host మరియు path ఆధారంగా Services కు route చేస్తుంది. Ingress YAML మాత్రమే apply చేస్తే సరిపోదు; matching Ingress controller ఉండాలి. TLS Secret ద్వారా edge లో HTTPS terminate చేయవచ్చు. Backend traffic encryption వేరుగా configure చేయాలి. IngressClass సరైనదా చూడాలి.\n\nExample (yaml):\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: web\n  tls:\n    - hosts: [shop.example.com]\n      secretName: shop-tls\n  rules:\n    - host: shop.example.com\n      http:\n        paths:\n          - path: /orders\n            pathType: Prefix\n            backend:\n              service:\n                name: orders\n                port:\n                  number: 80",
    "difficulty": "expert",
    "codeExample": "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: web\n  tls:\n    - hosts: [shop.example.com]\n      secretName: shop-tls\n  rules:\n    - host: shop.example.com\n      http:\n        paths:\n          - path: /orders\n            pathType: Prefix\n            backend:\n              service:\n                name: orders\n                port:\n                  number: 80",
    "codeLanguage": "yaml",
    "realTimeScenario": "A shared HTTPS entry point routes order and inventory APIs to internal Services.",
    "commonMistakes": [
      "Assuming Ingress rewrites paths automatically or supports arbitrary TCP protocols."
    ],
    "interviewTips": [
      "Explain resource versus controller, TLS termination and backend health."
    ],
    "followUpQuestions": [
      "How do you investigate an Ingress returning 503?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-029",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "How does Gateway API differ from Ingress?",
    "shortAnswer": "Gateway API separates infrastructure ownership from application routing using typed resources.",
    "detailedAnswer": "GatewayClass identifies a controller implementation. Gateway declares listeners and infrastructure configuration, while HTTPRoute attaches application routing rules to listeners. This separation supports platform teams and application teams with distinct permissions. Weighted backends can express traffic splitting without controller-specific Ingress annotations. Cross-namespace backend references require appropriate ReferenceGrant; route attachment is governed by allowedRoutes. Gateway API requires installed CRDs and a compatible controller. Check Accepted and ResolvedRefs conditions before debugging traffic.\n\nExample (yaml; illustrative):\napiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: orders\nspec:\n  parentRefs:\n    - name: shop-gateway\n  rules:\n    - matches:\n        - path:\n            type: PathPrefix\n            value: /orders\n      backendRefs:\n        - name: orders-stable\n          port: 80\n          weight: 90\n        - name: orders-canary\n          port: 80\n          weight: 10\n\nEnterprise scenario: A platform-managed Gateway routes roughly 10 percent of eligible traffic to a canary backend.\n\nCommon mistake: Assuming Gateway API resources work without CRDs and controller support.\n\nInterview tip: Discuss role separation and route status rather than just syntax.\n\nFollow-up: How do allowedRoutes and ReferenceGrant differ?",
    "detailedAnswerTelugu": "Gateway API లో platform team GatewayClass, Gateway manage చేయవచ్చు. Application team HTTPRoute ద్వారా routes define చేస్తుంది. Weighted backends తో canary traffic split చేయవచ్చు. Cross namespace references కోసం ReferenceGrant అవసరం కావచ్చు. CRDs మరియు compatible controller ముందుగా install చేయాలి. Status conditions ద్వారా route accept అయిందా చూడాలి.\n\nExample (yaml):\napiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: orders\nspec:\n  parentRefs:\n    - name: shop-gateway\n  rules:\n    - matches:\n        - path:\n            type: PathPrefix\n            value: /orders\n      backendRefs:\n        - name: orders-stable\n          port: 80\n          weight: 90\n        - name: orders-canary\n          port: 80\n          weight: 10",
    "difficulty": "expert",
    "codeExample": "apiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: orders\nspec:\n  parentRefs:\n    - name: shop-gateway\n  rules:\n    - matches:\n        - path:\n            type: PathPrefix\n            value: /orders\n      backendRefs:\n        - name: orders-stable\n          port: 80\n          weight: 90\n        - name: orders-canary\n          port: 80\n          weight: 10",
    "codeLanguage": "yaml",
    "realTimeScenario": "A platform-managed Gateway routes roughly 10 percent of eligible traffic to a canary backend.",
    "commonMistakes": [
      "Assuming Gateway API resources work without CRDs and controller support."
    ],
    "interviewTips": [
      "Discuss role separation and route status rather than just syntax."
    ],
    "followUpQuestions": [
      "How do allowedRoutes and ReferenceGrant differ?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-030",
    "technology": "kubernetes",
    "topic": "Services, Networking and Ingress",
    "question": "How do you troubleshoot enterprise Kubernetes networking?",
    "shortAnswer": "Trace traffic hop by hop from client to gateway, Service, endpoint and application.",
    "detailedAnswer": "For an Order API outage, first identify scope and symptoms: DNS failure, connection timeout, TLS error or HTTP status. Inspect Gateway or Ingress status and controller logs. Verify Service ports, selectors and EndpointSlices; empty ready endpoints often indicate label or readiness problems. From an authorized diagnostic Pod test DNS, Service connectivity and individual endpoint connectivity. Check NetworkPolicies, CNI health and node-specific failures. A 503 may come from a proxy or application, so correlate request IDs and logs. Avoid changing firewall or restarting all workloads before collecting evidence.\n\nExample (bash; illustrative):\nkubectl -n shop get ingress,svc,pods -o wide\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders\nkubectl -n shop describe svc orders\nkubectl -n shop get networkpolicy\nkubectl -n shop logs deploy/orders --tail=100\nkubectl -n shop run net-check --image=curlimages/curl:8.12.1 --restart=Never --rm -it -- curl -sv --max-time 5 http://orders/actuator/health\n\nEnterprise scenario: A deployment changes readiness behavior, leaving no eligible endpoints and causing gateway errors.\n\nCommon mistake: Restarting every Pod or disabling security policies before identifying the failing hop.\n\nInterview tip: Present a hypothesis-driven investigation and distinguish proxy errors from application errors.\n\nFollow-up: How would you diagnose failures affecting only one worker node?",
    "detailedAnswerTelugu": "Production లో Order API fail అయితే మొదట DNS, TCP, TLS, HTTP error ఏది అనేది గుర్తించాలి. Gateway status, controller logs తర్వాత Service selector, targetPort, EndpointSlices చూడాలి. Ready endpoints లేకపోతే readiness probe లేదా labels పరిశీలించాలి. Authorized debug Pod నుంచి DNS, Service, Pod connectivity విడివిడిగా test చేయాలి. NetworkPolicy మరియు CNI సమస్యలు కూడా చూడాలి. Evidence లేకుండా అన్ని Pods restart చేయకూడదు.\n\nExample (bash):\nkubectl -n shop get ingress,svc,pods -o wide\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders\nkubectl -n shop describe svc orders\nkubectl -n shop get networkpolicy\nkubectl -n shop logs deploy/orders --tail=100\nkubectl -n shop run net-check --image=curlimages/curl:8.12.1 --restart=Never --rm -it -- curl -sv --max-time 5 http://orders/actuator/health",
    "difficulty": "expert",
    "codeExample": "kubectl -n shop get ingress,svc,pods -o wide\nkubectl -n shop get endpointslices -l kubernetes.io/service-name=orders\nkubectl -n shop describe svc orders\nkubectl -n shop get networkpolicy\nkubectl -n shop logs deploy/orders --tail=100\nkubectl -n shop run net-check --image=curlimages/curl:8.12.1 --restart=Never --rm -it -- curl -sv --max-time 5 http://orders/actuator/health",
    "codeLanguage": "bash",
    "realTimeScenario": "A deployment changes readiness behavior, leaving no eligible endpoints and causing gateway errors.",
    "commonMistakes": [
      "Restarting every Pod or disabling security policies before identifying the failing hop."
    ],
    "interviewTips": [
      "Present a hypothesis-driven investigation and distinguish proxy errors from application errors."
    ],
    "followUpQuestions": [
      "How would you diagnose failures affecting only one worker node?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-031",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "What are ConfigMaps in Kubernetes?",
    "shortAnswer": "ConfigMaps separate non-secret configuration from container images.",
    "detailedAnswer": "A ConfigMap stores UTF-8 configuration in data and binary content in binaryData. Pods consume it through env, envFrom or projected files. Mounted files update eventually, except subPath mounts; environment variables require replacement Pods. Spring Boot must explicitly reload configuration or restart. Keep environment-specific values outside images and version configuration with deployments.\n\nExample (bash; illustrative excerpt):\nkubectl create configmap orders-config --from-literal=SPRING_PROFILES_ACTIVE=prod\nkubectl get configmap orders-config -o yaml\n\nEnterprise scenario: Orders uses different profiles in staging and production without rebuilding the image.\n\nCommon mistake: Storing passwords in ConfigMaps.\n\nInterview tip: Explain configuration delivery separately from application reload.\n\nFollow-up: How would you trigger a rollout when configuration changes?",
    "detailedAnswerTelugu": "ConfigMap ద్వారా non-secret configuration ను image నుండి వేరు చేస్తాం. Environment variable గా తీసుకుంటే Pod restart అవసరం. Volume ద్వారా mount చేస్తే files కొంత సమయం తర్వాత మారతాయి; subPath అయితే update కాదు. Spring Boot ఆ మార్పును స్వయంగా reload చేస్తుందని అనుకోకూడదు.\n\nExample (bash):\nkubectl create configmap orders-config --from-literal=SPRING_PROFILES_ACTIVE=prod\nkubectl get configmap orders-config -o yaml",
    "difficulty": "intermediate",
    "codeExample": "kubectl create configmap orders-config --from-literal=SPRING_PROFILES_ACTIVE=prod\nkubectl get configmap orders-config -o yaml",
    "codeLanguage": "bash",
    "realTimeScenario": "Orders uses different profiles in staging and production without rebuilding the image.",
    "commonMistakes": [
      "Storing passwords in ConfigMaps."
    ],
    "interviewTips": [
      "Explain configuration delivery separately from application reload."
    ],
    "followUpQuestions": [
      "How would you trigger a rollout when configuration changes?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-032",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "How do Kubernetes Secrets protect sensitive configuration?",
    "shortAnswer": "Secrets hold sensitive values but require additional security controls.",
    "detailedAnswer": "Secret data is base64 encoded, not encrypted by encoding. Enable API-server encryption at rest, restrict RBAC and protect backups. A user able to create Pods in a namespace may indirectly access its Secrets. Prefer workload identity or an external secret manager where possible. Rotate credentials and ensure applications reload them; avoid printing values in logs or committing them to Git.\n\nExample (yaml; illustrative excerpt):\nenv:\n  - name: DB_PASSWORD\n    valueFrom:\n      secretKeyRef:\n        name: orders-db\n        key: password\n\nEnterprise scenario: Orders reads a database credential from an existing Secret without embedding it in its image.\n\nCommon mistake: Committing base64 credentials to Git.\n\nInterview tip: Distinguish encoding, encryption and authorization.\n\nFollow-up: How would you rotate a database password without downtime?",
    "detailedAnswerTelugu": "Secret లో password లేదా token ఉంచవచ్చు. Base64 encryption కాదు. etcd encryption at rest, RBAC, backup protection అవసరం. Pod create permission ఉన్న user కూడా Secret ను mount చేయగల అవకాశం ఉంది. External secret manager లేదా workload identity ఉపయోగించడం మంచిది. Rotation తర్వాత application కొత్త value తీసుకుంటుందో చూడాలి.\n\nExample (yaml):\nenv:\n  - name: DB_PASSWORD\n    valueFrom:\n      secretKeyRef:\n        name: orders-db\n        key: password",
    "difficulty": "advanced",
    "codeExample": "env:\n  - name: DB_PASSWORD\n    valueFrom:\n      secretKeyRef:\n        name: orders-db\n        key: password",
    "codeLanguage": "yaml",
    "realTimeScenario": "Orders reads a database credential from an existing Secret without embedding it in its image.",
    "commonMistakes": [
      "Committing base64 credentials to Git."
    ],
    "interviewTips": [
      "Distinguish encoding, encryption and authorization."
    ],
    "followUpQuestions": [
      "How would you rotate a database password without downtime?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-033",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "When should you use environment variables versus mounted configuration files?",
    "shortAnswer": "Environment variables are startup snapshots; mounted files can be refreshed eventually.",
    "detailedAnswer": "Use env for small scalar settings and files for structured YAML, certificates or large configuration. A ConfigMap volume projects keys into files; the kubelet refreshes projections eventually. A subPath mount does not receive updates. Mounting over a directory hides its original contents. Applications must watch or reread files to use updates. Immutable versioned ConfigMaps and rolling deployments give predictable releases.\n\nExample (yaml; illustrative excerpt):\nvolumes:\n  - name: config\n    configMap:\n      name: orders-config\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: config\n        mountPath: /etc/orders\n        readOnly: true\n\nEnterprise scenario: Mount application.yaml under /etc/orders and configure Spring Boot to read that location.\n\nCommon mistake: Assuming a changed file automatically refreshes Spring beans.\n\nInterview tip: Describe both Kubernetes propagation and application behavior.\n\nFollow-up: Why does a subPath mount not receive updates?",
    "detailedAnswerTelugu": "చిన్న settings కోసం env variables, YAML లేదా certificates కోసం volume files ఉపయోగించవచ్చు. env values startup సమయంలో వస్తాయి. Mounted files తర్వాత update కావచ్చు కానీ application reload చేయాలి. subPath update కాదు. Versioned ConfigMap తో rolling deployment చేస్తే configuration మార్పు నియంత్రణలో ఉంటుంది.\n\nExample (yaml):\nvolumes:\n  - name: config\n    configMap:\n      name: orders-config\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: config\n        mountPath: /etc/orders\n        readOnly: true",
    "difficulty": "advanced",
    "codeExample": "volumes:\n  - name: config\n    configMap:\n      name: orders-config\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: config\n        mountPath: /etc/orders\n        readOnly: true",
    "codeLanguage": "yaml",
    "realTimeScenario": "Mount application.yaml under /etc/orders and configure Spring Boot to read that location.",
    "commonMistakes": [
      "Assuming a changed file automatically refreshes Spring beans."
    ],
    "interviewTips": [
      "Describe both Kubernetes propagation and application behavior."
    ],
    "followUpQuestions": [
      "Why does a subPath mount not receive updates?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-034",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "What are Kubernetes volumes and emptyDir?",
    "shortAnswer": "Volumes share or preserve files within their defined lifecycle; emptyDir lasts for the Pod lifetime.",
    "detailedAnswer": "An emptyDir is created when a Pod is assigned to a node and survives container restarts in that Pod. It is removed when the Pod is removed from the node. Containers in the same Pod can share it. Default storage uses node ephemeral storage; medium Memory uses tmpfs and counts against memory usage. Use size limits and resource budgets. Never use emptyDir as durable database storage.\n\nExample (yaml; illustrative excerpt):\nvolumes:\n  - name: scratch\n    emptyDir:\n      sizeLimit: 1Gi\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: scratch\n        mountPath: /tmp/orders\n\nEnterprise scenario: Orders temporarily generates export files before uploading them to object storage.\n\nCommon mistake: Expecting files to survive Pod replacement.\n\nInterview tip: Compare container restart with Pod deletion.\n\nFollow-up: How does memory-backed emptyDir affect memory limits?",
    "detailedAnswerTelugu": "emptyDir అనేది Pod lifetime వరకు ఉండే temporary storage. Container restart అయినా files ఉంటాయి కానీ Pod తొలగితే data పోతుంది. ఒకే Pod లో containers share చేసుకోవచ్చు. Memory medium అయితే RAM ఉపయోగిస్తుంది. Database durable data కోసం PVC అవసరం.\n\nExample (yaml):\nvolumes:\n  - name: scratch\n    emptyDir:\n      sizeLimit: 1Gi\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: scratch\n        mountPath: /tmp/orders",
    "difficulty": "intermediate",
    "codeExample": "volumes:\n  - name: scratch\n    emptyDir:\n      sizeLimit: 1Gi\ncontainers:\n  - name: orders\n    image: example/orders:1.0\n    volumeMounts:\n      - name: scratch\n        mountPath: /tmp/orders",
    "codeLanguage": "yaml",
    "realTimeScenario": "Orders temporarily generates export files before uploading them to object storage.",
    "commonMistakes": [
      "Expecting files to survive Pod replacement."
    ],
    "interviewTips": [
      "Compare container restart with Pod deletion."
    ],
    "followUpQuestions": [
      "How does memory-backed emptyDir affect memory limits?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-035",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "What is a PersistentVolume (PV)?",
    "shortAnswer": "A PV is a cluster-scoped storage resource independent of an individual Pod.",
    "detailedAnswer": "A PV describes capacity, access modes, storage class, reclaim policy and a backing storage implementation. It can be statically created or dynamically provisioned. A matching PVC binds to it. The storage driver handles attachment and mounting. Persistence is not a backup: deletion, corruption and infrastructure failures still require recovery planning. Inspect node affinity for zonal disks.\n\nExample (bash; illustrative excerpt):\nkubectl get pv\nkubectl describe pv <pv-name>\n\nEnterprise scenario: An existing database disk is represented by a PV and mounted through a claim.\n\nCommon mistake: Treating PV capacity as a backup guarantee.\n\nInterview tip: Explain the relationship between PV, PVC and backing disk.\n\nFollow-up: What happens to a PV when its claim is deleted?",
    "detailedAnswerTelugu": "PV అనేది cluster-level storage resource. Pod నుండి వేరుగా lifecycle ఉంటుంది. Capacity, access modes, StorageClass, reclaim policy ఉంటాయి. PVC ద్వారా bind అవుతుంది. Disk zone constraints చూడాలి. Persistent storage ఉన్నంత మాత్రాన backup ఉన్నట్టు కాదు.\n\nExample (bash):\nkubectl get pv\nkubectl describe pv <pv-name>",
    "difficulty": "advanced",
    "codeExample": "kubectl get pv\nkubectl describe pv <pv-name>",
    "codeLanguage": "bash",
    "realTimeScenario": "An existing database disk is represented by a PV and mounted through a claim.",
    "commonMistakes": [
      "Treating PV capacity as a backup guarantee."
    ],
    "interviewTips": [
      "Explain the relationship between PV, PVC and backing disk."
    ],
    "followUpQuestions": [
      "What happens to a PV when its claim is deleted?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-036",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "What is a PersistentVolumeClaim (PVC)?",
    "shortAnswer": "A PVC is a namespaced request for persistent storage.",
    "detailedAnswer": "A claim requests capacity, access mode and optionally a StorageClass. Kubernetes binds a suitable PV or asks a provisioner to create one. A Pod references the claim by name in its namespace. A Pending claim can indicate no matching volume, missing provisioner or delayed binding. StatefulSet volumeClaimTemplates can allocate independent claims per replica. Expansion depends on class and driver support.\n\nExample (yaml; illustrative excerpt):\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: orders-data\nspec:\n  accessModes: [ReadWriteOnce]\n  storageClassName: gp3\n  resources:\n    requests:\n      storage: 20Gi\n\nEnterprise scenario: A single stateful workload requests a 20 GiB disk from an existing gp3 StorageClass.\n\nCommon mistake: Assuming a PVC can be referenced across namespaces.\n\nInterview tip: Explain binding and diagnose Pending claims using events.\n\nFollow-up: How does a Pod mount this claim?",
    "detailedAnswerTelugu": "PVC ద్వారా application కి ఎంత storage కావాలో request చేస్తాం. సరైన PV ఉంటే bind అవుతుంది లేక provisioner కొత్త disk create చేస్తుంది. Pod తన namespace లో claim ను reference చేస్తుంది. Pending ఉంటే events చూడాలి. StatefulSet ప్రతి replica కి separate PVC ఇవ్వగలదు.\n\nExample (yaml):\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: orders-data\nspec:\n  accessModes: [ReadWriteOnce]\n  storageClassName: gp3\n  resources:\n    requests:\n      storage: 20Gi",
    "difficulty": "advanced",
    "codeExample": "apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: orders-data\nspec:\n  accessModes: [ReadWriteOnce]\n  storageClassName: gp3\n  resources:\n    requests:\n      storage: 20Gi",
    "codeLanguage": "yaml",
    "realTimeScenario": "A single stateful workload requests a 20 GiB disk from an existing gp3 StorageClass.",
    "commonMistakes": [
      "Assuming a PVC can be referenced across namespaces."
    ],
    "interviewTips": [
      "Explain binding and diagnose Pending claims using events."
    ],
    "followUpQuestions": [
      "How does a Pod mount this claim?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-037",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "How do StorageClasses and dynamic provisioning work?",
    "shortAnswer": "StorageClasses define how a provisioner creates storage on demand.",
    "detailedAnswer": "A StorageClass names a provisioner and driver-specific parameters. With Immediate binding, provisioning can occur before Pod scheduling; WaitForFirstConsumer delays binding until scheduling constraints are known, helping avoid zone mismatches. Reclaim policy controls dynamically provisioned PV cleanup. allowVolumeExpansion permits expansion when supported; shrinking is not supported through normal PVC resizing.\n\nExample (yaml; illustrative excerpt):\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: gp3\nprovisioner: ebs.csi.aws.com\nparameters:\n  type: gp3\n  encrypted: \"true\"\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nallowVolumeExpansion: true\n\nEnterprise scenario: EKS provisions encrypted gp3 disks in a zone compatible with the workload.\n\nCommon mistake: Using Immediate binding without considering topology.\n\nInterview tip: Discuss provisioning, binding, expansion and deletion separately.\n\nFollow-up: Why is WaitForFirstConsumer useful for zonal storage?",
    "detailedAnswerTelugu": "StorageClass లో provisioner, disk parameters, reclaim policy ఉంటాయి. WaitForFirstConsumer వల్ల Pod scheduling అవసరాలు తెలిసిన తర్వాత disk provision అవుతుంది. Zone mismatch తగ్గుతుంది. Expansion driver support మీద ఆధారపడుతుంది. PVC size తగ్గించడం సాధారణంగా supported కాదు.\n\nExample (yaml):\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: gp3\nprovisioner: ebs.csi.aws.com\nparameters:\n  type: gp3\n  encrypted: \"true\"\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nallowVolumeExpansion: true",
    "difficulty": "expert",
    "codeExample": "apiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: gp3\nprovisioner: ebs.csi.aws.com\nparameters:\n  type: gp3\n  encrypted: \"true\"\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nallowVolumeExpansion: true",
    "codeLanguage": "yaml",
    "realTimeScenario": "EKS provisions encrypted gp3 disks in a zone compatible with the workload.",
    "commonMistakes": [
      "Using Immediate binding without considering topology."
    ],
    "interviewTips": [
      "Discuss provisioning, binding, expansion and deletion separately."
    ],
    "followUpQuestions": [
      "Why is WaitForFirstConsumer useful for zonal storage?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-038",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "How do CSI drivers integrate AWS EBS with Kubernetes?",
    "shortAnswer": "CSI standardizes storage operations between Kubernetes and storage providers.",
    "detailedAnswer": "The EBS CSI controller provisions and attaches EBS volumes; node components stage and mount them. Standard EKS installations require the driver and appropriate IAM permissions, commonly through EKS Pod Identity or IRSA. EBS volumes are zonal; a replacement Pod must run in a compatible availability zone. EKS Auto Mode uses a different provisioner identifier. Check PVC events, VolumeAttachment objects and driver logs when mounts fail.\n\nExample (bash; illustrative excerpt):\nkubectl get csidrivers\nkubectl get volumeattachments\nkubectl describe pvc orders-data\nkubectl -n kube-system get pods -l app.kubernetes.io/name=aws-ebs-csi-driver\n\nEnterprise scenario: A replacement database Pod cannot mount its disk until compatible node capacity is available.\n\nCommon mistake: Expecting EBS to attach across availability zones.\n\nInterview tip: Explain controller and node responsibilities and IAM.\n\nFollow-up: How would you troubleshoot an EBS attach failure?",
    "detailedAnswerTelugu": "CSI ద్వారా Kubernetes cloud storage తో standard interface ఉపయోగిస్తుంది. EBS CSI controller disk provision మరియు attach చేస్తుంది; node plugin mount చేస్తుంది. IAM permissions అవసరం. EBS disk ఒక availability zone కి సంబంధించినది. Pod అదే zone లో schedule కావాలి. Auto Mode provisioner వేరుగా ఉంటుంది.\n\nExample (bash):\nkubectl get csidrivers\nkubectl get volumeattachments\nkubectl describe pvc orders-data\nkubectl -n kube-system get pods -l app.kubernetes.io/name=aws-ebs-csi-driver",
    "difficulty": "expert",
    "codeExample": "kubectl get csidrivers\nkubectl get volumeattachments\nkubectl describe pvc orders-data\nkubectl -n kube-system get pods -l app.kubernetes.io/name=aws-ebs-csi-driver",
    "codeLanguage": "bash",
    "realTimeScenario": "A replacement database Pod cannot mount its disk until compatible node capacity is available.",
    "commonMistakes": [
      "Expecting EBS to attach across availability zones."
    ],
    "interviewTips": [
      "Explain controller and node responsibilities and IAM."
    ],
    "followUpQuestions": [
      "How would you troubleshoot an EBS attach failure?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-039",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "Explain storage access modes and reclaim policies.",
    "shortAnswer": "Access modes describe mount capabilities; reclaim policies govern storage after claim deletion.",
    "detailedAnswer": "ReadWriteOnce allows read-write mounting by one node, potentially multiple Pods on that node. ReadOnlyMany allows read-only mounting by multiple nodes; ReadWriteMany allows read-write mounting by multiple nodes when supported. ReadWriteOncePod restricts access to one Pod for supported CSI volumes. Retain preserves backing storage for manual recovery; Delete normally removes dynamically provisioned backing storage. Access modes are not general filesystem authorization.\n\nExample (bash; illustrative excerpt):\nkubectl get pv -o custom-columns=NAME:.metadata.name,ACCESS:.spec.accessModes,RECLAIM:.spec.persistentVolumeReclaimPolicy\n\nEnterprise scenario: Use shared file storage for multiple export workers and separate zonal disks for database replicas.\n\nCommon mistake: Confusing ReadWriteOnce with ReadWriteOncePod.\n\nInterview tip: Explain access modes independently of reclaim policy.\n\nFollow-up: Which storage type would you choose for shared uploads?",
    "detailedAnswerTelugu": "RWO అంటే ఒక node కి read-write access; ఒక Pod మాత్రమే అని కాదు. RWX అంటే అనేక nodes నుండి read-write access, driver support అవసరం. RWOP supported CSI storage లో ఒక Pod కి పరిమితం చేస్తుంది. Retain disk ను ఉంచుతుంది; Delete సాధారణంగా backing disk ను తొలగిస్తుంది.\n\nExample (bash):\nkubectl get pv -o custom-columns=NAME:.metadata.name,ACCESS:.spec.accessModes,RECLAIM:.spec.persistentVolumeReclaimPolicy",
    "difficulty": "expert",
    "codeExample": "kubectl get pv -o custom-columns=NAME:.metadata.name,ACCESS:.spec.accessModes,RECLAIM:.spec.persistentVolumeReclaimPolicy",
    "codeLanguage": "bash",
    "realTimeScenario": "Use shared file storage for multiple export workers and separate zonal disks for database replicas.",
    "commonMistakes": [
      "Confusing ReadWriteOnce with ReadWriteOncePod."
    ],
    "interviewTips": [
      "Explain access modes independently of reclaim policy."
    ],
    "followUpQuestions": [
      "Which storage type would you choose for shared uploads?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-040",
    "technology": "kubernetes",
    "topic": "ConfigMaps, Secrets and Persistent Storage",
    "question": "How would you design enterprise configuration and storage for Spring Boot microservices?",
    "shortAnswer": "Use versioned non-secret config, controlled secret delivery and storage selected by workload needs.",
    "detailedAnswer": "Keep stateless Order API replicas behind a Service and store durable business records in a managed database or deliberately operated stateful system. Use ConfigMaps for environment settings, workload identity for cloud APIs and an external secret manager for credentials. Use object storage for exports; PVCs for workloads requiring filesystem persistence. For self-managed databases, design replication, zone-aware placement, backups and tested restores. Roll configuration changes with readiness checks and monitor storage capacity, latency and attach failures.\n\nExample (bash; illustrative excerpt):\nkubectl get deploy,pods,pvc -n orders\nkubectl get events -n orders --sort-by=.metadata.creationTimestamp\nkubectl rollout status deployment/orders -n orders\n\nEnterprise scenario: Deploy a new Orders configuration gradually while keeping database credentials and durable data independent of application Pods.\n\nCommon mistake: Putting business records on container-local storage or assuming replication replaces backups.\n\nInterview tip: Justify each storage choice using durability, access and recovery requirements.\n\nFollow-up: How would you recover from a zone outage and verify data integrity?",
    "detailedAnswerTelugu": "Order API ని stateless గా replicas తో run చేయాలి. Business data managed database లో ఉంచవచ్చు. ConfigMap లో non-secret settings, workload identity ద్వారా cloud access, secret manager ద్వారా credentials ఇవ్వాలి. Exports కోసం object storage మంచిది. Stateful database ఉంటే replication, zone placement, backups, restore tests అవసరం. Configuration rollout సమయంలో readiness మరియు metrics చూడాలి.\n\nExample (bash):\nkubectl get deploy,pods,pvc -n orders\nkubectl get events -n orders --sort-by=.metadata.creationTimestamp\nkubectl rollout status deployment/orders -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl get deploy,pods,pvc -n orders\nkubectl get events -n orders --sort-by=.metadata.creationTimestamp\nkubectl rollout status deployment/orders -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Deploy a new Orders configuration gradually while keeping database credentials and durable data independent of application Pods.",
    "commonMistakes": [
      "Putting business records on container-local storage or assuming replication replaces backups."
    ],
    "interviewTips": [
      "Justify each storage choice using durability, access and recovery requirements."
    ],
    "followUpQuestions": [
      "How would you recover from a zone outage and verify data integrity?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-041",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do CPU and memory requests and limits work?",
    "shortAnswer": "Requests guide scheduling against node allocatable capacity.",
    "detailedAnswer": "Requests guide scheduling against node allocatable capacity. CPU limits throttle execution; memory limits can cause OOM termination. CPU requests also influence relative CPU shares under contention. Size requests from measured usage and account for JVM heap, native memory and threads.\n\nExample (yaml; illustrative excerpt):\nresources:\n  requests:\n    cpu: 250m\n    memory: 512Mi\n  limits:\n    cpu: \"1\"\n    memory: 1Gi\n\nEnterprise scenario: Order API needs predictable capacity during checkout.\n\nCommon mistake: Setting heap equal to container memory limit.\n\nInterview tip: Distinguish scheduling from runtime enforcement.\n\nFollow-up: How do you measure CPU throttling?",
    "detailedAnswerTelugu": "Requests ఆధారంగా scheduler node ను ఎంచుకుంటుంది. CPU limit దాటితే throttling రావచ్చు; memory limit దాటితే OOM termination రావచ్చు. Java heap మాత్రమే కాక native memory కూడా లెక్కించాలి.\n\nExample (yaml):\nresources:\n  requests:\n    cpu: 250m\n    memory: 512Mi\n  limits:\n    cpu: \"1\"\n    memory: 1Gi",
    "difficulty": "advanced",
    "codeExample": "resources:\n  requests:\n    cpu: 250m\n    memory: 512Mi\n  limits:\n    cpu: \"1\"\n    memory: 1Gi",
    "codeLanguage": "yaml",
    "realTimeScenario": "Order API needs predictable capacity during checkout.",
    "commonMistakes": [
      "Setting heap equal to container memory limit."
    ],
    "interviewTips": [
      "Distinguish scheduling from runtime enforcement."
    ],
    "followUpQuestions": [
      "How do you measure CPU throttling?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-042",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do QoS classes and eviction work?",
    "shortAnswer": "Guaranteed requires equal nonzero CPU and memory requests and limits for every container; BestEffort has neither; other Pods are Burstable.",
    "detailedAnswer": "Guaranteed requires equal nonzero CPU and memory requests and limits for every container; BestEffort has neither; other Pods are Burstable. Node-pressure eviction considers usage relative to requests, priority and resource pressure, not just QoS labels.\n\nExample (bash; illustrative excerpt):\nkubectl get pod orders-abc -o jsonpath=\"{.status.qosClass}\"\nkubectl describe node worker-1\n\nEnterprise scenario: Protect critical checkout workloads during memory pressure.\n\nCommon mistake: Assuming Guaranteed Pods can never be evicted.\n\nInterview tip: Separate eviction from container OOM.\n\nFollow-up: What is Pod priority?",
    "detailedAnswerTelugu": "ప్రతి container కి CPU, memory requests మరియు limits సమానంగా ఉంటే Guaranteed. ఏవీ లేకపోతే BestEffort. మిగిలినవి Burstable. Node pressure సమయంలో priority, requests కంటే usage కూడా ముఖ్యం.\n\nExample (bash):\nkubectl get pod orders-abc -o jsonpath=\"{.status.qosClass}\"\nkubectl describe node worker-1",
    "difficulty": "expert",
    "codeExample": "kubectl get pod orders-abc -o jsonpath=\"{.status.qosClass}\"\nkubectl describe node worker-1",
    "codeLanguage": "bash",
    "realTimeScenario": "Protect critical checkout workloads during memory pressure.",
    "commonMistakes": [
      "Assuming Guaranteed Pods can never be evicted."
    ],
    "interviewTips": [
      "Separate eviction from container OOM."
    ],
    "followUpQuestions": [
      "What is Pod priority?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-043",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do you diagnose OOMKilled and CPU throttling?",
    "shortAnswer": "Inspect previous container state, events and metrics.",
    "detailedAnswer": "Inspect previous container state, events and metrics. Exit code 137 alone does not prove OOM. Compare working set and JVM native memory against the cgroup limit; CPU throttling can increase latency even with spare node CPU.\n\nExample (bash; illustrative excerpt):\nkubectl describe pod orders-abc\nkubectl logs orders-abc --previous\nkubectl top pod orders-abc --containers\n\nEnterprise scenario: Checkout latency rises after a memory configuration change.\n\nCommon mistake: Increasing limits without investigating leaks.\n\nInterview tip: Correlate restarts with memory and GC metrics.\n\nFollow-up: How do JVM container-aware settings help?",
    "detailedAnswerTelugu": "Previous container state లో OOMKilled ఉందా చూడాలి. Exit 137 ఒక్కటే proof కాదు. JVM heap, native memory, container limit పోల్చాలి. CPU throttling వల్ల latency పెరుగుతుంది.\n\nExample (bash):\nkubectl describe pod orders-abc\nkubectl logs orders-abc --previous\nkubectl top pod orders-abc --containers",
    "difficulty": "advanced",
    "codeExample": "kubectl describe pod orders-abc\nkubectl logs orders-abc --previous\nkubectl top pod orders-abc --containers",
    "codeLanguage": "bash",
    "realTimeScenario": "Checkout latency rises after a memory configuration change.",
    "commonMistakes": [
      "Increasing limits without investigating leaks."
    ],
    "interviewTips": [
      "Correlate restarts with memory and GC metrics."
    ],
    "followUpQuestions": [
      "How do JVM container-aware settings help?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-044",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do node selectors and node affinity work?",
    "shortAnswer": "nodeSelector requires matching labels.",
    "detailedAnswer": "nodeSelector requires matching labels. Required node affinity expresses richer hard constraints; preferred affinity scores eligible nodes. IgnoredDuringExecution means a later label change does not itself evict the Pod.\n\nExample (yaml; illustrative excerpt):\nnodeSelector:\n  workload: compute\n\nEnterprise scenario: Place compute-heavy reporting on a dedicated node pool.\n\nCommon mistake: Assuming a preferred rule guarantees placement.\n\nInterview tip: Explain filtering versus scoring.\n\nFollow-up: When would you use required node affinity?",
    "detailedAnswerTelugu": "nodeSelector exact labels match చేస్తుంది. Required affinity తప్పనిసరి; preferred affinity ఒక preference మాత్రమే. Node label తర్వాత మారినా Pod వెంటనే evict కాదు.\n\nExample (yaml):\nnodeSelector:\n  workload: compute",
    "difficulty": "advanced",
    "codeExample": "nodeSelector:\n  workload: compute",
    "codeLanguage": "yaml",
    "realTimeScenario": "Place compute-heavy reporting on a dedicated node pool.",
    "commonMistakes": [
      "Assuming a preferred rule guarantees placement."
    ],
    "interviewTips": [
      "Explain filtering versus scoring."
    ],
    "followUpQuestions": [
      "When would you use required node affinity?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-045",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do Pod affinity and topology spread constraints differ?",
    "shortAnswer": "Pod affinity places workloads near matching Pods; anti-affinity separates them.",
    "detailedAnswer": "Pod affinity places workloads near matching Pods; anti-affinity separates them. Topology spread controls skew across labeled domains. DoNotSchedule enforces a constraint; ScheduleAnyway prefers balance. Capacity and eligible domains affect placement.\n\nExample (yaml; illustrative excerpt):\ntopologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: DoNotSchedule\n  labelSelector:\n    matchLabels:\n      app: orders\n\nEnterprise scenario: Spread checkout replicas across availability zones.\n\nCommon mistake: Assuming spread creates new nodes.\n\nInterview tip: Discuss failure domains and available capacity.\n\nFollow-up: What happens when one zone has no capacity?",
    "detailedAnswerTelugu": "Pod affinity దగ్గరగా, anti-affinity వేరుగా Pods ఉంచుతుంది. Topology spread zones మధ్య replica imbalance తగ్గిస్తుంది. DoNotSchedule hard rule; capacity లేకపోతే Pending కావచ్చు.\n\nExample (yaml):\ntopologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: DoNotSchedule\n  labelSelector:\n    matchLabels:\n      app: orders",
    "difficulty": "expert",
    "codeExample": "topologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: DoNotSchedule\n  labelSelector:\n    matchLabels:\n      app: orders",
    "codeLanguage": "yaml",
    "realTimeScenario": "Spread checkout replicas across availability zones.",
    "commonMistakes": [
      "Assuming spread creates new nodes."
    ],
    "interviewTips": [
      "Discuss failure domains and available capacity."
    ],
    "followUpQuestions": [
      "What happens when one zone has no capacity?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-046",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "What are taints and tolerations?",
    "shortAnswer": "Taints repel Pods without matching tolerations.",
    "detailedAnswer": "Taints repel Pods without matching tolerations. NoSchedule blocks new placement, PreferNoSchedule is soft, and NoExecute can evict existing Pods. A toleration permits placement but does not attract a Pod; combine with affinity for dedicated pools.\n\nExample (yaml; illustrative excerpt):\ntolerations:\n- key: dedicated\n  operator: Equal\n  value: payments\n  effect: NoSchedule\n\nEnterprise scenario: Reserve payment nodes for sensitive workloads.\n\nCommon mistake: Treating toleration as a node selector.\n\nInterview tip: Explain all three taint effects.\n\nFollow-up: How do you dedicate a node pool?",
    "detailedAnswerTelugu": "Taint ఉన్న node మీద matching toleration లేని Pod schedule కాదు. NoExecute existing Pods ను కూడా evict చేయవచ్చు. Toleration permission మాత్రమే; dedicated node కోసం affinity కూడా అవసరం.\n\nExample (yaml):\ntolerations:\n- key: dedicated\n  operator: Equal\n  value: payments\n  effect: NoSchedule",
    "difficulty": "advanced",
    "codeExample": "tolerations:\n- key: dedicated\n  operator: Equal\n  value: payments\n  effect: NoSchedule",
    "codeLanguage": "yaml",
    "realTimeScenario": "Reserve payment nodes for sensitive workloads.",
    "commonMistakes": [
      "Treating toleration as a node selector."
    ],
    "interviewTips": [
      "Explain all three taint effects."
    ],
    "followUpQuestions": [
      "How do you dedicate a node pool?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-047",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How does Horizontal Pod Autoscaler work?",
    "shortAnswer": "HPA adjusts replica count from observed metrics.",
    "detailedAnswer": "HPA adjusts replica count from observed metrics. CPU utilization targets depend on CPU requests. Metrics Server or a custom metrics adapter must supply metrics. Stabilization and scaling policies reduce oscillation; downstream capacity remains a separate constraint.\n\nExample (bash; illustrative excerpt):\nkubectl autoscale deployment orders --cpu-percent=70 --min=3 --max=12\nkubectl get hpa\n\nEnterprise scenario: Scale Order API during a holiday sale.\n\nCommon mistake: Using CPU utilization without CPU requests.\n\nInterview tip: Discuss scale-down stabilization and load tests.\n\nFollow-up: When is queue depth a better metric?",
    "detailedAnswerTelugu": "HPA metrics ఆధారంగా replicas పెంచుతుంది లేదా తగ్గిస్తుంది. CPU utilization target కి requests అవసరం. Metrics Server లేదా adapter metrics అందించాలి. Database capacity కూడా చూడాలి.\n\nExample (bash):\nkubectl autoscale deployment orders --cpu-percent=70 --min=3 --max=12\nkubectl get hpa",
    "difficulty": "advanced",
    "codeExample": "kubectl autoscale deployment orders --cpu-percent=70 --min=3 --max=12\nkubectl get hpa",
    "codeLanguage": "bash",
    "realTimeScenario": "Scale Order API during a holiday sale.",
    "commonMistakes": [
      "Using CPU utilization without CPU requests."
    ],
    "interviewTips": [
      "Discuss scale-down stabilization and load tests."
    ],
    "followUpQuestions": [
      "When is queue depth a better metric?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-048",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How does Vertical Pod Autoscaler differ from HPA?",
    "shortAnswer": "VPA recommends or adjusts resource requests using historical usage.",
    "detailedAnswer": "VPA recommends or adjusts resource requests using historical usage. Depending on update mode and cluster support, changes may recreate Pods or use supported in-place updates. Avoid conflicting HPA and VPA control over the same CPU or memory signal.\n\nExample (bash; illustrative excerpt):\nkubectl get vpa\nkubectl describe vpa orders\n\nEnterprise scenario: Right-size a reporting workload with variable memory use.\n\nCommon mistake: Assuming VPA is installed by default.\n\nInterview tip: Start with recommendation-only mode.\n\nFollow-up: How can HPA and VPA coexist?",
    "detailedAnswerTelugu": "VPA Pod resource requests ను recommend లేదా adjust చేస్తుంది. Mode, cluster support బట్టి Pod recreate కావచ్చు. అదే CPU metric పై HPA మరియు VPA ఒకదానితో ఒకటి conflict కాకుండా చూడాలి.\n\nExample (bash):\nkubectl get vpa\nkubectl describe vpa orders",
    "difficulty": "expert",
    "codeExample": "kubectl get vpa\nkubectl describe vpa orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Right-size a reporting workload with variable memory use.",
    "commonMistakes": [
      "Assuming VPA is installed by default."
    ],
    "interviewTips": [
      "Start with recommendation-only mode."
    ],
    "followUpQuestions": [
      "How can HPA and VPA coexist?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-049",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do Cluster Autoscaler and Karpenter differ?",
    "shortAnswer": "Cluster Autoscaler typically changes size of configured node groups based on unschedulable Pods and removable nodes.",
    "detailedAnswer": "Cluster Autoscaler typically changes size of configured node groups based on unschedulable Pods and removable nodes. Karpenter provisions nodes from workload constraints using provider-specific resources and can consolidate capacity. Both need compatible cloud configuration and quotas.\n\nExample (bash; illustrative excerpt):\nkubectl get pods --field-selector=status.phase=Pending\nkubectl get nodes\n\nEnterprise scenario: Add capacity when HPA creates unschedulable replicas.\n\nCommon mistake: Assuming node autoscaling is instantaneous.\n\nInterview tip: Explain Pod autoscaling versus node autoscaling.\n\nFollow-up: How do disruption budgets affect consolidation?",
    "detailedAnswerTelugu": "Cluster Autoscaler configured node groups size మార్చుతుంది. Karpenter pending Pods constraints బట్టి suitable nodes provision చేస్తుంది. Cloud quota, IAM, subnet capacity అవసరం.\n\nExample (bash):\nkubectl get pods --field-selector=status.phase=Pending\nkubectl get nodes",
    "difficulty": "advanced",
    "codeExample": "kubectl get pods --field-selector=status.phase=Pending\nkubectl get nodes",
    "codeLanguage": "bash",
    "realTimeScenario": "Add capacity when HPA creates unschedulable replicas.",
    "commonMistakes": [
      "Assuming node autoscaling is instantaneous."
    ],
    "interviewTips": [
      "Explain Pod autoscaling versus node autoscaling."
    ],
    "followUpQuestions": [
      "How do disruption budgets affect consolidation?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-050",
    "technology": "kubernetes",
    "topic": "Scheduling, Resources and Autoscaling",
    "question": "How do you design capacity and autoscaling for production?",
    "shortAnswer": "Load-test the service, choose requests from observed resource use, set replica bounds and scale using a signal tied to demand.",
    "detailedAnswer": "Load-test the service, choose requests from observed resource use, set replica bounds and scale using a signal tied to demand. Reserve headroom for rollout and zone loss. Bound database connections per replica and test node provisioning delay.\n\nExample (bash; illustrative excerpt):\nkubectl get hpa,pdb\nkubectl top nodes\nkubectl rollout status deployment/orders\n\nEnterprise scenario: Handle a traffic spike without exhausting database connections.\n\nCommon mistake: Scaling frontend replicas without downstream budgets.\n\nInterview tip: Quantify capacity and latency SLOs.\n\nFollow-up: How do you test zone failure?",
    "detailedAnswerTelugu": "Load test చేసి requests నిర్ణయించాలి. Demand metric తో HPA, node capacity తో autoscaler configure చేయాలి. Zone failure, rollout కోసం headroom, database connection limits అవసరం.\n\nExample (bash):\nkubectl get hpa,pdb\nkubectl top nodes\nkubectl rollout status deployment/orders",
    "difficulty": "advanced",
    "codeExample": "kubectl get hpa,pdb\nkubectl top nodes\nkubectl rollout status deployment/orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Handle a traffic spike without exhausting database connections.",
    "commonMistakes": [
      "Scaling frontend replicas without downstream budgets."
    ],
    "interviewTips": [
      "Quantify capacity and latency SLOs."
    ],
    "followUpQuestions": [
      "How do you test zone failure?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-051",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How does Kubernetes authentication and authorization work?",
    "shortAnswer": "Authentication establishes identity; authorization checks allowed verbs and resources; admission evaluates or mutates accepted requests before persistence.",
    "detailedAnswer": "Authentication establishes identity; authorization checks allowed verbs and resources; admission evaluates or mutates accepted requests before persistence. RBAC is a common authorizer. Authentication does not imply permission.\n\nExample (bash; illustrative excerpt):\nkubectl auth can-i get pods -n orders\nkubectl auth can-i delete secrets -n orders\n\nEnterprise scenario: Give developers read-only production access.\n\nCommon mistake: Sharing cluster-admin credentials.\n\nInterview tip: Explain the API request pipeline.\n\nFollow-up: How does admission differ from RBAC?",
    "detailedAnswerTelugu": "Authentication identity నిర్ధారిస్తుంది. Authorization ఏ resource మీద ఏ action చేయవచ్చో చూస్తుంది. Admission request policies ను అమలు చేస్తుంది.\n\nExample (bash):\nkubectl auth can-i get pods -n orders\nkubectl auth can-i delete secrets -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl auth can-i get pods -n orders\nkubectl auth can-i delete secrets -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Give developers read-only production access.",
    "commonMistakes": [
      "Sharing cluster-admin credentials."
    ],
    "interviewTips": [
      "Explain the API request pipeline."
    ],
    "followUpQuestions": [
      "How does admission differ from RBAC?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-052",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "What are Roles and ClusterRoles?",
    "shortAnswer": "A Role grants permissions within a namespace.",
    "detailedAnswer": "A Role grants permissions within a namespace. A ClusterRole defines reusable permissions for namespaced or cluster-scoped resources. Bindings determine who receives permissions and where. RBAC permissions are additive.\n\nExample (yaml; illustrative excerpt):\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: orders\nrules:\n- apiGroups: [\"\"]\n  resources: [\"pods\"]\n  verbs: [\"get\", \"list\", \"watch\"]\n\nEnterprise scenario: Allow support engineers to inspect Pods.\n\nCommon mistake: Granting wildcard verbs unnecessarily.\n\nInterview tip: Use least privilege and explicit resources.\n\nFollow-up: Can a Role grant access to nodes?",
    "detailedAnswerTelugu": "Role namespace లో permissions ఇస్తుంది. ClusterRole reusable rules define చేస్తుంది. Binding ద్వారా ఎవరికీ ఎక్కడ permission ఇవ్వాలో నిర్ణయిస్తాం.\n\nExample (yaml):\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: orders\nrules:\n- apiGroups: [\"\"]\n  resources: [\"pods\"]\n  verbs: [\"get\", \"list\", \"watch\"]",
    "difficulty": "advanced",
    "codeExample": "apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: orders\nrules:\n- apiGroups: [\"\"]\n  resources: [\"pods\"]\n  verbs: [\"get\", \"list\", \"watch\"]",
    "codeLanguage": "yaml",
    "realTimeScenario": "Allow support engineers to inspect Pods.",
    "commonMistakes": [
      "Granting wildcard verbs unnecessarily."
    ],
    "interviewTips": [
      "Use least privilege and explicit resources."
    ],
    "followUpQuestions": [
      "Can a Role grant access to nodes?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-053",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do RoleBindings and ClusterRoleBindings differ?",
    "shortAnswer": "RoleBinding grants permissions in its namespace even when referencing a ClusterRole.",
    "detailedAnswer": "RoleBinding grants permissions in its namespace even when referencing a ClusterRole. ClusterRoleBinding grants the referenced ClusterRole across the cluster. Subjects may be users, groups or service accounts.\n\nExample (bash; illustrative excerpt):\nkubectl create rolebinding support-reader --clusterrole=view --group=order-support -n orders\n\nEnterprise scenario: Restrict support staff to the orders namespace.\n\nCommon mistake: Using ClusterRoleBinding for namespace-only access.\n\nInterview tip: Explain scope of binding versus role.\n\nFollow-up: How do you audit effective access?",
    "detailedAnswerTelugu": "RoleBinding namespace వరకు permissions ఇస్తుంది. ClusterRoleBinding cluster అంతటా permissions ఇవ్వగలదు. Subject user, group లేదా service account కావచ్చు.\n\nExample (bash):\nkubectl create rolebinding support-reader --clusterrole=view --group=order-support -n orders",
    "difficulty": "advanced",
    "codeExample": "kubectl create rolebinding support-reader --clusterrole=view --group=order-support -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Restrict support staff to the orders namespace.",
    "commonMistakes": [
      "Using ClusterRoleBinding for namespace-only access."
    ],
    "interviewTips": [
      "Explain scope of binding versus role."
    ],
    "followUpQuestions": [
      "How do you audit effective access?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-054",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "What are ServiceAccounts and projected tokens?",
    "shortAnswer": "ServiceAccounts identify workloads to the Kubernetes API.",
    "detailedAnswer": "ServiceAccounts identify workloads to the Kubernetes API. Modern projected tokens are short-lived and audience-bound. Disable automatic mounting for workloads that do not need API access. Cloud workload identity is a separate integration.\n\nExample (yaml; illustrative excerpt):\nserviceAccountName: orders\nautomountServiceAccountToken: false\n\nEnterprise scenario: Order API does not need Kubernetes API permissions.\n\nCommon mistake: Using a shared privileged service account.\n\nInterview tip: Separate workload identity from human identity.\n\nFollow-up: How does token rotation work?",
    "detailedAnswerTelugu": "ServiceAccount workload identity. Projected tokens short-lived, audience-bound. API అవసరం లేని application కి token auto mount ఆపాలి.\n\nExample (yaml):\nserviceAccountName: orders\nautomountServiceAccountToken: false",
    "difficulty": "expert",
    "codeExample": "serviceAccountName: orders\nautomountServiceAccountToken: false",
    "codeLanguage": "yaml",
    "realTimeScenario": "Order API does not need Kubernetes API permissions.",
    "commonMistakes": [
      "Using a shared privileged service account."
    ],
    "interviewTips": [
      "Separate workload identity from human identity."
    ],
    "followUpQuestions": [
      "How does token rotation work?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-055",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do security contexts protect containers?",
    "shortAnswer": "Security contexts configure user IDs, privilege escalation, capabilities and filesystem behavior.",
    "detailedAnswer": "Security contexts configure user IDs, privilege escalation, capabilities and filesystem behavior. Non-root execution, dropped capabilities and a read-only root filesystem reduce exposure. Applications may need writable mounted directories.\n\nExample (yaml; illustrative excerpt):\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  readOnlyRootFilesystem: true\n  capabilities:\n    drop: [ALL]\n\nEnterprise scenario: Harden a Spring Boot container.\n\nCommon mistake: Assuming non-root alone is complete isolation.\n\nInterview tip: Test compatibility with application writes.\n\nFollow-up: What is seccomp?",
    "detailedAnswerTelugu": "SecurityContext ద్వారా non-root user, capabilities, privilege escalation నియంత్రించవచ్చు. Read-only filesystem ఉంటే writable temp volume అవసరం కావచ్చు.\n\nExample (yaml):\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  readOnlyRootFilesystem: true\n  capabilities:\n    drop: [ALL]",
    "difficulty": "advanced",
    "codeExample": "securityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  readOnlyRootFilesystem: true\n  capabilities:\n    drop: [ALL]",
    "codeLanguage": "yaml",
    "realTimeScenario": "Harden a Spring Boot container.",
    "commonMistakes": [
      "Assuming non-root alone is complete isolation."
    ],
    "interviewTips": [
      "Test compatibility with application writes."
    ],
    "followUpQuestions": [
      "What is seccomp?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-056",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "What are Pod Security Standards and admission?",
    "shortAnswer": "Pod Security Standards define Privileged, Baseline and Restricted profiles.",
    "detailedAnswer": "Pod Security Standards define Privileged, Baseline and Restricted profiles. Pod Security Admission applies namespace labels for enforce, audit and warn modes. Restricted policies require controls such as non-root execution and suitable seccomp settings.\n\nExample (bash; illustrative excerpt):\nkubectl label namespace orders pod-security.kubernetes.io/enforce=restricted\n\nEnterprise scenario: Prevent privileged containers in production.\n\nCommon mistake: Enforcing without testing existing workloads.\n\nInterview tip: Use audit and warn before enforcement.\n\nFollow-up: How do policy engines extend admission?",
    "detailedAnswerTelugu": "Pod Security Standards లో Privileged, Baseline, Restricted profiles ఉంటాయి. Namespace labels ద్వారా enforce, audit, warn చేయవచ్చు. Restricted కి non-root వంటి controls అవసరం.\n\nExample (bash):\nkubectl label namespace orders pod-security.kubernetes.io/enforce=restricted",
    "difficulty": "advanced",
    "codeExample": "kubectl label namespace orders pod-security.kubernetes.io/enforce=restricted",
    "codeLanguage": "bash",
    "realTimeScenario": "Prevent privileged containers in production.",
    "commonMistakes": [
      "Enforcing without testing existing workloads."
    ],
    "interviewTips": [
      "Use audit and warn before enforcement."
    ],
    "followUpQuestions": [
      "How do policy engines extend admission?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-057",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do NetworkPolicies work?",
    "shortAnswer": "NetworkPolicy selects Pods and controls ingress or egress when enforced by the network implementation.",
    "detailedAnswer": "NetworkPolicy selects Pods and controls ingress or egress when enforced by the network implementation. Policies are additive; both source egress and destination ingress must permit a connection if isolated. DNS often needs explicit egress allowance.\n\nExample (yaml; illustrative excerpt):\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]\n\nEnterprise scenario: Isolate payment workloads before allowing required paths.\n\nCommon mistake: Applying default deny without DNS or dependency rules.\n\nInterview tip: Explain additive policy semantics.\n\nFollow-up: Does every CNI enforce NetworkPolicy?",
    "detailedAnswerTelugu": "NetworkPolicy selected Pods traffic ను నియంత్రిస్తుంది. CNI support అవసరం. Source egress, destination ingress రెండూ allow కావాలి. DNS traffic మర్చిపోవద్దు.\n\nExample (yaml):\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]",
    "difficulty": "expert",
    "codeExample": "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]",
    "codeLanguage": "yaml",
    "realTimeScenario": "Isolate payment workloads before allowing required paths.",
    "commonMistakes": [
      "Applying default deny without DNS or dependency rules."
    ],
    "interviewTips": [
      "Explain additive policy semantics."
    ],
    "followUpQuestions": [
      "Does every CNI enforce NetworkPolicy?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-058",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do you protect Kubernetes Secrets in production?",
    "shortAnswer": "Secret values are base64 encoded, not encrypted by encoding.",
    "detailedAnswer": "Secret values are base64 encoded, not encrypted by encoding. Configure encryption at rest, restrict RBAC and use external secret stores or CSI integrations when appropriate. Rotate credentials and prevent logs or manifests from exposing them.\n\nExample (bash; illustrative excerpt):\nkubectl auth can-i get secrets -n payments\nkubectl get secret payment-db -n payments -o name\n\nEnterprise scenario: Rotate database credentials without committing passwords.\n\nCommon mistake: Committing base64 secrets to Git.\n\nInterview tip: Explain rotation and application reload.\n\nFollow-up: How does a CSI secret mount differ from a Secret object?",
    "detailedAnswerTelugu": "Base64 encryption కాదు. etcd encryption at rest, least privilege RBAC, external secret store ఉపయోగించాలి. Rotation చేయాలి; logs లో secrets రాకూడదు.\n\nExample (bash):\nkubectl auth can-i get secrets -n payments\nkubectl get secret payment-db -n payments -o name",
    "difficulty": "advanced",
    "codeExample": "kubectl auth can-i get secrets -n payments\nkubectl get secret payment-db -n payments -o name",
    "codeLanguage": "bash",
    "realTimeScenario": "Rotate database credentials without committing passwords.",
    "commonMistakes": [
      "Committing base64 secrets to Git."
    ],
    "interviewTips": [
      "Explain rotation and application reload."
    ],
    "followUpQuestions": [
      "How does a CSI secret mount differ from a Secret object?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-059",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do you secure container images and supply chains?",
    "shortAnswer": "Use trusted minimal images, scan dependencies, generate SBOMs and pin immutable digests.",
    "detailedAnswer": "Use trusted minimal images, scan dependencies, generate SBOMs and pin immutable digests. Verify signatures through admission policy where supported. Rebuild patched images and track provenance; scanning alone does not guarantee safety.\n\nExample (yaml; illustrative excerpt):\nimage: registry.example.com/orders@sha256:<verified-digest>\n\nEnterprise scenario: Promote the same reviewed image through environments.\n\nCommon mistake: Using mutable latest tags in production.\n\nInterview tip: Distinguish vulnerability scanning from provenance.\n\nFollow-up: How do you enforce signed images?",
    "detailedAnswerTelugu": "Trusted minimal image, vulnerability scan, SBOM, digest pinning ఉపయోగించాలి. Signature verification admission policy తో చేయవచ్చు. Patches కోసం image rebuild చేయాలి.\n\nExample (yaml):\nimage: registry.example.com/orders@sha256:<verified-digest>",
    "difficulty": "advanced",
    "codeExample": "image: registry.example.com/orders@sha256:<verified-digest>",
    "codeLanguage": "yaml",
    "realTimeScenario": "Promote the same reviewed image through environments.",
    "commonMistakes": [
      "Using mutable latest tags in production."
    ],
    "interviewTips": [
      "Distinguish vulnerability scanning from provenance."
    ],
    "followUpQuestions": [
      "How do you enforce signed images?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-060",
    "technology": "kubernetes",
    "topic": "Security, RBAC and Network Policies",
    "question": "How do you design multi-tenant Kubernetes security?",
    "shortAnswer": "Namespaces organize resources but are not strong isolation by themselves.",
    "detailedAnswer": "Namespaces organize resources but are not strong isolation by themselves. Combine RBAC, quotas, NetworkPolicy, admission controls and workload identities. Separate clusters or stronger sandboxing may be needed for mutually untrusted tenants.\n\nExample (bash; illustrative excerpt):\nkubectl get resourcequota,limitrange -n orders\nkubectl get networkpolicy -n orders\n\nEnterprise scenario: Separate finance and retail teams with controlled access.\n\nCommon mistake: Assuming namespaces isolate all traffic.\n\nInterview tip: Discuss threat model and blast radius.\n\nFollow-up: When would you choose separate clusters?",
    "detailedAnswerTelugu": "Namespace ఒక్కటే security boundary కాదు. RBAC, quota, NetworkPolicy, admission controls కలిపి వాడాలి. Untrusted tenants కోసం separate clusters అవసరం కావచ్చు.\n\nExample (bash):\nkubectl get resourcequota,limitrange -n orders\nkubectl get networkpolicy -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl get resourcequota,limitrange -n orders\nkubectl get networkpolicy -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Separate finance and retail teams with controlled access.",
    "commonMistakes": [
      "Assuming namespaces isolate all traffic."
    ],
    "interviewTips": [
      "Discuss threat model and blast radius."
    ],
    "followUpQuestions": [
      "When would you choose separate clusters?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-061",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "What is Helm and how are charts structured?",
    "shortAnswer": "Helm packages Kubernetes templates, default values and metadata into charts.",
    "detailedAnswer": "Helm packages Kubernetes templates, default values and metadata into charts. A release is an installed chart instance. Templates render manifests before submission; chart dependencies and values must be versioned and reviewed.\n\nExample (bash; illustrative excerpt):\nhelm create orders\nhelm template orders ./orders -f values-prod.yaml\n\nEnterprise scenario: Package Order Service for multiple environments.\n\nCommon mistake: Treating rendered manifests as automatically valid.\n\nInterview tip: Review rendered YAML before deployment.\n\nFollow-up: What is a Helm release?",
    "detailedAnswerTelugu": "Helm chart లో templates, values.yaml, Chart.yaml ఉంటాయి. Install చేసిన instance release. Values ద్వారా environment configuration మార్చవచ్చు.\n\nExample (bash):\nhelm create orders\nhelm template orders ./orders -f values-prod.yaml",
    "difficulty": "advanced",
    "codeExample": "helm create orders\nhelm template orders ./orders -f values-prod.yaml",
    "codeLanguage": "bash",
    "realTimeScenario": "Package Order Service for multiple environments.",
    "commonMistakes": [
      "Treating rendered manifests as automatically valid."
    ],
    "interviewTips": [
      "Review rendered YAML before deployment."
    ],
    "followUpQuestions": [
      "What is a Helm release?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-062",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How do Helm values and templates work?",
    "shortAnswer": "Values are merged from chart defaults and overrides; later supplied overrides generally win.",
    "detailedAnswer": "Values are merged from chart defaults and overrides; later supplied overrides generally win. Templates use Go templating and Helm functions. Quote strings and validate required inputs with schema or template checks.\n\nExample (bash; illustrative excerpt):\nhelm template orders ./chart -f values-prod.yaml --set replicaCount=3\n\nEnterprise scenario: Set production replica count independently of development.\n\nCommon mistake: Putting plaintext secrets in values files.\n\nInterview tip: Use values schema and render tests.\n\nFollow-up: How do you handle nested values?",
    "detailedAnswerTelugu": "Chart defaults పై environment values override అవుతాయి. Go templates ద్వారా YAML render అవుతుంది. Strings quote చేసి required values validate చేయాలి.\n\nExample (bash):\nhelm template orders ./chart -f values-prod.yaml --set replicaCount=3",
    "difficulty": "advanced",
    "codeExample": "helm template orders ./chart -f values-prod.yaml --set replicaCount=3",
    "codeLanguage": "bash",
    "realTimeScenario": "Set production replica count independently of development.",
    "commonMistakes": [
      "Putting plaintext secrets in values files."
    ],
    "interviewTips": [
      "Use values schema and render tests."
    ],
    "followUpQuestions": [
      "How do you handle nested values?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-063",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How do Helm upgrades and rollbacks work?",
    "shortAnswer": "Helm tracks release revisions and applies rendered resource changes during upgrade.",
    "detailedAnswer": "Helm tracks release revisions and applies rendered resource changes during upgrade. Rollback restores a prior release configuration but cannot undo external side effects or incompatible database migrations. Readiness and timeout options help detect failed releases.\n\nExample (bash; illustrative excerpt):\nhelm upgrade --install orders ./chart -n orders --wait --timeout 5m\nhelm history orders -n orders\nhelm rollback orders 1 -n orders\n\nEnterprise scenario: Recover from a failed application release.\n\nCommon mistake: Assuming rollback restores database data.\n\nInterview tip: Plan backward-compatible migrations.\n\nFollow-up: What happens to persistent volumes during rollback?",
    "detailedAnswerTelugu": "Helm release revisions track చేస్తుంది. Rollback పాత manifests restore చేస్తుంది కానీ database changes undo చేయదు. Readiness, timeout checks అవసరం.\n\nExample (bash):\nhelm upgrade --install orders ./chart -n orders --wait --timeout 5m\nhelm history orders -n orders\nhelm rollback orders 1 -n orders",
    "difficulty": "expert",
    "codeExample": "helm upgrade --install orders ./chart -n orders --wait --timeout 5m\nhelm history orders -n orders\nhelm rollback orders 1 -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Recover from a failed application release.",
    "commonMistakes": [
      "Assuming rollback restores database data."
    ],
    "interviewTips": [
      "Plan backward-compatible migrations."
    ],
    "followUpQuestions": [
      "What happens to persistent volumes during rollback?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-064",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "What is Kustomize and how does it differ from Helm?",
    "shortAnswer": "Kustomize transforms existing YAML using bases, overlays and patches without a general-purpose template language.",
    "detailedAnswer": "Kustomize transforms existing YAML using bases, overlays and patches without a general-purpose template language. Helm renders parameterized charts. Both can produce manifests for review and GitOps workflows.\n\nExample (bash; illustrative excerpt):\nkubectl kustomize overlays/prod\nkubectl apply -k overlays/prod\n\nEnterprise scenario: Maintain environment-specific resource requests.\n\nCommon mistake: Duplicating entire manifests for every environment.\n\nInterview tip: Choose based on packaging and customization needs.\n\nFollow-up: How do generated ConfigMap names help rollouts?",
    "detailedAnswerTelugu": "Kustomize base YAML పై overlays, patches apply చేస్తుంది. Helm templates render చేస్తుంది. రెండింటినీ GitOps లో ఉపయోగించవచ్చు.\n\nExample (bash):\nkubectl kustomize overlays/prod\nkubectl apply -k overlays/prod",
    "difficulty": "advanced",
    "codeExample": "kubectl kustomize overlays/prod\nkubectl apply -k overlays/prod",
    "codeLanguage": "bash",
    "realTimeScenario": "Maintain environment-specific resource requests.",
    "commonMistakes": [
      "Duplicating entire manifests for every environment."
    ],
    "interviewTips": [
      "Choose based on packaging and customization needs."
    ],
    "followUpQuestions": [
      "How do generated ConfigMap names help rollouts?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-065",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How do you build a Kubernetes CI pipeline?",
    "shortAnswer": "CI compiles and tests code, builds an image, scans it, records provenance and publishes an immutable artifact.",
    "detailedAnswer": "CI compiles and tests code, builds an image, scans it, records provenance and publishes an immutable artifact. Deployment configuration references its digest. Separate build credentials from deployment permissions.\n\nExample (bash; illustrative excerpt):\nmvn -B verify\ndocker build -t registry.example.com/orders:$GIT_COMMIT .\ndocker push registry.example.com/orders:$GIT_COMMIT\n\nEnterprise scenario: Build a tested Order Service artifact once.\n\nCommon mistake: Rebuilding different images for each environment.\n\nInterview tip: Promote the same digest after validation.\n\nFollow-up: Where should integration tests run?",
    "detailedAnswerTelugu": "CI లో compile, tests, image build, scan, publish చేస్తాం. Immutable digest ను deployment config లో వాడాలి. Build, deploy credentials వేరు చేయాలి.\n\nExample (bash):\nmvn -B verify\ndocker build -t registry.example.com/orders:$GIT_COMMIT .\ndocker push registry.example.com/orders:$GIT_COMMIT",
    "difficulty": "advanced",
    "codeExample": "mvn -B verify\ndocker build -t registry.example.com/orders:$GIT_COMMIT .\ndocker push registry.example.com/orders:$GIT_COMMIT",
    "codeLanguage": "bash",
    "realTimeScenario": "Build a tested Order Service artifact once.",
    "commonMistakes": [
      "Rebuilding different images for each environment."
    ],
    "interviewTips": [
      "Promote the same digest after validation."
    ],
    "followUpQuestions": [
      "Where should integration tests run?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-066",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "What is GitOps?",
    "shortAnswer": "GitOps stores declarative desired state in version control and uses a reconciler to compare it with live state.",
    "detailedAnswer": "GitOps stores declarative desired state in version control and uses a reconciler to compare it with live state. Pull requests provide review and audit history. Secrets require separate protection and drift policies must be explicit.\n\nExample (bash; illustrative excerpt):\ngit diff -- environments/prod/orders.yaml\ngit log -- environments/prod/orders.yaml\n\nEnterprise scenario: Review production deployment changes through pull requests.\n\nCommon mistake: Making untracked manual production changes.\n\nInterview tip: Explain reconciliation and drift.\n\nFollow-up: How do you handle emergency changes?",
    "detailedAnswerTelugu": "GitOps లో desired state Git లో ఉంటుంది. Controller live state తో compare చేసి reconcile చేస్తుంది. PR review, audit history లభిస్తాయి. Secrets ను protect చేయాలి.\n\nExample (bash):\ngit diff -- environments/prod/orders.yaml\ngit log -- environments/prod/orders.yaml",
    "difficulty": "expert",
    "codeExample": "git diff -- environments/prod/orders.yaml\ngit log -- environments/prod/orders.yaml",
    "codeLanguage": "bash",
    "realTimeScenario": "Review production deployment changes through pull requests.",
    "commonMistakes": [
      "Making untracked manual production changes."
    ],
    "interviewTips": [
      "Explain reconciliation and drift."
    ],
    "followUpQuestions": [
      "How do you handle emergency changes?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-067",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How does Argo CD manage applications?",
    "shortAnswer": "Argo CD compares desired manifests with live resources and reports sync and health separately.",
    "detailedAnswer": "Argo CD compares desired manifests with live resources and reports sync and health separately. Automated sync, pruning and self-healing are configurable. AppProject restrictions and repository credentials limit access.\n\nExample (bash; illustrative excerpt):\nargocd app get orders\nargocd app diff orders\n\nEnterprise scenario: Detect drift in a production Order Service.\n\nCommon mistake: Enabling pruning without reviewing ownership.\n\nInterview tip: Distinguish OutOfSync from unhealthy.\n\nFollow-up: How do sync waves order resources?",
    "detailedAnswerTelugu": "Argo CD Git desired manifests తో live resources compare చేస్తుంది. Sync status, health status వేరు. Auto sync, prune, self-heal configurable.\n\nExample (bash):\nargocd app get orders\nargocd app diff orders",
    "difficulty": "advanced",
    "codeExample": "argocd app get orders\nargocd app diff orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Detect drift in a production Order Service.",
    "commonMistakes": [
      "Enabling pruning without reviewing ownership."
    ],
    "interviewTips": [
      "Distinguish OutOfSync from unhealthy."
    ],
    "followUpQuestions": [
      "How do sync waves order resources?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-068",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How does Flux implement GitOps?",
    "shortAnswer": "Flux controllers fetch sources, build manifests and reconcile Kustomizations or HelmReleases.",
    "detailedAnswer": "Flux controllers fetch sources, build manifests and reconcile Kustomizations or HelmReleases. Dependencies, health checks and reconciliation intervals coordinate delivery. Image automation is optional and must follow promotion policy.\n\nExample (bash; illustrative excerpt):\nflux get sources git\nflux get kustomizations\nflux get helmreleases\n\nEnterprise scenario: Manage multiple environment repositories.\n\nCommon mistake: Assuming reconciliation success proves application correctness.\n\nInterview tip: Inspect source and reconciliation conditions.\n\nFollow-up: How do you suspend reconciliation safely?",
    "detailedAnswerTelugu": "Flux source controllers Git artifacts fetch చేస్తాయి. Kustomization లేదా HelmRelease reconcile చేస్తాయి. Dependencies, health checks తో rollout control చేయవచ్చు.\n\nExample (bash):\nflux get sources git\nflux get kustomizations\nflux get helmreleases",
    "difficulty": "advanced",
    "codeExample": "flux get sources git\nflux get kustomizations\nflux get helmreleases",
    "codeLanguage": "bash",
    "realTimeScenario": "Manage multiple environment repositories.",
    "commonMistakes": [
      "Assuming reconciliation success proves application correctness."
    ],
    "interviewTips": [
      "Inspect source and reconciliation conditions."
    ],
    "followUpQuestions": [
      "How do you suspend reconciliation safely?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-069",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How do canary and blue-green deployments differ?",
    "shortAnswer": "Blue-green maintains two environments and switches traffic after validation.",
    "detailedAnswer": "Blue-green maintains two environments and switches traffic after validation. Canary gradually shifts a fraction of traffic and evaluates metrics. Standard Deployment rolling updates do not provide precise weighted traffic by themselves; use a capable routing or rollout controller.\n\nExample (bash; illustrative excerpt):\nkubectl get deployments,services -n orders\nkubectl rollout status deployment/orders -n orders\n\nEnterprise scenario: Release a checkout change with limited exposure.\n\nCommon mistake: Calling any rolling update a weighted canary.\n\nInterview tip: Define abort criteria and data compatibility.\n\nFollow-up: How do you measure canary success?",
    "detailedAnswerTelugu": "Blue-green లో రెండు versions ఉంచి traffic switch చేస్తాం. Canary లో కొంత traffic కొత్త version కి పంపి metrics చూస్తాం. Weighted routing కోసం controller అవసరం.\n\nExample (bash):\nkubectl get deployments,services -n orders\nkubectl rollout status deployment/orders -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl get deployments,services -n orders\nkubectl rollout status deployment/orders -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Release a checkout change with limited exposure.",
    "commonMistakes": [
      "Calling any rolling update a weighted canary."
    ],
    "interviewTips": [
      "Define abort criteria and data compatibility."
    ],
    "followUpQuestions": [
      "How do you measure canary success?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-070",
    "technology": "kubernetes",
    "topic": "Helm, Kustomize, CI/CD and GitOps",
    "question": "How do you design safe database migrations in CI/CD?",
    "shortAnswer": "Use expand-contract changes: add compatible schema, deploy code supporting both versions, backfill and later remove obsolete fields.",
    "detailedAnswer": "Use expand-contract changes: add compatible schema, deploy code supporting both versions, backfill and later remove obsolete fields. Run migrations with controlled ownership and locking. Application rollback must remain compatible with the schema.\n\nExample (bash; illustrative excerpt):\nkubectl get jobs -n orders\nkubectl logs job/orders-migration -n orders\n\nEnterprise scenario: Add a new order status field without downtime.\n\nCommon mistake: Dropping a column still used by old replicas.\n\nInterview tip: Separate schema rollback from application rollback.\n\nFollow-up: How do you handle failed backfills?",
    "detailedAnswerTelugu": "Expand-contract లో ముందుగా compatible schema add చేసి రెండు versions support చేసే code deploy చేస్తాం. Backfill తర్వాత obsolete fields remove చేయాలి. Migration locking అవసరం.\n\nExample (bash):\nkubectl get jobs -n orders\nkubectl logs job/orders-migration -n orders",
    "difficulty": "advanced",
    "codeExample": "kubectl get jobs -n orders\nkubectl logs job/orders-migration -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Add a new order status field without downtime.",
    "commonMistakes": [
      "Dropping a column still used by old replicas."
    ],
    "interviewTips": [
      "Separate schema rollback from application rollback."
    ],
    "followUpQuestions": [
      "How do you handle failed backfills?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-071",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "What is Amazon EKS?",
    "shortAnswer": "EKS manages the Kubernetes control plane; customers still design workloads, networking, identity and worker capacity.",
    "detailedAnswer": "EKS manages the Kubernetes control plane; customers still design workloads, networking, identity and worker capacity. Managed node groups, Fargate and other supported compute options have different operational constraints.\n\nExample (bash; illustrative excerpt):\naws eks update-kubeconfig --name orders-prod --region us-east-1\nkubectl get nodes\n\nEnterprise scenario: Run Order Service on a managed Kubernetes control plane.\n\nCommon mistake: Assuming managed Kubernetes manages application reliability.\n\nInterview tip: Explain shared responsibility.\n\nFollow-up: How do managed node groups differ from Fargate?",
    "detailedAnswerTelugu": "EKS control plane ను AWS నిర్వహిస్తుంది. Workloads, networking, identity, worker capacity మనం design చేయాలి. Compute options constraints వేరు.\n\nExample (bash):\naws eks update-kubeconfig --name orders-prod --region us-east-1\nkubectl get nodes",
    "difficulty": "advanced",
    "codeExample": "aws eks update-kubeconfig --name orders-prod --region us-east-1\nkubectl get nodes",
    "codeLanguage": "bash",
    "realTimeScenario": "Run Order Service on a managed Kubernetes control plane.",
    "commonMistakes": [
      "Assuming managed Kubernetes manages application reliability."
    ],
    "interviewTips": [
      "Explain shared responsibility."
    ],
    "followUpQuestions": [
      "How do managed node groups differ from Fargate?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-072",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How does EKS authentication and access management work?",
    "shortAnswer": "AWS IAM authenticates eligible principals through EKS authentication.",
    "detailedAnswer": "AWS IAM authenticates eligible principals through EKS authentication. Access entries and associated policies or Kubernetes groups can authorize access, depending on cluster authentication mode. Kubernetes RBAC remains relevant for group-based permissions.\n\nExample (bash; illustrative excerpt):\naws eks list-access-entries --cluster-name orders-prod\nkubectl auth can-i list pods -n orders\n\nEnterprise scenario: Grant a support role limited cluster access.\n\nCommon mistake: Using permanent administrator credentials.\n\nInterview tip: Separate IAM identity from Kubernetes permissions.\n\nFollow-up: How do access entries differ from aws-auth?",
    "detailedAnswerTelugu": "IAM principal authentication చేస్తుంది. Cluster mode బట్టి EKS access entries, policies లేదా Kubernetes groups permissions ఇస్తాయి. RBAC కూడా అవసరం.\n\nExample (bash):\naws eks list-access-entries --cluster-name orders-prod\nkubectl auth can-i list pods -n orders",
    "difficulty": "expert",
    "codeExample": "aws eks list-access-entries --cluster-name orders-prod\nkubectl auth can-i list pods -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Grant a support role limited cluster access.",
    "commonMistakes": [
      "Using permanent administrator credentials."
    ],
    "interviewTips": [
      "Separate IAM identity from Kubernetes permissions."
    ],
    "followUpQuestions": [
      "How do access entries differ from aws-auth?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-073",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How do EKS Pod Identity and IRSA work?",
    "shortAnswer": "Both provide AWS credentials to workloads without embedding access keys.",
    "detailedAnswer": "Both provide AWS credentials to workloads without embedding access keys. IRSA uses an IAM OIDC provider and web identity tokens; EKS Pod Identity uses associations and an agent on supported nodes. Scope roles to required AWS actions and use compatible SDKs.\n\nExample (bash; illustrative excerpt):\naws eks list-pod-identity-associations --cluster-name orders-prod\n\nEnterprise scenario: Allow an Order Service to read one S3 bucket.\n\nCommon mistake: Giving all Pods the node IAM role permissions.\n\nInterview tip: Explain credential isolation and SDK compatibility.\n\nFollow-up: What prerequisites does IRSA need?",
    "detailedAnswerTelugu": "IRSA OIDC token ద్వారా IAM role assume చేస్తుంది. EKS Pod Identity association, agent ద్వారా credentials అందిస్తుంది. Access keys image లో పెట్టకూడదు.\n\nExample (bash):\naws eks list-pod-identity-associations --cluster-name orders-prod",
    "difficulty": "advanced",
    "codeExample": "aws eks list-pod-identity-associations --cluster-name orders-prod",
    "codeLanguage": "bash",
    "realTimeScenario": "Allow an Order Service to read one S3 bucket.",
    "commonMistakes": [
      "Giving all Pods the node IAM role permissions."
    ],
    "interviewTips": [
      "Explain credential isolation and SDK compatibility."
    ],
    "followUpQuestions": [
      "What prerequisites does IRSA need?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-074",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How does AWS VPC CNI networking work?",
    "shortAnswer": "The VPC CNI typically assigns VPC IP addresses to Pods using node network interfaces and address pools.",
    "detailedAnswer": "The VPC CNI typically assigns VPC IP addresses to Pods using node network interfaces and address pools. Subnet IP availability, instance limits and prefix delegation influence density. Other compute and networking modes may differ.\n\nExample (bash; illustrative excerpt):\nkubectl get pods -A -o wide\nkubectl -n kube-system logs daemonset/aws-node -c aws-node --tail=50\n\nEnterprise scenario: Diagnose Pods failing to obtain addresses during scaling.\n\nCommon mistake: Checking only CPU capacity when subnet IPs are exhausted.\n\nInterview tip: Include subnet sizing in capacity planning.\n\nFollow-up: How does prefix delegation help?",
    "detailedAnswerTelugu": "VPC CNI సాధారణంగా Pods కి VPC IP addresses ఇస్తుంది. Subnet free IPs, ENI limits, prefix delegation Pod density పై ప్రభావం చూపుతాయి.\n\nExample (bash):\nkubectl get pods -A -o wide\nkubectl -n kube-system logs daemonset/aws-node -c aws-node --tail=50",
    "difficulty": "advanced",
    "codeExample": "kubectl get pods -A -o wide\nkubectl -n kube-system logs daemonset/aws-node -c aws-node --tail=50",
    "codeLanguage": "bash",
    "realTimeScenario": "Diagnose Pods failing to obtain addresses during scaling.",
    "commonMistakes": [
      "Checking only CPU capacity when subnet IPs are exhausted."
    ],
    "interviewTips": [
      "Include subnet sizing in capacity planning."
    ],
    "followUpQuestions": [
      "How does prefix delegation help?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-075",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How does AWS Load Balancer Controller work?",
    "shortAnswer": "The controller reconciles supported Kubernetes resources into AWS load balancers.",
    "detailedAnswer": "The controller reconciles supported Kubernetes resources into AWS load balancers. ALB commonly handles HTTP routing through Ingress; NLB handles supported Service configurations. Target type, IAM, subnets, health checks and controller settings determine behavior.\n\nExample (bash; illustrative excerpt):\nkubectl get ingress,svc -n orders\nkubectl -n kube-system logs deployment/aws-load-balancer-controller --tail=50\n\nEnterprise scenario: Expose HTTPS checkout endpoints through an ALB.\n\nCommon mistake: Assuming every LoadBalancer Service creates an ALB.\n\nInterview tip: Distinguish instance and IP targets.\n\nFollow-up: How do target health checks affect routing?",
    "detailedAnswerTelugu": "AWS Load Balancer Controller Kubernetes resources ఆధారంగా ALB లేదా NLB create చేస్తుంది. Target type, IAM, subnet, health checks సరైనవి కావాలి.\n\nExample (bash):\nkubectl get ingress,svc -n orders\nkubectl -n kube-system logs deployment/aws-load-balancer-controller --tail=50",
    "difficulty": "expert",
    "codeExample": "kubectl get ingress,svc -n orders\nkubectl -n kube-system logs deployment/aws-load-balancer-controller --tail=50",
    "codeLanguage": "bash",
    "realTimeScenario": "Expose HTTPS checkout endpoints through an ALB.",
    "commonMistakes": [
      "Assuming every LoadBalancer Service creates an ALB."
    ],
    "interviewTips": [
      "Distinguish instance and IP targets."
    ],
    "followUpQuestions": [
      "How do target health checks affect routing?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-076",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How do you upgrade EKS safely?",
    "shortAnswer": "Review supported versions, deprecated APIs and add-on compatibility.",
    "detailedAnswer": "Review supported versions, deprecated APIs and add-on compatibility. Upgrade control plane and worker capacity in a supported sequence; test workload disruption, drain behavior and rollback alternatives. Control plane downgrades are not a normal recovery option.\n\nExample (bash; illustrative excerpt):\naws eks describe-cluster --name orders-prod --query cluster.version\nkubectl get nodes -o wide\naws eks list-addons --cluster-name orders-prod\n\nEnterprise scenario: Upgrade production clusters without violating checkout SLOs.\n\nCommon mistake: Assuming control plane downgrade is available.\n\nInterview tip: Use staging and replacement node pools.\n\nFollow-up: How do you check removed API usage?",
    "detailedAnswerTelugu": "Upgrade ముందు deprecated APIs, add-ons compatibility చూడాలి. Supported sequence లో control plane, nodes upgrade చేయాలి. Drain, PDB, workload tests అవసరం.\n\nExample (bash):\naws eks describe-cluster --name orders-prod --query cluster.version\nkubectl get nodes -o wide\naws eks list-addons --cluster-name orders-prod",
    "difficulty": "advanced",
    "codeExample": "aws eks describe-cluster --name orders-prod --query cluster.version\nkubectl get nodes -o wide\naws eks list-addons --cluster-name orders-prod",
    "codeLanguage": "bash",
    "realTimeScenario": "Upgrade production clusters without violating checkout SLOs.",
    "commonMistakes": [
      "Assuming control plane downgrade is available."
    ],
    "interviewTips": [
      "Use staging and replacement node pools."
    ],
    "followUpQuestions": [
      "How do you check removed API usage?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-077",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "What is Red Hat OpenShift?",
    "shortAnswer": "OpenShift is a Kubernetes platform with integrated operators, security controls, routing and lifecycle management.",
    "detailedAnswer": "OpenShift is a Kubernetes platform with integrated operators, security controls, routing and lifecycle management. Kubernetes APIs remain central; platform-specific features and supported versions vary by installation.\n\nExample (bash; illustrative excerpt):\noc version\noc get clusterversion\noc get clusteroperators\n\nEnterprise scenario: Operate enterprise Java services on OpenShift.\n\nCommon mistake: Assuming all upstream Kubernetes defaults are identical.\n\nInterview tip: Explain platform integration rather than a different orchestrator.\n\nFollow-up: What is a ClusterOperator?",
    "detailedAnswerTelugu": "OpenShift Kubernetes ఆధారిత platform. Operators, routing, security, lifecycle management integrated గా ఉంటాయి. Kubernetes APIs తో పాటు OpenShift resources ఉంటాయి.\n\nExample (bash):\noc version\noc get clusterversion\noc get clusteroperators",
    "difficulty": "advanced",
    "codeExample": "oc version\noc get clusterversion\noc get clusteroperators",
    "codeLanguage": "bash",
    "realTimeScenario": "Operate enterprise Java services on OpenShift.",
    "commonMistakes": [
      "Assuming all upstream Kubernetes defaults are identical."
    ],
    "interviewTips": [
      "Explain platform integration rather than a different orchestrator."
    ],
    "followUpQuestions": [
      "What is a ClusterOperator?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-078",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "What are OpenShift Routes?",
    "shortAnswer": "Routes expose Services through the OpenShift ingress infrastructure.",
    "detailedAnswer": "Routes expose Services through the OpenShift ingress infrastructure. TLS termination may be edge, re-encrypt or passthrough depending on configuration. Hostnames, certificates and backend protocol must match the chosen mode.\n\nExample (bash; illustrative excerpt):\noc expose service orders\noc get route orders\n\nEnterprise scenario: Expose an internal Spring Boot API through the router.\n\nCommon mistake: Using passthrough for a backend that only speaks HTTP.\n\nInterview tip: Explain where TLS terminates.\n\nFollow-up: How does re-encrypt differ from edge?",
    "detailedAnswerTelugu": "Route ద్వారా Service బయటకు expose అవుతుంది. Edge, re-encrypt, passthrough TLS modes ఉంటాయి. Backend protocol, certificate సరిపోవాలి.\n\nExample (bash):\noc expose service orders\noc get route orders",
    "difficulty": "expert",
    "codeExample": "oc expose service orders\noc get route orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Expose an internal Spring Boot API through the router.",
    "commonMistakes": [
      "Using passthrough for a backend that only speaks HTTP."
    ],
    "interviewTips": [
      "Explain where TLS terminates."
    ],
    "followUpQuestions": [
      "How does re-encrypt differ from edge?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-079",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "What are OpenShift Security Context Constraints?",
    "shortAnswer": "SCCs control allowed Pod security settings and may default values such as user IDs.",
    "detailedAnswer": "SCCs control allowed Pod security settings and may default values such as user IDs. Authorization determines which SCCs a workload can use. Images should tolerate assigned non-root UIDs rather than require privileged SCCs.\n\nExample (bash; illustrative excerpt):\noc get scc\noc get pod orders-abc -o jsonpath=\"{.metadata.annotations.openshift\\.io/scc}\"\n\nEnterprise scenario: Deploy an image that previously assumed a fixed root user.\n\nCommon mistake: Granting anyuid or privileged SCC without investigation.\n\nInterview tip: Design images for arbitrary non-root UIDs.\n\nFollow-up: How do SCCs differ from Pod Security Admission?",
    "detailedAnswerTelugu": "SCC Pod security settings నియంత్రిస్తుంది. Assigned non-root UID తో image run కావాలి. Privileged SCC ఇవ్వడం సాధారణ పరిష్కారం కాదు.\n\nExample (bash):\noc get scc\noc get pod orders-abc -o jsonpath=\"{.metadata.annotations.openshift\\.io/scc}\"",
    "difficulty": "advanced",
    "codeExample": "oc get scc\noc get pod orders-abc -o jsonpath=\"{.metadata.annotations.openshift\\.io/scc}\"",
    "codeLanguage": "bash",
    "realTimeScenario": "Deploy an image that previously assumed a fixed root user.",
    "commonMistakes": [
      "Granting anyuid or privileged SCC without investigation."
    ],
    "interviewTips": [
      "Design images for arbitrary non-root UIDs."
    ],
    "followUpQuestions": [
      "How do SCCs differ from Pod Security Admission?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-080",
    "technology": "kubernetes",
    "topic": "AWS EKS and Red Hat OpenShift",
    "question": "How do you troubleshoot OpenShift application deployments?",
    "shortAnswer": "Inspect Deployment conditions, Pod events, logs, Service endpoints and Route status.",
    "detailedAnswer": "Inspect Deployment conditions, Pod events, logs, Service endpoints and Route status. Check SCC admission failures, image pull permissions and resource quotas. Use oc commands and preserve evidence before restarting workloads.\n\nExample (bash; illustrative excerpt):\noc get deploy,pods,svc,route -n orders\noc get events -n orders --sort-by=.lastTimestamp\noc logs deployment/orders -n orders\n\nEnterprise scenario: Investigate a failed enterprise Java rollout.\n\nCommon mistake: Restarting before collecting diagnostic evidence.\n\nInterview tip: Trace failure from admission to routing.\n\nFollow-up: How do you distinguish SCC denial from image pull failure?",
    "detailedAnswerTelugu": "Deployment conditions, Pod events, logs, Service endpoints, Route status చూడాలి. SCC errors, image permissions, quota కూడా పరిశీలించాలి.\n\nExample (bash):\noc get deploy,pods,svc,route -n orders\noc get events -n orders --sort-by=.lastTimestamp\noc logs deployment/orders -n orders",
    "difficulty": "advanced",
    "codeExample": "oc get deploy,pods,svc,route -n orders\noc get events -n orders --sort-by=.lastTimestamp\noc logs deployment/orders -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Investigate a failed enterprise Java rollout.",
    "commonMistakes": [
      "Restarting before collecting diagnostic evidence."
    ],
    "interviewTips": [
      "Trace failure from admission to routing."
    ],
    "followUpQuestions": [
      "How do you distinguish SCC denial from image pull failure?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-081",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do Kubernetes metrics and Metrics Server work?",
    "shortAnswer": "Metrics Server exposes recent CPU and memory resource metrics for kubectl top and resource-based HPA.",
    "detailedAnswer": "Metrics Server exposes recent CPU and memory resource metrics for kubectl top and resource-based HPA. It is not a long-term monitoring database. Prometheus or another monitoring system stores historical application and infrastructure metrics.\n\nExample (bash; illustrative excerpt):\nkubectl top nodes\nkubectl top pods -n orders --containers\n\nEnterprise scenario: Check resource usage during a traffic spike.\n\nCommon mistake: Using kubectl top as historical evidence.\n\nInterview tip: Distinguish resource metrics from application metrics.\n\nFollow-up: What happens if HPA metrics are unavailable?",
    "detailedAnswerTelugu": "Metrics Server recent CPU, memory metrics ఇస్తుంది. kubectl top, HPA వాడతాయి. Historical monitoring కోసం Prometheus వంటి system అవసరం.\n\nExample (bash):\nkubectl top nodes\nkubectl top pods -n orders --containers",
    "difficulty": "expert",
    "codeExample": "kubectl top nodes\nkubectl top pods -n orders --containers",
    "codeLanguage": "bash",
    "realTimeScenario": "Check resource usage during a traffic spike.",
    "commonMistakes": [
      "Using kubectl top as historical evidence."
    ],
    "interviewTips": [
      "Distinguish resource metrics from application metrics."
    ],
    "followUpQuestions": [
      "What happens if HPA metrics are unavailable?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-082",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do Prometheus and Grafana monitor Kubernetes?",
    "shortAnswer": "Prometheus scrapes configured targets and stores time series.",
    "detailedAnswer": "Prometheus scrapes configured targets and stores time series. Grafana queries data sources for dashboards. Monitor request rate, errors, latency and saturation; control label cardinality and retention. Operator-specific ServiceMonitor resources require the operator.\n\nExample (promql; illustrative excerpt):\nsum(rate(http_server_requests_seconds_count[5m])) by (status)\n\nEnterprise scenario: Monitor Order API error rates by HTTP status.\n\nCommon mistake: Using order IDs as metric labels.\n\nInterview tip: Discuss histogram buckets and cardinality.\n\nFollow-up: How do you calculate p95 latency?",
    "detailedAnswerTelugu": "Prometheus targets నుంచి metrics scrape చేస్తుంది. Grafana dashboards చూపిస్తుంది. Rate, errors, latency, saturation monitor చేయాలి. High cardinality labels తగ్గించాలి.\n\nExample (promql):\nsum(rate(http_server_requests_seconds_count[5m])) by (status)",
    "difficulty": "advanced",
    "codeExample": "sum(rate(http_server_requests_seconds_count[5m])) by (status)",
    "codeLanguage": "promql",
    "realTimeScenario": "Monitor Order API error rates by HTTP status.",
    "commonMistakes": [
      "Using order IDs as metric labels."
    ],
    "interviewTips": [
      "Discuss histogram buckets and cardinality."
    ],
    "followUpQuestions": [
      "How do you calculate p95 latency?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-083",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you monitor Kubernetes using Datadog?",
    "shortAnswer": "Datadog agents and cluster-level integrations collect configured metrics, logs and traces.",
    "detailedAnswer": "Datadog agents and cluster-level integrations collect configured metrics, logs and traces. Application APM requires instrumentation and connectivity. Use consistent service, environment and version tags, control sensitive data and alert on user impact.\n\nExample (bash; illustrative excerpt):\nkubectl get daemonsets -A\nkubectl get deployments -A | grep datadog\n\nEnterprise scenario: Correlate checkout errors with a new deployment version.\n\nCommon mistake: Assuming agent installation automatically instruments every application.\n\nInterview tip: Correlate APM with infrastructure metrics.\n\nFollow-up: How do you limit trace sampling costs?",
    "detailedAnswerTelugu": "Datadog agents metrics, logs, traces collect చేస్తాయి. APM instrumentation అవసరం. service, env, version tags consistent గా ఉంచాలి; sensitive data redact చేయాలి.\n\nExample (bash):\nkubectl get daemonsets -A\nkubectl get deployments -A | grep datadog",
    "difficulty": "advanced",
    "codeExample": "kubectl get daemonsets -A\nkubectl get deployments -A | grep datadog",
    "codeLanguage": "bash",
    "realTimeScenario": "Correlate checkout errors with a new deployment version.",
    "commonMistakes": [
      "Assuming agent installation automatically instruments every application."
    ],
    "interviewTips": [
      "Correlate APM with infrastructure metrics."
    ],
    "followUpQuestions": [
      "How do you limit trace sampling costs?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-084",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How does centralized logging work in Kubernetes?",
    "shortAnswer": "Containers should emit structured logs to stdout and stderr.",
    "detailedAnswer": "Containers should emit structured logs to stdout and stderr. Node agents collect and forward logs to a backend with retention and access controls. Pod-local logs can disappear after eviction or rotation; redact secrets and propagate correlation identifiers.\n\nExample (bash; illustrative excerpt):\nkubectl logs deployment/orders --all-pods=true --all-containers=true -n orders --since=10m\n\nEnterprise scenario: Search errors across checkout replicas.\n\nCommon mistake: Storing all logs only inside container filesystems.\n\nInterview tip: Explain log retention and correlation.\n\nFollow-up: How do you handle multiline Java exceptions?",
    "detailedAnswerTelugu": "Containers structured logs stdout/stderr కి రాయాలి. Node agent backend కి పంపుతుంది. Pod delete అయితే local logs పోవచ్చు. Secrets redact చేసి correlation ID వాడాలి.\n\nExample (bash):\nkubectl logs deployment/orders --all-pods=true --all-containers=true -n orders --since=10m",
    "difficulty": "expert",
    "codeExample": "kubectl logs deployment/orders --all-pods=true --all-containers=true -n orders --since=10m",
    "codeLanguage": "bash",
    "realTimeScenario": "Search errors across checkout replicas.",
    "commonMistakes": [
      "Storing all logs only inside container filesystems."
    ],
    "interviewTips": [
      "Explain log retention and correlation."
    ],
    "followUpQuestions": [
      "How do you handle multiline Java exceptions?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-085",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How does distributed tracing work in Kubernetes?",
    "shortAnswer": "Instrument services to propagate trace context across HTTP and messaging boundaries.",
    "detailedAnswer": "Instrument services to propagate trace context across HTTP and messaging boundaries. OpenTelemetry SDKs or agents produce spans; collectors process and export telemetry. Sampling and asynchronous context propagation affect completeness.\n\nExample (text; illustrative excerpt):\nOTEL_SERVICE_NAME=orders\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector.observability:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc\n\nEnterprise scenario: Find the slow downstream call in checkout.\n\nCommon mistake: Assuming trace IDs propagate automatically through every async boundary.\n\nInterview tip: Explain spans, context and sampling.\n\nFollow-up: How do you correlate logs and traces?",
    "detailedAnswerTelugu": "HTTP, Kafka boundaries లో trace context propagate చేయాలి. OpenTelemetry spans create చేస్తుంది; collector backend కి export చేస్తుంది. Sampling వల్ల అన్ని traces ఉండకపోవచ్చు.\n\nExample (text):\nOTEL_SERVICE_NAME=orders\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector.observability:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc",
    "difficulty": "advanced",
    "codeExample": "OTEL_SERVICE_NAME=orders\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector.observability:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc",
    "codeLanguage": "text",
    "realTimeScenario": "Find the slow downstream call in checkout.",
    "commonMistakes": [
      "Assuming trace IDs propagate automatically through every async boundary."
    ],
    "interviewTips": [
      "Explain spans, context and sampling."
    ],
    "followUpQuestions": [
      "How do you correlate logs and traces?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-086",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you troubleshoot Pending Pods?",
    "shortAnswer": "Pending may indicate unscheduled Pods or setup delays.",
    "detailedAnswer": "Pending may indicate unscheduled Pods or setup delays. Inspect PodScheduled conditions and events for insufficient resources, taints, affinity, unbound PVCs or quota-related creation failures. Check autoscaler and storage topology before changing constraints.\n\nExample (bash; illustrative excerpt):\nkubectl describe pod orders-abc -n orders\nkubectl get pvc -n orders\nkubectl get nodes\n\nEnterprise scenario: Investigate replicas stuck after autoscaling.\n\nCommon mistake: Removing all scheduling constraints without understanding them.\n\nInterview tip: Read scheduler events first.\n\nFollow-up: How does WaitForFirstConsumer affect PVC binding?",
    "detailedAnswerTelugu": "Pending Pod events లో insufficient resources, taints, affinity, PVC binding సమస్యలు చూడాలి. PodScheduled condition ద్వారా scheduling సమస్య గుర్తించాలి.\n\nExample (bash):\nkubectl describe pod orders-abc -n orders\nkubectl get pvc -n orders\nkubectl get nodes",
    "difficulty": "advanced",
    "codeExample": "kubectl describe pod orders-abc -n orders\nkubectl get pvc -n orders\nkubectl get nodes",
    "codeLanguage": "bash",
    "realTimeScenario": "Investigate replicas stuck after autoscaling.",
    "commonMistakes": [
      "Removing all scheduling constraints without understanding them."
    ],
    "interviewTips": [
      "Read scheduler events first."
    ],
    "followUpQuestions": [
      "How does WaitForFirstConsumer affect PVC binding?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-087",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you troubleshoot CrashLoopBackOff?",
    "shortAnswer": "CrashLoopBackOff indicates repeated container failures with restart backoff, not a root cause.",
    "detailedAnswer": "CrashLoopBackOff indicates repeated container failures with restart backoff, not a root cause. Inspect previous logs, exit reason, probes and configuration. Distinguish application exits, OOM and liveness failures; fix the cause and observe rollout.\n\nExample (bash; illustrative excerpt):\nkubectl logs orders-abc -n orders --previous\nkubectl describe pod orders-abc -n orders\n\nEnterprise scenario: Diagnose a Spring Boot startup failure after config changes.\n\nCommon mistake: Deleting Pods repeatedly instead of fixing configuration.\n\nInterview tip: Inspect previous logs before replacement.\n\nFollow-up: How can a liveness probe cause restarts?",
    "detailedAnswerTelugu": "CrashLoopBackOff అంటే container repeatedly fail అవుతోంది. Previous logs, exit reason, probes, config చూడాలి. Root cause fix చేసి rollout observe చేయాలి.\n\nExample (bash):\nkubectl logs orders-abc -n orders --previous\nkubectl describe pod orders-abc -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl logs orders-abc -n orders --previous\nkubectl describe pod orders-abc -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Diagnose a Spring Boot startup failure after config changes.",
    "commonMistakes": [
      "Deleting Pods repeatedly instead of fixing configuration."
    ],
    "interviewTips": [
      "Inspect previous logs before replacement."
    ],
    "followUpQuestions": [
      "How can a liveness probe cause restarts?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-088",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you troubleshoot ImagePullBackOff?",
    "shortAnswer": "Inspect events for invalid image references, missing tags, registry authentication, network or rate-limit errors.",
    "detailedAnswer": "Inspect events for invalid image references, missing tags, registry authentication, network or rate-limit errors. Verify image architecture and registry access. ImagePullBackOff means Kubernetes is delaying retries after pull failures.\n\nExample (bash; illustrative excerpt):\nkubectl describe pod orders-abc -n orders\nkubectl get serviceaccount orders -n orders -o yaml\n\nEnterprise scenario: Recover a rollout referencing an unavailable image.\n\nCommon mistake: Printing registry credentials in incident logs.\n\nInterview tip: Verify immutable artifact availability.\n\nFollow-up: How do imagePullSecrets work?",
    "detailedAnswerTelugu": "ImagePullBackOff లో image name/tag, registry credentials, network errors events లో చూడాలి. Image architecture కూడా verify చేయాలి.\n\nExample (bash):\nkubectl describe pod orders-abc -n orders\nkubectl get serviceaccount orders -n orders -o yaml",
    "difficulty": "advanced",
    "codeExample": "kubectl describe pod orders-abc -n orders\nkubectl get serviceaccount orders -n orders -o yaml",
    "codeLanguage": "bash",
    "realTimeScenario": "Recover a rollout referencing an unavailable image.",
    "commonMistakes": [
      "Printing registry credentials in incident logs."
    ],
    "interviewTips": [
      "Verify immutable artifact availability."
    ],
    "followUpQuestions": [
      "How do imagePullSecrets work?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-089",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you troubleshoot Service and DNS connectivity?",
    "shortAnswer": "Check Service selector, port and EndpointSlices; verify ready backends and DNS resolution from a diagnostic Pod.",
    "detailedAnswer": "Check Service selector, port and EndpointSlices; verify ready backends and DNS resolution from a diagnostic Pod. Then inspect NetworkPolicies, CNI and application listening address. DNS success does not prove TCP or HTTP connectivity.\n\nExample (bash; illustrative excerpt):\nkubectl get endpointslice -n orders -l kubernetes.io/service-name=orders\nkubectl exec -n orders dns-debug -- nslookup orders\nkubectl exec -n orders dns-debug -- curl -v http://orders\n\nEnterprise scenario: Investigate 503 responses from the checkout gateway.\n\nCommon mistake: Assuming DNS resolution proves the backend is healthy.\n\nInterview tip: Follow DNS, TCP, HTTP layers.\n\nFollow-up: Why might a Service have no ready endpoints?",
    "detailedAnswerTelugu": "Service selector, ports, EndpointSlices, ready Pods చూడాలి. Diagnostic Pod నుంచి DNS, TCP test చేయాలి. NetworkPolicy, CNI కూడా check చేయాలి.\n\nExample (bash):\nkubectl get endpointslice -n orders -l kubernetes.io/service-name=orders\nkubectl exec -n orders dns-debug -- nslookup orders\nkubectl exec -n orders dns-debug -- curl -v http://orders",
    "difficulty": "advanced",
    "codeExample": "kubectl get endpointslice -n orders -l kubernetes.io/service-name=orders\nkubectl exec -n orders dns-debug -- nslookup orders\nkubectl exec -n orders dns-debug -- curl -v http://orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Investigate 503 responses from the checkout gateway.",
    "commonMistakes": [
      "Assuming DNS resolution proves the backend is healthy."
    ],
    "interviewTips": [
      "Follow DNS, TCP, HTTP layers."
    ],
    "followUpQuestions": [
      "Why might a Service have no ready endpoints?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-090",
    "technology": "kubernetes",
    "topic": "Monitoring, Logging and Troubleshooting",
    "question": "How do you diagnose node pressure and NotReady nodes?",
    "shortAnswer": "Inspect node conditions, events, leases and infrastructure health.",
    "detailedAnswer": "Inspect node conditions, events, leases and infrastructure health. DiskPressure, MemoryPressure and PIDPressure indicate resource issues; NotReady can reflect kubelet or connectivity failures. Cordon and drain only after evaluating capacity, PDBs and local data.\n\nExample (bash; illustrative excerpt):\nkubectl describe node worker-1\nkubectl get pods -A --field-selector spec.nodeName=worker-1\n\nEnterprise scenario: Investigate a node becoming unavailable during peak traffic.\n\nCommon mistake: Draining multiple nodes without capacity checks.\n\nInterview tip: Distinguish node health from workload health.\n\nFollow-up: What happens to Pods on unreachable nodes?",
    "detailedAnswerTelugu": "Node conditions, events, lease, infrastructure health చూడాలి. DiskPressure, MemoryPressure resource issues. Drain ముందు capacity, PDB, local data పరిశీలించాలి.\n\nExample (bash):\nkubectl describe node worker-1\nkubectl get pods -A --field-selector spec.nodeName=worker-1",
    "difficulty": "expert",
    "codeExample": "kubectl describe node worker-1\nkubectl get pods -A --field-selector spec.nodeName=worker-1",
    "codeLanguage": "bash",
    "realTimeScenario": "Investigate a node becoming unavailable during peak traffic.",
    "commonMistakes": [
      "Draining multiple nodes without capacity checks."
    ],
    "interviewTips": [
      "Distinguish node health from workload health."
    ],
    "followUpQuestions": [
      "What happens to Pods on unreachable nodes?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-091",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do PodDisruptionBudgets protect availability?",
    "shortAnswer": "A PDB limits voluntary disruptions through the eviction API using minAvailable or maxUnavailable.",
    "detailedAnswer": "A PDB limits voluntary disruptions through the eviction API using minAvailable or maxUnavailable. It does not prevent node crashes or all direct deletions, and does not govern Deployment rolling updates. Ensure sufficient replicas and capacity for maintenance.\n\nExample (yaml; illustrative excerpt):\napiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata:\n  name: orders\nspec:\n  minAvailable: 2\n  selector:\n    matchLabels:\n      app: orders\n\nEnterprise scenario: Keep two checkout replicas available during node maintenance.\n\nCommon mistake: Using minAvailable equal to replica count without maintenance planning.\n\nInterview tip: Explain voluntary versus involuntary disruption.\n\nFollow-up: Can PDB prevent a Deployment rollout?",
    "detailedAnswerTelugu": "PDB voluntary eviction సమయంలో availability protect చేస్తుంది. Node crash లేదా direct delete ను ఆపదు. Deployment rollout settings వేరు. Maintenance కి capacity అవసరం.\n\nExample (yaml):\napiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata:\n  name: orders\nspec:\n  minAvailable: 2\n  selector:\n    matchLabels:\n      app: orders",
    "difficulty": "expert",
    "codeExample": "apiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata:\n  name: orders\nspec:\n  minAvailable: 2\n  selector:\n    matchLabels:\n      app: orders",
    "codeLanguage": "yaml",
    "realTimeScenario": "Keep two checkout replicas available during node maintenance.",
    "commonMistakes": [
      "Using minAvailable equal to replica count without maintenance planning."
    ],
    "interviewTips": [
      "Explain voluntary versus involuntary disruption."
    ],
    "followUpQuestions": [
      "Can PDB prevent a Deployment rollout?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-092",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you implement graceful shutdown?",
    "shortAnswer": "On termination, Kubernetes begins endpoint removal and container shutdown concurrently.",
    "detailedAnswer": "On termination, Kubernetes begins endpoint removal and container shutdown concurrently. The application should stop accepting new work, finish bounded in-flight requests and exit before the grace period. Account for load balancer propagation and Kafka consumer shutdown.\n\nExample (properties; illustrative excerpt):\nserver.shutdown=graceful\nspring.lifecycle.timeout-per-shutdown-phase=20s\n\nEnterprise scenario: Avoid dropping checkout requests during rolling updates.\n\nCommon mistake: Assuming endpoint removal is instantaneous.\n\nInterview tip: Coordinate application and Pod termination timeouts.\n\nFollow-up: When is a preStop hook useful?",
    "detailedAnswerTelugu": "Pod termination సమయంలో endpoint removal, shutdown parallel గా జరుగుతాయి. New requests ఆపి in-flight work పూర్తి చేసి grace period లో exit కావాలి. Load balancer propagation కూడా చూడాలి.\n\nExample (properties):\nserver.shutdown=graceful\nspring.lifecycle.timeout-per-shutdown-phase=20s",
    "difficulty": "expert",
    "codeExample": "server.shutdown=graceful\nspring.lifecycle.timeout-per-shutdown-phase=20s",
    "codeLanguage": "properties",
    "realTimeScenario": "Avoid dropping checkout requests during rolling updates.",
    "commonMistakes": [
      "Assuming endpoint removal is instantaneous."
    ],
    "interviewTips": [
      "Coordinate application and Pod termination timeouts."
    ],
    "followUpQuestions": [
      "When is a preStop hook useful?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-093",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you design high availability across zones?",
    "shortAnswer": "Spread replicas and worker capacity across zones, use readiness and appropriate disruption budgets, and ensure the data tier tolerates zone loss.",
    "detailedAnswer": "Spread replicas and worker capacity across zones, use readiness and appropriate disruption budgets, and ensure the data tier tolerates zone loss. Reserve capacity for surviving zones and test failover. Multiple replicas on one node do not provide zone resilience.\n\nExample (bash; illustrative excerpt):\nkubectl get nodes -L topology.kubernetes.io/zone\nkubectl get pods -n orders -o wide\n\nEnterprise scenario: Keep checkout available after an availability zone outage.\n\nCommon mistake: Spreading Pods but keeping a single-zone database.\n\nInterview tip: Discuss end-to-end failure domains.\n\nFollow-up: How do zonal volumes affect failover?",
    "detailedAnswerTelugu": "Replicas, nodes zones మధ్య distribute చేయాలి. Data tier కూడా zone failure tolerate చేయాలి. Surviving zones లో capacity reserve చేసి failover test చేయాలి.\n\nExample (bash):\nkubectl get nodes -L topology.kubernetes.io/zone\nkubectl get pods -n orders -o wide",
    "difficulty": "expert",
    "codeExample": "kubectl get nodes -L topology.kubernetes.io/zone\nkubectl get pods -n orders -o wide",
    "codeLanguage": "bash",
    "realTimeScenario": "Keep checkout available after an availability zone outage.",
    "commonMistakes": [
      "Spreading Pods but keeping a single-zone database."
    ],
    "interviewTips": [
      "Discuss end-to-end failure domains."
    ],
    "followUpQuestions": [
      "How do zonal volumes affect failover?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-094",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you plan backup and disaster recovery?",
    "shortAnswer": "Define RPO and RTO for each service.",
    "detailedAnswer": "Define RPO and RTO for each service. Back up Kubernetes configuration and application data separately; use application-consistent database backups and test restores. Managed control plane backups do not replace workload backups. Protect backup credentials and copies.\n\nExample (bash; illustrative excerpt):\nvelero backup get\nvelero restore get\n\nEnterprise scenario: Recover an order platform after accidental namespace deletion.\n\nCommon mistake: Assuming volume snapshots alone are application-consistent.\n\nInterview tip: Measure restore time and data loss.\n\nFollow-up: How do you test cross-region recovery?",
    "detailedAnswerTelugu": "ప్రతి service కి RPO, RTO నిర్ణయించాలి. Kubernetes config, database data వేర్వేరుగా backup చేయాలి. Restore test తప్పనిసరి. Backup credentials protect చేయాలి.\n\nExample (bash):\nvelero backup get\nvelero restore get",
    "difficulty": "expert",
    "codeExample": "velero backup get\nvelero restore get",
    "codeLanguage": "bash",
    "realTimeScenario": "Recover an order platform after accidental namespace deletion.",
    "commonMistakes": [
      "Assuming volume snapshots alone are application-consistent."
    ],
    "interviewTips": [
      "Measure restore time and data loss."
    ],
    "followUpQuestions": [
      "How do you test cross-region recovery?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-095",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you manage Kubernetes costs?",
    "shortAnswer": "Measure utilization against requests, right-size workloads and use suitable node types.",
    "detailedAnswer": "Measure utilization against requests, right-size workloads and use suitable node types. Consolidate safely and use interruptible capacity only for tolerant workloads. Include storage, network, logging and idle headroom in cost analysis.\n\nExample (bash; illustrative excerpt):\nkubectl top nodes\nkubectl top pods -A --containers\n\nEnterprise scenario: Reduce idle reporting capacity without affecting checkout.\n\nCommon mistake: Optimizing CPU cost while ignoring cross-zone traffic and logs.\n\nInterview tip: Balance cost against SLO and interruption risk.\n\nFollow-up: How do you allocate shared cluster costs?",
    "detailedAnswerTelugu": "Requests తో actual utilization compare చేసి right-size చేయాలి. Suitable nodes, safe consolidation వాడాలి. Spot capacity interruption tolerate చేసే workloads కి మాత్రమే. Storage, network costs కూడా చూడాలి.\n\nExample (bash):\nkubectl top nodes\nkubectl top pods -A --containers",
    "difficulty": "expert",
    "codeExample": "kubectl top nodes\nkubectl top pods -A --containers",
    "codeLanguage": "bash",
    "realTimeScenario": "Reduce idle reporting capacity without affecting checkout.",
    "commonMistakes": [
      "Optimizing CPU cost while ignoring cross-zone traffic and logs."
    ],
    "interviewTips": [
      "Balance cost against SLO and interruption risk."
    ],
    "followUpQuestions": [
      "How do you allocate shared cluster costs?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-096",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you run Kafka consumers on Kubernetes?",
    "shortAnswer": "Use consumer groups and partition-aware scaling.",
    "detailedAnswer": "Use consumer groups and partition-aware scaling. More consumers than partitions in a group cannot increase active partition parallelism. Scale using lag and processing time, manage graceful shutdown and commit offsets only after appropriate processing. Idempotency handles duplicates.\n\nExample (bash; illustrative excerpt):\nkubectl scale deployment/order-consumer --replicas=6 -n orders\nkubectl rollout status deployment/order-consumer -n orders\n\nEnterprise scenario: Process a backlog of order events with bounded database load.\n\nCommon mistake: Scaling consumers without considering partition count.\n\nInterview tip: Discuss rebalances, lag and delivery semantics.\n\nFollow-up: How does KEDA scale from Kafka lag?",
    "detailedAnswerTelugu": "Kafka consumer group లో partitions కంటే ఎక్కువ consumers ఉంటే extra consumers idle అవుతాయి. Lag ఆధారంగా scale చేయాలి. Processing తర్వాత offsets commit చేసి duplicates కోసం idempotency వాడాలి.\n\nExample (bash):\nkubectl scale deployment/order-consumer --replicas=6 -n orders\nkubectl rollout status deployment/order-consumer -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl scale deployment/order-consumer --replicas=6 -n orders\nkubectl rollout status deployment/order-consumer -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Process a backlog of order events with bounded database load.",
    "commonMistakes": [
      "Scaling consumers without considering partition count."
    ],
    "interviewTips": [
      "Discuss rebalances, lag and delivery semantics."
    ],
    "followUpQuestions": [
      "How does KEDA scale from Kafka lag?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-097",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do service meshes help microservices?",
    "shortAnswer": "A mesh can provide workload-to-workload mTLS, traffic policy and telemetry through its data plane.",
    "detailedAnswer": "A mesh can provide workload-to-workload mTLS, traffic policy and telemetry through its data plane. It adds operational complexity, resource cost and possible latency. Application authorization and business-level retry safety remain necessary.\n\nExample (bash; illustrative excerpt):\nkubectl get pods -n orders\nkubectl get namespaces --show-labels\n\nEnterprise scenario: Standardize service-to-service encryption for payment APIs.\n\nCommon mistake: Assuming mTLS alone authorizes business operations.\n\nInterview tip: Compare mesh benefits against operational cost.\n\nFollow-up: How do sidecar and ambient data planes differ?",
    "detailedAnswerTelugu": "Service mesh mTLS, traffic policy, telemetry అందించగలదు. Extra complexity, resource cost ఉంటాయి. Business authorization, safe retries application లో కూడా అవసరం.\n\nExample (bash):\nkubectl get pods -n orders\nkubectl get namespaces --show-labels",
    "difficulty": "expert",
    "codeExample": "kubectl get pods -n orders\nkubectl get namespaces --show-labels",
    "codeLanguage": "bash",
    "realTimeScenario": "Standardize service-to-service encryption for payment APIs.",
    "commonMistakes": [
      "Assuming mTLS alone authorizes business operations."
    ],
    "interviewTips": [
      "Compare mesh benefits against operational cost."
    ],
    "followUpQuestions": [
      "How do sidecar and ambient data planes differ?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-098",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you manage Kubernetes API extensions and operators?",
    "shortAnswer": "CRDs define custom resource schemas and expose them through the API.",
    "detailedAnswer": "CRDs define custom resource schemas and expose them through the API. Operators reconcile custom resources into managed state using controllers. Plan version conversion, status conditions, finalizers and RBAC; deleting a CRD can remove its custom resources.\n\nExample (bash; illustrative excerpt):\nkubectl get crd\nkubectl api-resources\nkubectl explain deployment.status\n\nEnterprise scenario: Automate lifecycle of a managed database or monitoring stack.\n\nCommon mistake: Treating a CRD alone as an automation controller.\n\nInterview tip: Explain reconciliation and finalizers.\n\nFollow-up: How do you upgrade a CRD safely?",
    "detailedAnswerTelugu": "CRD custom resource schema define చేస్తుంది. Operator controller desired state reconcile చేస్తుంది. Version conversion, status, finalizers, RBAC plan చేయాలి.\n\nExample (bash):\nkubectl get crd\nkubectl api-resources\nkubectl explain deployment.status",
    "difficulty": "expert",
    "codeExample": "kubectl get crd\nkubectl api-resources\nkubectl explain deployment.status",
    "codeLanguage": "bash",
    "realTimeScenario": "Automate lifecycle of a managed database or monitoring stack.",
    "commonMistakes": [
      "Treating a CRD alone as an automation controller."
    ],
    "interviewTips": [
      "Explain reconciliation and finalizers."
    ],
    "followUpQuestions": [
      "How do you upgrade a CRD safely?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-099",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How do you manage production incidents in Kubernetes?",
    "shortAnswer": "Establish impact and timeline, check recent changes, inspect service metrics, events and traces, then isolate the failing layer.",
    "detailedAnswer": "Establish impact and timeline, check recent changes, inspect service metrics, events and traces, then isolate the failing layer. Mitigate with a tested rollback or traffic reduction when appropriate. Preserve evidence and follow with a blameless review and corrective actions.\n\nExample (bash; illustrative excerpt):\nkubectl rollout history deployment/orders -n orders\nkubectl get events -n orders --sort-by=.lastTimestamp\nkubectl get pods -n orders -o wide\n\nEnterprise scenario: Respond to checkout error rates after a release.\n\nCommon mistake: Restarting everything before identifying impact.\n\nInterview tip: Separate mitigation from root-cause analysis.\n\nFollow-up: When is rollback unsafe?",
    "detailedAnswerTelugu": "ముందుగా user impact, timeline, recent changes చూడాలి. Metrics, events, traces ద్వారా failing layer గుర్తించాలి. Safe rollback లేదా traffic reduction చేయాలి. Evidence preserve చేసి RCA చేయాలి.\n\nExample (bash):\nkubectl rollout history deployment/orders -n orders\nkubectl get events -n orders --sort-by=.lastTimestamp\nkubectl get pods -n orders -o wide",
    "difficulty": "expert",
    "codeExample": "kubectl rollout history deployment/orders -n orders\nkubectl get events -n orders --sort-by=.lastTimestamp\nkubectl get pods -n orders -o wide",
    "codeLanguage": "bash",
    "realTimeScenario": "Respond to checkout error rates after a release.",
    "commonMistakes": [
      "Restarting everything before identifying impact."
    ],
    "interviewTips": [
      "Separate mitigation from root-cause analysis."
    ],
    "followUpQuestions": [
      "When is rollback unsafe?"
    ],
    "isPublished": true
  },
  {
    "id": "KUBERNETES-100",
    "technology": "kubernetes",
    "topic": "Enterprise Architecture and Production Scenarios",
    "question": "How would you design an enterprise Order Management platform on Kubernetes?",
    "shortAnswer": "Use a managed multi-zone cluster with private worker networking, controlled ingress, independently deployed services and managed durable data stores.",
    "detailedAnswer": "Use a managed multi-zone cluster with private worker networking, controlled ingress, independently deployed services and managed durable data stores. Combine resource requests, HPA, topology spread, readiness, PDBs, least-privilege identities and network policies. Publish order events through a transactional outbox, use idempotent consumers, and enforce latency and error SLOs. GitOps promotes immutable images; telemetry and tested recovery close the operational loop.\n\nExample (bash; illustrative excerpt):\nkubectl get deploy,svc,hpa,pdb -n orders\nkubectl get networkpolicy -n orders\nkubectl rollout status deployment/orders -n orders\n\nEnterprise scenario: Design a resilient checkout platform with independently scalable inventory and payment services.\n\nCommon mistake: Assuming Kubernetes solves distributed transactions or data durability.\n\nInterview tip: Explain trade-offs, SLOs, failure domains and recovery before choosing tools.\n\nFollow-up: How would the system behave if payment or an entire zone fails?",
    "detailedAnswerTelugu": "Multi-zone managed cluster, private workers, controlled ingress, independent services, durable database వాడాలి. HPA, readiness, PDB, topology spread తో availability పెంచాలి. Outbox ద్వారా Kafka events publish చేసి idempotent consumers వాడాలి. GitOps, telemetry, backup restore tests తో production reliability maintain చేయాలి.\n\nExample (bash):\nkubectl get deploy,svc,hpa,pdb -n orders\nkubectl get networkpolicy -n orders\nkubectl rollout status deployment/orders -n orders",
    "difficulty": "expert",
    "codeExample": "kubectl get deploy,svc,hpa,pdb -n orders\nkubectl get networkpolicy -n orders\nkubectl rollout status deployment/orders -n orders",
    "codeLanguage": "bash",
    "realTimeScenario": "Design a resilient checkout platform with independently scalable inventory and payment services.",
    "commonMistakes": [
      "Assuming Kubernetes solves distributed transactions or data durability."
    ],
    "interviewTips": [
      "Explain trade-offs, SLOs, failure domains and recovery before choosing tools."
    ],
    "followUpQuestions": [
      "How would the system behave if payment or an entire zone fails?"
    ],
    "isPublished": true
  }
];
