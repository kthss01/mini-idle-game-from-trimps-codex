# Trimps Analysis & Improvement Project Roadmap

## Project Scope and Guiding Principles

This roadmap is designed to analyze and improve the open-source game **Trimps** while preparing it for a high-quality Korean release and long-term maintainability.

Guiding principles:

- Preserve gameplay behavior while modernizing architecture.
- Separate concerns (logic, data, UI, localization, persistence).
- Build automation early (checks, extraction scripts, CI gates).
- Treat localization as a first-class engineering concern, not a final patch.

---

## Phase 1 — Project Analysis

### Objectives

- Understand current architecture, data flow, and runtime behavior.
- Identify technical debt, high-risk modules, and coupling hotspots.
- Establish a baseline for performance, quality, and feature behavior.

### Tasks

1. **Repository and runtime audit**
   - Inventory all key files/modules and their responsibilities.
   - Map startup sequence, game loop, save/load flow, and UI rendering path.
   - Record build/run instructions and dependencies.
2. **Architecture and dependency mapping**
   - Create module dependency graph (logic, UI, config, persistence).
   - Identify global state usage patterns and side-effect-heavy functions.
   - Classify code into domains (combat, economy, upgrades, progression, UI).
3. **Static quality scan**
   - Configure linters and formatting checks (non-blocking at first).
   - Detect dead code, duplicated logic, large functions, and naming inconsistency.
4. **Dynamic behavior baseline**
   - Profile startup time, key loop performance, and save/load latency.
   - Capture representative gameplay scenarios for regression baselines.
5. **Risk and complexity assessment**
   - Rank modules by change risk (complexity × coupling × player impact).
   - Identify "do-not-break" systems requiring strict regression testing.

### Recommended Order

1. Repository/runtime audit
2. Architecture/dependency mapping
3. Static quality scan
4. Dynamic behavior baseline
5. Risk ranking and technical debt backlog generation

### Expected Outputs

- System architecture overview document
- Module ownership/responsibility map
- Technical debt register with severity and suggested remediation
- Baseline metrics report (performance + quality)
- Prioritized refactor candidate list

---

## Phase 2 — Documentation

### Objectives

- Build durable technical documentation for contributors.
- Make system behavior and conventions explicit.
- Reduce onboarding time for engineers and translators.

### Tasks

1. **Documentation framework setup**
   - Create docs structure (`docs/architecture`, `docs/game-systems`, `docs/localization`, `docs/dev`).
   - Define documentation templates (module spec, ADR, glossary, runbook).
2. **Core technical docs**
   - Architecture diagram and narrative.
   - Game systems docs (resources, combat, upgrades, progression, automation).
   - Save data schema and migration/compatibility notes.
3. **Developer documentation**
   - Local setup, debugging workflow, and build/test commands.
   - Coding standards and pull-request checklist.
4. **Decision tracking**
   - Start ADRs for major refactor/localization decisions.
   - Record tradeoffs and rollback strategies.
5. **Documentation governance**
   - Add docs ownership and update policy.
   - Add "docs required" policy for major code changes.

### Recommended Order

1. Documentation framework setup
2. Core technical docs
3. Developer docs
4. ADR process adoption
5. Governance and maintenance policy

### Expected Outputs

- Structured `/docs` portal with templates
- Architecture and system design references
- Contributor onboarding guide
- ADR log for strategic changes
- Documentation maintenance policy

---

## Phase 3 — Localization Preparation (Engineering)

### Objectives

- Make the codebase localization-ready with minimal functional risk.
- Externalize all user-facing text and locale-sensitive formatting.
- Build a scalable i18n workflow for future languages.

### Tasks

1. **String extraction strategy**
   - Audit hardcoded strings in UI, notifications, tooltips, errors, and tutorials.
   - Introduce centralized message catalog(s) with stable keys.
2. **Localization infrastructure**
   - Implement/standardize i18n layer (`t(key, params)` style API).
   - Add fallback strategy (ko-KR → en-US) and missing-key reporting.
3. **Formatting and linguistic support**
   - Replace hardcoded number/date/unit formats with locale-aware utilities.
   - Support pluralization/grammar strategy where needed.
4. **UI readiness updates**
   - Review layouts for text expansion/contraction.
   - Ensure font support for Hangul and proper line-breaking behavior.
5. **Localization workflow automation**
   - Add scripts for extract/validate/merge locale files.
   - Add CI checks for missing keys, unused keys, malformed placeholders.

### Recommended Order

1. String audit and key design
2. i18n API + fallback implementation
3. Format utilities migration
4. UI readiness updates
5. Automation and CI integration

### Expected Outputs

- Complete translatable string inventory
- Locale message catalog structure
- i18n runtime integration and fallback behavior
- Locale QA checklist (layout, fonts, encoding)
- Automated localization validation pipeline

---

## Phase 4 — Korean Translation

### Objectives

- Deliver accurate, consistent, and player-friendly Korean text.
- Preserve gameplay clarity (terms, upgrades, systems, progression cues).
- Maintain translation quality through review and iteration.

### Tasks

