import { useState } from "react";

const D = { total: 531, under1: 15, movedOut: 45, second: 266, third: 101, threePlus: 104, active: 423 };
const P = k => ((k / D.total) * 100).toFixed(1);

const flagged = [
  { t: "Jossie Kimbrough, Journee Shal…", d: 0, s: "Active", a: "04/30/2026", b: "04/30/2026" },
  { t: "Chad Dinubilo, Gerald Karolew…", d: 0, s: "Active", a: "04/30/2026", b: "04/30/2026" },
  { t: "Jesse Tolbert", d: 29, s: "Active", a: "04/01/2026", b: "04/30/2026" },
  { t: "Becky Callen", d: 60, s: "Closed", a: "02/07/2026", b: "—" },
  { t: "Mollie A. Rabe", d: 74, s: "Moved Out", a: "03/18/2025", b: "05/31/2025" },
  { t: "Hailey Rabideaux, Kevin Steib…", d: 91, s: "Active", a: "06/01/2026", b: "08/31/2026" },
  { t: "Anne Marie Wagle, Robert Kep…", d: 91, s: "Active", a: "06/01/2026", b: "08/31/2026" },
  { t: "Muraddie Jorden", d: 118, s: "Moved Out", a: "07/05/2024", b: "10/31/2024" },
  { t: "Yolunda R. Pryor", d: 119, s: "Active", a: "02/01/2026", b: "05/31/2026" },
  { t: "Chavontae S. Hill", d: 119, s: "Active", a: "02/01/2026", b: "05/31/2026" },
  { t: "Ellie Oldenburg, Dan Rohde", d: 149, s: "Active", a: "02/01/2026", b: "06/30/2026" },
  { t: "William J. Gambon", d: 155, s: "Moved Out", a: "02/26/2025", b: "07/31/2025" },
  { t: "Nikita Finch-Long", d: 182, s: "Active", a: "04/01/2026", b: "09/30/2026" },
  { t: "Christine Bohn", d: 182, s: "Active", a: "04/01/2026", b: "09/30/2026" },
  { t: "Bahar Nepesova", d: 354, s: "Active", a: "05/11/2025", b: "04/30/2026" },
];

const evictions = [
  { t: "Sarah Jackson", addr: "3636 W Branting Ln #2, MKE", p: "Chantelle Harmon", a: "06/18/2024", b: "08/31/2025", y: "1.2y" },
  { t: "Ariyanna Little, Jannie Mcgown, Zainab Faisal", addr: "2859 S 6th St #5, MKE", p: "ATJ Properties", a: "06/01/2024", b: "05/30/2026", y: "2.0y" },
];
const broken = [
  { t: "Maria E. Atilano, Nylah Rodriguez", addr: "1208 59th St Upper, Kenosha", p: "David Chang", a: "08/01/2024", b: "03/31/2026", y: "1.7y" },
  { t: "Generve & John Bloss", addr: "2050 N Commerce #307, MKE", p: "Ryan Rabe", a: "07/01/2023", b: "03/31/2026", y: "2.7y" },
  { t: "Brittany & Genaro Padilla", addr: "2155 S 102nd St #1, W. Allis", p: "ATJ Properties", a: "10/01/2023", b: "04/30/2026", y: "2.6y" },
  { t: "Grant Ritchey", addr: "1909 Thurston Ave Upper, Racine", p: "Jethaa-Thurston LLC", a: "07/01/2025", b: "06/30/2026", y: "1.0y" },
  { t: "Victoria Kraft, Connie Blaschko", addr: "W164N9110 Water St #4, Men. Falls", p: "Srihari Ramanujam", a: "11/01/2022", b: "09/30/2026", y: "3.9y" },
  { t: "Christopher Fronczak", addr: "8862 N Malibu Dr, Bayside", p: "kamiran Maykhan", a: "10/01/2025", b: "09/30/2026", y: "1.0y" },
  { t: "Armando S Navarro", addr: "1550 Augusta St, Racine", p: "Dane Kania", a: "12/01/2025", b: "11/30/2026", y: "1.0y" },
];
const stars = [
  { t: "Jason Geils", y: 14.2 }, { t: "Sheila Rittmann", y: 14.0 }, { t: "Lance Weinhardt", y: 13.9 },
  { t: "Wendy Hockett", y: 13.3 }, { t: "Gina & Inga Lamb", y: 13.1 }, { t: "Ruby's Adult Family Home", y: 11.7 },
  { t: "Jill Gevaart", y: 10.2 }, { t: "Morgan Hagen", y: 10.1 }, { t: "Barry Bahe & Julie Salek", y: 10.0 },
  { t: "Alison & Evan Abt", y: 9.1 },
];

