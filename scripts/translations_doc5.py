"""DOC 5 Translations — Muvico Senior Secured Exchangeable Notes due 2030
Issuer: Muvico, LLC | 1.25L at Muvico | $194M | 2% cash + 6% PIK | Exchangeable into AMC stock
"""

TRANSLATIONS = {}

# ── Article Overviews ────────────────────────────────────────────────────────

TRANSLATIONS[("doc5", "II", "article")] = """
<p><strong>The Notes.</strong> Governs the issuance mechanics for the Senior Secured Exchangeable Notes due 2030, including form, authentication, paying agent designation, PIK interest issuance, and cancellation procedures. These are $194M face value notes issued by Muvico, LLC with 2% cash plus 6% PIK interest. <strong>Why it matters:</strong> The PIK component causes the outstanding principal to grow over time, increasing the debt burden on Muvico and diluting recovery for junior creditors.</p>
"""

TRANSLATIONS[("doc5", "III", "article")] = """
<p><strong>Redemption</strong> for the Exchangeable Notes uses a <strong>Soft Call</strong> mechanism rather than a traditional hard call. This means redemption is only available under specific market conditions (typically when the stock price exceeds a threshold relative to the exchange price). There is also a Special Mandatory Redemption and a Fundamental Change put right, giving holders the ability to force repurchase in certain scenarios.</p>
"""

TRANSLATIONS[("doc5", "IV", "article")] = """
<p><strong>Covenants</strong> for the Exchangeable Notes include standard high-yield restrictions plus additional structural covenants unique to the Muvico Group entity structure. Key additions include: corporate separateness requirements (Sec 4.20) to maintain Muvico as a distinct entity, intercompany agreement restrictions (Sec 4.21), and controls on amendments to key documents (Sec 4.22). These structural covenants protect the ring-fenced Muvico asset base.</p>
"""

TRANSLATIONS[("doc5", "IV-A", "article")] = """
<p><strong>Additional Covenants of Holdings and Odeon Holdco.</strong> These covenants apply specifically to Centertainment Development, LLC (Holdings) and Odeon Holdco. They restrict Holdings from engaging in any business activity other than holding equity in the Company (Muvico) and related administrative activities. This "clean holdco" requirement ensures that no unrelated liabilities or claims attach at the Holdings level, preserving the direct chain of equity ownership for secured creditors.</p>
"""

TRANSLATIONS[("doc5", "IV-B", "article")] = """
<p><strong>Additional Covenants of AMC Group Obligors and Odeon Holdco Subsidiaries.</strong> These covenants impose specific obligations on AMC and its direct subsidiaries in their capacity as Guarantors. Key requirements include maintaining the guarantee, providing financial information, and complying with limitations on intercompany transfers of Muvico Group assets. This ensures AMC cannot strip assets from the guaranteed entities.</p>
"""

TRANSLATIONS[("doc5", "V", "article")] = """
<p><strong>Successors.</strong> Governs mergers, consolidations, and sales of all or substantially all assets. The surviving entity must assume all obligations under the indenture, be organized in the US, and not cause a Default. <strong>Why it matters:</strong> Prevents Muvico from restructuring itself out from under these note obligations through a corporate reorganization while preserving continuity of the lien structure.</p>
"""

TRANSLATIONS[("doc5", "VI", "article")] = """
<p><strong>Defaults and Remedies.</strong> Lists the trigger events allowing noteholders to accelerate the debt (demand immediate full repayment). Includes payment defaults, covenant breaches, cross-defaults to $50M+ of other debt, bankruptcy events, and judgment defaults. <strong>Why it matters:</strong> Cross-default at $50M means a default on the $2B Term Loan (DOC 4) would cascade here, and vice versa, creating interconnected acceleration risk across the entire capital structure.</p>
"""

TRANSLATIONS[("doc5", "VII", "article")] = """
<p><strong>Trustee.</strong> Establishes GLAS Trust Company LLC's duties, rights, and limitations as trustee. Covers the trustee's standard of care, compensation, indemnification, replacement procedures, and eligibility requirements. <strong>Why it matters:</strong> The trustee acts as the noteholders' representative and enforcer of the indenture, making these governance provisions critical in any workout or default scenario.</p>
"""

TRANSLATIONS[("doc5", "VIII", "article")] = """
<p><strong>Discharge of Indenture.</strong> Specifies how Muvico can satisfy and terminate its obligations under the indenture, either through full payment or legal/covenant defeasance by depositing sufficient funds with the trustee. <strong>Why it matters:</strong> Defeasance allows the issuer to effectively retire the debt by depositing government securities sufficient to pay all principal and interest, freeing itself from covenant restrictions while noteholders retain their payment claim.</p>
"""

TRANSLATIONS[("doc5", "IX", "article")] = """
<p><strong>Amendments.</strong> Governs how the indenture can be modified, with or without holder consent. Certain "sacred rights" (payment terms, exchange rate, lien priority) cannot be changed without each affected holder's consent. Other amendments require a majority vote. <strong>Why it matters:</strong> The consent thresholds define how much control noteholders have over changes to their deal terms, which is critical in any restructuring negotiation.</p>
"""

TRANSLATIONS[("doc5", "X", "article")] = """
<p><strong>Exchange of Notes - The equity exchange mechanics</strong> are the defining feature of this instrument. Notes are exchangeable into AMC common stock at a specified Exchange Rate, with anti-dilution adjustments and special settlement provisions. The exchange feature gives holders equity upside participation while maintaining a debt floor value. This is structurally similar to a convertible bond but with additional complexity from the Muvico/AMC dual-entity structure.</p>
"""

TRANSLATIONS[("doc5", "XI", "article")] = """
<p><strong>Guarantee.</strong> Establishes the guarantee structure for these notes, including the guarantors' obligations, execution and delivery requirements, limitations on liability, contribution rights, and subrogation provisions. <strong>Why it matters:</strong> The guarantee from Centertainment Development, LLC and other guarantors provides additional credit support beyond Muvico's own assets, though recovery on guarantees depends on the guarantor entities' own financial condition.</p>
"""

