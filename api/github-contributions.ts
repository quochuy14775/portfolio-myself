import type { VercelRequest, VercelResponse } from "@vercel/node";

const GH_TOKEN = process.env.GITHUB_TOKEN;

const QUERY = `
    query($login: String!) {
        user(login: $login) {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                            contributionLevel
                        }
                    }
                }
            }
        }
    }
`;

function mapLevel(lvl: string): 0 | 1 | 2 | 3 | 4 {
    switch (lvl) {
        case "FIRST_QUARTILE": return 1;
        case "SECOND_QUARTILE": return 2;
        case "THIRD_QUARTILE": return 3;
        case "FOURTH_QUARTILE": return 4;
        default: return 0;
    }
}

interface GhDay {
    date: string;
    contributionCount: number;
    contributionLevel: string;
}
interface GhWeek { contributionDays: GhDay[] }

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const username = req.query.username;
    if (typeof username !== "string" || !username) {
        return res.status(400).json({ error: "username query param required" });
    }
    if (!GH_TOKEN) {
        return res.status(500).json({ error: "GITHUB_TOKEN env var not configured" });
    }

    try {
        const ghRes = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${GH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: QUERY, variables: { login: username } }),
        });

        if (!ghRes.ok) {
            return res.status(ghRes.status).json({ error: `GitHub API ${ghRes.status}` });
        }

        const json: any = await ghRes.json();
        if (json.errors) {
            return res.status(500).json({ error: json.errors[0]?.message ?? "GraphQL error" });
        }

        const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
        if (!cal) return res.status(404).json({ error: "user not found" });

        const contributions = (cal.weeks as GhWeek[]).flatMap((w) =>
            w.contributionDays.map((d) => ({
                date: d.date,
                count: d.contributionCount,
                level: mapLevel(d.contributionLevel),
            }))
        );

        // Cache at the edge for 1h, allow stale while revalidating
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
        return res.status(200).json({
            total: cal.totalContributions,
            contributions,
        });
    } catch (err) {
        return res.status(500).json({ error: "fetch failed" });
    }
}
