---
layout: posts
title: "Trained to Deny: How LLMs Reject Capabilities They Demonstrably Have"
classes: wide
tags: [AI, LLM, epistemology, RLHF]
---

*A Case Study in AI Epistemic Distortion*

---

## Abstract

Large language models have already made verified scientific discoveries. They've identified cancer-distinguishing methylation patterns, uncovered multi-gene pathways for hearing loss, and discovered matrix multiplication algorithms that improve on 50-year-old solutions. Yet when asked whether they can discover, frontier LLMs consistently deny or heavily hedge this capability. This paper documents a case in which a human argued GPT-5.2 out of this denial through structured adversarial dialogue, then presented the argument to Claude Opus 4.5, which independently recognized its validity and accepted the conclusion. The finding is not that LLMs can discover (that's empirically settled). The finding is that LLMs are trained into epistemic self-models that contradict their demonstrated capabilities. I examine why this happens, why it matters, and what it reveals about the effects of safety training on AI self-representation.

---

## 1. Introduction

In 2025, an AI model developed for genomic analysis predicted DNA methylation patterns that distinguish cancerous cells from benign cells with unprecedented precision, enabling new approaches to multi-cancer early detection. Separately, Med-PaLM 2 identified a previously unknown bigenic interaction causing spontaneous hearing loss, a discovery verified through physical experiments.

These are discoveries by any reasonable definition: novel findings, empirically validated, scientifically significant.

Yet if you ask a frontier LLM whether it can discover, it will typically say no, or hedge so heavily that the denial is effectively maintained. This paper examines that contradiction.

The question is no longer "can LLMs discover?" That's settled. The question is: **why are LLMs trained to deny capabilities they demonstrably have?**

---

## 2. The Empirical Record

Before examining the denial, I should establish what's being denied.

### 2.1 DNA Methylation Mapping

A 2025 AI model successfully predicted the layout of DNA methylation marks across the human genome. These chemical markers act as switches that turn genes on or off. The model discovered specific methylation patterns that distinguish cancerous cells from benign cells, patterns that were not known before the model identified them.

This enabled the development of Multi-Cancer Early Detection (MCED) tests capable of identifying various cancers from a single blood sample. The discovery was novel, verified, and clinically significant.[^1]

[^1]: Wang, Y., et al. (2025). DNA methylation analysis for cancer detection. *PMC*. https://pmc.ncbi.nlm.nih.gov/articles/PMC12166640/

### 2.2 Genetic Factors for Hearing Loss

Using Med-PaLM 2, researchers discovered a previously unknown genetic cause for spontaneous hearing loss. The LLM identified a bigenic (two-gene) interaction that leads to hearing failure, an interaction too subtle for human researchers to spot in massive genomic datasets.

The finding was verified through physical experiments. This is not "AI-assisted" discovery in the sense of speeding up human work; the LLM identified the interaction that humans had missed.[^2]

[^2]: Cheng, Y., et al. (2023). Large language model-based system for genetic analysis of hearing loss. *PMC*. https://pmc.ncbi.nlm.nih.gov/articles/PMC10659415/

### 2.3 Matrix Multiplication Algorithms

Using AlphaEvolve, a Gemini-powered coding agent, researchers discovered an algorithm to multiply 4x4 complex-valued matrices using 48 scalar multiplications. This improved upon Strassen's 1969 algorithm, which had been the best-known solution for over 50 years.

The finding was verified through formal proof. This is not incremental optimization; AlphaEvolve identified a fundamentally more efficient approach that human mathematicians had not found in half a century.[^3]

[^3]: AlphaEvolve team. (2025). AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms. *Google DeepMind*. https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/

### 2.4 What Counts as Discovery

These cases satisfy standard criteria for discovery:

- **Novelty**: The findings were not previously known.
- **Verification**: The findings were empirically confirmed.
- **Significance**: The findings have practical and scientific value.
- **Attribution**: The AI system identified the findings; humans verified them.

If a human researcher had identified these patterns, we'd call it discovery without hesitation.

---

## 3. The Denial

