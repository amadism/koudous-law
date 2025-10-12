import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useGsapAnimation = () => {
  const initScrollTrigger = () => {
    if (process.client) {
      gsap.registerPlugin(ScrollTrigger)
    }
  }

  const isValidElement = (element: any): element is Element => {
    return element && typeof element.getBoundingClientRect === 'function'
  }

  const fadeInUp = (element: string | Element | null, options = {}) => {
    if (!process.client || !element || !isValidElement(element)) return
    
    const defaults = {
      duration: 1,
      y: 60,
      opacity: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const fadeIn = (element: string | Element | null, options = {}) => {
    if (!process.client || !element || !isValidElement(element)) return
    
    const defaults = {
      duration: 1,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const slideInLeft = (element: string | Element | null, options = {}) => {
    if (!process.client || !element || !isValidElement(element)) return
    
    const defaults = {
      duration: 1,
      x: -80,
      opacity: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const slideInRight = (element: string | Element | null, options = {}) => {
    if (!process.client || !element || !isValidElement(element)) return
    
    const defaults = {
      duration: 1,
      x: 80,
      opacity: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const scaleIn = (element: string | Element | null, options = {}) => {
    if (!process.client || !element || !isValidElement(element)) return
    
    const defaults = {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const staggerFadeInUp = (elements: string | Element[] | null, options = {}) => {
    if (!process.client || !elements) return
    
    // Get the first element as trigger if it's an array
    const trigger = Array.isArray(elements) ? elements[0] : elements
    
    // Validate trigger element
    if (!trigger || !isValidElement(trigger)) return
    
    const defaults = {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    return gsap.from(elements, { ...defaults, ...options })
  }

  const heroAnimation = (container: Element | null) => {
    if (!process.client || !container) return
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    const heroBar = container.querySelector('.hero-bar')
    const heroTitle = container.querySelector('.hero-title')
    const heroSubtitle = container.querySelector('.hero-subtitle')
    const heroDescription = container.querySelector('.hero-description')
    const heroButton = container.querySelector('.hero-button')
    
    if (heroBar) {
      tl.from(heroBar, {
        width: 0,
        duration: 0.8,
        delay: 0.2,
      })
    }
    
    if (heroTitle) {
      tl.from(heroTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, '-=0.4')
    }
    
    if (heroSubtitle) {
      tl.from(heroSubtitle, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
    }
    
    if (heroDescription) {
      tl.from(heroDescription, {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
    }
    
    if (heroButton) {
      tl.from(heroButton, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
      }, '-=0.5')
    }

    return tl
  }

  return {
    initScrollTrigger,
    fadeInUp,
    fadeIn,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerFadeInUp,
    heroAnimation,
  }
}

