import { GameChallenge, GameLevelConfig } from '../types';

export interface LiveSolverStep {
  stepNumber: number;
  totalSteps: number;
  operationType:
    | 'PUSH'
    | 'POP'
    | 'PEEK'
    | 'DISPLAY'
    | 'ISEMPTY'
    | 'ISFULL'
    | 'OVERFLOW'
    | 'UNDERFLOW'
    | 'DEBUG_LINE'
    | 'FINAL';
  targetValue?: number | string;
  debugLineId?: string;
  debugLineText?: string;
  isFaulty?: boolean;
  operationTitle: string;
  operationMeaning: string;
  actionDescription: string;
  lifoHighlight?: {
    lastIn: number | string;
    firstOut: number | string;
  };
  peekValue?: number | string;
  displayElements?: (number | string)[];
  resultingStack: (number | string)[];
  availableElementsAfter?: number[];
  finalSummary?: {
    finalTop: number | string | null;
    finalStack: (number | string)[];
    whyExplanation: string;
  };
}

/**
 * Parses raw operations trace strings like "Push(10)", "Pop()", "Peek()", "Push(40)"
 */
function parseTraceString(trace: string): { op: 'PUSH' | 'POP' | 'PEEK' | 'DISPLAY' | 'ISEMPTY' | 'ISFULL'; val?: number } {
  const clean = trace.trim();
  const pushMatch = clean.match(/push\((\d+)\)/i);
  if (pushMatch) {
    return { op: 'PUSH', val: parseInt(pushMatch[1], 10) };
  }
  if (/pop\(\)/i.test(clean)) {
    return { op: 'POP' };
  }
  if (/peek\(\)/i.test(clean)) {
    return { op: 'PEEK' };
  }
  if (/isempty\(\)/i.test(clean)) {
    return { op: 'ISEMPTY' };
  }
  if (/isfull\(\)/i.test(clean)) {
    return { op: 'ISFULL' };
  }
  if (/display\(\)/i.test(clean)) {
    return { op: 'DISPLAY' };
  }
  return { op: 'PUSH', val: 0 };
}

/**
 * Generates an array of LiveSolverStep objects tailored specifically for the current challenge
 */
