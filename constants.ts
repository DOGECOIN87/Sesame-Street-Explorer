
import type { Scene } from './types';

export const SCENES: Scene[] = [
  { 
    id: 1, 
    imageUrl: 'https://i.imgur.com/uG9nU2H.jpeg', 
    alt: 'Cozy living room with a blue couch',
    hotspots: [
      {
        id: 'hs1-window',
        targetSceneId: 3,
        position: { top: '22%', left: '38%', width: '24%', height: '35%' },
        label: 'Look Outside'
      },
      {
        id: 'hs1-kitchen',
        targetSceneId: 2,
        position: { top: '20%', left: '15%', width: '15%', height: '60%' }, // Left side passage
        label: 'Go to Kitchen'
      }
    ]
  },
  { 
    id: 2, 
    imageUrl: 'https://i.imgur.com/g8L3b2J.jpeg', 
    alt: 'Quaint kitchen with wooden cabinets',
    hotspots: [
      {
        id: 'hs2-archway',
        targetSceneId: 11,
        position: { top: '25%', left: '72%', width: '20%', height: '55%' },
        label: 'Go to the Store'
      },
      {
        id: 'hs2-living',
        targetSceneId: 1,
        position: { top: '30%', left: '0%', width: '15%', height: '70%' }, // Back left
        label: 'Back to Living Room'
      }
    ]
  },
  { 
    id: 3, 
    imageUrl: 'https://i.imgur.com/4zYJ4X1.jpeg', 
    alt: 'City street with a brownstone building',
    hotspots: [
      {
        id: 'hs3-door',
        targetSceneId: 1,
        position: { top: '50%', left: '58%', width: '15%', height: '32%' },
        label: 'Enter Apartment'
      },
      {
         id: 'hs3-steps',
         targetSceneId: 6,
         position: { top: '65%', left: '45%', width: '40%', height: '20%' },
         label: 'Inspect Steps'
      },
      {
        id: 'hs3-store',
        targetSceneId: 11,
        position: { top: '50%', left: '85%', width: '15%', height: '40%' },
        label: 'Visit Corner Store'
      }
    ]
  },
  { 
    id: 4, 
    imageUrl: 'https://i.imgur.com/p8yK4Wj.jpeg', 
    alt: 'Food truck on a city street set',
    hotspots: [
        {
            id: 'hs4-street',
            targetSceneId: 3,
            position: { top: '40%', left: '0%', width: '20%', height: '60%' },
            label: 'Walk down street'
        }
    ]
  },
  { 
    id: 5, 
    imageUrl: 'https://i.imgur.com/0iI2S8J.png', 
    alt: 'Cartoon characters in a spooky castle',
    hotspots: [
        {
            id: 'hs5-exit',
            targetSceneId: 7, // To the alley
            position: { top: '30%', left: '35%', width: '30%', height: '70%' },
            label: 'Exit Castle'
        }
    ]
  },
  { 
    id: 6, 
    imageUrl: 'https://i.imgur.com/F0B2k7g.jpeg', 
    alt: 'Closeup of brownstone steps with flower pots',
    hotspots: [
      {
        id: 'hs6-door',
        targetSceneId: 1,
        position: { top: '15%', left: '46%', width: '32%', height: '60%' },
        label: 'Enter Apartment'
      },
      {
        id: 'hs6-street',
        targetSceneId: 3,
        position: { top: '80%', left: '0%', width: '100%', height: '20%' },
        label: 'Back to Street'
      }
    ]
  },
  { 
    id: 7, 
    imageUrl: 'https://i.imgur.com/r6b3k9E.jpeg', 
    alt: 'A large nest in a tree in a cozy alley',
    hotspots: [
      {
        id: 'hs7-garden',
        targetSceneId: 8,
        position: { top: '40%', left: '20%', width: '20%', height: '40%' },
        label: 'Climb Up'
      }
    ]
  },
  { id: 8, imageUrl: 'https://i.imgur.com/b9i6L8k.jpeg', alt: 'Urban garden on a rooftop patio with colorful flowers' },
  { id: 9, imageUrl: 'https://i.imgur.com/v8tA7t1.jpeg', alt: 'Garden path with sunflowers and a compost bin' },
  { id: 10, imageUrl: 'https://i.imgur.com/X4y1L8k.jpeg', alt: 'A colorful playroom seen through an archway' },
  { 
    id: 11, 
    imageUrl: 'https://i.imgur.com/0uB3H8k.jpeg', 
    alt: 'Exterior of a charming corner store cafe',
    hotspots: [
      {
        id: 'hs11-inside',
        targetSceneId: 2, // reusing kitchen as "inside store" for demo
        position: { top: '48%', left: '38%', width: '15%', height: '40%' },
        label: 'Enter Shop'
      },
      {
        id: 'hs11-street',
        targetSceneId: 3,
        position: { top: '50%', left: '0%', width: '20%', height: '50%' },
        label: 'Walk to Apartments'
      }
    ]
  },
  { 
    id: 12, 
    imageUrl: 'https://i.imgur.com/P1i1Y9j.jpeg', 
    alt: 'Front view of a laundromat with colorful lettering',
    hotspots: [
        {
            id: 'hs12-enter',
            targetSceneId: 3, // Generic street
            position: { top: '30%', left: '40%', width: '20%', height: '60%' },
            label: 'Leave Laundromat'
        }
    ]
   },
  { id: 13, imageUrl: 'https://i.imgur.com/P6Y7e9f.jpeg', alt: 'A vintage-style bicycle shop on a brick street' },
  { id: 14, imageUrl: 'https://i.imgur.com/d2s4t7j.jpeg', alt: 'Subway entrance next to a newsstand' },
];
