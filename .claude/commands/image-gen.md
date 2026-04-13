Generate a blog image using NanoBanana or Imagen via Google Gemini API. $ARGUMENTS

---

## Usage

```
/image-gen <prompt>
/image-gen <prompt> --slug <slug>
/image-gen <prompt> --output <path>
/image-gen <prompt> --model imagen-4
```

## Models

| 옵션 | 모델 | 특징 |
|------|------|------|
| `nano-banana` | `gemini-2.5-flash-image` | NanoBanana — 빠름 |
| `nano-banana-2` (기본값) | `gemini-3.1-flash-image-preview` | NanoBanana 2 — 최신 |
| `nano-banana-pro` | `gemini-3-pro-image-preview` | NanoBanana Pro — 고품질 |
| `imagen-4` | `imagen-4.0-generate-001` | Imagen 4 — 안정적 |
| `imagen-4-fast` | `imagen-4.0-fast-generate-001` | Imagen 4 Fast |

## Procedure

1. **Parse `$ARGUMENTS`**:
   - `--slug <slug>`: save to `research/<slug>/images/` directory
   - `--output <path>`: use this exact path instead
   - `--model <model>`: use this model alias
   - Remaining text = image generation prompt

2. **Determine output path**:
   - If `--slug` given: `research/<slug>/images/generated_<timestamp>.png`
   - If `--output` given: use that path
   - Otherwise: `research/images/generated_<timestamp>.png`
   - Get timestamp with: `date '+%Y%m%d_%H%M%S'`

3. **Run the generation script**:

```bash
uv run --with google-genai \
  python /home/liks/playground/staytuned-research-mono/.claude/scripts/generate_image.py \
  --prompt "<prompt>" \
  --output "<output_path>" \
  --model "<model>"
```

4. **On success**:
   - Report the saved file path
   - Read the image file and display it to the user
   - If `--slug` was given, suggest: "To use as OG image, set `ogImage: ./images/<filename>` in your post frontmatter after moving to `src/assets/blog/<slug>/`"

5. **On failure**: show the error message and explain the likely cause (API key missing, network issue, etc.)

## Examples

```
/image-gen A minimalist tech blog cover with dark background and glowing blue circuits
/image-gen Claude Code AI agent workflow diagram --slug claude-code-multi-agent
/image-gen 한국 개발자 블로그 커버 이미지, 깔끔한 미니멀 디자인 --model imagen-4
/image-gen futuristic code editor --output research/my-post/images/cover.png
```

## Notes

- API key is read from `/home/liks/.config/gws/.env` (`GEMINI_CLAUDE_CODE`)
- For blog OG images, `1200x630` ratio is recommended — mention this in your prompt
- Generated images are stored in `research/` (gitignored) until you manually move them to `src/assets/`
