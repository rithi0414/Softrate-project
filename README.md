# 🚀 Softrate Tech - Production-Ready Technology Blog & Publication

A high-performance, modular, and production-ready Full-Stack **MERN** (MongoDB, Express.js, React.js, Node.js) Technology Blog Website built for **Softrate Technologies**.

---

## 🌟 Key Features

### 1. Public Publication Experience
- **Softrate Editorial Aesthetic:** Modern slate & crisp white cards, radiant gradient accents (Electric Indigo to Vivid Cyan), refined typography (`Plus Jakarta Sans` & `Inter`), and generous whitespace.
- **Featured & Highlighted Stories:** Prominent hero grid and trending story highlights on the homepage.
- **Dynamic Category Navigation:** Horizontal category pill bar pre-seeded with all 7 requested enterprise domains.
- **Instant Live Search:** Debounced search bar with automatic suggestions dropdown as you type, plus dedicated search page.
- **Dedicated Article Detail Pages:**
  - Full breadcrumb hierarchy (`Home > Category > Article Title`).
  - High-resolution hero image presentation.
  - Sticky **Table of Contents** with smooth scroll and active scroll-spy.
  - Social media share buttons (X/Twitter, LinkedIn, Facebook, Copy link).
  - Rich typography supporting code blocks (`<pre><code>`), blockquotes, comparison tables, and figures.
  - Contributing author biography card with social links.
  - Previous / Next article preview navigation.
  - Related articles grid sharing category/tag relationships.
- **Browse & Filter Archives:**
  - Topic-based category pages with descriptions and post counters.
  - Tag collection archive (`/tag/:slug`).
  - Grid & List view layout switcher with live filtering and pagination.

### 2. Admin CMS Dashboard
- **Secure Authentication:** JWT-based authentication for administrative and editorial staff.
- **Live Metrics Overview:** Total articles, published count, drafts, scheduled posts, and total aggregate page reads.
- **Post Management & Rich Text Editor:**
  - Controls for title, auto-slugification, custom URL slugs, and summary.
  - Full rich text editor toolbar supporting H2/H3 headings, bold/italic, blockquotes, ordered/unordered lists, code snippets, tables, links, and inline images.
  - Integrated image uploader (supports local file upload via Multer or external URL input).
  - Multi-category and multi-tag assignment.
  - Author selector.
  - Editorial status workflow (`published`, `draft`, `scheduled` with datetime picker).
  - Highlight story toggle (`isFeatured`).
  - Granular SEO controls: Custom SEO Title, Meta Description, character count trackers, and real-time Google search snippet preview.
- **Taxonomy & Author Management:**
  - Category manager (create, edit, delete, custom slug, description, post counter).
  - Tag manager (create, edit, delete, custom slug).
  - Author manager (create, edit, delete, avatar URL/upload, bio, social links).

### 3. SEO & Production Architecture
- **Clean SEO URLs:** Clean route structure (`/blog/:slug`, `/category/:slug`, `/tag/:slug`).
- **Dynamic Open Graph & Twitter Cards:** Automated og:title, og:description, og:image, and og:url injection.
- **Schema.org Structured Data:** Injects `BlogPosting` JSON-LD markup on article pages for Google rich snippets.
- **Dynamic XML Sitemap:** Available at `/sitemap.xml` generated automatically from MongoDB collections.
- **Robots.txt:** Built-in endpoint at `/robots.txt` safeguarding admin routes and exposing the sitemap.

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ODM |
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide React, date-fns |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs password hashing |
| **File Storage** | Multer disk storage for local media uploads |

---

## 🗄️ Database Schemas (MongoDB)

1. **User (Admin / Editor):**
   - `username`, `email` (unique), `password` (bcrypt hash), `role` ('admin' | 'editor').
2. **Category:**
   - `name`, `slug` (unique), `description`, timestamps.
3. **Tag:**
   - `name`, `slug` (unique), timestamps.
4. **Author:**
   - `name`, `bio`, `avatar`, `socialLinks` (twitter, linkedin, github, website).
5. **Post (Blog Article):**
   - `title`, `slug` (unique, indexed), `content` (HTML/Markdown), `summary`, `featuredImage`, `author` (Ref Author), `categories` (Array of Ref Category), `tags` (Array of Ref Tag), `publishedDate`, `scheduledFor`, `status` ('draft' | 'published' | 'scheduled'), `isFeatured` (Boolean), `readingTime`, `seoTitle`, `metaDescription`, `viewsCount`.

---

## 📂 Project Structure

