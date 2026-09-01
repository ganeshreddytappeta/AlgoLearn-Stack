import { TheoryLesson } from '../types';

export const THEORY_LESSONS: TheoryLesson[] = [
  // =========================================================================
  // CHAPTER 01: WHAT IS A STACK?
  // =========================================================================
  {
    id: 1,
    chapterNumber: '01',
    categoryLabel: 'FUNDAMENTALS',
    lessonNumber: 1,
    title: '1. What is a Stack?',
    shortDesc: 'Understand the definition, structure, and single-ended access of a Stack.',
    readTime: '2 min read',
    executiveDefinition:
      'A Stack is a linear data structure where elements are added and removed strictly from one end called the TOP.',
    criticalSpecifications: [
      'Linear structure: Elements are arranged sequentially in a vertical order.',
      'Single entry & exit: All insertions and deletions happen exclusively at the TOP.',
      'No random access: Middle elements cannot be extracted directly without removing all elements above them.',
      'Solid bottom: The base of the stack is closed; only the top is open.',
    ],
    analogy: {
      title: 'Stack of Plates in a Cafeteria',
      description:
        'When you wash a plate, you place it on TOP of the pile. When someone needs a plate, they take the TOP plate off first. You never pull a plate from the very bottom!',
    },
    example: {
      title: 'Basic Insertion Example',
      description:
        'Starting with an empty stack, placing 10 puts it at the bottom. Placing 20 puts it on top of 10. Placing 30 puts it at the active TOP.',
      steps: [
        'Push(10) → Stack: [10] (TOP = 10, BOTTOM = 10)',
        'Push(20) → Stack: [10, 20] (TOP = 20)',
        'Push(30) → Stack: [10, 20, 30] (TOP = 30)',
      ],
    },
    visualDiagram: {
      type: 'stack-ascii',
      operationLabel: 'Standard Stack Architecture',
      notes: 'Open top allows insertion/deletion; closed bottom secures base.',
      diagramText: `              TOP Pointer (Open End)
                   ↓
              ┌─────────┐
              │   30    │ ← Topmost (Newest)
              ├─────────┤
              │   20    │
              ├─────────┤
              │   10    │ ← Bottom (Oldest)
              └─────────┘
                   ↑
              BOTTOM Base (Closed End)`,
    },
    content: `### How a Stack Works
A **Stack** is an ordered, linear collection of elements with a strict restriction: **you can only insert or remove items at the top end**.

* **TOP**: The single accessible position representing the most recent element.
* **BOTTOM**: The fixed base holding the first inserted element.
* **Linear Ordering**: Elements are strictly aligned one over the other.

Because both insertion and removal occur at the same location, every standard stack operation runs in **O(1) Constant Time**.`,
    codeSnippet: {
      python: `# Stack creation in Python using a List
class Stack:
    def __init__(self):
        self.items = []
    def push(self, val):
        self.items.append(val)
    def pop(self):
        return self.items.pop()
    def peek(self):
        return self.items[-1] if self.items else None

s = Stack()
s.push(10)
s.push(20)
s.push(30)
print(s.peek())  # 30`,
      java: `// Stack creation in Java using standard API
import java.util.Stack;

public class BasicStack {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        s.push(30);
        System.out.println(s.peek()); // 30
    }
}`,
      cpp: `// Stack creation in C++ using STL
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    std::cout << s.top() << std::endl; // 30
    return 0;
}`,
      c: `// Basic Stack in C
#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top < MAX - 1) stack[++top] = val;
}

int peek() {
    return (top >= 0) ? stack[top] : -1;
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("Top: %d\\n", peek()); // 30
    return 0;
}`,
    },
    timeComplexity: 'O(1) Constant Time for all core operations',
    spaceComplexity: 'O(n) Total space proportional to number of elements',
    keyTakeaway:
      'A Stack is a linear data structure that follows LIFO, where insertion and deletion occur exclusively at the TOP.',
    interactiveDemoType: 'push-pop-sandbox',
  },

  // =========================================================================
  // CHAPTER 02: LIFO PRINCIPLE
  // =========================================================================
  {
    id: 2,
    chapterNumber: '02',
    categoryLabel: 'PRINCIPLE',
    lessonNumber: 2,
    title: '2. LIFO Principle',
    shortDesc: 'Discover why Last-In-First-Out is the fundamental law of Stacks.',
    readTime: '2 min read',
    executiveDefinition:
      'LIFO stands for Last In, First Out. The most recently added element is always the first one to be removed.',
    criticalSpecifications: [
      'LIFO = Last In, First Out.',
      'Reverse chronological retrieval: Elements come out in the exact reverse of arrival order.',
      'Newest is first: The last item pushed (e.g. 30) is the first item popped.',
      'Oldest is last: The first item pushed (e.g. 10) must wait until all items above it are popped.',
    ],
    analogy: {
      title: 'Can of Tennis Balls',
      description:
        'When you drop balls 1, 2, and 3 into a narrow canister, ball 3 sits right at the opening. When you open the canister, ball 3 comes out first!',
    },
    example: {
      title: 'LIFO Execution Trace',
      description: 'Push 10, then 20, then 30. Then call Pop().',
      steps: [
        'PUSH 10 → Stack: [10]',
        'PUSH 20 → Stack: [10, 20]',
        'PUSH 30 → Stack: [10, 20, 30] (30 was added LAST)',
        'POP()   → Returns 30! (30 comes out FIRST)',
      ],
    },
    visualDiagram: {
      type: 'lifo-sequence',
      operationLabel: 'LIFO Operational Cycle',
      notes: 'Push 10 → 20 → 30. Pop returns 30 first.',
      diagramText: `   [ PUSH 10 ]      [ PUSH 20 ]      [ PUSH 30 ]        [ POP() ]
        │                │                │                 │
     ┌──────┐         ┌──────┐         ┌──────┐             ↓
     │  10  │ ←TOP    │  20  │ ←TOP    │  30  │ ←TOP     Returns 30!
     └──────┘         ├──────┤         ├──────┤          (LAST IN → FIRST OUT)
                      │  10  │         │  20  │          ┌──────┐
                      └──────┘         ├──────┤          │  20  │ ← New TOP
                                       │  10  │          ├──────┤
                                       └──────┘          │  10  │
                                                         └──────┘`,
    },
    content: `### Understanding LIFO
**LIFO (Last In, First Out)** is the central governing rule of stacks.

1. **Insertion Order**: 10 was pushed 1st, 20 was pushed 2nd, and 30 was pushed 3rd (Last).
2. **Removal Order**: The first \`Pop()\` removes 30, the second \`Pop()\` removes 20, and the last \`Pop()\` removes 10.

Because only the TOP of the stack is open, the newest element always blocks older elements beneath it.`,
    codeSnippet: {
      python: `# LIFO Demonstration in Python
stack = []
stack.append(10)
stack.append(20)
stack.append(30) # 30 was pushed last

print(stack.pop()) # 30 (Popped first!)
print(stack.pop()) # 20
print(stack.pop()) # 10`,
      java: `// LIFO Demonstration in Java
import java.util.Stack;

public class LifoDemo {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println(stack.pop()); // 30 (LIFO)
        System.out.println(stack.pop()); // 20
        System.out.println(stack.pop()); // 10
    }
}`,
      cpp: `// LIFO Demonstration in C++
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);

    while (!s.empty()) {
        std::cout << s.top() << " "; // Prints: 30 20 10
        s.pop();
    }
    return 0;
}`,
      c: `// LIFO Demonstration in C
#include <stdio.h>
int stack[5], top = -1;

void push(int x) { stack[++top] = x; }
int pop() { return stack[top--]; }

int main() {
    push(10); push(20); push(30);
    printf("%d ", pop()); // 30
    printf("%d ", pop()); // 20
    printf("%d\\n", pop()); // 10
    return 0;
}`,
    },
    timeComplexity: 'O(1) Constant Time per Push and Pop',
    spaceComplexity: 'O(1) Auxiliary Space per operation',
    keyTakeaway:
      'LAST IN → FIRST OUT: The newest element inserted is always the first element processed and removed.',
    interactiveDemoType: 'lifo',
  },

  // =========================================================================
  // CHAPTER 03: STACK STRUCTURE & TOP
  // =========================================================================
  {
    id: 3,
    chapterNumber: '03',
    categoryLabel: 'STRUCTURE & POINTER',
    lessonNumber: 3,
    title: '3. Stack Structure & TOP',
    shortDesc: 'Understand the TOP pointer, bottom base, capacity, and size.',
    readTime: '3 min read',
    executiveDefinition:
      'A Stack structure is governed by a dynamic pointer variable called TOP, which always points to the uppermost active element.',
    criticalSpecifications: [
      'TOP Pointer: Variable tracking the index or memory address of the topmost item.',
      'Size Formula: Size = TOP + 1 (in standard 0-indexed systems).',
      'Empty Condition: TOP == -1 (for array stacks) or TOP == NULL (for linked lists).',
      'Full Condition: TOP == Capacity - 1 (in fixed-size arrays).',
      'Dynamic Shift: When current TOP is popped, the element beneath it becomes TOP.',
    ],
    analogy: {
      title: 'Spring-Loaded Plate Dispenser',
      description:
        'In a cafeteria, a spring holds a stack of plates. The top plate is the only one visible. When you take the top plate, the spring pushes the plate right beneath it up to become the new top!',
    },
    example: {
      title: 'TOP Movement Example',
      description: 'Stack has elements [20, 30, 40], so TOP points to 40.',
      steps: [
        'Current State: [20, 30, 40] → TOP points to 40 (Index 2).',
        'Action: Execute Pop() → 40 is removed.',
        'New State: [20, 30] → TOP shifts to 30 (Index 1).',
        'Conclusion: When current TOP is removed, the next element becomes TOP.',
      ],
    },
    visualDiagram: {
      type: 'stack-ascii',
      operationLabel: 'Dynamic TOP Pointer Shift',
      notes: 'TOP shifts down upon POP and shifts up upon PUSH.',
      diagramText: `     BEFORE POP()                      AFTER POP()
     TOP Pointer                           TOP Pointer
          ↓                                     ↓
    ┌──────────┐                          ┌──────────┐
    │    40    │ ← Current TOP (Index 2)  │    30    │ ← New TOP (Index 1)
    ├──────────┤                          ├──────────┤
    │    30    │                          │    20    │
    ├──────────┤                          └──────────┘
    │    20    │                               ↑
    └──────────┘                          BOTTOM Base (Index 0)
         ↑
    BOTTOM Base (Index 0)`,
    },
    content: `### Anatomy of a Stack
* **TOP**: The variable pointing to the active uppermost element. In an empty stack, TOP is initialized to \`-1\`.
* **BOTTOM**: Index 0, holding the earliest inserted element.
* **SIZE**: The total number of items currently stored (\`Size = TOP + 1\`).
* **CAPACITY**: The maximum elements allowed in a fixed array buffer.

> **Key Principle:** Whenever the current TOP element is removed, the element immediately underneath it automatically becomes the new TOP!`,
    codeSnippet: {
      python: `# Stack Structure in Python
class StackStructure:
    def __init__(self, capacity=5):
        self.capacity = capacity
        self.items = []
    
    @property
    def top_index(self): return len(self.items) - 1
    @property
    def top_value(self): return self.items[-1] if self.items else None
    @property
    def size(self): return len(self.items)
    @property
    def is_empty(self): return len(self.items) == 0
    @property
    def is_full(self): return len(self.items) >= self.capacity`,
      java: `// Stack Structure in Java
public class StackStructure {
    private int[] data = new int[5];
    private int top = -1;

    public int getTopIndex() { return top; }
    public int getSize() { return top + 1; }
    public boolean isEmpty() { return top == -1; }
    public boolean isFull() { return top == 4; }
}`,
      cpp: `// Stack Structure in C++
struct StackStructure {
    int data[5];
    int top = -1;

    int size() const { return top + 1; }
    bool isEmpty() const { return top == -1; }
    bool isFull() const { return top == 4; }
};`,
      c: `// Stack Structure in C
#include <stdbool.h>
#define CAPACITY 5

typedef struct {
    int data[CAPACITY];
    int top; // -1 when empty
} StackStructure;

int getSize(StackStructure *s) { return s->top + 1; }
bool isEmpty(StackStructure *s) { return s->top == -1; }
bool isFull(StackStructure *s) { return s->top == CAPACITY - 1; }`,
    },
    timeComplexity: 'O(1) to inspect TOP index, Size, or Boundary flags',
    spaceComplexity: 'O(1) Auxiliary Space',
    keyTakeaway:
      'TOP always points to the uppermost active element. When TOP is removed, the element beneath it becomes the new TOP.',
    interactiveDemoType: 'top-pointer',
  },

  // =========================================================================
  // CHAPTER 04: STACK OPERATIONS
  // =========================================================================
  {
    id: 4,
    chapterNumber: '04',
    categoryLabel: 'OPERATIONS',
    lessonNumber: 4,
    title: '4. Stack Operations',
    shortDesc: 'Master PUSH, POP, PEEK, DISPLAY, and supporting operations.',
    readTime: '3 min read',
    executiveDefinition:
      'The primary Stack operations are PUSH (add to TOP), POP (remove from TOP), PEEK (view TOP), and DISPLAY (show stack).',
    criticalSpecifications: [
      'PUSH(x): Inserts value x at TOP. Increments TOP pointer. [O(1)]',
      'POP(): Removes and returns the TOP element. Decrements TOP pointer. [O(1)]',
      'PEEK() / TOP(): Reads the value at TOP without removing it. [O(1)]',
      'DISPLAY(): Traverses and prints elements from TOP to BOTTOM without popping. [O(n)]',
      'isEmpty(): Returns true if TOP == -1. [O(1)]',
      'isFull(): Returns true if TOP == Capacity - 1. [O(1)]',
    ],
    analogy: {
      title: 'ATM Cash Dispenser Cartridge',
      description:
        'Push loads a new bill at the top. Pop dispenses the top bill. Peek checks the denomination of the top bill without dispensing it. Display counts all bills inside.',
    },
    example: {
      title: 'Operations Flow Example',
      description: 'Executing operations on stack with initial elements [10, 20]:',
      steps: [
        'Push(40)  → 40 enters TOP. Stack is now [10, 20, 40].',
        'Peek()    → Returns 40. Stack remains [10, 20, 40] (unchanged!).',
        'Display() → Outputs: 40 → 20 → 10 (Stack remains unchanged).',
        'Pop()     → Removes 40. Stack is now [10, 20].',
      ],
    },
    visualDiagram: {
      type: 'before-after',
      operationLabel: 'Primary Stack Operations Matrix',
      notes: 'All operations target the TOP index directly.',
      diagramText: `  OPERATION   │  ACTION                  │  TIME   │  STACK MUTATION?
 ─────────────┼──────────────────────────┼─────────┼──────────────────
  PUSH(x)     │  Adds x to TOP           │  O(1)   │  YES (Size + 1)
  POP()       │  Removes & returns TOP   │  O(1)   │  YES (Size - 1)
  PEEK()      │  Views TOP value         │  O(1)   │  NO  (Read-only)
  DISPLAY()   │  Prints all elements     │  O(n)   │  NO  (Traversal)
  isEmpty()   │  Checks if Size == 0     │  O(1)   │  NO  (Read-only)
  isFull()    │  Checks if Size == Max   │  O(1)   │  NO  (Read-only)`,
    },
    content: `### Primary Operations
1. **PUSH**: Inserts a new value onto the top of the stack.
2. **POP**: Removes the topmost element and returns its value.
3. **PEEK (or TOP)**: Returns the topmost element without removing it.
4. **DISPLAY**: Traverses the stack from TOP to BOTTOM and displays its contents without modifying the stack.

### Supporting Operations
* \`isEmpty()\`: Verifies if the stack contains zero elements.
* \`isFull()\`: Verifies if a fixed-size stack has reached maximum capacity.
* \`size()\`: Returns the current count of elements.`,
    codeSnippet: {
      python: `# Complete Stack Operations in Python
class StackOps:
    def __init__(self): self.data = []
    def push(self, x): self.data.append(x)
    def pop(self): return self.data.pop() if self.data else None
    def peek(self): return self.data[-1] if self.data else None
    def display(self): print(" -> ".join(map(str, reversed(self.data))))
    def is_empty(self): return len(self.data) == 0`,
      java: `// Complete Stack Operations in Java
import java.util.Stack;

public class StackOps {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        s.push(40);
        System.out.println("Peek: " + s.peek()); // 40
        System.out.println("Popped: " + s.pop()); // 40
        System.out.println("New Top: " + s.peek()); // 20
    }
}`,
      cpp: `// Complete Stack Operations in C++
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    s.push(40);
    std::cout << "Top: " << s.top() << std::endl; // 40
    s.pop();
    std::cout << "New Top: " << s.top() << std::endl; // 20
    return 0;
}`,
      c: `// Complete Stack Operations in C
#include <stdio.h>
#define MAX 5
int stack[MAX], top = -1;

void push(int x) { if (top < MAX - 1) stack[++top] = x; }
int pop() { return (top >= 0) ? stack[top--] : -1; }
int peek() { return (top >= 0) ? stack[top] : -1; }
void display() {
    for (int i = top; i >= 0; i--) printf("%d ", stack[i]);
    printf("\\n");
}`,
    },
    timeComplexity: 'PUSH, POP, PEEK: O(1) | DISPLAY: O(n)',
    spaceComplexity: 'O(1) Auxiliary Space per operation',
    keyTakeaway:
      'PUSH adds to TOP, POP removes from TOP, PEEK views TOP without removal, and DISPLAY traverses non-destructively.',
    interactiveDemoType: 'mini-operations',
  },

  // =========================================================================
  // CHAPTER 05: STACK ALGORITHMS
  // =========================================================================
  {
    id: 5,
    chapterNumber: '05',
    categoryLabel: 'ALGORITHMS',
    lessonNumber: 5,
    title: '5. Stack Algorithms',
    shortDesc: 'Step-by-step algorithmic flowcharts for Push, Pop, and Peek.',
    readTime: '3 min read',
    executiveDefinition:
      'Stack algorithms define the exact step-by-step verification and pointer mutation sequence for Push, Pop, and Peek operations.',
    criticalSpecifications: [
      'Push Step 1: Check if stack is full. If yes, trigger Overflow.',
      'Push Step 2: Increment TOP (TOP = TOP + 1).',
      'Push Step 3: Store element at stack[TOP].',
      'Pop Step 1: Check if stack is empty. If yes, trigger Underflow.',
      'Pop Step 2: Retrieve element at stack[TOP].',
      'Pop Step 3: Decrement TOP (TOP = TOP - 1) and return value.',
    ],
    analogy: {
      title: 'Security Turnstile Guard',
      description:
        'Before letting a person in (Push), the guard checks if the room is full. Before letting a person exit (Pop), the guard checks if anyone is inside!',
    },
    example: {
      title: 'Algorithm Execution Steps',
      description: 'Trace how Push and Pop execute defensibly.',
      steps: [
        'Push(50): 1. Check Full? (No) → 2. top = top + 1 → 3. arr[top] = 50 → 4. Done.',
        'Pop():    1. Check Empty? (No) → 2. val = arr[top] → 3. top = top - 1 → 4. Return val.',
      ],
    },
    visualDiagram: {
      type: 'stack-ascii',
      operationLabel: 'Push & Pop Flowchart Execution Paths',
      notes: 'Defensive verification guards must precede any pointer mutation.',
      diagramText: `PUSH ALGORITHM FLOWCHART                 POP ALGORITHM FLOWCHART
       ┌──────────────┐                        ┌──────────────┐
       │    START     │                        │    START     │
       └──────┬───────┘                        └──────┬───────┘
              ↓                                       ↓
       ┌──────────────┐                        ┌──────────────┐
       │Is Stack Full?│                        │Is Stack Empty│
       └──┬────────┬──┘                        └──┬────────┬──┘
      YES │        │ NO                       YES │        │ NO
          ↓        ↓                              ↓        ↓
    ┌──────────┐ ┌──────────────┐           ┌──────────┐ ┌──────────────┐
    │ OVERFLOW │ │TOP = TOP + 1 │           │UNDERFLOW │ │ Read Element │
    └──────────┘ └──────┬───────┘           └──────────┘ └──────┬───────┘
                        ↓                                       ↓
                 ┌──────────────┐                        ┌──────────────┐
                 │ STORE VALUE  │                        │TOP = TOP - 1 │
                 └──────┬───────┘                        └──────┬───────┘
                        ↓                                       ↓
                 ┌──────────────┐                        ┌──────────────┐
                 │     END      │                        │ RETURN VALUE │
                 └──────────────┘                        └──────────────┘`,
    },
    content: `### Algorithmic Execution Steps

#### 1. The PUSH Algorithm
1. **START**
2. Check: Is Stack Full? (\`top == capacity - 1\`)
   - **YES** $\\rightarrow$ Print **Stack Overflow Error** & Exit.
   - **NO** $\\rightarrow$ Proceed to step 3.
3. Increment TOP: \`TOP = TOP + 1\`
4. Store element: \`stack[TOP] = value\`
5. **END (Success)**

---

#### 2. The POP Algorithm
1. **START**
2. Check: Is Stack Empty? (\`top == -1\`)
   - **YES** $\\rightarrow$ Print **Stack Underflow Error** & Exit.
   - **NO** $\\rightarrow$ Proceed to step 3.
3. Retrieve value: \`value = stack[TOP]\`
4. Decrement TOP: \`TOP = TOP - 1\`
5. **RETURN value**`,
    codeSnippet: {
      python: `# Push and Pop Algorithms in Python
def push(stack, capacity, val):
    if len(stack) >= capacity:
        raise OverflowError("STACK OVERFLOW")
    stack.append(val)

def pop(stack):
    if not stack:
        raise IndexError("STACK UNDERFLOW")
    return stack.pop()`,
      java: `// Push and Pop Algorithms in Java
public class StackAlgorithms {
    public static void push(int[] arr, int[] top, int capacity, int val) {
        if (top[0] == capacity - 1) throw new RuntimeException("STACK OVERFLOW");
        top[0]++;
        arr[top[0]] = val;
    }
    public static int pop(int[] arr, int[] top) {
        if (top[0] == -1) throw new RuntimeException("STACK UNDERFLOW");
        int val = arr[top[0]];
        top[0]--;
        return val;
    }
}`,
      cpp: `// Push and Pop Algorithms in C++
#include <iostream>
#include <stdexcept>

void push(int arr[], int &top, int capacity, int val) {
    if (top == capacity - 1) throw std::overflow_error("STACK OVERFLOW");
    arr[++top] = val;
}

int pop(int arr[], int &top) {
    if (top == -1) throw std::underflow_error("STACK UNDERFLOW");
    return arr[top--];
}`,
      c: `// Push and Pop Algorithms in C
#include <stdio.h>
#define CAPACITY 5

int stack[CAPACITY];
int top = -1;

void push(int val) {
    if (top == CAPACITY - 1) {
        printf("ERROR: STACK OVERFLOW\\n");
        return;
    }
    stack[++top] = val;
}

int pop() {
    if (top == -1) {
        printf("ERROR: STACK UNDERFLOW\\n");
        return -1;
    }
    return stack[top--];
}`,
    },
    timeComplexity: 'O(1) Constant Time for algorithm execution',
    spaceComplexity: 'O(1) Auxiliary Space',
    keyTakeaway:
      'Every stack operation follows a strict defensive verification sequence before adjusting the TOP pointer.',
    interactiveDemoType: 'algorithm-flowchart',
  },

  // =========================================================================
  // CHAPTER 06: OVERFLOW & UNDERFLOW
  // =========================================================================
  {
    id: 6,
    chapterNumber: '06',
    categoryLabel: 'BOUNDARY CONDITIONS',
    lessonNumber: 6,
    title: '6. Stack Overflow & Underflow',
    shortDesc: 'Understand boundary errors and defensive guard conditions.',
    readTime: '2 min read',
    executiveDefinition:
      'Stack Overflow occurs when attempting to PUSH to a FULL stack. Stack Underflow occurs when attempting to POP or PEEK from an EMPTY stack.',
    criticalSpecifications: [
      'Stack Overflow: PUSH executed when Size == Capacity (TOP == Capacity - 1).',
      'Stack Underflow: POP executed when Size == 0 (TOP == -1).',
      'Overflow Cause: Exceeding fixed array bounds or unbounded recursive function calls.',
      'Underflow Cause: Popping from an uninitialized or exhausted stack.',
      'Defensive Fix: Always wrap mutations with isFull() and isEmpty() checks.',
    ],
    analogy: {
      title: 'Full Cup & Empty Dispenser',
      description:
        'Pouring coffee into a cup that is already completely full causes hot coffee to spill (Overflow). Pulling a cup from an empty dispenser yields nothing (Underflow).',
    },
    example: {
      title: 'Boundary Fault Scenarios',
      description: 'Observing Overflow and Underflow in action:',
      steps: [
        'Overflow: Stack capacity = 3. Current: [10, 20, 30]. Execute Push(40) → ❌ OVERFLOW!',
        'Underflow: Stack is [ ]. Current: Size = 0. Execute Pop() → ❌ UNDERFLOW!',
      ],
    },
    visualDiagram: {
      type: 'before-after',
      operationLabel: 'Boundary Error States',
      notes: 'Guard checks protect software from crash conditions.',
      diagramText: `  STACK OVERFLOW                       STACK UNDERFLOW
  Capacity = 3                         Current Size = 0
  
  ┌──────────┐                         ┌──────────┐
  │    30    │ ← TOP (Index 2)         │          │ ← TOP = -1 (Empty)
  ├──────────┤                         └──────────┘
  │    20    │                              │
  ├──────────┤                              ↓
  │    10    │                         Operation: POP()
  └──────────┘                         Result: ❌ STACK UNDERFLOW!
       │
       ↓
  Operation: PUSH(40)
  Result: ❌ STACK OVERFLOW! (Capacity Exceeded)`,
    },
    content: `### Boundary Errors Explained

1. **Stack Overflow**: Occurs when a program attempts to **PUSH** an element onto a stack that has already reached its maximum allocated capacity.
   * *Common Cause:* Unbounded recursion without a base case.
2. **Stack Underflow**: Occurs when a program attempts to **POP** or **PEEK** from an **EMPTY stack**.
   * *Common Cause:* Popping more times than elements pushed.`,
    codeSnippet: {
      python: `# Defensive Boundary Guards in Python
class SafeStack:
    def __init__(self, capacity=3):
        self.capacity = capacity
        self.items = []
    
    def push(self, x):
        if len(self.items) >= self.capacity:
            raise OverflowError("Stack Overflow")
        self.items.append(x)
        
    def pop(self):
        if not self.items:
            raise IndexError("Stack Underflow")
        return self.items.pop()`,
      java: `// Defensive Boundary Guards in Java
public class SafeStack {
    private int[] data = new int[3];
    private int top = -1;

    public void push(int x) {
        if (top == 2) throw new RuntimeException("Stack Overflow");
        data[++top] = x;
    }
    public int pop() {
        if (top == -1) throw new RuntimeException("Stack Underflow");
        return data[top--];
    }
}`,
      cpp: `// Defensive Boundary Guards in C++
#include <iostream>
#include <stdexcept>

class SafeStack {
    int data[3];
    int top = -1;
public:
    void push(int x) {
        if (top == 2) throw std::overflow_error("Stack Overflow");
        data[++top] = x;
    }
    int pop() {
        if (top == -1) throw std::underflow_error("Stack Underflow");
        return data[top--];
    }
};`,
      c: `// Defensive Boundary Guards in C
#include <stdio.h>
#define MAX 3
int stack[MAX], top = -1;

void push(int x) {
    if (top == MAX - 1) {
        printf("❌ STACK OVERFLOW! Cannot push %d.\\n", x);
        return;
    }
    stack[++top] = x;
}

int pop() {
    if (top == -1) {
        printf("❌ STACK UNDERFLOW! Cannot pop from empty stack.\\n");
        return -1;
    }
    return stack[top--];
}`,
    },
    timeComplexity: 'O(1) Boundary check verification',
    spaceComplexity: 'O(1) Auxiliary Space',
    keyTakeaway:
      'Always check isFull() before Push to prevent Overflow, and check isEmpty() before Pop to prevent Underflow.',
    interactiveDemoType: 'overflow-underflow',
  },

  // =========================================================================
  // CHAPTER 07: ARRAY IMPLEMENTATION
  // =========================================================================
  {
    id: 7,
    chapterNumber: '07',
    categoryLabel: 'ARRAY IMPLEMENTATION',
    lessonNumber: 7,
    title: '7. Stack Implementation Using Arrays',
    shortDesc: 'Learn how to implement a Stack using contiguous memory and a top index.',
    readTime: '3 min read',
    executiveDefinition:
      'An Array-based Stack stores elements in contiguous memory cells using a single integer variable `top` (initialized to -1) to point to the active top element index.',
    criticalSpecifications: [
      'Contiguous RAM: Elements sit side-by-side in memory for optimal CPU cache speed.',
      'Integer Index: top = -1 when empty; top = top + 1 on Push; top = top - 1 on Pop.',
      'Zero pointer memory overhead: Stores raw data without pointers.',
      'Fixed Capacity: Requires upfront allocation size.',
    ],
    analogy: {
      title: 'Ice Cube Tray Slots',
      description:
        'An ice cube tray has numbered slots 0 to 4. Slot 0 is filled first, then slot 1, then slot 2. The variable top stores the number of the highest filled slot!',
    },
    example: {
      title: 'Array Stack State Tracking',
      description: 'Stack with elements [10, 20, 30] in an array of size 5:',
      steps: [
        'Index 0: 10 (Bottom)',
        'Index 1: 20',
        'Index 2: 30 ← TOP (top = 2)',
        'Push(40) → top becomes 3; arr[3] = 40 (New TOP)',
      ],
    },
    visualDiagram: {
      type: 'array-table',
      operationLabel: 'Contiguous Indexed Array Memory Buffer',
      notes: 'Index 2 is TOP; Capacity is 5.',
      diagramText: `  INDEX     VALUE     STATUS
 ───────────────────────────────
    4       [   ]     EMPTY
    3       [   ]     EMPTY
    2       [ 30 ]    ← TOP (top = 2)
    1       [ 20 ]    OCCUPIED
    0       [ 10 ]    ← BOTTOM (Index 0)
 ───────────────────────────────
  Capacity: 5 | Current Size: 3 (top + 1)`,
    },
    content: `### Array-Based Architecture
In an array implementation, an integer variable \`top\` stores the array index of the current topmost element.

* **Push**: \`arr[++top] = value\`
* **Pop**: \`return arr[top--]\`
* **Peek**: \`return arr[top]\`

**Trade-offs:**
* *Pros:* Ultra-fast direct memory indexing and zero pointer memory overhead.
* *Cons:* Fixed capacity limit.`,
    codeSnippet: {
      python: `# Array-Based Stack in Python
class ArrayStack:
    def __init__(self, capacity=5):
        self.capacity = capacity
        self.arr = [None] * capacity
        self.top = -1

    def push(self, val):
        if self.top == self.capacity - 1: raise OverflowError("Overflow")
        self.top += 1
        self.arr[self.top] = val

    def pop(self):
        if self.top == -1: raise IndexError("Underflow")
        val = self.arr[self.top]
        self.top -= 1
        return val`,
      java: `// Complete Array Stack in Java
public class ArrayStack {
    private int[] arr;
    private int top = -1;
    private int capacity;

    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.arr = new int[capacity];
    }
    public void push(int val) {
        if (top == capacity - 1) throw new RuntimeException("Overflow");
        arr[++top] = val;
    }
    public int pop() {
        if (top == -1) throw new RuntimeException("Underflow");
        return arr[top--];
    }
}`,
      cpp: `// Complete Array Stack in C++
#include <iostream>
#include <stdexcept>

class ArrayStack {
    int *arr;
    int top;
    int capacity;
public:
    ArrayStack(int cap = 5) : capacity(cap), top(-1) {
        arr = new int[capacity];
    }
    void push(int val) {
        if (top == capacity - 1) throw std::overflow_error("Overflow");
        arr[++top] = val;
    }
    int pop() {
        if (top == -1) throw std::underflow_error("Underflow");
        return arr[top--];
    }
};`,
      c: `// Complete Array Stack in C
#include <stdio.h>
#define CAPACITY 5

typedef struct {
    int arr[CAPACITY];
    int top;
} ArrayStack;

void init(ArrayStack *s) { s->top = -1; }
void push(ArrayStack *s, int val) {
    if (s->top < CAPACITY - 1) s->arr[++(s->top)] = val;
}
int pop(ArrayStack *s) {
    return (s->top >= 0) ? s->arr[(s->top)--] : -1;
}`,
    },
    timeComplexity: 'O(1) Constant Time for all array stack operations',
    spaceComplexity: 'O(n) Total capacity allocated',
    keyTakeaway:
      'Array-based stacks provide ultra-fast O(1) contiguous memory access with zero pointer overhead, bounded by fixed capacity.',
    interactiveDemoType: 'array-stack',
  },

  // =========================================================================
  // CHAPTER 08: LINKED LIST IMPLEMENTATION
  // =========================================================================
  {
    id: 8,
    chapterNumber: '08',
    categoryLabel: 'LINKED LIST IMPLEMENTATION',
    lessonNumber: 8,
    title: '8. Stack Implementation Using Linked Lists',
    shortDesc: 'Implement dynamic, unlimited-growth Stacks using linked nodes.',
    readTime: '3 min read',
    executiveDefinition:
      'A Linked List Stack stores elements in dynamically allocated heap nodes where the TOP pointer points to the head node of the chain.',
    criticalSpecifications: [
      'Dynamic sizing: Grows and shrinks on demand with zero fixed capacity limit.',
      'Node Structure: Each node contains a `data` field and a `next` pointer.',
      'TOP = Head Node: Insertion and removal happen at the head in O(1) time.',
      'Push: newNode->next = TOP; TOP = newNode.',
      'Pop: temp = TOP; TOP = TOP->next; free(temp).',
    ],
    analogy: {
      title: 'Chain of Magnetic Paperclips',
      description:
        'Each paperclip connects to the one behind it. To add a paperclip, you snap it onto the front and make it the new head. To remove one, you take off the front clip.',
    },
    example: {
      title: 'Node Chain Example',
      description: 'Pushing 40 onto stack [30] -> [20] -> [10] -> NULL:',
      steps: [
        'Before: TOP ↓ [30 | •] → [20 | •] → [10 | NULL]',
        'Action: Allocate Node(40), link 40->next = 30, set TOP = 40.',
        'After:  TOP ↓ [40 | •] → [30 | •] → [20 | •] → [10 | NULL]',
      ],
    },
    visualDiagram: {
      type: 'linked-list',
      operationLabel: 'Dynamic Node-Pointer Chain',
      notes: 'Each element is a discrete node; TOP points to the first node.',
      diagramText: `  TOP Pointer
       ↓
  ┌─────────┬───┐       ┌─────────┬───┐       ┌─────────┬──────┐
  │   30    │ •─┼──────>│   20    │ •─┼──────>│   10    │ NULL │
  └─────────┴───┘       └─────────┴───┘       └─────────┴──────┘
  (Head Node)           (Middle Node)         (Bottom Node)`,
    },
    content: `### Linked List Stack Architecture
In a linked list implementation, every element is wrapped in a **Node** object allocated dynamically in heap memory.

* **TOP** is simply the head pointer of the singly linked list.
* **Push**: Allocates a new node and links it to the previous head.
* **Pop**: Moves TOP to \`TOP.next\` and frees the old head.

**Trade-offs:**
* *Pros:* No maximum capacity limit (eliminates Stack Overflow).
* *Cons:* Requires additional memory for node pointers.`,
    codeSnippet: {
      python: `# Linked List Stack in Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListStack:
    def __init__(self):
        self.top = None

    def push(self, val):
        new_node = Node(val)
        new_node.next = self.top
        self.top = new_node

    def pop(self):
        if not self.top: raise IndexError("Underflow")
        val = self.top.data
        self.top = self.top.next
        return val`,
      java: `// Linked List Stack in Java
public class LinkedListStack {
    private static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }
    private Node top = null;

    public void push(int val) {
        Node newNode = new Node(val);
        newNode.next = top;
        top = newNode;
    }
    public int pop() {
        if (top == null) throw new RuntimeException("Underflow");
        int val = top.data;
        top = top.next;
        return val;
    }
}`,
      cpp: `// Linked List Stack in C++
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListStack {
    Node* top = nullptr;
public:
    void push(int val) {
        Node* newNode = new Node(val);
        newNode->next = top;
        top = newNode;
    }
    int pop() {
        if (!top) throw std::underflow_error("Underflow");
        int val = top->data;
        Node* temp = top;
        top = top->next;
        delete temp;
        return val;
    }
};`,
      c: `// Linked List Stack in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *top = NULL;

void push(int val) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = top;
    top = newNode;
}

int pop() {
    if (!top) return -1;
    Node *temp = top;
    int val = top->data;
    top = top->next;
    free(temp);
    return val;
}`,
    },
    timeComplexity: 'O(1) Constant Time for Push, Pop, and Peek',
    spaceComplexity: 'O(n) Proportional to items + pointer overhead',
    keyTakeaway:
      'Linked list stacks dynamically grow and shrink in memory, eliminating fixed capacity limits at the cost of pointer storage.',
    interactiveDemoType: 'linkedlist-stack',
  },

  // =========================================================================
  // CHAPTER 09: COMPLEXITY
  // =========================================================================
  {
    id: 9,
    chapterNumber: '09',
    categoryLabel: 'COMPLEXITY ANALYSIS',
    lessonNumber: 9,
    title: '9. Stack Time & Space Complexity',
    shortDesc: 'Understand why Stack operations are O(1) and compare memory trade-offs.',
    readTime: '2 min read',
    executiveDefinition:
      'All primary Stack operations operate in deterministic O(1) constant time because operations occur strictly at the TOP. Traversal (DISPLAY) is O(n).',
    criticalSpecifications: [
      'Push: O(1) Constant Time (single write at TOP).',
      'Pop: O(1) Constant Time (single read and decrement at TOP).',
      'Peek: O(1) Constant Time (single inspection at TOP).',
      'isEmpty / isFull: O(1) Constant Time.',
      'Display / Search: O(n) Linear Time (must visit each element).',
      'Space Complexity: O(n) total space, O(1) auxiliary per operation.',
    ],
    analogy: {
      title: 'Top Card on a Deck vs Finding an Ace',
      description:
        'Picking up the top card of a deck takes 1 second regardless of whether the deck has 10 cards or 10,000 cards (O(1)). Searching through the entire deck to find an Ace takes time proportional to deck size (O(n)).',
    },
    example: {
      title: 'Complexity Comparison',
      description: 'Why Push, Pop, and Peek are constant time:',
      steps: [
        'Push: array[++top] = val (1 CPU instruction) → O(1)',
        'Pop: val = array[top--] (1 CPU instruction) → O(1)',
        'Display: Loop over all n items from top to 0 → O(n)',
      ],
    },
    visualDiagram: {
      type: 'comparison',
      operationLabel: 'Big-O Operational Complexity Table',
      notes: 'Constant time O(1) guarantees deterministic performance.',
      diagramText: `  OPERATION   │  TIME COMPLEXITY  │  SPACE (AUX)  │  WHY?
 ─────────────┼───────────────────┼───────────────┼─────────────────────────
  PUSH        │  O(1) Constant    │  O(1)         │  Direct write at TOP
  POP         │  O(1) Constant    │  O(1)         │  Direct removal at TOP
  PEEK        │  O(1) Constant    │  O(1)         │  Direct read of TOP
  isEmpty     │  O(1) Constant    │  O(1)         │  Single conditional check
  isFull      │  O(1) Constant    │  O(1)         │  Single conditional check
  DISPLAY     │  O(n) Linear      │  O(1)         │  Must visit all n items`,
    },
    content: `### Why are Stacks so Fast?
Because Push, Pop, and Peek **work directly with the TOP pointer**, they never shift remaining elements in memory. Thus, their execution speed is completely independent of the number of items in the stack.`,
    codeSnippet: {
      python: `# Benchmark: 1 Million O(1) Stack Operations in Python
import time
stack = []
start = time.time()
for i in range(1_000_000): stack.append(i)
print(f"1M Pushes completed in {time.time() - start:.4f}s")`,
      java: `// Benchmark: 1 Million O(1) Stack Operations in Java
import java.util.ArrayDeque;

public class StackBenchmark {
    public static void main(String[] args) {
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1_000_000; i++) stack.push(i);
        System.out.println("1M Pushes: " + (System.currentTimeMillis() - start) + "ms");
    }
}`,
      cpp: `// Benchmark: 1 Million O(1) Stack Operations in C++
#include <iostream>
#include <stack>
#include <chrono>

int main() {
    std::stack<int> s;
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; ++i) s.push(i);
    std::cout << "Executed 1M O(1) pushes in constant time.\\n";
    return 0;
}`,
      c: `// Benchmark: 1 Million O(1) Stack Operations in C
#include <stdio.h>
#define N 1000000
int stack[N], top = -1;

int main() {
    for (int i = 0; i < N; i++) stack[++top] = i; // 1M O(1) Pushes
    printf("Successfully executed 1,000,000 O(1) operations.\\n");
    return 0;
}`,
    },
    timeComplexity: 'O(1) Constant Time across all core operations',
    spaceComplexity: 'O(n) Total space, O(1) Auxiliary space',
    keyTakeaway:
      'All primary Stack operations execute in O(1) constant time with O(n) total space and O(1) auxiliary space.',
    interactiveDemoType: 'complexity-table',
  },

  // =========================================================================
  // CHAPTER 10: STACK PROBLEM SOLVING
  // =========================================================================
  {
    id: 10,
    chapterNumber: '10',
    categoryLabel: 'PROBLEM SOLVING',
    lessonNumber: 10,
    title: '10. Stack Problem Solving',
    shortDesc: 'Solve balanced brackets, expression conversion, call stacks, and backtracking.',
    readTime: '4 min read',
    executiveDefinition:
      'Stacks naturally solve problems requiring symmetric matching, order reversal, expression evaluation, or state backtracking.',
    criticalSpecifications: [
      'Balanced Parentheses: Push opening brackets; pop and match closing brackets.',
      'Infix to Postfix: Converts human math (A+B) into machine order (AB+) using operator stacks.',
      'Postfix Evaluation: Push numbers; pop 2 operands on operator and push result.',
      'Backtracking: Push decisions to explore; pop to retreat on dead ends.',
      'Call Stack: Manages function frames and return addresses.',
    ],
    analogy: {
      title: 'Hansel and Gretel Breadcrumbs',
      description:
        'In a maze, you drop breadcrumbs as you explore forward (Push). When you hit a dead-end wall, you follow your breadcrumb trail backward (Pop) to the last unexplored fork.',
    },
    example: {
      title: 'Balanced Brackets Example',
      description: 'Validating string "{ [ ( ) ] }":',
      steps: [
        'See "{", "[", "(" → Push all three: Stack = ["{", "[", "("]',
        'See ")" → Pop "(" (Matches! ✓)',
        'See "]" → Pop "[" (Matches! ✓)',
        'See "}" → Pop "{" (Matches! ✓)',
        'End: Stack is empty → Balanced & Valid!',
      ],
    },
    visualDiagram: {
      type: 'brackets',
      operationLabel: 'Bracket Symmetry Verification',
      notes: 'Openers push to stack; closers pop and must match top.',
      diagramText: `  BALANCED BRACKET MATCHING: "{ [ ( ) ] }"
  
  Input: '{'  → PUSH '{'  → Stack: [ { ]
  Input: '['  → PUSH '['  → Stack: [ {, [ ]
  Input: '('  → PUSH '('  → Stack: [ {, [, ( ]
  Input: ')'  → POP '('   → Matched '(' with ')'! ✓
  Input: ']'  → POP '['   → Matched '[' with ']'! ✓
  Input: '}'  → POP '{'   → Matched '{' with '}'! ✓
  
  Stack is EMPTY at end → ✅ BALANCED STRING!`,
    },
    content: `### Classic Stack Algorithmic Patterns

#### 1. Balanced Parentheses
Scan string from left to right:
* If opening bracket (\`(\`, \`[\`, \`{\`), **PUSH** to stack.
* If closing bracket (\`)\`, \`]\`, \`}\`), **POP** and verify it matches.
* String is valid if stack is empty at termination.

#### 2. Expression Conversion
* **Infix**: \`A + B\` (Human readable, needs parentheses)
* **Postfix (RPN)**: \`A B +\` (Machine evaluated directly by stack)
* **Prefix**: \`+ A B\` (Operator first)

#### 3. Backtracking in Mazes
Push paths as you explore. When hitting a dead end, pop to backtrack to the previous branch.`,
    codeSnippet: {
      python: `# Balanced Parentheses in Python
def is_balanced(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in "({[":
            stack.append(ch)
        elif ch in ")}]":
            if not stack or stack.pop() != mapping[ch]:
                return False
    return len(stack) == 0`,
      java: `// Balanced Parentheses in Java
import java.util.Stack;

public class BalancedBrackets {
    public static boolean isBalanced(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else if (c == ')' || c == '}' || c == ']') {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
      cpp: `// Balanced Parentheses in C++
#include <iostream>
#include <stack>
#include <string>

bool isBalanced(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else if (c == ')' || c == '}' || c == ']') {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      c: `// Balanced Parentheses in C
#include <stdio.h>
#include <stdbool.h>

bool isBalanced(const char *s) {
    char stack[100];
    int top = -1;
    for (int i = 0; s[i] != '\\0'; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') stack[++top] = c;
        else if (c == ')' || c == '}' || c == ']') {
            if (top == -1) return false;
            char t = stack[top--];
            if (c == ')' && t != '(') return false;
            if (c == '}' && t != '{') return false;
            if (c == ']' && t != '[') return false;
        }
    }
    return top == -1;
}`,
    },
    timeComplexity: 'O(n) Linear Time to scan n characters',
    spaceComplexity: 'O(n) Auxiliary Space for stack',
    keyTakeaway:
      'Whenever an algorithm requires symmetrical nesting, order reversal, expression evaluation, or state backtracking, a Stack is the ideal solution.',
    interactiveDemoType: 'problem-solving',
  },

  // =========================================================================
  // CHAPTER 11: REAL-WORLD APPLICATIONS
  // =========================================================================
  {
    id: 11,
    chapterNumber: '11',
    categoryLabel: 'REAL-WORLD SYSTEMS',
    lessonNumber: 11,
    title: '11. Real-World Applications',
    shortDesc: 'Discover how Stacks power browsers, undo buffers, CPUs, and compilers.',
    readTime: '3 min read',
    executiveDefinition:
      'Stacks power mission-critical software systems including web browser Back/Forward navigation, editor Undo/Redo buffers, CPU thread execution frames, and compiler syntax parsers.',
    criticalSpecifications: [
      'Browser Navigation: Back stack and Forward stack handle URL navigation.',
      'Undo/Redo Buffers: Text editors push edits to Undo stack; Ctrl+Z pops to Redo stack.',
      'Function Call Stack: OS manages function execution frames and return addresses in memory.',
      'Expression Evaluation: Compilers evaluate arithmetic and logical expressions in Postfix.',
      'Backtracking: Used in AI game trees, maze solvers, and Sudoku.',
    ],
    analogy: {
      title: 'GPS Waypoint Breadcrumbs',
      description:
        'As you visit websites (Google → GitHub → StackOverflow), each page is pushed onto your history stack. Pressing "Back" pops the current page to return you to your exact previous location.',
    },
    example: {
      title: 'Browser Navigation Stacks',
      description: 'Using dual stacks for Back & Forward navigation:',
      steps: [
        'Visit Google → BackStack: [Google]',
        'Visit GitHub → BackStack: [Google, GitHub]',
        'Click "Back" → Pop GitHub, Push to ForwardStack. Current: Google.',
      ],
    },
    visualDiagram: {
      type: 'browser',
      operationLabel: 'Dual-Stack Navigation Pipeline',
      notes: 'Back and Forward stacks work in tandem.',
      diagramText: `  WEB BROWSER DUAL-STACK PIPELINE:
  
  [ Back Stack ]               Current Webpage              [ Forward Stack ]
  ┌──────────────┐             ┌──────────────┐             ┌───────────────┐
  │  GitHub.com  │             │StackOverflow │             │  (Empty)      │
  ├──────────────┤   BACK ←    └──────────────┘    → FWD    └───────────────┘
  │  Google.com  │
  └──────────────┘
  Clicking "Back" pops StackOverflow into Forward Stack and restores GitHub!`,
    },
    content: `### Industrial Applications of Stacks
1. **Web Browser Navigation**: Dual Back & Forward stacks allow smooth navigation across websites.
2. **Undo / Redo Buffers**: Used in VS Code, Figma, and Word to undo and redo document changes.
3. **Function Call Stack**: The CPU pushes activation records (frames) containing local variables and return addresses on function calls.
4. **Compilers & Parsers**: Evaluates mathematical formulas and checks matching HTML/XML tags.`,
    codeSnippet: {
      python: `# Dual-Stack Browser History in Python
class BrowserHistory:
    def __init__(self, homepage):
        self.current = homepage
        self.back_stack = []
        self.forward_stack = []

    def visit(self, url):
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack.clear()

    def back(self):
        if not self.back_stack: return self.current
        self.forward_stack.append(self.current)
        self.current = self.back_stack.pop()
        return self.current`,
      java: `// Dual-Stack Browser History in Java
import java.util.Stack;

public class BrowserHistory {
    private Stack<String> back = new Stack<>();
    private Stack<String> forward = new Stack<>();
    private String current;

    public BrowserHistory(String homepage) { this.current = homepage; }
    public void visit(String url) {
        back.push(current);
        current = url;
        forward.clear();
    }
    public String back() {
        if (back.isEmpty()) return current;
        forward.push(current);
        current = back.pop();
        return current;
    }
}`,
      cpp: `// Dual-Stack Browser History in C++
#include <iostream>
#include <stack>
#include <string>

class BrowserHistory {
    std::stack<std::string> backStack, forwardStack;
    std::string current;
public:
    BrowserHistory(std::string home) : current(home) {}
    void visit(std::string url) {
        backStack.push(current);
        current = url;
        while (!forwardStack.empty()) forwardStack.pop();
    }
    std::string back() {
        if (backStack.empty()) return current;
        forwardStack.push(current);
        current = backStack.top();
        backStack.pop();
        return current;
    }
};`,
      c: `// Dual-Stack Browser History in C
#include <stdio.h>
#include <string.h>

char backStack[50][100], forwardStack[50][100];
int backTop = -1, forwardTop = -1;
char current[100] = "home.com";

void visit(const char *url) {
    strcpy(backStack[++backTop], current);
    strcpy(current, url);
    forwardTop = -1;
}

void back() {
    if (backTop >= 0) {
        strcpy(forwardStack[++forwardTop], current);
        strcpy(current, backStack[backTop--]);
    }
}`,
    },
    timeComplexity: 'O(1) Constant Time for web navigation and undo steps',
    spaceComplexity: 'O(n) Total space proportional to history length',
    keyTakeaway:
      'Stacks form the backbone of state history tracking, execution context switching, and syntax evaluation across modern computing.',
    interactiveDemoType: 'real-world',
  },

  // =========================================================================
  // CHAPTER 12: QUICK SUMMARY
  // =========================================================================
  {
    id: 12,
    chapterNumber: '12',
    categoryLabel: 'MASTER SUMMARY',
    lessonNumber: 12,
    title: '12. Quick Summary',
    shortDesc: 'Review the master cheat sheet, formulas, and concept checkpoint.',
    readTime: '2 min read',
    executiveDefinition:
      'A consolidated reference summary of Stack architecture, core formulas, operation complexities, trade-offs, and concept mastery review.',
    criticalSpecifications: [
      'LIFO Rule: The newest element inserted is always the first element removed.',
      'Single End: PUSH, POP, and PEEK occur strictly at the TOP in O(1) time.',
      'Size Formula: Size = TOP + 1 (in 0-indexed systems).',
      'Array vs List: Arrays offer CPU cache speed; Linked Lists offer dynamic capacity.',
      'Boundary Checks: Guard with isFull() before Push and isEmpty() before Pop.',
    ],
    analogy: {
      title: 'Precision Spring Cartridge',
      description:
        'A Stack is a precision spring-loaded cartridge designed specifically for fast, reverse-chronological LIFO throughput with deterministic O(1) speed.',
    },
    example: {
      title: 'Master Cheat Sheet Formula Recap',
      description: 'Quick reference formulas:',
      steps: [
        'Push(x): top = top + 1, arr[top] = x [O(1)]',
        'Pop(): val = arr[top], top = top - 1 [O(1)]',
        'Peek(): return arr[top] [O(1)]',
        'Empty: top == -1 | Full: top == Capacity - 1',
      ],
    },
    visualDiagram: {
      type: 'stack-ascii',
      operationLabel: 'Master Stack Quick Reference',
      notes: 'LIFO Rule: Push to TOP, Pop from TOP, Peek at TOP.',
      diagramText: `  ╔═══════════════════════════════════════════════════════════════════════╗
  ║                      STACK MASTER CHEAT SHEET                         ║
  ╠═══════════════════════════════════════════════════════════════════════╣
  ║  • Principle        : LIFO (Last In, First Out)                       ║
  ║  • PUSH(x)          : Inserts at TOP                     → O(1) Time  ║
  ║  • POP()            : Removes and returns TOP            → O(1) Time  ║
  ║  • PEEK()           : Reads TOP value without removal    → O(1) Time  ║
  ║  • isEmpty()        : Verifies if TOP == -1              → O(1) Time  ║
  ║  • isFull()         : Verifies if TOP == Capacity - 1    → O(1) Time  ║
  ║  • DISPLAY()        : Traverses all elements             → O(n) Time  ║
  ║  • Array Stack      : Contiguous RAM, Fixed Max Capacity              ║
  ║  • Linked List Stack: Dynamic heap allocation, No capacity limit      ║
  ╚═══════════════════════════════════════════════════════════════════════╝`,
    },
    content: `### Executive Summary & Review
* **Definition**: A Stack is a linear data structure following the **LIFO (Last In, First Out)** principle.
* **Core Operations**: Push, Pop, and Peek operate directly on the TOP in **O(1) Constant Time**.
* **Array Implementation**: Fast contiguous memory access, zero pointer overhead, fixed capacity.
* **Linked List Implementation**: Unlimited dynamic growth in heap memory, pointer overhead.
* **Key Applications**: Browser history, Undo/Redo, Call Stacks, Expression Parsing, Backtracking.`,
    codeSnippet: {
      python: `# Master Stack in Python
stack = []
stack.append(10)
stack.append(20)
print("Top:", stack[-1])      # 20
print("Popped:", stack.pop()) # 20 (LIFO)`,
      java: `// Master Stack in Java
import java.util.Stack;
public class MasterStack {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        System.out.println("Top: " + s.peek());   // 20
        System.out.println("Popped: " + s.pop()); // 20
    }
}`,
      cpp: `// Master Stack in C++
#include <iostream>
#include <stack>
int main() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    std::cout << "Top: " << s.top() << std::endl;
    s.pop();
    return 0;
}`,
      c: `// Master Stack in C
#include <stdio.h>
#define MAX 10
int stack[MAX], top = -1;

void push(int x) { if (top < MAX - 1) stack[++top] = x; }
int pop() { return (top >= 0) ? stack[top--] : -1; }
int peek() { return (top >= 0) ? stack[top] : -1; }

int main() {
    push(10); push(20);
    printf("Top: %d\\n", peek()); // 20
    printf("Popped: %d\\n", pop()); // 20
    return 0;
}`,
    },
    timeComplexity: 'O(1) Constant Time for all core operations',
    spaceComplexity: 'O(n) Total space',
    keyTakeaway:
      'A Stack is a linear data structure that follows LIFO, where insertion and deletion occur exclusively at the TOP.',
    interactiveDemoType: 'quick-summary',
  },
];

export const THEORY_CATEGORIES = [
  {
    id: '01',
    number: '01',
    title: 'THEORY OF STACKS & LIFO',
    shortTitle: 'Fundamentals & Principles',
    description: 'Complete 12-chapter comprehensive curriculum on Stacks, LIFO, operations, algorithms, implementations, and applications.',
    iconName: 'Layers',
    badge: '12 Chapters',
    lessons: THEORY_LESSONS,
  },
];
