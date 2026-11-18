# Dying Design System — Developer Guidelines & Governance

Guidelines for contributing to, extending, and maintaining `@mp/dying`.

---

## 1. Golden Rules of UI Development

1. **Dying is Exclusive:** Application code in `frontend/app/src/app/**` must consume Dying components. Never write raw HTML buttons or inputs where a Dying component exists.
2. **Tokens Over Arbitrary Values:** Never write raw arbitrary Tailwind utility classes (`bg-[#1e1e22]`, `text-[#86868b]`, `border-white/[0.08]`). Always reference semantic tokens (`bg-surface`, `text-text-primary`, `border-border-subtle`).
3. **Keep Generic Components Pure:** Never import application stores (`playerStore`), API clients, or domain routers into `packages/dying/src/components` or `primitives`.
4. **Mandatory Accessibility:** Every interactive component must have:
   - Full keyboard operability (`Enter` / `Space` activation).
   - Standardized `:focus-visible` ring.
   - Required `aria-label` on icon-only buttons.
   - Screen reader announcement of dynamic loading/error states.
5. **No Visual Regressions:** Run `pnpm typecheck`, `pnpm test`, and `pnpm build` before committing changes.

---

## 2. Component Creation Lifecycle

When introducing a new component to Dying:

1. **Verify Need:** Confirm no existing component or composition satisfies the requirement.
2. **Create Component File:** Place under `packages/dying/src/components/<ComponentName>.tsx` or `primitives/`.
3. **Implement TypeScript Contract:**
   - Extend appropriate HTML or Radix attributes.
   - Export props interface `ComponentNameProps`.
   - Forward ref using `React.forwardRef`.
   - Set explicit `displayName = "ComponentName"`.
4. **Style with Tokens:**
   - Use `cn()` utility to merge user `className`.
   - Only use Tailwind `@theme` classes or CSS variables.
5. **Export Publicly:**
   - Add export in component sub-barrel (`components/index.ts` or `primitives/index.ts`).
   - Add export in package root `src/index.ts`.
6. **Write Unit Test:** Add test file in `tests/<ComponentName>.test.tsx`.
7. **Document & Showcase:**
   - Add documentation entry in `docs/dying/COMPONENTS.md`.
   - Add live interactive preview in `frontend/app/src/app/dying/page.tsx`.

---

## 3. Token Modification Process

1. Modify `packages/dying/src/tokens/tokens.json`.
2. Update corresponding TypeScript objects in `packages/dying/src/tokens/index.ts`.
3. Update Tailwind `@theme` and `:root` variables in `packages/dying/theme.css`.
4. Verify contrast ratio against WCAG 2.2 AA (minimum 4.5:1 for normal body text, 3:1 for large text and UI boundaries).
5. Document change in `docs/dying/TOKENS.md`.
