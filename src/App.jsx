import React, { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X, Sparkles, Cpu, Code2, Palette, ChartNoAxesCombined, Mail, MapPin, Linkedin, Github, Instagram } from 'lucide-react'
import OfficeScene from './OfficeScene.jsx'

const APPLY_URL = 'https://forms.google.com/' // Replace with your official Internlytic application form URL.
const nav = ['About','Services','Internships','Projects','Contact']
export default function App(){
 const [menu,setMenu]=useState(false), [intro,setIntro]=useState(true), [sent,setSent]=useState(false)
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 return <main>
  <header className="topbar">
   <a className="brand" href="#home" aria-label="Internlytic Technologies home"><img src="/internlytic-logo.jpg" alt="Internlytic Technologies"/></a>
   <nav className={menu?'nav open':'nav'}>{nav.map(n=><button key={n} onClick={()=>go(n.toLowerCase())}>{n}</button>)}</nav>
   <a className="header-cta" href={APPLY_URL} target="_blank" rel="noreferrer">Join our next cohort <ArrowUpRight size={16}/></a>
   <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
  </header>
  <section className="hero" id="home">
   <div className="hero-copy">
    <div className="eyebrow"><span className="live-dot"/> TECHNOLOGY · AI · INNOVATION</div>
    <h1>Build what<br/>comes <em>next.</em></h1>
    <p className="hero-text">A technology company helping ambitious people turn curiosity into practical skills, meaningful projects, and real-world innovation.</p>
    <div className="hero-actions"><button className="primary" onClick={()=>go('about')}>Discover Internlytic <ArrowDownRight size={17}/></button><a className="text-link" href={APPLY_URL} target="_blank" rel="noreferrer">Explore internships <ArrowUpRight size={16}/></a></div>
    <div className="hero-foot"><span>01 / COMPANY EXPERIENCE</span><span>SCROLL TO EXPLORE ↓</span></div>
   </div>
   <div className="hero-visual">
    <OfficeScene/>
    <div className="scene-label"><span className="scene-pulse"/> LIVE 3D OFFICE EXPERIENCE</div>
    <div className="scene-caption"><strong>Welcome to Internlytic</strong><span>A place for ideas to move forward.</span></div>
    {intro&&<button className="skip-intro" onClick={()=>setIntro(false)}>Skip intro ↗</button>}
   </div>
  </section>
  <div className="ticker"><span>BUILD</span><i>✳</i><span>LEARN</span><i>✳</i><span>CREATE</span><i>✳</i><span>INNOVATE</span><i>✳</i><span>BUILD</span><i>✳</i><span>LEARN</span></div>
  <section className="section about" id="about"><div className="section-kicker">01 — WHO WE ARE</div><div className="section-grid"><h2>Technology is better<br/>when people <em>grow.</em></h2><div><p className="large-copy">Internlytic Technologies is built around practical learning, thoughtful design, and technology that solves real problems.</p><p>We bring together software, artificial intelligence, data, and creative thinking to help learners and teams explore what is possible—and build the confidence to make it real.</p><button className="under-link" onClick={()=>go('services')}>What we do <ArrowUpRight size={16}/></button></div></div></section>
  <section className="section services" id="services"><div className="section-kicker">02 — WHAT WE DO</div><div className="section-heading"><h2>Ideas into <em>impact.</em></h2><p>Technology services and learning experiences for a changing world.</p></div><div className="service-grid">
   {[{icon:Cpu,title:'AI & Automation',desc:'Practical AI, machine learning, generative AI and workflow automation.'},{icon:Code2,title:'Software Development',desc:'Responsive web experiences, modern applications and useful digital tools.'},{icon:Palette,title:'UI/UX & Product Design',desc:'Human-centered experiences that make digital products feel clear and intuitive.'},{icon:ChartNoAxesCombined,title:'Data & Analytics',desc:'Turn data into insights, decisions and measurable progress.'}].map((s,i)=><article className="service-card" key={s.title}><div className="card-top"><span>0{i+1}</span>{React.createElement(s.icon,{size:23,strokeWidth:1.5})}</div><h3>{s.title}</h3><p>{s.desc}</p><ArrowUpRight className="card-arrow" size={18}/></article>)}
  </div></section>
  <section className="internship-band" id="internships"><div className="section-kicker">03 — LEARN BY DOING</div><div className="band-grid"><div><h2>Make your next<br/>step <em>count.</em></h2><p>Build practical skills through guided tasks, project-based learning, and a community that encourages progress.</p><a className="light-cta" href={APPLY_URL} target="_blank" rel="noreferrer">Apply for an internship <ArrowUpRight size={17}/></a></div><div className="track-list">{['Artificial Intelligence & Machine Learning','Frontend & Full-Stack Development','UI/UX and Product Design','Data Science & Analytics','Digital Skills & Automation'].map((t,i)=><div className="track" key={t}><span>0{i+1}</span>{t}<ArrowUpRight size={17}/></div>)}</div></div></section>
  <section className="section projects" id="projects"><div className="section-kicker">04 — SELECTED WORK</div><div className="section-heading"><h2>Curiosity made <em>visible.</em></h2><p>Explore a selection of project directions and practical experiments.</p></div><div className="project-grid"><article className="project-card project-one"><div className="project-art"><div className="orb orb-a"/><div className="orb orb-b"/><span>AI / 01</span></div><div className="project-info"><div><h3>Intelligent Workflows</h3><p>AI · Automation · Productivity</p></div><ArrowUpRight/></div></article><article className="project-card project-two"><div className="project-art"><div className="browser-art"><div/><div/><div/></div><span>WEB / 02</span></div><div className="project-info"><div><h3>Digital Experiences</h3><p>Web · Product · Interaction</p></div><ArrowUpRight/></div></article><article className="project-card project-three"><div className="project-art"><div className="data-bars"><i/><i/><i/><i/><i/><i/></div><span>DATA / 03</span></div><div className="project-info"><div><h3>Data in Motion</h3><p>Analytics · Insights · Learning</p></div><ArrowUpRight/></div></article></div><p className="small-note">Visual concepts shown here are illustrative, not claims of completed client projects.</p></section>
  <section className="contact" id="contact"><div className="section-kicker">05 — START A CONVERSATION</div><div className="contact-grid"><div><h2>Have an idea?<br/><em>Let's talk.</em></h2><p>Tell us what you are building, learning, or hoping to explore next.</p><div className="contact-detail"><Mail size={18}/> arslanfayyaz1997@gmail.com</div><div className="contact-detail"><MapPin size={18}/> Pakistan · Working remotely</div></div><form onSubmit={e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent('Website enquiry — '+d.get('name'));const body=encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`);window.location.href=`mailto:arslanfayyaz1997@gmail.com?subject=${subject}&body=${body}`;setSent(true)}}><label>Your name<input name="name" required placeholder="How should we call you?"/></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"/></label><label>What would you like to discuss?<textarea name="message" rows="4" required placeholder="Tell us a little about your idea…"/></label><button className="primary" type="submit">Prepare message <ArrowUpRight size={17}/></button>{sent&&<small>Your email app should open with the message drafted. Sending depends on your email app.</small>}</form></div></section>
  <footer><img src="/internlytic-logo.jpg" alt="Internlytic Technologies"/><span>© {new Date().getFullYear()} Internlytic Technologies</span><div className="socials"><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="https://github.com/arslanfayyaz1997/" aria-label="GitHub"><Github size={17}/></a><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={17}/></a></div></footer>
 </main>
}