import React from 'react';

const HeroCard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border border-muted-foreground/20 overflow-hidden shadow-2xl bg-background">
      <div className="flex items-center justify-between bg-muted/50 px-3 py-2 border-b border-muted-foreground/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full" />
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full" />
          <div className="w-3 h-3 bg-[#27c93f] rounded-full" />
        </div>
        <p className="text-muted-foreground text-[10px] sm:text-xs font-mono tracking-wider flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          hammerize_agent_v1.exe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
        <div className="p-6 flex flex-col bg-[#0c0c0c] font-mono text-sm border-b md:border-b-0 md:border-r border-muted-foreground/20">
          <div className="flex items-center gap-2 text-green-500 mb-4">
            <span className="text-xs">System:</span>
            <span className="animate-pulse">_</span>
          </div>

          <div className="space-y-3">
            <p className="text-blue-400 text-xs">
              [14:22:01]{' '}
              <span className="text-white">Ingesting Discord #dev-chat...</span>
            </p>
            <p className="text-blue-400 text-xs">
              [14:22:05]{' '}
              <span className="text-white">Analyzed 42 new messages</span>
            </p>
            <p className="text-yellow-400 text-xs">
              [14:22:06]{' '}
              <span className="text-white">Gemini-1.5-Flash processing...</span>
            </p>

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-muted-foreground italic text-xs">
                "We need to fix the Redis connection issue by Friday or the demo
                will fail..."
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                — @MarkoDev (Discord)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
              AI Insights
            </h3>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              New Summary
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">
                Key Discussion
              </p>
              <p className="text-sm leading-relaxed">
                The team is prioritizing <strong>Redis caching</strong> to fix
                latency issues before Friday's client demo.
              </p>
            </div>

            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">
                Action Items
              </p>
              <ul className="text-xs space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Marko to deploy Redis on staging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Ana to send final Figma mockups</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <span className="text-[9px] px-1.5 py-0.5 border border-muted-foreground/20 rounded text-muted-foreground">
                #Performance
              </span>
              <span className="text-[9px] px-1.5 py-0.5 border border-muted-foreground/20 rounded text-muted-foreground">
                #Urgent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
