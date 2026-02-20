/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Scenario Detail Data
   Provides deep-dive content for the scenario detail pages.
   Keyed by scenario ID from window.AMC_SCENARIOS.
   ═══════════════════════════════════════════════ */

window.AMC_SCENARIO_DETAILS = {

  /* ─── PREPACKAGED CHAPTER 11 ────────────────────────────────────────── */
  "prepack-ch11": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 7.01",
            title: "Events of Default",
            summary: "Section 7.01 lists the Events of Default that trigger acceleration of the $2B Term Loan. Critically, paragraphs (h) and (i) address bankruptcy filings: an involuntary proceeding must continue undismissed for 60 days to constitute a default, while a voluntary filing is an immediate automatic Event of Default with automatic acceleration. In a prepack, AMC voluntarily files — triggering automatic acceleration under 7.01(i) — but the pre-negotiated RSA and plan render acceleration moot because the plan proposes to restructure the accelerated claims. The cross-default provisions mean a Term Loan default cascades immediately to DOC 2 and all other tranches."
          },
          {
            ref: "Section 9.02",
            title: "Waivers; Amendments",
            summary: "Section 9.02 governs amendment mechanics and defines the 'sacred rights' requiring unanimous lender consent. For a prepack, the key provisions are: (1) the Required Lender threshold (majority by outstanding principal of $1,999.1M) controls most amendments; (2) sacred rights protections prevent reduction of principal, interest rate cuts, maturity extensions, or collateral release without each lender's consent — but a Chapter 11 plan can achieve these outcomes through cramdown under Section 1129(b), overriding the contractual protections. Clause (x) is especially relevant: it prohibits DIP financing that subordinates the Term Loan without offering each lender pro rata participation, shaping how the prepack DIP facility must be structured."
          },
          {
            ref: "Section 9.02(b)(xi)",
            title: "Unrestricted Subsidiary Protection",
            summary: "This sacred right requires unanimous lender consent to designate any subsidiary as 'Unrestricted' or transfer assets to entities outside the credit document group. In the prepack context, this provision prevents pre-petition asset stripping that would reduce estate value. The existence of this protection actually supports the prepack — it ensures the collateral package remains intact going into the filing, maximizing the value available for distribution under the plan."
          },
          {
            ref: "Section 7.03",
            title: "Application of Proceeds",
            summary: "After exercise of remedies, all amounts are applied pursuant to the Pledge and Security Agreement waterfall. This section confirms the 1L Term Loan's position at the top of the distribution hierarchy, which directly translates into plan treatment in the prepack: the Term Loan class would receive the most favorable treatment (reorganized equity, take-back debt) consistent with their first-priority position."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Section 6.01",
            title: "Events of Default",
            summary: "DOC 2's Events of Default include cross-default to other Material Indebtedness at $150M (Section 6.01(d)), meaning a Chapter 11 filing that triggers DOC 4 default automatically defaults the $857M Muvico 15% PIK Notes. Bankruptcy events (Sections 6.01(e)/(f)) trigger automatic acceleration. The 30% holder threshold for declaring default means a minority blocking position can force acceleration even before a filing — creating urgency for the prepack to lock in sufficient DOC 2 holder support via the RSA."
          },
          {
            ref: "Section 6.02",
            title: "Acceleration; Rescission and Annulment",
            summary: "Upon acceleration, DOC 2 holders are entitled to principal plus the Applicable Premium — a make-whole-like payment that treats acceleration as early redemption. This provision is critical for prepack negotiations because DOC 2 holders will argue their Applicable Premium claim should be honored in the plan. If the prepack plan proposes to impair DOC 2 claims without the Applicable Premium, it may face objections. The enforceability of make-whole premiums in bankruptcy remains a contested legal issue, giving DOC 2 holders negotiating leverage in RSA discussions."
          }
        ]
      },
      {
        doc: "doc7",
        sections: [
          {
            ref: "Section 2.02",
            title: "PIK Toggle Interest Mechanics",
            summary: "The Toggle Notes allow Muvico to elect PIK interest at 8% instead of cash at 6%. In the pre-petition period leading to a prepack, management would likely elect PIK to preserve cash, growing the $107.4M face value. The prepack plan must address the accreted principal — including PIK interest — when classifying and treating Toggle Note claims. The 2L position at Muvico means Toggle Note holders recover after both the Term Loan and the 15% PIK Notes."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "court-solutions",
        title: "Chapter 11 Reorganization",
        excerpt: "Prepackaged Chapter 11 filings represent the gold standard for restructuring companies with complex capital structures where consensual resolution is achievable. The defining feature is pre-petition solicitation under Section 1126(b) of the Bankruptcy Code, which permits the debtor to solicit votes on a plan before filing. This dramatically compresses the in-court timeline — typically 45-90 days from petition to emergence, compared to 12-24 months for a free-fall filing. The prepack requires extensive pre-filing preparation: RSA negotiation with key creditor constituencies (typically 4-8 weeks), plan and disclosure statement drafting, DIP financing commitment, and pre-petition vote solicitation (20-30 days). For AMC, the prepack is feasible because the capital structure, while complex (7 tranches, $4B total), has identifiable controlling creditor groups — primarily the DOC 4 Term Loan holders ($1,999.1M) who hold the fulcrum security and can drive plan terms."
      },
      {
        source: "lender-strategy",
        title: "Pre-Pack Mechanics and RSA Framework",
        excerpt: "The RSA is the cornerstone document of a prepackaged filing. It binds signatories to support a specific restructuring plan, including voting in favor of the plan, not supporting competing proposals, and potentially providing new money or DIP financing. For AMC, an RSA would need to address: (1) the dual-borrower structure under DOC 4, where both AMC holdco and Muvico are co-obligors; (2) the Odeon ring-fence under DOC 6, which would likely be excluded from the US filing; (3) treatment of the lease portfolio under Section 365; and (4) the allocation of reorganized equity between the Term Loan holders, the Muvico PIK Notes holders, and potentially junior creditors through a negotiated 'gift' or tip. Ad hoc group formation among the Term Loan holders is the critical first step — once holders of 50%+ of the Term Loan execute the RSA, the prepack path becomes viable."
      },
      {
        source: "muvico-deep-dive",
        title: "Muvico Entity-Level Analysis",
        excerpt: "Muvico LLC carries $3,118.9M of total debt against $175.5M of attributable EBITDA, producing leverage of 19.43x — among the highest in the theatre industry. Interest coverage at 0.54x means Muvico cannot service its current debt from operations. The prepack must address this fundamental insolvency: the reorganized Muvico entity would need to emerge with leverage of 4-6x ($700M-$1,050M total debt) to be sustainable, implying $2,000M-$2,400M of debt elimination. This debt reduction is achieved through the plan by converting debt claims into reorganized equity, effectively transferring ownership from existing equity holders to creditors."
      }
    ],
    detailedMechanics: "The prepackaged Chapter 11 is the most efficient in-court restructuring pathway available to AMC and the one most likely to preserve going-concern value. The process unfolds in four distinct phases, each building on the prior.\n\nPhase 1 — RSA Negotiation (Pre-Filing, 6-10 Weeks): AMC's advisors (likely Weil Gotshal, who structured the 2021 Muvico transaction) approach the ad hoc group of DOC 4 Term Loan holders to negotiate a plan term sheet. The term sheet specifies treatment of each class: Term Loan holders would receive the majority of reorganized equity (60-80%) plus potential take-back first lien debt; DOC 2 PIK Note holders would receive a smaller equity allocation (15-25%) reflecting their 1.5L position; junior tranches receive warrants or residual equity; existing equity is cancelled. The RSA includes milestones (filing date, confirmation hearing deadline), termination events, and DIP financing commitments.\n\nPhase 2 — DIP Commitment and Pre-Petition Solicitation (2-4 Weeks): Concurrently with RSA execution, the DIP lenders (typically the same Term Loan holders) commit to a $500-800M facility. Section 9.02(b)(x) of DOC 4 requires that all Term Loan lenders be offered pro rata participation in any priming DIP facility, so the DIP must be structured to comply with this unanimous consent provision — or the prepack plan must address it. A disclosure statement meeting Section 1125's 'adequate information' standard is prepared and distributed to all impaired classes, along with ballots. The solicitation period runs 20-30 days.\n\nPhase 3 — Filing and First-Day Motions (Day 1): AMC and Muvico file voluntary Chapter 11 petitions, simultaneously filing the pre-voted plan, disclosure statement, DIP financing motion, and first-day motions (critical vendor, cash management, employee wages, lease assumption/rejection). The automatic stay under Section 362 halts all collection actions. The court schedules an expedited confirmation hearing.\n\nPhase 4 — Confirmation and Emergence (Days 30-90): The court conducts the confirmation hearing under Section 1129. If all impaired classes accepted, confirmation requires satisfying the 'best interests' test (each creditor receives at least Chapter 7 liquidation value) and 'feasibility' test (the reorganized company can meet its obligations). If any class rejected, the proponent invokes cramdown under Section 1129(b), which requires the plan be 'fair and equitable' — for secured classes, this means providing the indubitable equivalent of their claims; for unsecured classes, it requires full payment or elimination of junior interests (absolute priority rule). Post-confirmation, the plan becomes effective and AMC emerges as a reorganized company with a sustainable capital structure.",
    applicability: "AMC is a compelling prepack candidate for several reasons. First, the capital structure — while large at $4B — is concentrated in identifiable institutional tranches held by sophisticated creditors experienced in restructuring negotiations. The DOC 4 Term Loan alone represents $1,999.1M (50% of total debt), and its holders have both the economic incentive and the contractual tools (Required Lender control) to drive a prepack. Second, AMC's operational profile — 600+ domestic theatre locations, the AMC Stubs loyalty program, and established studio content relationships — creates significant going-concern value that would be destroyed in a liquidation or prolonged free-fall filing. Preserving this value requires the speed a prepack provides. Third, AMC's management team has demonstrated both willingness and capability to execute complex capital structure transactions, as evidenced by the 2021 Muvico dropdown and subsequent LMEs. Fourth, the $417M cash balance provides adequate liquidity to fund operations during the compressed prepack timeline, potentially reducing the required DIP facility size. The primary risk is creditor fragmentation — if the DOC 2 PIK Note holders ($857M) cannot reach agreement with the Term Loan holders on relative recoveries, the prepack negotiations could stall. The 1L vs. 1.5L priority dispute between DOC 4 and DOC 2 at the Muvico level is the most contentious issue, as any plan must allocate reorganized equity between these two classes based on a contested enterprise valuation."
  },

  /* ─── FREE-FALL CH.11 + DIP FINANCING ───────────────────────────────── */
  "freefall-ch11-dip": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 7.01(h)/(i)",
            title: "Bankruptcy Events of Default",
            summary: "Paragraphs (h) and (i) of Section 7.01 distinguish between involuntary and voluntary bankruptcy proceedings. An involuntary petition triggers default only after 60 days undismissed — giving the company time to contest. A voluntary filing triggers immediate, automatic acceleration of the entire $1,999.1M Term Loan. In a free-fall filing without RSA, this automatic acceleration creates immediate pressure: all accrued interest, fees, and the Applicable Premium (make-whole) become due, establishing the baseline claim amount for the bankruptcy proceeding."
          },
          {
            ref: "Section 9.02(b)(x)",
            title: "DIP Financing Sacred Right",
            summary: "This is the single most important provision for the free-fall DIP scenario. Section 9.02(b)(x) prohibits any DIP facility that would subordinate the Term Loan obligations or prime the Collateral liens without unanimous lender consent — unless each lender is offered pro rata participation on the same terms. This means any DIP lender group cannot exclude minority Term Loan holders from the DIP, preventing the kind of value extraction that occurred in cases like Del Monte. The provision also explicitly references Section 364 of the Bankruptcy Code, demonstrating the drafters anticipated a potential Chapter 11 filing."
          },
          {
            ref: "Section 8.01",
            title: "Agent Appointment and Authority",
            summary: "WSFS (the Administrative and Collateral Agent) acts at the Direction of the Required Lenders. In a free-fall filing, the Agent's role becomes critical: it files proofs of claim on behalf of the lender group, participates in DIP negotiations, and coordinates enforcement actions. However, Section 8.03 provides broad exculpation — the Agent has no duty to inquire into defaults and is not liable absent gross negligence. In chaotic free-fall scenarios, lender self-help through ad hoc group formation becomes essential because the Agent will not independently protect individual lender interests."
          },
          {
            ref: "Section 6.01(b)",
            title: "Restriction on Priming Indebtedness",
            summary: "Section 9.02(b)(x) cross-references Section 6.01(b), which cannot be amended without unanimous lender consent. This provision restricts the incurrence of debt that would be senior to the Term Loan obligations, creating a contractual 'anti-priming' shield. In a bankruptcy, the court has authority under Section 364(d) to authorize priming DIP financing over contractual objections, but must find that existing lienholders are 'adequately protected' — typically through replacement liens, equity cushion, or periodic cash payments."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Section 6.01(d)",
            title: "Cross-Default to Material Indebtedness",
            summary: "A default on Indebtedness of $150M or more triggers an Event of Default under DOC 2. Since the DOC 4 Term Loan ($1,999.1M) far exceeds this threshold, any Term Loan default or acceleration immediately cross-defaults the $857M Muvico 15% PIK Notes. In a free-fall filing, this cascade is automatic and simultaneous, meaning all Muvico-level debt is in default from day one. The cross-default also creates pre-petition claims that must be classified and treated in any eventual plan of reorganization."
          },
          {
            ref: "Section 4.05",
            title: "Limitation on Indebtedness",
            summary: "DOC 2's debt incurrence covenant restricts Muvico from taking on additional debt. In a free-fall filing, the bankruptcy court's authority under Section 364 overrides contractual debt limitations, allowing the debtor to incur DIP financing regardless of indenture restrictions. However, the restriction matters pre-petition: AMC cannot raise new financing to avoid a filing if the incurrence tests are not met. With Muvico leverage at 19.43x, no traditional incurrence basket is available."
          }
        ]
      },
      {
        doc: "doc6",
        sections: [
          {
            ref: "Structural Ring-Fence",
            title: "Odeon Finco PLC Isolation",
            summary: "Odeon Finco PLC is incorporated in England and its $400M of Senior Secured Notes are structurally ring-fenced from AMC's US debt. In a free-fall Chapter 11, the critical question is whether Odeon is included in the US filing. If AMC files only the US entities (AMC holdco and Muvico), Odeon remains outside the US bankruptcy estate and DOC 6 holders' collateral is preserved. If Odeon is included (through a Chapter 15 recognition proceeding or voluntary participation), the ring-fence could be challenged. The free-fall scenario increases the risk of attempted Odeon inclusion because unsecured creditors and the UCC would push to maximize estate assets."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "court-solutions",
        title: "DIP Financing Mechanics Under Section 364",
        excerpt: "DIP financing under Section 364 of the Bankruptcy Code provides the critical lifeline for a free-fall Chapter 11 filing. Section 364 creates a hierarchy of post-petition financing authority: 364(a) permits ordinary course unsecured credit; 364(c) permits credit with super-priority administrative expense status; 364(d) permits priming liens senior to existing secured debt. For AMC, a DIP facility would likely require 364(d) authority given the fully encumbered collateral package. The court must find that existing secured creditors are 'adequately protected' before authorizing priming liens — typically demonstrated through equity cushion in the collateral, replacement liens on unencumbered assets, or periodic adequate protection payments. The DIP market for theatre operators has been tested: Cineworld secured a $1.94B DIP in its 2022 filing, establishing market precedent for large theatre chain DIP facilities."
      },
      {
        source: "muvico-deep-dive",
        title: "Substantive Consolidation Risk",
        excerpt: "A free-fall filing raises substantive consolidation risk between the AMC parent and Muvico entities. Substantive consolidation — treating multiple legal entities as a single estate for distribution purposes — would eliminate the structural priority that Muvico-level creditors (DOC 4, DOC 2) enjoy over AMC-level creditors (DOC 3, DOC 1). Courts apply a multi-factor test, considering whether: (1) the entities maintained separate books and records; (2) assets and liabilities were commingled; (3) the entities observed corporate formalities; (4) creditors relied on the separate existence of each entity. Given that AMC and Muvico share management, offices, and certain cash management functions, there is a non-trivial risk of consolidation arguments. If granted, consolidation would dramatically alter the recovery waterfall — DOC 4 holders would lose their structural priority at Muvico and compete with all creditors on an equal footing against the consolidated estate."
      }
    ],
    detailedMechanics: "The free-fall Chapter 11 filing represents the disorderly end of the restructuring spectrum. Unlike a prepack, there is no pre-negotiated roadmap — the filing is reactive rather than planned, typically triggered by a liquidity crisis, failed negotiations, or a cross-default cascade.\n\nThe filing itself generates immediate consequences. Section 362's automatic stay halts all collection actions, providing breathing room, but also halts AMC's ability to make interest payments on any debt instrument. The automatic acceleration of the DOC 4 Term Loan under Section 7.01(i) triggers cross-defaults across the entire capital structure within hours. AMC's management continues as debtor-in-possession under Sections 1107-1108, but operates under heightened fiduciary duties to all stakeholders.\n\nThe DIP financing battle is the defining feature of a free-fall case. AMC's $417M cash balance provides limited runway — approximately 12-18 months at current burn rates, but likely less once vendors demand cash-on-delivery terms and studio content suppliers reassess relationships. A $500-800M DIP facility becomes essential. The DOC 4 Term Loan holders are the natural DIP providers: they know the business, hold the first-priority collateral, and can structure the DIP to include roll-up provisions converting pre-petition Term Loan claims into super-priority DIP claims. Section 9.02(b)(x) of DOC 4 mandates that all Term Loan lenders receive pro rata DIP participation rights, ensuring no lender is excluded. However, the DIP terms — interest rate (typically SOFR + 800-1000bps), fees (2-3% origination), milestones (plan filing within 120 days, confirmation within 270 days), and roll-up mechanics — are negotiated under time pressure, often disadvantaging junior creditors who have limited voice in DIP negotiations.\n\nThe UCC appointment under Section 1102 introduces a new player with standing to investigate pre-petition transactions. The UCC would scrutinize the 2021 Muvico dropdown, the 2024 LME, and any pre-filing transfers, potentially asserting avoidance actions that could recover value for the unsecured estate. This litigation risk — absent in a prepack — adds uncertainty and extends the case timeline.\n\nThe exclusivity period under Section 1121 gives AMC 120 days (extendable to 18 months) to propose a plan. If exclusivity expires, creditors may file competing plans, creating a contested confirmation process that further delays emergence. Extended free-fall cases erode value through professional fees (which can reach $50-100M+ for large cases), operational disruption, and loss of key employees and content relationships.",
    applicability: "The free-fall scenario is most likely to materialize if AMC's out-of-court restructuring negotiations fail — particularly if competing creditor factions cannot agree on plan terms, if a surprise liquidity event depletes the $417M cash balance, or if a cross-default cascade is triggered by missing an interest payment. With total annual cash interest of approximately $267M against $321M EBITDA, the margin for error is razor-thin. A single quarter of below-expectation box office performance could trigger covenant issues or liquidity shortfalls that force an unplanned filing. The DIP market dynamics favor the DOC 4 Term Loan holders, who would likely provide the DIP facility and use it to consolidate control over the restructuring process — capturing DIP economics (origination fees, above-market interest, roll-up) while simultaneously improving their position relative to junior creditors. The extended timeline (12-24 months typical for large free-fall cases) creates value leakage through professional fees, operational disruption, and loss of going-concern premium — making this the second-worst outcome after Chapter 7 for most creditor classes."
  },

  /* ─── 363 CREDIT BID / ASSET SALE ───────────────────────────────────── */
  "363-credit-bid": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 7.03",
            title: "Application of Proceeds",
            summary: "After exercise of remedies, all amounts collected are applied per the Pledge and Security Agreement waterfall, with the Term Loan at the top. In a 363 sale, the sale proceeds substitute for the collateral — the waterfall applies to cash received from a third-party bidder, while in a credit bid, the Term Loan lenders effectively take the assets in satisfaction of their claims. Section 7.03 confirms the 1L priority that makes the credit bid so powerful: no other creditor can access Muvico-level collateral proceeds until the Term Loan is satisfied in full."
          },
          {
            ref: "Section 9.02(b)(vii)",
            title: "Collateral Release Sacred Right",
            summary: "Releasing all or substantially all Collateral from the Security Document liens requires unanimous lender consent. In a 363 sale, the court's authority under Section 363(f) overrides this contractual requirement — assets are sold 'free and clear' of all liens by court order. However, the sacred right matters for the credit bid structure: if the Term Loan lenders credit bid, the liens are satisfied (not released), meaning no unanimous consent is needed. This is a technical but important distinction that favors the credit bid path over an out-of-court asset sale."
          },
          {
            ref: "Section 9.04",
            title: "Successors and Assigns",
            summary: "The assignment provisions govern secondary market trading of the Term Loan at $1M minimum increments. In the credit bid context, lenders who accumulated Term Loan positions at a discount (current trading at ~76 cents) would realize significant gains through a credit bid at face value ($1,999.1M) — effectively acquiring the theatre portfolio at a discount to the going-concern value if the credit bid exceeds the EV that junior creditors can demonstrate through a contested valuation."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Intercreditor Agreement",
            title: "Subordination of DOC 2 Enforcement Rights",
            summary: "Under the intercreditor framework governing the Muvico collateral, the DOC 2 holders (1.5L at Muvico) have subordinated their lien enforcement rights to the DOC 4 collateral agent. This means DOC 2 holders cannot independently block a 363 sale approved by the Term Loan lenders and the court. Their recourse is limited to arguing the sale price undervalues the assets (to preserve their recovery on any excess proceeds above the Term Loan claims) or seeking appointment of an examiner to challenge the credit bid valuation."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "court-solutions",
        title: "363 Asset Sales and Credit Bidding",
        excerpt: "Section 363(b) of the Bankruptcy Code authorizes the trustee (or debtor-in-possession) to sell property of the estate outside the ordinary course of business, subject to court approval. Section 363(k) provides the critical credit bidding right: 'At a sale under subsection (b) of this section, of property that is subject to a lien that secures an allowed claim, unless the court for cause orders otherwise the holder of such claim may bid at such sale, and, if the holder of such claim purchases such property, such holder may offset such claim against the purchase price of such property.' The Supreme Court in RadLAX Gateway Hotel, LLC v. Amalgamated Bank (2012) unanimously held that a Chapter 11 plan proposing to sell encumbered assets free and clear of liens must permit the lienholder to credit bid under Section 363(k). This ruling eliminated the possibility of stripping credit bidding rights through plan confirmation, making the 363 credit bid one of the most powerful tools available to secured creditors."
      },
      {
        source: "lender-strategy",
        title: "Credit Bid Strategy for Term Loan Holders",
        excerpt: "For DOC 4 Term Loan holders who accumulated positions at a discount to par (currently ~76 cents), the credit bid represents a potentially lucrative exit strategy. By credit bidding the full $1,999.1M face amount of their claims, they acquire the Muvico operating assets at an effective cost equal to their discounted purchase price — if a holder bought at 76 cents, their effective acquisition price for the theatre portfolio is approximately $1,519M, potentially well below the going-concern enterprise value. The strategic logic is straightforward: set the credit bid as the stalking horse at $1,999.1M (plus assumption of DIP claims), establish break-up fee protections, and effectively dare third-party buyers to outbid in cash. Given the specialized nature of theatre assets and the distressed market conditions, third-party bids exceeding $2B in cash are unlikely, making the credit bid the probable winning bid."
      }
    ],
    detailedMechanics: "The 363 credit bid process is typically used as either (a) the primary restructuring path from the outset, where the debtor and controlling secured creditors agree that a sale maximizes estate value, or (b) the fallback path embedded in an RSA or DIP order as a milestone — if plan confirmation fails by a specified date, the assets are sold via 363 sale to the credit bidding secured lenders.\n\nThe process begins with the debtor (AMC as debtor-in-possession) filing a sale motion under Section 363(b). The motion identifies the stalking horse bidder — in this case, the DOC 4 Term Loan lender group, which executes a stalking horse asset purchase agreement (APA). The APA specifies the purchase price (the credit bid amount of $1,999.1M), the assumed liabilities (typically DIP claims, cure amounts for assumed leases, and priority administrative claims), and the excluded liabilities (pre-petition unsecured claims, rejected lease claims). The stalking horse receives protections: a break-up fee (2-4% of purchase price, or $40-80M) payable if outbid, expense reimbursement, and potentially overbid protections (minimum bid increments of $5-10M).\n\nThe court sets bid procedures, including a bid deadline, qualification requirements for competing bidders, and auction rules. Any competing bidder must submit an all-cash bid exceeding the credit bid amount plus the minimum overbid increment. Given that the credit bid equals $1,999.1M, a competing cash bidder would need to offer approximately $2.0-2.1B — an extremely high bar for theatre assets trading at distressed valuations. If no qualified competing bid is received, the court approves the sale to the stalking horse without an auction.\n\nThe sale order approves transfer of assets 'free and clear' of all liens, claims, encumbrances, and interests under Section 363(f). Existing liens attach to the sale proceeds — but since the credit bid satisfies the Term Loan lien, only excess proceeds (if any) flow to junior lienholders. The DOC 2 Muvico 15% PIK Notes ($857M at 1.5L) recover only from proceeds exceeding $1,999.1M plus administrative claims — likely zero or de minimis unless the enterprise value substantially exceeds the Term Loan claims.\n\nPost-sale, the acquiring entity (NewCo) emerges as a private company owned by the former Term Loan holders, operating the domestic theatre portfolio free of the legacy capital structure. The remaining AMC bankruptcy estate contains only: residual AMC holdco assets, any cash from the sale not needed to satisfy senior claims, and the causes of action (avoidance actions, preference claims). The Chapter 11 case then either confirms a liquidating plan distributing remaining assets or converts to Chapter 7.",
    applicability: "The 363 credit bid is the preferred outcome for DOC 4 Term Loan holders because it allows them to capture the going-concern value of the theatre portfolio at an effective cost below the likely enterprise value. At $1,999.1M in secured claims against an estimated going-concern EV of $2.5-3.5B, the credit bid captures $500M-$1.5B of value above the lenders' claim — value that would otherwise be shared with junior creditors in a plan of reorganization. The theatre portfolio is well-suited to a going-concern 363 sale: the assets (leasehold interests, projection and concession equipment, the AMC brand, the AMC Stubs program with 30M+ members, and established studio content supply relationships) are worth far more as an integrated network than if parted out. The Odeon operations ($400M DOC 6) would be excluded from a domestic 363 sale, as the English law ring-fence prevents US court authority over those assets. The primary risk for the credit bidders is that a competing all-cash offer emerges — unlikely at the required threshold, but possible if a strategic acquirer (another theatre chain, a private equity firm, or a media company) sees strategic value exceeding $2B in AMC's domestic operations."
  },

  /* ─── CHAPTER 7 LIQUIDATION ─────────────────────────────────────────── */
  "ch7-liquidation": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 7.01(h)/(i)",
            title: "Bankruptcy Events of Default — Automatic Acceleration",
            summary: "In a Chapter 7 liquidation, Section 7.01's automatic acceleration provision becomes the final exercise of creditor rights under the credit agreement. The entire $1,999.1M principal, all accrued interest, and the Applicable Premium become immediately due. However, in Chapter 7, 'due and payable' is an academic concept — the actual recovery depends entirely on the liquidation proceeds distributed through the absolute priority waterfall. The Applicable Premium claim (the make-whole amount) is asserted as part of the secured claim, though its enforceability in a liquidation context is contested."
          },
          {
            ref: "Section 7.03",
            title: "Application of Proceeds — Liquidation Waterfall",
            summary: "Section 7.03 directs that remedies proceeds follow the Pledge and Security Agreement's waterfall. In Chapter 7, this waterfall is superseded by the Bankruptcy Code's distribution priority under Section 726: administrative expenses first (trustee fees, wind-down costs), then secured claims (to the extent of collateral value), then priority unsecured claims, then general unsecured claims, then subordinated claims, then equity. The contractual waterfall from DOC 4 still governs the relative priority among secured tranches claiming against the Muvico collateral (Term Loan first, then DOC 2 PIK Notes, etc.), but the bankruptcy distribution scheme controls the overall framework."
          },
          {
            ref: "Section 9.02(b)(vii)",
            title: "Collateral Release — Irrelevant in Chapter 7",
            summary: "The sacred right requiring unanimous consent for collateral release becomes irrelevant in Chapter 7 — the trustee has authority under Sections 363 and 725 to liquidate estate property without creditor consent. The contractual protections that were designed to preserve collateral value during the loan's life cannot prevent liquidation once the Chapter 7 trustee is appointed. This highlights the fundamental limitation of contractual protections: they protect during the life of the agreement but are overridden by bankruptcy court authority in a liquidation."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Section 6.01(e)/(f)",
            title: "Bankruptcy Events of Default",
            summary: "DOC 2's bankruptcy Events of Default mirror DOC 4's structure: involuntary proceedings trigger default after 60 days, voluntary filings trigger automatic acceleration. In Chapter 7, all DOC 2 claims ($857M face plus accrued PIK interest plus Applicable Premium) become part of the creditor pool. At the 1.5L position in the Muvico waterfall, DOC 2 holders recover only after the $1,999.1M Term Loan is fully satisfied from Muvico collateral — in a liquidation scenario with severe value destruction, this likely means zero or de minimis recovery from the Muvico estate."
          }
        ]
      },
      {
        doc: "doc6",
        sections: [
          {
            ref: "Structural Ring-Fence",
            title: "Odeon Survival in US Chapter 7",
            summary: "The Odeon ring-fence under DOC 6 provides the clearest example of structural protections surviving a Chapter 7 liquidation. Odeon Finco PLC, incorporated in England, is not part of the US bankruptcy estate unless a Chapter 15 cross-border proceeding brings it in. In a Chapter 7 liquidation of AMC's US entities, Odeon may continue operating independently — DOC 6 holders ($400M) retain their ring-fenced collateral claim against Odeon's European theatre assets. However, Odeon's own leverage (26.67x on $15M EBITDA) means it faces its own restructuring challenges independent of the US liquidation."
          }
        ]
      },
      {
        doc: "doc1",
        sections: [
          {
            ref: "Deleted Sections 4.05-4.11",
            title: "Covenant-Stripped Sub Notes in Liquidation",
            summary: "The DOC 1 subordinated notes ($125.5M) had their protective covenants stripped in the 2020 supplemental indenture — Sections 4.05 through 4.11 (Restricted Payments, Asset Sales, Debt Incurrence, Liens, Affiliate Transactions, Subsidiary Dividends, Lines of Business) were deleted. In a Chapter 7 liquidation, this covenant stripping is irrelevant because all claims are adjudicated under the Bankruptcy Code's absolute priority rule rather than contractual protections. However, the covenant stripping does mean DOC 1 holders had no contractual tools to prevent the pre-petition value destruction that contributed to the liquidation outcome — they arrive at Chapter 7 with the weakest position of any creditor class."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "court-solutions",
        title: "Chapter 7 Liquidation Framework",
        excerpt: "Chapter 7 liquidation is governed by Sections 701-784 of the Bankruptcy Code. The Chapter 7 trustee is an independent fiduciary appointed by the United States Trustee whose sole mission is to marshal and liquidate estate assets for distribution to creditors under the absolute priority rule of Section 726. Unlike Chapter 11, there is no plan of reorganization, no voting by creditor classes, and no debtor-in-possession — the trustee controls all estate property and makes all liquidation decisions. For a theatre operator like AMC, Chapter 7 is particularly destructive because the primary assets are leasehold interests, which have value only as part of an operating business. Once the trustee ceases operations and rejects the leases under Section 365, the locations revert to landlords and the going-concern value is permanently destroyed. Equipment and FF&E typically recover 10-25% of replacement cost at forced liquidation, and brand/IP value is severely impaired without ongoing operations."
      },
      {
        source: "muvico-deep-dive",
        title: "Muvico Asset Recovery in Liquidation",
        excerpt: "Muvico's $3.1B debt stack against $175.5M EBITDA (19.43x leverage) makes the entity deeply insolvent even on a going-concern basis. In a liquidation scenario, the destruction of going-concern value would reduce recoverable assets to hard asset values — primarily theatre equipment, owned real property (limited — most locations are leased), intellectual property, and receivables. Industry comparable data suggests theatre chain liquidation recoveries range from 40-60% of going-concern operating value. Applying this discount to an estimated going-concern EV of $2.5B produces liquidation value of $1.0-1.5B — against $3.1B of Muvico-level debt, implying Term Loan recoveries of 50-75% and near-zero recovery for all junior Muvico tranches. At the AMC holdco level, residual assets (brand, non-Muvico interests) would produce minimal additional recovery for DOC 3 and DOC 1 holders."
      }
    ],
    detailedMechanics: "Chapter 7 liquidation is the terminal restructuring outcome — the point at which the going concern ceases to exist and assets are converted to cash for distribution. The process is methodical and governed entirely by the Bankruptcy Code rather than contractual agreements.\n\nUpon conversion from Chapter 11 (Section 1112) or direct filing, the US Trustee appoints a Chapter 7 trustee — an independent professional (typically an attorney or accountant experienced in liquidation proceedings) whose fiduciary duty runs to all creditors of the estate. The debtor's management is removed from all decision-making authority. The trustee takes possession of all estate property under Section 704.\n\nThe trustee's first operational decision is whether to continue operating the business for a limited period under Section 721 (which permits continued operation if it is in the 'best interest of the estate' and consistent with an orderly liquidation) or to cease operations immediately. For AMC's theatre network, limited continued operation might maximize value by allowing an orderly sale of operating locations rather than immediate closure. However, ongoing operations require ongoing cash expenditure (employee costs, rent, utilities, content licensing), which reduces estate value if the operations are cash-flow negative.\n\nLease rejection under Section 365 is the most impactful trustee action. AMC's approximately 600 domestic theatre leases represent the company's largest ongoing obligation ($400-800M annually). In Chapter 7, the trustee can reject any unexpired lease, creating an unsecured claim for the landlord capped under Section 502(b)(6) at the greater of one year's rent or 15% of the remaining lease term (not to exceed three years). These rejection claims dilute the unsecured creditor pool. Alternatively, the trustee can assign valuable leases to third parties for consideration, capturing value from below-market leases in prime locations.\n\nAsset liquidation proceeds through multiple channels: public auctions for FF&E and equipment (conducted by firms like Hilco or Gordon Brothers), negotiated sales of intellectual property and brand assets (the AMC name, AMC Stubs program database, proprietary technology), and distribution of cash on hand. Going-concern discount for theatre chains is severe — industry data from comparable liquidations suggests 40-60% of operating EV, reflecting the loss of network effects, content supply relationships, and brand goodwill that exist only in an operating business.\n\nDistribution under Section 726 follows strict absolute priority: (1) Chapter 7 administrative expenses (trustee compensation at 3-5% of distributions, attorneys, accountants, auctioneers); (2) priority claims (employee wages up to $15,150 per employee, tax claims); (3) secured claims to the extent of collateral value (DOC 4 first from Muvico assets, DOC 2 from remaining Muvico collateral, DOC 6 from Odeon assets if included); (4) general unsecured claims (trade vendors, rejected lease claims, unsecured deficiency claims); (5) subordinated claims (DOC 1 Sub Notes, behind the subordination provisions); (6) equity interests.",
    applicability: "Chapter 7 represents the floor recovery scenario against which all other restructuring alternatives are measured. Under Section 1129(a)(7) of the Bankruptcy Code, any Chapter 11 plan must satisfy the 'best interests of creditors' test — each individual creditor must receive at least as much under the plan as it would in a Chapter 7 liquidation. This makes the Chapter 7 analysis the fundamental baseline for all AMC restructuring negotiations.\n\nAt estimated liquidation values of $1.0-1.5B (40-60% of $2.5B going-concern EV), the DOC 4 Term Loan ($1,999.1M) would recover approximately 50-75% of face value — a significant loss but still the best outcome of any tranche due to first-priority positioning. The DOC 2 Muvico 15% PIK Notes ($857M+ with PIK accrual) would recover 0-10% from any residual Muvico collateral value above the Term Loan claims. AMC-level instruments (DOC 3 at $360M, DOC 1 at $125.5M) would recover 0-5% from the severely limited AMC holdco asset pool. The DOC 6 Odeon notes ($400M) represent a special case: if Odeon is not included in the US liquidation, DOC 6 holders' recovery depends entirely on the Odeon ring-fenced assets — at 26.67x leverage, Odeon's own recovery analysis must be conducted independently.\n\nThe key takeaway for AMC stakeholders is that every other scenario — prepack, free-fall Chapter 11, 363 sale, and all out-of-court LME strategies — delivers materially better outcomes than Chapter 7 for every creditor class. This shared downside creates the fundamental incentive for consensual resolution: even competing creditor factions prefer a negotiated restructuring to the value destruction of liquidation."
  },

  /* ═══════════════════════════════════════════════════════════════════════
     OUT-OF-COURT / LME SCENARIOS (8 Existing)
     ═══════════════════════════════════════════════════════════════════════ */

  /* ─── UPTIER EXCHANGE ─────────────────────────────────────────────────── */
  "uptier-exchange": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 9.02",
            title: "Waivers; Amendments",
            summary: "Most amendments require consent of the Required Lenders (majority by outstanding principal). However, certain 'sacred rights' require unanimous lender consent: reducing principal or interest rate, extending maturity, releasing all or substantially all collateral or guarantees, and changing the Required Lender threshold. Critically, lien subordination is addressed separately in clause (x)(B), which requires each lender's consent only for Specified Indebtedness where Liens securing the Obligations would be subordinated -- but includes a carve-out allowing the priming if each adversely affected lender is offered a bona fide opportunity to fund its pro rata share of the new super-priority facility on the same terms. This 'open offer' mechanism is the legal gateway for an uptier exchange."
          },
          {
            ref: "Section 9.02(x)(B)",
            title: "Specified Indebtedness / Lien Subordination",
            summary: "No amendment may permit the issuance of Indebtedness to which the Obligations would be subordinated in right of payment or Liens on the Collateral would be subordinated ('Specified Indebtedness') unless each Lender has been offered a bona fide opportunity to fund its pro rata share on the same terms (other than bona fide backstop fees and counsel expenses). A majority coalition that makes an open offer to all lenders satisfies the condition even if minority lenders decline to participate. This provision was drafted with post-Serta awareness and represents an enhanced protection compared to the pre-2020 credit agreements that Serta exploited."
          },
          {
            ref: "Section 9.02(xi)",
            title: "Unrestricted Subsidiary Prohibition",
            summary: "No amendment may permit any Subsidiary to be designated as an 'Unrestricted Subsidiary' or permit transfer of assets to Unrestricted Subsidiaries without unanimous lender consent. This blocks the J.Crew dropdown path through the credit agreement but does not block uptier exchanges, which operate through the lien subordination mechanism rather than asset transfer."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Section 9.02",
            title: "With Consent of Holders",
            summary: "Amendments to the Muvico 15% PIK Notes indenture require consent of holders of at least a majority in aggregate principal amount. Sacred rights requiring unanimous consent include changing maturity dates, reducing principal/interest rates, changing payment currency, impairing the right to sue for payment, and reducing the amendment threshold. Lien priority changes require 66 2/3% consent (not unanimity) under the proviso following clause (e) -- a lower bar that creates a separate vulnerability. An uptier affecting DOC 2 holders requires this supermajority coalition to modify the intercreditor arrangement."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "Uptier Exchange Mechanics",
        excerpt: "An uptier exchange is the most aggressive out-of-court liability management technique available to a majority creditor coalition. The mechanics involve a group of lenders accumulating more than 50% of the outstanding term loan principal (the Required Lender threshold), then using their amendment power to create a new super-priority tranche that sits ahead of all existing debt in the collateral waterfall. The participating lenders exchange their existing claims into the new tranche at par or a premium, while non-participating lenders are left with structurally subordinated paper. The legal foundation rests on the gap between 'sacred rights' (which require unanimity) and majoritarian amendment powers. In most post-2017 credit agreements, lien subordination is not a sacred right requiring unanimous consent, creating the opening for an uptier. The Serta Simmons transaction in 2020 was the landmark case that proved the viability of this technique, though subsequent litigation has created legal uncertainty around enforceability."
      },
      {
        source: "case-studies",
        title: "Serta Simmons / Boardriders / Envision Precedents",
        excerpt: "The Serta Simmons uptier (2020) saw a majority lender group create $200M in super-priority first-out term loans and $875M in super-priority second-out notes, priming non-participating lenders who were pushed to third-out status. The non-participating lenders sued, and in 2023 Judge Jones ruled the transaction violated the credit agreement's open-market purchase provisions and implied covenant of good faith. Boardriders (2019) involved a similar majority-driven exchange that subordinated minority lenders, while Envision Healthcare (2023) featured a contested uptier that was challenged in bankruptcy court. These cases establish both the viability and the litigation risk of uptier exchanges -- a risk that DOC 4's enhanced Section 9.02(x)(B) protections attempt to mitigate."
      }
    ],
    detailedMechanics: "Participating lenders accumulate more than 50% of the outstanding $1,999.1M Term Loan principal through open-market purchases, reaching the Required Lender threshold specified in DOC 4. Once the blocking position is achieved, the coalition executes an amendment to the credit agreement that (a) creates a new super-priority secured tranche above the existing Term Loan, (b) exchanges the participating lenders' existing Term Loan claims into the new super-priority paper at par or a modest premium, and (c) re-allocates the collateral package to secure the new tranche on a first-out basis. DOC 4 Section 9.02(x)(B) contains the critical mechanism: lien subordination requires each lender's consent only if lenders are not offered their pro rata share of the new facility. A coalition that makes an open offer to all lenders -- knowing that minority holdouts will decline -- can argue it has satisfied this condition. The Muvico 15% PIK Notes (DOC 2), which sit at the 1.5L position in the Muvico waterfall, are simultaneously primed because their intercreditor agreement permits lien priority changes with 66 2/3% holder consent rather than unanimity. Holdout Term Loan lenders are left with debt that is now effectively second-out or third-out on the collateral, dramatically reducing their expected recovery in any subsequent restructuring or bankruptcy proceeding.",
    applicability: "AMC's $1,999.1M Term Loan (DOC 4) is the dominant tranche in a capital structure where Consolidated EBITDA of $321M covers total interest only 0.83x. The dual-borrower structure (AMC + Muvico co-borrowers) concentrates most secured debt at the Muvico entity, creating a single large pool of term loan debt amenable to majoritarian action. DOC 4's Section 9.02 follows post-2017 market terms with the 'open offer' carve-out for lien subordination in clause (x)(B) -- a provision that was drafted with awareness of the Serta precedent and represents an enhanced protection compared to pre-2020 documents. However, the open-offer mechanism can still be exploited by a well-organized coalition that makes a technically compliant offer while structuring terms to discourage participation by smaller holders. With leverage at 19.43x at Muvico and interest coverage of 0.54x, the economic pressure to restructure is acute, making lenders willing to act aggressively before a bankruptcy filing that might result in worse outcomes. The February 2029 maturity creates a definitive deadline forcing action."
  },

  /* ─── J.CREW DROPDOWN ─────────────────────────────────────────────────── */
  "jcrew-dropdown": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 6.08",
            title: "Restricted Payments; Certain Payments of Indebtedness",
            summary: "Borrowers may not declare dividends, repurchase equity, or make payments on junior indebtedness except from specified baskets: (a) general basket (greater of $50M and 2% of Total Assets); (b) payments on junior debt using refinancing proceeds; (c) dividends paid in equity; (d) repurchases from employees (capped at $1M after Effective Date). The Credit Agreement restricts not just equity distributions but also payments on junior debt, meaning AMC cannot voluntarily prepay the Muvico PIK notes or other junior tranches without fitting within these baskets. However, the aggregate basket capacity across multiple categories may provide sufficient headroom for a staged asset transfer."
          },
          {
            ref: "Section 6.04",
            title: "Investments",
            summary: "The Investments covenant restricts AMC from making loans, advances, or capital contributions to entities outside the restricted group. Permitted Investments include investments in Subsidiaries that are Loan Parties, investments in the ordinary course of business, and investments fitting within a general basket. The key for a dropdown is the capacity to designate a new subsidiary and contribute assets to it -- if the contribution fits within the Investment basket, the asset transfer is contractually permitted even if it diminishes the value of the collateral package."
          },
          {
            ref: "Section 9.02(xi)",
            title: "Unrestricted Subsidiary Prohibition (J.Crew Blocker)",
            summary: "DOC 4 requires unanimous lender consent to designate any Subsidiary as an Unrestricted Subsidiary or to permit transfers to Unrestricted Subsidiaries or entities 'otherwise not subject to the provisions of the Credit Documents.' This is an enhanced protection compared to many credit agreements and represents the primary contractual barrier to a classic J.Crew dropdown. The provision was specifically drafted as a 'J.Crew blocker' -- language that became standard in credit agreements after the original J.Crew transaction demonstrated the vulnerability. Creative structuring around this provision would be required."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "J.Crew IP Transfer Mechanics",
        excerpt: "The J.Crew transaction (2017) involved transferring the company's most valuable intellectual property -- the J.Crew and Madewell brand names -- to a newly created unrestricted subsidiary beyond the reach of existing secured creditors. The transfer exploited basket capacity in the existing credit agreement's Investment and Restricted Payment covenants, using a series of intercompany transactions that individually fit within permitted baskets but collectively moved hundreds of millions in asset value outside the collateral package. The new subsidiary then issued fresh debt secured by the transferred IP. Subsequent credit agreements have included 'J.Crew blockers' -- DOC 4's Section 9.02(xi) is exactly such a provision -- but creative structuring using Restricted Subsidiaries that are not Loan Parties (rather than Unrestricted Subsidiaries) may circumvent the blocker."
      },
      {
        source: "case-studies",
        title: "J.Crew / Travelport / PetSmart-Chewy Precedents",
        excerpt: "J.Crew (2017) demonstrated the dropdown by transferring brand IP to an unrestricted subsidiary and raising $250M against it. Travelport (2019) executed a similar move with operating technology assets. PetSmart/Chewy (2018) saw the transfer of Chewy equity to an unrestricted subsidiary, preserving its value for equity holders at the expense of PetSmart's creditors. Each case exploited cumulative basket capacity in the Investment and Restricted Payment covenants, proving that even modest individual basket amounts can, through creative sequencing, enable transfers of substantial value. AMC itself executed a version of this technique in 2021 with the Muvico LLC formation."
      }
    ],
    detailedMechanics: "AMC management identifies the most valuable separable assets in the collateral package -- primarily domestic theatre operating rights, loyalty program IP (AMC Stubs), and long-term lease interests -- and engineers a multi-step transfer. The execution must navigate DOC 4's Section 9.02(xi), which requires unanimous lender consent to designate Unrestricted Subsidiaries. The primary workaround: structure the recipient entity as a Restricted Subsidiary that is not a Loan Party, rather than an Unrestricted Subsidiary. Asset transfers to a non-Loan Party Restricted Subsidiary can be structured as permitted Investments under Section 6.04 using available basket capacity. The distinction matters: Section 9.02(xi) blocks Unrestricted Subsidiary designations but does not similarly restrict all transfers to non-Loan-Party Restricted Subsidiaries. Once assets reside in the new entity, AMC issues new priority financing secured solely by those assets -- the new lenders have a clean, unencumbered collateral claim while existing creditors' collateral is materially diminished. DOC 4's Section 6.08 Restricted Payments baskets (general: $50M/2% Total Assets; employee: $1M; refinancing; equity dividends) and Section 6.04 Investment baskets cumulatively may provide sufficient capacity to effectuate the transfer in stages over multiple quarters.",
    applicability: "AMC's existing capital structure is itself the product of a prior dropdown -- the Muvico LLC formation in 2021 moved the core theatre portfolio to raise $3.1B of new debt at the Muvico level, subordinating the legacy AMC 6.125% Sub Notes (DOC 1). The covenant structure in DOC 4 was negotiated to permit flexibility, as evidenced by the original Muvico transaction. However, Section 9.02(xi) -- the J.Crew blocker requiring unanimous consent for Unrestricted Subsidiary designations -- is a significant barrier not present in the original J.Crew documents. Creative structuring around this provision using Restricted Subsidiary designations, or accumulating sufficient Term Loan positions to amend the credit agreement, would be required. With the AMC 7.5% Notes ($360M face) trading at 86.49 cents and AMC residual EBITDA of only $145.5M, equity and management have incentives to extract holdco value before formal restructuring that would give creditors control."
  },

  /* ─── PIK TOGGLE CONVERSION ───────────────────────────────────────────── */
  "pik-toggle-conversion": {
    docEvidence: [
      {
        doc: "doc7",
        sections: [
          {
            ref: "Article II",
            title: "The Notes (PIK Toggle Mechanics)",
            summary: "The PIK Toggle Exchangeable Notes are $414M face value notes issued by Muvico, LLC with a toggle feature: 6% cash interest OR 8% PIK interest at the Company's election on each interest payment date. No creditor approval is required for the election. The toggle feature gives Muvico flexibility to preserve cash by electing PIK, but this causes the outstanding principal to grow at 8% annually, increasing the debt burden and diluting recovery for these 2L holders who are already the most junior secured tranche at Muvico."
          },
          {
            ref: "Section 2.01",
            title: "Amount of Notes; Additional Notes",
            summary: "Authorizes the initial issuance of $414,433,523 aggregate principal amount of notes, with the ability to issue additional pari passu notes subject to the Company's compliance with Section 4.05(b)(ii). The PIK accrual mechanism effectively creates 'additional notes' through interest capitalization rather than new issuance, growing the claim over time without triggering the indebtedness covenant's new-issuance restrictions."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Article IV (Covenants)",
            title: "Leverage-Based Interest Rate Grid",
            summary: "The Muvico 15% PIK Notes feature a leverage-based interest rate grid: Level 1 (>=7.50x leverage): base 7.50% + 1.50% cash + 6.00% PIK = 15% total; Level 2 (6.50-7.50x): base 7.50% + 2.375% cash + 2.375% PIK = 12.25% total; Level 3 (<6.50x): base 7.50% + 4.00% cash = 11.50% total. At current ~19.4x Muvico leverage, these notes are firmly in Level 1, paying 9% cash + 6% PIK. The leverage grid means DOC 2's own PIK component is already accruing at maximum rates, compounding the PIK Toggle effect across two instruments."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "PIK Toggle Strategy and Cash Preservation",
        excerpt: "PIK toggle notes give the issuer the option to pay interest either in cash or by increasing the principal balance. In a distressed capital structure, the PIK election serves dual purposes: (1) it preserves near-term cash liquidity for the issuer, extending the runway to maturity, and (2) it grows the outstanding debt balance, changing the capital structure dynamics. A sophisticated creditor holding positions across multiple tranches can use the PIK election strategically -- growing a 2L claim to create a larger blocking position in a future restructuring, or accumulating a larger claim at a discount to face value that will benefit from recovery in a reorganization. The cash-versus-PIK trade-off is a function of the issuer's liquidity position and the time horizon to restructuring."
      },
      {
        source: "lme-concepts",
        title: "PIK Accrual and Recovery Dilution",
        excerpt: "PIK interest accrual mechanically increases total claims against an enterprise without increasing its asset base. In a waterfall model, growing PIK claims dilute recovery for all creditors -- both the PIK holders themselves (who receive a larger nominal claim with the same total recovery pool) and other creditors in the same or junior tranches. The dilution effect is particularly acute when enterprise value is insufficient to cover all claims in full. In AMC's structure, PIK accrual on both DOC 2 (6% PIK at Level 1) and DOC 7 (8% PIK if elected) compounds the total Muvico-level debt, further deteriorating recovery for all Muvico creditors. Annual PIK accrual across both instruments exceeds $84M."
      }
    ],
    detailedMechanics: "DOC 7 grants the issuer (Muvico LLC) sole discretion to elect, on each interest payment date, whether to pay interest in cash at 6% or as PIK at 8%. This election is made at the company's option with no creditor veto. Under sustained PIK election, the $414.4M face grows by approximately $33.2M per year (8% PIK rate), compounding to roughly $530M by the 2030 maturity if PIK is elected continuously. The DOC 2 leverage grid simultaneously accrues 6% PIK on the $857M Muvico 15% PIK Notes (adding ~$51.4M per year), meaning total Muvico PIK accrual across both tranches exceeds $84M annually. From an offensive creditor perspective, a large holder of the Term Loan or 15% PIK Notes who also accumulates Toggle Notes could use the PIK election to strategically grow the 2L claim, creating a larger blocking position in a future restructuring or using the PIK mechanics to manufacture leverage in negotiations. From a defensive perspective, the issuer's cash preservation rationale for PIK election is straightforward: with interest coverage at 0.54x at Muvico, deferring $24.9M in cash interest on the Toggle Notes (6% on $414.4M) preserves near-term liquidity but increases the ultimate debt burden. The 8% PIK rate versus 6% cash represents a 200bp premium that compounds over time.",
    applicability: "With Muvico interest coverage at 0.54x and total Muvico leverage at 19.43x, the PIK toggle on DOC 7 is a live option AMC management is likely already evaluating to preserve the $417M cash balance. The $414.4M face of Toggle Notes at the 2L position at Muvico means any PIK accretion further deteriorates the already-stressed recovery math. The DOC 2 leverage grid (pinned at Level 1 given 19.43x leverage) ensures PIK accrual on the 15% PIK Notes as well, creating a compounding effect across two instruments. The toggle introduces an optionality asymmetry: management benefits from deferring cash outflows while creditors bear the increasing-principal risk. With the 2030 maturity on both DOC 5 and DOC 7, sustained PIK election through maturity could add over $160M in aggregate PIK accrual to the Muvico debt stack, making the eventual restructuring that much more complex and contentious."
  },

  /* ─── COOPERATION AGREEMENT ───────────────────────────────────────────── */
  "cooperation-agreement": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 9.02",
            title: "Waivers; Amendments (Required Lender Definition)",
            summary: "The Required Lender threshold is defined as holders of more than 50% of the aggregate outstanding principal amount of the Term Loan. All substantive amendments, waivers, and consents require Required Lender approval. A cooperation agreement works by binding a group holding >50% to vote as a bloc, preventing any attacking party from reaching the Required Lender threshold. DOC 4 Section 9.02(v) makes the Required Lender threshold itself a sacred right requiring unanimous consent -- no majority can lower the voting threshold."
          },
          {
            ref: "Section 9.02(x)(B)",
            title: "Specified Indebtedness Protection",
            summary: "The lien subordination provision requires each lender be offered its pro rata share of any new super-priority facility. A cooperation agreement enhances this protection by ensuring coordinated rejection of any offer that would subordinate the group's existing position. Even though individual lenders could be 'bought off' with participation rights, a binding cooperation agreement prevents defection from the defending coalition -- each member is contractually bound to reject the offer and vote against any subordinating amendment."
          },
          {
            ref: "Section 9.02(xv)",
            title: "Disproportionate Adverse Treatment",
            summary: "No amendment may be disproportionately adverse to any Lender vis-a-vis any other Lender without unanimous consent. A cooperation agreement group can invoke this provision to challenge any uptier exchange that treats participating and non-participating lenders differently -- arguing that the very structure of an uptier (benefiting participants at the expense of holdouts) constitutes disproportionately adverse treatment requiring each lender's consent."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "Section 9.02",
            title: "With Consent of Holders (Amendment Mechanics)",
            summary: "Amendments to the Muvico 15% PIK Notes require majority holder consent for most provisions. Lien priority changes require 66 2/3% consent under the proviso following clause (e). A parallel cooperation agreement among DOC 2 holders creates a second defensive perimeter: even if an attacker penetrates the Term Loan blocking position, they face a separate supermajority threshold at the DOC 2 level to modify intercreditor arrangements. Holding >33 1/3% of DOC 2 blocks all lien-priority modifications."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "countermeasures",
        title: "Cooperation Agreement Formation and Enforcement",
        excerpt: "A cooperation agreement is the primary defensive tool against uptier exchanges and other majority-driven restructuring techniques. The agreement is a binding private contract among lenders that (a) requires signatories to vote as a bloc on any proposed amendment, consent, or waiver request, (b) prohibits transfers of positions to non-signatories without group consent (preventing attackers from buying away the blocking position), (c) includes information-sharing provisions allowing coordinated strategy, and (d) may include standstill provisions preventing unilateral actions that could undermine group leverage. Speed of formation is critical -- once an attacking group reaches the Required Lender threshold, the defensive window closes."
      },
      {
        source: "case-studies",
        title: "Serta Defense / TriMark / Incora Cooperation Groups",
        excerpt: "In Serta Simmons, the non-participating lenders formed a cooperation group after the uptier was executed, ultimately winning in court when Judge Jones ruled the transaction violated the credit agreement. The lesson: cooperation agreements formed before an attack are more effective than post-facto litigation, though both can succeed. In TriMark USA (2020), non-participating lenders organized to challenge the uptier but could not unwind it pre-bankruptcy. In Incora/Wesco Aircraft (2022), a cooperation agreement among existing lenders successfully blocked amendment attempts, forcing a consensual restructuring."
      }
    ],
    detailedMechanics: "Lenders accumulate or coordinate to hold more than 50% of the DOC 4 Term Loan -- the Required Lender threshold for passing amendments -- and execute a cooperation agreement that (a) binds signatories to vote as a bloc on any proposed amendment, consent, or waiver request under the credit agreement, (b) prohibits members from transferring their positions to non-signatories without consent of the group, (c) includes standstill provisions preventing individual members from acting unilaterally, and (d) authorizes group counsel to send formal notice to the Administrative Agent (WSFS) under DOC 4 that any amendment executed without the group's consent will be challenged as a breach of the credit agreement. The cooperation agreement is a private contract among lenders, not a public filing. To block an uptier, the defending coalition needs to prevent attacking lenders from reaching the Required Lender threshold. Simultaneously, members holding Muvico 15% PIK Notes (DOC 2) execute a parallel cooperation agreement, targeting the 33 1/3%+ blocking position needed to prevent lien-priority modifications under DOC 2's 66 2/3% consent requirement. The group also invokes Section 9.02(xv) -- the disproportionate adverse treatment provision -- as an additional legal argument against any uptier that treats participating and non-participating lenders differently.",
    applicability: "The Serta Simmons precedent -- where non-participating lenders ultimately won in court -- demonstrates that cooperation agreements produce litigation leverage even after the fact. At AMC, the Term Loan ($1,999.1M) is large enough that diverse institutional ownership is likely, making it feasible to form a 50%+ blocking coalition. DOC 4's enhanced protections (Section 9.02(x)(B) open-offer requirement, Section 9.02(xv) disproportionate treatment prohibition) provide stronger contractual arguments than the credit agreements in Serta or TriMark, making a cooperation agreement defense more legally robust. Given the Muvico 15% PIK Notes ($857M) carry 1L designation at the AMC level and would be primed in an uptier, holders of that tranche have aligned incentives to join the cooperation agreement or form a parallel blocking position under DOC 2. The dual blocking strategy (>50% of Term Loan + >33 1/3% of PIK Notes) creates overlapping defensive positions that are difficult for any attacking coalition to overcome."
  },

  /* ─── ASSET STRIPPING ─────────────────────────────────────────────────── */
  "asset-stripping": {
    docEvidence: [
      {
        doc: "doc1",
        sections: [
          {
            ref: "Section 1.1(a)",
            title: "Deletion of Protective Covenants (The Core Strip)",
            summary: "This is the most destructive clause in DOC 1. It deletes seven sections from the Indenture -- every protective covenant limiting AMC holdco: Section 4.05 (Limitation on Consolidated Indebtedness), 4.06 (Limitation on Restricted Payments), 4.07 (Limitation on Liens), 4.08 (Limitation on Transactions with Affiliates), 4.09 (Limitation on Senior Sub Indebtedness), 4.10 (Future Guarantors), 4.11 (Change of Control). All replaced with '[Intentionally Omitted]'. Without these covenants, AMC holdco can freely dividend assets, incur new debt, or transfer assets to equity-controlled entities without triggering any breach of DOC 1."
          },
          {
            ref: "Section 1.1(d)",
            title: "Events of Default Gutted (Section 6.01)",
            summary: "Deletes Events of Default clauses (e) through (j) from Section 6.01 -- the cross-default, judgment default, covenant breach, guarantee invalidity, and subsidiary bankruptcy triggers. After deletion, the remaining Events of Default are limited to: failure to pay interest, failure to pay principal at maturity, failure to comply with remaining covenants after notice, and bankruptcy of the Company itself. AMC can default on every other obligation and DOC 1 bondholders cannot accelerate."
          },
          {
            ref: "Section 1.2",
            title: "Release of All Subsidiary Guarantees",
            summary: "Every subsidiary guarantee is immediately released. Before this amendment, AMC's subsidiaries backstopped the debt. After Section 1.2, that protection is gone. AMC's subsidiaries hold most of the actual value -- the theater leases, real estate interests, operating businesses. The parent company is primarily a holding company. By releasing the Guarantors, this amendment made these notes a claim against a shell with limited direct assets."
          }
        ]
      },
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 6.08",
            title: "Restricted Payments Baskets",
            summary: "The Restricted Payments covenant in DOC 4 provides multiple baskets for distributions from Muvico to AMC holdco: general basket ($50M / 2% of Total Assets), employee repurchase basket, refinancing proceeds basket, and equity dividend basket. While each basket is individually modest, cumulative usage across multiple baskets and over multiple quarters can provide capacity for value extraction from the Muvico operating entity to AMC holdco -- from where it can be freely distributed given DOC 1's covenant-stripped status."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "Asset Stripping via Covenant-Stripped Instruments",
        excerpt: "Asset stripping exploits the absence of protective covenants in a borrower's debt documents to transfer value from creditors to equity holders. When a debt instrument has been covenant-stripped (as AMC's DOC 1 was in 2020), the issuer faces no contractual restrictions on dividending assets, incurring senior debt, pledging collateral, or engaging in self-dealing transactions. The three-step playbook: (1) identify residual assets not pledged to senior creditors, (2) transfer those assets to equity-controlled entities through dividends, sales at below-market consideration, or intercompany transfers, (3) use the transferred assets to raise new financing or distribute value to equity. Fraudulent conveyance law provides the primary constraint, but transfers structured at arm's-length with independent valuation opinions can be defended."
      },
      {
        source: "lme-concepts",
        title: "Covenant Strip as Enabling Mechanism",
        excerpt: "A covenant strip removes the contractual guardrails that prevent value extraction. The technique involves using an exchange offer or consent solicitation to gather majority bondholder consent, then stripping protective covenants from bonds held by non-participating minority holders. The stripped instrument retains its nominal claim but loses all enforcement mechanisms beyond the basic payment obligation. In AMC's case, DOC 1 is a completed covenant strip -- the $125.5M of outstanding 6.125% Sub Notes exist today with no covenants, no guarantees, and limited events of default. This makes DOC 1 holders the most vulnerable creditors and simultaneously enables asset stripping at the AMC holdco level."
      }
    ],
    detailedMechanics: "DOC 1 (the 2020 Second Supplemental Indenture) deleted Sections 4.05 through 4.11 of the original indenture -- all seven protective covenants restricting Restricted Payments, debt incurrence, asset sales, liens, affiliate transactions, subsidiary guarantees, and change of control. With those covenants excised, AMC holdco can freely dividend assets, incur new debt at the holdco level, or transfer assets to equity-controlled entities without triggering a breach. The stripping playbook: (1) identify residual AMC holdco assets not pledged to the Muvico-level debt stack -- the AMC brand, remaining non-Muvico theatres, and unencumbered intellectual property; (2) dividend or sell those assets to a newly formed parent entity controlled by equity at below-market consideration, exploiting the absence of fair-market-value protections in covenant-stripped DOC 1; (3) use DOC 4's Restricted Payments basket capacity (Section 6.08) at the Muvico level to extract additional value from the operating entity to AMC holdco, from where it flows freely to equity. DOC 1 Section 1.2's release of all subsidiary guarantees means the $125.5M Sub Notes have no recourse to subsidiary assets. The Events of Default gutting (Section 1.1(d)) eliminates cross-default triggers, so stripping activity that might default other instruments does not accelerate DOC 1.",
    applicability: "AMC's own 2020 transaction (DOC 1) created the covenant-stripped precedent within this capital structure -- this is not theoretical but a demonstrated technique management has already used. The $125.5M amc-sub tranche exists today as debt with virtually no contractual protections. At AMC residual EBITDA of $145.5M (45.3% of consolidated), there is meaningful value at the holdco level not yet transferred to Muvico. Equity has incentives to extract holdco value before formal restructuring. Fraudulent conveyance risk is the primary legal constraint: a transfer for less than reasonably equivalent value while the company is insolvent (or rendered insolvent by the transfer) can be unwound under state UFTA or federal Section 548. However, transfers structured with independent appraisals and at valuations defensible as arm's-length can survive scrutiny. The DOC 1 covenant strip makes AMC holdco uniquely vulnerable -- no other tranche in the capital structure has been so comprehensively stripped of protections."
  },

  /* ─── ODEON RING-FENCE ────────────────────────────────────────────────── */
  "odeon-ring-fence": {
    docEvidence: [
      {
        doc: "doc6",
        sections: [
          {
            ref: "Article II",
            title: "The Notes (UK Issuer Structure)",
            summary: "The Odeon 12.750% Senior Secured Notes are $400M face value notes issued by Odeon Finco PLC, a UK-incorporated special purpose vehicle. This is the only non-US issuance in AMC's capital structure. The UK issuer introduces cross-border complexity in enforcement, taxation, and collateral administration. The separate legal jurisdiction is the foundation of the ring-fence -- Odeon Finco PLC would not automatically be included in a US Chapter 11 proceeding, and its assets are governed primarily by English and European law."
          },
          {
            ref: "Article XI (Section 11.01)",
            title: "Guarantee Structure (Ring-Fenced Guarantor Pool)",
            summary: "The guarantee structure isolates Odeon-level credit support. The Odeon Guarantors (the Company and Subsidiary Guarantors) jointly and severally guarantee all obligations, but the guarantor pool is limited to Odeon-level entities. AMC provides a separate standalone guarantee (the AMC Guarantee), but the primary credit support comes from within the Odeon ring-fence. Recovery for DOC 6 holders is primarily determined by Odeon Group asset value, not consolidated AMC enterprise value."
          },
          {
            ref: "Section 5.01",
            title: "Merger, Consolidation, Amalgamation and Sale of Assets",
            summary: "The Issuer may not merge, consolidate, or sell substantially all assets unless the surviving entity assumes all obligations, no Default results, and the surviving entity could incur at least $1.00 of additional Indebtedness or maintain its Fixed Charge Coverage Ratio. Given Odeon's operations across the UK, Germany, Spain, Italy, and other markets, any consolidation must navigate multiple jurisdictions' corporate laws. This provision prevents AMC from simply merging Odeon into a US entity to circumvent the ring-fence."
          },
          {
            ref: "Article VI (Section 6.01)",
            title: "Events of Default (Cross-Default)",
            summary: "Cross-default provisions link the Odeon notes to the broader AMC capital structure. A default at the AMC or Muvico level could trigger acceleration at Odeon, even though the entities and collateral pools are separate. This is the primary vulnerability in the ring-fence: an AMC-level bankruptcy could trigger Odeon acceleration, potentially forcing Odeon into its own restructuring. DOC 6 holders must monitor the US capital structure for default triggers."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "odeon-analysis",
        title: "Odeon Ring-Fence Mechanics and European Structural Isolation",
        excerpt: "Odeon represents the most structurally isolated piece of AMC's capital structure. Odeon Finco PLC is incorporated in England, making its assets governed primarily by English and European law. The Odeon notes are secured by operating leases, equipment, and goodwill of the Odeon cinema network across the UK, Ireland, Spain, Italy, and Germany -- assets not cross-collateralized with AMC's US debt instruments. In a US Chapter 11 filing, Odeon Finco PLC would not automatically be included. DOC 6 holders could resist substantive consolidation by arguing Odeon is a separate legal entity with separate assets, operations, and governance. The English law intercreditor deed contains negative pledge provisions preventing Odeon subsidiaries from granting security to parties other than the DOC 6 Security Agent (GLAS Trust Company)."
      },
      {
        source: "countermeasures",
        title: "Ring-Fence Defense Strategy",
        excerpt: "A ring-fencing defense consists of DOC 6 holders monitoring Odeon subsidiary compliance with negative pledge and restricted payments covenants, seeking injunctive relief in English courts to prevent asset transfers from Odeon subsidiaries to AMC parent, and in an AMC bankruptcy filing proofs of claim at the Odeon Finco level while arguing against substantive consolidation. The cross-border element makes this defense robust -- even if a US bankruptcy court wanted to consolidate the estates, it would need to navigate English corporate law, UK insolvency proceedings, and potentially parallel proceedings in multiple European jurisdictions."
      }
    ],
    detailedMechanics: "DOC 6 governs the Odeon 12.750% Senior Secured Notes ($400M face, trading at 103.58 cents -- the only AMC tranche above par) issued by Odeon Finco PLC. Key structural features: (a) Odeon Finco PLC's assets -- operating leases, equipment, and goodwill across UK, Ireland, Spain, Italy, and Germany -- are pledged exclusively to the DOC 6 Security Agent (GLAS Trust Company) and are not cross-collateralized with AMC's US debt; (b) the guarantee structure (Article XI) confines primary credit support to Odeon-level entities, though AMC provides a separate standalone guarantee; (c) the English law intercreditor deed contains negative pledge provisions preventing Odeon subsidiaries from granting security to third parties; (d) Section 5.01 prevents mergers or asset sales without the surviving entity assuming all obligations and satisfying financial tests. A ring-fencing defense consists of: monitoring compliance with covenants, seeking injunctive relief in English courts against value transfers to AMC, and in bankruptcy arguing against substantive consolidation. The 2027 maturity ($400M due November 2027) is the nearest major maturity in the capital structure, creating urgency for Odeon-specific resolution independent of the US restructuring timeline.",
    applicability: "The DOC 6 notes trade above par (103.58 cents) -- the only AMC tranche to do so -- reflecting market recognition of the structural ring-fence protection. The 2027 maturity creates urgency: DOC 6 holders must either refinance or restructure before the US capital structure matures in 2029-2030. If AMC files Chapter 11 in the US, Odeon Finco PLC (incorporated in England) would not automatically be included in the proceeding. DOC 6 holders' primary risks are: (1) AMC seeking to transfer value from Odeon to fund US operations, (2) AMC attempting to consolidate the Odeon estate through Chapter 15 recognition or voluntary participation, and (3) cross-default acceleration if AMC-level defaults trigger DOC 6 Events of Default. Odeon's own leverage (26.67x on $15M EBITDA) means the ring-fence is protecting a pool of assets that may not fully cover the DOC 6 notes, making preservation of isolation critical for any recovery."
  },

  /* ─── DOUBLE-DIP ──────────────────────────────────────────────────────── */
  "double-dip": {
    docEvidence: [
      {
        doc: "doc4",
        sections: [
          {
            ref: "Dual-Borrower Structure",
            title: "AMC + Muvico Co-Borrowers",
            summary: "The Term Loan is a joint obligation of both AMC Entertainment Holdings and Muvico LLC as co-borrowers. This dual-borrower structure means the $1,999.1M claim is simultaneously a senior secured obligation of both entities. In a bankruptcy filing that includes both entities, the holder has a senior secured claim against the Muvico estate (where the bulk of collateral resides) and a senior secured claim against the AMC estate. If AMC has independent asset value (brand, holdco cash, non-Muvico theatres), the same claim can potentially collect from two separate recovery pools."
          },
          {
            ref: "Section 9.02",
            title: "Waivers; Amendments",
            summary: "The amendment provisions govern the dual-borrower structure and cannot be modified to eliminate the co-borrower arrangement without Required Lender consent. The co-borrower structure is embedded in the fundamental terms of the credit agreement, making it difficult to unwind without a comprehensive refinancing or restructuring -- preserving the double-dip opportunity for holders who accumulate positions."
          }
        ]
      },
      {
        doc: "doc5",
        sections: [
          {
            ref: "Article X",
            title: "Exchange of Notes (Equity Exchange Feature)",
            summary: "The Muvico 8% PIK Exchangeable Notes ($154.5M) are exchangeable into AMC common stock at a specified Exchange Rate. The exchange feature gives holders equity upside participation while maintaining a debt floor value. This creates the second double-dip vector: holders have a secured debt claim at Muvico (recoverable from Muvico assets) and, upon exchange, become AMC equity holders with a claim on residual AMC holdco value -- two separate value streams from the same original investment."
          },
          {
            ref: "Section 10.01",
            title: "Exchange Privilege",
            summary: "Each holder has the right to exchange notes for AMC common stock at the applicable Exchange Rate at any time prior to maturity. The Exchange Rate represents shares of AMC common stock per $1,000 principal amount. Unlike standard convertibles, the exchange is into AMC parent stock even though the notes are issued by Muvico -- this cross-entity exchange mechanism is the structural feature that creates the double-dip optionality."
          }
        ]
      },
      {
        doc: "doc2",
        sections: [
          {
            ref: "1L Claim Structure",
            title: "Additional Recovery Pool via PIK Notes",
            summary: "The Muvico 15% PIK Notes ($857M) carry 1L designation at the AMC level and 1.5L at the Muvico level. A creditor holding positions in both the Term Loan (dual-borrower claim) and the 15% PIK Notes can assert claims against the Muvico collateral pool from multiple tranches, maximizing aggregate recovery across the capital structure. The separate indenture governing DOC 2 creates an independent claim that complements the Term Loan's dual-borrower claim."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "Double-Dip Claim Structures",
        excerpt: "A double-dip structure allows a sophisticated creditor to collect from two separate recovery pools by exploiting the dual-entity nature of a capital structure. The technique requires (a) a debt instrument that is a joint obligation of two legally distinct entities (creating claims against both estates), or (b) a debt instrument with an embedded equity conversion feature that bridges two entities. In AMC's case, both vectors exist: the DOC 4 Term Loan is a joint AMC/Muvico obligation, and the DOC 5 Exchangeable Notes bridge Muvico debt to AMC equity. The legal doctrine of 'claim splitting' in bankruptcy would be contested, but the dual-borrower structure creates a contractual basis for asserting claims against both estates."
      },
      {
        source: "case-studies",
        title: "Windstream / Caesars / Revlon Dual-Claim Precedents",
        excerpt: "Windstream Holdings (2019) saw creditors exploit the dual-entity structure to assert claims against both estates. Caesars Palace (2015) featured OpCo/PropCo dual-claim opportunities. Revlon (2022) featured cross-default and dual-claim strategies where creditors at multiple levels could collect from multiple pools. These cases demonstrate dual-claim strategies as a recognized restructuring technique requiring careful positioning across the capital structure."
      }
    ],
    detailedMechanics: "AMC's capital structure contains two specific double-dip vectors: (1) DOC 4 Term Loan dual-borrower structure: the Term Loan is a joint obligation of both AMC Entertainment Holdings and Muvico LLC as co-borrowers. In a bankruptcy filing that includes both entities, the holder has a senior secured claim against the Muvico estate (where the bulk of collateral resides) and a senior secured claim against the AMC estate. If AMC has independent asset value (brand, holdco cash, non-Muvico theatres valued at $145.5M of residual EBITDA), the same $1,999.1M claim can collect from both pools before being limited to a single recovery. (2) DOC 5 Muvico 8% PIK Exchangeable structure: the $154.5M Exchangeable Notes are issued by Muvico LLC (secured at 1.25L) but are exchangeable into AMC common equity via Article X. A holder who accumulates a position has a secured debt claim at Muvico and, upon exchange, becomes an AMC equity holder with a claim on residual AMC holdco value. The exchange price is currently deeply out-of-the-money, but in a reorganization scenario where AMC equity is reissued to creditors at above-current values, the exchangeable feature creates optionality. A creditor executing this strategy accumulates DOC 4 Term Loan (dual-borrower claim), DOC 5 Exchangeables (equity optionality), and DOC 2 PIK Notes (additional 1L claim at Muvico).",
    applicability: "The dual-borrower structure in DOC 4 is confirmed by the cap-table data showing both AMC and Muvico as co-issuers. AMC holdco has $145.5M of residual EBITDA (45.3% of consolidated) not formally attributable to the Muvico restricted group, creating a distinct value pool. The DOC 5 exchange feature into AMC common stock is documented in Article X, confirming the optionality exists. Double-dip strategies are particularly powerful in distressed situations where conventional single-pool recoveries are 50-70 cents -- the potential to collect from two pools transforms the expected recovery math. The practical challenge is accumulating positions across multiple tranches without moving prices, but the large outstanding amounts ($1,999.1M Term Loan, $857M PIK Notes, $154.5M Exchangeables) provide sufficient market depth for institutional-scale accumulation."
  },

  /* ─── COVENANT STRIP + NEW MONEY ──────────────────────────────────────── */
  "covenant-strip-new-money": {
    docEvidence: [
      {
        doc: "doc1",
        sections: [
          {
            ref: "Section 1.1(a)",
            title: "Deletion of Protective Covenants (The Blueprint)",
            summary: "DOC 1 is the actual completed covenant strip that serves as the blueprint. In July 2020, AMC used an exchange offer to accumulate majority holder consent and strip Sections 4.05-4.11 from the 6.125% Sub Notes indenture. Seven covenants deleted: Limitation on Indebtedness, Restricted Payments, Liens, Affiliate Transactions, Senior Sub Debt Limitation, Future Guarantors, and Change of Control. All replaced with '[Intentionally Omitted]'. This four-page document represents one of the most aggressive covenant-stripping transactions in high-yield debt history."
          },
          {
            ref: "Recital 2 (Section 9.02 mechanism)",
            title: "Amendment Mechanism — Exit Consent via Exchange",
            summary: "Section 9.02 of the original Indenture allowed amendment with 50%+ holder consent, including consents gathered through a tender or exchange offer. AMC exploited this by bundling a consent solicitation with the Exchange Offer: bondholders voted to strip their own protections as a condition of exchanging into new, better-secured notes. Holders who did NOT participate were left holding bonds with no covenants. This 'exit consent' tactic is the core mechanism."
          },
          {
            ref: "Recital 3",
            title: "The Exchange Offer and Consent Solicitation",
            summary: "Two-part transaction: (1) Exchange Offer -- swap 6.125% unsecured notes for new 10%/12% Cash/PIK Toggle Second Lien Subordinated Secured Notes due 2026 (higher coupon, collateral backing); (2) Consent Solicitation -- as a condition of exchange, participating holders voted to strip covenants from the old notes. This is the 'exit consent' tactic: better deal for participants, worse outcome for holdouts."
          }
        ]
      },
      {
        doc: "doc4",
        sections: [
          {
            ref: "Section 9.02",
            title: "Amendment Mechanics (Application to Term Loan)",
            summary: "Applying the DOC 1 blueprint to DOC 4 requires clearing enhanced protections. DOC 4 Section 9.02 contains numerous unanimous-consent sacred rights: clause (xi) for Unrestricted Subsidiary designation, clause (xv) for disproportionately adverse amendments, clause (x)(B) for priming DIP/new money, and clauses (xii)-(xviii) for various other protections. However, Article 6 covenants (Investments, Dispositions, Restricted Payments, Affiliate Transactions) can be amended with Required Lender (majority) consent, creating potential for a partial strip that removes enough protections to enable new super-senior financing without triggering the unanimous-consent sacred rights."
          }
        ]
      }
    ],
    researchContext: [
      {
        source: "novel-strategies",
        title: "Covenant Strip + New Money Mechanics",
        excerpt: "The covenant strip plus new money technique combines two LME tools in sequence: first, strip protective covenants from existing debt through an exit consent transaction; second, issue new super-priority debt that primes the now-unprotected existing creditors. The technique exploits the coercive dynamics of collective action: each individual holder faces a prisoner's dilemma where participating in the exchange (stripping the holdouts) is the rational individual decision, making the collective outcome (full strip) nearly inevitable. AMC's DOC 1 transaction in 2020 is a modern textbook application of this framework, proving institutional willingness and legal capability."
      },
      {
        source: "lme-concepts",
        title: "Exit Consent Mechanics and Legal Framework",
        excerpt: "Exit consents leverage collective action problems. The legal framework was established in Katz v. Oak Industries (1986), where the Delaware Chancery Court upheld exit consents as legitimate. The mechanics: (1) propose an exchange offering better terms (higher coupon, security interest, shorter maturity); (2) condition exchange on consent to strip the legacy instrument; (3) once majority consent is achieved, the strip binds all holders including non-participants; (4) use the now-unprotected instrument as the platform to raise priming new money. AMC's 2020 DOC 1 transaction followed this playbook exactly. The covenant strip is arguably the most damaging LME for non-participants because it combines covenant removal with potential immediate priming."
      }
    ],
    detailedMechanics: "DOC 1 is the blueprint: in July 2020, AMC used an exchange offer to accumulate majority holder consent and strip Sections 4.05-4.11 and Events of Default clauses (e)-(j) from the 6.125% Sub Notes indenture. The Covenant Strip + New Money scenario applies the identical playbook to DOC 4: Step 1 -- a consortium proposes an exchange where Term Loan holders can exchange into new 'Extended Term Loan' notes with longer maturity and higher PIK component. Step 2 -- as a condition, consenting holders (>50% = Required Lender threshold) sign exit consents stripping Article 6 covenants from DOC 4: incurrence tests (Section 6.01), investments (Section 6.04), dispositions (Section 6.05), restricted payments (Section 6.08), affiliate transactions (Section 6.09). Step 3 -- with covenants removed, AMC raises new super-senior secured notes at Muvico that are structurally senior to all existing debt. Step 4 -- non-participating Term Loan holders are left with covenant-stripped paper at a subordinated position. DOC 4's Section 9.02 contains enhanced sacred rights (clauses (x)-(xviii)) that complicate a full strip, but a partial strip targeting Article 6 covenants and non-sacred-right protections can be achieved with majority consent. The key insight from DOC 1: the new money providers (who may be the same lenders who participated in the strip) hold paper with first-out collateral priority and benefit from recovery before stripped holdouts receive anything.",
    applicability: "AMC has already demonstrated institutional willingness to execute covenant strips -- DOC 1 is a completed transaction in this exact capital structure. The $125.5M amc-sub tranche exists today in its covenant-stripped state, proving AMC's legal advisors are familiar with the mechanics and courts have not unwound the 2020 transaction. DOC 4's enhanced Section 9.02 protections (particularly the 18 unanimous-consent sacred rights in clauses (i)-(xviii)) make a full strip more difficult than the DOC 1 precedent, but a partial strip targeting Article 6 non-sacred-right covenants remains feasible with Required Lender consent. With Muvico leverage at 19.43x and a February 2029 maturity, the restructuring window is narrowing. New money providers in a covenant strip transaction typically demand 15-20% yields given complexity and litigation risk, but can achieve first-out recoveries of 95-100% in almost any EV scenario given the enterprise size relative to a new super-senior tranche."
  }

};
