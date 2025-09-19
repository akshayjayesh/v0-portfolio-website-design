"use client"
import React from "react"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">AKSHAY JAYESH</h1>
            <div className="text-slate-600">Aspiring Java Developer | Full Stack Developer | B.Tech (AI & ML)</div>
            <div className="text-slate-600 mt-2">+91 8078309818 | akshayjayeshjp@gmail.com</div>
            <div className="text-slate-600">Bangalore, Karnataka, 560064</div>
          </div>

          <div>
            <Button onClick={handlePrint} variant="default">Download / Print PDF</Button>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p className="text-slate-700">Aspiring and enthusiastic Java Developer with a B.Tech in Computer Engineering (AI & ML), a strong foundation in full-stack development, and hands-on experience building scalable, user-focused applications. Proficient in Java, Spring Boot, Hibernate, RESTful APIs, and front-end technologies like React. Skilled in MySQL, MongoDB, and modern software development practices including agile methodologies and OOP principles. Eager to contribute technical expertise and creativity to dynamic software teams.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <div className="text-slate-700">
            <strong>B.Tech in Computer Engineering (AI & ML)</strong><br />Presidency University, Bangalore — 2020 – 2024 | GPA: 7.66/10
            <div className="mt-2"><strong>Certification in Full Stack Web Development</strong> — Besant Technology, Bangalore (2024)</div>
            <div className="mt-2"><strong>Intermediate in Science</strong> — I K Kumaran Govt. Higher Secondary School, Mahe, Pondicherry (2018 – 2020) | 81%</div>
            <div className="mt-2"><strong>High School (Class X)</strong> — Kasturba Gandhi Govt. High School, Mahe, Pondicherry (2017 – 2018) | 99%</div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
          <ul className="list-disc ml-6 text-slate-700">
            <li>Languages: Java, JavaScript, SQL</li>
            <li>Front-End: HTML5, CSS3, React.js, Bootstrap</li>
            <li>Back-End: Spring Boot, Hibernate, REST APIs, Microservices</li>
            <li>Databases: MySQL, MongoDB</li>
            <li>Concepts: MVC Architecture, OOP, CRUD, Data Structures & Algorithms, Agile, CI/CD, Unit Testing</li>
            <li>Tools: Git, Postman, Docker, Maven, IntelliJ IDEA, Eclipse, VS Code, Figma, STS</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <div className="text-slate-700 space-y-3">
            <div>
              <strong>Employee Management System</strong> — Spring Boot, Angular, MySQL, Hibernate
              <ul className="list-disc ml-6">
                <li>Built a full-stack application with secure, role-based access.</li>
                <li>Designed responsive UI using Angular and Bootstrap.</li>
                <li>Developed RESTful APIs with Spring Boot and integrated database with Hibernate.</li>
              </ul>
            </div>

            <div>
              <strong>Food Ordering Website</strong> — Node.js, React.js, Firebase, JWT
              <ul className="list-disc ml-6">
                <li>Real-time food ordering website with user authentication and admin dashboard.</li>
                <li>Integrated Firebase Cloud Messaging for notifications.</li>
              </ul>
            </div>

            <div>
              <strong>E-commerce Website</strong> — HTML, CSS, JavaScript, Bootstrap
              <ul className="list-disc ml-6">
                <li>Responsive online shopping platform with product browsing and checkout features.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          <ul className="list-disc ml-6 text-slate-700">
            <li>Cyber Security and Ethical Hacking – Rinex & E-cell IIT Kharagpur</li>
            <li>Introduction to AI – IBM via Coursera (2023)</li>
            <li>UI/UX Design using Figma – Udemy</li>
            <li>Git & GitHub – Geekster (2023)</li>
            <li>Full Stack Web Development – Besant Technology, Bangalore (2025)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Soft Skills</h2>
          <ul className="list-disc ml-6 text-slate-700">
            <li>Relationship-building, teamwork</li>
            <li>Confident and determined problem-solver</li>
            <li>Adaptability in dynamic environments</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Languages</h2>
          <ul className="list-disc ml-6 text-slate-700">
            <li>Malayalam — Spoken & Written</li>
            <li>English — Spoken & Written</li>
            <li>Hindi — Spoken & Written</li>
          </ul>
        </section>

      </div>
    </div>
  )
}
