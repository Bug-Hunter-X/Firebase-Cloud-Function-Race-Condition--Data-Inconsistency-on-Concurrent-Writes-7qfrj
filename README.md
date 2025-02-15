# Firebase Cloud Function Race Condition

This repository demonstrates a race condition in a Firebase Cloud Function triggered by Realtime Database writes. The function processes multiple concurrent writes, leading to data inconsistency.

The `bug.js` file contains the problematic code that causes the data inconsistency. The `bugSolution.js` file presents a solution that prevents the race condition.

## Problem

The function uses the Realtime Database's `onWrite` trigger, without adequate locking mechanisms or transactions. As a result, if multiple clients write to the database nearly at the same time, the function's logic might not handle the updates correctly, leading to data loss or incorrect state. 

## Solution

The solution employs Firebase transactions to ensure atomicity.  Transactions guarantee that the function's update operations are treated as a single, indivisible unit of work, preventing race conditions and maintaining data consistency.