TRANSLATIONS[("doc5", "XII", "article")] = """
<p><strong>Collateral.</strong> Governs the security documents, collateral release conditions, enforcement rights, and the Notes Collateral Agent's powers and duties. These notes hold 1.25L priority at Muvico, making them junior to the $2B Term Loan (1L) but senior to the Muvico 15% PIK Notes (1.5L) and the PIK Toggle Notes (2L). <strong>Why it matters:</strong> The collateral provisions and lien priority determine the actual recovery value in a restructuring. At 1.25L, these notes sit in a relatively protected position within the Muvico capital structure.</p>
"""

TRANSLATIONS[("doc5", "XIII", "article")] = """
<p><strong>Miscellaneous.</strong> Standard boilerplate provisions covering notices, governing law (New York), severability, successors, and the USA PATRIOT Act compliance requirement. These provisions establish the procedural and legal framework for administering the indenture.</p>
"""

# ── Section Translations ─────────────────────────────────────────────────────

# Article II — The Notes

TRANSLATIONS[("doc5", "2.01")] = """
<p><strong>Amount of Notes; Additional Notes.</strong> Authorizes the initial issuance of $194,380,980 aggregate principal amount of notes, with the ability to issue additional notes of the same series without holder consent. <strong>Why it matters:</strong> The ability to issue additional pari passu notes can dilute existing holders' recovery by increasing total claims against the same collateral pool, though the indebtedness covenant limits how much additional debt can be incurred.</p>
"""

TRANSLATIONS[("doc5", "2.02")] = """
<p><strong>Form and Dating.</strong> Notes are issued as global notes in registered form, held through DTC (Depository Trust Company). This means the notes trade through the standard book-entry system rather than as physical certificates, facilitating secondary market trading.</p>
"""

TRANSLATIONS[("doc5", "2.03")] = """
<p><strong>Execution and Authentication.</strong> Notes must be signed by authorized officers of the Company and authenticated by the Trustee before they become valid obligations. The Trustee's authentication is an independent verification that proper procedures were followed.</p>
"""

TRANSLATIONS[("doc5", "2.04")] = """
<p><strong>Registrar, Paying Agent and Exchange Agent.</strong> Designates the agents responsible for maintaining the holder registry, distributing payments, and processing exchange requests. The Exchange Agent is unique to this instrument and DOC 7, reflecting the equity exchange feature not present in standard debt instruments.</p>
"""

TRANSLATIONS[("doc5", "2.05")] = """
<p><strong>Paying Agent To Hold Money and PIK Notes in Trust.</strong> Requires the Paying Agent to segregate funds and PIK notes held for payment to noteholders. <strong>Why it matters:</strong> The reference to PIK notes reflects the 6% PIK interest component -- instead of cash, the Company issues additional notes, which must be held in trust until distributed to holders.</p>
"""

TRANSLATIONS[("doc5", "2.06")] = """
<p><strong>Holder Lists.</strong> The Trustee must maintain a current list of all noteholders. This is essential for sending notices, soliciting consents, and enabling holders to communicate with each other -- particularly important in restructuring scenarios where coordinated action among holders can determine outcomes.</p>
"""

TRANSLATIONS[("doc5", "2.07")] = """
<p><strong>Replacement Notes.</strong> Provides for issuance of replacement notes if originals are lost, stolen, or destroyed, subject to indemnity requirements. Standard administrative provision.</p>
"""

TRANSLATIONS[("doc5", "2.08")] = """
<p><strong>Outstanding Notes.</strong> Defines which notes count as "outstanding" for purposes of voting and consent thresholds. Notes held by the Company or its affiliates are excluded from quorum and voting calculations. <strong>Why it matters:</strong> This prevents the issuer from buying back notes on the open market and using them to vote in its own favor on amendments or waivers.</p>
"""

TRANSLATIONS[("doc5", "2.09")] = """
<p><strong>Temporary Notes.</strong> Allows issuance of temporary notes pending preparation of definitive notes. Temporary notes carry the same rights and obligations as permanent notes.</p>
"""

TRANSLATIONS[("doc5", "2.10")] = """
<p><strong>Cancellation.</strong> Notes that are paid, redeemed, exchanged, or surrendered for transfer must be cancelled and cannot be reissued. This ensures the total outstanding amount accurately reflects actual claims against the issuer.</p>
"""

TRANSLATIONS[("doc5", "2.11")] = """
<p><strong>Defaulted Interest.</strong> If the Company fails to pay interest when due, it must pay the defaulted interest plus interest on the defaulted amount to holders of record on a special record date. This ensures holders are compensated for late payment and prevents the Company from benefiting by delaying interest payments.</p>
"""

TRANSLATIONS[("doc5", "2.12")] = """
<p><strong>CUSIP Numbers or ISINs.</strong> Requires the Company to use CUSIP and/or ISIN numbers on the notes for trading identification purposes. Standard provision for institutional debt securities.</p>
"""

TRANSLATIONS[("doc5", "2.13")] = """
<p><strong>Computation of Interest.</strong> Interest is calculated on a 360-day year basis of twelve 30-day months. The total coupon is 8% (2% cash + 6% PIK). <strong>Why it matters:</strong> The 30/360 convention is standard for bonds and results in slightly higher effective interest than actual/actual calculation methods.</p>
"""

TRANSLATIONS[("doc5", "2.14")] = """
<p><strong>Payment of Interest; Issuance of PIK Notes; Notice of PIK Interest.</strong> Specifies the mechanics for paying the 2% cash interest and issuing additional notes for the 6% PIK component. The Company must provide advance notice of PIK interest payments. <strong>Why it matters:</strong> The PIK feature means the outstanding principal grows by approximately 6% annually, compounding the debt burden. Over the life of the notes, PIK accretion significantly increases total claims against Muvico's assets.</p>
"""

TRANSLATIONS[("doc5", "2.15")] = """
<p><strong>Exchange and Cancellation of Notes to Be Exchanged.</strong> When holders exercise their exchange right, the surrendered notes are cancelled. This prevents double-counting -- once exchanged into AMC stock, the debt claim is extinguished.</p>
"""

