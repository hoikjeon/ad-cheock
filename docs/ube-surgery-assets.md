# UBE illustration and Higgsfield animation handoff

## Current output

- Source PNG: output/ube/biportal-surgery-v2.png
- Website image: public/images/biportal-surgery-v2.webp
- Original website asset preserved: public/images/biportal-pcs.png
- Generated using the built-in image_gen.imagegen tool, then encoded as WebP using sharp.
- Higgsfield video has NOT been generated: provider account was not connected at the time of preparation.

## Anatomy reference

https://www.spine.or.kr/eng/diseases/endoscopy

The Korean Society of Spine Surgery describes separate viewing and working portals. The illustration depicts a lumbar posterior operative concept with large separate instruments. It is AI-generated educational artwork; a specialist has not certified its exact anatomical geometry.

## Initial image prompt

Use case: scientific-educational.
Asset type: high-resolution 3D medical illustration and first-frame plate for subtle surgical instrument animation on a Korean hospital website.
Primary request: Create an entirely new anatomically coherent illustration of unilateral biportal endoscopic lumbar spine surgery (UBE/BESS), with LARGE clearly visible separate endoscope and working surgical instrument. Use the attached old illustration only as context for subject; improve anatomy and composition rather than copying its horizontal/ambiguous spine orientation.
Scene: isolated clean white studio background, no operating room, no skin, no blood. Three consecutive lower lumbar vertebrae L3 L4 L5 stacked CRANIOCAUDALLY in a nearly vertical column, seen from elevated three-quarter POSTEROLATERAL view. Correct lumbar vertebral bodies on the anterior side, pale blue-grey intervertebral discs BETWEEN adjacent bodies, posterior laminae and facets, one spinous process per vertebra posteriorly. Warm ivory bone with realistic restrained trabecular texture. Limited golden-yellow exiting lumbar nerve roots within foramina, anatomically plausible, not spaghetti.
Surgical geometry: the viewing endoscope and working instrument approach from POSTERIOR, through two separate cranial and caudal portals on the SAME ipsilateral side of the midline, aiming toward ONE L4-L5 interlaminar operative space. Tips stay superficial to the dura in the posterior decompression working space, NEVER penetrate vertebral bodies, disc centers or neural tissue. If useful expose a modest clean cutaway at the target lamina to make this relation legible. UBE means separate viewing and working portals, not two holes drilled in a bone or instruments passing through one common tube.
Instruments: upper-left quadrant LARGE distinct blue-and-metal camera coupler/eyepiece with a slender but very visible rigid silver endoscope and side irrigation connector; upper-right quadrant LARGE realistic stainless-steel Kerrison rongeur handle with recognizable opposing finger lever handles and long shaft, small angled tip pointing toward posterior laminar working space. Both handles completely visible with adequate silhouette separation, their lengths and diameters plausible; instrument hardware together occupies about 45% of frame height, the target lumbar segment the lower 60%, slight overlap at tips. Camera and working instrument shafts aim inward from upper left and upper right but dock at separate cranial/caudal sites on the same side. No hands.
Composition: landscape 4:3, entire assembly fills 85-90% of canvas, margin only 5-8%, instruments must NOT look tiny. At thumbnail width 360px the two different handles are immediately readable. Clear bone contours, independent instrument silhouettes, no unnecessary foreground tissue obstructing tips. Fixed perspective camera for future image-to-video animation.
Rendering: premium clinical 3D anatomical product visualization, photorealistic materials with tidy educational clarity, soft diffuse studio light, white background with only extremely subtle contact shadows. Crisp silver instruments, blue camera accents, warm ivory bone, pale grey blue discs, restrained yellow nerves.
No text, no labels, no arrows, no watermark, no logo, no extra instruments, no disembodied duplicate tools, no excessive lens flare. Do not add red glowing pain effects. Anatomy and all solid objects must be stable and physically coherent.

## Refinement prompt

Use case: scientific-educational, precise-object-edit.
Refine the most recently generated UBE lumbar illustration. Preserve the large readable instruments, vertical lumbar spine, ivory bone, blue-grey discs, yellow nerve roots, white background, camera and lighting. Correct ONLY the operative anatomy and distal tool trajectories: the current endoscope tip and rongeur tip terminate at different sides/levels. BOTH distal tips must now converge into ONE shared small interlaminar operative window at the SAME lumbar motion segment, on the SAME side of the spinous-process midline. The scope and working tool remain separate shafts with distinct proximal trajectories and separate cranial/caudal skin-portal locations (skin not shown). The endoscope watches the rongeur working at a single lamina edge. Make a small local posterior laminar cutaway so the shared working cavity is unambiguous; show intact pale dura deep to the workspace, no sharp tip touching or penetrating nerve or dura, no instrument penetrating vertebral body. Two tools, one operative level, one ipsilateral posterior workspace. Do not add a second operative cavity or invent bone holes. Keep handles fully visible and large. No text, no labels, no watermark. This is an educational illustration, not a photographic clinical record.

## Higgsfield image-to-video prompt

Create a 6-second seamless loop from the supplied medical UBE illustration. Locked camera, absolutely stationary lumbar spine, discs, laminae, dura and nerve roots, fixed white background, constant lighting. Preserve the exact count, shape, material and placement of all anatomical structures. Animate ONLY the TWO existing instruments: the blue viewing endoscope on the left makes a very slow tiny pivot of approximately 1 degree about its docking point; the silver working rongeur on the right makes a gentle independent pivot of approximately 1–2 degrees and a barely perceptible 1–2 mm forward/back motion relative to the original scale. Keep both distal tips in the same existing posterior operative window, separate shafts, no shaft or tip penetrating bone, dura, nerve roots or disc. Handles remain large and clearly visible. Extremely restrained, precise motion with smooth ease-in/out; first and final frames match. No actual tissue removal or changing anatomy. No cutting, no bleeding, no new holes, no deformation, no duplicated instruments, no disappearing parts, no floating bones, no zoom, no camera orbit, no focus pulsing, no captions, no added hands. This is a calm medical educational concept loop, not a surgical instruction video.

## Intended delivery

6 seconds, 4:3, silent, fixed camera, subtle independent instrument movement, loop. Use the source PNG above as the input frame. When a video is generated, inspect the complete loop for moving anatomy, duplicated tools, shafts passing through bone, and abrupt loop seams before replacing the still image. Keep the WebP as the poster and provide reduced-motion fallback.

