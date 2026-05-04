# 🌿 GreenScape Assist

A home gardening tracker web app — converted to a pure static HTML/CSS/JS website, ready for GitHub Pages.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Welcome / landing page |
| `garden.html` | My Garden — view all plants |
| `plant-detail.html` | Individual plant info + water button |
| `add-plant.html` | Add a new plant form |
| `tasks.html` | Pending & completed care tasks |
| `journal.html` | Garden journal entries |

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on github.com, then:
git init
git add .
git commit -m "Initial commit — GreenScape static site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/greenscape.git
git push -u origin main
```

Then go to **Settings → Pages → Source: Deploy from branch → main → / (root)** → Save.

Your site will be live at: `https://YOUR_USERNAME.github.io/greenscape/`

## Maintenance Update Example

To update the welcome tagline, open `index.html` and change:
```html
<p class="welcome-tagline">Where gardens flourish</p>
```
to:
```html
<p class="welcome-tagline">Your personal plant care companion 🌿</p>
```

Then commit and push — GitHub Pages auto-deploys within ~1 minute.

## Tech Stack
- Pure HTML5, CSS3, Vanilla JS
- Google Fonts (Playfair Display + DM Sans)
- localStorage for data persistence
- Zero dependencies, zero build step
