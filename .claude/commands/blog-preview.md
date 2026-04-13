Start a local preview server for the blog. $ARGUMENTS

---

## Usage

```
/blog-preview
/blog-preview --dev
/blog-preview --prod
```

## Modes

| 옵션 | 명령 | 특징 |
|------|------|------|
| `--dev` (기본값) | `npm run dev` | 빠른 시작, 드래프트 포스트 포함, HMR |
| `--prod` | `npm run build && npm run preview` | 실제 배포와 동일, 드래프트 제외, Pagefind 검색 동작 |

## Procedure

1. **Parse `$ARGUMENTS`**:
   - `--prod`: production build preview
   - `--dev` or no argument: dev server

2. **Check for running servers** on port 4321:
   ```bash
   lsof -ti :4321
   ```
   If a process is already running, tell the user and ask whether to kill it or open a new session.

3. **Dev mode** (`--dev` or no args):
   - Tell the user: "드래프트 포스트(`draft: true`)도 표시됩니다. 실제 배포 환경과 다를 수 있습니다."
   - Run in background:
     ```bash
     npm run dev
     ```
   - URL: http://localhost:4321

4. **Prod mode** (`--prod`):
   - Tell the user: "프로덕션 빌드를 실행합니다. 드래프트 포스트는 표시되지 않습니다. 빌드에 1–2분 소요될 수 있습니다."
   - Run sequentially:
     ```bash
     npm run build && npm run preview
     ```
   - URL: http://localhost:4321

5. **After starting**, tell the user:
   - The URL to open: http://localhost:4321
   - Which mode is running and what it includes/excludes
   - How to stop: `Ctrl+C` in the terminal running the server
   - If checking a specific post: `http://localhost:4321/posts/<slug>`

## Notes

- Dev mode는 파일 변경 시 자동으로 새로고침됩니다 (HMR).
- Prod mode는 Pagefind 검색 인덱스가 포함되어 실제 검색 기능을 테스트할 수 있습니다.
- `draft: true` 포스트는 prod mode에서 보이지 않으므로 발행 전 확인은 dev mode를 사용하세요.
