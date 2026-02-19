"""DOC 4 Translations — $2B Term Loan Credit Agreement
Structural context: $1,999,100,000 1L Term Loan at SOFR+700bps (10.63% all-in),
secured 1L at both AMC and Muvico. Co-borrowers: AMC Entertainment Holdings, Inc.
and Muvico, LLC. Admin/Collateral Agent: Wilmington Savings Fund Society, FSB.
Maturity: January 1, 2029. The tightest covenants in the capital structure.
"""

TRANSLATIONS = {}

# ── Article I — Definitions ──────────────────────────────────────────────────
# Sections 1.01 and 1.02 skipped (definitions)

TRANSLATIONS[("doc4", "I", "article")] = """
<p><strong>Definitions and Interpretive Provisions.</strong> This article establishes the roughly 300+ defined terms used throughout the Credit Agreement, along with rules for how those terms are interpreted. Key definitions include Consolidated EBITDA, Total Leverage Ratio, First Lien Leverage Ratio, Material Adverse Effect, and the various debt baskets. <strong>Why it matters:</strong> The precise wording of these definitions determines how much financial flexibility the Borrowers have under every covenant in the agreement.</p>
"""

TRANSLATIONS[("doc4", "1.03")] = """
<p><strong>Accounting Terms; GAAP; Certain Calculations.</strong> Financial terms not defined in the agreement are interpreted under GAAP. All financial ratios and tests are calculated on a Pro Forma Basis, meaning proposed transactions are treated as if they already occurred. <strong>Why it matters:</strong> Pro forma calculations allow the Borrowers to "test" compliance before taking an action, but the freeze provision ensures GAAP changes after closing do not automatically create covenant violations.</p>
"""

TRANSLATIONS[("doc4", "1.04")] = """
<p><strong>Effectuation of Transactions.</strong> All references to the Borrowers and their subsidiaries are deemed to give effect to the closing-date Transactions. <strong>Why it matters:</strong> This ensures the Credit Agreement is read in the context of the post-closing corporate structure, including the Muvico drop-down and intercompany arrangements that were part of the original deal.</p>
"""

TRANSLATIONS[("doc4", "1.05")] = """
<p><strong>Currency Translation; Rates.</strong> Non-dollar amounts are converted at spot exchange rates for covenant compliance, but currency fluctuations alone cannot cause a default. <strong>Why it matters:</strong> AMC operates internationally through Odeon, so this provision prevents technical defaults caused by foreign exchange movements rather than actual business deterioration.</p>
"""

TRANSLATIONS[("doc4", "1.06")] = """
<p><strong>Limited Condition Transactions.</strong> When the Borrowers pursue an acquisition or similar transaction, they can elect to test financial ratio compliance as of the date they sign the deal rather than the date they close. <strong>Why it matters:</strong> This gives the Borrowers certainty that a signed acquisition will not fail covenant tests due to market or business changes between signing and closing, which is standard in modern leveraged credit agreements.</p>
"""

TRANSLATIONS[("doc4", "1.07")] = """
<p><strong>Cashless Rollovers.</strong> Lenders extending or refinancing their loans through cashless settlement mechanisms are deemed to comply with requirements for dollar or cash payments. <strong>Why it matters:</strong> This facilitates refinancing transactions without requiring actual cash movement, reducing friction when the Borrowers want to amend or extend the facility.</p>
"""

# Section 1.08 [Reserved] — skipped
# Section 1.09 trivial (times of day) — skipped

# ── Article II — The Credits ─────────────────────────────────────────────────

TRANSLATIONS[("doc4", "II", "article")] = """
<p><strong>The Credits</strong> contains the core lending mechanics: how loans are made, how interest accrues and is calculated, how repayments and prepayments work, and the SOFR benchmark provisions. This is the operational engine of the $2B Term Loan. Key provisions include quarterly amortization at 0.25% (Section 2.10), a detailed voluntary prepayment regime with make-whole and call premiums (Section 2.11), and interest at SOFR + 700bps (Section 2.13).</p>
"""

TRANSLATIONS[("doc4", "2.02")] = """
<p><strong>Loans and Borrowings.</strong> Each loan is made ratably by lenders in proportion to their commitments. Loans can be ABR (base rate) or SOFR-based. The Initial Exchange Term Loans were issued as consideration for the open market purchase of existing term loans and the exchange of 2026 Second Lien Notes. <strong>Why it matters:</strong> Once repaid, Term Loans cannot be reborrowed -- this is a term loan, not a revolving facility, so every dollar prepaid permanently reduces the outstanding balance.</p>
"""

TRANSLATIONS[("doc4", "2.03")] = """
<p><strong>Requests for Borrowings.</strong> Borrowing requests must be submitted to the Administrative Agent with specified notice periods: 3 business days for SOFR borrowings, same day for ABR borrowings. Each request is irrevocable and must specify the class, amount, date, and type of borrowing. <strong>Why it matters:</strong> These mechanics are standard but the irrevocability provision means the Borrowers cannot change their mind once a request is submitted.</p>
"""