# Article III — Redemption

TRANSLATIONS[("doc5", "3.01")] = """
<p><strong>Notices to Trustee.</strong> The Company must notify the Trustee before any redemption, providing details on the redemption date, principal amount, and redemption price. This procedural requirement ensures the Trustee can coordinate the redemption process and notify holders.</p>
"""

TRANSLATIONS[("doc5", "3.02")] = """
<p><strong>Selection of Notes To Be Redeemed.</strong> If less than all notes are redeemed, the Trustee selects which notes are called using a pro rata, lottery, or other fair method. Prevents the issuer from targeting specific holders.</p>
"""

TRANSLATIONS[("doc5", "3.03")] = """
<p><strong>Notice of Redemption.</strong> Redemption notices must be sent to holders within specified timeframes before the redemption date, stating the price, date, and other material terms. Once delivered, the notice creates a binding obligation on the Company to redeem.</p>
"""

TRANSLATIONS[("doc5", "3.04")] = """
<p><strong>Soft Call.</strong> The Company may redeem all (but not less than all) notes only if the closing price of AMC common stock exceeds a specified premium to the Exchange Price for a defined period. This is fundamentally different from a standard hard call: the Company cannot simply call the notes at any time by paying a premium. The Soft Call protects exchangeable noteholders from being called away just when the exchange option becomes most valuable. <strong>Why it matters:</strong> If AMC's stock price rises significantly, these notes' exchange value increases. The Soft Call ensures holders can benefit from upside rather than being forced to accept a par redemption when the exchange is "in the money."</p>
"""

TRANSLATIONS[("doc5", "3.05")] = """
<p><strong>Effect of Notice of Redemption and of Soft Call Notice.</strong> Once a valid Soft Call or redemption notice is delivered, notes called for redemption stop accruing interest on the redemption date. Holders must surrender their notes to receive the redemption price. The notice is irrevocable once sent, creating certainty for both sides.</p>
"""

TRANSLATIONS[("doc5", "3.06")] = """
<p><strong>Deposit of Redemption Price.</strong> The Company must deposit sufficient funds with the Paying Agent before the redemption date to cover the full redemption price. This ensures holders are guaranteed payment when they surrender their notes.</p>
"""

TRANSLATIONS[("doc5", "3.07")] = """
<p><strong>Notes Redeemed in Part.</strong> If only a portion of a note is redeemed, the Trustee authenticates a new note for the unredeemed portion. This allows partial redemptions without requiring holders to forfeit their remaining position.</p>
"""

TRANSLATIONS[("doc5", "3.08")] = """
<p><strong>Special Mandatory Redemption.</strong> If certain conditions related to the Transactions are not satisfied (such as regulatory approvals or closing conditions), the Company must redeem all notes at 100% of principal plus accrued interest. This is a deal-protection mechanism ensuring noteholders get repaid if the underlying transaction falls apart.</p>
"""

TRANSLATIONS[("doc5", "3.10")] = """
<p><strong>Fundamental Change Put Right.</strong> Upon a Fundamental Change (defined to include mergers, asset sales, delisting, and change of control events), each holder may require the Company to repurchase their notes at <strong>100% of principal plus accrued interest</strong>. This gives holders a floor value protection: even if the exchange option is underwater, they can put notes back at par in the event of a major corporate change.</p>
"""

# Article IV — Covenants

TRANSLATIONS[("doc5", "4.01")] = """
<p><strong>Payment of Notes.</strong> The Company must pay principal, interest (both cash and PIK), and premium when due. Payments must be made in US dollars and in immediately available funds. This is the most fundamental covenant -- failure to pay when due is an immediate Event of Default with no cure period for principal.</p>
"""

TRANSLATIONS[("doc5", "4.03")] = """
<p><strong>Payment of Taxes and Other Claims.</strong> The Company must pay all taxes, assessments, and governmental charges when due, except where contested in good faith. Failure to pay taxes could result in government liens that would prime even the 1L secured creditors.</p>
"""

TRANSLATIONS[("doc5", "4.04")] = """
<p><strong>Maintenance of Properties.</strong> The Company must maintain its properties and assets in good working order and condition, ordinary wear and tear excepted. <strong>Why it matters:</strong> Since these notes are secured by Muvico's theatre assets, this covenant ensures the collateral base is preserved rather than allowed to deteriorate.</p>
"""

TRANSLATIONS[("doc5", "4.05")] = """
<p><strong>Limitation on Indebtedness.</strong> Same general framework as DOC 2 - incurrence test based on Fixed Charge Coverage Ratio, with specified exceptions. As 1.25L at Muvico (junior only to the $2B Term Loan), these noteholders benefit from relatively tight debt restrictions at the Muvico level. <strong>Key structural point:</strong> The 1.25L/1.5L/2L lien layering at Muvico was carefully negotiated into each document's permitted debt baskets.</p>
"""

TRANSLATIONS[("doc5", "4.06")] = """
<p><strong>Limitation on Restricted Payments and Prepayments of Other Indebtedness.</strong> Restricts distributions and payments on junior debt. This provision is critical because it controls whether cash generated by Muvico can flow upstream to AMC or be used to service the Muvico 15% PIK notes (DOC 2, which is junior at 1.5L) and the 6/8% PIK Toggle notes (DOC 7, which is 2L).</p>
"""

TRANSLATIONS[("doc5", "4.07")] = """
<p><strong>Limitation on Liens.</strong> Prevents Muvico from pledging its assets as collateral for new debt beyond permitted liens. At 1.25L priority, these noteholders are protected against creation of additional pari passu or senior liens that would dilute their secured position. Permitted liens include existing liens, liens securing the 1L Term Loan, and limited general baskets.</p>
"""

TRANSLATIONS[("doc5", "4.08")] = """
<p><strong>Limitation on Transactions with Affiliates.</strong> Requires arm's-length terms for all transactions between the Company and its affiliates. Larger transactions require board approval and potentially a fairness opinion. <strong>Why it matters:</strong> Prevents AMC or insiders from extracting value from Muvico through below-market intercompany transfers, management fees, or other sweetheart deals that would reduce collateral value for these noteholders.</p>
"""

