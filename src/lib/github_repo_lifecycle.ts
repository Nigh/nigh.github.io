/** Build-time GitHub repo lifecycle (created + latest default-branch commit). */

export type RepoRef = { owner: string; name: string };
export type RepoLifecycle = { created: Date; updated: Date };

const GITHUB_URL = /^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i;

export function parseGithubUrl(url: string): RepoRef | null {
  const m = url.match(GITHUB_URL);
  if (!m) return null;
  return { owner: m[1], name: m[2].replace(/\.git$/, '') };
}

function yearSpan(created: Date, updated: Date): string {
  const a = created.getUTCFullYear();
  const b = updated.getUTCFullYear();
  return a === b ? String(a) : `${a}–${b}`;
}

export function formatLifecycle(life: RepoLifecycle | undefined): string {
  if (!life) return '';
  return yearSpan(life.created, life.updated);
}

type GqlRepo = {
  createdAt: string;
  defaultBranchRef: { target: { committedDate: string } | null } | null;
};

const store = new Map<string, RepoLifecycle>();
let disabled = false; // set on rate-limit / network failure for this process

/** Batch-fetch createdAt + tip commit date. Keyed by original github URL. Cached across calls. */
export async function fetchRepoLifecycles(urls: string[]): Promise<Map<string, RepoLifecycle>> {
  if (disabled) return store;
  const unique = [...new Set(urls.filter(Boolean))];
  const missing = unique.filter((u) => !store.has(u));
  if (missing.length === 0) return store;

  const refs = missing.map((url) => ({ url, ref: parseGithubUrl(url) }));
  const valid = refs.filter((r): r is { url: string; ref: RepoRef } => r.ref !== null);

  if (valid.length === 0) return store;

  const parts = valid.map((r, i) => {
    const { owner, name } = r.ref;
    return `r${i}: repository(owner: "${owner}", name: "${name}") {
      createdAt
      defaultBranchRef { target { ... on Commit { committedDate } } }
    }`;
  });
  const query = `query { ${parts.join('\n')} }`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  // ponytail: soft-fail on rate limit / network — lifecycle years are optional UI.
  // Ceiling: unauth GraphQL is tiny; set GITHUB_TOKEN (or GH_TOKEN) for CI/local.
  let json: {
    data?: Record<string, GqlRepo | null>;
    errors?: { message: string }[];
  };
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    });
    if (!res.ok) {
      disabled = true;
      console.warn(`[github_repo_lifecycle] GraphQL ${res.status}: ${await res.text()}`);
      return store;
    }
    json = (await res.json()) as typeof json;
  } catch (err) {
    disabled = true;
    console.warn('[github_repo_lifecycle] fetch failed:', err);
    return store;
  }
  if (json.errors?.length) {
    console.warn('[github_repo_lifecycle]', json.errors.map((e) => e.message).join('; '));
  }

  valid.forEach((r, i) => {
    const repo = json.data?.[`r${i}`];
    const committed = repo?.defaultBranchRef?.target?.committedDate;
    if (!repo?.createdAt || !committed) return;
    store.set(r.url, {
      created: new Date(repo.createdAt),
      updated: new Date(committed),
    });
  });

  return store;
}
