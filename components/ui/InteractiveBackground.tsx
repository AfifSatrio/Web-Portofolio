"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
    };

    // Create a dynamic grid of hidden particles
    const nodes: Node[] = [];
    const spacing = 48;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing + (Math.random() - 0.5) * 16;
        const y = r * spacing + (Math.random() - 0.5) * 16;

        nodes.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.0 + 1.2,
          baseAlpha: Math.random() * 0.3 + 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
      parent.addEventListener("touchmove", handleTouchMove, { passive: true });
      parent.addEventListener("touchend", handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const isMouseActive = mouse.x > 0 && mouse.y > 0;

      // Update particle positions & spring physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Pulse phase animation
        node.pulsePhase += node.pulseSpeed;

        // Floating drift
        node.x += node.vx;
        node.y += node.vy;

        if (Math.abs(node.x - node.originX) > 16) node.vx *= -1;
        if (Math.abs(node.y - node.originY) > 16) node.vy *= -1;

        // Smooth spring force returning towards home origin
        node.x += (node.originX - node.x) * 0.04;
        node.y += (node.originY - node.y) * 0.04;

        if (!isMouseActive) continue;

        // Distance to mouse cursor
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // HIDE particles outside mouse radius!
        if (dist >= mouse.radius) continue;

        const rawForce = (mouse.radius - dist) / mouse.radius;
        const force = Math.pow(rawForce, 1.5); // Smooth non-linear curve
        const angle = Math.atan2(dy, dx);

        // Magnetic attraction: pull particles TOWARDS cursor
        node.x += Math.cos(angle) * force * 3.5;
        node.y += Math.sin(angle) * force * 3.5;

        const currentRadius = node.radius + force * 2.2;
        const currentAlpha = force * node.baseAlpha;

        // Luminous laser beam connecting particle to cursor
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 * force})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Draw connections between neighboring nodes ONLY within cursor radius
        for (let j = i + 1; j < nodes.length; j++) {
          const neighbor = nodes[j];
          const ndx = node.x - neighbor.x;
          const ndy = node.y - neighbor.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          const neighborMouseDist = Math.sqrt((mouse.x - neighbor.x) ** 2 + (mouse.y - neighbor.y) ** 2);

          if (neighborMouseDist < mouse.radius && nDist < spacing * 1.45) {
            const lineAlpha = (1 - nDist / (spacing * 1.45)) * force;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw Glowing Particle Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      }

      // Draw Antigravity Spotlight Glow centered on active mouse
      if (isMouseActive) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.09)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("touchmove", handleTouchMove);
        parent.removeEventListener("touchend", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
