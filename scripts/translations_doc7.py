"""DOC 7 Translations — 6.00%/8.00% Cash/PIK Toggle Senior Secured Exchangeable Notes due 2030
Issuer: Muvico, LLC | 2L at Muvico (fulcrum security) | $414M | 6% cash OR 8% PIK toggle | Exchangeable at $5.66/share
"""

TRANSLATIONS = {}

# ── Article Overviews ────────────────────────────────────────────────────────

TRANSLATIONS[("doc7", "II", "article")] = """
<p><strong>The Notes.</strong> Governs the issuance mechanics for the PIK Toggle Exchangeable Notes, including form, authentication, paying agent and exchange agent designation, PIK interest issuance, and cancellation procedures. These are $414M face value notes issued by Muvico, LLC with a toggle feature: 6% cash interest OR 8% PIK interest at the Company's election. <strong>Why it matters:</strong> The toggle feature gives Muvico flexibility to preserve cash by electing PIK, but this causes the outstanding principal to grow, increasing the debt burden and diluting recovery for these 2L holders who are already the most junior secured tranche.</p>
"""

TRANSLATIONS[("doc7", "III", "article")] = """
<p><strong>Redemption</strong> for the PIK Toggle notes uses a <strong>Soft Call</strong> mechanism (same as DOC 5). No traditional hard call is available. There is also a Special Mandatory Redemption and a Fundamental Change put right. The Soft Call protects the exchange option embedded in these notes.</p>
"""

TRANSLATIONS[("doc7", "IV", "article")] = """
<p><strong>Covenants</strong> follow the same structure as DOC 5 but are tailored for the Centertainment Group. Key provisions include standard high-yield restrictions plus structural covenants for corporate separateness (Sec 4.20) and intercompany agreements (Sec 4.21). <strong>Notable difference:</strong> The asset sale basket is much tighter than other documents: only <strong>$1M for a single transaction / $5M aggregate</strong> (vs. much higher thresholds in DOC 2-5). This severely restricts Muvico's ability to sell assets without triggering the excess proceeds mechanism.</p>
"""

TRANSLATIONS[("doc7", "IV-A", "article")] = """
<p><strong>Additional Covenants of Holdings and UK Holdco.</strong> Restricts Centertainment Development, LLC (Holdings) and AMC UK Holding Limited to passive holding company activities only. No operating business, no independent debt, no unrelated liabilities. This clean holdco requirement preserves the direct equity chain for Muvico's secured creditors.</p>
"""

TRANSLATIONS[("doc7", "IV-B", "article")] = """
<p><strong>Additional Covenants of AMC and Existing Guarantors.</strong> Imposes obligations on AMC and its direct subsidiaries as guarantors of the PIK Toggle notes. Key requirements include maintaining the guarantee, complying with information covenants, and not interfering with Muvico Group operations in ways that would prejudice note holders. These covenants ensure AMC's guarantee remains enforceable.</p>
"""

TRANSLATIONS[("doc7", "V", "article")] = """
<p><strong>Successors.</strong> Governs mergers, consolidations, and sales of all or substantially all assets. The surviving entity must assume all obligations and be organized in the US. <strong>Why it matters:</strong> As the most junior secured tranche (2L), these noteholders are most vulnerable to value destruction in corporate restructurings, making the successor protections particularly important.</p>
"""

TRANSLATIONS[("doc7", "VI", "article")] = """
<p><strong>Defaults and Remedies.</strong> Lists the trigger events allowing acceleration of the PIK Toggle notes. Includes payment defaults, covenant breaches, cross-defaults to $50M+ of other debt, bankruptcy events, and judgment defaults. <strong>Why it matters:</strong> As 2L holders, these noteholders are last in the secured creditor queue but can still accelerate and enforce their liens -- creating potential leverage in restructuring negotiations despite their junior position.</p>
"""

TRANSLATIONS[("doc7", "VII", "article")] = """
<p><strong>Trustee.</strong> Establishes GLAS Trust Company LLC's duties, rights, and limitations as trustee. Same trustee as DOC 5 (the Muvico Exchangeable Notes), which could create coordination efficiencies but also potential conflicts between the 1.25L and 2L tranches in a restructuring.</p>
"""

TRANSLATIONS[("doc7", "VIII", "article")] = """
<p><strong>Discharge of Indenture.</strong> Specifies how Muvico can satisfy and terminate its obligations through full payment or deposit of sufficient funds. Unlike DOC 5, the defeasance provisions here are more limited (Section 8.02 is Reserved). <strong>Why it matters:</strong> The absence of full defeasance mechanics means Muvico has fewer options for cleanly retiring this debt outside of full cash repayment.</p>
"""

TRANSLATIONS[("doc7", "IX", "article")] = """
<p><strong>Amendments.</strong> Governs modifications with or without holder consent. Sacred rights (payment terms, exchange rate, lien priority) require each holder's consent. Other amendments require majority vote. <strong>Why it matters:</strong> The consent mechanics are critical for these fulcrum securities -- in any restructuring, the 2L holders' voting power determines whether a deal can be done or whether a cramdown is necessary.</p>
"""

