/**
 * Regenerates scripts/data/procurement-blog-posts.mjs
 * Voice rule: each article must read as if written in that month (present tense),
 * never as a retrospective written "today".
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function u(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&h=788&q=85`;
}

/** Rotating free Unsplash covers — IDs verified against images.unsplash.com. */
const COVER_IDS = [
  "photo-1454165804606-c3d57bc86b40",
  "photo-1460925895917-afdab827c52f",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1497366216548-37526070297c",
  "photo-1504384308090-c894fdcc538d",
  "photo-1507679799987-c73779587ccf",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1519389950473-47ba0277781c",
  "photo-1521737711867-e3b97375f902",
  "photo-1522071820081-009f0129c71c",
  "photo-1552664730-d307ca884978",
  "photo-1553877522-43269d4ea984",
  "photo-1556761175-b413da4baf72",
  "photo-1557804506-669a67965ba0",
  "photo-1558494949-ef010cbdcc31",
  "photo-1560472354-b33ff0c44a43",
  "photo-1581092160562-40aa08e78837",
  "photo-1586528116311-ad8dd3c8310d",
  "photo-1600880292203-757bb62b4baf",
  "photo-1677442136019-21780ecad995",
  "photo-1451187580459-43490279c0fa",
  "photo-1461749280684-dccba630e2f6",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1498050108023-c5249f4df085",
  "photo-1512941937669-90a1b58e7e9c",
  "photo-1551650975-87deedd944c3",
  "photo-1551288049-bebda4e38f71",
  "photo-1544197150-b99a580bb7a8",
  "photo-1551434678-e076c223a692",
  "photo-1521791136064-7986c2920216",
];

const FALLBACK_COVER = u("photo-1454165804606-c3d57bc86b40");

/**
 * [y, m, slug, enTitle, enLead, svTitle, svLead, enBodyParts, svBodyParts]
 * Body parts: { h2, p }[] — present-tense contemporary voice.
 */