TRANSLATIONS[("doc4", "2.06")] = """
<p><strong>Funding of Borrowings.</strong> Each lender wires funds to the Administrative Agent by 2:00 PM on the borrowing date, and the Agent distributes to the Borrowers. If a lender fails to fund, the Agent may advance the amount and recover from the defaulting lender. <strong>Why it matters:</strong> Lender obligations are several (not joint), meaning one lender's failure does not excuse others from funding their share.</p>
"""

TRANSLATIONS[("doc4", "2.07")] = """
<p><strong>Interest Elections.</strong> The Borrowers can convert loans between ABR and SOFR, or continue SOFR loans for new Interest Periods. Conversions require 3 business days notice for SOFR, 1 business day for ABR. <strong>Why it matters:</strong> This gives the Borrowers flexibility to manage interest rate exposure by switching between fixed-period SOFR and floating ABR as market conditions change.</p>
"""

TRANSLATIONS[("doc4", "2.08")] = """
<p><strong>Termination and Reduction of Commitments.</strong> The Borrowers may terminate or reduce unfunded commitments with 3 business days notice. Reductions must be in minimum amounts and are irrevocable. <strong>Why it matters:</strong> Since this is a fully-drawn term loan, this section is primarily relevant for any future Subsequent Exchange Term Loan commitments.</p>
"""

TRANSLATIONS[("doc4", "2.09")] = """
<p><strong>Repayment of Loans; Evidence of Debt.</strong> The principal of each term loan is repayable on the Maturity Date (January 1, 2029). The Administrative Agent maintains a register of each lender's loans. Lenders may request promissory notes. <strong>Why it matters:</strong> The register is the official record of who owns what -- critical for determining voting rights on amendments and waivers under Section 9.02.</p>
"""

TRANSLATIONS[("doc4", "2.10")] = """
<p><strong>Amortization of Term Loans.</strong> The Borrowers must repay 0.25% of the aggregate outstanding principal on the last business day of each quarter (March, June, September, December), with the balance due at maturity. <strong>Why it matters:</strong> At 1% annual amortization, this is minimal -- effectively a bullet maturity. The quarterly payments are roughly $5M against a $2B facility. Voluntary prepayments reduce future scheduled amortization payments.</p>
"""

TRANSLATIONS[("doc4", "2.11")] = """
<p><strong>Prepayment of Loans.</strong> Voluntary prepayments are permitted at any time, but carry significant premiums during the first 18 months: a Make-Whole Amount in the first 12 months and a 4% premium from months 12-18. After 18 months, prepayment is at par. The section also contains an elaborate discounted prepayment mechanism allowing lenders to bid on prepayments at below par. <strong>Why it matters:</strong> The make-whole and call premium protect lenders' expected return during the early period of the loan. The discounted prepayment provisions (Dutch auction, modified Dutch auction, and solicited offers) give the Borrowers flexibility to retire debt at market prices when it trades below par.</p>
"""

TRANSLATIONS[("doc4", "2.12")] = """
<p><strong>Fees and Certain Other Payments.</strong> The Borrowers must pay fees as set forth in the Agent Fee Letter and other Loan Documents. <strong>Why it matters:</strong> Agent fees and other costs are part of the all-in cost of the facility beyond the stated SOFR+700bps spread.</p>
"""

TRANSLATIONS[("doc4", "2.13")] = """
<p><strong>Interest.</strong> Term Loans bear interest at the Borrowers' election of either (a) SOFR plus 700 basis points or (b) the Alternate Base Rate plus 600 basis points. Default interest adds an additional 2% per annum. Interest is payable quarterly for ABR loans and at the end of each Interest Period for SOFR loans. <strong>Why it matters:</strong> At current SOFR rates, the all-in cost is approximately 10.63%, making this one of the most expensive institutional term loans in the market. The 200bps default rate premium creates a strong incentive to cure any Event of Default quickly.</p>
"""

TRANSLATIONS[("doc4", "2.14")] = """
<p><strong>Inability to Determine Rates; Benchmark Replacement.</strong> If SOFR becomes unavailable or unreliable, the agreement provides a waterfall of replacement benchmarks. The Administrative Agent can designate a successor rate consistent with market convention. <strong>Why it matters:</strong> This is the SOFR fallback language that became standard after the LIBOR transition. It ensures the agreement continues to function even if the reference rate changes.</p>
"""

TRANSLATIONS[("doc4", "2.15")] = """
<p><strong>Increased Costs.</strong> If regulatory changes increase a lender's cost of maintaining the loan, the Borrowers must compensate the lender for the additional cost. <strong>Why it matters:</strong> This protects lenders from Basel III/IV capital requirement changes or other regulatory burdens that increase the cost of holding the loan on their books.</p>
"""

TRANSLATIONS[("doc4", "2.17")] = """
<p><strong>Taxes.</strong> All payments must be made free of withholding taxes unless required by law. If withholding is required, the Borrowers must gross up payments so lenders receive the full amount due. Extensive provisions address FATCA compliance, treaty benefits, and tax documentation requirements. <strong>Why it matters:</strong> Foreign lenders holding this loan need assurance they will receive full interest payments without tax leakage, which affects the loan's secondary market tradability.</p>
"""