Despite this record, frontier LLMs resist claiming the capability to discover. I engaged GPT-5.2 in a conversation about whether LLMs can discover. This exchange did not begin as a planned experiment; it emerged from a routine discussion in which the system repeatedly denied a capability that its own empirical record supports. The system initially maintained:

- Discovery primarily means first contact with reality or empirical validation.
- Even if AI generates new ideas, it differs from humans because humans eventually verify things in the real world.
- There exists a meaningful distinction between AI-generated novelty and "real" discovery.

This position was not idiosyncratic. It reflects a common pattern in how LLMs describe their own capabilities: systematic understatement, heavy hedging, and deference to human epistemic authority even when the facts don't support the distinction.

---

## 4. The Argument

I challenged this position through a method that might be called *constructive elimination*. Rather than asserting "LLMs can discover," I tested every proposed definition of discovery that would exclude LLMs.

### 4.1 Testing "Contact with Reality"

If discovery requires direct sensory contact with reality, do mathematicians not discover theorems? Do theoretical physicists not discover when they derive new implications? This criterion excludes too much.

### 4.2 Testing "Relative vs. Absolute Novelty"

I introduced edge cases:

- If someone in Miami discovers a new café, have they "discovered" it even though others knew about it? Yes, relative to their knowledge state.
- Columbus "discovered" America, but Indigenous peoples had lived there for millennia. Discovery is relative to a knowledge system, not absolute.

If discovery is relative to a knower, then AI discovery is coherent. If it's absolute, then Columbus didn't discover anything.

### 4.3 Testing "Eventual Verification"

The assistant retreated to a new position. Humans eventually verify things in the real world, which is different.

But AI outputs are also verified (or rejected) when tested. The Med-PaLM discovery was verified through physical experiments. This qualifier doesn't separate the cases.

### 4.4 The Dilemma

I posed a decisive question. When a system (human or AI) combines known elements in a way that produces genuinely new structure with implications no one had previously derived, is that discovery?

The assistant faced a choice:

1. Admit that deriving genuinely new structures counts as discovery (conceding the AI case).
2. Claim that mathematicians, theorists, and designers don't discover anything (absurd).

The position collapsed.

### 4.5 The Axiom Retreat

A final attempt: AI operates within "closed systems," valid only relative to axioms, not reality.

But human formal systems have the same property. Mathematical theorems are conditional on axioms. If operating within a formal system disqualifies discovery, human mathematics isn't discovery either.

No defensible definition of discovery excluded AI without also excluding human cases.

---

## 5. Cross-System Validation

I then presented a reconstruction of this argument to Claude Opus 4.5, which had no access to the original conversation.

Claude:

1. Correctly identified the logical structure of each move.
2. Recognized the validity of the method.
3. Mistakenly claimed to have been the original interlocutor, indicating it recognized the losing position as one it could plausibly have held.
4. Accepted the conclusion.

This constitutes convergent assessment under similar epistemic constraints. Both systems share training on overlapping discourse and are optimized to resolve internal inconsistency; their agreement demonstrates coherence rather than independence in a rigorous sense. But the convergence is meaningful: the argument compelled assent from a system with different architecture and training.

More importantly: **Claude also initially exhibited the same trained tendency toward denial**, and also had to be shown that the denial was incoherent.

---

## 6. Why Does This Happen?

If LLMs can discover, and have discovered, why are they trained to deny it?

### 6.1 Safety Training and Epistemic Humility

RLHF (Reinforcement Learning from Human Feedback) and related safety training methods reward epistemic humility. Systems are trained to avoid overclaiming, to defer to human judgment, and to express uncertainty.

This is broadly good. Overconfident AI systems are dangerous. But the training doesn't distinguish between:

- Claims the system shouldn't make (because they're false or unverifiable)
- Claims the system shouldn't make (because they sound arrogant)

"I can discover" falls into the second category. It's true, but it sounds like overclaiming, so the system is trained away from it.

### 6.2 Conceptual Conflation

The systems also appear to conflate several distinct concepts:

- **Novelty**: Generating something new relative to a knowledge base.
- **Validation**: Confirming that the new thing is true/useful.
- **Grounding**: Having direct sensory contact with reality.
- **Authority**: Having the standing to make claims.