const catalog = [
  [2022, 2, "ukraine-war-supply-risk-public-contracts",
    "War in Europe and supply risk in public contracts",
    "Overnight, buyers are rewriting delivery assumptions. Security of supply is no longer a side clause — it is the conversation in every clarification meeting.",
    "Kriget i Europa och leveransrisk i offentliga kontrakt",
    "Över en natt skriver köpare om sina leveransantaganden. Försörjningstrygghet är inte längre en sidoklausul — det är samtalet i varje frågemöte.",
    [
      { h2: "What is changing this week", p: "Geopolitical shock is hitting live tenders. Fuel, materials and logistics risk sit outside what many fixed-price documents assumed. Buyers are asking suppliers for substitution options and clearer delivery evidence — now, not at award." },
      { h2: "Force majeure is suddenly practical", p: "Teams are opening contracts and checking what “impossible delivery” actually means. Equal treatment still applies: the same clarification goes to every participant through public Q&A, not private email threads." },
      { h2: "Systems that help right now", p: "A single e-procurement workspace with searchable suppliers, logged Q&A and document versions keeps the audit trail intact while the market moves. Spreadsheet chaos is the expensive alternative." },
      { h2: "What to do in your next tender", p: "Tighten delivery questions, document risk sharing early, and keep every supplier answer visible. Transparent process beats improvised inbox decisions." },
    ],
    [
      { h2: "Vad som förändras den här veckan", p: "Den geopolitiska chocken träffar pågående upphandlingar. Bränsle-, material- och logistikrisk ligger utanför vad många fastprisdokument antog. Köpare ber leverantörer om substitutionsmöjligheter och tydligare leveransbevis — nu, inte vid tilldelning." },
      { h2: "Force majeure blir plötsligt praktiskt", p: "Team öppnar kontrakt och kollar vad “omöjlig leverans” egentligen betyder. Likabehandling gäller fortfarande: samma förtydligande går till alla deltagare via offentlig Q&A, inte privata e-posttrådar." },
      { h2: "System som hjälper just nu", p: "En enda e-upphandlingsyta med sökbara leverantörer, loggad Q&A och dokumentversioner håller revisionsspåret intakt medan marknaden rör sig. Kalkylarkskaos är det dyra alternativet." },
      { h2: "Vad ni gör i nästa upphandling", p: "Skärp leveransfrågorna, dokumentera riskdelning tidigt och håll varje leverantörssvar synligt. Transparent process slår improviserade inkorgsbeslut." },
    ]],
  [2022, 3, "post-pandemic-digital-tendering-habits",
    "Digital tendering is no longer a temporary workaround",
    "Remote evaluation and electronic submission are how teams work this spring — the question is whether tools match the new habit.",
    "Digital upphandling är inte längre en tillfällig lösning",
    "Distansutvärdering och elektronisk inlämning är hur teamen arbetar i vår — frågan är om verktygen hänger med vanan.",
    [
      { h2: "The new baseline", p: "Procurement teams are not waiting to “go back to paper.” Submissions, clarifications and evaluation meetings run digitally every week. Suppliers expect the same channel for every update." },
      { h2: "Where friction shows up", p: "Authorities still mixing portals, email and shared folders create duplicate uploads and version confusion. That is not a small annoyance — it slows awards and weakens the audit trail." },
      { h2: "One process beats five tools", p: "A structured e-procurement system with roles, public Q&A and clear document ownership costs less than patching temporary workarounds forever." },
      { h2: "Action for this month", p: "Pick a single source of truth for each live tender. Train the team on that path before the next publication wave." },
    ],
    [
      { h2: "Den nya basnivån", p: "Upphandlingsteam väntar inte på att “gå tillbaka till papper”. Inlämning, förtydliganden och utvärderingsmöten körs digitalt varje vecka. Leverantörer förväntar sig samma kanal för varje uppdatering." },
      { h2: "Var friktionen syns", p: "Myndigheter som fortfarande blandar portaler, e-post och delade mappar skapar dubbeluppladdningar och versionsförvirring. Det är inte ett litet irritationsmoment — det saktar ner tilldelningar och försvagar revisionsspåret." },
      { h2: "En process slår fem verktyg", p: "Ett strukturerat e-upphandlingssystem med roller, offentlig Q&A och tydligt dokumentägande kostar mindre än att lappa tillfälliga lösningar för alltid." },
      { h2: "Åtgärd den här månaden", p: "Välj en enda sanning för varje pågående upphandling. Träna teamet på den vägen före nästa publiceringsvåg." },
    ]],
  [2022, 4, "inflation-price-adjustment-public-contracts",
    "Inflation is rewriting price risk in public contracts",
    "Fixed-price assumptions are under pressure. Buyers and suppliers need clearer index language and better contract follow-up — this quarter, not next year.",
    "Inflationen skriver om prisrisken i offentliga kontrakt",
    "Fastprisantaganden är under press. Köpare och leverantörer behöver tydligare indexspråk och bättre kontraktsuppföljning — det här kvartalet, inte nästa år.",
    [
      { h2: "Why fixed prices hurt now", p: "Input costs are moving faster than tender calendars. Suppliers are flagging risk in clarifications; buyers are deciding what can be indexed without breaking equal treatment." },
      { h2: "Dialogue must stay transparent", p: "Price questions belong in public Q&A. Private renegotiation by email creates uneven information and audit risk." },
      { h2: "Contract management is part of procurement", p: "The job does not end at award. Teams need a place to track clauses, amendments and supplier messages after signature." },
      { h2: "Practical next step", p: "Review open frameworks for index wording, and align your next notice with how you will actually manage change." },
    ],
    [
      { h2: "Varför fastpris gör ont nu", p: "Insatspriserna rör sig snabbare än upphandlingskalendrar. Leverantörer flaggar risk i frågor; köpare avgör vad som kan indexeras utan att bryta likabehandling." },
      { h2: "Dialogen måste vara transparent", p: "Prisfrågor hör hemma i offentlig Q&A. Privat omförhandling via e-post skapar ojämn information och revisionsrisk." },
      { h2: "Kontraktsstyrning är en del av upphandlingen", p: "Jobbet tar inte slut vid tilldelning. Team behöver en plats för klausuler, ändringar och leverantörsmeddelanden efter signering." },
      { h2: "Praktiskt nästa steg", p: "Gå igenom öppna ramavtal för indexformuleringar och anpassa nästa annons till hur ni faktiskt ska hantera förändring." },
    ]],
];