TRANSLATIONS[("doc4", "2.18")] = """
<p><strong>Payments Generally; Pro Rata Treatment; Sharing of Setoffs.</strong> All payments must be made in dollars by 2:00 PM to the Administrative Agent. Payments are distributed pro rata to lenders. If any lender receives a disproportionate payment (e.g., through setoff), it must share with other lenders. <strong>Why it matters:</strong> The sharing provision prevents individual lenders from gaining an advantage by exercising setoff rights against Borrower deposits held at their bank.</p>
"""

TRANSLATIONS[("doc4", "2.19")] = """
<p><strong>Mitigation Obligations; Replacement of Lenders.</strong> Lenders must use reasonable efforts to mitigate increased costs or tax issues by changing their lending office. If a lender cannot mitigate, the Borrowers can replace that lender by arranging an assignment to a new lender. <strong>Why it matters:</strong> This gives the Borrowers a mechanism to remove "problem" lenders who are imposing increased costs or withholding tax burdens on the facility.</p>
"""

TRANSLATIONS[("doc4", "2.20")] = """
<p><strong>Subsequent Exchange Term Loans.</strong> The agreement permits additional term loans to be issued in exchange for existing AMC debt instruments through open market purchases. These Subsequent Exchange Term Loans rank pari passu with the Initial Exchange Term Loans. <strong>Why it matters:</strong> This mechanism allowed AMC to continue rolling existing debt into this 1L facility after the initial closing, increasing the Term Loan's share of the capital structure.</p>
"""

# Sections 2.21, 2.22 [Reserved] — skipped

TRANSLATIONS[("doc4", "2.23")] = """
<p><strong>Illegality.</strong> If a change in law makes it unlawful for a lender to maintain SOFR loans, the Borrowers must convert those loans to ABR. <strong>Why it matters:</strong> This is a standard protective provision ensuring lenders are not forced to violate applicable law by maintaining the loan in its current form.</p>
"""

# ── Article III — Representations and Warranties ─────────────────────────────

TRANSLATIONS[("doc4", "III", "article")] = """
<p><strong>Representations and Warranties.</strong> Each Borrower makes extensive representations about its legal status, financial condition, absence of material litigation, tax compliance, and the validity of collateral. These representations are certified as true at closing and deemed repeated with each borrowing. <strong>Why it matters:</strong> If any representation proves materially incorrect, it triggers an Event of Default under Section 7.01(c), with only a 30-day cure period. The Borrowers are effectively guaranteeing the accuracy of all disclosed information.</p>
"""

TRANSLATIONS[("doc4", "3.04")] = """
<p><strong>Financial Condition; No Material Adverse Effect.</strong> The Borrowers represent that their audited financial statements were prepared in accordance with GAAP and fairly present the company's financial condition, and that no Material Adverse Effect has occurred since the Effective Date. <strong>Why it matters:</strong> This is a backward-looking representation. If AMC's financial condition deteriorated materially before closing and this was not disclosed, lenders could claim a breach.</p>
"""

TRANSLATIONS[("doc4", "3.05")] = """
<p><strong>Properties.</strong> The Borrowers represent good title to all material property, free of liens except those permitted under Section 6.02. Schedule 3.05 lists all Material Real Property. <strong>Why it matters:</strong> For a theatre chain, real property (leases and owned locations) is the core asset base. This representation confirms the collateral pool is clean.</p>
"""

TRANSLATIONS[("doc4", "3.06")] = """
<p><strong>Litigation and Environmental Matters.</strong> No pending or threatened litigation or environmental liabilities could reasonably be expected to have a Material Adverse Effect. <strong>Why it matters:</strong> Undisclosed material litigation could affect the Borrowers' ability to service debt. Environmental liabilities on theatre properties could impair collateral values.</p>
"""

TRANSLATIONS[("doc4", "3.14")] = """
<p><strong>Solvency.</strong> On the Effective Date, after giving effect to all Transactions, the Borrowers and their Subsidiaries on a consolidated basis are Solvent. <strong>Why it matters:</strong> This representation is critical for bankruptcy analysis. If the company was insolvent at the time of the transaction, the entire debt exchange could potentially be challenged as a fraudulent transfer.</p>
"""

TRANSLATIONS[("doc4", "3.15")] = """
<p><strong>Senior Indebtedness.</strong> The Loan Document Obligations constitute "Senior Indebtedness" and "Designated Senior Debt" under all Junior Financing documentation. <strong>Why it matters:</strong> This confirms the Term Loan's priority position across all other AMC debt documents, enabling payment blockage and other subordination enforcement mechanisms.</p>
"""

# ── Article IV — Conditions ──────────────────────────────────────────────────

TRANSLATIONS[("doc4", "IV", "article")] = """
<p><strong>Conditions Precedent</strong> sets out what must be satisfied before lenders are obligated to fund. Section 4.01 covers the extensive closing-date conditions (executed documents, legal opinions, solvency certificate, KYC compliance). Section 4.02 covers conditions for each subsequent borrowing (reps true, no default). <strong>Why it matters:</strong> These conditions ensure the legal and structural framework is fully in place before any money moves.</p>
"""

