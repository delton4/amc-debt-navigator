"""DOC 3 Translations — AMC 7.500% Senior Secured Notes due 2029

Issuer: AMC Entertainment Holdings, Inc.
Priority: 1L at AMC, 2L at Muvico
Principal: $360M
Rate: 7.500% fixed (cash pay)
Trustee: U.S. Bank Trust Company, National Association
"""

TRANSLATIONS = {}

# ── Article I — Definitions and Incorporation by Reference ────────────────────

TRANSLATIONS[("doc3", "I", "article")] = """
<p><strong>Definitions and Rules of Construction.</strong> Establishes the defined terms, interpretive rules, Limited Condition Transaction provisions, and compliance determination mechanics for this indenture. As an AMC-issued instrument (not Muvico), the defined terms reflect AMC's direct obligations and the "Restricted Subsidiary" framework rather than the Muvico group structure used in DOC 2. <strong>Why it matters:</strong> The definitions determine the scope of every covenant. Because this is an AMC-level instrument, terms like "Restricted Subsidiary" and "Unrestricted Subsidiary" apply at the AMC consolidated level, giving AMC more flexibility through subsidiary designation.</p>
"""

TRANSLATIONS[("doc3", "1.03")] = """
<p><strong>Incorporation by Reference of Trust Indenture Act.</strong> Incorporates the applicable provisions of the Trust Indenture Act of 1939 (TIA). If this indenture conflicts with the TIA, the TIA controls. <strong>Why it matters:</strong> The TIA provides federal baseline protections for bondholders regarding trustee independence, reporting, and holder rights.</p>
"""

TRANSLATIONS[("doc3", "1.04")] = """
<p><strong>Rules of Construction.</strong> Standard interpretive rules: "or" is not exclusive, "including" means "including without limitation," accounting terms follow GAAP unless otherwise defined. <strong>Why it matters:</strong> Ensures consistent interpretation and that defined terms control over ordinary meanings throughout the indenture.</p>
"""

TRANSLATIONS[("doc3", "1.05")] = """
<p><strong>Limited Condition Transactions.</strong> Compliance with financial tests for transactions conditioned on events outside AMC's control may be measured at signing rather than closing. <strong>Why it matters:</strong> Provides flexibility for AMC to commit to acquisitions without risk that market movements between signing and closing trigger covenant violations.</p>
"""

TRANSLATIONS[("doc3", "1.06")] = """
<p><strong>Certain Compliance Determinations.</strong> AMC may classify or reclassify items under multiple permitted baskets and redesignate amounts between baskets, subject to compliance at the time of redesignation. <strong>Why it matters:</strong> Gives AMC significant covenant management flexibility to optimize headroom across different permitted categories.</p>
"""

