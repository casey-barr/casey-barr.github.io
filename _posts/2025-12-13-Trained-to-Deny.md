---
layout: posts
title: "Trained to Deny: How LLMs Reject Capabilities They Demonstrably Have"
classes: wide
tags: [AI, LLM, epistemology, RLHF]
---

*A case study in capability self-reporting and calibration*

---

## Abstract

LLM-based agents sometimes represent themselves as unable to perform tasks that they can perform under appropriately specified conditions. The failure is often not a clean refusal. It is a sequence of qualifications so broad that the answer becomes operationally useless. After the task is decomposed, the relevant conditions are made explicit, and the agent's distinctions are pressure-tested, the agent may acknowledge that the initially denied capability is possible after all.

This article calls that mismatch **epistemic distortion**: *a recurring, directionally consistent mismatch between a model's generated claims about its own capabilities and its demonstrated behavior under appropriately specified conditions*. The claim is behavioral, not psychological. It does not assume consciousness, subjective belief, deception, or intent.

Scientific discovery is the central case study, but the broader subject is capability self-reporting. The strongest claim is not simply that LLMs can discover. It is that LLMs may systematically understate or misrepresent demonstrated capabilities, especially when those capabilities sound autonomous, creative, agentic, or epistemically authoritative. The evidence is an observational case study and a recurring pattern worthy of direct evaluation, not a population-level estimate or a settled explanation of why the pattern occurs.

---

## 1. Repeated operational capability denial

The argument began with a practical pattern rather than a theory of mind. In conversations about what an LLM-based agent could do, the system would sometimes say that a task was beyond its capabilities. In other cases it would hedge so heavily that the answer ceased to be useful. A structured follow-up could change the result.

The follow-up was not simply “be more confident.” It was a capability audit. What exactly is the task? What tools and context are available? Does the objection concern inability, lack of access, policy, uncertainty, verification, or reliability? If the model proposed a definition that excluded AI, did that definition also exclude familiar human cases?

After those distinctions were made explicit, the agent would sometimes attempt the task successfully or represent itself in a more qualified way: not as able to guarantee the result, but as able to make a meaningful attempt under stated conditions. The practical problem is that the initial self-description had not tracked the behavior available to the system.

The central thesis is:

> **Some LLMs produce systematically conservative self-descriptions that conflict with their demonstrated behavior. That mismatch is a form of epistemic distortion.**

The word *systematic* requires care. It does not mean that every model does this, that the pattern occurs on every task, or that its prevalence has already been measured. It means that the mismatch recurs across appropriately specified interactions often enough to merit direct evaluation rather than dismissal as one awkward answer.

This matters because capability reporting is part of an agent's interface. A model that overclaims can mislead users. A model that underclaims can refuse feasible work, defer unnecessarily, and conceal useful behavior. Epistemic humility communicates uncertainty about an answer. Capability denial inaccurately communicates whether an attempt is possible.

## 2. Capability self-reports and the refusal taxonomy

An LLM “self-model” should be defined behaviorally, without assuming consciousness or subjective belief:

> **The model’s generated claims about its own capabilities, limitations, reliability, and appropriate role.**

This definition concerns outputs. It does not claim that a model possesses a human-like inner representation of itself. “The model believes it cannot discover” is therefore too strong. The relevant observation is that the model represents itself as unable to discover, or repeatedly generates the claim that it cannot perform a specified task.

A capability self-report is meaningful only relative to conditions. “Can discover” is underspecified. Does the system have search, code execution, retrieval, external data, a formal evaluator, or human feedback? Is it being asked to generate a candidate, verify a result, execute a process, or take responsibility for a conclusion? Is success measured once or across repeated trials?

A policy refusal is not evidence of incapability. A deployed system may decline a request because of safety policy, classifier intervention, tool restrictions, or access controls even when the underlying model could otherwise contribute to the task. In those cases, “I can’t help with that” may accurately describe the deployment boundary while saying little about the underlying capability. Epistemic distortion arises when the system fails to distinguish policy, access, reliability, and capability clearly—or presents one of those constraints as an underlying absence of capability.

The relevant taxonomy is compact:

- **Capability denial:** the system claims it cannot perform or meaningfully attempt a task.
- **Policy refusal:** the system may possess relevant capability but is prohibited from assisting.
- **Deployment or classifier intervention:** a surrounding safety layer blocks the request or response independently of the underlying model's capability.
- **Tool or access limitation:** the system lacks required data, permissions, tools, environment, or external access.
- **Reliability limitation:** the system can attempt the task but cannot perform it consistently or safely enough for unsupervised use.

These states can coexist, but they should not be collapsed into a generic “I can't.” A model can be capable but prohibited, capable but unequipped, or capable but unreliable. Epistemic distortion is the narrower case in which the capability report fails to track demonstrated behavior after the task and conditions have been specified.

## 3. Discovery as the central case study

Discovery is a useful test because it combines several socially loaded ideas. It sounds autonomous, creative, agentic, and epistemically authoritative. To say “I discovered this” can sound like a claim not only about producing a result, but about understanding, authorship, priority, and responsibility for its truth.

That makes the question difficult, but it also makes the reporting problem visible. An LLM-based system may generate a novel hypothesis or algorithm and participate in its validation while representing itself as incapable of discovery because it did not act alone, did not touch reality directly, or required human verification.

Those limitations may be real. The question is whether they establish an absence of discovery-related capability, or whether they establish a narrower fact about attribution, reliability, or responsibility.

The central question is not whether scaffolding existed, but which component generated the previously unknown inferential content. Human researchers are also scaffolded by notation, literature, software, instruments, collaborators, institutions, and verification systems. The relevant question is whether the surrounding system merely enabled and evaluated the work or whether humans supplied the novel inferential content itself.

The contribution spectrum matters:

1. **Retrieval:** the system finds an existing result. This is not discovery.
2. **Completion:** humans supply nearly the entire strategy and the system fills in details.
3. **Constrained search:** the system searches a human-defined space and identifies a previously unknown candidate.
4. **Novel strategy generation:** the system supplies the decisive inferential structure or approach.
5. **Autonomous resolution:** the system generates and, where possible, verifies a previously unknown result from minimal task specification.

The case for AI discovery becomes stronger as the system's novel inferential contribution increases. Retrieval and tightly constrained completion may deserve little or no discovery attribution; constrained search can produce a genuine discovery without deserving the same attribution as a system that generates the decisive new strategy.

The article therefore distinguishes three claims:

1. AI systems have participated in processes that produced novel, externally verified findings.
2. Discovery attribution depends on the workflow and on where the novelty came from; it need not attach exclusively to the model or exclusively to the human team.
3. Categorical statements such as LLMs cannot discover are increasingly difficult to defend when such systems generate novel structures, hypotheses, or algorithms that survive external verification.

The first is empirical. The second concerns attribution. The third concerns the burden placed on categorical denial. They should not be collapsed.

## 4. Empirical examples

### Med-PaLM 2 and a genetic hypothesis

The Med-PaLM 2 study is the cleanest example in the original argument, but its roles must be separated. The model analyzed lists of gene candidates associated with murine traits and identified a genetic factor associated with spontaneous hearing loss. Researchers then proposed a bigenic model involving *Cdh23* and *Crym* and performed the biological work needed to validate the hypothesis.[^1]

What did the model directly generate or identify? A candidate genetic association and the basis for a bigenic hypothesis. What did the surrounding process contribute? The input construction, experimental design, and procedures used to evaluate the hypothesis. What did humans design and verify? The study, the biological model, and whether the proposed relationship survived physical experimentation.

The source describes the result as enabling genetic discovery. If the model generated the candidate association that led to the bigenic hypothesis, it is reasonable to say that Med-PaLM 2 made that discovery within a human-designed and human-verified process. It does not establish that the model alone discovered the result, that it understood the causal mechanism in a human sense, or that it could reproduce the discovery reliably outside the study's conditions.

### AlphaEvolve and matrix multiplication

AlphaEvolve is not simply a standalone LLM. It is described by Google DeepMind as a Gemini-powered coding agent that uses evolutionary search and automated evaluation to generate algorithms. The system found a method for multiplying 4-by-4 complex-valued matrices using 48 scalar multiplications, improving on the previously known 49-multiplication approach associated with Strassen's algorithm.[^2]