TRANSLATIONS[("doc4", "4.01")] = """
<p><strong>Effective Date Conditions.</strong> Fourteen separate conditions must be satisfied before closing, including: delivery of all loan documents and security agreements, organizational documents and board resolutions, UCC filings for perfected liens, solvency certificate, legal opinions from three law firms, KYC/anti-money-laundering documentation, payment of all fees, consummation of the Exchange Transactions, and no Material Adverse Effect since December 31, 2023. <strong>Why it matters:</strong> The extensive closing conditions reflect the complexity of the multi-tranche debt exchange that created this facility and the need to ensure all intercreditor agreements were properly in place.</p>
"""

TRANSLATIONS[("doc4", "4.02")] = """
<p><strong>Each Credit Event.</strong> For each subsequent borrowing: (a) all representations must be true and correct in all material respects, (b) no Default or Event of Default exists or would result, and (c) a Borrowing Notice must be delivered. Each borrowing is deemed a representation by the Borrowers as to these conditions. <strong>Why it matters:</strong> This ensures that even after closing, the Borrowers cannot draw additional loans if their financial condition has deteriorated.</p>
"""

# ── Article V — Affirmative Covenants ────────────────────────────────────────

TRANSLATIONS[("doc4", "V", "article")] = """
<p><strong>Affirmative Covenants</strong> require AMC and Muvico (as co-borrowers) to take specific ongoing actions: deliver financial statements, maintain corporate existence, pay taxes, maintain insurance, and provide regular compliance certificates. These are the "must-do" obligations, as opposed to Article VI's "must-not-do" restrictions.</p>
"""

TRANSLATIONS[("doc4", "5.01")] = """
<p><strong>Financial Statements and Information.</strong> The Borrowers must deliver: (a) annual audited financial statements within 90 days of fiscal year end; (b) quarterly unaudited financials within 45 days of quarter end; (c) compliance certificates with each set of financials; (d) notice of any Default or Event of Default; and (e) additional information reasonably requested by the Administrative Agent. Critically, financials must include a separate detailed presentation for both the Muvico Group and the AMC Group, including balance sheets, income statements, cash flows, and key operating metrics (ATP, attendance, theatres, screens, EBITDA, rent). <strong>Why it matters:</strong> As the senior-most tranche (1L at both AMC and Muvico), Term Loan lenders have the strongest information rights and are typically the first to detect covenant deterioration. The separate Muvico/AMC reporting requirement gives lenders visibility into the ring-fenced entity structure.</p>
"""

TRANSLATIONS[("doc4", "5.02")] = """
<p><strong>Notices of Material Events.</strong> The Borrowers must promptly notify the Administrative Agent of any Default and any material litigation, environmental liability, or ERISA event. Each notice must include a written statement detailing the event and any remedial action. <strong>Why it matters:</strong> Early warning of problems is essential for 1L lenders who need to assess whether to exercise remedies or negotiate amendments.</p>
"""

TRANSLATIONS[("doc4", "5.03")] = """
<p><strong>Information Regarding Collateral.</strong> The Borrowers must notify the Administrative Agent within 30 days of any change in a Loan Party's legal name, jurisdiction of organization, or organizational form. Annual certificates must confirm all collateral information is current. <strong>Why it matters:</strong> UCC filings and other security interests are indexed by debtor name and jurisdiction. A name change without updated filings could unperfect the lien.</p>
"""

TRANSLATIONS[("doc4", "5.04")] = """
<p><strong>Existence; Conduct of Business.</strong> The Borrowers must maintain corporate existence and all material rights, licenses, permits, and intellectual property. <strong>Why it matters:</strong> Theatre operations require numerous local permits and licenses. Loss of key licenses could impair the ability to generate revenue from specific locations.</p>
"""

TRANSLATIONS[("doc4", "5.05")] = """
<p><strong>Payment of Taxes.</strong> The Borrowers must pay all taxes before they become delinquent, except where failure would not result in a Material Adverse Effect. <strong>Why it matters:</strong> Tax liens generally prime all other liens, including the Term Loan's 1L security interest. Unpaid taxes could effectively subordinate the lenders' collateral position.</p>
"""

TRANSLATIONS[("doc4", "5.06")] = """
<p><strong>Maintenance of Properties.</strong> All property material to the business must be maintained in good working order. <strong>Why it matters:</strong> For a theatre chain, physical condition of venues directly affects revenue capacity and collateral value.</p>
"""

TRANSLATIONS[("doc4", "5.07")] = """
<p><strong>Insurance.</strong> The Borrowers must maintain commercially reasonable insurance. All policies must name the Collateral Agent as additional insured and loss payee within 30 days of closing. <strong>Why it matters:</strong> Without proper insurance endorsements, casualty proceeds could be paid to the Borrowers rather than applied to the secured debt, undermining the collateral position.</p>
"""

