<div align="center">

<h1>🛒 TechMarket</h1>

<p><strong>A full-stack e-commerce platform for tech enthusiasts — featuring a production-grade Django REST API, Stripe-powered payments, built-in analytics engine, and a modern React storefront.</strong></p>

<br/>

[![Backend Live](https://img.shields.io/badge/Backend-Live-success?style=for-the-badge&logo=render)](http://techmarket-backend.onrender.com/market/?format=json)
[![Frontend Live](https://img.shields.io/badge/Frontend-Live-success?style=for-the-badge&logo=render)](https://techmarket-shop.onrender.com/)

</div>

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Backend](#backend)
  - [Apps & Modules](#apps--modules)
  - [Data Models](#data-models)
  - [REST API](#rest-api)
  - [Authentication & Security](#authentication--security)
  - [Payments](#payments-stripe-integration)
  - [Analytics Engine](#analytics-engine)
  - [Performance & Optimization](#performance--optimization)
  - [Deployment](#deployment--containerization)
- [Frontend](#frontend)
  - [UI & Components](#ui--components)
  - [State Management](#state-management)
  - [API Integration](#api-integration)
- [Team](#team)

---

<a id="overview"></a>
## 🌐 Overview

**TechMarket** is a complete e-commerce solution tailored for consumer electronics. It covers the full shopping lifecycle — from browsing a multi-category catalog with rich filtering, to checkout via Stripe, to order history and receipt delivery. The platform also includes a proprietary analytics system that tracks user sessions, behavioral events, geography, and device data, enabling product and business insights out of the box.

The backend is a **Django REST Framework** API deployed with **Gunicorn** + **Docker** on Render, backed by a **PostgreSQL** database. The frontend is a **React 19 + TypeScript** SPA built with Vite, styled with Tailwind CSS.

---

<a id="tech-stack"></a>
## 🧰 Tech Stack

### Backend

<p>
  <img src="https://img.shields.io/badge/Python-3.14-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Django-5.x-092E20?style=flat-square&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/DRF-REST Framework-red?style=flat-square&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-Payments-6772E5?style=flat-square&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-Media Storage-3448C5?style=flat-square&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-SimpleJWT-black?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Gunicorn-WSGI Server-499848?style=flat-square&logo=gunicorn&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/WhiteNoise-Static Files-lightgrey?style=flat-square"/>
</p>

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux Toolkit-State-764ABC?style=flat-square&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-4.x-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Router-7.x-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-HTTP Client-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Radix UI-Components-161618?style=flat-square&logo=radixui&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcn/ui-Design System-black?style=flat-square"/>
  <img src="https://img.shields.io/badge/Swiper-Carousel-6332F6?style=flat-square&logo=swiper&logoColor=white"/>
</p>

---

<a id="architecture"></a>
## 🏗 Architecture

```
techmarket/
├── backend/                        # Django REST API
│   ├── techmarketAPI/              # Project core (settings, middleware, permissions)
│   ├── market/                     # Products, Orders, Signboards, Series
│   ├── user/                       # Custom User model & auth
│   ├── payments/                   # Stripe session management & webhook handler
│   ├── analytics/                  # Session tracking & event collection
│   ├── Dockerfile
│   └── requirements.txt
│
└── frontend/                       # React 19 SPA
    ├── src/
    │   ├── components/             # Feature components (Cart, Catalog, Auth…)
    │   ├── modules/                # Page-level compositions
    │   ├── services/               # API service layer
    │   ├── features/               # Redux slices
    │   ├── utils/                  # Auth, analytics, HTTP helpers
    │   └── types/                  # TypeScript interfaces
    └── vite.config.ts
```

---

<a id="backend"></a>
## ⚙️ Backend

<a id="apps--modules"></a>
### Apps & Modules

The backend is organized as a set of focused Django apps, each responsible for a clear domain:

| App | Responsibility |
|---|---|
| `market` | Product catalog, orders, signboards, product series |
| `user` | Custom User model with Cloudinary avatar, JWT auth flows |
| `payments` | Stripe Checkout session creation, webhook event handling |
| `analytics` | Session fingerprinting, behavioral event logging |
| `techmarketAPI` | Settings split, custom middleware, global permissions |

---

<a id="data-models"></a>
### Data Models

#### Database Schema

[![DB Schema](https://app.eraser.io/workspace/0nMUqCax4cXy8Dg6Wglb/preview)](https://app.eraser.io/workspace/0nMUqCax4cXy8Dg6Wglb)

#### Product System

The `Product` model stores name, category (choices: `LAPTOP`, `PC`, `NETWORK_DEVICE`, `PRINTER_SCANNER`, `PC_PART`, `OTHER`), series (FK), pricing (`original_price` / `sale_price`), stock, structured `characteristics` (JSONField), color variants stored as a PostgreSQL `ArrayField`, and CSS3 color validation enforced at the model level.

Color variants use a clever naming convention: `ProductName__COLOR`, allowing a single product to exist as multiple DB rows (one per color) while the API surface presents them as a unified item. The `get_name` property strips the internal `__COLOR` suffix for clean display output. Product images are stored on **Cloudinary** and served with automatic format negotiation and quality optimization via `fetch_format="auto", quality="auto"`.

```python
# Generated field for total price — computed and persisted at DB level
price = models.GeneratedField(
    expression=F("unit_price") * F("quantity"),
    output_field=models.DecimalField(...),
    db_persist=True,
)
```

`OrderItem.price` is a **Django GeneratedField** — computed entirely in the database and persisted, meaning no Python-level arithmetic for total calculations and full indexability.

#### Order System

Orders follow a clean normalized structure: `Order → OrderItem → Product`. Stock deduction happens atomically via `bulk_update` inside a `@transaction.atomic` block. If any stock constraint fails, an `IntegrityError` is caught and surfaced as a user-facing validation error — preventing partial checkouts.

The `actual_price` property on `Product` returns `sale_price or original_price`, ensuring that price-at-purchase is always snapshotted into `OrderItem.unit_price`, guarding against future price changes affecting historical orders.

---

<a id="rest-api"></a>
### REST API

Built with **Django REST Framework**

**Key endpoints:**

| Method | Path | Description |
|---|---|---|
| `GET` | `/market/products/` | Paginated product list with full filter suite |
| `GET` | `/market/products/{id}/` | Product detail with color switching |
| `POST` | `/market/products/{id}/upload_image/` | Multi-image upload to Cloudinary (admin) |
| `GET/POST` | `/market/orders/` | User orders (authenticated) |
| `GET/POST` | `/market/signboards/` | Hero banner management |
| `GET/POST` | `/market/series/` | Product series management |
| `POST` | `/user/register/` | Registration with immediate JWT issuance |
| `POST` | `/user/login/` | JWT login |
| `POST` | `/user/refresh/` | Token refresh |
| `GET/PATCH` | `/user/me/` | Profile management |
| `POST` | `/payments/webhook/` | Stripe webhook receiver |
| `POST` | `/analytics/events/` | Behavioral event collection |

#### Product Filtering

The `ProductViewSet` implements a comprehensive client-driven filter pipeline entirely in Python/ORM — no raw SQL:

- **Text search** — `name__icontains` with whitespace stripping
- **Availability filter** — `status=true/false` maps to `stock_quantity__gt=0` or `stock_quantity__exact=0`
- **Price range** — `price_lte` / `price_gte` applied against an `annotated` `current_price` field (`Coalesce(sale_price, original_price)`)
- **Color grouping** — colors map through a `color_variables` dict, allowing abstract color names (e.g. "red") to match multiple CSS3 variants
- **Series regex filter** — builds an `iregex` OR-pattern dynamically from a comma-separated list
- **Category multi-select** — comma-separated categories mapped to `category__in`
- **Ordering** — safe whitelist: `current_price` and `name` only, with optional descending prefix

Home page behavior differs deliberately: when no filter params are present, the API returns up to 8 products per category sampled with `order_by("?")`, producing a varied landing page without extra endpoints.

#### Color-Aware Product Detail

```python
# Switching product color via query param: GET /market/products/42/?color=blue
base_name_subquery = (
    Product.objects.filter(**local_kwargs)
    .annotate(base_name=Left("name", StrIndex("name", Value("__")) - 1))
    .values("base_name")[:1]
)
return get_object(
    obj_, name=Concat(base_name_subquery, Value(f"__{color.upper()}"))
)
```

Switching product color is handled entirely in the ORM — extracting the base name via `Left` + `StrIndex`, then reconstructing the color-suffixed name in a single optimized lookup.

#### Custom Pagination

`SimplifiedCustomPagination` uses a strict allowlist (`4`, `8`, `16`, `32`) for `perPage`, preventing abuse from arbitrary page sizes. Pagination is **conditionally activated** — the home page view bypasses it entirely, returning the curated multi-category preview set.

---

<a id="authentication--security"></a>
### Authentication & Security

- **JWT via SimpleJWT** — 30-minute access tokens, 7-day refresh tokens
- **Custom User model** (`user.User`) extends `AbstractUser`, uses **email as the primary identifier** (`USERNAME_FIELD = "email"`) with a separate `username` field retained for display
- **Global permission class** `IsAdminOrReadOnly` — all write operations require staff status; all read operations are public by default
- **HTTPS enforcement** in production: `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, and `SECURE_PROXY_SSL_HEADER` are all enabled
- **CORS** is strictly scoped to `CSRF_TRUSTED_ORIGINS` from environment — no wildcard origins
- **Environment variable validation at startup** — `prod_settings.py` iterates over all required env keys and raises `EnvironmentError` immediately if any are absent, preventing silent misconfigurations from reaching production
- **Image upload validation** — file type and 10 MB size limit enforced at both serializer and view levels, with explicit `isinstance` checks against Django's upload classes
- **Stripe webhook signature verification** — every incoming webhook is verified with `stripe.Webhook.construct_event()` using the secret key; invalid signatures return `HTTP 403`

---

<a id="payments-stripe-integration"></a>
### Payments (Stripe Integration)

The payment flow is fully webhook-driven, making it robust against network failures and client-side manipulation:

1. **Order creation** atomically deducts stock and creates `OrderItem` rows
2. `create_stripe_session()` creates a Stripe Checkout Session and stores the session URL + ID in a `Payment` record (status: `UNPAID`)
3. The client is returned the `payment_url` immediately in the order response
4. Stripe calls `/payments/webhook/` on payment events:
   - `checkout.session.completed` → sets `Payment.status = PAID`
   - `charge.succeeded` → stores the receipt URL
   - `checkout.session.expired` → sets `CANCELED` and triggers `_order_rollback()`, which restores stock quantities via `bulk_update`

The rollback is implemented as a generator feeding `Product.objects.bulk_update()` — a single DB round-trip regardless of cart size.

A 20-minute cooldown guard on payment updates (`UPDATE_PAYMENT_MINUTES = 20`) prevents session refresh abuse.

---

<a id="analytics-engine"></a>
### Analytics Engine

TechMarket includes a **custom-built analytics system**, avoiding third-party tracking dependencies:

#### Session Fingerprinting (Middleware)

`TechMarketSessionParametersMiddleware` runs after successful auth responses (`/user/login/`, `/user/register/`, `/user/refresh/`) and creates a `SessionParameters` record per session:

- **Device type** — Bot / Mobile / Tablet / Desktop (via `user-agents`)
- **Browser** — Chrome / Safari / Edge / Firefox / Other
- **Geography** — continent + country code via IP geolocation (`ip-api.com`), using `django-ipware` for reliable IP extraction behind proxies
- **Access token** — the current JWT is stored as the session identifier, linking events back to their session

Bot sessions are automatically excluded.

#### Event Tracking

The `Event` model captures granular behavioral events tied to a session:

| Event Type | Data Captured |
|---|---|
| `PAGE_VIEW` | Page path |
| `VIEW_ITEM` | Page path |
| `VIEW_SEARCH_RESULTS` | Search term |
| `ADD_TO_CART` | Product name |
| `VIEW_ITEM_LIST` | List name |
| `SELECT_ITEM` | Product name |
| `BEGIN_CHECKOUT` | — |
| `PURCHASE` | — |
| `FIRST_VISIT` | — |

The frontend sends these events to `/analytics/events/` using an authenticated `authFetch` wrapper, mirroring Google Analytics 4's event model in a self-hosted, privacy-friendly way.

---

<a id="performance--optimization"></a>
### Performance & Optimization

- **`select_related` + `prefetch_related`** used consistently across all querysets — `Product` always eagerly loads `series` and `images` to eliminate N+1 queries
- **`bulk_create` / `bulk_update`** for all multi-row operations (order items, stock deduction, rollbacks)
- **`CachedPrimaryKeyRelatedField`** — a custom DRF field that pre-fetches all products referenced in an order payload in a single query before validation, eliminating per-item DB lookups during order creation
- **`_products_cache`** injected at `to_internal_value` level in `OrderSerializer`, making the product resolution O(1) per item after the initial batch fetch
- **Cloudinary auto-optimization** — all images are served with `fetch_format=auto` (WebP/AVIF where supported) and `quality=auto`, reducing bandwidth without storing multiple variants
- **WhiteNoise** with `CompressedManifestStaticFilesStorage` for hashed, gzip-compressed static file serving without a CDN dependency
- **Database connection pooling** via `conn_max_age=360` in `dj_database_url` — persistent connections across requests
- **`GeneratedField` for `OrderItem.price`** — total price is materialized in the database, not computed in application code

---

<a id="deployment--containerization"></a>
### Deployment & Containerization

The backend runs in a minimal **Alpine-based Docker container** (`python:3.14-alpine`) with a dedicated non-root user (`tech_user`) for process isolation:

```dockerfile
RUN addgroup -S django && adduser -S -G django tech_user
...
USER tech_user
```

`PYTHONUNBUFFERED=1` and `PYTHONDONTWRITEBYTECODE=1` are set to ensure clean log streaming and no `.pyc` file generation in the container. Production settings are isolated in `prod_settings.py` and selected via `DJANGO_SETTINGS_MODULE` in the image environment — never mixed with local dev settings.

The `build.sh` script handles migrations and Gunicorn startup, both within the same entrypoint, ensuring the schema is always current on deploy.

---

<a id="frontend"></a>
## 🎨 Frontend

<a id="ui--components"></a>
### UI & Components

The frontend is a **React 19 SPA** built with **Vite 7**, organized with a clear separation between page-level modules (`/modules`) and reusable feature components (`/components`).

**Page routes:**

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Curated product grid + hero carousel |
| `/catalog` | `CatalogPage` | Filtered product listing |
| `/products/:id` | `ProductDetailsPage` | Detail view with color switcher |
| `/cart` | `CartPage` | Cart summary + checkout trigger |
| `/login` | `LoginPage` | JWT login form |
| `/register` | `RegisterPage` | Registration with avatar upload |
| `/orders` | `SuccessOrdersPage` | Order history |
| `/about` | `AboutUsPage` | Team info |
| `/*` | `PageNotFound` | 404 handler |

The design system is built on **shadcn/ui** components (Accordion, Carousel, Button) backed by **Radix UI** primitives for accessibility, with **Tailwind CSS 4** for utility-first styling. **Swiper** drives the hero banner carousel. **Lucide React** and **FontAwesome 7** handle iconography. **Poppins** (Bold, Medium, Light) is self-hosted via `/public/fonts` for zero font-flash.

**Notable components:**

- `ProductsList` — renders the filtered catalog with pagination controls
- `ProductDetails` — full product view with image gallery, color selector, stock badge, characteristics table, and add-to-cart
- `Header` — handles search, cart badge counter, user avatar + auth state, navigation
- `CartPage` — full cart management using Redux-persisted state
- `SuccessOrders` — order history with payment status display, receipt links, and item breakdown
- `StarRating` — visual rating component
- `Breadcrumbs` — contextual navigation trail

---

<a id="state-management"></a>
### State Management

Cart state is managed with **Redux Toolkit**, persisted to `localStorage` so the cart survives page refreshes and browser restarts. The store is initialized from the serialized state on load via a `loadState` / `saveState` pattern using `store.subscribe`.

```typescript
const store = configureStore({
  reducer: { cart: cartSlice },
  preloadedState: { cart: loadState() },
});
store.subscribe(() => saveState(store.getState().cart));
```

Auth tokens (JWT access + refresh) are stored in `localStorage` and managed through dedicated utility functions in `src/utils/auth.ts`.

---

<a id="api-integration"></a>
### API Integration

**`authFetch`** — a thin wrapper around `fetch` that automatically injects the `Authorization: Bearer <token>` header for authenticated requests, removing boilerplate from all protected API calls.

**`httpClient.ts`** — a typed generic HTTP utility (`getData<T>` / `postData<T>`) for public endpoints.

**Service layer** (`/services`) contains typed API call functions per domain: product listing, product detail, pagination, signboards, search.

**Analytics integration** — `analyticsEvent()` in `src/utils/analytics.ts` fires event payloads to the backend analytics endpoint after each meaningful user interaction (page views, item selections, cart additions, checkout initiation).

**Token refresh** — `refreshToken()` handles silent re-authentication using the stored refresh token, maintaining session continuity without forcing re-login.

The `category.ts` and `categoryToSlug.ts` utilities handle bidirectional mapping between the backend's category enum values and URL-friendly slugs used for routing.

---

<a id="team"></a>
## 👥 Team

<table>
  <tr>
    <td align="center"><strong>Arsenii Kushnir</strong><br/>Backend Developer & Deploy<br/><a href="https://github.com/PythonBossUA">@PythonBossUA</a></td>
    <td align="center"><strong>Nikita Serdyukov</strong><br/>Frontend Developer<br/><a href="https://github.com/10hokageee">@10hokageee</a></td>
    <td align="center"><strong>Iryna Savelieva</strong><br/>Data Analyst<br/><a href="https://github.com/iro44ka8888-droid">@iro44ka8888-droid</a></td>
    <td align="center"><strong>Olga Skrypnyk</strong><br/>QA Engineer<br/><a href="https://github.com/qaaug25-OlgaSkrypnyk">@qaaug25-OlgaSkrypnyk</a></td>
  </tr>
</table>

---

<div align="center">

Made with ❤️ in Ukraine 🇺🇦

</div>
