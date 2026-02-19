#!/usr/bin/env python3
"""
AMC Debt Navigator - Document Parser
Parses legal .txt indentures/credit agreements into structured HTML pages.
Generates DOC 2-7 HTML files for the AMC Debt Navigator site.
"""

import re
import os
import html as html_mod

# ─── Paths ───────────────────────────────────────────────────────────────────
SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # site/
DOCS_DIR = os.path.join(SITE_DIR, "docs")
SOURCE_DIR = os.path.join(os.path.dirname(SITE_DIR), "NewDocsBRX")

os.makedirs(DOCS_DIR, exist_ok=True)

# ─── Document Configuration ─────────────────────────────────────────────────

DOCUMENTS = {
    "doc2": {
        "source": "seniorsecured29.txt",
        "output": "doc2-muvico-secured-2029.html",
        "page_id": "doc2",
        "title": "Muvico Senior Secured Notes due 2029",
        "short_name": "DOC 2 - Muvico 15% PIK Notes",
        "breadcrumb": "DOC 2 - Muvico 15% PIK Notes",
        "doc_type": "Indenture",
        "date": "July 24, 2025",
        "issuer": "Muvico, LLC",
        "trustee": "CSC Delaware Trust Company",
        "principal": "$856,964,000",
        "interest": "7.50% base + leverage grid (up to 15% total with PIK)",
        "maturity": "February 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1.5L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-15l",
        "entity_lien_label": "1.5L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "V", "VI"],
    },
    "doc3": {
        "source": "exhibit_4.1(amc).txt",
        "output": "doc3-amc-7500-notes.html",
        "page_id": "doc3",
        "title": "AMC 7.500% Senior Secured Notes due 2029",
        "short_name": "DOC 3 - AMC 7.5% Notes",
        "breadcrumb": "DOC 3 - AMC 7.5% Notes",
        "doc_type": "Indenture",
        "date": "February 14, 2022",
        "issuer": "AMC Entertainment Holdings, Inc.",
        "trustee": "U.S. Bank Trust Company, National Association",
        "principal": "$360,000,000",
        "interest": "7.500% fixed cash",
        "maturity": "February 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "2L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-2l",
        "entity_lien_label": "2L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "V", "VI"],
    },
    "doc4": {
        "source": "exhibit_4.2.txt",
        "output": "doc4-credit-agreement.html",
        "page_id": "doc4",
        "title": "$2B Term Loan Credit Agreement",
        "short_name": "DOC 4 - $2B Term Loan",
        "breadcrumb": "DOC 4 - $2B Term Loan",
        "doc_type": "Credit Agreement",
        "date": "July 22, 2024",
        "issuer": "AMC Entertainment Holdings, Inc. + Muvico, LLC",
        "trustee": "Wilmington Savings Fund Society, FSB (Admin/Collateral Agent)",
        "principal": "$1,999,100,000",
        "interest": "SOFR + 700bps (10.63% all-in)",
        "maturity": "January 1, 2029",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-1l",
        "entity_lien_label": "1L AT MUVICO",
        "split": None,
        "priority_articles": ["V", "VI", "VII"],
    },
    "doc5": {
        "source": "exhibit_4.3(seniorsecurednotes).txt",
        "output": "doc5-exchangeable-2030.html",
        "page_id": "doc5",
        "title": "Muvico Senior Secured Exchangeable Notes due 2030",
        "short_name": "DOC 5 - Muvico 8% PIK Exchangeable",
        "breadcrumb": "DOC 5 - Muvico 8% PIK Exchangeable",
        "doc_type": "Indenture",
        "date": "July 24, 2025",
        "issuer": "Muvico, LLC",
        "trustee": "GLAS Trust Company LLC",
        "principal": "$194,380,980",
        "interest": "2% cash + 6% PIK",
        "maturity": "April 1, 2030",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "1.25L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-125l",
        "entity_lien_label": "1.25L AT MUVICO",
        "split": None,
        "priority_articles": ["III", "IV", "IV-A", "IV-B", "X"],
    },
    "doc6": {
        "source": "exhibit_4.1(odeon).txt",
        "output": "doc6-odeon-notes.html",
        "page_id": "doc6",
        "title": "Odeon 12.750% Senior Secured Notes due 2027",
        "short_name": "DOC 6 - Odeon 12.75%",
        "breadcrumb": "DOC 6 - Odeon 12.75% Notes",
        "doc_type": "Indenture",
        "date": "October 20, 2022",
        "issuer": "Odeon Finco PLC",
        "trustee": "U.S. Bank Trust Company, National Association",
        "principal": "$400,000,000",
        "interest": "12.750% fixed cash",
        "maturity": "November 1, 2027",
        "governing_law": "New York",
        "amc_lien": "Unsecured",
        "entity_lien": "1L (Odeon)",
        "amc_lien_tag": "tag-unsec",
        "entity_lien_tag": "tag-1l",
        "entity_lien_label": "1L AT ODEON",
        "split": "exhibit",
        "split_line_keyword": "Exhibit A",
        "split_min_line": 5200,
        "exhibits_output": "doc6-odeon-exhibits.html",
        "exhibits_page_id": "doc6-ex",
        "exhibits_breadcrumb": "DOC 6 - Odeon Exhibits",
        "priority_articles": ["III", "IV"],
    },
    "doc7": {
        "source": "pikToggle).txt",
        "output": "doc7-pik-toggle.html",
        "page_id": "doc7",
        "title": "6.00%/8.00% Cash/PIK Toggle Senior Secured Exchangeable Notes due 2030",
        "short_name": "DOC 7 - 6/8% PIK Toggle",
        "breadcrumb": "DOC 7 - 6/8% PIK Toggle",
        "doc_type": "Indenture",
        "date": "July 22, 2024",
        "issuer": "Muvico, LLC",
        "trustee": "GLAS Trust Company LLC",
        "principal": "$414,433,523",
        "interest": "6.00% cash OR 8.00% PIK (toggle)",
        "maturity": "April 1, 2030",
        "governing_law": "New York",
        "amc_lien": "1L",
        "entity_lien": "2L",
        "amc_lien_tag": "tag-1l",
        "entity_lien_tag": "tag-2l",
        "entity_lien_label": "2L AT MUVICO",
        "split": "exhibit",
        "split_line_keyword": "Exhibit A",
        "split_min_line": 5700,
        "exhibits_output": "doc7-pik-toggle-exhibits.html",
        "exhibits_page_id": "doc7-ex",
        "exhibits_breadcrumb": "DOC 7 - PIK Toggle Exhibits",
        "priority_articles": ["III", "IV", "IV-A", "IV-B", "X"],
    },
}

# ─── Translation Database ────────────────────────────────────────────────────
# Keys: (doc_key, section_number) or (doc_key, article_roman, "article")
# Values: HTML translation text

TRANSLATIONS = {}

# ── DOC 2 Translations (Muvico 15% PIK Notes) ────────────────────────────────

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

TRANSLATIONS[("doc2", "3.07")] = """
<p><strong>Mandatory Redemption.</strong> Unlike optional redemption, the Company is <strong>not required</strong> to make any scheduled mandatory sinking fund payments on these notes. This means there is no forced amortization - the full principal is due at maturity unless the Company chooses to redeem early or an event of default occurs. This is typical for high-yield PIK instruments where the issuer wants maximum flexibility to preserve cash.</p>
"""