TRANSLATIONS[("doc7", "X", "article")] = """
<p><strong>Exchange of Notes</strong> is the most economically significant feature of this instrument. The notes are exchangeable into AMC common stock at <strong>$5.66 per share</strong> (Exchange Rate: 176.6379 shares per $1,000 principal). The exchange includes an <strong>Exchange Adjustment declining premium schedule</strong>:
Years 0-3: <strong>18.0%</strong> additional consideration;
Years 3-4: <strong>12.0%</strong>;
Years 4-5: <strong>6.0%</strong>;
After Year 5: <strong>0%</strong>.
This means early exchangers receive a significant premium, incentivizing patience but rewarding early conversion. With these notes issued July 2024, the 18% premium period runs through July 2027.</p>
"""

TRANSLATIONS[("doc7", "XI", "article")] = """
<p><strong>Guarantee.</strong> Establishes the guarantee structure, including guarantors' obligations, liability limitations, and subrogation provisions. The guarantee from Centertainment Development, LLC and other guarantors provides additional credit support beyond Muvico's own assets. <strong>Why it matters:</strong> As 2L holders, the guarantee is a secondary source of recovery, but its value depends on the guarantors' net worth after satisfying senior claims.</p>
"""

TRANSLATIONS[("doc7", "XII", "article")] = """
<p><strong>Collateral.</strong> Governs the security documents, collateral release conditions, and Notes Collateral Agent's powers. These notes hold 2L priority at Muvico, making them the most junior secured tranche -- behind the $2B Term Loan (1L), the Muvico Exchangeable Notes (1.25L), and the Muvico 15% PIK Notes (1.5L). <strong>Why it matters:</strong> At 2L priority, these notes only recover after approximately $3.05B in senior secured claims are satisfied, making the collateral position highly residual and dependent on total enterprise value.</p>
"""

TRANSLATIONS[("doc7", "XIII", "article")] = """
<p><strong>Miscellaneous.</strong> Standard boilerplate provisions covering notices, governing law (New York), severability, successors, and USA PATRIOT Act compliance. Same framework as the other Muvico-issued instruments (DOC 2 and DOC 5).</p>
"""

# ── Section Translations ─────────────────────────────────────────────────────

# Article II — The Notes

TRANSLATIONS[("doc7", "2.01")] = """
<p><strong>Amount of Notes; Additional Notes.</strong> Authorizes the initial issuance of $414,433,523 aggregate principal amount of notes, with the ability to issue additional pari passu notes. <strong>Why it matters:</strong> Additional issuances would increase total 2L claims without increasing Muvico's asset base, further diluting recovery. However, the tight indebtedness covenant limits the ability to issue additional notes given Muvico's leverage.</p>
"""

TRANSLATIONS[("doc7", "2.02")] = """
<p><strong>Form and Dating.</strong> Notes are issued as global notes in registered form, held through DTC. Standard book-entry format facilitating secondary market trading.</p>
"""

TRANSLATIONS[("doc7", "2.03")] = """
<p><strong>Execution and Authentication.</strong> Notes must be signed by Muvico's authorized officers and authenticated by GLAS Trust Company LLC before becoming valid. The Trustee's authentication verifies proper issuance procedures.</p>
"""

TRANSLATIONS[("doc7", "2.04")] = """
<p><strong>Registrar, Paying Agent and Exchange Agent.</strong> Designates agents for the holder registry, payment distribution, and exchange processing. The Exchange Agent handles the conversion of notes into AMC stock, a function unique to the exchangeable instruments (DOC 5 and DOC 7).</p>
"""

TRANSLATIONS[("doc7", "2.05")] = """
<p><strong>Paying Agent To Hold Money and PIK Notes in Trust.</strong> The Paying Agent must segregate funds and PIK notes for distribution. When Muvico elects PIK interest (8%), additional notes are created and held in trust until distributed, increasing the outstanding principal amount.</p>
"""

TRANSLATIONS[("doc7", "2.06")] = """
<p><strong>Holder Lists.</strong> The Trustee maintains a current list of noteholders, enabling notices, consent solicitation, and coordinated holder action -- critical capabilities in restructuring scenarios.</p>
"""

TRANSLATIONS[("doc7", "2.07")] = """
<p><strong>Replacement Notes.</strong> Provides for issuance of replacement notes if originals are lost, stolen, or destroyed, subject to indemnity requirements.</p>
"""

TRANSLATIONS[("doc7", "2.08")] = """
<p><strong>Outstanding Notes.</strong> Defines which notes count as "outstanding" for voting and consent purposes. Company-held notes are excluded from calculations, preventing the issuer from buying back discounted notes and using them to vote in its own interest.</p>
"""

TRANSLATIONS[("doc7", "2.09")] = """
<p><strong>Temporary Notes.</strong> Allows temporary notes pending preparation of definitive notes. Same rights and obligations as permanent notes.</p>
"""

TRANSLATIONS[("doc7", "2.10")] = """
<p><strong>Cancellation.</strong> Paid, redeemed, or exchanged notes must be cancelled and cannot be reissued. When notes are exchanged into AMC stock, the debt claim is extinguished through cancellation.</p>
"""

TRANSLATIONS[("doc7", "2.11")] = """
<p><strong>Defaulted Interest.</strong> If interest is not paid when due, the Company must pay defaulted interest plus interest on the defaulted amount. Compensates holders for late payment and discourages strategic payment delays.</p>
"""

