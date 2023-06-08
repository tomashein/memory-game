# A Memory Game - Animals

## Environment

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
- HeadlessUI/React v1.7.15
- Clsx v1.2.1

### Style Strategy

- TailwindCSS with Forms plugin.
- CSS Modules for encapsulation.
- BEM class naming adapted to modules.

### Commands

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `yarn`          | Install the project dependencies             |
| `yarn dev`      | Start the development server                 |
| `yarn build`    | Clean dist and compiles the production build |
| `yarn lint`     | Runs eslint on all typescript files          |
| `yarn preview`  | Start preview server of dist files           |
| `yarn test`     | Runs tests                                   |
| `yarn coverage` | Runs tests with coverage report              |

### File/Folder Structure

```
├── dist               # Build folder
├── public             # Static assets
├── src                # Source files
│   ├── app            # App entry point, router and machine
│   ├── components     # Reutilizable UI components
│   ├── helpers        # Helpers functions
│   ├── hooks          # Shared hooks
│   ├── libraries      # Shared external libraries
│   ├── styles         # Global stylesheets
│   ├── types          # Declarations and types
│   ├── views          # Main app views
│   └── main.tsx       # Bootstrap file
└── README.md          # This file
```

### Notes

- Development server uses port 5173 (http://localhost:5173).
- Preview server uses port 4173 (http://localhost:4173).
- State is managed through a finite machine.
- Absolute importing with @ alias.
- Responsive design.

### Todo

- Themify tailwind.
- Create submachines.
- Testing.
