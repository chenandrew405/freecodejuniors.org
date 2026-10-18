import Image from 'next/image';

import { Container } from '@/components/shared/container';
import { PageIntro } from '@/components/shared/page-intro';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeader } from '@/components/shared/section-header';
import { programsContent } from '@/lib/content';
import { homeProgramsPreviewLayout, programsListLayout } from '@/lib/layout';
import { getLayoutBoxStyle } from '@/lib/layout-utils';

export default function ProgramsPage() {
  return (
    <main>
      <PageIntro
        description={programsContent.pageIntro.description}
        eyebrow={programsContent.pageIntro.eyebrow}
        title={programsContent.pageIntro.title}
      />

      <section className="layout-shell" style={getLayoutBoxStyle(programsListLayout.section)}>
        <Container>
          <Reveal>
            <SectionHeader
              description={programsContent.sectionIntro.description}
              eyebrow={programsContent.sectionIntro.eyebrow}
              title={programsContent.sectionIntro.title}
            />
          </Reveal>
          <div className="layout-grid layout-grid-cols mt-10 grid" style={getLayoutBoxStyle(programsListLayout.grid)}>
            {programsContent.programs.map((program, index) => {
              return (
                <Reveal key={program.id} className="h-full" delay={index * 0.06}>
                  <article className="layout-radius premium-card interactive-card h-full overflow-hidden" style={getLayoutBoxStyle(homeProgramsPreviewLayout.card)}>
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 sm:aspect-[16/11]">
                      {program.imagePlaceholderText ? (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),_transparent_58%),linear-gradient(180deg,_rgba(241,245,249,0.95),_rgba(226,232,240,0.9))] px-8 text-center">
                          <p className="font-mono text-3xl font-semibold tracking-[0.12em] text-slate-500">{program.imagePlaceholderText}</p>
                        </div>
                      ) : (
                        <Image alt={program.title} className="object-cover" fill sizes="(max-width: 1024px) 100vw, 33vw" src={program.image} />
                      )}
                    </div>
                    <div className="layout-card-size flex h-full flex-col gap-4 sm:gap-5" style={getLayoutBoxStyle(homeProgramsPreviewLayout.cardSecondary)}>
                      <div className="relative inline-flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        <Image alt="" aria-hidden="true" className="object-contain p-2" fill sizes="48px" src={program.badgeImage} />
                      </div>
                      <div>
                        <h2 className="font-mono text-2xl font-semibold text-slate-950">{program.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
                      </div>
                      <div className="mt-auto grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600 sm:flex sm:flex-wrap sm:gap-3 sm:text-sm">
                        <div className="min-w-0 rounded-[1.1rem] border border-slate-200/80 bg-white/90 p-3 sm:min-w-[9rem] sm:flex-1 sm:p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">Age</p>
                          <p className="mt-2 break-words text-[0.78rem] leading-4 text-slate-700 sm:text-sm sm:leading-5">{program.recommendedAge}</p>
                        </div>
                        <div className="min-w-0 rounded-[1.1rem] border border-slate-200/80 bg-white/90 p-3 sm:min-w-[9rem] sm:flex-1 sm:p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">Duration</p>
                          <p className="mt-2 break-words text-[0.78rem] leading-4 text-slate-700 sm:text-sm sm:leading-5">{program.duration}</p>
                        </div>
                        <div className="min-w-0 rounded-[1.1rem] border border-slate-200/80 bg-white/90 p-3 sm:min-w-[9rem] sm:flex-1 sm:p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">Level</p>
                          <p className="mt-2 break-words text-[0.78rem] leading-4 text-slate-700 sm:text-sm sm:leading-5">{program.skillLevel}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
