import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

export default function SiteCard({
  title,
  description,
  href,
  tags,
  external,
  accent,
  versions,
  pendingRelease,
}) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const isExternal = external || /^https?:\/\//.test(href);
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  const hasVersions = Array.isArray(versions) && versions.length > 0;
  const latest = hasVersions ? versions[versions.length - 1] : null;
  const totalVersions = hasVersions ? versions.length : 0;

  const allTags = [
    ...(hasVersions
      ? [{ text: isEnglish ? `Latest ${latest}` : `最新 ${latest}`, kind: "version" }]
      : []),
    ...(hasVersions && totalVersions > 1
      ? [{ text: isEnglish ? `${totalVersions} versions` : `共 ${totalVersions} 个版本`, kind: "count" }]
      : []),
    ...((tags ?? []).map((t) => ({ text: t, kind: "plain" }))),
  ];

  const pendingNotice = isEnglish
    ? "This documentation is not yet available online. Stay tuned."
    : "该文档暂未上架，敬请期待。";

  const showPendingNotice = () => {
    window.alert(pendingNotice);
  };

  const cardAccentStyle = accent ? { "--card-accent": accent } : undefined;

  const content = (
    <>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>
          {title}
          {isExternal && !pendingRelease ? (
            <span className={styles.externalIcon} aria-hidden>
              ↗
            </span>
          ) : null}
        </h3>
        {allTags.length ? (
          <div className={styles.tags}>
            {allTags.map((t, i) => (
              <span key={i} className={`${styles.tag} ${styles[`tag_${t.kind}`] ?? ""}`}>
                {t.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.cardFooter}>
        {/* <span className={styles.cta}>
          {pendingRelease
            ? isEnglish
              ? "Coming soon →"
              : "敬请期待 →"
            : `${isExternal ? (isEnglish ? "Visit external link" : "访问外链") : isEnglish ? "Open documentation" : "进入文档"} →`}
        </span> */}
      </div>
    </>
  );

  if (pendingRelease) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`${styles.card} ${styles.cardPending}`}
        style={cardAccentStyle}
        onClick={showPendingNotice}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showPendingNotice();
          }
        }}
        aria-label={isEnglish ? `${title}, ${pendingNotice}` : `${title}，${pendingNotice}`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      className={styles.card}
      {...linkProps}
      style={cardAccentStyle}
    >
      {content}
    </Link>
  );
}
