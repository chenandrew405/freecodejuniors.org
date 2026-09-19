import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

import { Container } from '@/components/shared/container';
import { PageIntro } from '@/components/shared/page-intro';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeader } from '@/components/shared/section-header';
import { aboutContent, getTeamMemberId } from '@/lib/content';
import { aboutMissionVisionLayout, aboutTeamLayout, aboutWhyCodingLayout, aboutWhyNonprofitLayout } from '@/lib/layout';
import { getLayoutBoxStyle } from '@/lib/layout-utils';

export default function AboutPage() {
  const leadInstructor = aboutContent.team.instructors[0];
  const supportingInstructors = aboutContent.team.instructors.slice(1);
  const teacherAssistants = aboutContent.team.teacherAssistants;

  return (
    <main>
      <PageIntro
        description={aboutContent.pageIntro.description}
        eyebrow={aboutContent.pageIntro.eyebrow}
        title={aboutContent.pageIntro.title}
      />

      <section className="layout-shell" style={getLayoutBoxStyle(aboutMissionVisionLayout.section)}>
        <Container>
          <div className="layout-grid layout-grid-cols grid" style={getLayoutBoxStyle(aboutMissionVisionLayout.grid)}>
            {[aboutContent.mission, aboutContent.vision].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="layout-card-size premium-card interactive-card" style={getLayoutBoxStyle(aboutMissionVisionLayout.card)}>
                  <h2 className="font-mono text-3xl font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="layout-shell" style={getLayoutBoxStyle(aboutWhyCodingLayout.section)}>
        <Container>
          <div className="layout-grid layout-grid-cols grid" style={getLayoutBoxStyle(aboutWhyCodingLayout.grid)}>
            <Reveal>
              <article className="layout-card-size premium-card" style={getLayoutBoxStyle(aboutWhyCodingLayout.card)}>
                <SectionHeader
                  description={aboutContent.whyCoding.paragraphs[0] ?? ''}
                  eyebrow={aboutContent.pageIntro.eyebrow}
                  title={aboutContent.whyCoding.title}
                />
                <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                  {aboutContent.whyCoding.paragraphs.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="layout-card-size premium-card overflow-hidden" style={getLayoutBoxStyle(aboutWhyCodingLayout.card)}>
                <div className="layout-media relative overflow-hidden" style={getLayoutBoxStyle(aboutWhyCodingLayout.media)}>
                  <Image alt={aboutContent.storyImages[0]?.alt ?? ''} className="object-cover" fill sizes="40vw" src={aboutContent.storyImages[0]?.src ?? '/images/classroom.jpg'} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="layout-shell" style={getLayoutBoxStyle(aboutWhyNonprofitLayout.section)}>
        <Container>
          <div className="layout-grid layout-grid-cols grid" style={getLayoutBoxStyle(aboutWhyNonprofitLayout.grid)}>
            <Reveal>
              <div className="layout-card-size premium-card overflow-hidden" style={getLayoutBoxStyle(aboutWhyNonprofitLayout.card)}>
                <div className="layout-media relative overflow-hidden" style={getLayoutBoxStyle(aboutWhyNonprofitLayout.media)}>
                  <Image alt={aboutContent.storyImages[1]?.alt ?? ''} className="object-cover" fill sizes="40vw" src={aboutContent.storyImages[1]?.src ?? '/images/header.jpg'} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="layout-card-size premium-card" style={getLayoutBoxStyle(aboutWhyNonprofitLayout.card)}>
                <SectionHeader
                  description={aboutContent.whyNonprofit.paragraphs[0] ?? ''}
                  eyebrow={aboutContent.pageIntro.eyebrow}
                  title={aboutContent.whyNonprofit.title}
                />
                <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                  {aboutContent.whyNonprofit.paragraphs.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="layout-shell" style={getLayoutBoxStyle(aboutTeamLayout.section)}>
        <Container>
          <Reveal>
            <SectionHeader
              description={aboutContent.team.description}
              eyebrow={aboutContent.pageIntro.eyebrow}
              title={aboutContent.team.title}
            />
          </Reveal>
          <div className="mt-10 flex flex-col items-center">
            <Reveal>
              <article className="w-full max-w-md rounded-[1.75rem] border border-[#2563EB]/15 bg-white px-8 py-7 text-center shadow-[0_25px_55px_-40px_rgba(37,99,235,0.45)]">
                <h3 className="font-mono text-2xl font-semibold text-slate-950">Leadership</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">The co-founders lead program direction, curriculum development, and hands-on instruction for Free Code Juniors.</p>
              </article>
            </Reveal>

            <div className="mt-6 flex w-full max-w-5xl flex-col items-center">
              <div className="h-10 w-px bg-slate-300" />
              <div className="relative w-full">
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-300 md:block" />
                <div className="absolute left-1/2 top-0 hidden h-px w-[min(100%,38rem)] -translate-x-1/2 bg-slate-300 md:block" />
                <div className="grid w-full gap-6 pt-6 md:grid-cols-2" style={getLayoutBoxStyle(aboutTeamLayout.grid)}>
                  {aboutContent.team.members.map((member, index) => {
                    const memberId = getTeamMemberId(member.name);
                    const memberOffsetClassName = index === 0 ? 'md:-translate-x-[30px]' : 'md:translate-x-[30px]';
                    const branchOffsetClassName = index === 0 ? 'md:-translate-x-[30px]' : 'md:translate-x-[30px]';
                    const hasContact = Boolean(member.email || member.phone);

                    return (
                      <Reveal key={member.name} className="h-full" delay={index * 0.08}>
                        <div className="flex h-full flex-col items-center">
                          <div className={`hidden h-6 w-px bg-slate-300 md:block ${branchOffsetClassName}`} />
                          <article className={`layout-radius premium-card h-full w-full overflow-hidden ${memberOffsetClassName}`} style={getLayoutBoxStyle(aboutTeamLayout.card)}>
                            <div className="layout-card-size space-y-5" style={getLayoutBoxStyle(aboutTeamLayout.cardSecondary)}>
                              <div className="space-y-3">
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB]">{member.role}</p>
                                <h3 className="font-mono text-2xl font-semibold text-slate-950">{member.name}</h3>
                              </div>

                              <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-5">
                                <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB]" href={`/about/${memberId}`}>
                                  Read More
                                  <ArrowUpRight className="size-4" aria-hidden="true" />
                                </Link>
                              </div>

                              {hasContact ? (
                                <div className="grid gap-3 rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600">
                                  {member.email ? (
                                    <div className="flex items-center gap-3">
                                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                        <Mail className="size-4" aria-hidden="true" />
                                      </span>
                                      {member.email.includes('@') ? (
                                        <Link className="transition hover:text-[#2563EB]" href={`mailto:${member.email}`}>
                                          {member.email}
                                        </Link>
                                      ) : (
                                        <span>{member.email}</span>
                                      )}
                                    </div>
                                  ) : null}
                                  {member.phone ? (
                                    <div className="flex items-center gap-3">
                                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                        <Phone className="size-4" aria-hidden="true" />
                                      </span>
                                      {!member.phone.toLowerCase().includes('coming soon') ? (
                                        <Link className="transition hover:text-[#2563EB]" href={`tel:${member.phone}`}>
                                          {member.phone}
                                        </Link>
                                      ) : (
                                        <span>{member.phone}</span>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </article>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
              {leadInstructor ? (
                <>
                  <div className="h-8 w-px bg-slate-300" />
                  <Reveal delay={0.14}>
                    <article className="layout-radius premium-card w-full max-w-lg overflow-hidden" style={getLayoutBoxStyle(aboutTeamLayout.card)}>
                      <div className="layout-card-size space-y-5" style={getLayoutBoxStyle(aboutTeamLayout.cardSecondary)}>
                        <div className="space-y-3 text-center">
                          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB]">{leadInstructor.role}</p>
                          <h3 className="font-mono text-2xl font-semibold text-slate-950">{leadInstructor.name}</h3>
                        </div>

                        <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-5 text-center">
                          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB]" href={`/about/${getTeamMemberId(leadInstructor.name)}`}>
                            Read More
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </>
              ) : null}

              <div className="h-8 w-px bg-slate-300" />
              <Reveal>
                <article className="w-full max-w-md rounded-[1.75rem] border border-slate-200/80 bg-white px-8 py-7 text-center shadow-[0_25px_55px_-40px_rgba(15,23,42,0.35)]">
                  <h3 className="font-mono text-2xl font-semibold text-slate-950">Instructors</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Programs are delivered through hands-on instruction, mentorship, and a growing teaching team that supports every workshop.</p>
                </article>
              </Reveal>

              {supportingInstructors.length ? (
                <>
                  <div className="h-8 w-px bg-slate-300" />
                  <div className="relative w-full max-w-4xl">
                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-300 md:block" />
                    <div className="absolute left-1/2 top-0 hidden h-px w-[min(100%,28rem)] -translate-x-1/2 bg-slate-300 md:block" />
                    <div className="grid w-full gap-6 pt-6 md:grid-cols-2" style={getLayoutBoxStyle(aboutTeamLayout.grid)}>
                      {supportingInstructors.map((member, index) => {
                        const memberId = getTeamMemberId(member.name);
                        const hasContact = Boolean(member.email || member.phone);

                        return (
                          <Reveal key={member.name} className="h-full" delay={0.22 + index * 0.08}>
                            <div className="flex h-full flex-col items-center">
                              <div className="hidden h-6 w-px bg-slate-300 md:block" />
                              <article className="layout-radius premium-card h-full w-full overflow-hidden" style={getLayoutBoxStyle(aboutTeamLayout.card)}>
                                <div className="layout-card-size space-y-5" style={getLayoutBoxStyle(aboutTeamLayout.cardSecondary)}>
                                  <div className="space-y-3">
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB]">{member.role}</p>
                                    <h3 className="font-mono text-2xl font-semibold text-slate-950">{member.name}</h3>
                                  </div>

                                  <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-5">
                                    <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB]" href={`/about/${memberId}`}>
                                      Read More
                                      <ArrowUpRight className="size-4" aria-hidden="true" />
                                    </Link>
                                  </div>

                                  {hasContact ? (
                                    <div className="grid gap-3 rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600">
                                      {member.email ? (
                                        <div className="flex items-center gap-3">
                                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                            <Mail className="size-4" aria-hidden="true" />
                                          </span>
                                          {member.email.includes('@') ? (
                                            <Link className="transition hover:text-[#2563EB]" href={`mailto:${member.email}`}>
                                              {member.email}
                                            </Link>
                                          ) : (
                                            <span>{member.email}</span>
                                          )}
                                        </div>
                                      ) : null}
                                      {member.phone ? (
                                        <div className="flex items-center gap-3">
                                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                            <Phone className="size-4" aria-hidden="true" />
                                          </span>
                                          {!member.phone.toLowerCase().includes('coming soon') ? (
                                            <Link className="transition hover:text-[#2563EB]" href={`tel:${member.phone}`}>
                                              {member.phone}
                                            </Link>
                                          ) : (
                                            <span>{member.phone}</span>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  ) : null}
                                </div>
                              </article>
                            </div>
                          </Reveal>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}

              {teacherAssistants.length ? (
                <>
                  <div className="h-8 w-px bg-slate-300" />
                  <Reveal>
                    <article className="w-full max-w-md rounded-[1.75rem] border border-slate-200/80 bg-white px-8 py-7 text-center shadow-[0_25px_55px_-40px_rgba(15,23,42,0.35)]">
                      <h3 className="font-mono text-2xl font-semibold text-slate-950">Teacher Assistants</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">Teacher assistants support sessions, encourage younger learners, and help keep each class welcoming and organized.</p>
                    </article>
                  </Reveal>
                  <div className="h-8 w-px bg-slate-300" />
                  <div className="flex w-full justify-center">
                    {teacherAssistants.map((member, index) => {
                      const memberId = getTeamMemberId(member.name);
                      const hasContact = Boolean(member.email || member.phone);

                      return (
                        <Reveal key={member.name} className="h-full w-full max-w-lg" delay={0.3 + index * 0.08}>
                          <article className="layout-radius premium-card h-full w-full overflow-hidden" style={getLayoutBoxStyle(aboutTeamLayout.card)}>
                            <div className="layout-card-size space-y-5 text-center" style={getLayoutBoxStyle(aboutTeamLayout.cardSecondary)}>
                              <div className="space-y-3">
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB]">{member.role}</p>
                                <h3 className="font-mono text-2xl font-semibold text-slate-950">{member.name}</h3>
                              </div>

                              <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-5">
                                <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB]" href={`/about/${memberId}`}>
                                  Read More
                                  <ArrowUpRight className="size-4" aria-hidden="true" />
                                </Link>
                              </div>

                              {hasContact ? (
                                <div className="grid gap-3 rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 p-4 text-left text-sm text-slate-600">
                                  {member.email ? (
                                    <div className="flex items-center gap-3">
                                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                        <Mail className="size-4" aria-hidden="true" />
                                      </span>
                                      {member.email.includes('@') ? (
                                        <Link className="transition hover:text-[#2563EB]" href={`mailto:${member.email}`}>
                                          {member.email}
                                        </Link>
                                      ) : (
                                        <span>{member.email}</span>
                                      )}
                                    </div>
                                  ) : null}
                                  {member.phone ? (
                                    <div className="flex items-center gap-3">
                                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                                        <Phone className="size-4" aria-hidden="true" />
                                      </span>
                                      {!member.phone.toLowerCase().includes('coming soon') ? (
                                        <Link className="transition hover:text-[#2563EB]" href={`tel:${member.phone}`}>
                                          {member.phone}
                                        </Link>
                                      ) : (
                                        <span>{member.phone}</span>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </article>
                        </Reveal>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
