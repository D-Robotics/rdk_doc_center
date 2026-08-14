import React, { useMemo, useRef, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  groups,
  groupsEn,
  sites,
  sitesEn,
  sitesByGroup,
} from "@site/src/data/sites";
import SectionIcon from "@site/src/components/SectionIcon";
import {
  DEFAULT_ACCEPT,
  DEFAULT_MAX_FILE_SIZE_MB,
  DEFAULT_MAX_FILES,
  MATERIAL_TYPES,
  formatFileSize,
} from "@site/src/data/materialUpload";
import styles from "./styles.module.css";

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

function UploadIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 16V4" strokeLinecap="round" />
      <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
    </svg>
  );
}

function siteKey(site) {
  return `${site.id}::${site.href || ""}`;
}

function buildSubmissionSummary({
  isEnglish,
  selected,
  materialType,
  version,
  title,
  description,
  contact,
  files,
}) {
  const typeMeta = MATERIAL_TYPES.find((item) => item.id === materialType);
  const typeLabel = typeMeta
    ? isEnglish
      ? typeMeta.en.label
      : typeMeta.zh.label
    : materialType;

  return [
    isEnglish ? "RDK Material Upload Draft" : "RDK 资料上传草稿",
    "--------------------------------",
    `${isEnglish ? "Manual" : "手册"}: ${selected?.title || "-"}`,
    `${isEnglish ? "Manual ID" : "手册 ID"}: ${selected?.id || "-"}`,
    `${isEnglish ? "Manual URL" : "手册链接"}: ${selected?.href || "-"}`,
    `${isEnglish ? "Material type" : "资料类型"}: ${typeLabel}`,
    `${isEnglish ? "Version" : "版本"}: ${version || "-"}`,
    `${isEnglish ? "Title" : "标题"}: ${title || "-"}`,
    `${isEnglish ? "Contact" : "联系方式"}: ${contact || "-"}`,
    `${isEnglish ? "Description" : "说明"}: ${description || "-"}`,
    `${isEnglish ? "Files" : "文件"}:`,
    ...(files.length
      ? files.map((file, index) => `  ${index + 1}. ${file.name} (${formatFileSize(file.size)})`)
      : [`  ${isEnglish ? "(none)" : "（无）"}`]),
  ].join("\n");
}

