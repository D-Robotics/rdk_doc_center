import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const PENDING_NOTICE = {
  zh: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",
  en: "The document is being prepared and is not yet available. Thank you for your attention and patience!",
};

const PENDING_CONFIRM = {
  zh: "确定",
  en: "OK",
};

function PendingReleaseDialog({ open, message, confirmLabel, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.pendingOverlay}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={styles.pendingDialog}
        role="alertdialog"
        aria-modal="true"
        aria-describedby="pending-release-message"
        onClick={(event) => event.stopPropagation()}
      >
        <p id="pending-release-message" className={styles.pendingMessage}>
          {message}
        </p>
        <div className={styles.pendingActions}>
          <button
            type="button"
            className={styles.pendingConfirm}
            autoFocus
            onClick={onClose}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [noticeOpen, setNoticeOpen] = useState(false);
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

  const pendingNotice = isEnglish ? PENDING_NOTICE.en : PENDING_NOTICE.zh;
  const pendingConfirm = isEnglish ? PENDING_CONFIRM.en : PENDING_CONFIRM.zh;

  const showPendingNotice = () => {
    setNoticeOpen(true);
  };

  const closePendingNotice = () => {
    setNoticeOpen(false);
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
      <>
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
        <PendingReleaseDialog
          open={noticeOpen}
          message={pendingNotice}
          confirmLabel={pendingConfirm}
          onClose={closePendingNotice}
        />
      </>
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