TRANSLATIONS[("doc5", "4.09")] = """
<p><strong>Negative Pledge.</strong> Prevents the Company from creating contractual restrictions on its subsidiaries' ability to pay dividends, make loans, or transfer assets upstream. Exceptions include restrictions in other permitted indebtedness, restrictions under applicable law, and customary provisions in joint ventures. <strong>Why it matters:</strong> Ensures cash can flow within the Muvico Group to service these notes rather than being trapped at subsidiary levels.</p>
"""

TRANSLATIONS[("doc5", "4.10")] = """
<p><strong>Future Guarantors.</strong> Requires newly created or acquired subsidiaries to guarantee these notes and grant liens on their assets. This "springing guarantee" provision ensures the collateral base grows as the Company expands, preventing evasion through the creation of unrestricted subsidiaries that hold valuable assets.</p>
"""

TRANSLATIONS[("doc5", "4.12")] = """
<p><strong>Provision of Financial Information.</strong> The Company must provide financial statements and compliance certificates to the Trustee. This information covenant ensures noteholders and the Trustee can monitor compliance with other covenants and assess the Company's financial condition.</p>
"""

TRANSLATIONS[("doc5", "4.13")] = """
<p><strong>Statement as to Compliance.</strong> The Company must deliver annual compliance certificates confirming no Default or Event of Default exists. Officers must certify compliance, creating personal accountability for accurate reporting.</p>
"""

TRANSLATIONS[("doc5", "4.14")] = """
<p><strong>Waiver of Certain Covenants.</strong> Holders of a majority in principal amount may waive compliance with certain covenants. This provides flexibility for the Company to obtain relief from restrictive covenants without a formal amendment, though "sacred rights" cannot be waived by majority vote.</p>
"""

TRANSLATIONS[("doc5", "4.16")] = """
<p><strong>Asset Sales; Casualty Event; Payments on Odeon Holdco Intercompany Note.</strong> Restricts Muvico from selling assets unless consideration is at fair market value, at least 75% cash, and Net Proceeds are reinvested or used to repay debt within 365 days. Includes the Odeon Holdco intercompany note payment mechanism, linking Muvico asset sale proceeds to the broader AMC corporate structure. <strong>Why it matters:</strong> Prevents Muvico from selling valuable theatre assets without either reinvesting in the business or offering noteholders a chance to be repaid.</p>
"""

TRANSLATIONS[("doc5", "4.17")] = """
<p><strong>After-Acquired Collateral.</strong> Requires the Company to grant liens on any property acquired after the issue date. This ensures the collateral package grows as new assets are acquired, maintaining the 1.25L secured position across an expanding asset base.</p>
"""

TRANSLATIONS[("doc5", "4.19")] = """
<p><strong>Preservation of Existence.</strong> The Company must maintain its corporate existence and all material rights, licenses, and privileges. <strong>Why it matters:</strong> The Company cannot voluntarily dissolve or allow key business licenses to lapse while these notes are outstanding.</p>
"""

TRANSLATIONS[("doc5", "4.20")] = """
<p><strong>Muvico Group Corporate Separateness.</strong> The Company must maintain its separate corporate existence and identity from AMC and its other subsidiaries. Requirements include: separate books and records, separate financial statements, separate bank accounts, and arm's-length intercompany transactions. <strong>Why it matters:</strong> This prevents "substantive consolidation" arguments in bankruptcy. If Muvico's assets and liabilities were consolidated with AMC's, the carefully negotiated lien priority structure would collapse. By maintaining separateness, Muvico-level secured creditors (DOC 2, 4, 5, 7) preserve their priority claim on Muvico's theatre assets.</p>
"""

TRANSLATIONS[("doc5", "4.21")] = """
<p><strong>Intercompany Agreements; Property Transfers.</strong> Restricts the terms and modification of intercompany agreements between Muvico and other AMC entities. Property transfers between entities must comply with the asset sale provisions. <strong>Why it matters:</strong> Prevents AMC from restructuring intercompany arrangements to siphon value out of Muvico, which would reduce recovery for Muvico-level secured creditors.</p>
"""

TRANSLATIONS[("doc5", "4.22")] = """
<p><strong>Amendments to Certain Documents.</strong> The Company cannot amend key transaction documents (including the Credit Agreement, intercreditor agreements, and security documents) without compliance with the indenture. <strong>Why it matters:</strong> Prevents AMC from modifying the credit agreement or intercreditor terms in ways that would disadvantage these noteholders' 1.25L position within the Muvico lien stack.</p>
"""

# Article V — Successors

TRANSLATIONS[("doc5", "5.01")] = """
<p><strong>Merger, Consolidation, Amalgamation and Sale of All or Substantially All Assets.</strong> The Company may not merge, consolidate, or sell substantially all assets unless the surviving entity expressly assumes all obligations, is organized in the US, and no Default results. <strong>Why it matters:</strong> Ensures that any transformative corporate event preserves the noteholders' claims and lien positions rather than allowing the Company to restructure away from its obligations.</p>
"""

TRANSLATIONS[("doc5", "5.02")] = """
<p><strong>Successor Substituted.</strong> When a successor entity properly assumes the Company's obligations, it is substituted as the issuer and the original Company is released. This provides legal certainty for both the successor and the noteholders about the continuing obligations.</p>
"""

# Article VI — Defaults and Remedies

TRANSLATIONS[("doc5", "6.01")] = """
<p><strong>Events of Default.</strong> Includes: (a) failure to pay interest for 30 days; (b) failure to pay principal when due; (c) failure to comply with covenants (60-day cure for most after notice); (d) cross-default on $50M+ of other Indebtedness; (e) judgment defaults of $50M+ unstayed for 60 days; (f) collateral impairment events; (g) bankruptcy/insolvency. <strong>Why it matters:</strong> The cross-default at $50M links this instrument to the entire AMC capital structure -- a default on the $2B Term Loan, Muvico PIK notes, or Odeon notes would all trigger acceleration here.</p>
"""