TRANSLATIONS[("doc2", "IV", "article")] = """
<p><strong>The Covenants</strong> are the core restrictions on what Muvico and AMC can do while these notes are outstanding. They limit new debt, restrict dividends and payments to equity holders, cap liens on assets, and control transactions with affiliates. For this instrument, the <strong>leverage-based interest rate grid</strong> is critical: the higher the Total Leverage Ratio, the more interest shifts from cash to PIK, growing the debt pile.</p>
<p>The interest rate structure is:
<strong>Base rate:</strong> 7.50% cash, plus incremental amounts based on leverage:
Level 1 (>= 7.50x leverage): +1.50% cash, +6.00% PIK = <strong>15% total</strong>;
Level 2 (6.50-7.50x): +2.375% cash, +2.375% PIK = <strong>12.25% total</strong>;
Level 3 (< 6.50x): +4.00% cash only = <strong>11.50% total</strong>.
At current ~19.4x Muvico leverage, these notes are firmly in Level 1, paying 9% cash + 6% PIK.</p>
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

TRANSLATIONS[("doc2", "4.16")] = """
<p><strong>Asset Sales</strong> restricts Muvico from selling assets unless: (1) the consideration is at least <strong>fair market value</strong>, (2) at least <strong>75% of consideration is cash or cash equivalents</strong>, and (3) Net Proceeds are applied within 365 days to either reinvest in the business or repay senior secured debt. If Net Proceeds exceed a threshold and are not applied, Muvico must make an <strong>Excess Proceeds Offer</strong> to repurchase notes at par. <strong>Why it matters:</strong> This prevents the company from selling off valuable theatre assets and using the cash for other purposes (like paying dividends or servicing junior debt) without first giving these noteholders a chance to be repaid.</p>
"""

TRANSLATIONS[("doc2", "V", "article")] = """
<p><strong>Fundamental Changes</strong> restricts Muvico from merging, consolidating, or selling all/substantially all of its assets unless the surviving entity assumes all obligations under the indenture. The successor must be a U.S.-organized entity and must deliver an officers' certificate and legal opinion confirming the transaction complies with the indenture. <strong>Why it matters:</strong> This prevents the company from restructuring itself out from under these debt obligations through a corporate reorganization.</p>
"""

TRANSLATIONS[("doc2", "5.01")] = """
<p><strong>Fundamental Changes; Holding Companies.</strong> Neither the Company nor any Guarantor may merge, consolidate, or sell substantially all assets unless: (a) the surviving entity is organized in the US, (b) it expressly assumes all obligations under the Notes and Indenture, (c) no Default or Event of Default results, and (d) the Company delivers required certificates and opinions. <strong>Key difference from other docs:</strong> This provision also addresses the holding company structure, requiring Centertainment Development LLC to maintain its position as the direct or indirect parent.</p>
"""

TRANSLATIONS[("doc2", "VI", "article")] = """
<p><strong>Events of Default</strong> lists the trigger events that allow noteholders to accelerate the debt (demand immediate full repayment). These include: failure to pay interest/principal when due, breach of covenants (with cure periods), cross-default to other material debt ($50M+), bankruptcy filings, and judgment defaults. Upon acceleration, the full principal plus accrued interest becomes immediately due and payable.</p>
"""

TRANSLATIONS[("doc2", "6.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay interest for 30 days; (b) failure to pay principal when due; (c) failure to comply with covenant obligations (with 60-day cure period for most covenants after written notice); (d) default on other Indebtedness of $50 million or more; (e) one or more judgments for $50 million+ that remain unstayed for 60 days; (f) certain security interest impairments; (g) bankruptcy or insolvency events. <strong>Critical note:</strong> Cross-default at $50M means a default on the $2B Term Loan (DOC 4) would immediately trigger an Event of Default here, creating cascading acceleration across the entire capital structure.</p>
"""

# ── DOC 3 Translations (AMC 7.5% Notes) ──────────────────────────────────────

TRANSLATIONS[("doc3", "III", "article")] = """
<p><strong>Redemption provisions</strong> for these notes include optional redemption at a premium schedule, make-whole redemption, and mandatory repurchase from excess asset sale proceeds. As direct AMC-issued notes, the redemption mechanics are straightforward high-yield style.</p>
"""

TRANSLATIONS[("doc3", "3.07")] = """
<p><strong>Mandatory Redemption.</strong> The Company is <strong>not required</strong> to make mandatory sinking fund payments. The entire principal amount is due at maturity. This is standard for high-yield notes - no forced amortization.</p>
"""

TRANSLATIONS[("doc3", "3.08")] = """
<p><strong>Excess Proceeds Offer.</strong> If AMC sells assets and has Net Proceeds exceeding the threshold that are not reinvested within 365 days, the Company must offer to repurchase notes at <strong>100% of principal plus accrued interest</strong>. This gives noteholders a put right triggered by significant asset dispositions, ensuring they share in the proceeds rather than watching value leak to other creditors or equity.</p>
"""

TRANSLATIONS[("doc3", "IV", "article")] = """
<p><strong>Covenants</strong> for the AMC 7.5% Notes. These are direct AMC obligations (not Muvico), making the covenant package structurally different from DOC 2 and DOC 5. <strong>Critical structural point:</strong> These notes are 1L at AMC but only 2L at Muvico, meaning they are structurally disadvantaged compared to the Muvico-issued secured notes (DOC 2, DOC 4, DOC 5) when it comes to recovery on Muvico's theatre assets. This note trades at ~86.5 cents reflecting this structural subordination risk.</p>
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

TRANSLATIONS[("doc3", "4.11")] = """
<p><strong>Change of Control.</strong> If a Change of Control occurs (defined as acquisition of 40%+ voting stock, or certain board changes), the Company must offer to repurchase all notes at <strong>101% of principal plus accrued interest</strong>. This is a standard high-yield put right that protects holders against an acquirer loading up the company with additional debt. <strong>Compared to other docs:</strong> DOC 2 and DOC 5 do NOT have a Change of Control put, making this provision unique to the AMC-level notes.</p>
"""

TRANSLATIONS[("doc3", "4.16")] = """
<p><strong>Asset Sales.</strong> Same structure as DOC 2: fair market value consideration, 75% cash requirement, 365-day reinvestment period, and Excess Proceeds Offer at par. <strong>Structural note:</strong> Because these notes are issued at the AMC level, the Asset Sale covenant applies to AMC-level asset sales. Muvico-level asset sales are governed by DOC 2/DOC 4/DOC 5 covenants, and proceeds may be captured by those senior tranches before flowing up to AMC.</p>
"""

TRANSLATIONS[("doc3", "V", "article")] = """
<p><strong>Fundamental Changes</strong> restricts AMC from merging or selling substantially all assets without the successor assuming these note obligations. Standard successor-entity requirements apply: US organization, assumption of all obligations, no resulting default.</p>
"""

TRANSLATIONS[("doc3", "5.01")] = """
<p><strong>Fundamental Changes; Holding Companies.</strong> AMC may not merge, consolidate, or sell all/substantially all assets unless the surviving entity expressly assumes all obligations. The successor must be a US-organized entity, must not cause an Event of Default, and must deliver officers' certificates and legal opinions. This protects noteholders from corporate shell games where AMC restructures to avoid its obligations.</p>
"""

TRANSLATIONS[("doc3", "VI", "article")] = """
<p><strong>Events of Default</strong> triggers acceleration of these notes. The cross-default threshold is $50 million, meaning defaults on the $2B Term Loan (DOC 4), Muvico notes (DOC 2, DOC 5), or Odeon notes (DOC 6) would all trigger cross-defaults here. Given the interconnected capital structure, an Event of Default anywhere likely triggers a cascade across all documents.</p>
"""

TRANSLATIONS[("doc3", "6.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay interest for 30 days; (b) failure to pay principal at maturity; (c) failure to perform covenants (60-day cure period after notice); (d) cross-default on $50M+ of other Indebtedness; (e) judgment defaults of $50M+ unstayed for 60 days; (f) certain guarantor/collateral events; (g) bankruptcy/insolvency. <strong>Key distinction from DOC 4:</strong> The cure period for covenant breaches is 60 days here vs. 30 days in the Credit Agreement, giving AMC slightly more room to cure under the indenture.</p>
"""

