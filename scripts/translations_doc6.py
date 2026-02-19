"""DOC 6 Translations — Odeon 12.750% Senior Secured Notes due 2027
Issuer: Odeon Finco PLC | 1L at Odeon (Unsecured at AMC) | $400M | 12.75% fixed cash | UK issuer
"""

TRANSLATIONS = {}

# ── Article Overviews ────────────────────────────────────────────────────────

TRANSLATIONS[("doc6", "II", "article")] = """
<p><strong>The Notes.</strong> Governs the issuance mechanics for the Odeon 12.750% Senior Secured Notes, including form, authentication, paying agent designation, and cancellation procedures. These are $400M face value notes issued by Odeon Finco PLC, a UK entity, making this the only non-US issuance in AMC's capital structure. <strong>Why it matters:</strong> The UK issuer structure introduces cross-border complexity in enforcement, taxation, and collateral administration not present in DOC 2-5 and DOC 7.</p>
"""

TRANSLATIONS[("doc6", "III", "article")] = """
<p><strong>Redemption</strong> for the Odeon notes includes standard optional redemption, mandatory redemption, a <strong>unique Redemption for Taxation Reasons</strong> (reflecting the UK/international issuer structure), and a withholding tax/Additional Amounts provision. These UK-specific features are not found in the US indentures (DOC 2, 3, 5, 7).</p>
"""

TRANSLATIONS[("doc6", "IV", "article")] = """
<p><strong>Covenants</strong> for the Odeon notes include the standard high-yield package plus several UK-specific provisions. Notable differences from the US indentures: (1) <strong>Maintenance of Listing (Sec 4.05)</strong> - requires maintaining listing on a recognized exchange; (2) <strong>Agreed Security Principles (Exhibit D)</strong> - UK-style security concept governing how collateral is taken; (3) <strong>Change of Control put right (Sec 4.12)</strong> at 101%; (4) broader <strong>Reports obligation (Sec 4.13)</strong> vs. simple "Financial Information" in US docs. The Security Agent (not "Collateral Agent") terminology reflects UK practice.</p>
"""

TRANSLATIONS[("doc6", "V", "article")] = """
<p><strong>Successors.</strong> Governs mergers, consolidations, and sales of all or substantially all assets of the Issuer (Odeon Finco PLC). The surviving entity must assume all obligations under the indenture. <strong>Why it matters:</strong> Given Odeon's European operations across the UK, Germany, Spain, Italy, and other markets, any consolidation must navigate multiple jurisdictions' corporate laws while preserving noteholders' claims.</p>
"""

TRANSLATIONS[("doc6", "VI", "article")] = """
<p><strong>Defaults and Remedies.</strong> Lists the trigger events allowing noteholders to accelerate the Odeon notes. Includes payment defaults, covenant breaches, cross-defaults to other material debt, and bankruptcy events. <strong>Why it matters:</strong> Cross-default provisions link the Odeon notes to the broader AMC capital structure. A default at the AMC or Muvico level could trigger acceleration at Odeon, even though the entities and collateral pools are separate.</p>
"""

TRANSLATIONS[("doc6", "VII", "article")] = """
<p><strong>Trustee.</strong> Establishes U.S. Bank Trust Company's duties, rights, and limitations as trustee. Similar structure to the US indentures but with additional provisions reflecting the cross-border nature of the issuance and the role of the Security Agent under UK law.</p>
"""

TRANSLATIONS[("doc6", "VIII", "article")] = """
<p><strong>Discharge of Indenture; Defeasance.</strong> Specifies how Odeon Finco PLC can satisfy and terminate its obligations through full payment or defeasance. The defeasance mechanism allows the issuer to deposit government securities sufficient to cover all future payments, releasing itself from covenant restrictions. <strong>Why it matters:</strong> Given Odeon's 26.67x leverage and 0.29x interest coverage, defeasance is a remote possibility, but the provision defines the path to full satisfaction of the notes.</p>
"""

TRANSLATIONS[("doc6", "IX", "article")] = """
<p><strong>Amendments.</strong> Governs how the Odeon indenture can be modified. Certain "sacred rights" (payment terms, lien priority) require each affected holder's consent, while most amendments require majority approval. <strong>Why it matters:</strong> The consent mechanics determine the balance of power between the issuer and noteholders in any restructuring negotiation.</p>
"""

TRANSLATIONS[("doc6", "X", "article")] = """
<p><strong>Reserved.</strong> Article X is reserved and contains no operative provisions. Unlike DOC 5 and DOC 7, the Odeon notes have no exchange feature -- they are straight debt without equity conversion rights.</p>
"""

