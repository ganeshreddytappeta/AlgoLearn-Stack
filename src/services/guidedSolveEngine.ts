import { GameLevelConfig, GameChallenge } from '../types';

export type StackOperationType =
  | 'PUSH'
  | 'POP'
  | 'PEEK'
  | 'DISPLAY'
  | 'ISEMPTY'
  | 'ISFULL'
  | 'OVERFLOW'
  | 'UNDERFLOW'
  | 'DEBUG_LINE';

export interface GuidedStep {
  stepNumber: number; // 1-indexed
  totalSteps: number;
  operation: StackOperationType;
  value?: number | string;
  displayLabel: string; // e.g. "PUSH 10" or "POP"
  actionExplanation: string; // Explained before/during the action
  resultExplanation: string; // Explained after the real stack changes
  conceptNote: string; // LIFO, ADT, or pointer rule
  resultingStack: (number | string)[]; // The real stack items after action
  resultingTop: number | string | null;
  peekValue?: number | string | null;
  statusBadge?: 'normal' | 'overflow' | 'underflow' | 'empty' | 'full';
  debugLineId?: string;
  debugLineText?: string;
  isFaulty?: boolean;
}

/**
 * Dynamically analyzes the CURRENT LEVEL and CURRENT CHALLENGE
 * and constructs the exact sequence of guided solution steps.
 */