TRANSLATIONS[("doc7", "2.12")] = """
<p><strong>CUSIP Numbers or ISINs.</strong> Requires identification numbers for trading purposes. Standard for institutional debt instruments.</p>
"""

TRANSLATIONS[("doc7", "2.13")] = """
<p><strong>Computation of Interest.</strong> Interest is computed on a 360-day year of twelve 30-day months. The toggle rate is 6.00% cash or 8.00% PIK at the Company's election. <strong>Why it matters:</strong> The 2% PIK premium (8% vs. 6%) is the cost Muvico pays for the flexibility to preserve cash. If Muvico consistently elects PIK, the outstanding principal compounds at 8% annually.</p>
"""

TRANSLATIONS[("doc7", "2.14")] = """
<p><strong>Payment of Interest; Issuance of PIK Notes; Notice of PIK Interest.</strong> The Company must elect cash or PIK before each interest period and provide advance notice of the election. PIK interest is paid by issuing additional notes rather than cash. <strong>Why it matters:</strong> The toggle election reveals Muvico's cash flow priorities. Consistently choosing PIK signals cash preservation needs, while choosing cash signals improving financial health. Holders should monitor these elections as a leading indicator of financial stress.</p>
"""

TRANSLATIONS[("doc7", "2.15")] = """
<p><strong>Exchange and Cancellation of Notes to Be Exchanged.</strong> When holders exercise their exchange right into AMC stock, the surrendered notes are cancelled, extinguishing the debt claim. This mechanism is shared with DOC 5.</p>
"""

# Article III — Redemption

TRANSLATIONS[("doc7", "3.03")] = """
<p><strong>Soft Call.</strong> The Company may redeem all (but not less than all) notes only when AMC's stock price exceeds a premium to the Exchange Price for a sustained period. <strong>Key detail:</strong> With the exchange price at $5.66/share, the Soft Call is only available if AMC stock rises significantly above this level. At current market prices, the Soft Call is not available, meaning holders are locked into the investment unless they sell on the secondary market or exchange into equity. This makes these notes effectively non-callable in the near term.</p>
"""

TRANSLATIONS[("doc7", "3.04")] = """
<p><strong>Effect of Soft Call Notice.</strong> Once a valid Soft Call notice is delivered, called notes stop accruing interest on the redemption date. The notice is irrevocable, creating certainty for both the Company and holders about the redemption terms.</p>
"""

TRANSLATIONS[("doc7", "3.05")] = """
<p><strong>Deposit of Redemption Price.</strong> The Company must deposit sufficient funds with the Paying Agent before the redemption date, ensuring holders receive payment when they surrender their notes.</p>
"""

TRANSLATIONS[("doc7", "3.07")] = """
<p><strong>Special Mandatory Redemption.</strong> If certain Transaction conditions are not satisfied, the Company must redeem all notes at par plus accrued interest. This is the same deal-protection mechanism as DOC 5.</p>
"""

TRANSLATIONS[("doc7", "3.08")] = """
<p><strong>Offers to Repurchase by Application of Excess Proceeds.</strong> If Muvico sells assets and has Excess Proceeds not reinvested within 365 days, it must offer to repurchase notes at par. This connects to the extraordinarily tight asset sale baskets ($1M single / $5M aggregate) that make this provision more likely to be triggered than in other documents.</p>
"""

TRANSLATIONS[("doc7", "3.09")] = """
<p><strong>Fundamental Change Put Right.</strong> Holders may require repurchase at <strong>100% of principal plus accrued interest</strong> upon a Fundamental Change. Combined with the exchange feature, this creates a "heads I win, tails I'm protected" dynamic: if AMC stock rises, holders exchange into equity; if AMC undergoes a fundamental change, holders put at par.</p>
"""

# Article IV — Covenants

TRANSLATIONS[("doc7", "4.01")] = """
<p><strong>Payment of Notes.</strong> Muvico must pay principal, interest (whether cash or PIK), and premium when due. Failure to pay is an immediate Event of Default for principal and triggers a 30-day cure period for interest. This is the most fundamental covenant in the indenture.</p>
"""

TRANSLATIONS[("doc7", "4.03")] = """
<p><strong>Payment of Taxes and Other Claims.</strong> The Company must pay all taxes and governmental charges when due. Unpaid taxes could result in government liens that would prime all secured creditors, including the 1L Term Loan.</p>
"""

TRANSLATIONS[("doc7", "4.04")] = """
<p><strong>Maintenance of Properties.</strong> The Company must maintain its properties in good condition. Since these notes are secured by Muvico's theatre assets (at 2L priority), this covenant ensures the collateral base is preserved for all secured creditors.</p>
"""

TRANSLATIONS[("doc7", "4.05")] = """
<p><strong>Limitation on Indebtedness.</strong> Same general framework as DOC 2 and DOC 5 - Fixed Charge Coverage Ratio incurrence test with specified exceptions. As 2L at Muvico (the most junior secured tranche), these noteholders have the weakest position in the Muvico capital structure. The debt baskets must accommodate all senior tranches (1L Term Loan, 1.25L Exchangeable, 1.5L PIK Notes) before these 2L notes have any residual claim.</p>
"""

TRANSLATIONS[("doc7", "4.06")] = """
<p><strong>Limitation on Restricted Payments.</strong> Restricts distributions from Muvico. <strong>Key structural point:</strong> As 2L holders, these noteholders are most vulnerable to leakage. If cash flows out of Muvico through restricted payments, there is less available for the 2L tranche's recovery. The tight asset sale basket ($1M/$5M) and restricted payment limitations work together to keep value within the Muvico entity.</p>
"""

