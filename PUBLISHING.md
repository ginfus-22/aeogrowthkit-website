# Publishing a blog article (manual path, v1)

There's currently no automated path from an app-generated draft (Voiceprint,
in the main product) to a live page on this static site — the app's only
built-out publish integration is WordPress (`wp_publisher.py`). This doc is
the interim manual process. Treat it as a first pass — a simpler static-site
export/publish path is a future exploration, not solved here.

## Steps

1. **Copy the template.** Duplicate `article-template.html` to a new file
   named after your article's slug (lowercase, hyphenated — e.g.
   `writing-content-ai-quotes.html`).

2. **Fill the `<head>` meta tags** — `<title>`, `og:title`, `og:description`,
   `og:url`, `og:image`, `canonical` — matching the pattern every other page
   uses (copy from an existing page's `<head>` if unsure).

3. **Fill the hero section:**
   - `.article-meta`: category badge, publish date, read time
   - `<h1>`: the article title
   - `.article-subhead`: one-sentence summary (the BLUF)
   - `.article-byline`: avatar initials, author name, role

4. **Paste the body content** from the app-generated draft into the H2-sectioned
   structure already in the template. Use `.callout` divs for pull-quotes or
   key stats the app's draft highlights.

5. **Related articles + share buttons** at the bottom of the template are
   still placeholder (`href="#"`) — leave as-is until there are enough real
   articles to cross-link; not required to publish this one.

6. **Add a real card to `resources.html`**, replacing one of the existing
   `href="#"` sample cards:
   ```html
   <a href="your-new-slug.html" class="article-card" data-category="strategy">
     <div class="article-card-image">📊</div>
     <div class="article-card-content">
       <div class="tag">Strategy</div>
       <div class="title">Your Article Title</div>
       <div class="excerpt">One-sentence excerpt.</div>
       <div class="meta"><span>Month DD, YYYY</span><span>N min read</span></div>
     </div>
   </a>
   ```
   **Note:** `resources.html`'s filter pills use categories `strategy` /
   `optimization` / `tools` / `case-study` — these don't exactly match the
   categories already drafted in `WEBSITE_COPY.md` (`AEO Basics`, `AI
   Visibility`, `Technical`, `Content Strategy`). Map to the closest existing
   filter category, or add a new filter pill if none fits (see `resources.html`
   `.filter-pills` + its inline `<script>` for how filtering works).

7. **Commit + push.** Netlify auto-deploys on push — no build step.

## Known gap to explore later

The real friction point is step 4 — hand-copying app output into HTML. Once
there are a few real articles published this way, it's worth exploring:
a lightweight export format from the app (e.g. Markdown → this HTML shell
via a small script), or a "copy as HTML" button in the app's draft editor.
Not scoped today — flagging so it isn't forgotten.
