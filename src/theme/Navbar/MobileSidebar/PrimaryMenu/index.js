import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import NavbarItem from "@theme/NavbarItem";
import { groups, groupsEn } from "@site/src/data/sites";

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

// 移动端抽屉：把资料中心的 8 个分类作为跳转项列出，点击滚动到对应分组并收起抽屉，
// 与文档站移动端「三条线展示章节标题」的交互一致。
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === "en";
  const categories = isEnglish ? groupsEn : groups;
  // 配置里标了 hideInMobileDrawer 的条目（如 GitHub，页脚已有入口）不进抽屉
  const items = useNavbarItems().filter((item) => !item.hideInMobileDrawer);

  const jumpToCategory = (anchor) => {
    mobileSidebar.toggle();
    // 收起抽屉会释放 body 滚动锁，稍等一帧再滚动到目标分组
    window.setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }, 0);
  };

  return (
    <ul className="menu__list">
      {categories.map((category) => (
        <li key={category.id} className="menu__list-item">
          <a
            className="menu__link"
            href={`#${category.anchor}`}
            onClick={(event) => {
              event.preventDefault();
              jumpToCategory(category.anchor);
            }}
          >
            {category.navTitle}
          </a>
        </li>
      ))}
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