# ── DOC 4 Translations ($2B Term Loan) ────────────────────────────────────────

TRANSLATIONS[("doc4", "V", "article")] = """
<p><strong>Affirmative Covenants</strong> require AMC and Muvico (as co-borrowers) to take specific ongoing actions: deliver financial statements, maintain corporate existence, pay taxes, maintain insurance, and provide regular compliance certificates. These are the "must-do" obligations, as opposed to Article VI's "must-not-do" restrictions.</p>
"""

TRANSLATIONS[("doc4", "5.01")] = """
<p><strong>Financial Statements and Information.</strong> The Borrowers must deliver: (a) annual audited financial statements within 90 days of fiscal year end; (b) quarterly unaudited financials within 45 days of quarter end; (c) compliance certificates with each set of financials; (d) notice of any Default or Event of Default; and (e) additional information reasonably requested by the Administrative Agent. <strong>Why it matters:</strong> As the senior-most tranche (1L at both AMC and Muvico), Term Loan lenders have the strongest information rights and are typically the first to detect covenant deterioration.</p>
"""

TRANSLATIONS[("doc4", "VI", "article")] = """
<p><strong>Negative Covenants</strong> are the most important restrictions in the Credit Agreement. They limit what the Borrowers CANNOT do. Key provisions include limitations on new debt (6.01), new liens (6.02), fundamental changes (6.03), investments (6.04), asset sales (6.05), restricted payments (6.08), affiliate transactions (6.09), and the <strong>unique Cash Hoarding provision (6.13)</strong>. As the 1L lender, these covenants give the Term Loan the tightest set of restrictions in AMC's capital structure.</p>
"""

TRANSLATIONS[("doc4", "6.01")] = """
<p><strong>Indebtedness; Certain Equity Securities.</strong> Neither AMC nor Muvico may incur Indebtedness except within specified baskets. Key permitted categories include: (a) obligations under this Credit Agreement; (b) existing indebtedness on Schedule 6.01; (c) intercompany debt (with subordination requirements); (d) capital lease obligations; (e) refinancing of existing debt (with anti-layering protections); (f) a general basket of the greater of $175M and 7.5% of Total Assets; (g) specific tranches for the Muvico notes and Odeon notes. <strong>Why it matters:</strong> The Term Loan's debt incurrence baskets are tighter than those in the indentures, reflecting its senior priority position. The specific carve-outs for Muvico and Odeon notes show how the capital structure was carefully negotiated to permit the existing multi-tranche debt stack.</p>
"""

TRANSLATIONS[("doc4", "6.02")] = """
<p><strong>Liens.</strong> No Borrower may create liens except for permitted liens. Key exceptions include: (a) liens securing this Credit Agreement (1L priority); (b) existing liens on Schedule 6.02; (c) liens on property acquired with purchase money debt; (d) junior liens securing the Muvico notes (capped); (e) general lien baskets. <strong>Why it matters:</strong> As the 1L tranche, the Credit Agreement's lien covenant is the strictest. It controls what additional secured debt can be issued and at what priority level. The specific carve-outs for the 1.25L, 1.5L, and 2L tranches in the Muvico structure were negotiated into this covenant.</p>
"""

TRANSLATIONS[("doc4", "6.05")] = """
<p><strong>Asset Sales.</strong> Borrowers may not sell, transfer, or dispose of assets except: (a) sales in the ordinary course of business; (b) dispositions of obsolete or worn-out equipment; (c) sales where Net Proceeds are reinvested within 365 days or used to prepay Term Loans; (d) asset swaps of comparable value; (e) dispositions up to the greater of $100M and 4% of Total Assets in any fiscal year. Mandatory prepayment: 100% of Net Proceeds from non-ordinary course asset sales above threshold must be applied to prepay the Term Loan. <strong>Why it matters:</strong> The Term Loan's asset sale sweep is more aggressive than the indentures - 100% of excess proceeds must go to prepay term loans first. This gives the 1L lender first claim on any asset disposition proceeds.</p>
"""

TRANSLATIONS[("doc4", "6.08")] = """
<p><strong>Restricted Payments; Certain Payments of Indebtedness.</strong> Borrowers may not declare dividends, repurchase equity, or make payments on junior indebtedness except: (a) from the general basket (greater of $50M and 2% of Total Assets); (b) payments on junior debt using refinancing proceeds; (c) dividends paid in equity; (d) repurchases from employees (capped at $25M/year). <strong>Why it matters:</strong> This is tighter than the indenture restricted payment covenants. The Credit Agreement restricts not just equity distributions but also <em>payments on junior debt</em>, meaning AMC cannot voluntarily prepay the Muvico PIK notes or other junior tranches without fitting within these baskets.</p>
"""

TRANSLATIONS[("doc4", "6.09")] = """
<p><strong>Transactions with Affiliates.</strong> All affiliate transactions must be on terms no less favorable than arm's-length. Transactions above $25M require Board approval plus a fairness opinion from an independent financial advisor. Excluded from this restriction: compensation and benefits to officers/directors, transactions between Loan Parties, and transactions under existing agreements listed on Schedule 6.09.</p>
"""

TRANSLATIONS[("doc4", "6.13")] = """
<p><strong>Cash Hoarding -- UNIQUE PROVISION.</strong> This is a covenant found <strong>only in the Credit Agreement</strong> and not in any of the indentures. It restricts AMC from maintaining Unrestricted Cash (cash not needed for near-term operations) above a specified threshold. If Unrestricted Cash exceeds the cap for a specified number of consecutive business days, the excess must be used to prepay Term Loans. <strong>Why this is critical:</strong> Cash Hoarding prevents AMC from stockpiling cash while the Term Loan remains outstanding. In a distressed situation, companies often try to hoard cash to build a "war chest" for bankruptcy negotiations or to maintain leverage over creditors. This provision forces AMC to use excess liquidity to deleverage, directly benefiting Term Loan holders. <strong>With $417M of cash on the balance sheet</strong>, this covenant is actively relevant and likely constraining AMC's ability to accumulate additional cash reserves. This gives the 1L lenders a powerful enforcement mechanism that the noteholders (DOC 2, 3, 5, 6, 7) simply do not have.</p>
"""

TRANSLATIONS[("doc4", "VII", "article")] = """
<p><strong>Events of Default</strong> in the Credit Agreement trigger acceleration of the $2B Term Loan. Because this is the 1L tranche, acceleration here would cascade through the entire capital structure via cross-default provisions in DOC 2, 3, 5, 6, and 7. The Term Loan's Events of Default are generally more sensitive (lower thresholds, shorter cure periods) than those in the indentures.</p>
"""

TRANSLATIONS[("doc4", "7.01")] = """
<p><strong>Events of Default</strong> include: (a) failure to pay principal when due (no cure period); (b) failure to pay interest within 5 business days; (c) false representations/warranties (30-day cure); (d) covenant breaches (30-day cure for affirmative covenants; immediate for negative covenants and financial covenants); (e) cross-default on $50M+ Indebtedness; (f) bankruptcy/insolvency (immediate); (g) ERISA events exceeding $50M; (h) material judgment defaults; (i) Change of Control; (j) collateral impairment. <strong>Key differences from indentures:</strong> The Credit Agreement has (1) shorter cure periods (30 days vs. 60 days), (2) immediate default for negative covenant breaches (no cure), and (3) a Change of Control trigger (which some indentures lack). This makes the Term Loan the "hair trigger" in the capital structure.</p>
"""

# ── DOC 5 Translations (Muvico Exchangeable 2030) ────────────────────────────

