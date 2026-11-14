// Complete offline & cloud-ready data store for Softrate Tech Blog
// Ensures 100% full working functionality on Vercel even when standalone backend is not connected.

export const initialCategories = [
  {
    _id: 'cat-1',
    name: 'Software Development',
    slug: 'software-development',
    description: 'Best practices, software engineering paradigms, architecture patterns, and coding mastery.',
    postCount: 3
  },
  {
    _id: 'cat-2',
    name: 'Artificial Intelligence & Machine Learning',
    slug: 'artificial-intelligence-machine-learning',
    description: 'Explore neural networks, LLMs, generative AI workflows, agentic architectures, and modern MLOps.',
    postCount: 1
  },
  {
    _id: 'cat-3',
    name: 'Web and Mobile App Development',
    slug: 'web-and-mobile-app-development',
    description: 'Modern front-end frameworks, responsive UI/UX, cross-platform apps, and full-stack ecosystems.',
    postCount: 1
  },
  {
    _id: 'cat-4',
    name: 'Technology & Innovation',
    slug: 'technology-innovation',
    description: 'Emerging tech trends, deep-tech frontiers, enterprise transformation, and forward-looking research.',
    postCount: 2
  },
  {
    _id: 'cat-5',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Zero trust security, vulnerability assessments, compliance frameworks, and cloud-native protection.',
    postCount: 1
  },
  {
    _id: 'cat-6',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Serverless architectures, Kubernetes, containerization, multi-cloud strategy, and cost optimization.',
    postCount: 3
  },
  {
    _id: 'cat-7',
    name: 'Industry Insights',
    slug: 'industry-insights',
    description: 'Strategic analysis, tech leadership commentary, productivity reports, and SaaS operational excellence.',
    postCount: 2
  }
];

export const initialTags = [
  { _id: 'tag-1', name: 'Node.js', slug: 'nodejs' },
  { _id: 'tag-2', name: 'React', slug: 'react' },
  { _id: 'tag-3', name: 'MongoDB', slug: 'mongodb' },
  { _id: 'tag-4', name: 'Generative AI', slug: 'generative-ai' },
  { _id: 'tag-5', name: 'Microservices', slug: 'microservices' },
  { _id: 'tag-6', name: 'DevOps', slug: 'devops' },
  { _id: 'tag-7', name: 'Kubernetes', slug: 'kubernetes' },
  { _id: 'tag-8', name: 'Zero Trust', slug: 'zero-trust' },
  { _id: 'tag-9', name: 'TypeScript', slug: 'typescript' },
  { _id: 'tag-10', name: 'System Architecture', slug: 'system-architecture' }
];

export const initialAuthors = [
  {
    _id: 'auth-1',
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
    _id: 'auth-2',
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
    _id: 'auth-3',
    name: 'Aisha Patel',
    bio: 'VP of Cybersecurity Operations, DevSecOps enthusiast, and international keynote speaker on Zero-Trust Architecture.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      twitter: 'https://twitter.com/aishapatel_sec',
      linkedin: 'https://linkedin.com/in/aishapatel'
    }
  }
];