// For remaining months, use themed contemporary templates built from structured briefs
const briefs = [
  [2022, 5, "green-procurement-requirements-hardening", "Green criteria are becoming measurable requirements", "Sustainability wording is leaving the brochure and entering award criteria. Suppliers need evidence, not slogans.", "Gröna kriterier blir mätbara krav", "Hållbarhetsformuleringar lämnar broschyren och går in i tilldelningskriterier. Leverantörer behöver bevis, inte sloganer.", "sustainability", "award criteria", "verification evidence"],
  [2022, 6, "midyear-cpv-search-supplier-discovery", "Finding the right suppliers still takes too long", "Mid-year market research is exposing weak CPV discipline. Better search beats longer supplier lists.", "Att hitta rätt leverantörer tar fortfarande för lång tid", "Halvårets marknadsanalys visar svag CPV-disciplin. Bättre sök slår längre leverantörslistor.", "CPV search", "supplier discovery", "NUTS and keywords"],
  [2022, 7, "summer-capacity-and-bid-quality", "Holiday capacity is testing your tender process", "When key people are away, manual handovers fail. Process design shows its quality in July.", "Semesterkapacitet testar upphandlingsprocessen", "När nyckelpersoner är borta fallerar manuella överlämningar. Processdesign visar sin kvalitet i juli.", "handover", "capacity planning", "e-procurement routines"],
  [2022, 8, "preparing-autumn-tender-wave", "Autumn tenders are already in the pipeline", "August planning decides whether Q4 feels controlled or chaotic. Alerts and ownership beat last-minute scramble.", "Höstens upphandlingar ligger redan i pipen", "Augustiplanering avgör om Q4 känns kontrollerat eller kaotiskt. Aviseringar och ägarskap slår sista-minuten-stress.", "pipeline planning", "publication calendar", "resource alerts"],
  [2022, 9, "municipal-procurement-season-starts", "Municipal publishing is accelerating this month", "Concurrent deadlines are stacking up. Collaboration tools and document versioning decide who keeps pace.", "Kommunernas publicering accelererar den här månaden", "Samtidiga deadlines staplas. Samarbetsverktyg och versionshantering avgör vem som hänger med.", "municipal deadlines", "team collaboration", "document versions"],
  [2022, 10, "energy-crisis-and-public-purchasing", "Energy costs are reshaping purchasing priorities", "Buyers are balancing price, security of supply and contract length in the same evaluation conversation.", "Energikostnader omformar inköpsprioriteringarna", "Köpare balanserar pris, försörjningstrygghet och avtalstid i samma utvärderingssamtal.", "energy risk", "framework call-offs", "market dialogue"],
  [2022, 11, "budget-season-transparency-expectations", "Budget season raises the bar on transparency", "Controllers want clearer trails from need to award. Documentation is a delivery requirement, not admin afterthought.", "Budgetsäsongen höjer ribban för transparens", "Controllers vill ha tydligare spår från behov till tilldelning. Dokumentation är ett leveranskrav, inte efterarbete.", "audit trail", "LOU documentation", "budget scrutiny"],
  [2022, 12, "year-end-awards-and-lessons", "Year-end awards: keep the process clean to the finish", "December awards still need equal treatment and clear Q&A. Finish strong — do not invent shortcuts for speed.", "Årets tilldelningar: håll processen ren till slut", "Decembertilldelningar kräver fortfarande likabehandling och tydlig Q&A. Avsluta starkt — hitta inte på genvägar för tempo.", "award discipline", "public Q&A", "year-end workload"],

  [2023, 1, "chatgpt-moment-procurement-documents", "Generative AI is entering tender drafting this month", "Teams are asking what is allowed when AI helps write documents. Policy and human review must travel together.", "Generativ AI kommer in i upphandlingsskrivandet den här månaden", "Team frågar vad som är tillåtet när AI hjälper till att skriva dokument. Policy och mänsklig granskning måste följas åt.", "AI drafting", "review rules", "quality control"],
  [2023, 2, "one-year-on-supply-chain-resilience", "Resilience criteria are showing up in live requirements", "Supply-chain lessons from last year are now written into specifications. Evaluation needs evidence, not hope.", "Resilienskriterier syns i aktuella krav", "Lärdomar om leveranskedjor från förra året skrivs nu in i förfrågningsunderlag. Utvärdering kräver bevis, inte förhoppningar.", "resilience requirements", "supplier evidence", "evaluation"],
  [2023, 3, "cybersecurity-in-e-procurement-platforms", "Cybersecurity belongs inside the procurement platform", "Access control, logging and secure messaging are procurement issues this spring — not only IT policy slides.", "Cybersäkerhet hör hemma i upphandlingsplattformen", "Åtkomstkontroll, loggning och säkra meddelanden är upphandlingsfrågor i vår — inte bara IT-policyslides.", "access control", "secure messaging", "audit logs"],
  [2023, 4, "dynamic-purchasing-systems-gain-ground", "Dynamic purchasing is moving from theory to practice", "More authorities are preparing DIS for repeat buys. Pre-qualification is the enabler — not optional paperwork.", "Dynamiskt inköp går från teori till praktik", "Fler myndigheter förbereder DIS för återkommande köp. Förkvalificering är möjliggöraren — inte valfri pappersarbete.", "DIS readiness", "pre-qualification", "two-step procedures"],
  [2023, 5, "supplier-qualification-vs-lowest-price", "Qualification is not red tape — it is delivery insurance", "Lowest price without verification keeps failing in operations. Qualification pools are how buyers reduce that risk.", "Kvalificering är inte byråkrati — det är leveransförsäkring", "Lägsta pris utan verifiering fortsätter att misslyckas i drift. Kvalificeringspooler är hur köpare minskar den risken.", "supplier qualification", "quality vs price", "approved pools"],
  [2023, 6, "public-qa-beats-email-threads", "Keep clarifications public — equal treatment depends on it", "Private email threads recreate information asymmetry. Public Q&A is the compliant default for every live tender.", "Håll förtydliganden offentliga — likabehandling beror på det", "Privata e-posttrådar skapar informationsasymmetri. Offentlig Q&A är den regelrätta standarden i varje pågående upphandling.", "public Q&A", "equal treatment", "clarifications"],
  [2023, 7, "summer-maintenance-of-supplier-pools", "Use the quiet weeks to clean the supplier pool", "Certificates expire quietly. July is the month to re-check data before autumn DIS rounds and search quality collapse.", "Använd de lugna veckorna till att städa leverantörspoolen", "Intyg går ut tyst. Juli är månaden att kontrollera data före höstens DIS-omgångar och sökkaos.", "certificate refresh", "data quality", "DIS prep"],
  [2023, 8, "ai-assisted-writing-guardrails", "AI drafting helps — only with guardrails", "Pilots show speed gains and new error modes. Approve tools, require human sign-off, and keep sources controllable.", "AI-skrivande hjälper — bara med ramar", "Piloter visar tempo och nya feltyper. Godkänn verktyg, kräv mänskligt godkännande och håll källor kontrollerbara.", "AI governance", "human review", "templates"],
  [2023, 9, "back-to-school-procurement-load", "School-year purchasing is peaking again", "Municipal teams feel the load now. Fragmented tools turn a busy season into a brittle one.", "Skolårets inköp toppar igen", "Kommunala team känner belastningen nu. Fragmenterade verktyg gör en hektisk säsong skör.", "municipal workload", "shared workspace", "deadline control"],
  [2023, 10, "framework-agreements-under-scrutiny", "Framework call-offs are under closer control", "Auditors are asking harder questions about documentation and supplier performance on active frameworks.", "Ramavtalsavrop granskas hårdare", "Revisorer ställer tuffare frågor om dokumentation och leverantörsprestanda på aktiva ramavtal.", "call-off control", "performance logs", "framework hygiene"],
  [2023, 11, "preparing-2024-digital-procurement-budgets", "Budget talks must include platform consolidation", "Headcount alone will not fix tool sprawl. Licence, training and one connected workflow belong in the 2024 ask.", "Budgetsamtal måste inkludera plattformskonsolidering", "Enbart bemanning fixar inte verktygsspridning. Licens, utbildning och ett sammanhållet flöde hör hemma i 2024-äskandet.", "budget for platforms", "training", "ROI of consolidation"],
  [2023, 12, "2023-wrap-ai-dis-and-discipline", "Close the year with process discipline, not experiments alone", "AI curiosity and DIS interest are useful — only if documentation and equal treatment stay sharp through December awards.", "Avsluta året med processdisciplin, inte bara experiment", "AI-nyfikenhet och DIS-intresse är användbart — bara om dokumentation och likabehandling hålls skarpa genom decembertilldelningar.", "year-end awards", "DIS interest", "AI caution"],

  [2024, 1, "new-year-procurement-operating-models", "Rebuild roles around the platform, not the inbox", "January is the moment to redefine ownership: who publishes, who answers Q&A, who awards — inside one system.", "Bygg om roller kring plattformen, inte inkorg", "Januari är läget att omdefiniera ägarskap: vem publicerar, vem svarar i Q&A, vem tilldelar — i ett system.", "operating model", "role clarity", "platform first"],
  [2024, 2, "eu-digital-decade-and-swedish-buyers", "Digital policy meets municipal reality this month", "Ambition is high; many teams still juggle portals. Integration and usable workflows decide whether policy lands.", "Digital policy möter kommunal vardag den här månaden", "Ambitionen är hög; många team jonglerar fortfarande portaler. Integration och användbara flöden avgör om policyn landar.", "digitalisation", "municipal systems", "usable workflows"],
  [2024, 3, "live-chat-after-award-gains-interest", "Post-award email chaos has a cost — chat is the fix", "After award, teams lose time in scattered threads. Live chat with the winning supplier keeps handover moving.", "E-postkaos efter tilldelning kostar — chatt är lösningen", "Efter tilldelning försvinner tid i utspridda trådar. Livechatt med vinnande leverantör håller överlämningen igång.", "post-award chat", "handover speed", "supplier collaboration"],
  [2024, 4, "ai-summaries-of-tender-packs", "AI summaries help scan packs — review is mandatory", "Large document sets are everywhere this spring. Summaries save hours; unchecked summaries create new risk.", "AI-sammanfattningar hjälper skanna paket — granskning är obligatorisk", "Stora dokumentmängder syns överallt i vår. Sammanfattningar sparar timmar; ogranskade sammanfattningar skapar ny risk.", "AI summary", "document packs", "mandatory review"],
  [2024, 5, "equal-treatment-in-digital-channels", "Every digital channel must deliver the same information", "Chat, portal and email cannot tell different stories. Compliance is checking channel consistency on live tenders.", "Varje digital kanal måste ge samma information", "Chat, portal och e-post får inte berätta olika historier. Compliance är att kolla kanalkonsistens i pågående upphandlingar.", "channel consistency", "equal treatment", "compliance checks"],
  [2024, 6, "eu-elections-and-procurement-priorities", "Policy themes are shaping what buyers emphasise now", "Sustainability and industrial priorities show up in dialogue and criteria. Keep evaluation measurable and fair.", "Politiska teman formar vad köpare betonar nu", "Hållbarhet och industriella prioriteringar syns i dialog och kriterier. Håll utvärderingen mätbar och rättvis.", "policy priorities", "measurable criteria", "fair evaluation"],
  [2024, 7, "midsummer-pause-for-process-cleanup", "Quiet weeks are for templates and archives", "Use the pause to archive closed tenders and improve templates before autumn volume returns.", "Lugna veckor är till för mallar och arkiv", "Använd pausen till att arkivera avslutade upphandlingar och förbättra mallar innan höstvolymen kommer tillbaka.", "templates", "archive hygiene", "continuous improvement"],
  [2024, 8, "supplier-onboarding-friction", "SME onboarding is still dropping mid-form", "Lengthy forms and unclear status kill participation. Status tracking and lighter first steps fix real market access.", "SME-onboarding avbryts fortfarande mitt i formuläret", "Långa formulär och otydlig status dödar deltagande. Statusspårning och lättare första steg fixar verklig marknadstillgång.", "SME onboarding", "status clarity", "shorter forms"],
  [2024, 9, "autumn-surge-and-platform-reliability", "Peak publishing is testing platform reliability now", "Timeouts and lost versions are unacceptable in September. Reliability is a procurement requirement.", "Topppublicering testar plattformars tillförlitlighet nu", "Timeouts och tappade versioner är oacceptabla i september. Tillförlitlighet är ett upphandlingskrav.", "platform reliability", "document integrity", "peak load"],
  [2024, 10, "measuring-procurement-cycle-time", "Start measuring cycle time on live work", "Days from need to award, clarification volume and response rates are the metrics that improve next month’s work.", "Börja mäta ledtid i pågående arbete", "Dagar från behov till tilldelning, frågevolym och svarsfrekvens är mätetal som förbättrar nästa månads arbete.", "cycle-time KPI", "clarification volume", "response rates"],
  [2024, 11, "consolidating-procurement-tool-stacks", "Overlapping licences are on the table this budget round", "Notice portals, DMS and messaging rarely need three vendors. Consolidation frees money for better process.", "Överlappande licenser ligger på bordet i den här budgetrundan", "Annonsportaler, dokumenthantering och meddelanden behöver sällan tre leverantörer. Konsolidering frigör pengar till bättre process.", "licence overlap", "consolidation", "one workflow"],
  [2024, 12, "2024-in-review-connected-lifecycle", "Finish the year by connecting planning to follow-up", "Awards alone are not enough. Connect planning, tendering, award and post-award collaboration before January.", "Avsluta året genom att koppla planering till uppföljning", "Tilldelning ensamt räcker inte. Koppla planering, upphandling, tilldelning och samarbete efter tilldelning före januari.", "connected lifecycle", "post-award", "year-end focus"],

  [2025, 1, "ai-procurement-moves-from-pilot-to-policy", "Write the AI rules before the next pilot expands", "Drafting and summarising need approved use cases and review owners. Policy first — then scale.", "Skriv AI-reglerna innan nästa pilot växer", "Skrivande och sammanfattning behöver godkända användningsfall och granskningsägare. Policy först — sedan skala.", "AI policy", "approved use cases", "review owners"],
  [2025, 2, "qualification-data-that-stays-current", "Expired certificates are an award risk this month", "Annual re-verification is operational work. Stale pools make searchable suppliers unsafe to invite.", "Utgångna intyg är en tilldelningsrisk den här månaden", "Årlig omprövning är driftsarbete. Gamla pooler gör sökbara leverantörer osäkra att bjuda in.", "re-verification", "certificate expiry", "safe invitation"],
  [2025, 3, "nuts-and-local-supplier-strategies", "Location-aware search is shaping invitations now", "NUTS-aware discovery helps balance local capacity with fair competition — when profiles stay accurate.", "Platskänslig sökning formar inbjudningar nu", "NUTS-medveten discovery hjälper balansera lokal kapacitet med rättvis konkurrens — när profiler hålls korrekta.", "NUTS search", "local markets", "fair competition"],
  [2025, 4, "dis-playbooks-for-repeat-purchases", "Publish a DIS playbook before the next repeat buy", "Teams need a clear rule: when DIS beats open procedure for speed without losing control.", "Publicera en DIS-handbok före nästa återkommande köp", "Team behöver en tydlig regel: när DIS slår öppet förfarande i tempo utan att tappa kontroll.", "DIS playbook", "repeat purchases", "control vs speed"],
  [2025, 5, "buyer-supplier-messaging-standards", "Separate Q&A rules from post-award chat rules", "Both need logs. Mixing them creates compliance noise. Define standards and stick to them on live work.", "Separera Q&A-regler från chattregler efter tilldelning", "Båda behöver loggar. Att blanda dem skapar compliance-brus. Definiera standarder och håll er till dem i pågående arbete.", "messaging standards", "Q&A vs chat", "logging"],
  [2025, 6, "midyear-skills-gap-in-e-procurement", "Hire for digital procedure skills, not only legal depth", "Mid-year hiring should value people who can run the platform end to end — publication to award.", "Rekrytera för digitala förfarandekompetenser, inte bara juridisk djup", "Halvårets rekrytering bör värdera personer som kan köra plattformen från början till slut — publicering till tilldelning.", "skills gap", "platform operators", "training plans"],
  [2025, 7, "quiet-months-for-supplier-enablement", "Enable SMEs while the calendar is quieter", "Guidance, status tracking and lighter first-time qualification expand the market before autumn peaks.", "Möjliggör för SME:er medan kalendern är lugnare", "Vägledning, statusspårning och lättare förstagångskvalificering breddar marknaden före hösttoppar.", "SME enablement", "onboarding UX", "quiet-month work"],
  [2025, 8, "ai-matching-expectations-vs-reality", "AI matching only works with honest company profiles", "Opportunity noise usually means weak CPV and profile data. Fix inputs before blaming the model.", "AI-matchning fungerar bara med ärliga företagsprofiler", "Brus i möjligheter betyder oftast svag CPV- och profildata. Fixa indata innan ni skyller på modellen.", "AI matching", "profile quality", "CPV hygiene"],
  [2025, 9, "school-year-purchasing-with-less-chaos", "One platform keeps autumn clarifications findable", "Municipal peak season is here. Teams on a single system lose fewer questions in the rush.", "En plattform håller höstens förtydliganden sökbara", "Kommunal toppsäsong är här. Team på ett system tappar färre frågor i rusningen.", "autumn peak", "single platform", "findable Q&A"],
  [2025, 10, "contract-follow-up-after-digital-award", "The first 90 days after award matter as much as award day", "Shift attention to delivery collaboration now. Live chat beats inbox archaeology for early issues.", "De första 90 dagarna efter tilldelning spelar lika stor roll som tilldelningsdagen", "Flytta fokus till leveranssamarbete nu. Livechatt slår inkorgsarkeologi för tidiga frågor.", "post-award follow-up", "first 90 days", "live chat"],
  [2025, 11, "preparing-2026-platform-roadmaps", "Align AI, DIS and supplier data on one roadmap", "Product and procurement leaders should share priorities before year-end budget locks.", "Samordna AI, DIS och leverantörsdata på en roadmap", "Produkt- och upphandlingsledare bör dela prioriteringar innan årsskiftesbudgeten låses.", "shared roadmap", "AI + DIS", "supplier data"],
  [2025, 12, "2025-closing-connected-public-markets", "Close the year insisting on shared digital infrastructure", "Buyers and suppliers both need one trustworthy place to meet. That is the December priority.", "Avsluta året med krav på gemensam digital infrastruktur", "Köpare och leverantörer behöver båda en trovärdig plats att mötas. Det är prioriteten i december.", "shared infrastructure", "buyer-supplier meet", "year-end priority"],

  [2026, 1, "new-year-operating-rhythm-for-platforms", "Set the 2026 operating cadence this month", "Release notes, re-verification cycles and AI prompt libraries need owners and dates — starting now.", "Sätt 2026 års driftstakt den här månaden", "Releasenotes, omprövningscykler och AI-promptbibliotek behöver ägare och datum — med start nu.", "operating cadence", "re-verification cycle", "prompt libraries"],
  [2026, 2, "four-years-since-the-shock", "Resilience habits are permanent requirements now", "Four years after the 2022 shock, delivery risk questions are standard. Keep them measurable in every notice.", "Resiliensvanor är permanenta krav nu", "Fyra år efter 2022-chocken är leveransriskfrågor standard. Håll dem mätbara i varje annons.", "resilience as standard", "measurable risk questions", "live tenders"],
  [2026, 3, "practical-ai-in-swedish-e-procurement", "AI is common — LOU/LUF fit is the differentiator", "Drafting and summaries are everywhere. Governance aligned to Swedish procedure is what separates safe use from risk.", "AI är vanligt — LOU/LUF-passform är skillnaden", "Skrivande och sammanfattningar finns överallt. Styrning anpassad till svensk procedur skiljer säker användning från risk.", "AI + LOU/LUF", "safe drafting", "governance"],
  [2026, 4, "supplier-pools-as-strategic-assets", "Treat the qualified pool as a living asset", "Searchable, verified, DIS-ready suppliers are strategic capacity. Maintain them like inventory that decides awards.", "Behandla den kvalificerade poolen som en levande tillgång", "Sökbara, verifierade, DIS-redo leverantörer är strategisk kapacitet. Underhåll dem som lager som avgör tilldelningar.", "supplier pool asset", "DIS-ready", "ongoing verification"],
  [2026, 5, "from-notices-to-operating-system", "Buyers want workflow, not another notice board", "End-to-end process — from research to follow-up — is the ask this month. Notices alone are not enough.", "Köpare vill ha arbetsflöde, inte ännu en anslagstavla", "Helhetsprocess — från analys till uppföljning — är önskemålet den här månaden. Enbart annonser räcker inte.", "end-to-end workflow", "beyond notices", "buyer demand"],
  [2026, 6, "midyear-transparency-and-speed", "Refuse the false choice between speed and transparency", "Public Q&A plus automation makes both possible on live work. Pick tools that support that combination.", "Vägra det falska valet mellan tempo och transparens", "Offentlig Q&A plus automation gör båda möjliga i pågående arbete. Välj verktyg som stödjer den kombinationen.", "speed + transparency", "public Q&A", "automation"],
  [2026, 7, "summer-readiness-for-autumn-volume", "Run readiness checks before autumn volume hits", "Capacity, templates, supplier status and platform performance belong on a July checklist.", "Kör beredskapskontroller innan höstvolymen slår till", "Kapacitet, mallar, leverantörsstatus och plattformsprestanda hör hemma på en julichecklista.", "readiness checklist", "capacity", "platform health"],
  [2026, 8, "sme-access-still-defines-fair-markets", "Fair markets start with usable onboarding", "Free account start, clear status and proportionate requirements are how SMEs actually enter public business.", "Rättvisa marknader börjar med användbar onboarding", "Gratis kontostart, tydlig status och proportionerliga krav är hur SME:er faktiskt kommer in i offentliga affärer.", "SME access", "free account start", "proportionate requirements"],
  [2026, 9, "autumn-2026-procurement-peaks", "Peak season is here — connected tools keep it calmer", "Volume is unavoidable. Fragmentation is optional. Keep clarifications and documents in one place.", "Toppsäsongen är här — sammanhållna verktyg håller den lugnare", "Volym är oundviklig. Fragmentering är valfri. Håll förtydliganden och dokument på ett ställe.", "peak season", "connected tools", "calm operations"],
  [2026, 10, "looking-ahead-connected-swedish-procurement", "What good looks like in Swedish e-procurement right now", "AI-assisted drafting, qualification-ready pools and clear buyer–supplier workflows are the standard to demand this autumn.", "Så ser bra svensk e-upphandling ut just nu", "AI-stött skrivande, kvalificeringsredo pooler och tydliga köpare–leverantör-flöden är standarden att kräva i höst.", "connected procurement", "AI assistance", "qualification-ready"],
];

