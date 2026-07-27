import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./notifications.module.css";

// 占位页：产品通知正式上线前，/notifications 路由保留可达，但内容显示「准备中」。
// 正式上线时，用真通知页替换本文件即可。
export default function NoticesPage() {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";

  const title = isEnglish ? "Product Notices" : "产品通知";
  const message = isEnglish
    ? "The document is being prepared and is not yet available. Thank you for your attention and patience!"
    : "文档正在准备中，暂未上架。感谢您的关注与耐心等待！";

  return (
    <Layout title={title} description={message}>
      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <p className={styles.pageIntro}>{message}</p>
        </header>
      </main>
    </Layout>
  );
}
