"""DOC 2 Translations — Muvico 15% PIK Senior Secured Notes due 2029

Issuer: Muvico, LLC
Priority: 1.5 Lien at Muvico
Principal: ~$857M
Rate: 7.5% base + leverage grid up to 15% total (cash + PIK)
Trustee: CSC Delaware Trust Company
"""

TRANSLATIONS = {}

# ── Article I — Definitions and Incorporation by Reference ────────────────────

TRANSLATIONS[("doc2", "I", "article")] = """
<p><strong>Definitions and Rules of Construction.</strong> This article establishes the defined terms used throughout the indenture, rules of construction for interpreting the document, and provisions for Limited Condition Transactions and compliance determinations. Section 1.01 alone contains hundreds of defined terms that control how every other provision is interpreted. <strong>Why it matters:</strong> The definitions effectively set the boundaries for every covenant and restriction in the indenture; creative drafting of definitions (like "Permitted Investments" or "Permitted Liens") can dramatically expand or contract what the issuer is allowed to do.</p>
"""

TRANSLATIONS[("doc2", "1.03")] = """
<p><strong>Incorporation by Reference of Trust Indenture Act.</strong> Incorporates the applicable provisions of the Trust Indenture Act of 1939 (TIA) into this indenture. If any provision of this indenture conflicts with the TIA, the TIA controls. <strong>Why it matters:</strong> The TIA provides baseline federal protections for bondholders, including requirements around trustee independence, reporting, and holder rights that cannot be contracted away.</p>
"""

TRANSLATIONS[("doc2", "1.04")] = """
<p><strong>Rules of Construction.</strong> Sets standard interpretive rules: "or" is not exclusive, "including" means "including without limitation," references to agreements mean as amended, and accounting terms follow GAAP unless otherwise defined. <strong>Why it matters:</strong> These seemingly boilerplate provisions prevent disputes over basic interpretation and ensure that defined terms take precedence over their ordinary meanings.</p>
"""

TRANSLATIONS[("doc2", "1.05")] = """
<p><strong>Limited Condition Transactions.</strong> When the Company enters into a transaction whose consummation is conditioned on events outside its control (like an acquisition), compliance with financial tests can be measured at the time of signing rather than closing. <strong>Why it matters:</strong> This gives Muvico flexibility to commit to acquisitions or investments without the risk that market fluctuations between signing and closing would cause a technical covenant breach.</p>
"""

TRANSLATIONS[("doc2", "1.06")] = """
<p><strong>Certain Compliance Determinations.</strong> Allows the Company to designate or reclassify items under multiple permitted baskets simultaneously and to redesignate amounts between baskets after the fact, subject to compliance at the time of redesignation. <strong>Why it matters:</strong> This provides significant flexibility for the issuer to manage covenant headroom, effectively allowing it to shift transactions between different permitted categories to optimize compliance.</p>
"""

# ── Article II — The Notes ────────────────────────────────────────────────────

TRANSLATIONS[("doc2", "II", "article")] = """
<p><strong>The Notes</strong> covers the mechanics of the notes themselves: issuance, form, authentication, transfer, interest computation, and the critical PIK interest mechanism. The aggregate principal amount is unlimited, meaning Muvico can issue Additional Notes subject to covenant compliance. Interest is computed on a 360-day year basis. <strong>Why it matters:</strong> The PIK interest provisions in Section 2.14 are the engine that allows Muvico's debt to compound when leverage is high, increasing the principal amount of outstanding notes without any cash payment.</p>
"""

TRANSLATIONS[("doc2", "2.01")] = """
<p><strong>Amount of Notes; Issuable in Series.</strong> The aggregate principal amount of Notes that may be issued is unlimited. Additional Notes may be issued without holder consent, subject to compliance with the debt incurrence and lien covenants. All Notes form a single class for voting, amendments, and redemptions. The initial issuance was $856,964,000. <strong>Why it matters:</strong> The ability to issue Additional Notes means the outstanding principal can grow beyond the initial $857M, diluting existing holders' recovery in a restructuring unless the incurrence tests prevent it.</p>
"""

TRANSLATIONS[("doc2", "2.02")] = """
<p><strong>Form and Dating.</strong> Notes are issued in registered form, substantially in the form set out in Exhibit A. Notes offered under Rule 144A and Regulation S have specific transfer restriction legends. <strong>Why it matters:</strong> This is largely procedural, but the transfer restrictions affect secondary market liquidity for these notes.</p>
"""

TRANSLATIONS[("doc2", "2.03")] = """
<p><strong>Execution and Authentication.</strong> Notes must be signed by an Officer of the Company and authenticated by the Trustee to be valid. The Trustee may appoint authenticating agents. PIK Notes require an Authentication Order from the Company. <strong>Why it matters:</strong> Authentication by the Trustee is the gatekeeper that ensures only properly authorized notes enter circulation, including any PIK Notes that increase outstanding principal.</p>
"""

TRANSLATIONS[("doc2", "2.04")] = """
<p><strong>Registrar and Paying Agent.</strong> The Company must maintain a Registrar (for tracking ownership and transfers) and a Paying Agent (for distributing payments). CSC Delaware Trust Company serves as both initially. The Company can change these agents without prior notice to holders. <strong>Why it matters:</strong> The Paying Agent holds funds in trust for noteholders, so its proper functioning is essential for timely interest and principal payments.</p>
"""

TRANSLATIONS[("doc2", "2.05")] = """
<p><strong>Paying Agent To Hold Money and PIK Notes in Trust.</strong> By 11:00 AM New York time on any payment date, the Company must deposit sufficient funds with the Paying Agent. For PIK interest, the Company must deliver written direction to increase the Global Note principal or issue PIK Notes in certificated form. The Paying Agent holds these amounts in trust for holders. <strong>Why it matters:</strong> This is the operational mechanism for PIK interest -- rather than paying cash, the Company increases the principal amount of the outstanding notes, compounding the debt.</p>
"""

TRANSLATIONS[("doc2", "2.06")] = """
<p><strong>Holder Lists.</strong> The Trustee must maintain a current list of noteholder names and addresses, complying with TIA Section 312(a). If the Trustee is not the Registrar, the Company must furnish updated lists at least 5 business days before each interest payment date. <strong>Why it matters:</strong> Accurate holder lists are essential for sending required notices (redemption, default, consent solicitations) and for holders to communicate with each other regarding their rights.</p>
"""

TRANSLATIONS[("doc2", "2.07")] = """
<p><strong>Replacement Notes.</strong> If a note is mutilated, lost, destroyed, or wrongfully taken, the Company will issue a replacement upon satisfaction of UCC Section 8-405 requirements. The holder may need to provide an indemnity bond. <strong>Why it matters:</strong> This is a standard protective provision ensuring holders are not permanently harmed by physical loss of their securities.</p>
"""

TRANSLATIONS[("doc2", "2.08")] = """
<p><strong>Outstanding Notes.</strong> All Notes authenticated by the Trustee are considered outstanding except those canceled, delivered for cancellation, or paid in full. A note held by the Company or an affiliate does not cease to be outstanding. <strong>Why it matters:</strong> The definition of "outstanding" determines voting power for consents, amendments, and acceleration decisions. Notes held by the issuer still count as outstanding but may be disregarded for voting purposes under Section 13.06.</p>
"""