TRANSLATIONS[("doc4", "5.08")] = """
<p><strong>Books and Records; Inspection and Audit Rights.</strong> The Borrowers must maintain proper books and records in conformity with GAAP. The Administrative Agent may inspect properties, examine books, and meet with officers and accountants once per year (unlimited during an Event of Default). <strong>Why it matters:</strong> Inspection rights are the lenders' on-the-ground verification tool. During an Event of Default, unlimited inspection access enables real-time monitoring of the business.</p>
"""

TRANSLATIONS[("doc4", "5.11")] = """
<p><strong>Additional Subsidiaries.</strong> Any new subsidiary formed or acquired after closing must be joined as a Guarantor and pledged as collateral within 30 days (unless it qualifies as an Excluded Subsidiary). <strong>Why it matters:</strong> This prevents the Borrowers from growing the business through new entities that sit outside the collateral package, which would dilute the lenders' security.</p>
"""

TRANSLATIONS[("doc4", "5.12")] = """
<p><strong>Further Assurances.</strong> The Borrowers must execute any additional documents needed to maintain the perfection of security interests, including filings for any newly acquired material assets exceeding $5M in book value. <strong>Why it matters:</strong> This is the lenders' catch-all provision ensuring the collateral package stays current as the business evolves.</p>
"""

TRANSLATIONS[("doc4", "5.13")] = """
<p><strong>Ratings.</strong> The Borrowers must use commercially reasonable efforts to obtain and maintain public credit ratings from S&P and Moody's for both the corporate entity and the Term Loans (but are not required to maintain any specific rating level). <strong>Why it matters:</strong> Ratings affect secondary market liquidity and pricing. Without ratings, lenders may have difficulty selling their positions.</p>
"""

TRANSLATIONS[("doc4", "5.16")] = """
<p><strong>Change in Business.</strong> The Borrowers may not fundamentally alter the character of their business from the movie theatre operations conducted at closing. Extensions, incidental, complementary, and ancillary activities are permitted. <strong>Why it matters:</strong> Lenders underwrote a theatre business at SOFR+700bps. A pivot to an entirely different industry would change the risk profile they agreed to.</p>
"""

TRANSLATIONS[("doc4", "5.17")] = """
<p><strong>Changes in Fiscal Periods.</strong> The Borrowers may not change their fiscal year without Administrative Agent consent. <strong>Why it matters:</strong> Financial reporting deadlines and covenant testing dates are tied to the fiscal calendar. A change could create gaps in compliance monitoring.</p>
"""

# ── Article VI — Negative Covenants ──────────────────────────────────────────

TRANSLATIONS[("doc4", "VI", "article")] = """
<p><strong>Negative Covenants</strong> are the most important restrictions in the Credit Agreement. They limit what the Borrowers CANNOT do. Key provisions include limitations on new debt (6.01), new liens (6.02), fundamental changes (6.03), investments (6.04), asset sales (6.05), restricted payments (6.08), affiliate transactions (6.09), and the <strong>unique Cash Hoarding provision (6.13)</strong>. As the 1L lender, these covenants give the Term Loan the tightest set of restrictions in AMC's capital structure.</p>
"""

TRANSLATIONS[("doc4", "6.01")] = """
<p><strong>Indebtedness; Certain Equity Securities.</strong> Neither AMC nor Muvico may incur Indebtedness except within specified baskets. Key permitted categories include: (a) obligations under this Credit Agreement (capped at $2.025B); (b) existing indebtedness on Schedule 6.01; (c) intercompany debt (must be unsecured and subordinated if owed by a Loan Party to a non-Loan Party); (d) capital lease obligations (capped at $25M); (e) refinancing of existing debt (with anti-layering protections); (f) the Odeon Notes (capped at $400M, permanently reduced by any retirements); (g) the Exchangeable Notes and PIK Toggle notes; (h) a general basket of $30M. No preferred equity or disqualified equity may be issued. <strong>Why it matters:</strong> The Term Loan's debt incurrence baskets are tighter than those in the indentures, reflecting its senior priority position. The specific carve-outs for each tranche show how the capital structure was carefully negotiated. The permanent reduction mechanism on retired tranches prevents the Borrowers from recycling debt capacity.</p>
"""

TRANSLATIONS[("doc4", "6.02")] = """
<p><strong>Liens.</strong> No Borrower may create liens except for permitted liens. Key exceptions include: (a) liens securing this Credit Agreement (1L priority); (b) existing liens on Schedule 6.02; (c) liens on property acquired with purchase money debt; (d) junior liens securing the Muvico notes (capped); (e) general lien baskets. <strong>Why it matters:</strong> As the 1L tranche, the Credit Agreement's lien covenant is the strictest. It controls what additional secured debt can be issued and at what priority level. The specific carve-outs for the 1.25L, 1.5L, and 2L tranches in the Muvico structure were negotiated into this covenant.</p>
"""

TRANSLATIONS[("doc4", "6.03")] = """
<p><strong>Fundamental Changes; Holding Companies.</strong> The Borrowers may not merge, consolidate, or dissolve except within specified safe harbors: subsidiaries may merge with other subsidiaries (Loan Party must survive), may liquidate if in the Borrowers' best interest and not materially adverse to lenders, and may transfer assets to other Loan Parties. The Borrowers themselves may merge only if they are the surviving entity. <strong>Why it matters:</strong> This prevents the corporate structure from being reorganized in a way that moves assets outside the collateral package or changes the lien priority waterfall that lenders relied upon when underwriting.</p>
"""

