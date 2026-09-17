'use client'

import { useEffect, useRef, type ReactNode } from "react"

type AnimateHeadingProps = {
  children: ReactNode
  triggerRef?: React.RefObject<HTMLElement | null>
  className?: string
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
  delay?: number
  repeat?: boolean
  randomize?: boolean
  start?: string
}

export default function AnimateHeading({
  children,
  triggerRef,
  className = "",
  tag: Tag = "p",
  delay = 0,
  repeat = false,
  randomize = false,
  start = "top 92%",
}: AnimateHeadingProps) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const originalHTML = container.innerHTML
    const letterGroups: HTMLSpanElement[][] = []
    const replicaCount = 2

    const processTextNode = (textNode: Text): Node => {
      const text = textNode.textContent ?? ""
      const fragment = document.createDocumentFragment()

      text.split(/(\s+)/).forEach((part) => {
        if (/\s+/.test(part)) {
          fragment.appendChild(document.createTextNode(part))
          return
        }

        if (!part) return

        const wordSpan = document.createElement("span")
        wordSpan.style.display = "inline-block"
        wordSpan.style.whiteSpace = "nowrap"

        part.split("").forEach((char) => {
          const letterHolder = document.createElement("span")
          letterHolder.style.display = "inline-block"
          letterHolder.style.position = "relative"

          const replicas: HTMLSpanElement[] = []
          for (let index = 0; index < replicaCount; index += 1) {
            const replica = document.createElement("span")
            replica.textContent = char
            replica.style.display = "inline-block"
            replica.style.willChange = "transform, opacity, filter"

            if (index < replicaCount - 1) {
              replica.style.position = "absolute"
              replica.style.inset = "0 auto auto 0"
            }

            letterHolder.appendChild(replica)
            replicas.push(replica)
          }

          wordSpan.appendChild(letterHolder)
          letterGroups.push(replicas)
        })

        fragment.appendChild(wordSpan)
      })

      return fragment
    }

    const processNode = (node: Node): Node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return processTextNode(node as Text)
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const clonedElement = (node as Element).cloneNode(false) as Element
        node.childNodes.forEach((child) => {
          clonedElement.appendChild(processNode(child))
        })
        return clonedElement
      }

      return node.cloneNode(true)
    }

    const fragment = document.createDocumentFragment()
    container.childNodes.forEach((child) => {
      fragment.appendChild(processNode(child))
    })

    container.replaceChildren(fragment)

    let animation: { scrollTrigger?: { kill: () => void }; kill: () => void } | undefined
    let cancelled = false

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const animationOrder = [...letterGroups]
      if (randomize) {
        for (let index = animationOrder.length - 1; index > 0; index -= 1) {
          const randomIndex = Math.floor(Math.random() * (index + 1))
          ;[animationOrder[index], animationOrder[randomIndex]] = [
            animationOrder[randomIndex],
            animationOrder[index],
          ]
        }
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef?.current ?? container,
          start,
          once: !repeat,
          toggleActions: repeat ? "play none none reverse" : "play none none none",
        },
      })

      animationOrder.forEach((replicas, letterIndex) => {
        replicas.forEach((replica, replicaIndex) => {
          const isFinalReplica = replicaIndex === replicas.length - 1
          const startTime = delay + letterIndex * 0.025 + replicaIndex * 0.07

          timeline.fromTo(
            replica,
            {
              opacity: 0,
              y: -34,
              filter: "blur(2px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.4,
              ease: "power2.out",
            },
            startTime,
          )

          if (!isFinalReplica) {
            timeline.to(
              replica,
              {
                opacity: 0,
                filter: "blur(2px)",
                duration: 0.2,
                ease: "power1.in",
              },
              startTime + 0.06,
            )
          }
        })
      })

      animation = timeline
    })

    return () => {
      cancelled = true
      animation?.scrollTrigger?.kill()
      animation?.kill()
      container.innerHTML = originalHTML
    }
  }, [children, delay, randomize, repeat, triggerRef, start])

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLParagraphElement>}
      className={`inline-block overflow-hidden  ${className}`}
    >
      {children}
    </Tag>
  )
}