TRANSLATIONS[("doc6", "XI", "article")] = """
<p><strong>Guarantee.</strong> Establishes the guarantee structure for the Odeon notes. The guarantors' obligations, execution requirements, liability limitations, and subrogation provisions are set forth here. <strong>Why it matters:</strong> The guarantee from Odeon group subsidiaries provides additional credit support, though the guarantor pool is limited to Odeon-level entities and does not include AMC or Muvico entities.</p>
"""

TRANSLATIONS[("doc6", "XII", "article")] = """
<p><strong>Collateral.</strong> Governs the security documents, Security Agent's role, lien release conditions, and intercreditor arrangements. These notes hold 1L priority on Odeon's assets. <strong>Why it matters:</strong> The collateral is exclusively Odeon-level assets (European cinemas and related property). The "Agreed Security Principles" in Exhibit D govern how security interests are taken across multiple European jurisdictions, each with different real property and corporate law regimes. The Security Agent (not "Collateral Agent") terminology reflects UK practice.</p>
"""

TRANSLATIONS[("doc6", "XIII", "article")] = """
<p><strong>Miscellaneous.</strong> Standard boilerplate provisions covering notices, governing law (New York, despite the UK issuer), consent to jurisdiction, severability, and successors. The choice of New York law for a UK issuer is deliberate, providing access to well-developed US creditor law and New York courts.</p>
"""

# ── Section Translations ─────────────────────────────────────────────────────

# Article II — The Notes

TRANSLATIONS[("doc6", "2.01")] = """
<p><strong>Amount of Notes; Issuable in Series.</strong> Authorizes the issuance of $400,000,000 aggregate principal amount of notes, with the ability to issue additional notes of the same or different series. <strong>Why it matters:</strong> Additional note capacity could increase total claims on Odeon's already strained asset base, though the indebtedness covenant severely limits new issuances given Odeon's 0.29x interest coverage.</p>
"""

TRANSLATIONS[("doc6", "2.02")] = """
<p><strong>Form and Dating.</strong> Notes are issued as global notes in registered form, held through DTC and/or Euroclear/Clearstream. The dual clearing system reflects the international nature of the issuance, allowing both US and European investors to hold and trade the notes.</p>
"""

TRANSLATIONS[("doc6", "2.03")] = """
<p><strong>Execution and Authentication.</strong> Notes must be signed by authorized officers of the Issuer (Odeon Finco PLC) and authenticated by the Trustee. Authentication is the Trustee's independent verification that the notes were properly issued.</p>
"""

TRANSLATIONS[("doc6", "2.04")] = """
<p><strong>Registrar and Paying Agent.</strong> Designates the agents responsible for maintaining the holder registry and distributing interest and principal payments. The paying agent must be a financial institution capable of processing international wire transfers given the cross-border nature of the issuance.</p>
"""

TRANSLATIONS[("doc6", "2.05")] = """
<p><strong>Paying Agent To Hold Money in Trust.</strong> Requires the Paying Agent to segregate funds held for noteholder payments. This trust arrangement protects noteholders against the Paying Agent's own insolvency.</p>
"""

TRANSLATIONS[("doc6", "2.06")] = """
<p><strong>Holder Lists.</strong> The Trustee must maintain a current list of all noteholders. This is essential for sending notices, soliciting consents, and enabling holder coordination in restructuring scenarios.</p>
"""

TRANSLATIONS[("doc6", "2.07")] = """
<p><strong>Replacement Notes.</strong> Provides for issuance of replacement notes if originals are lost, stolen, or destroyed, subject to indemnity requirements.</p>
"""

TRANSLATIONS[("doc6", "2.08")] = """
<p><strong>Outstanding Notes.</strong> Defines which notes count as "outstanding" for voting and consent purposes. Notes held by the Issuer or its affiliates are excluded from calculations, preventing the Issuer from manipulating consent thresholds.</p>
"""

TRANSLATIONS[("doc6", "2.09")] = """
<p><strong>Temporary Notes.</strong> Allows issuance of temporary notes pending preparation of definitive notes. Temporary notes carry the same rights as permanent notes.</p>
"""

TRANSLATIONS[("doc6", "2.10")] = """
<p><strong>Cancellation.</strong> Notes that are paid, redeemed, or surrendered for transfer must be cancelled and cannot be reissued. Ensures accurate tracking of outstanding claims.</p>
"""

TRANSLATIONS[("doc6", "2.11")] = """
<p><strong>Defaulted Interest.</strong> If the Issuer fails to pay interest when due, defaulted interest plus interest on the defaulted amount must be paid on a special record date. Compensates holders for late payment.</p>
"""

TRANSLATIONS[("doc6", "2.12")] = """
<p><strong>CUSIP Numbers or ISINs.</strong> Requires CUSIP and/or ISIN identifiers for trading purposes. Both US (CUSIP) and international (ISIN) identifiers are needed given the cross-border investor base.</p>
"""

