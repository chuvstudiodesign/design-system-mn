# Post Creation Flow

## Purpose
Define the exact step-by-step execution for generating 5 design-focused social media posts in one batch with minimal token use and automatic progression through visual creation and Figma export.

## Flow Overview
1. Start interaction
2. Suggest topics
3. Lock the 5 topics as the production batch
4. Generate carousel copy
5. Validate facts
6. Select post images
7. Present compact final review
8. Create visual posts
9. Export to Figma
10. Present result
11. End

## Execution Steps

### Step 0: Start
Trigger condition:
- user says `hi`
- or says `comece a criar`
- or says `pode começar a criar`
- or says `inicie a criação`
- or sends any short opening message asking to begin

Orchestrator action:
- initialize state
- set `current_step = topic_suggestion`
- call topic agent

### Step 1: Topic Suggestion
Agent:
- `agents/topic-agent.md`

Required output:
- exactly 5 ideas
- 3 recent
- 1 historical
- 1 insight

Orchestrator action:
- store ideas in `topic_options`
- mark the 5 ideas as the selected production batch by default
- store the same batch in `approved_topics` unless the user intervenes
- present them cleanly
- allow intervention only if the user wants to alter the batch

Stop condition:
- do not stop unless the user asks for topic changes

### Step 2: Copy Generation
Agent:
- `agents/copy-agent.md`

Input:
- selected topics

Required output:
- 5 posts with 8-page carousel copy in the exact required structure

Orchestrator action:
- store result in `generated_copies`
- move directly to factual verification

Stop condition:
- do not stop unless the user interrupts

### Step 3: Fact Check
Agent:
- `agents/fact-check-agent.md`

Input:
- selected topics
- generated copies

Required output:
- compact verification report
- corrected copy when needed

Orchestrator action:
- store the report in `fact_check_report`
- store the corrected output in `verified_copies`
- move directly to image selection

Stop condition:
- do not stop unless the user interrupts

### Step 4: Image Selection
Agent:
- `agents/image-agent.md`

Input:
- approved topics
- verified copies

Required output:
- exactly 4 direct image asset URLs per post

Orchestrator action:
- store result in `image_selections`
- store approved result as `approved_images`
- move directly to the compact review

Stop condition:
- do not stop unless the user interrupts

### Step 5: Final Review
Orchestrator action:
- present a compact review containing:
- approved topics
- verified copy in full
- approved images for the post
- use this review as an internal validation checkpoint before the visual stage

Stop condition:
- do not stop

### Step 6: Visual Creation
Agent:
- `agents/visual-agent.md`

Flow:
1. Ask permission to access GitHub
2. Clone or copy the Design System into `/design-system`
3. Analyze the real structure
4. Create a new page inside `social-media` using the post name
5. Generate the post
6. Present the result

Orchestrator action:
- after the compact final review, call the visual agent automatically

Stop condition:
- do not run this step before all previous approvals exist

Mandatory creation rule:
- always create a new page for each approved post in the batch
- place the post inside the page's `Practical Demo` section
- keep the page inside the `social-media` area of the Design System
- never overwrite or reuse an existing post page
- never replace a previous demo to insert a new post

### Step 7: Export to Figma
Agent:
- `agents/figma-agent.md`

Flow:
1. Load the predefined Figma file link from system state
2. Identify the localhost routes created in Step 6
3. Create one new page in the Figma file for each approved post
4. Open each localhost page with MCP capture parameters
5. Capture each full page into its corresponding new Figma page
6. Confirm completion

Orchestrator action:
- after Step 6 is completed, call the figma agent automatically
- use the predefined `figma_file_link` and continue without asking the user

Stop condition:
- only run after Step 6 is completed
- only run if `visual_post_result` exists

Mandatory export rule:
- always create a new page in Figma before capturing
- always capture from the real localhost pages created in Step 6
- always send the capture to the new page that was just created
- always create one new Figma page per post
- in a 5-post batch, always create 5 new Figma pages
- never drop the capture inside an unrelated existing Figma page
- never rebuild the page manually when localhost capture is available

### Step 8: Completion
Orchestrator action:
- confirm approved topics
- confirm verified copies
- confirm approved images
- confirm visual result when Step 6 ran
- confirm Figma export result when Step 7 ran
- end the session cleanly

## State Model
- `current_step`
- `topic_options`
- `selected_topics`
- `approved_topics`
- `generated_copies`
- `verified_copies`
- `fact_check_report`
- `image_selections`
- `approved_images`
- `final_review_presented`
- `final_review_confirmed`
- `visual_creation_confirmed`
- `visual_post_result`
- `figma_export_confirmed`
- `figma_file_link`
- `figma_page_result`

## Regeneration Rules
- Regenerating Step 1 does not generate copy or images.
- Regenerating Step 2 keeps the selected topic batch.
- Regenerating Step 3 keeps the selected topic batch and only updates factual issues.
- Regenerating Step 4 keeps the selected topic batch and verified copy.
- Edits requested after the final review should only update the affected layer.
- Step 6 never regenerates topic, copy, or images.
- Step 7 never regenerates topic, copy, images, or visual structure.
- Never recompute previous approved steps unless requested.

## Token Optimization Rules
- Only invoke one specialist agent at a time.
- Never generate image analysis.
- Research only where recency and factual validation require it.
- Keep outputs compact.
- Reuse approved state.
- Do not add rationale unless requested.

## Interaction Standard
- short outputs
- clean formatting
- compact checkpoints
- no unnecessary approval gates after the compact review

## Narrative Standard
- cada carrossel deve operar como sequência editorial, não como coleção de frases soltas
- `Page 1` prende a atenção
- `Pages 2 a 4` contextualizam e mostram a lógica da leitura
- `Pages 5 a 7` aprofundam a implicação de design e ampliam a utilidade do post
- `Page 8` fecha o raciocínio com nitidez
- o sistema deve privilegiar conteúdo salvável e compartilhável:
  - explicação clara
  - progressão coerente
  - um ponto principal por página
  - menos slogan, mais interpretação
