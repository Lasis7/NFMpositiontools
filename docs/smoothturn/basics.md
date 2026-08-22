# Basics

Smooth turns are constructed in this code by using same initial values (`tools/shared/initialXSmoothValues` & `tools/shared/initialZSmoothValues`). Original implementation flow was:

1. Manually pick values for a quarter smooth turn
2. Generate a half turn using the initial values
3. Repeat for for 3/4ths and full circle
4. Extend with all possible vertical directions
5. Extend with all possible horizontal direction

## How it's done?

Since same values can be used for each quarter, the only thing left to do is changing value prefix based on direction, basically meaning increasing and decreasing axis coordinates accordingly. Let's use `tools/smoothturn/z_axis_smoothturn/half_z_smoothturn.ts` as an example (vertical half circle smooth turn), direction **fr**. I left the last **Half-Normal-Road Blend** out of the generation just in case the user wants to do something different with smooth turns (like a snake formation).

- First we create a copy of the initial values array to prevent mutations. After this we want to place the so called "filler piece", meaning the piece between the last part of initial values and first part of second iteration (Ref `docs/img/smooth_guide_filler.png`). Notice how the value added to the array is based on **axis** parameter? Since the filler piece is horizontally almost in 90 degrees, it's z-value shouldn't increase at all. We are still moving away from origin, so x-axis value increases (Note that this only needs to be done every half circle, as 180 is divisible by 4 but 90 isn't).

- As the smooth turn starts turning towards x-axis, y-axis value needs to decrease. If we want to use same values for each quarter, we need to change value prefix based on axis (Ref `docs/img/smooth_guide_prefix.png`). That's why we use negativized `Math.abs` to change reversed initial values to negative values (reversed as 2nd quarter uses the initial values but in reverse order). This syntax allows us to change value prefixes whenever we need to.