TRANSLATIONS[("doc2", "2.09")] = """
<p><strong>Temporary Notes.</strong> The Company may issue temporary notes until definitive notes are ready. Temporary notes are exchangeable for definitive notes without charge. Holders of temporary notes have the same rights as holders of definitive notes. <strong>Why it matters:</strong> This is a standard administrative provision ensuring there is no gap in holder rights during the transition from temporary to permanent securities.</p>
"""

TRANSLATIONS[("doc2", "2.10")] = """
<p><strong>Cancellation.</strong> The Company may deliver Notes to the Trustee for cancellation at any time. All notes surrendered for transfer, exchange, payment, or cancellation must be canceled by the Trustee. The Company may not issue new Notes to replace redeemed, paid, or canceled notes (except for transfers/exchanges). <strong>Why it matters:</strong> This prevents the Company from re-issuing notes that have been retired, ensuring that redemptions and repurchases actually reduce the outstanding debt.</p>
"""

TRANSLATIONS[("doc2", "2.11")] = """
<p><strong>Defaulted Interest.</strong> If the Company defaults on an interest payment, it must pay the defaulted interest plus interest on the defaulted amount at the note rate. The Trustee sets a Special Record Date and Special Interest Payment Date (at least 30 days after notice). <strong>Why it matters:</strong> This compounds the cost of a missed interest payment, creating an additional financial penalty that incentivizes the Company to cure payment defaults quickly.</p>
"""

TRANSLATIONS[("doc2", "2.12")] = """
<p><strong>CUSIP Numbers or ISINs.</strong> The Company may use CUSIP or ISIN numbers on the Notes and in redemption notices. Neither the Company nor the Trustee is responsible for defects in these identification numbers. <strong>Why it matters:</strong> A purely administrative provision ensuring that standard securities identification is used for clearing and settlement, while protecting parties from liability for identification number errors.</p>
"""

TRANSLATIONS[("doc2", "2.13")] = """
<p><strong>Computation of Interest.</strong> Interest is computed on a 360-day year of twelve 30-day months. <strong>Why it matters:</strong> The 30/360 day-count convention slightly increases the effective interest rate compared to an actual/365 calculation, which benefits noteholders.</p>
"""

TRANSLATIONS[("doc2", "2.14")] = """
<p><strong>Payment of Interest; Issuance of PIK Notes; Notice of PIK Interest.</strong> Notes bear interest at the Applicable Rate, payable semi-annually on June 15 and December 15. The Company may elect to pay the Additional Rate portion as PIK interest by delivering a PIK Election notice at least 15 days before the payment date. If no timely PIK Election is made, the Additional Rate is paid in cash. PIK interest is paid by increasing the Global Note principal amount or issuing certificated PIK Notes. <strong>Why it matters:</strong> This is the central mechanism of the leverage-based interest grid. At current ~19.4x Muvico leverage (Level 1), the Company pays 9% cash and 6% PIK, meaning the principal amount grows by 6% annually without any cash outflow. This compounding effect significantly increases the total debt burden over time.</p>
"""

# ── Article III — Redemption ──────────────────────────────────────────────────

TRANSLATIONS[("doc2", "III", "article")] = """
<p><strong>Redemption (optional and mandatory)</strong> governs how these notes can be repaid early. The issuer (Muvico) can voluntarily call notes, but must pay a premium. Mandatory redemption applies if certain excess proceeds thresholds are triggered by asset sales.</p>
"""

TRANSLATIONS[("doc2", "3.01")] = """
<p>The Company must notify the Trustee <strong>at least 10 days before</strong> any redemption date, specifying which notes and how many will be redeemed. This is a procedural guardrail ensuring the Trustee can prepare and distribute notices to holders.</p>
"""

TRANSLATIONS[("doc2", "3.02")] = """
<p>If less than all notes are redeemed, the Trustee selects which notes get called. Selection must be done <strong>pro rata, by lot, or by another fair method</strong>. This prevents the issuer from cherry-picking specific holders to redeem, protecting all noteholders equally.</p>
"""

TRANSLATIONS[("doc2", "3.03")] = """
<p>Redemption notices must be sent to holders <strong>at least 10 but not more than 60 days</strong> before the redemption date. The notice must state the redemption price, the date, and that interest stops accruing on the redemption date. Once mailed, the notes are irrevocably called (subject to conditions).</p>
"""

TRANSLATIONS[("doc2", "3.04")] = """
<p>Once a valid redemption notice is sent, notes called for redemption <strong>stop accruing interest</strong> on the redemption date. Holders must surrender their notes to receive the redemption price. This creates a hard deadline for holders - after the redemption date, their notes are effectively dead.</p>
"""

TRANSLATIONS[("doc2", "3.05")] = """
<p><strong>Deposit of Redemption Price.</strong> Before noon New York time on the redemption date, the Company must deposit with the Paying Agent sufficient funds to cover the redemption price plus accrued interest on all notes being redeemed. <strong>Why it matters:</strong> This ensures the Company has actually set aside the cash before the redemption takes effect, protecting holders from a redemption notice backed by insufficient funds.</p>
"""

TRANSLATIONS[("doc2", "3.06")] = """
<p><strong>Notes Redeemed in Part.</strong> If a note is only partially redeemed, the Company must issue a new note equal to the unredeemed portion. <strong>Why it matters:</strong> This ensures holders retain a valid security for any amount not redeemed, maintaining their rights on the remaining principal.</p>
"""

TRANSLATIONS[("doc2", "3.07")] = """
<p><strong>Mandatory Redemption.</strong> Unlike optional redemption, the Company is <strong>not required</strong> to make any scheduled mandatory sinking fund payments on these notes. This means there is no forced amortization - the full principal is due at maturity unless the Company chooses to redeem early or an event of default occurs. This is typical for high-yield PIK instruments where the issuer wants maximum flexibility to preserve cash.</p>
"""

# ── Article IV — Covenants ────────────────────────────────────────────────────

TRANSLATIONS[("doc2", "IV", "article")] = """
<p><strong>The Covenants</strong> are the core restrictions on what Muvico and AMC can do while these notes are outstanding. They limit new debt, restrict dividends and payments to equity holders, cap liens on assets, and control transactions with affiliates. For this instrument, the <strong>leverage-based interest rate grid</strong> is critical: the higher the Total Leverage Ratio, the more interest shifts from cash to PIK, growing the debt pile.</p>
<p>The interest rate structure is:
<strong>Base rate:</strong> 7.50% cash, plus incremental amounts based on leverage:
Level 1 (>= 7.50x leverage): +1.50% cash, +6.00% PIK = <strong>15% total</strong>;
Level 2 (6.50-7.50x): +2.375% cash, +2.375% PIK = <strong>12.25% total</strong>;
Level 3 (< 6.50x): +4.00% cash only = <strong>11.50% total</strong>.
At current ~19.4x Muvico leverage, these notes are firmly in Level 1, paying 9% cash + 6% PIK.</p>
"""

TRANSLATIONS[("doc2", "4.01")] = """
<p><strong>Payment of Notes.</strong> The Company must promptly pay principal, premium (if any), and interest on the Notes in immediately available funds on the dates specified. Both cash interest and PIK interest are considered paid when the Trustee or Paying Agent holds sufficient funds or has received the Authentication Order for PIK Notes. Interest on overdue principal accrues at the note rate. <strong>Why it matters:</strong> This is the fundamental payment obligation. For PIK notes, the Company can satisfy part of its interest obligation by increasing the principal amount rather than paying cash, but must still deliver the proper Authentication Order.</p>
"""