TRANSLATIONS[("doc5", "6.02")] = """
<p><strong>Acceleration; Rescission and Annulment.</strong> Upon an Event of Default, holders of 25% in principal amount may accelerate the notes (demand immediate repayment). Holders of a majority may rescind acceleration if all defaults (other than nonpayment of accelerated amounts) have been cured. Bankruptcy events trigger automatic acceleration without any holder action.</p>
"""

TRANSLATIONS[("doc5", "6.03")] = """
<p><strong>Other Remedies.</strong> The Trustee may pursue any available legal or equitable remedy to enforce the indenture, including specific performance, injunctive relief, and collection proceedings. This broad remedial authority gives the Trustee flexibility beyond simple acceleration.</p>
"""

TRANSLATIONS[("doc5", "6.04")] = """
<p><strong>Waiver of Past Defaults.</strong> Holders of a majority in principal amount may waive past defaults, except for payment defaults and defaults in provisions that cannot be amended without each holder's consent. This allows the majority to prevent acceleration in situations where they believe the Company can cure the problem.</p>
"""

TRANSLATIONS[("doc5", "6.05")] = """
<p><strong>Control by Majority.</strong> Holders of a majority in principal amount direct the Trustee's exercise of remedies. This means the largest holders effectively control enforcement strategy in a default scenario, which can create tensions between large institutional holders and smaller retail holders with different recovery preferences.</p>
"""

TRANSLATIONS[("doc5", "6.06")] = """
<p><strong>Limitation on Suits.</strong> Individual holders generally cannot sue to enforce the indenture unless they hold at least 25% in principal amount, have given the Trustee written notice, and the Trustee has failed to act within 60 days. This prevents nuisance lawsuits while preserving collective enforcement rights.</p>
"""

TRANSLATIONS[("doc5", "6.07")] = """
<p><strong>Rights of Holders to Receive Payment.</strong> Notwithstanding other limitations, each holder has an absolute right to receive payment of principal and interest when due and to sue for enforcement of that right. This "sacred right" cannot be impaired without the holder's individual consent.</p>
"""

TRANSLATIONS[("doc5", "6.08")] = """
<p><strong>Collection Suit by Trustee.</strong> The Trustee may sue to collect overdue principal and interest on behalf of all holders. This allows centralized collection efforts rather than requiring individual holder lawsuits.</p>
"""

TRANSLATIONS[("doc5", "6.09")] = """
<p><strong>Trustee May File Proofs of Claim.</strong> The Trustee is authorized to file claims in bankruptcy proceedings on behalf of all noteholders. This is critical in the AMC restructuring context -- the Trustee represents the collective interest of noteholders in any Chapter 11 case.</p>
"""

TRANSLATIONS[("doc5", "6.10")] = """
<p><strong>Priorities.</strong> Amounts collected by the Trustee are applied in priority order: first to Trustee fees and expenses, then to holders for accrued interest, then to holders for principal. This waterfall ensures the Trustee is compensated for its services before distributions to holders.</p>
"""

TRANSLATIONS[("doc5", "6.11")] = """
<p><strong>Undertaking for Costs.</strong> The court may require holders bringing suit to post a bond for costs. This discourages frivolous litigation while not preventing legitimate enforcement actions.</p>
"""

TRANSLATIONS[("doc5", "6.12")] = """
<p><strong>Waiver of Stay or Extension Laws.</strong> The Company waives any laws that might delay or prevent enforcement of the indenture upon an Event of Default. This strengthens creditor rights by preventing the Company from invoking protective statutes to slow down collection.</p>
"""

# Article VII — Trustee

TRANSLATIONS[("doc5", "7.01")] = """
<p><strong>Duties of Trustee.</strong> Before an Event of Default, the Trustee need only perform duties specifically stated in the indenture. After default, the Trustee must exercise the same degree of care as a prudent person in conducting their own affairs. This heightened duty post-default reflects the Trustee's critical role in protecting holders during a restructuring.</p>
"""

TRANSLATIONS[("doc5", "7.02")] = """
<p><strong>Rights of Trustee.</strong> The Trustee may rely on certificates, opinions, and documents provided by the Company without independent investigation. The Trustee is not liable for errors in judgment made in good faith. This protects the Trustee from liability while establishing the boundaries of its obligations.</p>
"""

TRANSLATIONS[("doc5", "7.03")] = """
<p><strong>Individual Rights of Trustee.</strong> GLAS Trust Company LLC may deal with the Company in its individual capacity (e.g., as lender or depository) without creating a conflict of interest. Standard provision recognizing that large financial institutions may have multiple relationships.</p>
"""

TRANSLATIONS[("doc5", "7.04")] = """
<p><strong>Trustee's Disclaimer.</strong> The Trustee makes no representation about the validity or adequacy of the notes, the indenture, or any offering documents. The Trustee is not responsible for the Company's use of proceeds or compliance with the indenture (other than authenticating notes).</p>
"""

TRANSLATIONS[("doc5", "7.05")] = """
<p><strong>Notice of Defaults.</strong> The Trustee must give holders notice of any known default within 90 days, unless it determines that withholding notice is in holders' interest. This balances timely notification with the Trustee's judgment about whether alerting the market could be more harmful than the default itself.</p>
"""

TRANSLATIONS[("doc5", "7.06")] = """
<p><strong>Reports by Trustee to Holders.</strong> The Trustee must provide annual reports to holders regarding its eligibility, any conflicts of interest, and other matters required by the Trust Indenture Act. This transparency requirement keeps holders informed about the Trustee's ability to act in their interest.</p>
"""

TRANSLATIONS[("doc5", "7.07")] = """
<p><strong>Compensation and Indemnity.</strong> The Company must pay the Trustee's fees and indemnify it against losses incurred in administering the indenture. The Trustee has a lien on the notes and proceeds senior to the holders' claims to secure its compensation. <strong>Why it matters:</strong> In a distressed scenario, the Trustee's fees and expenses come off the top, reducing amounts available for noteholders.</p>
"""