export function generateLiveSolverSteps(
  challenge: GameChallenge,
  level: GameLevelConfig
): LiveSolverStep[] {
  const steps: LiveSolverStep[] = [];
  const initial = challenge.initialStack ? [...challenge.initialStack] : [];
  const capacity = challenge.capacity || 6;
  let simulatedStack: (number | string)[] = [...initial];
  let available = challenge.availableElements ? [...challenge.availableElements] : [];

  // =========================================================================
  // 1. POP CHALLENGE (LEVEL 1 / LIFO)
  // =========================================================================
  if (challenge.mode === 'pop' || level.type === 'lifo') {
    const topVal = simulatedStack.length > 0 ? simulatedStack[simulatedStack.length - 1] : (challenge.targetValue ?? 50);
    const prevStack = [...simulatedStack];
    const newStack = simulatedStack.slice(0, -1);
    const newTop = newStack.length > 0 ? newStack[newStack.length - 1] : null;

    // Step 1: Execute Pop
    steps.push({
      stepNumber: 1,
      totalSteps: 2,
      operationType: 'POP',
      targetValue: topVal,
      operationTitle: `Step 1: POP`,
      operationMeaning: 'POP removes the element currently at the TOP of the stack.',
      actionDescription: `${topVal} is currently at the TOP (the most recently added element). POP removes ${topVal}. TOP now moves to ${newTop !== null ? newTop : 'none (Stack is empty)'}.`,
      lifoHighlight: {
        lastIn: topVal,
        firstOut: topVal,
      },
      resultingStack: newStack,
    });

    // Step 2: Final Result
    steps.push({
      stepNumber: 2,
      totalSteps: 2,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'LIFO principle successfully applied.',
      actionDescription: `The topmost element [${topVal}] was popped, revealing ${newTop !== null ? `[${newTop}] as the new TOP` : 'an empty stack'}.`,
      resultingStack: newStack,
      finalSummary: {
        finalTop: newTop,
        finalStack: newStack,
        whyExplanation: `Before POP: [${prevStack.join(', ')}] with TOP = ${topVal}. Following Last-In, First-Out (LIFO), POP immediately removes ${topVal}. After POP: [${newStack.join(', ')}] with TOP = ${newTop ?? 'Empty'}.`,
      },
    });

    return steps;
  }

  // =========================================================================
  // 2. PUSH CHALLENGE (LEVEL 2 / PUSH)
  // =========================================================================
  if (challenge.mode === 'push' || level.type === 'push') {
    const pushVal = challenge.targetValue ?? (challenge.availableElements ? challenge.availableElements[0] : 30);
    const prevStack = [...simulatedStack];
    const newStack = [...simulatedStack, pushVal];

    // Remove pushed item from available
    const availAfter = [...available];
    const idx = availAfter.indexOf(pushVal);
    if (idx !== -1) availAfter.splice(idx, 1);

    // Step 1: Execute Push
    steps.push({
      stepNumber: 1,
      totalSteps: 2,
      operationType: 'PUSH',
      targetValue: pushVal,
      operationTitle: `Step 1: PUSH ${pushVal}`,
      operationMeaning: 'PUSH always adds the new element at the TOP of the stack.',
      actionDescription: `${pushVal} has been pushed onto the stack. TOP is now ${pushVal}.`,
      resultingStack: newStack,
      availableElementsAfter: availAfter,
    });

    // Step 2: Final Result
    steps.push({
      stepNumber: 2,
      totalSteps: 2,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'Push operation successfully placed element at TOP.',
      actionDescription: `[${pushVal}] now sits at the top of the stack.`,
      resultingStack: newStack,
      availableElementsAfter: availAfter,
      finalSummary: {
        finalTop: pushVal,
        finalStack: newStack,
        whyExplanation: `The initial stack was [${prevStack.join(', ')}]. PUSH(${pushVal}) placed ${pushVal} on top of all existing elements, yielding [${newStack.join(', ')}] with TOP = ${pushVal}.`,
      },
    });

    return steps;
  }

  // =========================================================================
  // 3. BUILD CHALLENGE (LEVEL 3 / BUILD)
  // =========================================================================
  if (challenge.mode === 'build' || level.type === 'build') {
    const target = challenge.targetStack || [10, 20, 30, 40];
    let curr: number[] = [];
    let curAvail = [...available];

    target.forEach((val, i) => {
      curr = [...curr, val];
      const aIdx = curAvail.indexOf(val);
      if (aIdx !== -1) {
        curAvail = [...curAvail];
        curAvail.splice(aIdx, 1);
      }

      steps.push({
        stepNumber: i + 1,
        totalSteps: target.length + 1,
        operationType: 'PUSH',
        targetValue: val,
        operationTitle: `Step ${i + 1}: PUSH ${val}`,
        operationMeaning: i === 0
          ? 'The very first element pushed forms the bottom foundation.'
          : 'PUSH always places the new element on TOP of the existing items.',
        actionDescription: `${val} is pushed onto the stack. TOP is now ${val}.`,
        resultingStack: [...curr],
        availableElementsAfter: [...curAvail],
      });
    });

    // Final Step
    const finalTop = target[target.length - 1];
    steps.push({
      stepNumber: target.length + 1,
      totalSteps: target.length + 1,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'Target stack assembled in strict bottom-to-top sequence.',
      actionDescription: `Stack successfully built: [${target.join(', ')}] with TOP = ${finalTop}.`,
      resultingStack: [...target],
      availableElementsAfter: [...curAvail],
      finalSummary: {
        finalTop: finalTop,
        finalStack: [...target],
        whyExplanation: `Because a stack is a LIFO structure, building [${target.join(' → ')}] requires pushing in order from bottom to top: ${target.map((v, idx) => `Step ${idx+1}: Push(${v})`).join(', ')}.`,
      },
    });

    return steps;
  }

  // =========================================================================
  // 4. PREDICT CHALLENGE (LEVEL 4 / PREDICT / TRACE)
  // =========================================================================
  if (challenge.mode === 'predict' || level.type === 'predict' || challenge.operationsTrace) {
    let rawTrace = challenge.operationsTrace;
    if (!rawTrace || rawTrace.length === 0) {
      // Extract from question title if needed: e.g. "Push(10) → Push(20) → Push(30) → Pop() → Push(40)"
      const parts = challenge.question.replace(/^PREDICT FINAL:\s*/i, '').split('→');
      if (parts.length > 1) {
        rawTrace = parts.map((p) => p.trim());
      } else {
        rawTrace = ['Push(10)', 'Push(20)', 'Push(30)', 'Pop()', 'Push(40)', 'Peek()'];
      }
    }

    let stack: (number | string)[] = [];
    const totalOps = rawTrace.length;

    rawTrace.forEach((traceItem, index) => {
      const parsed = parseTraceString(traceItem);
      const stepNum = index + 1;

      if (parsed.op === 'PUSH' && parsed.val !== undefined) {
        stack = [...stack, parsed.val];
        const top = stack[stack.length - 1];
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'PUSH',
          targetValue: parsed.val,
          operationTitle: `Step ${stepNum}: PUSH ${parsed.val}`,
          operationMeaning: 'PUSH adds a new element to the TOP of the stack.',
          actionDescription: `${parsed.val} has been added to the stack. TOP is now ${top}.`,
          resultingStack: [...stack],
        });
      } else if (parsed.op === 'POP') {
        const popped = stack.length > 0 ? stack[stack.length - 1] : 0;
        stack = stack.slice(0, -1);
        const newTop = stack.length > 0 ? stack[stack.length - 1] : 'Empty';
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'POP',
          targetValue: popped,
          operationTitle: `Step ${stepNum}: POP`,
          operationMeaning: 'POP removes the element currently at the TOP.',
          actionDescription: `${popped} was at the TOP, so POP removes ${popped}. TOP now moves to ${newTop}.`,
          lifoHighlight: {
            lastIn: popped,
            firstOut: popped,
          },
          resultingStack: [...stack],
        });
      } else if (parsed.op === 'PEEK') {
        const peekVal = stack.length > 0 ? stack[stack.length - 1] : 'None';
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'PEEK',
          peekValue: peekVal,
          operationTitle: `Step ${stepNum}: PEEK`,
          operationMeaning: 'PEEK reads the TOP element without removing it from the stack.',
          actionDescription: `The TOP element is ${peekVal}, so PEEK returns ${peekVal}. The stack remains unchanged.`,
          resultingStack: [...stack],
        });
      } else if (parsed.op === 'DISPLAY') {
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'DISPLAY',
          displayElements: [...stack].reverse(),
          operationTitle: `Step ${stepNum}: DISPLAY`,
          operationMeaning: 'DISPLAY outputs all elements currently stored from TOP to BOTTOM.',
          actionDescription: `Elements in stack (top-to-bottom): [${[...stack].reverse().join(', ')}].`,
          resultingStack: [...stack],
        });
      } else if (parsed.op === 'ISEMPTY') {
        const empty = stack.length === 0;
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'ISEMPTY',
          operationTitle: `Step ${stepNum}: isEmpty()`,
          operationMeaning: 'Checks whether the stack contains 0 elements.',
          actionDescription: `Stack size is ${stack.length}, so isEmpty() returns ${empty ? 'TRUE' : 'FALSE'}.`,
          resultingStack: [...stack],
        });
      } else if (parsed.op === 'ISFULL') {
        const full = stack.length >= capacity;
        steps.push({
          stepNumber: stepNum,
          totalSteps: totalOps + 1,
          operationType: 'ISFULL',
          operationTitle: `Step ${stepNum}: isFull()`,
          operationMeaning: 'Checks whether the stack has reached maximum capacity.',
          actionDescription: `Stack holds ${stack.length} / ${capacity} items, so isFull() returns ${full ? 'TRUE' : 'FALSE'}.`,
          resultingStack: [...stack],
        });
      }
    });

    // Final Step
    const finalTop = stack.length > 0 ? stack[stack.length - 1] : null;
    steps.push({
      stepNumber: totalOps + 1,
      totalSteps: totalOps + 1,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'All trace operations evaluated sequentially.',
      actionDescription: `Final TOP = ${finalTop !== null ? finalTop : 'Empty'}. Final Stack = [${stack.join(', ')}].`,
      resultingStack: [...stack],
      finalSummary: {
        finalTop: finalTop,
        finalStack: [...stack],
        whyExplanation: `By tracing: ${rawTrace.join(' → ')}, elements entered and exited following strict LIFO order, leaving [${stack.join(', ')}] with TOP = ${finalTop}.`,
      },
    });

    return steps;
  }

  // =========================================================================
  // 5. DEBUG CHALLENGE (LEVEL 5 / DEBUG)
  // =========================================================================
  if (challenge.mode === 'debug' || level.type === 'debug') {
    const debugSteps = challenge.debugSteps || [];
    let dbgStack: (number | string)[] = [...initial];
    let faultyStepFound: (typeof debugSteps)[0] | null = null;

    debugSteps.forEach((step, idx) => {
      const stepNum = idx + 1;
      if (step.isFaulty) {
        faultyStepFound = step;
        steps.push({
          stepNumber: stepNum,
          totalSteps: debugSteps.length + 1,
          operationType: 'DEBUG_LINE',
          debugLineId: step.id,
          debugLineText: step.text,
          isFaulty: true,
          operationTitle: `Line ${stepNum}: FAULT DETECTED ❌`,
          operationMeaning: 'This instruction violates stack invariants or runtime constraints.',
          actionDescription: `FATAL ERROR: "${step.text}". ${step.explanation}.`,
          resultingStack: [...dbgStack],
        });
      } else {
        // Approximate stack update for valid lines
        if (/push\((\d+)\)/i.test(step.text)) {
          const val = parseInt(step.text.match(/push\((\d+)\)/i)![1], 10);
          dbgStack = [...dbgStack, val];
        } else if (/pop\(\)/i.test(step.text)) {
          dbgStack = dbgStack.slice(0, -1);
        }

        steps.push({
          stepNumber: stepNum,
          totalSteps: debugSteps.length + 1,
          operationType: 'DEBUG_LINE',
          debugLineId: step.id,
          debugLineText: step.text,
          isFaulty: false,
          operationTitle: `Line ${stepNum}: Valid Instruction ✓`,
          operationMeaning: step.explanation || 'Instruction executes normally within capacity limits.',
          actionDescription: `"${step.text}" is completely valid. Stack is now [${dbgStack.join(', ')}].`,
          resultingStack: [...dbgStack],
        });
      }
    });

    // Final Step
    steps.push({
      stepNumber: debugSteps.length + 1,
      totalSteps: debugSteps.length + 1,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'Bug pinpointed successfully.',
      actionDescription: `The faulty instruction is "${faultyStepFound ? (faultyStepFound as any).text : 'Faulty Line'}".`,
      resultingStack: [...dbgStack],
      finalSummary: {
        finalTop: dbgStack.length > 0 ? dbgStack[dbgStack.length - 1] : null,
        finalStack: [...dbgStack],
        whyExplanation: faultyStepFound
          ? `Line "${(faultyStepFound as any).text}" is illegal because: ${(faultyStepFound as any).explanation}`
          : 'Runtime violation identified.',
      },
    });

    return steps;
  }

  // =========================================================================
  // 6. SPEED CHALLENGE (LEVEL 6 / SPEED)
  // =========================================================================
  if (challenge.mode === 'speed' || level.type === 'speed') {
    const isPush = challenge.question.toUpperCase().includes('PUSH');
    const targetVal = challenge.targetValue ?? 10;
    const newStack = isPush
      ? [...simulatedStack, targetVal]
      : simulatedStack.slice(0, -1);
    const newTop = newStack.length > 0 ? newStack[newStack.length - 1] : null;

    steps.push({
      stepNumber: 1,
      totalSteps: 2,
      operationType: isPush ? 'PUSH' : 'POP',
      targetValue: targetVal,
      operationTitle: isPush ? `Step 1: PUSH ${targetVal}` : `Step 1: POP`,
      operationMeaning: isPush
        ? 'Rapidly push the requested element to maintain the speed combo.'
        : 'Rapidly pop the topmost element to maintain the speed combo.',
      actionDescription: isPush
        ? `${targetVal} is placed onto the stack. TOP is now ${targetVal}.`
        : `Topmost item was removed. TOP is now ${newTop ?? 'Empty'}.`,
      resultingStack: newStack,
    });

    steps.push({
      stepNumber: 2,
      totalSteps: 2,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: 'Speed round operation executed accurately.',
      actionDescription: `Action completed! Stack is [${newStack.join(', ')}].`,
      resultingStack: newStack,
      finalSummary: {
        finalTop: newTop,
        finalStack: newStack,
        whyExplanation: `Speed prompt requested: ${challenge.question}. Resulting stack state is [${newStack.join(', ')}].`,
      },
    });

    return steps;
  }

  // Default Fallback
  return [
    {
      stepNumber: 1,
      totalSteps: 1,
      operationType: 'FINAL',
      operationTitle: '✓ GUIDED SOLUTION COMPLETE',
      operationMeaning: challenge.instruction,
      actionDescription: challenge.question,
      resultingStack: [...initial],
      finalSummary: {
        finalTop: initial.length > 0 ? initial[initial.length - 1] : null,
        finalStack: [...initial],
        whyExplanation: challenge.feedback.lifoReason || 'Challenge solved.',
      },
    },
  ];
}