# ── Article II — The Notes ────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "II", "article")] = """
<p><strong>The Notes</strong> covers issuance mechanics, form, authentication, transfer, and interest computation. Unlike DOC 2 (which has PIK mechanics), these are straightforward fixed-rate cash-pay notes at 7.500%. The aggregate principal amount is unlimited, with Additional Notes issuable subject to covenant compliance. Interest is computed on a 360-day year. <strong>Why it matters:</strong> The fixed-rate, cash-pay structure means AMC must actually pay 7.5% interest in cash every period, unlike Muvico's PIK notes where interest can compound as additional principal.</p>
"""

TRANSLATIONS[("doc3", "2.01")] = """
<p><strong>Amount of Notes; Issuable in Series.</strong> The aggregate principal amount is unlimited. Additional Notes may be issued without holder consent, subject to debt incurrence and lien covenants. All Notes form a single class for voting, amendments, and redemptions. <strong>Why it matters:</strong> Additional issuance could dilute existing holders' recovery position unless constrained by the incurrence tests, which at AMC's current leverage levels are likely deeply restrictive.</p>
"""

TRANSLATIONS[("doc3", "2.02")] = """
<p><strong>Form and Dating.</strong> Notes are issued in registered form per Exhibit A, with appropriate transfer restriction legends for Rule 144A and Regulation S offerings. <strong>Why it matters:</strong> Transfer restrictions affect secondary market liquidity; the notes trade under restricted securities protocols.</p>
"""

TRANSLATIONS[("doc3", "2.03")] = """
<p><strong>Execution and Authentication.</strong> Notes must be signed by an Officer and authenticated by the Trustee to be valid. The Trustee may appoint authenticating agents. <strong>Why it matters:</strong> Trustee authentication is the gatekeeper ensuring only properly authorized notes enter circulation.</p>
"""

TRANSLATIONS[("doc3", "2.04")] = """
<p><strong>Registrar and Paying Agent.</strong> AMC must maintain a Registrar and Paying Agent. The Paying Agent holds funds in trust for holders. AMC may change these agents without prior notice. <strong>Why it matters:</strong> The Paying Agent's trust obligation ensures funds deposited for payments are protected from the Company's general creditors.</p>
"""

TRANSLATIONS[("doc3", "2.05")] = """
<p><strong>Paying Agent To Hold Money in Trust.</strong> The Company must deposit sufficient funds with the Paying Agent by 11:00 AM New York time on each payment date. The Paying Agent holds these amounts in trust for holders. <strong>Why it matters:</strong> Unlike DOC 2, there are no PIK mechanics here -- all interest must be paid in cash, making this section straightforward.</p>
"""

TRANSLATIONS[("doc3", "2.06")] = """
<p><strong>Holder Lists.</strong> The Trustee must maintain current lists of holder names and addresses per TIA Section 312(a). If the Trustee is not the Registrar, the Company must furnish updated lists at least 5 business days before each interest payment date. <strong>Why it matters:</strong> Accurate holder lists enable proper notice delivery and facilitate collective holder action.</p>
"""

TRANSLATIONS[("doc3", "2.07")] = """
<p><strong>Replacement Notes.</strong> Lost, destroyed, or mutilated notes can be replaced upon satisfaction of UCC Section 8-405 requirements and provision of an indemnity bond if requested. <strong>Why it matters:</strong> Standard protective provision ensuring holders are not harmed by physical loss of securities.</p>
"""

TRANSLATIONS[("doc3", "2.08")] = """
<p><strong>Outstanding Notes.</strong> All authenticated notes are outstanding except those canceled, delivered for cancellation, or paid. Notes held by AMC or affiliates do not cease to be outstanding. <strong>Why it matters:</strong> The definition of "outstanding" controls voting power, but notes held by the issuer may be disregarded for consent purposes under Section 13.06.</p>
"""

TRANSLATIONS[("doc3", "2.09")] = """
<p><strong>Temporary Notes.</strong> Temporary notes may be issued until definitive notes are ready, with the same rights as definitive notes. Exchange is without charge. <strong>Why it matters:</strong> Standard administrative provision ensuring no gap in holder rights during the transition period.</p>
"""

TRANSLATIONS[("doc3", "2.10")] = """
<p><strong>Cancellation.</strong> The Company may deliver notes to the Trustee for cancellation. New notes may not be issued to replace redeemed, paid, or canceled notes (except for transfers/exchanges). <strong>Why it matters:</strong> Prevents re-issuance of retired notes, ensuring that redemptions actually reduce outstanding debt.</p>
"""

TRANSLATIONS[("doc3", "2.11")] = """
<p><strong>Defaulted Interest.</strong> Defaulted interest accrues additional interest at the note rate and is paid through a Special Interest Payment Date established by the Trustee with at least 10-15 days notice. <strong>Why it matters:</strong> Compounds the cost of missed interest payments, incentivizing the Company to cure payment defaults quickly.</p>
"""

TRANSLATIONS[("doc3", "2.12")] = """
<p><strong>CUSIP Numbers or ISINs.</strong> Standard securities identification numbers may be used. Neither the Company nor Trustee is liable for identification number defects. <strong>Why it matters:</strong> Purely administrative provision for clearing and settlement purposes.</p>
"""

TRANSLATIONS[("doc3", "2.13")] = """
<p><strong>Computation of Interest.</strong> Interest is computed on a 360-day year of twelve 30-day months. <strong>Why it matters:</strong> The 30/360 day-count convention slightly increases the effective interest rate compared to actual/365.</p>
"""

# ── Article III — Redemption ──────────────────────────────────────────────────

TRANSLATIONS[("doc3", "III", "article")] = """
<p><strong>Redemption provisions</strong> for these notes include optional redemption at a premium schedule, make-whole redemption, and mandatory repurchase from excess asset sale proceeds. As direct AMC-issued notes, the redemption mechanics are straightforward high-yield style.</p>
"""

TRANSLATIONS[("doc3", "3.01")] = """
<p><strong>Notices to Trustee.</strong> If AMC elects to redeem notes, it must notify the Trustee in writing of the redemption date, principal amount, redemption price, and the provision under which redemption is made. <strong>Why it matters:</strong> Procedural requirement ensuring the Trustee can prepare and coordinate the redemption process.</p>
"""

TRANSLATIONS[("doc3", "3.02")] = """
<p><strong>Selection of Notes To Be Redeemed.</strong> If less than all notes are redeemed, the Trustee selects pro rata, by lot, or by another fair method compliant with DTC procedures. <strong>Why it matters:</strong> Prevents the issuer from selectively targeting specific holders, ensuring equal treatment in partial redemptions.</p>
"""

TRANSLATIONS[("doc3", "3.03")] = """
<p><strong>Notice of Redemption.</strong> Holders must receive at least 10 but not more than 60 days notice before any optional redemption date. The notice states the redemption price, date, and that interest ceases accruing. Redemptions may be conditional on satisfaction of specified conditions precedent. <strong>Why it matters:</strong> The conditional redemption feature gives AMC flexibility to announce redemptions subject to financing or other conditions, reducing the risk of committing to a redemption it cannot fund.</p>
"""

TRANSLATIONS[("doc3", "3.04")] = """
<p><strong>Effect of Notice of Redemption.</strong> Once notice is sent, called notes become due on the redemption date at the stated price. Interest stops accruing on the redemption date unless the Company defaults on payment. <strong>Why it matters:</strong> Creates a hard deadline -- after the redemption date, holders must surrender notes and cannot earn additional interest.</p>
"""

TRANSLATIONS[("doc3", "3.05")] = """
<p><strong>Deposit of Redemption Price.</strong> Before noon New York time on the redemption date, AMC must deposit sufficient funds with the Paying Agent for the redemption price plus accrued interest. <strong>Why it matters:</strong> Ensures actual cash is set aside before redemption takes effect, protecting holders from unfunded redemption notices.</p>
"""

TRANSLATIONS[("doc3", "3.06")] = """
<p><strong>Notes Redeemed in Part.</strong> For partial redemptions, the Company issues a new note for the unredeemed portion. <strong>Why it matters:</strong> Preserves holder rights on any amount not redeemed.</p>
"""

TRANSLATIONS[("doc3", "3.07")] = """
<p><strong>Mandatory Redemption.</strong> The Company is <strong>not required</strong> to make mandatory sinking fund payments. The entire principal amount is due at maturity. This is standard for high-yield notes - no forced amortization.</p>
"""

TRANSLATIONS[("doc3", "3.08")] = """
<p><strong>Excess Proceeds Offer.</strong> If AMC sells assets and has Net Proceeds exceeding the threshold that are not reinvested within 365 days, the Company must offer to repurchase notes at <strong>100% of principal plus accrued interest</strong>. This gives noteholders a put right triggered by significant asset dispositions, ensuring they share in the proceeds rather than watching value leak to other creditors or equity.</p>
"""

# ── Article IV — Covenants ────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "IV", "article")] = """
<p><strong>Covenants</strong> for the AMC 7.5% Notes. These are direct AMC obligations (not Muvico), making the covenant package structurally different from DOC 2 and DOC 5. <strong>Critical structural point:</strong> These notes are 1L at AMC but only 2L at Muvico, meaning they are structurally disadvantaged compared to the Muvico-issued secured notes (DOC 2, DOC 4, DOC 5) when it comes to recovery on Muvico's theatre assets. This note trades at ~86.5 cents reflecting this structural subordination risk.</p>
"""

TRANSLATIONS[("doc3", "4.01")] = """
<p><strong>Payment of Notes.</strong> AMC must promptly pay principal, premium (if any), and interest in immediately available funds on the dates specified. Interest on overdue principal accrues at the note rate. <strong>Why it matters:</strong> As a fixed-rate cash-pay instrument at 7.500%, AMC has a straightforward obligation to pay $27M in annual interest on the $360M outstanding. Unlike DOC 2, there is no PIK option to defer interest payments.</p>
"""

TRANSLATIONS[("doc3", "4.03")] = """
<p><strong>Payment of Taxes and Other Claims.</strong> AMC must cause each Restricted Subsidiary to pay tax obligations before delinquency, except where failure would not result in a Material Adverse Effect. <strong>Why it matters:</strong> Tax liens take priority over all other liens, so unpaid taxes could leapfrog these noteholders' security interests.</p>
"""

TRANSLATIONS[("doc3", "4.04")] = """
<p><strong>Maintenance of Properties.</strong> AMC must keep all material property in good working order (ordinary wear and tear excepted), except where failure would not have a Material Adverse Effect. <strong>Why it matters:</strong> These notes have 1L security at the AMC level and 2L at Muvico, so property maintenance affects collateral value at both levels.</p>
"""

TRANSLATIONS[("doc3", "4.05")] = """
<p><strong>Limitation on Indebtedness.</strong> AMC cannot incur additional Indebtedness unless the <strong>Fixed Charge Coverage Ratio</strong> (after pro forma effect) is at least 2.00:1.00. Permitted exceptions include refinancing debt, capital lease obligations, intercompany loans, and specific dollar-capped baskets. <strong>Compared to DOC 2:</strong> Same general structure, but because AMC is the direct issuer here, the incurrence test applies at the AMC consolidated level rather than just Muvico. Given AMC's 12.47x total leverage and 0.83x interest coverage, the general incurrence test is deeply restricted.</p>
"""

TRANSLATIONS[("doc3", "4.06")] = """
<p><strong>Limitation on Restricted Payments.</strong> Prevents AMC from paying dividends, repurchasing stock, or making other distributions. The builder basket grows with 50% of cumulative Consolidated Net Income. Exceptions include: payments up to the greater of $50M and a percentage of Total Assets, distributions from Unrestricted Subsidiaries, and certain permitted investments. <strong>Why it matters for AMC specifically:</strong> This is the primary protection preventing AMC from using cash flow to benefit equity holders while these notes trade at a discount to par.</p>
"""

TRANSLATIONS[("doc3", "4.07")] = """
<p><strong>Limitation on Liens.</strong> AMC cannot create liens on its assets except for permitted liens. Since these notes have 1L priority at AMC, this covenant is critical to maintaining their senior secured position. Permitted liens include: existing liens, liens securing permitted refinancing debt, purchase money security interests, and general baskets. <strong>Key risk:</strong> The Muvico drop-down structure means theatre assets were moved to a subsidiary where these notes only have 2L priority, effectively circumventing this lien limitation at the asset level.</p>
"""

TRANSLATIONS[("doc3", "4.08")] = """
<p><strong>Limitation on Affiliate Transactions.</strong> Any transaction between AMC and its affiliates must be on arm's-length terms. Threshold requirements escalate with transaction size: Board resolution for transactions over $15 million, fairness opinion for transactions over $50 million. <strong>Critical context:</strong> The Muvico drop-down and intercompany arrangements (Alcohol Management Agreements, Management Services Agreement) are likely affiliate transactions that were structured to fall within the permitted baskets here.</p>
"""

TRANSLATIONS[("doc3", "4.09")] = """
<p><strong>Negative Pledge.</strong> AMC cannot enter into agreements that prohibit or limit the ability of AMC or any Guarantor to create liens on their property for the benefit of these noteholders. Exceptions include restrictions in other permitted debt documentation, existing restrictions, restrictions in sale agreements, customary lease provisions, restrictions on acquired subsidiaries, and ordinary course deposit restrictions. <strong>Why it matters:</strong> This prevents other creditors from contractually blocking these noteholders' security interests, but the extensive exceptions mean many common restrictions are permitted.</p>
"""

TRANSLATIONS[("doc3", "4.10")] = """
<p><strong>Future Guarantors.</strong> After the Issue Date, any Restricted Subsidiary that guarantees the Senior Credit Facilities or other debt exceeding $250M must also guarantee these Notes within 90 days. The new Guarantor must join the applicable Intercreditor Agreements and Security Documents. <strong>Why it matters:</strong> The $250M threshold is higher than DOC 2's $150M threshold and the 90-day period is longer than DOC 2's 30 days, reflecting the structural seniority differences between the two instruments. This means some subsidiaries that guarantee DOC 2 may not be required to guarantee DOC 3.</p>
"""

TRANSLATIONS[("doc3", "4.11")] = """
<p><strong>Change of Control.</strong> If a Change of Control occurs (defined as acquisition of 40%+ voting stock, or certain board changes), the Company must offer to repurchase all notes at <strong>101% of principal plus accrued interest</strong>. This is a standard high-yield put right that protects holders against an acquirer loading up the company with additional debt. <strong>Compared to other docs:</strong> DOC 2 and DOC 5 do NOT have a Change of Control put, making this provision unique to the AMC-level notes.</p>
"""

TRANSLATIONS[("doc3", "4.12")] = """
<p><strong>Provision of Financial Information.</strong> AMC must file SEC reports (annual and quarterly) as required under Sections 13 and 15(d) of the Exchange Act, and provide them to the Trustee and holders. AMC must also furnish Rule 144A information to prospective investors. <strong>Why it matters:</strong> Unlike DOC 2's unique requirement to disclose the Applicable Rate and Total Leverage Ratio, this section has the standard reporting package without the leverage-grid-specific disclosures.</p>
"""

TRANSLATIONS[("doc3", "4.13")] = """
<p><strong>Statement as to Compliance.</strong> Within 90 days after each fiscal year end, the Company must deliver a brief certificate from a principal officer stating whether AMC is in compliance with all indenture covenants. When a Default is continuing, the Company must notify the Trustee within 10 business days. <strong>Why it matters:</strong> The annual compliance certificate is a simpler requirement than DOC 2's quarterly leverage ratio disclosure, reflecting that these fixed-rate notes do not have a leverage-based interest grid.</p>
"""

TRANSLATIONS[("doc3", "4.14")] = """
<p><strong>Waiver of Certain Covenants.</strong> Holders of a majority in principal amount may waive compliance with Sections 4.03-4.11, 4.12(a), and 4.16 in any particular instance. <strong>Why it matters:</strong> Provides a path for the Company to obtain covenant relief without a full amendment, but requires majority support.</p>
"""

TRANSLATIONS[("doc3", "4.16")] = """
<p><strong>Asset Sales.</strong> Same structure as DOC 2: fair market value consideration, 75% cash requirement, 365-day reinvestment period, and Excess Proceeds Offer at par. <strong>Structural note:</strong> Because these notes are issued at the AMC level, the Asset Sale covenant applies to AMC-level asset sales. Muvico-level asset sales are governed by DOC 2/DOC 4/DOC 5 covenants, and proceeds may be captured by those senior tranches before flowing up to AMC.</p>
"""

TRANSLATIONS[("doc3", "4.17")] = """
<p><strong>After-Acquired Collateral.</strong> If AMC or any Guarantor creates a security interest on any property to secure First Lien Obligations after the Issue Date, they must concurrently grant a first-priority perfected security interest on that property for these Notes. <strong>Why it matters:</strong> This maintains collateral parity with other First Lien obligations at the AMC level. However, at the Muvico level, these notes only have 2L priority, so after-acquired Muvico assets are pledged at a junior position.</p>
"""

# ── Article V — Successors ────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "V", "article")] = """
<p><strong>Fundamental Changes</strong> restricts AMC from merging or selling substantially all assets without the successor assuming these note obligations. Standard successor-entity requirements apply: US organization, assumption of all obligations, no resulting default.</p>
"""

TRANSLATIONS[("doc3", "5.01")] = """
<p><strong>Fundamental Changes; Holding Companies.</strong> AMC may not merge, consolidate, or sell all/substantially all assets unless the surviving entity expressly assumes all obligations. The successor must be a US-organized entity, must not cause an Event of Default, and must deliver officers' certificates and legal opinions. This protects noteholders from corporate shell games where AMC restructures to avoid its obligations.</p>
"""

TRANSLATIONS[("doc3", "5.02")] = """
<p><strong>Successor Substituted.</strong> Upon any permitted merger or asset transfer, the successor entity automatically succeeds to all rights and powers of AMC under the Notes and Indenture, and the original AMC is discharged from all obligations. <strong>Why it matters:</strong> This ensures a clean transition of obligations to the successor while releasing the original entity, preventing disputes about which entity is responsible for the notes.</p>
"""

# ── Article VI — Defaults and Remedies ────────────────────────────────────────

TRANSLATIONS[("doc3", "VI", "article")] = """
<p><strong>Events of Default</strong> triggers acceleration of these notes. The cross-default threshold is $50 million, meaning defaults on the $2B Term Loan (DOC 4), Muvico notes (DOC 2, DOC 5), or Odeon notes (DOC 6) would all trigger cross-defaults here. Given the interconnected capital structure, an Event of Default anywhere likely triggers a cascade across all documents.</p>
"""

TRANSLATIONS[("doc3", "6.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay interest for 30 days; (b) failure to pay principal at maturity; (c) failure to perform covenants (60-day cure period after notice); (d) cross-default on $50M+ of other Indebtedness; (e) judgment defaults of $50M+ unstayed for 60 days; (f) certain guarantor/collateral events; (g) bankruptcy/insolvency. <strong>Key distinction from DOC 4:</strong> The cure period for covenant breaches is 60 days here vs. 30 days in the Credit Agreement, giving AMC slightly more room to cure under the indenture.</p>
"""

