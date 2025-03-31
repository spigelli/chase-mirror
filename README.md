# Commerce Bank Project

## Developing

Install [bun](https://bun.sh) (a faster alternative to `npm` and `yarn`):

Unix based systems:

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows:

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

Then, install the dependencies:

```bash
bun install
```

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

To create a local test database, install docker then run:

```bash
bun run db:start
```

Make sure that db/setup-db.sh is executable:

```bash
chmod +x ./db/setup-db.sh
```

To populate database with test data:

```bash
bun run db:setup
```

## Documentation Links

To learn more about our dependencies, take a look at the following resources:

- [TypeScript Cheat Sheets](https://www.typescriptlang.org/cheatsheets/)
- [React.js Documentation](https://react.dev/learn) - learn about React.js features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS __V4__](https://tailwindcss.com/) - learn about Tailwind CSS (CSS framework).