TRANSLATIONS[("doc7", "4.07")] = """
<p><strong>Limitation on Liens.</strong> Prevents Muvico from creating new liens without consent. As 2L holders, this covenant prevents further subordination by restricting the creation of additional secured claims that would rank ahead or pari passu. Permitted liens include the existing 1L, 1.25L, and 1.5L tranches.</p>
"""

TRANSLATIONS[("doc7", "4.08")] = """
<p><strong>Limitation on Transactions with Affiliates.</strong> Arm's-length requirements for all intercompany and affiliate transactions. Prevents AMC from extracting value from Muvico through below-market deals. Escalating thresholds apply: board approval for larger transactions, fairness opinions for the largest.</p>
"""

TRANSLATIONS[("doc7", "4.09")] = """
<p><strong>Negative Pledge.</strong> Prevents contractual restrictions on cash movement within the Muvico Group. Ensures subsidiaries can pay dividends and transfer assets upstream to service these notes. <strong>Why it matters:</strong> Without this provision, valuable cash-generating subsidiaries could be walled off from the note-paying entity.</p>
"""

TRANSLATIONS[("doc7", "4.10")] = """
<p><strong>Future Guarantors.</strong> Requires new subsidiaries to guarantee these notes and grant liens. Prevents the Company from growing around the existing security package by creating or acquiring unencumbered entities.</p>
"""

TRANSLATIONS[("doc7", "4.12")] = """
<p><strong>Provision of Financial Information.</strong> Requires delivery of financial statements and compliance certificates to the Trustee. Enables holders and the Trustee to monitor the Company's financial condition and covenant compliance.</p>
"""

TRANSLATIONS[("doc7", "4.13")] = """
<p><strong>Statement as to Compliance.</strong> Annual officers' certificates confirming no Default exists. Creates personal accountability for accurate reporting by company officers.</p>
"""

TRANSLATIONS[("doc7", "4.14")] = """
<p><strong>Waiver of Certain Covenants.</strong> Majority holders may waive compliance with certain covenants, providing flexibility for covenant relief without formal amendment. Sacred rights cannot be waived.</p>
"""

TRANSLATIONS[("doc7", "4.16")] = """
<p><strong>Asset Sales; Casualty Event; Payments on UK Holdco Intercompany Note.</strong> The asset sale restrictions here include the <strong>tightest baskets in the AMC capital structure</strong>: individual transactions capped at $1 million, aggregate at $5 million. Above these thresholds, the full excess proceeds machinery kicks in. This extraordinary tightness reflects the 2L holders' vulnerability: they need maximum asset preservation to have any recovery. <strong>Compare:</strong> DOC 2 has a much larger general basket, and DOC 4 (1L Term Loan) has even larger baskets. The tighter the basket, the more protective for junior creditors.</p>
"""

TRANSLATIONS[("doc7", "4.17")] = """
<p><strong>After-Acquired Collateral.</strong> The Company must grant 2L liens on newly acquired property. Ensures the collateral package expands with new assets, maintaining the 2L secured position across an expanding asset base.</p>
"""

TRANSLATIONS[("doc7", "4.19")] = """
<p><strong>Preservation of Existence.</strong> The Company must maintain its corporate existence, rights, licenses, and privileges. Cannot voluntarily dissolve while these notes are outstanding.</p>
"""

TRANSLATIONS[("doc7", "4.20")] = """
<p><strong>Centertainment Group Corporate Separateness.</strong> Same concept as DOC 5's Muvico separateness covenant but framed around the Centertainment structure. Requires maintaining separate legal identity, books, accounts, and arm's-length intercompany dealings. <strong>Critical for 2L holders:</strong> In bankruptcy, substantive consolidation would merge Muvico's assets with AMC's, potentially benefiting AMC-level creditors at the expense of Muvico-level secured holders. This covenant creates evidence of separateness that could defeat a consolidation argument.</p>
"""

TRANSLATIONS[("doc7", "4.21")] = """
<p><strong>Intercompany Agreements.</strong> Restricts terms and modifications of intercompany agreements between Muvico and other AMC entities. Prevents AMC from restructuring intercompany arrangements to siphon value away from Muvico, protecting the 2L holders' residual collateral claim.</p>
"""

TRANSLATIONS[("doc7", "4.22")] = """
<p><strong>Amendments to Certain Documents.</strong> The Company cannot amend key transaction documents (Credit Agreement, intercreditor agreements, security documents) without indenture compliance. Prevents modification of the priority structure that would further subordinate the 2L position.</p>
"""

# Article V — Successors

TRANSLATIONS[("doc7", "5.01")] = """
<p><strong>Merger, Consolidation, Amalgamation and Sale of All or Substantially All Assets.</strong> The Company may not merge or sell substantially all assets unless the surviving entity assumes all obligations, is organized in the US, and no Default results. <strong>Why it matters:</strong> For 2L holders, the successor must honor the full lien stack, including the 2L position. A transaction that eliminated the 2L lien would require holder consent under the sacred rights provisions.</p>
"""