TRANSLATIONS[("doc6", "2.13")] = """
<p><strong>Computation of Interest.</strong> Interest at 12.750% per annum is computed on a 360-day year of twelve 30-day months. At $400M face value, this produces approximately $51M in annual cash interest. <strong>Why it matters:</strong> With Odeon EBITDA of only $15M, the $51M annual interest burden alone exceeds Odeon's entire operating income, making this instrument deeply stressed.</p>
"""

# Article III — Redemption

TRANSLATIONS[("doc6", "3.01")] = """
<p><strong>Notices to Trustee.</strong> The Issuer must notify the Trustee before any redemption, specifying the redemption date, principal amount, and price. This procedural requirement ensures the Trustee can coordinate and distribute notices to holders.</p>
"""

TRANSLATIONS[("doc6", "3.02")] = """
<p><strong>Selection of Notes To Be Redeemed.</strong> If less than all notes are redeemed, the Trustee selects which notes are called using a pro rata, lottery, or other fair method. Prevents the Issuer from targeting specific holders.</p>
"""

TRANSLATIONS[("doc6", "3.03")] = """
<p><strong>Notice of Redemption.</strong> Redemption notices must be sent to holders at least 10 but not more than 60 days before the redemption date. The notice must state the redemption price, date, and that interest stops accruing. Once mailed, the redemption is irrevocable.</p>
"""

TRANSLATIONS[("doc6", "3.04")] = """
<p><strong>Effect of Notice of Redemption.</strong> Once a valid redemption notice is sent, the called notes stop accruing interest on the redemption date. Holders must surrender notes to receive payment.</p>
"""

TRANSLATIONS[("doc6", "3.05")] = """
<p><strong>Deposit of Redemption Price.</strong> The Issuer must deposit sufficient funds with the Paying Agent before the redemption date. Guarantees holders receive payment when they surrender their notes.</p>
"""

TRANSLATIONS[("doc6", "3.06")] = """
<p><strong>Notes Redeemed in Part.</strong> If only a portion of a note is redeemed, the Trustee authenticates a new note for the unredeemed balance. Allows partial redemptions without forcing holders to forfeit their remaining position.</p>
"""

TRANSLATIONS[("doc6", "3.07")] = """
<p><strong>Mandatory Redemption.</strong> The Issuer is <strong>not required</strong> to make mandatory sinking fund payments. Standard for high-yield notes.</p>
"""

TRANSLATIONS[("doc6", "3.08")] = """
<p><strong>Redemption for Taxation Reasons.</strong> A provision unique to this international issuance. If changes in UK/European tax law require the Issuer (Odeon Finco PLC) to pay Additional Amounts on the notes due to withholding taxes, the Issuer may redeem all notes at <strong>100% of principal plus accrued interest plus any Additional Amounts</strong>. <strong>Why it matters:</strong> Post-Brexit UK tax changes or changes in tax treaties could trigger this provision. It protects both the issuer (from indefinite increased costs) and holders (who receive par plus compensation for the tax burden).</p>
"""

TRANSLATIONS[("doc6", "3.09")] = """
<p><strong>Withholding Taxes / Additional Amounts.</strong> If any UK or relevant jurisdiction withholding tax is imposed on interest payments, the Issuer must pay <strong>Additional Amounts</strong> such that holders receive the same amount they would have received absent the withholding. Extensive exceptions apply for: taxes on holders who are residents of the taxing jurisdiction, holders who failed to provide required tax documentation, and certain US backup withholding situations. <strong>Compared to US indentures:</strong> This provision is far more detailed than anything in DOC 2-5 and DOC 7, reflecting the cross-border nature of the Odeon structure and the risk of multiple taxing jurisdictions.</p>
"""

TRANSLATIONS[("doc6", "3.10")] = """
<p><strong>Excess Proceeds Offer.</strong> Same concept as the US indentures: asset sale proceeds must be reinvested or used to repay debt within 365 days, or an offer to repurchase notes at par must be made. <strong>Structural note:</strong> Since Odeon's assets are ring-fenced from the US operations, this provision only captures Odeon-level asset sales. US theatre asset sales are governed by the Muvico-level indentures.</p>
"""

# Article IV — Covenants

TRANSLATIONS[("doc6", "4.01")] = """
<p><strong>Payment of Notes.</strong> The Issuer must pay principal and interest when due in US dollars. Despite being a UK issuer, the notes are denominated in USD, meaning Odeon bears the currency risk of generating revenue in pounds/euros while servicing dollar-denominated debt. <strong>Why it matters:</strong> Currency mismatch adds another layer of risk for an already stressed issuer.</p>
"""

