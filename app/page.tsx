"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Lenis from "lenis";

const DigitalWorld = dynamic(() => import("../components/digital-core/DigitalWorld"), { ssr: false });

const chapters = [
  { id: "hero", tag: "SCORPIO WEBWORKS", number: "", title: <>DIGITAL EXPERIENCES<br />THAT MOVE <em>BUSINESS FORWARD.</em></>, copy: "Scorpio Webworks creates modern websites, web applications, e-commerce experiences, and custom software designed to help businesses grow.", actions: true },
  { id: "system", tag: "ABOUT SCORPIO", number: "", title: <>TECHNOLOGY BUILT<br />AROUND <em>YOUR BUSINESS.</em></>, copy: "Scorpio Webworks is a software development studio focused on fast, modern, reliable digital products. Every project starts by understanding the business, the users, and the outcome that matters." },
  { id: "software", tag: "01 / SERVICES", number: "01", title: <>WEBSITES & WEB<br /><em>APPLICATIONS.</em></>, copy: "Responsive websites that communicate your brand and convert visitors, plus scalable web applications built around real workflows, users, and operations." },
  { id: "web", tag: "02 / SERVICES", number: "02", title: <>COMMERCE THAT<br /><em>WORKS HARDER.</em></>, copy: "High-quality e-commerce experiences designed for usability, performance, payments, and conversion — from first visit through daily operations." },
  { id: "commerce", tag: "03 / SERVICES", number: "03", title: <>PRODUCT DESIGN.<br /><em>BUILT TO LAST.</em></>, copy: "Clean UI/UX and purpose-built custom software for needs beyond off-the-shelf platforms, with ongoing improvements, feature development, and support." },
  { id: "connect", tag: "04 / OUR PROCESS", number: "04", title: <>IDEA TO LAUNCH.<br /><em>WITH INTENTION.</em></>, copy: "Discover the business and users. Plan the structure and roadmap. Design the experience. Build with maintainable technology. Launch, test, and optimize. Then evolve as the business grows." },
  { id: "cloud", tag: "05 / ENGINEERING", number: "05", title: <>BUILT TO<br /><em>PERFORM.</em></>, copy: "Clean architecture, responsive interfaces, maintainable code, secure integrations, and reliable production deployment — with performance and scale considered from the start." },
  { id: "convergence", tag: "WORK WITH SCORPIO", number: "", title: <>A DIGITAL PRODUCT<br />BUILT AROUND <em>THE WORK.</em></>, copy: "From a focused website to a connected business platform, Scorpio Webworks brings design and engineering together to build the right product for the job." },
];

function Arrow(){ return <span aria-hidden="true">↗</span>; }
export default function Home() {
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(motion.matches); setProgress(Math.min(1, scrollY / Math.max(1, document.body.scrollHeight - innerHeight))); };
    update(); addEventListener("scroll", update, { passive:true }); addEventListener("resize", update); motion.addEventListener("change",update);
    return () => { removeEventListener("scroll",update); removeEventListener("resize",update); motion.removeEventListener("change",update); };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: .075, smoothWheel: true });
    let frame = 0;
    const raf = (time:number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reduced]);
  const go=(id:string)=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});};
  return <main className="immersive">
    <DigitalWorld progress={progress} reduced={reduced} />
    <header className={progress>.035?"cinematic-nav nav-on":"cinematic-nav"}>
      <button className="brand" onClick={()=>go("hero")}><b>S</b><span>SCORPIO<br/>WEBWORKS</span></button>
      <nav>{[["Home","hero"],["About","system"],["Services","software"],["Work","convergence"],["Process","connect"],["Contact","contact"]].map(([t,id])=><button key={t} onClick={()=>go(id)}>{t}</button>)}</nav>
      <button className="build" onClick={()=>go("contact")}>LET&apos;S BUILD <Arrow/></button>
      <button className="menu" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}><i/><i/></button>
      {menu&&<aside className="nav-sheet">{[["Home","hero"],["About","system"],["Services","software"],["Work","convergence"],["Process","connect"],["Contact","contact"]].map(([t,id])=><button key={t} onClick={()=>go(id)}>{t}</button>)}</aside>}
    </header>
    <div className="scroll-rail"><span style={{transform:`scaleY(${Math.max(.02,progress)})`}}/></div>
    {chapters.map((chapter, index)=><section className={"chapter c-"+chapter.id} id={chapter.id} key={chapter.id}>
      <div className="chapter-copy">
        <p className="kicker">{chapter.tag}</p>
        {chapter.number&&<p className="number">{chapter.number}</p>}
        <h1>{chapter.title}</h1>
        <p className="copy">{chapter.copy}</p>
        {chapter.actions&&<div className="actions"><button className="button solid" onClick={()=>go("contact")}>START A PROJECT <Arrow/></button><button className="button" onClick={()=>go("convergence")}>EXPLORE OUR WORK <Arrow/></button></div>}
      </div>
      {index===0&&<p className="enter">SCROLL TO ENTER <i>↓</i></p>}
      {index>0&&<p className="chapter-index">{String(index).padStart(2,"0")} / 07</p>}
    </section>)}
    <section className="contact-bridge" id="contact"><p className="kicker">CONTACT SCORPIO WEBWORKS</p><h2>LET&apos;S BUILD<br/>SOMETHING <em>GREAT.</em></h2><p>Have an idea worth building? Tell us what you&apos;re creating, what you&apos;re trying to improve, or where you want to take your business next.</p><button className="button solid">START A PROJECT <Arrow/></button></section>
  </main>;
}
