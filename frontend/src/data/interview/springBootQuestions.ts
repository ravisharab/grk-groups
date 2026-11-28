import type { InterviewQuestion } from '../../types/interview';

export const springBootQuestions: InterviewQuestion[] = [
  {
    "id": "SPRING-BOOT-001",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What is the Spring Framework?",
    "shortAnswer": "A modular Java framework for building applications using dependency injection and infrastructure abstractions.",
    "detailedAnswer": "Spring manages application objects and their dependencies through a container. Its modules provide transaction management, web MVC, data access and integration. Business classes can remain ordinary Java objects instead of inheriting framework base classes. Spring Boot builds on Spring; it is not a replacement for the framework.\n\nExample (Java; illustrative excerpt):\n@Service\nclass OrderService {\n    String status() { return \"READY\"; }\n}\n\nEnterprise scenario: An order service contains business rules while Spring manages its lifecycle.\n\nCommon mistake: Do not confuse Spring Framework with Spring Boot.",
    "detailedAnswerTelugu": "Spring Framework అనేది Java applications నిర్మించడానికి ఉపయోగించే modular framework. Container objects ను సృష్టించి వాటికి అవసరమైన dependencies అందిస్తుంది. Transaction management, web MVC వంటి infrastructure పనులను Spring చూసుకుంటుంది. Business logic సాధారణ Java classes లో రాయవచ్చు. Spring Boot అనేది Spring పైన నిర్మించిన framework support.\n\nJava example:\n@Service\nclass OrderService {\n    String status() { return \"READY\"; }\n}",
    "difficulty": "beginner",
    "codeExample": "@Service\nclass OrderService {\n    String status() { return \"READY\"; }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "An order service contains business rules while Spring manages its lifecycle.",
    "commonMistakes": [
      "Do not confuse Spring Framework with Spring Boot."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How does the container discover this service?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-002",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What are IoC and Dependency Injection?",
    "shortAnswer": "IoC delegates object management to the container; DI supplies an object with its dependencies.",
    "detailedAnswer": "Inversion of Control changes who controls object creation and wiring. Dependency Injection is one technique for implementing IoC: instead of constructing a repository inside a service, the service receives it. Spring resolves dependencies from registered beans. This reduces coupling to concrete implementations and allows isolated unit testing.\n\nExample (Java; illustrative excerpt):\n@Service\nclass OrderService {\n    private final OrderRepository repository;\n    OrderService(OrderRepository repository) {\n        this.repository = repository;\n    }\n}\n\nEnterprise scenario: An order service can receive a fake repository in a unit test without starting Spring.\n\nCommon mistake: DI does not require every Java object to be a Spring bean.",
    "detailedAnswerTelugu": "IoC అంటే objects creation మరియు wiring బాధ్యతను application నుంచి container కు ఇవ్వడం. DI అంటే service తన repository ని new చేయకుండా బయట నుంచి పొందడం. Spring registered beans నుంచి dependency ని resolve చేస్తుంది. దీనివల్ల concrete implementation పై coupling తగ్గి unit testing సులభమవుతుంది.\n\nJava example:\n@Service\nclass OrderService {\n    private final OrderRepository repository;\n    OrderService(OrderRepository repository) {\n        this.repository = repository;\n    }\n}",
    "difficulty": "beginner",
    "codeExample": "@Service\nclass OrderService {\n    private final OrderRepository repository;\n    OrderService(OrderRepository repository) {\n        this.repository = repository;\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "An order service can receive a fake repository in a unit test without starting Spring.",
    "commonMistakes": [
      "DI does not require every Java object to be a Spring bean."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How is constructor injection different from service locator?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-003",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "Why prefer constructor injection?",
    "shortAnswer": "It makes required dependencies explicit and supports immutable fields and simple tests.",
    "detailedAnswer": "Constructor injection establishes mandatory dependencies when the object is created. Fields can be final, and tests can instantiate the class directly. Spring automatically uses a single constructor without @Autowired. Setter injection is useful for genuinely optional dependencies, while field injection hides requirements and makes plain unit testing harder.\n\nExample (Java; illustrative excerpt):\n@Service\nclass PaymentService {\n    private final PaymentGateway gateway;\n    PaymentService(PaymentGateway gateway) { this.gateway = gateway; }\n}\n\nEnterprise scenario: A payment service cannot be constructed without its required gateway.\n\nCommon mistake: Do not use field injection merely to hide a long list of dependencies; reconsider class responsibilities.",
    "detailedAnswerTelugu": "Constructor injection వల్ల object create అయ్యేటప్పుడే అవసరమైన dependencies అందుతాయి. Fields ను final గా ఉంచవచ్చు. ఒకే constructor ఉంటే @Autowired అవసరం లేదు. Optional dependency కోసం setter ఉపయోగించవచ్చు. Field injection వల్ల dependencies బయటకు స్పష్టంగా కనిపించవు; testing కూడా కష్టమవుతుంది.\n\nJava example:\n@Service\nclass PaymentService {\n    private final PaymentGateway gateway;\n    PaymentService(PaymentGateway gateway) { this.gateway = gateway; }\n}",
    "difficulty": "beginner",
    "codeExample": "@Service\nclass PaymentService {\n    private final PaymentGateway gateway;\n    PaymentService(PaymentGateway gateway) { this.gateway = gateway; }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A payment service cannot be constructed without its required gateway.",
    "commonMistakes": [
      "Do not use field injection merely to hide a long list of dependencies; reconsider class responsibilities."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "What happens with circular constructor dependencies?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-004",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What is a Spring bean?",
    "shortAnswer": "An object registered with and managed by a Spring IoC container.",
    "detailedAnswer": "A bean is represented by a bean definition containing metadata such as type, scope and factory method. The container creates or obtains the object, injects dependencies and applies lifecycle callbacks and post-processors. An object created with new outside the container is not automatically a bean. A @Bean method can register third-party classes.\n\nExample (Java; illustrative excerpt):\n@Configuration\nclass TimeConfig {\n    @Bean\n    Clock clock() { return Clock.systemUTC(); }\n}\n\nEnterprise scenario: Inject a Clock into a billing service and substitute a fixed clock during tests.\n\nCommon mistake: Do not assume every object of a class annotated @Component is container-managed.",
    "detailedAnswerTelugu": "Spring bean అంటే container నిర్వహించే object. Bean definition లో type, scope, factory method వంటి metadata ఉంటుంది. Container object ను తయారు చేసి dependencies inject చేసి lifecycle callbacks అమలు చేస్తుంది. బయట new తో తయారు చేసిన object ఆటోమేటిక్ గా bean కాదు. Third-party class ను @Bean ద్వారా register చేయవచ్చు.\n\nJava example:\n@Configuration\nclass TimeConfig {\n    @Bean\n    Clock clock() { return Clock.systemUTC(); }\n}",
    "difficulty": "beginner",
    "codeExample": "@Configuration\nclass TimeConfig {\n    @Bean\n    Clock clock() { return Clock.systemUTC(); }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Inject a Clock into a billing service and substitute a fixed clock during tests.",
    "commonMistakes": [
      "Do not assume every object of a class annotated @Component is container-managed."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "What is a bean definition?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-005",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What is ApplicationContext?",
    "shortAnswer": "The Spring container interface providing bean access and application infrastructure services.",
    "detailedAnswer": "ApplicationContext extends BeanFactory capabilities with events, resource loading, environment access and message resolution. It typically pre-instantiates non-lazy singleton beans during refresh. Application code should normally receive dependencies through DI rather than call getBean repeatedly. Context boundaries determine which bean definitions are visible.\n\nExample (Java; illustrative excerpt):\ntry (var context = new AnnotationConfigApplicationContext(TimeConfig.class)) {\n    Clock clock = context.getBean(Clock.class);\n    System.out.println(clock.instant());\n}\n\nEnterprise scenario: A standalone batch application can initialize a context and close it after processing.\n\nCommon mistake: Avoid turning ApplicationContext into a global service locator.",
    "detailedAnswerTelugu": "ApplicationContext అనేది Spring container interface. BeanFactory features తో పాటు events, resources, environment, messages అందిస్తుంది. సాధారణంగా refresh సమయంలో lazy కాని singleton beans తయారవుతాయి. ప్రతి service లో getBean పిలవడం కంటే DI ఉపయోగించడం మంచిది. Context boundary ఆధారంగా beans visibility ఉంటుంది.\n\nJava example:\ntry (var context = new AnnotationConfigApplicationContext(TimeConfig.class)) {\n    Clock clock = context.getBean(Clock.class);\n    System.out.println(clock.instant());\n}",
    "difficulty": "intermediate",
    "codeExample": "try (var context = new AnnotationConfigApplicationContext(TimeConfig.class)) {\n    Clock clock = context.getBean(Clock.class);\n    System.out.println(clock.instant());\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A standalone batch application can initialize a context and close it after processing.",
    "commonMistakes": [
      "Avoid turning ApplicationContext into a global service locator."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How does BeanFactory differ from ApplicationContext?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-006",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "How do @Component, @Service, @Repository and @Controller differ?",
    "shortAnswer": "They are component stereotypes expressing different architectural roles.",
    "detailedAnswer": "All four can be discovered by component scanning. @Service marks business logic, @Repository marks persistence components and can participate in persistence exception translation when configured, and @Controller marks MVC handlers. @RestController combines @Controller and @ResponseBody. Stereotypes improve architecture readability; they do not automatically enforce layering.\n\nExample (Java; illustrative excerpt):\n@RestController\nclass StatusController {\n    @GetMapping(\"/status\")\n    String status() { return \"UP\"; }\n}\n\nEnterprise scenario: A retail API separates HTTP handling, pricing logic and database access into distinct components.\n\nCommon mistake: @Service alone does not start a transaction.",
    "detailedAnswerTelugu": "ఈ annotations అన్నీ component scanning ద్వారా beans గా register కావచ్చు. @Service business logic కోసం, @Repository persistence layer కోసం, @Controller MVC requests కోసం ఉపయోగిస్తారు. సరైన configuration ఉంటే @Repository persistence exceptions ను translate చేయడంలో సహాయపడుతుంది. @RestController అంటే @Controller మరియు @ResponseBody కలయిక.\n\nJava example:\n@RestController\nclass StatusController {\n    @GetMapping(\"/status\")\n    String status() { return \"UP\"; }\n}",
    "difficulty": "beginner",
    "codeExample": "@RestController\nclass StatusController {\n    @GetMapping(\"/status\")\n    String status() { return \"UP\"; }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A retail API separates HTTP handling, pricing logic and database access into distinct components.",
    "commonMistakes": [
      "@Service alone does not start a transaction."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "When should you use @RestController instead of @Controller?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-007",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "How do @Bean and @Component differ?",
    "shortAnswer": "@Bean registers a factory method result; @Component registers a scanned class.",
    "detailedAnswer": "Use @Component for classes you own and want Spring to discover. Use @Bean when construction requires explicit configuration or when a library class cannot be annotated. In full @Configuration mode, calls between @Bean methods are intercepted to respect container semantics; with proxyBeanMethods=false, use method parameters for dependencies instead.\n\nExample (Java; illustrative excerpt):\n@Configuration(proxyBeanMethods = false)\nclass ClientConfig {\n    @Bean\n    RestClient restClient(RestClient.Builder builder) {\n        return builder.build();\n    }\n}\n\nEnterprise scenario: Configure an HTTP client centrally instead of constructing one in each service.\n\nCommon mistake: Do not assume direct calls between lite @Bean methods return managed singletons.",
    "detailedAnswerTelugu": "మీరు రాసిన class ను scanning ద్వారా register చేయడానికి @Component ఉపయోగించవచ్చు. Library class లేదా ప్రత్యేక configuration తో object తయారు చేయడానికి @Bean ఉపయోగిస్తారు. Full @Configuration లో bean methods మధ్య calls ను Spring intercept చేస్తుంది. proxyBeanMethods=false అయితే dependencies ను method parameters ద్వారా ఇవ్వడం మంచిది.\n\nJava example:\n@Configuration(proxyBeanMethods = false)\nclass ClientConfig {\n    @Bean\n    RestClient restClient(RestClient.Builder builder) {\n        return builder.build();\n    }\n}",
    "difficulty": "intermediate",
    "codeExample": "@Configuration(proxyBeanMethods = false)\nclass ClientConfig {\n    @Bean\n    RestClient restClient(RestClient.Builder builder) {\n        return builder.build();\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Configure an HTTP client centrally instead of constructing one in each service.",
    "commonMistakes": [
      "Do not assume direct calls between lite @Bean methods return managed singletons."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "What does proxyBeanMethods=false change?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-008",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "How does component scanning work?",
    "shortAnswer": "Spring discovers eligible classes in configured packages and registers bean definitions.",
    "detailedAnswer": "@ComponentScan searches its base packages for component stereotypes and eligible candidates. @SpringBootApplication includes component scanning starting from its package by default. Registration precedes ordinary singleton creation. Classes outside the scan boundary need explicit import, bean registration or a configured scan. Keep the main class in a common root package.\n\nExample (Java; illustrative excerpt):\npackage com.acme.orders;\n\n@SpringBootApplication\npublic class OrdersApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(OrdersApplication.class, args);\n    }\n}\n\nEnterprise scenario: Place controllers and services under com.acme.orders so the application discovers them.\n\nCommon mistake: Avoid scanning the entire classpath or placing the main class in the default package.",
    "detailedAnswerTelugu": "@ComponentScan ఇచ్చిన packages లో component annotations ఉన్న classes ను గుర్తించి bean definitions register చేస్తుంది. @SpringBootApplication default గా తన package నుంచి scanning ప్రారంభిస్తుంది. Scan బయట ఉన్న classes కోసం @Import లేదా explicit registration అవసరం. Main class ను common root package లో ఉంచడం మంచిది.\n\nJava example:\npackage com.acme.orders;\n\n@SpringBootApplication\npublic class OrdersApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(OrdersApplication.class, args);\n    }\n}",
    "difficulty": "beginner",
    "codeExample": "package com.acme.orders;\n\n@SpringBootApplication\npublic class OrdersApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(OrdersApplication.class, args);\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Place controllers and services under com.acme.orders so the application discovers them.",
    "commonMistakes": [
      "Avoid scanning the entire classpath or placing the main class in the default package."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How would you register a component outside the root package?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-009",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "How do @Primary and @Qualifier resolve ambiguity?",
    "shortAnswer": "@Primary supplies a preferred candidate; @Qualifier narrows candidates for a particular injection point.",
    "detailedAnswer": "When multiple beans implement the same interface, type alone may not identify a unique candidate. @Primary establishes a preference among eligible candidates. A qualifier explicitly narrows the candidates before selection. If ambiguity remains, Spring can throw NoUniqueBeanDefinitionException. Prefer meaningful qualifiers for business-specific choices.\n\nExample (Java; illustrative excerpt):\n@Service\nclass CheckoutService {\n    private final PaymentGateway gateway;\n    CheckoutService(@Qualifier(\"cardGateway\") PaymentGateway gateway) {\n        this.gateway = gateway;\n    }\n}\n\nEnterprise scenario: Checkout selects the card gateway while another service selects a bank-transfer gateway.\n\nCommon mistake: A qualifier must match an eligible bean; it is not a runtime routing mechanism.",
    "detailedAnswerTelugu": "ఒక interface కు అనేక beans ఉంటే type ద్వారా మాత్రమే ఏ bean inject చేయాలో తెలియకపోవచ్చు. @Primary default preference ఇస్తుంది. @Qualifier injection point వద్ద అవసరమైన candidate ను స్పష్టంగా ఎంచుకోవడానికి ఉపయోగపడుతుంది. Ambiguity మిగిలితే NoUniqueBeanDefinitionException రావచ్చు.\n\nJava example:\n@Service\nclass CheckoutService {\n    private final PaymentGateway gateway;\n    CheckoutService(@Qualifier(\"cardGateway\") PaymentGateway gateway) {\n        this.gateway = gateway;\n    }\n}",
    "difficulty": "intermediate",
    "codeExample": "@Service\nclass CheckoutService {\n    private final PaymentGateway gateway;\n    CheckoutService(@Qualifier(\"cardGateway\") PaymentGateway gateway) {\n        this.gateway = gateway;\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Checkout selects the card gateway while another service selects a bank-transfer gateway.",
    "commonMistakes": [
      "A qualifier must match an eligible bean; it is not a runtime routing mechanism."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How can you inject all implementations of an interface?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-010",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What are Spring bean scopes?",
    "shortAnswer": "Scopes define the lifetime and sharing of managed bean instances.",
    "detailedAnswer": "Singleton is the default: one instance per bean definition per container. Prototype creates a new instance when requested from the container. Web-aware contexts also support request, session and application scopes. Injecting a prototype directly into a singleton resolves it once; use ObjectProvider or a scoped proxy for repeated resolution.\n\nExample (Java; illustrative excerpt):\n@Component\n@Scope(\"prototype\")\nclass ReportBuilder {}\n\n@Service\nclass ReportService {\n    private final ObjectProvider<ReportBuilder> builders;\n    ReportService(ObjectProvider<ReportBuilder> builders) { this.builders = builders; }\n    ReportBuilder newReport() { return builders.getObject(); }\n}\n\nEnterprise scenario: Each report operation receives a fresh mutable builder.\n\nCommon mistake: Singleton scope does not imply thread safety.",
    "detailedAnswerTelugu": "Scope అనేది bean ఎంతకాలం ఉంటుంది, ఎక్కడ share అవుతుంది అనే విషయాన్ని నిర్ణయిస్తుంది. Singleton అంటే ప్రతి container లో ప్రతి bean definition కు ఒక instance. Prototype ను container నుంచి అడిగినప్పుడు కొత్త instance వస్తుంది. Web applications లో request, session scopes కూడా ఉంటాయి. Singleton లో prototype ను నేరుగా inject చేస్తే ఒక్కసారి మాత్రమే resolve అవుతుంది; ObjectProvider ఉపయోగించవచ్చు.\n\nJava example:\n@Component\n@Scope(\"prototype\")\nclass ReportBuilder {}\n\n@Service\nclass ReportService {\n    private final ObjectProvider<ReportBuilder> builders;\n    ReportService(ObjectProvider<ReportBuilder> builders) { this.builders = builders; }\n    ReportBuilder newReport() { return builders.getObject(); }\n}",
    "difficulty": "intermediate",
    "codeExample": "@Component\n@Scope(\"prototype\")\nclass ReportBuilder {}\n\n@Service\nclass ReportService {\n    private final ObjectProvider<ReportBuilder> builders;\n    ReportService(ObjectProvider<ReportBuilder> builders) { this.builders = builders; }\n    ReportBuilder newReport() { return builders.getObject(); }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Each report operation receives a fresh mutable builder.",
    "commonMistakes": [
      "Singleton scope does not imply thread safety."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "Who destroys prototype beans?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-011",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What is the Spring bean lifecycle?",
    "shortAnswer": "Creation, dependency population, initialization, use and destruction for managed beans.",
    "detailedAnswer": "After instantiation and dependency population, applicable aware callbacks and BeanPostProcessors run around initialization. @PostConstruct runs before InitializingBean.afterPropertiesSet and a custom init method, when configured. Post-processors may wrap the bean in a proxy. On normal context shutdown, managed singleton destruction callbacks run; prototype destruction is not automatically managed.\n\nExample (Java; illustrative excerpt):\n@Component\nclass ResourceManager {\n    @PostConstruct\n    void initialize() { /* initialize resource */ }\n    @PreDestroy\n    void close() { /* release resource */ }\n}\n\nEnterprise scenario: A managed resource releases its handles when the application shuts down normally.\n\nCommon mistake: Use jakarta.annotation imports in modern Spring; do not rely on shutdown callbacks after SIGKILL.",
    "detailedAnswerTelugu": "Bean create అయిన తర్వాత dependencies inject అవుతాయి. Initialization సమయంలో aware callbacks మరియు BeanPostProcessors పనిచేస్తాయి. సాధారణంగా @PostConstruct తర్వాత afterPropertiesSet, custom init method అమలవుతాయి. Post-processors proxy తయారు చేయవచ్చు. Context సరిగ్గా close అయినప్పుడు singleton destruction callbacks అమలవుతాయి; prototype destruction ను Spring ఆటోమేటిక్ గా నిర్వహించదు.\n\nJava example:\n@Component\nclass ResourceManager {\n    @PostConstruct\n    void initialize() { /* initialize resource */ }\n    @PreDestroy\n    void close() { /* release resource */ }\n}",
    "difficulty": "intermediate",
    "codeExample": "@Component\nclass ResourceManager {\n    @PostConstruct\n    void initialize() { /* initialize resource */ }\n    @PreDestroy\n    void close() { /* release resource */ }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A managed resource releases its handles when the application shuts down normally.",
    "commonMistakes": [
      "Use jakarta.annotation imports in modern Spring; do not rely on shutdown callbacks after SIGKILL."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "When are AOP proxies created?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-012",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "Are singleton Spring beans thread-safe?",
    "shortAnswer": "No. Thread safety depends on the implementation and shared mutable state.",
    "detailedAnswer": "A singleton service may be invoked concurrently by many request threads. Stateless services with immutable dependencies are easier to reason about, but dependencies must also be safe for their usage. Request-specific data belongs in local variables or appropriate scopes. A mutable field used to store the current customer can leak data across requests.\n\nExample (Java; illustrative excerpt):\n@Service\nclass PriceService {\n    BigDecimal total(BigDecimal price, int quantity) {\n        return price.multiply(BigDecimal.valueOf(quantity));\n    }\n}\n\nEnterprise scenario: Concurrent checkout requests calculate totals without sharing customer-specific mutable fields.\n\nCommon mistake: Do not fix every race with synchronized; first eliminate unnecessary shared state.",
    "detailedAnswerTelugu": "Singleton service ను అనేక request threads ఒకేసారి ఉపయోగించవచ్చు. Singleton అయినంత మాత్రాన thread-safe కాదు. Request-specific data ను local variables లో ఉంచాలి. Current customer ను instance field లో ఉంచితే ఇతర request తో data కలిసిపోయే ప్రమాదం ఉంటుంది. Dependencies కూడా వాటి usage కు thread-safe గా ఉండాలి.\n\nJava example:\n@Service\nclass PriceService {\n    BigDecimal total(BigDecimal price, int quantity) {\n        return price.multiply(BigDecimal.valueOf(quantity));\n    }\n}",
    "difficulty": "intermediate",
    "codeExample": "@Service\nclass PriceService {\n    BigDecimal total(BigDecimal price, int quantity) {\n        return price.multiply(BigDecimal.valueOf(quantity));\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Concurrent checkout requests calculate totals without sharing customer-specific mutable fields.",
    "commonMistakes": [
      "Do not fix every race with synchronized; first eliminate unnecessary shared state."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How would you safely maintain a shared counter?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-013",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What are circular dependencies and how should you fix them?",
    "shortAnswer": "A dependency cycle occurs when beans directly or indirectly require one another.",
    "detailedAnswer": "If A requires B and B requires A through constructors, neither can be constructed first. Spring Boot disables circular references by default; enabling them does not solve constructor cycles. Refactor shared responsibilities into a third service or redesign dependency direction. Lazy resolution can defer some cycles but may hide architectural problems.\n\nExample (Java; illustrative excerpt):\n@Service\nclass CheckoutService {\n    CheckoutService(PricingService pricing, InventoryService inventory) {\n        // Coordinate independent services here.\n    }\n}\n\nEnterprise scenario: Move orchestration out of mutually dependent pricing and inventory services.\n\nCommon mistake: Do not enable circular references as the default fix.",
    "detailedAnswerTelugu": "A కు B అవసరం, B కు A అవసరం అయితే circular dependency ఏర్పడుతుంది. Constructor injection లో ఏ object ముందుగా create చేయాలో సమస్య వస్తుంది. Spring Boot default గా circular references ను అనుమతించదు. Shared logic ను మూడో service లోకి మార్చడం లేదా dependency direction మార్చడం మంచి పరిష్కారం. Lazy resolution కొన్ని cycles ను వాయిదా వేస్తుంది కానీ design సమస్యను దాచవచ్చు.\n\nJava example:\n@Service\nclass CheckoutService {\n    CheckoutService(PricingService pricing, InventoryService inventory) {\n        // Coordinate independent services here.\n    }\n}",
    "difficulty": "advanced",
    "codeExample": "@Service\nclass CheckoutService {\n    CheckoutService(PricingService pricing, InventoryService inventory) {\n        // Coordinate independent services here.\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Move orchestration out of mutually dependent pricing and inventory services.",
    "commonMistakes": [
      "Do not enable circular references as the default fix."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "Why can setter cycles sometimes behave differently from constructor cycles?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-014",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "How does Spring AOP work and what is self-invocation?",
    "shortAnswer": "Spring AOP typically intercepts calls through a proxy; internal calls bypass that proxy.",
    "detailedAnswer": "Spring creates JDK interface proxies or class-based proxies to apply advice around eligible method calls. Transactions and caching commonly use this mechanism. A call from one method to another on the same target object does not pass through the proxy, so the second method does not acquire its own proxy-based advice. Move the advised operation into another bean when a separate interception boundary is required.\n\nExample (Java; illustrative excerpt):\n@Service\nclass CheckoutService {\n    private final OrderWriter writer;\n    CheckoutService(OrderWriter writer) { this.writer = writer; }\n    void checkout(Order order) { writer.save(order); }\n}\n@Service\nclass OrderWriter {\n    @Transactional\n    public void save(Order order) { /* persist order */ }\n}\n\nEnterprise scenario: A separate writer bean establishes a proxy-intercepted transactional boundary.\n\nCommon mistake: Do not assume private or self-invoked methods receive proxy-based transactional advice.",
    "detailedAnswerTelugu": "Spring AOP సాధారణంగా proxy ద్వారా method calls ను intercept చేస్తుంది. Transactions, caching వంటి features దీనిని ఉపయోగిస్తాయి. ఒకే object లో this ద్వారా మరో method పిలిస్తే proxy ద్వారా call వెళ్లదు. అందువల్ల రెండో method కు ప్రత్యేక advice అమలు కాకపోవచ్చు. అవసరమైతే advised method ను వేరే bean లోకి మార్చాలి.\n\nJava example:\n@Service\nclass CheckoutService {\n    private final OrderWriter writer;\n    CheckoutService(OrderWriter writer) { this.writer = writer; }\n    void checkout(Order order) { writer.save(order); }\n}\n@Service\nclass OrderWriter {\n    @Transactional\n    public void save(Order order) { /* persist order */ }\n}",
    "difficulty": "advanced",
    "codeExample": "@Service\nclass CheckoutService {\n    private final OrderWriter writer;\n    CheckoutService(OrderWriter writer) { this.writer = writer; }\n    void checkout(Order order) { writer.save(order); }\n}\n@Service\nclass OrderWriter {\n    @Transactional\n    public void save(Order order) { /* persist order */ }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A separate writer bean establishes a proxy-intercepted transactional boundary.",
    "commonMistakes": [
      "Do not assume private or self-invoked methods receive proxy-based transactional advice."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "How do JDK proxies differ from class-based proxies?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-015",
    "technology": "spring-boot",
    "topic": "Spring Core and Dependency Injection",
    "question": "What is the difference between BeanFactoryPostProcessor and BeanPostProcessor?",
    "shortAnswer": "One modifies bean definitions; the other processes bean instances.",
    "detailedAnswer": "BeanFactoryPostProcessor operates on configuration metadata before ordinary beans are instantiated. BeanDefinitionRegistryPostProcessor can additionally register definitions. BeanPostProcessor operates on individual instances before and after initialization and can return a wrapped object, such as a proxy. Early bean creation inside factory post-processors can interfere with normal processing.\n\nExample (Java; illustrative excerpt):\n@Configuration\nclass MetadataConfig {\n    @Bean\n    static BeanFactoryPostProcessor metadataProcessor() {\n        return factory -> {\n            if (factory.containsBeanDefinition(\"reportService\")) {\n                factory.getBeanDefinition(\"reportService\").setLazyInit(true);\n            }\n        };\n    }\n}\n\nEnterprise scenario: A framework extension adjusts a report bean definition before singleton creation.\n\nCommon mistake: Do not call getBean unnecessarily inside a factory post-processor.",
    "detailedAnswerTelugu": "BeanFactoryPostProcessor సాధారణ beans create కాకముందు bean definitions metadata ను మార్చడానికి ఉపయోగిస్తారు. BeanDefinitionRegistryPostProcessor కొత్త definitions కూడా register చేయగలదు. BeanPostProcessor మాత్రం bean instances పై initialization ముందు, తర్వాత పనిచేస్తుంది; proxy వంటి wrapped object ను return చేయగలదు. Factory post-processor లో ముందుగానే beans create చేయడం వల్ల normal lifecycle దెబ్బతినవచ్చు.\n\nJava example:\n@Configuration\nclass MetadataConfig {\n    @Bean\n    static BeanFactoryPostProcessor metadataProcessor() {\n        return factory -> {\n            if (factory.containsBeanDefinition(\"reportService\")) {\n                factory.getBeanDefinition(\"reportService\").setLazyInit(true);\n            }\n        };\n    }\n}",
    "difficulty": "expert",
    "codeExample": "@Configuration\nclass MetadataConfig {\n    @Bean\n    static BeanFactoryPostProcessor metadataProcessor() {\n        return factory -> {\n            if (factory.containsBeanDefinition(\"reportService\")) {\n                factory.getBeanDefinition(\"reportService\").setLazyInit(true);\n            }\n        };\n    }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A framework extension adjusts a report bean definition before singleton creation.",
    "commonMistakes": [
      "Do not call getBean unnecessarily inside a factory post-processor."
    ],
    "interviewTips": [
      "Explain the mechanism and its trade-offs, then relate it to the example."
    ],
    "followUpQuestions": [
      "Why are factory post-processor @Bean methods often static?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-016",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "What is the difference between Spring Framework and Spring Boot?",
    "shortAnswer": "Spring provides application infrastructure; Boot adds opinionated configuration and application packaging.",
    "detailedAnswer": "Spring Framework provides IoC, MVC, transactions and other core abstractions. Boot builds on these with starter dependencies, conditional auto-configuration, externalized settings and executable packaging. A web starter brings the relevant libraries; Boot detects them and configures a web application unless you override the defaults. Boot does not eliminate the need to understand Spring beans or transactions.\n\nExample (java; illustrative excerpt):\n@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}\n\nEnterprise scenario: An order API can be packaged as an executable jar instead of requiring a separately installed servlet container.\n\nCommon mistake: Boot is not a replacement for Spring Framework.",
    "detailedAnswerTelugu": "Spring Framework IoC, MVC, transactions వంటి మౌలిక సదుపాయాలను అందిస్తుంది. Spring Boot వాటిపైన starters, auto-configuration, external configuration ద్వారా setup పనిని తగ్గిస్తుంది. Web starter ఉంటే అవసరమైన libraries ఆధారంగా web application configure అవుతుంది. అయినప్పటికీ beans, transactions ఎలా పనిచేస్తాయో తెలుసుకోవాలి.\n\nExample:\n@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}",
    "difficulty": "beginner",
    "codeExample": "@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "An order API can be packaged as an executable jar instead of requiring a separately installed servlet container.",
    "commonMistakes": [
      "Boot is not a replacement for Spring Framework."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "Can Boot run a non-web application?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-017",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How does @SpringBootApplication work?",
    "shortAnswer": "It combines configuration, auto-configuration and component scanning.",
    "detailedAnswer": "The annotation combines @SpringBootConfiguration (a specialized @Configuration), @EnableAutoConfiguration and @ComponentScan. Scanning normally starts in the annotated class package and includes descendants. Auto-configuration imports candidate configuration classes separately from component scanning. Put the main class in the application root package; explicit scan packages do not automatically change JPA entity scanning.\n\nExample (java; illustrative excerpt):\npackage com.example.orders;\n\n@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}\n\nEnterprise scenario: Controllers in com.example.orders.api and services in com.example.orders.service are discovered automatically.\n\nCommon mistake: Do not place the main class in the default package.",
    "detailedAnswerTelugu": "ఈ annotation మూడు annotations కలయిక. Configuration ద్వారా bean definitions, ComponentScan ద్వారా main class package మరియు subpackages లో components గుర్తిస్తారు. EnableAutoConfiguration ద్వారా classpath ఆధారంగా configuration classes import అవుతాయి. Main class ను root package లో ఉంచడం మంచిది. Component scan మార్చితే JPA entity scan కూడా మారుతుందని అనుకోకూడదు.\n\nExample:\npackage com.example.orders;\n\n@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}",
    "difficulty": "intermediate",
    "codeExample": "package com.example.orders;\n\n@SpringBootApplication\npublic class OrderApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(OrderApplication.class, args);\n  }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Controllers in com.example.orders.api and services in com.example.orders.service are discovered automatically.",
    "commonMistakes": [
      "Do not place the main class in the default package."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How can you exclude an auto-configuration?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-018",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How does Spring Boot auto-configuration work internally?",
    "shortAnswer": "Boot imports candidate configurations and evaluates conditions before registering beans.",
    "detailedAnswer": "Modern Boot discovers candidates from META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Conditions inspect classpath, environment, application type and existing bean definitions. For example a JDBC configuration can activate when JDBC classes are present and back off when a user supplies the relevant bean. Conditions are evaluated during configuration processing, not on every request. Ordering matters for conditions that inspect bean definitions.\n\nExample (java; illustrative excerpt):\n@AutoConfiguration\n@ConditionalOnClass(OrderClient.class)\nclass OrderClientAutoConfiguration {\n  @Bean\n  @ConditionalOnMissingBean(OrderClient.class)\n  OrderClient orderClient() { return new OrderClient(); }\n}\n\nEnterprise scenario: An internal client library supplies defaults while applications retain the ability to override them.\n\nCommon mistake: Do not assume every auto-configuration backs off for every custom bean.",
    "detailedAnswerTelugu": "Boot AutoConfiguration.imports file నుంచి candidate configurations గుర్తిస్తుంది. Classpath లో classes ఉన్నాయా, properties ఏమిటి, ఇప్పటికే bean definition ఉందా అనే conditions పరిశీలిస్తుంది. JDBC classes ఉంటే datasource configuration activate కావచ్చు. మనమే datasource bean ఇచ్చినప్పుడు సంబంధిత default configuration వెనక్కి తగ్గవచ్చు. ప్రతి request సమయంలో ఈ పని జరగదు.\n\nExample:\n@AutoConfiguration\n@ConditionalOnClass(OrderClient.class)\nclass OrderClientAutoConfiguration {\n  @Bean\n  @ConditionalOnMissingBean(OrderClient.class)\n  OrderClient orderClient() { return new OrderClient(); }\n}",
    "difficulty": "advanced",
    "codeExample": "@AutoConfiguration\n@ConditionalOnClass(OrderClient.class)\nclass OrderClientAutoConfiguration {\n  @Bean\n  @ConditionalOnMissingBean(OrderClient.class)\n  OrderClient orderClient() { return new OrderClient(); }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "An internal client library supplies defaults while applications retain the ability to override them.",
    "commonMistakes": [
      "Do not assume every auto-configuration backs off for every custom bean."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you inspect the condition evaluation report?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-019",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "What are Spring Boot starters and dependency management?",
    "shortAnswer": "Starters aggregate dependencies; the Boot BOM aligns supported versions.",
    "detailedAnswer": "A starter is a dependency descriptor that brings a coherent set of libraries. The Boot parent or imported spring-boot-dependencies BOM supplies managed versions. The Maven plugin handles executable packaging, a separate concern. Avoid arbitrary overrides of managed versions because transitive libraries may be incompatible. Inspect the dependency tree when resolving conflicts. Boot 4 has reorganized some starters compared with Boot 3.5.\n\nExample (xml; illustrative excerpt):\n<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n<!-- Boot 3.5 example; version managed by Boot parent/BOM -->\n\nEnterprise scenario: A team standardizes dependency versions across order and payment services.\n\nCommon mistake: A BOM does not add dependencies by itself.",
    "detailedAnswerTelugu": "Starter అనేది ఒక feature కు అవసరమైన dependencies సమూహం. Boot parent లేదా BOM ద్వారా compatible versions manage అవుతాయి. Maven plugin executable jar packaging చేస్తుంది; అది dependency management కాదు. Versions ను అవసరం లేకుండా override చేస్తే compatibility సమస్యలు రావచ్చు. Boot 4 లో కొన్ని starters మారాయి.\n\nExample:\n<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n<!-- Boot 3.5 example; version managed by Boot parent/BOM -->",
    "difficulty": "intermediate",
    "codeExample": "<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n<!-- Boot 3.5 example; version managed by Boot parent/BOM -->",
    "codeLanguage": "xml",
    "realTimeScenario": "A team standardizes dependency versions across order and payment services.",
    "commonMistakes": [
      "A BOM does not add dependencies by itself."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "What is the difference between a BOM and a starter?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-020",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do conditional annotations work?",
    "shortAnswer": "They control configuration registration based on startup conditions.",
    "detailedAnswer": "@ConditionalOnClass checks library availability; @ConditionalOnMissingBean checks existing bean definitions; @ConditionalOnProperty checks environment settings. Conditions on bean methods can prevent registration without disabling unrelated configuration. For optional libraries isolate configuration in a separate class so JVM linkage does not fail before the condition can protect it. Conditions are not dynamic feature flags.\n\nExample (java; illustrative excerpt):\n@Configuration(proxyBeanMethods = false)\nclass AuditConfig {\n  @Bean\n  @ConditionalOnProperty(prefix=\"orders.audit\", name=\"enabled\", havingValue=\"true\")\n  AuditPublisher auditPublisher() { return new AuditPublisher(); }\n}\n\nEnterprise scenario: Enable an audit publisher only in deployments that configure the feature.\n\nCommon mistake: Do not treat conditional registration as runtime authorization.",
    "detailedAnswerTelugu": "Conditional annotations startup సమయంలో configuration అవసరమా అని నిర్ణయిస్తాయి. OnClass library ఉందో, OnMissingBean bean ఇప్పటికే ఉందో, OnProperty setting సరిపోతుందో చూస్తాయి. Optional library కోసం ప్రత్యేక configuration class ఉంచడం ఉపయోగకరం. Runtime లో property మార్చినంత మాత్రాన bean స్వయంగా create లేదా remove కాదు.\n\nExample:\n@Configuration(proxyBeanMethods = false)\nclass AuditConfig {\n  @Bean\n  @ConditionalOnProperty(prefix=\"orders.audit\", name=\"enabled\", havingValue=\"true\")\n  AuditPublisher auditPublisher() { return new AuditPublisher(); }\n}",
    "difficulty": "advanced",
    "codeExample": "@Configuration(proxyBeanMethods = false)\nclass AuditConfig {\n  @Bean\n  @ConditionalOnProperty(prefix=\"orders.audit\", name=\"enabled\", havingValue=\"true\")\n  AuditPublisher auditPublisher() { return new AuditPublisher(); }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Enable an audit publisher only in deployments that configure the feature.",
    "commonMistakes": [
      "Do not treat conditional registration as runtime authorization."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "What does matchIfMissing do?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-021",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do you create custom auto-configuration?",
    "shortAnswer": "Create an @AutoConfiguration class, conditional beans and an imports resource.",
    "detailedAnswer": "Package reusable defaults in a library. Annotate the configuration with @AutoConfiguration, use explicit bean methods and conditions, and list its fully qualified class name in the AutoConfiguration.imports resource. Expose typed properties with @EnableConfigurationProperties. Test both activation and back-off using ApplicationContextRunner. Keep auto-configuration out of normal component scanning and use ordering annotations when another auto-configuration must run first.\n\nExample (java; illustrative excerpt):\n@AutoConfiguration\nclass OrderDefaults {\n  @Bean\n  @ConditionalOnMissingBean\n  Clock orderClock() { return Clock.systemUTC(); }\n}\n// META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\n// com.example.OrderDefaults\n\nEnterprise scenario: Several services share a default UTC clock but tests can provide a fixed clock.\n\nCommon mistake: Do not rely on component scanning to discover library auto-configuration.",
    "detailedAnswerTelugu": "Reusable library లో AutoConfiguration class రాయాలి. Bean methods కు conditions పెట్టి imports resource లో పూర్తి class name నమోదు చేయాలి. Typed properties కోసం EnableConfigurationProperties ఉపయోగించవచ్చు. ApplicationContextRunner తో default bean create అవుతుందా, custom bean ఇచ్చినప్పుడు back off అవుతుందా పరీక్షించాలి.\n\nExample:\n@AutoConfiguration\nclass OrderDefaults {\n  @Bean\n  @ConditionalOnMissingBean\n  Clock orderClock() { return Clock.systemUTC(); }\n}\n// META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\n// com.example.OrderDefaults",
    "difficulty": "expert",
    "codeExample": "@AutoConfiguration\nclass OrderDefaults {\n  @Bean\n  @ConditionalOnMissingBean\n  Clock orderClock() { return Clock.systemUTC(); }\n}\n// META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\n// com.example.OrderDefaults",
    "codeLanguage": "java",
    "realTimeScenario": "Several services share a default UTC clock but tests can provide a fixed clock.",
    "commonMistakes": [
      "Do not rely on component scanning to discover library auto-configuration."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you test custom bean back-off?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-022",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "Explain the Spring Boot startup lifecycle.",
    "shortAnswer": "SpringApplication prepares the environment, creates and refreshes the context, runs startup runners and signals readiness.",
    "detailedAnswer": "SpringApplication determines the application type, prepares environment and listeners, creates the context, applies initializers and loads sources. Context refresh processes bean definitions and post-processors, instantiates non-lazy singletons and starts lifecycle components including the embedded server where applicable. ApplicationStartedEvent precedes runners; ApplicationReadyEvent follows successful runners. A listening port alone does not mean startup tasks are complete.\n\nExample (java; illustrative excerpt):\n@Component\nclass ReadyListener {\n  @EventListener(ApplicationReadyEvent.class)\n  void ready() {\n    System.out.println(\"Order service startup completed\");\n  }\n}\n\nEnterprise scenario: A deployment readiness probe prevents routing traffic before initialization completes.\n\nCommon mistake: Avoid long blocking work in readiness listeners.",
    "detailedAnswerTelugu": "SpringApplication మొదట environment సిద్ధం చేసి application type నిర్ణయిస్తుంది. Context create చేసి bean definitions load చేస్తుంది. Refresh సమయంలో post-processors, non-lazy singleton beans, lifecycle components ప్రారంభమవుతాయి. ApplicationStartedEvent తర్వాత runners execute అవుతాయి. అవి విజయవంతంగా పూర్తయ్యాక ApplicationReadyEvent వస్తుంది. Port open కావడం మాత్రమే readiness కాదు.\n\nExample:\n@Component\nclass ReadyListener {\n  @EventListener(ApplicationReadyEvent.class)\n  void ready() {\n    System.out.println(\"Order service startup completed\");\n  }\n}",
    "difficulty": "advanced",
    "codeExample": "@Component\nclass ReadyListener {\n  @EventListener(ApplicationReadyEvent.class)\n  void ready() {\n    System.out.println(\"Order service startup completed\");\n  }\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A deployment readiness probe prevents routing traffic before initialization completes.",
    "commonMistakes": [
      "Avoid long blocking work in readiness listeners."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "When do ApplicationRunner beans execute?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-023",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "What is the difference between ApplicationRunner and CommandLineRunner?",
    "shortAnswer": "Both run after context refresh; ApplicationRunner receives parsed arguments, CommandLineRunner receives raw strings.",
    "detailedAnswer": "Both interfaces are startup callbacks and run before ApplicationReadyEvent. ApplicationRunner exposes option names, option values and non-option arguments through ApplicationArguments. CommandLineRunner receives String varargs. Use @Order for explicit sequencing. Exceptions propagate and can fail startup. In a replicated service each instance runs its own callbacks, so database migrations or global initialization need coordination.\n\nExample (java; illustrative excerpt):\n@Bean\nApplicationRunner startupCheck() {\n  return args -> {\n    if (args.containsOption(\"verify\")) {\n      System.out.println(\"Verification requested\");\n    }\n  };\n}\n\nEnterprise scenario: A command-line option enables an optional startup verification.\n\nCommon mistake: Do not assume a runner executes only once across a cluster.",
    "detailedAnswerTelugu": "రెండు runners context refresh తర్వాత execute అవుతాయి. ApplicationRunner parsed options ను ApplicationArguments ద్వారా ఇస్తుంది. CommandLineRunner raw String arguments ఇస్తుంది. Order ద్వారా sequence నిర్ణయించవచ్చు. Exception వస్తే startup fail కావచ్చు. Multiple replicas ఉంటే ప్రతి instance runner execute చేస్తుంది కాబట్టి shared data initialization idempotent గా ఉండాలి.\n\nExample:\n@Bean\nApplicationRunner startupCheck() {\n  return args -> {\n    if (args.containsOption(\"verify\")) {\n      System.out.println(\"Verification requested\");\n    }\n  };\n}",
    "difficulty": "intermediate",
    "codeExample": "@Bean\nApplicationRunner startupCheck() {\n  return args -> {\n    if (args.containsOption(\"verify\")) {\n      System.out.println(\"Verification requested\");\n    }\n  };\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A command-line option enables an optional startup verification.",
    "commonMistakes": [
      "Do not assume a runner executes only once across a cluster."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you order multiple runners?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-024",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How does externalized configuration and property precedence work?",
    "shortAnswer": "Boot resolves configuration from ordered property sources, allowing deployment-specific overrides.",
    "detailedAnswer": "Boot reads config data such as application.yml, profile-specific files and imported locations, along with environment variables, system properties and command-line arguments. In ordinary runtime configuration, command-line arguments override system properties and environment variables, which override config data. External config files can override packaged defaults. Test property sources have additional precedence. Use the Environment or configuration binding instead of manually reading files.\n\nExample (yaml; illustrative excerpt):\norders:\n  timeout: 2s\n# Override with environment variable ORDERS_TIMEOUT=5s\n# Or command line --orders.timeout=8s\n\nEnterprise scenario: The same image uses different timeout settings in staging and production.\n\nCommon mistake: Do not commit production passwords into application.yml.",
    "detailedAnswerTelugu": "Application.yml లో defaults ఉంచి environment variables లేదా command-line arguments ద్వారా deployment settings override చేయవచ్చు. సాధారణ runtime లో command-line arguments కు system properties, environment variables కంటే ఎక్కువ priority ఉంటుంది. ఇవి config data కంటే ఎక్కువ priority కలిగి ఉంటాయి. Tests లో అదనపు property sources ఉంటాయి.\n\nExample:\norders:\n  timeout: 2s\n# Override with environment variable ORDERS_TIMEOUT=5s\n# Or command line --orders.timeout=8s",
    "difficulty": "advanced",
    "codeExample": "orders:\n  timeout: 2s\n# Override with environment variable ORDERS_TIMEOUT=5s\n# Or command line --orders.timeout=8s",
    "codeLanguage": "yaml",
    "realTimeScenario": "The same image uses different timeout settings in staging and production.",
    "commonMistakes": [
      "Do not commit production passwords into application.yml."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How does spring.config.import work?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-025",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "What is the difference between @Value and @ConfigurationProperties?",
    "shortAnswer": "@Value injects individual expressions; @ConfigurationProperties binds structured typed settings.",
    "detailedAnswer": "@Value supports placeholders and SpEL and suits isolated values. ConfigurationProperties supports relaxed binding, nested structures, type conversion and validation. Register the properties via @ConfigurationPropertiesScan or @EnableConfigurationProperties. Immutable records are convenient for constructor binding in modern Boot. Add a validation provider and @Validated to reject invalid settings at startup.\n\nExample (java; illustrative excerpt):\n@ConfigurationProperties(\"orders\")\n@Validated\npublic record OrderProperties(\n    @NotNull Duration timeout,\n    @Min(1) int maxRetries) {}\n// Register using @ConfigurationPropertiesScan\n\nEnterprise scenario: A payment client receives validated timeout and retry configuration through constructor injection.\n\nCommon mistake: Do not use SpEL expressions as if ConfigurationProperties evaluated them.",
    "detailedAnswerTelugu": "Value ఒక property లేదా expression inject చేయడానికి సరిపోతుంది. ConfigurationProperties ద్వారా ఒక prefix కింద ఉన్న settings ను typed object గా bind చేయవచ్చు. Duration వంటి types conversion అవుతాయి. Validation తో తప్పు settings ఉంటే startup లోనే గుర్తించవచ్చు. Properties class ను scan లేదా enable చేయాలి.\n\nExample:\n@ConfigurationProperties(\"orders\")\n@Validated\npublic record OrderProperties(\n    @NotNull Duration timeout,\n    @Min(1) int maxRetries) {}\n// Register using @ConfigurationPropertiesScan",
    "difficulty": "intermediate",
    "codeExample": "@ConfigurationProperties(\"orders\")\n@Validated\npublic record OrderProperties(\n    @NotNull Duration timeout,\n    @Min(1) int maxRetries) {}\n// Register using @ConfigurationPropertiesScan",
    "codeLanguage": "java",
    "realTimeScenario": "A payment client receives validated timeout and retry configuration through constructor injection.",
    "commonMistakes": [
      "Do not use SpEL expressions as if ConfigurationProperties evaluated them."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How does relaxed binding map environment variable names?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-026",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do Spring Profiles work?",
    "shortAnswer": "Profiles activate environment-specific bean definitions and configuration documents.",
    "detailedAnswer": "Use @Profile for beans that should exist only in selected environments and application-{profile}.yml for configuration overrides. Activate profiles externally with SPRING_PROFILES_ACTIVE. Multiple profiles may be active; conflicting property values depend on config data ordering. Profile groups can bundle related profiles. Prefer the same artifact across environments and use external secrets.\n\nExample (java; illustrative excerpt):\n@Configuration(proxyBeanMethods = false)\n@Profile(\"dev\")\nclass DevConfig {\n  @Bean\n  Clock clock() { return Clock.systemUTC(); }\n}\n// SPRING_PROFILES_ACTIVE=dev\n\nEnterprise scenario: A development-only integration stub is excluded from production configuration.\n\nCommon mistake: Profiles are not a security boundary.",
    "detailedAnswerTelugu": "Profiles ద్వారా environment ఆధారంగా beans మరియు properties మార్చవచ్చు. application-prod.yml లో production overrides ఉంచవచ్చు. SPRING_PROFILES_ACTIVE ద్వారా profile activate చేయాలి. ఒకేసారి అనేక profiles active కావచ్చు. ఒకే artifact ను అన్ని environments లో deploy చేసి settings మాత్రమే మార్చడం మంచిది.\n\nExample:\n@Configuration(proxyBeanMethods = false)\n@Profile(\"dev\")\nclass DevConfig {\n  @Bean\n  Clock clock() { return Clock.systemUTC(); }\n}\n// SPRING_PROFILES_ACTIVE=dev",
    "difficulty": "intermediate",
    "codeExample": "@Configuration(proxyBeanMethods = false)\n@Profile(\"dev\")\nclass DevConfig {\n  @Bean\n  Clock clock() { return Clock.systemUTC(); }\n}\n// SPRING_PROFILES_ACTIVE=dev",
    "codeLanguage": "java",
    "realTimeScenario": "A development-only integration stub is excluded from production configuration.",
    "commonMistakes": [
      "Profiles are not a security boundary."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "What happens if no profile is explicitly active?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-027",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do embedded servers work in Spring Boot?",
    "shortAnswer": "Boot creates and manages a web server as part of the application context.",
    "detailedAnswer": "For servlet applications Boot configures a ServletWebServerFactory and creates a server during context refresh. Tomcat is a common default; alternatives depend on the Boot version and dependencies. Reactive applications use a reactive web server factory, commonly Reactor Netty. Spring MVC dispatches servlet requests through DispatcherServlet; WebFlux uses a reactive dispatching model. An executable jar includes the server libraries.\n\nExample (yaml; illustrative excerpt):\nserver:\n  port: 8081\n  shutdown: graceful\n\nEnterprise scenario: An order service runs as an independent process inside a container.\n\nCommon mistake: Adding WebFlux alongside MVC does not automatically make the application reactive.",
    "detailedAnswerTelugu": "Servlet application లో Boot ServletWebServerFactory ద్వారా embedded server సృష్టిస్తుంది. సాధారణంగా Tomcat ఉపయోగిస్తారు. Reactive application లో Reactor Netty వంటి server ఉంటుంది. MVC requests DispatcherServlet ద్వారా వెళ్తాయి. WebFlux reactive model ఉపయోగిస్తుంది. Executable jar లో server libraries కూడా ఉంటాయి.\n\nExample:\nserver:\n  port: 8081\n  shutdown: graceful",
    "difficulty": "intermediate",
    "codeExample": "server:\n  port: 8081\n  shutdown: graceful",
    "codeLanguage": "yaml",
    "realTimeScenario": "An order service runs as an independent process inside a container.",
    "commonMistakes": [
      "Adding WebFlux alongside MVC does not automatically make the application reactive."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you run Boot without a web server?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-028",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How does lazy initialization affect startup?",
    "shortAnswer": "Lazy initialization defers bean creation until needed, trading startup speed for delayed failures and first-use latency.",
    "detailedAnswer": "Boot normally creates non-lazy singleton beans during context refresh. spring.main.lazy-initialization=true defers many beans; @Lazy can target a specific bean or injection point. A lazy bean required by an eager singleton may still be created during startup unless the injection itself is deferred. Measure startup with ApplicationStartup and assess memory and first-request latency before enabling globally.\n\nExample (java; illustrative excerpt):\n@Bean\n@Lazy\nReportGenerator reportGenerator() {\n  return new ReportGenerator();\n}\n\nEnterprise scenario: A rarely used report generator is initialized only when requested.\n\nCommon mistake: Do not enable global lazy initialization just to hide startup failures.",
    "detailedAnswerTelugu": "సాధారణంగా singleton beans startup లో create అవుతాయి. Lazy initialization వల్ల అవసరం వచ్చినప్పుడు bean create అవుతుంది. Startup వేగం పెరగవచ్చు కానీ configuration errors ఆలస్యంగా బయటపడవచ్చు. Eager bean కు lazy bean అవసరమైతే startup లోనే create కావచ్చు. First request latency కూడా కొలవాలి.\n\nExample:\n@Bean\n@Lazy\nReportGenerator reportGenerator() {\n  return new ReportGenerator();\n}",
    "difficulty": "advanced",
    "codeExample": "@Bean\n@Lazy\nReportGenerator reportGenerator() {\n  return new ReportGenerator();\n}",
    "codeLanguage": "java",
    "realTimeScenario": "A rarely used report generator is initialized only when requested.",
    "commonMistakes": [
      "Do not enable global lazy initialization just to hide startup failures."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How can a lazy dependency be injected through a proxy?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-029",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do you troubleshoot auto-configuration failures?",
    "shortAnswer": "Inspect condition reports, startup errors, dependencies and effective configuration.",
    "detailedAnswer": "Start with --debug to obtain the condition evaluation report, which explains positive and negative matches. Inspect the root exception, not only the final failure message. Check the runtime dependency tree, active profiles and relevant property sources. Actuator conditions and beans endpoints can help when the application starts; expose them only to authorized operators. Reproduce the failing condition in a focused context test.\n\nExample (bash; illustrative excerpt):\njava -jar orders.jar --debug\n# Maven dependency inspection\nmvn dependency:tree\n\nEnterprise scenario: A missing JDBC driver or unexpected custom bean prevents the expected datasource setup.\n\nCommon mistake: Do not exclude auto-configurations blindly to suppress errors.",
    "detailedAnswerTelugu": "Auto-configuration సమస్య వచ్చినప్పుడు --debug ద్వారా condition report చూడాలి. ఏ condition match కాలేదో తెలుసుకోవాలి. Root exception, dependency versions, active profiles మరియు effective properties పరిశీలించాలి. Application start అయితే Actuator conditions endpoint ఉపయోగపడుతుంది కానీ public గా expose చేయకూడదు.\n\nExample:\njava -jar orders.jar --debug\n# Maven dependency inspection\nmvn dependency:tree",
    "difficulty": "advanced",
    "codeExample": "java -jar orders.jar --debug\n# Maven dependency inspection\nmvn dependency:tree",
    "codeLanguage": "bash",
    "realTimeScenario": "A missing JDBC driver or unexpected custom bean prevents the expected datasource setup.",
    "commonMistakes": [
      "Do not exclude auto-configurations blindly to suppress errors."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How do positive and negative condition matches differ?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-030",
    "technology": "spring-boot",
    "topic": "Spring Boot Fundamentals and Auto-Configuration",
    "question": "How do graceful shutdown and readiness work in production?",
    "shortAnswer": "Stop accepting new work, allow in-flight requests to finish within a timeout, and coordinate traffic removal.",
    "detailedAnswer": "Configure graceful shutdown explicitly and set spring.lifecycle.timeout-per-shutdown-phase. On a supported web server, context shutdown initiates graceful request draining. Kubernetes readiness and termination handling must be coordinated with load balancer propagation and terminationGracePeriodSeconds. HTTP draining does not automatically guarantee Kafka processing or background job completion; manage their lifecycle and acknowledgments separately. Liveness should not fail simply because a downstream dependency is unavailable.\n\nExample (yaml; illustrative excerpt):\nserver:\n  shutdown: graceful\nspring:\n  lifecycle:\n    timeout-per-shutdown-phase: 20s\nmanagement:\n  endpoint:\n    health:\n      probes:\n        enabled: true\n\nEnterprise scenario: During a rolling deployment, an order service drains requests before its process exits.\n\nCommon mistake: Do not assume a shutdown phase timeout is the total process shutdown time.",
    "detailedAnswerTelugu": "Graceful shutdown లో కొత్త requests తీసుకోవడం ఆపి ఇప్పటికే processing లో ఉన్న requests పూర్తి కావడానికి సమయం ఇస్తారు. Shutdown timeout ను configure చేయాలి. Kubernetes readiness, load balancer traffic removal మరియు termination grace period మధ్య coordination అవసరం. Kafka consumers, background jobs కోసం ప్రత్యేక shutdown handling అవసరం. Downstream service fail అయితే liveness తప్పనిసరిగా fail కావాల్సిన అవసరం లేదు.\n\nExample:\nserver:\n  shutdown: graceful\nspring:\n  lifecycle:\n    timeout-per-shutdown-phase: 20s\nmanagement:\n  endpoint:\n    health:\n      probes:\n        enabled: true",
    "difficulty": "expert",
    "codeExample": "server:\n  shutdown: graceful\nspring:\n  lifecycle:\n    timeout-per-shutdown-phase: 20s\nmanagement:\n  endpoint:\n    health:\n      probes:\n        enabled: true",
    "codeLanguage": "yaml",
    "realTimeScenario": "During a rolling deployment, an order service drains requests before its process exits.",
    "commonMistakes": [
      "Do not assume a shutdown phase timeout is the total process shutdown time."
    ],
    "interviewTips": [
      "Explain the mechanism, configuration boundary and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you coordinate Kafka consumer shutdown with HTTP draining?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-031",
    "technology": "spring-boot",
    "topic": "REST controllers",
    "question": "What is the difference between @Controller and @RestController?",
    "shortAnswer": "@RestController combines @Controller and @ResponseBody.",
    "detailedAnswer": "In Spring MVC, DispatcherServlet locates a handler through HandlerMapping and invokes it through HandlerAdapter. A REST controller returns a body serialized by an HttpMessageConverter, typically Jackson for JSON. A regular controller can return a logical view name; @ResponseBody can override that behavior. Content negotiation determines the representation, not the annotation alone.\n\nExample (illustrative excerpt):\n@RestController\n@RequestMapping(\"/orders\")\nclass OrderController {\n    @GetMapping(\"/{id}\")\n    OrderDto get(@PathVariable UUID id) { return service.find(id); }\n    // service injected through constructor\n}\n\nCommon mistake: Do not return persistence entities just because serialization works.\n\nInterview follow-up: How does content negotiation select a converter?",
    "detailedAnswerTelugu": "Spring MVC లో DispatcherServlet request కు సరైన handler ను గుర్తిస్తుంది. @RestController లో return value సాధారణంగా JSON గా serialize అవుతుంది. @Controller లో String return చేస్తే అది view name కావచ్చు; @ResponseBody పెడితే response body అవుతుంది. Client Accept header మరియు converters ఆధారంగా representation నిర్ణయించబడుతుంది.\n\nExample:\n@RestController\n@RequestMapping(\"/orders\")\nclass OrderController {\n    @GetMapping(\"/{id}\")\n    OrderDto get(@PathVariable UUID id) { return service.find(id); }\n    // service injected through constructor\n}",
    "difficulty": "beginner",
    "codeExample": "@RestController\n@RequestMapping(\"/orders\")\nclass OrderController {\n    @GetMapping(\"/{id}\")\n    OrderDto get(@PathVariable UUID id) { return service.find(id); }\n    // service injected through constructor\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Do not return persistence entities just because serialization works."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How does content negotiation select a converter?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-032",
    "technology": "spring-boot",
    "topic": "HTTP methods",
    "question": "How should HTTP methods be selected for REST APIs?",
    "shortAnswer": "Use GET for retrieval, POST for creation or commands, PUT for replacement, PATCH for partial updates and DELETE for removal.",
    "detailedAnswer": "GET is safe and idempotent; PUT and DELETE are idempotent in intended effect, although response codes can change. POST is not inherently idempotent. PATCH semantics depend on the patch format and operation. Design resources around nouns and use explicit command endpoints when business actions do not fit CRUD. Never mutate an order through GET.\n\nExample (illustrative excerpt):\nGET /orders/42\nPOST /orders\nPUT /orders/42\nPATCH /orders/42\nDELETE /orders/42\nPOST /orders/42/cancellations\n\nCommon mistake: Do not assume every PATCH is idempotent.\n\nInterview follow-up: Why can repeated DELETE return different status codes?",
    "detailedAnswerTelugu": "GET data చదవడానికి, POST కొత్త order create చేయడానికి, PUT పూర్తి replacement కోసం, PATCH కొంత data update చేయడానికి ఉపయోగిస్తాం. DELETE ఒక resource తొలగిస్తుంది. Idempotency అంటే అదే request మళ్లీ పంపినా intended effect మారకపోవడం. GET ద్వారా database update చేయకూడదు.\n\nExample:\nGET /orders/42\nPOST /orders\nPUT /orders/42\nPATCH /orders/42\nDELETE /orders/42\nPOST /orders/42/cancellations",
    "difficulty": "beginner",
    "codeExample": "GET /orders/42\nPOST /orders\nPUT /orders/42\nPATCH /orders/42\nDELETE /orders/42\nPOST /orders/42/cancellations",
    "codeLanguage": "text",
    "commonMistakes": [
      "Do not assume every PATCH is idempotent."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "Why can repeated DELETE return different status codes?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-033",
    "technology": "spring-boot",
    "topic": "HTTP status codes",
    "question": "How do you choose HTTP response status codes?",
    "shortAnswer": "Choose codes based on the outcome, not merely whether Java threw an exception.",
    "detailedAnswer": "Return 200 for a successful representation, 201 with Location for creation, 202 for accepted asynchronous work, and 204 for success without a body. Use 400 for malformed or invalid requests, 401 for missing or invalid authentication, 403 for denied authorization, 404 for missing resources, 409 for state conflicts and 500 for unexpected server errors. A 202 response does not promise successful completion.\n\nExample (illustrative excerpt):\n@PostMapping\nResponseEntity<OrderDto> create(@Valid @RequestBody CreateOrder request) {\n    OrderDto order = service.create(request);\n    return ResponseEntity.created(URI.create(\"/orders/\" + order.id())).body(order);\n}\n\nCommon mistake: Never attach a response body to 204.\n\nInterview follow-up: When should 409 be used instead of 400?",
    "detailedAnswerTelugu": "Order create అయితే 201 తో Location header ఇవ్వాలి. Async processing ప్రారంభమైతే 202 ఇవ్వవచ్చు. Authentication లేకపోతే 401, permission లేకపోతే 403, order దొరకకపోతే 404, state conflict అయితే 409. ప్రతి error కు 200 ఇవ్వడం వల్ల client సరైన నిర్ణయం తీసుకోలేడు.\n\nExample:\n@PostMapping\nResponseEntity<OrderDto> create(@Valid @RequestBody CreateOrder request) {\n    OrderDto order = service.create(request);\n    return ResponseEntity.created(URI.create(\"/orders/\" + order.id())).body(order);\n}",
    "difficulty": "beginner",
    "codeExample": "@PostMapping\nResponseEntity<OrderDto> create(@Valid @RequestBody CreateOrder request) {\n    OrderDto order = service.create(request);\n    return ResponseEntity.created(URI.create(\"/orders/\" + order.id())).body(order);\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Never attach a response body to 204."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "When should 409 be used instead of 400?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-034",
    "technology": "spring-boot",
    "topic": "DTO design",
    "question": "Why use DTOs instead of JPA entities in REST APIs?",
    "shortAnswer": "DTOs define an explicit API contract independent of persistence models.",
    "detailedAnswer": "Entities can expose internal fields, lazy relationships and bidirectional cycles. DTOs limit input and output fields and allow independent schema evolution. Map explicitly at the service boundary or with a mapper. Use distinct create and response DTOs so clients cannot set server-owned fields such as status or price. Mapping does not itself enforce authorization.\n\nExample (illustrative excerpt):\nrecord CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\nrecord OrderDto(UUID id, String status, BigDecimal total) {}\n\nCommon mistake: Avoid blindly copying all request properties into an entity.\n\nInterview follow-up: How do DTO projections reduce database work?",
    "detailedAnswerTelugu": "JPA entity ని నేరుగా API response గా పంపితే internal fields, lazy loading సమస్యలు రావచ్చు. DTO ద్వారా client కు అవసరమైన fields మాత్రమే ఇస్తాం. Create DTO లో server నిర్ణయించే price, status వంటి fields పెట్టకూడదు. Mapping తో పాటు authorization కూడా అవసరం.\n\nExample:\nrecord CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\nrecord OrderDto(UUID id, String status, BigDecimal total) {}",
    "difficulty": "intermediate",
    "codeExample": "record CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\nrecord OrderDto(UUID id, String status, BigDecimal total) {}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Avoid blindly copying all request properties into an entity."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do DTO projections reduce database work?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-035",
    "technology": "spring-boot",
    "topic": "Validation",
    "question": "How does Jakarta Bean Validation work in Spring MVC?",
    "shortAnswer": "@Valid triggers constraint validation on bound request objects.",
    "detailedAnswer": "Jackson first deserializes JSON into the DTO; MVC then validates it when @Valid is present. Constraints such as @NotNull, @Positive and @Size describe structural rules. Nested objects require cascading @Valid. Invalid request bodies normally produce MethodArgumentNotValidException; method-level constraints can produce HandlerMethodValidationException in modern MVC. Business rules such as stock availability belong in the service and database constraints remain essential.\n\nExample (illustrative excerpt):\nrecord CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\n@PostMapping\nOrderDto create(@Valid @RequestBody CreateOrder request) {\n    return service.create(request);\n}\n\nCommon mistake: Include a Bean Validation provider, commonly through spring-boot-starter-validation.\n\nInterview follow-up: How do validation groups differ from cascading validation?",
    "detailedAnswerTelugu": "JSON మొదట DTO గా deserialize అవుతుంది. తర్వాత @Valid ఉంటే constraints check అవుతాయి. Nested object కోసం @Valid అవసరం. Quantity positive గా ఉండటం validation; stock ఉందా అనేది business rule. Database constraints కూడా తప్పనిసరి.\n\nExample:\nrecord CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\n@PostMapping\nOrderDto create(@Valid @RequestBody CreateOrder request) {\n    return service.create(request);\n}",
    "difficulty": "intermediate",
    "codeExample": "record CreateOrder(@NotNull UUID productId, @Positive int quantity) {}\n@PostMapping\nOrderDto create(@Valid @RequestBody CreateOrder request) {\n    return service.create(request);\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Include a Bean Validation provider, commonly through spring-boot-starter-validation."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do validation groups differ from cascading validation?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-036",
    "technology": "spring-boot",
    "topic": "Exception handling",
    "question": "How do you implement global exception handling?",
    "shortAnswer": "Use @RestControllerAdvice with targeted @ExceptionHandler methods.",
    "detailedAnswer": "MVC exception resolvers can route exceptions from controllers to advice. Map domain exceptions to stable HTTP errors, log unexpected failures internally and avoid exposing stack traces or SQL. Handle validation separately to provide field errors. Exceptions raised in security filters may need AuthenticationEntryPoint or AccessDeniedHandler instead of MVC advice.\n\nExample (illustrative excerpt):\n@RestControllerAdvice\nclass ApiErrors {\n    @ExceptionHandler(OrderNotFoundException.class)\n    ResponseEntity<ProblemDetail> missing(OrderNotFoundException ex) {\n        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, \"Order not found\");\n        return ResponseEntity.status(404).body(p);\n    }\n}\n\nCommon mistake: Do not map every exception to 400.\n\nInterview follow-up: Why might controller advice not handle authentication failures?",
    "detailedAnswerTelugu": "@RestControllerAdvice ద్వారా controllers లో వచ్చే exceptions ను ఒకే చోట handle చేయవచ్చు. OrderNotFoundException కు 404 ఇవ్వాలి. Internal stack trace client కు ఇవ్వకూడదు. Security filter లో వచ్చే errors కోసం ప్రత్యేక security handlers అవసరం కావచ్చు.\n\nExample:\n@RestControllerAdvice\nclass ApiErrors {\n    @ExceptionHandler(OrderNotFoundException.class)\n    ResponseEntity<ProblemDetail> missing(OrderNotFoundException ex) {\n        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, \"Order not found\");\n        return ResponseEntity.status(404).body(p);\n    }\n}",
    "difficulty": "advanced",
    "codeExample": "@RestControllerAdvice\nclass ApiErrors {\n    @ExceptionHandler(OrderNotFoundException.class)\n    ResponseEntity<ProblemDetail> missing(OrderNotFoundException ex) {\n        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, \"Order not found\");\n        return ResponseEntity.status(404).body(p);\n    }\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Do not map every exception to 400."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "Why might controller advice not handle authentication failures?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-037",
    "technology": "spring-boot",
    "topic": "Problem Details",
    "question": "What is ProblemDetail and how should it be used?",
    "shortAnswer": "ProblemDetail represents standardized HTTP API errors using RFC 9457 fields.",
    "detailedAnswer": "Spring supports ProblemDetail with type, title, status, detail and instance. Use a stable type URI to identify the error category and optional extension fields for machine-readable codes. Keep the HTTP status consistent with the body. Avoid leaking personal data, credentials or internal implementation details. Clients should branch on stable codes or type rather than human-readable detail.\n\nExample (illustrative excerpt):\nvar problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, \"Order already shipped\");\nproblem.setType(URI.create(\"https://api.example.com/problems/order-state\"));\nproblem.setProperty(\"code\", \"ORDER_ALREADY_SHIPPED\");\nreturn ResponseEntity.status(409).body(problem);\n\nCommon mistake: Do not use the detail text as a machine-readable contract.\n\nInterview follow-up: How would you represent multiple field validation errors?",
    "detailedAnswerTelugu": "ProblemDetail అనేది RFC 9457 ప్రకారం error response నిర్మించే విధానం. type ద్వారా error category గుర్తించవచ్చు. title, status, detail, instance వంటి fields ఉంటాయి. Client logic కోసం stable error code ఇవ్వాలి; sensitive data ఇవ్వకూడదు.\n\nExample:\nvar problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, \"Order already shipped\");\nproblem.setType(URI.create(\"https://api.example.com/problems/order-state\"));\nproblem.setProperty(\"code\", \"ORDER_ALREADY_SHIPPED\");\nreturn ResponseEntity.status(409).body(problem);",
    "difficulty": "advanced",
    "codeExample": "var problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, \"Order already shipped\");\nproblem.setType(URI.create(\"https://api.example.com/problems/order-state\"));\nproblem.setProperty(\"code\", \"ORDER_ALREADY_SHIPPED\");\nreturn ResponseEntity.status(409).body(problem);",
    "codeLanguage": "java",
    "commonMistakes": [
      "Do not use the detail text as a machine-readable contract."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you represent multiple field validation errors?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-038",
    "technology": "spring-boot",
    "topic": "Request binding",
    "question": "How do @PathVariable, @RequestParam and @RequestBody differ?",
    "shortAnswer": "They bind URI path segments, request parameters and the request body respectively.",
    "detailedAnswer": "Use path variables to identify resources, query parameters for filtering and pagination, and a request body for structured input. MVC converts path and query strings to declared Java types. Request bodies are read through message converters. Invalid UUIDs or malformed JSON can fail before business logic executes. Do not put credentials or sensitive data in URLs because they may be logged.\n\nExample (illustrative excerpt):\n@GetMapping(\"/customers/{id}/orders\")\nList<OrderDto> list(@PathVariable UUID id, @RequestParam(defaultValue=\"OPEN\") String status) {\n    return service.findByCustomer(id, status);\n}\n\nCommon mistake: Avoid accepting unbounded filter values or trusting customer IDs for authorization.\n\nInterview follow-up: How do you customize parameter conversion?",
    "detailedAnswerTelugu": "@PathVariable resource ID కోసం, @RequestParam filter లేదా page కోసం, @RequestBody JSON input కోసం ఉపయోగిస్తాం. Spring string values ను UUID వంటి types కు convert చేస్తుంది. తప్పు format ఉంటే service execute కాకముందే error రావచ్చు. Sensitive data URL లో పెట్టకూడదు.\n\nExample:\n@GetMapping(\"/customers/{id}/orders\")\nList<OrderDto> list(@PathVariable UUID id, @RequestParam(defaultValue=\"OPEN\") String status) {\n    return service.findByCustomer(id, status);\n}",
    "difficulty": "beginner",
    "codeExample": "@GetMapping(\"/customers/{id}/orders\")\nList<OrderDto> list(@PathVariable UUID id, @RequestParam(defaultValue=\"OPEN\") String status) {\n    return service.findByCustomer(id, status);\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Avoid accepting unbounded filter values or trusting customer IDs for authorization."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you customize parameter conversion?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-039",
    "technology": "spring-boot",
    "topic": "API versioning",
    "question": "How should REST APIs be versioned?",
    "shortAnswer": "Version breaking contract changes while preserving compatibility for existing clients.",
    "detailedAnswer": "URI versioning is explicit and easy to route; header or media-type versioning keeps resource URIs stable but needs careful gateway and cache configuration. Additive fields are often compatible but strict clients can still break. Maintain contract tests, document deprecation and migrate clients before removing a version. Version public contracts independently of internal service releases.\n\nExample (illustrative excerpt):\n@RestController\n@RequestMapping(\"/api/v1/orders\")\nclass OrderV1Controller { /* v1 contract */ }\n@RestController\n@RequestMapping(\"/api/v2/orders\")\nclass OrderV2Controller { /* v2 contract */ }\n\nCommon mistake: Do not create a new API version for every deployment.\n\nInterview follow-up: How would you migrate a required field without breaking clients?",
    "detailedAnswerTelugu": "API contract లో breaking change వస్తే version ఇవ్వాలి. /v1/orders, /v2/orders వంటి URLs సులభంగా అర్థమవుతాయి. Header versioning లో cache మరియు gateway configuration జాగ్రత్తగా చేయాలి. పాత clients migrate అయ్యే వరకు పాత version support చేయాలి.\n\nExample:\n@RestController\n@RequestMapping(\"/api/v1/orders\")\nclass OrderV1Controller { /* v1 contract */ }\n@RestController\n@RequestMapping(\"/api/v2/orders\")\nclass OrderV2Controller { /* v2 contract */ }",
    "difficulty": "intermediate",
    "codeExample": "@RestController\n@RequestMapping(\"/api/v1/orders\")\nclass OrderV1Controller { /* v1 contract */ }\n@RestController\n@RequestMapping(\"/api/v2/orders\")\nclass OrderV2Controller { /* v2 contract */ }",
    "codeLanguage": "java",
    "commonMistakes": [
      "Do not create a new API version for every deployment."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you migrate a required field without breaking clients?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-040",
    "technology": "spring-boot",
    "topic": "Pagination",
    "question": "How do you design pagination and sorting for large datasets?",
    "shortAnswer": "Use bounded page sizes and stable ordering; consider cursor pagination for large or changing datasets.",
    "detailedAnswer": "Offset pagination is simple but large offsets can be expensive and concurrent inserts can shift results. Keyset pagination uses a stable ordered tuple such as createdAt and id, with a matching index. A Page may require a count query; Slice can avoid total counts. Validate page size and allowlist sortable fields. Expose a stable response DTO instead of relying on framework serialization internals.\n\nExample (illustrative excerpt):\nPageRequest page = PageRequest.of(0, 20, Sort.by(\"createdAt\").descending().and(Sort.by(\"id\").descending()));\nPage<OrderDto> result = repository.findAll(page).map(mapper::toDto);\n\nCommon mistake: Do not allow unlimited page sizes.\n\nInterview follow-up: When would you choose Slice instead of Page?",
    "detailedAnswerTelugu": "పెద్ద dataset మొత్తం ఒకేసారి పంపకూడదు. Page size limit పెట్టాలి. Offset pagination లో కొత్త records వస్తే duplicates లేదా missing records రావచ్చు. createdAt మరియు id ఆధారంగా cursor pagination చేస్తే పెద్ద datasets లో ఉపయోగకరంగా ఉంటుంది. Sort fields allowlist చేయాలి.\n\nExample:\nPageRequest page = PageRequest.of(0, 20, Sort.by(\"createdAt\").descending().and(Sort.by(\"id\").descending()));\nPage<OrderDto> result = repository.findAll(page).map(mapper::toDto);",
    "difficulty": "advanced",
    "codeExample": "PageRequest page = PageRequest.of(0, 20, Sort.by(\"createdAt\").descending().and(Sort.by(\"id\").descending()));\nPage<OrderDto> result = repository.findAll(page).map(mapper::toDto);",
    "codeLanguage": "java",
    "commonMistakes": [
      "Do not allow unlimited page sizes."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "When would you choose Slice instead of Page?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-041",
    "technology": "spring-boot",
    "topic": "Idempotency",
    "question": "How do you implement idempotent POST requests?",
    "shortAnswer": "Persist a client idempotency key with request identity and outcome using atomic coordination.",
    "detailedAnswer": "For order creation, scope the key to the authenticated client and operation. Store a request fingerprint and enforce uniqueness in durable storage. Concurrent requests must not both execute the side effect. Return the stored outcome for the same key and payload; reject conflicting payloads. Coordinate external effects through an outbox or downstream idempotency and define retention and in-progress behavior.\n\nExample (illustrative excerpt):\nPOST /orders\nIdempotency-Key: 9f23-order-001\n\n-- database constraint\nUNIQUE (client_id, operation, idempotency_key)\n\nCommon mistake: A check-then-insert without a unique constraint is race-prone.\n\nInterview follow-up: How do you recover after a crash between payment and response persistence?",
    "detailedAnswerTelugu": "Network timeout తర్వాత client అదే POST మళ్లీ పంపవచ్చు. Idempotency-Key ను customer మరియు operation తో కలిపి database లో unique గా store చేయాలి. అదే key తో వేరే payload వస్తే reject చేయాలి. Concurrent requests రెండూ order create చేయకుండా atomic transaction అవసరం. External payment కోసం కూడా idempotency అవసరం.\n\nExample:\nPOST /orders\nIdempotency-Key: 9f23-order-001\n\n-- database constraint\nUNIQUE (client_id, operation, idempotency_key)",
    "difficulty": "expert",
    "codeExample": "POST /orders\nIdempotency-Key: 9f23-order-001\n\n-- database constraint\nUNIQUE (client_id, operation, idempotency_key)",
    "codeLanguage": "text",
    "commonMistakes": [
      "A check-then-insert without a unique constraint is race-prone."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you recover after a crash between payment and response persistence?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-042",
    "technology": "spring-boot",
    "topic": "Concurrency control",
    "question": "How do ETags and If-Match prevent lost updates?",
    "shortAnswer": "Conditional requests reject updates based on stale resource versions.",
    "detailedAnswer": "Return a strong ETag representing the resource version. Require If-Match on updates and compare it to the current representation version. A failed condition returns 412; a policy requiring a missing precondition can return 428. The version check and write must be atomic, for example using a JPA @Version field. An ETag comparison in a controller alone is not sufficient.\n\nExample (illustrative excerpt):\nGET /orders/42\nETag: \"v7\"\n\nPUT /orders/42\nIf-Match: \"v7\"\n\nHTTP/1.1 412 Precondition Failed\n\nCommon mistake: Do not compare versions separately from the actual write.\n\nInterview follow-up: How does optimistic locking complement HTTP preconditions?",
    "detailedAnswerTelugu": "రెండు users ఒకే order edit చేస్తే ఒకరి update మరొకరి update ను overwrite చేయవచ్చు. ETag ద్వారా version client కు పంపాలి. If-Match లో పాత version వస్తే 412 ఇవ్వాలి. Database update లో @Version వంటి optimistic locking ఉపయోగించి atomic check చేయాలి.\n\nExample:\nGET /orders/42\nETag: \"v7\"\n\nPUT /orders/42\nIf-Match: \"v7\"\n\nHTTP/1.1 412 Precondition Failed",
    "difficulty": "expert",
    "codeExample": "GET /orders/42\nETag: \"v7\"\n\nPUT /orders/42\nIf-Match: \"v7\"\n\nHTTP/1.1 412 Precondition Failed",
    "codeLanguage": "text",
    "commonMistakes": [
      "Do not compare versions separately from the actual write."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How does optimistic locking complement HTTP preconditions?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-043",
    "technology": "spring-boot",
    "topic": "API caching",
    "question": "How do HTTP caching headers improve REST API performance?",
    "shortAnswer": "Use Cache-Control and validators such as ETag to reduce unnecessary transfers.",
    "detailedAnswer": "Cache-Control defines freshness and storage rules. A client can send If-None-Match with an ETag; a matching GET representation returns 304 without a body. Use private or no-store as appropriate for sensitive personalized responses. Vary identifies request headers that affect representation selection. HTTP caching differs from application-level Redis caching and must respect authorization boundaries.\n\nExample (illustrative excerpt):\nGET /catalog/42\nIf-None-Match: \"catalog-v3\"\n\nHTTP/1.1 304 Not Modified\nETag: \"catalog-v3\"\nCache-Control: public, max-age=60\n\nCommon mistake: Never publicly cache private order information.\n\nInterview follow-up: What is the difference between no-cache and no-store?",
    "detailedAnswerTelugu": "Cache-Control ద్వారా response ఎంతకాలం cache చేయాలో నిర్ణయించవచ్చు. Client If-None-Match పంపితే data మారకపోతే 304 వస్తుంది. Customer-specific sensitive data shared cache లో store కాకుండా private లేదా no-store ఉపయోగించాలి. Redis caching మరియు HTTP caching వేర్వేరు.\n\nExample:\nGET /catalog/42\nIf-None-Match: \"catalog-v3\"\n\nHTTP/1.1 304 Not Modified\nETag: \"catalog-v3\"\nCache-Control: public, max-age=60",
    "difficulty": "advanced",
    "codeExample": "GET /catalog/42\nIf-None-Match: \"catalog-v3\"\n\nHTTP/1.1 304 Not Modified\nETag: \"catalog-v3\"\nCache-Control: public, max-age=60",
    "codeLanguage": "text",
    "commonMistakes": [
      "Never publicly cache private order information."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "What is the difference between no-cache and no-store?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-044",
    "technology": "spring-boot",
    "topic": "Asynchronous APIs",
    "question": "How do you design a REST API for long-running operations?",
    "shortAnswer": "Return 202 Accepted with a durable operation identifier and a status endpoint.",
    "detailedAnswer": "A large order export should not occupy an HTTP worker for minutes. Persist a job and enqueue work reliably, then return 202 and a Location pointing to its status. Model queued, running, succeeded and failed states; enforce ownership on status and result endpoints. Use retry policies, idempotency and retention. An in-memory @Async task alone cannot guarantee recovery after process restart.\n\nExample (illustrative excerpt):\nPOST /order-exports\nHTTP/1.1 202 Accepted\nLocation: /operations/abc123\n\nGET /operations/abc123\n{\"status\":\"RUNNING\"}\n\nCommon mistake: Do not report completion before durable work finishes.\n\nInterview follow-up: How would an outbox prevent lost jobs?",
    "detailedAnswerTelugu": "పెద్ద report generate చేయడానికి HTTP request ను ఎక్కువసేపు open ఉంచకూడదు. Job ను durable storage లో save చేసి queue ద్వారా process చేయాలి. 202 తో status URL ఇవ్వాలి. Client status check చేయవచ్చు. Application restart అయినా job recover అయ్యేలా design చేయాలి.\n\nExample:\nPOST /order-exports\nHTTP/1.1 202 Accepted\nLocation: /operations/abc123\n\nGET /operations/abc123\n{\"status\":\"RUNNING\"}",
    "difficulty": "expert",
    "codeExample": "POST /order-exports\nHTTP/1.1 202 Accepted\nLocation: /operations/abc123\n\nGET /operations/abc123\n{\"status\":\"RUNNING\"}",
    "codeLanguage": "text",
    "commonMistakes": [
      "Do not report completion before durable work finishes."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How would an outbox prevent lost jobs?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-045",
    "technology": "spring-boot",
    "topic": "Enterprise REST design",
    "question": "How would you design a production-ready Order Management REST API?",
    "shortAnswer": "Define explicit contracts, transactional boundaries, security, failure semantics and observability.",
    "detailedAnswer": "Start with resource contracts and DTOs. Validate input, authorize each resource access and enforce state transitions in the service. Use transactions for order persistence and an outbox for events. Protect creation with idempotency keys and updates with optimistic locking. Publish consistent ProblemDetail errors, bounded pagination and OpenAPI contracts. Test concurrent retries, authorization failures and rollback behavior. Record correlation IDs and latency metrics without logging secrets.\n\nExample (illustrative excerpt):\nPOST /orders                 -> 201 + Location\nGET /orders/{id}             -> 200 + ETag\nGET /orders?limit=20         -> 200 + next cursor\nPOST /orders/{id}/cancellations -> 201 or 409\n\nController -> Service -> Repository + Outbox (one transaction)\n\nCommon mistake: Do not assume a gateway alone enforces object-level authorization.\n\nInterview follow-up: How would you handle a payment success followed by inventory failure?",
    "detailedAnswerTelugu": "Production Order API లో controller request binding మాత్రమే చేయాలి; service లో business rules, authorization మరియు transaction boundaries ఉండాలి. Order create కోసం idempotency, update కోసం optimistic locking ఉపయోగించాలి. Events కోసం outbox ఉపయోగిస్తే database commit మరియు event publishing మధ్య సమస్యలు తగ్గుతాయి. Error contract, pagination, tests, metrics అన్నీ అవసరం.\n\nExample:\nPOST /orders                 -> 201 + Location\nGET /orders/{id}             -> 200 + ETag\nGET /orders?limit=20         -> 200 + next cursor\nPOST /orders/{id}/cancellations -> 201 or 409\n\nController -> Service -> Repository + Outbox (one transaction)",
    "difficulty": "expert",
    "codeExample": "POST /orders                 -> 201 + Location\nGET /orders/{id}             -> 200 + ETag\nGET /orders?limit=20         -> 200 + next cursor\nPOST /orders/{id}/cancellations -> 201 or 409\n\nController -> Service -> Repository + Outbox (one transaction)",
    "codeLanguage": "text",
    "commonMistakes": [
      "Do not assume a gateway alone enforces object-level authorization."
    ],
    "interviewTips": [
      "Explain the contract, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you handle a payment success followed by inventory failure?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-046",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "JPA vs Hibernate vs Spring Data JPA?",
    "shortAnswer": "JPA is a specification, Hibernate implements it, and Spring Data JPA adds repository abstractions.",
    "detailedAnswer": "Jakarta Persistence defines mapping, entity lifecycle and EntityManager contracts. Hibernate translates those operations into SQL and manages the persistence context. Spring Data generates repository implementations and delegates to JPA. A repository is not a separate ORM.\n\nExample (illustrative excerpt):\ninterface OrderRepository extends JpaRepository<Order, Long> {}\n\nEnterprise scenario: Use repository methods for ordinary CRUD and EntityManager for specialized persistence operations.\n\nCommon mistake: Assuming Spring Data replaces Hibernate.\n\nFollow-up: Can you switch JPA providers without changing all repositories?",
    "detailedAnswerTelugu": "JPA అనేది entity mapping మరియు EntityManager కోసం specification. Hibernate దానికి implementation; SQL తయారు చేసి persistence context నిర్వహిస్తుంది. Spring Data JPA repository implementation ను అందించి JPA ద్వారా database తో పని చేస్తుంది.\n\nExample:\ninterface OrderRepository extends JpaRepository<Order, Long> {}",
    "difficulty": "beginner",
    "codeExample": "interface OrderRepository extends JpaRepository<Order, Long> {}",
    "codeLanguage": "java",
    "realTimeScenario": "Use repository methods for ordinary CRUD and EntityManager for specialized persistence operations.",
    "commonMistakes": [
      "Assuming Spring Data replaces Hibernate."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "Can you switch JPA providers without changing all repositories?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-047",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Entity lifecycle and entity states?",
    "shortAnswer": "Entities can be new, managed, detached or removed.",
    "detailedAnswer": "A new entity has no managed identity. persist makes it managed; find returns a managed instance. Detach or closing the context stops automatic change tracking. merge copies state into a managed instance and returns it; the input remains detached. remove schedules deletion. SQL timing depends on flush and ID generation.\n\nExample (illustrative excerpt):\nOrder managed = em.merge(detachedOrder);\nmanaged.setStatus(Status.PAID);\n\nEnterprise scenario: Update an order received from a previous transaction using a managed instance.\n\nCommon mistake: Ignoring the return value of merge.\n\nFollow-up: What happens when you modify a detached entity?",
    "detailedAnswerTelugu": "కొత్త entity మొదట transient state లో ఉంటుంది. persist చేస్తే managed అవుతుంది. Context మూసినప్పుడు detached అవుతుంది; మార్పులు automatic గా save కావు. merge detached object లోని state ను managed object కు copy చేసి దానిని return చేస్తుంది. remove deletion కోసం గుర్తిస్తుంది.\n\nExample:\nOrder managed = em.merge(detachedOrder);\nmanaged.setStatus(Status.PAID);",
    "difficulty": "intermediate",
    "codeExample": "Order managed = em.merge(detachedOrder);\nmanaged.setStatus(Status.PAID);",
    "codeLanguage": "java",
    "realTimeScenario": "Update an order received from a previous transaction using a managed instance.",
    "commonMistakes": [
      "Ignoring the return value of merge."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "What happens when you modify a detached entity?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-048",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Persistence context and first-level cache?",
    "shortAnswer": "The persistence context maintains entity identity and tracks managed state.",
    "detailedAnswer": "Within one context, repeated find calls for the same entity identity normally return the same Java instance without another SELECT. JPQL queries may still execute SQL. The context is not a global cache and must not be shared across threads. clear detaches all entities; flush synchronizes pending changes first when needed.\n\nExample (illustrative excerpt):\nOrder a = em.find(Order.class, 1L);\nOrder b = em.find(Order.class, 1L);\nassert a == b;\n\nEnterprise scenario: Avoid stale managed objects after bulk SQL updates by clearing or refreshing appropriately.\n\nCommon mistake: Treating the first-level cache as a distributed cache.\n\nFollow-up: How does second-level caching differ?",
    "detailedAnswerTelugu": "ఒక persistence context లో ఒకే ID ఉన్న entity ని find చేస్తే సాధారణంగా అదే Java object వస్తుంది. JPQL query మాత్రం SQL execute చేయవచ్చు. ఇది global cache కాదు. clear చేస్తే entities detached అవుతాయి; అవసరమైతే ముందుగా flush చేయాలి.\n\nExample:\nOrder a = em.find(Order.class, 1L);\nOrder b = em.find(Order.class, 1L);\nassert a == b;",
    "difficulty": "advanced",
    "codeExample": "Order a = em.find(Order.class, 1L);\nOrder b = em.find(Order.class, 1L);\nassert a == b;",
    "codeLanguage": "java",
    "realTimeScenario": "Avoid stale managed objects after bulk SQL updates by clearing or refreshing appropriately.",
    "commonMistakes": [
      "Treating the first-level cache as a distributed cache."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How does second-level caching differ?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-049",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Dirty checking and flushing?",
    "shortAnswer": "Hibernate detects changes to managed entities and synchronizes them at flush.",
    "detailedAnswer": "Hibernate commonly compares managed state with snapshots, or uses enhanced change tracking. A flush issues pending SQL but does not commit the transaction. AUTO flush may occur before relevant queries or commit. Constraints may fail at flush; rollback can still undo transactional SQL.\n\nExample (illustrative excerpt):\n@Transactional\npublic void pay(long id) {\n  Order o = em.find(Order.class, id);\n  o.setStatus(Status.PAID);\n  em.flush();\n}\n\nEnterprise scenario: Update order status without an explicit repository save when the entity is managed.\n\nCommon mistake: Assuming flush guarantees durable commit.\n\nFollow-up: When can flush occur before a query?",
    "detailedAnswerTelugu": "Managed entity fields మారినప్పుడు Hibernate dirty checking ద్వారా గుర్తిస్తుంది. flush సమయంలో SQL database కు పంపుతుంది కానీ commit కాదు. AUTO mode లో query ముందు లేదా commit ముందు flush జరగవచ్చు. Transaction rollback అయితే ఆ మార్పులు రద్దవుతాయి.\n\nExample:\n@Transactional\npublic void pay(long id) {\n  Order o = em.find(Order.class, id);\n  o.setStatus(Status.PAID);\n  em.flush();\n}",
    "difficulty": "advanced",
    "codeExample": "@Transactional\npublic void pay(long id) {\n  Order o = em.find(Order.class, id);\n  o.setStatus(Status.PAID);\n  em.flush();\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Update order status without an explicit repository save when the entity is managed.",
    "commonMistakes": [
      "Assuming flush guarantees durable commit."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "When can flush occur before a query?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-050",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Entity relationships and ownership?",
    "shortAnswer": "The owning side controls the database relationship mapping.",
    "detailedAnswer": "In a typical bidirectional one-to-many, the child ManyToOne owns the foreign key; the parent uses mappedBy. Maintain both Java references for consistency. Ownership is separate from cascade and fetch behavior. Prefer explicit lazy fetching on to-one associations where appropriate.\n\nExample (illustrative excerpt):\n// Order\n@OneToMany(mappedBy=\"order\")\nList<OrderLine> lines = new ArrayList<>();\n// OrderLine\n@ManyToOne(fetch=FetchType.LAZY)\n@JoinColumn(name=\"order_id\")\nOrder order;\n\nEnterprise scenario: Add a line to an order by setting both line.order and order.lines.\n\nCommon mistake: Updating only the inverse collection.\n\nFollow-up: Which side writes the foreign key?",
    "detailedAnswerTelugu": "Order మరియు OrderLine మధ్య child లో ManyToOne foreign key ను నిర్వహిస్తుంది. Parent లో mappedBy inverse side ను సూచిస్తుంది. Java objects లో రెండు references సరిగా update చేయాలి. Ownership, cascade, fetch వేర్వేరు విషయాలు.\n\nExample:\n// Order\n@OneToMany(mappedBy=\"order\")\nList<OrderLine> lines = new ArrayList<>();\n// OrderLine\n@ManyToOne(fetch=FetchType.LAZY)\n@JoinColumn(name=\"order_id\")\nOrder order;",
    "difficulty": "intermediate",
    "codeExample": "// Order\n@OneToMany(mappedBy=\"order\")\nList<OrderLine> lines = new ArrayList<>();\n// OrderLine\n@ManyToOne(fetch=FetchType.LAZY)\n@JoinColumn(name=\"order_id\")\nOrder order;",
    "codeLanguage": "java",
    "realTimeScenario": "Add a line to an order by setting both line.order and order.lines.",
    "commonMistakes": [
      "Updating only the inverse collection."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "Which side writes the foreign key?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-051",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Lazy loading vs eager loading?",
    "shortAnswer": "Lazy loading defers association retrieval; eager loading requires it to be available.",
    "detailedAnswer": "JPA defaults to eager for to-one and lazy for to-many; lazy to-one is a hint. Eager does not guarantee a single SQL join. Accessing an uninitialized association outside its context can fail in Hibernate. Fetch required data inside a transaction using projections, fetch joins or entity graphs.\n\nExample (illustrative excerpt):\n@EntityGraph(attributePaths=\"lines\")\nOptional<Order> findById(Long id);\n\nEnterprise scenario: Build an order details DTO before returning from the service.\n\nCommon mistake: Making every association eager to fix LazyInitializationException.\n\nFollow-up: Why can eager fetching still cause N+1?",
    "detailedAnswerTelugu": "Lazy loading లో association అవసరమైనప్పుడు load అవుతుంది. Eager లో ముందుగానే అందుబాటులో ఉండాలి కానీ ఒకే join query వస్తుందని హామీ లేదు. Context బయట lazy association access చేస్తే exception రావచ్చు. అవసరమైన data ను transaction లోనే DTO లేదా fetch join ద్వారా తీసుకోవాలి.\n\nExample:\n@EntityGraph(attributePaths=\"lines\")\nOptional<Order> findById(Long id);",
    "difficulty": "advanced",
    "codeExample": "@EntityGraph(attributePaths=\"lines\")\nOptional<Order> findById(Long id);",
    "codeLanguage": "java",
    "realTimeScenario": "Build an order details DTO before returning from the service.",
    "commonMistakes": [
      "Making every association eager to fix LazyInitializationException."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "Why can eager fetching still cause N+1?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-052",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "N+1 query problem and solutions?",
    "shortAnswer": "One parent query followed by separate association queries can cause N+1 SQL calls.",
    "detailedAnswer": "Loading 100 orders then accessing each lines collection may execute 101 queries. Inspect SQL counts and latency. Fetch joins or entity graphs can fetch required associations; batch fetching reduces round trips; DTO projections avoid unnecessary entities. Collection fetch joins with pagination can be expensive or require in-memory pagination; page IDs first then fetch details.\n\nExample (illustrative excerpt):\n@Query(\"select distinct o from Order o left join fetch o.lines where o.id in :ids\")\nList<Order> fetchDetails(@Param(\"ids\") List<Long> ids);\n\nEnterprise scenario: For an order list, page IDs and fetch details in a second query, restoring page order.\n\nCommon mistake: Using collection fetch joins blindly with Pageable.\n\nFollow-up: How would you measure query counts in integration tests?",
    "detailedAnswerTelugu": "100 orders తీసుకుని ప్రతి order lines ను విడిగా access చేస్తే 101 queries రావచ్చు. SQL count పరిశీలించాలి. Fetch join, entity graph, batch fetching లేదా DTO projection ఉపయోగించవచ్చు. Collection fetch join తో pagination సమస్య రావచ్చు; ముందుగా IDs page తీసుకుని తరువాత details fetch చేయడం మంచిది.\n\nExample:\n@Query(\"select distinct o from Order o left join fetch o.lines where o.id in :ids\")\nList<Order> fetchDetails(@Param(\"ids\") List<Long> ids);",
    "difficulty": "expert",
    "codeExample": "@Query(\"select distinct o from Order o left join fetch o.lines where o.id in :ids\")\nList<Order> fetchDetails(@Param(\"ids\") List<Long> ids);",
    "codeLanguage": "java",
    "realTimeScenario": "For an order list, page IDs and fetch details in a second query, restoring page order.",
    "commonMistakes": [
      "Using collection fetch joins blindly with Pageable."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How would you measure query counts in integration tests?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-053",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "JPQL vs native SQL vs Criteria API?",
    "shortAnswer": "JPQL queries entities, native SQL queries database tables, and Criteria builds queries programmatically.",
    "detailedAnswer": "JPQL uses entity names and mapped attributes, not table names. Native SQL is useful for vendor-specific features such as window functions but reduces portability. Criteria supports dynamic predicates and can use a generated metamodel. Bind parameters in all approaches; never concatenate untrusted input into query strings.\n\nExample (illustrative excerpt):\n@Query(\"select o from Order o where o.status = :status\")\nList<Order> findOrders(@Param(\"status\") Status status);\n\nEnterprise scenario: Use Criteria or Specifications for optional status, customer and date filters.\n\nCommon mistake: Concatenating user input into SQL or JPQL.\n\nFollow-up: When would a native query be preferable?",
    "detailedAnswerTelugu": "JPQL entity పేర్లు మరియు fields పై query చేస్తుంది. Native SQL database tables పై పనిచేస్తుంది; vendor-specific features ఉపయోగించవచ్చు. Criteria API dynamic filters నిర్మించడానికి ఉపయోగపడుతుంది. User input ను query string లో కలపకుండా parameters bind చేయాలి.\n\nExample:\n@Query(\"select o from Order o where o.status = :status\")\nList<Order> findOrders(@Param(\"status\") Status status);",
    "difficulty": "advanced",
    "codeExample": "@Query(\"select o from Order o where o.status = :status\")\nList<Order> findOrders(@Param(\"status\") Status status);",
    "codeLanguage": "java",
    "realTimeScenario": "Use Criteria or Specifications for optional status, customer and date filters.",
    "commonMistakes": [
      "Concatenating user input into SQL or JPQL."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "When would a native query be preferable?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-054",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Cascade types and orphan removal?",
    "shortAnswer": "Cascade propagates entity operations; orphan removal deletes disassociated privately owned children.",
    "detailedAnswer": "PERSIST and MERGE propagate corresponding operations. REMOVE propagates parent deletion; orphanRemoval can delete a child removed from a managed parent relationship. ALL includes additional operations such as REFRESH and DETACH. Avoid REMOVE on shared many-to-many entities. Database ON DELETE CASCADE is a separate mechanism.\n\nExample (illustrative excerpt):\n@OneToMany(mappedBy=\"order\", cascade=CascadeType.ALL, orphanRemoval=true)\nList<OrderLine> lines = new ArrayList<>();\n\nEnterprise scenario: Order lines are privately owned by their order, but products are shared across orders.\n\nCommon mistake: Cascading removal to shared Product entities.\n\nFollow-up: How does orphan removal differ from CascadeType.REMOVE?",
    "detailedAnswerTelugu": "Cascade ద్వారా parent పై చేసిన persist, merge, remove వంటి operations child కు వర్తిస్తాయి. orphanRemoval ద్వారా parent collection నుంచి తొలగించిన private child delete అవుతుంది. Shared entities పై CascadeType.REMOVE ప్రమాదకరం. Database cascade వేరే mechanism.\n\nExample:\n@OneToMany(mappedBy=\"order\", cascade=CascadeType.ALL, orphanRemoval=true)\nList<OrderLine> lines = new ArrayList<>();",
    "difficulty": "advanced",
    "codeExample": "@OneToMany(mappedBy=\"order\", cascade=CascadeType.ALL, orphanRemoval=true)\nList<OrderLine> lines = new ArrayList<>();",
    "codeLanguage": "java",
    "realTimeScenario": "Order lines are privately owned by their order, but products are shared across orders.",
    "commonMistakes": [
      "Cascading removal to shared Product entities."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How does orphan removal differ from CascadeType.REMOVE?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-055",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "How @Transactional works internally?",
    "shortAnswer": "Spring usually applies transaction advice through a proxy around a method invocation.",
    "detailedAnswer": "The interceptor resolves transaction metadata, obtains or joins a transaction through a transaction manager, invokes the target and commits or rolls back. By default unchecked exceptions and Errors trigger rollback; checked exceptions require an explicit rule unless defaults are customized. Self-invocation bypasses proxy advice. Keep remote calls outside long database transactions where possible.\n\nExample (illustrative excerpt):\n@Transactional(rollbackFor=IOException.class)\npublic void createOrder(Order order) throws IOException {\n  repository.save(order);\n  auditWriter.write(order);\n}\n\nEnterprise scenario: Persist an order and its outbox record atomically in one database transaction.\n\nCommon mistake: Catching an exception and assuming automatic rollback still occurs.\n\nFollow-up: Why does self-invocation bypass transactional advice?",
    "detailedAnswerTelugu": "Spring proxy method call ను intercept చేసి transaction manager ద్వారా transaction ప్రారంభిస్తుంది లేదా existing transaction లో చేరుతుంది. Method విజయవంతమైతే commit, failure rules ప్రకారం rollback చేస్తుంది. Default గా unchecked exceptions rollback చేస్తాయి. అదే class లో self-invocation చేస్తే proxy advice bypass అవుతుంది.\n\nExample:\n@Transactional(rollbackFor=IOException.class)\npublic void createOrder(Order order) throws IOException {\n  repository.save(order);\n  auditWriter.write(order);\n}",
    "difficulty": "expert",
    "codeExample": "@Transactional(rollbackFor=IOException.class)\npublic void createOrder(Order order) throws IOException {\n  repository.save(order);\n  auditWriter.write(order);\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Persist an order and its outbox record atomically in one database transaction.",
    "commonMistakes": [
      "Catching an exception and assuming automatic rollback still occurs."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "Why does self-invocation bypass transactional advice?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-056",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Transaction propagation?",
    "shortAnswer": "Propagation defines how a method participates in an existing transaction.",
    "detailedAnswer": "REQUIRED joins an existing transaction or creates one. REQUIRES_NEW suspends the outer transaction and starts an independent transaction, often requiring another connection. NESTED uses savepoints when supported by the transaction manager and resource. SUPPORTS, MANDATORY, NOT_SUPPORTED and NEVER express other participation rules. An inner REQUIRED rollback-only marker can cause UnexpectedRollbackException at outer commit.\n\nExample (illustrative excerpt):\n@Transactional(propagation=Propagation.REQUIRES_NEW)\npublic void recordAttempt(AuditAttempt attempt) {\n  auditRepository.save(attempt);\n}\n\nEnterprise scenario: An independent audit attempt may survive outer rollback, if that is the intended business rule.\n\nCommon mistake: Using REQUIRES_NEW for every method and exhausting the pool.\n\nFollow-up: How does NESTED differ from REQUIRES_NEW?",
    "detailedAnswerTelugu": "REQUIRED existing transaction ఉంటే అందులో చేరుతుంది. REQUIRES_NEW outer transaction ను suspend చేసి కొత్త transaction ప్రారంభిస్తుంది; అదనపు connection అవసరం కావచ్చు. NESTED support ఉంటే savepoint ఉపయోగిస్తుంది. Inner REQUIRED rollback-only అయితే outer commit సమయంలో UnexpectedRollbackException రావచ్చు.\n\nExample:\n@Transactional(propagation=Propagation.REQUIRES_NEW)\npublic void recordAttempt(AuditAttempt attempt) {\n  auditRepository.save(attempt);\n}",
    "difficulty": "expert",
    "codeExample": "@Transactional(propagation=Propagation.REQUIRES_NEW)\npublic void recordAttempt(AuditAttempt attempt) {\n  auditRepository.save(attempt);\n}",
    "codeLanguage": "java",
    "realTimeScenario": "An independent audit attempt may survive outer rollback, if that is the intended business rule.",
    "commonMistakes": [
      "Using REQUIRES_NEW for every method and exhausting the pool."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How does NESTED differ from REQUIRES_NEW?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-057",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Transaction isolation levels?",
    "shortAnswer": "Isolation controls which concurrent transaction effects are observable.",
    "detailedAnswer": "READ_UNCOMMITTED may permit dirty reads; READ_COMMITTED prevents dirty reads; REPEATABLE_READ additionally prevents nonrepeatable reads under the standard; SERIALIZABLE requires serial-equivalent outcomes. Actual database implementations differ, including phantom behavior and snapshot isolation. Higher isolation can increase conflicts and retries. Isolation settings normally apply when a new transaction starts.\n\nExample (illustrative excerpt):\n@Transactional(isolation=Isolation.SERIALIZABLE)\npublic void reserveInventory(long productId) {\n  // Read and update inventory in this transaction.\n}\n\nEnterprise scenario: Prevent conflicting reservations using an appropriate isolation or atomic conditional update and bounded retries.\n\nCommon mistake: Assuming all databases implement isolation identically.\n\nFollow-up: What is write skew and how can it be prevented?",
    "detailedAnswerTelugu": "Isolation concurrent transactions ఒకదానిపై మరొకటి చూపే ప్రభావాన్ని నియంత్రిస్తుంది. READ_COMMITTED uncommitted data చదవకుండా చేస్తుంది. REPEATABLE_READ repeated reads స్థిరంగా ఉండేలా చేస్తుంది. SERIALIZABLE serial execution కు సమానమైన ఫలితం ఇవ్వాలి. Database implementation బట్టి behavior మారుతుంది; conflicts వచ్చినప్పుడు retry అవసరం కావచ్చు.\n\nExample:\n@Transactional(isolation=Isolation.SERIALIZABLE)\npublic void reserveInventory(long productId) {\n  // Read and update inventory in this transaction.\n}",
    "difficulty": "expert",
    "codeExample": "@Transactional(isolation=Isolation.SERIALIZABLE)\npublic void reserveInventory(long productId) {\n  // Read and update inventory in this transaction.\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Prevent conflicting reservations using an appropriate isolation or atomic conditional update and bounded retries.",
    "commonMistakes": [
      "Assuming all databases implement isolation identically."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "What is write skew and how can it be prevented?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-058",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Optimistic vs pessimistic locking?",
    "shortAnswer": "Optimistic locking detects conflicts; pessimistic locking acquires database locks.",
    "detailedAnswer": "A Version field lets Hibernate check the version during updates and detect stale writes. Handle conflicts with a fresh transaction and appropriate retry or user feedback. PESSIMISTIC_WRITE typically obtains a database write lock until transaction end; exact SQL and timeout behavior vary. Keep locked transactions short and acquire locks consistently to reduce deadlocks.\n\nExample (illustrative excerpt):\n// Entity field\n@Version Long version;\n// Repository method\n@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"select o from Order o where o.id = :id\")\nOptional<Order> lockOrder(@Param(\"id\") Long id);\n\nEnterprise scenario: Use optimistic locking for order edits and consider short pessimistic locks for heavily contested records.\n\nCommon mistake: Retrying a failed optimistic update inside the same rollback-only transaction.\n\nFollow-up: How would you avoid lost updates in inventory?",
    "detailedAnswerTelugu": "Optimistic locking లో @Version ద్వారా concurrent update conflict గుర్తిస్తారు. Conflict వస్తే కొత్త transaction లో retry లేదా user కు సమాచారం ఇవ్వాలి. Pessimistic locking database lock తీసుకుని transaction ముగిసే వరకు ఉంచుతుంది. Lock ఉన్నప్పుడు transaction చిన్నదిగా ఉంచాలి.\n\nExample:\n// Entity field\n@Version Long version;\n// Repository method\n@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"select o from Order o where o.id = :id\")\nOptional<Order> lockOrder(@Param(\"id\") Long id);",
    "difficulty": "expert",
    "codeExample": "// Entity field\n@Version Long version;\n// Repository method\n@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"select o from Order o where o.id = :id\")\nOptional<Order> lockOrder(@Param(\"id\") Long id);",
    "codeLanguage": "java",
    "realTimeScenario": "Use optimistic locking for order edits and consider short pessimistic locks for heavily contested records.",
    "commonMistakes": [
      "Retrying a failed optimistic update inside the same rollback-only transaction."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How would you avoid lost updates in inventory?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-059",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "HikariCP connection pool management?",
    "shortAnswer": "HikariCP reuses database connections and bounds concurrent database access.",
    "detailedAnswer": "Spring Boot commonly uses HikariCP with JDBC/JPA when available. Size the pool against database capacity across all replicas, not just HTTP thread count. connectionTimeout limits waiting for a connection; maxLifetime should be below infrastructure-imposed connection lifetime where applicable. Monitor active, idle, pending and acquisition latency. Leak detection is diagnostic, not a repair.\n\nExample (illustrative excerpt):\nspring:\n  datasource:\n    hikari:\n      maximum-pool-size: 10\n      connection-timeout: 3000\n\nEnterprise scenario: For six replicas with pool size 10, budget up to 60 application connections plus other database clients.\n\nCommon mistake: Increasing pool size without measuring database saturation.\n\nFollow-up: How do you distinguish a leak from slow queries?",
    "detailedAnswerTelugu": "HikariCP database connections ను reuse చేస్తుంది. అన్ని application replicas కలిపి database capacity కు సరిపోయే pool size ఎంచుకోవాలి. connectionTimeout connection కోసం ఎంతసేపు వేచి ఉండాలో నిర్ణయిస్తుంది. Active, idle, pending metrics చూడాలి. Leak detection సమస్య గుర్తించడానికి మాత్రమే.\n\nExample:\nspring:\n  datasource:\n    hikari:\n      maximum-pool-size: 10\n      connection-timeout: 3000",
    "difficulty": "advanced",
    "codeExample": "spring:\n  datasource:\n    hikari:\n      maximum-pool-size: 10\n      connection-timeout: 3000",
    "codeLanguage": "yaml",
    "realTimeScenario": "For six replicas with pool size 10, budget up to 60 application connections plus other database clients.",
    "commonMistakes": [
      "Increasing pool size without measuring database saturation."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How do you distinguish a leak from slow queries?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-060",
    "technology": "spring-boot",
    "topic": "Spring Data JPA, Hibernate and Transactions",
    "question": "Production database performance optimization?",
    "shortAnswer": "Measure query plans, round trips, contention and pool metrics before optimizing.",
    "detailedAnswer": "Start with latency percentiles and slow query logs. Use EXPLAIN and appropriate indexes for filters and ordering; validate write overhead. Avoid N+1, select only needed columns, use bounded pages and batch writes where suitable. Bulk updates bypass normal managed-state synchronization and may bypass entity callbacks and version checks. Keep transactions short and monitor lock waits.\n\nExample (illustrative excerpt):\n-- PostgreSQL example\nCREATE INDEX idx_orders_customer_created\nON orders (customer_id, created_at DESC, id DESC);\nEXPLAIN SELECT id, created_at FROM orders\nWHERE customer_id = 42 ORDER BY created_at DESC, id DESC LIMIT 20;\n\nEnterprise scenario: Investigate a slow customer order history endpoint using query plans and realistic data volumes.\n\nCommon mistake: Adding indexes indiscriminately or benchmarking only tiny datasets.\n\nFollow-up: How would you implement keyset pagination for this query?",
    "detailedAnswerTelugu": "ముందుగా latency metrics, slow queries మరియు execution plans పరిశీలించాలి. Filter, sorting కు సరిపోయే indexes పెట్టాలి; write overhead కూడా చూడాలి. N+1 నివారించి అవసరమైన columns మాత్రమే fetch చేయాలి. Bulk updates తరువాత persistence context stale కావచ్చు. Transactions చిన్నవిగా ఉంచి lock waits monitor చేయాలి.\n\nExample:\n-- PostgreSQL example\nCREATE INDEX idx_orders_customer_created\nON orders (customer_id, created_at DESC, id DESC);\nEXPLAIN SELECT id, created_at FROM orders\nWHERE customer_id = 42 ORDER BY created_at DESC, id DESC LIMIT 20;",
    "difficulty": "expert",
    "codeExample": "-- PostgreSQL example\nCREATE INDEX idx_orders_customer_created\nON orders (customer_id, created_at DESC, id DESC);\nEXPLAIN SELECT id, created_at FROM orders\nWHERE customer_id = 42 ORDER BY created_at DESC, id DESC LIMIT 20;",
    "codeLanguage": "sql",
    "realTimeScenario": "Investigate a slow customer order history endpoint using query plans and realistic data volumes.",
    "commonMistakes": [
      "Adding indexes indiscriminately or benchmarking only tiny datasets."
    ],
    "interviewTips": [
      "Explain the mechanism and its production trade-offs."
    ],
    "followUpQuestions": [
      "How would you implement keyset pagination for this query?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-061",
    "technology": "spring-boot",
    "topic": "Spring Security architecture",
    "question": "How does Spring Security process an HTTP request?",
    "shortAnswer": "Servlet filters establish authentication and enforce authorization before the controller.",
    "detailedAnswer": "DelegatingFilterProxy bridges the servlet container to FilterChainProxy. The first matching SecurityFilterChain runs its ordered filters. Authentication filters establish a SecurityContext; AuthorizationFilter checks access rules. ExceptionTranslationFilter handles downstream authentication and access-denied exceptions. A stateless API authenticates each request rather than relying on a session.\n\nExample (java; illustrative excerpt):\nhttp.authorizeHttpRequests(a -> a.anyRequest().authenticated());\n\nEnterprise scenario: Protect order endpoints before business logic runs.\n\nCommon mistake: Assuming all matching chains execute.\n\nFollow-up: How does filter ordering affect exception handling?",
    "detailedAnswerTelugu": "Servlet container లో DelegatingFilterProxy request ను FilterChainProxy కి పంపుతుంది. మొదట match అయిన SecurityFilterChain మాత్రమే అమలవుతుంది. Authentication filters identity ని నిర్ధారించి SecurityContext లో ఉంచుతాయి. AuthorizationFilter permissions చెక్ చేస్తుంది. Stateless API లో ప్రతి request కి token validate చేయాలి.\n\nExample (java):\nhttp.authorizeHttpRequests(a -> a.anyRequest().authenticated());",
    "difficulty": "advanced",
    "codeExample": "http.authorizeHttpRequests(a -> a.anyRequest().authenticated());",
    "codeLanguage": "java",
    "realTimeScenario": "Protect order endpoints before business logic runs.",
    "commonMistakes": [
      "Assuming all matching chains execute."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How does filter ordering affect exception handling?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-062",
    "technology": "spring-boot",
    "topic": "Authentication and authorization",
    "question": "What is the difference between authentication and authorization?",
    "shortAnswer": "Authentication verifies identity; authorization checks permissions.",
    "detailedAnswer": "A valid token identifies a caller but does not automatically grant access to every order. Require a scope and check ownership using the authenticated subject. Missing or invalid credentials generally yield 401; an authenticated caller lacking permission generally receives 403.\n\nExample (java; illustrative excerpt):\n@PreAuthorize(\"hasAuthority('SCOPE_orders.read')\")\npublic OrderDto findOrder(long id) { return orders.findOwnedOrder(id); }\n\nEnterprise scenario: Prevent one customer reading another customer’s order.\n\nCommon mistake: Checking only whether a token exists.\n\nFollow-up: How do you prevent broken object-level authorization?",
    "detailedAnswerTelugu": "Authentication అంటే caller ఎవరో నిర్ధారించడం. Authorization అంటే ఆ caller కి operation చేసే permission ఉందో చూడటం. Token valid అయినా ఇతర customer order చూడటానికి permission ఉండకపోవచ్చు. Credentials లేకపోతే సాధారణంగా 401, permission లేకపోతే 403 వస్తుంది.\n\nExample (java):\n@PreAuthorize(\"hasAuthority('SCOPE_orders.read')\")\npublic OrderDto findOrder(long id) { return orders.findOwnedOrder(id); }",
    "difficulty": "beginner",
    "codeExample": "@PreAuthorize(\"hasAuthority('SCOPE_orders.read')\")\npublic OrderDto findOrder(long id) { return orders.findOwnedOrder(id); }",
    "codeLanguage": "java",
    "realTimeScenario": "Prevent one customer reading another customer’s order.",
    "commonMistakes": [
      "Checking only whether a token exists."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you prevent broken object-level authorization?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-063",
    "technology": "spring-boot",
    "topic": "SecurityFilterChain",
    "question": "How do you configure a stateless JWT resource server?",
    "shortAnswer": "Declare a SecurityFilterChain bean with authorization rules and OAuth2 resource server support.",
    "detailedAnswer": "Use the resource server starter and configure a trusted issuer. The JWT decoder verifies the signature and configured claims. Disable CSRF only for a dedicated API that accepts bearer tokens in headers and does not rely on automatically attached credentials. Match specific rules before broad rules.\n\nExample (java; illustrative excerpt):\n@Bean\nSecurityFilterChain api(HttpSecurity http) throws Exception {\n    return http.securityMatcher(\"/api/**\")\n        .csrf(c -> c.disable())\n        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n        .authorizeHttpRequests(a -> a.requestMatchers(HttpMethod.GET, \"/api/orders/**\").hasAuthority(\"SCOPE_orders.read\").anyRequest().denyAll())\n        .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults())).build();\n}\n\nEnterprise scenario: Expose only authorized read operations; configure a separate fallback chain to deny unmatched requests.\n\nCommon mistake: Leaving unmatched URLs outside every security chain.\n\nFollow-up: How do multiple filter chains interact?",
    "detailedAnswerTelugu": "SecurityFilterChain bean ద్వారా URL rules మరియు JWT authentication configure చేయవచ్చు. Trusted issuer ఆధారంగా decoder signature, claims validate చేస్తుంది. Browser cookies మీద ఆధారపడని header bearer token API కి మాత్రమే CSRF disable చేయడం సమంజసం. Specific rules ముందుగా పెట్టాలి.\n\nExample (java):\n@Bean\nSecurityFilterChain api(HttpSecurity http) throws Exception {\n    return http.securityMatcher(\"/api/**\")\n        .csrf(c -> c.disable())\n        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n        .authorizeHttpRequests(a -> a.requestMatchers(HttpMethod.GET, \"/api/orders/**\").hasAuthority(\"SCOPE_orders.read\").anyRequest().denyAll())\n        .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults())).build();\n}",
    "difficulty": "advanced",
    "codeExample": "@Bean\nSecurityFilterChain api(HttpSecurity http) throws Exception {\n    return http.securityMatcher(\"/api/**\")\n        .csrf(c -> c.disable())\n        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n        .authorizeHttpRequests(a -> a.requestMatchers(HttpMethod.GET, \"/api/orders/**\").hasAuthority(\"SCOPE_orders.read\").anyRequest().denyAll())\n        .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults())).build();\n}",
    "codeLanguage": "java",
    "realTimeScenario": "Expose only authorized read operations; configure a separate fallback chain to deny unmatched requests.",
    "commonMistakes": [
      "Leaving unmatched URLs outside every security chain."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do multiple filter chains interact?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-064",
    "technology": "spring-boot",
    "topic": "AuthenticationManager",
    "question": "How do AuthenticationManager and AuthenticationProvider work?",
    "shortAnswer": "The manager delegates authentication to suitable providers.",
    "detailedAnswer": "ProviderManager selects providers supporting the supplied Authentication type. A DaoAuthenticationProvider uses UserDetailsService and PasswordEncoder for username/password authentication. On success it returns authenticated identity and authorities. JWT resource servers use a different provider and decoder.\n\nExample (java; illustrative excerpt):\nAuthentication result = authenticationManager.authenticate(\n    UsernamePasswordAuthenticationToken.unauthenticated(username, password));\n\nEnterprise scenario: Authenticate an internal login flow without implementing password verification manually.\n\nCommon mistake: Treating an unauthenticated token as a trusted identity.\n\nFollow-up: What happens if no provider supports the token?",
    "detailedAnswerTelugu": "ProviderManager ఇచ్చిన Authentication type కి support చేసే providers ను ఉపయోగిస్తుంది. Username/password కోసం DaoAuthenticationProvider user details తీసుకుని PasswordEncoder ద్వారా password verify చేస్తుంది. Success అయితే authenticated identity, authorities వస్తాయి. JWT కోసం వేరే provider, decoder ఉంటాయి.\n\nExample (java):\nAuthentication result = authenticationManager.authenticate(\n    UsernamePasswordAuthenticationToken.unauthenticated(username, password));",
    "difficulty": "advanced",
    "codeExample": "Authentication result = authenticationManager.authenticate(\n    UsernamePasswordAuthenticationToken.unauthenticated(username, password));",
    "codeLanguage": "java",
    "realTimeScenario": "Authenticate an internal login flow without implementing password verification manually.",
    "commonMistakes": [
      "Treating an unauthenticated token as a trusted identity."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "What happens if no provider supports the token?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-065",
    "technology": "spring-boot",
    "topic": "Password security",
    "question": "How do UserDetailsService and PasswordEncoder work?",
    "shortAnswer": "Load account details and verify passwords using adaptive one-way hashing.",
    "detailedAnswer": "UserDetailsService retrieves the stored password hash, authorities and account flags. PasswordEncoder.matches verifies the raw password against the stored hash. Use a delegating encoder with adaptive algorithms and tune cost for your environment. Never log raw passwords or store reversible passwords.\n\nExample (java; illustrative excerpt):\n@Bean\nPasswordEncoder passwordEncoder() {\n    return PasswordEncoderFactories.createDelegatingPasswordEncoder();\n}\n// Registration: encoder.encode(rawPassword)\n// Login: encoder.matches(rawPassword, storedHash)\n\nEnterprise scenario: Store customer credentials safely and migrate older hashes during login.\n\nCommon mistake: Encoding the login password again and comparing strings despite random salts.\n\nFollow-up: How do you migrate a legacy password hash?",
    "detailedAnswerTelugu": "UserDetailsService database నుంచి password hash, authorities, account status తీసుకొస్తుంది. PasswordEncoder.matches raw password ని stored hash తో verify చేస్తుంది. Adaptive hashing వల్ల brute force ఖర్చు పెరుగుతుంది. Raw passwords ని database లో లేదా logs లో ఉంచకూడదు.\n\nExample (java):\n@Bean\nPasswordEncoder passwordEncoder() {\n    return PasswordEncoderFactories.createDelegatingPasswordEncoder();\n}\n// Registration: encoder.encode(rawPassword)\n// Login: encoder.matches(rawPassword, storedHash)",
    "difficulty": "intermediate",
    "codeExample": "@Bean\nPasswordEncoder passwordEncoder() {\n    return PasswordEncoderFactories.createDelegatingPasswordEncoder();\n}\n// Registration: encoder.encode(rawPassword)\n// Login: encoder.matches(rawPassword, storedHash)",
    "codeLanguage": "java",
    "realTimeScenario": "Store customer credentials safely and migrate older hashes during login.",
    "commonMistakes": [
      "Encoding the login password again and comparing strings despite random salts."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you migrate a legacy password hash?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-066",
    "technology": "spring-boot",
    "topic": "JWT",
    "question": "What is a JWT and how should it be validated?",
    "shortAnswer": "A signed JWT carries claims that must be cryptographically verified and checked against policy.",
    "detailedAnswer": "A typical signed JWT has header, payload and signature. Base64url encoding is not encryption. Verify signature using trusted keys and allowed algorithms, issuer, audience, expiry and not-before. Use short-lived tokens and key rotation; do not place secrets in claims. Configure issuer and audience on the resource server.\n\nExample (yaml; illustrative excerpt):\nspring:\n  security:\n    oauth2:\n      resourceserver:\n        jwt:\n          issuer-uri: https://identity.example.com\n          audiences: orders-api\n\nEnterprise scenario: Reject tokens issued for the billing API when presented to the orders API.\n\nCommon mistake: Decoding a JWT without verifying its signature.\n\nFollow-up: How does JWKS key rotation work?",
    "detailedAnswerTelugu": "Signed JWT లో header, payload, signature ఉంటాయి. Base64url encryption కాదు. Trusted key తో signature, issuer, audience, expiry, not-before claims verify చేయాలి. Token లో secrets పెట్టకూడదు. Short lifetime మరియు key rotation ఉపయోగించాలి.\n\nExample (yaml):\nspring:\n  security:\n    oauth2:\n      resourceserver:\n        jwt:\n          issuer-uri: https://identity.example.com\n          audiences: orders-api",
    "difficulty": "advanced",
    "codeExample": "spring:\n  security:\n    oauth2:\n      resourceserver:\n        jwt:\n          issuer-uri: https://identity.example.com\n          audiences: orders-api",
    "codeLanguage": "yaml",
    "realTimeScenario": "Reject tokens issued for the billing API when presented to the orders API.",
    "commonMistakes": [
      "Decoding a JWT without verifying its signature."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How does JWKS key rotation work?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-067",
    "technology": "spring-boot",
    "topic": "Token lifecycle",
    "question": "How do access and refresh tokens differ?",
    "shortAnswer": "Access tokens authorize API calls; refresh tokens obtain new access tokens from the authorization server.",
    "detailedAnswer": "Keep access tokens short-lived and audience restricted. Refresh tokens are sent only to the authorization server, stored securely and rotated or sender-constrained where appropriate. Detect refresh-token reuse and revoke the affected grant. JWT access tokens may remain valid until expiry unless additional revocation mechanisms exist.\n\nExample (http; illustrative excerpt):\nPOST /oauth2/token\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=refresh_token&refresh_token=REDACTED\n\nEnterprise scenario: Maintain a user session without repeatedly asking for credentials.\n\nCommon mistake: Logging refresh tokens or sending them to business services.\n\nFollow-up: How do you handle refresh token reuse?",
    "detailedAnswerTelugu": "Access token API calls కోసం. Refresh token authorization server నుంచి కొత్త access token పొందడానికి మాత్రమే. Refresh token ని resource API కి పంపకూడదు. Secure storage, rotation, reuse detection ఉపయోగించాలి. JWT revoke చేసినా expiry వరకు valid ఉండవచ్చు; అదనపు revocation mechanism అవసరం.\n\nExample (http):\nPOST /oauth2/token\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=refresh_token&refresh_token=REDACTED",
    "difficulty": "advanced",
    "codeExample": "POST /oauth2/token\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=refresh_token&refresh_token=REDACTED",
    "codeLanguage": "http",
    "realTimeScenario": "Maintain a user session without repeatedly asking for credentials.",
    "commonMistakes": [
      "Logging refresh tokens or sending them to business services."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you handle refresh token reuse?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-068",
    "technology": "spring-boot",
    "topic": "OAuth 2.0",
    "question": "Which OAuth 2.0 flows should enterprise applications use?",
    "shortAnswer": "Use authorization code with PKCE for user-facing clients and client credentials for service identities.",
    "detailedAnswer": "OAuth separates resource owner, client, authorization server and resource server. Authorization code with PKCE binds the code exchange to the initiating client. Client credentials represents an application, not a user. Avoid implicit and password grants in new systems. Validate redirect URIs and use TLS; confidential clients authenticate as required.\n\nExample (yaml; illustrative excerpt):\nspring:\n  security:\n    oauth2:\n      client:\n        registration:\n          inventory:\n            provider: corporate\n            authorization-grant-type: client_credentials\n            client-id: orders-service\n            client-secret: ${INVENTORY_CLIENT_SECRET}\n        provider:\n          corporate:\n            token-uri: https://identity.example.com/oauth2/token\n\nEnterprise scenario: Order service obtains an application token to call inventory.\n\nCommon mistake: Embedding client secrets in a public SPA.\n\nFollow-up: Why does PKCE protect against authorization code interception?",
    "detailedAnswerTelugu": "OAuth లో resource owner, client, authorization server, resource server పాత్రలు ఉంటాయి. User login flow కోసం authorization code + PKCE ఉపయోగించాలి. PKCE code exchange ని ప్రారంభించిన client తో bind చేస్తుంది. Client credentials service identity కోసం; user identity కాదు. కొత్త systems లో implicit, password grants వాడకూడదు.\n\nExample (yaml):\nspring:\n  security:\n    oauth2:\n      client:\n        registration:\n          inventory:\n            provider: corporate\n            authorization-grant-type: client_credentials\n            client-id: orders-service\n            client-secret: ${INVENTORY_CLIENT_SECRET}\n        provider:\n          corporate:\n            token-uri: https://identity.example.com/oauth2/token",
    "difficulty": "expert",
    "codeExample": "spring:\n  security:\n    oauth2:\n      client:\n        registration:\n          inventory:\n            provider: corporate\n            authorization-grant-type: client_credentials\n            client-id: orders-service\n            client-secret: ${INVENTORY_CLIENT_SECRET}\n        provider:\n          corporate:\n            token-uri: https://identity.example.com/oauth2/token",
    "codeLanguage": "yaml",
    "realTimeScenario": "Order service obtains an application token to call inventory.",
    "commonMistakes": [
      "Embedding client secrets in a public SPA."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "Why does PKCE protect against authorization code interception?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-069",
    "technology": "spring-boot",
    "topic": "OpenID Connect",
    "question": "What is the difference between OAuth 2.0 and OpenID Connect?",
    "shortAnswer": "OAuth delegates access; OIDC adds an identity layer for authentication.",
    "detailedAnswer": "OIDC requests the openid scope and returns an ID token containing identity claims. The client validates issuer, audience, signature, expiry and nonce where applicable. Access tokens are intended for resource servers; ID tokens are intended for the client. OAuth alone does not define a standard login identity assertion.\n\nExample (java; illustrative excerpt):\nhttp.oauth2Login(Customizer.withDefaults());\n// Configure an OIDC client registration with scope: openid, profile\n\nEnterprise scenario: Enable corporate single sign-on for an admin portal.\n\nCommon mistake: Sending an ID token to an API as an access token.\n\nFollow-up: What is the purpose of the nonce claim?",
    "detailedAnswerTelugu": "OAuth delegated access కోసం. OIDC దానికి identity layer జోడిస్తుంది. openid scope తో ID token వస్తుంది. Client signature, issuer, audience, expiry, అవసరమైన nonce validate చేస్తుంది. ID token client కోసం; access token API కోసం.\n\nExample (java):\nhttp.oauth2Login(Customizer.withDefaults());\n// Configure an OIDC client registration with scope: openid, profile",
    "difficulty": "advanced",
    "codeExample": "http.oauth2Login(Customizer.withDefaults());\n// Configure an OIDC client registration with scope: openid, profile",
    "codeLanguage": "java",
    "realTimeScenario": "Enable corporate single sign-on for an admin portal.",
    "commonMistakes": [
      "Sending an ID token to an API as an access token."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "What is the purpose of the nonce claim?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-070",
    "technology": "spring-boot",
    "topic": "CSRF",
    "question": "How does CSRF protection work?",
    "shortAnswer": "CSRF defenses prevent a malicious site from abusing credentials automatically attached by a browser.",
    "detailedAnswer": "A session cookie may accompany a cross-site request even if the attacker cannot read the response. Spring Security checks a CSRF token on unsafe methods by default. Keep protection for cookie-based applications, including JWT cookies. SameSite cookies are defense in depth. A header-only bearer API has a different threat model.\n\nExample (java; illustrative excerpt):\nhttp.csrf(Customizer.withDefaults());\n// Submit the server-provided CSRF token with POST forms.\n\nEnterprise scenario: Protect an authenticated admin portal from unauthorized order cancellation.\n\nCommon mistake: Disabling CSRF globally because an application uses JWT somewhere.\n\nFollow-up: Why is CORS not a replacement for CSRF protection?",
    "detailedAnswerTelugu": "Browser session cookie ని automatic గా పంపితే malicious site user తరఫున request చేయగలదు. Spring Security unsafe methods కోసం CSRF token చెక్ చేస్తుంది. Cookie ఆధారిత authentication లో CSRF protection ఉంచాలి. SameSite అదనపు రక్షణ మాత్రమే. Header bearer API కి threat model వేరు.\n\nExample (java):\nhttp.csrf(Customizer.withDefaults());\n// Submit the server-provided CSRF token with POST forms.",
    "difficulty": "advanced",
    "codeExample": "http.csrf(Customizer.withDefaults());\n// Submit the server-provided CSRF token with POST forms.",
    "codeLanguage": "java",
    "realTimeScenario": "Protect an authenticated admin portal from unauthorized order cancellation.",
    "commonMistakes": [
      "Disabling CSRF globally because an application uses JWT somewhere."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "Why is CORS not a replacement for CSRF protection?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-071",
    "technology": "spring-boot",
    "topic": "CORS",
    "question": "How do you configure CORS safely?",
    "shortAnswer": "Allow only required origins, methods and headers and process preflight before authentication.",
    "detailedAnswer": "Browsers enforce CORS for cross-origin script requests. Preflight OPTIONS often has no authentication credentials, so CORS processing must occur before security rejects it. Use explicit trusted origins and avoid wildcard origins with credentials. CORS is not server-side authorization.\n\nExample (java; illustrative excerpt):\n@Bean\nCorsConfigurationSource corsConfigurationSource() {\n    var c = new CorsConfiguration();\n    c.setAllowedOrigins(List.of(\"https://portal.example.com\"));\n    c.setAllowedMethods(List.of(\"GET\", \"POST\"));\n    c.setAllowedHeaders(List.of(\"Authorization\", \"Content-Type\"));\n    var source = new UrlBasedCorsConfigurationSource();\n    source.registerCorsConfiguration(\"/api/**\", c);\n    return source;\n}\n// In the filter chain: http.cors(Customizer.withDefaults());\n\nEnterprise scenario: Allow a React portal to call the order API.\n\nCommon mistake: Allowing arbitrary origins or treating CORS as authentication.\n\nFollow-up: Why can curl call an endpoint blocked by browser CORS?",
    "detailedAnswerTelugu": "Browser cross-origin script requests కోసం CORS rules అమలు చేస్తుంది. Preflight OPTIONS request లో credentials లేకపోవచ్చు. అందువల్ల security కంటే ముందు CORS processing జరగాలి. అవసరమైన origins, methods, headers మాత్రమే allow చేయాలి. CORS authorization కాదు.\n\nExample (java):\n@Bean\nCorsConfigurationSource corsConfigurationSource() {\n    var c = new CorsConfiguration();\n    c.setAllowedOrigins(List.of(\"https://portal.example.com\"));\n    c.setAllowedMethods(List.of(\"GET\", \"POST\"));\n    c.setAllowedHeaders(List.of(\"Authorization\", \"Content-Type\"));\n    var source = new UrlBasedCorsConfigurationSource();\n    source.registerCorsConfiguration(\"/api/**\", c);\n    return source;\n}\n// In the filter chain: http.cors(Customizer.withDefaults());",
    "difficulty": "intermediate",
    "codeExample": "@Bean\nCorsConfigurationSource corsConfigurationSource() {\n    var c = new CorsConfiguration();\n    c.setAllowedOrigins(List.of(\"https://portal.example.com\"));\n    c.setAllowedMethods(List.of(\"GET\", \"POST\"));\n    c.setAllowedHeaders(List.of(\"Authorization\", \"Content-Type\"));\n    var source = new UrlBasedCorsConfigurationSource();\n    source.registerCorsConfiguration(\"/api/**\", c);\n    return source;\n}\n// In the filter chain: http.cors(Customizer.withDefaults());",
    "codeLanguage": "java",
    "realTimeScenario": "Allow a React portal to call the order API.",
    "commonMistakes": [
      "Allowing arbitrary origins or treating CORS as authentication."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "Why can curl call an endpoint blocked by browser CORS?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-072",
    "technology": "spring-boot",
    "topic": "Method security",
    "question": "How does @PreAuthorize enforce business permissions?",
    "shortAnswer": "Method security evaluates authorization expressions before a proxied method executes.",
    "detailedAnswer": "Enable method security explicitly with @EnableMethodSecurity. Use authorities for scopes and roles, and enforce ownership or tenant constraints in business queries. Proxy-based interception may be bypassed by self-invocation. Test both permitted and denied paths.\n\nExample (java; illustrative excerpt):\n@EnableMethodSecurity\n@Configuration\nclass MethodSecurityConfig {}\n// On a service method:\n@PreAuthorize(\"hasAuthority('SCOPE_orders.write') and @orderAccess.canEdit(#id, authentication)\")\npublic void cancel(long id) { /* business operation */ }\n\nEnterprise scenario: Prevent support staff from cancelling orders outside their assigned tenant.\n\nCommon mistake: Relying solely on controller-level checks.\n\nFollow-up: How does self-invocation affect method security?",
    "detailedAnswerTelugu": "@EnableMethodSecurity ద్వారా method security enable చేయాలి. @PreAuthorize method అమలు ముందు expression evaluate చేస్తుంది. Scope తో పాటు ownership, tenant constraints కూడా చెక్ చేయాలి. అదే class లో self-invocation వల్ల proxy bypass కావచ్చు. Allow, deny scenarios రెండూ test చేయాలి.\n\nExample (java):\n@EnableMethodSecurity\n@Configuration\nclass MethodSecurityConfig {}\n// On a service method:\n@PreAuthorize(\"hasAuthority('SCOPE_orders.write') and @orderAccess.canEdit(#id, authentication)\")\npublic void cancel(long id) { /* business operation */ }",
    "difficulty": "advanced",
    "codeExample": "@EnableMethodSecurity\n@Configuration\nclass MethodSecurityConfig {}\n// On a service method:\n@PreAuthorize(\"hasAuthority('SCOPE_orders.write') and @orderAccess.canEdit(#id, authentication)\")\npublic void cancel(long id) { /* business operation */ }",
    "codeLanguage": "java",
    "realTimeScenario": "Prevent support staff from cancelling orders outside their assigned tenant.",
    "commonMistakes": [
      "Relying solely on controller-level checks."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How does self-invocation affect method security?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-073",
    "technology": "spring-boot",
    "topic": "Gateway security",
    "question": "How should an API gateway secure microservices?",
    "shortAnswer": "Authenticate and enforce coarse policies at the gateway while services enforce their own authorization.",
    "detailedAnswer": "The gateway can validate tokens, rate limit and route requests. Downstream services must validate trusted credentials and enforce object-level access. Strip spoofable identity headers at the edge. Token relay is appropriate only when the downstream audience and delegation policy permit it; otherwise use token exchange or service credentials.\n\nExample (java; illustrative excerpt):\n// Reactive gateway security excerpt\nhttp.authorizeExchange(a -> a.pathMatchers(\"/orders/**\")\n    .hasAuthority(\"SCOPE_orders.read\").anyExchange().denyAll())\n    .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));\n\nEnterprise scenario: Protect the public edge while retaining defense in depth in order services.\n\nCommon mistake: Trusting an arbitrary X-User-Id header.\n\nFollow-up: How do you prevent direct access bypassing the gateway?",
    "detailedAnswerTelugu": "Gateway token validation, rate limiting, routing చేయవచ్చు. Downstream services కూడా trusted credentials validate చేసి business permissions చెక్ చేయాలి. Client పంపిన spoofable identity headers తొలగించాలి. Audience సరిపోతేనే token relay చేయాలి; లేకపోతే token exchange లేదా service credentials ఉపయోగించాలి.\n\nExample (java):\n// Reactive gateway security excerpt\nhttp.authorizeExchange(a -> a.pathMatchers(\"/orders/**\")\n    .hasAuthority(\"SCOPE_orders.read\").anyExchange().denyAll())\n    .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));",
    "difficulty": "expert",
    "codeExample": "// Reactive gateway security excerpt\nhttp.authorizeExchange(a -> a.pathMatchers(\"/orders/**\")\n    .hasAuthority(\"SCOPE_orders.read\").anyExchange().denyAll())\n    .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));",
    "codeLanguage": "java",
    "realTimeScenario": "Protect the public edge while retaining defense in depth in order services.",
    "commonMistakes": [
      "Trusting an arbitrary X-User-Id header."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How do you prevent direct access bypassing the gateway?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-074",
    "technology": "spring-boot",
    "topic": "Service authentication",
    "question": "How do microservices authenticate each other?",
    "shortAnswer": "Use scoped service identities, short-lived credentials and optionally mutual TLS.",
    "detailedAnswer": "Client credentials tokens represent the calling workload. Validate audience and scopes at the receiving service. Mutual TLS authenticates transport peers but does not by itself establish business authorization. Use workload identity or secret managers and rotate credentials. Propagate user identity only through an explicit delegation design.\n\nExample (http; illustrative excerpt):\nGET /api/inventory/42\nAuthorization: Bearer SERVICE_ACCESS_TOKEN\n// Required audience: inventory-api; scope: inventory.read\n\nEnterprise scenario: Order service checks stock with least-privilege credentials.\n\nCommon mistake: Sharing one permanent token across all services.\n\nFollow-up: When would you choose token exchange over client credentials?",
    "detailedAnswerTelugu": "Client credentials token calling service identity ని సూచిస్తుంది. Receiving service audience, scopes validate చేయాలి. mTLS transport peer identity నిర్ధారిస్తుంది కానీ business permission స్వయంగా ఇవ్వదు. Workload identity లేదా secret manager వాడి credentials rotate చేయాలి. User identity delegation స్పష్టంగా design చేయాలి.\n\nExample (http):\nGET /api/inventory/42\nAuthorization: Bearer SERVICE_ACCESS_TOKEN\n// Required audience: inventory-api; scope: inventory.read",
    "difficulty": "expert",
    "codeExample": "GET /api/inventory/42\nAuthorization: Bearer SERVICE_ACCESS_TOKEN\n// Required audience: inventory-api; scope: inventory.read",
    "codeLanguage": "http",
    "realTimeScenario": "Order service checks stock with least-privilege credentials.",
    "commonMistakes": [
      "Sharing one permanent token across all services."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "When would you choose token exchange over client credentials?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-075",
    "technology": "spring-boot",
    "topic": "Enterprise security",
    "question": "How would you design security for an enterprise order platform?",
    "shortAnswer": "Combine centralized identity, least privilege, layered authorization, secure transport and continuous verification.",
    "detailedAnswer": "Use OIDC for portal login and OAuth resource servers for APIs. Validate tokens at the edge and each service, enforce tenant ownership, use scoped workload identities and TLS. Keep secrets out of code, rotate keys, redact logs and audit sensitive actions. Test expired tokens, wrong audiences, missing scopes and cross-tenant access. Monitor 401/403 rates without logging credentials.\n\nExample (java; illustrative excerpt):\n@Test\nvoid rejectsMissingScope() throws Exception {\n    mvc.perform(get(\"/api/orders/42\").with(jwt().authorities(\n        new SimpleGrantedAuthority(\"SCOPE_inventory.read\"))))\n        .andExpect(status().isForbidden());\n}\n// Mock JWT tests authorization, not real signature validation.\n\nEnterprise scenario: Design an order platform with separate customer, support and inventory permissions.\n\nCommon mistake: Testing only successful requests or assuming mocked JWT tests verify cryptography.\n\nFollow-up: How would you test actual issuer and signature validation?",
    "detailedAnswerTelugu": "Portal login కోసం OIDC, APIs కోసం OAuth resource servers ఉపయోగించాలి. Gateway తో పాటు ప్రతి service token validate చేయాలి. Tenant ownership, least privilege, TLS, scoped workload identities అమలు చేయాలి. Secrets code లో పెట్టకూడదు. Logs redact చేసి sensitive actions audit చేయాలి. Expired token, wrong audience, missing scope, cross-tenant access scenarios test చేయాలి.\n\nExample (java):\n@Test\nvoid rejectsMissingScope() throws Exception {\n    mvc.perform(get(\"/api/orders/42\").with(jwt().authorities(\n        new SimpleGrantedAuthority(\"SCOPE_inventory.read\"))))\n        .andExpect(status().isForbidden());\n}\n// Mock JWT tests authorization, not real signature validation.",
    "difficulty": "expert",
    "codeExample": "@Test\nvoid rejectsMissingScope() throws Exception {\n    mvc.perform(get(\"/api/orders/42\").with(jwt().authorities(\n        new SimpleGrantedAuthority(\"SCOPE_inventory.read\"))))\n        .andExpect(status().isForbidden());\n}\n// Mock JWT tests authorization, not real signature validation.",
    "codeLanguage": "java",
    "realTimeScenario": "Design an order platform with separate customer, support and inventory permissions.",
    "commonMistakes": [
      "Testing only successful requests or assuming mocked JWT tests verify cryptography."
    ],
    "interviewTips": [
      "Explain the security boundary, failure behavior and production trade-offs."
    ],
    "followUpQuestions": [
      "How would you test actual issuer and signature validation?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-076",
    "technology": "spring-boot",
    "topic": "Monolith vs microservices",
    "question": "When should you choose microservices over a modular monolith?",
    "shortAnswer": "Independent deployment and scaling can justify distributed-system complexity.",
    "detailedAnswer": "A modular monolith keeps domain modules in one deployment and can use local ACID transactions. Microservices separate deployment and ownership, but introduce network latency, partial failures, observability and eventual consistency. Start with clear module boundaries; split only when independent release cadence, scaling or ownership warrants it.\n\nExample (architecture; illustrative):\nOrder module → Catalog interface → Catalog module\nLater: Order service → HTTP API → Catalog service\n\nEnterprise scenario: Order and catalog modules share one deployment initially; extract catalog when its read traffic requires independent scaling.\n\nCommon mistake: Splitting every class into a service.\n\nInterview follow-up: What metrics justify extracting a service?",
    "detailedAnswerTelugu": "Modular monolith లో modules వేర్వేరుగా ఉన్నా deployment ఒకటే. Microservices లో ప్రతి service స్వతంత్రంగా deploy, scale చేయవచ్చు. కానీ network failures, distributed transactions, monitoring complexity పెరుగుతాయి. అవసరం ఉన్నప్పుడు మాత్రమే service ను విడదీయాలి.\n\nExample (architecture):\nOrder module → Catalog interface → Catalog module\nLater: Order service → HTTP API → Catalog service",
    "difficulty": "intermediate",
    "codeExample": "Order module → Catalog interface → Catalog module\nLater: Order service → HTTP API → Catalog service",
    "codeLanguage": "architecture",
    "realTimeScenario": "Order and catalog modules share one deployment initially; extract catalog when its read traffic requires independent scaling.",
    "commonMistakes": [
      "Splitting every class into a service."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "What metrics justify extracting a service?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-077",
    "technology": "spring-boot",
    "topic": "Domain-driven design",
    "question": "How do bounded contexts guide service decomposition?",
    "shortAnswer": "Split by business capabilities and model ownership, not technical layers.",
    "detailedAnswer": "A bounded context defines where a domain model and its language are consistent. An Order aggregate owns order invariants, while Inventory owns stock reservations. Use context maps and explicit contracts between them. A bounded context is a candidate service boundary, not a requirement to deploy exactly one service per context.\n\nExample (java; illustrative):\nrecord ReserveStock(UUID orderId, String sku, int quantity) {}\ninterface InventoryPort { void reserve(ReserveStock command); }\n\nEnterprise scenario: Order requests a reservation through Inventory rather than modifying stock tables.\n\nCommon mistake: Creating separate controller, service and repository microservices.\n\nInterview follow-up: How do you identify an aggregate boundary?",
    "detailedAnswerTelugu": "Bounded context అంటే business model కు స్పష్టమైన పరిధి. Order context లో order rules ఉంటాయి; Inventory context లో stock reservation rules ఉంటాయి. ఒక context లోని entity ని మరో context నేరుగా మార్చకూడదు. Business capability ఆధారంగా service boundary నిర్ణయించాలి.\n\nExample (java):\nrecord ReserveStock(UUID orderId, String sku, int quantity) {}\ninterface InventoryPort { void reserve(ReserveStock command); }",
    "difficulty": "advanced",
    "codeExample": "record ReserveStock(UUID orderId, String sku, int quantity) {}\ninterface InventoryPort { void reserve(ReserveStock command); }",
    "codeLanguage": "java",
    "realTimeScenario": "Order requests a reservation through Inventory rather than modifying stock tables.",
    "commonMistakes": [
      "Creating separate controller, service and repository microservices."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you identify an aggregate boundary?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-078",
    "technology": "spring-boot",
    "topic": "API Gateway",
    "question": "What is the API Gateway pattern?",
    "shortAnswer": "A gateway provides a controlled entry point for routing and cross-cutting policies.",
    "detailedAnswer": "A gateway routes requests to internal services and may enforce authentication, rate limits and request size limits. Keep business rules inside domain services and validate authorization there too. Deploy redundant gateway instances and configure timeouts. Avoid turning the gateway into a centralized business orchestration bottleneck.\n\nExample (yaml; illustrative):\nroutes:\n  - id: orders\n    uri: lb://order-service\n    predicates:\n      - Path=/orders/**\n# Route entry; enclosing configuration depends on Gateway version.\n\nEnterprise scenario: Route /orders to Order Service and /catalog to Catalog Service.\n\nCommon mistake: Trusting gateway authentication as the only authorization boundary.\n\nInterview follow-up: When is a backend-for-frontend preferable?",
    "detailedAnswerTelugu": "API Gateway client requests ను సరైన service కు route చేస్తుంది. Authentication, rate limiting వంటి common policies అమలు చేయవచ్చు. Business logic మాత్రం domain service లోనే ఉండాలి. Gateway failure వల్ల మొత్తం system ఆగకుండా multiple instances ఉంచాలి.\n\nExample (yaml):\nroutes:\n  - id: orders\n    uri: lb://order-service\n    predicates:\n      - Path=/orders/**\n# Route entry; enclosing configuration depends on Gateway version.",
    "difficulty": "advanced",
    "codeExample": "routes:\n  - id: orders\n    uri: lb://order-service\n    predicates:\n      - Path=/orders/**\n# Route entry; enclosing configuration depends on Gateway version.",
    "codeLanguage": "yaml",
    "realTimeScenario": "Route /orders to Order Service and /catalog to Catalog Service.",
    "commonMistakes": [
      "Trusting gateway authentication as the only authorization boundary."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "When is a backend-for-frontend preferable?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-079",
    "technology": "spring-boot",
    "topic": "Service discovery",
    "question": "How do service discovery and load balancing work?",
    "shortAnswer": "Resolve logical service names to healthy instances and distribute traffic.",
    "detailedAnswer": "Discovery can use a registry or platform DNS. Kubernetes Services provide a stable name and route traffic to ready endpoints; client-side load balancing is another option. Readiness removes unavailable instances from routing, but requests already in flight can still fail. Configure deadlines and bounded retries for safe operations.\n\nExample (java; illustrative):\nRestClient client = RestClient.builder()\n    .baseUrl(\"http://inventory-service\")\n    .build();\n// Configure request timeouts on the underlying HTTP client.\n\nEnterprise scenario: Order calls inventory through Kubernetes Service DNS.\n\nCommon mistake: Hardcoding pod IP addresses.\n\nInterview follow-up: How does readiness differ from liveness?",
    "detailedAnswerTelugu": "Service instances IP addresses మారవచ్చు. Discovery ద్వారా logical name తో instances గుర్తించవచ్చు. Kubernetes Service DNS స్థిరమైన పేరు అందిస్తుంది. Readiness ద్వారా ready కాని pods కు traffic తగ్గుతుంది. అయినా timeout, failure handling అవసరం.\n\nExample (java):\nRestClient client = RestClient.builder()\n    .baseUrl(\"http://inventory-service\")\n    .build();\n// Configure request timeouts on the underlying HTTP client.",
    "difficulty": "advanced",
    "codeExample": "RestClient client = RestClient.builder()\n    .baseUrl(\"http://inventory-service\")\n    .build();\n// Configure request timeouts on the underlying HTTP client.",
    "codeLanguage": "java",
    "realTimeScenario": "Order calls inventory through Kubernetes Service DNS.",
    "commonMistakes": [
      "Hardcoding pod IP addresses."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How does readiness differ from liveness?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-080",
    "technology": "spring-boot",
    "topic": "Communication",
    "question": "When should services use synchronous or asynchronous communication?",
    "shortAnswer": "Use synchronous calls for immediate results and messaging for decoupled workflows.",
    "detailedAnswer": "HTTP or gRPC gives immediate responses but couples availability and latency. Messaging buffers bursts and allows independent processing, but introduces eventual consistency, duplicates and ordering constraints. Use correlation IDs, idempotent consumers and explicit deadlines. A broker acknowledgment is not proof that the business operation completed.\n\nExample (java; illustrative):\nreturn ResponseEntity.accepted()\n    .location(URI.create(\"/orders/\" + orderId))\n    .build();\n\nEnterprise scenario: Return an accepted order and process fulfillment asynchronously.\n\nCommon mistake: Returning success for a payment before confirmation.\n\nInterview follow-up: How do you expose asynchronous operation status?",
    "detailedAnswerTelugu": "HTTP call లో response వెంటనే వస్తుంది కానీ downstream service availability మీద ఆధారపడుతుంది. Messaging లో producer, consumer విడిగా పని చేస్తాయి. Duplicate messages, ordering, eventual consistency నిర్వహించాలి. Broker acknowledgment అంటే business operation పూర్తయిందని కాదు.\n\nExample (java):\nreturn ResponseEntity.accepted()\n    .location(URI.create(\"/orders/\" + orderId))\n    .build();",
    "difficulty": "advanced",
    "codeExample": "return ResponseEntity.accepted()\n    .location(URI.create(\"/orders/\" + orderId))\n    .build();",
    "codeLanguage": "java",
    "realTimeScenario": "Return an accepted order and process fulfillment asynchronously.",
    "commonMistakes": [
      "Returning success for a payment before confirmation."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you expose asynchronous operation status?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-081",
    "technology": "spring-boot",
    "topic": "Database per service",
    "question": "Why should each microservice own its data?",
    "shortAnswer": "Private data ownership prevents schema coupling and enables independent evolution.",
    "detailedAnswer": "Each service controls its schema and writes through its own API. Separate logical schemas and credentials can be sufficient; a separate physical database is not mandatory. Cross-service queries use API composition or event-fed read models. Referential integrity across services becomes a workflow concern rather than a foreign key.\n\nExample (sql; illustrative):\nCREATE TABLE orders (id UUID PRIMARY KEY, customer_id UUID NOT NULL, status VARCHAR(30) NOT NULL);\n\nEnterprise scenario: Order stores customer ID and a purchase-time address snapshot, not a foreign key into Customer schema.\n\nCommon mistake: Sharing write access to the same tables across services.\n\nInterview follow-up: How do you handle cross-service reporting?",
    "detailedAnswerTelugu": "ప్రతి service తన data schema ను own చేయాలి. ఇతర service tables ను direct SQL ద్వారా మార్చకూడదు. Physical database వేరు కావాల్సిన అవసరం ఎప్పుడూ లేదు; permissions, schema ownership స్పష్టంగా ఉండాలి. Cross-service data కోసం API లేదా read model ఉపయోగించాలి.\n\nExample (sql):\nCREATE TABLE orders (id UUID PRIMARY KEY, customer_id UUID NOT NULL, status VARCHAR(30) NOT NULL);",
    "difficulty": "advanced",
    "codeExample": "CREATE TABLE orders (id UUID PRIMARY KEY, customer_id UUID NOT NULL, status VARCHAR(30) NOT NULL);",
    "codeLanguage": "sql",
    "realTimeScenario": "Order stores customer ID and a purchase-time address snapshot, not a foreign key into Customer schema.",
    "commonMistakes": [
      "Sharing write access to the same tables across services."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you handle cross-service reporting?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-082",
    "technology": "spring-boot",
    "topic": "Distributed transactions",
    "question": "How does two-phase commit work and what are its limitations?",
    "shortAnswer": "2PC coordinates prepare and commit across participating transactional resources.",
    "detailedAnswer": "During prepare, participants durably record whether they can commit. The coordinator decides commit only if all vote yes; otherwise abort. Prepared participants may hold locks while awaiting a decision, and coordinator failure can delay resolution. XA requires compatible resources and operational recovery. It does not automatically include arbitrary HTTP APIs.\n\nExample (text; illustrative):\nCoordinator → PREPARE → A, B\nA, B → YES → Coordinator\nCoordinator → durable COMMIT decision → A, B\n\nEnterprise scenario: Prefer local transactions plus Saga for a payment provider that does not support XA.\n\nCommon mistake: Assuming @Transactional spans remote HTTP calls.\n\nInterview follow-up: What happens if the coordinator crashes after prepare?",
    "detailedAnswerTelugu": "2PC లో coordinator మొదట participants ను prepare చేయమంటుంది. అందరూ yes అంటే commit decision తీసుకుంటుంది. Failure సమయంలో prepared transactions locks పట్టుకుని ఉండవచ్చు. XA support ఉన్న resources అవసరం; సాధారణ HTTP API ని transaction లో ఆటోమేటిక్ గా చేర్చలేము.\n\nExample (text):\nCoordinator → PREPARE → A, B\nA, B → YES → Coordinator\nCoordinator → durable COMMIT decision → A, B",
    "difficulty": "expert",
    "codeExample": "Coordinator → PREPARE → A, B\nA, B → YES → Coordinator\nCoordinator → durable COMMIT decision → A, B",
    "codeLanguage": "text",
    "realTimeScenario": "Prefer local transactions plus Saga for a payment provider that does not support XA.",
    "commonMistakes": [
      "Assuming @Transactional spans remote HTTP calls."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "What happens if the coordinator crashes after prepare?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-083",
    "technology": "spring-boot",
    "topic": "Saga",
    "question": "How does the Saga pattern maintain business consistency?",
    "shortAnswer": "A Saga coordinates local transactions and compensating actions.",
    "detailedAnswer": "Each step commits locally. If a later step fails, compensations undo the business effect where possible. Compensation is not a database rollback and can itself fail; persist workflow state, retry safely and escalate unresolved cases. Use idempotency keys and explicit intermediate states.\n\nExample (text; illustrative):\nPENDING → STOCK_RESERVED → PAYMENT_AUTHORIZED → CONFIRMED\nPayment rejected → RELEASE_STOCK → CANCELLED\n\nEnterprise scenario: Reserve inventory, authorize payment, then confirm order; release reservation if payment fails.\n\nCommon mistake: Assuming compensation always succeeds or is invisible to users.\n\nInterview follow-up: How do you handle a payment timeout with unknown outcome?",
    "detailedAnswerTelugu": "Saga లో ప్రతి step తన local transaction commit చేస్తుంది. తర్వాత step fail అయితే ముందరి business effect ను compensation ద్వారా సరిచేస్తాం. ఇది database rollback కాదు. Compensation కూడా fail కావచ్చు కాబట్టి state persist చేసి retry లేదా manual resolution ఏర్పాటు చేయాలి.\n\nExample (text):\nPENDING → STOCK_RESERVED → PAYMENT_AUTHORIZED → CONFIRMED\nPayment rejected → RELEASE_STOCK → CANCELLED",
    "difficulty": "expert",
    "codeExample": "PENDING → STOCK_RESERVED → PAYMENT_AUTHORIZED → CONFIRMED\nPayment rejected → RELEASE_STOCK → CANCELLED",
    "codeLanguage": "text",
    "realTimeScenario": "Reserve inventory, authorize payment, then confirm order; release reservation if payment fails.",
    "commonMistakes": [
      "Assuming compensation always succeeds or is invisible to users."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you handle a payment timeout with unknown outcome?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-084",
    "technology": "spring-boot",
    "topic": "Saga coordination",
    "question": "Compare orchestration and choreography.",
    "shortAnswer": "Orchestration uses an explicit coordinator; choreography uses event reactions.",
    "detailedAnswer": "An orchestrator persists workflow state and sends commands, simplifying visibility for complex processes. Choreography lets services react to domain events without a central workflow controller, but dependencies can become implicit and cyclic. Both need durable messages, deduplication, correlation and recovery. Choose based on workflow complexity and ownership.\n\nExample (text; illustrative):\nOrchestrator → ReserveStock → Inventory\nInventory → StockReserved → Orchestrator\nOrchestrator → AuthorizePayment → Payment\n\nEnterprise scenario: An order orchestrator issues ReserveStock and AuthorizePayment commands and records replies.\n\nCommon mistake: Using an in-memory orchestrator without durable state.\n\nInterview follow-up: How would you version a running Saga?",
    "detailedAnswerTelugu": "Orchestration లో coordinator ప్రతి step ను నిర్వహిస్తుంది. Choreography లో services events ఆధారంగా స్పందిస్తాయి. Complex workflow లో orchestrator వల్ల state tracking సులభం. Choreography లో hidden dependencies రావచ్చు. రెండింటిలో duplicate handling, correlation అవసరం.\n\nExample (text):\nOrchestrator → ReserveStock → Inventory\nInventory → StockReserved → Orchestrator\nOrchestrator → AuthorizePayment → Payment",
    "difficulty": "expert",
    "codeExample": "Orchestrator → ReserveStock → Inventory\nInventory → StockReserved → Orchestrator\nOrchestrator → AuthorizePayment → Payment",
    "codeLanguage": "text",
    "realTimeScenario": "An order orchestrator issues ReserveStock and AuthorizePayment commands and records replies.",
    "commonMistakes": [
      "Using an in-memory orchestrator without durable state."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How would you version a running Saga?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-085",
    "technology": "spring-boot",
    "topic": "CQRS",
    "question": "What is CQRS and when is it useful?",
    "shortAnswer": "CQRS separates command models from query models.",
    "detailedAnswer": "Commands enforce business invariants; queries return read-optimized projections. Separate models may use the same database or distinct stores. Event-driven projections can lag, so expose freshness and handle read-your-writes requirements. CQRS does not require event sourcing and adds complexity when ordinary CRUD is enough.\n\nExample (java; illustrative):\nrecord PlaceOrder(UUID customerId, List<String> skus) {}\nrecord OrderSummary(UUID id, String status, BigDecimal total) {}\n\nEnterprise scenario: Order writes normalized data while a projection supports customer order history searches.\n\nCommon mistake: Assuming the read projection is always immediately consistent.\n\nInterview follow-up: How do you rebuild a projection safely?",
    "detailedAnswerTelugu": "CQRS లో write commands business rules అమలు చేస్తాయి; read queries display కోసం optimized model వాడతాయి. Read model కొంత ఆలస్యంగా update కావచ్చు. CQRS కు event sourcing తప్పనిసరి కాదు. Simple CRUD కు unnecessary complexity వద్దు.\n\nExample (java):\nrecord PlaceOrder(UUID customerId, List<String> skus) {}\nrecord OrderSummary(UUID id, String status, BigDecimal total) {}",
    "difficulty": "expert",
    "codeExample": "record PlaceOrder(UUID customerId, List<String> skus) {}\nrecord OrderSummary(UUID id, String status, BigDecimal total) {}",
    "codeLanguage": "java",
    "realTimeScenario": "Order writes normalized data while a projection supports customer order history searches.",
    "commonMistakes": [
      "Assuming the read projection is always immediately consistent."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you rebuild a projection safely?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-086",
    "technology": "spring-boot",
    "topic": "Event sourcing",
    "question": "How does event sourcing differ from traditional persistence?",
    "shortAnswer": "Persist domain events as the source of truth and reconstruct state from them.",
    "detailedAnswer": "An aggregate is rebuilt by applying ordered immutable events. Append with an expected stream version to detect concurrent changes. Snapshots can reduce replay cost but are derived state. Plan event schema evolution, replay side effects, retention and privacy requirements. An audit log alone is not event sourcing.\n\nExample (text; illustrative):\nstream order-123: v1 OrderPlaced → v2 StockReserved → v3 OrderConfirmed\nappend(event, expectedVersion=3)\n\nEnterprise scenario: Rebuild an order from OrderPlaced, StockReserved and OrderConfirmed events.\n\nCommon mistake: Replaying events while sending real payment requests again.\n\nInterview follow-up: How do you evolve old event schemas?",
    "detailedAnswerTelugu": "Event sourcing లో current state మాత్రమే కాకుండా domain events source of truth గా నిల్వ చేస్తాం. Events వరుసగా apply చేసి state తిరిగి నిర్మిస్తాం. Expected version తో concurrent writes గుర్తించవచ్చు. Snapshots replay వేగం పెంచుతాయి. Replay సమయంలో external side effects మళ్లీ జరగకూడదు.\n\nExample (text):\nstream order-123: v1 OrderPlaced → v2 StockReserved → v3 OrderConfirmed\nappend(event, expectedVersion=3)",
    "difficulty": "expert",
    "codeExample": "stream order-123: v1 OrderPlaced → v2 StockReserved → v3 OrderConfirmed\nappend(event, expectedVersion=3)",
    "codeLanguage": "text",
    "realTimeScenario": "Rebuild an order from OrderPlaced, StockReserved and OrderConfirmed events.",
    "commonMistakes": [
      "Replaying events while sending real payment requests again."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you evolve old event schemas?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-087",
    "technology": "spring-boot",
    "topic": "Transactional outbox",
    "question": "How does the transactional outbox solve the dual-write problem?",
    "shortAnswer": "Write business data and an outbox event in the same local transaction.",
    "detailedAnswer": "A database commit and Kafka publish are not normally atomic together. Save an outbox row in the business transaction, then publish using CDC or a polling relay. A crash after publish but before marking sent can cause duplicates, so consumers must deduplicate using a stable event ID. Preserve per-aggregate ordering when required.\n\nExample (java; illustrative):\n@Transactional\npublic void place(Order order) {\n    orders.save(order);\n    outbox.save(OutboxEvent.orderPlaced(order));\n}\n// Relay publishes committed rows separately.\n\nEnterprise scenario: Order creation and OrderPlaced outbox event commit together.\n\nCommon mistake: Claiming outbox guarantees exactly-once business processing.\n\nInterview follow-up: How do you monitor outbox lag and retry failures?",
    "detailedAnswerTelugu": "Database update మరియు Kafka publish రెండు వేరు operations. ఒకటి success ఇంకొకటి fail కావచ్చు. Business row తో పాటు outbox row ను ఒకే local transaction లో save చేస్తాం. Relay తర్వాత publish చేస్తుంది. Duplicate events రావచ్చు కాబట్టి consumer event ID ద్వారా deduplicate చేయాలి.\n\nExample (java):\n@Transactional\npublic void place(Order order) {\n    orders.save(order);\n    outbox.save(OutboxEvent.orderPlaced(order));\n}\n// Relay publishes committed rows separately.",
    "difficulty": "expert",
    "codeExample": "@Transactional\npublic void place(Order order) {\n    orders.save(order);\n    outbox.save(OutboxEvent.orderPlaced(order));\n}\n// Relay publishes committed rows separately.",
    "codeLanguage": "java",
    "realTimeScenario": "Order creation and OrderPlaced outbox event commit together.",
    "commonMistakes": [
      "Claiming outbox guarantees exactly-once business processing."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you monitor outbox lag and retry failures?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-088",
    "technology": "spring-boot",
    "topic": "Strangler Fig",
    "question": "How do you migrate a monolith using the Strangler Fig pattern?",
    "shortAnswer": "Incrementally replace capabilities behind a routing boundary.",
    "detailedAnswer": "Introduce a facade or gateway, extract one capability and route selected traffic to the new service. Use an anti-corruption layer to translate legacy contracts. Migrate data with explicit ownership, backfill and reconciliation; avoid uncontrolled dual writes. Use canary rollout and a rollback plan that accounts for data changes.\n\nExample (text; illustrative):\nClient → Gateway → legacy orders\n                 → new catalog service\nCanary → validate → increase traffic → retire legacy route\n\nEnterprise scenario: Extract catalog reads first, then migrate catalog writes after validating data parity.\n\nCommon mistake: Removing legacy functionality before data and traffic are verified.\n\nInterview follow-up: How do you roll back after migrating write ownership?",
    "detailedAnswerTelugu": "Strangler Fig లో monolith ను ఒకేసారి మార్చకుండా ఒక్కో capability extract చేస్తాం. Gateway ద్వారా traffic కొత్త service కు మళ్లిస్తాం. Legacy model ను translate చేయడానికి anti-corruption layer వాడతాం. Data migration, reconciliation, rollback ముందే plan చేయాలి.\n\nExample (text):\nClient → Gateway → legacy orders\n                 → new catalog service\nCanary → validate → increase traffic → retire legacy route",
    "difficulty": "advanced",
    "codeExample": "Client → Gateway → legacy orders\n                 → new catalog service\nCanary → validate → increase traffic → retire legacy route",
    "codeLanguage": "text",
    "realTimeScenario": "Extract catalog reads first, then migrate catalog writes after validating data parity.",
    "commonMistakes": [
      "Removing legacy functionality before data and traffic are verified."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How do you roll back after migrating write ownership?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-089",
    "technology": "spring-boot",
    "topic": "Distributed caching",
    "question": "How do you maintain consistency with distributed caching?",
    "shortAnswer": "Use explicit freshness policies, invalidation and database-backed correctness.",
    "detailedAnswer": "Cache-aside reads the cache first, then loads and stores missing values. Invalidate after successful database commit, but concurrent reads can repopulate stale values. TTL bounds typical staleness, not strict consistency. Use versioned values or coordinated invalidation when needed, jitter TTLs and prevent stampedes. Do not use stale cache values to authorize stock or payments.\n\nExample (sql; illustrative):\nUPDATE inventory SET available = available - :qty\nWHERE sku = :sku AND available >= :qty;\n-- Require positive qty; check affected row count.\n\nEnterprise scenario: Cache catalog descriptions but reserve stock through an atomic database update.\n\nCommon mistake: Using cached stock as the final authority for checkout.\n\nInterview follow-up: How would you prevent cache stampedes?",
    "detailedAnswerTelugu": "Cache-aside లో cache miss అయితే database నుంచి చదివి cache లో ఉంచుతాం. Database commit తర్వాత invalidate చేయాలి. Concurrent reads వల్ల stale value మళ్లీ cache లో రావచ్చు. TTL, versioning, stampede protection ఉపయోగించాలి. Stock reservation వంటి critical decision database rules తో చేయాలి.\n\nExample (sql):\nUPDATE inventory SET available = available - :qty\nWHERE sku = :sku AND available >= :qty;\n-- Require positive qty; check affected row count.",
    "difficulty": "expert",
    "codeExample": "UPDATE inventory SET available = available - :qty\nWHERE sku = :sku AND available >= :qty;\n-- Require positive qty; check affected row count.",
    "codeLanguage": "sql",
    "realTimeScenario": "Cache catalog descriptions but reserve stock through an atomic database update.",
    "commonMistakes": [
      "Using cached stock as the final authority for checkout."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How would you prevent cache stampedes?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-090",
    "technology": "spring-boot",
    "topic": "Enterprise architecture",
    "question": "Design an enterprise e-commerce microservices platform.",
    "shortAnswer": "Separate domain ownership, coordinate checkout durably and design for failure.",
    "detailedAnswer": "Use gateway, identity provider, Catalog, Order, Inventory and Payment services. Order accepts an idempotency key and persists a pending order plus outbox event. A durable Saga reserves stock and authorizes payment, compensating on rejection. Use timeouts, bounded retries, dead-letter handling, trace propagation and metrics for checkout latency and stuck workflows. Define SLOs and test failure recovery before scaling.\n\nExample (text; illustrative):\nClient → Gateway → Order DB + Outbox\nOutbox → Broker → Saga → Inventory / Payment\nSaga → Order status → Client polls status\nAll services → traces, metrics, logs\n\nEnterprise scenario: Handle duplicate checkout requests, inventory rejection and payment timeouts without double charging.\n\nCommon mistake: Designing only the happy path or retrying payment without idempotency.\n\nInterview follow-up: How would you reconcile an unknown payment outcome?",
    "detailedAnswerTelugu": "Gateway, Identity Provider, Catalog, Order, Inventory, Payment services గా business responsibilities విభజించాలి. Order idempotency key తో pending order మరియు outbox event save చేస్తుంది. Durable Saga stock reserve చేసి payment authorize చేస్తుంది. Failure అయితే compensation అమలు చేస్తుంది. Timeouts, retries, tracing, stuck workflow alerts ఏర్పాటు చేయాలి.\n\nExample (text):\nClient → Gateway → Order DB + Outbox\nOutbox → Broker → Saga → Inventory / Payment\nSaga → Order status → Client polls status\nAll services → traces, metrics, logs",
    "difficulty": "expert",
    "codeExample": "Client → Gateway → Order DB + Outbox\nOutbox → Broker → Saga → Inventory / Payment\nSaga → Order status → Client polls status\nAll services → traces, metrics, logs",
    "codeLanguage": "text",
    "realTimeScenario": "Handle duplicate checkout requests, inventory rejection and payment timeouts without double charging.",
    "commonMistakes": [
      "Designing only the happy path or retrying payment without idempotency."
    ],
    "interviewTips": [
      "Explain the trade-offs and failure recovery, not just the pattern definition."
    ],
    "followUpQuestions": [
      "How would you reconcile an unknown payment outcome?"
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-091",
    "technology": "spring-boot",
    "topic": "Fault tolerance",
    "question": "How do cascading failures occur in microservices?",
    "shortAnswer": "A slow dependency consumes caller resources, spreading overload through the service graph.",
    "detailedAnswer": "If Payment takes 30 seconds, Order threads and connections remain occupied. Queues grow, clients retry and healthy dependencies may also become unreachable. Bound concurrency and queues, propagate deadlines, reject excess work and isolate dependencies. Fault tolerance does not mean every request succeeds; it means failures remain contained.\n\nExample (illustrative):\nOrder → Payment (slow) → bounded timeout → controlled 503\n\nCommon mistake: Unlimited queues hide overload until resources are exhausted.\n\nInterview follow-up: How would you identify thread starvation?",
    "detailedAnswerTelugu": "Payment service నెమ్మదిగా స్పందిస్తే Order service threads, connections ఎక్కువసేపు busy అవుతాయి. Queue పెరిగి retries వల్ల ఇతర services కూడా overload అవుతాయి. ప్రతి dependency కి timeout, concurrency limit పెట్టాలి. అవసరమైతే request ను త్వరగా reject చేయాలి. Failure ఒక service నుంచి మరొక service కి వ్యాపించకుండా చూడటమే fault tolerance.\n\nExample:\nOrder → Payment (slow) → bounded timeout → controlled 503",
    "difficulty": "advanced",
    "codeExample": "Order → Payment (slow) → bounded timeout → controlled 503",
    "codeLanguage": "text",
    "commonMistakes": [
      "Unlimited queues hide overload until resources are exhausted."
    ],
    "followUpQuestions": [
      "How would you identify thread starvation?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-092",
    "technology": "spring-boot",
    "topic": "Circuit breaker",
    "question": "How does a circuit breaker work?",
    "shortAnswer": "It stops calls to an unhealthy dependency and periodically probes recovery.",
    "detailedAnswer": "CLOSED records outcomes and permits calls. When the configured failure or slow-call threshold is reached after minimum calls, OPEN rejects calls without contacting the dependency. After the wait duration, HALF_OPEN allows a limited number of probes. Their outcomes determine whether it closes or reopens. It is not a timeout or a concurrency limiter.\n\nExample (illustrative):\nCLOSED → OPEN → HALF_OPEN → CLOSED (healthy probes)\n                         → OPEN (failed probes)\n\nCommon mistake: Assuming an open breaker cancels already running calls.\n\nInterview follow-up: What happens when minimumNumberOfCalls is not reached?",
    "detailedAnswerTelugu": "CLOSED state లో requests downstream కి వెళ్తాయి. Minimum calls పూర్తయ్యాక failure rate threshold దాటితే OPEN అవుతుంది. OPEN లో downstream కి call చేయకుండా reject చేస్తుంది. Wait duration తర్వాత HALF_OPEN లో కొన్ని test calls అనుమతిస్తుంది. వాటి ఫలితాన్ని బట్టి CLOSED లేదా OPEN అవుతుంది. ఇది timeout లేదా concurrency limit కి ప్రత్యామ్నాయం కాదు.\n\nExample:\nCLOSED → OPEN → HALF_OPEN → CLOSED (healthy probes)\n                         → OPEN (failed probes)",
    "difficulty": "advanced",
    "codeExample": "CLOSED → OPEN → HALF_OPEN → CLOSED (healthy probes)\n                         → OPEN (failed probes)",
    "codeLanguage": "text",
    "commonMistakes": [
      "Assuming an open breaker cancels already running calls."
    ],
    "followUpQuestions": [
      "What happens when minimumNumberOfCalls is not reached?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-093",
    "technology": "spring-boot",
    "topic": "Circuit breaker configuration",
    "question": "How do you configure a Resilience4j circuit breaker?",
    "shortAnswer": "Define a named breaker with thresholds and apply it to the dependency boundary.",
    "detailedAnswer": "With the compatible Resilience4j Spring Boot integration and AOP support, annotate a public method called through a Spring proxy. This configuration evaluates the last 20 calls after at least 10 outcomes; 50 percent failures can open it. Classify exceptions carefully: business validation errors should not normally count as dependency failures. Configure HTTP client deadlines separately.\n\nExample (illustrative):\nresilience4j:\n  circuitbreaker:\n    instances:\n      payment:\n        slidingWindowSize: 20\n        minimumNumberOfCalls: 10\n        failureRateThreshold: 50\n        waitDurationInOpenState: 10s\n\n# Java method annotation: @CircuitBreaker(name = \"payment\")\n\nCommon mistake: Using one breaker for unrelated dependencies.\n\nInterview follow-up: How do recordExceptions and ignoreExceptions affect statistics?",
    "detailedAnswerTelugu": "Compatible Resilience4j integration మరియు AOP ఉన్నప్పుడు Spring proxy ద్వారా call అయ్యే public method మీద annotation పెట్టాలి. ఈ configuration చివరి 20 calls ను పరిశీలిస్తుంది. కనీసం 10 calls తర్వాత 50 శాతం failures ఉంటే breaker open అవుతుంది. Business validation errors ను dependency failures గా లెక్కించకూడదు. HTTP timeout విడిగా configure చేయాలి.\n\nExample:\nresilience4j:\n  circuitbreaker:\n    instances:\n      payment:\n        slidingWindowSize: 20\n        minimumNumberOfCalls: 10\n        failureRateThreshold: 50\n        waitDurationInOpenState: 10s\n\n# Java method annotation: @CircuitBreaker(name = \"payment\")",
    "difficulty": "expert",
    "codeExample": "resilience4j:\n  circuitbreaker:\n    instances:\n      payment:\n        slidingWindowSize: 20\n        minimumNumberOfCalls: 10\n        failureRateThreshold: 50\n        waitDurationInOpenState: 10s\n\n# Java method annotation: @CircuitBreaker(name = \"payment\")",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Using one breaker for unrelated dependencies."
    ],
    "followUpQuestions": [
      "How do recordExceptions and ignoreExceptions affect statistics?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-094",
    "technology": "spring-boot",
    "topic": "Sliding windows",
    "question": "Compare count-based and time-based sliding windows.",
    "shortAnswer": "Count-based windows retain the last N outcomes; time-based windows aggregate outcomes in the last N seconds.",
    "detailedAnswer": "A count window of 100 calls reacts according to traffic volume; during a spike it may represent only milliseconds. A time window of 30 seconds retains a consistent observation interval but the sample size varies. Both require a minimum number of calls before evaluating rates. Select based on traffic and recovery goals, not arbitrary defaults.\n\nExample (illustrative):\nslidingWindowType: TIME_BASED\nslidingWindowSize: 30\nminimumNumberOfCalls: 20\n\nCommon mistake: Confusing window size with maximum concurrent requests.\n\nInterview follow-up: Which window suits a low-traffic service?",
    "detailedAnswerTelugu": "Count-based window చివరి N calls ఫలితాలను చూస్తుంది. Traffic ఎక్కువైతే 100 calls చాలా తక్కువ సమయంలోనే పూర్తవుతాయి. Time-based window చివరి N seconds లో జరిగిన calls ను చూస్తుంది. Traffic తక్కువైతే sample చిన్నదిగా ఉంటుంది. రెండు విధానాల్లో minimum calls అవసరం. Service traffic ఆధారంగా window ఎంచుకోవాలి.\n\nExample:\nslidingWindowType: TIME_BASED\nslidingWindowSize: 30\nminimumNumberOfCalls: 20",
    "difficulty": "expert",
    "codeExample": "slidingWindowType: TIME_BASED\nslidingWindowSize: 30\nminimumNumberOfCalls: 20",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Confusing window size with maximum concurrent requests."
    ],
    "followUpQuestions": [
      "Which window suits a low-traffic service?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-095",
    "technology": "spring-boot",
    "topic": "Retry",
    "question": "When should a microservice retry a failed call?",
    "shortAnswer": "Retry transient failures only when repeating the operation is safe and within a deadline.",
    "detailedAnswer": "Retry connection failures or selected temporary responses according to the API contract. Do not retry validation failures. A payment timeout is ambiguous: the charge may already have succeeded. Use a durable idempotency key and reconcile unknown outcomes. Limit attempts across layers; three attempts at each of three layers can cause 27 downstream attempts.\n\nExample (illustrative):\nresilience4j:\n  retry:\n    instances:\n      inventory:\n        maxAttempts: 3\n        waitDuration: 200ms\n\nCommon mistake: Retrying every exception or treating maxAttempts as additional retries.\n\nInterview follow-up: Where should retries be owned in a service chain?",
    "detailedAnswerTelugu": "Temporary network failure వచ్చినప్పుడు operation మళ్లీ చేయడం safe అయితేనే retry చేయాలి. Validation error కు retry అవసరం లేదు. Payment timeout వచ్చినా charge జరిగి ఉండవచ్చు. అదే idempotency key వాడి status reconcile చేయాలి. మూడు layers లో ఒక్కోటి మూడు attempts చేస్తే downstream కి 27 attempts రావచ్చు.\n\nExample:\nresilience4j:\n  retry:\n    instances:\n      inventory:\n        maxAttempts: 3\n        waitDuration: 200ms",
    "difficulty": "advanced",
    "codeExample": "resilience4j:\n  retry:\n    instances:\n      inventory:\n        maxAttempts: 3\n        waitDuration: 200ms",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Retrying every exception or treating maxAttempts as additional retries."
    ],
    "followUpQuestions": [
      "Where should retries be owned in a service chain?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-096",
    "technology": "spring-boot",
    "topic": "Backoff",
    "question": "Why use exponential backoff with jitter?",
    "shortAnswer": "Increasing randomized delays reduce synchronized retries and pressure on recovering services.",
    "detailedAnswer": "Exponential backoff grows the delay after each failure; a cap prevents excessive waits. Full jitter chooses a random delay between zero and the capped exponential delay. Honor Retry-After when appropriate and never exceed the remaining request budget. Jitter reduces synchronized retry waves but cannot fix sustained overload.\n\nExample (illustrative):\n// attempt starts at 0; bounded illustrative calculation\nlong cap = Math.min(2000L, 100L << Math.min(attempt, 5));\nlong delayMs = ThreadLocalRandom.current().nextLong(cap + 1);\n\nCommon mistake: Sleeping on a reactive event-loop thread.\n\nInterview follow-up: How does jitter help during a regional outage?",
    "detailedAnswerTelugu": "ప్రతి failure తర్వాత retry delay ను పెంచడం exponential backoff. అందరూ ఒకే సమయంలో retry చేయకుండా random delay కలపడం jitter. Maximum delay cap పెట్టాలి. Retry-After మరియు request deadline గౌరవించాలి. Service నిరంతరం overload లో ఉంటే jitter ఒక్కటే పరిష్కారం కాదు.\n\nExample:\n// attempt starts at 0; bounded illustrative calculation\nlong cap = Math.min(2000L, 100L << Math.min(attempt, 5));\nlong delayMs = ThreadLocalRandom.current().nextLong(cap + 1);",
    "difficulty": "expert",
    "codeExample": "// attempt starts at 0; bounded illustrative calculation\nlong cap = Math.min(2000L, 100L << Math.min(attempt, 5));\nlong delayMs = ThreadLocalRandom.current().nextLong(cap + 1);",
    "codeLanguage": "java",
    "commonMistakes": [
      "Sleeping on a reactive event-loop thread."
    ],
    "followUpQuestions": [
      "How does jitter help during a regional outage?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-097",
    "technology": "spring-boot",
    "topic": "Bulkhead",
    "question": "Compare semaphore and thread-pool bulkheads.",
    "shortAnswer": "Semaphore bulkheads limit concurrent calls; thread-pool bulkheads isolate work in a bounded executor.",
    "detailedAnswer": "A semaphore permits a fixed number of concurrent operations without creating a new executor. A thread-pool bulkhead uses dedicated workers and a bounded queue, useful for isolating blocking work. Account for queue time in the deadline and propagate context across threads. Neither automatically makes blocking calls nonblocking.\n\nExample (illustrative):\nresilience4j:\n  bulkhead:\n    instances:\n      payment:\n        maxConcurrentCalls: 10\n        maxWaitDuration: 0ms\n\nCommon mistake: Using unbounded queues or oversized pools.\n\nInterview follow-up: How do you size a bulkhead relative to a connection pool?",
    "detailedAnswerTelugu": "Semaphore bulkhead ఒకేసారి ఎన్ని calls నడవాలో పరిమితం చేస్తుంది. Thread-pool bulkhead ప్రత్యేక worker threads మరియు bounded queue ఉపయోగిస్తుంది. Blocking dependency వల్ల ఇతర పనులు ఆగకుండా isolate చేయవచ్చు. Queue లో గడిచే సమయం కూడా deadline లో భాగమే. Reactive event loop మీద blocking పని చేయకూడదు.\n\nExample:\nresilience4j:\n  bulkhead:\n    instances:\n      payment:\n        maxConcurrentCalls: 10\n        maxWaitDuration: 0ms",
    "difficulty": "expert",
    "codeExample": "resilience4j:\n  bulkhead:\n    instances:\n      payment:\n        maxConcurrentCalls: 10\n        maxWaitDuration: 0ms",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Using unbounded queues or oversized pools."
    ],
    "followUpQuestions": [
      "How do you size a bulkhead relative to a connection pool?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-098",
    "technology": "spring-boot",
    "topic": "Rate limiting",
    "question": "How do you enforce rate limits across microservices?",
    "shortAnswer": "Limit requests over time; use coordinated state when a quota must span replicas.",
    "detailedAnswer": "A local Resilience4j rate limiter controls one process, not an entire cluster. A gateway can enforce tenant quotas using a shared atomic token bucket or managed quota service. Return 429 for quota violations and Retry-After when meaningful. Decide fail-open versus fail-closed according to risk; distinguish rate from concurrent work.\n\nExample (illustrative):\nresilience4j:\n  ratelimiter:\n    instances:\n      inventory:\n        limitForPeriod: 50\n        limitRefreshPeriod: 1s\n        timeoutDuration: 0ms\n\nCommon mistake: Assuming 50 requests per second is a global limit across ten replicas.\n\nInterview follow-up: How would you enforce per-tenant quotas atomically?",
    "detailedAnswerTelugu": "Local rate limiter ఒక్క application instance కి మాత్రమే వర్తిస్తుంది. అన్ని replicas కలిపి tenant quota అమలు చేయాలంటే shared atomic counter లేదా token bucket అవసరం. Quota దాటితే 429 ఇవ్వాలి. Shared store fail అయితే allow చేయాలా reject చేయాలా business risk ఆధారంగా నిర్ణయించాలి. Rate limit మరియు concurrency limit వేర్వేరు.\n\nExample:\nresilience4j:\n  ratelimiter:\n    instances:\n      inventory:\n        limitForPeriod: 50\n        limitRefreshPeriod: 1s\n        timeoutDuration: 0ms",
    "difficulty": "advanced",
    "codeExample": "resilience4j:\n  ratelimiter:\n    instances:\n      inventory:\n        limitForPeriod: 50\n        limitRefreshPeriod: 1s\n        timeoutDuration: 0ms",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Assuming 50 requests per second is a global limit across ten replicas."
    ],
    "followUpQuestions": [
      "How would you enforce per-tenant quotas atomically?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-099",
    "technology": "spring-boot",
    "topic": "Timeouts",
    "question": "How does TimeLimiter differ from HTTP client timeouts?",
    "shortAnswer": "TimeLimiter bounds waiting for an asynchronous result; transport timeouts govern network operations.",
    "detailedAnswer": "Configure connection acquisition, connect and response/read timeouts as supported by the client. TimeLimiter can bound a Future or CompletionStage wait with the appropriate integration. A timeout does not prove that remote work stopped; cancellation is best effort and may not interrupt underlying I/O. Propagate a total deadline and leave time for error handling.\n\nExample (illustrative):\nresilience4j:\n  timelimiter:\n    instances:\n      payment:\n        timeoutDuration: 800ms\n        cancelRunningFuture: true\n\nCommon mistake: Applying an asynchronous TimeLimiter to a synchronous method and assuming it interrupts network I/O.\n\nInterview follow-up: How would you budget a two-second end-to-end deadline?",
    "detailedAnswerTelugu": "HTTP client లో connection, response వంటి timeouts configure చేయాలి. TimeLimiter asynchronous result కోసం ఎంతసేపు వేచి ఉండాలో పరిమితం చేస్తుంది. Timeout వచ్చినంత మాత్రాన remote operation ఆగిందని అనుకోకూడదు. Cancellation best effort మాత్రమే. మొత్తం request deadline లో downstream calls మరియు error handling కి సమయం కేటాయించాలి.\n\nExample:\nresilience4j:\n  timelimiter:\n    instances:\n      payment:\n        timeoutDuration: 800ms\n        cancelRunningFuture: true",
    "difficulty": "advanced",
    "codeExample": "resilience4j:\n  timelimiter:\n    instances:\n      payment:\n        timeoutDuration: 800ms\n        cancelRunningFuture: true",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Applying an asynchronous TimeLimiter to a synchronous method and assuming it interrupts network I/O."
    ],
    "followUpQuestions": [
      "How would you budget a two-second end-to-end deadline?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-100",
    "technology": "spring-boot",
    "topic": "Fallback",
    "question": "How do you design safe fallbacks?",
    "shortAnswer": "Return a truthful degraded result or a controlled failure instead of fabricating success.",
    "detailedAnswer": "For product recommendations, cached or empty recommendations may be acceptable. For payment authorization, never report success without confirmation. A fallback must preserve authorization, freshness requirements and business invariants. Mark stale data and expose metrics for degraded responses. Keep fallback work bounded and avoid calling the same failed dependency.\n\nExample (illustrative):\n// Illustrative fallback for optional recommendations\nList<Product> recommendationsFallback(String userId, Throwable cause) {\n    return List.of();\n}\n\nCommon mistake: Returning HTTP 200 with a fabricated payment confirmation.\n\nInterview follow-up: When is a stale cache unacceptable?",
    "detailedAnswerTelugu": "Recommendations service fail అయితే cached data లేదా empty list ఇవ్వవచ్చు. Payment authorization fail అయితే success అని చెప్పకూడదు. Fallback కూడా security rules, data freshness మరియు business invariants పాటించాలి. Stale data అయితే స్పష్టంగా తెలియజేయాలి. అదే failed dependency ని fallback లో మళ్లీ call చేయకూడదు.\n\nExample:\n// Illustrative fallback for optional recommendations\nList<Product> recommendationsFallback(String userId, Throwable cause) {\n    return List.of();\n}",
    "difficulty": "expert",
    "codeExample": "// Illustrative fallback for optional recommendations\nList<Product> recommendationsFallback(String userId, Throwable cause) {\n    return List.of();\n}",
    "codeLanguage": "java",
    "commonMistakes": [
      "Returning HTTP 200 with a fabricated payment confirmation."
    ],
    "followUpQuestions": [
      "When is a stale cache unacceptable?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-101",
    "technology": "spring-boot",
    "topic": "Pattern composition",
    "question": "How should retry, circuit breaker and bulkhead be combined?",
    "shortAnswer": "Choose explicit nesting based on whether each attempt or logical request should be measured.",
    "detailedAnswer": "A retry outside a breaker allows the breaker to observe individual attempts. A breaker outside retry sees the final logical outcome and can hide repeated failures. Acquire bulkhead permits for each attempt when appropriate so backoff does not occupy scarce capacity. Use an outer deadline; do not retry breaker-open or bulkhead-full errors by default. Verify actual annotation aspect order or use explicit decorators.\n\nExample (illustrative):\nOverall deadline → Retry → CircuitBreaker → Bulkhead → HTTP call\nEach attempt has a transport timeout; reject overload without retry.\n\nCommon mistake: Assuming annotation order in source determines execution order.\n\nInterview follow-up: How does nesting change circuit breaker failure metrics?",
    "detailedAnswerTelugu": "Retry బయట, circuit breaker లోపల ఉంటే ప్రతి attempt ను breaker చూస్తుంది. Breaker బయట ఉంటే మొత్తం retry తర్వాత final outcome మాత్రమే కనిపిస్తుంది. Backoff సమయంలో bulkhead permit పట్టుకుని ఉండకుండా design చేయాలి. మొత్తం deadline పెట్టాలి. Annotation order చూసి ఊహించకుండా actual aspect order verify చేయాలి.\n\nExample:\nOverall deadline → Retry → CircuitBreaker → Bulkhead → HTTP call\nEach attempt has a transport timeout; reject overload without retry.",
    "difficulty": "expert",
    "codeExample": "Overall deadline → Retry → CircuitBreaker → Bulkhead → HTTP call\nEach attempt has a transport timeout; reject overload without retry.",
    "codeLanguage": "text",
    "commonMistakes": [
      "Assuming annotation order in source determines execution order."
    ],
    "followUpQuestions": [
      "How does nesting change circuit breaker failure metrics?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-102",
    "technology": "spring-boot",
    "topic": "Idempotency",
    "question": "How do you implement durable idempotency for payment requests?",
    "shortAnswer": "Persist a scoped request key and outcome atomically with local business changes.",
    "detailedAnswer": "Use a unique constraint on tenant and idempotency key, store a request fingerprint, and reject reuse with a different payload. Concurrent duplicates must not both execute. For external payment calls use the provider idempotency key and reconcile ambiguous outcomes; a local transaction cannot atomically commit a remote charge. Define retention and in-progress response behavior.\n\nExample (illustrative):\nCREATE TABLE payment_request (\n tenant_id varchar(100) NOT NULL,\n request_key varchar(100) NOT NULL,\n fingerprint varchar(128) NOT NULL,\n status varchar(30) NOT NULL,\n PRIMARY KEY (tenant_id, request_key)\n);\n\nCommon mistake: Using an in-memory set for deduplication across replicas.\n\nInterview follow-up: How do you recover if the provider charged but the local update failed?",
    "detailedAnswerTelugu": "Tenant మరియు idempotency key మీద unique constraint పెట్టాలి. Request payload fingerprint నిల్వ చేయాలి. అదే key తో వేరే payload వస్తే reject చేయాలి. Concurrent duplicates రెండూ execute కాకూడదు. External payment provider కి కూడా idempotency key పంపాలి. Local database transaction remote charge ను atomic గా commit చేయలేదు కాబట్టి reconciliation అవసరం.\n\nExample:\nCREATE TABLE payment_request (\n tenant_id varchar(100) NOT NULL,\n request_key varchar(100) NOT NULL,\n fingerprint varchar(128) NOT NULL,\n status varchar(30) NOT NULL,\n PRIMARY KEY (tenant_id, request_key)\n);",
    "difficulty": "expert",
    "codeExample": "CREATE TABLE payment_request (\n tenant_id varchar(100) NOT NULL,\n request_key varchar(100) NOT NULL,\n fingerprint varchar(128) NOT NULL,\n status varchar(30) NOT NULL,\n PRIMARY KEY (tenant_id, request_key)\n);",
    "codeLanguage": "sql",
    "commonMistakes": [
      "Using an in-memory set for deduplication across replicas."
    ],
    "followUpQuestions": [
      "How do you recover if the provider charged but the local update failed?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-103",
    "technology": "spring-boot",
    "topic": "Distributed tracing",
    "question": "How do distributed tracing and correlation IDs help troubleshooting?",
    "shortAnswer": "Trace context connects operations across services; spans record individual operations and timings.",
    "detailedAnswer": "Use Micrometer Tracing with a compatible OpenTelemetry bridge and exporter. Propagate W3C traceparent across HTTP and messaging with instrumented clients. Trace IDs correlate logs, while span IDs distinguish operations. Sampling controls volume; avoid putting sensitive data into baggage or span attributes. A correlation ID alone does not describe timing or parent-child relationships.\n\nExample (illustrative):\nmanagement:\n  tracing:\n    sampling:\n      probability: 0.1\n# Configure compatible tracing bridge and exporter separately.\n\nCommon mistake: Creating a new unrelated trace ID for every downstream call.\n\nInterview follow-up: How do asynchronous Kafka consumers preserve trace context?",
    "detailedAnswerTelugu": "Micrometer Tracing మరియు compatible OpenTelemetry integration ద్వారా service calls trace చేయవచ్చు. HTTP, messaging లో trace context propagate చేయాలి. Trace ID ద్వారా logs కలపవచ్చు; span ID ఒక్క operation ను గుర్తిస్తుంది. Sampling ద్వారా data volume తగ్గించవచ్చు. Sensitive data ను baggage లేదా span attributes లో పెట్టకూడదు.\n\nExample:\nmanagement:\n  tracing:\n    sampling:\n      probability: 0.1\n# Configure compatible tracing bridge and exporter separately.",
    "difficulty": "advanced",
    "codeExample": "management:\n  tracing:\n    sampling:\n      probability: 0.1\n# Configure compatible tracing bridge and exporter separately.",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Creating a new unrelated trace ID for every downstream call."
    ],
    "followUpQuestions": [
      "How do asynchronous Kafka consumers preserve trace context?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-104",
    "technology": "spring-boot",
    "topic": "Monitoring",
    "question": "Which metrics and alerts reveal resilience failures?",
    "shortAnswer": "Monitor latency, errors, saturation and resilience-specific outcomes together.",
    "detailedAnswer": "Track request rate, error rate, p95/p99 latency, queue depth, connection pool usage, breaker state, rejected calls and retries. Use Micrometer and Actuator with the compatible Resilience4j metrics integration. Alert on sustained user-facing SLO burn rather than every state transition. Use bounded tags such as dependency name; avoid request IDs as metric labels.\n\nExample (illustrative):\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,prometheus\n# Requires Prometheus registry; restrict endpoint access.\n\nCommon mistake: Exposing management endpoints publicly or alerting only on CPU.\n\nInterview follow-up: How can retry metrics reveal hidden downstream instability?",
    "detailedAnswerTelugu": "Request rate, error rate, p95/p99 latency, queue depth, connection pool usage, breaker state, retries మరియు rejected calls monitor చేయాలి. Micrometer, Actuator మరియు compatible Resilience4j metrics integration ఉపయోగించాలి. ప్రతి breaker transition కి alert కాకుండా user-facing SLO burn ఆధారంగా alert పెట్టాలి. Request ID లాంటి high-cardinality metric tags వద్దు.\n\nExample:\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,prometheus\n# Requires Prometheus registry; restrict endpoint access.",
    "difficulty": "expert",
    "codeExample": "management:\n  endpoints:\n    web:\n      exposure:\n        include: health,prometheus\n# Requires Prometheus registry; restrict endpoint access.",
    "codeLanguage": "yaml",
    "commonMistakes": [
      "Exposing management endpoints publicly or alerting only on CPU."
    ],
    "followUpQuestions": [
      "How can retry metrics reveal hidden downstream instability?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
  {
    "id": "SPRING-BOOT-105",
    "technology": "spring-boot",
    "topic": "Failure recovery",
    "question": "Design a resilient checkout workflow during a payment outage.",
    "shortAnswer": "Persist workflow state, isolate dependencies, reconcile ambiguous outcomes and recover asynchronously.",
    "detailedAnswer": "Accept checkout with a durable order ID and pending status when the contract allows. Reserve inventory with an expiry, publish workflow events through an outbox, and call payment using a stable idempotency key. Bound calls with deadlines, bulkheads and a breaker. If the result is unknown, query the provider before retrying or compensating. Use bounded asynchronous retries, dead-letter handling and operator reconciliation. Test dependency outages, duplicates and delayed events.\n\nExample (illustrative):\nPENDING → INVENTORY_RESERVED → PAYMENT_PENDING\nPAYMENT_PENDING → CONFIRMED (verified success)\nPAYMENT_PENDING → RECONCILE (unknown outcome)\nPAYMENT_PENDING → CANCELLED (verified failure + release inventory)\n\nCommon mistake: Cancelling or charging again before resolving an ambiguous payment outcome.\n\nInterview follow-up: How would you test recovery after a crash between payment and event publication?",
    "detailedAnswerTelugu": "Checkout request కి durable order ID ఇచ్చి contract అనుమతిస్తే PENDING status నిల్వ చేయాలి. Inventory reservation కి expiry పెట్టాలి. Outbox ద్వారా events publish చేయాలి. Payment కి స్థిరమైన idempotency key వాడాలి. Timeout, bulkhead, circuit breaker తో calls పరిమితం చేయాలి. Payment result తెలియకపోతే provider status verify చేసి తర్వాత retry లేదా compensation చేయాలి. Bounded retries, dead-letter handling మరియు manual reconciliation ఉండాలి. Duplicate events, outage, delayed events ను test చేయాలి.\n\nExample:\nPENDING → INVENTORY_RESERVED → PAYMENT_PENDING\nPAYMENT_PENDING → CONFIRMED (verified success)\nPAYMENT_PENDING → RECONCILE (unknown outcome)\nPAYMENT_PENDING → CANCELLED (verified failure + release inventory)",
    "difficulty": "expert",
    "codeExample": "PENDING → INVENTORY_RESERVED → PAYMENT_PENDING\nPAYMENT_PENDING → CONFIRMED (verified success)\nPAYMENT_PENDING → RECONCILE (unknown outcome)\nPAYMENT_PENDING → CANCELLED (verified failure + release inventory)",
    "codeLanguage": "text",
    "commonMistakes": [
      "Cancelling or charging again before resolving an ambiguous payment outcome."
    ],
    "followUpQuestions": [
      "How would you test recovery after a crash between payment and event publication?"
    ],
    "interviewTips": [
      "Explain the failure mode, trade-offs and recovery behavior."
    ],
    "isPublished": true
  },
{
  "id": "SPRING-BOOT-106",
  "technology": "spring-boot",
  "topic": "Event-driven microservices architecture",
  "question": "How does event-driven architecture work in Spring Boot microservices?",
  "shortAnswer": "Services publish facts about completed business actions and consume them asynchronously.",
  "detailedAnswer": "An order service commits an order and an outbox record in one database transaction. A relay publishes OrderCreated to Kafka with orderId as key. Inventory and notification services use independent consumer groups. Ordering is per partition, not across the entire topic. Consumers must tolerate duplicates and eventual consistency. Return 202 for an accepted asynchronous workflow when appropriate, and expose status separately.\n\nExample (java; illustrative excerpt):\nrecord OrderCreated(UUID eventId, UUID orderId) {}\n\nCommon mistake: Do not publish a business event before its database transaction commits.\n\nInterview follow-up: How does an outbox relay recover after a crash?",
  "detailedAnswerTelugu": "Order Service ఒక transaction లో order మరియు outbox record save చేస్తుంది. Relay Kafka కు OrderCreated event పంపుతుంది. Inventory, Notification services వేర్వేరు consumer groups ద్వారా event చదువుతాయి. ఒక partition లో మాత్రమే ordering ఉంటుంది. Duplicate events వచ్చినా business operation మళ్లీ జరగకుండా చూడాలి.\n\nExample:\nrecord OrderCreated(UUID eventId, UUID orderId) {}",
  "difficulty": "advanced",
  "codeExample": "record OrderCreated(UUID eventId, UUID orderId) {}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not publish a business event before its database transaction commits."
  ],
  "followUpQuestions": [
    "How does an outbox relay recover after a crash?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-107",
  "technology": "spring-boot",
  "topic": "Spring Kafka",
  "question": "How does KafkaTemplate publish events?",
  "shortAnswer": "KafkaTemplate wraps the Kafka producer and returns a CompletableFuture for asynchronous sends.",
  "detailedAnswer": "Configure serializers, bootstrap servers and producer acknowledgments. Send using a stable business key so related events map to the same partition while partition mapping remains stable. Inspect completion for broker acknowledgment or failure. A successful send does not prove a consumer processed the event. With a database write, use an outbox rather than treating send completion as an atomic database commit.\n\nExample (java; illustrative excerpt):\nkafkaTemplate.send(\"orders\", orderId, event)\n    .whenComplete((result, error) -> {\n        if (error != null) log.error(\"Publish failed\", error);\n        else log.info(\"Offset {}\", result.getRecordMetadata().offset());\n    });\n\nCommon mistake: Do not ignore asynchronous send failures.\n\nInterview follow-up: What does acks=all guarantee?",
  "detailedAnswerTelugu": "KafkaTemplate ద్వారా producer కు event పంపవచ్చు. send method CompletableFuture ఇస్తుంది. orderId key గా పంపితే సంబంధిత events సాధారణంగా ఒకే partition కు వెళ్తాయి. Future success అంటే broker acknowledgment మాత్రమే; consumer processing పూర్తయిందని కాదు. Database update తో atomicity కోసం outbox ఉపయోగించాలి.\n\nExample:\nkafkaTemplate.send(\"orders\", orderId, event)\n    .whenComplete((result, error) -> {\n        if (error != null) log.error(\"Publish failed\", error);\n        else log.info(\"Offset {}\", result.getRecordMetadata().offset());\n    });",
  "difficulty": "intermediate",
  "codeExample": "kafkaTemplate.send(\"orders\", orderId, event)\n    .whenComplete((result, error) -> {\n        if (error != null) log.error(\"Publish failed\", error);\n        else log.info(\"Offset {}\", result.getRecordMetadata().offset());\n    });",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not ignore asynchronous send failures."
  ],
  "followUpQuestions": [
    "What does acks=all guarantee?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-108",
  "technology": "spring-boot",
  "topic": "Kafka consumers",
  "question": "How do @KafkaListener and consumer groups work?",
  "shortAnswer": "A listener container polls Kafka and dispatches records to listener methods; group members share partitions.",
  "detailedAnswer": "Each partition is assigned to at most one active consumer within a group under normal group assignment. Different groups receive their own logical copy of events. Concurrency beyond the partition count leaves consumers idle. Long processing can exceed max.poll.interval.ms and trigger reassignment. Keep processing bounded and design for redelivery during rebalances.\n\nExample (java; illustrative excerpt):\n@KafkaListener(topics = \"orders\", groupId = \"inventory\", concurrency = \"3\")\nvoid consume(OrderCreated event) {\n    inventoryService.reserveOnce(event);\n}\n\nCommon mistake: Do not assume increasing concurrency always improves throughput.\n\nInterview follow-up: What happens when a consumer crashes during processing?",
  "detailedAnswerTelugu": "@KafkaListener వెనుక listener container Kafka నుంచి records poll చేస్తుంది. ఒక group లో partition ఒక active consumer కు assign అవుతుంది. వేరే group అదే events స్వతంత్రంగా చదువుతుంది. Partitions కంటే concurrency ఎక్కువైతే కొందరు consumers idle గా ఉంటారు. Processing ఎక్కువ సమయం తీసుకుంటే rebalance రావచ్చు.\n\nExample:\n@KafkaListener(topics = \"orders\", groupId = \"inventory\", concurrency = \"3\")\nvoid consume(OrderCreated event) {\n    inventoryService.reserveOnce(event);\n}",
  "difficulty": "advanced",
  "codeExample": "@KafkaListener(topics = \"orders\", groupId = \"inventory\", concurrency = \"3\")\nvoid consume(OrderCreated event) {\n    inventoryService.reserveOnce(event);\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not assume increasing concurrency always improves throughput."
  ],
  "followUpQuestions": [
    "What happens when a consumer crashes during processing?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-109",
  "technology": "spring-boot",
  "topic": "Offset management",
  "question": "What are Kafka acknowledgment modes?",
  "shortAnswer": "Spring Kafka acknowledgment modes control when consumed offsets are committed.",
  "detailedAnswer": "RECORD commits after successful record listener processing; BATCH commits after records from a poll are processed. MANUAL queues acknowledgment with batch-like semantics; MANUAL_IMMEDIATE commits immediately when acknowledged on the consumer thread, subject to configuration. Disable auto commit for container-managed commits. A crash after database commit but before offset commit causes redelivery, so use idempotent processing.\n\nExample (yaml; illustrative excerpt):\nspring:\n  kafka:\n    consumer:\n      enable-auto-commit: false\n    listener:\n      ack-mode: manual_immediate\n\nCommon mistake: Never acknowledge before durable business processing succeeds.\n\nInterview follow-up: How do asynchronous acknowledgments affect ordering?",
  "detailedAnswerTelugu": "AckMode ద్వారా offset ఎప్పుడు commit చేయాలో నిర్ణయిస్తాం. RECORD లో ఒక్క record processing తర్వాత, BATCH లో poll batch తర్వాత commit జరుగుతుంది. MANUAL_IMMEDIATE లో consumer thread మీద acknowledge చేస్తే వెంటనే commit చేయవచ్చు. Database commit తర్వాత offset commit ముందు crash అయితే duplicate వస్తుంది. అందుకే idempotency అవసరం.\n\nExample:\nspring:\n  kafka:\n    consumer:\n      enable-auto-commit: false\n    listener:\n      ack-mode: manual_immediate",
  "difficulty": "expert",
  "codeExample": "spring:\n  kafka:\n    consumer:\n      enable-auto-commit: false\n    listener:\n      ack-mode: manual_immediate",
  "codeLanguage": "yaml",
  "commonMistakes": [
    "Never acknowledge before durable business processing succeeds."
  ],
  "followUpQuestions": [
    "How do asynchronous acknowledgments affect ordering?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-110",
  "technology": "spring-boot",
  "topic": "Error handling",
  "question": "How do retries and dead-letter topics work in Spring Kafka?",
  "shortAnswer": "DefaultErrorHandler can retry transient failures and publish exhausted records through a DeadLetterPublishingRecoverer.",
  "detailedAnswer": "Classify transient network errors separately from permanent validation errors. Blocking retries delay the affected consumer; retry topics can avoid long blocking but may sacrifice original ordering. Configure a DLT with monitoring and controlled replay. Ensure the recoverer reports publication failure rather than silently treating an undelivered record as recovered.\n\nExample (java; illustrative excerpt):\nvar recoverer = new DeadLetterPublishingRecoverer(kafkaTemplate);\nrecoverer.setFailIfSendResultIsError(true);\nvar handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 2L));\nfactory.setCommonErrorHandler(handler);\n\nCommon mistake: Do not retry poison messages forever or replay DLT records blindly.\n\nInterview follow-up: When would you choose non-blocking retries?",
  "detailedAnswerTelugu": "Temporary network errors కు పరిమిత retries ఇవ్వాలి. Invalid payload వంటి permanent errors ను మళ్లీ ప్రయత్నించడం ప్రయోజనం లేదు. DefaultErrorHandler retry తర్వాత DLT కు record పంపగలదు. Retry topics వల్ల original ordering మారవచ్చు. DLT ను monitor చేసి సమస్య సరిచేసిన తర్వాత మాత్రమే replay చేయాలి.\n\nExample:\nvar recoverer = new DeadLetterPublishingRecoverer(kafkaTemplate);\nrecoverer.setFailIfSendResultIsError(true);\nvar handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 2L));\nfactory.setCommonErrorHandler(handler);",
  "difficulty": "expert",
  "codeExample": "var recoverer = new DeadLetterPublishingRecoverer(kafkaTemplate);\nrecoverer.setFailIfSendResultIsError(true);\nvar handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 2L));\nfactory.setCommonErrorHandler(handler);",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not retry poison messages forever or replay DLT records blindly."
  ],
  "followUpQuestions": [
    "When would you choose non-blocking retries?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-111",
  "technology": "spring-boot",
  "topic": "Kafka transactions",
  "question": "What does Kafka exactly-once processing guarantee?",
  "shortAnswer": "Kafka transactions can atomically publish Kafka records and commit consumed offsets within a Kafka read-process-write flow.",
  "detailedAnswer": "Configure a unique transactional ID prefix per application instance. A transactional listener container starts a transaction, sends output records and commits offsets in the same Kafka transaction. Downstream consumers use read_committed to avoid aborted records. External database writes and HTTP calls are not automatically covered; use an outbox or idempotency for those effects.\n\nExample (yaml; illustrative excerpt):\nspring:\n  kafka:\n    producer:\n      transaction-id-prefix: ${INSTANCE_ID}-orders-\n    consumer:\n      properties:\n        isolation.level: read_committed\n\nCommon mistake: Do not claim Kafka transactions make external payments exactly once.\n\nInterview follow-up: How does producer fencing protect transactions?",
  "detailedAnswerTelugu": "Kafka transaction ద్వారా input offsets మరియు output Kafka records ఒకే transaction లో commit చేయవచ్చు. ప్రతి application instance కు unique transactional ID prefix అవసరం. read_committed consumer aborted records చూడదు. కానీ external database లేదా HTTP payment call ఈ Kafka transaction లో భాగం కాదు. వాటికి outbox లేదా idempotency అవసరం.\n\nExample:\nspring:\n  kafka:\n    producer:\n      transaction-id-prefix: ${INSTANCE_ID}-orders-\n    consumer:\n      properties:\n        isolation.level: read_committed",
  "difficulty": "expert",
  "codeExample": "spring:\n  kafka:\n    producer:\n      transaction-id-prefix: ${INSTANCE_ID}-orders-\n    consumer:\n      properties:\n        isolation.level: read_committed",
  "codeLanguage": "yaml",
  "commonMistakes": [
    "Do not claim Kafka transactions make external payments exactly once."
  ],
  "followUpQuestions": [
    "How does producer fencing protect transactions?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-112",
  "technology": "spring-boot",
  "topic": "Idempotency",
  "question": "How do you implement an idempotent Kafka consumer?",
  "shortAnswer": "Store a unique event ID in the same database transaction as the business update.",
  "detailedAnswer": "Use a processed_events table with a unique constraint on consumer name and event ID. In PostgreSQL an INSERT ON CONFLICT DO NOTHING returns zero affected rows for a duplicate. Only the first successful insert proceeds to the business update. Roll back both if processing fails. Commit the Kafka offset after the database transaction succeeds. External calls need their own idempotency keys.\n\nExample (java; illustrative excerpt):\n@Transactional\npublic void reserveOnce(OrderCreated event) {\n    if (processedEvents.insertIfAbsent(\"inventory\", event.eventId()) == 0) return;\n    inventory.reserve(event.orderId());\n}\n\nCommon mistake: Avoid a separate check-then-insert without a database uniqueness constraint.\n\nInterview follow-up: How long should processed event IDs be retained?",
  "detailedAnswerTelugu": "Consumer name మరియు eventId కలిపి unique constraint పెట్టాలి. PostgreSQL లో ON CONFLICT DO NOTHING వాడితే duplicate event కు affected rows zero వస్తాయి. మొదటి insert మాత్రమే business update చేస్తుంది. Update fail అయితే insert కూడా rollback కావాలి. Database commit తర్వాత Kafka offset commit చేయాలి.\n\nExample:\n@Transactional\npublic void reserveOnce(OrderCreated event) {\n    if (processedEvents.insertIfAbsent(\"inventory\", event.eventId()) == 0) return;\n    inventory.reserve(event.orderId());\n}",
  "difficulty": "expert",
  "codeExample": "@Transactional\npublic void reserveOnce(OrderCreated event) {\n    if (processedEvents.insertIfAbsent(\"inventory\", event.eventId()) == 0) return;\n    inventory.reserve(event.orderId());\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Avoid a separate check-then-insert without a database uniqueness constraint."
  ],
  "followUpQuestions": [
    "How long should processed event IDs be retained?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-113",
  "technology": "spring-boot",
  "topic": "Schema evolution",
  "question": "How do you evolve Kafka event schemas safely?",
  "shortAnswer": "Use versioned contracts and compatibility checks to support independently deployed producers and consumers.",
  "detailedAnswer": "A schema registry can enforce backward, forward or full compatibility depending on the chosen format and policy. In Avro, adding a field with a suitable default can let a new reader consume older records. Deploy compatible readers before incompatible producer changes; for breaking changes consider a new event type or topic. Test historical records and avoid repurposing existing fields.\n\nExample (json; illustrative excerpt):\n{\"name\":\"currency\",\"type\":\"string\",\"default\":\"USD\"}\n\nCommon mistake: Do not change the meaning of an existing field silently; defaults must be semantically correct.\n\nInterview follow-up: What is backward-transitive compatibility?",
  "detailedAnswerTelugu": "Producer, consumer వేర్వేరు సమయాల్లో deploy అవుతాయి కాబట్టి schema compatibility అవసరం. Avro లో default value తో కొత్త field add చేస్తే కొత్త reader పాత records చదవగలదు. Breaking change అయితే కొత్త event type లేదా topic పరిశీలించాలి. Schema registry checks తో పాటు పాత records మీద tests చేయాలి.\n\nExample:\n{\"name\":\"currency\",\"type\":\"string\",\"default\":\"USD\"}",
  "difficulty": "advanced",
  "codeExample": "{\"name\":\"currency\",\"type\":\"string\",\"default\":\"USD\"}",
  "codeLanguage": "json",
  "commonMistakes": [
    "Do not change the meaning of an existing field silently; defaults must be semantically correct."
  ],
  "followUpQuestions": [
    "What is backward-transitive compatibility?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-114",
  "technology": "spring-boot",
  "topic": "Reactive web",
  "question": "What is the difference between Spring MVC and WebFlux?",
  "shortAnswer": "MVC uses the Servlet stack; WebFlux supports reactive, non-blocking request processing.",
  "detailedAnswer": "MVC commonly uses blocking request threads and works well with JDBC/JPA. WebFlux uses reactive publishers and often a small event-loop pool with Reactor Netty. It is valuable for high-concurrency I/O when the entire path is non-blocking. Blocking JDBC on an event loop can stall many requests. Java virtual threads are another option for blocking workloads; benchmark rather than assume WebFlux is faster.\n\nExample (java; illustrative excerpt):\n@GetMapping(\"/orders/{id}\")\nMono<OrderDto> find(@PathVariable UUID id) {\n    return reactiveOrderService.find(id);\n}\n\nCommon mistake: Do not wrap blocking JPA in Mono.just and call it non-blocking.\n\nInterview follow-up: When would MVC with virtual threads be preferable?",
  "detailedAnswerTelugu": "Spring MVC సాధారణంగా Servlet threads తో blocking I/O చేస్తుంది. WebFlux reactive publishers మరియు event-loop threads ఉపయోగిస్తుంది. మొత్తం request path non-blocking అయితే ఎక్కువ concurrent I/O requests నిర్వహించడానికి ఉపయోగపడుతుంది. Event loop లో JDBC call block చేస్తే ఇతర requests కూడా ఆలస్యం అవుతాయి. Virtual threads కూడా ఒక ప్రత్యామ్నాయం.\n\nExample:\n@GetMapping(\"/orders/{id}\")\nMono<OrderDto> find(@PathVariable UUID id) {\n    return reactiveOrderService.find(id);\n}",
  "difficulty": "advanced",
  "codeExample": "@GetMapping(\"/orders/{id}\")\nMono<OrderDto> find(@PathVariable UUID id) {\n    return reactiveOrderService.find(id);\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not wrap blocking JPA in Mono.just and call it non-blocking."
  ],
  "followUpQuestions": [
    "When would MVC with virtual threads be preferable?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-115",
  "technology": "spring-boot",
  "topic": "Reactor",
  "question": "What are Mono and Flux?",
  "shortAnswer": "Mono represents zero or one value; Flux represents zero to many values, followed by completion or error.",
  "detailedAnswer": "Both implement Publisher and support composition. Most cold publishers start work on subscription, but hot publishers can emit independently. map transforms a value synchronously; flatMap composes asynchronous publishers and may interleave results. concatMap preserves sequential ordering. Return publishers from controllers instead of manually subscribing. Empty completion differs from an error.\n\nExample (java; illustrative excerpt):\nreturn orderRepository.findById(id)\n    .switchIfEmpty(Mono.error(new OrderNotFoundException(id)))\n    .flatMap(order -> inventoryClient.enrich(order));\n\nCommon mistake: Do not call subscribe inside a controller to return a detached result.\n\nInterview follow-up: How do hot and cold publishers differ?",
  "detailedAnswerTelugu": "Mono zero లేదా one value ఇస్తుంది. Flux zero నుంచి అనేక values ఇవ్వగలదు. map synchronous transformation కోసం, flatMap asynchronous publisher compose చేయడానికి ఉపయోగిస్తాం. flatMap ordering మారవచ్చు; concatMap sequential order ఉంచుతుంది. Controller నుంచి publisher return చేస్తే framework subscribe చేస్తుంది.\n\nExample:\nreturn orderRepository.findById(id)\n    .switchIfEmpty(Mono.error(new OrderNotFoundException(id)))\n    .flatMap(order -> inventoryClient.enrich(order));",
  "difficulty": "intermediate",
  "codeExample": "return orderRepository.findById(id)\n    .switchIfEmpty(Mono.error(new OrderNotFoundException(id)))\n    .flatMap(order -> inventoryClient.enrich(order));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not call subscribe inside a controller to return a detached result."
  ],
  "followUpQuestions": [
    "How do hot and cold publishers differ?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-116",
  "technology": "spring-boot",
  "topic": "Backpressure",
  "question": "How does Reactive Streams backpressure work?",
  "shortAnswer": "A subscriber requests demand from its upstream subscription to regulate delivery.",
  "detailedAnswer": "Reactive Streams uses request(n) to signal how many elements may be delivered. Operators can prefetch or reshape demand. limitRate splits large demand into smaller upstream requests but does not impose a time-based rate limit. Hot sources may need bounded buffering, dropping or explicit failure. Monitor memory and queue sizes; backpressure does not automatically control external systems that cannot honor demand.\n\nExample (java; illustrative excerpt):\nreturn eventFlux.limitRate(64)\n    .flatMap(this::processAsync, 8);\n\nCommon mistake: Do not use unbounded buffering to hide a slow consumer.\n\nInterview follow-up: How do prefetch and flatMap concurrency influence demand?",
  "detailedAnswerTelugu": "Subscriber request(n) ద్వారా ఎన్ని elements తీసుకోగలదో upstream కు చెబుతుంది. Operators prefetch వల్ల demand మారవచ్చు. limitRate demand ను చిన్న batches గా విభజిస్తుంది కానీ seconds ఆధారంగా rate limit కాదు. Hot source demand పాటించలేకపోతే bounded buffer లేదా drop policy అవసరం.\n\nExample:\nreturn eventFlux.limitRate(64)\n    .flatMap(this::processAsync, 8);",
  "difficulty": "expert",
  "codeExample": "return eventFlux.limitRate(64)\n    .flatMap(this::processAsync, 8);",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not use unbounded buffering to hide a slow consumer."
  ],
  "followUpQuestions": [
    "How do prefetch and flatMap concurrency influence demand?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-117",
  "technology": "spring-boot",
  "topic": "WebClient",
  "question": "How do you use WebClient for non-blocking service calls?",
  "shortAnswer": "WebClient composes HTTP requests as reactive publishers without blocking the caller.",
  "detailedAnswer": "Reuse a configured client and connection pool. Set connection and response timeouts at the HTTP client and an overall deadline where needed. retrieve maps HTTP errors to exceptions by default; onStatus can customize them. Compose calls with flatMap or zip. Avoid block on event-loop threads and propagate tracing context.\n\nExample (java; illustrative excerpt):\nreturn webClient.get().uri(\"/inventory/{id}\", id)\n    .retrieve().bodyToMono(InventoryDto.class)\n    .timeout(Duration.ofSeconds(2));\n\nCommon mistake: Do not use timeout alone as a substitute for transport-level timeout configuration.\n\nInterview follow-up: When should exchangeToMono be used instead of retrieve?",
  "detailedAnswerTelugu": "WebClient HTTP request ను reactive publisher గా అందిస్తుంది. ప్రతి request కు కొత్త client create చేయకుండా configured client reuse చేయాలి. Connection timeout, response timeout మరియు overall deadline పెట్టాలి. retrieve లో HTTP errors exceptions గా వస్తాయి. onStatus తో custom handling చేయవచ్చు. Event loop లో block చేయకూడదు.\n\nExample:\nreturn webClient.get().uri(\"/inventory/{id}\", id)\n    .retrieve().bodyToMono(InventoryDto.class)\n    .timeout(Duration.ofSeconds(2));",
  "difficulty": "advanced",
  "codeExample": "return webClient.get().uri(\"/inventory/{id}\", id)\n    .retrieve().bodyToMono(InventoryDto.class)\n    .timeout(Duration.ofSeconds(2));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not use timeout alone as a substitute for transport-level timeout configuration."
  ],
  "followUpQuestions": [
    "When should exchangeToMono be used instead of retrieve?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-118",
  "technology": "spring-boot",
  "topic": "Reactive errors",
  "question": "How do reactive error handling and retries work?",
  "shortAnswer": "Reactor errors are terminal signals; recovery operators replace or resubscribe to a failed sequence.",
  "detailedAnswer": "Use onErrorMap to translate exceptions and onErrorResume for an explicit alternative publisher. retryWhen resubscribes to the upstream operation, potentially repeating side effects. Filter retryable exceptions and bound attempts with exponential backoff and jitter. Apply an overall deadline after retries. Do not return fake success for failed payments or inventory reservations.\n\nExample (java; illustrative excerpt):\nreturn inventoryClient.find(id)\n    .retryWhen(Retry.backoff(2, Duration.ofMillis(200))\n        .filter(this::isTransient).jitter(0.5))\n    .timeout(Duration.ofSeconds(3));\n\nCommon mistake: Do not retry non-idempotent writes without a reliable idempotency mechanism.\n\nInterview follow-up: How does timeout placement change the retry budget?",
  "detailedAnswerTelugu": "Reactive error terminal signal. onErrorMap ద్వారా exception మార్చవచ్చు; onErrorResume ద్వారా alternative publisher ఇవ్వవచ్చు. retryWhen upstream కు మళ్లీ subscribe చేస్తుంది కాబట్టి side effects repeat కావచ్చు. Temporary errors మాత్రమే retry చేయాలి. Backoff, jitter మరియు overall timeout పెట్టాలి. Payment fail అయితే success అని చూపించకూడదు.\n\nExample:\nreturn inventoryClient.find(id)\n    .retryWhen(Retry.backoff(2, Duration.ofMillis(200))\n        .filter(this::isTransient).jitter(0.5))\n    .timeout(Duration.ofSeconds(3));",
  "difficulty": "expert",
  "codeExample": "return inventoryClient.find(id)\n    .retryWhen(Retry.backoff(2, Duration.ofMillis(200))\n        .filter(this::isTransient).jitter(0.5))\n    .timeout(Duration.ofSeconds(3));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not retry non-idempotent writes without a reliable idempotency mechanism."
  ],
  "followUpQuestions": [
    "How does timeout placement change the retry budget?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-119",
  "technology": "spring-boot",
  "topic": "Schedulers",
  "question": "How do Reactor schedulers and threading work?",
  "shortAnswer": "subscribeOn affects subscription and upstream execution; publishOn shifts downstream signal processing.",
  "detailedAnswer": "Reactor does not create a thread for every publisher. Event loops should perform short non-blocking work. For unavoidable blocking calls use Mono.fromCallable with boundedElastic, while limiting concurrency and sizing downstream resources. CPU-intensive work may use parallel scheduling with bounded concurrency. Scheduler switches have overhead; prefer Reactor Context for request metadata instead of assuming ThreadLocal propagation.\n\nExample (java; illustrative excerpt):\nMono.fromCallable(() -> legacyRepository.findById(id))\n    .subscribeOn(Schedulers.boundedElastic());\n\nCommon mistake: Do not use Mono.just(legacyRepository.findById(id)) to defer blocking work.\n\nInterview follow-up: Why can boundedElastic still become saturated?",
  "detailedAnswerTelugu": "ప్రతి publisher కు కొత్త thread ఉండదు. subscribeOn subscription మరియు upstream execution ను ప్రభావితం చేస్తుంది. publishOn తర్వాత downstream signals వేరే scheduler మీద process అవుతాయి. తప్పనిసరి blocking call ను fromCallable తో boundedElastic మీద run చేయవచ్చు. Concurrency పరిమితం చేయాలి. Request metadata కోసం Reactor Context ఉపయోగించాలి.\n\nExample:\nMono.fromCallable(() -> legacyRepository.findById(id))\n    .subscribeOn(Schedulers.boundedElastic());",
  "difficulty": "expert",
  "codeExample": "Mono.fromCallable(() -> legacyRepository.findById(id))\n    .subscribeOn(Schedulers.boundedElastic());",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not use Mono.just(legacyRepository.findById(id)) to defer blocking work."
  ],
  "followUpQuestions": [
    "Why can boundedElastic still become saturated?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-120",
  "technology": "spring-boot",
  "topic": "Production architecture",
  "question": "How would you design a production-ready reactive event-driven order system?",
  "shortAnswer": "Combine non-blocking APIs with durable workflow state, transactional outbox, idempotent consumers and bounded resources.",
  "detailedAnswer": "Use WebFlux with reactive database access for the API path, validate requests, and atomically persist order plus outbox using a reactive transaction. Return accepted status after commit. Relay events to Kafka, partition by order ID, and use idempotent inventory/payment consumers with durable saga state. Keep blocking Kafka or legacy work off event loops. Track consumer lag, DLT counts, latency, pool saturation and trace context. Test crashes, duplicates, timeouts and replay before production.\n\nExample (java; illustrative excerpt):\nreturn transactionalOperator.transactional(\n    orders.save(order).flatMap(saved ->\n        outbox.save(eventFor(saved)).thenReturn(saved)))\n    .map(saved -> ResponseEntity.accepted().body(saved.id()));\n\nCommon mistake: Do not assume a reactive API guarantees durable delivery or global transaction consistency.\n\nInterview follow-up: How would you recover when payment succeeds but its response is lost?",
  "detailedAnswerTelugu": "WebFlux API లో reactive database access వాడాలి. Order మరియు outbox ఒక reactive transaction లో save చేసి commit తర్వాత accepted response ఇవ్వాలి. Kafka relay orderId key తో event పంపుతుంది. Inventory, Payment consumers idempotent గా ఉండాలి. Saga state durable గా save చేయాలి. Blocking work event loop బయట ఉంచాలి. Consumer lag, DLT, latency, pool saturation monitor చేసి crash మరియు duplicate scenarios test చేయాలి.\n\nExample:\nreturn transactionalOperator.transactional(\n    orders.save(order).flatMap(saved ->\n        outbox.save(eventFor(saved)).thenReturn(saved)))\n    .map(saved -> ResponseEntity.accepted().body(saved.id()));",
  "difficulty": "expert",
  "codeExample": "return transactionalOperator.transactional(\n    orders.save(order).flatMap(saved ->\n        outbox.save(eventFor(saved)).thenReturn(saved)))\n    .map(saved -> ResponseEntity.accepted().body(saved.id()));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not assume a reactive API guarantees durable delivery or global transaction consistency."
  ],
  "followUpQuestions": [
    "How would you recover when payment succeeds but its response is lost?"
  ],
  "interviewTips": [
    "Explain the guarantee, its limits, and the production trade-offs."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-121",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Unit testing vs integration testing — how does it work in Spring Boot?",
  "shortAnswer": "Unit tests isolate business logic; integration tests verify collaboration with real infrastructure or framework components.",
  "detailedAnswer": "Test a pricing rule with plain Java and a fake repository. Test persistence with a real database and migrations. A unit test cannot detect incorrect SQL or transaction wiring; an integration test costs more time and setup. Use both, with a small number of end-to-end journeys.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@Test void total() { assertEquals(200, priceService.total(100, 2)); }\n\nCommon mistake: Do not mock the database in a test intended to validate SQL.\n\nInterview follow-up: How do you decide which layer should own a test?",
  "detailedAnswerTelugu": "Unit test లో business logic ను ఇతర dependencies నుంచి విడిగా పరీక్షిస్తాం. Integration test లో Spring wiring, database వంటి components కలిసి సరిగ్గా పనిచేస్తున్నాయా చూస్తాం. Pricing rule కోసం database అవసరం లేదు; SQL mapping కోసం నిజమైన database ఉపయోగించడం మంచిది.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@Test void total() { assertEquals(200, priceService.total(100, 2)); }",
  "difficulty": "beginner",
  "codeExample": "@Test void total() { assertEquals(200, priceService.total(100, 2)); }",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not mock the database in a test intended to validate SQL."
  ],
  "followUpQuestions": [
    "How do you decide which layer should own a test?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-122",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "What is JUnit 5 architecture and annotations?",
  "shortAnswer": "JUnit Platform launches tests; Jupiter provides the programming and extension model.",
  "detailedAnswer": "Use @Test for individual cases, @BeforeEach for independent setup, @ParameterizedTest for multiple inputs and assertThrows for expected exceptions. Jupiter creates a fresh test instance per method by default. Avoid ordering dependencies and shared mutable state. Extensions integrate external tools such as Mockito.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@ParameterizedTest\n@ValueSource(ints = {0, -1})\nvoid invalidQuantity(int qty) {\n    assertThrows(IllegalArgumentException.class, () -> service.order(qty));\n}\n\nCommon mistake: Do not rely on test execution order.\n\nInterview follow-up: When would you use @TestInstance(PER_CLASS)?",
  "detailedAnswerTelugu": "JUnit Platform tests ను కనుగొని అమలు చేస్తుంది. Jupiter annotations మరియు assertions అందిస్తుంది. ప్రతి test కి సాధారణంగా కొత్త instance వస్తుంది. @BeforeEach తో setup చేయవచ్చు. Parameterized tests ద్వారా ఒకే rule ను వేర్వేరు inputs తో పరీక్షించవచ్చు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@ParameterizedTest\n@ValueSource(ints = {0, -1})\nvoid invalidQuantity(int qty) {\n    assertThrows(IllegalArgumentException.class, () -> service.order(qty));\n}",
  "difficulty": "intermediate",
  "codeExample": "@ParameterizedTest\n@ValueSource(ints = {0, -1})\nvoid invalidQuantity(int qty) {\n    assertThrows(IllegalArgumentException.class, () -> service.order(qty));\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not rely on test execution order."
  ],
  "followUpQuestions": [
    "When would you use @TestInstance(PER_CLASS)?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-123",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Mockito mocking and stubbing — how does it work in Spring Boot?",
  "shortAnswer": "Mockito substitutes dependencies and allows controlled responses and interaction verification.",
  "detailedAnswer": "Stub repository responses with when().thenReturn(), invoke the real service, and assert the result. Verify interactions only when they are part of the behavior, such as publishing an event after a successful order. Strict stubbing helps detect unused stubs. Mocking every class makes tests brittle and hides integration problems.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nwhen(repository.findById(42L)).thenReturn(Optional.of(order));\nassertEquals(order, service.find(42L));\nverify(repository).findById(42L);\n\nCommon mistake: Do not stub the method you are actually testing.\n\nInterview follow-up: What is the difference between a mock and a fake?",
  "detailedAnswerTelugu": "Mockito ద్వారా repository వంటి dependency స్థానంలో mock object వాడతాం. when ద్వారా కావాల్సిన response ఇస్తాం. అసలు service method ను అమలు చేసి result ను assert చేస్తాం. Event publish వంటి ముఖ్యమైన interaction ను verify చేయవచ్చు. ప్రతి internal call ను verify చేయడం వల్ల tests brittle అవుతాయి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nwhen(repository.findById(42L)).thenReturn(Optional.of(order));\nassertEquals(order, service.find(42L));\nverify(repository).findById(42L);",
  "difficulty": "intermediate",
  "codeExample": "when(repository.findById(42L)).thenReturn(Optional.of(order));\nassertEquals(order, service.find(42L));\nverify(repository).findById(42L);",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not stub the method you are actually testing."
  ],
  "followUpQuestions": [
    "What is the difference between a mock and a fake?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-124",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "@Mock vs @InjectMocks vs @Spy — how does it work in Spring Boot?",
  "shortAnswer": "@Mock creates a substitute, @InjectMocks attempts dependency injection, and @Spy wraps a real object.",
  "detailedAnswer": "Use MockitoExtension to initialize annotations in Jupiter. Prefer explicit constructor construction when wiring is complex. A spy invokes real methods by default; use doReturn when stubbing a spy would otherwise execute a real method. @InjectMocks is not a Spring container and does not apply transactional proxies.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@ExtendWith(MockitoExtension.class)\nclass OrderTest {\n    @Mock OrderRepository repository;\n    @InjectMocks OrderService service;\n}\n\nCommon mistake: Do not expect @Transactional to work on an @InjectMocks object.\n\nInterview follow-up: Why can when(spy.method()) cause side effects?",
  "detailedAnswerTelugu": "@Mock dependency కి నకిలీ object తయారు చేస్తుంది. @InjectMocks mocks ను పరీక్షించే class లో inject చేయడానికి ప్రయత్నిస్తుంది. @Spy అసలు methods ను సాధారణంగా అమలు చేస్తుంది. Spy stubbing కోసం doReturn ఉపయోగిస్తే అనవసరమైన real call తప్పుతుంది. @InjectMocks Spring container కాదు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@ExtendWith(MockitoExtension.class)\nclass OrderTest {\n    @Mock OrderRepository repository;\n    @InjectMocks OrderService service;\n}",
  "difficulty": "advanced",
  "codeExample": "@ExtendWith(MockitoExtension.class)\nclass OrderTest {\n    @Mock OrderRepository repository;\n    @InjectMocks OrderService service;\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not expect @Transactional to work on an @InjectMocks object."
  ],
  "followUpQuestions": [
    "Why can when(spy.method()) cause side effects?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-125",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "@MockitoBean vs @MockBean — how does it work in Spring Boot?",
  "shortAnswer": "@MockitoBean overrides a bean in the Spring test context; @MockBean is the older Boot annotation.",
  "detailedAnswer": "Spring Framework 6.2 introduced @MockitoBean. Boot 3.4 deprecated @MockBean for removal in Boot 4. Use org.springframework.test.context.bean.override.mockito.MockitoBean with modern versions. Unlike plain @Mock, the replacement is injected into Spring-managed collaborators. Consistent overrides improve context cache reuse. Use enforceOverride=true when an existing bean must be replaced.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@WebMvcTest(OrderController.class)\nclass OrderControllerTest {\n    @MockitoBean OrderService service;\n    @Autowired MockMvc mvc;\n}\n\nCommon mistake: Do not assume a plain @Mock replaces an application bean.\n\nInterview follow-up: How do bean overrides affect test context caching?",
  "detailedAnswerTelugu": "@MockitoBean Spring test context లో bean స్థానంలో mock ను ఉంచుతుంది. @Mock కేవలం Mockito object మాత్రమే తయారు చేస్తుంది. Boot 3.4 నుంచి పాత @MockBean deprecated అయింది; Boot 4 లో కొత్త annotation వాడాలి. Bean నిజంగా ఉందని నిర్ధారించడానికి enforceOverride ఉపయోగించవచ్చు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@WebMvcTest(OrderController.class)\nclass OrderControllerTest {\n    @MockitoBean OrderService service;\n    @Autowired MockMvc mvc;\n}",
  "difficulty": "advanced",
  "codeExample": "@WebMvcTest(OrderController.class)\nclass OrderControllerTest {\n    @MockitoBean OrderService service;\n    @Autowired MockMvc mvc;\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not assume a plain @Mock replaces an application bean."
  ],
  "followUpQuestions": [
    "How do bean overrides affect test context caching?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-126",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "@SpringBootTest and application context testing — how does it work in Spring Boot?",
  "shortAnswer": "@SpringBootTest loads the application context using Spring Boot configuration.",
  "detailedAnswer": "The default MOCK web environment does not start a real HTTP server. RANDOM_PORT starts an embedded server on a free port. Use a test profile and isolated infrastructure. With RANDOM_PORT, server transactions execute on separate threads, so a test transaction does not automatically roll back server writes. Clean up explicitly. Context caching reduces startup overhead.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)\n@ActiveProfiles(\"test\")\nclass OrderIntegrationTest {\n    @Test void contextLoads() {}\n}\n\nCommon mistake: Never point integration tests at production infrastructure.\n\nInterview follow-up: Why does a test transaction not roll back HTTP server writes?",
  "detailedAnswerTelugu": "@SpringBootTest పూర్తి application context ను load చేస్తుంది. Default MOCK mode నిజమైన HTTP server ప్రారంభించదు. RANDOM_PORT embedded server ను ప్రారంభిస్తుంది. Server వేరే thread లో transaction నిర్వహిస్తే test rollback వల్ల server data తొలగిపోదు. Test database ను విడిగా ఉంచి cleanup చేయాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)\n@ActiveProfiles(\"test\")\nclass OrderIntegrationTest {\n    @Test void contextLoads() {}\n}",
  "difficulty": "advanced",
  "codeExample": "@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)\n@ActiveProfiles(\"test\")\nclass OrderIntegrationTest {\n    @Test void contextLoads() {}\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Never point integration tests at production infrastructure."
  ],
  "followUpQuestions": [
    "Why does a test transaction not roll back HTTP server writes?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-127",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "@WebMvcTest and MockMvc — how does it work in Spring Boot?",
  "shortAnswer": "@WebMvcTest loads the MVC slice; MockMvc exercises MVC request handling without a network server.",
  "detailedAnswer": "Test JSON binding, validation, status codes and exception handlers with a mocked service. Security filters can be active; use appropriate test authentication and CSRF tokens for session-based protected writes. Assert error responses as well as success. This slice does not validate repository behavior.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nmvc.perform(get(\"/orders/42\").with(user(\"alice\")))\n   .andExpect(status().isOk())\n   .andExpect(jsonPath(\"$.id\").value(42));\n\nCommon mistake: Do not disable security merely to make every test pass.\n\nInterview follow-up: How would you test an invalid request body?",
  "detailedAnswerTelugu": "@WebMvcTest controller కు అవసరమైన MVC components మాత్రమే load చేస్తుంది. MockMvc నిజమైన network server లేకుండా request ను పరీక్షిస్తుంది. JSON mapping, validation, status code, exception handler ను పరీక్షించవచ్చు. Security filters ఉంటే సరైన authentication మరియు అవసరమైన CSRF token ఇవ్వాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nmvc.perform(get(\"/orders/42\").with(user(\"alice\")))\n   .andExpect(status().isOk())\n   .andExpect(jsonPath(\"$.id\").value(42));",
  "difficulty": "advanced",
  "codeExample": "mvc.perform(get(\"/orders/42\").with(user(\"alice\")))\n   .andExpect(status().isOk())\n   .andExpect(jsonPath(\"$.id\").value(42));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not disable security merely to make every test pass."
  ],
  "followUpQuestions": [
    "How would you test an invalid request body?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-128",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "@DataJpaTest and repository testing — how does it work in Spring Boot?",
  "shortAnswer": "@DataJpaTest loads the JPA slice and normally rolls back test transactions.",
  "detailedAnswer": "Use it to verify mappings, constraints and repository queries. Flush and clear the EntityManager before reloading to avoid false positives from the first-level cache. Embedded databases may differ from production SQL dialects; use PostgreSQL Testcontainers when dialect behavior matters. Test unique constraints by flushing.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nrepository.save(order);\nentityManager.flush();\nentityManager.clear();\nassertTrue(repository.findById(order.getId()).isPresent());\n\nCommon mistake: Do not assume save() immediately executes every SQL statement.\n\nInterview follow-up: How do you test a database uniqueness constraint?",
  "detailedAnswerTelugu": "@DataJpaTest JPA repository మరియు entity mapping ను పరీక్షిస్తుంది. సాధారణంగా test transaction rollback అవుతుంది. flush మరియు clear చేసిన తర్వాత మళ్లీ query చేస్తే database లో నిజంగా ఏమి జరిగిందో తెలుస్తుంది. H2 మరియు PostgreSQL SQL behavior ఒకేలా ఉండకపోవచ్చు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nrepository.save(order);\nentityManager.flush();\nentityManager.clear();\nassertTrue(repository.findById(order.getId()).isPresent());",
  "difficulty": "advanced",
  "codeExample": "repository.save(order);\nentityManager.flush();\nentityManager.clear();\nassertTrue(repository.findById(order.getId()).isPresent());",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not assume save() immediately executes every SQL statement."
  ],
  "followUpQuestions": [
    "How do you test a database uniqueness constraint?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-129",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "WebTestClient and reactive API testing — how does it work in Spring Boot?",
  "shortAnswer": "WebTestClient tests HTTP endpoints using a reactive client with mock or live server binding.",
  "detailedAnswer": "Use @WebFluxTest for controller slices or bind to a running server for integration. Assert response status, headers and body. For streaming endpoints use returnResult and StepVerifier to check elements and cancellation. A test should use bounded timeouts; avoid blocking inside application reactive operators.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nclient.get().uri(\"/orders/42\").exchange()\n    .expectStatus().isOk()\n    .expectBody().jsonPath(\"$.id\").isEqualTo(42);\n\nCommon mistake: Do not confuse a reactive client with proof that all server dependencies are non-blocking.\n\nInterview follow-up: How would you test an infinite SSE stream?",
  "detailedAnswerTelugu": "WebTestClient reactive API requests ను పరీక్షించడానికి ఉపయోగపడుతుంది. @WebFluxTest తో controller slice పరీక్షించవచ్చు. Live server తో కూడా connect చేయవచ్చు. Streaming response కోసం StepVerifier ద్వారా వచ్చే elements మరియు cancellation పరీక్షించవచ్చు. Test timeout తప్పనిసరిగా పరిమితం చేయాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nclient.get().uri(\"/orders/42\").exchange()\n    .expectStatus().isOk()\n    .expectBody().jsonPath(\"$.id\").isEqualTo(42);",
  "difficulty": "advanced",
  "codeExample": "client.get().uri(\"/orders/42\").exchange()\n    .expectStatus().isOk()\n    .expectBody().jsonPath(\"$.id\").isEqualTo(42);",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not confuse a reactive client with proof that all server dependencies are non-blocking."
  ],
  "followUpQuestions": [
    "How would you test an infinite SSE stream?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-130",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Testcontainers with PostgreSQL — how does it work in Spring Boot?",
  "shortAnswer": "Testcontainers starts disposable real infrastructure for integration tests.",
  "detailedAnswer": "Use a pinned PostgreSQL image and Boot service connections with spring-boot-testcontainers. Run the same migrations as production. Container startup needs a compatible Docker runtime. Share containers only with careful lifecycle and data isolation; avoid fixed host ports. In a JPA slice disable embedded replacement when necessary.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n@Testcontainers\n@SpringBootTest\nclass DatabaseTest {\n    @Container @ServiceConnection\n    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>(\"postgres:16\");\n}\n\nCommon mistake: Do not use a floating latest image in reproducible CI tests.\n\nInterview follow-up: How do you handle container startup cost and isolation?",
  "detailedAnswerTelugu": "Testcontainers ద్వారా నిజమైన PostgreSQL ను temporary Docker container లో ప్రారంభిస్తాం. Production migrations తోనే test schema తయారు చేయాలి. @ServiceConnection ద్వారా Boot connection details పొందుతుంది. Docker runtime అవసరం. Tests మధ్య data isolation ఉంచాలి; fixed host port అవసరం లేదు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n@Testcontainers\n@SpringBootTest\nclass DatabaseTest {\n    @Container @ServiceConnection\n    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>(\"postgres:16\");\n}",
  "difficulty": "expert",
  "codeExample": "@Testcontainers\n@SpringBootTest\nclass DatabaseTest {\n    @Container @ServiceConnection\n    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>(\"postgres:16\");\n}",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not use a floating latest image in reproducible CI tests."
  ],
  "followUpQuestions": [
    "How do you handle container startup cost and isolation?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-131",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "WireMock and downstream API testing — how does it work in Spring Boot?",
  "shortAnswer": "WireMock simulates external HTTP services with controlled responses and failures.",
  "detailedAnswer": "Configure the payment client base URL to the stub server dynamic port. Test success, 503, malformed JSON and delayed responses. Verify request method, path and headers without recording secrets. Assert the application outcome and retry count; use a delay exceeding the configured client timeout to test timeout handling.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nstubFor(post(urlEqualTo(\"/payments\"))\n    .willReturn(aResponse().withStatus(503)));\n// Invoke order service and assert its failure policy.\nverify(postRequestedFor(urlEqualTo(\"/payments\")));\n\nCommon mistake: Do not call a real payment provider from routine CI tests.\n\nInterview follow-up: How do you test retry exhaustion without long sleeps?",
  "detailedAnswerTelugu": "WireMock external Payment API స్థానంలో HTTP stub server గా పనిచేస్తుంది. Success, 503, invalid JSON, delay వంటి responses సృష్టించవచ్చు. Client URL ను stub port కు మార్చాలి. Timeout test లో client timeout కంటే ఎక్కువ delay ఇవ్వాలి. Retry count మరియు business result రెండూ పరీక్షించాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nstubFor(post(urlEqualTo(\"/payments\"))\n    .willReturn(aResponse().withStatus(503)));\n// Invoke order service and assert its failure policy.\nverify(postRequestedFor(urlEqualTo(\"/payments\")));",
  "difficulty": "expert",
  "codeExample": "stubFor(post(urlEqualTo(\"/payments\"))\n    .willReturn(aResponse().withStatus(503)));\n// Invoke order service and assert its failure policy.\nverify(postRequestedFor(urlEqualTo(\"/payments\")));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not call a real payment provider from routine CI tests."
  ],
  "followUpQuestions": [
    "How do you test retry exhaustion without long sleeps?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-132",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Spring Kafka integration testing — how does it work in Spring Boot?",
  "shortAnswer": "Use an embedded broker or Kafka Testcontainers to verify real producer and consumer behavior.",
  "detailedAnswer": "Publish a uniquely identified event and await an observable business outcome with a bounded timeout. Use unique topics or groups to avoid cross-test interference. Test serialization, retry, dead-letter routing and duplicate delivery. Producer acknowledgment alone does not prove consumer processing. Testcontainers better represents a deployed broker configuration.\n\nExample (illustrative excerpt; imports and fixtures omitted):\nkafkaTemplate.send(topic, orderId, event).get(5, TimeUnit.SECONDS);\nawait().atMost(Duration.ofSeconds(10))\n    .until(() -> repository.existsById(orderId));\n\nCommon mistake: Avoid Thread.sleep as the only synchronization mechanism.\n\nInterview follow-up: How would you test a poison message and dead-letter routing?",
  "detailedAnswerTelugu": "Kafka integration test లో నిజమైన broker ద్వారా producer మరియు consumer behavior పరీక్షిస్తాం. Unique event పంపి database లో expected result వచ్చే వరకు పరిమిత సమయం వేచి చూడాలి. Producer acknowledgment వచ్చినంత మాత్రాన consumer processing పూర్తయిందని కాదు. Duplicate events, retry, DLT కూడా పరీక్షించాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\nkafkaTemplate.send(topic, orderId, event).get(5, TimeUnit.SECONDS);\nawait().atMost(Duration.ofSeconds(10))\n    .until(() -> repository.existsById(orderId));",
  "difficulty": "expert",
  "codeExample": "kafkaTemplate.send(topic, orderId, event).get(5, TimeUnit.SECONDS);\nawait().atMost(Duration.ofSeconds(10))\n    .until(() -> repository.existsById(orderId));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Avoid Thread.sleep as the only synchronization mechanism."
  ],
  "followUpQuestions": [
    "How would you test a poison message and dead-letter routing?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-133",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Consumer-driven contract testing — how does it work in Spring Boot?",
  "shortAnswer": "Contract tests verify agreed interactions between service consumers and providers.",
  "detailedAnswer": "A consumer defines expected requests and response fields. Provider verification checks the real controller against that contract, while consumer tests use generated stubs. Publish versioned contracts and verify them in CI before deployment. Spring Cloud Contract or Pact can implement this workflow. Contracts complement rather than replace end-to-end and business-rule tests.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n// Illustrative contract expectation (JSON)\n{ \"request\": { \"method\": \"GET\", \"path\": \"/orders/42\" },\n  \"response\": { \"status\": 200, \"body\": { \"id\": 42 } } }\n\nCommon mistake: Do not treat a hand-written stub alone as provider verification.\n\nInterview follow-up: How do you introduce a backward-compatible response change?",
  "detailedAnswerTelugu": "Consumer కు అవసరమైన request మరియు response fields ను contract లో నిర్వచిస్తాం. Provider తన API ఆ contract కు సరిపోతుందా పరీక్షిస్తుంది. Consumer generated stub తో పరీక్షిస్తుంది. CI లో contract verification ద్వారా breaking changes ముందే గుర్తించవచ్చు. ఇది పూర్తి end-to-end testing కు ప్రత్యామ్నాయం కాదు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n// Illustrative contract expectation (JSON)\n{ \"request\": { \"method\": \"GET\", \"path\": \"/orders/42\" },\n  \"response\": { \"status\": 200, \"body\": { \"id\": 42 } } }",
  "difficulty": "expert",
  "codeExample": "// Illustrative contract expectation (JSON)\n{ \"request\": { \"method\": \"GET\", \"path\": \"/orders/42\" },\n  \"response\": { \"status\": 200, \"body\": { \"id\": 42 } } }",
  "codeLanguage": "json",
  "commonMistakes": [
    "Do not treat a hand-written stub alone as provider verification."
  ],
  "followUpQuestions": [
    "How do you introduce a backward-compatible response change?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-134",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "JaCoCo, code coverage and testing quality — how does it work in Spring Boot?",
  "shortAnswer": "JaCoCo measures executed bytecode instructions and branches, not correctness.",
  "detailedAnswer": "Use line and branch coverage to identify untested paths. Configure Maven verify with JaCoCo report and check goals. Focus on critical business rules, boundaries, error paths and mutation testing where useful. High coverage with no meaningful assertions is misleading. Exclude generated code only with a documented reason.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n// Test both boundary and failure behavior\nassertThrows(IllegalArgumentException.class, () -> service.order(0));\nassertDoesNotThrow(() -> service.order(1));\n\nCommon mistake: Do not equate 100% coverage with zero defects.\n\nInterview follow-up: What is the difference between line and branch coverage?",
  "detailedAnswerTelugu": "JaCoCo tests సమయంలో ఏ code instructions మరియు branches అమలయ్యాయో కొలుస్తుంది. Coverage ఎక్కువగా ఉన్నా assertions లేకపోతే correctness నిర్ధారణ కాదు. Payment failure, invalid quantity, duplicate order వంటి business paths కు ప్రాధాన్యం ఇవ్వాలి. CI లో coverage report మరియు threshold ఉపయోగించవచ్చు.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n// Test both boundary and failure behavior\nassertThrows(IllegalArgumentException.class, () -> service.order(0));\nassertDoesNotThrow(() -> service.order(1));",
  "difficulty": "advanced",
  "codeExample": "// Test both boundary and failure behavior\nassertThrows(IllegalArgumentException.class, () -> service.order(0));\nassertDoesNotThrow(() -> service.order(1));",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not equate 100% coverage with zero defects."
  ],
  "followUpQuestions": [
    "What is the difference between line and branch coverage?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-135",
  "technology": "spring-boot",
  "topic": "JUnit, Mockito and Integration Testing",
  "question": "Enterprise microservices testing strategy — how does it work in Spring Boot?",
  "shortAnswer": "Combine fast unit tests, focused slices, real-infrastructure integration tests, contracts and a few end-to-end journeys.",
  "detailedAnswer": "For order processing, unit-test pricing and state transitions; use MVC slices for validation; use PostgreSQL and Kafka integration tests for outbox and idempotency; verify payment contracts; run an end-to-end order-to-payment journey. Include failure injection for timeouts and duplicates. CI should separate fast feedback from slower suites, preserve logs and avoid shared mutable environments.\n\nExample (illustrative excerpt; imports and fixtures omitted):\n// Example test plan: order accepted -> outbox published ->\n// payment event consumed -> order confirmed.\n// Repeat the event and assert no duplicate charge.\n\nCommon mistake: Do not depend solely on happy-path end-to-end tests.\n\nInterview follow-up: How would you test eventual consistency and compensation?",
  "detailedAnswerTelugu": "Enterprise microservices లో అన్ని tests ను end-to-end గా రాయడం ఖరీదైనది మరియు flaky అవుతుంది. Pricing rules కు unit tests, controller validation కు slice tests, outbox మరియు Kafka processing కు integration tests, Payment API కు contract tests వాడాలి. కొద్దిపాటి పూర్తి order journey tests ఉంచాలి. CI లో fast tests ముందుగా, infrastructure tests తర్వాత అమలు చేయాలి.\n\nఉదాహరణ (అవసరమైన imports, setup విడిగా ఇవ్వాలి):\n// Example test plan: order accepted -> outbox published ->\n// payment event consumed -> order confirmed.\n// Repeat the event and assert no duplicate charge.",
  "difficulty": "expert",
  "codeExample": "// Example test plan: order accepted -> outbox published ->\n// payment event consumed -> order confirmed.\n// Repeat the event and assert no duplicate charge.",
  "codeLanguage": "java",
  "commonMistakes": [
    "Do not depend solely on happy-path end-to-end tests."
  ],
  "followUpQuestions": [
    "How would you test eventual consistency and compensation?"
  ],
  "interviewTips": [
    "Explain what the test verifies and what it cannot guarantee."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-136",
  "technology": "spring-boot",
  "topic": "Actuator",
  "question": "How do Spring Boot Actuator endpoints support production operations?",
  "shortAnswer": "Actuator exposes operational endpoints for health, metrics and diagnostics.",
  "detailedAnswer": "Health contributors report dependency status; readiness and liveness groups answer different operational questions. Expose only necessary endpoints, authenticate management access and avoid publishing sensitive environment or heap data. A separate management port can help isolate traffic but does not itself provide authentication.\n\nExample (yaml; illustrative excerpt):\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,prometheus\n  endpoint:\n    health:\n      probes:\n        enabled: true\n\nEnterprise scenario: An order API reports readiness false while initializing its required dependencies.\n\nCommon mistake: Do not expose every endpoint publicly.\n\nInterview follow-up: Why should liveness not depend on a remote database?",
  "detailedAnswerTelugu": "Actuator ద్వారా application health, metrics తెలుసుకోవచ్చు. Liveness అంటే process పనిచేస్తుందా, readiness అంటే traffic తీసుకోగలదా అని తెలుసుకోవడం. అవసరమైన endpoints మాత్రమే expose చేసి authentication పెట్టాలి.\n\nExample (yaml):\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,prometheus\n  endpoint:\n    health:\n      probes:\n        enabled: true",
  "difficulty": "intermediate",
  "codeExample": "management:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,prometheus\n  endpoint:\n    health:\n      probes:\n        enabled: true",
  "codeLanguage": "yaml",
  "realTimeScenario": "An order API reports readiness false while initializing its required dependencies.",
  "commonMistakes": [
    "Do not expose every endpoint publicly."
  ],
  "followUpQuestions": [
    "Why should liveness not depend on a remote database?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-137",
  "technology": "spring-boot",
  "topic": "Micrometer",
  "question": "How does Micrometer collect application metrics?",
  "shortAnswer": "Micrometer provides vendor-neutral meters and registry integrations.",
  "detailedAnswer": "Counters accumulate events, timers record durations and counts, gauges sample current values. Histograms enable aggregation of latency distributions across instances. Tags must have bounded cardinality; order IDs create expensive time series. Use a timer around business operations and record failures separately.\n\nExample (java; illustrative excerpt):\nTimer.builder(\"orders.processing\")\n    .tag(\"operation\", \"create\")\n    .register(registry)\n    .record(() -> orderService.create(request));\n\nEnterprise scenario: Track order creation latency separately from payment latency.\n\nCommon mistake: Do not tag metrics with customer IDs.\n\nInterview follow-up: How do histograms differ from client-side percentiles?",
  "detailedAnswerTelugu": "Micrometer ద్వారా counters, timers, gauges ఉపయోగించి metrics సేకరిస్తాం. Timer request duration మరియు count నమోదు చేస్తుంది. Order ID వంటి unique values ను tags గా వాడితే time series సంఖ్య విపరీతంగా పెరుగుతుంది.\n\nExample (java):\nTimer.builder(\"orders.processing\")\n    .tag(\"operation\", \"create\")\n    .register(registry)\n    .record(() -> orderService.create(request));",
  "difficulty": "advanced",
  "codeExample": "Timer.builder(\"orders.processing\")\n    .tag(\"operation\", \"create\")\n    .register(registry)\n    .record(() -> orderService.create(request));",
  "codeLanguage": "java",
  "realTimeScenario": "Track order creation latency separately from payment latency.",
  "commonMistakes": [
    "Do not tag metrics with customer IDs."
  ],
  "followUpQuestions": [
    "How do histograms differ from client-side percentiles?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-138",
  "technology": "spring-boot",
  "topic": "Prometheus and Grafana",
  "question": "How do Prometheus and Grafana monitor Spring Boot?",
  "shortAnswer": "Prometheus scrapes metrics; Grafana queries and visualizes them.",
  "detailedAnswer": "Add the Prometheus registry dependency and expose the actuator prometheus endpoint securely. Prometheus periodically scrapes targets. Use rate for counters and histogram_quantile for histogram buckets, preserving the le label. Define alerts around service objectives, not merely CPU usage.\n\nExample (promql; illustrative excerpt):\nhistogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket[5m])))\n\nEnterprise scenario: Alert when order API latency exceeds its objective for a sustained interval.\n\nCommon mistake: Enable histogram publication before querying buckets; do not average percentiles.\n\nInterview follow-up: How would you monitor error-budget burn?",
  "detailedAnswerTelugu": "Prometheus application metrics ను scrape చేస్తుంది. Grafana వాటిని dashboards లో చూపిస్తుంది. Counter మీద rate ఉపయోగించి request rate తెలుసుకోవచ్చు. Histogram buckets ద్వారా latency percentile అంచనా వేయవచ్చు.\n\nExample (promql):\nhistogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket[5m])))",
  "difficulty": "advanced",
  "codeExample": "histogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket[5m])))",
  "codeLanguage": "promql",
  "realTimeScenario": "Alert when order API latency exceeds its objective for a sustained interval.",
  "commonMistakes": [
    "Enable histogram publication before querying buckets; do not average percentiles."
  ],
  "followUpQuestions": [
    "How would you monitor error-budget burn?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-139",
  "technology": "spring-boot",
  "topic": "Datadog",
  "question": "How do you investigate slow requests using Datadog APM?",
  "shortAnswer": "APM connects traces, service dependencies and runtime metrics.",
  "detailedAnswer": "Instrument the JVM with a compatible tracer and configure service, environment and version tags. Inspect latency distributions, slow traces and database or HTTP spans. Compare deployments and correlate with CPU, GC and connection-pool metrics. Sampling means not every request is retained.\n\nExample (bash; illustrative excerpt):\nDD_SERVICE=order-service\nDD_ENV=production\nDD_VERSION=1.4.0\njava -javaagent:/opt/dd-java-agent.jar -jar app.jar\n\nEnterprise scenario: A new release increases p95 latency because a repository query scans a large table.\n\nCommon mistake: Do not assume the longest span proves the root cause.\n\nInterview follow-up: How do sampling and trace retention affect investigations?",
  "detailedAnswerTelugu": "Datadog APM ద్వారా request ఏ service లో ఎక్కువ సమయం తీసుకుంటుందో traces లో చూడవచ్చు. Deployment version, environment tags ద్వారా మార్పులను పోల్చాలి. Database spans, GC, connection pool metrics కలిపి root cause గుర్తించాలి.\n\nExample (bash):\nDD_SERVICE=order-service\nDD_ENV=production\nDD_VERSION=1.4.0\njava -javaagent:/opt/dd-java-agent.jar -jar app.jar",
  "difficulty": "advanced",
  "codeExample": "DD_SERVICE=order-service\nDD_ENV=production\nDD_VERSION=1.4.0\njava -javaagent:/opt/dd-java-agent.jar -jar app.jar",
  "codeLanguage": "bash",
  "realTimeScenario": "A new release increases p95 latency because a repository query scans a large table.",
  "commonMistakes": [
    "Do not assume the longest span proves the root cause."
  ],
  "followUpQuestions": [
    "How do sampling and trace retention affect investigations?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-140",
  "technology": "spring-boot",
  "topic": "OpenTelemetry",
  "question": "How does distributed tracing work with OpenTelemetry?",
  "shortAnswer": "Trace context links spans across service boundaries.",
  "detailedAnswer": "A trace represents a distributed operation; spans represent individual work units. W3C traceparent propagates context across HTTP and compatible messaging instrumentation. Export spans via OTLP to a collector or backend. Sampling controls cost; avoid sensitive attributes and propagate context across asynchronous boundaries.\n\nExample (bash; illustrative excerpt):\nOTEL_SERVICE_NAME=order-service\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc\njava -javaagent:/opt/opentelemetry-javaagent.jar -jar app.jar\n\nEnterprise scenario: Trace an order request through inventory and payment services.\n\nCommon mistake: Avoid duplicate instrumentation and exporting secrets.\n\nInterview follow-up: How do head and tail sampling differ?",
  "detailedAnswerTelugu": "Trace ఒక distributed request ను సూచిస్తుంది. Span అనేది ఆ request లో ఒక పని. traceparent header ద్వారా context తదుపరి service కు వెళ్తుంది. OTLP ద్వారా spans collector కు పంపవచ్చు. Sensitive data ను attributes లో పెట్టకూడదు.\n\nExample (bash):\nOTEL_SERVICE_NAME=order-service\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc\njava -javaagent:/opt/opentelemetry-javaagent.jar -jar app.jar",
  "difficulty": "expert",
  "codeExample": "OTEL_SERVICE_NAME=order-service\nOTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc\njava -javaagent:/opt/opentelemetry-javaagent.jar -jar app.jar",
  "codeLanguage": "bash",
  "realTimeScenario": "Trace an order request through inventory and payment services.",
  "commonMistakes": [
    "Avoid duplicate instrumentation and exporting secrets."
  ],
  "followUpQuestions": [
    "How do head and tail sampling differ?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-141",
  "technology": "spring-boot",
  "topic": "Logging",
  "question": "How do structured logs and correlation IDs help debugging?",
  "shortAnswer": "Structured logs make events searchable and correlation connects related events.",
  "detailedAnswer": "Use JSON logs with timestamp, severity, service, trace ID and meaningful event fields. With tracing instrumentation, correlate logs with spans. MDC is thread-local and needs cleanup; reactive flows require context-aware propagation. Redact tokens, credentials and payment details.\n\nExample (java; illustrative excerpt):\ntry (var ignored = MDC.putCloseable(\"orderId\", orderId)) {\n    log.info(\"Order accepted\");\n}\n\nEnterprise scenario: Find all logs for a failed order using its trace ID.\n\nCommon mistake: Do not log full request bodies by default.\n\nInterview follow-up: How do you propagate context in Reactor?",
  "detailedAnswerTelugu": "JSON structured logs వల్ల fields ఆధారంగా search చేయవచ్చు. Trace ID ద్వారా services మధ్య ఒకే request logs కలపవచ్చు. MDC thread-local కాబట్టి cleanup అవసరం. Passwords, tokens వంటి sensitive data log చేయకూడదు.\n\nExample (java):\ntry (var ignored = MDC.putCloseable(\"orderId\", orderId)) {\n    log.info(\"Order accepted\");\n}",
  "difficulty": "advanced",
  "codeExample": "try (var ignored = MDC.putCloseable(\"orderId\", orderId)) {\n    log.info(\"Order accepted\");\n}",
  "codeLanguage": "java",
  "realTimeScenario": "Find all logs for a failed order using its trace ID.",
  "commonMistakes": [
    "Do not log full request bodies by default."
  ],
  "followUpQuestions": [
    "How do you propagate context in Reactor?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-142",
  "technology": "spring-boot",
  "topic": "JVM",
  "question": "How do JVM memory and garbage collection affect production latency?",
  "shortAnswer": "Heap, native memory and GC behavior influence throughput and pauses.",
  "detailedAnswer": "Heap holds Java objects; metaspace, thread stacks, direct buffers and JVM internals also consume memory. Container limits must leave native headroom. G1 is a common Java 21 default on server-class machines; evaluate collectors using allocation rate, pause goals and workload measurements. Inspect GC logs before tuning.\n\nExample (bash; illustrative excerpt):\njava -XX:MaxRAMPercentage=65 -Xlog:gc*:stdout:time,level,tags -jar app.jar\n\nEnterprise scenario: A container is OOMKilled even though Java heap usage is below its maximum.\n\nCommon mistake: Do not treat a sample heap percentage as universal.\n\nInterview follow-up: How would you distinguish native memory growth from heap growth?",
  "detailedAnswerTelugu": "Java objects heap లో ఉంటాయి. Metaspace, thread stacks, direct buffers కూడా memory తీసుకుంటాయి. Container limit మొత్తం heap కు ఇవ్వకూడదు. GC logs ద్వారా allocation rate, pauses పరిశీలించి tuning చేయాలి.\n\nExample (bash):\njava -XX:MaxRAMPercentage=65 -Xlog:gc*:stdout:time,level,tags -jar app.jar",
  "difficulty": "expert",
  "codeExample": "java -XX:MaxRAMPercentage=65 -Xlog:gc*:stdout:time,level,tags -jar app.jar",
  "codeLanguage": "bash",
  "realTimeScenario": "A container is OOMKilled even though Java heap usage is below its maximum.",
  "commonMistakes": [
    "Do not treat a sample heap percentage as universal."
  ],
  "followUpQuestions": [
    "How would you distinguish native memory growth from heap growth?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-143",
  "technology": "spring-boot",
  "topic": "Thread dumps",
  "question": "How do you diagnose deadlocks and thread starvation?",
  "shortAnswer": "Repeated thread dumps reveal blocked threads, locks and execution stacks.",
  "detailedAnswer": "Capture several dumps spaced apart during the incident. Compare RUNNABLE, BLOCKED and WAITING threads and identify lock owners or saturated pools. A Java monitor deadlock can be detected by JVM tooling; database lock waits and external I/O require additional evidence.\n\nExample (bash; illustrative excerpt):\njcmd <pid> Thread.print -l\n\nEnterprise scenario: All request threads wait for database connections while a slow transaction holds them.\n\nCommon mistake: A WAITING thread alone does not indicate a deadlock.\n\nInterview follow-up: How would you distinguish pool exhaustion from a monitor deadlock?",
  "detailedAnswerTelugu": "Incident సమయంలో కొన్ని seconds gap తో thread dumps తీసుకోవాలి. BLOCKED threads ఏ lock కోసం wait చేస్తున్నాయో చూడాలి. ఒకే stack repeated గా కనిపిస్తే pool saturation లేదా slow I/O ఉండవచ్చు. Database deadlock కోసం database evidence కూడా అవసరం.\n\nExample (bash):\njcmd <pid> Thread.print -l",
  "difficulty": "expert",
  "codeExample": "jcmd <pid> Thread.print -l",
  "codeLanguage": "bash",
  "realTimeScenario": "All request threads wait for database connections while a slow transaction holds them.",
  "commonMistakes": [
    "A WAITING thread alone does not indicate a deadlock."
  ],
  "followUpQuestions": [
    "How would you distinguish pool exhaustion from a monitor deadlock?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-144",
  "technology": "spring-boot",
  "topic": "Heap dumps",
  "question": "How do you investigate Java memory leaks?",
  "shortAnswer": "Analyze retained objects and paths to GC roots using heap dumps.",
  "detailedAnswer": "First confirm that live heap after GC trends upward under comparable load. Capture a heap dump only with sufficient disk space and operational approval; it may pause the JVM and contain sensitive data. Analyze dominator trees, retained sizes and GC roots with a tool such as Eclipse MAT.\n\nExample (bash; illustrative excerpt):\njcmd <pid> GC.heap_dump /secure/path/heap.hprof\n\nEnterprise scenario: An unbounded cache retains completed order objects indefinitely.\n\nCommon mistake: Do not upload production heap dumps to public services.\n\nInterview follow-up: What is the difference between shallow and retained size?",
  "detailedAnswerTelugu": "GC తర్వాత కూడా live heap పెరుగుతుంటే leak అనుమానం ఉంటుంది. Heap dump తీసుకునే ముందు disk space, production impact పరిశీలించాలి. MAT ద్వారా dominator tree, retained size, GC roots చూసి objects ఎందుకు release కావడం లేదో తెలుసుకోవచ్చు.\n\nExample (bash):\njcmd <pid> GC.heap_dump /secure/path/heap.hprof",
  "difficulty": "expert",
  "codeExample": "jcmd <pid> GC.heap_dump /secure/path/heap.hprof",
  "codeLanguage": "bash",
  "realTimeScenario": "An unbounded cache retains completed order objects indefinitely.",
  "commonMistakes": [
    "Do not upload production heap dumps to public services."
  ],
  "followUpQuestions": [
    "What is the difference between shallow and retained size?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-145",
  "technology": "spring-boot",
  "topic": "Docker deployment",
  "question": "How do you package Spring Boot in a production container?",
  "shortAnswer": "Use a reproducible build and a minimal non-root runtime image.",
  "detailedAnswer": "Build the executable jar in CI or a multi-stage build. Copy only the runtime artifact, run as a non-root user and use exec-form entrypoint for signal handling. Pin reviewed base image digests in production and scan dependencies. Keep secrets outside image layers.\n\nExample (dockerfile; illustrative excerpt):\nFROM eclipse-temurin:21-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nUSER 10001\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]\n\nEnterprise scenario: Deploy the same tested image digest to staging and production.\n\nCommon mistake: Do not rebuild a different artifact for each environment.\n\nInterview follow-up: How do layered jars improve build caching?",
  "detailedAnswerTelugu": "CI లో executable jar build చేసి runtime image లో jar మాత్రమే copy చేయాలి. Non-root user తో run చేయాలి. Exec-form ENTRYPOINT వల్ల JVM కు termination signal అందుతుంది. Secrets image layers లో పెట్టకూడదు.\n\nExample (dockerfile):\nFROM eclipse-temurin:21-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nUSER 10001\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]",
  "difficulty": "advanced",
  "codeExample": "FROM eclipse-temurin:21-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nUSER 10001\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]",
  "codeLanguage": "dockerfile",
  "realTimeScenario": "Deploy the same tested image digest to staging and production.",
  "commonMistakes": [
    "Do not rebuild a different artifact for each environment."
  ],
  "followUpQuestions": [
    "How do layered jars improve build caching?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-146",
  "technology": "spring-boot",
  "topic": "Kubernetes",
  "question": "How do Kubernetes probes and graceful shutdown work?",
  "shortAnswer": "Startup, readiness and liveness probes serve distinct lifecycle purposes.",
  "detailedAnswer": "Startup probes protect slow initialization from premature liveness checks. Readiness removes an unready pod from normal service routing; liveness failure can restart it. Configure graceful shutdown and termination grace periods to allow in-flight work to finish. Avoid remote dependency checks in liveness.\n\nExample (yaml; illustrative excerpt):\nreadinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\nlivenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080\n\nEnterprise scenario: A rolling update waits for new order pods to become ready.\n\nCommon mistake: Do not use the same dependency-heavy check for every probe.\n\nInterview follow-up: How do termination grace periods interact with application shutdown?",
  "detailedAnswerTelugu": "Startup probe application start అయ్యే వరకు సమయం ఇస్తుంది. Readiness fail అయితే pod కు సాధారణ traffic పంపరు. Liveness fail అయితే restart చేయవచ్చు. Graceful shutdown ద్వారా running requests పూర్తి చేయడానికి సమయం ఇవ్వాలి.\n\nExample (yaml):\nreadinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\nlivenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080",
  "difficulty": "expert",
  "codeExample": "readinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\nlivenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080",
  "codeLanguage": "yaml",
  "realTimeScenario": "A rolling update waits for new order pods to become ready.",
  "commonMistakes": [
    "Do not use the same dependency-heavy check for every probe."
  ],
  "followUpQuestions": [
    "How do termination grace periods interact with application shutdown?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-147",
  "technology": "spring-boot",
  "topic": "Jenkins",
  "question": "How do you design a reliable Jenkins CI/CD pipeline?",
  "shortAnswer": "Build once, test, scan, publish and promote an immutable artifact.",
  "detailedAnswer": "Use source-controlled pipeline definitions, isolated agents and credential bindings. Run unit and integration tests before publishing an image. Record commit and image digest, scan for vulnerabilities and promote the same digest through environments. Gate production deployment and verify health after rollout.\n\nExample (groovy; illustrative excerpt):\npipeline {\n  agent any\n  stages {\n    stage(\"Verify\") { steps { sh \"./mvnw verify\" } }\n    stage(\"Build image\") { steps { sh \"docker build -t order:${GIT_COMMIT} .\" } }\n  }\n}\n\nEnterprise scenario: A failed integration test prevents publishing an order-service release.\n\nCommon mistake: Do not expose secrets in shell logs or use mutable latest tags for promotion.\n\nInterview follow-up: How would you implement a rollback gate?",
  "detailedAnswerTelugu": "Jenkins pipeline లో build, tests, security scan, image publish, deployment stages ఉండాలి. ఒకసారి build చేసిన image digest నే environments మధ్య promote చేయాలి. Credentials ను source code లో పెట్టకుండా Jenkins credentials ద్వారా వాడాలి.\n\nExample (groovy):\npipeline {\n  agent any\n  stages {\n    stage(\"Verify\") { steps { sh \"./mvnw verify\" } }\n    stage(\"Build image\") { steps { sh \"docker build -t order:${GIT_COMMIT} .\" } }\n  }\n}",
  "difficulty": "advanced",
  "codeExample": "pipeline {\n  agent any\n  stages {\n    stage(\"Verify\") { steps { sh \"./mvnw verify\" } }\n    stage(\"Build image\") { steps { sh \"docker build -t order:${GIT_COMMIT} .\" } }\n  }\n}",
  "codeLanguage": "groovy",
  "realTimeScenario": "A failed integration test prevents publishing an order-service release.",
  "commonMistakes": [
    "Do not expose secrets in shell logs or use mutable latest tags for promotion."
  ],
  "followUpQuestions": [
    "How would you implement a rollback gate?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-148",
  "technology": "spring-boot",
  "topic": "Deployment strategies",
  "question": "How do blue-green and canary deployments differ?",
  "shortAnswer": "Blue-green switches between environments; canary gradually exposes a new version.",
  "detailedAnswer": "Blue-green keeps old and new versions available and switches traffic after verification. Canary routes a small percentage to the new release and expands based on metrics. Both require backward-compatible schema and event changes; rollback of application code does not automatically undo database writes.\n\nExample (yaml; illustrative excerpt):\n# Illustrative rollout policy\n# 5% -> 25% -> 100%\n# Gate each step on error rate and latency SLOs.\n# Abort and restore old traffic weights on regression.\n\nEnterprise scenario: Canary a payment-service change before exposing all customers.\n\nCommon mistake: Do not assume Kubernetes Deployment alone provides weighted traffic routing.\n\nInterview follow-up: How would you handle an irreversible schema migration?",
  "detailedAnswerTelugu": "Blue-green లో రెండు environments ఉంటాయి. కొత్త version verify చేసిన తర్వాత traffic switch చేస్తాం. Canary లో కొంత traffic మాత్రమే కొత్త version కు పంపి metrics బాగుంటే క్రమంగా పెంచుతాం. Database changes backward compatible గా ఉండాలి.\n\nExample (yaml):\n# Illustrative rollout policy\n# 5% -> 25% -> 100%\n# Gate each step on error rate and latency SLOs.\n# Abort and restore old traffic weights on regression.",
  "difficulty": "expert",
  "codeExample": "# Illustrative rollout policy\n# 5% -> 25% -> 100%\n# Gate each step on error rate and latency SLOs.\n# Abort and restore old traffic weights on regression.",
  "codeLanguage": "yaml",
  "realTimeScenario": "Canary a payment-service change before exposing all customers.",
  "commonMistakes": [
    "Do not assume Kubernetes Deployment alone provides weighted traffic routing."
  ],
  "followUpQuestions": [
    "How would you handle an irreversible schema migration?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-149",
  "technology": "spring-boot",
  "topic": "Incident response",
  "question": "How do you investigate a production incident systematically?",
  "shortAnswer": "Mitigate impact first, then establish evidence and root cause.",
  "detailedAnswer": "Establish incident severity, owner and timeline. Check recent changes, traffic, error rate, latency and saturation. Compare healthy and unhealthy instances; correlate traces, logs and metrics. Roll back or reduce load when safe. Preserve evidence and write a blameless postmortem with actionable prevention tasks.\n\nExample (bash; illustrative excerpt):\nkubectl rollout status deployment/order-service\nkubectl get pods\nkubectl logs deployment/order-service --since=15m\n\nEnterprise scenario: A deployment introduces connection-pool exhaustion; rollback restores service while investigation continues.\n\nCommon mistake: Do not restart everything before collecting evidence unless mitigation requires it.\n\nInterview follow-up: How do you verify recovery against customer-facing SLOs?",
  "detailedAnswerTelugu": "ముందుగా customer impact తగ్గించాలి. Recent deployments, error rate, latency, resource saturation చూడాలి. Logs, metrics, traces కలిపి hypothesis పరీక్షించాలి. Safe అయితే rollback చేయాలి. తర్వాత blameless postmortem ద్వారా prevention actions నిర్ణయించాలి.\n\nExample (bash):\nkubectl rollout status deployment/order-service\nkubectl get pods\nkubectl logs deployment/order-service --since=15m",
  "difficulty": "expert",
  "codeExample": "kubectl rollout status deployment/order-service\nkubectl get pods\nkubectl logs deployment/order-service --since=15m",
  "codeLanguage": "bash",
  "realTimeScenario": "A deployment introduces connection-pool exhaustion; rollback restores service while investigation continues.",
  "commonMistakes": [
    "Do not restart everything before collecting evidence unless mitigation requires it."
  ],
  "followUpQuestions": [
    "How do you verify recovery against customer-facing SLOs?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
},
{
  "id": "SPRING-BOOT-150",
  "technology": "spring-boot",
  "topic": "Enterprise architecture",
  "question": "How would you optimize an end-to-end Spring Boot microservices platform?",
  "shortAnswer": "Measure bottlenecks against service objectives and optimize the constrained resource.",
  "detailedAnswer": "Define latency, availability and throughput objectives. Use load tests with realistic traffic and traces to identify critical paths. Bound concurrency and timeouts, tune queries and pools based on measured capacity, use outbox and idempotency for reliable events, and scale only where evidence supports it. Validate changes with canaries and regression tests.\n\nExample (java; illustrative excerpt):\n// Example latency budget (illustrative):\n// Gateway 50 ms + Order 100 ms + Payment 250 ms\n// + remaining overhead 100 ms = 500 ms target.\n// Measure end-to-end percentiles; do not add p95s as an exact p95.\n\nEnterprise scenario: Optimize order checkout by fixing a slow query before adding more pods.\n\nCommon mistake: Do not optimize every component without measuring the critical path.\n\nInterview follow-up: How would you design a load test that exposes retry amplification?",
  "detailedAnswerTelugu": "ముందుగా latency, availability, throughput targets నిర్ణయించాలి. Realistic load tests మరియు traces ద్వారా bottleneck గుర్తించాలి. Database queries, connection pools, timeouts, concurrency ను measurements ఆధారంగా tune చేయాలి. Events కోసం outbox, idempotency వాడాలి. Canary ద్వారా మార్పులను verify చేయాలి.\n\nExample (java):\n// Example latency budget (illustrative):\n// Gateway 50 ms + Order 100 ms + Payment 250 ms\n// + remaining overhead 100 ms = 500 ms target.\n// Measure end-to-end percentiles; do not add p95s as an exact p95.",
  "difficulty": "expert",
  "codeExample": "// Example latency budget (illustrative):\n// Gateway 50 ms + Order 100 ms + Payment 250 ms\n// + remaining overhead 100 ms = 500 ms target.\n// Measure end-to-end percentiles; do not add p95s as an exact p95.",
  "codeLanguage": "java",
  "realTimeScenario": "Optimize order checkout by fixing a slow query before adding more pods.",
  "commonMistakes": [
    "Do not optimize every component without measuring the critical path."
  ],
  "followUpQuestions": [
    "How would you design a load test that exposes retry amplification?"
  ],
  "interviewTips": [
    "Explain the operational trade-offs and how you would verify the result."
  ],
  "isPublished": true
}
];