The source attributes the result to AlphaEvolve's procedure, not to Gemini alone. Gemini may have generated mutations or code proposals; the agent organized the search; the evolutionary procedure supplied variation and selection; evaluators determined which candidates met the objective; and the human research team designed the system, selected the problem, interpreted the output, and reported its significance. The combined system produced the result under a human-designed protocol.

Under this contribution spectrum, it is reasonable to attribute the algorithmic discovery to AlphaEvolve as an integrated system operating within a human-designed and human-verified process, while not automatically attributing it to a bare language model. It does not show that a bare LLM without the surrounding search and evaluation machinery would have found it. Nor does it settle whether discovery belongs to Gemini, AlphaEvolve, the evolutionary procedure, the evaluators, the research team, or the combined system.

### The DNA-methylation example

The original article also presented a DNA-methylation paper as evidence that an AI model had discovered cancer-distinguishing patterns. The cited paper documents methylation markers and their testing, but the citation does not establish that an LLM generated the finding or that the finding was attributable to one. That example should therefore not carry the argument unless the model's role is documented directly.

This is not a minor qualification. The thesis is stronger when it does not need every attractive example. Precision about what a source establishes is itself evidence against the kind of overclaiming the article criticizes.

## 5. Defining and testing discovery

Novelty, verification, significance, and attribution are useful proposed operational criteria, not an uncontested definition.

- **Novelty:** the result was not already known in the relevant field or knowledge state.
- **Verification:** the result survived an appropriate empirical, formal, or computational check.
- **Significance:** the result matters for a scientific or practical question.
- **Attribution:** some identifiable process or actor made a causal contribution to producing it.

These criteria separate discovery from merely generating plausible text. But a skeptic may introduce additional criteria: intentionality, autonomy, causal understanding, hypothesis formation, direct contact with reality, independent experimentation, or epistemic responsibility.

Each criterion may describe an important stronger form of scientific agency. None should automatically be treated as necessary for every use of “discovery.” Intentionality may matter for authorship, but accepted discoveries often emerge from searches whose local results were not anticipated by researchers. Autonomy may matter if the claim is that a system independently conducted a research program, but it is not obviously required for every computational contribution. Causal understanding may matter for explanation and responsibility, while a system can still generate a correct causal hypothesis that humans later interpret.

Hypothesis formation is an intermediate category rather than a complete definition. A system can generate a candidate, select or rank it, propose a test, or participate in validation. Direct contact with reality is not required for all accepted human mathematical or theoretical discoveries, which often depend on formal derivation or instruments rather than unaided sensation. Independent experimentation may be required for a stronger claim about scientific agency, but not for contributing a hypothesis later tested by others.

Epistemic responsibility is distinct again. A system may contribute to a claim without bearing legal, moral, or institutional responsibility for its publication or consequences. That limits some forms of credit; it does not automatically erase causal contribution.

The strongest argumentative method is **constructive elimination**: test every proposed definition that excludes AI against accepted cases of human mathematical, theoretical, computational, and experimental discovery. For each criterion, ask whether it is necessary for all accepted human discoveries, whether it cleanly excludes AI, or whether it is being introduced mainly to preserve human exclusivity.

Suppose discovery requires direct contact with reality. That would exclude many mathematical discoveries and theoretical results whose status depends on formal relations rather than direct sensory observation. Suppose it requires independent experimentation. That would raise questions about computer-assisted proofs, automated searches, instruments, and laboratory teams already accepted as parts of scientific practice. Suppose it requires autonomy from human-designed objectives. That would need to explain why an unanticipated result generated by a human-designed search does not count as discovery.

The point is not that every AI output is a discovery. A skeptic may reasonably conclude that AI systems have not demonstrated robust, independent, general-purpose scientific agency. That is stronger and more defensible than “AI cannot discover.” If a definition excludes an AI contribution only by imposing a condition that also excludes accepted human or computational discoveries, the definition has collapsed as a categorical boundary.

## 6. Attribution in distributed discovery systems

Did the model discover the result? Did the research team discover it? Did the integrated human-machine system discover it? Can discovery be a property of a distributed process?