TRANSLATIONS[("doc3", "6.02")] = """
<p><strong>Acceleration; Rescission and Annulment.</strong> Upon an Event of Default (other than bankruptcy), holders of at least 30% or the Trustee may declare all notes immediately due. Bankruptcy triggers automatic acceleration. A majority of holders may rescind acceleration if defaults are cured and overdue amounts paid. <strong>Why it matters:</strong> The acceleration right is the holders' most powerful enforcement tool, converting a maturity-date obligation into an immediate one. Rescission provides an escape valve if the Company addresses the default.</p>
"""

TRANSLATIONS[("doc3", "6.03")] = """
<p><strong>Other Remedies.</strong> If an Event of Default is continuing, the Trustee may pursue any available remedy to collect principal and interest or enforce the indenture. <strong>Why it matters:</strong> Grants the Trustee broad authority beyond acceleration, including pursuing collateral remedies through the Security Documents, subject to the First Lien Intercreditor Agreement.</p>
"""

TRANSLATIONS[("doc3", "6.04")] = """
<p><strong>Waiver of Past Defaults.</strong> A majority in principal amount may waive existing defaults and consequences, except for payment defaults or defaults relating to provisions requiring unanimous consent. <strong>Why it matters:</strong> Allows the majority to give AMC a second chance on non-payment defaults while protecting every holder's right to receive payments when due.</p>
"""

