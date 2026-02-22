Create a new blog post file in `src/data/blog/`.

## Steps

1. **Determine the title**: Use $ARGUMENTS as the post title. If no argument is provided, ask the user for the title before proceeding.

2. **Generate the slug**: Convert the title to kebab-case (e.g., "My First Post" → `my-first-post`). Use only lowercase letters, numbers, and hyphens.

3. **Get the current datetime** in `Asia/Seoul` timezone (UTC+9) formatted as ISO 8601 with offset, e.g. `2026-02-22T10:00:00.000+09:00`. Use the Bash tool: `date -u '+%Y-%m-%dT%H:%M:%S.000+09:00'` and adjust for KST (+9h).

4. **Create the file** at `src/data/blog/<slug>.md` with this exact frontmatter:

```markdown
---
author: liks79
pubDatetime: <datetime>
modDatetime:
title: <title>
slug: <slug>
featured: false
draft: true
tags:
  - others
description: ""
ogImage: ""
---

```

- Leave `modDatetime` blank (not null, not ~, just empty).
- Leave `description` and `ogImage` as empty strings — the user will fill them in.
- Add one blank line after the closing `---` before any body content.

5. **After creating the file**, tell the user:
   - The file path created
   - Which fields still need to be filled in: `description`, `tags`, `ogImage` (optional)
   - That `draft: true` means it won't appear in production until changed to `false`
