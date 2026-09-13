"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DigitalWorld = dynamic(() => import("../components/digital-core/DigitalWorld"), { ssr: false });

const chapters = [
  { id: "hero", tag: "SCORPIO WEBWORKS", number: "", title: <>SOFTWARE.<br />SYSTEMS.<br /><em>DIGITAL EXPERIENCES.</em></>, copy: "We build software, web applications, e-commerce platforms, integrations and cloud solutions for modern businesses.", actions: true },
  { id: "system", tag: "ENTERING THE CORE", number: "", title: <>YOUR BUSINESS<br />ISN&apos;T ONE THING.<br /><em>IT&apos;S A SYSTEM.</em></>, copy: "Customers, software, data and infrastructure become more useful when they work as one." },
  { id: "software", tag: "01 / SOFTWARE", number: "01", title: <>SOFTWARE THAT FITS<br />THE WAY <em>YOU WORK.</em></>, copy: "From internal tools to customer-facing platforms, we build software around real business requirements." },
  { id: "web", tag: "02 / WEB", number: "02", title: <>MORE THAN<br /><em>A WEBSITE.</em></>, copy: "We build websites and web applications that become useful parts of your business." },
  { id: "commerce", tag: "03 / COMMERCE", number: "03", title: <>BUILT TO SELL.<br /><em>DESIGNED TO SCALE.</em></>, copy: "Products, customers, checkout and operations connected inside one commerce system." },
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
  const go=(id:string)=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});};
  return <main className="immersive">
    <DigitalWorld progress={progress} reduced={reduced} />
    <header className={progress>.035?"cinematic-nav nav-on":"cinematic-nav"}>
      <button className="brand" onClick={()=>go("hero")}><b>S</b><span>SCORPIO<br/>WEBWORKS</span></button>
      <nav>{[["Services","software"],["Solutions","system"],["Work","commerce"],["About","system"],["Contact","contact"]].map(([t,id])=><button key={t} onClick={()=>go(id)}>{t}</button>)}</nav>
      <button className="build" onClick={()=>go("contact")}>LET&apos;S BUILD <Arrow/></button>
      <button className="menu" aria-label="Open menu" onClick={()=>setMenu(!menu)}><i/><i/></button>
      {menu&&<aside className="nav-sheet">{[["Services","software"],["Solutions","system"],["Work","commerce"],["Contact","contact"]].map(([t,id])=><button key={t} onClick={()=>go(id)}>{t}</button>)}</aside>}
    </header>
    <div className="scroll-rail"><span style={{transform:`scaleY(${Math.max(.02,progress)})`}}/></div>
    {chapters.map((chapter, index)=><section className={"chapter c-"+chapter.id} id={chapter.id} key={chapter.id}>
      <div className="chapter-copy">
        <p className="kicker">{chapter.tag}</p>
        {chapter.number&&<p className="number">{chapter.number}</p>}
        <h1>{chapter.title}</h1>
        <p className="copy">{chapter.copy}</p>
        {chapter.actions&&<div className="actions"><button className="button solid" onClick={()=>go("contact")}>START A PROJECT <Arrow/></button><button className="button" onClick={()=>go("system")}>EXPLORE WHAT WE BUILD <Arrow/></button></div>}
      </div>
      {index===0&&<p className="enter">SCROLL TO ENTER <i>↓</i></p>}
      {index>0&&<p className="chapter-index">0{index} / 04</p>}
    </section>)}
    <section className="contact-bridge" id="contact"><p className="kicker">NEXT / CONTINUING THE SYSTEM</p><h2>THE JOURNEY<br/>CONTINUES <em>FROM HERE.</em></h2><p>The next phase will connect integrations, cloud infrastructure, work and the final system convergence.</p><button className="button solid">START A PROJECT <Arrow/></button></section>
  </main>;
}