const f = "'DM Sans', sans-serif";
const CB = ({ label, pam, natl, nl }) => {
  const mx = Math.max(pam, natl) * 1.25;
  return <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 7, color: "#1e293b" }}>{label}</div>
    {[{ v: pam, l: "PAM", bg: "linear-gradient(90deg,#1e40af,#3b82f6)", c: "#fff", tag: `${pam}%` },
      { v: natl, l: "Natl", bg: "#cbd5e1", c: "#475569", tag: nl }].map((b, i) =>
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 32, fontSize: 10, color: i ? "#94a3b8" : "#1e40af", fontWeight: 700, textAlign: "right" }}>{b.l}</div>
        <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 5, height: 20, overflow: "hidden" }}>
          <div style={{ width: `${Math.max((b.v / mx) * 100, 5)}%`, height: "100%", background: b.bg, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: b.c }}>{b.tag}</span></div></div></div>)}
  </div>;
};

const KPI = ({ l, v, s, a }) => <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", flex: "1 1 130px", minWidth: 130, borderTop: `3px solid ${a}` }}>
  <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{v}</div>
  <div style={{ fontSize: 10, color: "#64748b", marginTop: 4, fontWeight: 500 }}>{l}</div>
  {s && <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>{s}</div>}
</div>;

const Bar = ({ l, n, p, c, sub, badge }) => <div style={{ marginBottom: 12 }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
      {l}{badge && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, color: badge.c, background: badge.b, padding: "1px 6px", borderRadius: 3 }}>{badge.t}</span>}
      {sub && <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10, marginLeft: 5 }}>— {sub}</span>}
    </div>
    <span style={{ fontSize: 12, fontWeight: 600 }}>{n} ({p}%)</span>
  </div>
  <div style={{ background: "#e2e8f0", borderRadius: 5, height: 22, overflow: "hidden" }}>
    <div style={{ width: `${Math.max((p / 55) * 100, 2)}%`, height: "100%", background: c, borderRadius: 5 }} />
  </div>
</div>;

const IT = ({ items, c, bg }) => <div style={{ overflowX: "auto" }}>
  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
    <thead><tr style={{ background: "#f8fafc", textAlign: "left" }}>
      {["Tenant", "Address", "Portfolio", "Start", "End", "Dur."].map(h => <th key={h} style={{ padding: "7px 10px", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>)}
    </tr></thead>
    <tbody>{items.map((r, i) => <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "7px 10px", fontWeight: 500, maxWidth: 170 }}>{r.t}</td>
      <td style={{ padding: "7px 10px", color: "#64748b", fontSize: 10 }}>{r.addr}</td>
      <td style={{ padding: "7px 10px", color: "#64748b", fontSize: 10 }}>{r.p}</td>
      <td style={{ padding: "7px 10px", whiteSpace: "nowrap" }}>{r.a}</td>
      <td style={{ padding: "7px 10px", whiteSpace: "nowrap" }}>{r.b}</td>
      <td style={{ padding: "7px 10px" }}><span style={{ background: bg, color: c, padding: "1px 6px", borderRadius: 3, fontWeight: 700, fontSize: 10 }}>{r.y}</span></td>
    </tr>)}</tbody>
  </table>
</div>;

const tabs = [
  { id: "o", l: "Overview" }, { id: "c", l: "PAM vs National" },
  { id: "i", l: "Evictions & Broken (9)" }, { id: "f", l: "Flagged (15)" }, { id: "s", l: "Long-Term Stars" },
];