TRANSLATIONS[("doc2", "4.03")] = """
<p><strong>Payment of Taxes and Other Claims.</strong> AMC must cause each Subsidiary to pay tax obligations before they become delinquent, except where failure would not result in a Material Adverse Effect. <strong>Why it matters:</strong> Tax liens are typically senior to all other liens, so unpaid taxes could leapfrog these noteholders' security interest in the collateral.</p>
"""

TRANSLATIONS[("doc2", "4.04")] = """
<p><strong>Maintenance of Properties.</strong> AMC must keep all material property in good working order and condition (ordinary wear and tear excepted), except where failure would not have a Material Adverse Effect. <strong>Why it matters:</strong> Since these notes are secured by Muvico's theatre assets, the requirement to maintain those properties protects the collateral value that backs noteholders' recovery.</p>
"""

TRANSLATIONS[("doc2", "4.05")] = """
<p><strong>Limitation on Indebtedness</strong> restricts Muvico from taking on additional debt beyond specified baskets. The Company cannot incur new Indebtedness unless, after giving pro forma effect, the <strong>Fixed Charge Coverage Ratio</strong> is at least 2.00:1.00 (or another specified ratio). There are extensive carve-outs for: refinancing existing debt, capital leases, intercompany loans, and permitted incremental facilities. <strong>Why it matters:</strong> With current leverage at ~19.4x, Muvico is deeply restricted from incurring new debt outside the carved-out baskets. Any new financing would need to fit within specific exceptions rather than the general incurrence test.</p>
"""

TRANSLATIONS[("doc2", "4.06")] = """
<p><strong>Limitation on Restricted Payments</strong> prevents Muvico/AMC from paying dividends, buying back stock, or making distributions to equity holders while these notes are outstanding. The general basket requires the Company to satisfy a Coverage Ratio test and caps cumulative restricted payments at a builder basket that grows with 50% of cumulative Consolidated Net Income. <strong>Why it matters:</strong> This is a critical protection for noteholders - it prevents the company from bleeding cash out to shareholders while creditors remain at risk. Given AMC's distressed leverage, this covenant is likely already binding.</p>
"""

TRANSLATIONS[("doc2", "4.07")] = """
<p><strong>Limitation on Liens</strong> prevents Muvico from pledging its assets as collateral for other debt beyond what is already permitted. Permitted liens include: existing liens, liens securing the Term Loan and other first-priority debt, purchase money liens (capped), and general baskets for smaller amounts. <strong>Why it matters:</strong> Since these notes have 1.5L priority at Muvico (junior to the $2B Term Loan), this covenant prevents Muvico from creating additional senior or pari passu liens that would further dilute these noteholders' collateral position.</p>
"""

TRANSLATIONS[("doc2", "4.08")] = """
<p><strong>Limitation on Affiliate Transactions</strong> requires that any transaction between the Company and its affiliates be conducted on <strong>arm's-length terms</strong> (i.e., terms no less favorable than would be obtained from an unrelated third party). Transactions above $15 million require Board approval; transactions above $50 million require a fairness opinion or independent appraisal. <strong>Why it matters:</strong> This prevents AMC or insiders from extracting value from Muvico through sweetheart deals, management fees, or intercompany transfers that benefit equity at creditors' expense.</p>
"""

TRANSLATIONS[("doc2", "4.09")] = """
<p><strong>Negative Pledge</strong> prevents the Company from creating contractual restrictions on its subsidiaries' ability to pay dividends, make loans, or transfer assets upstream to the Company. Exceptions include restrictions in the Credit Agreement, restrictions under applicable law, customary provisions in joint venture or acquisition agreements, and restrictions in other permitted indebtedness. <strong>Why it matters:</strong> Without this protection, subsidiaries holding valuable assets could be contractually walled off, preventing cash from flowing up to service these notes.</p>
"""

TRANSLATIONS[("doc2", "4.10")] = """
<p><strong>Future Guarantors.</strong> AMC must cause any Subsidiary that guarantees Guarantee Reference Indebtedness (the Term Loan, Exchangeable Notes, or any debt over $150M) to also guarantee these Notes within 30 days. Similarly, any newly formed or acquired non-Excluded Subsidiary must provide a guarantee, execute a joinder to the Security Agreement, and join the applicable Intercreditor Agreements. <strong>Why it matters:</strong> This ensures that as the corporate structure evolves, noteholders maintain parity with other secured creditors in terms of guarantee coverage. If a new subsidiary guarantees the Term Loan, it must also guarantee these notes.</p>
"""

TRANSLATIONS[("doc2", "4.12")] = """
<p><strong>Provision of Financial Information.</strong> AMC must file with the SEC and provide to the Trustee and holders the same annual and quarterly reports required under Sections 13 and 15(d) of the Exchange Act. Additionally, the Company must furnish Rule 144A information to prospective investors and, within 15 business days of each interest period, provide the current Applicable Rate and Additional Rate with supporting public data. <strong>Why it matters:</strong> The obligation to disclose the current interest rate grid level is unique to this PIK instrument and allows holders to track whether the leverage-based rate is shifting between levels.</p>
"""

TRANSLATIONS[("doc2", "4.13")] = """
<p><strong>Statement as to Compliance.</strong> Within 5 days after delivering quarterly or annual financials, the Company must certify to the Trustee: (i) whether any Default has occurred, (ii) the current Total Leverage Ratio, and (iii) for Q1 and Q3 reports, the Applicable Rate for the next interest period. When a Default is continuing, the Company must notify the Trustee within 10 business days. <strong>Why it matters:</strong> The required disclosure of the Total Leverage Ratio and Applicable Rate gives holders transparency into which interest rate tier applies, directly affecting whether interest shifts from cash to PIK.</p>
"""

TRANSLATIONS[("doc2", "4.14")] = """
<p><strong>Waiver of Certain Covenants.</strong> Holders of a majority in aggregate principal amount may waive compliance with most covenants (Sections 4.03-4.10, 4.12(a), and 4.15-4.19) in any particular instance. The waiver applies only to the specific instance and does not broadly amend the covenant. <strong>Why it matters:</strong> This gives the Company a path to obtain relief from covenant restrictions without a full indenture amendment, but requires majority holder support, protecting minority holders from unilateral issuer action.</p>
"""

TRANSLATIONS[("doc2", "4.15")] = """
<p><strong>Sale Leasebacks.</strong> The Company and Guarantors may not enter into Sale Leaseback transactions except in connection with the original Transactions or under the Intercompany Agreements in effect on the Issue Date (or modifications that are not materially worse for holders). <strong>Why it matters:</strong> Sale-leasebacks could effectively strip collateral from the secured noteholders by selling theatre assets and replacing ownership with lease obligations. This tight restriction protects the collateral base.</p>
"""

TRANSLATIONS[("doc2", "4.16")] = """
<p><strong>Asset Sales</strong> restricts Muvico from selling assets unless: (1) the consideration is at least <strong>fair market value</strong>, (2) at least <strong>75% of consideration is cash or cash equivalents</strong>, and (3) Net Proceeds are applied within 365 days to either reinvest in the business or repay senior secured debt. If Net Proceeds exceed a threshold and are not applied, Muvico must make an <strong>Excess Proceeds Offer</strong> to repurchase notes at par. <strong>Why it matters:</strong> This prevents the company from selling off valuable theatre assets and using the cash for other purposes (like paying dividends or servicing junior debt) without first giving these noteholders a chance to be repaid.</p>
"""