TRANSLATIONS[("doc5", "7.08")] = """
<p><strong>Replacement of Trustee.</strong> The Trustee may be removed by holders of a majority in principal amount or may resign with 30 days' notice. A successor trustee must be appointed before the resignation becomes effective. This ensures continuous oversight of the indenture.</p>
"""

TRANSLATIONS[("doc5", "7.09")] = """
<p><strong>Successor Trustee by Merger.</strong> If the Trustee merges with another entity, the surviving entity automatically becomes the successor trustee without any further action. This ensures continuity of the trusteeship through corporate transactions.</p>
"""

TRANSLATIONS[("doc5", "7.10")] = """
<p><strong>Eligibility; Disqualification.</strong> The Trustee must be a corporation organized under US law with at least $50 million in combined capital and surplus. If the Trustee has a conflicting interest, it must either eliminate the conflict or resign within 90 days.</p>
"""

TRANSLATIONS[("doc5", "7.11")] = """
<p><strong>Preferential Collection of Claims Against Company.</strong> If the Trustee becomes a creditor of the Company in its individual capacity, it must comply with TIA requirements regarding preferential collection to avoid conflicts between its duties as trustee and its own financial interests.</p>
"""

# Article VIII — Discharge of Indenture

TRANSLATIONS[("doc5", "8.01")] = """
<p><strong>Discharge of Liability on Notes; Defeasance.</strong> The indenture is discharged when all notes have been paid in full, cancelled, or defeased. Legal defeasance releases the Company from all obligations; covenant defeasance releases only from specified covenants. <strong>Why it matters:</strong> Defeasance allows Muvico to effectively retire the debt without actually paying it off, by depositing sufficient government securities to cover all future payments.</p>
"""

TRANSLATIONS[("doc5", "8.02")] = """
<p><strong>Conditions to Defeasance.</strong> To defease, the Company must: (a) deposit irrevocable funds sufficient to pay all principal, interest, and premium; (b) deliver a legal opinion that the deposit will not be taxable to holders; (c) confirm no Default exists; (d) satisfy other conditions. The legal opinion requirement is particularly important as it provides comfort that the defeasance is valid.</p>
"""

TRANSLATIONS[("doc5", "8.03")] = """
<p><strong>Application of Trust Money.</strong> Funds deposited for defeasance must be applied by the Trustee solely to pay noteholders. The Trustee cannot use the deposited funds for any other purpose, providing certainty to holders that the defeasance funds are dedicated to their benefit.</p>
"""

TRANSLATIONS[("doc5", "8.04")] = """
<p><strong>Repayment to Company.</strong> If excess funds remain after all notes are paid in full, the surplus is returned to the Company. The Trustee has no obligation to invest deposited funds and is not liable for any loss on investment.</p>
"""

TRANSLATIONS[("doc5", "8.05")] = """
<p><strong>Indemnity for Government Obligations.</strong> The Company must indemnify the Trustee against losses from holding government obligations used for defeasance. This shifts reinvestment and credit risk from the Trustee back to the Company.</p>
"""

TRANSLATIONS[("doc5", "8.06")] = """
<p><strong>Reinstatement.</strong> If the Trustee is unable to apply deposited funds due to legal restraints, the Company's obligations under the indenture are reinstated as if the defeasance had not occurred. This protects holders against scenarios where defeasance funds become inaccessible.</p>
"""

# Article IX — Amendments

TRANSLATIONS[("doc5", "9.01")] = """
<p><strong>Without Consent of Holders.</strong> Certain amendments can be made without holder approval, including: curing ambiguities, adding guarantors, securing the notes with additional collateral, adding covenants for holders' benefit, and conforming to the Trust Indenture Act. These "benign" amendments are limited to changes that do not adversely affect holders.</p>
"""

TRANSLATIONS[("doc5", "9.02")] = """
<p><strong>With Consent of Holders.</strong> Most amendments require consent of holders of a majority in principal amount. However, certain "sacred rights" require the consent of each affected holder: changes to payment amounts or dates, changes to the exchange rate or exchange provisions, changes to the redemption price, and changes to the amendment provisions themselves. <strong>Why it matters:</strong> The distinction between majority-consent and unanimous-consent provisions is critical in restructuring negotiations. The Company can modify most covenants with 50%+1 support but cannot impair core economic terms without every holder's agreement.</p>
"""

TRANSLATIONS[("doc5", "9.03")] = """
<p><strong>Actions Taken by Initial Holders.</strong> The initial purchasers may take certain actions on behalf of holders prior to the notes being distributed to other investors. This facilitates the initial issuance process.</p>
"""

TRANSLATIONS[("doc5", "9.04")] = """
<p><strong>Revocation and Effect of Consents and Waivers.</strong> Holders may revoke consents at any time before the amendment becomes effective. Once effective, amendments bind all holders including those who did not consent. This prevents holdout strategies from blocking beneficial amendments.</p>
"""

TRANSLATIONS[("doc5", "9.05")] = """
<p><strong>Notation on or Exchange of Notes.</strong> After an amendment, the Trustee may require notation on existing notes or exchange for new notes reflecting the amended terms.</p>
"""

TRANSLATIONS[("doc5", "9.06")] = """
<p><strong>Trustee To Sign Amendments.</strong> The Trustee must sign amendments authorized by the indenture, but only if the amendment does not adversely affect the Trustee's own rights, duties, or immunities.</p>
"""

# Article X — Exchange of Notes

TRANSLATIONS[("doc5", "10.01")] = """
<p><strong>Exchange Privilege.</strong> Each holder has the right to exchange their notes for AMC common stock at the applicable Exchange Rate. The exchange is exercisable at any time prior to maturity (subject to certain blackout periods). The Exchange Rate represents the number of shares of AMC common stock per $1,000 principal amount of Notes. <strong>Key detail:</strong> Unlike standard convertibles, the exchange is into <em>AMC parent stock</em> even though the notes are issued by Muvico. This creates structural complexity in the equity delivery mechanism.</p>
"""

