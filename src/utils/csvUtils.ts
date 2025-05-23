
import { Rule } from '@/types/rules';

export const parseRulesCSV = (csvData: string): Rule[] => {
  const lines = csvData.trim().split('\n');
  
  // Skip header row
  if (lines.length <= 1) return [];
  
  const rules: Rule[] = [];
  
  // Start from index 1 to skip header
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    
    if (parts.length >= 4) {
      // CSV format: id,name,description,isActive (true/false)
      rules.push({
        id: parts[0],
        name: parts[1],
        description: parts[2],
        isActive: parts[3].toLowerCase() === 'true'
      });
    }
  }
  
  return rules;
};

export const convertRulesToCSV = (rules: Rule[]): string => {
  // Create header
  let csvContent = 'id,name,description,isActive\n';
  
  // Add each rule as a row
  rules.forEach(rule => {
    const escapedName = rule.name.includes(',') ? `"${rule.name}"` : rule.name;
    const escapedDesc = rule.description.includes(',') ? `"${rule.description}"` : rule.description;
    
    csvContent += `${rule.id},${escapedName},${escapedDesc},${rule.isActive}\n`;
  });
  
  return csvContent;
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create download link
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Append to document, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const readCSVFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};