TRANSLATIONS[("doc6", "4.03")] = """
<p><strong>Payment of Taxes and Other Claims.</strong> The Issuer must pay all taxes and governmental charges when due. Given Odeon's operations across multiple European jurisdictions, this encompasses taxes in the UK, Germany, Spain, Italy, and other markets, each with different tax regimes.</p>
"""

TRANSLATIONS[("doc6", "4.04")] = """
<p><strong>Maintenance of Properties.</strong> The Issuer must maintain its properties and assets in good condition. Since these notes are secured by Odeon's European cinema assets, this covenant ensures the collateral base is preserved.</p>
"""

TRANSLATIONS[("doc6", "4.05")] = """
<p><strong>Maintenance of Listing.</strong> The Issuer must use commercially reasonable efforts to maintain the listing of the notes on a recognized stock exchange (typically the Irish Stock Exchange or Luxembourg Stock Exchange). <strong>Why it matters:</strong> Certain European institutional investors are required to hold only listed securities. Delisting could force selling, which would depress the notes' trading price. This covenant is found <strong>only in DOC 6</strong> among all AMC debt instruments.</p>
"""

TRANSLATIONS[("doc6", "4.06")] = """
<p><strong>Limitation on Indebtedness.</strong> The Issuer and Restricted Subsidiaries may not incur additional Indebtedness unless the Fixed Charge Coverage Ratio is at least 2.00:1.00 (pro forma). <strong>Critical context:</strong> With Odeon EBITDA of only $15M against $400M of debt (26.67x leverage, 0.29x interest coverage), Odeon is deeply restricted from incurring any new debt outside the carved-out baskets. The $51M annual cash interest burden alone exceeds Odeon's entire EBITDA, making this covenant effectively a straitjacket.</p>
"""

TRANSLATIONS[("doc6", "4.07")] = """
<p><strong>Limitation on Restricted Payments and Prepayments of Junior Financing.</strong> Prevents Odeon from upstreaming cash to AMC through dividends or other distributions. The builder basket and 50% CNI mechanics are similar to the US indentures. <strong>Structural significance:</strong> This is a key ring-fencing provision. Even though AMC guarantees these notes, Odeon's cash flow stays within the Odeon Group for debt service rather than leaking to the US parent. Given Odeon's 0.29x interest coverage, there is effectively no capacity for restricted payments.</p>
"""

TRANSLATIONS[("doc6", "4.08")] = """
<p><strong>Limitation on Liens.</strong> Standard lien covenant adapted for the UK/European structure. Permitted liens include liens securing the notes (1L at Odeon), existing liens, and baskets for ordinary course operations. <strong>Key difference:</strong> References "Agreed Security Principles" (Exhibit D) which govern how and where security interests can be taken across multiple European jurisdictions, each with different real property and corporate law regimes.</p>
"""

TRANSLATIONS[("doc6", "4.09")] = """
<p><strong>Limitation on Transactions with Affiliates.</strong> Arm's-length requirement for all transactions with affiliates. This is particularly important for Odeon given the extensive intercompany relationships between Odeon and AMC, including management services, brand licensing, and shared procurement. The Management Services Agreement between AMC and Odeon is a key affiliate transaction that must comply with this covenant.</p>
"""

TRANSLATIONS[("doc6", "4.10")] = """
<p><strong>Negative Pledge.</strong> Prevents the Issuer from creating contractual restrictions on subsidiaries' ability to pay dividends or transfer assets upstream. Ensures cash can flow within the Odeon Group to service the notes. Exceptions include restrictions in other permitted debt, restrictions under applicable law, and customary joint venture provisions.</p>
"""

TRANSLATIONS[("doc6", "4.11")] = """
<p><strong>Future Guarantors.</strong> Requires newly created or acquired subsidiaries to guarantee the notes and grant liens on their assets. Ensures the collateral base and guarantee pool expand as the Odeon Group grows, preventing evasion through unrestricted subsidiaries.</p>
"""

TRANSLATIONS[("doc6", "4.12")] = """
<p><strong>Change of Control.</strong> If a Change of Control occurs, each holder may require repurchase at <strong>101% of principal plus accrued interest</strong>. Change of Control is defined as (a) acquisition of more than 50% of voting stock of the Company (Odeon Cinemas Group) by a person other than AMC, or (b) sale of all or substantially all assets of Odeon. <strong>Why it matters:</strong> If AMC sells its European cinema operations, Odeon noteholders can force a put at 101. With Odeon notes trading at 103.58 (above par), holders would likely not exercise this put at current prices, but it provides downside protection.</p>
"""

