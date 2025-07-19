// Simple test to check if French translations exist
import fs from 'fs';

const frLocale = JSON.parse(fs.readFileSync('locales/fr.json', 'utf8'));
const enLocale = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

// Test the specific keys mentioned in the errors
const testKeys = [
  'education.gpaValue',
  'education.degrees.masters.description',
  'education.degrees.bachelors.degree',
  'education.degrees.bachelors.school',
  'education.degrees.bachelors.location',
  'education.degrees.bachelors.period',
  'education.degrees.bachelors.description',
  'education.commitment.title',
  'education.commitment.description',
  'skills.title',
  'skills.subtitle',
  'skills.showMore',
  'skills.showLess',
  'skills.coreTitle',
  'skills.additionalTitle',
  'skills.hiddenCategoriesMessage',
  'skills.callToAction.title',
  'skills.callToAction.description',
  'contact.title',
  'contact.subtitle',
  'contact.socials.email.title',
  'contact.socials.email.description',
  'contact.socials.github.title',
  'contact.socials.github.description',
  'contact.socials.linkedin.title',
  'contact.socials.linkedin.description',
  'contact.clickToOpen',
  'contact.openToOpportunities',
  'contact.basedIn',
  'contact.availableForRemote',
  'hero.availableDescription',
  'hero.location'
];

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}

console.log('Testing French translations:');
testKeys.forEach(key => {
  const frValue = getNestedValue(frLocale, key);
  const enValue = getNestedValue(enLocale, key);
  
  if (!frValue) {
    console.log(`❌ Missing in FR: ${key}`);
  } else {
    console.log(`✅ Found in FR: ${key} = "${frValue}"`);
  }
});