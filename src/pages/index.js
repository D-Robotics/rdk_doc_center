import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { groups, sitesByGroup, groupsEn, sites, sitesEn } from "@site/src/data/sites";
import SiteCard from "@site/src/components/SiteCard";
import SectionIcon from "@site/src/components/SectionIcon";
import ChapterSearchHit from "@site/src/components/ChapterSearchHit";
import { searchDocCenter } from "@site/src/utils/docCenterSearch";
import styles from "./index.module.css";

const EMPTY_SEARCH = { chapterHits: [], manualHits: [], total: 0 };

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

function Hero({ searchQuery, onSearchChange }) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const currentGroups = isEnglish ? groupsEn : groups;

  return (
    <header className={styles.hero}>
      <div className={clsx(styles.heroInner, "home-page-content")}>
        <h1 className={styles.heroTitle}>
          D-Robotics{" "}
          <span className={styles.heroTitleAccent}>
            {isEnglish ? "Resource Center" : "资料中心"}
          </span>
        </h1>
        <p className={styles.heroSubtitle}>
          {isEnglish
            ? "Complete technical documentation for robot development kits, algorithm models, SDK, application development, and deployment."
            : "提供机器人开发套件、算法模型、SDK、应用开发与部署相关的完整技术文档。"}
        </p>
        <div className={styles.heroActions}>
          <a
            className={styles.heroActionBtn}
            href="https://github.com/D-Robotics"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.heroActionBtn}
            href={
              isEnglish
                ? "https://developer.d-robotics.cc/en/documentation"
                : "https://developer.d-robotics.cc/information"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {isEnglish ? "Legacy Docs" : "旧版资料"}
          </a>
        </div>
        <label className={styles.heroSearch}>
          <SearchIcon className={styles.heroSearchIcon} />
          <input
            type="text"
            role="searchbox"
            enterKeyHint="search"
            className={styles.heroSearchInput}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={
              isEnglish
                ? "Search docs..."
                : "搜索文档..."
            }
            aria-label={isEnglish ? "Search documentation" : "搜索文档"}
          />
        </label>
        <nav
          className={styles.heroNav}
          aria-label={isEnglish ? "Quick Navigation" : "快速跳转"}
        >
          {currentGroups.map((g) => (
            <a key={g.id} href={`#${g.anchor}`} className={styles.heroNavItem}>
              {g.navTitle}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function GroupSection({ group, items }) {
  if (!items?.length) return null;
  return (
    <section id={group.anchor} className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon} aria-hidden>
              <SectionIcon name={group.icon} className={styles.sectionIconSvg} />
            </span>
            {group.title}
          </h2>
          {group.subtitle ? (
            <p className={styles.sectionSubtitle}>{group.subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <SiteCard
            key={`${item.id}-${item.href}`}
            title={item.title}
            description={item.description}
            href={item.href}
            tags={item.tags}
            versions={item.versions}
            versionHint={item.versionHint}
            latestOptionHint={item.latestOptionHint}
            newestReleaseHint={item.newestReleaseHint}
            descriptionHoverHint={item.descriptionHoverHint}
            external={item.external}
            pendingRelease={item.pendingRelease}
          />
        ))}
      </div>
    </section>
  );
}

function filterGrouped(grouped, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return grouped;

  const filtered = {};
  for (const [groupId, items] of Object.entries(grouped)) {
    const matched = items.filter((item) => {
      const haystack = [item.title, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
    if (matched.length) filtered[groupId] = matched;
  }
  return filtered;
}

function SearchResults({ query, chapterHits, manualHits, total, loading }) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const normalized = query.trim();
  if (!normalized) return null;

  const hasResults = total > 0;

  return (
    <section className={styles.searchResults} aria-live="polite">
      <div className={styles.searchResultsHeader}>
        <h2 className={styles.searchResultsTitle}>
          {isEnglish ? "Search Results" : "搜索结果"}
        </h2>
        <span className={styles.searchResultsCount}>
          {loading
            ? isEnglish
              ? "Searching…"
              : "搜索中…"
            : isEnglish
              ? `${total} result(s) (${chapterHits.length} chapter, ${manualHits.length} manual)`
              : `共 ${total} 条（章节 ${chapterHits.length} · 手册 ${manualHits.length}）`}
        </span>
      </div>
      {loading && !hasResults ? (
        <p className={styles.searchResultsEmpty}>
          {isEnglish ? "Searching documentation…" : "正在搜索文档…"}
        </p>
      ) : hasResults ? (
        <>
          {chapterHits.length ? (
            <div className={styles.searchSection}>
              <h3 className={styles.searchSectionTitle}>
                {isEnglish ? "Matched chapters" : "章节匹配"}
              </h3>
              <div className={styles.chapterHitList}>
                {chapterHits.map((item) => (
                  <ChapterSearchHit
                    key={item.id}
                    manualTitle={item.manualTitle}
                    chapterTitle={item.chapterTitle}
                    parentChapter={item.parentChapter}
                    summary={item.summary}
                    href={item.href}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {manualHits.length ? (
            <div className={styles.searchSection}>
              <h3 className={styles.searchSectionTitle}>
                {isEnglish ? "Matched manuals" : "手册匹配"}
              </h3>
              <div className={styles.grid}>
                {manualHits.map((item) => (
                  <SiteCard
                    key={`search-${item.id}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    tags={item.tags}
                    versions={item.versions}
                    versionHint={item.versionHint}
                    latestOptionHint={item.latestOptionHint}
                    newestReleaseHint={item.newestReleaseHint}
                    descriptionHoverHint={item.descriptionHoverHint}
                    external={item.external}
                    pendingRelease={item.pendingRelease}
                    groupLabel={item.groupTitle}
                    accent={item.accent}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className={styles.searchResultsEmpty}>
          {isEnglish
            ? "No matching chapters or manuals were found. Try another keyword."
            : "未找到匹配章节或手册，请尝试其他关键词。"}
        </p>
      )}
    </section>
  );
}

export default function Home() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [docSearch, setDocSearch] = useState(EMPTY_SEARCH);
  const [searchLoading, setSearchLoading] = useState(false);
  const isEnglish = i18n.currentLocale === "en";
  const currentGroups = isEnglish ? groupsEn : groups;
  const algoliaConfig = siteConfig.customFields?.algolia;
  const algoliaAppId = algoliaConfig?.appId || "";
  const algoliaApiKey = algoliaConfig?.apiKey || "";
  const algoliaIndexKey = (algoliaConfig?.searchIndexes || []).join(",") || algoliaConfig?.indexName || "";
  const groupsMap = useMemo(
    () =>
      Object.fromEntries(
        currentGroups.map((group) => [group.id, group]),
      ),
    [currentGroups],
  );
  const grouped = useMemo(
    () => sitesByGroup(isEnglish ? sitesEn : undefined),
    [isEnglish],
  );
  const filteredGrouped = useMemo(
    () => filterGrouped(grouped, searchQuery),
    [grouped, searchQuery],
  );
  const isSearching = Boolean(searchQuery.trim());

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setDocSearch(EMPTY_SEARCH);
      setSearchLoading(false);
      return undefined;
    }

    let cancelled = false;
    setSearchLoading(true);
    const timer = setTimeout(() => {
      searchDocCenter(q, {
        locale: isEnglish ? "en" : "zh",
        sites: isEnglish ? sitesEn : sites,
        grouped,
        groupsMap,
        algoliaConfig,
      })
        .then((result) => {
          if (!cancelled) setDocSearch(result);
        })
        .catch((err) => {
          console.error("[doc-center] search failed", err);
          if (!cancelled) {
            setDocSearch(EMPTY_SEARCH);
          }
        })
        .finally(() => {
          if (!cancelled) setSearchLoading(false);
        });
    }, 280);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, isEnglish, grouped, groupsMap, algoliaConfig, algoliaAppId, algoliaApiKey, algoliaIndexKey]);

  return (
    <Layout
      title={isEnglish ? "RDK Resource Center" : "RDK 资料中心"}
      description={
        isEnglish
          ? "D-Robotics Developer Documentation Hub —— Aggregating RDK, SDK, Robot Applications, Algorithm Toolchain and other sub-sites"
          : "D-Robotics 开发者文档总入口 —— 聚合 RDK 、SDK、机器人应用、算法工具链等所有子站"
      }
    >
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className={clsx(styles.main, "home-page-content")}>
        <SearchResults
          query={searchQuery}
          chapterHits={docSearch.chapterHits}
          manualHits={docSearch.manualHits}
          total={docSearch.total}
          loading={searchLoading}
        />
        {!isSearching
          ? currentGroups.map((g) => (
              <GroupSection
                key={g.id}
                group={g}
                items={filteredGrouped[g.id] || []}
              />
            ))
          : null}
      </main>
    </Layout>
  );
}