export const initialPosts = [
  {
    _id: 'post-1',
    title: 'Building Resilient Microservices with Event-Driven Architecture: A Practical Guide',
    slug: 'building-resilient-microservices-event-driven-architecture',
    summary: 'Explore how asynchronous event streams, idempotency, and message brokers prevent cascading failures in modern enterprise SaaS.',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[0],
    categories: [initialCategories[0], initialCategories[5]],
    tags: [initialTags[4], initialTags[9], initialTags[0]],
    status: 'published',
    isFeatured: true,
    viewsCount: 1420,
    readingTime: '6 min read',
    publishedDate: '2026-11-12T10:00:00.000Z',
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
    _id: 'post-2',
    title: 'Autonomous AI Agents: Transforming Enterprise Software Automation in 2025 and Beyond',
    slug: 'autonomous-ai-agents-enterprise-automation',
    summary: 'How multi-agent cognitive architectures and tool-augmented LLMs are replacing static workflows with dynamic reasoning engines.',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[1],
    categories: [initialCategories[1], initialCategories[3]],
    tags: [initialTags[3], initialTags[0]],
    status: 'published',
    isFeatured: true,
    viewsCount: 2380,
    readingTime: '7 min read',
    publishedDate: '2026-11-10T14:30:00.000Z',
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
    _id: 'post-3',
    title: 'Zero Trust Security Architecture: Defending Modern Cloud-Native Perimeterless Environments',
    slug: 'zero-trust-security-cloud-native-environments',
    summary: 'Never trust, always verify: implementing continuous authentication, micro-segmentation, and ephemeral credentials in Kubernetes.',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[2],
    categories: [initialCategories[4], initialCategories[5]],
    tags: [initialTags[7], initialTags[6], initialTags[5]],
    status: 'published',
    isFeatured: true,
    viewsCount: 1890,
    readingTime: '5 min read',
    publishedDate: '2026-11-08T09:15:00.000Z',
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
    _id: 'post-4',
    title: 'Mastering Full-Stack React & Node.js Performance: From Bundle Budgets to Database Indexing',
    slug: 'mastering-full-stack-react-nodejs-performance',
    summary: 'Actionable optimization strategies for high-traffic MERN applications: code splitting, memoization, connection pooling, and compound indexes.',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[0],
    categories: [initialCategories[2], initialCategories[0]],
    tags: [initialTags[1], initialTags[0], initialTags[2], initialTags[8]],
    status: 'published',
    isFeatured: true,
    viewsCount: 3100,
    readingTime: '8 min read',
    publishedDate: '2026-11-06T11:45:00.000Z',
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
    _id: 'post-5',
    title: 'Kubernetes in Production: Essential Day-2 Operations and Disaster Recovery Strategies',
    slug: 'kubernetes-in-production-day-2-operations',
    summary: 'A playbook for platform engineers: proactive observability, cluster autoscaling, GitOps deployments with ArgoCD, and backup drills.',
    featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[0],
    categories: [initialCategories[5]],
    tags: [initialTags[6], initialTags[5]],
    status: 'published',
    isFeatured: false,
    viewsCount: 950,
    readingTime: '5 min read',
    publishedDate: '2026-11-03T16:20:00.000Z',
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
    _id: 'post-6',
    title: 'The Future of SaaS: Modular Monoliths vs. Distributed Microservices',
    slug: 'future-of-saas-modular-monoliths-vs-microservices',
    summary: 'Why leading engineering organizations are reconsidering premature microservice distribution in favor of strongly-bounded modular monoliths.',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[1],
    categories: [initialCategories[6], initialCategories[0]],
    tags: [initialTags[9], initialTags[4]],
    status: 'published',
    isFeatured: false,
    viewsCount: 1640,
    readingTime: '6 min read',
    publishedDate: '2026-10-31T08:00:00.000Z',
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
    _id: 'post-7',
    title: 'Building Modern Developer Portals and Internal Developer Platforms (IDP)',
    slug: 'building-modern-developer-portals-internal-developer-platforms',
    summary: 'How platform engineering teams use Backstage and self-service automation to eliminate developer cognitive overload and streamline onboarding.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    author: initialAuthors[0],
    categories: [initialCategories[3], initialCategories[6]],
    tags: [initialTags[5], initialTags[9]],
    status: 'published',
    isFeatured: false,
    viewsCount: 820,
    readingTime: '5 min read',
    publishedDate: '2026-10-27T13:10:00.000Z',
    seoTitle: 'Building Internal Developer Platforms (IDP) | Tech Insights',
    metaDescription: 'Learn how self-service developer portals reduce time-to-first-commit and enable developers to provision cloud resources securely.',
    content: `
<h2>Tackling Cognitive Overload in Modern Engineering</h2>
<p>Modern software engineers are expected to master front-end frameworks, backend runtimes, CI/CD pipelines, Docker, Kubernetes manifests, terraform modules, and monitoring dashboards. This cognitive burden frequently leads to burnout and sluggish release velocity.</p>

<p>An Internal Developer Platform provides "Golden Paths"—pre-approved, automated, self-service templates that enable developers to provision a new microservice with monitoring, CI/CD, and infrastructure in under five minutes.</p>
`
  }
];

// LocalStorage helpers to persist changes made in CMS Admin
const STORAGE_KEYS = {
  POSTS: 'softrate_posts',
  CATEGORIES: 'softrate_categories',
  TAGS: 'softrate_tags',
  AUTHORS: 'softrate_authors',
  USER: 'tech_blog_user',
  TOKEN: 'tech_blog_token'
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
};

