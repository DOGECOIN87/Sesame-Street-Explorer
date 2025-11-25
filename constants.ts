
import type { Scene } from './types';

export const SCENES: Scene[] = [
  // 123 Sesame Street - Main Building (Starting Point)
  { 
    id: 1, 
    imageUrl: './assets/scenes/123-sesame-street.jpg', 
    alt: 'The iconic 123 Sesame Street building with its famous red doors and windows',
    hotspots: [
      {
        id: 'hs1-elmos-kitchen',
        targetSceneId: 2,
        position: { top: '40%', left: '25%', width: '20%', height: '40%' },
        label: "Visit Elmo's Kitchen"
      },
      {
        id: 'hs1-street',
        targetSceneId: 3,
        position: { top: '65%', left: '0%', width: '100%', height: '35%' },
        label: 'Explore the Street'
      },
      {
        id: 'hs1-hoopers',
        targetSceneId: 4,
        position: { top: '50%', left: '70%', width: '15%', height: '30%' },
        label: "Go to Hooper's Store"
      }
    ]
  },
  
  // Elmo's Kitchen (Inside View 1)
  { 
    id: 2, 
    imageUrl: './assets/scenes/elmos-kitchen-1.jpg', 
    alt: "Elmo's colorful kitchen with red appliances and cheerful atmosphere",
    hotspots: [
      {
        id: 'hs2-street',
        targetSceneId: 3,
        position: { top: '30%', left: '0%', width: '15%', height: '70%' },
        label: 'Back to Street'
      },
      {
        id: 'hs2-kitchen-2',
        targetSceneId: 8,
        position: { top: '25%', left: '75%', width: '20%', height: '60%' },
        label: 'View Kitchen Area'
      },
      {
        id: 'hs2-kitchen-3',
        targetSceneId: 9,
        position: { top: '50%', left: '45%', width: '15%', height: '35%' },
        label: 'Check Pantry'
      }
    ]
  },
  
  // Sesame Street View (Central Hub)
  { 
    id: 3, 
    imageUrl: './assets/scenes/123-sesame-street.jpg', 
    alt: 'View of Sesame Street with various iconic locations',
    hotspots: [
      {
        id: 'hs3-123-building',
        targetSceneId: 1,
        position: { top: '45%', left: '15%', width: '25%', height: '45%' },
        label: 'Enter 123 Sesame Street'
      },
      {
        id: 'hs3-hoopers',
        targetSceneId: 4,
        position: { top: '40%', left: '65%', width: '25%', height: '50%' },
        label: "Visit Hooper's Store"
      },
      {
        id: 'hs3-newsstand',
        targetSceneId: 5,
        position: { top: '55%', left: '45%', width: '15%', height: '35%' },
        label: 'Go to Newsstand'
      },
      {
        id: 'hs3-laundromat',
        targetSceneId: 6,
        position: { top: '50%', left: '85%', width: '15%', height: '40%' },
        label: 'Visit Laundromat'
      },
      {
        id: 'hs3-bikeshop',
        targetSceneId: 7,
        position: { top: '60%', left: '5%', width: '20%', height: '35%' },
        label: 'Check Bike Shop'
      }
    ]
  },
  
  // Hooper's Store
  { 
    id: 4, 
    imageUrl: './assets/scenes/hoopers-store.jpg', 
    alt: "Hooper's Store with its distinctive storefront and colorful awning",
    hotspots: [
      {
        id: 'hs4-street',
        targetSceneId: 3,
        position: { top: '50%', left: '0%', width: '20%', height: '50%' },
        label: 'Back to Street'
      },
      {
        id: 'hs4-newsstand',
        targetSceneId: 5,
        position: { top: '45%', left: '75%', width: '20%', height: '45%' },
        label: 'Walk to Newsstand'
      },
      {
        id: 'hs4-elmo',
        targetSceneId: 2,
        position: { top: '30%', left: '25%', width: '25%', height: '60%' },
        label: "Visit Elmo's Kitchen"
      }
    ]
  },
  
  // Newsstand
  { 
    id: 5, 
    imageUrl: './assets/scenes/newsstand.jpg', 
    alt: 'Colorful Sesame Street newsstand with newspapers and magazines',
    hotspots: [
      {
        id: 'hs5-street',
        targetSceneId: 3,
        position: { top: '60%', left: '0%', width: '30%', height: '40%' },
        label: 'Back to Street'
      },
      {
        id: 'hs5-hoopers',
        targetSceneId: 4,
        position: { top: '40%', left: '65%', width: '30%', height: '50%' },
        label: "Walk to Hooper's"
      },
      {
        id: 'hs5-laundromat',
        targetSceneId: 6,
        position: { top: '50%', left: '85%', width: '15%', height: '40%' },
        label: 'Visit Laundromat'
      }
    ]
  },
  
  // Laundromat
  { 
    id: 6, 
    imageUrl: './assets/scenes/laundromat.jpg', 
    alt: 'Sesame Street laundromat with washing machines and cheerful atmosphere',
    hotspots: [
      {
        id: 'hs6-street',
        targetSceneId: 3,
        position: { top: '35%', left: '35%', width: '25%', height: '60%' },
        label: 'Back to Street'
      },
      {
        id: 'hs6-newsstand',
        targetSceneId: 5,
        position: { top: '40%', left: '0%', width: '20%', height: '50%' },
        label: 'Visit Newsstand'
      },
      {
        id: 'hs6-bikeshop',
        targetSceneId: 7,
        position: { top: '45%', left: '75%', width: '20%', height: '45%' },
        label: 'Check Bike Shop'
      }
    ]
  },
  
  // Bike Shop
  { 
    id: 7, 
    imageUrl: './assets/scenes/bike-shop.jpg', 
    alt: 'Sesame Street bike shop with colorful bicycles and friendly atmosphere',
    hotspots: [
      {
        id: 'hs7-street',
        targetSceneId: 3,
        position: { top: '50%', left: '70%', width: '25%', height: '45%' },
        label: 'Back to Street'
      },
      {
        id: 'hs7-laundromat',
        targetSceneId: 6,
        position: { top: '45%', left: '40%', width: '20%', height: '45%' },
        label: 'Visit Laundromat'
      },
      {
        id: 'hs7-hoopers',
        targetSceneId: 4,
        position: { top: '40%', left: '0%', width: '20%', height: '50%' },
        label: "Walk to Hooper's"
      }
    ]
  },
  
  // Elmo's Kitchen (Inside View 2)
  { 
    id: 8, 
    imageUrl: './assets/scenes/elmos-kitchen-2.jpg', 
    alt: "Another view of Elmo's Kitchen showing cooking area and cheerful details",
    hotspots: [
      {
        id: 'hs8-street',
        targetSceneId: 3,
        position: { top: '35%', left: '0%', width: '15%', height: '65%' },
        label: 'Back to Street'
      },
      {
        id: 'hs8-kitchen-1',
        targetSceneId: 2,
        position: { top: '50%', left: '25%', width: '20%', height: '40%' },
        label: 'Return to Main Kitchen'
      },
      {
        id: 'hs8-kitchen-3',
        targetSceneId: 9,
        position: { top: '25%', left: '75%', width: '20%', height: '60%' },
        label: 'Explore Pantry'
      }
    ]
  },
  
  // Elmo's Kitchen (Inside View 3)
  { 
    id: 9, 
    imageUrl: './assets/scenes/elmos-kitchen-3.jpg', 
    alt: "Elmo's Kitchen pantry and storage area with colorful organization",
    hotspots: [
      {
        id: 'hs9-street',
        targetSceneId: 3,
        position: { top: '40%', left: '0%', width: '15%', height: '60%' },
        label: 'Back to Street'
      },
      {
        id: 'hs9-kitchen-1',
        targetSceneId: 2,
        position: { top: '45%', left: '25%', width: '20%', height: '45%' },
        label: 'Return to Main Kitchen'
      },
      {
        id: 'hs9-kitchen-2',
        targetSceneId: 8,
        position: { top: '30%', left: '75%', width: '20%', height: '55%' },
        label: 'Visit Cooking Area'
      }
    ]
  }
];