TRANSLATIONS[("doc6", "4.13")] = """
<p><strong>Reports.</strong> The Issuer must provide annual and quarterly financial reports to the Trustee, and the reports must be made available to holders. This is a broader reporting obligation than the "Provision of Financial Information" in the US indentures (DOC 2, 5, 7), reflecting the higher disclosure standards expected by European institutional investors. <strong>Why it matters:</strong> Robust reporting requirements give holders better visibility into Odeon's financial condition, which is critical given the stress indicators.</p>
"""

TRANSLATIONS[("doc6", "4.14")] = """
<p><strong>Statement as to Compliance.</strong> The Issuer must deliver annual compliance certificates confirming no Default or Event of Default exists. Officers must certify compliance, creating personal accountability.</p>
"""

TRANSLATIONS[("doc6", "4.15")] = """
<p><strong>Waiver of Certain Covenants.</strong> Holders of a majority in principal amount may waive compliance with certain covenants. Provides flexibility for covenant relief without a formal amendment, though "sacred rights" cannot be waived.</p>
"""

TRANSLATIONS[("doc6", "4.17")] = """
<p><strong>Asset Sales.</strong> Fair market value, 75% cash consideration, and 365-day reinvestment period, with Excess Proceeds Offer at par. Asset sales are restricted to Odeon Group assets only. <strong>Key feature:</strong> Given that Odeon operates cinemas across the UK, Germany, Spain, Italy, and other European markets, asset sales may involve additional regulatory and tax considerations in each jurisdiction that complicate the mechanics.</p>
"""

TRANSLATIONS[("doc6", "4.18")] = """
<p><strong>After-Acquired Collateral.</strong> The Issuer must grant liens on property acquired after the issue date, subject to the Agreed Security Principles (Exhibit D). This ensures the collateral package grows with new assets, though the Agreed Security Principles may limit how quickly or completely new assets can be encumbered across different European jurisdictions.</p>
"""

# Article V — Successors

TRANSLATIONS[("doc6", "5.01")] = """
<p><strong>Merger, Consolidation, Amalgamation and Sale of All or Substantially All Assets.</strong> The Issuer may not merge, consolidate, or sell substantially all assets unless the surviving entity assumes all obligations and no Default results. <strong>Why it matters:</strong> Given Odeon's multi-jurisdictional European operations, any merger or sale involves complex cross-border considerations that go beyond US corporate law.</p>
"""

TRANSLATIONS[("doc6", "5.02")] = """
<p><strong>Successor Substituted.</strong> A successor entity that properly assumes obligations is substituted as the Issuer, and Odeon Finco PLC is released. Provides legal certainty for both parties about continuing obligations.</p>
"""

# Article VI — Defaults and Remedies

TRANSLATIONS[("doc6", "6.01")] = """
<p><strong>Events of Default.</strong> Includes: (a) failure to pay interest for 30 days; (b) failure to pay principal when due; (c) failure to comply with covenants (60-day cure for most after notice); (d) cross-default on $50M+ of other Indebtedness; (e) judgment defaults; (f) collateral impairment; (g) bankruptcy/insolvency events. <strong>Cross-border complexity:</strong> Insolvency proceedings for Odeon Finco PLC would be governed by UK insolvency law, not US Chapter 11, potentially creating different outcomes for noteholders compared to the US instruments.</p>
"""

TRANSLATIONS[("doc6", "6.02")] = """
<p><strong>Acceleration; Rescission and Annulment.</strong> Holders of 25% may accelerate; holders of a majority may rescind. Bankruptcy events trigger automatic acceleration. The interplay between US-law acceleration mechanics and UK insolvency proceedings creates significant complexity.</p>
"""

TRANSLATIONS[("doc6", "6.03")] = """
<p><strong>Other Remedies.</strong> The Trustee may pursue any available legal or equitable remedy, including enforcement actions across multiple European jurisdictions where Odeon operates. Cross-border enforcement adds time and cost to the remedial process.</p>
"""

TRANSLATIONS[("doc6", "6.04")] = """
<p><strong>Waiver of Past Defaults.</strong> Majority holders may waive past defaults, except payment defaults and defaults requiring unanimous consent. Provides flexibility to avoid unnecessary acceleration.</p>
"""

TRANSLATIONS[("doc6", "6.05")] = """
<p><strong>Control by Majority.</strong> Majority holders direct the Trustee's remedial actions. In Odeon's case, the holder base is likely concentrated among distressed debt funds, giving a small number of institutional investors effective control over enforcement strategy.</p>
"""

TRANSLATIONS[("doc6", "6.06")] = """
<p><strong>Limitation on Suits.</strong> Individual holders cannot sue unless they hold 25%+, have given notice, and the Trustee has failed to act. Standard collective action mechanism.</p>
"""

TRANSLATIONS[("doc6", "6.07")] = """
<p><strong>Rights of Holders to Receive Payment.</strong> Each holder retains an absolute right to receive payment when due and to sue for enforcement. This "sacred right" cannot be impaired without individual consent.</p>
"""

