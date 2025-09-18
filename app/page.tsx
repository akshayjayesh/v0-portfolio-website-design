"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Coffee,
  Code,
  Database,
  Globe,
  Server,
  GitBranch,
  Container,
  Calendar,
  Award,
  User,
  Briefcase,
  GraduationCap,
  Send,
  Download,
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react"

import { NavBar } from "@/components/ui/navbar"

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  )
}

const TypingAnimation = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <span className="text-blue-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const DetailModal = ({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-200">{title}</h3>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {content}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedModal, setSelectedModal] = useState<{ type: string; data: any } | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const skills = {
    "Programming Languages": [
      {
        name: "Java",
        level: "Advanced",
        icon: Coffee,
        details: {
          experience: "2+ years learning, 2 months professional",
          projects: ["Employee Management System", "Spring Boot APIs"],
          frameworks: ["Spring Boot", "Spring MVC", "Hibernate"],
          nextGoal: "Java Spring Security, Microservices architecture",
        },
      },
      {
        name: "JavaScript",
        level: "Intermediate",
        icon: Code,
        details: {
          experience: "1.5 years",
          projects: ["Food Ordering Website", "E-commerce frontend"],
          frameworks: ["React.js", "Node.js"],
          libraries: ["Axios", "Express.js"],
          nextGoal: "TypeScript, Next.js",
        },
      },
      {
        name: "SQL",
        level: "Intermediate",
        icon: Database,
        details: {
          experience: "1 year",
          databases: ["MySQL", "basic MongoDB"],
          skills: ["Complex queries", "joins", "stored procedures"],
          projects: ["All database-driven applications"],
          nextGoal: "Database optimization, PostgreSQL",
        },
      },
    ],
    "Frontend Technologies": [
      {
        name: "HTML5",
        level: "Advanced",
        icon: Globe,
        details: {
          experience: "2+ years",
          skills: ["Semantic HTML", "Accessibility", "SEO optimization"],
          projects: ["All frontend projects"],
          nextGoal: "Web Components, Progressive Web Apps",
        },
      },
      {
        name: "CSS3",
        level: "Advanced",
        icon: Globe,
        details: {
          experience: "2+ years",
          skills: ["Flexbox", "Grid", "Animations", "Responsive Design"],
          preprocessors: ["Basic SASS knowledge"],
          approach: ["Mobile-first approach"],
          nextGoal: "CSS-in-JS libraries",
        },
      },
      {
        name: "React.js",
        level: "Intermediate",
        icon: Code,
        details: {
          experience: "8 months",
          hooks: ["useState", "useEffect", "useContext"],
          stateManagement: ["Context API", "local state"],
          projects: ["Food Ordering Website frontend"],
          libraries: ["React Router", "Axios"],
          nextGoal: "Redux, React Testing Library",
        },
      },
      { name: "Bootstrap", level: "Intermediate", icon: Globe },
    ],
    "Backend Technologies": [
      {
        name: "Spring Boot",
        level: "Intermediate",
        icon: Server,
        details: {
          experience: "6 months",
          features: ["REST APIs", "Data JPA", "Security basics"],
          architecture: ["MVC pattern", "layered architecture"],
          testing: ["Basic unit testing with JUnit"],
          projects: ["Employee Management System backend"],
          nextGoal: "Microservices, Spring Cloud",
        },
      },
      { name: "Hibernate", level: "Intermediate", icon: Database },
      { name: "REST APIs", level: "Advanced", icon: Server },
      { name: "Microservices", level: "Beginner", icon: Server },
    ],
    Databases: [
      { name: "MySQL", level: "Intermediate", icon: Database },
      { name: "MongoDB", level: "Beginner", icon: Database },
    ],
    "Tools & Technologies": [
      {
        name: "Git",
        level: "Intermediate",
        icon: GitBranch,
        details: {
          experience: "1 year",
          commands: ["commit", "branch", "merge", "rebase"],
          platforms: ["GitHub", "basic CI/CD understanding"],
          workflow: ["Feature branch workflow"],
          nextGoal: "Advanced Git workflows, GitLab",
        },
      },
      { name: "Docker", level: "Beginner", icon: Container },
      { name: "Maven", level: "Intermediate", icon: Code },
      { name: "IntelliJ IDEA", level: "Advanced", icon: Code },
    ],
  }

  const projects = [
    {
      title: "Employee Management System",
      description: "Full-stack application with role-based access control and responsive UI",
      tech: ["Spring Boot", "Angular", "MySQL", "Hibernate"],
      features: ["Role-based access", "Responsive UI", "RESTful APIs"],
      image: "/Employee.png",
      details: {
        developmentTime: "3 weeks",
        teamSize: "Individual project",
        challenges: [
          "Implementing role-based access control",
          "Database design for employee hierarchy",
          "Frontend-backend integration",
        ],
        highlights: ["JWT authentication", "RESTful API design", "Responsive Angular frontend"],
        performance: "Handles 1000+ employee records",
        futureEnhancements: ["Email notifications", "attendance tracking"],
      },
    },
    {
      title: "Food Ordering Website",
      description: "Real-time food ordering platform with admin dashboard",
      tech: ["Node.js", "React.js", "Firebase", "JWT"],
      features: ["Real-time ordering", "Admin dashboard", "Push notifications"],
      image: "/Food_App.png",
      details: {
        developmentTime: "4 weeks",
        teamSize: "2 developers",
        keyFeatures: [
          "Real-time order tracking",
          "Payment gateway integration (sandbox)",
          "Admin dashboard with analytics",
        ],
        challenges: [
          "Firebase real-time database optimization",
          "State management in React",
          "Responsive design for mobile orders",
        ],
        performance: "Sub-3 second load times",
        userCapacity: "Designed for 500+ concurrent users",
      },
    },
    {
      title: "E-commerce Website",
      description: "Complete e-commerce solution with shopping cart functionality",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      features: ["Product listing", "Shopping cart", "Checkout functionality"],
      image: "/Ecommerce.png",
      details: {
        developmentTime: "2 weeks",
        teamSize: "Individual project",
        keyFeatures: [
          "Product catalog with filtering",
          "Shopping cart with local storage",
          "Responsive checkout process",
        ],
        challenges: [
          "State management without framework",
          "Cross-browser compatibility",
          "Mobile-first responsive design",
        ],
        performance: "Optimized for fast loading",
        futureEnhancements: ["Payment integration", "User accounts"],
      },
    },
  ]

  const softSkills = [
    {
      name: "Relationship Building",
      icon: "🤝",
      description: "Foster trust and collaboration within teams",
      details: {
        example: "Built strong working relationships with team members during Food Ordering Website project",
        approach: "Active listening, regular check-ins, and collaborative problem-solving",
        result: "Improved team productivity and project delivery timeline",
        tools: "Slack, Microsoft Teams, regular one-on-ones",
      },
    },
    {
      name: "Problem Solving",
      icon: "🧩",
      description: "Solution-oriented approach to complex challenges",
      details: {
        example: "Debugged complex database query performance issue in Employee Management System",
        approach: "Systematic debugging, query optimization, index creation",
        result: "Reduced query time from 5 seconds to 0.3 seconds",
        tools: "MySQL Query Profiler, Spring Boot Actuator",
      },
    },
    {
      name: "Adaptability",
      icon: "🔄",
      description: "Thrive in dynamic, fast-paced environments",
      details: {
        example: "Quickly learned Angular for Employee Management frontend",
        timeline: "Mastered basics in 1 week, implemented project in 3 weeks",
        resources: "Official documentation, online tutorials, peer mentoring",
        outcome: "Successfully delivered project on time",
      },
    },
    { name: "Communication", icon: "💬", description: "Bridge technical and non-technical stakeholders" },
    {
      name: "Team Collaboration",
      icon: "👥",
      description: "Support collective goals and shared success",
      details: {
        example: "Collaborated on Food Ordering Website with team member",
        skills: "Code reviews, pair programming, task distribution",
        communication: "Daily standups, clear documentation",
        conflictResolution: "Handled merge conflicts, feature integration",
      },
    },
    { name: "Critical Thinking", icon: "🎯", description: "Analytical approach to software development" },
  ]

  const interests = [
    {
      name: "Java Development",
      icon: "☕",
      description: "Building robust enterprise applications",
      details: {
        currentFocus: "Spring Boot mastery, microservices architecture",
        learningResources: "Spring official docs, Baeldung tutorials",
        practiceProjects: "Building REST APIs, exploring Spring Security",
        goalTimeline: "6 months to advanced proficiency",
        industryRelevance: "High demand in enterprise applications",
      },
    },
    {
      name: "Full Stack Development",
      icon: "🌐",
      description: "End-to-end web solutions",
      details: {
        currentFocus: "MERN stack proficiency, deployment strategies",
        learningResources: "Full-stack tutorials, open source contributions",
        practiceProjects: "Personal portfolio, client projects",
        goalTimeline: "1 year to senior level",
        industryRelevance: "Versatile skill set for startups and enterprises",
      },
    },
    {
      name: "AI & Machine Learning",
      icon: "🤖",
      description: "Exploring intelligent software solutions",
      details: {
        academicBackground: "B.Tech specialization in AI & ML",
        currentKnowledge: "Basic Python, scikit-learn, data preprocessing",
        interestAreas: "Natural Language Processing, Computer Vision",
        learningPlan: "Hands-on projects combining Java backend with ML models",
        futureGoal: "ML-powered web applications",
      },
    },
  ]

  const certifications = [
    {
      name: "Cyber Security and Ethical Hacking",
      issuer: "Rinex & E-cell IIT Kharagpur",
      details: {
        duration: "40 hours",
        keySkills: "Network security, penetration testing basics",
        toolsLearned: "Kali Linux, Wireshark, Nmap",
        application: "Security-aware development practices",
      },
    },
    {
      name: "Introduction to AI",
      issuer: "IBM via Coursera (2023)",
      details: {
        platform: "Coursera",
        completion: "2023",
        topics: "Machine learning basics, neural networks",
        practicalProjects: "Image classification, sentiment analysis",
        relevance: "Aligns with B.Tech AI & ML specialization",
      },
    },
    {
      name: "UI/UX Design using Figma",
      issuer: "Udemy",
      details: {
        skills: "User interface design, prototyping",
        tools: "Figma, design systems",
        application: "Better frontend development decisions",
      },
    },
    {
      name: "Git & GitHub",
      issuer: "Geekster (2023)",
      details: {
        skills: "Version control, collaboration",
        application: "All development projects",
      },
    },
  ]

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
    alert("Message sent successfully!")
  }

  const navItems = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Experience', url: '#experience', icon: Calendar },
    { name: 'Skills', url: '#skills', icon: Code },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact', url: '#contact', icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="hidden fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Akshay Jayesh
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}

              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-slate-700">
                <a
                  href="https://linkedin.com/in/akshay-jayesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/akshay-jayesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-200 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-800 py-4"
              >
                <div className="flex flex-col space-y-4">
                  {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                    <a
                      href="https://linkedin.com/in/akshay-jayesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/akshay-jayesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-400 hover:text-slate-200 transition-colors duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <NavBar items={navItems} className="" />

      <Hero
        title={
          <>
            Akshay Jayesh
          </>
        }
        subtitle={
          <>
            <div className="text-xl md:text-2xl text-slate-300 mb-4">
              <TypingAnimation texts={["Java Full Stack Developer", "AI & ML Enthusiast", "Problem Solver"]} />
            </div>
            <p className="text-lg md:text-xl text-slate-400 mb-6 font-medium">Building scalable solutions with passion and precision</p>
            <p className="text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">Aspiring Java Developer with expertise in Spring Boot, React, and modern web technologies. Passionate about creating meaningful, user-friendly applications that solve real-world problems.</p>
          </>
        }
        actions={[
          { label: "View Resume", href: "/resume.pdf", variant: "default" },
          { label: "Contact Me", href: "#contact", variant: "outline" },
        ]}
        className="mt-[90px]"
      >
        <div className="mb-8">
          <img
            src="/My_img2.jpg"
            alt="Akshay Jayesh - Professional headshot"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 border-4 border-blue-400/30 shadow-lg shadow-blue-400/20"
          />
        </div>
      </Hero>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { label: "Months Experience", value: 2, suffix: "" },
              { label: "Projects Completed", value: 3, suffix: "" },
              { label: "Technical Skills", value: 11, suffix: "" },
              { label: "Certifications", value: 4, suffix: "" },
              { label: "University GPA", value: 7.66, suffix: "" },
              { label: "High School %", value: 99, suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-800/30 relative">
        <div className="absolute inset-0 bg-[url('/about-illustration.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-200 mb-6 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-blue-400" />
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-blue-400 pl-4">
                      <h4 className="font-semibold text-slate-200">B.Tech Computer Engineering (AI & ML)</h4>
                      <p className="text-slate-300">Presidency University (2024) - GPA: 7.66/10</p>
                    </div>
                    <div className="border-l-2 border-emerald-400 pl-4">
                      <h4 className="font-semibold text-slate-200">Full Stack Web Development Certification</h4>
                      <p className="text-slate-300">Besant Technology (2024)</p>
                    </div>
                    <div className="border-l-2 border-slate-400 pl-4">
                      <h4 className="font-semibold text-slate-200">Intermediate Science</h4>
                      <p className="text-slate-300">I K Kumaran Govt. Higher Secondary School (81%)</p>
                    </div>
                    <div className="border-l-2 border-slate-400 pl-4">
                      <h4 className="font-semibold text-slate-200">High School</h4>
                      <p className="text-slate-300">Kasturba Gandhi Govt. High School (99%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 h-full flex flex-col"
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm flex-1">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-200 mb-4 flex items-center">
                    <User className="w-6 h-6 mr-3 text-emerald-400" />
                    Profile Summary
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Java Full Stack Developer with expertise in Spring Boot, Hibernate, MySQL, and MongoDB. Recently
                    started my professional journey with a focus on building scalable web applications and learning
                    modern development practices.
                  </p>

                  <h4 className="text-lg font-semibold text-slate-200 mb-3">Personal Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Problem-solving focused", "Continuous learner", "Clean code advocate", "Team player"].map(
                      (trait) => (
                        <Badge key={trait} className="bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors">
                          {trait}
                        </Badge>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-200 mb-4">Languages</h3>
                  <div className="space-y-3">
                    {[
                      { lang: "Malayalam", level: 100 },
                      { lang: "English", level: 90 },
                      { lang: "Hindi", level: 75 },
                    ].map((language) => (
                      <div key={language.lang}>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">{language.lang}</span>
                          <span className="text-slate-400">{language.level}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${language.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-blue-400 to-emerald-400 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-200">Junior Full Stack Developer</h3>
                        <p className="text-blue-400 font-semibold">KozkerTech</p>
                      </div>
                      <div className="flex items-center text-slate-300 mt-2 md:mt-0">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>2 months (Recently joined as a fresher)</span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Recently started my professional journey as a Junior Full Stack Developer. Learning and
                      contributing to projects using Java, Spring Boot, and React while gaining hands-on experience in
                      collaborative software development.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Spring Boot", "React", "MySQL", "Git", "Agile"].map((tech) => (
                        <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-20 bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[url('/skills-background.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Click any skill to see detailed information</p>
          </motion.div>

          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold mb-8 text-center text-slate-300 uppercase tracking-wider">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skillList.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer relative"
                    onClick={() => setSelectedModal({ type: 'skill', data: skill, layoutId: `skill-${category}-${skill.name}-${index}` })}
                  >
                    
                    <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-400/10 h-full group-hover:scale-105 transform hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center transition-transform duration-300 shadow-lg">
                          <skill.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200 mb-2">{skill.name}</h4>
                        <Badge
                          variant="outline"
                          className={
                            skill.level === "Advanced"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                              : skill.level === "Intermediate"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs"
                                : "bg-slate-500/10 text-slate-400 border-slate-500/30 text-xs"
                          }
                        >
                          {skill.level}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedModal({ type: "project", data: project })}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-400/10 h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} interface`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-200 mb-3">{project.title}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">Key Features:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-slate-400 text-center">Click for detailed information</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Soft Skills
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cursor-pointer group relative"
                onClick={() => setSelectedModal({ type: 'softSkill', data: skill, layoutId: `soft-${skill.name}-${index}` })}
              >

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-400/50 h-full group-hover:scale-105 transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{skill.icon}</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3">{skill.name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{skill.description}</p>
                    <div className="mt-2 text-xs text-slate-400">Click for details</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Interest */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Areas of Interest
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="cursor-pointer"
                onClick={() => setSelectedModal({ type: "interest", data: interest })}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-emerald-400/50 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-6">{interest.icon}</div>
                    <h3 className="text-xl font-bold text-slate-200 mb-4">{interest.name}</h3>
                    <p className="text-slate-300 leading-relaxed">{interest.description}</p>
                    <div className="mt-3 text-xs text-slate-400">Click for learning path</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Certifications
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedModal({ type: "certification", data: cert })}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-400/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">{cert.name}</h3>
                        <p className="text-slate-300 text-sm">{cert.issuer}</p>
                        <div className="mt-2 text-xs text-slate-400">Click for details</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <blockquote className="text-2xl md:text-3xl font-light text-slate-300 italic mb-6">
              "Code is like humor. When you have to explain it, it's bad."
            </blockquote>
            <p className="text-slate-400">- Cory House</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-800/30 relative">
        <div className="absolute inset-0 bg-[url('/contact-background.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-200 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Email</p>
                        <p className="text-slate-400">akshayjayeshjp@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Phone</p>
                        <p className="text-slate-400">+91 8078309818</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Current Location</p>
                        <p className="text-slate-400">Bangalore, Karnataka, 560064</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Permanent Address</p>
                        <p className="text-slate-400">Vasantham, P O Naluthare, Pandakkal, Mahe, 673310</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-slate-200 mb-4">Connect with me</h4>
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-200 mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-blue-400"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-blue-400"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-blue-400 min-h-[120px]"
                        placeholder="Tell me about your project or just say hello!"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2024 Akshay Jayesh. Built with React, Next.js, and Tailwind CSS.</p>
        </div>
      </footer>

      {/* Enhanced Modal with better zoom effects */}
      <Dialog open={!!selectedModal} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-2xl max-h-[80vh] overflow-y-auto">
          <motion.div
            layoutId={selectedModal?.type === 'skill' ? selectedModal.layoutId : undefined}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
                {selectedModal?.type === "skill" && selectedModal.data.icon && (
                  <selectedModal.data.icon className="w-8 h-8 mr-3 text-blue-400" />
                )}
                {selectedModal?.data.name || selectedModal?.data.title}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6">
              {selectedModal?.type === "skill" && selectedModal.data.details && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Experience
                      </h4>
                      <p className="text-slate-300">{selectedModal.data.details.experience}</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-400 mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Level
                      </h4>
                      <p className="text-slate-300">{selectedModal.data.level}</p>
                    </div>
                  </div>

                  {selectedModal.data.details.projects && (
                    <div className="bg-slate-700/20 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Projects Used In
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedModal.data.details.projects.map((project: string) => (
                          <Badge key={project} variant="outline" className="border-slate-600 text-slate-300">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedModal.data.details.frameworks && (
                    <div className="bg-slate-700/20 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-400 mb-3">Related Frameworks/Libraries</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedModal.data.details.frameworks.map((framework: string) => (
                          <Badge key={framework} variant="outline" className="border-purple-500/30 text-purple-300">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedModal.data.details.nextGoal && (
                    <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg p-4 border border-blue-500/20">
                      <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Next Learning Goals
                      </h4>
                      <p className="text-slate-300">{selectedModal.data.details.nextGoal}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedModal?.type === "project" && selectedModal.data.details && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-1">Development Time</h4>
                      <p className="text-slate-300">{selectedModal.data.details.developmentTime}</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-400 mb-1">Team Size</h4>
                      <p className="text-slate-300">{selectedModal.data.details.teamSize}</p>
                    </div>
                  </div>

                  {selectedModal.data.details.challenges && (
                    <div className="bg-slate-700/20 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Key Challenges</h4>
                      <ul className="text-slate-300 space-y-1">
                        {selectedModal.data.details.challenges.map((challenge: string) => (
                          <li key={challenge} className="flex items-start">
                            <Target className="w-3 h-3 mr-2 mt-1 text-amber-400 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedModal.data.details.highlights && (
                    <div className="bg-slate-700/20 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-400 mb-2">Technical Highlights</h4>
                      <ul className="text-slate-300 space-y-1">
                        {selectedModal.data.details.highlights.map((highlight: string) => (
                          <li key={highlight} className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-2 text-emerald-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {selectedModal?.type === "softSkill" && selectedModal.data.details && (
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Example</h4>
                    <p className="text-slate-300">{selectedModal.data.details.example}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-400 mb-2">Approach</h4>
                    <p className="text-slate-300">{selectedModal.data.details.approach}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-400 mb-2">Result</h4>
                    <p className="text-slate-300">{selectedModal.data.details.result}</p>
                  </div>
                </div>
              )}

              {selectedModal?.type === "interest" && selectedModal.data.details && (
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Current Focus</h4>
                    <p className="text-slate-300">{selectedModal.data.details.currentFocus}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-400 mb-2">Learning Resources</h4>
                    <p className="text-slate-300">{selectedModal.data.details.learningResources}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-400 mb-2">Goal Timeline</h4>
                    <p className="text-slate-300">{selectedModal.data.details.goalTimeline}</p>
                  </div>
                </div>
              )}

              {selectedModal?.type === "certification" && selectedModal.data.details && (
                <div className="space-y-4">
                  {selectedModal.data.details.duration && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">Duration</h4>
                      <p className="text-slate-300">{selectedModal.data.details.duration}</p>
                    </div>
                  )}
                  {selectedModal.data.details.keySkills && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-400 mb-2">Key Skills</h4>
                      <p className="text-slate-300">{selectedModal.data.details.keySkills}</p>
                    </div>
                  )}
                  {selectedModal.data.details.application && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Application</h4>
                      <p className="text-slate-300">{selectedModal.data.details.application}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
