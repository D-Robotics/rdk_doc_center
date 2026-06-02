import React from "react";
import { useDocusaurusContext } from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

export default function ChapterSearchHit({
  manualTitle,
  chapterTitle,
  parentChapter,
  summary,
  href,
}) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n?.currentLocale === "en";
  const ctaText = isEnglish ? "Open chapter →" : "进入章节 →";

  return (
    <a className={styles.hit} href={href} target="_blank" rel="noopener noreferrer">
      <div className={styles.hitHeader}>
        <span className={styles.manualBadge}>{manualTitle}</span>
        {parentChapter ? <span className={styles.parent}>{parentChapter}</span> : null}
      </div>
      <h3 className={styles.chapterTitle}>{chapterTitle}</h3>
      <p className={styles.summary}>{summary}</p>
      <span className={styles.cta}>{ctaText}</span>
    </a>
  );
}
