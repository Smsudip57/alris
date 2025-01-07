'use client'
import Image from 'next/image'
import { ArrowRight, Zap, Brain, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { Toaster } from "sonner";
import Link from "next/link";
import React, {useEffect} from 'react';





export default function Home() {

  useEffect(() => {
    const canvas = document.getElementById("canv") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let t = 0;
    const num = 750;
    let u = 0;
    const frameRate = 1 / 60;

    const anim = () => {
      // Clear the canvas with a semi-transparent background
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0A0B0F";
      ctx.fillRect(0, 0, w, h);

      // Switch to lighter mode for the animation
      ctx.globalCompositeOperation = "lighter";

      // Draw two layers of animation
      for (let i = 0; i < 2; i++) {
        let x = 0;
        const layerOffset = u / 4 + i;
        const colorHue = u + layerOffset / 8;

        ctx.beginPath();
        for (let j = 0; j < num; j++) {
          x += 0.55 * Math.sin(18);
          const y = (x * Math.sin(i + 1.4 * t + x / 50)) / 10.5;
          const angle = (j * 11.46 * Math.PI) / 3.9;

          const _x = x * Math.cos(angle) - y * Math.sin(i);
          const _y = x * Math.sin(angle) + y * Math.cos(i);

          ctx.lineWidth = 0.1;
          ctx.arc(w / 2 - _x, h / 2 - _y, 1, 0, Math.PI * 2);
        }

        // Create a gradient for the stroke
        const gradient = ctx.createLinearGradient(
          w / 2,
          h / 2,
          w / 2 + x,
          h / 2 + x
        );
        gradient.addColorStop(0.1, `hsla(${colorHue * i}, 90%, 50%, 0.7)`);
        gradient.addColorStop(1, `hsla(${layerOffset * i}, 95%, 50%, 0.09)`);

        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      // Update time and animation variables
      t += frameRate;
      u -= 0.2;

      // Call the animation frame
      window.requestAnimationFrame(anim);
    };

    anim();

    // Handle window resizing
    const resizeHandler = () => {
      canvas.width = w = window.innerWidth;
      canvas.height = h = window.innerHeight;
    };

    window.addEventListener("resize", resizeHandler);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);


  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>('.cursor');

    if (cursor) {
      // Mousemove event
      const onMouseMove = (e: MouseEvent) => {
        if (cursor) {
          cursor.setAttribute(
            "style", 
            `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`
          );
        }
      };

      // Click event to add expand class
      const onClick = () => {
        if (cursor) {
          cursor.classList.add("expand");
          setTimeout(() => {
            cursor.classList.remove("expand");
          }, 500);
        }
      };

      // Attach event listeners
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('click', onClick);

      // Cleanup event listeners on unmount
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('click', onClick);
      };
    }
  }, []);

  

  
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white relative ">
      <div className="w-screen h-screen bg-[url('https://img.freepik.com/premium-photo/purple-pink-abstract-background-with-purple-pink-graphic-that-says-pink_605423-83265.jpg')] bg-cover fixed top-0 left-0 z-0"></div>
      <div className="w-screen h-screen bg-black bg-opacity-60 bg-cover fixed top-0 left-0 z-0"></div>
      <div className='cursor'></div>
      <Toaster />
      {/* Hero Section */}
      <main className="container mx-auto pt-16 relative z-10" >
        <div className="flex flex-col px-6 items-center text-center gap-8 max-w-3xl mx-auto cursor-pointer">
          {/* Logo */}
          <div className=" relative mb-8">
            {/* <canvas id='canv' className=' h-[400px] mb-[-100px] mt-[-100px] bg-transparent '></canvas> */}
            <Image
              src="/static/logo.png"
              alt="Alris logo"
              width={120}
              height={120}
              priority
              // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#B04FB8] to-[#54F4EC] relative z-0 py-2">
            Effortless Yield Optimization and Trading, Powered by AI
          </h1>
          <p className="text-xl text-blue-100/70 max-w-2xl">
            Maximize your DeFi returns with Alris – smart, automated, and seamless.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-[#B04FB8]/50 hover:text-white">
                Try Alris on Solana Testnet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Waitlist Form */}
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-8 mt-24 bg-[#280632] px-16 pt-16 pb-24">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[url('https://c4.wallpaperflare.com/wallpaper/7/827/804/light-web-sky-digital-art-wallpaper-preview.jpg')] border border-[#54F4EC]/20">
            <div className="p-3 rounded-full bg-gradient-to-br from-[#54F4EC]/70 to-[#B04FB8]/70 bg-opacity-20 mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Automated Yield Optimization
            </h3>
            <p className="text-sm text-blue-100/70">
              AI reallocates funds to maximize returns in real-time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUC0hEkDc9hdTAcXkOiSU-RgYJRukRAs1tSyePXqXpUEwvWPKsTqO4QXMx9VIb4F72Q&usqp=CAU')] bg-cover border border-[#54F4EC]/20">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#54F4EC]/70 to-[#B04FB8]/70 bg-opacity-20 mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Smart Trading Strategies
            </h3>
            <p className="text-sm text-blue-100/70">
              Dynamic trading powered by AI insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[url('https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148877163.jpg')] bg-center border border-[#B04FB8]/20">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#54F4EC]/70 to-[#B04FB8]/70 bg-opacity-20 mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-">
              Secure & Reliable
            </h3>
            <p className="text-sm text-blue-100/70">
              Built on Solana with secure server wallets.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#B04FB8]/20 bg-[#0A0B0F] relative z-10">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-blue-100/70">
            © 2024 Alris. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-blue-100/70 hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-blue-100/70 hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

