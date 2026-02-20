/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Scenario Data
   Defines window.AMC_SCENARIOS for use by scenarios.html
   Total face debt: $4,003.5M across 7 tranches
   ═══════════════════════════════════════════════ */

window.AMC_SCENARIOS = [

  /* ─── 1. UPTIER EXCHANGE ────────────────────────────────────────────── */
  {
    id: "uptier-exchange",
    name: "Uptier Exchange",
    category: "offensive",
    summary: "A majority lender coalition uses open-market accumulation of the $2B Term Loan to invoke DOC 4's amendment provisions, creating a new super-priority tranche that structurally subordinates non-participating 1L lenders. Holdout term loan holders are primed without their consent.",
    mechanics: "Participating lenders accumulate more than 50% of the outstanding $1,999.1M Term Loan principal through open-market purchases, reaching the Required Lender threshold specified in DOC 4. Once the blocking position is achieved, the coalition executes an amendment to the credit agreement that (a) creates a new super-priority secured tranche above the existing Term Loan, (b) exchanges the participating lenders' existing Term Loan claims into the new super-priority paper at par or a modest premium, and (c) re-allocates the collateral package to secure the new tranche on a first-out basis. DOC 4 contains no 'sacred right' protection against lien subordination for non-consenting lenders — lien subordination is treated as a majoritarian amendment rather than a unanimous consent item. The Muvico 15% PIK Notes (DOC 2), which sit at the 1.5L position in the Muvico waterfall, are simultaneously primed because their intercreditor agreement with the Term Loan permits the Term Loan agent to consent to a new super-priority facility on behalf of junior lienholders in certain circumstances. Holdout Term Loan lenders are left with debt that is now effectively second-out on the collateral, dramatically reducing their expected recovery in any subsequent restructuring or bankruptcy proceeding.",
    applicability: "AMC's $1,999.1M Term Loan (DOC 4) is the dominant tranche in a capital structure where Consolidated EBITDA of $321M covers total interest only 0.83x. The dual-borrower structure (AMC + Muvico co-borrowers) concentrates most secured debt at the Muvico entity, creating a single large pool of term loan debt amenable to majoritarian action. DOC 4's amendment provisions follow post-2017 market terms that allow lien subordination with Required Lender consent, a gap that was confirmed exploitable in Serta. The absence of sacred right protections for lien priority in DOC 4 is the critical enabling feature. With leverage at 19.43x at Muvico and interest coverage of 0.54x, the economic pressure to restructure is acute, making lenders willing to act aggressively before a bankruptcy filing that might result in worse outcomes.",
    precedents: [
      "Serta Simmons Bedding (2020)",
      "Boardriders / Quiksilver (2019)",
      "Envision Healthcare (2023)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik"],
    relatedDocs: ["doc4", "doc2"],
    relatedResearch: ["novel-strategies", "case-studies"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "distress", ev: "2500" },
        label: "Recovery at $2.5B EV (distress)"
      },
      {
        model: "waterfall",
        params: { scenario: "base", ev: "3500" },
        label: "Recovery at $3.5B EV (base)"
      }
    ],
    outputs: {
      winnerRecovery: "95-100%",
      loserRecovery: "15-40%",
      riskLevel: "high"
    }
  },

  /* ─── 2. J.CREW DROPDOWN ────────────────────────────────────────────── */
  {
    id: "jcrew-dropdown",
    name: "J.Crew Dropdown",
    category: "offensive",
    summary: "Valuable theatre operating rights and IP are transferred to a newly formed unrestricted subsidiary using DOC 4's Restricted Payments basket and Investment covenant capacity, placing those assets beyond the reach of existing secured creditors who then hold claims against a hollowed-out collateral pool.",
    mechanics: "AMC management identifies the most valuable separable assets in the collateral package — primarily domestic theatre operating rights, loyalty program IP (AMC Stubs), and long-term lease interests — and engineers a multi-step transfer. Step one: designate a newly formed entity (e.g., 'AMC IP Holdings LLC') as an Unrestricted Subsidiary under DOC 4, using available Investment basket capacity. Step two: contribute the targeted assets to the new Unrestricted Subsidiary through a series of intercompany transfers characterized as Restricted Payments or Investments within the applicable baskets in Sections 7.05 and 7.06 of DOC 4. Step three: once assets reside in the Unrestricted Subsidiary, issue new priority financing secured solely by those assets — the new lenders have a clean, unencumbered collateral claim while existing creditors' collateral is materially diminished. DOC 4's Restricted Payments covenant and Investment covenant contain various baskets (grower, builder, general) that cumulatively may provide sufficient capacity to effectuate the transfer. The AMC 7.5% Notes (DOC 3) at the AMC level lose collateral value because the operating assets that support theatre-level EBITDA are no longer part of the restricted group. This is the precise playbook AMC itself executed in 2021 when it dropped 175 theatres and related assets into Muvico LLC — the same technique can be run again with remaining AMC holdco assets.",
    applicability: "AMC's existing capital structure is itself the product of a prior dropdown — the Muvico LLC formation in 2021 moved the core theatre portfolio to raise $3.1B of new debt at the Muvico level, subordinating the legacy AMC 6.125% Sub Notes (DOC 1) and subsequently the AMC 7.5% Notes (DOC 3). The covenant structure in DOC 4 was negotiated to permit this kind of flexibility, as evidenced by the fact that it was the lending syndicate's own document that allowed the original Muvico transaction. With the AMC 7.5% Notes ($360M face) trading at 86.49 cents and AMC residual EBITDA of only $145.5M, equity and management have strong incentives to strip remaining value from AMC holdco before any formal restructuring.",
    precedents: [
      "J.Crew Group (2017)",
      "Travelport (2019)",
      "Chewy / PetSmart (2018)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik", "amc-750"],
    relatedDocs: ["doc4", "doc2"],
    relatedResearch: ["novel-strategies", "case-studies"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "distress", ev: "2500" },
        label: "Recovery post-dropdown at $2.5B EV"
      },
      {
        model: "leverage",
        params: { ebitda: "250" },
        label: "Leverage sensitivity at $250M EBITDA"
      }
    ],
    outputs: {
      winnerRecovery: "N/A (equity benefits)",
      loserRecovery: "20-50%",
      riskLevel: "high"
    }
  },

  /* ─── 3. PIK TOGGLE CONVERSION ──────────────────────────────────────── */
  {
    id: "pik-toggle-conversion",
    name: "PIK Toggle Conversion",
    category: "hybrid",
    summary: "Sustained election of PIK interest on the $107.4M Muvico 6/8% Toggle Notes compounds principal at 8% annually, growing the 2L claim at Muvico and diluting recovery for all creditors; alternatively, forcing cash-pay drains $6.4M per year from already-thin liquidity.",
    mechanics: "DOC 7 grants the issuer (Muvico LLC) sole discretion to elect, on each interest payment date, whether to pay interest in cash at 6% or as PIK at 8%. This election is made at the company's option with no creditor veto. Under sustained PIK election: the $107.4M face grows by approximately $8.6M per year (8% PIK rate), reaching roughly $136.5M by the 2030 maturity if PIK is elected continuously. The growing 2L principal at Muvico increases the aggregate claim junior to the 1L Term Loan and 1.25L/1.5L tranches, diluting recovery for all holders in a waterfall scenario. From an offensive creditor perspective — a large holder of the Term Loan or 15% PIK Notes who also accumulates Toggle Notes could use the PIK election to strategically grow the 2L claim, creating a larger blocking position in a future restructuring or using the PIK mechanics to manufacture a technical default trigger at a chosen time. From a defensive perspective, the issuer's cash preservation rationale for PIK election is straightforward: with interest coverage at 0.54x at Muvico, paying $6.4M in cash on the Toggle Notes versus accruing PIK saves near-term liquidity but increases the ultimate debt burden. The 8% PIK rate (versus 6% cash) represents a 200bp premium that compounds over time, creating a growing liability. A creditor coalition could also argue that forced cash pay (by threatening to accelerate on other instruments) is preferable to PIK accrual, introducing a negotiating lever in any out-of-court restructuring discussion.",
    applicability: "With Muvico interest coverage at 0.54x and total Muvico leverage at 19.43x, the PIK toggle on DOC 7 is a live option AMC management is likely already evaluating to preserve the $417M cash balance. The $107.4M face of Toggle Notes is small relative to the $2B Term Loan, but its 2L position at Muvico and 2030 maturity mean any PIK accretion further deteriorates the already-stressed Muvico recovery math. The toggle also introduces an optionality asymmetry: management benefits from deferring cash outflows while creditors bear the increasing-principal risk. The DOC 2 leverage grid (which steps down from 9%+6%PIK to lower rates only as leverage improves) will remain pinned at maximum rates given current leverage, so PIK accretion on the Toggle Notes adds to aggregate 2L claims without any offsetting rate reduction benefit.",
    precedents: [
      "iHeart Communications (2016)",
      "Cumulus Media (2017)",
      "Frontier Communications (2020)"
    ],
    affectedTranches: ["muvico-6-8pik", "term-loan"],
    relatedDocs: ["doc7", "doc2"],
    relatedResearch: ["novel-strategies", "lme-concepts"],
    modelLinks: [
      {
        model: "pik-projector",
        params: { scenario: "max", years: "7" },
        label: "PIK accrual to maturity (max election)"
      },
      {
        model: "leverage",
        params: { ebitda: "300" },
        label: "Leverage sensitivity at $300M EBITDA"
      }
    ],
    outputs: {
      winnerRecovery: "Variable",
      loserRecovery: "Variable",
      riskLevel: "medium"
    }
  },

  /* ─── 4. COOPERATION AGREEMENT ──────────────────────────────────────── */
  {
    id: "cooperation-agreement",
    name: "Cooperation Agreement",
    category: "defensive",
    summary: "Term loan lenders holding more than 50% of the $1,999.1M outstanding principal form a binding cooperation agreement to block any uptier exchange, covenant amendment, or asset transfer that would subordinate or impair their 1L position without unanimous consent.",
    mechanics: "Lenders accumulate or coordinate to hold more than 50% of the DOC 4 Term Loan — the Required Lender threshold for passing amendments — and execute a cooperation agreement that (a) binds signatories to vote as a bloc on any proposed amendment, consent, or waiver request under the credit agreement, (b) prohibits members from transferring their positions to non-signatories without consent of the group (thereby preventing the attacking party from purchasing away the blocking position), and (c) includes standstill provisions preventing individual members from acting unilaterally in ways that could undermine group leverage. The cooperation agreement is a private contract among lenders, not a public filing, and typically includes information-sharing provisions allowing members to coordinate strategy on any restructuring proposal. To block an uptier, the defending coalition needs to prevent the attacking lenders from ever reaching the Required Lender threshold — this is why speed of formation is critical. The cooperation agreement may also include provisions authorizing the group's counsel to send formal notice to the administrative agent under DOC 4 that any amendment executed without the group's consent will be challenged as a breach of the credit agreement's implicit covenant of good faith. Simultaneously, members holding Muvico 15% PIK Notes (DOC 2) can execute a parallel cooperation agreement under that indenture, since an uptier would also require amendments or intercreditor modifications affecting DOC 2 holders.",
    applicability: "The precedent from Serta Simmons — where a minority of non-participating lenders ultimately won in court after an uptier excluded them — demonstrates that cooperation agreements can produce litigation leverage even after the fact. At AMC, the Term Loan ($1,999.1M) is large enough that diverse institutional ownership is likely, making it feasible to form a 50%+ blocking coalition. The cooperation agreement is the primary defensive tool because DOC 4 lacks sacred rights protection against lien subordination — the only protection non-participating lenders have is preventing the attacking lenders from reaching the Required Lender threshold in the first place. Given the Muvico 15% PIK Notes ($857M) also carry 1L designation at the AMC level and would be primed in an uptier, holders of that tranche have aligned incentives to join the cooperation agreement or form a parallel blocking position under DOC 2.",
    precedents: [
      "Serta Simmons defense group (2020)",
      "TriMark USA non-participating lenders (2020)",
      "Incora (Wesco Aircraft) cooperation (2022)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik"],
    relatedDocs: ["doc4", "doc2"],
    relatedResearch: ["countermeasures", "case-studies"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "base", ev: "3500" },
        label: "Recovery at $3.5B EV (cooperation holds)"
      },
      {
        model: "waterfall",
        params: { scenario: "base", ev: "4500" },
        label: "Recovery at $4.5B EV (upside scenario)"
      }
    ],
    outputs: {
      winnerRecovery: "60-80%",
      loserRecovery: "Prevented from declining",
      riskLevel: "low"
    }
  },

  /* ─── 5. ASSET STRIPPING ────────────────────────────────────────────── */
  {
    id: "asset-stripping",
    name: "Asset Stripping",
    category: "offensive",
    summary: "AMC holdco exploits the deleted covenant sections in DOC 1 and the Restricted Payments baskets in DOC 4 to dividend or transfer remaining valuable assets to equity, reducing enterprise value available to creditors in any subsequent insolvency while equity captures current value.",
    mechanics: "DOC 1 (the 2020 Supplemental Indenture governing the 6.125% Sub Notes) deleted Sections 4.05 through 4.11 of the original indenture — these were the affirmative and negative covenants that restricted Restricted Payments, incurrence of additional debt, asset sales, and liens. With those covenants excised, AMC holdco can freely dividend assets, incur new debt at the holdco level, or transfer assets to equity-controlled entities without triggering a breach of DOC 1. This creates a three-step asset stripping playbook: (1) identify residual AMC holdco assets not already pledged to the Muvico-level debt stack (primarily the AMC brand, the remaining non-Muvico theatres, and any unencumbered intellectual property); (2) dividend or sell those assets to a newly formed parent entity controlled by equity at below-market consideration, exploiting the absence of fair-market-value protections in the covenant-stripped DOC 1; (3) use DOC 4's Restricted Payments basket capacity at the Muvico level to extract additional value from the operating entity. The AMC 6.125% Sub Notes ($125.5M, DOC 1) are already covenant-stripped and have no mechanism to prevent this stripping. The AMC 7.5% Senior Secured Notes ($360M, DOC 3) are at the 2L position at Muvico, so stripping AMC holdco assets reduces their recovery on the AMC-level portion of the collateral. Creditors of the subordinated notes are the primary losers — they have no covenant protections left and are subordinated to $3.1B+ of secured debt.",
    applicability: "AMC's own 2020 transaction (DOC 1) created the covenant-stripped precedent within the capital structure itself — this is not a theoretical vulnerability but a demonstrated technique management has already used. The $125.5M amc-sub tranche exists today as a class of debt with virtually no contractual protections. At AMC residual EBITDA of $145.5M (45.3% of consolidated), there is meaningful value at the holdco level that has not yet been transferred to Muvico. Equity (which has seen the stock trade well above intrinsic restructuring value due to retail investor dynamics) has strong incentives to extract holdco value before any formal restructuring that would give creditors control. Fraudulent conveyance risk is the primary legal constraint, but transfers structured at arm's-length consideration with independent valuation opinions can be defended.",
    precedents: [
      "Caesars Entertainment Operating Co. (2014)",
      "PetSmart / Chewy transfer (2018)",
      "Envision Healthcare (2022)"
    ],
    affectedTranches: ["amc-sub", "term-loan", "muvico-15pik"],
    relatedDocs: ["doc1", "doc4"],
    relatedResearch: ["novel-strategies", "lme-concepts"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "distress", ev: "2000" },
        label: "Recovery post-stripping at $2.0B EV"
      }
    ],
    outputs: {
      winnerRecovery: "N/A (equity benefits)",
      loserRecovery: "5-30%",
      riskLevel: "high"
    }
  },

  /* ─── 6. ODEON RING-FENCE ───────────────────────────────────────────── */
  {
    id: "odeon-ring-fence",
    name: "Odeon Ring-Fence",
    category: "defensive",
    summary: "Odeon Finco PLC noteholders enforce structural protections that keep Odeon's UK/European assets and EBITDA isolated from AMC parent-level claims, preserving the ring-fenced collateral pool exclusively for DOC 6 holders ahead of any AMC-level restructuring.",
    mechanics: "DOC 6 governs the Odeon 12.750% Senior Secured Notes ($400M face, $414.3M market value) issued by Odeon Finco PLC, a UK-incorporated special purpose vehicle that sits structurally above the AMC Entertainment Holdings parent in the Odeon subsidiary chain. The key structural features are: (a) Odeon Finco PLC's assets — primarily the operating leases, equipment, and goodwill of the Odeon cinema network across the UK, Ireland, Spain, Italy, and Germany — are pledged exclusively to the DOC 6 Security Agent (GLAS Trust Company of Delaware) and are not cross-collateralized with AMC's US debt instruments; (b) AMC Entertainment Holdings' guarantee of the Odeon notes is expressly subordinated and unsecured at the AMC holdco level, meaning DOC 6 holders have a senior secured claim on Odeon assets but only an unsecured, structurally junior claim on AMC assets; (c) the English law-governed documentation (UK intercreditor deed) contains negative pledge provisions preventing Odeon's operating subsidiaries from granting security to any party other than the DOC 6 Security Agent. A ring-fencing defense consists of: DOC 6 holders monitoring Odeon subsidiary compliance with the negative pledge and restricted payments covenants; seeking injunctive relief in English courts to prevent any asset transfer from Odeon subsidiaries to AMC parent; and, in an AMC bankruptcy, filing proofs of claim at the Odeon Finco level and arguing against substantive consolidation of the Odeon estate with AMC's US estate. Odeon EBITDA of $15M against $400M of face debt implies 26.67x leverage, but the ring-fence means recoveries are determined by Odeon asset value — not consolidated AMC leverage.",
    applicability: "Odeon represents the most structurally isolated piece of AMC's capital structure. The DOC 6 notes trade above par (103.58 cents) — the only AMC tranche to do so — reflecting market recognition of this structural protection. The 2027 maturity ($400M due November 2027) is the nearest major maturity in the AMC capital structure, creating urgency for resolution. If AMC files for Chapter 11 in the US, Odeon Finco PLC (incorporated in England) would not automatically be included in the US proceeding. DOC 6 holders' primary risk is AMC seeking to transfer value from Odeon to fund US operations or attempting to consolidate the Odeon estate in a UK parallel proceeding. The ring-fencing strategy is defensive — it preserves the status quo structural priority rather than seeking to improve position.",
    precedents: [
      "Codere Finance (2013)",
      "Nortel Networks cross-border allocation (2009)",
      "New World Resources European subsidiary ring-fence (2014)"
    ],
    affectedTranches: ["odeon-1275"],
    relatedDocs: ["doc6"],
    relatedResearch: ["odeon-analysis", "countermeasures"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "base", ev: "3500" },
        label: "Consolidated waterfall at $3.5B EV"
      }
    ],
    outputs: {
      winnerRecovery: "75-100% (Odeon holders)",
      loserRecovery: "N/A",
      riskLevel: "low"
    }
  },

  /* ─── 7. DOUBLE-DIP ─────────────────────────────────────────────────── */
  {
    id: "double-dip",
    name: "Double-Dip",
    category: "offensive",
    summary: "Sophisticated creditors exploit AMC's dual-borrower and dual-claim structure — where the same economic exposure can be asserted as a secured note claim at Muvico and an equity or intercompany claim at AMC — to collect from two separate recovery pools in a bankruptcy proceeding.",
    mechanics: "AMC's capital structure contains two specific double-dip vectors: (1) DOC 4 Term Loan dual-borrower structure: the Term Loan is a joint obligation of both AMC Entertainment Holdings and Muvico LLC as co-borrowers. In a bankruptcy filing that includes both entities, the holder has a senior secured claim against the Muvico estate (where the bulk of the collateral resides) and a senior secured claim against the AMC estate. If the AMC estate has independent asset value (brand, holdco cash, non-Muvico theatres), the same $1,999.1M claim can collect from both pools before being limited to a single recovery. The legal doctrine of 'claim splitting' in bankruptcy would be contested, but careful structuring of the debt can create legitimate dual-claim scenarios. (2) DOC 5 Muvico 8% PIK Exchangeable structure: the $154.5M Exchangeable Notes are issued by Muvico LLC (secured at the 1.25L position) but are exchangeable into AMC Entertainment Holdings common equity. A holder who accumulates a large position in these notes has a secured debt claim at Muvico (recoverable from Muvico assets) and, upon exchange, becomes an AMC equity holder with a claim on any residual AMC holdco value — two separate value streams from the same original investment. The exchange price is currently deeply out-of-the-money, but in a reorganization scenario where AMC equity is reissued to creditors at above-current-trading values, the exchangeable feature creates optionality. A creditor executing this strategy would accumulate DOC 4 Term Loan to maximize the dual-borrower claim and DOC 5 Exchangeables for the equity optionality, while holding DOC 2 15% PIK Notes as an additional 1L claim at Muvico to capture incremental recovery from the Muvico collateral pool.",
    applicability: "The dual-borrower structure in DOC 4 is confirmed by the cap-table data showing both AMC and Muvico as co-issuers of the Term Loan. This is not a theoretical construct — it is the explicit contractual structure. AMC holdco has $145.5M of residual EBITDA (45.3% of consolidated) that is not formally attributable to the Muvico restricted group, creating a distinct value pool at the holdco level. The DOC 5 exchange feature with a $5.66 exchange price is documented in the cap table, confirming the optionality exists even if currently out-of-the-money. Double-dip strategies are particularly powerful in distressed situations where conventional single-pool recoveries are expected to be 50-70 cents — the potential to collect from two pools transforms the expected recovery math for a sophisticated accumulator.",
    precedents: [
      "Windstream Holdings dual-estate claims (2019)",
      "Caesar's Palace Operating Company (2015)",
      "Revlon cross-default and dual-claim strategy (2022)"
    ],
    affectedTranches: ["term-loan", "muvico-8pik", "muvico-15pik"],
    relatedDocs: ["doc4", "doc2", "doc5"],
    relatedResearch: ["novel-strategies", "case-studies"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "base", ev: "3000" },
        label: "Waterfall at $3.0B EV"
      },
      {
        model: "exchange",
        params: { stockPrice: "3" },
        label: "Exchange value at $3.00 stock"
      }
    ],
    outputs: {
      winnerRecovery: "80-120% (double recovery)",
      loserRecovery: "10-30%",
      riskLevel: "high"
    }
  },

  /* ─── 8. COVENANT STRIP + NEW MONEY ─────────────────────────────────── */
  {
    id: "covenant-strip-new-money",
    name: "Covenant Strip + New Money",
    category: "offensive",
    summary: "Using DOC 1 as a live proof-of-concept, a majority of DOC 4 term loan holders execute an exit-consent covenant strip that deletes protective provisions from the credit agreement, then immediately raise new super-senior debt that primes every existing creditor in the capital structure.",
    mechanics: "DOC 1 is the blueprint: in July 2020, AMC used an exchange offer to accumulate majority holder consent and strip Sections 4.05-4.11 (Restricted Payments, Asset Sales, Incurrence of Debt, Liens, Transactions with Affiliates, Dividends from Restricted Subsidiaries, Lines of Business) and Events of Default clauses (e) through (j) from the 6.125% Sub Notes indenture. The Covenant Strip + New Money scenario applies the identical playbook to DOC 4: Step 1 — a consortium of existing Term Loan lenders (or the company itself) proposes an exchange offer where Term Loan holders can exchange into new 'Extended Term Loan' notes with a longer maturity and potentially higher PIK component; Step 2 — as a condition of the exchange, consenting holders (representing >50% = Required Lender threshold) sign exit consents stripping DOC 4's affirmative and negative covenants protecting non-consenting lenders (incurrence tests, restricted payment limits, negative pledge clauses, cross-default triggers); Step 3 — with the protective covenants removed from the DOC 4 credit agreement, AMC raises a new tranche of super-senior secured notes or term loans at the Muvico level that are structurally senior to all existing debt; Step 4 — non-participating Term Loan holders are left with covenant-stripped paper holding a subordinated claim on a capital structure where new money has primed their security interest. The new money providers (who may be the same lenders who participated in the strip) now hold paper with first-out collateral priority and benefit from any enterprise value recovery before the stripped holdouts receive anything. This is arguably the most damaging LME structure for non-participants because it combines covenant removal with immediate priming in a single transaction.",
    applicability: "AMC has already demonstrated institutional willingness to execute covenant strips — DOC 1 is not hypothetical, it is a completed transaction in this exact capital structure. The current $125.5M amc-sub tranche (DOC 1) exists in its covenant-stripped state today, proving that AMC's legal and financial advisors are familiar with the mechanics and courts have not unwound the 2020 transaction. The DOC 4 Term Loan ($1,999.1M) contains post-2017 amendment mechanics that do not explicitly prohibit the exit consent technique for most covenants. With Muvico leverage at 19.43x and a February 2029 maturity on both the Term Loan and 15% PIK Notes, the window for a voluntary restructuring is narrowing. New money providers in a covenant strip transaction typically demand 15-20% yields given the complexity and litigation risk, but can achieve first-out recoveries of 95-100% in almost any EV scenario given the size of the enterprise relative to a new super-senior tranche.",
    precedents: [
      "AMC Entertainment 2020 covenant strip (DOC 1 itself)",
      "Revlon covenant strip + new money (2016)",
      "Mallinckrodt exit consent mechanics (2020)"
    ],
    affectedTranches: ["amc-sub", "term-loan", "muvico-15pik"],
    relatedDocs: ["doc1", "doc4"],
    relatedResearch: ["novel-strategies", "lme-concepts"],
    modelLinks: [
      {
        model: "waterfall",
        params: { scenario: "distress", ev: "2000" },
        label: "Recovery post-strip at $2.0B EV (distress)"
      },
      {
        model: "leverage",
        params: { ebitda: "300" },
        label: "Leverage at $300M EBITDA (new money sizing)"
      }
    ],
    outputs: {
      winnerRecovery: "90-100% (new money providers)",
      loserRecovery: "0-20%",
      riskLevel: "high"
    }
  },

  /* ─── 9. PREPACKAGED CHAPTER 11 ───────────────────────────────────────── */
  {
    id: "prepack-ch11",
    name: "Prepackaged Chapter 11",
    category: "in-court",
    summary: "AMC negotiates a restructuring plan with key creditor groups before filing, using a Restructuring Support Agreement (RSA) to lock in votes. The pre-negotiated plan is filed simultaneously with the Chapter 11 petition, minimizing time in court and preserving going-concern value while executing a comprehensive balance sheet restructuring.",
    mechanics: "The prepackaged Chapter 11 process begins months before any bankruptcy petition is filed. AMC's advisors negotiate a Restructuring Support Agreement (RSA) with the Required Lenders under DOC 4 — holders of more than 50% of the $1,999.1M Term Loan — and ideally with holders of the Muvico 15% PIK Notes (DOC 2, $857M) as well. The RSA contains a detailed plan term sheet specifying the treatment of each tranche in the capital structure: the Term Loan receives the bulk of reorganized equity and potentially new take-back debt, the 1.5L PIK Notes receive a smaller equity allocation and possibly warrants, junior tranches receive residual equity or warrants depending on enterprise value, and existing AMC equity is cancelled or receives only nominal recovery. Simultaneously with RSA negotiations, the company arranges DIP financing — typically a $500-800M facility provided by existing 1L lenders who have economic incentive to fund the reorganization and protect their collateral position. The DIP commitment letter is executed concurrently with the RSA and filed as a first-day motion. Under Section 1126(b) of the Bankruptcy Code, votes on the plan can be solicited pre-petition using a disclosure statement that meets the 'adequate information' standard. This pre-petition solicitation process typically takes 20-30 days, during which creditors in each impaired class vote to accept or reject the plan. A class accepts if holders of at least two-thirds in amount and more than one-half in number of claims voting in that class vote in favor. Once sufficient votes are obtained, AMC files the Chapter 11 petition and simultaneously files the pre-voted plan, the disclosure statement, and a motion for an expedited confirmation hearing. The court reviews whether the plan meets the Section 1129(a) confirmation requirements: good faith, feasibility, best interests of creditors (each creditor receives at least what it would in Chapter 7 liquidation), and that at least one impaired class has accepted without counting insiders. If any junior class rejects the plan, the proponent can invoke cramdown under Section 1129(b), which requires that the plan be 'fair and equitable' and not 'unfairly discriminate' against the dissenting class. For secured creditors, fair and equitable means they receive the indubitable equivalent of their claims; for unsecured creditors, it means either payment in full or that no junior class receives anything (the absolute priority rule). The entire in-court process for a prepack typically spans 45-90 days from petition to emergence. During this period, AMC continues operating under Section 365's automatic stay, which halts all collection actions and provides breathing room to evaluate its ~600 theatre leases. Management retains control as debtor-in-possession (no trustee is appointed in a consensual prepack), preserving institutional knowledge and operational continuity. The 363-sale milestones embedded in the RSA provide a backstop: if confirmation stalls, assets can be sold to the DIP lenders via credit bid, ensuring the restructuring timeline does not slip.",
    applicability: "AMC's capital structure makes it a strong candidate for a prepackaged filing. The $4B total debt against $321M Consolidated EBITDA produces 12.47x leverage at the consolidated level and a staggering 19.43x at Muvico, with interest coverage of just 0.83x consolidated and 0.54x at Muvico — metrics that signal inevitable restructuring absent a dramatic operational turnaround. The DOC 4 Term Loan ($1,999.1M) is held by institutional lenders who are experienced restructuring participants and have strong economic incentive to lead a prepack rather than risk value destruction in a free-fall filing. These lenders hold the Required Lender blocking position and can effectively dictate restructuring terms to junior classes. The Muvico 15% PIK Notes ($857M under DOC 2) holders, sitting at 1.5L, have aligned incentives to participate in the RSA because their recovery depends on preserving going-concern value — they recover materially more in a prepack than in liquidation. AMC's 2021 liability management exercise demonstrates that management and its advisors (Weil Gotshal) are willing and able to execute complex capital structure transactions. The theatre operations themselves — approximately 600 domestic locations generating $321M EBITDA — provide meaningful going-concern value that justifies the prepack approach over a liquidation scenario. Section 365 of the Bankruptcy Code gives AMC powerful leverage over its lease portfolio, allowing rejection of unprofitable locations while assuming profitable ones, which could meaningfully improve post-emergence EBITDA margins. The $417M cash balance provides adequate runway to fund operations during the compressed prepack timeline without requiring excessive DIP draws.",
    precedents: [
      "AMC Entertainment Holdings (2020 — out-of-court but pre-negotiated)",
      "Hertz Corporation (2020-2021)",
      "Cineworld Group (2022-2023)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik", "muvico-8pik", "muvico-6-8pik", "amc-750", "amc-sub"],
    relatedDocs: ["doc4", "doc2", "doc7"],
    relatedResearch: ["court-solutions", "lender-strategy", "muvico-deep-dive"],
    modelLinks: [
      { model: "waterfall", params: { scenario: "base", ev: "3000" }, label: "Prepack recovery at $3.0B EV" },
      { model: "waterfall", params: { scenario: "distress", ev: "2500" }, label: "Prepack recovery at $2.5B EV" }
    ],
    outputs: {
      winnerRecovery: "65-85%",
      loserRecovery: "25-40%",
      riskLevel: "medium"
    }
  },

  /* ─── 10. FREE-FALL CH.11 + DIP FINANCING ─────────────────────────────── */
  {
    id: "freefall-ch11-dip",
    name: "Free-Fall Ch.11 + DIP Financing",
    category: "in-court",
    summary: "AMC files Chapter 11 without a pre-negotiated plan, requiring DIP financing ($500-800M) to fund operations during reorganization. DIP lenders gain super-priority administrative claims and effective control over restructuring timeline. Extended timeline (12-24 months) erodes going-concern value.",
    mechanics: "In a free-fall Chapter 11, AMC files a voluntary petition under Section 301 of the Bankruptcy Code without any pre-negotiated RSA or plan term sheet — typically triggered by an imminent liquidity crisis, a cross-default cascade, or the failure of out-of-court negotiations. The filing triggers Section 362's automatic stay, halting all creditor collection actions, but unlike a prepack, there is no roadmap for emergence. AMC's first critical need is DIP financing under Section 364 of the Bankruptcy Code. Given the company's approximately $417M cash balance (which could deplete rapidly given ~$267M annual cash interest obligations and ongoing operating costs), a DIP facility of $500-800M would be required to fund operations, pay post-petition vendors, and maintain theatre operations during what could be a 12-24 month reorganization. The DIP financing involves several layers of Section 364 authority: Section 364(a) permits unsecured credit in the ordinary course; Section 364(c) allows super-priority administrative expense status; and Section 364(d) permits 'priming' liens that are senior to existing secured debt — the most contentious provision. DIP lenders (likely the existing DOC 4 Term Loan holders, who have the economic incentive and collateral familiarity) would demand priming liens on all Muvico assets, super-priority administrative claims, roll-up provisions converting a portion of their pre-petition Term Loan claims into DIP claims (effectively improving their priority position), and case milestones requiring the debtor to achieve plan confirmation or 363 sale within specified deadlines. Section 9.02(b)(x) of DOC 4 contains a critical provision: it requires unanimous lender consent for any DIP facility that would subordinate the Term Loan obligations, and mandates that each lender be offered its pro rata share of any such priming facility. This provision gives every Term Loan lender the right to participate in DIP lending, preventing a controlling group from exclusively capturing DIP economics. First-day motions filed alongside the petition would include requests for authority to pay critical vendors, continue employee wages and benefits, maintain cash management systems, use cash collateral under Section 363, and honor customer loyalty programs (AMC Stubs). The bankruptcy court evaluates these motions under the business judgment standard. AMC retains a 120-day exclusivity period under Section 1121(b) during which only the debtor can file a plan of reorganization — this period can be extended up to 18 months. If exclusivity expires, any party in interest (including creditor committees) may file competing plans, creating a contested confirmation process. The United States Trustee appoints an Official Committee of Unsecured Creditors (UCC) under Section 1102, which represents the interests of AMC's general unsecured creditors including trade vendors, rejected lease claims, and the subordinated notes. The UCC has standing to investigate pre-petition transactions (including the 2021 Muvico dropdown and the 2024 LME), potentially asserting avoidance actions under Sections 544, 547, and 548. A significant risk in a free-fall case is the potential appointment of a Chapter 11 trustee under Section 1104 if the court finds 'cause' (fraud, dishonesty, or gross mismanagement) or if appointment is in the 'interests of creditors.' Trustee appointment strips management of control — a devastating outcome for AMC's operational continuity given the complexity of managing 600+ theatre locations. Substantive consolidation between the AMC parent and Muvico entities is another risk: creditors may argue the entities should be treated as a single estate if corporate formalities were not maintained or if assets were commingled. Consolidation would eliminate the structural priority that Muvico-level creditors enjoy, fundamentally altering the recovery waterfall. Ultimately, the case concludes with either plan confirmation under Section 1129 or, if reorganization proves infeasible, conversion to Chapter 7 liquidation under Section 1112(b).",
    applicability: "A free-fall filing scenario arises if AMC's out-of-court restructuring efforts collapse — for instance, if competing creditor factions cannot agree on RSA terms, if a cross-default cascade triggered by missing an interest payment on any tranche accelerates the entire capital structure, or if an adverse court ruling in pending litigation forces an emergency filing. AMC's $417M cash balance provides only approximately 18 months of liquidity runway given the $267M annual cash interest burden (before any principal amortization), meaning a filing could be triggered as early as mid-2027 if no restructuring is achieved. The DIP market for theatre operators has been tested in recent years — Cineworld secured a $1.94B DIP facility in its 2022 filing — suggesting that AMC could access adequate DIP financing, though at expensive terms (typically L+800-1000bps with 2-3% origination fees). The Muvico entity isolation creates specific complications: if Muvico files separately from AMC parent, the DOC 6 Odeon notes ($400M) ring-fence would be preserved, but coordination between debtors becomes complex. If AMC and Muvico file jointly, substantive consolidation arguments could eliminate the Muvico waterfall priority, dramatically impacting DOC 4 and DOC 2 recoveries. The operational complexity of maintaining 600+ theatre locations during a lengthy Chapter 11 — negotiating with landlords on 365 motions for each lease, retaining key employees, maintaining studio content supply relationships, and preserving customer loyalty — makes extended free-fall cases particularly value-destructive for entertainment companies.",
    precedents: [
      "Cineworld Group (2022)",
      "Regal Entertainment (multiple)",
      "Studio Movie Grill (2020)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik", "muvico-8pik", "muvico-6-8pik", "amc-750", "amc-sub", "odeon-1275"],
    relatedDocs: ["doc4", "doc2", "doc6"],
    relatedResearch: ["court-solutions", "muvico-deep-dive"],
    modelLinks: [
      { model: "waterfall", params: { scenario: "distress", ev: "2000" }, label: "Recovery at $2.0B EV (extended case)" },
      { model: "waterfall", params: { scenario: "distress", ev: "2500" }, label: "Recovery at $2.5B EV (quick resolution)" }
    ],
    outputs: {
      winnerRecovery: "80-100%",
      loserRecovery: "0-5%",
      riskLevel: "high"
    }
  },

  /* ─── 11. 363 CREDIT BID / ASSET SALE ──────────────────────────────────── */
  {
    id: "363-credit-bid",
    name: "363 Credit Bid / Asset Sale",
    category: "in-court",
    summary: "In a Chapter 11 proceeding, AMC's assets are sold through a Section 363 sale process. The Term Loan lenders use their secured claim to credit bid (bid with their debt claims instead of cash), effectively acquiring the operating assets at a price equal to their outstanding debt. Junior creditors receive minimal or no recovery.",
    mechanics: "A Section 363 asset sale is an alternative to a traditional plan of reorganization and is frequently used when going-concern value is best preserved through a rapid sale rather than an extended restructuring process. The process begins when AMC (as debtor-in-possession) or a creditor party files a motion under Section 363(b) seeking court authority to sell assets outside the ordinary course of business. The court evaluates whether there is a 'sound business justification' for the sale — typically demonstrated by showing that the assets are declining in value, that a reorganization is not feasible, or that a sale maximizes value for the estate. AMC or its advisors identify a 'stalking horse' bidder — a lead bidder who sets the floor price and negotiates protections including a break-up fee (typically 2-4% of purchase price) and expense reimbursement. For AMC, the stalking horse would almost certainly be the DOC 4 Term Loan lender group, which has the economic incentive and the legal right to credit bid under Section 363(k) of the Bankruptcy Code. Credit bidding under Section 363(k) allows a secured creditor to bid the face amount of its secured claim in lieu of cash. The DOC 4 Term Loan lenders hold $1,999.1M in secured claims against the Muvico collateral, giving them the ability to credit bid up to that full amount. This means any competing cash bidder must offer more than $2B in cash to outbid the Term Loan lenders — a prohibitively high threshold given AMC's operating metrics and the distressed theatre industry. The Supreme Court's decision in RadLAX Gateway Hotel, LLC v. Amalgamated Bank (2012) confirmed that Section 363(k) credit bidding rights cannot be stripped in a 363 sale process, though the bankruptcy court retains equitable discretion to limit credit bidding for 'cause' (e.g., if the secured claim amount is disputed or if credit bidding would chill competitive bidding). The 363 sale process typically follows this timeline: stalking horse agreement execution (week 1-2), sale motion filed with the court (week 2-3), objection deadline (week 5-6), bid deadline for competing offers (week 6-7), auction (if competing bids received, week 7-8), and sale hearing and approval (week 8-9). The sale is conducted 'free and clear' of all liens, claims, encumbrances, and interests under Section 363(f), meaning the buyer acquires clean title to the assets. Existing liens attach to the sale proceeds, which are distributed according to the absolute priority rule. In the AMC context, a credit bid by Term Loan lenders would effectively transfer the Muvico operating assets — the ~600 domestic theatre locations, lease portfolio, equipment, intellectual property, and going-concern value — to a new entity controlled by the Term Loan lenders. The lenders would form a new holding company (sometimes called a 'NewCo'), contribute their Term Loan claims as the credit bid consideration, and emerge as the equity owners of the reorganized theatre operations. Proceeds from the sale (after satisfaction of the credit bid and administrative claims) flow down the waterfall: DIP claims and administrative expenses first, then any remaining value to the 1.5L Muvico PIK Notes, then to junior tranches. If the credit bid amount ($1,999.1M) plus administrative claims exceeds the sale value — which is likely at distressed EV levels — junior creditors receive zero recovery from the Muvico assets. Claims at the AMC holdco level (DOC 3 AMC 7.5% Notes, DOC 1 6.125% Sub Notes) would recover only from residual AMC-level assets not included in the Muvico sale, which are limited to brand value, non-Muvico theatre interests, and AMC's $145.5M share of consolidated EBITDA.",
    applicability: "The 363 credit bid is a powerful tool for DOC 4 Term Loan lenders because their $1,999.1M secured claim against the Muvico collateral is large enough to serve as a credit bid for substantially all of the domestic theatre operations — the core operating assets generating the majority of AMC's EBITDA. At current trading levels (Term Loan at 76.12 cents), lenders who accumulated positions at a discount would capture significant upside through a credit bid at face value. The theatre portfolio is suited to a going-concern 363 sale because the assets (primarily leasehold interests and operating infrastructure) are worth far more as an integrated theatre network than if liquidated piecemeal. The Odeon international operations ($400M DOC 6 notes, ring-fenced under English law) would likely be excluded from a US 363 sale, as Odeon Finco PLC is not a US debtor and its assets are pledged solely to DOC 6 holders. This simplifies the 363 process but means the buyer acquires only the domestic operations. A key consideration is whether the Muvico 15% PIK Notes (DOC 2, $857M at 1.5L) holders would contest the credit bid. Under the intercreditor framework, DOC 2 holders have subordinated their lien enforcement rights to the Term Loan agent, meaning their ability to block a 363 sale is limited. However, they could argue that the credit bid undervalues the assets and seek appointment of an examiner to conduct an independent valuation. The 363 sale timeline (typically 60-90 days from filing to closing) preserves going-concern value by minimizing the period of bankruptcy uncertainty, maintaining studio content relationships, and retaining key employees — critical advantages for a theatre operator where customer and content partner confidence is paramount.",
    precedents: [
      "Regal Cinemas (2001)",
      "Mervyn's LLC (2008)",
      "RadioShack (2015)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik", "amc-750", "amc-sub"],
    relatedDocs: ["doc4", "doc2"],
    relatedResearch: ["court-solutions", "lender-strategy"],
    modelLinks: [
      { model: "waterfall", params: { scenario: "distress", ev: "2500" }, label: "363 sale recovery at $2.5B EV" },
      { model: "waterfall", params: { scenario: "distress", ev: "2000" }, label: "363 sale recovery at $2.0B EV" }
    ],
    outputs: {
      winnerRecovery: "85-100%",
      loserRecovery: "0%",
      riskLevel: "medium"
    }
  },

  /* ─── 12. CHAPTER 7 LIQUIDATION ────────────────────────────────────────── */
  {
    id: "ch7-liquidation",
    name: "Chapter 7 Liquidation",
    category: "in-court",
    summary: "AMC's Chapter 11 case converts to Chapter 7 liquidation (or files directly), with a trustee appointed to wind down operations and liquidate all assets. Theatre leases are rejected, equipment and real property sold at distress values, and proceeds distributed per strict absolute priority. All stakeholders suffer severe losses.",
    mechanics: "Chapter 7 liquidation represents the worst-case restructuring outcome for all AMC stakeholders. The process begins either through a direct Chapter 7 filing under Section 701 or, more commonly, through conversion from Chapter 11 under Section 1112(b) when the bankruptcy court determines that reorganization is not feasible — for instance, if AMC cannot confirm a plan of reorganization, if the DIP facility is terminated, or if continuing operations would cause increasing losses to the estate. Upon conversion or filing, the Chapter 11 debtor-in-possession status terminates and the United States Trustee appoints a Chapter 7 trustee under Section 701 — an independent fiduciary whose sole duty is to marshal and liquidate the estate's assets for the benefit of creditors. AMC's management loses all control over the business, and the trustee takes possession of all estate property. The trustee's first action is to cease operations at all ~600 domestic theatre locations. This is immediate and devastating: theatres go dark, employees are terminated (triggering WARN Act notification requirements for mass layoffs), and AMC's going-concern value — the premium attributable to its integrated operating network, studio content relationships, AMC Stubs loyalty program (approximately 30M+ members), brand recognition, and trained workforce — is permanently destroyed. Under Section 365, the trustee may reject all of AMC's executory contracts and unexpired leases, including the approximately 600 theatre leases that constitute AMC's largest ongoing obligation (estimated at $400-800M annually in lease payments). Lease rejection creates an unsecured claim for the landlord equal to the greater of one year's rent or 15% of the remaining lease term (capped at three years) under Section 502(b)(6) — these rejection claims dilute recoveries for all unsecured creditors. The trustee then liquidates estate assets through a combination of public auctions, private sales, and negotiated dispositions. AMC's liquidatable assets include: (1) owned real property (limited — AMC primarily leases its locations); (2) furniture, fixtures, and equipment (theatre seating, projection systems, concession equipment, HVAC systems) — FF&E typically recovers 10-25% of replacement cost at forced liquidation; (3) intellectual property (the AMC brand, AMC Stubs program, proprietary technology) — brand value is significantly impaired once operations cease; (4) inventory (concession supplies, minimal value); (5) receivables and cash on hand; and (6) any remaining equity interests in subsidiaries not separately filed (including the Odeon international operations, though ring-fenced under DOC 6). Going-concern discount in liquidation is severe for theatre chains: industry data suggests piecemeal liquidation recovers approximately 40-60% of going-concern operating value, and for a lease-dependent business like AMC, the discount can be even steeper because the primary value driver (the integrated network of premium theatre locations) ceases to exist once leases are rejected. Liquidation proceeds are distributed under the strict absolute priority rule codified in Section 726 of the Bankruptcy Code: (1) administrative expenses (trustee fees, professional fees, post-petition operating costs during wind-down); (2) priority claims (employee wage claims up to $15,150 per employee, tax claims); (3) secured creditors to the extent of their collateral value (DOC 4 Term Loan first from Muvico assets, then DOC 2 15% PIK Notes from remaining Muvico collateral, etc.); (4) general unsecured creditors (pro rata from any remaining unencumbered assets); (5) subordinated claims (DOC 1 6.125% Sub Notes); and (6) equity interests (effectively zero). The Chapter 7 process typically takes 12-36 months to complete full liquidation and distribution, during which time liquidation costs (trustee compensation at 3-5% of distributions, professional fees, wind-down costs) consume a significant portion of estate value.",
    applicability: "Chapter 7 liquidation is the scenario all AMC stakeholders — from 1L Term Loan holders to equity — have the strongest incentive to avoid. AMC's asset base is heavily lease-dependent: the vast majority of its ~600 domestic locations are leased rather than owned, meaning the primary operating assets would simply be abandoned in a Chapter 7. The FF&E in theatres (seating, screens, projection equipment, concession infrastructure) has limited secondary market value — specialized theatre equipment has few alternative uses. AMC's most valuable intangible assets — the brand, the AMC Stubs loyalty program with 30M+ members, and studio content relationships — are worth little or nothing once the theatre network ceases operations. At a consolidated EV of $2.0-2.5B (the distress scenario range), a 40-60% liquidation discount would produce total recoverable value of $800M-$1.5B — against $4B of face debt and potentially hundreds of millions in administrative claims. Under this math, the DOC 4 Term Loan ($1,999.1M) would recover only 40-75% of face, the Muvico PIK Notes would recover 0-20%, and AMC-level unsecured creditors would receive effectively zero. The Odeon operations ($400M DOC 6 notes) represent a partial exception: because Odeon Finco PLC is ring-fenced under English law and its assets are not part of a US Chapter 7 estate, DOC 6 holders may recover independently from Odeon's UK/European assets — though Odeon itself carries 26.67x leverage ($400M debt against $15M EBITDA), suggesting limited recovery even in that ring-fenced pool. The Chapter 7 scenario provides the baseline recovery floor against which all other restructuring alternatives are measured — it is the 'best interests of creditors' test benchmark under Section 1129(a)(7) that any Chapter 11 plan must satisfy.",
    precedents: [
      "Clearview Cinemas (2014)",
      "Pacific Theatres (2021)",
      "ArcLight Cinemas (2021)"
    ],
    affectedTranches: ["term-loan", "muvico-15pik", "muvico-8pik", "muvico-6-8pik", "amc-750", "amc-sub", "odeon-1275"],
    relatedDocs: ["doc4", "doc2", "doc6", "doc1"],
    relatedResearch: ["court-solutions", "muvico-deep-dive"],
    modelLinks: [
      { model: "waterfall", params: { scenario: "distress", ev: "1500" }, label: "Liquidation recovery at $1.5B (40% discount)" },
      { model: "waterfall", params: { scenario: "distress", ev: "2000" }, label: "Liquidation recovery at $2.0B (modest discount)" }
    ],
    outputs: {
      winnerRecovery: "40-60%",
      loserRecovery: "0-15%",
      riskLevel: "high"
    }
  }

];