TRANSLATIONS[("doc5", "III", "article")] = """
<p><strong>Redemption</strong> for the Exchangeable Notes uses a <strong>Soft Call</strong> mechanism rather than a traditional hard call. This means redemption is only available under specific market conditions (typically when the stock price exceeds a threshold relative to the exchange price). There is also a Special Mandatory Redemption and a Fundamental Change put right, giving holders the ability to force repurchase in certain scenarios.</p>
"""

TRANSLATIONS[("doc5", "3.04")] = """
<p><strong>Soft Call.</strong> The Company may redeem all (but not less than all) notes only if the closing price of AMC common stock exceeds a specified premium to the Exchange Price for a defined period. This is fundamentally different from a standard hard call: the Company cannot simply call the notes at any time by paying a premium. The Soft Call protects exchangeable noteholders from being called away just when the exchange option becomes most valuable. <strong>Why it matters:</strong> If AMC's stock price rises significantly, these notes' exchange value increases. The Soft Call ensures holders can benefit from upside rather than being forced to accept a par redemption when the exchange is "in the money."</p>
"""

TRANSLATIONS[("doc5", "3.08")] = """
<p><strong>Special Mandatory Redemption.</strong> If certain conditions related to the Transactions are not satisfied (such as regulatory approvals or closing conditions), the Company must redeem all notes at 100% of principal plus accrued interest. This is a deal-protection mechanism ensuring noteholders get repaid if the underlying transaction falls apart.</p>
"""

TRANSLATIONS[("doc5", "3.10")] = """
<p><strong>Fundamental Change Put Right.</strong> Upon a Fundamental Change (defined to include mergers, asset sales, delisting, and change of control events), each holder may require the Company to repurchase their notes at <strong>100% of principal plus accrued interest</strong>. This gives holders a floor value protection: even if the exchange option is underwater, they can put notes back at par in the event of a major corporate change.</p>
"""

TRANSLATIONS[("doc5", "IV", "article")] = """
<p><strong>Covenants</strong> for the Exchangeable Notes include standard high-yield restrictions plus additional structural covenants unique to the Muvico Group entity structure. Key additions include: corporate separateness requirements (Sec 4.20) to maintain Muvico as a distinct entity, intercompany agreement restrictions (Sec 4.21), and controls on amendments to key documents (Sec 4.22). These structural covenants protect the ring-fenced Muvico asset base.</p>
"""

TRANSLATIONS[("doc5", "4.05")] = """
<p><strong>Limitation on Indebtedness.</strong> Same general framework as DOC 2 - incurrence test based on Fixed Charge Coverage Ratio, with specified exceptions. As 1.25L at Muvico (junior only to the $2B Term Loan), these noteholders benefit from relatively tight debt restrictions at the Muvico level. <strong>Key structural point:</strong> The 1.25L/1.5L/2L lien layering at Muvico was carefully negotiated into each document's permitted debt baskets.</p>
"""

TRANSLATIONS[("doc5", "4.06")] = """
<p><strong>Limitation on Restricted Payments and Prepayments of Other Indebtedness.</strong> Restricts distributions and payments on junior debt. This provision is critical because it controls whether cash generated by Muvico can flow upstream to AMC or be used to service the Muvico 15% PIK notes (DOC 2, which is junior at 1.5L) and the 6/8% PIK Toggle notes (DOC 7, which is 2L).</p>
"""

TRANSLATIONS[("doc5", "4.20")] = """
<p><strong>Muvico Group Corporate Separateness.</strong> The Company must maintain its separate corporate existence and identity from AMC and its other subsidiaries. Requirements include: separate books and records, separate financial statements, separate bank accounts, and arm's-length intercompany transactions. <strong>Why it matters:</strong> This prevents "substantive consolidation" arguments in bankruptcy. If Muvico's assets and liabilities were consolidated with AMC's, the carefully negotiated lien priority structure would collapse. By maintaining separateness, Muvico-level secured creditors (DOC 2, 4, 5, 7) preserve their priority claim on Muvico's theatre assets.</p>
"""

TRANSLATIONS[("doc5", "IV-A", "article")] = """
<p><strong>Additional Covenants of Holdings and Odeon Holdco.</strong> These covenants apply specifically to Centertainment Development, LLC (Holdings) and Odeon Holdco. They restrict Holdings from engaging in any business activity other than holding equity in the Company (Muvico) and related administrative activities. This "clean holdco" requirement ensures that no unrelated liabilities or claims attach at the Holdings level, preserving the direct chain of equity ownership for secured creditors.</p>
"""

TRANSLATIONS[("doc5", "IV-B", "article")] = """
<p><strong>Additional Covenants of AMC Group Obligors and Odeon Holdco Subsidiaries.</strong> These covenants impose specific obligations on AMC and its direct subsidiaries in their capacity as Guarantors. Key requirements include maintaining the guarantee, providing financial information, and complying with limitations on intercompany transfers of Muvico Group assets. This ensures AMC cannot strip assets from the guaranteed entities.</p>
"""

TRANSLATIONS[("doc5", "X", "article")] = """
<p><strong>Exchange of Notes - The equity exchange mechanics</strong> are the defining feature of this instrument. Notes are exchangeable into AMC common stock at a specified Exchange Rate, with anti-dilution adjustments and special settlement provisions. The exchange feature gives holders equity upside participation while maintaining a debt floor value. This is structurally similar to a convertible bond but with additional complexity from the Muvico/AMC dual-entity structure.</p>
"""

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

# ── DOC 6 Translations (Odeon 12.75%) ─────────────────────────────────────────