TRANSLATIONS[("doc7", "5.02")] = """
<p><strong>Successor Substituted.</strong> A successor entity that properly assumes obligations replaces the Company as issuer. The original Company is released. Provides legal clarity about continuing obligations.</p>
"""

# Article VI — Defaults and Remedies

TRANSLATIONS[("doc7", "6.01")] = """
<p><strong>Events of Default.</strong> Includes: (a) failure to pay interest for 30 days; (b) failure to pay principal when due; (c) covenant breaches (60-day cure after notice); (d) cross-default on $50M+ of other Indebtedness; (e) judgment defaults; (f) collateral impairment; (g) bankruptcy/insolvency. <strong>Key dynamic for 2L holders:</strong> Cross-default links these notes to the entire Muvico/AMC capital structure. A default on any material instrument triggers acceleration here, but as 2L holders, acceleration only helps if there is sufficient collateral value after satisfying senior claims.</p>
"""

TRANSLATIONS[("doc7", "6.02")] = """
<p><strong>Acceleration; Rescission and Annulment.</strong> Holders of 25% may accelerate; majority may rescind. Bankruptcy triggers automatic acceleration. <strong>Why it matters:</strong> The ability to accelerate gives 2L holders leverage in restructuring negotiations even though their recovery may be limited, because acceleration creates urgency for the Company and senior creditors to negotiate.</p>
"""

TRANSLATIONS[("doc7", "6.03")] = """
<p><strong>Other Remedies.</strong> The Trustee may pursue any available remedy to enforce the indenture. However, the intercreditor agreement likely limits the 2L holders' ability to enforce against collateral while the 1L, 1.25L, and 1.5L tranches remain outstanding.</p>
"""

TRANSLATIONS[("doc7", "6.04")] = """
<p><strong>Waiver of Past Defaults.</strong> Majority holders may waive past defaults except payment defaults and sacred-right violations. Provides flexibility to avoid unnecessary acceleration.</p>
"""

TRANSLATIONS[("doc7", "6.05")] = """
<p><strong>Control by Majority.</strong> Majority holders direct the Trustee's enforcement actions. The 2L holder base likely includes sophisticated distressed debt funds who will coordinate enforcement strategy to maximize their leverage in any restructuring.</p>
"""

TRANSLATIONS[("doc7", "6.06")] = """
<p><strong>Limitation on Suits.</strong> Individual holders cannot sue unless they hold 25%+, have given notice, and the Trustee has failed to act. Standard collective action provision preventing individual nuisance suits.</p>
"""

TRANSLATIONS[("doc7", "6.07")] = """
<p><strong>Rights of Holders to Receive Payment.</strong> Each holder retains an absolute right to payment when due. This sacred right survives regardless of majority actions, ensuring no holder can be deprived of their claim without consent.</p>
"""

TRANSLATIONS[("doc7", "6.08")] = """
<p><strong>Collection Suit by Trustee.</strong> The Trustee may sue to collect overdue amounts centrally on behalf of all holders.</p>
"""

TRANSLATIONS[("doc7", "6.09")] = """
<p><strong>Trustee May File Proofs of Claim.</strong> The Trustee may file claims in bankruptcy on behalf of all holders. In a Muvico bankruptcy, the 2L claim would be filed alongside the 1L, 1.25L, and 1.5L claims, with recovery determined by the plan of reorganization.</p>
"""

TRANSLATIONS[("doc7", "6.10")] = """
<p><strong>Priorities.</strong> Collections are applied: first to Trustee fees, then to interest, then to principal. Trustee compensation is senior to holder distributions.</p>
"""

TRANSLATIONS[("doc7", "6.11")] = """
<p><strong>Undertaking for Costs.</strong> Courts may require litigating holders to post bonds. Standard provision discouraging frivolous actions.</p>
"""

TRANSLATIONS[("doc7", "6.12")] = """
<p><strong>Waiver of Stay or Extension Laws.</strong> The Company waives protective statutes that might delay enforcement. Strengthens creditor rights in default scenarios.</p>
"""

# Article VII — Trustee

TRANSLATIONS[("doc7", "7.01")] = """
<p><strong>Duties of Trustee.</strong> Pre-default, GLAS Trust performs only stated duties; post-default, it exercises prudent-person care. The same trustee serves DOC 5 (1.25L), creating potential coordination benefits but also potential conflicts between the two tranches.</p>
"""

TRANSLATIONS[("doc7", "7.02")] = """
<p><strong>Rights of Trustee.</strong> The Trustee may rely on documents without independent verification and is not liable for good-faith errors. Standard protections establishing the scope of the Trustee's fiduciary role.</p>
"""

TRANSLATIONS[("doc7", "7.03")] = """
<p><strong>Individual Rights of Trustee.</strong> GLAS Trust may deal with the Company in its individual capacity without creating conflicts. Recognizes the potential for multiple relationships.</p>
"""

TRANSLATIONS[("doc7", "7.04")] = """
<p><strong>Trustee's Disclaimer.</strong> The Trustee makes no representations about the validity of the notes or offering documents. Its role is limited to administration and fiduciary duties.</p>
"""

TRANSLATIONS[("doc7", "7.05")] = """
<p><strong>Notice of Defaults.</strong> The Trustee must notify holders of known defaults within 90 days, unless withholding notice is judged to be in holders' interest.</p>
"""