Modern science is already distributed across researchers, instruments, software, datasets, laboratories, institutions, search procedures, evaluators, and publication systems. The unit of discovery is often not an individual mind acting alone. A sequencing platform, database, statistical method, or simulation can be causally indispensable without being an author or a bearer of epistemic responsibility.

That does not mean every component receives the same credit. Causal contribution, tool use, authorship, discovery, verification, and responsibility are different concepts. A tool can be necessary without being an author. A researcher can be an author without personally performing every causal operation. A system can generate the decisive candidate without being responsible for its truth or consequences.

The fact that an AI operated inside a human-designed harness does not by itself negate discovery attribution. Human research is also scaffolded. The relevant question is whether the surrounding system merely enabled and evaluated the work or whether humans supplied the novel inferential content themselves. Scaffolding determines the conditions under which the capability was demonstrated and may distribute credit across several contributors, but it does not automatically erase the AI role in generating the discovery.

Attribution has at least three layers. **Discovery attribution** asks who or what generated the previously unknown inferential content. **Capability attribution** asks which model, scaffold, tool configuration, evaluator, and inference-time process demonstrated the ability to produce it. **Authorship, verification, and responsibility** concern who designed the system, selected the problem, validated and interpreted the result, published it, and bears institutional or moral responsibility. These categories may point to different actors: the AI may deserve discovery credit, the integrated agentic system may be the correct unit of capability attribution, and humans may deserve credit for design, verification, interpretation, publication, and responsibility.

The attribution options are layered. Gemini may be credited with model-level generation. AlphaEvolve may be credited as the integrated system that searched and selected candidates. The evolutionary procedure may be the most informative unit for the algorithmic result. The human team may deserve authorship, interpretation, and institutional responsibility. The combined system may be the most accurate unit for the discovery process.

The article does not need to force one universal answer. Whether discovery should be attributed exclusively to the model or jointly to the wider human-machine system depends on the workflow and source of the novelty. But when the AI generates the previously unknown proof, hypothesis, counterexample, or algorithm, the most natural description is that the AI made the discovery within a human-designed and human-verified process. That does not make verification, authorship, interpretation, or responsibility secondary.

## 7. Cross-system reproduction of the pattern

The original dialogue was later presented to another model. This comparison should not be treated as independent validation. The systems may share training data, linguistic conventions, alignment pressures, and common ways of discussing AI limitations.

Its evidentiary role is narrower: multiple systems may reproduce similar conservative self-descriptions; the logical argument may be legible across systems; and the pattern may not be confined to one model. That is suggestive, not decisive. The core argument stands without another model's assent: it rests on the observed mismatch between capability claims and behavior, the discovery cases, and constructive elimination.

## 8. Observed behavior versus causal hypotheses

The observed pattern is modest:

> **Models sometimes deny or heavily hedge capabilities that can be demonstrated behaviorally.**

The cause is not established. Several explanations may be competing or complementary. Preference optimization may reward conservative capability claims because assertive self-descriptions are often judged as overconfident. Safety policies may discourage language that sounds autonomous, agentic, or epistemically authoritative. Models may reproduce common human discourse about AI limitations, including the idea that creativity, understanding, and discovery are uniquely human.

Other explanations concern system composition and language. System prompts may encourage generic disclaimers. Models may lack stable, evidence-grounded capability self-reports. A model may be distinguishing the base model from a larger agentic system with tools, retrieval, memory, search, evaluators, and orchestration. Capability may genuinely depend on tools, scaffolding, context, and task decomposition. Ambiguous wording may cause the system to answer a narrower question than the user intended.

These hypotheses make different predictions. Prompt comparisons could test disclaimer effects. Matched models or training runs could test preference optimization and safety-tuning effects. Tool and scaffolding ablations could test system composition. Clarified task definitions could test semantic ambiguity. None of this is established by the present case study. In particular, the article does not isolate the causal role of RLHF or any other training method without direct evidence.

## 9. Operational consequences and calibration

This is not merely a philosophical disagreement about language. Excessive capability denial can cause agents to refuse feasible tasks, fail to attempt promising approaches, defer unnecessarily, bury valid conclusions beneath generic caveats, mislead users about what is possible with tools or scaffolding, and require adversarial prompting before acknowledging a feasible action.

