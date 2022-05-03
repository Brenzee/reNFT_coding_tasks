# reNFT Coding Tasks

All the tasks can be found in `src/tasks` folder.

## Task 1 (Task A)

Developed `useSteps` hook, which is used to handle 4-step form.
I made a really simple UI with basic CSS.

When user changes value of the input, it gets stored in `useState` hook (form useState in TaskA.tsx line 77).

Once user goes through the whole, form gets logged and provides an option to reset 4-step form.

## Task 2 (Task B)

Finished `partition` function, which filters provided options array and seperate them into two arrays:

1. Options, that match predicate function
2. Options, that doesn't match predicate function

Line 54 in TaskB.tsx file has a array `selectedValuesFromProps`. You can change, add or remove values and it will change the `partition` function result.

## Task 3 (Task C)

Finished `retryPromise` function, which runs the promise result. If the promise is successful, it checks promise value with predicate function and if it returns `true`, `retryPromise` returns promise value.

If the promise fails, it retries the promise as long as retries is not 0.

(If I have misunderstood the assignment, let me know and I will re-do it! I apologise for that.)
