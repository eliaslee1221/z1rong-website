# GitHub + Cloudflare Pages 自動部署

## GitHub repository

- 建議名稱：`z1ron-portfolio`
- Production branch：`main`
- Visibility：Public 或 Private 皆可

建立 repository 時不要勾選新增 README、`.gitignore` 或 License，避免與本機首次提交衝突。

## Cloudflare Pages

1. 開啟 Cloudflare Dashboard → Workers & Pages。
2. 選擇 Create application → Pages → Connect to Git。
3. 授權並選擇 GitHub repository `z1ron-portfolio`。
4. 使用以下建置設定：

| 設定 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

5. 完成第一次部署後，進入 Custom domains，依序加入：
   - `z1ron.com`（主要網域）
   - `www.z1ron.com`（可重新導向主要網域）

由於 `z1ron.com` 已由 Cloudflare 管理，Custom Domain 流程通常會自動建立需要的 DNS 記錄與 SSL 憑證。

## 後續更新

每次更新並推送至 `main` 後，Cloudflare Pages 會自動重新建置與發布。Pull Request 也可以產生獨立預覽網址，確認後再合併到正式環境。

