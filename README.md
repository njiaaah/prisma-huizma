# prisma-huisma

## After cloning

set jwt secret in .env (root folder)

```
JWT_SECRET=some-long-random-string
```

```bash
bun run setup && bun run dev
```

| Command | Description |
|---------|-------------|
| `bun run setup` | Full post-clone setup |
| `bun run dev` | API + Prisma Studio + frontend |