function weekdayPublish(y, m) {
  let d = new Date(Date.UTC(y, m - 1, 15, 9, 0, 0));
  const day = d.getUTCDay();
  if (day === 0) d.setUTCDate(d.getUTCDate() + 1);
  if (day === 6) d.setUTCDate(d.getUTCDate() + 2);
  const offset = m >= 3 && m <= 10 ? "+02:00" : "+01:00";
  return `${d.toISOString().slice(0, 10)}T10:00:00${offset}`;
}

function renderSections(sections) {
  return sections
    .map((s) => `<h2>${s.h2}</h2>\n<p>${s.p}</p>`)
    .join("\n");
}

function fromManual(entry, index) {
  const [y, m, slug, title, excerpt, titleSv, excerptSv, sectionsEn, sectionsSv] = entry;
  return {
    slug: `${y}-${String(m).padStart(2, "0")}-${slug}`,
    publishedAt: weekdayPublish(y, m),
    imageUrl: u(COVER_IDS[index % COVER_IDS.length]) || FALLBACK_COVER,
    title,
    excerpt,
    content: `<p>${excerpt}</p>\n${renderSections(sectionsEn)}`,
    titleSv,
    excerptSv,
    contentSv: `<p>${excerptSv}</p>\n${renderSections(sectionsSv)}`,
  };
}

