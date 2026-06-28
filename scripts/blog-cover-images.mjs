/** Tech-themed Unsplash covers — unique, topic-matched images per blog slug. */
function u(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&h=788&q=85`;
}

/** @type {Record<string, string>} */
export const BLOG_COVER_BY_SLUG = {
  "2022-web-and-mobile-applications": u("photo-1512941937669-90a1b58e7e9c"),
  "2022-custom-software-solutions": u("photo-1461749280684-dccba630e2f6"),
  "2022-ui-ux-design-practices": u("photo-1551650975-87deedd944c3"),
  "2022-cloud-solutions-migration": u("photo-1451187580459-43490279c0fa"),
  "2022-system-integration-apis": u("photo-1526374965328-7f61d4dc18c5"),
  "2022-legacy-modernization-paths": u("photo-1450101499163-c8848c66ca85"),
  "2022-ai-solutions-practical-ml": u("photo-1677442136019-21780ecad995"),
  "2022-data-analytics-insights": u("photo-1551288049-bebda4e38f71"),
  "2022-dedicated-teams-model": u("photo-1522071820081-009f0129c71c"),
  "2022-it-consulting-roadmaps": u("photo-1600880292203-757bb62b4baf"),
  "2022-maintenance-support-operations": u("photo-1504384308090-c894fdcc538d"),

  "2023-dedicated-teams-model": u("photo-1552664730-d307ca884978"),
  "2023-web-and-mobile-applications": u("photo-1498050108023-c5249f4df085"),
  "2023-custom-software-solutions": u("photo-1504639725590-34d0984388bd"),
  "2023-ui-ux-design-practices": u("photo-1517245386807-bb43f82c33c4"),
  "2023-cloud-solutions-migration": u("photo-1544197150-b99a580bb7a8"),
  "2023-system-integration-apis": u("photo-1521737711867-e3b97375f902"),
  "2023-legacy-modernization-paths": u("photo-1504868584819-f8e8b4b6d7e3"),
  "2023-ai-solutions-generative-ai": u("photo-1485827404703-89b55fcc595e"),
  "2023-data-analytics-insights": u("photo-1460925895917-afdab827c52f"),
  "2023-it-consulting-roadmaps": u("photo-1556761175-b413da4baf72"),
  "2023-maintenance-support-operations": u("photo-1516321318423-f06f85e504b3"),

  "2024-web-and-mobile-applications": u("photo-1555066931-4365d14bab8c"),
  "2024-custom-software-solutions": u("photo-1519389950473-47ba0277781c"),
  "2024-ui-ux-design-practices": u("photo-1507679799987-c73779587ccf"),
  "2024-cloud-solutions-platform-engineering": u("photo-1558494949-ef010cbdcc31"),
  "2024-system-integration-apis": u("photo-1586528116311-ad8dd3c8310d"),
  "2024-legacy-modernization-paths": u("photo-1497366216548-37526070297c"),
  "2024-ai-solutions-agents-rag": u("photo-1620712943543-bcc4688e7485"),
  "2024-data-analytics-insights": u("photo-1454165804606-c3d57bc86b40"),
  "2024-dedicated-teams-model": u("photo-1551434678-e076c223a692"),
  "2024-it-consulting-roadmaps": u("photo-1557804506-669a67965ba0"),
  "2024-maintenance-support-operations": u("photo-1547658719-da2b51169166"),

  "2025-dedicated-teams-agentic-delivery": u("photo-1521791136064-7986c2920216"),
  "2025-web-and-mobile-react19-nextjs": u("photo-1555949963-ff9fe0c870eb"),
  "2025-custom-software-dotnet9-domain": u("photo-1488590528505-98d2b5aba04b"),
  "2025-ui-ux-design-ai-assisted": u("photo-1555949963-aa79dcee981c"),
  "2025-cloud-solutions-sustainable-finops": u("photo-1563986768609-322da13575f3"),
  "2025-system-integration-mcp-apis": u("photo-1531403009284-440f080d1e12"),
  "2025-legacy-modernization-strangler": u("photo-1553877522-43269d4ea984"),
  "2025-ai-solutions-agents-mcp": u("photo-1558618666-fcd25c85cd64"),
  "2025-data-analytics-edge-insights": u("photo-1518770660439-4636190af475"),
  "2025-it-consulting-ai-act-roadmaps": u("photo-1554224155-6726b3ff858f"),
  "2025-maintenance-support-ai-ops": u("photo-1551288049-bebda4e38f71"),
};

export function coverImageUrlForSlug(slug) {
  return BLOG_COVER_BY_SLUG[slug] ?? u("photo-1498050108023-c5249f4df085");
}

export function coverImageFileName(slug) {
  return `${slug}.jpg`;
}
