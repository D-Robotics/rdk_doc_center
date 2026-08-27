import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ProductCover from "./ProductCover";
import styles from "./styles.module.css";

function pointInElement(x, y, el, pad = 10) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    x >= rect.left - pad &&
    x <= rect.right + pad &&
    y >= rect.top - pad &&
    y <= rect.bottom + pad
  );
}

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

function defaultTagText(current) {
  return current?.label || current?.id || "";
}

function HintIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VersionIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 3.5 8 12 13l8.5-5L12 3Z" />
      <path d="M3.5 12.5 12 17.5l8.5-5" />
      <path d="M3.5 16.5 12 21.5l8.5-5" />
    </svg>
  );
}

function VersionSelect({
  versions,
  isEnglish,
  open,
  onOpenChange,
  onPending,
  latestOptionHint,
  newestReleaseHint,
  accent,
}) {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const current = versions.find((item) => item.default) || versions[0];
  const triggerKicker = isEnglish ? "Select version" : "选择版本";
  const liveBadge = isEnglish ? "Live" : "持续更新";
  const currentBadge = isEnglish ? "Current" : "当前";
  const pendingBadge = isEnglish ? "Coming soon" : "准备中";

  const placeMenu = () => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger || !menu) return;
    const rect = trigger.getBoundingClientRect();
    const gap = 8;
    menu.style.position = "fixed";
    menu.style.right = `${Math.max(8, window.innerWidth - rect.right)}px`;
    menu.style.bottom = `${Math.max(8, window.innerHeight - rect.top + gap)}px`;
    menu.style.left = "auto";
    menu.style.top = "auto";
  };

  useLayoutEffect(() => {
    if (!open) return undefined;
    placeMenu();
    window.addEventListener("resize", placeMenu);
    window.addEventListener("scroll", placeMenu, true);
    return () => {
      window.removeEventListener("resize", placeMenu);
      window.removeEventListener("scroll", placeMenu, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setHoveredId(null);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const isOverSelect = (x, y) =>
      pointInElement(x, y, triggerRef.current) || pointInElement(x, y, menuRef.current);

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (!isOverSelect(event.clientX, event.clientY)) {
        onOpenChange(false);
      }
    };
    const handlePointerDown = (event) => {
      if (!isOverSelect(event.clientX, event.clientY)) {
        onOpenChange(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("pointermove", handlePointerMove, true);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove, true);
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const menu = open ? (
    <ul
      ref={menuRef}
      className={`${styles.versionMenu} ${styles.versionMenuPortal}`}
      role="listbox"
      data-version-menu="true"
      style={{ "--card-accent": accent || "#ff5125" }}
    >
      {versions.map((version) => {
        const optionHint = version.channelLatest
          ? latestOptionHint
          : version.default
            ? newestReleaseHint
            : "";
        const label = (
          <>
            <span className={styles.versionItemMain}>
              <span className={styles.versionItemLabel}>{version.label}</span>
              {version.channelLatest ? (
                <span className={styles.versionItemBadge}>{liveBadge}</span>
              ) : null}
              {version.default ? (
                <span className={styles.versionItemBadge}>{currentBadge}</span>
              ) : null}
              {version.pendingRelease ? (
                <span className={styles.versionItemBadgeMuted}>
                  {pendingBadge}
                </span>
              ) : null}
            </span>
            {optionHint ? (
              <span className={styles.versionItemHint}>{optionHint}</span>
            ) : null}
          </>
        );

        const itemClass = `${styles.versionItem} ${
          hoveredId === version.id ? styles.versionItemHover : ""
        }`;
        const hoverBind = {
          onMouseEnter: () => setHoveredId(version.id),
          onMouseLeave: () =>
            setHoveredId((currentId) => (currentId === version.id ? null : currentId)),
        };

        if (version.pendingRelease) {
          return (
            <li key={version.id} role="option" {...hoverBind}>
              <button
                type="button"
                className={itemClass}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onOpenChange(false);
                  onPending();
                }}
              >
                {label}
              </button>
            </li>
          );
        }

        const isExt = /^https?:\/\//.test(version.href);
        const itemProps = isExt
          ? {
              href: version.href,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : { to: version.href };
        const ItemTag = isExt ? "a" : Link;

        return (
          <li key={version.id} role="option" {...hoverBind}>
            <ItemTag
              className={itemClass}
              {...itemProps}
              onClick={() => onOpenChange(false)}
            >
              {label}
            </ItemTag>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div className={styles.versionSelect}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.versionTrigger} ${open ? styles.versionTriggerOpen : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={
          isEnglish
            ? `Choose documentation version, current ${current?.label || ""}`
            : `选择文档版本，当前 ${current?.label || ""}`
        }
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onOpenChange(!open);
        }}
        onMouseLeave={(event) => {
          if (!open) return;
          if (menuRef.current?.contains(event.relatedTarget)) return;
          if (pointInElement(event.clientX, event.clientY, menuRef.current)) return;
          onOpenChange(false);
        }}
      >
        <span className={styles.versionTriggerLead}>
          <VersionIcon className={styles.versionIcon} />
          <span className={styles.versionTriggerKicker}>{triggerKicker}</span>
        </span>
        <span
          className={`${styles.versionChevron} ${open ? styles.versionChevronOpen : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {menu && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}

const WORDMARK_COVERS = new Set([
  "oe-s",
  "oe-llm-s100",
  "oe-llm-s600",
  "oe-x5",
  "oe-x3",
]);

function CardProductImage({ src, label, onError, wordmark }) {
  const isRemote = /^https?:\/\//.test(src || "");
  const localSrc = useBaseUrl(src || "");
  const resolved = isRemote ? src : localSrc;

  return (
    <figure
      className={`${styles.cardImageSlot}${
        wordmark ? ` ${styles.cardImageSlotWordmark}` : ""
      }`}
    >
      <img
        className={styles.cardImage}
        src={resolved}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer-when-downgrade"
        onError={onError}
      />
      {label ? <figcaption className={styles.cardImageLabel}>{label}</figcaption> : null}
    </figure>
  );
}

function normalizeCardImages(image) {
  const list = Array.isArray(image) ? image : image ? [image] : [];
  return list
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return { src: item, label: "" };
      if (item.src) return { src: item.src, label: item.label || "" };
      return null;
    })
    .filter(Boolean);
}

function CardMedia({ image, cover }) {
  const items = normalizeCardImages(image);
  const [failed, setFailed] = useState([]);
  const visible = items.filter((item) => !failed.includes(item.src));
  const wordmark = WORDMARK_COVERS.has(cover);

  return (
    <div
      className={`${styles.cardMedia} ${
        visible.length >= 4
          ? styles.cardMediaQuad
          : visible.length > 1
            ? styles.cardMediaPair
            : ""
      }${wordmark ? ` ${styles.cardMediaWordmark}` : ""}`}
      aria-hidden
    >
      {visible.length ? (
        visible.map((item) => (
          <CardProductImage
            key={item.src}
            src={item.src}
            label={item.label}
            wordmark={wordmark}
            onError={() =>
              setFailed((prev) =>
                prev.includes(item.src) ? prev : [...prev, item.src],
              )
            }
          />
        ))
      ) : (
        <ProductCover name={cover} className={styles.cardCover} />
      )}
      <span className={styles.cardMediaScrim} />
    </div>
  );
}

export default function SiteCard({
  title,
  description,
  href,
  tags,
  groupLabel,
  external,
  accent,
  image,
  cover,
  versions,
  versionHint,
  latestOptionHint,
  newestReleaseHint,
  descriptionHoverHint,
  pendingRelease,
}) {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);
  const isExternal = external || /^https?:\/\//.test(href);
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  const versionList = Array.isArray(versions) ? versions : [];
  const hasVersionSelect = versionList.length > 1;
  const current = versionList.find((item) => item.default) || versionList[0] || null;

  const allTags = [
    ...(hasVersionSelect
      ? [{ text: defaultTagText(current), kind: "version" }]
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
  const media = <CardMedia image={image} cover={cover} />;

  const headerAndDescription = (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>
            {title}
            {isExternal && !pendingRelease ? (
              <span className={styles.externalIcon} aria-hidden>
                ↗
              </span>
            ) : null}
          </h3>
          {groupLabel ? <span className={styles.groupLabel}>{groupLabel}</span> : null}
        </div>
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
      <div
        className={`${styles.descriptionWrap} ${
          descriptionHoverHint ? styles.descriptionWrapHinted : ""
        }`}
      >
        <p className={styles.description}>{description}</p>
        {descriptionHoverHint ? (
          <p className={styles.descriptionHoverHint}>
            <HintIcon className={styles.descriptionHoverIcon} />
            <span className={styles.descriptionHoverText}>{descriptionHoverHint}</span>
          </p>
        ) : null}
      </div>
    </>
  );

  if (pendingRelease) {
    return (
      <div className={styles.cardWrap}>
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
          {media}
          <div className={styles.cardMain}>
            {headerAndDescription}
            <div className={styles.cardFooter} />
          </div>
        </div>
        <PendingReleaseDialog
          open={noticeOpen}
          message={pendingNotice}
          confirmLabel={pendingConfirm}
          onClose={closePendingNotice}
        />
      </div>
    );
  }

  if (hasVersionSelect) {
    return (
      <div
        className={`${styles.cardWrap} ${styles.cardWrapVersioned} ${
          versionMenuOpen ? styles.cardWrapMenuOpen : ""
        }`}
      >
        <div
          className={`${styles.card} ${styles.cardVersioned}`}
          style={cardAccentStyle}
        >
          <Link className={styles.cardMediaLink} tabIndex={-1} {...linkProps}>
            {media}
          </Link>
          <div className={styles.cardMain}>
            <Link className={styles.cardBody} {...linkProps}>
              {headerAndDescription}
            </Link>
            <div className={`${styles.cardFooter} ${styles.cardFooterVersioned}`}>
              {versionHint ? (
                <p className={styles.versionHint}>{versionHint}</p>
              ) : null}
              <VersionSelect
                versions={versionList}
                isEnglish={isEnglish}
                open={versionMenuOpen}
                onOpenChange={setVersionMenuOpen}
                onPending={showPendingNotice}
                latestOptionHint={latestOptionHint}
                newestReleaseHint={newestReleaseHint}
                accent={accent}
              />
            </div>
          </div>
        </div>
        <PendingReleaseDialog
          open={noticeOpen}
          message={pendingNotice}
          confirmLabel={pendingConfirm}
          onClose={closePendingNotice}
        />
      </div>
    );
  }

  return (
    <div className={styles.cardWrap}>
      <Link
        className={styles.card}
        {...linkProps}
        style={cardAccentStyle}
      >
        {media}
        <div className={styles.cardMain}>
          {headerAndDescription}
          <div className={styles.cardFooter} />
        </div>
      </Link>
    </div>
  );
}