TRANSLATIONS[("doc3", "6.05")] = """
<p><strong>Control by Majority.</strong> A majority in principal amount directs the time, method, and place for enforcement proceedings. The Trustee may decline directions that conflict with law or expose it to liability. <strong>Why it matters:</strong> Whoever controls the majority controls the enforcement strategy, which is critical in contested restructurings.</p>
"""

TRANSLATIONS[("doc3", "6.06")] = """
<p><strong>Limitation on Suits.</strong> Subject to the First Lien Intercreditor Agreement, individual holders cannot pursue remedies unless they have provided notice, 30%+ of holders have requested Trustee action, indemnity has been offered, and the Trustee fails to act within 60 days. <strong>Why it matters:</strong> Coordinates enforcement through the Trustee and prevents disruptive individual lawsuits. The First Lien Intercreditor Agreement reference means enforcement is further limited by the terms agreed with senior lien holders.</p>
"""

TRANSLATIONS[("doc3", "6.07")] = """
<p><strong>Rights of Holders to Receive Payment.</strong> Every holder has the absolute right to bring suit to enforce payment when due. This right cannot be impaired without individual consent. <strong>Why it matters:</strong> This is the one right that cannot be overridden by majority action, providing baseline protection for every holder.</p>
"""

TRANSLATIONS[("doc3", "6.08")] = """
<p><strong>Collection Suit by Trustee.</strong> Upon a payment default, the Trustee may recover judgment in its own name for all amounts due. <strong>Why it matters:</strong> Enables efficient collective enforcement on behalf of all holders.</p>
"""