export function generateGuidedSteps(
  level: GameLevelConfig,
  challenge: GameChallenge
): GuidedStep[] {
  const steps: GuidedStep[] = [];
  const capacity = challenge.capacity || 5;

  // Clone initial stack numbers
  let currentStack: (number | string)[] = challenge.initialStack
    ? [...challenge.initialStack]
    : [];

  // Helper to format top description
  const getTopText = (stack: (number | string)[]) =>
    stack.length > 0 ? `${stack[stack.length - 1]}` : 'None (Empty)';

  // =========================================================================
  // LEVEL 1: POP MASTER
  // =========================================================================
  if (level.type === 'lifo' || challenge.mode === 'pop') {
    const targetVal =
      challenge.targetValue !== undefined
        ? challenge.targetValue
        : currentStack[currentStack.length - 1];

    // Step 1: Identify and POP the TOP element
    const initialTop = currentStack[currentStack.length - 1];
    const resultingStack1 = currentStack.slice(0, -1);
    const newTop = resultingStack1.length > 0 ? resultingStack1[resultingStack1.length - 1] : null;

    steps.push({
      stepNumber: 1,
      totalSteps: challenge.initialStack?.length === 1 ? 2 : 1,
      operation: 'POP',
      value: initialTop,
      displayLabel: `POP ${initialTop}`,
      actionExplanation: `Now we need to remove the TOP element. The POP operation always removes the element at TOP. The current TOP is ${initialTop}.`,
      resultExplanation: `${initialTop} has been removed. ${
        newTop !== null ? `${newTop} is now the TOP element.` : 'The stack is now completely empty!'
      }`,
      conceptNote:
        'This demonstrates LIFO: Last In, First Out. Only the element at the top can be accessed or removed directly.',
      resultingStack: resultingStack1,
      resultingTop: newTop,
      statusBadge: resultingStack1.length === 0 ? 'empty' : 'normal',
    });

    currentStack = resultingStack1;

    // If popped to empty, show isEmpty check step
    if (resultingStack1.length === 0) {
      steps.push({
        stepNumber: 2,
        totalSteps: 2,
        operation: 'ISEMPTY',
        displayLabel: 'isEmpty() CHECK',
        actionExplanation: 'We inspect the stack boundary condition following the pop operation.',
        resultExplanation: 'The stack contains 0 elements, so isEmpty is TRUE. The TOP pointer is -1.',
        conceptNote:
          'Calling POP on an empty stack triggers Stack Underflow. Robust code always checks !isEmpty() before popping.',
        resultingStack: [],
        resultingTop: null,
        statusBadge: 'empty',
      });
    }

    return steps;
  }

  // =========================================================================
  // LEVEL 2: PUSH MASTER
  // =========================================================================
  if (level.type === 'push' || challenge.mode === 'push') {
    const pushVal =
      challenge.targetValue !== undefined
        ? challenge.targetValue
        : challenge.availableElements?.[0] || 50;

    const resulting = [...currentStack, pushVal];
    const isFullNow = resulting.length >= capacity;

    steps.push({
      stepNumber: 1,
      totalSteps: isFullNow ? 2 : 1,
      operation: 'PUSH',
      value: pushVal,
      displayLabel: `PUSH ${pushVal}`,
      actionExplanation: `First, we need to push ${pushVal} onto the stack. PUSH always adds the new element to the TOP of the stack.`,
      resultExplanation: `${pushVal} has been added to the stack. Because ${pushVal} was pushed last, it is now the TOP element.`,
      conceptNote:
        'A stack is a linear data structure following LIFO. PUSH increments the size and updates TOP to point to the new element.',
      resultingStack: resulting,
      resultingTop: pushVal,
      statusBadge: isFullNow ? 'full' : 'normal',
    });

    if (isFullNow) {
      steps.push({
        stepNumber: 2,
        totalSteps: 2,
        operation: 'ISFULL',
        displayLabel: 'isFull() CHECK',
        actionExplanation: `The stack capacity is ${capacity}. We test whether the stack has reached its boundary limit.`,
        resultExplanation: `The stack size is now ${resulting.length} of ${capacity}, so isFull is TRUE.`,
        conceptNote:
          'In fixed-capacity stacks, attempting to PUSH when isFull is TRUE triggers Stack Overflow.',
        resultingStack: resulting,
        resultingTop: pushVal,
        statusBadge: 'full',
      });
    }

    return steps;
  }

  // =========================================================================
  // LEVEL 3: BUILD THE STACK
  // =========================================================================
  if (level.type === 'build' || challenge.targetStack) {
    const target = challenge.targetStack || [10, 20, 30, 40];
    const total = target.length;
    const workingStack: (number | string)[] = [];

    target.forEach((val, idx) => {
      workingStack.push(val);
      const isBase = idx === 0;
      const isLast = idx === total - 1;

      steps.push({
        stepNumber: idx + 1,
        totalSteps: total,
        operation: 'PUSH',
        value: val,
        displayLabel: `PUSH ${val}`,
        actionExplanation: isBase
          ? `First, push ${val} onto the empty stack to form the base foundation at the bottom.`
          : isLast
          ? `Finally, push ${val} onto the stack. This completes the required top element.`
          : `Next, push ${val} onto the stack above ${workingStack[idx - 1]}.`,
        resultExplanation: `${val} has been pushed. ${val} is now the active TOP element. Stack size: ${workingStack.length}/${capacity}.`,
        conceptNote: isBase
          ? 'The element pushed first onto an empty stack serves as the bottom foundation.'
          : isLast
          ? 'The element pushed last naturally becomes the TOP element in LIFO order.'
          : 'Stacks build upwards from bottom to top. Elements cannot be placed below existing items.',
        resultingStack: [...workingStack],
        resultingTop: val,
        statusBadge: workingStack.length >= capacity ? 'full' : 'normal',
      });
    });

    return steps;
  }

  // =========================================================================
  // LEVEL 4: PREDICT THE STACK (Trace Execution)
  // =========================================================================
  if (level.type === 'predict' || challenge.operationsTrace) {
    const trace = challenge.operationsTrace || [
      'Push(10)',
      'Push(20)',
      'Pop()',
      'Push(30)',
    ];
    const workingStack: (number | string)[] = [];

    trace.forEach((line, idx) => {
      const isPush = /push\s*\(\s*(\d+)\s*\)/i.test(line);
      const isPop = /pop\s*\(/i.test(line);

      if (isPush) {
        const match = line.match(/push\s*\(\s*(\d+)\s*\)/i);
        const val = match ? Number(match[1]) : 10;
        workingStack.push(val);

        steps.push({
          stepNumber: idx + 1,
          totalSteps: trace.length,
          operation: 'PUSH',
          value: val,
          displayLabel: `PUSH ${val}`,
          actionExplanation: `Trace Step ${idx + 1}: Execute ${line.split('→')[0].trim()}. PUSH adds ${val} to the TOP.`,
          resultExplanation: `${val} has been added. TOP is now ${val}. Current stack: [${workingStack.join(', ')}].`,
          conceptNote:
            'Each PUSH operation pushes the new item above existing elements and increments the stack pointer.',
          resultingStack: [...workingStack],
          resultingTop: val,
          statusBadge: workingStack.length >= capacity ? 'full' : 'normal',
        });
      } else if (isPop) {
        const popped = workingStack.pop();
        const newTop = workingStack.length > 0 ? workingStack[workingStack.length - 1] : null;

        steps.push({
          stepNumber: idx + 1,
          totalSteps: trace.length,
          operation: 'POP',
          value: popped,
          displayLabel: `POP`,
          actionExplanation: `Trace Step ${idx + 1}: Execute ${line.split('→')[0].trim()}. POP removes the topmost element (${popped}).`,
          resultExplanation: `${popped} has been removed from TOP. ${
            newTop !== null ? `New TOP is ${newTop}.` : 'The stack is now empty.'
          } Current stack: [${workingStack.join(', ')}].`,
          conceptNote:
            'LIFO (Last In, First Out): the most recently pushed element is the first one removed.',
          resultingStack: [...workingStack],
          resultingTop: newTop,
          statusBadge: workingStack.length === 0 ? 'empty' : 'normal',
        });
      } else {
        // Generic step
        steps.push({
          stepNumber: idx + 1,
          totalSteps: trace.length,
          operation: 'DISPLAY',
          displayLabel: line.split('→')[0].trim() || 'DISPLAY',
          actionExplanation: `Trace Step ${idx + 1}: ${line}`,
          resultExplanation: `Stack state remains: [${workingStack.join(', ')}]. TOP = ${getTopText(workingStack)}.`,
          conceptNote: 'Non-mutating stack inspections leave all elements and the pointer intact.',
          resultingStack: [...workingStack],
          resultingTop: workingStack.length > 0 ? workingStack[workingStack.length - 1] : null,
        });
      }
    });

    return steps;
  }

  // =========================================================================
  // LEVEL 5: DEBUG THE STACK
  // =========================================================================
  if (level.type === 'debug' || challenge.debugSteps) {
    const debugSteps = challenge.debugSteps || [];
    const workingStack: (number | string)[] = challenge.initialStack
      ? [...challenge.initialStack]
      : [];

    debugSteps.forEach((dStep, idx) => {
      const isPush = /push\s*\(\s*(\d+)\s*\)/i.test(dStep.text);
      const isPop = /pop\s*\(/i.test(dStep.text);
      const isPeek = /peek\s*\(/i.test(dStep.text);
      const isRemoveAt = /removeat\s*\(/i.test(dStep.text);

      if (dStep.isFaulty) {
        if (dStep.errorType?.toLowerCase().includes('underflow') || (isPop && workingStack.length === 0)) {
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'UNDERFLOW',
            displayLabel: `LINE ${idx + 1}: POP() [UNDERFLOW]`,
            actionExplanation: `Line ${idx + 1} attempts to execute POP, but the stack currently contains 0 elements (size = 0).`,
            resultExplanation: `💥 RUNTIME VIOLATION: Stack Underflow! Calling POP or PEEK on an empty stack is an illegal operation.`,
            conceptNote:
              'Stack Underflow occurs when a program attempts to pop from an empty stack (TOP = -1).',
            resultingStack: [...workingStack],
            resultingTop: null,
            statusBadge: 'underflow',
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: true,
          });
        } else if (dStep.errorType?.toLowerCase().includes('overflow') || (isPush && workingStack.length >= (challenge.capacity || 3))) {
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'OVERFLOW',
            displayLabel: `LINE ${idx + 1}: PUSH() [OVERFLOW]`,
            actionExplanation: `Line ${idx + 1} attempts to execute Push, but the stack has already reached maximum capacity (${challenge.capacity || 3}/${challenge.capacity || 3}).`,
            resultExplanation: `💥 RUNTIME VIOLATION: Stack Overflow! Cannot insert elements into a full fixed-capacity buffer.`,
            conceptNote:
              'Stack Overflow occurs when pushing onto a full stack where size >= capacity.',
            resultingStack: [...workingStack],
            resultingTop: workingStack[workingStack.length - 1],
            statusBadge: 'overflow',
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: true,
          });
        } else if (isPeek && workingStack.length === 0) {
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'UNDERFLOW',
            displayLabel: `LINE ${idx + 1}: PEEK() [EMPTY]`,
            actionExplanation: `Line ${idx + 1} calls Peek(), but the stack is empty (size = 0).`,
            resultExplanation: `💥 RUNTIME VIOLATION: Null Pointer / Underflow! Peek requires at least one element to inspect.`,
            conceptNote: 'Inspecting the top of an empty stack causes an exception or undefined memory access.',
            resultingStack: [...workingStack],
            resultingTop: null,
            statusBadge: 'underflow',
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: true,
          });
        } else {
          // Mid-stack access
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'DEBUG_LINE',
            displayLabel: `LINE ${idx + 1}: ILLEGAL ADT ACCESS`,
            actionExplanation: `Line ${idx + 1} attempts an illegal operation (${dStep.text}) violating single-ended LIFO access.`,
            resultExplanation: `💥 ADT CONTRACT VIOLATION: Stacks do not support random index access or removing non-top elements!`,
            conceptNote:
              'The fundamental invariant of a Stack is single-ended access strictly at TOP.',
            resultingStack: [...workingStack],
            resultingTop: workingStack.length > 0 ? workingStack[workingStack.length - 1] : null,
            statusBadge: 'underflow',
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: true,
          });
        }
      } else {
        // Valid step
        if (isPush) {
          const match = dStep.text.match(/push\s*\(\s*(\d+)\s*\)/i);
          const val = match ? Number(match[1]) : 10;
          workingStack.push(val);
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'PUSH',
            value: val,
            displayLabel: `LINE ${idx + 1}: PUSH ${val}`,
            actionExplanation: `Line ${idx + 1}: Push(${val}) executes validly. Size is now ${workingStack.length}.`,
            resultExplanation: `${val} pushed onto the TOP. TOP is now ${val}.`,
            conceptNote: 'Valid push onto active stack within capacity limits.',
            resultingStack: [...workingStack],
            resultingTop: val,
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: false,
          });
        } else if (isPop) {
          const popped = workingStack.pop();
          const newTop = workingStack.length > 0 ? workingStack[workingStack.length - 1] : null;
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'POP',
            value: popped,
            displayLabel: `LINE ${idx + 1}: POP()`,
            actionExplanation: `Line ${idx + 1}: Pop() removes top element ${popped}. Stack has ${workingStack.length} items left.`,
            resultExplanation: `${popped} popped successfully. ${newTop !== null ? `TOP = ${newTop}` : 'Stack is now empty'}.`,
            conceptNote: 'Valid pop when size > 0.',
            resultingStack: [...workingStack],
            resultingTop: newTop,
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: false,
          });
        } else if (isPeek) {
          const topVal = workingStack[workingStack.length - 1];
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'PEEK',
            value: topVal,
            displayLabel: `LINE ${idx + 1}: PEEK()`,
            actionExplanation: `Line ${idx + 1}: Peek() inspects TOP (${topVal}) without removal.`,
            resultExplanation: `PEEK returns ${topVal}. The stack remains unchanged at size ${workingStack.length}.`,
            conceptNote: 'PEEK reads the top value without modifying the stack.',
            resultingStack: [...workingStack],
            resultingTop: topVal,
            peekValue: topVal,
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: false,
          });
        } else {
          steps.push({
            stepNumber: idx + 1,
            totalSteps: debugSteps.length,
            operation: 'DEBUG_LINE',
            displayLabel: `LINE ${idx + 1}: VALID`,
            actionExplanation: `Line ${idx + 1}: Instruction executes validly.`,
            resultExplanation: `Stack state is stable.`,
            conceptNote: 'Valid instruction.',
            resultingStack: [...workingStack],
            resultingTop: workingStack.length > 0 ? workingStack[workingStack.length - 1] : null,
            debugLineId: dStep.id,
            debugLineText: dStep.text,
            isFaulty: false,
          });
        }
      }
    });

    return steps;
  }

  // =========================================================================
  // LEVEL 6: SPEED STACK
  // =========================================================================
  if (level.type === 'speed') {
    const isPushMode = (challenge.mode as string) === 'push' || challenge.question.includes('PUSH');
    const targetVal = challenge.targetValue || 10;

    if (isPushMode) {
      const resulting = [...currentStack, targetVal];
      steps.push({
        stepNumber: 1,
        totalSteps: 1,
        operation: 'PUSH',
        value: targetVal,
        displayLabel: `PUSH ${targetVal}`,
        actionExplanation: `Speed prompt requires PUSH ${targetVal}. PUSH adds ${targetVal} directly to the TOP.`,
        resultExplanation: `${targetVal} pushed to TOP! Combo multiplier increases.`,
        conceptNote: 'Rapid-fire LIFO: each push places the target block at the top.',
        resultingStack: resulting,
        resultingTop: targetVal,
      });
    } else {
      const popped = currentStack[currentStack.length - 1] || targetVal;
      const resulting = currentStack.slice(0, -1);
      const newTop = resulting.length > 0 ? resulting[resulting.length - 1] : null;
      steps.push({
        stepNumber: 1,
        totalSteps: 1,
        operation: 'POP',
        value: popped,
        displayLabel: `POP ${popped}`,
        actionExplanation: `Speed prompt requires POP ${popped} from TOP.`,
        resultExplanation: `${popped} popped in record time! ${newTop !== null ? `TOP is now ${newTop}` : 'Stack empty'}.`,
        conceptNote: 'Fast LIFO pop clears the topmost item.',
        resultingStack: resulting,
        resultingTop: newTop,
      });
    }

    return steps;
  }

  // Fallback default
  return [
    {
      stepNumber: 1,
      totalSteps: 1,
      operation: 'DISPLAY',
      displayLabel: 'DISPLAY STACK',
      actionExplanation: 'Inspect the stack state and pointer.',
      resultExplanation: `Current stack: [${currentStack.join(', ')}]. TOP: ${getTopText(currentStack)}.`,
      conceptNote: 'Stack follows LIFO: Last In, First Out.',
      resultingStack: [...currentStack],
      resultingTop: currentStack.length > 0 ? currentStack[currentStack.length - 1] : null,
    },
  ];
}