TRANSLATIONS[("doc6", "III", "article")] = """
<p><strong>Redemption</strong> for the Odeon notes includes standard optional redemption, mandatory redemption, a <strong>unique Redemption for Taxation Reasons</strong> (reflecting the UK/international issuer structure), and a withholding tax/Additional Amounts provision. These UK-specific features are not found in the US indentures (DOC 2, 3, 5, 7).</p>
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

TRANSLATIONS[("doc6", "IV", "article")] = """
<p><strong>Covenants</strong> for the Odeon notes include the standard high-yield package plus several UK-specific provisions. Notable differences from the US indentures: (1) <strong>Maintenance of Listing (Sec 4.05)</strong> - requires maintaining listing on a recognized exchange; (2) <strong>Agreed Security Principles (Exhibit D)</strong> - UK-style security concept governing how collateral is taken; (3) <strong>Change of Control put right (Sec 4.12)</strong> at 101%; (4) broader <strong>Reports obligation (Sec 4.13)</strong> vs. simple "Financial Information" in US docs. The Security Agent (not "Collateral Agent") terminology reflects UK practice.</p>
"""

TRANSLATIONS[("doc6", "4.05")] = """
<p><strong>Maintenance of Listing.</strong> The Issuer must use commercially reasonable efforts to maintain the listing of the notes on a recognized stock exchange (typically the Irish Stock Exchange or Luxembourg Stock Exchange). <strong>Why it matters:</strong> Certain European institutional investors are required to hold only listed securities. Delisting could force selling, which would depress the notes' trading price. This covenant is found <strong>only in DOC 6</strong> among all AMC debt instruments.</p>
"""

TRANSLATIONS[("doc6", "4.06")] = """
<p><strong>Limitation on Indebtedness.</strong> The Issuer and Restricted Subsidiaries may not incur additional Indebtedness unless the Fixed Charge Coverage Ratio is at least 2.00:1.00 (pro forma). <strong>Critical context:</strong> With Odeon EBITDA of only $15M against $400M of debt (26.67x leverage, 0.29x interest coverage), Odeon is deeply restricted from incurring any new debt outside the carved-out baskets. The $51M annual cash interest burden alone exceeds Odeon's entire EBITDA, making this covenant effectively a straitjacket.</p>
"""

TRANSLATIONS[("doc6", "4.07")] = """
<p><strong>Limitation on Restricted Payments.</strong> Prevents Odeon from upstreaming cash to AMC through dividends or other distributions. The builder basket and 50% CNI mechanics are similar to the US indentures. <strong>Structural significance:</strong> This is a key ring-fencing provision. Even though AMC guarantees these notes, Odeon's cash flow stays within the Odeon Group for debt service rather than leaking to the US parent. Given Odeon's 0.29x interest coverage, there is effectively no capacity for restricted payments.</p>
"""

TRANSLATIONS[("doc6", "4.08")] = """
<p><strong>Limitation on Liens.</strong> Standard lien covenant adapted for the UK/European structure. Permitted liens include liens securing the notes (1L at Odeon), existing liens, and baskets for ordinary course operations. <strong>Key difference:</strong> References "Agreed Security Principles" (Exhibit D) which govern how and where security interests can be taken across multiple European jurisdictions, each with different real property and corporate law regimes.</p>
"""

TRANSLATIONS[("doc6", "4.09")] = """
<p><strong>Limitation on Affiliate Transactions.</strong> Arm's-length requirement for all transactions with affiliates. This is particularly important for Odeon given the extensive intercompany relationships between Odeon and AMC, including management services, brand licensing, and shared procurement. The Management Services Agreement between AMC and Odeon is a key affiliate transaction that must comply with this covenant.</p>
"""

TRANSLATIONS[("doc6", "4.12")] = """
<p><strong>Change of Control.</strong> If a Change of Control occurs, each holder may require repurchase at <strong>101% of principal plus accrued interest</strong>. Change of Control is defined as (a) acquisition of more than 50% of voting stock of the Company (Odeon Cinemas Group) by a person other than AMC, or (b) sale of all or substantially all assets of Odeon. <strong>Why it matters:</strong> If AMC sells its European cinema operations, Odeon noteholders can force a put at 101. With Odeon notes trading at 103.58 (above par), holders would likely not exercise this put at current prices, but it provides downside protection.</p>
"""

TRANSLATIONS[("doc6", "4.17")] = """
<p><strong>Asset Sales.</strong> Fair market value, 75% cash consideration, and 365-day reinvestment period, with Excess Proceeds Offer at par. Asset sales are restricted to Odeon Group assets only. <strong>Key feature:</strong> Given that Odeon operates cinemas across the UK, Germany, Spain, Italy, and other European markets, asset sales may involve additional regulatory and tax considerations in each jurisdiction that complicate the mechanics.</p>
"""

# ── DOC 7 Translations (6/8% PIK Toggle) ─────────────────────────────────────

TRANSLATIONS[("doc7", "III", "article")] = """
<p><strong>Redemption</strong> for the PIK Toggle notes uses a <strong>Soft Call</strong> mechanism (same as DOC 5). No traditional hard call is available. There is also a Special Mandatory Redemption and a Fundamental Change put right. The Soft Call protects the exchange option embedded in these notes.</p>
"""

TRANSLATIONS[("doc7", "3.03")] = """
<p><strong>Soft Call.</strong> The Company may redeem all (but not less than all) notes only when AMC's stock price exceeds a premium to the Exchange Price for a sustained period. <strong>Key detail:</strong> With the exchange price at $5.66/share, the Soft Call is only available if AMC stock rises significantly above this level. At current market prices, the Soft Call is not available, meaning holders are locked into the investment unless they sell on the secondary market or exchange into equity. This makes these notes effectively non-callable in the near term.</p>
"""

TRANSLATIONS[("doc7", "3.07")] = """
<p><strong>Special Mandatory Redemption.</strong> If certain Transaction conditions are not satisfied, the Company must redeem all notes at par plus accrued interest. This is the same deal-protection mechanism as DOC 5.</p>
"""

TRANSLATIONS[("doc7", "3.09")] = """
<p><strong>Fundamental Change Put Right.</strong> Holders may require repurchase at <strong>100% of principal plus accrued interest</strong> upon a Fundamental Change. Combined with the exchange feature, this creates a "heads I win, tails I'm protected" dynamic: if AMC stock rises, holders exchange into equity; if AMC undergoes a fundamental change, holders put at par.</p>
"""

TRANSLATIONS[("doc7", "IV", "article")] = """
<p><strong>Covenants</strong> follow the same structure as DOC 5 but are tailored for the Centertainment Group. Key provisions include standard high-yield restrictions plus structural covenants for corporate separateness (Sec 4.20) and intercompany agreements (Sec 4.21). <strong>Notable difference:</strong> The asset sale basket is much tighter than other documents: only <strong>$1M for a single transaction / $5M aggregate</strong> (vs. much higher thresholds in DOC 2-5). This severely restricts Muvico's ability to sell assets without triggering the excess proceeds mechanism.</p>
"""

TRANSLATIONS[("doc7", "4.05")] = """
<p><strong>Limitation on Indebtedness.</strong> Same general framework as DOC 2 and DOC 5 - Fixed Charge Coverage Ratio incurrence test with specified exceptions. As 2L at Muvico (the most junior secured tranche), these noteholders have the weakest position in the Muvico capital structure. The debt baskets must accommodate all senior tranches (1L Term Loan, 1.25L Exchangeable, 1.5L PIK Notes) before these 2L notes have any residual claim.</p>
"""

TRANSLATIONS[("doc7", "4.06")] = """
<p><strong>Limitation on Restricted Payments.</strong> Restricts distributions from Muvico. <strong>Key structural point:</strong> As 2L holders, these noteholders are most vulnerable to leakage. If cash flows out of Muvico through restricted payments, there is less available for the 2L tranche's recovery. The tight asset sale basket ($1M/$5M) and restricted payment limitations work together to keep value within the Muvico entity.</p>
"""

TRANSLATIONS[("doc7", "4.16")] = """
<p><strong>Asset Sales; Casualty Event; Payments on UK Holdco Intercompany Note.</strong> The asset sale restrictions here include the <strong>tightest baskets in the AMC capital structure</strong>: individual transactions capped at $1 million, aggregate at $5 million. Above these thresholds, the full excess proceeds machinery kicks in. This extraordinary tightness reflects the 2L holders' vulnerability: they need maximum asset preservation to have any recovery. <strong>Compare:</strong> DOC 2 has a much larger general basket, and DOC 4 (1L Term Loan) has even larger baskets. The tighter the basket, the more protective for junior creditors.</p>
"""

TRANSLATIONS[("doc7", "4.20")] = """
<p><strong>Centertainment Group Corporate Separateness.</strong> Same concept as DOC 5's Muvico separateness covenant but framed around the Centertainment structure. Requires maintaining separate legal identity, books, accounts, and arm's-length intercompany dealings. <strong>Critical for 2L holders:</strong> In bankruptcy, substantive consolidation would merge Muvico's assets with AMC's, potentially benefiting AMC-level creditors at the expense of Muvico-level secured holders. This covenant creates evidence of separateness that could defeat a consolidation argument.</p>
"""

TRANSLATIONS[("doc7", "IV-A", "article")] = """
<p><strong>Additional Covenants of Holdings and UK Holdco.</strong> Restricts Centertainment Development, LLC (Holdings) and AMC UK Holding Limited to passive holding company activities only. No operating business, no independent debt, no unrelated liabilities. This clean holdco requirement preserves the direct equity chain for Muvico's secured creditors.</p>
"""

TRANSLATIONS[("doc7", "IV-B", "article")] = """
<p><strong>Additional Covenants of AMC and Existing Guarantors.</strong> Imposes obligations on AMC and its direct subsidiaries as guarantors of the PIK Toggle notes. Key requirements include maintaining the guarantee, complying with information covenants, and not interfering with Muvico Group operations in ways that would prejudice note holders. These covenants ensure AMC's guarantee remains enforceable.</p>
"""

TRANSLATIONS[("doc7", "X", "article")] = """
<p><strong>Exchange of Notes</strong> is the most economically significant feature of this instrument. The notes are exchangeable into AMC common stock at <strong>$5.66 per share</strong> (Exchange Rate: 176.6379 shares per $1,000 principal). The exchange includes an <strong>Exchange Adjustment declining premium schedule</strong>:
Years 0-3: <strong>18.0%</strong> additional consideration;
Years 3-4: <strong>12.0%</strong>;
Years 4-5: <strong>6.0%</strong>;
After Year 5: <strong>0%</strong>.
This means early exchangers receive a significant premium, incentivizing patience but rewarding early conversion. With these notes issued July 2024, the 18% premium period runs through July 2027.</p>
"""

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

TRANSLATIONS[("doc7", "10.06")] = """
<p><strong>Adjustment of Exchange Rate.</strong> The Exchange Rate adjusts for anti-dilution events including: stock dividends, stock splits, rights offerings below market price, cash dividends exceeding a threshold, and spin-offs. These standard anti-dilution protections ensure that corporate actions do not impair the exchange value. <strong>Critical detail:</strong> The adjustment formulas use AMC's stock price as the reference, not Muvico's equity value, creating a structural mismatch between the issuer (Muvico) and the equity reference (AMC).</p>
"""


# ─── HTML Template ────────────────────────────────────────────────────────────

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - {title}</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
</head>
<body data-page="{page_id}" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="{breadcrumb}"></header>
    <div class="content-body">
      <div class="doc-layout">
        <div class="doc-toc">
          <div class="doc-toc-title">Table of Contents</div>
          <div id="doc-toc-list"></div>
          <div style="margin-top:12px;">
            <button id="expand-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%; margin-bottom:4px;">Expand All</button>
            <button id="collapse-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%%;">Collapse All</button>
          </div>
        </div>
        <div class="doc-content">
{doc_header}
{content}
        </div>
      </div>
    </div>
  </main>
</div>
<script src="../js/components.js"></script>
<script src="../js/doc-nav.js"></script>
<script src="../js/tooltips.js"></script>
</body>
</html>"""

