Create a GitHub PR for a blog post. $ARGUMENTS

---

## Usage

```
/blog-pr <slug>
/blog-pr <slug> --draft
```

## Procedure

1. **Parse `$ARGUMENTS`**:
   - First token = slug
   - `--draft` flag = open PR as draft

2. **Verify the post exists** at `src/data/blog/<slug>.md`. If not, tell the user to run `/blog-publish <slug>` first.

3. **Read the post frontmatter** to get:
   - `title` — for commit message and PR title
   - `draft` — warn user if still `draft: true`
   - `tags` — for PR description

4. **Check git status** — confirm only blog-related files are staged/changed.

5. **Create branch and commit**:
   ```bash
   git checkout -b claude/blog-<slug>
   git add src/data/blog/<slug>.md
   # if images exist:
   git add src/assets/blog/<slug>/
   git commit -m "feat: add blog post '<title>'"
   git push -u origin claude/blog-<slug>
   ```

6. **Open GitHub PR** using `gh pr create`:
   - Title: `feat: <title>`
   - Body template:

```
## 블로그 포스트

**제목**: <title>
**슬러그**: <slug>
**태그**: <tags>

## 체크리스트
- [ ] 내용 최종 검토
- [ ] `draft: false` 로 변경 완료
- [ ] OG 이미지 설정 (`ogImage` 필드)
- [ ] 설명 작성 (`description` 필드)
- [ ] Cloudflare Pages 프리뷰 URL 확인

## 프리뷰
Cloudflare Pages가 이 PR에 대한 프리뷰 URL을 자동으로 생성합니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

   - If `--draft` flag: add `--draft` to `gh pr create`

7. **After PR is created**, tell the user:
   - PR URL
   - Cloudflare Pages preview will appear in the PR checks
   - Reminder to assign a reviewer
   - If post is still `draft: true`, remind to update before merging
