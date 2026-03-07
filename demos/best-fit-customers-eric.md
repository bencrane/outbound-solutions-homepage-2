# Building a TAM List From Your Customer List

Source: Eric Nelowski (Growth Engine X) — TAM list building workflow for outbound

---

## The Core Idea

Work **backwards from your existing customer list** to build a high-quality TAM. The goal is 80% coverage of the total addressable market where every company on the list is a genuinely good fit — not 100% coverage with garbage mixed in.

This is now economically viable because:

- **Data enrichment is cheap** (Prospeo, Clay, etc.)
- **AI filtering is cheap** (GPT-5 Nano w/ cached inputs = 90% off input costs, batch API = 50% off input + 50% off output)
- You can afford to pull 50-60k companies in a weird industry and filter down to the 1,000 that actually fit — for pennies

---

## Step-by-Step Workflow

### Step 1: Enrich the Customer List

Take the client's existing customer list (even if it's just a list of emails) and enrich every record:

**Contact-level enrichment:**
- Job title
- Tenure at current company
- Past companies worked at
- LinkedIn "About" section
- LinkedIn headline
- Job description content

**Company-level enrichment:**
- Company description
- Industry (LinkedIn self-reported)
- Employee headcount
- Company name
- Location

**Tools:** Prospeo bulk enrich API (person + company), Clay, or any tool that matches against LinkedIn data. If starting from emails, do a reverse email lookup first → person match → company fallback if no person found.

### Step 2: Analyze the Customer List with AI

Feed the enriched customer data to Claude Opus (or similar) and have it produce a strategy output:

- **Top buyer titles** — e.g., Purchasing Manager, Operations Manager, Office Manager, Buyer, Purchasing Coordinator
- **Top represented industries** — e.g., Construction, Trucking & Railroad, Transportation, General Wholesale, Event Services, Plastics, General Retail, Oil & Gas
- **Employee headcount range** that fits
- **Persona profiles** — seniority levels, functional departments
- **Any outlier industries** that show up in a small number of customers (this is where the magic is)

### Step 3: Pull the Full Universe of Companies

Go to Prospeo (or Clay, Sales Navigator scrapers, etc.) and pull **every single company** in the US that matches:

- The employee headcount range
- ANY of the industries identified in Step 2

Pull all of them — even the weird outlier industries. You're going to clean it up in the next step.

### Step 4: Build a Recursive AI Scoring Prompt

This is the key step. Build a prompt that scores each company as a good fit or bad fit. Critical details:

1. **Mix in the real customers as ground truth.** Your prompt must correctly identify every actual customer as a good fit. If it doesn't, something is wrong with the prompt — don't ship it.

2. **Make it recursive.** Tell Claude Code / Cursor: "If a company on the actual customer list fails this filter, stop. Ask me for more inputs. Figure out why. Don't take the easy way out by pattern-matching on company descriptions."

3. **Handle outlier industries with specific sub-prompts.** Example: If 3 out of 200 customers are in "Event Services" and the rest are in transportation/wholesale, add a section to the prompt that says: "If the industry is Event Services, here are the specific companies that are good fits — use these characteristics to evaluate other Event Services companies."

4. **Show yourself 10 random companies** before running the full batch — manually validate that the prompt is scoring them correctly.

5. **Use Claude Code or Cursor to help build the prompt.** Iterate on it until you're confident.

### Step 5: Run the Batch

Once the prompt is validated:

- Push the full company list through the **OpenAI Batch API**
- Use **cached inputs** (90% off input pricing on GPT-5 Nano)
- Stack with **Batch API discounts** (50% off input, 50% off output)
- Low or minimal reasoning is fine for this task
- You can wait 24 hours for results — it's not time-sensitive

Even processing 50-60k companies in an outlier industry costs pennies.

### Step 6: Extract Real Buyer Titles

Don't guess at titles. Go back to the enriched customer list from Step 1 and extract the **actual job titles** of the people who bought. Use those exact titles (and close variants) to pull contacts at the scored companies.

### Step 7: Pull Contacts and Launch Outreach

Using Clay, Prospeo, or your preferred tool — find contacts at the scored companies matching the real buyer titles. You now have a clean TAM list ready for outbound.

---

## Why This Works Now (2026)

| Factor | Past | Now |
|---|---|---|
| Pulling companies from outlier industries | Too expensive to filter, so you'd skip them | Pennies to pull and AI-score 50k+ companies |
| AI scoring/filtering | Too expensive per-record | GPT-5 Nano + cached inputs + batch API = ~95% cost reduction |
| Industry data quality | Stuck with LinkedIn self-reported industries (garbage in) | Can pull everything and let AI determine actual fit from descriptions |
| Title extraction | Guessing at "generally looks like this" | Extract real titles from actual buyer data in CRM |

---

## Tools Referenced

- **Prospeo** — Bulk company enrichment API, person enrichment, reverse email lookup. Chosen because 1:1 match with LinkedIn data and API-first (can set up via Claude Code with a voice note).
- **Clay** — Alternative for enrichment + list building. Works for this same workflow.
- **Claude Code / Cursor** — For building and iterating on the scoring prompt.
- **OpenAI Batch API + GPT-5 Nano** — For running the scoring at scale with cached inputs.
- **Claude Opus** — For the initial customer list analysis and strategy output.