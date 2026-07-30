/**
 * ponytail: assert lifecycle fetch + year span formatting.
 * Run: npx tsx src/lib/github_repo_lifecycle.check.ts
 */
import {
  fetchRepoLifecycles,
  formatLifecycle,
  parseGithubUrl,
} from './github_repo_lifecycle.ts';

const ref = parseGithubUrl('https://github.com/Nigh/CYKSM');
console.assert(ref?.owner === 'Nigh' && ref?.name === 'CYKSM', 'parse');

const map = await fetchRepoLifecycles(['https://github.com/Nigh/CYKSM']);
const life = map.get('https://github.com/Nigh/CYKSM');
console.assert(life?.created instanceof Date, 'created');
console.assert(life?.updated instanceof Date, 'updated');
console.assert(life!.updated >= life!.created, 'order');
const span = formatLifecycle(life);
console.assert(/^\d{4}(–\d{4})?$/.test(span), `span ${span}`);
console.log('ok', span);
