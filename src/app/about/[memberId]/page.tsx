import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';

import { Container } from '@/components/shared/container';
import { PageIntro } from '@/components/shared/page-intro';
import { Reveal } from '@/components/shared/reveal';
import { aboutContent, getTeamMemberById, getTeamMemberId, siteContent, teamMembers } from '@/lib/content';

interface AboutMemberPageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({ memberId: getTeamMemberId(member.name) }));
}

export async function generateMetadata({ params }: AboutMemberPageProps): Promise<Metadata> {
  const { memberId } = await params;
  const member = getTeamMemberById(memberId);

  if (!member) {
    return {
      title: siteContent.title,
    };
  }

  return {
    title: `${member.name} | ${siteContent.name}`,
    description: member.profileRole,
  };
}

export default async function AboutMemberPage({ params }: AboutMemberPageProps) {
  const { memberId } = await params;
  const member = getTeamMemberById(memberId);

  if (!member) {
    notFound();
  }

  return (
    <main>
      <PageIntro description={member.profileRole} eyebrow={aboutContent.pageIntro.eyebrow} title={member.name} />

      <section className="layout-shell">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB]" href="/about">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to About
              </Link>
              <p className="text-sm text-slate-500">{member.role}</p>
            </div>
          </Reveal>

          <Reveal>
            <article className="layout-radius premium-card overflow-hidden lg:grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
                {member.image ? (
                  <Image alt={member.name} className="object-cover" fill sizes="(max-width: 1280px) 100vw, 45vw" src={member.image} style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined} />
                ) : (
                  <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">Photo coming soon</div>
                )}
              </div>

              <div className="layout-card-size flex h-full flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB]">{member.profileRole}</p>
                  <h2 className="font-mono text-2xl font-semibold text-slate-950">{member.name}</h2>
                </div>

                <div className="space-y-4 text-sm leading-7 text-slate-600">
                  {member.bio.split('\n\n').map((paragraph) => (
                    <p key={`${member.name}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
                  ))}
                </div>

                {member.email || member.phone ? (
                  <div className="mt-auto grid gap-3 rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600">
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
        </Container>
      </section>
    </main>
  );
}
