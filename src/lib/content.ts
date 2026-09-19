import aboutData from 'content/about.json';
import footerData from 'content/footer.json';
import galleryData from 'content/gallery.json';
import heroData from 'content/hero.json';
import navigationData from 'content/navigation.json';
import programsData from 'content/programs.json';
import scheduleData from 'content/schedule.json';
import siteData from 'content/site.json';
import testimonialsData from 'content/testimonials.json';

import {
  aboutSchema,
  footerSchema,
  gallerySchema,
  heroSchema,
  navigationSchema,
  programsSchema,
  scheduleSchema,
  siteSchema,
  testimonialsSchema,
} from '@/lib/content-schemas';
import type { AllContent } from '@/types/content';

export const siteContent = siteSchema.parse(siteData);
export const heroContent = heroSchema.parse(heroData);
export const aboutContent = aboutSchema.parse(aboutData);
export const programsContent = programsSchema.parse(programsData);
export const scheduleContent = scheduleSchema.parse(scheduleData);
export const galleryContent = gallerySchema.parse(galleryData);
export const testimonialsContent = testimonialsSchema.parse(testimonialsData);
export const navigationContent = navigationSchema.parse(navigationData);
export const footerContent = footerSchema.parse(footerData);

export const allContent: AllContent = {
  site: siteContent,
  hero: heroContent,
  about: aboutContent,
  programs: programsContent,
  schedule: scheduleContent,
  gallery: galleryContent,
  testimonials: testimonialsContent,
  navigation: navigationContent,
  footer: footerContent,
};

export const getTeamMemberId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const teamMembers = [...aboutContent.team.members, ...aboutContent.team.instructors, ...aboutContent.team.teacherAssistants];

export const getTeamMemberById = (memberId: string) =>
  teamMembers.find((member) => getTeamMemberId(member.name) === memberId);

export const getGalleryEventById = (eventId: string) =>
  galleryContent.events.find((event) => event.id === eventId);