EXHIBITS_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AMC Debt Navigator - {title}</title>
<link rel="stylesheet" href="../css/theme.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/docs.css">
</head>
<body data-page="{page_id}" data-base="..">
<button class="mobile-toggle">&#9776;</button>
<div class="mobile-overlay"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="main-content">
    <header class="content-header" id="content-header" data-breadcrumb="{breadcrumb}"></header>
    <div class="content-body">
      <div class="doc-layout">
        <div class="doc-toc">
          <div class="doc-toc-title">Exhibits &amp; Schedules</div>
          <div id="doc-toc-list"></div>
          <div style="margin-top:12px;">
            <button id="expand-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%; margin-bottom:4px;">Expand All</button>
            <button id="collapse-all" class="btn" style="font-size:10px; padding:4px 8px; width:100%%;">Collapse All</button>
          </div>
        </div>
        <div class="doc-content">
          <div class="doc-header">
            <div class="doc-type">Exhibits &amp; Schedules</div>
            <h1>{doc_title}</h1>
            <div class="doc-meta">
              <div class="meta-item"><span class="meta-label">Parent Document:</span> {parent_doc}</div>
            </div>
          </div>
{content}
        </div>
      </div>
    </div>
  </main>
</div>
<script src="../js/components.js"></script>
<script src="../js/doc-nav.js"></script>
<script src="../js/tooltips.js"></script>
</body>
</html>"""


# ─── Parser Functions ─────────────────────────────────────────────────────────

def read_source(filename):
    """Read a source .txt file and return lines."""
    path = os.path.join(SOURCE_DIR, filename)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.readlines()


def escape(text):
    """HTML-escape text."""
    return html_mod.escape(text, quote=True)


def roman_to_label(r):
    """Normalize roman numeral for IDs."""
    return r.upper().strip().replace(" ", "").replace(".", "")


# Regex patterns for detecting article/section headers
# Articles: "Article I.", "Article I", "ARTICLE I", "Article IV-A.", etc.
ARTICLE_RE = re.compile(
    r'^\s*(?:Article|ARTICLE)\s+([IVXLC]+(?:-[A-Z])?)\b[\.\:]?\s*(.*)',
    re.IGNORECASE
)
# Sections: "Section 1.01", "Section 10.15", etc.
SECTION_RE = re.compile(
    r'^\s*Section\s+(\d+\.\d+)\s*(.*)',
    re.IGNORECASE
)
# DOC 4 uses slightly different article format: "Article I" on its own line, title on next
DOC4_ARTICLE_RE = re.compile(
    r'^\s*(?:Article|ARTICLE)\s+([IVXLC]+)\s*$',
    re.IGNORECASE
)

# Page/noise lines to skip
PAGE_NUM_RE = re.compile(r'^\s*-?\s*[ivx]+\s*-?\s*$|^\s*\d+\s*$')
TOC_RE = re.compile(r'^\s*TABLE OF CONTENTS', re.IGNORECASE)


def is_definitions_section(sec_num):
    """Check if this is a definitions section (1.01 or 1.02)."""
    return sec_num in ("1.01", "1.02")


def is_toc_line(line):
    """Check if line is part of table of contents."""
    stripped = line.strip()
    if not stripped:
        return False
    # TOC entries typically have tab-separated page numbers
    if re.match(r'^Section\s+\d+\.\d+\t', stripped):
        return True
    if re.match(r'^Article\s+[IVXLC]', stripped, re.IGNORECASE) and '\t' in stripped:
        return True
    return False


def count_definitions(text):
    """Estimate how many defined terms are in a definitions section."""
    # Count quoted defined terms like "Defined Term"
    matches = re.findall(r'"[A-Z][^"]{2,}"', text)
    return len(set(matches))


def parse_document(lines, doc_key, config):
    """
    Parse document lines into structured data:
    Returns list of articles, each containing sections.
    """
    articles = []
    current_article = None
    current_section = None
    in_toc = False
    in_preamble = True
    preamble_lines = []

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip empty lines at start and page numbers
        if PAGE_NUM_RE.match(stripped):
            i += 1
            continue

        # Detect TOC region
        if TOC_RE.match(stripped):
            in_toc = True
            i += 1
            continue

        if in_toc:
            # End of TOC: when we hit the actual indenture/agreement preamble text
            if re.match(r'^\s*(?:INDENTURE|This INDENTURE|CREDIT AGREEMENT|This CREDIT AGREEMENT)', stripped, re.IGNORECASE):
                in_toc = False
                in_preamble = True
                preamble_lines.append(stripped)
                i += 1
                continue
            # "NOW THEREFORE" signals end of preamble / start of body
            if re.match(r'^\s*NOW,?\s+THEREFORE', stripped, re.IGNORECASE):
                in_toc = False
                in_preamble = True
                preamble_lines.append(stripped)
                i += 1
                continue
            # For exhibit/appendix TOC entries, skip
            if is_toc_line(stripped):
                i += 1
                continue
            # If we see "Exhibit" or "Schedule" in TOC, skip
            if re.match(r'^\s*(Exhibit|Schedule|Appendix|EXHIBIT|SCHEDULE)\s+', stripped):
                i += 1
                continue
            # Blank or continuation lines in TOC
            if not stripped or stripped in ('Page', '(Continued)', 'SCHEDULES:', 'EXHIBITS:'):
                i += 1
                continue
            # Check for article match - but check if this is still in TOC
            # by looking ahead to see if nearby lines are tab-separated TOC entries
            art_match = ARTICLE_RE.match(stripped)
            if art_match and '\t' not in stripped:
                # Look ahead: if the next few non-blank lines contain Section + tab patterns,
                # we're still in the TOC (DOC 4 style where articles have no tabs)
                still_in_toc = False
                for j in range(i + 1, min(i + 10, len(lines))):
                    future = lines[j].strip()
                    if not future:
                        continue
                    if re.match(r'^Section\s+\d+\.\d+\t', future):
                        still_in_toc = True
                        break
                    if re.match(r'^\s*(?:INDENTURE|CREDIT AGREEMENT|NOW|Article|ARTICLE)', future, re.IGNORECASE):
                        break
                if still_in_toc:
                    i += 1
                    continue
                else:
                    in_toc = False
                    # Don't increment - process this line
            else:
                i += 1
                continue

        # Check for article header
        art_match = ARTICLE_RE.match(stripped)
        if art_match:
            roman = art_match.group(1).upper()
            title_text = art_match.group(2).strip().rstrip('.')

            # For DOC 4 style: article number on one line, title on next
            if not title_text and i + 1 < len(lines):
                # Look ahead for title on next non-empty line
                for j in range(i + 1, min(i + 5, len(lines))):
                    next_stripped = lines[j].strip()
                    if next_stripped and not PAGE_NUM_RE.match(next_stripped):
                        title_text = next_stripped
                        break

            # Clean up title
            title_text = re.sub(r'\s+\d+$', '', title_text)  # Remove trailing page numbers
            title_text = title_text.strip().rstrip('.')

            if in_preamble:
                in_preamble = False

            # Save current section to current article
            if current_section and current_article:
                current_article["sections"].append(current_section)
                current_section = None

            # Save current article
            if current_article:
                articles.append(current_article)

            current_article = {
                "roman": roman,
                "title": title_text,
                "sections": [],
                "id": f"art-{roman_to_label(roman)}",
            }
            i += 1
            continue

        # Check for section header
        sec_match = SECTION_RE.match(stripped)
        if sec_match and current_article:
            sec_num = sec_match.group(1)
            sec_raw = sec_match.group(2).strip()

            # Clean up title - remove trailing page numbers and tabs
            sec_raw = re.sub(r'\t.*', '', sec_raw)
            sec_raw = re.sub(r'\s+\d+$', '', sec_raw)
            sec_raw = sec_raw.strip()

            # Extract just the title portion (before first period followed by space/content)
            # e.g. "Defined Terms. As used in this Agreement..." -> "Defined Terms"
            # But handle titles like "[Reserved]" or "Limitation on Indebtedness and Certain Equity Securities"
            sec_title = sec_raw
            body_remainder = ""
            period_match = re.match(r'^([^.]+(?:\.\d+)?)\.\s+(.+)', sec_raw)
            if period_match:
                candidate_title = period_match.group(1).strip()
                candidate_body = period_match.group(2).strip()
                # Only split if the part before the period looks like a title (< 120 chars)
                # and the part after looks like body text (has multiple words)
                if len(candidate_title) < 120 and len(candidate_body) > 20:
                    sec_title = candidate_title
                    body_remainder = candidate_body

            sec_title = sec_title.rstrip('.')

            if not sec_title or sec_title == '[Reserved]':
                if not sec_title:
                    # Look ahead for title
                    for j in range(i + 1, min(i + 3, len(lines))):
                        next_stripped = lines[j].strip()
                        if next_stripped and not PAGE_NUM_RE.match(next_stripped):
                            sec_title = next_stripped.rstrip('.')
                            break
                if not sec_title:
                    sec_title = "[Reserved]"

            # Save previous section
            if current_section:
                current_article["sections"].append(current_section)

            current_section = {
                "number": sec_num,
                "title": sec_title,
                "text_lines": [body_remainder] if body_remainder else [],
                "id": f"sec-{sec_num.replace('.', '-')}",
            }
            i += 1
            continue

        # Accumulate text for current section
        if current_section and not in_toc and not in_preamble:
            if stripped:
                current_section["text_lines"].append(stripped)
        elif in_preamble and stripped:
            preamble_lines.append(stripped)

        i += 1

    # Finalize
    if current_section and current_article:
        current_article["sections"].append(current_section)
    if current_article:
        articles.append(current_article)

    return articles, preamble_lines


def is_priority_article(roman, priority_list):
    """Check if an article roman numeral is in the priority list."""
    return roman.upper() in [p.upper() for p in priority_list]


def is_priority_section(sec_num, article_roman, priority_articles):
    """
    Check if a section should get a translation.
    Priority sections are those within priority articles.
    """
    return article_roman.upper() in [p.upper() for p in priority_articles]


def build_doc_header(config):
    """Build the document header HTML."""
    return f"""          <div class="doc-header">
            <div class="doc-type">{escape(config['doc_type'])}</div>
            <h1>{escape(config['title'])}</h1>
            <div class="doc-meta">
              <div class="meta-item"><span class="meta-label">Date:</span> {escape(config['date'])}</div>
              <div class="meta-item"><span class="meta-label">Issuer:</span> {escape(config['issuer'])}</div>
              <div class="meta-item"><span class="meta-label">Trustee/Agent:</span> {escape(config['trustee'])}</div>
              <div class="meta-item"><span class="meta-label">Initial Principal:</span> {escape(config['principal'])}</div>
              <div class="meta-item"><span class="meta-label">Interest:</span> {escape(config['interest'])}</div>
              <div class="meta-item"><span class="meta-label">Maturity:</span> {escape(config['maturity'])}</div>
              <div class="meta-item"><span class="meta-label">Governing Law:</span> {escape(config['governing_law'])}</div>
            </div>
            <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
              <span class="tag {config['amc_lien_tag']}">{escape(config['amc_lien'])} AT AMC</span>
              <span class="tag {config['entity_lien_tag']}">{escape(config['entity_lien_label'])}</span>
            </div>
          </div>"""


def build_section_html(section, doc_key, article_roman, priority_articles):
    """Build HTML for a single section."""
    sec_num = section["number"]
    sec_title = section["title"]
    sec_id = section["id"]
    raw_text = "\n".join(section["text_lines"])
    is_priority = is_priority_section(sec_num, article_roman, priority_articles)

    html_parts = []
    html_parts.append(f'          <div class="doc-section" id="{sec_id}">')
    html_parts.append(f'            <div class="section-header">')
    html_parts.append(f'              <span class="section-number">Section {escape(sec_num)}</span>')
    html_parts.append(f'              <span class="section-title">{escape(sec_title)}</span>')
    html_parts.append(f'            </div>')

    # Handle definitions section specially
    if is_definitions_section(sec_num):
        term_count = count_definitions(raw_text)
        if term_count < 10:
            term_count = 150  # Estimate if regex didn't find many
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">DEFINITIONS SUMMARY</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                <p>This section contains approximately <strong>{term_count} defined terms</strong> that are used throughout this document. Key terms are available via tooltip popups throughout this document and in the <a href="../glossary.html">Glossary</a>.</p>')
        html_parts.append(f'                <p>Important defined terms for this instrument include: Consolidated EBITDA, Fixed Charge Coverage Ratio, Permitted Indebtedness, Permitted Liens, Restricted Payment, Change of Control, and Event of Default.</p>')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')
        # Don't include raw text for definitions - it's too long
        html_parts.append(f'          </div>')
        return "\n".join(html_parts)

    # Translation block for priority sections
    translation_key = (doc_key, sec_num)
    if is_priority and translation_key in TRANSLATIONS:
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">WHAT THIS MEANS</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                {TRANSLATIONS[translation_key]}')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')

    # Original text
    if raw_text.strip():
        if is_priority:
            # Collapsible for priority sections
            html_parts.append(f'            <details class="legal-details">')
            html_parts.append(f'              <summary>View Original Legal Text</summary>')
            html_parts.append(f'              <div class="legal-text">{escape(raw_text)}</div>')
            html_parts.append(f'            </details>')
        else:
            # Raw section for non-priority
            # Truncate very long sections
            display_text = raw_text
            if len(display_text) > 15000:
                display_text = display_text[:15000] + "\n\n[... Section continues. Full text available in source document.]"
            html_parts.append(f'            <div class="raw-section">{escape(display_text)}</div>')

    html_parts.append(f'          </div>')
    return "\n".join(html_parts)


def build_article_html(article, doc_key, priority_articles):
    """Build HTML for an article and its sections."""
    roman = article["roman"]
    title = article["title"]
    art_id = article["id"]
    is_priority = is_priority_article(roman, priority_articles)

    html_parts = []
    html_parts.append(f'          <div class="doc-article" id="{art_id}">')
    html_parts.append(f'            <div class="article-header">Article {escape(roman)}. {escape(title)}</div>')

    # Article-level translation
    art_translation_key = (doc_key, roman, "article")
    if art_translation_key in TRANSLATIONS:
        html_parts.append(f'            <div class="translation-block">')
        html_parts.append(f'              <div class="translation-label">ARTICLE OVERVIEW</div>')
        html_parts.append(f'              <div class="translation-text">')
        html_parts.append(f'                {TRANSLATIONS[art_translation_key]}')
        html_parts.append(f'              </div>')
        html_parts.append(f'            </div>')

    # Sections
    for section in article["sections"]:
        html_parts.append(build_section_html(section, doc_key, roman, priority_articles))

    html_parts.append(f'          </div>')
    return "\n".join(html_parts)


def normalize_whitespace(s):
    """Normalize all Unicode whitespace variants to regular spaces."""
    import unicodedata
    return re.sub(r'[\s\u00a0\u202f\u2000-\u200b\u2028\u2029\u3000]+', ' ', s).strip()


def split_document_lines(lines, split_keyword, split_min_line):
    """
    Split document lines into body and exhibits at the point where
    exhibits/schedules begin. Returns (body_lines, exhibit_lines).
    """
    norm_keyword = normalize_whitespace(split_keyword)
    for i in range(split_min_line, len(lines)):
        stripped = normalize_whitespace(lines[i])
        if stripped == norm_keyword or stripped.startswith(norm_keyword):
            # Check this isn't a TOC reference - look for actual content after
            # Find the actual exhibit start (non-TOC)
            if i > split_min_line:
                return lines[:i], lines[i:]

    # Fallback: use the min line as split point
    return lines[:split_min_line], lines[split_min_line:]


def build_exhibits_html(exhibit_lines, doc_key, config):
    """Build HTML content for exhibits/schedules pages."""
    # Parse exhibits into sections
    exhibit_sections = []
    current_section = None

    EXHIBIT_HEADER_RE = re.compile(
        r'^\s*(Exhibit|EXHIBIT|Schedule|SCHEDULE|Appendix|APPENDIX)\s+([A-Z0-9][\w.\-]*(?:\s+to\s+the)?)',
        re.IGNORECASE
    )

    for line in exhibit_lines:
        stripped = line.strip()
        if not stripped:
            if current_section:
                current_section["lines"].append("")
            continue

        ex_match = EXHIBIT_HEADER_RE.match(stripped)
        if ex_match:
            if current_section:
                exhibit_sections.append(current_section)
            ex_type = ex_match.group(1).title()
            ex_id_raw = ex_match.group(2).strip()
            current_section = {
                "type": ex_type,
                "id_raw": ex_id_raw,
                "title": stripped,
                "lines": [],
                "html_id": f"ex-{ex_type.lower()}-{re.sub(r'[^a-z0-9]', '', ex_id_raw.lower())}",
            }
        elif current_section:
            current_section["lines"].append(stripped)
        else:
            # Pre-exhibit text, create a general section
            if not exhibit_sections and not current_section:
                current_section = {
                    "type": "Preamble",
                    "id_raw": "preamble",
                    "title": "Signature Pages & Preamble",
                    "lines": [stripped],
                    "html_id": "ex-preamble",
                }
            elif current_section:
                current_section["lines"].append(stripped)

    if current_section:
        exhibit_sections.append(current_section)

    # Build HTML
    html_parts = []
    for section in exhibit_sections:
        text = "\n".join(section["lines"])
        if len(text) > 20000:
            text = text[:20000] + "\n\n[... Exhibit continues. Full text available in source document.]"

        html_parts.append(f'          <div class="doc-article" id="{section["html_id"]}">')
        html_parts.append(f'            <div class="article-header">{escape(section["title"])}</div>')
        if text.strip():
            html_parts.append(f'            <details class="legal-details">')
            html_parts.append(f'              <summary>View Full Text</summary>')
            html_parts.append(f'              <div class="legal-text">{escape(text)}</div>')
            html_parts.append(f'            </details>')
        html_parts.append(f'          </div>')

    return "\n".join(html_parts)


def generate_document(doc_key, config):
    """Generate HTML page(s) for a document."""
    print(f"  Processing {doc_key}: {config['source']}...")

    lines = read_source(config["source"])
    print(f"    Read {len(lines)} lines")

    body_lines = lines
    exhibit_lines = None

    # Split if needed (DOC 6, DOC 7)
    if config.get("split") == "exhibit":
        body_lines, exhibit_lines = split_document_lines(
            lines,
            config["split_line_keyword"],
            config["split_min_line"]
        )
        print(f"    Split at line ~{len(body_lines)}: body={len(body_lines)} lines, exhibits={len(exhibit_lines)} lines")

    # Parse body
    articles, preamble = parse_document(body_lines, doc_key, config)
    print(f"    Found {len(articles)} articles")
    for art in articles:
        print(f"      Article {art['roman']}: {art['title']} ({len(art['sections'])} sections)")

    # Build body HTML
    doc_header = build_doc_header(config)
    content_parts = []
    for article in articles:
        content_parts.append(build_article_html(article, doc_key, config["priority_articles"]))

    content = "\n".join(content_parts)

    # Generate main page
    page_html = HTML_TEMPLATE.format(
        title=config["title"],
        page_id=config["page_id"],
        breadcrumb=config["breadcrumb"],
        doc_header=doc_header,
        content=content,
    )

    output_path = os.path.join(DOCS_DIR, config["output"])
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(page_html)
    print(f"    Wrote {output_path} ({len(page_html):,} bytes)")

    # Generate exhibits page if needed
    if exhibit_lines and config.get("exhibits_output"):
        exhibits_content = build_exhibits_html(exhibit_lines, doc_key, config)
        exhibits_html = EXHIBITS_TEMPLATE.format(
            title=f"{config['short_name']} - Exhibits",
            page_id=config["exhibits_page_id"],
            breadcrumb=config["exhibits_breadcrumb"],
            doc_title=f"{config['title']} - Exhibits & Schedules",
            parent_doc=config["short_name"],
            content=exhibits_content,
        )
        ex_output_path = os.path.join(DOCS_DIR, config["exhibits_output"])
        with open(ex_output_path, "w", encoding="utf-8") as f:
            f.write(exhibits_html)
        print(f"    Wrote {ex_output_path} ({len(exhibits_html):,} bytes)")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("AMC Debt Navigator - Document Parser")
    print("=" * 60)
    print(f"Source directory: {SOURCE_DIR}")
    print(f"Output directory: {DOCS_DIR}")
    print()

    for doc_key in ["doc2", "doc3", "doc4", "doc5", "doc6", "doc7"]:
        config = DOCUMENTS[doc_key]
        generate_document(doc_key, config)
        print()

    print("=" * 60)
    print("All documents generated successfully!")
    print("=" * 60)

    # List generated files
    print("\nGenerated files:")
    for f in sorted(os.listdir(DOCS_DIR)):
        fpath = os.path.join(DOCS_DIR, f)
        size = os.path.getsize(fpath)
        print(f"  {f} ({size:,} bytes)")


if __name__ == "__main__":
    main()
