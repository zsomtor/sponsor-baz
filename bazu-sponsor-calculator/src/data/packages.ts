import type { Package } from '../types';

// Average reach metrics
const PODCAST_VIEWS_PER_EPISODE = 50000;
const INSTAGRAM_STORY_VIEWS = 100000;
const TIKTOK_VIEWS = 300000;
const YOUTUBE_MENTION_VIEWS = 50000; // Estimated

export const basePackages: Package[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 470000,
    description: 'Ideális kezdésnek - podcast jelenlét exkluzivitással',
    totalReach: PODCAST_VIEWS_PER_EPISODE * 2,
    features: [
      {
        id: 'podcast-bronze',
        name: '2 podcast epizód',
        description: '2 epizódban való megjelenés havonta',
        price: 250000,
        reach: PODCAST_VIEWS_PER_EPISODE * 2,
        included: true,
      },
      {
        id: 'sponsor-slot-bronze',
        name: '30-60s szponzor szlogen',
        description: 'Dedikált szponzori üzenet az epizódban',
        price: 120000,
        included: true,
      },
      {
        id: 'description-link-bronze',
        name: 'Link a leírásban',
        description: 'Kattintható link minden epizód leírásában',
        price: 50000,
        included: true,
      },
      {
        id: 'exclusivity-bronze',
        name: 'Kategória exkluzivitás',
        description: 'Egyedüli szponzor a kategóriádban',
        price: 50000,
        included: true,
      },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 790000,
    description: 'Teljes havi lefedettség minden epizódban',
    totalReach: PODCAST_VIEWS_PER_EPISODE * 4,
    features: [
      {
        id: 'podcast-silver',
        name: '4 podcast epizód',
        description: 'Jelenlét minden havi epizódban',
        price: 450000,
        reach: PODCAST_VIEWS_PER_EPISODE * 4,
        included: true,
      },
      {
        id: 'sponsor-slot-silver',
        name: '30-60s szponzor szlogen',
        description: 'Dedikált szponzori üzenet minden epizódban',
        price: 180000,
        included: true,
      },
      {
        id: 'description-link-silver',
        name: 'Link a leírásban',
        description: 'Kattintható link minden epizód leírásában',
        price: 80000,
        included: true,
      },
      {
        id: 'exclusivity-silver',
        name: 'Kategória exkluzivitás',
        description: 'Egyedüli szponzor a kategóriádban',
        price: 80000,
        included: true,
      },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 940000,
    description: 'Prémium csomag - podcast + social media kombinált elérés',
    totalReach: PODCAST_VIEWS_PER_EPISODE * 4 + INSTAGRAM_STORY_VIEWS,
    recommended: true,
    features: [
      {
        id: 'podcast-gold',
        name: '4 podcast epizód',
        description: 'Jelenlét minden havi epizódban',
        price: 400000,
        reach: PODCAST_VIEWS_PER_EPISODE * 4,
        included: true,
      },
      {
        id: 'sponsor-slot-gold',
        name: '30-60s szponzor szlogen',
        description: 'Dedikált szponzori üzenet minden epizódban',
        price: 150000,
        included: true,
      },
      {
        id: 'endroll-slot-gold',
        name: 'End-roll szponzor slot',
        description: 'Külön szponzori említés az epizód végén',
        price: 120000,
        included: true,
      },
      {
        id: 'instagram-story-gold',
        name: 'Havi Instagram Story',
        description: 'Dedikált story havonta a főoldalon',
        price: 150000,
        reach: INSTAGRAM_STORY_VIEWS,
        included: true,
      },
      {
        id: 'description-link-gold',
        name: 'Link a leírásban',
        description: 'Kattintható link minden epizód leírásában',
        price: 70000,
        included: true,
      },
      {
        id: 'exclusivity-gold',
        name: 'Kategória exkluzivitás',
        description: 'Egyedüli szponzor a kategóriádban',
        price: 50000,
        included: true,
      },
    ],
  },
];

// Additional features for custom packages
export const additionalFeatures = [
  {
    id: 'tiktok-integration',
    name: 'TikTok integrálás',
    description: 'Dedikált TikTok tartalom a márkáddal',
    price: 250000,
    reach: TIKTOK_VIEWS,
    included: false,
  },
  {
    id: 'youtube-mention',
    name: 'YouTube említés',
    description: 'Külön említés YouTube videókban',
    price: 180000,
    reach: YOUTUBE_MENTION_VIEWS,
    included: false,
  },
  {
    id: 'instagram-posts',
    name: '2 Instagram poszt',
    description: 'Dedikált Instagram posztok havonta',
    price: 200000,
    reach: INSTAGRAM_STORY_VIEWS * 0.8,
    included: false,
  },
  {
    id: 'newsletter-feature',
    name: 'Newsletter megjelenés',
    description: 'Kiemelés a hírlevélben',
    price: 80000,
    included: false,
  },
  {
    id: 'event-presence',
    name: 'Esemény szponzorálás',
    description: 'Jelenlét Bazu live eseményeken',
    price: 300000,
    included: false,
  },
];

// Function to recommend package based on budget
export const recommendPackage = (budget: number): string => {
  if (budget < 600000) return 'bronze';
  if (budget < 850000) return 'silver';
  return 'gold';
};

// Function to calculate cost per view
export const calculateCPV = (price: number, reach: number): number => {
  return reach > 0 ? price / reach : 0;
};
