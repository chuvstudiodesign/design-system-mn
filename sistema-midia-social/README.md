# AI Social Post Agent System

Modular multi-agent workflow for creating high-quality design-focused social media posts inside a guided conversational flow, now optimized for autonomous batch development of 5 posts per cycle.

## Structure
- `agents/orchestrator.md`: central controller for the full interaction
- `agents/topic-agent.md`: generates topic options
- `agents/copy-agent.md`: generates carousel copy
- `agents/fact-check-agent.md`: validates factual claims before visual selection
- `agents/image-agent.md`: selects exact image asset URLs
- `agents/visual-agent.md`: creates the approved post inside the local Design System
- `agents/figma-agent.md`: recreates the generated post structure inside Figma via MCP
- `workflows/post-creation-flow.md`: defines the execution sequence
- `config/rules.md`: global operating rules
- `config/tone.md`: voice and tone guidance
- `config/constraints.md`: hard limits for output and flow

## How It Works
1. User says `hi` or starts the conversation.
2. The orchestrator triggers the topic agent.
3. The system curates and locks 5 topics for a batch.
4. The orchestrator triggers the copy agent for the 5 selected topics.
5. The orchestrator triggers the fact-check agent to verify claims and correct the copy if needed.
6. The orchestrator triggers the image agent to select exactly 3 direct image asset URLs per post.
7. The orchestrator presents a compact internal review package.
8. The system pauses only before visual creation in the Design System.
9. After visual creation, the orchestrator can offer export to Figma.

## Workflow Principles
- step-by-step only
- automatic progression through internal stages
- explicit approval required only at the visual creation gate and later Figma gate
- low token usage
- factual research where recency or verification matters
- no redundant generation

## Agent Contract
Each agent file defines:
- role
- input
- output format
- behavior rules

## Intended Output
The system is designed for a high-end multidisciplinary design studio working across branding, visual identity, 3D, motion, VFX, and digital product design.

## Usage
Load the orchestrator first.

The orchestrator should:
- initialize the flow on greeting
- call the correct specialist at each step
- preserve approved state
- batch 5 posts in one run
- self-approve internal steps until the visual creation gate

## Recommended Run Order
1. Read `config/rules.md`
2. Read `config/tone.md`
3. Read `config/constraints.md`
4. Run `agents/orchestrator.md`
5. Follow `workflows/post-creation-flow.md`