TRANSLATIONS[("doc2", "4.17")] = """
<p><strong>After-Acquired Collateral.</strong> If AMC, Muvico, or any Guarantor creates a security interest on any property to secure Term Loan Obligations after the Issue Date, they must simultaneously grant a perfected security interest on that same property to secure these Notes, with the relative priority set forth in the Intercreditor Agreements. <strong>Why it matters:</strong> This prevents the Term Loan lenders from expanding their collateral base without these noteholders receiving the same coverage. Any new asset pledged to the 1L must also be pledged to the 1.5L.</p>
"""

TRANSLATIONS[("doc2", "4.19")] = """
<p><strong>Certain Covenants.</strong> This section imposes additional restrictions and requirements specific to the structure of the Muvico entity and its relationship with AMC and the broader corporate group. <strong>Why it matters:</strong> These supplemental covenants address structural nuances of the Muvico drop-down that are not covered by the standard high-yield covenant package.</p>
"""

# ── Article V — Fundamental Changes ──────────────────────────────────────────

TRANSLATIONS[("doc2", "V", "article")] = """
<p><strong>Fundamental Changes</strong> restricts Muvico from merging, consolidating, or selling all/substantially all of its assets unless the surviving entity assumes all obligations under the indenture. The successor must be a U.S.-organized entity and must deliver an officers' certificate and legal opinion confirming the transaction complies with the indenture. <strong>Why it matters:</strong> This prevents the company from restructuring itself out from under these debt obligations through a corporate reorganization.</p>
"""

TRANSLATIONS[("doc2", "5.01")] = """
<p><strong>Fundamental Changes; Holding Companies.</strong> Neither the Company nor any Guarantor may merge, consolidate, or sell substantially all assets unless: (a) the surviving entity is organized in the US, (b) it expressly assumes all obligations under the Notes and Indenture, (c) no Default or Event of Default results, and (d) the Company delivers required certificates and opinions. <strong>Key difference from other docs:</strong> This provision also addresses the holding company structure, requiring Centertainment Development LLC to maintain its position as the direct or indirect parent.</p>
"""

# ── Article VI — Defaults and Remedies ────────────────────────────────────────

TRANSLATIONS[("doc2", "VI", "article")] = """
<p><strong>Events of Default</strong> lists the trigger events that allow noteholders to accelerate the debt (demand immediate full repayment). These include: failure to pay interest/principal when due, breach of covenants (with cure periods), cross-default to other material debt ($50M+), bankruptcy filings, and judgment defaults. Upon acceleration, the full principal plus accrued interest becomes immediately due and payable.</p>
"""