```text
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Admin login, profile, register
│   │   ├── authorController.js   # Author CRUD
│   │   ├── categoryController.js # Category CRUD
│   │   ├── postController.js     # Public & Admin post queries, search, views, stats
│   │   ├── seoController.js      # Dynamic XML sitemap and robots.txt
│   │   ├── tagController.js      # Tag CRUD
│   │   └── uploadController.js   # Image upload endpoint
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & role authorization
│   │   ├── errorHandler.js       # Centralized error handler
│   │   └── upload.js             # Multer image upload configuration
│   ├── models/
│   │   ├── Author.js
│   │   ├── Category.js
│   │   ├── Post.js
│   │   ├── Tag.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── postRoutes.js
│   │   ├── seoRoutes.js
│   │   ├── tagRoutes.js
│   │   └── uploadRoutes.js
│   ├── scripts/
│   │   └── seed.js               # Database seeder (Admin, 7 categories, tags, authors, posts)
│   ├── utils/
│   │   └── helpers.js            # Slugify, calculateReadingTime, generateExcerpt
│   ├── .env                      # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Main server entrypoint
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg           # Zoho-styled brand icon
│   │   └── robots.txt
│   ├── src/
│   │   ├── api/                  # Axios services (posts, categories, tags, authors, auth, upload)
│   │   ├── components/
│   │   │   ├── admin/            # AdminLayout, RichTextEditor, ImageUploader
│   │   │   ├── blog/             # FeaturedHero, CategoryNav, TableOfContents, ShareButtons, PrevNextNav, RelatedPosts
│   │   │   └── common/           # Navbar, Footer, SearchBar, PostCard, Pagination, SEO, Badge, LoadingSpinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global admin auth context & state
│   │   ├── pages/
│   │   │   ├── admin/            # AdminLoginPage, DashboardPage, PostManagementPage, PostEditorPage, CategoryManagementPage, TagManagementPage, AuthorManagementPage
│   │   │   └── public/           # HomePage, BlogListingPage, BlogDetailPage, CategoryPage, TagPage, NotFoundPage
│   │   ├── App.jsx               # Client routes & ProtectedRoute wrapper
│   │   ├── index.css             # Tailwind base & rich article prose styling
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js            # Vite config with API proxy
│
├── package.json                  # Root orchestrator scripts
└── README.md
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Prerequisites
- **Node.js** v18 or newer
- **MongoDB** instance running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

### 2. Environment Variables Configuration
The backend comes pre-configured with a default `.env` file in `backend/.env`. You can customize it as needed:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/tech_blog_zoho
JWT_SECRET=super_secret_jwt_key_tech_blog_2025_zoho_inspirational
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
ADMIN_DEFAULT_EMAIL=admin@techblog.com
ADMIN_DEFAULT_PASSWORD=Admin@123456
```

### 3. Install Dependencies
Run the following commands to install dependencies for both the backend and frontend:

```bash
# In the backend directory
cd backend
npm install

# In the frontend directory
cd ../frontend
npm install
```

### 4. Seed the Database
Populate the database with the **7 required initial categories**, admin credentials, verified authors, tags, and realistic Zoho-styled technical articles:

```bash
cd backend
npm run seed
```

**Pre-seeded Admin Credentials:**
- **Email:** `admin@techblog.com`
- **Password:** `Admin@123456`

**Pre-seeded Initial Categories:**
1. Software Development
2. Artificial Intelligence & Machine Learning
3. Web and Mobile App Development
4. Technology & Innovation
5. Cybersecurity
6. Cloud Computing
7. Industry Insights

### 5. Running the Application

Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Vite client will start on http://localhost:5173
```

Visit **http://localhost:5173** to explore the public blog, and navigate to **http://localhost:5173/admin/login** to access the CMS Dashboard.

---

## 📡 API Endpoints Reference

### Public Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts` | List posts with pagination (`?page=1&limit=9`), category (`?category=slug`), tag (`?tag=slug`), keyword search (`?search=term`), and sorting (`?sort=-viewsCount`) |
| `GET` | `/api/posts/:slug` | Get single post details, atomically increments `viewsCount`, fetches related posts & prev/next article navigation |
| `GET` | `/api/categories` | List all categories with associated live post counts |
| `GET` | `/api/categories/:slug` | Get category details by slug |
| `GET` | `/api/tags` | List all tags with linked article counts |
| `GET` | `/api/tags/:slug` | Get tag details by slug |
| `GET` | `/api/authors` | List contributing author profiles |
| `GET` | `/api/search` | Search articles across title, summary, and content (`?q=keyword`) |
| `GET` | `/sitemap.xml` | Dynamic XML sitemap for search engines |
| `GET` | `/robots.txt` | Standard robots indexing instructions |

### Admin Protected Routes (Require `Authorization: Bearer <JWT>`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login returning JWT token and user profile |
| `GET` | `/api/auth/me` | Fetch currently authenticated user |
| `GET` | `/api/posts/admin/stats` | Dashboard statistics (total, published, drafts, views, recent) |
| `POST` | `/api/posts` | Create new article (handles draft, publish, and scheduled date) |
| `PUT` | `/api/posts/:id` | Update article details and recalculate reading time |
| `DELETE` | `/api/posts/:id` | Permanently delete article |
| `POST` | `/api/upload` | Upload image file via Multer, returns URL |
| `POST` | `/api/categories` | Create new category |
| `PUT` | `/api/categories/:id` | Update category name, slug, description |
| `DELETE` | `/api/categories/:id` | Delete category and remove reference from articles |
| `POST` | `/api/tags` | Create new tag |
| `PUT` | `/api/tags/:id` | Update tag name and slug |
| `DELETE` | `/api/tags/:id` | Delete tag |
| `POST` | `/api/authors` | Create contributing author |
| `PUT` | `/api/authors/:id` | Update author bio, avatar, and social links |
| `DELETE` | `/api/authors/:id` | Delete author (with safety check on published posts) |

---

## 🛡️ License
MIT License. Built for production demonstration and scalable enterprise architectures.
