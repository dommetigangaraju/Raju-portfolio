# Ganga Raju — Personal Portfolio

A modern, responsive personal portfolio website built with plain HTML5, CSS3, and JavaScript — no frameworks,
no build step. Designed for job applications, internships, college placements, and sharing with recruiters.

## Features

- Sticky, responsive navbar with mobile hamburger menu and scroll-based active-link highlighting
- Animated hero section with profile photo, intro, and quick-action buttons
- About, Skills, Education, Experience, Certifications, Achievements, and DSA sections
- Filterable project gallery (All / Web Development / Python / Data Science / AI-ML)
- Resume download section (`assets/resume.pdf`)
- Contact form with client-side validation and a `mailto:` send flow (no backend required)
- Scroll-reveal animations that respect `prefers-reduced-motion`
- Back-to-top button, dynamic footer year
- Semantic HTML, keyboard-navigable, visible focus states, ARIA attributes on the mobile menu
- Basic SEO tags (title, description, keywords, Open Graph)

## Folder Structure

```text
portfolio/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── profile.jpg      ← add your own photo here
│   └── resume.pdf       ← add your own resume here
│
└── README.md
```

## How to Run Locally

No installation or build tools are required.

1. Download or clone this `portfolio/` folder.
2. Double-click `index.html` to open it in your browser, **or** serve it locally for the best experience
   (recommended, since some browsers restrict local file access for things like fetch checks):
   ```bash
   # Python 3
   cd portfolio
   python -m http.server 8000
   # then open http://localhost:8000
   ```
3. That's it — the site is fully static.

## How to Customize Personal Information

Search `index.html` for `<!-- EDIT: ... -->` comments — each one marks a spot where placeholder content should
be replaced with your real information (social links, email, education details, certifications, achievements).
Text placeholders inside `[square brackets]` (e.g. `[Add CGPA]`) should also be replaced directly.

## How to Add Your Photo

1. Save your photo as `assets/profile.jpg` (a square image, ideally at least 500×500px, works best).
2. No code changes are needed — `index.html` already references `assets/profile.jpg`. If the file isn't found,
   a placeholder graphic is shown automatically until you add it.

## How to Add Your Resume

1. Export your resume as a PDF.
2. Save it as `assets/resume.pdf`, replacing the placeholder.
3. Both "Download Resume" buttons already link to this path — no code changes needed.

## How to Add GitHub and LinkedIn Links

In `index.html`, replace every occurrence of:
- `https://github.com/your-username` with your GitHub profile URL
- `https://linkedin.com/in/your-profile` with your LinkedIn profile URL
- `your.email@example.com` with your real email address

These appear in the hero section, footer, contact section, and DSA section. In `script.js`, also update the
`to` variable inside the contact-form submit handler (search for `your.email@example.com`).

## How to Add More Projects

In `index.html`, inside the `<div class="projects-grid" id="projectsGrid">` block, duplicate one
`<article class="project-card">...</article>` block and edit its contents. Set `data-category` to any
combination of `web`, `python`, `data`, `ai` (space-separated) so it appears under the right filter(s).

## Connecting a Real Contact-Form Backend (Optional)

By default, submitting the contact form opens the visitor's email client with a pre-filled message — no server
needed. To send messages directly from the page instead:

**Option A — Formspree**
1. Create a free form at [formspree.io](https://formspree.io) and copy your form endpoint.
2. In `index.html`, add `action="https://formspree.io/f/your-id"` and `method="POST"` to the `<form id="contactForm">` tag.
3. In `script.js`, remove or bypass the `mailtoLink` redirect in the submit handler so the form's native POST goes through.

**Option B — EmailJS**
1. Create an account at [emailjs.com](https://www.emailjs.com) and set up an email service + template.
2. Include the EmailJS SDK via CDN in `index.html`.
3. In `script.js`, replace the `mailtoLink` logic with a call to `emailjs.send(...)` using your service, template,
   and public key.

## Deployment

### GitHub Pages
1. Push this folder to a GitHub repository (the `portfolio/` contents should be at the repo root, or adjust paths).
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g. `main`) and root folder, then save.
4. Your site will be live at `https://your-username.github.io/repository-name/`.

### Netlify
1. Go to [netlify.com](https://www.netlify.com) and log in.
2. Drag and drop the `portfolio/` folder onto the Netlify dashboard ("Deploy manually"), **or** connect your
   GitHub repository for continuous deployment.
3. Netlify will assign a live URL immediately; you can add a custom domain from the site settings.

## Testing Checklist

- [ ] All HTML tags close correctly and the page validates
- [ ] Mobile hamburger menu opens/closes and traps focus reasonably (Escape closes it)
- [ ] Every nav link scrolls to an existing section
- [ ] Active nav link updates while scrolling
- [ ] Project filter buttons show/hide the correct cards
- [ ] Contact form shows inline errors for empty/invalid fields
- [ ] Submitting a valid contact form opens a pre-filled email
- [ ] Resume buttons point to `assets/resume.pdf`
- [ ] Back-to-top button appears after scrolling and returns to the top
- [ ] Site is usable on desktop, tablet, and mobile widths
- [ ] Reduced-motion setting disables animations