1. **Terminology and style foundation**
   - Build Korean glossary for core game terms (resources, combat stats, upgrades).
   - Create Korean style guide (tone, politeness level, spacing, punctuation, transliteration).
2. **Initial translation pass**
   - Translate high-priority UI first (main loop screens, controls, progression prompts).
   - Translate help/tutorial/onboarding content.
3. **Contextual review**
   - In-game validation for truncation, ambiguity, and inconsistent terminology.
   - Adjust strings for readability in constrained UI areas.
4. **Linguistic QA pass**
   - Native speaker review with issue tracking.
   - Resolve placeholder, variable, and formatting issues.
5. **Post-release translation maintenance**
   - Define process for new string intake and versioned translation updates.

### Recommended Order

1. Glossary + style guide
2. Core UI translation
3. Secondary content translation (tooltips/help/lore)
4. In-context review and linguistic QA
5. Final sign-off and maintenance workflow

### Expected Outputs

- `ko-KR` locale files with production-ready strings
- Korean terminology glossary and style guide
- Linguistic QA issue log and resolution report
- Localization sign-off checklist

---

## Phase 5 — Code Refactoring

### Objectives

- Improve maintainability and readability without changing gameplay behavior.
- Reduce coupling and global state dependencies.
- Enable safer future feature development.

### Tasks

1. **Refactor strategy and guardrails**
   - Define refactor boundaries and non-functional goals.
   - Establish behavior-lock tests for critical game systems.
2. **Low-risk structural cleanup**
   - Split oversized files/functions.
   - Normalize naming conventions and remove dead code.
3. **Domain-driven modularization**
   - Isolate subsystems (combat, economy, progression, save/load, UI).
   - Introduce clearer interfaces between modules.
4. **State management improvement**
   - Encapsulate mutable global state behind controlled APIs.
   - Separate pure calculations from side effects.
5. **Data/schema hardening**
   - Formalize config and save schema validation.
   - Add migration helpers for backward compatibility.
6. **Incremental quality hardening**
   - Enforce linting/formatting rules progressively.
   - Add complexity thresholds and code health metrics.

### Recommended Order

1. Guardrails + behavior-lock tests
2. Low-risk cleanup
3. Module boundary refactor by domain priority
4. State management improvements
5. Schema hardening
6. Quality gates tightening

### Expected Outputs

- Refactored module structure with clear boundaries
- Reduced global coupling and smaller function complexity
- Stable save/load behavior with validation and migration safety
- Updated engineering standards and code health dashboard

---

## Phase 6 — Testing and Quality Assurance

### Objectives

- Ensure gameplay correctness and localization reliability.
- Catch regressions early via automation.
- Build confidence for iterative refactoring and live updates.

### Tasks

1. **Test strategy design**
   - Define testing pyramid (unit, integration, end-to-end, localization QA).
   - Identify critical player journeys and game-economy invariants.
2. **Automated test implementation**
   - Unit tests for core formulas and progression logic.
   - Integration tests for save/load, upgrade purchase flow, combat outcomes.
   - Snapshot/contract tests for localized string rendering where useful.
3. **Regression and balance verification**
   - Create deterministic simulation scenarios for economy/combat balance checks.
   - Track baseline outputs for comparison after refactors.
4. **Localization QA automation**
   - Detect missing/unresolved keys and placeholder mismatches.
   - Add pseudo-localization test mode to expose layout issues.
5. **CI/CD quality gates**
   - Enforce mandatory checks before merge.
   - Publish test, lint, and localization quality reports.
6. **Manual exploratory QA**
   - Structured playtest checklists for Korean UX and progression clarity.

### Recommended Order

1. Test strategy + critical journey definition
2. Unit/integration foundation
3. Regression simulation baselines
4. Localization automation checks
5. CI quality gates
6. Ongoing manual exploratory QA

### Expected Outputs

- Automated test suite with coverage for critical systems
- Regression baseline artifacts and comparison reports
- Localization QA automation reports
- CI pipeline with merge-blocking quality gates
- Manual playtest reports and defect backlog

---

## Cross-Phase Execution Plan (Suggested Timeline)

- **Milestone A (Weeks 1–3):** Phase 1 complete + docs scaffolding started.
- **Milestone B (Weeks 3–6):** Phase 2 core docs complete + Phase 3 i18n foundation.
- **Milestone C (Weeks 6–9):** Phase 3 finalized + Phase 4 Korean translation pass 1.
- **Milestone D (Weeks 9–13):** Phase 5 refactoring waves with parallel Phase 6 automation.
- **Milestone E (Weeks 13+):** Stabilization, localization polish, release readiness.

---

## Delivery and Governance Recommendations

- Use a **single prioritized backlog** tagged by phase and risk.
- Adopt **definition of done** requiring tests + docs + localization impact check.
- Run weekly triage for refactor risk and translation QA findings.
- Track KPIs:
  - % strings externalized
  - Korean translation completion rate
  - test pass rate and coverage on critical modules
  - mean PR review cycle time
  - number of regressions per release

This roadmap is intended to be executed iteratively: each phase should produce assets that directly reduce risk in the next phase while supporting ongoing game development.
