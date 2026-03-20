// src/data/experimentsData.js

export const EXPERIMENTS_DATA = [
  {
    id: 1,
    title: 'Emergence',
    description: 'Six interactive simulations exploring emergence — the phenomenon by which higher-order properties arise irreducibly from local interactions. From boid flocking to vascular trees governed by Murray\'s Law, each visualization demonstrates how complex structure crystallizes from simple rules.',
    thumbnail: '/images/experiments/emergence-preview.png',
    sandboxUrl: '/emergence.html',
    technologies: 'Canvas API, JavaScript',
  },
  {
    id: 2,
    title: 'Constitutive Topology',
    description: 'An interactive 3D visualization mapping agentic relations across six domains — Political, Biological, Computational, Musical, Economic, and Linguistic — onto a toroidal manifold. Explore constitutive hierarchies, cross-domain coupling strengths, and how AI insertion at the operational-computational node radiates consequence across the entire topology.',
    thumbnail: '/images/experiments/topology-preview.png',
    sandboxUrl: '/constitutive-topology.html',
    technologies: 'Three.js, WebGL',
  },
];
