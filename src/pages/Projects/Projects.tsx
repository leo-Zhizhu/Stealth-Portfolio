import { useParams, Navigate } from 'react-router-dom';
import { SunlightCity } from './SunlightCity/SunlightCity';
import { NebulaFlow } from './NebulaFlow/NebulaFlow';
import { QuantumVision } from './QuantumVision/QuantumVision';

// This component acts as a router/loader for different project pages
// Each project has its own completely unique component and folder
export function Projects() {
  const { projectId } = useParams<{ projectId: string }>();

  // Map of project IDs to their respective components
  const projectMap: Record<string, JSX.Element> = {
    'sunlightcity': <SunlightCity />,
    'nebulaflow': <NebulaFlow />,
    'quantum-vision': <QuantumVision />
  };

  if (!projectId) {
    // If no ID is provided, we redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  const ProjectComponent = projectMap[projectId.toLowerCase()];

  if (!ProjectComponent) {
    // If project not found, fallback to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return ProjectComponent;
}
