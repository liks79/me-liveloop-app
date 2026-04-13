Create a blog post from a researched item in research/<slug>/research.md. $ARGUMENTS

---

## Usage

```
/blog-publish <slug>
```

## Procedure

1. **Parse `$ARGUMENTS`** — treat as the slug. If empty, list available research items in `research/` and ask the user to choose.

2. **Read `research/<slug>/research.md`**:
   - If the file doesn't exist, tell the user to run `/blog-research <topic>` first.

3. **Get current datetime** in KST (UTC+9):
   ```bash
   date -u -d '+9 hours' '+%Y-%m-%dT%H:%M:%S.000+09:00'
   ```

4. **Create `src/data/blog/<slug>.md`** using frontmatter from the research file:

```markdown
---
author: liks79
pubDatetime: <datetime>
modDatetime:
title: <topic from research.md>
slug: <slug>
featured: false
draft: true
tags:
  <suggested_tags from research.md, one per line with "  - " prefix>
description: ""
ogImage: ""
---

<Full blog post content written from the research.md>
```

5. **Write the full post body** based on the research:
   - Follow the "Suggested Post Structure" from research.md
   - Write in Korean (한국어) unless the research topic is English-only
   - Use AstroPaper-compatible Markdown: headings (`##`, `###`), code blocks with language tags, bold for emphasis
   - Aim for 800–1500 words
   - Do NOT use `console.log` in any code examples (ESLint rule)

6. **Check for images** in `research/<slug>/images/`:
   - If images exist, copy them to `src/assets/blog/<slug>/` and reference in the post
   - Update `ogImage` frontmatter to point to the first image if available

7. **Update `research/<slug>/research.md`** — change `status: draft` to `status: published-draft`

8. **Tell the user**:
   - The blog post file path
   - Reminder to review content and change `draft: false` when ready
   - Next step: run `/blog-pr <slug>` to open a PR