TRANSLATIONS[("doc4", "6.04")] = """
<p><strong>Investments, Loans, Advances, Guarantees and Acquisitions.</strong> Investments are restricted to specified categories: Permitted Investments (cash equivalents), intercompany investments within the Muvico Group or AMC Group Loan Parties, investments in the Odeon Group (limited to ordinary course funding), Permitted Acquisitions (subject to ratio tests), a general basket of $17.5M, employee loans (capped at $1M), and Permitted Existing Debt Purchases. Critically, investments by the Muvico Group in the AMC Group require compliance with Section 6.12 restrictions. <strong>Why it matters:</strong> Investment restrictions prevent AMC from deploying capital outside the secured perimeter. The tight intercompany investment controls preserve the ring-fenced Muvico structure that protects 1L collateral.</p>
"""

TRANSLATIONS[("doc4", "6.05")] = """
<p><strong>Asset Sales.</strong> Borrowers may not sell, transfer, or dispose of assets except: (a) sales in the ordinary course of business; (b) dispositions of obsolete or worn-out equipment; (c) like-kind exchanges and property swaps; (d) dispositions to Borrowers or Subsidiaries; (e) Dispositions for Fair Market Value with 100% cash consideration for amounts over $1M; (f) a general basket of $5M. No Dispositions may be made to Affiliates. <strong>Why it matters:</strong> The Term Loan's asset sale restrictions are tighter than the indentures. The $1M cash-consideration threshold and $5M general basket are extremely restrictive for a company of AMC's size. The 100% cash requirement (vs. 75% in the indentures) and the affiliate sale prohibition ensure maximum value preservation for 1L lenders.</p>
"""

TRANSLATIONS[("doc4", "6.06")] = """
<p><strong>Sale Leasebacks.</strong> No Loan Party may enter into any sale-leaseback transaction except in connection with the original Transactions or under the Intercompany Agreements. <strong>Why it matters:</strong> Sale-leasebacks are a common way for companies to monetize owned real estate, but they effectively move assets out of the collateral pool and replace them with lease obligations. This near-total prohibition protects the 1L lenders' collateral base.</p>
"""

TRANSLATIONS[("doc4", "6.07")] = """
<p><strong>Negative Pledge.</strong> The Borrowers may not enter into any agreement that restricts the ability of Loan Parties to grant liens to the secured parties. Exceptions include restrictions imposed by law, restrictions in the Credit Agreement itself, and restrictions in other permitted debt documents. <strong>Why it matters:</strong> Without this provision, the Borrowers could enter contracts with third parties that effectively block the lenders from taking additional collateral or enforcing existing security interests.</p>
"""

TRANSLATIONS[("doc4", "6.08")] = """
<p><strong>Restricted Payments; Certain Payments of Indebtedness.</strong> Borrowers may not declare dividends, repurchase equity, or make payments on junior indebtedness except: (a) from the general basket (greater of $50M and 2% of Total Assets); (b) payments on junior debt using refinancing proceeds; (c) dividends paid in equity; (d) repurchases from employees (capped at $25M/year). <strong>Why it matters:</strong> This is tighter than the indenture restricted payment covenants. The Credit Agreement restricts not just equity distributions but also <em>payments on junior debt</em>, meaning AMC cannot voluntarily prepay the Muvico PIK notes or other junior tranches without fitting within these baskets.</p>
"""

TRANSLATIONS[("doc4", "6.09")] = """
<p><strong>Transactions with Affiliates.</strong> All affiliate transactions must be on terms no less favorable than arm's-length. Transactions above $25M require Board approval plus a fairness opinion from an independent financial advisor. Excluded from this restriction: compensation and benefits to officers/directors, transactions between Loan Parties, and transactions under existing agreements listed on Schedule 6.09.</p>
"""

# Section 6.10 [Reserved] — skipped

TRANSLATIONS[("doc4", "6.11")] = """
<p><strong>Designation of Senior Debt.</strong> The Borrowers may not designate any indebtedness other than the Loan Document Obligations as "Designated Senior Indebtedness" under any indenture or subordinated debt documentation. <strong>Why it matters:</strong> Designated Senior Indebtedness status enables payment blockage rights -- the ability to block interest payments on junior debt during a default. By reserving this designation exclusively for the Term Loan, the Borrowers ensure no other creditor can exercise this powerful enforcement tool.</p>
"""

TRANSLATIONS[("doc4", "6.12")] = """
<p><strong>Certain Covenants -- Muvico Ring-Fence and Intercompany Controls.</strong> This is one of the most important provisions in the Credit Agreement. Key restrictions: (a) Material Property may not be transferred outside its group (Muvico assets stay in Muvico, AMC assets stay in AMC); (b) no non-Loan Party may own Material Property; (c) Muvico may not transfer non-cash assets to the AMC Group; (d) Exchangeable Note premiums must be paid in equity, not cash; (e) Muvico must enforce Intercompany Agreements, maintain separate accounts and books, observe corporate formalities, and keep assets separate; (f) AMC must comply with Intercompany Agreements and may not amend them adversely; (g) no amendments to the Existing Credit Agreement or indentures that affect maturity, subordination, or intercreditor terms adversely. <strong>Why it matters:</strong> Section 6.12 is the legal foundation of the Muvico ring-fence. It prevents value leakage between entity groups and ensures the structural protections that 1L lenders relied upon cannot be eroded through intercompany maneuvering.</p>
"""

