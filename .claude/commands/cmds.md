이 repo에서 사용 가능한 커스텀 커맨드 목록을 출력합니다.

---

## Procedure

`.claude/commands/` 디렉터리 안의 모든 `.md` 파일을 읽고 다음 형식으로 출력한다.

1. Bash 도구로 파일 목록을 가져온다:
   ```bash
   ls .claude/commands/*.md
   ```

2. 각 파일에 대해:
   - 파일명에서 `.md`를 제거한 것이 커맨드 이름 (예: `blog-research.md` → `/blog-research`)
   - 파일의 **첫 번째 줄**을 설명으로 사용

3. 아래 형식으로 출력한다. 카테고리는 커맨드 이름 prefix로 자동 분류한다:
   - `blog-*` → **Blog**
   - `image-*` → **Blog**
   - `new-post` → **Blog**
   - `cmds` → **Meta**

출력 예시:
```
# 사용 가능한 커스텀 커맨드

## Blog
  /blog-research <topic>   — Research a blog topic and save results to the local research directory.
  /blog-publish <slug>     — Create a blog post from a researched item in research/<slug>/research.md.
  /blog-preview [--dev|--prod] — Start a local preview server for the blog.
  /blog-pr <slug>          — Create a GitHub PR for a blog post.
  /image-gen <prompt>      — Generate a blog image using NanoBanana or Imagen via Google Gemini API.
  /new-post <title>        — Create a new blog post file in src/data/blog/.

## Meta
  /cmds                    — 이 repo에서 사용 가능한 커스텀 커맨드 목록을 출력합니다.
```

파일 목록을 실제로 읽어서 동적으로 생성한다. 위 예시는 형식 참고용이다.
