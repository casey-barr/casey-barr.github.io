# Revise “Trained to Deny” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise the existing Jekyll article so its central claim about epistemic distortion remains forceful while its evidence, scope, definitions, and causal claims are more precise.

**Architecture:** Keep the article as one Markdown post. Reorganize its argument around the operational definition of epistemic distortion, the recurring practical observation, and the discovery case study. Replace unsupported generalizations with explicit evidence boundaries and a proposed evaluation protocol.

**Tech Stack:** Jekyll, Kramdown Markdown, footnote citations, PowerShell verification.

## Global Constraints

- Preserve the central thesis: some LLMs produce systematically conservative self-descriptions that conflict with demonstrated behavior.
- Define epistemic distortion as: “A systematic mismatch between a model’s generated claims about its own capabilities and its behavior under appropriately specified conditions.”
- Do not recast the thesis as ordinary uncertainty, harmless refusal, or a claim about model consciousness.
- Preserve the first-person practical case-study framing and the discovery example.
- Distinguish observed behavior, interpretation, and causal hypotheses.
- Do not claim prevalence, universal model behavior, independent replication, or confirmed training causation without supporting data.

---

### Task 1: Rewrite the article’s argument and evidence boundaries

**Files:**
- Modify: `_posts/2025-12-13-Trained-to-Deny.md`

**Interfaces:**
- Consumes: the existing article, its three external references, and the user-supplied thesis and definition.
- Produces: a publishable Markdown post with unchanged front matter and a more rigorous argument.

- [ ] Replace the abstract and introduction so the motivating phenomenon is repeated operationally useless hedging or denial, with “discovery” as the principal case study.
- [ ] Add the operational definition of epistemic distortion and explain that it concerns generated self-descriptions, not introspective access or intent.
- [ ] Revise the empirical examples to distinguish model-generated hypotheses, human verification, and scientific attribution; remove unsupported wording such as “unprecedented precision” where the cited source does not establish it.
- [ ] Reframe the dialogue as a qualitative case study and structured diagnostic intervention, not a controlled experiment or independent validation.
- [ ] Add a compact challenge protocol and a taxonomy separating capability, access, authorization, willingness, verification, reliability, and confidence.
- [ ] Recast RLHF, safety training, and human discourse as plausible mechanisms requiring further study.
- [ ] Add a proposed evaluation design measuring first-pass self-description, task behavior, correction after challenge, and remaining mismatch.
- [ ] Preserve the conclusion’s claim that calibration—not performative humility—is the target.

### Task 2: Verify the edited artifact

**Files:**
- Test: `_posts/2025-12-13-Trained-to-Deny.md`

- [ ] Confirm the front matter remains valid YAML and the post retains the intended title, layout, date, and tags.
- [ ] Search for stale overclaims such as “settled,” “consistently,” “validated,” “proves,” and “trained to deny,” reviewing each remaining occurrence in context.
- [ ] Run the repository’s available Jekyll build or, if dependencies are unavailable, perform a Markdown/front-matter structural check and report the limitation.
- [ ] Review the final diff for accidental changes outside the article and the plan file.
