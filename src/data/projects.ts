import { Project } from '../types';
import {
  projectAviation,
  projectBusinessLanding,
  projectEditorPortfolio,
  projectMotionPortfolio,
} from '../assets';

export const PROJECTS: Project[] = [
  {
    id: 'aeris-aviation',
    title: 'Aeris Aviation',
    category: 'Luxury Aviation',
    shortDescription: '3D website concept for a luxury aviation brand',
    fullDescription: 'A bespoke digital experience designed for an elite private aviation firm. Engineered with dynamic fleet showcases, custom booking inquiry flows, and an understated luxury dark aesthetic that reflects high-end charter standards.',
    image: projectAviation,
    role: 'UI Design • Frontend • Motion',
    technologies: ['UI Design', 'Frontend', 'Motion'],
    deliverables: ['UI/UX Design', 'Interactive Showcase', 'Performance Optimization'],
    liveUrl: '#contact',
  },
  {
    id: 'revenue-systems',
    title: 'Revenue Systems',
    category: 'Business Website',
    shortDescription: 'Premium business website concept',
    fullDescription: 'A high-impact enterprise web platform designed to establish authoritative market presence and accelerate sales pipeline conversion. Features structured customer journeys, clear value propositions, and interactive product demonstrations.',
    image: projectBusinessLanding,
    role: 'Conversion Design • UI/UX • Architecture',
    technologies: ['UI/UX', 'Conversion Design', 'Architecture'],
    deliverables: ['Conversion Architecture', 'Responsive Layout', 'SEO Strategy'],
    liveUrl: '#contact',
  },
  {
    id: 'creator-portfolio',
    title: 'Creator Portfolio',
    category: 'Portfolio Website',
    shortDescription: 'Personal portfolio website with a modern Mac-inspired style',
    fullDescription: 'An editorial visual platform crafted for commercial creators and video editors. Features full-screen showreel previews, seamless media transitions, and a minimalist gallery structure with a modern Mac-inspired style.',
    image: projectEditorPortfolio,
    role: 'Art Direction • UI Design • Motion',
    technologies: ['Art Direction', 'UI Design', 'Motion'],
    deliverables: ['Art Direction', 'Custom Video Player', 'Editorial Layout'],
    liveUrl: '#contact',
  },
  {
    id: 'motion-designer-portfolio',
    title: 'Motion Designer Portfolio',
    category: 'Portfolio Website',
    shortDescription: 'Portfolio website concept for a video editor',
    fullDescription: 'An immersive agency portfolio showcasing interactive 3D elements, fluid kinetic typography, and smooth page transitions built for video editors and forward-thinking creative clients.',
    image: projectMotionPortfolio,
    role: 'Interactive 3D • UI Design • Motion',
    technologies: ['Interactive 3D', 'UI Design', 'Motion'],
    deliverables: ['3D WebGL Interactions', 'Kinetic Typography', 'Creative Direction'],
    liveUrl: '#contact',
  },
];

