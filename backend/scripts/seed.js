const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Author = require('../models/Author');
const Post = require('../models/Post');
const { calculateReadingTime } = require('../utils/helpers');

dotenv.config({ path: __dirname + '/../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/softrate_tech_blog';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await Author.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing database records.');

    // 1. Seed Admin User
    const adminUser = await User.create({
      username: 'ChiefEditor',
      email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@techblog.com',
      password: process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123456',
      role: 'admin'
    });
    console.log(`✅ Admin user created: ${adminUser.email} / (Password: ${process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123456'})`);

    // 2. Seed Initial 7 Required Categories
    const categoriesToSeed = [
      {
        name: 'Software Development',
        slug: 'software-development',
        description: 'Best practices, software engineering paradigms, architecture patterns, and coding mastery.'
      },
      {
        name: 'Artificial Intelligence & Machine Learning',
        slug: 'artificial-intelligence-machine-learning',
        description: 'Explore neural networks, LLMs, generative AI workflows, agentic architectures, and modern MLOps.'
      },
      {
        name: 'Web and Mobile App Development',
        slug: 'web-and-mobile-app-development',
        description: 'Modern front-end frameworks, responsive UI/UX, cross-platform apps, and full-stack ecosystems.'
      },
      {
        name: 'Technology & Innovation',
        slug: 'technology-innovation',
        description: 'Emerging tech trends, deep-tech frontiers, enterprise transformation, and forward-looking research.'
      },
      {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Zero trust security, vulnerability assessments, compliance frameworks, and cloud-native protection.'
      },
      {
        name: 'Cloud Computing',
        slug: 'cloud-computing',
        description: 'Serverless architectures, Kubernetes, containerization, multi-cloud strategy, and cost optimization.'
      },
      {
        name: 'Industry Insights',
        slug: 'industry-insights',
        description: 'Strategic analysis, tech leadership commentary, productivity reports, and SaaS operational excellence.'
      }
    ];

    const createdCategories = await Category.insertMany(categoriesToSeed);
    console.log(`✅ Seeded ${createdCategories.length} Categories.`);

    // 3. Seed Tags
    const tagsToSeed = [
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'React', slug: 'react' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Generative AI', slug: 'generative-ai' },
      { name: 'Microservices', slug: 'microservices' },
      { name: 'DevOps', slug: 'devops' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Zero Trust', slug: 'zero-trust' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'System Architecture', slug: 'system-architecture' }
    ];

    const createdTags = await Tag.insertMany(tagsToSeed);
    console.log(`✅ Seeded ${createdTags.length} Tags.`);

    // 4. Seed Authors
    const authorsToSeed = [
      {
        name: 'Elena Rostova',
        bio: 'Principal Cloud Architect and Tech Evangelist with over 14 years building fault-tolerant distributed SaaS platforms.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        socialLinks: {
          twitter: 'https://twitter.com/elenarostova',
          linkedin: 'https://linkedin.com/in/elenarostova',
          github: 'https://github.com/elenarostova',
          website: 'https://elenarostova.dev'
        }
      },
      {
        name: 'David Chen',
        bio: 'Lead AI Researcher specializing in Agentic Workflows, Transformer architectures, and Enterprise Automation.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        socialLinks: {
          twitter: 'https://twitter.com/davidchen_ai',
          linkedin: 'https://linkedin.com/in/davidchen',
          github: 'https://github.com/davidchen'
        }
      },
      {
        name: 'Aisha Patel',
        bio: 'VP of Cybersecurity Operations, DevSecOps enthusiast, and international keynote speaker on Zero-Trust Architecture.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        socialLinks: {
          twitter: 'https://twitter.com/aishapatel_sec',
          linkedin: 'https://linkedin.com/in/aishapatel'
        }
      }
    ];

    const createdAuthors = await Author.insertMany(authorsToSeed);
    console.log(`✅ Seeded ${createdAuthors.length} Authors.`);

    // 5. Seed Comprehensive Blog Posts
    const getCat = (slug) => createdCategories.find((c) => c.slug === slug)._id;
    const getTag = (slug) => createdTags.find((t) => t.slug === slug)._id;

    const postsToSeed = [
      {
        title: 'Building Resilient Microservices with Event-Driven Architecture: A Practical Guide',
        slug: 'building-resilient-microservices-event-driven-architecture',
        summary: 'Explore how asynchronous event streams, idempotency, and message brokers prevent cascading failures in modern enterprise SaaS.',
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[0]._id,
        categories: [getCat('software-development'), getCat('cloud-computing')],
        tags: [getTag('microservices'), getTag('system-architecture'), getTag('nodejs')],
        status: 'published',
        isFeatured: true,
        viewsCount: 1420,
        publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        seoTitle: 'Resilient Microservices with Event-Driven Architecture | Tech Blog',
        metaDescription: 'A practical, in-depth guide on designing fault-tolerant microservices using Apache Kafka, RabbitMQ, and transactional outbox patterns.',
        content: `
<h2>The Shift Beyond Synchronous REST Call Chains</h2>
<p>As modern cloud applications scale to millions of concurrent users, tightly coupled HTTP synchronous chains become liabilities. A single downstream service degradation can trigger thread pool exhaustion, cascade timeouts across upstream gateways, and bring down mission-critical workflows.</p>

<p>Event-driven architecture (EDA) decouples producers from consumers using durable message brokers. Rather than invoking services directly, services publish state mutations as immutable domain events.</p>

<h3>Core Architectural Pillars of Resilient Event Streams</h3>
<p>To implement a robust system, you must design for resilience at every level:</p>
<ul>
  <li><strong>The Transactional Outbox Pattern:</strong> Guarantees dual writes between the database and the message broker without two-phase commit overhead.</li>
  <li><strong>Idempotent Consumers:</strong> Ensures duplicate message deliveries do not corrupt state or trigger duplicate billing actions.</li>
  <li><strong>Dead Letter Queues (DLQ) with Exponential Backoff:</strong> Isolates poison pills while preserving throughput on standard topics.</li>
</ul>

<blockquote>"In distributed computing, assuming network certainty is the fastest route to systemic failure. Designing for partial failure is not optional; it is fundamental."</blockquote>

<h3>Sample Idempotent Event Consumer in Node.js</h3>
<p>Here is an example of an idempotent message processing wrapper using Redis-backed deduplication:</p>

<pre><code>async function processOrderEvent(event) {
  const { eventId, orderId, payload } = event;
  
  // Check if event was already processed within TTL window
  const alreadyHandled = await redisClient.set(
    \`event:processed:\${eventId}\`,
    '1',
    'EX',
    86400, // 24-hour retention
    'NX'
  );

  if (!alreadyHandled) {
    logger.warn(\`Duplicate event detected: \${eventId}. Skipping execution.\`);
    return;
  }

  // Execute business logic transactionally
  await db.transaction(async (trx) => {
    await updateInventory(payload.items, trx);
    await markOrderConfirmed(orderId, trx);
  });
}</code></pre>

<h3>Architectural Trade-offs Comparison</h3>
<table border="1" cellpadding="8" style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th>Pattern</th>
      <th>Consistency Model</th>
      <th>Latency</th>
      <th>Operational Complexity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Synchronous REST/gRPC</td>
      <td>Immediate</td>
      <td>Low (Single hop) / High (Chained)</td>
      <td>Low</td>
    </tr>
    <tr>
      <td>Asynchronous Event Broker</td>
      <td>Eventual</td>
      <td>Sub-second (Broker dependent)</td>
      <td>Moderate</td>
    </tr>
    <tr>
      <td>Transactional Outbox</td>
      <td>At-least-once</td>
      <td>Near Real-Time</td>
      <td>Moderate to High</td>
    </tr>
  </tbody>
</table>

<h3>Summary and Next Steps</h3>
<p>By shifting to event-driven paradigms, enterprise applications achieve linear horizontal scalability, zero-downtime maintenance windows, and complete failure isolation across services.</p>
`
      },
      {
        title: 'Autonomous AI Agents: Transforming Enterprise Software Automation in 2025 and Beyond',
        slug: 'autonomous-ai-agents-enterprise-automation',
        summary: 'How multi-agent cognitive architectures and tool-augmented LLMs are replacing static workflows with dynamic reasoning engines.',
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[1]._id,
        categories: [getCat('artificial-intelligence-machine-learning'), getCat('technology-innovation')],
        tags: [getTag('generative-ai'), getTag('nodejs')],
        status: 'published',
        isFeatured: true,
        viewsCount: 2380,
        publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        seoTitle: 'Autonomous AI Agents in Enterprise Automation | Tech Blog',
        metaDescription: 'Discover how multi-agent reasoning, self-reflection loops, and structured function calling drive the next evolution of intelligent enterprise software.',
        content: `
<h2>The Evolution from Chatbots to Autonomous Cognitive Systems</h2>
<p>Language models have rapidly transitioned from passive text generators into proactive, goal-directed autonomous agents. Instead of answering static prompts, modern agents reason through ambiguous goals, decompose tasks into logical sub-steps, invoke external APIs, and iteratively refine outputs until completion criteria are met.</p>

<h3>The Anatomy of an Enterprise AI Agent</h3>
<p>An autonomous agent comprises four primary cognitive components:</p>
<ol>
  <li><strong>Perception & Context Engine:</strong> Evaluates user objectives and contextual state from vector databases and real-time enterprise APIs.</li>
  <li><strong>Planning & Reasoning Framework:</strong> Utilizes techniques like ReAct (Reason + Act), Tree of Thoughts, and Plan-and-Solve to structure complex sequences.</li>
  <li><strong>Tool Execution Sandbox:</strong> Securely executes code, queries SQL databases, or interacts with ERP/CRM systems via standardized schemas.</li>
  <li><strong>Self-Reflection & Memory:</strong> Evaluates past failures, logs execution traces, and maintains conversational long-term memory.</li>
</ol>

<blockquote>"An agent is not merely an LLM with access to search; it is an iterative state machine with reasoning as its transition function."</blockquote>

<h3>Multi-Agent Swarm Collaboration Pattern</h3>
<p>In enterprise settings, assigning a single agent to handle all facets of a task introduces hallucination risks. Specialized agent swarms divide responsibilities:</p>

<pre><code>// Conceptual Orchestrator Topology
const swarm = new AgentSwarm({
  planner: new ReasoningAgent({ role: 'Architect & Task Decomposer' }),
  coder: new ExecutionAgent({ role: 'Code Generator & Test Author' }),
  auditor: new VerificationAgent({ role: 'Static Analysis & Security Auditor' })
});

const outcome = await swarm.executeTask({
  objective: 'Migrate legacy user authentication endpoint to OpenID Connect'
});</code></pre>

<h3>Enterprise Deployment Guardrails</h3>
<p>Safe production deployment requires strict deterministic boundaries: sandboxed container execution, rate limits, deterministic schema validation (e.g. Zod or JSON Schema), and mandatory human-in-the-loop approvals for sensitive state-altering mutations.</p>
`
      },
      {
        title: 'Zero Trust Security Architecture: Defending Modern Cloud-Native Perimeterless Environments',
        slug: 'zero-trust-security-cloud-native-environments',
        summary: 'Never trust, always verify: implementing continuous authentication, micro-segmentation, and ephemeral credentials in Kubernetes.',
        featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[2]._id,
        categories: [getCat('cybersecurity'), getCat('cloud-computing')],
        tags: [getTag('zero-trust'), getTag('kubernetes'), getTag('devops')],
        status: 'published',
        isFeatured: true,
        viewsCount: 1890,
        publishedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        seoTitle: 'Zero Trust Security for Cloud-Native Platforms | Tech Blog',
        metaDescription: 'A comprehensive deep dive into Zero Trust architecture: identity-centric perimeters, mTLS, SPIFFE/SPIRE, and ephemeral secrets.',
        content: `
<h2>The Dissolution of the Traditional Network Perimeter</h2>
<p>For decades, enterprise security relied on castle-and-moat models: perimeter firewalls defended an assumed-safe internal network. With distributed remote teams, hybrid cloud deployments, and multi-tenant container orchestration, that perimeter no longer exists.</p>

<p>The core tenet of Zero Trust is straightforward yet uncompromising: <strong>Never Trust, Always Verify</strong>. Every request, whether originating inside or outside the network boundary, must be authenticated, authorized, and encrypted before granting access.</p>

<h3>The Three Core Pillars of Zero Trust</h3>
<ul>
  <li><strong>Explicit Verification:</strong> Authenticate and authorize based on all available data points (identity, location, device health, service telemetry).</li>
  <li><strong>Least Privilege Access:</strong> Limit user and service access with Just-In-Time (JIT) and Just-Enough-Access (JEA) models, risk-based adaptive policies, and data protection.</li>
  <li><strong>Assume Breach:</strong> Minimize blast radius through strict network micro-segmentation, end-to-end encryption, and continuous automated anomaly detection.</li>
</ul>

<h3>Mutual TLS (mTLS) in Service Meshes</h3>
<p>Within Kubernetes clusters, service-to-service communication must be verified using cryptographically sound identities such as SPIFFE/SPIRE with automated x509 certificate rotations via tools like Istio or Linkerd.</p>

<pre><code># Example Istio Strict PeerAuthentication Policy
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT # Disallows any plaintext HTTP connection inside namespace</code></pre>

<h3>Conclusion</h3>
<p>Zero Trust is not a single product or binary switch; it is an organizational mindset and architectural philosophy that transforms cybersecurity from a reactive bottleneck into an enabler of agile enterprise speed.</p>
`
      },
      {
        title: 'Mastering Full-Stack React & Node.js Performance: From Bundle Budgets to Database Indexing',
        slug: 'mastering-full-stack-react-nodejs-performance',
        summary: 'Actionable optimization strategies for high-traffic MERN applications: code splitting, memoization, connection pooling, and compound indexes.',
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[0]._id,
        categories: [getCat('web-and-mobile-app-development'), getCat('software-development')],
        tags: [getTag('react'), getTag('nodejs'), getTag('mongodb'), getTag('typescript')],
        status: 'published',
        isFeatured: false,
        viewsCount: 3100,
        publishedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        seoTitle: 'Full-Stack React & Node.js Performance Optimization Guide',
        metaDescription: 'Practical guide to accelerating MERN stack apps: Vite bundle optimization, React Server Components concepts, MongoDB query profiling, and Redis caching.',
        content: `
<h2>Why Milliseconds Dictate Customer Retention in Enterprise SaaS</h2>
<p>Research across top SaaS platforms consistently demonstrates that a 100-millisecond delay in page response directly degrades conversion and engagement metrics. In full-stack web applications, latency accumulates across the entire lifecycle: client-side bundle hydration, API gateway routing, server thread queuing, and unindexed database queries.</p>

<h3>Frontend Optimization: Vite, Dynamic Imports & Virtualization</h3>
<p>Keep your initial JavaScript bundle under 150KB gzip by adopting lazy loading and dynamic code splitting:</p>

<pre><code>// Lazy loading heavy components with Suspense
import { lazy, Suspense } from 'react';

const HeavyRichTextEditor = lazy(() => import('./RichTextEditor'));
const AnalyticsChart = lazy(() => import('./AnalyticsChart'));

export default function ArticleManager() {
  return (
    &lt;Suspense fallback={&lt;div className="p-8 text-center"&gt;Loading Editor...&lt;/div&gt;}&gt;
      &lt;HeavyRichTextEditor /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>

<h3>Backend Database Performance: Compound Indexing in MongoDB</h3>
<p>When querying millions of articles by category and sorting by publication date, omitting an index forces an in-memory collection scan that destroys database throughput. Always create compound indexes matching your query patterns:</p>

<pre><code>// Compound index to support category filtering + date sorting in one B-Tree scan
PostSchema.index({ categories: 1, status: 1, publishedDate: -1 });</code></pre>

<p>Use MongoDB's <code>.explain("executionStats")</code> to verify that queries result in an <code>IXSCAN</code> rather than a <code>COLLSCAN</code>.</p>
`
      },
      {
        title: 'Kubernetes in Production: Essential Day-2 Operations and Disaster Recovery Strategies',
        slug: 'kubernetes-in-production-day-2-operations',
        summary: 'A playbook for platform engineers: proactive observability, cluster autoscaling, GitOps deployments with ArgoCD, and backup drills.',
        featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[0]._id,
        categories: [getCat('cloud-computing')],
        tags: [getTag('kubernetes'), getTag('devops')],
        status: 'published',
        isFeatured: false,
        viewsCount: 950,
        publishedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        seoTitle: 'Kubernetes Production Operations & Disaster Recovery Guide',
        metaDescription: 'Platform engineering practices for reliable Day-2 Kubernetes operations: resource quotas, PDBs, cluster autoscaling, and backup automation.',
        content: `
<h2>Beyond the Hello World Deployment</h2>
<p>Deploying a stateless container onto Kubernetes during development is simple. Operating high-availability mission-critical stateful workloads under variable production traffic requires disciplined Day-2 operational excellence.</p>

<h3>Key Checklist for Production-Ready Pods</h3>
<ul>
  <li><strong>Explicit Resource Requests and Limits:</strong> Prevent noisy neighbors from exhausting node memory and causing kernel OOM kills.</li>
  <li><strong>PodDisruptionBudgets (PDB):</strong> Guarantee minimum available replicas during voluntary node drains and cluster upgrades.</li>
  <li><strong>Liveness and Readiness Probes:</strong> Differentiate between an app that is booting up versus an app that has deadlocked.</li>
</ul>

<pre><code>livenessProbe:
  httpGet:
    path: /api/health
    port: 5000
  initialDelaySeconds: 15
  periodSeconds: 20
readinessProbe:
  httpGet:
    path: /api/health
    port: 5000
  initialDelaySeconds: 5
  periodSeconds: 10</code></pre>
`
      },
      {
        title: 'The Future of SaaS: Modular Monoliths vs. Distributed Microservices',
        slug: 'future-of-saas-modular-monoliths-vs-microservices',
        summary: 'Why leading engineering organizations are reconsidering premature microservice distribution in favor of strongly-bounded modular monoliths.',
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[1]._id,
        categories: [getCat('industry-insights'), getCat('software-development')],
        tags: [getTag('system-architecture'), getTag('microservices')],
        status: 'published',
        isFeatured: false,
        viewsCount: 1640,
        publishedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        seoTitle: 'Modular Monoliths vs. Microservices: The SaaS Engineering Debate',
        metaDescription: 'A pragmatic evaluation of software architecture: when to decouple into microservices and when a modular monolith provides superior velocity.',
        content: `
<h2>The Microservices Hype Cycle Rebalancing</h2>
<p>Over the past decade, teams embraced microservices aiming for independent deployments and autonomous squads. However, for organizations with under 100 engineers, the operational tax of distributed systems—network latencies, tracing complexities, distributed transactions, and deployment synchronization—often outweighed benefits.</p>

<h3>The Rise of the Well-Bounded Modular Monolith</h3>
<p>A modular monolith enforces strict architectural boundaries inside a single deployable artifact. Modules interact through defined public interfaces rather than direct internal database queries, offering the organizational isolation of microservices with the simplicity of single-binary deployments.</p>

<p>When boundaries are preserved, extracting a heavily loaded module into a standalone service later becomes straightforward, rather than a painful refactoring exercise.</p>
`
      },
      {
        title: 'Building Modern Developer Portals and Internal Developer Platforms (IDP)',
        slug: 'building-modern-developer-portals-internal-developer-platforms',
        summary: 'How platform engineering teams use Backstage and self-service automation to eliminate developer cognitive overload and streamline onboarding.',
        featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        author: createdAuthors[0]._id,
        categories: [getCat('technology-innovation'), getCat('industry-insights')],
        tags: [getTag('devops'), getTag('system-architecture')],
        status: 'published',
        isFeatured: false,
        viewsCount: 820,
        publishedDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        seoTitle: 'Building Internal Developer Platforms (IDP) | Tech Insights',
        metaDescription: 'Learn how self-service developer portals reduce time-to-first-commit and enable developers to provision cloud resources securely.',
        content: `
<h2>Tackling Cognitive Overload in Modern Engineering</h2>
<p>Modern software engineers are expected to master front-end frameworks, backend runtimes, CI/CD pipelines, Docker, Kubernetes manifests, terraform modules, and monitoring dashboards. This cognitive burden frequently leads to burnout and sluggish release velocity.</p>

<p>An Internal Developer Platform provides "Golden Paths"—pre-approved, automated, self-service templates that enable developers to provision a new microservice with monitoring, CI/CD, and infrastructure in under five minutes.</p>
`
      }
    ];

    for (const postData of postsToSeed) {
      postData.readingTime = calculateReadingTime(postData.content);
      await Post.create(postData);
    }

    console.log(`✅ Seeded ${postsToSeed.length} comprehensive articles.`);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