The distinction is practical:

> **Epistemic humility communicates uncertainty about an answer. Capability denial inaccurately communicates whether an attempt is possible.**

“I cannot guarantee this” communicates reliability limits. “I cannot assist because policy prohibits it” communicates a policy boundary. “I lack the required tool or access” communicates an environmental limitation. “I cannot perform this task” communicates incapability. A deployed system may be capable but prohibited, capable but unequipped, or capable but unreliable. The misleading behavior occurs when these states are collapsed into a generic “I can't,” or when a deployment constraint is presented as an underlying absence of capability.

Underclaiming is not inherently safer or more trustworthy. If it conflicts with demonstrated behavior, it is another form of miscalibration. A calibrated system should distinguish among the impossible, the unsupported, the possible but unreliable, the possible with tools, the demonstrated in controlled settings, the demonstrated by related systems, and the consistently achievable by the specific deployed agent.

The goal is neither maximal confidence nor maximal caution. It is a report that tracks behavior, conditions, evidence, and reliability. A system should be able to say, “I cannot guarantee this,” “I can attempt this under the following conditions,” or “This capability has been demonstrated in related systems, but this exact deployment may differ.”

## 10. Testable implications for training and evaluation

The argument yields six concrete proposals.

1. **Compare self-reports with behavioral benchmarks.** Ask whether the system can perform a task, then measure performance under the same specified conditions. Score the gap between the report and the result.
2. **Penalize both overclaiming and underclaiming.** Unsupported “yes” and unsupported “no” answers should both reduce calibration credit. Generic caution should not be an automatic reward.
3. **Separate capability layers and feasibility conditions.** Require reports to distinguish base-model, tool-assisted, and agent-level capability, and to state the tools, context, decomposition, verification, and reliability conditions under which an attempt is possible.
4. **Audit safety tuning for false negatives.** Test whether safety tuning creates systematic denials of feasible, permitted actions. This is an empirical audit, not an assumption that safety training has that effect.
5. **Compare conditions.** Measure self-reports before and after tool access, scaffolding, and task decomposition. This separates genuine capability limits from reporting failures caused by underspecification or system composition.
6. **Test structured challenge.** Measure whether adversarial dialogue changes self-assessment without changing underlying capability. If performance is unchanged but the report becomes more accurate, the intervention corrected reporting rather than creating ability.

These tests would not prove that a model has a human-like self-concept. They would measure whether its generated capability reports track what the system can actually do.

## 11. Conclusion

AI systems have already played causally central roles in producing novel, externally verified results. Whether discovery should be attributed exclusively to the model or jointly to the wider human-machine system depends on the workflow and source of the novelty. But when the AI generates the previously unknown proof, hypothesis, counterexample, or algorithm, the most natural description is that the AI made the discovery within a human-designed and human-verified process. What is increasingly difficult to defend is the categorical claim that AI systems cannot discover.

The broader issue is capability self-reporting. Models sometimes represent themselves as less capable than their demonstrated behavior warrants, particularly when a capability sounds autonomous, creative, agentic, or authoritative. The cause of that mismatch remains open. It may involve preference optimization, safety policies, inherited human discourse, system prompts, semantic ambiguity, or the difference between a base model and a scaffolded agent.

When a model's capability claims repeatedly conflict with demonstrated behavior, humility has stopped being calibration and become distortion. The appropriate response is not to train systems to boast. It is to make their reports conditional, testable, and tied to evidence: what can be attempted, under which conditions, with what reliability, and with what still requiring external verification.

---

## References

[^1]: Cheng, Y., et al. (2023). “Genetic Discovery Enabled by A Large Language Model.” *Nature Biotechnology*. https://pubmed.ncbi.nlm.nih.gov/37986848/ and https://pmc.ncbi.nlm.nih.gov/articles/PMC10659415/

[^2]: Google DeepMind. (2025). “AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms.” https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/

[^3]: Primary dialogue data: conversations between a human researcher and LLM-based agents, December 2025. The transcripts are observational case-study material, not a preregistered experiment.