export default function R() {
  const [tab, setTab] = useState("o");
  return <div style={{ fontFamily: f, background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

    <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "28px 22px 20px", color: "#fff" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#60a5fa", marginBottom: 5 }}>Performance Asset Management</div>
      <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>Resident Placement & Retention Report</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5 }}>531 leases · April 8, 2026 · Milwaukee, WI</div>
    </div>

    <div style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)", margin: "16px 16px 0", borderRadius: 12, padding: "20px 22px", color: "#fff", textAlign: "center" }}>
      <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>97.2%</div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 5 }}>of residents stay 1+ years with PAM</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 10, fontSize: 10, opacity: 0.85, flexWrap: "wrap" }}>
        <span><strong>50.1%</strong> in 2nd year</span>
        <span><strong>19.0%</strong> in 3rd year</span>
        <span><strong>19.6%</strong> 3+ years</span>
        <span><strong>0.4%</strong> eviction rate</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 9, opacity: 0.5, fontStyle: "italic" }}>National avg retention: 48–58% · PAM is ~2x the industry standard</div>
    </div>

    <div style={{ display: "flex", margin: "16px 16px 0", borderBottom: "2px solid #e2e8f0", overflowX: "auto" }}>
      {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{
        padding: "7px 12px", fontSize: 10, fontWeight: 600, fontFamily: f, border: "none", background: "none",
        cursor: "pointer", whiteSpace: "nowrap", color: tab === t.id ? "#1e40af" : "#94a3b8",
        borderBottom: tab === t.id ? "2px solid #1e40af" : "2px solid transparent", marginBottom: -2,
      }}>{t.l}</button>)}
    </div>

    <div style={{ padding: 16 }}>
      {tab === "o" && <>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <KPI l="Total Leases" v="531" a="#1e40af" />
          <KPI l="Active" v="423" a="#16a34a" />
          <KPI l="Avg Tenure" v="2.0 yrs" a="#7c3aed" />
          <KPI l="1+ Year Rate" v="97.2%" a="#0891b2" />
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Retention by Lease Cycle</div>
          <Bar l="3+ Years" n={104} p={19.6} c="#0f172a" sub="long-term residents" badge={{ t: "LOYALTY", b: "#f0fdf4", c: "#16a34a" }} />
          <Bar l="In Their 3rd Year" n={101} p={19.0} c="#1e40af" sub="renewed twice" badge={{ t: "2ND RENEWAL", b: "#eff6ff", c: "#1e40af" }} />
          <Bar l="In Their 2nd Year" n={266} p={50.1} c="#3b82f6" sub="completed 1st lease" badge={{ t: "1ST RENEWAL", b: "#eff6ff", c: "#3b82f6" }} />
          <Bar l="Moved Out After 1 Year" n={45} p={8.5} c="#94a3b8" sub="completed, then left" />
          <Bar l="< 1 Year" n={15} p={2.8} c="#f59e0b" sub="new / short-term" badge={{ t: "FLAGGED", b: "#fefce8", c: "#ca8a04" }} />
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Retention Funnel</div>
          {[{ l: "Placed (Total)", v: 531, p: "100%", w: "100%", bg: "#e2e8f0", tc: "#1e293b" },
            { l: "Stayed 1+ Year → In 2nd Year+", v: 516, p: "97.2%", w: "90%", bg: "#dbeafe", tc: "#1e40af" },
            { l: "Renewed → In 3rd Year+", v: 205, p: "38.6%", w: "70%", bg: "#bfdbfe", tc: "#1e40af" },
            { l: "Long-Term (3+ Years)", v: 104, p: "19.6%", w: "50%", bg: "#1e293b", tc: "#fff" },
          ].map((r, i) => <div key={i} style={{ marginBottom: 6 }}>
            <div style={{ width: r.w, minWidth: "45%", background: r.bg, borderRadius: 7, padding: "9px 12px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: r.tc }}>{r.l}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: r.tc }}>{r.v} <span style={{ fontSize: 10, fontWeight: 500 }}>({r.p})</span></span>
            </div>
          </div>)}
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📣 Marketing-Ready Stats</div>
          {[
            ["97.2%", "of residents complete their lease and enter their 2nd year — nearly 2x national avg"],
            ["50.1%", "are currently in their 2nd year with PAM — active and renewed"],
            ["38.6%", "of residents are in their 3rd year or beyond — renewed more than once"],
            ["19.6%", "are long-term residents (3+ years) — real loyalty, built on trust"],
            ["Only 2.8%", "of leases ended before completing 1 year"],
            ["0.4%", "eviction rate vs. 2.5–5.3% national avg (6–13x lower)"],
            ["1.3%", "lease break rate vs. ~5–7% national avg (4–5x lower)"],
            ["14+ yrs", "longest resident tenure — with PAM since 2012"],
            ["98.3%", "of all leases completed with zero incidents"],
          ].map(([s, t], i) => <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1e40af", minWidth: 65, textAlign: "right", flexShrink: 0 }}>{s}</span>
            <span style={{ fontSize: 11, color: "#475569", lineHeight: 1.4 }}>{t}</span>
          </div>)}
        </div>
      </>}

      {tab === "c" && <>
        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>PAM vs. National Industry Averages</div>
          <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>Sources: Zego 2025, NAA, Eviction Lab, Census Bureau, REI Prime, MRI Software, Redfin</div>
          <CB label="Lease Completion (entered 2nd yr)" pam={97.2} natl={55} nl="48–58%" />
          <CB label="Renewed Into 3rd Year+" pam={38.6} natl={25} nl="~20–30%" />
          <CB label="Long-Term Residents (3+ yrs)" pam={19.6} natl={12} nl="~10–15%" />
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Risk Metrics: Lower = Better</div>
          <CB label="Eviction Rate" pam={0.4} natl={5.3} nl="2.5–5.3%" />
          <CB label="Lease Break Rate" pam={1.3} natl={6} nl="~5–7%" />
          <CB label="Eviction Filing Rate" pam={0.4} natl={7.8} nl="7.8%" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[["Entered 2nd Year", "97.2%", "48–58%", "~1.8x better"],
            ["Avg Tenure", "2.0 yrs", "~2.3 yrs", "On par"],
            ["Eviction Rate", "0.4%", "2.5–5.3%", "6–13x lower"],
            ["Lease Breaks", "1.3%", "~5–7%", "4–5x lower"],
          ].map(([m, p, n, w], i) => <div key={i} style={{ background: "#fff", borderRadius: 8, padding: 12, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 9, color: "#64748b", fontWeight: 600, marginBottom: 5 }}>{m}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div><div style={{ fontSize: 16, fontWeight: 800, color: "#1e40af" }}>{p}</div><div style={{ fontSize: 8, color: "#94a3b8" }}>PAM</div></div>
              <div style={{ fontSize: 8, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", padding: "1px 5px", borderRadius: 3 }}>{w}</div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{n}</div><div style={{ fontSize: 8, color: "#94a3b8" }}>National</div></div>
            </div>
          </div>)}
        </div>
        <div style={{ background: "#f0fdf4", borderRadius: 8, padding: 14, border: "1px solid #bbf7d0" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 4 }}>💡 What This Means for Investors</div>
          <div style={{ fontSize: 11, color: "#15803d", lineHeight: 1.5 }}>97.2% of PAM residents enter their 2nd year — nearly double the national average. Lower vacancy risk, fewer turnovers (avg $3,872 per turnover nationally), and more predictable cash flow. A 0.4% eviction rate vs. 2.5–5.3% nationally reflects strong screening and management.</div>
        </div>
      </>}

      {tab === "i" && <>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <KPI l="Evictions" v="2" s="0.4% · Natl: 2.5–5.3%" a="#dc2626" />
          <KPI l="Lease Broken" v="7" s="1.3% · Natl: ~5–7%" a="#f97316" />
          <KPI l="Clean Rate" v="98.3%" s="522 of 531 leases" a="#16a34a" />
        </div>
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#fef2f2" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>🚨 Evictions (2)</div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>PAM: 0.4% · National: 2.5–5.3% (Census/GAO) · Filing rate: 7.8% (Eviction Lab)</div>
          </div>
          <IT items={evictions} c="#dc2626" bg="#fef2f2" />
        </div>
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#fefce8" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ca8a04" }}>⚠️ Lease Broken (7)</div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>PAM: 1.3% · National: ~5–7%</div>
          </div>
          <IT items={broken} c="#ca8a04" bg="#fefce8" />
        </div>
      </>}

      {tab === "f" && <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>⚠️ Less Than 1 Year — 15 Leases (2.8%)</div>
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Most are new/future leases or short-term placements.</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead><tr style={{ background: "#f8fafc", textAlign: "left" }}>
              {["Tenant", "Days", "Status", "Start", "End"].map(h => <th key={h} style={{ padding: "7px 10px", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>)}
            </tr></thead>
            <tbody>{flagged.map((r, i) => <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "7px 10px", fontWeight: 500 }}>{r.t}</td>
              <td style={{ padding: "7px 10px" }}><span style={{ background: r.d < 90 ? "#fef2f2" : r.d < 180 ? "#fefce8" : "#f0fdf4", color: r.d < 90 ? "#dc2626" : r.d < 180 ? "#ca8a04" : "#16a34a", padding: "1px 6px", borderRadius: 3, fontWeight: 700, fontSize: 10 }}>{r.d}d</span></td>
              <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.s}</td>
              <td style={{ padding: "7px 10px" }}>{r.a}</td>
              <td style={{ padding: "7px 10px" }}>{r.b}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </div>}

      {tab === "s" && <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>⭐ Top 10 Longest-Tenured Residents</div>
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>104 residents (19.6%) 3+ years. National avg: ~10–15%.</div>
        </div>
        <div style={{ padding: 10 }}>
          {stars.map((r, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 6px", borderBottom: i < 9 ? "1px solid #f1f5f9" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 3 ? "linear-gradient(135deg,#1e40af,#3b82f6)" : "#e2e8f0", color: i < 3 ? "#fff" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1, fontWeight: 600, fontSize: 12 }}>{r.t}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#1e40af" }}>{r.y} <span style={{ fontSize: 9, fontWeight: 500, color: "#94a3b8" }}>yrs</span></div>
          </div>)}
        </div>
      </div>}
    </div>

    <div style={{ padding: "10px 16px 22px", textAlign: "center", fontSize: 9, color: "#94a3b8" }}>
      Performance Asset Management · Milwaukee, WI · pammke.com · Sources: Zego 2025, NAA, Eviction Lab, Census Bureau, REI Prime, Redfin
    </div>
  </div>;
}
