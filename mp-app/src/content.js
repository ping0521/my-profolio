export const profile = {
  name: 'Tzu-Ping (Joanna) Chen',
  shortName: 'Tzu-Ping',
  email: 'dppss980777@gmail.com',
  phone: '858-374-9846',
  linkedin: 'https://www.linkedin.com/in/tzu-ping-chen-25a274327/',
  photo: './IMG_6392.png',
  education: [
    { school: 'UC San Diego', degree: 'M.S. Computer Science', dates: 'Sep 2025 – Dec 2026', gpa: '3.75/4.0' },
    { school: 'National Tsing Hua University', degree: 'B.S. Data Science & Computer Science' },
    { school: 'UC Berkeley', degree: 'Engineering Certificate for Data Science' },
  ],
  rolesLine:
    'Backend engineer, Software engineer, Research Assistant | Expertise: AI, ML Research, Software Development',
}

export const intro = {
  greeting: "Hi, I'm Tzu-Ping.",
  lead:
    "As a Master's student in Computer Science at UC San Diego, I specialize in back-end development, AI agentic systems, and machine learning — with a passion for turning real-world complexity into elegant, efficient solutions.",
  paragraphs: [
    'Currently, I am working as a Co-op Software V&V Engineer at Hologic, where I architect and execute robust software verification protocols within the .NET Framework (C#), building scalable automated test suites to validate safety-critical medical device software under FDA regulatory standards.',
    'I co-authored a paper at ICML 2026 introducing MemoryArena, a benchmark designed to evaluate LLM agent memory systems across multi-session, interdependent tasks. I led development of the Progressive Web Search benchmark domain — creating multi-turn dataset pipelines and evaluating long-context, RAG, and external-memory architectures.',
    'Previously, as a Backend Engineer Intern at Shepherdtech Group, I integrated LLMs and retrieval-augmented generation into business applications, reducing manual intervention and enabling users to place orders three times faster. I built large-scale recommendation systems with TypeScript on NestJS, optimized MongoDB with caching strategies for ~50% faster queries, and shipped multimodal + reasoning LLM recommendation agents with hybrid retrieval.',
    "Whether it's designing a multi-agent LLM trip scheduler that won Fetch.ai's Agentic Track Prize at Cal Hacks, or boosting image-model performance by ~30% in autism-detection research with deep learning and transfer learning, I love solving meaningful problems with scalable AI — grounded in robust back-end architecture and real-world data.",
  ],
  cta: "Let's connect — message me on LinkedIn to chat about AI agents, ML, backend systems, or full-time opportunities.",
}

export const workingExperience = [
  {
    org: 'Hologic',
    role: 'Software Engineer Co-op',
    dates: 'July 2026 – Dec 2026',
    points: [
      'Implemented reusable C#/.NET automation frameworks leveraging Windows UI Automation API with DLL injection fallback and file-based IPC to validate UI workflows and report generation for FDA-regulated diagnostic software, cutting regression testing from hours to minutes.',
      'Developed test data generation tool that simulates full lab-run results from configurable assay parameters, reducing database preparation from days to minutes and enabling engineers to validate protocol changes without running physical instruments.',
    ],
  },
  {
    org: 'Shepherdtech Group',
    role: 'Backend Engineer Internship',
    dates: 'July 2025 – Sep 2025',
    points: [
      'Built an end-to-end recommendation agent combining multimodal and reasoning LLMs with RAG, orchestrating image/text embeddings, Elasticsearch hybrid retrieval, LLM inference, and automated ranking to enable users to place orders 3 times faster.',
      'Reduced inference latency and improved backend throughput by 50% through Redis caching, MongoDB query optimization, and scalable service architecture.',
    ],
  },
  {
    org: 'The Institute of Statistical Science, Academia Sinica',
    role: 'Research Assistant',
    dates: 'Jan 2024 – May 2025',
    points: [
      'Used categorical data analysis and machine learning models to reduce the mental health questionnaire to 50% of its original length, maintaining over 90% of accuracy and F1 score for Taiwanese student assessment.',
    ],
  },
]

export const research = {
  title: 'MemoryArena: Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks',
  venue: 'Accepted at ICML 2026',
  arxiv: 'https://arxiv.org/abs/2602.16313',
  site: 'https://memoryarena.github.io/',
  summary:
    'MemoryArena is a unified evaluation gym for agent memory in multi-session Memory–Agent–Environment loops. Unlike recall-only or single-session agent benchmarks, tasks have interdependent subtasks: agents must distill experience into memory and reuse it to guide later decisions.',
  points: [
    'Led Python infrastructure for evaluating multi-session LLM agents across memory, environment feedback, and action traces.',
    'Built a multithreaded two-stage data pipeline transforming 830+ compositional search problems into 251 causally interdependent Progressive Web Search tasks with automated filtering and ground-truth answers.',
    'Benchmarked long-context, RAG, and external-memory agents — exposing performance decay as dependency depth grows and gaps between memory retrieval and task completion.',
  ],
}

/** Featured write-ups shown inside the matching Projects subsection (see projectSubsections in App). */
export const featuredProjects = {
  aiMl: [
    {
      title: 'DayGenie — Cal Hacks (1st Place, Fetch.ai Agentic Track)',
      dates: 'Apr 2025',
      blurb:
        'Decentralized multi-agent LLM travel planner with tool-calling across Google Calendar, Maps, and Reddit APIs — orchestration from idea to working demo.',
      detailKey: 'dayGenie',
    },
    {
      title: 'Autism Prediction via Multimodal Deep Learning',
      dates: 'Sep 2024 – Jan 2025',
      blurb:
        'Developed CNN and RNN deep learning models in PyTorch and TensorFlow for multimodal feature extraction, processing image, text, and behavioral data through end-to-end data preprocessing, embedding generation, model training, and evaluation pipelines.',
      detailKey: 'autismAsd',
    },
  ],
  systems: [
    {
      title: 'Nachos OS — Threads, Sync & Virtual Memory',
      detailKey: 'nachosOs',
      blurb:
        'Implemented core OS subsystems in Java within Nachos: thread management, synchronization primitives, system calls, and virtual memory — debugging concurrency across user/kernel space.',
    },
  ],
}

export const skills = {
  languages: 'Python, C/C++, C#, TypeScript, JavaScript, Java, SQL, R',
  eng: 'Linux/Unix, Docker, Git, GitLab CI/CD, RESTful APIs, Redis, MongoDB, GCP',
  ai: 'PyTorch, TensorFlow, Scikit-learn, Deep Learning, LLMs, Agentic AI, NLP, AI Evaluation, Model Inference, Prompt Engineering',
}
