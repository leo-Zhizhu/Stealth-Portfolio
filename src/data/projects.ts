export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  backgroundMap: string;
  color: string;
  path: string;
}

export const projects: Project[] = [
  {
    id: 'sunlightcity',
    title: 'Sunlight City',
    subtitle: 'Large scale dynamic simulation & data processing pipeline',
    description: 'A cutting-edge urban simulation platform designed to optimize energy consumption and traffic flow in modern smart cities.',
    tags: ['PostgreSQL', 'Python', 'Unity', 'C#', 'Data Pipeline'],
    image: '/assets/projects/sunlightcity1.jpg',
    backgroundMap: '/assets/maps/new_york_contrast.svg',
    color: '#FF6B6B',
    path: '/projects/sunlightcity'
  },
  // Add more projects here as needed
  {
    id: 'nebulaflow',
    title: 'Nebula Flow',
    subtitle: 'Distributed stream processing engine',
    description: 'High-throughput, low-latency data processing engine for real-time analytics at scale.',
    tags: ['Go', 'Kubernetes', 'gRPC', 'Redis'],
    image: '/assets/projects/nebulaflow.png',
    backgroundMap: '/assets/maps/new_york.svg',
    color: '#4ECDC4',
    path: '/projects/nebulaflow'
  },
  {
    id: 'quantum-vision',
    title: 'Quantum Vision',
    subtitle: 'AI-powered medical imaging diagnostics',
    description: 'Deep learning models for early detection of neurological conditions through advanced MRI analysis.',
    tags: ['PyTorch', 'React', 'TypeScript', 'AWS'],
    image: '/assets/projects/quantumvision.png',
    backgroundMap: '/assets/maps/new_york_contrast.svg',
    color: '#45B7D1',
    path: '/projects/quantumvision'
  }
];
