export const GITHUB_USERNAME = "chinthana-w";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["C/C++", "TypeScript", "JavaScript", "Python", "Assembly", "PHP", "SQL", "Verilog", "Rust", "Java"],
  },
  {
    category: "Frontend & Web",
    items: ["React", "React Native", "Next.js", "Node.js", "RESTful APIs", "GraphQL", "HTML/CSS"],
  },
  {
    category: "Embedded & Systems",
    items: ["Baremetal C", "Linux Systems", "Firmware", "FPGA", "I2C/SPI", "CUDA"],
  },
  {
    category: "Tools & Domain",
    items: ["Git", "Docker", "CI/CD", "CMake", "PyTest", "PHPUnit", "Agile", "k3s", "AWS"],
  },
  {
    category: "AI & Agentic Coding",
    items: ["Cursor", "Claude Code", "Gemini CLI", "OpenClaw", "LLM-Assisted Coding"],
  },
];

export const NOTABLE_PROJECTS = [
  {
    title: "Physics-Informed AI for Circuit Testing",
    description:
      "Topology-Aware Justification Oracle for digital circuits using Multi-Path Transformers and 3-Valued Logic (0, 1, X). Topology-aware embeddings maintain global consistency across reconvergent paths, while a differentiable logic consistency loss enforces Boolean truth tables during training. The AI model is integrated directly into a classical PODEM ATPG backtrace loop, reducing test-generation backtrack counts and accelerating fault coverage. Developed as M.S. research at SIUC with RL fine-tuning support for continuous self-improvement.",
    tags: ["Python", "PyTorch", "Transformers", "ATPG", "RL", "Research"],
    href: "https://github.com/chinthana-w/s-imply",
    featured: true,
    // image: "/projects/s-imply.png",
    image: "",
  },
  {
    title: "LUTorch — Memristor Crossbar Simulator",
    description:
      "PyTorch library that simulates memristor crossbar array networks using precomputed conductance/voltage lookup tables (LUTs), eliminating the need for expensive SPICE simulations. Provides drop-in MemConv2d and MemLinear replacements compatible with any standard PyTorch training loop. Achieves ~95% of SPICE simulation accuracy at orders-of-magnitude faster speed, enabling rapid design-space exploration of analog neuromorphic hardware in software.",
    tags: ["C++", "CUDA", "PyTorch", "Memristors", "Analog AI", "Research"],
    href: "https://github.com/chinthana-w/LUTorch",
    featured: true,
    // image: "/projects/lutorch.png",
    image: "",
  },
  {
    title: "Full-Stack Traffic Analysis Platform",
    description:
      "Cloud-native web application that ingests live video streams, runs computer-vision traffic analytics in Python, and surfaces results through a React SPA. Deployed on AWS with a fully automated CI/CD pipeline handling build, test, and zero-downtime release across cloud infrastructure.",
    tags: ["React", "Python", "AWS", "CI/CD"],
    href: "https://github.com/abrutech/vision-traffic",
    featured: false,
    // image: "/projects/vision-traffic.png",
    image: "",
  },
  {
    title: "Edge-Vision Traffic Sensing System",
    description:
      "SoC implementation of a real-time traffic-sensing pipeline on a Xilinx Zynq-7 FPGA. Baremetal C code manages RTL processing logic and strict hardware timing constraints, while a Python layer handles higher-level coordination—bridging hardware and software at the edge with no OS overhead.",
    tags: ["Baremetal C", "Python", "FPGA", "Zynq 7", "SoC"],
    href: "https://github.com/abrutech/vision-traffic-soc",
    featured: false,
    // image: "/projects/vision-traffic-soc.png",
    image: "",
  },
  {
    title: "Custom Serial Communication Bus",
    description:
      "Verilog HDL serial bus supporting up to 12 masters across 3 priority levels and 8 slaves. Features automatic baud-rate detection via a custom handshake protocol, split transactions, and priority arbitration—demonstrating the core principles behind SPI/I2C. Synthesized and validated across multiple interconnected physical FPGA boards.",
    tags: ["Verilog", "FPGA", "Protocol Design", "HDL"],
    href: "https://github.com/abrutech/system-bus",
    featured: false,
    // image: "/projects/system-bus.png",
    image: "",
  },
  {
    title: "ABRUTECH Custom Processor & Compiler",
    description:
      "Full processor architecture built from scratch in Verilog and implemented on an Altera DE2-115 FPGA using only ~1,000 logic elements. The 16-instruction ISA executes in 2.2 clock cycles on average and includes a special Address Maker for zero-overhead 2D matrix traversal and a shift-register bank for fast linear convolution—enabling programs as short as 30–40 bytes to downsample, upsample, and edge-detect 512×512 images. A companion Python compiler translates the human-readable ISA to machine code and catches syntax errors, while a simulator lets developers debug algorithms remotely before flashing the FPGA.",
    tags: ["Assembly", "Verilog", "FPGA", "Computer Architecture", "Python"],
    href: "https://github.com/BlazeCode2/ABRUTECH_processor_automatic",
    featured: false,
    // image: "/projects/abrutech.png",
    image: "",
  },
];

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: `https://github.com/${GITHUB_USERNAME}`,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chinthanaw",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:chinthana.w@siu.edu",
    icon: "email",
  },
];
