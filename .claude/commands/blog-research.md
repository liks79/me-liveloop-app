Research a blog topic and save results to the local research directory. $ARGUMENTS

---

## Usage

```
/blog-research <topic>
/blog-research Claude Code 멀티에이전트 패턴
```

## Procedure

1. **Parse `$ARGUMENTS`** — treat the full string as the topic. If empty, ask the user for a topic.

2. **Generate a slug** from the topic: kebab-case, lowercase, English or transliterated Korean (e.g., "Claude Code 멀티에이전트" → `claude-code-multi-agent`).

3. **Research the topic** using `WebSearch` and `WebFetch`:
   - Search for recent articles, official docs, and community discussions
   - Gather at least 3–5 quality sources
   - Focus on: what it is, why it matters, practical use cases, code examples if applicable

4. **Create research directory and file**:
   - Directory: `research/<slug>/`
   - File: `research/<slug>/research.md`

5. **Write `research.md`** with this structure:

```markdown
---
topic: <original topic>
slug: <slug>
researched: <YYYY-MM-DD>
status: draft
suggested_tags:
  - <tag1>
  - <tag2>
---

# <Topic>

## 요약 (Summary)
<2–3 sentences: what this is and why it matters>

## 핵심 내용 (Key Points)
- <point 1>
- <point 2>
- <point 3>

## 상세 내용 (Details)
<Structured explanation with subheadings as needed>

## 코드 예시 (Code Examples)
<If applicable>

## 실용적 적용 (Practical Applications)
<Real-world use cases>

## 블로그 포스트 구조 제안 (Suggested Post Structure)
1. 도입부 — 독자의 문제/관심사 hook
2. <section 1>
3. <section 2>
4. 결론 및 다음 단계

## 참고 자료 (References)
- [Title](URL) — brief note
- [Title](URL) — brief note

## 이미지 아이디어 (Image Prompts)
- <suggested prompt for cover image>
- <suggested prompt for inline image>
```

6. **After saving**, tell the user:
   - The research file path
   - Suggested tags
   - Suggested image prompts they can use with `/image-gen`
   - Next step: run `/blog-publish <slug>` when ready to write the post
