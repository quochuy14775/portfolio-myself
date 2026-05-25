import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import "./GitHubStats.css";

interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface OfficialResponse {
    total: number;
    contributions: ContributionDay[];
}

interface FallbackResponse {
    total: { [year: string]: number };
    contributions: ContributionDay[];
}

interface Props {
    username: string;
}

const FALLBACK_TOTAL = 847;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setVal(Math.floor(v)),
        });
        return () => controls.stop();
    }, [inView, to]);

    return (
        <span ref={ref}>
            {val.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function GitHubStats({ username }: Props) {
    const [data, setData] = useState<ContributionDay[] | null>(null);
    const [total, setTotal] = useState<number>(FALLBACK_TOTAL);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function tryOfficial(): Promise<boolean> {
            try {
                const res = await fetch(`/api/github-contributions?username=${username}`);
                if (!res.ok) return false;
                const json: OfficialResponse = await res.json();
                if (cancelled) return true;
                setData(json.contributions);
                setTotal(json.total ?? FALLBACK_TOTAL);
                return true;
            } catch {
                return false;
            }
        }

        async function tryFallback(): Promise<boolean> {
            try {
                const res = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                );
                if (!res.ok) return false;
                const json: FallbackResponse = await res.json();
                if (cancelled) return true;
                setData(json.contributions);
                const year = Object.keys(json.total)[0];
                setTotal(json.total[year] ?? FALLBACK_TOTAL);
                return true;
            } catch {
                return false;
            }
        }

        async function load() {
            const ok = (await tryOfficial()) || (await tryFallback());
            if (!cancelled) {
                if (!ok) setError(true);
                setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [username]);

    // Build weeks: 53 weeks × 7 days. Take last 53 weeks of data.
    const weeks: ContributionDay[][] = [];
    if (data) {
        const last = data.slice(-53 * 7);
        for (let w = 0; w < 53; w++) {
            weeks.push(last.slice(w * 7, w * 7 + 7));
        }
    }

    // Compute streak from real data, fallback if needed
    const currentStreak = (() => {
        if (!data) return 12;
        let s = 0;
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].count > 0) s++;
            else break;
        }
        return s;
    })();

    return (
        <div className="gh-stats">
            <div className="gh-stats-head">
                <span className="bento-label">GitHub · last 12 months</span>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-link mono"
                >
                    @{username} ↗
                </a>
            </div>

            <div className="gh-numbers">
                <div className="gh-stat">
                    <span className="gh-stat-value mono">
                        <Counter to={total} />
                    </span>
                    <span className="gh-stat-label">contributions</span>
                </div>
                <div className="gh-stat">
                    <span className="gh-stat-value mono">
                        <Counter to={currentStreak} />
                    </span>
                    <span className="gh-stat-label">day streak</span>
                </div>
            </div>

            <div className="gh-heatmap" role="img" aria-label="GitHub contribution heatmap">
                {loading && !error && (
                    <div className="gh-skeleton">
                        {Array.from({ length: 53 * 7 }).map((_, i) => (
                            <div key={i} className="gh-cell gh-cell--skel" />
                        ))}
                    </div>
                )}
                {!loading && weeks.length > 0 && (
                    <div className="gh-grid">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="gh-week">
                                {Array.from({ length: 7 }).map((_, di) => {
                                    const day = week[di];
                                    if (!day) return <div key={di} className="gh-cell gh-cell--empty" />;
                                    return (
                                        <motion.div
                                            key={di}
                                            className={`gh-cell gh-cell--l${day.level}`}
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: (wi * 7 + di) * 0.002,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            title={`${day.count} contributions on ${day.date}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
                {error && (
                    <div className="gh-error mono">
                        Live data unavailable · showing placeholder
                    </div>
                )}
            </div>

            <div className="gh-legend mono">
                <span>Less</span>
                <span className="gh-cell gh-cell--l0" />
                <span className="gh-cell gh-cell--l1" />
                <span className="gh-cell gh-cell--l2" />
                <span className="gh-cell gh-cell--l3" />
                <span className="gh-cell gh-cell--l4" />
                <span>More</span>
            </div>
        </div>
    );
}
