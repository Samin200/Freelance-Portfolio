# Samin Safwan — Portfolio

Personal portfolio website built with **React**, **Tailwind CSS**, and **Framer Motion**.
The UI was developed using an **AI-assisted workflow** — using AI for layout decisions,
component structure, copywriting, and debugging — while all final decisions and
customisations are made by me.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4     |
| Animation | Framer Motion                       |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB (via Mongoose)              |
| Deploy    | Vercel (frontend) + Render (API)    |

## Project Structure

```
samin-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Landing section with profile photo
│   │   ├── About.jsx         # Bio + course background
│   │   ├── Skills.jsx        # Tech stack cards
│   │   ├── Projects.jsx      # Project showcase
│   │   ├── Contact.jsx       # Form + availability toggle
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeading.jsx
│   │   └── ThemeToggle.jsx
│   ├── data/
│   │   └── portfolio.js      # ← Edit your projects/links here
│   ├── utils/
│   │   └── cn.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/                   # Backend API (deploy separately)
│   ├── index.js              # Express routes + MongoDB models
│   ├── package.json
│   └── .env.example          # Copy to .env and fill in values
├── package.json
└── README.md
```

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

### Backend (optional — needed for contact form + availability)

```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGO_URI in .env
npm run dev
```

The frontend sends form data to `/api/contact`.
In development, if the API is unreachable, submissions fall back to a success state
so you can test the UI without a running server.

## Customising Your Content

All text content lives in **`src/data/portfolio.js`**:
- Update your project titles, descriptions, images, and links there.
- Update your social links and email address.

To change your **availability badge**, use the toggle in the Contact section
(it calls `POST /api/availability`).

## Deployment

**Frontend:** Push to GitHub → connect to [Vercel](https://vercel.com). Done.

**Backend API:** Deploy the `/server` folder to [Render](https://render.com) or
[Railway](https://railway.app). Set environment variables from `.env.example`.
Then update `API_BASE` in `src/components/Contact.jsx` with your live API URL.

## AI-Assisted Workflow

This portfolio was built using AI tools (Claude by Anthropic) to help with:
- Component structure and layout decisions
- Copywriting and content editing
- Debugging and code review

All code is reviewed, understood, and customised by Samin Safwan.