function fromBrief(brief, index) {
  const [y, m, slug, title, excerpt, titleSv, excerptSv, a, b, c] = brief;
  const sectionsEn = [
    { h2: `What teams are dealing with now`, p: `Right now, procurement work centres on <strong>${a}</strong>. It shows up in live clarifications, evaluation meetings and supplier messages — not in abstract strategy decks.` },
    { h2: `How ${b} shows up in the process`, p: `Buyers who treat <strong>${b}</strong> as a daily operating need move faster with fewer disputes. Spreadsheets and private inboxes recreate uneven information and weak trails.` },
    { h2: `Why ${c} belongs in the system`, p: `Platforms that support <strong>${c}</strong> reduce rework: searchable suppliers, public Q&amp;A, guided workflows and logged decisions. Missing capability turns into overtime and failed deliveries.` },
    { h2: `What to do on the next tender`, p: `Apply the lesson immediately: tighten questions, keep answers public, and keep documents in one place before the next publication deadline.` },
  ];
  const sectionsSv = [
    { h2: `Vad teamen hanterar just nu`, p: `Just nu centrerar upphandlingsarbetet kring <strong>${a}</strong>. Det syns i aktuella förtydliganden, utvärderingsmöten och leverantörsmeddelanden — inte i abstrakta strategideck.` },
    { h2: `Hur ${b} syns i processen`, p: `Köpare som behandlar <strong>${b}</strong> som ett dagligt driftsbehov rör sig snabbare med färre tvister. Kalkylark och privata inkorgar återskapar ojämn information och svaga spår.` },
    { h2: `Varför ${c} hör hemma i systemet`, p: `Plattformar som stödjer <strong>${c}</strong> minskar omarbete: sökbara leverantörer, offentlig Q&amp;A, guidade flöden och loggade beslut. Saknad kapacitet blir övertid och misslyckade leveranser.` },
    { h2: `Vad ni gör i nästa upphandling`, p: `Tillämpa lärdomen direkt: skärp frågorna, håll svaren offentliga och håll dokumenten på ett ställe före nästa publiceringsdeadline.` },
  ];
  return {
    slug: `${y}-${String(m).padStart(2, "0")}-${slug}`,
    publishedAt: weekdayPublish(y, m),
    imageUrl: u(COVER_IDS[index % COVER_IDS.length]) || FALLBACK_COVER,
    title,
    excerpt,
    content: `<p>${excerpt}</p>\n${renderSections(sectionsEn)}`,
    titleSv,
    excerptSv,
    contentSv: `<p>${excerptSv}</p>\n${renderSections(sectionsSv)}`,
  };
}

const posts = [
  ...catalog.map((entry, i) => fromManual(entry, i)),
  ...briefs.map((brief, i) => fromBrief(brief, catalog.length + i)),
];

const outPath = path.join(__dirname, "data", "procurement-blog-posts.mjs");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  `/** Procurement insight posts: one per month Feb 2022–Oct 2026.\n * Written in contemporary voice for each publish month (not retrospective).\n * Free Unsplash cover URLs in imageUrl.\n */\nexport const procurementBlogPosts = ${JSON.stringify(posts, null, 2)};\n`,
);

console.log(`Wrote ${posts.length} posts → ${outPath}`);
console.log(`First: ${posts[0].slug}`);
console.log(`Last:  ${posts[posts.length - 1].slug}`);
console.log(`Sample open:`, posts[0].content.slice(0, 180).replace(/\n/g, " "));
