import React from 'react';
import { Button } from '../ui/button';
import HeroCard from '../card/hero-card';
import { ChevronRight } from 'lucide-react'; // Ako koristiš lucide-react za ikone

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 gap-12 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-background/10 via-background to-muted/30">
      <div className="space-y-6 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-extrabold max-w-4xl text-center tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
          Tame the chaos of <br />
          <span className="text-primary italic">multiple channels.</span>
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl text-center leading-relaxed">
          Hammerize.ai connects to Discord, Telegram, and Slack to instantly
          condense thousands of messages into actionable, high-fidelity
          summaries.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          size="lg"
          className="rounded-full px-8 text-md font-semibold group"
        >
          Start Hammering
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="w-full mt-8 transform hover:-translate-y-1 transition-transform duration-500">
        <HeroCard />
      </div>
    </div>
  );
};

export default HeroSection;
