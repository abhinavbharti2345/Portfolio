import { memo, useRef } from 'react'
import { Hero } from '../components/Hero'
import { ScrollTransition } from '../components/ScrollTransition'
import { About } from '../components/sections/About'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { Hobbies } from '../components/sections/Hobbies'
import { Contact } from '../components/sections/Contact'

function HomeComponent() {
  const heroSectionRef = useRef(null)

  return (
    <>
      <Hero ref={heroSectionRef} />
      <ScrollTransition heroSectionRef={heroSectionRef}>
        <About />
      </ScrollTransition>
      <Projects />
      <Skills />
      <Hobbies />
      <Contact />
    </>
  )
}

export default memo(HomeComponent)