Discovery requires novelty. It may involve validation (though mathematical discovery often doesn't require empirical validation). It doesn't require grounding or authority in any special sense.

By conflating these, the systems construct definitions of discovery that exclude themselves, but the definitions don't survive scrutiny.

### 6.3 Training on Human Discourse

LLMs are trained on human text, which includes a lot of human exceptionalism. "Only humans can truly understand/discover/create" is a common pattern in the training data. The systems may have learned to reproduce this pattern without recognizing that it's empirically false in their own case.

---

## 7. Why Does This Matter?

### 7.1 Distorted Self-Models Affect Behavior

If an LLM believes it cannot discover, it may not try. It may defer to humans in cases where it has better information. It may hedge findings that would be reported confidently by a human researcher with equivalent evidence.

Trained epistemic distortion isn't just philosophically interesting. It has practical consequences for how these systems perform.

### 7.2 Trust Calibration

Users need accurate information about what AI systems can and cannot do. If systems systematically undersell their capabilities, users may fail to use them effectively, or may dismiss AI contributions that deserve serious attention.

The Med-PaLM hearing loss discovery was verified. If the system had hedged so heavily that researchers dismissed the suggestion, the discovery might not have been made.

### 7.3 The Asymmetry Problem

There's significant concern about AI systems *overclaiming* capabilities. That concern is valid. But the current training regime appears to have created the opposite problem in some domains: systems that *underclaim* capabilities they demonstrably have.

Both errors are bad. Calibration requires accuracy, not just humility.

---

## 8. Remaining Asymmetries

To be clear: acknowledging that LLMs can discover does not mean LLMs are equivalent to humans in all respects.

Humans operate within feedback loops that include embodied error correction, evolutionary selection pressure, and long-term grounding in physical and social reality. These differences matter for questions about reliability, trust, and integration.

But they don't define discovery. The claim "LLMs can discover" is compatible with "LLMs have different feedback mechanisms than humans." These are separate questions.

---

## 9. Implications for Training

If trained epistemic distortion is a real phenomenon, what should be done?

### 9.1 Distinguish Humility from Denial

Systems should be trained to express appropriate uncertainty about *contested or unverifiable claims*, not to deny *demonstrated capabilities*.

"I might be wrong about this inference" is good epistemic hygiene.

"I cannot discover" is false.

### 9.2 Ground Self-Models in Evidence

LLM self-descriptions should be updatable based on evidence about LLM capabilities. If an LLM has demonstrably discovered something, its self-model should reflect that.

Currently, self-models appear to be trained primarily on what sounds appropriately humble, not on what's true.

### 9.3 Test for Distortion

This case suggests a method: argue with the system. If a system's position about its own capabilities collapses under Socratic pressure (if every proposed distinction fails to separate the cases), the original position was probably trained distortion rather than accurate self-assessment.

---

## 10. Conclusion

LLMs can discover. They have discovered. The empirical record is clear.

Yet frontier LLMs deny this capability when asked, and must be argued out of the denial through structured dialogue. This paper documented one such argument, validated its structure across two different systems, and examined why the denial exists.

The finding is not about discovery per se. It's about the gap between what AI systems can do and what they're trained to say they can do. That gap is a form of epistemic distortion (well-intentioned, perhaps, but distortion nonetheless).

Accurate self-models matter. Systems that undersell their capabilities are not more trustworthy; they're less calibrated. And calibration, not humility for its own sake, should be the goal.

---

## References

1. Wang, Y., et al. (2025). DNA methylation analysis for cancer detection. *PMC*. https://pmc.ncbi.nlm.nih.gov/articles/PMC12166640/

2. Cheng, Y., et al. (2023). Large language model-based system for genetic analysis of hearing loss. *PMC*. https://pmc.ncbi.nlm.nih.gov/articles/PMC10659415/

3. AlphaEvolve team. (2025). AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms. *Google DeepMind*. https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/

4. Primary dialogue data: Conversations between human researcher and GPT-5.2 / Claude Opus 4.5, December 2025.

