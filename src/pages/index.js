import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { groups, sitesByGroup, groupsEn, sitesEn } from "@site/src/data/sites";
import SiteCard from "@site/src/components/SiteCard";
import SectionIcon from "@site/src/components/SectionIcon";
import styles from "./index.module.css";

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
            href="https://developer.d-robotics.cc/information"
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

function flattenMatches(grouped, groupsMap) {
  return Object.entries(grouped).flatMap(([groupId, items]) =>
    items.map((item) => ({
      ...item,
      groupTitle: groupsMap[groupId]?.title || "",
      accent: groupsMap[groupId]?.accent,
    })),
  );
}

function SearchResults({ query, results }) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const normalized = query.trim();
  if (!normalized) return null;

  return (
    <section className={styles.searchResults} aria-live="polite">
      <div className={styles.searchResultsHeader}>
        <h2 className={styles.searchResultsTitle}>
          {isEnglish ? "Search Results" : "搜索结果"}
        </h2>
        <span className={styles.searchResultsCount}>
          {isEnglish
            ? `${results.length} matched manual(s)`
            : `命中 ${results.length} 个手册`}
        </span>
      </div>
      {results.length ? (
        <div className={styles.grid}>
          {results.map((item) => (
            <SiteCard
              key={`search-${item.id}-${item.href}`}
              title={item.title}
              description={item.description}
              href={item.href}
              tags={item.tags}
              versions={item.versions}
              external={item.external}
              pendingRelease={item.pendingRelease}
              groupLabel={item.groupTitle}
              accent={item.accent}
            />
          ))}
        </div>
      ) : (
        <p className={styles.searchResultsEmpty}>
          {isEnglish
            ? "No matching manuals were found. Try another keyword."
            : "未找到匹配手册，请尝试其他关键词。"}
        </p>
      )}
    </section>
  );
}

export default function Home() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const isEnglish = i18n.currentLocale === "en";
  const currentGroups = isEnglish ? groupsEn : groups;
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
  const searchResults = useMemo(
    () => flattenMatches(filteredGrouped, groupsMap),
    [filteredGrouped, groupsMap],
  );

  useEffect(() => {
    const normalized = location.pathname.replace(/\/+$/, "");
    const enRoot = `${siteConfig.baseUrl}en`.replace(/\/+$/, "");
    if (normalized === enRoot) {
      history.replace(siteConfig.baseUrl);
    }
  }, [location.pathname, history, siteConfig.baseUrl]);

  return (
    <Layout
      title={isEnglish ? "RDK Documentation Center" : "RDK 文档中心"}
      description={
        isEnglish
          ? "D-Robotics Developer Documentation Hub —— Aggregating RDK, SDK, Robot Applications, Algorithm Toolchain and other sub-sites"
          : "D-Robotics 开发者文档总入口 —— 聚合 RDK 、SDK、机器人应用、算法工具链等所有子站"
      }
    >
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className={clsx(styles.main, "home-page-content")}>
        <SearchResults query={searchQuery} results={searchResults} />
        {currentGroups.map((g) => (
          <GroupSection key={g.id} group={g} items={filteredGrouped[g.id] || []} />
        ))}
      </main>
    </Layout>
  );
}