TRANSLATIONS[("doc7", "7.06")] = """
<p><strong>Reports by Trustee to Holders.</strong> Annual reports on eligibility, conflicts, and TIA matters keep holders informed about the Trustee's capacity to serve.</p>
"""

TRANSLATIONS[("doc7", "7.07")] = """
<p><strong>Compensation and Indemnity.</strong> Muvico must pay Trustee fees and indemnify against losses. The Trustee's lien on note proceeds for its compensation is senior to holder claims.</p>
"""

TRANSLATIONS[("doc7", "7.08")] = """
<p><strong>Replacement of Trustee.</strong> Majority holders may remove the Trustee, or it may resign with 30 days' notice. A successor must be appointed to ensure continuity.</p>
"""

TRANSLATIONS[("doc7", "7.09")] = """
<p><strong>Successor Trustee by Merger.</strong> If GLAS Trust merges, the surviving entity automatically becomes successor trustee.</p>
"""

TRANSLATIONS[("doc7", "7.10")] = """
<p><strong>Eligibility; Disqualification.</strong> The Trustee must be a US corporation with $50M+ in capital. Conflicts must be resolved or the Trustee must resign within 90 days.</p>
"""

TRANSLATIONS[("doc7", "7.11")] = """
<p><strong>Preferential Collection of Claims Against Company.</strong> TIA compliance requirements if the Trustee becomes a Company creditor in its individual capacity.</p>
"""

# Article VIII — Discharge of Indenture

TRANSLATIONS[("doc7", "8.01")] = """
<p><strong>Discharge of Liability on Notes.</strong> The indenture is discharged when all notes are paid in full, cancelled, or otherwise satisfied. Unlike DOC 5, DOC 7 does not include full defeasance provisions (Section 8.02 is Reserved), limiting Muvico's options for cleanly retiring this debt.</p>
"""

TRANSLATIONS[("doc7", "8.03")] = """
<p><strong>Application of Trust Money.</strong> Funds deposited with the Trustee must be applied solely to pay noteholders according to the indenture's terms.</p>
"""

TRANSLATIONS[("doc7", "8.04")] = """
<p><strong>Repayment to Company.</strong> Surplus funds after full payment are returned to Muvico. The Trustee has no investment obligation for deposited funds.</p>
"""

TRANSLATIONS[("doc7", "8.05")] = """
<p><strong>Indemnity for Government Obligations.</strong> The Company must indemnify the Trustee for losses on government obligations held for noteholder payments.</p>
"""

TRANSLATIONS[("doc7", "8.06")] = """
<p><strong>Reinstatement.</strong> If deposited funds become inaccessible, the Company's obligations are reinstated as if the discharge had not occurred. Protects holders against failed discharge attempts.</p>
"""

# Article IX — Amendments

TRANSLATIONS[("doc7", "9.01")] = """
<p><strong>Without Consent of Holders.</strong> Benign amendments (curing ambiguities, adding guarantors, adding collateral, adding covenants) may be made without holder approval. Limited to changes that do not adversely affect holders.</p>
"""

TRANSLATIONS[("doc7", "9.02")] = """
<p><strong>With Consent of Holders.</strong> Most amendments require majority consent. Sacred rights requiring each holder's consent include: payment terms, exchange rate/provisions, redemption price, lien priority, and amendment thresholds. <strong>Why it matters for the fulcrum security:</strong> As the likely fulcrum in a restructuring, the 2L holders' consent rights give them significant negotiating leverage. The Company cannot modify exchange terms or lien priority without unanimous consent, making these notes difficult to restructure outside bankruptcy.</p>
"""

TRANSLATIONS[("doc7", "9.03")] = """
<p><strong>Actions Taken by Initial Purchasers.</strong> Initial purchasers may take certain actions before notes are distributed to other investors. Facilitates the initial issuance process.</p>
"""

TRANSLATIONS[("doc7", "9.04")] = """
<p><strong>Revocation and Effect of Consents and Waivers.</strong> Consents may be revoked before effectiveness. Once effective, amendments bind all holders including non-consenters.</p>
"""

TRANSLATIONS[("doc7", "9.05")] = """
<p><strong>Notation on or Exchange of Notes.</strong> After amendment, the Trustee may require notation or exchange of notes to reflect new terms.</p>
"""

TRANSLATIONS[("doc7", "9.06")] = """
<p><strong>Trustee To Sign Amendments.</strong> The Trustee signs authorized amendments unless they adversely affect its own rights.</p>
"""

# Article X — Exchange of Notes

TRANSLATIONS[("doc7", "10.01")] = """
<p><strong>Exchange Privilege.</strong> Each holder may exchange their notes into AMC common stock at the Exchange Rate of <strong>176.6379 shares per $1,000 principal amount</strong> (equivalent to $5.66/share). The exchange right is exercisable at any time prior to maturity (subject to beneficial ownership limitations). <strong>Market context:</strong> At $107.4M face value and 89.19 price, the implied equity value of full exchange is approximately 18.97 million shares of AMC stock. If AMC stock trades above $5.66, these notes are "in the money" for exchange.</p>
"""

TRANSLATIONS[("doc7", "10.02")] = """
<p><strong>Exercise of Exchange Privilege.</strong> Holders deliver Exchange Notice to the Exchange Agent. Settlement occurs within 2 Business Days. Partial exchanges permitted in $1,000 increments. Exchange Notice is irrevocable once delivered. Same mechanics as DOC 5 but with the different Exchange Rate and adjustment schedule.</p>
"""