TRANSLATIONS[("doc5", "10.02")] = """
<p><strong>Exercise of Exchange Privilege.</strong> To exchange, holders must deliver a completed Exchange Notice to the Exchange Agent, along with the note to be exchanged. The exchange settles on the second Business Day after the Exchange Date. Partial exchanges are permitted (in increments of $1,000 principal). Once an Exchange Notice is delivered, it is irrevocable.</p>
"""

TRANSLATIONS[("doc5", "10.03")] = """
<p><strong>Settlement of Exchange Privilege.</strong> Upon exchange, the Company must deliver the applicable number of shares of AMC common stock (plus cash for any fractional shares). The Company may elect to settle in cash, shares, or a combination. Settlement must occur within 2 Business Days. <strong>Why settlement method matters:</strong> If the Company elects cash settlement, it must pay the volume-weighted average price for the applicable number of shares. This creates potential liquidity pressure if many holders exchange simultaneously.</p>
"""

TRANSLATIONS[("doc5", "10.04")] = """
<p><strong>Exchange Adjustment Consideration.</strong> When holders exchange notes during certain periods, they receive additional consideration (the "Exchange Adjustment") on top of the base exchange value. This adjustment compensates holders for the time value of the remaining option and any accrued but unpaid interest. The adjustment amount is calculated based on a schedule that references remaining term and market conditions.</p>
"""

TRANSLATIONS[("doc5", "10.05")] = """
<p><strong>Fractions of Shares.</strong> No fractional shares of AMC stock are issued upon exchange. Instead, the Company pays cash equal to the fractional share's market value. This avoids the administrative complexity of fractional equity positions.</p>
"""

TRANSLATIONS[("doc5", "10.06")] = """
<p><strong>Adjustment of Exchange Rate.</strong> The Exchange Rate adjusts for anti-dilution events including: stock dividends, stock splits, rights offerings below market price, cash dividends exceeding a threshold, and spin-offs. These protections ensure corporate actions do not impair the exchange value. <strong>Why it matters:</strong> Without anti-dilution adjustments, AMC could dilute the exchange value through equity issuances, effectively reducing the conversion option's worth.</p>
"""

TRANSLATIONS[("doc5", "10.07")] = """
<p><strong>Adjustments of Prices.</strong> Specifies rounding conventions and minimum thresholds for adjustments to the Exchange Price. Minor adjustments below specified thresholds are accumulated rather than applied immediately, avoiding frequent recalculations for insignificant changes.</p>
"""

TRANSLATIONS[("doc5", "10.08")] = """
<p><strong>Notice of Adjustments of Exchange Rate.</strong> The Company must promptly notify the Trustee and holders of any Exchange Rate adjustment, including the new rate and the event that triggered the change. This transparency requirement ensures holders can accurately value their exchange rights.</p>
"""

TRANSLATIONS[("doc5", "10.09")] = """
<p><strong>Certain Covenants.</strong> The Company covenants to reserve sufficient authorized shares of AMC common stock to satisfy all potential exchanges. It must also maintain the listing of AMC common stock on a national securities exchange. <strong>Why it matters:</strong> If AMC did not reserve enough shares, exchange requests could be blocked, effectively destroying the option value embedded in these notes.</p>
"""

TRANSLATIONS[("doc5", "10.10")] = """
<p><strong>Taxes on Exchanges.</strong> The Company pays any documentary, stamp, or similar taxes on the issuance of shares upon exchange. However, holders are responsible for income taxes arising from the exchange. This allocation of tax liability is standard for convertible/exchangeable instruments.</p>
"""

TRANSLATIONS[("doc5", "10.11")] = """
<p><strong>Notice to Holders Prior to Certain Actions.</strong> The Company must give advance notice to holders before events that could affect exchange rights, such as record dates for dividends, rights offerings, or corporate reorganizations. This allows holders to decide whether to exchange before the event.</p>
"""

TRANSLATIONS[("doc5", "10.12")] = """
<p><strong>Provision in Case of Merger Event.</strong> If AMC merges or is acquired, the exchange right converts into the right to receive the consideration that a common stockholder would have received. <strong>Why it matters:</strong> This "merger reclassification" provision ensures the exchange feature survives corporate transactions rather than becoming worthless.</p>
"""

TRANSLATIONS[("doc5", "10.13")] = """
<p><strong>No Voting or Dividend Rights.</strong> Until notes are actually exchanged into shares, holders have no voting rights or dividend rights as AMC stockholders. The notes are debt instruments with an embedded option, not equity. Holders are creditors, not shareholders, until exchange.</p>
"""

TRANSLATIONS[("doc5", "10.14")] = """
<p><strong>No Responsibility of Trustee for Exchange Provisions.</strong> The Trustee has no duty to determine when the conditions for exchange have been satisfied or to calculate the Exchange Rate. The Company bears sole responsibility for the exchange mechanics.</p>
"""

TRANSLATIONS[("doc5", "10.15")] = """
<p><strong>Beneficial Ownership Limitation.</strong> The exchange may be limited to prevent any holder from acquiring beneficial ownership of more than a specified percentage of AMC's outstanding common stock. This "blocker" provision prevents any single holder from triggering regulatory ownership thresholds through exchange.</p>
"""

TRANSLATIONS[("doc5", "10.16")] = """
<p><strong>General Exchangeability Restrictions.</strong> Additional conditions and limitations on the exercise of exchange rights, including potential blackout periods and regulatory restrictions. These provisions ensure exchanges comply with securities laws and do not disrupt orderly markets.</p>
"""

# Article XI — Guarantee

TRANSLATIONS[("doc5", "11.01")] = """
<p><strong>Guarantee.</strong> Each Guarantor unconditionally guarantees the full and punctual payment of principal, interest, premium, and all other amounts due under the notes. The guarantee is a primary obligation, not merely a surety, meaning holders can proceed directly against guarantors without first pursuing the Company. <strong>Why it matters:</strong> The guarantee from Centertainment Development, LLC and other entities provides additional sources of recovery beyond Muvico's own assets.</p>
"""