async function copyText(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

function resolveUploadConfig(siteConfig, locale) {
  const cfg = siteConfig.customFields?.materialUpload || {};
  const localeFormUrl =
    cfg.formUrlByLocale && typeof cfg.formUrlByLocale === "object"
      ? cfg.formUrlByLocale[locale]
      : "";
  const formUrl =
    (typeof localeFormUrl === "string" && localeFormUrl.trim()) ||
    (typeof cfg.formUrl === "string" && cfg.formUrl.trim()) ||
    "";
  return {
    submitUrl: typeof cfg.submitUrl === "string" ? cfg.submitUrl.trim() : "",
    formUrl,
    accept: typeof cfg.accept === "string" && cfg.accept.trim() ? cfg.accept : DEFAULT_ACCEPT,
    maxFileSizeMb:
      Number.isFinite(cfg.maxFileSizeMb) && cfg.maxFileSizeMb > 0
        ? cfg.maxFileSizeMb
        : DEFAULT_MAX_FILE_SIZE_MB,
    maxFiles:
      Number.isFinite(cfg.maxFiles) && cfg.maxFiles > 0 ? cfg.maxFiles : DEFAULT_MAX_FILES,
  };
}

export default function MaterialUploadPage() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const uploadConfig = useMemo(
    () => resolveUploadConfig(siteConfig, i18n.currentLocale),
    [siteConfig, i18n.currentLocale],
  );

  const currentGroups = isEnglish ? groupsEn : groups;
  const currentSites = isEnglish ? sitesEn : sites;
  const grouped = useMemo(
    () => sitesByGroup(isEnglish ? sitesEn : undefined),
    [isEnglish],
  );
  const groupsMap = useMemo(
    () => Object.fromEntries(currentGroups.map((group) => [group.id, group])),
    [currentGroups],
  );

  const [filter, setFilter] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [materialType, setMaterialType] = useState(MATERIAL_TYPES[0].id);
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const fileInputRef = useRef(null);

  const selected = useMemo(
    () => currentSites.find((site) => siteKey(site) === selectedKey) || null,
    [currentSites, selectedKey],
  );

  const filteredGrouped = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const result = {};
    for (const group of currentGroups) {
      const items = (grouped[group.id] || []).filter((site) => {
        if (!q) return true;
        const haystack = [site.title, site.description, group.title]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
      if (items.length) result[group.id] = items;
    }
    return result;
  }, [currentGroups, grouped, filter]);

  const t = isEnglish
    ? {
        pageTitle: "Material Upload",
        pageDesc: "Upload handbook materials for RDK documentation portals",
        eyebrow: "Internal upload entry",
        heroTitle: "Handbook Material",
        heroAccent: "Upload",
        heroSubtitle:
          "Select a handbook, fill in material metadata, and attach files. Configure submitUrl or formUrl in site config for real submission.",
        manuals: "Handbooks",
        manualsHint: "Pick one target",
        searchPlaceholder: "Filter handbooks…",
        noManuals: "No matching handbooks.",
        formTitle: "Upload form",
        formHint: "Required fields marked with *",
        pickManualTitle: "Select a handbook first",
        pickManualText: "Choose a card on the left to start uploading materials for that handbook.",
        selectedMeta: "Target handbook",
        clear: "Change",
        materialType: "Material type",
        version: "Version / tag",
        versionPh: "e.g. v1.2.0 / 2026.03",
        title: "Material title",
        titlePh: "Short name shown in release notes",
        description: "Description",
        descriptionPh: "What changed, applicable platforms, notes…",
        contact: "Contact",
        contactPh: "Email or Feishu account",
        files: "Files",
        dropTitle: "Drop files here, or click to browse",
        dropHint: `Up to ${uploadConfig.maxFiles} files, max ${uploadConfig.maxFileSizeMb} MB each`,
        remove: "Remove",
        submit: "Submit",
        submitting: "Submitting…",
        copyDraft: "Copy draft",
        openForm: "Open form",
        backHome: "Back to home",
        tips: (
          <>
            <strong>Tips:</strong> If <code>submitUrl</code> is configured, files are POSTed as
            multipart. Otherwise the draft is copied, and an optional Feishu form can be opened.
          </>
        ),
        needManual: "Please select a handbook.",
        needTitle: "Please enter a material title.",
        needFiles: "Please attach at least one file.",
        needContact: "Please enter a contact.",
        fileTooLarge: (name, limit) => `"${name}" exceeds the ${limit} MB limit.`,
        tooManyFiles: (limit) => `You can upload at most ${limit} files.`,
        submitOk: "Submitted successfully.",
        submitFail: "Submission failed. Please try again or use the form link.",
        draftCopied: "Draft copied. You can paste it into the form or send it to the docs owner.",
        draftCopyFail: "Could not copy the draft. Please try again.",
      }
    : {
        pageTitle: "资料上传",
        pageDesc: "为各手册上传配套资料的统一入口",
        eyebrow: "内部资料上传入口",
        heroTitle: "各手册资料",
        heroAccent: "上传",
        heroSubtitle:
          "先选择目标手册，再填写资料信息并附上文件。可在站点配置中设置 submitUrl / formUrl 对接真实提交流程。",
        manuals: "手册列表",
        manualsHint: "选择一个目标",
        searchPlaceholder: "筛选手册…",
        noManuals: "没有匹配的手册。",
        formTitle: "上传表单",
        formHint: "带 * 为必填项",
        pickManualTitle: "请先选择手册",
        pickManualText: "在左侧点选一本手册后，即可为其上传配套资料。",
        selectedMeta: "当前目标手册",
        clear: "重选",
        materialType: "资料类型",
        version: "版本 / 标签",
        versionPh: "例如 v1.2.0 / 2026.03",
        title: "资料标题",
        titlePh: "便于检索与发布说明的短标题",
        description: "说明",
        descriptionPh: "变更内容、适用平台、注意事项等",
        contact: "联系方式",
        contactPh: "邮箱或飞书账号",
        files: "文件",
        dropTitle: "拖拽文件到此处，或点击选择",
        dropHint: `最多 ${uploadConfig.maxFiles} 个文件，单个不超过 ${uploadConfig.maxFileSizeMb} MB`,
        remove: "移除",
        submit: "提交",
        submitting: "提交中…",
        copyDraft: "复制草稿",
        openForm: "打开表单",
        backHome: "返回首页",
        tips: (
          <>
            <strong>说明：</strong>配置了 <code>submitUrl</code> 时将以 multipart 上传；
            否则会复制提交草稿，并可跳转飞书表单。
          </>
        ),
        needManual: "请先选择一本手册。",
        needTitle: "请填写资料标题。",
        needFiles: "请至少添加一个文件。",
        needContact: "请填写联系方式。",
        fileTooLarge: (name, limit) => `「${name}」超过 ${limit} MB 限制。`,
        tooManyFiles: (limit) => `最多只能上传 ${limit} 个文件。`,
        submitOk: "提交成功。",
        submitFail: "提交失败，请重试或改用表单入口。",
        draftCopied: "草稿已复制，可粘贴到表单或发给文档负责人。",
        draftCopyFail: "复制草稿失败，请重试。",
      };

  const addFiles = (incoming) => {
    const next = Array.from(incoming || []);
    if (!next.length) return;

    const maxBytes = uploadConfig.maxFileSizeMb * 1024 * 1024;
    const merged = [...files];

    for (const file of next) {
      if (file.size > maxBytes) {
        setStatus({ type: "error", message: t.fileTooLarge(file.name, uploadConfig.maxFileSizeMb) });
        return;
      }
      if (merged.length >= uploadConfig.maxFiles) {
        setStatus({ type: "error", message: t.tooManyFiles(uploadConfig.maxFiles) });
        return;
      }
      const exists = merged.some(
        (item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified,
      );
      if (!exists) merged.push(file);
    }

    setFiles(merged);
    setStatus(null);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (!selected) return t.needManual;
    if (!title.trim()) return t.needTitle;
    if (!contact.trim()) return t.needContact;
    if (!files.length) return t.needFiles;
    return "";
  };

  const handleCopyDraft = async () => {
    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }
    try {
      const summary = buildSubmissionSummary({
        isEnglish,
        selected,
        materialType,
        version,
        title,
        description,
        contact,
        files,
      });
      await copyText(summary);
      setStatus({ type: "ok", message: t.draftCopied });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t.draftCopyFail });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      if (uploadConfig.submitUrl) {
        const formData = new FormData();
        formData.append("manualId", selected.id);
        formData.append("manualTitle", selected.title);
        formData.append("manualHref", selected.href || "");
        formData.append("materialType", materialType);
        formData.append("version", version.trim());
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("contact", contact.trim());
        formData.append("locale", i18n.currentLocale);
        files.forEach((file) => formData.append("files", file, file.name));

        const response = await fetch(uploadConfig.submitUrl, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        setStatus({ type: "ok", message: t.submitOk });
        setFiles([]);
        setTitle("");
        setDescription("");
        setVersion("");
        return;
      }

      const summary = buildSubmissionSummary({
        isEnglish,
        selected,
        materialType,
        version,
        title,
        description,
        contact,
        files,
      });
      await copyText(summary);
      setStatus({ type: "ok", message: t.draftCopied });

      if (uploadConfig.formUrl) {
        const url = new URL(uploadConfig.formUrl);
        url.searchParams.set("manual", selected.title);
        url.searchParams.set("type", materialType);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t.submitFail });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title={t.pageTitle} description={t.pageDesc}>
      <header className={styles.hero}>
        <div className={clsx(styles.heroInner, "home-page-content")}>
          <p className={styles.heroEyebrow}>{t.eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {t.heroTitle} <span className={styles.heroTitleAccent}>{t.heroAccent}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t.heroSubtitle}</p>
        </div>
      </header>

      <main className={clsx(styles.main, "home-page-content")}>
        <div className={styles.layout}>
          <aside className={styles.panel} aria-label={t.manuals}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>{t.manuals}</h2>
              <p className={styles.panelHint}>{t.manualsHint}</p>
            </div>
            <div className={styles.manualSearch}>
              <SearchIcon className={styles.manualSearchIcon} />
              <input
                className={styles.manualSearchInput}
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
              />
            </div>
            <div className={styles.manualList}>
              {Object.keys(filteredGrouped).length === 0 ? (
                <p className={styles.emptyManuals}>{t.noManuals}</p>
              ) : (
                currentGroups.map((group) => {
                  const items = filteredGrouped[group.id];
                  if (!items?.length) return null;
                  return (
                    <div key={group.id} className={styles.groupBlock}>
                      <div
                        className={styles.groupLabel}
                        style={{ "--group-accent": group.accent }}
                      >
                        <SectionIcon name={group.icon} className={styles.groupIcon} />
                        {group.title}
                      </div>
                      {items.map((site) => {
                        const key = siteKey(site);
                        const active = key === selectedKey;
                        return (
                          <button
                            key={key}
                            type="button"
                            className={clsx(styles.manualItem, active && styles.manualItemActive)}
                            style={{ "--item-accent": groupsMap[site.group]?.accent || group.accent }}
                            onClick={() => {
                              setSelectedKey(key);
                              setStatus(null);
                            }}
                          >
                            <span className={styles.manualItemTitle}>{site.title}</span>
                            {site.description ? (
                              <span className={styles.manualItemDesc}>{site.description}</span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          <section className={styles.panel} aria-label={t.formTitle}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>{t.formTitle}</h2>
              <p className={styles.panelHint}>{t.formHint}</p>
            </div>

            {!selected ? (
              <div className={styles.placeholder}>
                <UploadIcon className={styles.placeholderIcon} />
                <p className={styles.placeholderTitle}>{t.pickManualTitle}</p>
                <p className={styles.placeholderText}>{t.pickManualText}</p>
                <Link className={styles.secondaryBtn} to="/">
                  {t.backHome}
                </Link>
              </div>
            ) : (
              <form className={styles.formBody} onSubmit={handleSubmit}>
                <div className={styles.selectedBanner}>
                  <div>
                    <p className={styles.selectedBannerTitle}>{selected.title}</p>
                    <p className={styles.selectedBannerMeta}>
                      {t.selectedMeta}
                      {groupsMap[selected.group]?.title
                        ? ` · ${groupsMap[selected.group].title}`
                        : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => setSelectedKey("")}
                  >
                    {t.clear}
                  </button>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>
                    {t.materialType}
                    <span className={styles.required}>*</span>
                  </span>
                  <div className={styles.typeGrid}>
                    {MATERIAL_TYPES.map((item) => {
                      const label = isEnglish ? item.en.label : item.zh.label;
                      const hint = isEnglish ? item.en.hint : item.zh.hint;
                      const active = materialType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={clsx(styles.typeChip, active && styles.typeChipActive)}
                          onClick={() => setMaterialType(item.id)}
                          aria-pressed={active}
                        >
                          <span className={styles.typeChipLabel}>{label}</span>
                          <span className={styles.typeChipHint}>{hint}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.fieldGrid}>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>
                      {t.title}
                      <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.fieldControl}
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder={t.titlePh}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>{t.version}</span>
                    <input
                      className={styles.fieldControl}
                      value={version}
                      onChange={(event) => setVersion(event.target.value)}
                      placeholder={t.versionPh}
                    />
                  </label>
                  <label className={clsx(styles.field, styles.fieldFull)}>
                    <span className={styles.fieldLabel}>
                      {t.contact}
                      <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.fieldControl}
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder={t.contactPh}
                      required
                    />
                  </label>
                  <label className={clsx(styles.field, styles.fieldFull)}>
                    <span className={styles.fieldLabel}>{t.description}</span>
                    <textarea
                      className={styles.fieldTextarea}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder={t.descriptionPh}
                    />
                  </label>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>
                    {t.files}
                    <span className={styles.required}>*</span>
                  </span>
                  <div
                    className={clsx(styles.dropzone, dragActive && styles.dropzoneActive)}
                    onDragEnter={(event) => {
                      event.preventDefault();
                      setDragActive(true);
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setDragActive(false);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      setDragActive(false);
                      addFiles(event.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <UploadIcon className={styles.dropzoneIcon} />
                    <p className={styles.dropzoneTitle}>{t.dropTitle}</p>
                    <p className={styles.dropzoneHint}>{t.dropHint}</p>
                    <input
                      ref={fileInputRef}
                      className={styles.fileInput}
                      type="file"
                      multiple
                      accept={uploadConfig.accept}
                      onChange={(event) => {
                        addFiles(event.target.files);
                        event.target.value = "";
                      }}
                    />
                  </div>
                  {files.length ? (
                    <ul className={styles.fileList}>
                      {files.map((file, index) => (
                        <li key={`${file.name}-${file.size}-${file.lastModified}`} className={styles.fileRow}>
                          <div className={styles.fileMeta}>
                            <span className={styles.fileName}>{file.name}</span>
                            <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                          </div>
                          <button
                            type="button"
                            className={styles.fileRemove}
                            onClick={() => removeFile(index)}
                          >
                            {t.remove}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <p className={styles.tips}>{t.tips}</p>

                {status ? (
                  <p
                    className={clsx(
                      styles.statusMsg,
                      status.type === "error" ? styles.statusError : styles.statusOk,
                    )}
                    role="status"
                  >
                    {status.message}
                  </p>
                ) : null}

                <div className={styles.actions}>
                  <button className={styles.submitBtn} type="submit" disabled={submitting}>
                    {submitting ? t.submitting : t.submit}
                  </button>
                  <button
                    className={styles.secondaryBtn}
                    type="button"
                    onClick={handleCopyDraft}
                    disabled={submitting}
                  >
                    {t.copyDraft}
                  </button>
                  {uploadConfig.formUrl ? (
                    <a
                      className={styles.secondaryBtn}
                      href={uploadConfig.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.openForm}
                    </a>
                  ) : null}
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
