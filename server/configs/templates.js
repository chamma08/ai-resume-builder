export const TEMPLATE_CONFIG = {
  classic: {
    id: 'classic',
    name: 'Classic',
    tier: 'FREE',
    icon: '📄',
    unlockCost: 0,
    downloadCost: 50,
    description: 'Clean, traditional layout with professional typography',
    features: ['Basic formatting', 'Standard export', 'ATS-friendly'],
  },
  minimal: {
    id: 'minimal',
    name: 'Minimalist',
    tier: 'FREE',
    icon: '⚪',
    unlockCost: 0,
    downloadCost: 10,
    description: 'Very clean layout with plenty of white space',
    features: ['Minimal design', 'Easy to read', 'Quick setup'],
    preview: '/assets/templates/minimal-preview.png',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    tier: 'PREMIUM',
    icon: '✨',
    unlockCost: 100,
    downloadCost: 25,
    description: 'Sleek design with contemporary fonts',
    features: ['Modern design', 'Color accents', 'Professional look'],
    preview: '/assets/templates/modern-preview.png',
    locked: true,
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant',
    tier: 'PREMIUM',
    icon: '💎',
    unlockCost: 100,
    downloadCost: 25,
    description: 'Sophisticated design with refined typography',
    features: ['Elegant styling', 'Premium fonts', 'Executive look'],
    preview: '/assets/templates/elegant-preview.png',
    locked: true,
  },
  'minimal-image': {
    id: 'minimal-image',
    name: 'Minimalist Image',
    tier: 'PREMIUM',
    icon: '🖼️',
    unlockCost: 100,
    downloadCost: 25,
    description: 'Minimal design with profile image',
    features: ['Photo support', 'Clean layout', 'Modern style'],
    preview: '/assets/templates/minimal-image-preview.png',
    locked: true,
  },
  ats: {
    id: 'ats',
    name: 'Professional Pro',
    tier: 'ELITE',
    icon: '🎯',
    unlockCost: 200,
    downloadCost: 50,
    description: 'ATS-optimized format',
    features: ['ATS-optimized', 'Keyword optimized', 'Scan-friendly'],
    preview: '/assets/templates/ats-preview.png',
    locked: true,
    badge: 'ATS+',
  },
  'ats-image': {
    id: 'ats-image',
    name: 'Executive Profile',
    tier: 'ELITE',
    icon: '👔',
    unlockCost: 200,
    downloadCost: 50,
    description: 'Professional photo layout with ATS compatibility',
    features: ['ATS + Photo', 'Executive style', 'Best of both'],
    preview: '/assets/templates/ats-image-preview.png',
    locked: true,
    badge: 'ATS+',
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate',
    tier: 'ELITE',
    icon: '🏢',
    unlockCost: 200,
    downloadCost: 50,
    description: 'Professional corporate styling',
    features: ['Corporate design', 'Premium layout', 'Executive ready'],
    preview: '/assets/templates/corporate-preview.png',
    locked: true,
    badge: 'NEW',
  },
};

// Helper functions
export const getTemplateConfig = (templateId) => {
  return TEMPLATE_CONFIG[templateId] || TEMPLATE_CONFIG.classic;
};

export const isTemplateFree = (templateId) => {
  const config = getTemplateConfig(templateId);
  return config.tier === 'FREE';
};

export const getTemplatesByTier = (tier) => {
  return Object.values(TEMPLATE_CONFIG).filter(t => t.tier === tier);
};

export const getAllTemplates = () => {
  return Object.values(TEMPLATE_CONFIG);
};