TRANSLATIONS[("doc5", "11.02")] = """
<p><strong>Execution and Delivery.</strong> Each Guarantor executes the guarantee by signing the indenture or a supplemental indenture. The guarantee becomes effective immediately upon execution and remains in force until the notes are paid in full or the indenture is discharged.</p>
"""

TRANSLATIONS[("doc5", "11.03")] = """
<p><strong>Limitation on Liability; Termination, Release and Discharge.</strong> Each Guarantor's liability is limited to the maximum amount that can be guaranteed without rendering the guarantee voidable as a fraudulent transfer. Guarantors are released if their equity is sold or they are dissolved in a permitted transaction. <strong>Why it matters:</strong> The fraudulent transfer limitation is critical -- if a guarantee exceeds the guarantor's net worth, it can be voided in bankruptcy, leaving noteholders without the expected credit support.</p>
"""

TRANSLATIONS[("doc5", "11.04")] = """
<p><strong>Right of Contribution.</strong> Guarantors have contribution rights among themselves, ensuring that the guarantee burden is shared proportionally rather than falling entirely on one entity.</p>
"""

TRANSLATIONS[("doc5", "11.05")] = """
<p><strong>No Subrogation.</strong> Guarantors waive subrogation rights (the right to step into the noteholders' shoes after paying on the guarantee) until the notes are paid in full. This prevents guarantors from competing with noteholders for distributions in a bankruptcy scenario.</p>
"""

# Article XII — Collateral

TRANSLATIONS[("doc5", "12.01")] = """
<p><strong>Security Documents.</strong> The notes are secured by liens on substantially all assets of the Company and the Guarantors, as documented in the security agreements, pledge agreements, and mortgages. The Notes Collateral Agent holds the liens on behalf of noteholders. <strong>Why it matters:</strong> The scope and quality of the collateral package directly determines recovery in a restructuring. The 1.25L priority means these notes recover after the $2B Term Loan but before the 1.5L and 2L tranches.</p>
"""

TRANSLATIONS[("doc5", "12.02")] = """
<p><strong>Release of Collateral.</strong> Collateral is released when: (a) assets are sold in a permitted transaction; (b) a Guarantor is released; (c) the indenture is discharged; or (d) holders consent. The conditions for release are tightly defined to prevent erosion of the security package. <strong>Why it matters:</strong> Every collateral release reduces the asset base securing these notes, so the conditions must be strictly construed.</p>
"""

TRANSLATIONS[("doc5", "12.03")] = """
<p><strong>Suits to Protect the Collateral.</strong> The Trustee and Notes Collateral Agent may take any action necessary to protect the collateral, including filing lawsuits and seeking injunctions. This authority allows proactive protection of the secured position.</p>
"""

TRANSLATIONS[("doc5", "12.04")] = """
<p><strong>Authorization of Receipt of Funds by the Trustee Under the Security Documents.</strong> The Trustee is authorized to receive funds from collateral enforcement and apply them in accordance with the indenture's payment waterfall.</p>
"""

TRANSLATIONS[("doc5", "12.05")] = """
<p><strong>Purchaser Protected.</strong> Good-faith purchasers of collateral sold in accordance with the security documents take free of the liens. This facilitates orderly disposition of collateral in enforcement scenarios.</p>
"""

TRANSLATIONS[("doc5", "12.06")] = """
<p><strong>Power Exercisable by Receiver or Trustee.</strong> Powers granted to the Notes Collateral Agent may be exercised by a receiver or trustee appointed in bankruptcy or foreclosure proceedings.</p>
"""

TRANSLATIONS[("doc5", "12.07")] = """
<p><strong>Certain Limits on Collateral.</strong> Acknowledges limitations on the collateral package, including regulatory restrictions, foreign law limitations, and commercially unreasonable encumbrances. Some assets may be excluded from the collateral package where the cost of perfection outweighs the benefit.</p>
"""

TRANSLATIONS[("doc5", "12.08")] = """
<p><strong>Notes Collateral Agent.</strong> Establishes the appointment, duties, rights, and resignation/replacement procedures for the Notes Collateral Agent. The Agent acts on behalf of all noteholders in managing and enforcing the security interest, ensuring coordinated collateral administration.</p>
"""

# Article XIII — Miscellaneous

TRANSLATIONS[("doc5", "13.02")] = """
<p><strong>Notices.</strong> Specifies how notices must be delivered under the indenture (mail, courier, or electronic transmission) and the addresses for the Company, Trustee, and other parties. Proper notice is a condition to many indenture actions.</p>
"""

TRANSLATIONS[("doc5", "13.03")] = """
<p><strong>Communication by Holders with Other Holders.</strong> The Trustee must furnish holder lists to any holder requesting them for purposes of communicating with other holders about their rights under the indenture. This facilitates coordinated action among holders.</p>
"""

TRANSLATIONS[("doc5", "13.04")] = """
<p><strong>Certificate and Opinion as to Conditions.</strong> Before taking certain actions, the Company must deliver officers' certificates and legal opinions confirming that conditions have been satisfied. These provide independent verification of compliance.</p>
"""

TRANSLATIONS[("doc5", "13.05")] = """
<p><strong>Statements Required in Certificate or Opinions.</strong> Specifies the form and content requirements for certificates and opinions delivered under the indenture, including representations about the signer's authority and the basis for their conclusions.</p>
"""

TRANSLATIONS[("doc5", "13.06")] = """
<p><strong>When Notes Disregarded.</strong> Notes held by the Company or its affiliates are not counted for purposes of determining whether the required percentage of holders has consented to an action. Prevents the Company from manipulating consent thresholds.</p>
"""

TRANSLATIONS[("doc5", "13.09")] = """
<p><strong>Governing Law.</strong> The indenture and the notes are governed by the laws of the State of New York. This is standard for US high-yield debt instruments and ensures access to New York's well-developed body of commercial and creditor law.</p>
"""

TRANSLATIONS[("doc5", "13.16")] = """
<p><strong>USA PATRIOT Act.</strong> Standard compliance provision requiring the Trustee to obtain identifying information from noteholders as required by anti-money-laundering regulations.</p>
"""
