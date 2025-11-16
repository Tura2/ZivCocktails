# Database Connection

Local PostgreSQL database configuration used by the backend Prisma client.

- **DB name:** `ziv_cocktails`
- **Default user:** `postgres`
- **Host:** `localhost`
- **Port:** `5432`
- **Connection string (example):**

```bash
postgresql://postgres:YOUR_PASSWORD@localhost:5432/ziv_cocktails?schema=public
```

Use the URL above (swap `YOUR_PASSWORD` with your actual local password) when configuring VS Code SQL extensions or external tools such as TablePlus and DBeaver.

The same URL is stored in `backend/.env` under:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ziv_cocktails?schema=public"
```
