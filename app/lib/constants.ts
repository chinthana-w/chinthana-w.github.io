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
      "Custom AI solver utilizing physics-informed neural networks to drastically accelerate automated circuit testing. Developed as part of M.S. research at SIUC.",
    tags: ["Python", "PyTorch", "Neural Networks", "Research"],
    href: "https://github.com/chinthana-w/s-imply",
    featured: true,
    // image: "/projects/s-imply.png",
    image: "",
  },
  {
    title: "LUTorch Library",
    description:
      "Custom PyTorch extension in C++ and CUDA that bypasses SPICE simulations entirely, achieving 95% of SPICE accuracy while running at native PyTorch speeds.",
    tags: ["C++", "CUDA", "PyTorch", "Research"],
    href: "https://github.com/chinthana-w/LUTorch",
    featured: true,
    // image: "/projects/lutorch.png",
    image: "",
  },
  {
    title: "Full-Stack Traffic Analysis Platform",
    description:
      "Cloud-native web application using React and Python to process real-time video streams, deployed on AWS with full CI/CD pipeline automation.",
    tags: ["React", "Python", "AWS", "CI/CD"],
    href: "https://github.com/abrutech/vision-traffic",
    featured: false,
    // image: "/projects/vision-traffic.png",
    image: "",
  },
  {
    title: "Edge-Vision Traffic Sensing System",
    description:
      "Bridged hardware and software with highly optimized Baremetal C code handling RTL processing logic and timing algorithms on a Zynq 7 FPGA.",
    tags: ["Baremetal C", "Python", "FPGA", "Zynq 7"],
    href: "https://github.com/abrutech/vision-traffic-soc",
    featured: false,
    // image: "/projects/vision-traffic-soc.png",
    image: "",
  },
  {
    title: "Custom Serial Communication Bus",
    description:
      "Robust device-to-device protocol with automatic baud rate detection, split transactions, and priority arbitration. Validated across multiple physical FPGA boards.",
    tags: ["Verilog", "FPGA", "Protocol Design"],
    href: "https://github.com/abrutech/system-bus",
    featured: false,
    // image: "/projects/system-bus.png",
    image: "",
  },
  {
    title: "ABRUTECH Custom Processor & Compiler",
    description:
      "Custom processor architecture with a companion Assembly compiler capable of executing image processing algorithms and general-purpose computational tasks.",
    tags: ["Assembly", "Verilog", "Computer Architecture"],
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