TRANSLATIONS[("doc7", "10.03")] = """
<p><strong>Settlement of Exchange Privilege.</strong> Company delivers shares (or cash, or combination at its election) within 2 Business Days. Cash settlement uses VWAP pricing. <strong>Key risk for holders:</strong> If the Company elects cash settlement when the stock is "in the money," it creates immediate liquidity pressure. If the Company elects share settlement, it dilutes existing equity holders. The settlement election gives the Company strategic flexibility in managing the exchange.</p>
"""

TRANSLATIONS[("doc7", "10.04")] = """
<p><strong>Exchange Adjustment Consideration.</strong> The declining premium schedule (18%/12%/6%/0%) adds to the base exchange value. For example, during the 18% premium period, exchanging $1,000 of notes yields $1,180 worth of shares (at the Exchange Rate) rather than just $1,000. This premium compensates holders for the time value of their option and incentivizes holding rather than immediate exchange. <strong>Strategic implication:</strong> The declining premium creates a natural incentive for the Company to delay triggering exchange events until the premium has stepped down, reducing dilution.</p>
"""

TRANSLATIONS[("doc7", "10.05")] = """
<p><strong>Fractions of Shares.</strong> No fractional shares of AMC stock are issued upon exchange. Cash is paid for the fractional share's market value instead. Avoids administrative complexity of fractional equity positions.</p>
"""

TRANSLATIONS[("doc7", "10.06")] = """
<p><strong>Adjustment of Exchange Rate.</strong> The Exchange Rate adjusts for anti-dilution events including: stock dividends, stock splits, rights offerings below market price, cash dividends exceeding a threshold, and spin-offs. These standard anti-dilution protections ensure that corporate actions do not impair the exchange value. <strong>Critical detail:</strong> The adjustment formulas use AMC's stock price as the reference, not Muvico's equity value, creating a structural mismatch between the issuer (Muvico) and the equity reference (AMC).</p>
"""

TRANSLATIONS[("doc7", "10.07")] = """
<p><strong>Adjustments of Prices.</strong> Rounding conventions and minimum thresholds for Exchange Price adjustments. Minor adjustments below thresholds are accumulated rather than applied immediately, avoiding constant recalculations.</p>
"""

TRANSLATIONS[("doc7", "10.08")] = """
<p><strong>Notice of Adjustments of Exchange Rate.</strong> The Company must promptly notify the Trustee and holders of any Exchange Rate adjustment, including the new rate and triggering event. Ensures holders can accurately value their exchange rights.</p>
"""

TRANSLATIONS[("doc7", "10.09")] = """
<p><strong>Certain Covenants.</strong> The Company must reserve sufficient authorized AMC common stock for all potential exchanges and maintain the listing on a national exchange. Failure to reserve shares would block exchanges and effectively destroy the option value.</p>
"""

TRANSLATIONS[("doc7", "10.10")] = """
<p><strong>Taxes on Exchanges.</strong> The Company pays documentary and stamp taxes on share issuance; holders bear income tax consequences. Standard tax allocation for exchangeable instruments.</p>
"""

TRANSLATIONS[("doc7", "10.11")] = """
<p><strong>Notice to Holders Prior to Certain Actions.</strong> Advance notice before events affecting exchange rights (dividends, rights offerings, reorganizations). Allows holders to decide whether to exchange before a material corporate event.</p>
"""

TRANSLATIONS[("doc7", "10.12")] = """
<p><strong>Provision in Case of Merger Event.</strong> If AMC merges or is acquired, the exchange right converts to the right to receive the same consideration as common stockholders. Ensures the exchange feature survives corporate transactions. <strong>Why it matters:</strong> In an acquisition at a premium, exchange holders would receive the premium consideration rather than being left with a debt claim against the old entity.</p>
"""

TRANSLATIONS[("doc7", "10.13")] = """
<p><strong>No Voting or Dividend Rights.</strong> Holders have no shareholder rights until notes are actually exchanged. They remain creditors, not equity holders, regardless of how far "in the money" the exchange may be.</p>
"""

TRANSLATIONS[("doc7", "10.14")] = """
<p><strong>No Responsibility of Trustee for Exchange Provisions.</strong> The Trustee has no duty to calculate or verify exchange conditions. The Company bears sole responsibility for exchange mechanics.</p>
"""

TRANSLATIONS[("doc7", "10.15")] = """
<p><strong>Beneficial Ownership Limitation.</strong> Exchange may be limited to prevent any holder from exceeding a specified ownership percentage of AMC stock. Prevents single holders from triggering regulatory ownership thresholds through mass exchange.</p>
"""

# Article XI — Guarantee

TRANSLATIONS[("doc7", "11.01")] = """
<p><strong>Guarantee.</strong> Each Guarantor unconditionally guarantees all amounts due under the notes. The guarantee is a primary obligation. <strong>Why it matters for 2L holders:</strong> The guarantee from Centertainment Development, LLC and other entities provides claim breadth beyond Muvico's own assets, but the guarantee's value depends on guarantor net worth after satisfying senior claims.</p>
"""