TRANSLATIONS[("doc6", "6.08")] = """
<p><strong>Collection Suit by Trustee.</strong> The Trustee may sue to collect overdue amounts on behalf of all holders, centralizing collection efforts.</p>
"""

TRANSLATIONS[("doc6", "6.09")] = """
<p><strong>Trustee May File Proofs of Claim.</strong> The Trustee may file claims in insolvency proceedings on behalf of holders. In Odeon's case, this could involve filing in UK administration, US Chapter 15 (recognition of foreign proceedings), or both.</p>
"""

TRANSLATIONS[("doc6", "6.10")] = """
<p><strong>Priorities.</strong> Collections are applied: first to Trustee fees, then to accrued interest, then to principal. Standard waterfall ensuring the Trustee is compensated before distributions to holders.</p>
"""

TRANSLATIONS[("doc6", "6.11")] = """
<p><strong>Undertaking for Costs.</strong> Courts may require litigating holders to post bonds for costs. Discourages frivolous actions without preventing legitimate enforcement.</p>
"""

TRANSLATIONS[("doc6", "6.12")] = """
<p><strong>Waiver of Stay or Extension Laws.</strong> The Issuer waives protective statutes that might delay enforcement. Strengthens creditor rights in default scenarios.</p>
"""

# Article VII — Trustee

TRANSLATIONS[("doc6", "7.01")] = """
<p><strong>Duties of Trustee.</strong> Pre-default, the Trustee performs only stated duties; post-default, it exercises prudent-person care. The heightened post-default standard is critical given Odeon's stressed financial condition.</p>
"""

TRANSLATIONS[("doc6", "7.02")] = """
<p><strong>Rights of Trustee.</strong> The Trustee may rely on documents without independent verification and is not liable for good-faith errors. Standard liability protections for the fiduciary role.</p>
"""

TRANSLATIONS[("doc6", "7.03")] = """
<p><strong>Individual Rights of Trustee.</strong> U.S. Bank may deal with the Issuer in its individual capacity without conflict. Recognizes the bank's potential multiple relationships with Odeon and AMC.</p>
"""

TRANSLATIONS[("doc6", "7.04")] = """
<p><strong>Trustee's Disclaimer.</strong> The Trustee makes no representations about the validity of the notes or offering documents. Standard limitation of the Trustee's role to administrative and fiduciary functions.</p>
"""

TRANSLATIONS[("doc6", "7.05")] = """
<p><strong>Notice of Defaults.</strong> The Trustee must notify holders of known defaults within 90 days, unless withholding notice is judged to be in holders' interest. Balances timely notification with market impact considerations.</p>
"""

TRANSLATIONS[("doc6", "7.06")] = """
<p><strong>Reports by Trustee to Holders.</strong> Annual reports on eligibility, conflicts, and Trust Indenture Act matters. Keeps holders informed about the Trustee's ability to serve their interests.</p>
"""

TRANSLATIONS[("doc6", "7.07")] = """
<p><strong>Compensation and Indemnity.</strong> The Issuer must pay Trustee fees and indemnify against losses. The Trustee's lien on the notes is senior to holder claims for these amounts.</p>
"""

TRANSLATIONS[("doc6", "7.08")] = """
<p><strong>Replacement of Trustee.</strong> Majority holders may remove the Trustee, or it may resign with 30 days' notice. A successor must be appointed before the resignation takes effect.</p>
"""

TRANSLATIONS[("doc6", "7.09")] = """
<p><strong>Successor Trustee by Merger.</strong> If the Trustee merges, the surviving entity automatically becomes successor trustee. Ensures continuity through corporate transactions.</p>
"""

TRANSLATIONS[("doc6", "7.10")] = """
<p><strong>Eligibility; Disqualification.</strong> The Trustee must be a US-organized corporation with $50M+ in capital and surplus. Conflicting interests must be resolved or the Trustee must resign within 90 days.</p>
"""

TRANSLATIONS[("doc6", "7.11")] = """
<p><strong>Preferential Collection of Claims Against Issuer.</strong> The Trustee must comply with TIA requirements if it becomes a creditor of the Issuer in its individual capacity, preventing conflicts between fiduciary and self-interest.</p>
"""

# Article VIII — Discharge of Indenture; Defeasance

TRANSLATIONS[("doc6", "8.01")] = """
<p><strong>Discharge of Liability on Notes; Defeasance.</strong> The indenture is discharged when all notes are paid, cancelled, or defeased. Legal defeasance releases the Issuer from all obligations; covenant defeasance releases only from specified covenants. Given Odeon's extreme leverage, defeasance is practically impossible in the near term.</p>
"""