TRANSLATIONS[("doc4", "6.13")] = """
<p><strong>Cash Hoarding -- UNIQUE PROVISION.</strong> This is a covenant found <strong>only in the Credit Agreement</strong> and not in any of the indentures. It caps Available Cash at $240M for the AMC Group (excluding Odeon) and $150M for the Odeon Group, tested as of the last day of each calendar month. The Muvico Group must have received at least $58.5M of Available Cash at closing, and the AMC Group was required to transfer excess cash to Muvico by July 31, 2024. Transfers from Muvico to AMC/Odeon are restricted to ordinary-course operating costs and may not cause the caps to be exceeded. A 3-business-day cure period applies if caps are breached. After two consecutive breaches, bi-monthly testing kicks in. <strong>Why this is critical:</strong> Cash Hoarding prevents AMC from stockpiling cash while the Term Loan remains outstanding. In a distressed situation, companies often try to hoard cash to build a "war chest" for bankruptcy negotiations or to maintain leverage over creditors. This provision forces AMC to use excess liquidity to deleverage, directly benefiting Term Loan holders. <strong>With $417M of cash on the balance sheet</strong>, this covenant is actively relevant and likely constraining AMC's ability to accumulate additional cash reserves.</p>
"""

# ── Article VII — Events of Default ──────────────────────────────────────────

TRANSLATIONS[("doc4", "VII", "article")] = """
<p><strong>Events of Default</strong> in the Credit Agreement trigger acceleration of the $2B Term Loan. Because this is the 1L tranche, acceleration here would cascade through the entire capital structure via cross-default provisions in DOC 2, 3, 5, 6, and 7. The Term Loan's Events of Default are generally more sensitive (lower thresholds, shorter cure periods) than those in the indentures.</p>
"""