TRANSLATIONS[("doc7", "11.02")] = """
<p><strong>Execution and Delivery.</strong> Guarantors execute by signing the indenture or supplemental indenture. Effective immediately and continues until discharge.</p>
"""

TRANSLATIONS[("doc7", "11.03")] = """
<p><strong>Limitation on Liability; Termination, Release and Discharge.</strong> Guarantee liability is capped at the maximum amount avoiding fraudulent transfer challenge. Release occurs upon permitted equity sales or dissolution. <strong>Why it matters:</strong> As 2L holders, the guarantees provide a broader claim base, but each guarantee is subject to fraudulent transfer risk -- courts may reduce guarantee obligations to the guarantor's net equity at the time of guarantee.</p>
"""

TRANSLATIONS[("doc7", "11.04")] = """
<p><strong>Right of Contribution.</strong> Guarantors share the guarantee burden proportionally among themselves through contribution rights.</p>
"""

TRANSLATIONS[("doc7", "11.05")] = """
<p><strong>No Subrogation.</strong> Guarantors waive subrogation rights until notes are fully paid. Prevents guarantors from competing with noteholders for distributions in bankruptcy.</p>
"""

# Article XII — Collateral

TRANSLATIONS[("doc7", "12.01")] = """
<p><strong>Security Documents.</strong> The notes are secured by 2L liens on substantially all Muvico assets pursuant to security agreements, pledges, and mortgages. The Notes Collateral Agent holds the liens. <strong>Why it matters:</strong> The 2L position means these notes recover only after the $2B Term Loan (1L), $194M Exchangeable Notes (1.25L), and $857M PIK Notes (1.5L) are fully satisfied -- approximately $3.05B in senior secured claims ahead of this $414M tranche.</p>
"""

TRANSLATIONS[("doc7", "12.02")] = """
<p><strong>Release of Collateral.</strong> Collateral is released upon permitted asset sales, guarantor releases, discharge, or holder consent. Given the extremely tight $1M/$5M asset sale baskets, most asset dispositions will trigger the excess proceeds machinery rather than allowing free release.</p>
"""

TRANSLATIONS[("doc7", "12.03")] = """
<p><strong>Suits to Protect the Collateral.</strong> The Trustee and Collateral Agent may take action to protect the collateral. However, the intercreditor agreement likely requires the 2L holders to defer to the 1L holders on collateral enforcement timing and strategy.</p>
"""

TRANSLATIONS[("doc7", "12.04")] = """
<p><strong>Authorization of Receipt of Funds by the Trustee Under the Security Documents.</strong> The Trustee is authorized to receive collateral enforcement proceeds and apply them according to the indenture waterfall, subject to the intercreditor agreement's priority provisions.</p>
"""

TRANSLATIONS[("doc7", "12.05")] = """
<p><strong>Purchaser Protected.</strong> Good-faith purchasers of collateral take free of the 2L liens. Standard provision facilitating orderly collateral sales.</p>
"""

TRANSLATIONS[("doc7", "12.06")] = """
<p><strong>Power Exercisable by Receiver or Trustee.</strong> Collateral Agent powers may be exercised by a court-appointed receiver or bankruptcy trustee. Ensures collateral administration continues through insolvency proceedings.</p>
"""

TRANSLATIONS[("doc7", "12.07")] = """
<p><strong>Certain Limits on Collateral.</strong> Acknowledges limitations on the collateral package due to regulatory restrictions and practical constraints. Some assets may be excluded where perfection costs exceed benefits.</p>
"""

TRANSLATIONS[("doc7", "12.08")] = """
<p><strong>Notes Collateral Agent.</strong> Establishes the appointment, duties, rights, and replacement procedures for the Notes Collateral Agent. The Agent administers and enforces the 2L security interest on behalf of all holders, subject to the intercreditor agreement's standstill and deferral provisions.</p>
"""

# Article XIII — Miscellaneous

TRANSLATIONS[("doc7", "13.02")] = """
<p><strong>Notices.</strong> Delivery methods and addresses for indenture notices. Proper notice is a condition to many indenture actions including redemption, amendment, and default acceleration.</p>
"""

TRANSLATIONS[("doc7", "13.03")] = """
<p><strong>Communication by Holders with Other Holders.</strong> The Trustee must furnish holder lists upon request. Enables coordinated holder action critical for restructuring negotiations.</p>
"""

TRANSLATIONS[("doc7", "13.04")] = """
<p><strong>Certificate and Opinion as to Conditions.</strong> Officers' certificates and legal opinions required before certain actions. Provides independent verification of compliance.</p>
"""

TRANSLATIONS[("doc7", "13.05")] = """
<p><strong>Statements Required in Certificate or Opinions.</strong> Form and content requirements for certificates and opinions under the indenture.</p>
"""

TRANSLATIONS[("doc7", "13.06")] = """
<p><strong>When Notes Disregarded.</strong> Company-held notes are excluded from consent calculations. Prevents the Company from buying discounted notes and voting them.</p>
"""

TRANSLATIONS[("doc7", "13.09")] = """
<p><strong>Governing Law.</strong> New York law governs the indenture and the notes. Standard for US high-yield instruments, providing access to well-developed creditor law.</p>
"""

TRANSLATIONS[("doc7", "13.16")] = """
<p><strong>USA PATRIOT Act.</strong> Standard compliance provision requiring anti-money-laundering identification from noteholders.</p>
"""