TRANSLATIONS[("doc2", "6.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay interest for 30 days; (b) failure to pay principal when due; (c) failure to comply with covenant obligations (with 60-day cure period for most covenants after written notice); (d) default on other Indebtedness of $50 million or more; (e) one or more judgments for $50 million+ that remain unstayed for 60 days; (f) certain security interest impairments; (g) bankruptcy or insolvency events. <strong>Critical note:</strong> Cross-default at $50M means a default on the $2B Term Loan (DOC 4) would immediately trigger an Event of Default here, creating cascading acceleration across the entire capital structure.</p>
"""

TRANSLATIONS[("doc2", "6.02")] = """
<p><strong>Acceleration; Rescission and Annulment.</strong> Upon an Event of Default (other than bankruptcy), holders of at least 30% in principal amount or the Trustee may declare all Notes immediately due. Bankruptcy Events of Default trigger automatic acceleration. A majority of holders can rescind acceleration if the Company cures the defaults and pays overdue amounts. Critically, upon acceleration, the Company must pay the <strong>Applicable Premium</strong> as if the notes were optionally redeemed, creating a make-whole-like penalty. <strong>Why it matters:</strong> The Applicable Premium on acceleration is unusual and creates a significant additional cost for the Company in a default scenario, effectively treating acceleration as an early redemption event.</p>
"""

TRANSLATIONS[("doc2", "6.03")] = """
<p><strong>Other Remedies.</strong> If an Event of Default is continuing, the Trustee may pursue any available remedy to collect principal and interest or enforce the indenture's provisions. <strong>Why it matters:</strong> This grants the Trustee broad authority to take enforcement action beyond just acceleration, including pursuing collateral remedies through the Security Documents.</p>
"""

TRANSLATIONS[("doc2", "6.04")] = """
<p><strong>Waiver of Past Defaults.</strong> Holders of a majority in principal amount may waive existing defaults and their consequences, except for defaults in payment of principal or interest, or defaults relating to provisions that require unanimous consent to amend. <strong>Why it matters:</strong> This allows the majority to give the Company a second chance after non-payment defaults, but protects every individual holder's right to receive payments when due.</p>
"""

TRANSLATIONS[("doc2", "6.05")] = """
<p><strong>Control by Majority.</strong> Holders of a majority in principal amount direct the time, method, and place of conducting proceedings for any available remedy. The Trustee may decline to follow directions that conflict with law or the indenture, or that would expose the Trustee to personal liability. <strong>Why it matters:</strong> In a contested restructuring, whoever controls the majority of notes controls the enforcement strategy, including whether to accelerate, foreclose on collateral, or negotiate.</p>
"""

TRANSLATIONS[("doc2", "6.06")] = """
<p><strong>Limitation on Suits.</strong> An individual holder may not pursue remedies unless: (a) the holder has given the Trustee written notice of a continuing Event of Default; (b) holders of at least 30% have requested the Trustee to act; (c) the Trustee has received satisfactory indemnity; and (d) the Trustee fails to act within 60 days. <strong>Why it matters:</strong> This prevents rogue holders from filing disruptive lawsuits and ensures enforcement actions are coordinated through the Trustee or directed by a significant group of holders.</p>
"""

TRANSLATIONS[("doc2", "6.07")] = """
<p><strong>Rights of Holders to Receive Payment.</strong> Notwithstanding all other provisions, every holder has the absolute right to bring suit to enforce payment of principal and interest when due. This right cannot be impaired without the holder's consent. <strong>Why it matters:</strong> This is the one right that cannot be overridden by majority action -- each individual holder can always sue for payment when due, providing a baseline protection even for minority holders.</p>
"""

TRANSLATIONS[("doc2", "6.08")] = """
<p><strong>Collection Suit by Trustee.</strong> If a payment default occurs (principal or interest), the Trustee may recover judgment in its own name for the entire amount due. <strong>Why it matters:</strong> This allows the Trustee to pursue collection on behalf of all holders collectively, which is more efficient than individual holder lawsuits.</p>
"""

TRANSLATIONS[("doc2", "6.09")] = """
<p><strong>Trustee May File Proofs of Claim.</strong> The Trustee is authorized to file proofs of claim in bankruptcy proceedings and to collect and distribute amounts recovered. <strong>Why it matters:</strong> In a Chapter 11 filing, the Trustee acts as the representative for all noteholders, filing claims and participating in the bankruptcy process on their behalf.</p>
"""

TRANSLATIONS[("doc2", "6.10")] = """
<p><strong>Priorities.</strong> Subject to the Intercreditor Agreements, money collected by the Trustee after an Event of Default is distributed in the following order: (1) Trustee fees, expenses, and compensation; (2) amounts owed to holders for principal, premium, and interest; (3) the remainder to the Company. <strong>Why it matters:</strong> The Trustee's priority lien on collections means administrative costs are paid first, but the Intercreditor Agreements may further subordinate distributions to senior lien holders.</p>
"""

TRANSLATIONS[("doc2", "6.11")] = """
<p><strong>Undertaking for Costs.</strong> In any lawsuit by a holder or the Trustee, the court may require the filing party to post an undertaking to cover litigation costs. A holder need not comply if the suit is for payment of overdue principal or interest. <strong>Why it matters:</strong> This discourages frivolous litigation while preserving the right to sue for amounts actually owed.</p>
"""

TRANSLATIONS[("doc2", "6.12")] = """
<p><strong>Waiver of Stay or Extension Laws.</strong> The Company waives any benefit from laws that would delay or prevent enforcement of the indenture after an Event of Default. <strong>Why it matters:</strong> This strengthens creditor remedies by preventing the Company from using debtor-protective state laws to delay enforcement, though bankruptcy law may still impose an automatic stay.</p>
"""

# ── Article VII — Trustee ─────────────────────────────────────────────────────

TRANSLATIONS[("doc2", "VII", "article")] = """
<p><strong>The Trustee</strong> article defines the role, duties, rights, and protections of CSC Delaware Trust Company as Trustee. The Trustee's duties are strictly limited to those expressly stated in the indenture -- no implied fiduciary duties. During a default, the Trustee must act with the care of a prudent person; otherwise, it performs only specified duties. <strong>Why it matters:</strong> The Trustee is the key intermediary between holders and the issuer, but its limited duties mean holders must actively monitor and direct the Trustee rather than relying on it to independently protect their interests.</p>
"""

TRANSLATIONS[("doc2", "7.01")] = """
<p><strong>Duties of Trustee.</strong> During an Event of Default, the Trustee must exercise its powers with the care of a prudent person. Outside of defaults, it performs only duties expressly stated in the indenture. The Trustee is not liable for good faith errors in judgment and may rely on certificates and opinions without independent investigation. <strong>Why it matters:</strong> The heightened duty of care during defaults means the Trustee becomes more active when it matters most, but its limited pre-default obligations mean holders should not expect proactive monitoring.</p>
"""

TRANSLATIONS[("doc2", "7.02")] = """
<p><strong>Rights of Trustee.</strong> The Trustee may rely on documents believed genuine, may require Officer's Certificates or Opinions of Counsel before acting, may act through agents, and is not liable for good faith actions within its authority. It has no obligation to act at holder direction unless given satisfactory indemnity. <strong>Why it matters:</strong> These broad protections ensure the Trustee can function without fear of personal liability, but also mean holders must provide indemnification before the Trustee will take enforcement action.</p>
"""

TRANSLATIONS[("doc2", "7.03")] = """
<p><strong>Individual Rights of Trustee.</strong> The Trustee may personally own Notes and deal with the Company with the same rights as if it were not Trustee, subject to TIA Sections 7.10 and 7.11 on eligibility and preferential collection. <strong>Why it matters:</strong> This allows the Trustee institution to maintain a normal banking relationship with the Company, which is practical but creates potential conflicts of interest.</p>
"""

TRANSLATIONS[("doc2", "7.04")] = """
<p><strong>Trustee's Disclaimer.</strong> The Trustee makes no representation about the validity of the indenture or notes, is not responsible for how the Company uses note proceeds, and is not accountable for any Company statements except the Trustee's own authentication certificate. <strong>Why it matters:</strong> Holders cannot rely on the Trustee's involvement as an endorsement of the investment quality or accuracy of the offering documents.</p>
"""

TRANSLATIONS[("doc2", "7.05")] = """
<p><strong>Notice of Defaults.</strong> If a Default is known to a Trust Officer, the Trustee must notify holders within 45 days. For non-payment defaults, the Trustee may withhold notice if its Trust Officers determine in good faith that withholding is in holders' interests. <strong>Why it matters:</strong> The Trustee's discretion to withhold notice of non-payment defaults could delay holder awareness of covenant breaches, making active monitoring by holders themselves important.</p>
"""

TRANSLATIONS[("doc2", "7.06")] = """
<p><strong>Reports by Trustee to Holders.</strong> The Trustee must mail annual reports to holders by March 31 each year complying with TIA Section 313(a), and also file copies with the SEC and any stock exchange. <strong>Why it matters:</strong> These reports provide holders with basic information about the Trustee's administration of the trust, but the reporting is limited to TIA requirements and does not include substantive analysis of the Company's financial condition.</p>
"""

TRANSLATIONS[("doc2", "7.07")] = """
<p><strong>Compensation and Indemnity.</strong> The Company must pay the Trustee's compensation (not limited by trust law), reimburse all documented expenses, and indemnify against losses incurred in administering the trust (except for willful misconduct or gross negligence). The Trustee has a lien on all money or property it holds (other than amounts held in trust for specific payments) to secure these obligations. In bankruptcy, Trustee expenses constitute administrative expenses. <strong>Why it matters:</strong> The Trustee's prior lien and administrative expense priority in bankruptcy means its fees are paid ahead of noteholders in a distressed scenario.</p>
"""

TRANSLATIONS[("doc2", "7.08")] = """
<p><strong>Replacement of Trustee.</strong> The Trustee may resign by notifying the Company. A majority of holders may remove the Trustee. The Company must remove the Trustee if it fails eligibility requirements, becomes insolvent, or is otherwise incapable of acting. If no successor is appointed within 30 days, the Company appoints one; failing that, any holder who has held for 6+ months may petition a court. <strong>Why it matters:</strong> The ability to remove and replace the Trustee gives holders recourse if the Trustee becomes unresponsive or conflicted.</p>
"""

TRANSLATIONS[("doc2", "7.09")] = """
<p><strong>Successor Trustee by Merger.</strong> If the Trustee merges or transfers its trust business, the surviving entity automatically becomes the successor Trustee without any additional action. <strong>Why it matters:</strong> This ensures continuity of the trust relationship even if the Trustee institution undergoes corporate changes.</p>
"""

TRANSLATIONS[("doc2", "7.10")] = """
<p><strong>Eligibility; Disqualification.</strong> The Trustee must at all times satisfy TIA Section 310(a) requirements, which include being a corporation organized under US law with combined capital and surplus of at least $150,000. <strong>Why it matters:</strong> These minimum requirements ensure the Trustee is a substantial, regulated institution capable of fulfilling its obligations.</p>
"""

TRANSLATIONS[("doc2", "7.11")] = """
<p><strong>Preferential Collection of Claims Against Company.</strong> The Trustee must comply with TIA Section 311(a), which restricts the Trustee from preferentially collecting its own claims against the Company at the expense of noteholders. <strong>Why it matters:</strong> This prevents the Trustee from using its position to collect debts the Company owes it personally ahead of noteholder claims.</p>
"""

# ── Article VIII — Discharge of Indenture; Defeasance ────────────────────────

TRANSLATIONS[("doc2", "VIII", "article")] = """
<p><strong>Discharge and Defeasance</strong> provides mechanisms for the Company to terminate its obligations under the indenture. Satisfaction and discharge occurs when all notes are paid or delivered for cancellation. Legal defeasance releases the Company from all obligations by depositing sufficient cash or Government Securities with the Trustee to pay all future amounts due. Covenant defeasance releases only from certain covenants while keeping the notes outstanding. <strong>Why it matters:</strong> Defeasance is extremely unlikely for a distressed issuer like Muvico because it requires depositing enough risk-free assets to pay all future principal and interest -- something only well-capitalized issuers can afford.</p>
"""

TRANSLATIONS[("doc2", "8.01")] = """
<p><strong>Discharge of Liability on Notes; Defeasance.</strong> The indenture is discharged when all notes are canceled or the Company deposits sufficient cash/Government Securities to pay all amounts due. The Company has two defeasance options: (1) legal defeasance, which releases all obligations and releases collateral liens, or (2) covenant defeasance, which releases obligations under Sections 4.03-4.10, 4.12, 4.13, 4.15-4.17, 4.19, and parts of Section 5.01. Certain obligations (Sections 2.03-2.09, 4.01, 7.07, 7.08, and 8.03-8.06) survive until notes are paid in full. <strong>Why it matters:</strong> Legal defeasance effectively makes the notes risk-free by substituting government securities for the Company's credit, while covenant defeasance gives the Company freedom from restrictions while keeping the notes outstanding.</p>
"""

TRANSLATIONS[("doc2", "8.02")] = """
<p><strong>Conditions to Defeasance.</strong> To exercise either defeasance option, the Company must: (a) irrevocably deposit sufficient cash or Government Securities with the Trustee; (b) for legal defeasance, deliver an opinion that an IRS ruling or change in tax law means holders will not recognize income; (c) for covenant defeasance, deliver an opinion of no adverse tax consequences; (d) have no Default occurring; and (e) deliver Officer's Certificate and Opinion of Counsel confirming compliance. <strong>Why it matters:</strong> The IRS ruling requirement for legal defeasance is a very high bar, making it nearly impossible unless tax law changes specifically permit it.</p>
"""

TRANSLATIONS[("doc2", "8.03")] = """
<p><strong>Application of Trust Money.</strong> The Trustee holds deposited money and Government Securities in trust and applies them through the Paying Agent to pay principal and interest on the Notes. <strong>Why it matters:</strong> Once funds are deposited for defeasance, they are irrevocably dedicated to paying noteholders and cannot be clawed back by the Company or its other creditors.</p>
"""

TRANSLATIONS[("doc2", "8.04")] = """
<p><strong>Repayment to Company.</strong> The Trustee must return any excess money or securities to the Company after all holders are paid. Money unclaimed for two years reverts to the Company, and holders must then look to the Company as general creditors. <strong>Why it matters:</strong> The two-year reversion provision means holders who fail to claim payments eventually lose their priority position and become unsecured creditors of the Company.</p>
"""

TRANSLATIONS[("doc2", "8.05")] = """
<p><strong>Indemnity for Government Obligations.</strong> The Company must indemnify the Trustee against any taxes or charges assessed on deposited Government Securities or their proceeds (other than charges that are legally the holders' responsibility). <strong>Why it matters:</strong> This ensures the defeasance trust is not eroded by unexpected tax liabilities on the deposited securities.</p>
"""

TRANSLATIONS[("doc2", "8.06")] = """
<p><strong>Reinstatement.</strong> If the Trustee or Paying Agent is prevented by legal proceedings from applying defeasance funds, the Company's obligations under the indenture revive as if no deposit occurred. If the Company makes payments during reinstatement, it is subrogated to holders' rights to receive those amounts from the trust. <strong>Why it matters:</strong> This protects holders from losing their contractual rights if a court order prevents the defeasance trust from functioning as intended.</p>
"""

# ── Article IX — Amendments ───────────────────────────────────────────────────

TRANSLATIONS[("doc2", "IX", "article")] = """
<p><strong>Amendments</strong> governs how the indenture, notes, guarantees, and security documents can be modified. Certain technical amendments require no holder consent. Substantive amendments require consent of a majority in principal amount. Certain fundamental terms (payment amounts, dates, currency, subordination, amendment thresholds) require unanimous consent. <strong>Why it matters:</strong> The amendment provisions determine the balance of power between the issuer and holders in a restructuring. The distinction between majority-consent and unanimous-consent provisions is critical -- the Company can modify most terms with majority support, but cannot impair core payment rights without every holder's agreement.</p>
"""

TRANSLATIONS[("doc2", "9.01")] = """
<p><strong>Without Consent of Holders.</strong> The Company, Guarantors, Trustee, and Notes Collateral Agent may amend the indenture without holder consent to: cure ambiguities or defects, comply with successor entity requirements, provide for uncertificated notes, add guarantors or collateral, secure the notes further, add covenants for holder benefit, satisfy SEC requirements, conform to the offering document, or make changes that do not materially adversely affect holders. <strong>Why it matters:</strong> These carve-outs give the Company significant flexibility to make administrative and protective changes, but the "no material adverse effect" standard is the catch-all that limits the Company's unilateral modification power.</p>
"""

TRANSLATIONS[("doc2", "9.02")] = """
<p><strong>With Consent of Holders.</strong> Amendments requiring majority holder consent can modify most terms of the indenture. However, without unanimous consent, no amendment may: reduce principal or interest rates, extend payment dates, change payment currency, impair the right to sue for payment, subordinate the notes or liens, release all or substantially all collateral or guarantees, or reduce the percentage needed for amendments or waivers. <strong>Why it matters:</strong> The sacred rights (payment terms, lien priority, guarantee protection) that require unanimous consent are the bedrock protections for minority holders, preventing a majority from sacrificing these fundamental terms in a restructuring deal with the issuer.</p>
"""

TRANSLATIONS[("doc2", "9.03")] = """
<p><strong>Actions Taken by Initial Purchasers.</strong> Provides that actions may be taken by the initial purchasers in connection with the original transaction. <strong>Why it matters:</strong> This provision facilitated the original note offering mechanics and is largely historical in nature once the notes are trading in the secondary market.</p>
"""

TRANSLATIONS[("doc2", "9.04")] = """
<p><strong>Revocation and Effect of Consents and Waivers.</strong> A holder may revoke a consent or waiver at any time before it becomes effective. After a consent or waiver becomes effective, it binds every holder of the notes, including subsequent purchasers. <strong>Why it matters:</strong> Once an amendment or waiver is adopted with sufficient votes, all holders are bound -- even those who voted against it -- which is critical in contested restructuring situations.</p>
"""

TRANSLATIONS[("doc2", "9.05")] = """
<p><strong>Notation on or Exchange of Notes.</strong> After an amendment or waiver, the Trustee may place a notation on the notes or require exchange for new notes reflecting the change. <strong>Why it matters:</strong> This is a procedural provision ensuring the physical or book-entry notes reflect any modifications, preventing confusion about which terms apply.</p>
"""

TRANSLATIONS[("doc2", "9.06")] = """
<p><strong>Trustee To Sign Amendments.</strong> The Trustee must sign any amendment authorized by this Article IX, provided it is indemnified and the amendment does not adversely affect the Trustee's rights, duties, or immunities. The Trustee may rely on an Opinion of Counsel that the amendment complies with the indenture. <strong>Why it matters:</strong> The Trustee's cooperation is required to effectuate amendments, but it cannot unreasonably refuse if the amendment is properly authorized.</p>
"""

# ── Article X — Reserved ─────────────────────────────────────────────────────

TRANSLATIONS[("doc2", "X", "article")] = """
<p><strong>Reserved.</strong> This article is intentionally left blank as a placeholder. <strong>Why it matters:</strong> Reserved articles are common in indentures to maintain consistent numbering across different issuances. No substantive provisions apply.</p>
"""

# ── Article XI — Guarantee ────────────────────────────────────────────────────

TRANSLATIONS[("doc2", "XI", "article")] = """
<p><strong>Guarantee</strong> establishes the framework for subsidiary guarantees of the Notes. Each Guarantor fully, unconditionally, and irrevocably guarantees all payment obligations under the indenture on a joint and several basis. The guarantees are guarantees of payment (not collection), meaning holders can pursue Guarantors directly without first exhausting remedies against Muvico. <strong>Why it matters:</strong> The guarantee structure provides noteholders with claims against multiple entities in the corporate group, not just Muvico. In a restructuring, the breadth of the guarantee pool directly affects recovery prospects.</p>
"""

TRANSLATIONS[("doc2", "11.01")] = """
<p><strong>Guarantee.</strong> Each Guarantor unconditionally and irrevocably guarantees, jointly and severally, all payment obligations under the Notes (including post-petition interest in bankruptcy). The guarantee is a guarantee of payment, not collection -- holders need not pursue the Company first. The guarantee survives extensions, renewals, and modifications of the obligations. <strong>Why it matters:</strong> Joint and several liability means any single Guarantor can be held responsible for the entire outstanding amount. The inclusion of post-petition interest is significant because it strengthens the noteholders' claim in bankruptcy beyond what unsecured creditors receive.</p>
"""

TRANSLATIONS[("doc2", "11.02")] = """
<p><strong>Execution and Delivery.</strong> Each Guarantor executes the indenture (or a supplemental indenture for future guarantors substantially in the form of Exhibit C). The guarantee remains effective regardless of whether it is endorsed on the physical notes. <strong>Why it matters:</strong> This ensures the guarantee is enforceable even without physical notation, preventing technical challenges to guarantee validity.</p>
"""

TRANSLATIONS[("doc2", "11.03")] = """
<p><strong>Limitation on Liability; Termination, Release and Discharge.</strong> Each Guarantor's obligations are limited to the maximum amount that would not constitute a fraudulent conveyance. Guarantors are released upon: (a) defeasance or discharge, (b) merger into the Company or another Guarantor, (c) becoming an Excluded Subsidiary (with conditions), (d) release from all Guarantee Reference Indebtedness guarantees, or (e) as permitted by Article IX. No Guarantor may be released if it holds material intellectual property. <strong>Why it matters:</strong> The fraudulent conveyance savings clause protects the guarantee from being voided but may reduce the guaranteed amount. The IP retention requirement prevents AMC from stripping valuable brand assets into a released entity.</p>
"""

TRANSLATIONS[("doc2", "11.04")] = """
<p><strong>Right of Contribution.</strong> Guarantors that pay more than their proportionate share may seek contribution from the Company or other Guarantors. This right does not limit obligations to the Trustee and holders. <strong>Why it matters:</strong> Contribution rights create incentives for equitable sharing among Guarantors, but holders' claims always take priority over inter-Guarantor disputes.</p>
"""

TRANSLATIONS[("doc2", "11.05")] = """
<p><strong>No Subrogation.</strong> Guarantors cannot seek subrogation, contribution, or reimbursement from the Company until all Guarantor Obligations are paid in full. Any amounts received on account of subrogation must be held in trust and immediately turned over to the Trustee. <strong>Why it matters:</strong> This prevents Guarantors from competing with noteholders for recovery by asserting subrogation claims against the Company. All cash flows to noteholders first.</p>
"""

# ── Article XII — Collateral ─────────────────────────────────────────────────

TRANSLATIONS[("doc2", "XII", "article")] = """
<p><strong>Collateral</strong> governs the security interests that back these notes, including the Security Documents, Intercreditor Agreements, and the Notes Collateral Agent's role. The notes are secured by liens on Muvico's assets at the 1.5L priority level (junior to the $2B Term Loan at 1L and the 1.25L Exchangeable Notes, but senior to the AMC 7.5% Notes at 2L). <strong>Why it matters:</strong> The collateral provisions and their interaction with multiple Intercreditor Agreements determine the actual recovery waterfall in a distressed scenario. The Notes Collateral Agent acts on behalf of holders but is subject to the directions of the Controlling Collateral Agent (the 1L agent) on many matters.</p>
"""

TRANSLATIONS[("doc2", "12.01")] = """
<p><strong>Security Documents.</strong> The Notes are secured by the Collateral as defined in the Security Documents, subject to the Intercreditor Agreements. The Notes Collateral Agent holds the Collateral in trust for holders. Each holder, by accepting a Note, consents to the Security Documents and all Intercreditor Agreements (including the AMC Group First Lien Pari Passu, Muvico Group First Lien/Second Lien, First Lien Priority, and 1.25 Lien Priority Intercreditor Agreements). If an Intercreditor Agreement conflicts with a Security Document, the Intercreditor Agreement controls. <strong>Why it matters:</strong> The primacy of Intercreditor Agreements means these 1.5L holders' rights are subordinated to higher-priority lien holders in critical matters like foreclosure, collateral releases, and payment distributions.</p>
"""

TRANSLATIONS[("doc2", "12.02")] = """
<p><strong>Release of Collateral.</strong> Collateral is automatically released from liens upon: permitted sale or disposition, release of a Guarantor, dissolution of a subsidiary, conversion to Excluded Asset status, or enforcement by the Controlling Collateral Agent. All liens terminate upon full payment, satisfaction and discharge, or as provided in the Intercreditor Agreements. <strong>Why it matters:</strong> The Controlling Collateral Agent (the 1L Term Loan agent) can release collateral during enforcement without these noteholders' consent, which is a significant risk factor for the 1.5L position.</p>
"""

TRANSLATIONS[("doc2", "12.03")] = """
<p><strong>Suits to Protect the Collateral.</strong> The Trustee may direct the Notes Collateral Agent to enforce Security Documents and collect amounts payable. The Trustee may institute proceedings to prevent impairment of the Collateral, but has no obligation to do so. <strong>Why it matters:</strong> The Trustee's discretion (not obligation) to protect collateral means holders must actively direct the Trustee and provide indemnification if they want enforcement action taken.</p>
"""

TRANSLATIONS[("doc2", "12.04")] = """
<p><strong>Authorization of Receipt of Funds.</strong> Subject to the Intercreditor Agreements, the Trustee is authorized to receive funds distributed under the Security Documents and further distribute them to holders. <strong>Why it matters:</strong> The Intercreditor Agreements may require that 1L holders are paid in full before any distributions flow to these 1.5L holders.</p>
"""

TRANSLATIONS[("doc2", "12.05")] = """
<p><strong>Purchaser Protected.</strong> Good faith purchasers of released collateral are not required to verify the authority of the Notes Collateral Agent or inquire into whether release conditions are satisfied. <strong>Why it matters:</strong> This protects the marketability of assets sold from the collateral pool, ensuring buyers can transact without concern about the validity of the release.</p>
"""

TRANSLATIONS[("doc2", "12.06")] = """
<p><strong>Power Exercisable by Receiver or Trustee.</strong> If collateral is in possession of a court-appointed receiver, the receiver may exercise the Company's powers regarding release, sale, or disposition of collateral. <strong>Why it matters:</strong> This ensures collateral can be administered efficiently during receivership or enforcement proceedings without requiring Company cooperation.</p>
"""

TRANSLATIONS[("doc2", "12.07")] = """
<p><strong>Certain Limits on Collateral.</strong> Liens required under the indenture are subject to exceptions and limitations in the Security Documents. The security interests are limited by the terms of the Intercreditor Agreements. <strong>Why it matters:</strong> This provision acknowledges that the 1.5L position is inherently limited by the senior liens and the framework established in the multi-party Intercreditor Agreements.</p>
"""

TRANSLATIONS[("doc2", "12.08")] = """
<p><strong>Notes Collateral Agent.</strong> The Notes Collateral Agent is appointed as agent for all holders, with purely ministerial and administrative duties -- no fiduciary or implied obligations. The CSC Delaware Trust Company initially serves as both Trustee and Notes Collateral Agent. The Agent may resign with notice; if no successor is appointed within 30 days, it may petition a court. The Agent may seek holder direction before acting and is not liable for acting on majority holder instructions. Critically, the Agent defers to the Controlling Collateral Agent (1L) and Designated Senior Representative on Muvico Group collateral matters. <strong>Why it matters:</strong> The deferral to senior lien holders' agents on collateral decisions means these 1.5L noteholders have limited independent control over their collateral, making the Intercreditor Agreement terms paramount to their actual recovery.</p>
"""

# ── Article XIII — Miscellaneous ──────────────────────────────────────────────

TRANSLATIONS[("doc2", "XIII", "article")] = """
<p><strong>Miscellaneous</strong> contains standard boilerplate provisions including notice procedures, communication rights, certificate and opinion requirements, governing law (New York), no-recourse limitations, successors, severability, and the PATRIOT Act provision. <strong>Why it matters:</strong> While largely procedural, the governing law provision (New York) is significant because New York law generally favors strict enforcement of contract terms and has the most developed body of indenture case law.</p>
"""

TRANSLATIONS[("doc2", "13.02")] = """
<p><strong>Notices.</strong> All notices must be in writing, delivered in person, by first-class mail, or facsimile to specified addresses (Muvico c/o AMC at One AMC Way, Leawood, KS for the Company; CSC Delaware Trust Company for the Trustee). <strong>Why it matters:</strong> Proper notice is a condition precedent to many rights and remedies. Failure to comply with notice requirements can invalidate otherwise legitimate actions.</p>
"""

TRANSLATIONS[("doc2", "13.03")] = """
<p><strong>Communication by Holders with Other Holders.</strong> Holders may communicate with each other about their rights under TIA Section 312(b). The Company, Trustee, and Registrar have the protection of TIA Section 312(c). <strong>Why it matters:</strong> This facilitates collective action by holders, which is essential in contested restructurings where holders need to organize and coordinate.</p>
"""

TRANSLATIONS[("doc2", "13.04")] = """
<p><strong>Certificate and Opinion as to Conditions.</strong> When the Company requests the Trustee to take action, it must furnish an Officer's Certificate and an Opinion of Counsel stating that all conditions precedent have been met. <strong>Why it matters:</strong> This provides a procedural safeguard ensuring the Trustee receives professional confirmation before taking action at the Company's request.</p>
"""

TRANSLATIONS[("doc2", "13.05")] = """
<p><strong>Statements Required in Certificate or Opinions.</strong> Each certificate or opinion must include statements confirming the signer has read the relevant provisions, describing the examination undertaken, and stating whether the conditions have been complied with. <strong>Why it matters:</strong> These requirements ensure that certificates and opinions are substantive rather than perfunctory, creating accountability for the professionals who sign them.</p>
"""

TRANSLATIONS[("doc2", "13.06")] = """
<p><strong>When Notes Disregarded.</strong> Notes held by the Company or its affiliates are disregarded for purposes of determining whether holders of the required percentage have consented to amendments, waivers, or other actions. <strong>Why it matters:</strong> This prevents the Company from buying up notes and using them to vote in its own favor on amendments or waivers, protecting the integrity of the consent process.</p>
"""

TRANSLATIONS[("doc2", "13.07")] = """
<p><strong>Rules by Trustee, Paying Agent and Registrar.</strong> These parties may establish reasonable rules for holder meetings and their administrative functions. <strong>Why it matters:</strong> A procedural provision ensuring orderly administration of holder actions and meetings.</p>
"""

TRANSLATIONS[("doc2", "13.08")] = """
<p><strong>Legal Holidays.</strong> If a payment date falls on a Saturday, Sunday, or banking holiday in New York or Missouri, payment is made on the next business day with no additional interest. <strong>Why it matters:</strong> A standard provision preventing payment defaults caused by calendar issues.</p>
"""

TRANSLATIONS[("doc2", "13.09")] = """
<p><strong>Governing Law.</strong> The indenture and Notes are governed by New York law. <strong>Why it matters:</strong> New York law is the standard choice for high-yield debt instruments, providing a well-developed body of case law on indenture interpretation and creditor rights.</p>
"""

TRANSLATIONS[("doc2", "13.10")] = """
<p><strong>No Recourse Against Others.</strong> No officer, director, employee, or stockholder of the Company or any Guarantor has personal liability for the Company's obligations under the indenture or notes. Holders waive claims against such individuals. <strong>Why it matters:</strong> This limits recovery to the Company's and Guarantors' assets, preventing holders from piercing the corporate veil to reach personal assets of officers or directors.</p>
"""

TRANSLATIONS[("doc2", "13.11")] = """
<p><strong>Successors.</strong> All agreements of the Company and Guarantors bind their successors. All agreements of the Trustee and Notes Collateral Agent bind their successors. <strong>Why it matters:</strong> Ensures continuity of obligations through corporate changes.</p>
"""

TRANSLATIONS[("doc2", "13.12")] = """
<p><strong>Separability Clause.</strong> If any provision is invalid, illegal, or unenforceable, the remaining provisions remain in full effect. <strong>Why it matters:</strong> Standard severability clause preventing a single invalid provision from invalidating the entire indenture.</p>
"""

TRANSLATIONS[("doc2", "13.14")] = """
<p><strong>Multiple Originals.</strong> The indenture may be executed in multiple counterparts, each of which is an original. <strong>Why it matters:</strong> A standard execution provision facilitating the logistics of signing among multiple parties.</p>
"""

TRANSLATIONS[("doc2", "13.15")] = """
<p><strong>Table of Contents; Headings.</strong> The table of contents and section headings are for convenience only and do not modify or restrict any terms. <strong>Why it matters:</strong> Prevents arguments that a section heading changes the meaning of the substantive text.</p>
"""

TRANSLATIONS[("doc2", "13.16")] = """
<p><strong>U.S.A. PATRIOT Act.</strong> Standard provision regarding compliance with anti-money laundering requirements under the USA PATRIOT Act. <strong>Why it matters:</strong> Ensures the Trustee and other parties can comply with know-your-customer and anti-money laundering obligations.</p>
"""
