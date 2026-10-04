export const NAV_LINKS = ['About', 'Projects', 'Experience']

export type ProjectCategory = 'hardware' | 'software'

export type Project = {
  title: string
  category: ProjectCategory
  description: string
  tech: string[]
  github: string | null
  status: 'Prototype' | 'In Progress' |'Published'
}

export const PROJECTS: Project[] = [
  {
    title: 'Jim-E Robot',
    category: 'hardware',
    description:
      "Jim-E is an autonomous indoor hosting robot that uses computer vision, RRT* path planning, and event-driven control to guide guests to selected destinations.",
    tech: ['Python', 'HTML', 'ROS 2 Humble (rclpy)', 'OpenCV', 'MediaPipe', 'MATLAB/Simulink', 'KiCad', 'Raspberry Pi 4', 'ESP32', 'UART', 'RRT* path planning'],
    github: 'https://github.com/Alison0704/Capstone-JimE',
    status: 'Prototype',
  }
]

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'University of Ottawa',
    role: 'Teaching Assistant',
    period: 'Jan 2024 — Apr 2026',
    location: 'Ottawa, ON',
    bullets: [
      'Supported students in digital systems, circuit behavior, logic design, and FPGA workflows using Quartus II and Altera tools.',
      'Assisted students with debugging lab work, understanding hardware behavior, and connecting theory to practical digital designs.',
      'Created technical guides that explained hardware and programming concepts in a clear, beginner-friendly way.',
      'Helped students strengthen their problem-solving skills in logic design, C programming, and engineering debugging.',
    ],
    tags: ['ITI 1500 · Digital Systems','GNG 1106 · C Programming','Quartus II', 'Altera FPGA', 'Digital Logic', 'C Programming', 'Debugging', 'Technical Communication'],
  },
  {
    company: 'University of Ottawa',
    role: 'Pension and Benefits Assistant',
    period: 'May 2023 — Apr 2026',
    location: 'Ottawa, ON',
    bullets: [
      'Managed specialized administrative projects and data governance tasks for pension analysts.',
      'Used advanced Excel to build, maintain, and organize complex data logs with strong attention to accuracy.',
      'Handled sensitive pension and benefits information while following confidentiality and regulatory standards.',
      'Improved workflow visibility through structured documentation, tracking systems, and data quality checks.',
    ],
    tags: ['Advanced Excel', 'Data Management', 'Process Tracking', 'Documentation', 'Confidential Records', 'Administrative Systems'],
  },

]

export type SocialIcon = 'github' | 'linkedin' | 'email'

export const SOCIAL_LINKS: { label: string; href: string; icon: SocialIcon }[] = [
  { label: 'GitHub', href: 'https://github.com/Alison0704', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/notifications/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:aemil072@uottawa.ca', icon: 'email' },
]