export const mockDataStore = {
  getPosts: (params = {}) => {
    let posts = getStored(STORAGE_KEYS.POSTS, initialPosts);

    // Filter by featured
    if (params.featured === 'true' || params.isFeatured === true) {
      posts = posts.filter(p => p.isFeatured);
    }

    // Filter by status (e.g. published, draft, scheduled)
    if (params.status && params.status !== 'all') {
      posts = posts.filter(p => p.status === params.status);
    }

    // Filter by category slug
    if (params.category) {
      posts = posts.filter(p =>
        p.categories?.some(c => (typeof c === 'string' ? c === params.category : c.slug === params.category))
      );
    }

    // Filter by tag slug
    if (params.tag) {
      posts = posts.filter(p =>
        p.tags?.some(t => (typeof t === 'string' ? t === params.tag : t.slug === params.tag))
      );
    }

    // Keyword search
    if (params.search || params.q) {
      const q = (params.search || params.q).toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.content && p.content.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (params.sort) {
      if (params.sort === '-viewsCount') {
        posts = [...posts].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
      } else if (params.sort === '-publishedDate') {
        posts = [...posts].sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0));
      }
    }

    const total = posts.length;
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || (params.featured ? 4 : 6);
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = posts.slice(start, start + limit);

    return {
      success: true,
      count: paginated.length,
      total,
      page,
      totalPages,
      data: paginated
    };
  },

  getPostBySlug: (slug) => {
    const posts = getStored(STORAGE_KEYS.POSTS, initialPosts);
    const postIndex = posts.findIndex(p => p.slug === slug);

    if (postIndex === -1) {
      return { success: false, message: 'Article not found' };
    }

    const post = posts[postIndex];
    post.viewsCount = (post.viewsCount || 0) + 1;
    posts[postIndex] = post;
    setStored(STORAGE_KEYS.POSTS, posts);

    const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
    const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
    const relatedPosts = posts.filter(p => p.slug !== slug).slice(0, 3);

    return {
      success: true,
      data: post,
      navigation: { previous: prevPost, next: nextPost },
      prevPost,
      nextPost,
      relatedPosts
    };
  },

  searchPosts: (q, limit = 8) => {
    return mockDataStore.getPosts({ search: q, limit });
  },

  getDashboardStats: () => {
    const posts = getStored(STORAGE_KEYS.POSTS, initialPosts);
    const totalViews = posts.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
    return {
      success: true,
      data: {
        totalPosts: posts.length,
        publishedCount: posts.filter(p => p.status === 'published').length,
        draftCount: posts.filter(p => p.status === 'draft').length,
        scheduledCount: posts.filter(p => p.status === 'scheduled').length,
        totalViews,
        recentPosts: posts.slice(0, 5)
      }
    };
  },

  createPost: (data) => {
    const posts = getStored(STORAGE_KEYS.POSTS, initialPosts);
    const newPost = {
      _id: 'post-' + Date.now(),
      ...data,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      viewsCount: 0,
      publishedDate: data.publishedDate || new Date().toISOString(),
      readingTime: data.readingTime || '5 min read'
    };
    posts.unshift(newPost);
    setStored(STORAGE_KEYS.POSTS, posts);
    return { success: true, data: newPost };
  },

  updatePost: (id, data) => {
    let posts = getStored(STORAGE_KEYS.POSTS, initialPosts);
    posts = posts.map(p => (p._id === id ? { ...p, ...data } : p));
    setStored(STORAGE_KEYS.POSTS, posts);
    const updated = posts.find(p => p._id === id);
    return { success: true, data: updated };
  },

  deletePost: (id) => {
    let posts = getStored(STORAGE_KEYS.POSTS, initialPosts);
    posts = posts.filter(p => p._id !== id);
    setStored(STORAGE_KEYS.POSTS, posts);
    return { success: true, message: 'Article deleted' };
  },

  // Categories
  getCategories: () => {
    const cats = getStored(STORAGE_KEYS.CATEGORIES, initialCategories);
    return { success: true, count: cats.length, data: cats };
  },

  getCategoryBySlug: (slug) => {
    const cats = getStored(STORAGE_KEYS.CATEGORIES, initialCategories);
    const cat = cats.find(c => c.slug === slug);
    return cat ? { success: true, data: cat } : { success: false, message: 'Category not found' };
  },

  createCategory: (data) => {
    const cats = getStored(STORAGE_KEYS.CATEGORIES, initialCategories);
    const newCat = {
      _id: 'cat-' + Date.now(),
      ...data,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      postCount: 0
    };
    cats.push(newCat);
    setStored(STORAGE_KEYS.CATEGORIES, cats);
    return { success: true, data: newCat };
  },

  updateCategory: (id, data) => {
    let cats = getStored(STORAGE_KEYS.CATEGORIES, initialCategories);
    cats = cats.map(c => (c._id === id ? { ...c, ...data } : c));
    setStored(STORAGE_KEYS.CATEGORIES, cats);
    return { success: true, data: cats.find(c => c._id === id) };
  },

  deleteCategory: (id) => {
    let cats = getStored(STORAGE_KEYS.CATEGORIES, initialCategories);
    cats = cats.filter(c => c._id !== id);
    setStored(STORAGE_KEYS.CATEGORIES, cats);
    return { success: true, message: 'Category deleted' };
  },

  // Tags
  getTags: () => {
    const tags = getStored(STORAGE_KEYS.TAGS, initialTags);
    return { success: true, count: tags.length, data: tags };
  },

  getTagBySlug: (slug) => {
    const tags = getStored(STORAGE_KEYS.TAGS, initialTags);
    const tag = tags.find(t => t.slug === slug);
    return tag ? { success: true, data: tag } : { success: false, message: 'Tag not found' };
  },

  createTag: (data) => {
    const tags = getStored(STORAGE_KEYS.TAGS, initialTags);
    const newTag = {
      _id: 'tag-' + Date.now(),
      ...data,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    tags.push(newTag);
    setStored(STORAGE_KEYS.TAGS, tags);
    return { success: true, data: newTag };
  },

  updateTag: (id, data) => {
    let tags = getStored(STORAGE_KEYS.TAGS, initialTags);
    tags = tags.map(t => (t._id === id ? { ...t, ...data } : t));
    setStored(STORAGE_KEYS.TAGS, tags);
    return { success: true, data: tags.find(t => t._id === id) };
  },

  deleteTag: (id) => {
    let tags = getStored(STORAGE_KEYS.TAGS, initialTags);
    tags = tags.filter(t => t._id !== id);
    setStored(STORAGE_KEYS.TAGS, tags);
    return { success: true, message: 'Tag deleted' };
  },

  // Authors
  getAuthors: () => {
    const authors = getStored(STORAGE_KEYS.AUTHORS, initialAuthors);
    return { success: true, count: authors.length, data: authors };
  },

  getAuthorById: (id) => {
    const authors = getStored(STORAGE_KEYS.AUTHORS, initialAuthors);
    const a = authors.find(auth => auth._id === id);
    return a ? { success: true, data: a } : { success: false, message: 'Author not found' };
  },

  createAuthor: (data) => {
    const authors = getStored(STORAGE_KEYS.AUTHORS, initialAuthors);
    const newAuthor = { _id: 'auth-' + Date.now(), ...data };
    authors.push(newAuthor);
    setStored(STORAGE_KEYS.AUTHORS, authors);
    return { success: true, data: newAuthor };
  },

  updateAuthor: (id, data) => {
    let authors = getStored(STORAGE_KEYS.AUTHORS, initialAuthors);
    authors = authors.map(a => (a._id === id ? { ...a, ...data } : a));
    setStored(STORAGE_KEYS.AUTHORS, authors);
    return { success: true, data: authors.find(a => a._id === id) };
  },

  deleteAuthor: (id) => {
    let authors = getStored(STORAGE_KEYS.AUTHORS, initialAuthors);
    authors = authors.filter(a => a._id !== id);
    setStored(STORAGE_KEYS.AUTHORS, authors);
    return { success: true, message: 'Author deleted' };
  },

  // Auth
  login: (email, password) => {
    const validEmails = ['sekarrithi4@gmail.com', 'admin@techblog.com'];
    const validPass = ['Admin@123456', 'Rithika2005'];

    const emailMatch = validEmails.some(e => e.toLowerCase() === (email || '').toLowerCase().trim());
    const passMatch = validPass.includes((password || '').trim());

    if (emailMatch && passMatch) {
      const user = {
        _id: 'admin-1',
        username: 'ChiefEditor',
        email: email.trim(),
        role: 'admin'
      };
      const token = 'mock_jwt_token_' + Date.now();
      return { success: true, token, user };
    }
    return { success: false, message: 'Invalid email or password.' };
  }
};
