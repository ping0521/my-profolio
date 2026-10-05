/** Structured click-through details for legacy gallery items (aligned with live site). */

export const galleryDetailBlocks = {

  'NTHU courses recommendation system': [

    {

      type: 'paragraph',

      text:

        'Recommended Course Selection (Group 14): a Python recommender for NTHU students that ranks courses from the official pre-registration catalog using preference tags and a tree-based scoring pipeline.',

    },

    { type: 'heading', text: 'Problem & inputs' },

    {

      type: 'paragraph',

      text:

        'Students often lack a systematic way to balance department requirements, weekly availability, campus location, credits, and exam weight—leading to awkward or suboptimal schedules.',

    },

    {

      type: 'list',

      items: [

        'Student preferences: major/department, preferred time slots (e.g. Mon–Wed blocks), campus (Hsinchu mountain, Hsinchu flat, Nanda), desired credits, and target exam percentage.',

        'Course catalog: courses offered in the NTHU pre-registration dataset for the term.',

        'Output: a ranked top list of courses that best match the student profile.',

      ],

    },

    { type: 'heading', text: 'Tree-based scoring (method)' },

    {

      type: 'paragraph',

      text:

        'Each course is scored by walking several small decision trees—one per preference tag. At each internal node the algorithm asks a yes/no or category question; each leaf assigns a numeric score. Those tag scores are then combined with fixed weights to produce one total match score per course.',

    },

    { type: 'subheading', text: 'Department tree' },

    {

      type: 'list',

      items: [

        'Root: compare the student’s department to the course department.',

        'Same department → score 100.',

        'Related department (grouped by curriculum track: humanities, theoretical science, applied science) → 50 or 25 depending on how closely the majors align.',

        'Unrelated department → 0.',

      ],

    },

    { type: 'subheading', text: 'Time tree' },

    {

      type: 'list',

      items: [

        'Compare preferred weekly slots to the course meeting pattern.',

        'No overlap → 0; partial overlap → proportional score; full alignment → 100.',

        'Overlap rate = (number of overlapping sessions ÷ number of sessions in the student’s target pattern) × 100%.',

      ],

    },

    { type: 'subheading', text: 'Location tree' },

    {

      type: 'paragraph',

      text:

        'Branch on campus match (mountain campus, flat campus, Nanda). Exact location match yields the highest leaf score; mismatches fall to lower branches (down to 0).',

    },

    { type: 'subheading', text: 'Credit & exam-percentage trees' },

    {

      type: 'list',

      items: [

        'Credits: branch on whether the student wants heavier loads (e.g. ≥3 credits for core lectures) versus lighter loads (≤2 for labs, gen-ed, or PE).',

        'Exam percentage: leaf score uses abs(student target − course exam weight) mapped so closer targets score higher (presentation: abs(target − example) + 100 scale).',

      ],

    },

    { type: 'heading', text: 'Integration & ranking' },

    {

      type: 'paragraph',

      text:

        'Tag priority (from the deck): department > time > location = exam weight > credits. Weighted sum: department ×4, time ×2, location ×1, exam percentage ×1, credits ×0.5. Courses are sorted by total score and the top recommendations are returned.',

    },

    { type: 'heading', text: 'Conclusion' },

    {

      type: 'paragraph',

      text:

        'Students will experience an improved and streamlined course selection process, addressing the challenges mentioned. The optimization algorithm will consider individual preferences, time constraints, and department-level criteria, resulting in more personalized and efficient course schedules.',

    },

  ],

  'N-Queen Problem': [

    {

      type: 'paragraph',

      text:

        'Utilize algorithms such as Iterative Deepening Search (IDS), Random-Start Hill Climbing, and Genetic Algorithms to analyze their average running time and success rates. Evaluate the advantages and disadvantages of each algorithm to provide a comprehensive comparison.',

    },

    {

      type: 'list',

      items: [

        'IDS demonstration — iterative deepening search run logs / board progress.',

        'Hill climbing demonstration — random-start hill climbing with restart counts, runtime, and average steps.',

      ],

    },

  ],

  'A* search and BFS solve Pacman problem': [

    {

      type: 'paragraph',

      text:

        'Pac-Man search coursework (Program 1b): graph search on maze layouts using uninformed search (including BFS) and informed A* with custom heuristics.',

    },

    { type: 'heading', text: 'A* search' },

    {

      type: 'paragraph',

      text:

        'A* uses a priority queue. Start-state path cost and priority begin at zero. While the queue is non-empty, pop the current state, action sequence, and g-cost; skip states already explored. For each legal successor, compute f = g + h and push onto the priority queue.',

    },

    { type: 'heading', text: 'Corners problem' },

    {

      type: 'list',

      items: [

        'getStartState: returns Pac-Man’s grid position plus corners visited so far.',

        'isGoalState: true only after all four maze corners have been visited.',

        'getSuccessors: move into open squares; record newly visited corners; return successors in FIFO order.',

      ],

    },

    { type: 'heading', text: 'Corners heuristic' },

    {

      type: 'paragraph',

      text:

        'Use Manhattan distance over unvisited corners (sum of distances). Greedily taking only the nearest corner is not enough; the sum stays admissible and guides A* toward covering remaining corners efficiently.',

    },

  ],

  'Cat monster fight project': [

    {

      type: 'paragraph',

      text:

        'Tower defense / fight game in C++ with Allegro — class inheritance, virtual functions, hand-drawn art, and sound.',

    },

    { type: 'heading', text: 'TowerGame_Demo (part 1)' },

    {

      type: 'video',

      youtubeId: 'La_sbXhWzKI',

      title: 'TowerGame_Demo (part 1)',

    },

    {

      type: 'list',

      items: [

        'Developed game in C++ and used Allegro to successfully finish a project with a bigstructure.',

        'Familiar with class inheritance and virtual function concept',

        'Great teamwork and brainstorming with a partner.',

      ],

    },

    { type: 'heading', text: 'TowerGame_Demo (part 2)' },

    {

      type: 'video',

      youtubeId: '_233qbw1EGc',

      title: 'TowerGame_Demo (part 2)',

    },

    {

      type: 'list',

      items: [

        'Beautify the game artwork and hand-drawn characters, monsters, towers, and catcans.',

        'Add sound effects to enhance the game experience.',

      ],

    },

  ],

  'Chatting app': [
    {
      type: 'list',
      items: [
        'Sign-in — Involves reading and writing to the database.',
        'Sign-up — Utilizes setDoc to create user data, including userId, displayName, email, and timestamp. These are the detailed data for the users collection. It also uses setDoc to create a user Chat collection.',
        'RWD — In the style.css file, create three @mixins named pad, mobile, and laptop.',
        'Chatroom — Users can find all registered users on the left side, and by clicking on any target user, they navigate to a private chat room with that user and start sending messages. The logout icon allows a user to sign out and navigates them to the login screen.',
        'CSS Animation — Both Sign-in and Register pages have 3D animation effects on buttons and logos.',
        'Deal with Problem Sending Code.',
      ],
    },
  ],

  'Drawing app project': [
    {
      type: 'list',
      items: [
        'Brush — After selecting, you can draw on the canvas. The width slider adjusts the size of the brush stroke. Select the desired color in the color area. The mouse cursor will change to a brush pattern.',
        'Rectangle, Triangle, Circle — After selecting, you can draw these shapes on the canvas. Shapes can be resized by dragging the mouse. The width slider adjusts the brush stroke size. Select the desired color in the color area.',
        'Text — After selecting, a text box appears on the canvas. The color can be changed. The mouse cursor will change to a keyboard cursor \'text\'. If \'text\' is selected but no text is entered, it will wait on the canvas for input. Font size and style can be chosen in the Text Option area.',
        'Color — Color Picker is a canvas feature. Dragging on the palette changes the brush color.',
        'Undo — Any action on the canvas can be undone by clicking undo, and it will disappear from the canvas.',
        'Redo — If you want to revert an action after undoing, click Redo.',
        'Download — Clicking this will automatically download the current canvas content as a PNG file.',
        'Upload — Click to select and upload a file from your computer to the current canvas (including .svg, .png, .jpg).',
        'Rainbow — The rainbow pen displays the color of the rainbow.',
        'Fill color — If the Fill color button is selected, then the shape will be filled with color.',
      ],
    },
  ],

  'Compiler simulation': [

    { type: 'heading', text: 'Introduction' },

    {

      type: 'paragraph',

      text:

        'Let\'s consider a CPU, which has 32 bits registers r0–r255 and a 256 bytes memory. In this project, you need to implement a binary expression calculator.',

    },

    { type: 'heading', text: 'Input' },

    {

      type: 'paragraph',

      text:

        'The input will contain several binary expressions consisting of integers, operators, parentheses, and three variables x, y, and z.',

    },

    {

      type: 'paragraph',

      text: 'The following operators will appear in this project:',

    },

    {

      type: 'list',

      items: [

        '+, -, *, /, %',

        '=',

        '++, -- (including prefix and suffix, such as x++, --y, and so on)',

        '+, - (expressions such as +x, -y, and so on)',

        'Others such as >>, += are unavailable and will not appear.',

      ],

    },

    {

      type: 'paragraph',

      text:

        'At most 15 lines per testcase, 195 characters per line. That is, you don\'t have to change the value of MAX_LENGTH defined in the template.',

    },

    { type: 'heading', text: 'Output' },

    {

      type: 'paragraph',

      text:

        'The output is a list of assembly codes. The instruction set architecture is listed in the course table. If the input expressions contain illegal expression, you should handle it with the error handler.',

    },

    {

      type: 'paragraph',

      text:

        'The input expression is a subset of C expression, which means you can treat the input as part of C codes and get the corresponding value of x, y, and z if you initialize them correctly. The result of x, y, and z solved by your assembly should be identical to the result of C described above.',

    },

  ],

  'Final Project: CPU Scheduling': [

    {

      type: 'paragraph',

      text: 'Operating System — Final Project: CPU Scheduling',

    },

    {

      type: 'paragraph',

      text:

        '2.1 Implement a multilevel feedback queue scheduler with aging mechanism as described below:',

    },

    {

      type: 'list',

      items: [

        '(a) There are 3 levels of queues: L1, L2 and L3. L1 is the highest level queue, and L3 is the lowest level queue.',

        '(b) All processes must have a valid scheduling priority between 0 to 149. Higher value means higher priority. So 149 is the highest priority, and 0 is the lowest priority.',

        '(c) A process with priority between 0–49 is in L3 queue, priority between 50–99 is in L2 queue, and priority between 100–149 is in L1 queue.',

        '(d) L1 queue uses preemptive SRTN (shortest remaining time first) scheduling algorithm. If current thread has the lowest remaining burst time, it should not be preempted by the threads in the ready queue. The burst time (job execution time) is provided by user when execute the test case.',

        '(e) L2 queue uses a FCFS (First-Come First-Served) scheduling algorithm which means lower thread ID has higher priority.',

        '(f) L3 queue uses a round-robin scheduling algorithm with time quantum 200 ticks (you should select a thread to run once 200 ticks elapsed). If two threads enter the L3 queue with the same priority, either one of them can execute first.',

        '(g) An aging mechanism must be implemented, so that the priority of a process is increased by 10 after waiting for more than 400 ticks.',

      ],

    },

    {

      type: 'paragraph',

      text:

        '(Note: The operations of preemption and priority updating can be delayed until the next timer alarm interval).',

    },

    {

      type: 'paragraph',

      text:

        '2.2 Add a command line argument -epb for nachos to initialize priority of process. E.g., the command below will launch 2 processes: hw2_test1 with initial priority 40 and burst time 5000, and hw2_test2 with initial priority 80 and burst time 4000.',

    },

    {

      type: 'paragraph',

      text:

        "2.3 Add a debugging flag z and use the DEBUG('z', expr) macro (defined in debug.h) to print following messages. Replace {...} to the corresponding value.",

    },

    {

      type: 'list',

      items: [

        '(a) Whenever a process is inserted into a queue: [InsertToQueue] Tick [{current total tick}]: Thread [{thread ID}] is inserted into queue L[{queue level}]',

        '(b) Whenever a process is removed from a queue: [RemoveFromQueue] Tick [{current total tick}]: Thread [{thread ID}] is removed from queue L[{queue level}]',

        '(c) Whenever a process changes its scheduling priority: [UpdatePriority] Tick [{current total tick}]: Thread [{thread ID}] changes its priority from [{old value}] to [{new value}]',

        '(d) Whenever a process updates its approximate burst time: [UpdateRemainingBurstTime] Tick [{current total tick}]: Thread [{thread ID}] update remaining burst time, from: [{ti-1}]- [{T}], to [{ti}]',

        '(e) Whenever a context switch occurs: [ContextSwitch] Tick [{current total tick}]: Thread [{new thread ID}] is now selected for execution, thread [{prev thread ID}] is replaced, and it has executed [{accumulated ticks}]',

      ],

    },

  ],

}

