import { useEffect, useRef } from 'react'

/**
 * hooks/useDragScroll.js
 * Geser horizontal dengan klik-tahan mouse + inersia saat dilepas. Perangkat
 * sentuh memakai scroll native. Klik setelah drag nyata ditahan agar tidak
 * memicu navigasi. Kembalikan ref untuk dipasang ke container overflow-x.
 */
export default function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let startX = 0
    let startScroll = 0
    let lastScroll = 0
    let velocity = 0
    let moved = false
    let raf = null

    const stopMomentum = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    const onDown = (e) => {
      down = true
      moved = false
      startX = e.pageX
      startScroll = el.scrollLeft
      lastScroll = el.scrollLeft
      velocity = 0
      stopMomentum()
      el.classList.add('is-dragging')
    }

    const onMove = (e) => {
      if (!down) return
      const dx = e.pageX - startX
      if (Math.abs(dx) > 4) moved = true
      el.scrollLeft = startScroll - dx
      velocity = el.scrollLeft - lastScroll
      lastScroll = el.scrollLeft
    }

    const onUp = () => {
      if (!down) return
      down = false
      const glide = () => {
        el.scrollLeft += velocity
        velocity *= 0.93
        if (Math.abs(velocity) > 0.4) {
          raf = requestAnimationFrame(glide)
        } else {
          el.classList.remove('is-dragging')
          raf = null
        }
      }
      if (Math.abs(velocity) > 0.6) raf = requestAnimationFrame(glide)
      else el.classList.remove('is-dragging')
    }

    // Batalkan klik yang mengakhiri drag agar tidak membuka produk.
    const onClick = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      stopMomentum()
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  return ref
}