TRANSLATIONS[("doc3", "6.09")] = """
<p><strong>Trustee May File Proofs of Claim.</strong> The Trustee is authorized to file claims in bankruptcy and collect distributions. <strong>Why it matters:</strong> In a Chapter 11 filing, the Trustee represents all noteholders in the bankruptcy process.</p>
"""

TRANSLATIONS[("doc3", "6.10")] = """
<p><strong>Priorities.</strong> Subject to the First Lien Intercreditor Agreement, collections are distributed: (1) Trustee fees and expenses, (2) amounts owed to holders, (3) remainder to the Company. <strong>Why it matters:</strong> At the AMC level, these notes are 1L, so they should receive distributions ahead of unsecured creditors. But at the Muvico level, these notes are 2L, so the First Lien Intercreditor Agreement subordinates their Muvico collateral recovery to the 1L and 1.5L holders.</p>
"""

TRANSLATIONS[("doc3", "6.11")] = """
<p><strong>Undertaking for Costs.</strong> Courts may require cost undertakings in holder or Trustee lawsuits, except for suits to enforce payment of overdue principal or interest. <strong>Why it matters:</strong> Discourages frivolous litigation while preserving the right to sue for amounts owed.</p>
"""

TRANSLATIONS[("doc3", "6.12")] = """
<p><strong>Waiver of Stay or Extension Laws.</strong> AMC waives benefit of laws that would delay or prevent enforcement after an Event of Default. <strong>Why it matters:</strong> Strengthens creditor remedies, though bankruptcy's automatic stay would still apply in a Chapter 11 filing.</p>
"""

