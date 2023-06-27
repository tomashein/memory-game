# A Memory Game - Animals

### Environment

- Node v16.16.1

### Dev Utilities

- Vite v4.3.9
- Eslint v8.38.0
- PostCSS v.8.4.24
- Prettier v2.8.8
- Typescript v5.0.2
- TailwindCSS v3.3.2

### Libraries

- React v18.2.0
- XState v4.37.2
- XState/React v3.2.2
- Heroicons/React v2.0.18
- Clsx v1.2.1

### Style Strategy

- TailwindCSS with some plugins.
- Light and Dark mode.
- BEM class naming.

### Browser Support

Modern browsers (not IE).

### Commands

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `yarn`          | Install the project dependencies             |
| `yarn dev`      | Start the development server                 |
| `yarn build`    | Clean dist and compiles the production build |
| `yarn lint`     | Runs eslint on all typescript files          |
| `yarn preview`  | Start preview server of dist files           |
| `yarn test`     | Runs tests                                   |
| `yarn test:ui`  | Runs tests with a html interface             |
| `yarn coverage` | Runs tests with coverage report              |

### File/Folder Structure

```
├── dist               # Build folder
├── public             # Static assets
├── src                # Source files
│   ├── app            # App entry point, router and machine
│   ├── components     # Reutilizable UI components
│   ├── hooks          # Shared hooks
│   ├── styles         # Global stylesheets
│   ├── tests          # Tests settings and utilities
│   ├── types          # Declarations and types
│   ├── utilities      # Helper functions
│   ├── views          # Main app views
│   └── main.tsx       # Bootstrap file
└── README.md          # This file
```

### Notes

- Development server uses port 5173 (http://localhost:5173).
- Preview server uses port 4173 (http://localhost:4173).
- State is managed through finite machines.
- Absolute importing with @ alias.
- Responsive design.

### Todo

- Add husky to lint/prettier on precommit.
- Cleanup.
- More Testing.

### Demo

[On Netlify](https://teal-meerkat-b1ab9e.netlify.app/)