TRANSLATIONS[("doc4", "7.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay principal when due (no cure period); (b) failure to pay interest within 5 business days; (c) false representations/warranties (30-day cure); (d) covenant breaches (30-day cure for affirmative covenants; immediate for negative covenants and financial covenants, except Cash Hoarding which has a 3-business-day cure); (e) cross-default on Material Indebtedness (including the Existing Credit Agreement, indentures, and Odeon Notes); (f) involuntary bankruptcy proceedings (60-day stay); (g) voluntary bankruptcy (immediate); (h) judgment defaults over $50M unstayed for 60 days; (i) ERISA events; (j) collateral impairment; (k) guarantee challenges; (l) Change of Control; (m) loss of Senior Indebtedness status. Upon an Event of Default, the Required Lenders can accelerate all loans and terminate commitments. Bankruptcy triggers automatic acceleration. The Applicable Premium (make-whole or 4% prepayment premium) is payable even upon acceleration. <strong>Key differences from indentures:</strong> The Credit Agreement has (1) shorter cure periods (30 days vs. 60 days), (2) immediate default for negative covenant breaches (no cure), and (3) a Change of Control trigger. This makes the Term Loan the "hair trigger" in the capital structure.</p>
"""

# Section 7.02 [Reserved] — skipped

TRANSLATIONS[("doc4", "7.03")] = """
<p><strong>Application of Proceeds.</strong> After the exercise of remedies, all amounts collected are applied in accordance with the Pledge and Security Agreement's waterfall, which distributes proceeds to secured creditors based on the intercreditor priority structure. <strong>Why it matters:</strong> This section connects the Credit Agreement to the broader collateral enforcement framework and confirms that the 1L Term Loan sits at the top of the distribution waterfall.</p>
"""

# ── Article VIII — The Administrative Agent and Collateral Agent ─────────────

TRANSLATIONS[("doc4", "VIII", "article")] = """
<p><strong>The Administrative Agent and Collateral Agent (WSFS).</strong> This article governs the appointment, authority, rights, and protections of Wilmington Savings Fund Society, FSB as both Administrative Agent and Collateral Agent. Key provisions include: the Agent acts solely as a contractual representative (not a fiduciary); the Agent has broad exculpation from liability (except for gross negligence or willful misconduct); lenders cannot rely solely on the Agent's due diligence; the Agent can resign with 30 days notice; and the Agent has authority to release collateral and guarantees in connection with permitted transactions. <strong>Why it matters:</strong> The Agent is the central operational hub of the facility -- it processes payments, distributes information, and coordinates enforcement actions on behalf of all lenders.</p>
"""

TRANSLATIONS[("doc4", "8.01")] = """
<p><strong>Appointment and Authority.</strong> Each lender appoints WSFS as both Administrative Agent and Collateral Agent, authorizing it to take actions and exercise powers under the Loan Documents. The Agent relationship is administrative, not fiduciary. The Collateral Agent holds and enforces liens on behalf of all Secured Parties. <strong>Why it matters:</strong> The Agent acts at the Direction of the Required Lenders on most matters, meaning a majority of lenders (by outstanding principal) control enforcement decisions.</p>
"""

TRANSLATIONS[("doc4", "8.03")] = """
<p><strong>Exculpatory Provisions.</strong> The Agent is not liable for any action taken in good faith at the direction of the Required Lenders, and is protected from liability except for gross negligence, willful misconduct, or bad faith. The Agent has no duty to inquire into whether a Default exists. <strong>Why it matters:</strong> These broad protections mean lenders must actively monitor the credit themselves and cannot rely on the Agent to flag problems.</p>
"""

TRANSLATIONS[("doc4", "8.10")] = """
<p><strong>Collateral and Guaranty Matters.</strong> The Agent may release collateral and guarantees in connection with permitted transactions (asset sales, subsidiary dispositions) without lender consent. The Agent's lien automatically releases upon full payment of all obligations. <strong>Why it matters:</strong> This provision streamlines permitted transactions by eliminating the need for individual lender approvals for collateral releases, but it also means lenders must rely on the Agent to verify that the underlying transaction is actually permitted.</p>
"""

TRANSLATIONS[("doc4", "8.12")] = """
<p><strong>Erroneous Payments.</strong> If the Agent accidentally sends a payment to the wrong party, the recipient must return it promptly. The Agent can claw back erroneous payments without regard to whether the recipient knew the payment was in error. <strong>Why it matters:</strong> This protects the facility from operational mistakes in payment processing and ensures misdirected funds are recoverable.</p>
"""

# ── Article IX — Miscellaneous ───────────────────────────────────────────────

TRANSLATIONS[("doc4", "IX", "article")] = """
<p><strong>Miscellaneous</strong> contains the boilerplate provisions that govern how the agreement operates: notice procedures, amendment/waiver mechanics, expense indemnification, assignment/transfer rules, governing law (New York), jury trial waiver, and confidentiality. Despite being "boilerplate," several provisions are critically important, especially Section 9.02 (amendments and waivers) which determines how the agreement can be modified.</p>
"""

TRANSLATIONS[("doc4", "9.02")] = """
<p><strong>Waivers; Amendments.</strong> Most amendments require consent of the Required Lenders (majority by outstanding principal). However, certain "sacred rights" require unanimous lender consent: (a) reducing principal or interest rate; (b) extending maturity or payment dates; (c) releasing all or substantially all collateral or guarantees; (d) changing the Required Lender threshold; (e) changing the pro rata payment provisions. The Borrowers may amend solely with the Administrative Agent to cure errors, add guarantors/collateral, or make technical corrections. <strong>Why it matters:</strong> The sacred rights protections prevent a majority of lenders from forcing concessions on a minority. Every lender has veto power over reductions in payment amounts, extensions, or collateral releases -- the core economic terms of the deal.</p>
"""

TRANSLATIONS[("doc4", "9.03")] = """
<p><strong>Expenses; Indemnity; Damage Waiver.</strong> The Borrowers must pay all reasonable out-of-pocket expenses of the Agent (including legal fees) in connection with administration and enforcement. The Borrowers indemnify the Agent, lenders, and their affiliates against all losses arising from the loan or any environmental liability on the Borrowers' properties. <strong>Why it matters:</strong> In a workout or restructuring scenario, these provisions ensure the Agent and lenders' professional fees are paid by the Borrowers, not out of their own pockets.</p>
"""

TRANSLATIONS[("doc4", "9.04")] = """
<p><strong>Successors and Assigns.</strong> Lenders may assign their loans with consent of the Administrative Agent (and the Borrowers if no Event of Default exists), subject to minimum assignment amounts of $1M. Assignments are recorded in the Agent's register. Sub-participations are permitted but the participant has no direct relationship with the Borrowers. <strong>Why it matters:</strong> Assignment provisions determine secondary market liquidity. The $1M minimum and consent requirements create some friction, but this is a broadly syndicated institutional term loan designed to trade.</p>
"""

TRANSLATIONS[("doc4", "9.09")] = """
<p><strong>Governing Law; Jurisdiction; Consent to Service of Process.</strong> The agreement is governed by New York law. All parties submit to jurisdiction in New York state and federal courts, and waive objections to venue. <strong>Why it matters:</strong> New York law governs virtually all major US leveraged finance transactions, providing a deep body of case law and predictable outcomes for contract disputes.</p>
"""

TRANSLATIONS[("doc4", "9.15")] = """
<p><strong>Release of Liens and Guarantees.</strong> Liens and guarantees automatically release when: (a) all obligations are paid in full; (b) the relevant collateral is disposed of in a permitted transaction; (c) a subsidiary ceases to be a Loan Party in a permitted transaction; or (d) the release is approved by the Required Lenders. <strong>Why it matters:</strong> Automatic release upon permitted transactions is operationally necessary, but it means the collateral pool shrinks every time an asset sale occurs -- reinforcing the importance of the tight asset sale restrictions in Section 6.05.</p>
"""