TRANSLATIONS[("doc6", "8.02")] = """
<p><strong>Conditions to Defeasance.</strong> Requires deposit of irrevocable funds, legal opinions (including opinions on tax consequences under both US and UK law), no existing Default, and other conditions. The cross-border tax opinion requirement is unique to this international issuance.</p>
"""

TRANSLATIONS[("doc6", "8.03")] = """
<p><strong>Application of Trust Money.</strong> Defeasance funds must be applied solely to pay noteholders. The Trustee cannot use deposited funds for other purposes.</p>
"""

TRANSLATIONS[("doc6", "8.04")] = """
<p><strong>Repayment to Issuer.</strong> Surplus funds after full payment are returned to the Issuer. The Trustee has no investment obligation for deposited funds.</p>
"""

TRANSLATIONS[("doc6", "8.05")] = """
<p><strong>Indemnity for Government Obligations.</strong> The Issuer must indemnify the Trustee for losses on government obligations used in defeasance. Shifts reinvestment risk from Trustee to Issuer.</p>
"""

TRANSLATIONS[("doc6", "8.06")] = """
<p><strong>Reinstatement.</strong> If defeasance funds become inaccessible due to legal restraints, the Issuer's obligations are reinstated. Protects holders against scenarios where defeasance is unwound.</p>
"""

# Article IX — Amendments

TRANSLATIONS[("doc6", "9.01")] = """
<p><strong>Without Consent of Holders.</strong> Certain benign amendments may be made without holder approval: curing ambiguities, adding guarantors, adding collateral, adding covenants, and conforming to the TIA. Limited to changes that do not adversely affect holders.</p>
"""

TRANSLATIONS[("doc6", "9.02")] = """
<p><strong>With Consent of Holders.</strong> Most amendments require majority consent. Sacred rights requiring each affected holder's consent include: changes to payment amounts/dates, changes to lien priority, and changes to amendment thresholds. <strong>Why it matters:</strong> These consent mechanics are the primary battleground in any restructuring negotiation, determining which changes can be imposed over minority objections.</p>
"""

TRANSLATIONS[("doc6", "9.04")] = """
<p><strong>Revocation and Effect of Consents and Waivers.</strong> Consents may be revoked before an amendment becomes effective. Once effective, amendments bind all holders. Prevents holdout strategies from blocking beneficial amendments.</p>
"""

TRANSLATIONS[("doc6", "9.05")] = """
<p><strong>Notation on or Exchange of Notes.</strong> After amendment, the Trustee may require notation on existing notes or exchange for new notes reflecting amended terms.</p>
"""

TRANSLATIONS[("doc6", "9.06")] = """
<p><strong>Trustee To Sign Amendments.</strong> The Trustee must sign authorized amendments unless they adversely affect its own rights. Standard trustee consent provision.</p>
"""

# Article XI — Guarantee

TRANSLATIONS[("doc6", "11.01")] = """
<p><strong>Guarantee.</strong> Each Guarantor unconditionally guarantees full and punctual payment of all amounts due under the notes. The guarantee is a primary obligation. <strong>Why it matters:</strong> The guarantee pool is limited to Odeon-level entities -- AMC and Muvico entities are NOT guarantors of the Odeon notes, meaning recovery is confined to the Odeon Group's assets.</p>
"""

TRANSLATIONS[("doc6", "11.02")] = """
<p><strong>Execution and Delivery.</strong> Guarantors execute the guarantee by signing the indenture or a supplemental indenture. The guarantee is effective immediately and continues until discharge. Governed by the same execution formalities across multiple European jurisdictions.</p>
"""

TRANSLATIONS[("doc6", "11.03")] = """
<p><strong>Limitation on Liability; Termination, Release and Discharge.</strong> Guarantee liability is capped at the maximum amount that avoids fraudulent transfer challenges. Guarantors are released when their equity is sold or they dissolve in permitted transactions. <strong>Cross-border complexity:</strong> Fraudulent transfer analysis differs across UK, German, Spanish, and other European legal systems.</p>
"""

TRANSLATIONS[("doc6", "11.04")] = """
<p><strong>Right of Contribution.</strong> Guarantors have contribution rights among themselves, sharing the guarantee burden proportionally.</p>
"""

TRANSLATIONS[("doc6", "11.05")] = """
<p><strong>No Subrogation.</strong> Guarantors waive subrogation rights until notes are paid in full. Prevents guarantors from competing with noteholders for distributions.</p>
"""

# Article XII — Collateral

