# me-liveloop-app

개인 **프로필/이력서** 및 글(포스트)을 관리하기 위한 블로그입니다. [Astro](https://astro.build/) 기반이며, 디자인/구조는 [AstroPaper](https://github.com/satnaing/astro-paper) 테마를 기반으로 커스터마이징합니다.

This repository contains my personal **profile/resume** blog (and posts), built with [Astro](https://astro.build/) and customized from the [AstroPaper](https://github.com/satnaing/astro-paper) theme.

---

## ✨ 주요 기능 / Key Features

- **정적 블로그 + SEO**: RSS, sitemap, OG 이미지 생성
- **검색**: Pagefind 기반 정적 검색
- **다크 모드**: 라이트/다크 테마 토글
- **타입 안정성**: TypeScript + `astro check`

---

## 🚀 로컬 실행 / Running locally

```bash
npm install
npm run dev
```

- 개발 서버: `localhost:4321`

빌드:

```bash
npm run build
```

프리뷰:

```bash
npm run preview
```

---

## 🛠️ 커스터마이징 포인트 / Where to customize

- **사이트 설정(SEO/소셜/메타)**: `src/config.ts`
- **About(프로필/이력서) 페이지**: `src/pages/about.md`
- **포스트(글) 작성/관리**: `src/data/blog/`
- **스타일**: `src/styles/`

---

## 🗂️ 프로젝트 구조 / Project structure (core)

```bash
/
├── public/
│   ├── assets/
│   └── pagefind/        # build 시 자동 생성될 수 있음 (검색 인덱스)
├── src/
│   ├── data/blog/       # posts
│   ├── pages/           # routes (index, posts, tags, search, about...)
│   ├── components/
│   └── config.ts        # site config
└── astro.config.ts
```

---

## 🔐 환경변수 / Environment variables

선택 사항:

```bash
# .env
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

---

## 📦 배포 / Deployment

정적 빌드 결과물은 `dist/`에 생성됩니다. 배포 플랫폼(예: Cloudflare Pages, Vercel, Netlify 등)에서 **빌드 커맨드**를 `npm run build`로 설정하고 **출력 디렉토리**를 `dist`로 지정하면 됩니다.

The site outputs to `dist/`. On your hosting platform (e.g. Cloudflare Pages / Vercel / Netlify), set **build command** to `npm run build` and **output directory** to `dist`.

---

## 🙏 Credits / Attribution

Based on the [AstroPaper](https://github.com/satnaing/astro-paper) theme by [Sat Naing](https://satnaing.dev) and contributors.

## 📜 License

This project follows the original AstroPaper licensing (MIT). See `LICENSE`.