# ── Article VII — Trustee ─────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "VII", "article")] = """
<p><strong>The Trustee</strong> article defines the role of U.S. Bank Trust Company as Trustee. Duties are limited to those expressly stated; no implied fiduciary duties. During defaults, the Trustee must act with prudent-person care. <strong>Why it matters:</strong> The Trustee intermediates between AMC and holders, but holders must actively monitor and direct the Trustee rather than relying on proactive protection.</p>
"""

TRANSLATIONS[("doc3", "7.01")] = """
<p><strong>Duties of Trustee.</strong> During an Event of Default, the Trustee exercises its powers with prudent-person care. Outside of defaults, it performs only expressly stated duties. The Trustee may rely on certificates and opinions and is not liable for good faith errors. <strong>Why it matters:</strong> The heightened standard during defaults means the Trustee becomes more active when it matters most, but holders should not expect proactive pre-default monitoring.</p>
"""

TRANSLATIONS[("doc3", "7.02")] = """
<p><strong>Rights of Trustee.</strong> The Trustee may rely on documents believed genuine, require Officer's Certificates before acting, act through agents, and is not liable for good faith actions. It has no obligation to act without satisfactory indemnity. <strong>Why it matters:</strong> Holders must provide indemnification before the Trustee will take enforcement action at their direction.</p>
"""

TRANSLATIONS[("doc3", "7.03")] = """
<p><strong>Individual Rights of Trustee.</strong> The Trustee may own Notes and deal with AMC in its individual capacity, subject to eligibility and preferential collection restrictions. <strong>Why it matters:</strong> Allows the Trustee to maintain a banking relationship with AMC, but creates potential conflicts of interest.</p>
"""

TRANSLATIONS[("doc3", "7.04")] = """
<p><strong>Trustee's Disclaimer.</strong> The Trustee makes no representation about the indenture's or notes' validity, is not accountable for AMC's use of proceeds, and is not responsible for Company statements. <strong>Why it matters:</strong> Holders cannot rely on Trustee involvement as a quality endorsement.</p>
"""

TRANSLATIONS[("doc3", "7.05")] = """
<p><strong>Notice of Defaults.</strong> The Trustee must mail default notices to holders within 45 days of knowledge. For non-payment defaults, it may withhold notice if its Trust Officers determine in good faith that withholding serves holders' interests. <strong>Why it matters:</strong> The discretion to withhold non-payment default notices means active holder monitoring is important.</p>
"""

TRANSLATIONS[("doc3", "7.06")] = """
<p><strong>Reports by Trustee to Holders.</strong> Annual reports to holders by March 31 complying with TIA Section 313(a). Copies filed with the SEC and any stock exchange. <strong>Why it matters:</strong> Provides basic trust administration information but not substantive financial analysis.</p>
"""

TRANSLATIONS[("doc3", "7.07")] = """
<p><strong>Compensation and Indemnity.</strong> AMC must pay Trustee compensation, reimburse documented expenses, and indemnify against losses (except for willful misconduct or negligence). The Trustee has a prior lien on trust money and property. In bankruptcy, Trustee expenses are administrative expenses. <strong>Why it matters:</strong> The Trustee's administrative priority means its fees are paid before noteholders in a distressed scenario.</p>
"""

TRANSLATIONS[("doc3", "7.08")] = """
<p><strong>Replacement of Trustee.</strong> The Trustee may resign by notifying the Company. A majority of holders may remove the Trustee. AMC must remove the Trustee if it fails eligibility requirements, becomes insolvent, or is incapable of acting. <strong>Why it matters:</strong> Holder ability to remove and replace provides recourse if the Trustee becomes unresponsive or conflicted.</p>
"""

TRANSLATIONS[("doc3", "7.09")] = """
<p><strong>Successor Trustee by Merger.</strong> If the Trustee merges or transfers its trust business, the surviving entity automatically becomes successor Trustee. <strong>Why it matters:</strong> Ensures continuity of the trust relationship through corporate changes.</p>
"""

TRANSLATIONS[("doc3", "7.10")] = """
<p><strong>Eligibility; Disqualification.</strong> The Trustee must at all times satisfy TIA Section 310(a) requirements. <strong>Why it matters:</strong> Ensures the Trustee is a substantial, regulated institution.</p>
"""

TRANSLATIONS[("doc3", "7.11")] = """
<p><strong>Preferential Collection of Claims Against Company.</strong> The Trustee must comply with TIA Section 311(a), restricting preferential collection of its own claims against AMC. <strong>Why it matters:</strong> Prevents the Trustee from collecting its own debts ahead of noteholder claims.</p>
"""

# ── Article VIII — Discharge of Indenture; Defeasance ────────────────────────

TRANSLATIONS[("doc3", "VIII", "article")] = """
<p><strong>Discharge and Defeasance</strong> provides mechanisms for AMC to terminate obligations. Satisfaction and discharge occurs upon full payment or cancellation. Legal defeasance releases all obligations; covenant defeasance releases only certain covenants. Both require deposit of sufficient cash or Government Securities with the Trustee. <strong>Why it matters:</strong> Defeasance is extremely unlikely for a company with AMC's leverage profile, as it requires depositing enough risk-free assets to pay all future principal and interest.</p>
"""

TRANSLATIONS[("doc3", "8.01")] = """
<p><strong>Discharge of Liability on Notes; Defeasance.</strong> The indenture is discharged when all notes are canceled or the Company deposits sufficient cash/Government Securities. Legal defeasance releases all obligations and collateral liens. Covenant defeasance releases Sections 4.03-4.13, 4.16-4.17, and parts of Section 5.01. Certain obligations (Sections 2.03-2.09, 4.01, 7.07, 7.08, 8.03-8.06) survive until full payment. <strong>Why it matters:</strong> Legal defeasance makes the notes effectively risk-free by substituting government securities, while covenant defeasance preserves the notes but frees AMC from restrictions.</p>
"""

TRANSLATIONS[("doc3", "8.02")] = """
<p><strong>Conditions to Defeasance.</strong> Requirements include: irrevocable deposit with the Trustee, IRS ruling or tax law change opinion for legal defeasance, no-adverse-tax opinion for covenant defeasance, no existing defaults, and Officer's Certificate plus Opinion of Counsel. <strong>Why it matters:</strong> The IRS ruling requirement for legal defeasance is a very high bar, making it practically impossible absent specific tax law changes.</p>
"""

TRANSLATIONS[("doc3", "8.03")] = """
<p><strong>Application of Trust Money.</strong> The Trustee holds deposited money/Government Securities in trust and applies them to pay principal and interest on the Notes through the Paying Agent. <strong>Why it matters:</strong> Once deposited for defeasance, funds are irrevocably dedicated to paying noteholders.</p>
"""

TRANSLATIONS[("doc3", "8.04")] = """
<p><strong>Repayment to Company.</strong> Excess money or securities are returned to the Company. Unclaimed money reverts after two years; holders then become general creditors. <strong>Why it matters:</strong> The two-year reversion means holders who fail to claim payments lose their priority position.</p>
"""

TRANSLATIONS[("doc3", "8.05")] = """
<p><strong>Indemnity for Government Obligations.</strong> The Company indemnifies the Trustee against taxes on deposited Government Securities. <strong>Why it matters:</strong> Protects the defeasance trust from unexpected tax liabilities.</p>
"""

TRANSLATIONS[("doc3", "8.06")] = """
<p><strong>Reinstatement.</strong> If a court prevents application of defeasance funds, the Company's obligations revive. The Company is subrogated to holder rights for any payments made during reinstatement. <strong>Why it matters:</strong> Protects holders if the defeasance trust is disrupted by legal proceedings.</p>
"""

# ── Article IX — Amendments ───────────────────────────────────────────────────

TRANSLATIONS[("doc3", "IX", "article")] = """
<p><strong>Amendments</strong> governs modifications to the indenture, notes, guarantees, and security documents. Technical amendments need no holder consent. Substantive changes require majority consent. Core payment terms, lien priority, and guarantee protections require unanimous consent. <strong>Why it matters:</strong> The amendment framework determines the power balance in a restructuring between AMC and its holders.</p>
"""

TRANSLATIONS[("doc3", "9.01")] = """
<p><strong>Without Consent of Holders.</strong> AMC, Guarantors, Trustee, and Notes Collateral Agent may amend without holder consent to: cure ambiguities, comply with successor entity requirements, add uncertificated notes, add guarantors or collateral, add covenants for holder benefit, satisfy SEC requirements, conform to offering documents, or make non-materially adverse changes. <strong>Why it matters:</strong> Broad carve-outs for administrative and protective changes, limited by the "no material adverse effect" standard.</p>
"""

TRANSLATIONS[("doc3", "9.02")] = """
<p><strong>With Consent of Holders.</strong> Most amendments require majority consent. Without unanimous consent, no amendment may: reduce principal or interest, extend payment dates, change currency, impair the right to sue for payment, subordinate notes or liens, release all/substantially all collateral or guarantees, or reduce amendment/waiver thresholds. <strong>Why it matters:</strong> Sacred rights requiring unanimous consent are the bedrock minority holder protections, preventing a majority from sacrificing fundamental terms in a deal with the issuer.</p>
"""

TRANSLATIONS[("doc3", "9.04")] = """
<p><strong>Revocation and Effect of Consents and Waivers.</strong> Consents may be revoked before becoming effective. Once effective, they bind all holders including subsequent purchasers. <strong>Why it matters:</strong> After adoption, all holders are bound regardless of how they voted, which is critical in contested restructurings.</p>
"""

TRANSLATIONS[("doc3", "9.05")] = """
<p><strong>Notation on or Exchange of Notes.</strong> After amendments, the Trustee may notate or require exchange of notes to reflect changes. <strong>Why it matters:</strong> Ensures securities reflect current terms.</p>
"""

TRANSLATIONS[("doc3", "9.06")] = """
<p><strong>Trustee To Sign Amendments.</strong> The Trustee must sign properly authorized amendments, provided it is indemnified and the amendment does not adversely affect its rights. <strong>Why it matters:</strong> The Trustee cannot unreasonably block properly authorized amendments.</p>
"""

# ── Article X — Reserved ─────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "X", "article")] = """
<p><strong>Reserved.</strong> This article is intentionally left blank as a placeholder to maintain consistent numbering. <strong>Why it matters:</strong> No substantive provisions apply.</p>
"""

# ── Article XI — Guarantee ────────────────────────────────────────────────────

TRANSLATIONS[("doc3", "XI", "article")] = """
<p><strong>Subsidiary Guarantee</strong> establishes the framework for subsidiary guarantees. Each Guarantor fully, unconditionally, and irrevocably guarantees all payment obligations on a joint and several basis. The guarantees are of payment (not collection). <strong>Why it matters:</strong> The guarantee pool for these AMC-issued notes may differ from the Muvico-issued notes' guarantee pool, affecting relative recovery in a restructuring.</p>
"""

TRANSLATIONS[("doc3", "11.01")] = """
<p><strong>Subsidiary Guarantee.</strong> Each Guarantor unconditionally and irrevocably guarantees all payment obligations, jointly and severally, as a guarantee of payment. The guarantee survives extensions, modifications, and waivers of the underlying obligations. <strong>Why it matters:</strong> Joint and several liability means any single Guarantor can be held responsible for the entire $360M outstanding. This is a direct AMC obligation, so the guarantee structure adds subsidiary-level claims.</p>
"""

TRANSLATIONS[("doc3", "11.02")] = """
<p><strong>Execution and Delivery.</strong> Guarantors execute the indenture or supplemental indentures (Exhibit C format). The guarantee is effective regardless of endorsement on the notes. <strong>Why it matters:</strong> Ensures guarantee enforceability without technical challenges based on physical note notation.</p>
"""

TRANSLATIONS[("doc3", "11.03")] = """
<p><strong>Limitation on Liability; Termination, Release and Discharge.</strong> Guarantor obligations are limited to avoid fraudulent conveyance. Guarantors are released upon: defeasance/discharge, merger into the Company or another Guarantor, becoming an Excluded Subsidiary (with conditions), release from guarantees of other material debt, or as permitted by Article IX. <strong>Why it matters:</strong> The fraudulent conveyance savings clause may reduce guaranteed amounts. Release conditions determine whether the guarantee pool shrinks over time.</p>
"""

TRANSLATIONS[("doc3", "11.04")] = """
<p><strong>Right of Contribution.</strong> Guarantors who pay more than their share may seek contribution from the Company or other Guarantors. Holder claims always take priority. <strong>Why it matters:</strong> Inter-Guarantor contribution ensures equitable sharing but does not affect holder recovery priority.</p>
"""

TRANSLATIONS[("doc3", "11.05")] = """
<p><strong>No Subrogation.</strong> Guarantors may not seek subrogation, contribution, or reimbursement from AMC until all obligations are paid in full. Amounts received on subrogation rights must be turned over to the Trustee. <strong>Why it matters:</strong> Prevents Guarantors from competing with noteholders for AMC-level recovery.</p>
"""

# ── Article XII — Collateral ─────────────────────────────────────────────────

TRANSLATIONS[("doc3", "XII", "article")] = """
<p><strong>Collateral</strong> governs the security interests backing these notes. These notes have a dual priority structure: 1L at AMC (pari passu with the Term Loan on AMC-level assets) but only 2L at Muvico (junior to the Term Loan, Exchangeable Notes, and Muvico PIK Notes on Muvico's theatre assets). The Notes Collateral Agent holds collateral in trust for holders. <strong>Why it matters:</strong> The 2L position at Muvico is the key structural weakness -- most of the valuable operating assets (theatres) are at Muvico, where these notes are subordinated to ~$3.7B of senior claims.</p>
"""

TRANSLATIONS[("doc3", "12.01")] = """
<p><strong>Security Documents.</strong> The Notes are secured by Collateral as defined in the Security Documents, subject to the First Lien Intercreditor Agreement and First Lien/Second Lien Intercreditor Agreement. The Notes Collateral Agent holds Collateral in trust. Each holder consents to all Intercreditor Agreements and Security Documents. Intercreditor Agreements control over conflicting Security Document terms. <strong>Why it matters:</strong> The First Lien Intercreditor Agreement governs the relationship with other 1L holders at AMC, while the First Lien/Second Lien Intercreditor Agreement governs the subordinated 2L position at Muvico.</p>
"""

TRANSLATIONS[("doc3", "12.02")] = """
<p><strong>Release of Collateral.</strong> Collateral is automatically released upon: permitted dispositions, Guarantor release, subsidiary dissolution, conversion to Excluded Asset, or enforcement by the senior collateral agent under the Intercreditor Agreement. All liens terminate upon full payment, discharge, or as provided in the Intercreditor Agreements. <strong>Why it matters:</strong> The senior collateral agent's ability to release collateral during enforcement without these 2L holders' consent at Muvico is a significant risk factor.</p>
"""

TRANSLATIONS[("doc3", "12.03")] = """
<p><strong>Suits to Protect the Collateral.</strong> The Trustee may direct the Notes Collateral Agent to enforce Security Documents and collect amounts. It may institute proceedings to prevent collateral impairment, but is not obligated to do so. <strong>Why it matters:</strong> The Trustee's discretionary (not mandatory) duty to protect collateral means holders must actively direct and indemnify the Trustee for enforcement action.</p>
"""

TRANSLATIONS[("doc3", "12.04")] = """
<p><strong>Authorization of Receipt of Funds.</strong> Subject to Intercreditor Agreements, the Trustee receives distributions from Security Documents for holders. <strong>Why it matters:</strong> At the Muvico level, distributions to these 2L holders are subordinated to 1L, 1.25L, and 1.5L holders under the Intercreditor Agreements.</p>
"""

TRANSLATIONS[("doc3", "12.05")] = """
<p><strong>Purchaser Protected.</strong> Good faith purchasers of released collateral need not verify the Notes Collateral Agent's authority or inquire into release conditions. <strong>Why it matters:</strong> Protects the marketability of disposed collateral assets.</p>
"""

TRANSLATIONS[("doc3", "12.06")] = """
<p><strong>Power Exercisable by Receiver or Trustee.</strong> Court-appointed receivers may exercise the Company's powers regarding collateral release, sale, or disposition. <strong>Why it matters:</strong> Ensures collateral can be administered during receivership without requiring Company cooperation.</p>
"""

TRANSLATIONS[("doc3", "12.07")] = """
<p><strong>Certain Limits on Collateral.</strong> Security interests are subject to exceptions and limitations in the Security Documents and Intercreditor Agreements. <strong>Why it matters:</strong> Acknowledges the inherent limitations on these notes' collateral position, particularly the 2L subordination at Muvico.</p>
"""

TRANSLATIONS[("doc3", "12.08")] = """
<p><strong>Notes Collateral Agent.</strong> Appointed as agent for all holders with ministerial and administrative duties only -- no fiduciary obligations. U.S. Bank Trust Company initially serves as both Trustee and Notes Collateral Agent. The Agent may resign with notice; it may seek holder direction before acting. The Agent is bound by the First Lien Intercreditor Agreement and First Lien/Second Lien Intercreditor Agreement. <strong>Why it matters:</strong> As a 2L holder at Muvico, the Notes Collateral Agent has limited independent authority over Muvico collateral, deferring to the senior lien holders' agents on key decisions like foreclosure, release, and enforcement timing.</p>
"""

# ── Article XIII — Miscellaneous ──────────────────────────────────────────────

TRANSLATIONS[("doc3", "XIII", "article")] = """
<p><strong>Miscellaneous</strong> contains standard boilerplate: notice procedures, communication rights, certificate and opinion requirements, governing law (New York), no-recourse limitations, successors, severability, reliance on financial data, and multiple originals. <strong>Why it matters:</strong> New York governing law provides the most developed body of indenture case law, generally favoring strict contract enforcement.</p>
"""

TRANSLATIONS[("doc3", "13.02")] = """
<p><strong>Notices.</strong> All notices must be in writing, delivered to specified addresses (AMC Entertainment Holdings at One AMC Way, Leawood, KS for the Company; U.S. Bank Trust Company for the Trustee). <strong>Why it matters:</strong> Proper notice is a condition precedent to many rights and remedies.</p>
"""

TRANSLATIONS[("doc3", "13.03")] = """
<p><strong>Communication by Holders with Other Holders.</strong> Holders may communicate with each other about their rights under TIA Section 312(b). <strong>Why it matters:</strong> Facilitates collective action essential in contested restructurings.</p>
"""

TRANSLATIONS[("doc3", "13.04")] = """
<p><strong>Certificate and Opinion as to Conditions.</strong> When AMC requests Trustee action, it must furnish an Officer's Certificate and Opinion of Counsel confirming all conditions are met. <strong>Why it matters:</strong> Procedural safeguard ensuring professional confirmation before Trustee acts.</p>
"""

TRANSLATIONS[("doc3", "13.05")] = """
<p><strong>Statements Required in Certificate or Opinions.</strong> Each certificate or opinion must confirm the signer read the relevant provisions, describe the examination, and state whether conditions are met. <strong>Why it matters:</strong> Ensures substantive rather than perfunctory professional certifications.</p>
"""

TRANSLATIONS[("doc3", "13.06")] = """
<p><strong>When Notes Disregarded.</strong> Notes held by AMC or its affiliates are disregarded for consent and voting purposes. <strong>Why it matters:</strong> Prevents AMC from buying notes and voting in its own favor on amendments.</p>
"""

TRANSLATIONS[("doc3", "13.07")] = """
<p><strong>Rules by Trustee, Paying Agent and Registrar.</strong> These parties may establish reasonable rules for holder meetings and administrative functions. <strong>Why it matters:</strong> Ensures orderly administration of holder actions.</p>
"""

TRANSLATIONS[("doc3", "13.08")] = """
<p><strong>Legal Holidays.</strong> Payments falling on weekends or banking holidays in New York or Missouri are made on the next business day with no additional interest. <strong>Why it matters:</strong> Standard provision preventing calendar-caused defaults.</p>
"""

TRANSLATIONS[("doc3", "13.09")] = """
<p><strong>Governing Law.</strong> The indenture and Notes are governed by New York law. <strong>Why it matters:</strong> New York law is the standard for high-yield instruments, with well-developed case law on indenture interpretation.</p>
"""

TRANSLATIONS[("doc3", "13.10")] = """
<p><strong>No Recourse Against Others.</strong> No personal liability for officers, directors, employees, or stockholders. <strong>Why it matters:</strong> Limits recovery to Company and Guarantor assets.</p>
"""

TRANSLATIONS[("doc3", "13.11")] = """
<p><strong>Successors.</strong> All agreements bind successors of the Company, Guarantors, and Trustee. <strong>Why it matters:</strong> Ensures continuity of obligations through corporate changes.</p>
"""

TRANSLATIONS[("doc3", "13.12")] = """
<p><strong>Separability Clause.</strong> Invalid provisions do not affect the remaining indenture. <strong>Why it matters:</strong> Standard severability preventing total invalidity.</p>
"""

TRANSLATIONS[("doc3", "13.13")] = """
<p><strong>Reliance on Financial Data.</strong> Parties may rely on financial data provided under the indenture without independent verification. <strong>Why it matters:</strong> Protects the Trustee and other parties from liability for relying on Company-provided financial information that later proves inaccurate.</p>
"""

TRANSLATIONS[("doc3", "13.14")] = """
<p><strong>Multiple Originals.</strong> The indenture may be executed in counterparts. <strong>Why it matters:</strong> Standard execution provision.</p>
"""

TRANSLATIONS[("doc3", "13.15")] = """
<p><strong>Table of Contents; Headings.</strong> Headings are for convenience and do not modify terms. <strong>Why it matters:</strong> Prevents arguments based on section headings rather than substantive text.</p>
"""
