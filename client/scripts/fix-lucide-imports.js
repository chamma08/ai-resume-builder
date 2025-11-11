import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to update based on grep results
const filesToUpdate = [
  'src/pages/ActivityHistory.jsx',
  'src/pages/SignUp.jsx',
  'src/pages/SignIn.jsx',
  'src/pages/ResumeBuilder.jsx',
  'src/pages/ResetPassword.jsx',
  'src/pages/ReferralPage.jsx',
  'src/pages/PointsDashboard.jsx',
  'src/pages/Leaderboard.jsx',
  'src/pages/Home.jsx',
  'src/pages/ForgotPassword.jsx',
  'src/pages/Dashboard.jsx',
  'src/components/templates/ModernTemplate.jsx',
  'src/components/templates/MinimalImageTemplate.jsx',
  'src/components/templates/ClassicTemplate.jsx',
  'src/components/templates/ATSTemplate.jsx',
  'src/components/templates/ATSImageTemplate.jsx',
  'src/components/ResumeBuilderSections/TemplateSelector.jsx',
  'src/components/ResumeBuilderSections/Skills.jsx',
  'src/components/ResumeBuilderSections/Project.jsx',
  'src/components/ResumeBuilderSections/ProfessionalSummary.jsx',
  'src/components/ResumeBuilderSections/PersonalInfo.jsx',
  'src/components/ResumeBuilderSections/Experience.jsx',
  'src/components/ResumeBuilderSections/Education.jsx',
  'src/components/ResumeBuilderSections/ColorPicker.jsx',
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Match import statements from lucide-react
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
    
    const matches = content.match(importRegex);
    if (!matches) {
      console.log(`✓ ${filePath} - No lucide-react imports found`);
      return;
    }
    
    // Replace with import from utils/icons
    content = content.replace(importRegex, (match, icons) => {
      return `import {${icons}} from '../utils/icons'`;
    });
    
    // Fix the relative path based on file location
    const depth = filePath.split('/').length - 2;
    const correctPath = '../'.repeat(depth) + 'utils/icons';
    
    content = content.replace(/from ['"]\.\.\/utils\/icons['"]/g, `from '${correctPath}'`);
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✓ ${filePath} - Updated successfully`);
    } else {
      console.log(`✓ ${filePath} - No changes needed`);
    }
  } catch (error) {
    console.error(`✗ ${filePath} - Error: ${error.message}`);
  }
}

console.log('Starting lucide-react import fix...\n');
filesToUpdate.forEach(updateFile);
console.log('\nAll files processed!');