TRANSLATIONS[("doc6", "12.01")] = """
<p><strong>Security Documents.</strong> The notes are secured by liens on Odeon's assets pursuant to the Agreed Security Principles in Exhibit D. The Security Agent (UK equivalent of "Collateral Agent") holds liens on behalf of noteholders. <strong>Why it matters:</strong> The scope of collateral across multiple European jurisdictions is governed by local law in each country, creating a more complex security package than the US instruments.</p>
"""

TRANSLATIONS[("doc6", "12.02")] = """
<p><strong>Release of Liens.</strong> Collateral is released upon permitted asset sales, guarantor releases, discharge of the indenture, or holder consent. Conditions are tightly defined to prevent erosion of the security package.</p>
"""

TRANSLATIONS[("doc6", "12.03")] = """
<p><strong>Suits to Protect the Collateral.</strong> The Trustee and Security Agent may take action to protect the collateral, including filing lawsuits across multiple jurisdictions. Cross-border enforcement adds complexity and cost.</p>
"""

TRANSLATIONS[("doc6", "12.04")] = """
<p><strong>Authorization of Receipt of Funds by the Trustee Under the Security Documents.</strong> The Trustee is authorized to receive proceeds from collateral enforcement and apply them according to the indenture's payment waterfall.</p>
"""

TRANSLATIONS[("doc6", "12.05")] = """
<p><strong>Purchaser Protected.</strong> Good-faith purchasers of collateral sold in accordance with the security documents take free of liens. Facilitates orderly collateral disposition.</p>
"""

TRANSLATIONS[("doc6", "12.06")] = """
<p><strong>Power Exercisable by Receiver or Trustee.</strong> Security Agent powers may be exercised by a receiver or administrator appointed in insolvency. Under UK law, administration is the primary insolvency procedure (rather than US-style Chapter 11).</p>
"""

TRANSLATIONS[("doc6", "12.07")] = """
<p><strong>Security Agent.</strong> Detailed provisions governing the Security Agent's appointment, powers, duties, and limitations. The Security Agent role is more extensive than the US "Collateral Agent" concept, reflecting the multi-jurisdictional nature of the collateral and the Agreed Security Principles framework. <strong>Why it matters:</strong> The Security Agent coordinates collateral enforcement across the UK, Germany, Spain, Italy, and other markets, each with different legal procedures.</p>
"""

TRANSLATIONS[("doc6", "12.08")] = """
<p><strong>Impairment of Security Interests.</strong> The Issuer must maintain the security interests in full force and effect. If any security interest is impaired, the Issuer must take corrective action. This ongoing obligation ensures the collateral package remains enforceable across all jurisdictions.</p>
"""

TRANSLATIONS[("doc6", "12.09")] = """
<p><strong>Additional Intercreditor Agreements.</strong> Provides for the Issuer to enter into intercreditor agreements with future creditors, establishing priority rules among different tranches of Odeon-level debt. <strong>Why it matters:</strong> If Odeon incurs additional secured debt within permitted baskets, this provision governs how the new creditors' liens relate to the existing noteholders' 1L position.</p>
"""

# Article XIII — Miscellaneous

TRANSLATIONS[("doc6", "13.02")] = """
<p><strong>Notices.</strong> Specifies delivery methods and addresses for notices. Given the cross-border structure, notices may need to be sent to parties in both the US and UK.</p>
"""

TRANSLATIONS[("doc6", "13.03")] = """
<p><strong>Communication by Holders with Other Holders.</strong> The Trustee must furnish holder lists upon request, enabling coordinated action among holders. Particularly important given the likely concentrated ownership among distressed debt funds.</p>
"""

TRANSLATIONS[("doc6", "13.04")] = """
<p><strong>Certificate and Opinion as to Conditions.</strong> Officers' certificates and legal opinions are required before certain actions. May require opinions from both US and UK counsel given the cross-border structure.</p>
"""

TRANSLATIONS[("doc6", "13.05")] = """
<p><strong>Statements Required in Certificate or Opinions.</strong> Form and content requirements for certificates and opinions, including authority representations and bases for conclusions.</p>
"""

TRANSLATIONS[("doc6", "13.06")] = """
<p><strong>When Notes Disregarded.</strong> Notes held by the Issuer or affiliates are excluded from consent calculations. Prevents manipulation of voting thresholds.</p>
"""

TRANSLATIONS[("doc6", "13.09")] = """
<p><strong>Governing Law.</strong> New York law governs the indenture despite the UK issuer. This deliberate choice provides access to well-developed US commercial law and New York courts, which are more familiar to the primarily US-based investor base.</p>
"""

TRANSLATIONS[("doc6", "13.10")] = """
<p><strong>Consent to Jurisdiction and Service.</strong> The Issuer consents to jurisdiction in New York courts and designates a US agent for service of process. This is essential given the UK issuer -- without this provision, noteholders would need to serve process in England, adding significant delay and cost to enforcement.</p>
"""
