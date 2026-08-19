(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const languageToggle = document.querySelector("[data-language-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const progress = document.querySelector("[data-progress]");
  const copyButton = document.querySelector("[data-copy-email]");
  const copyLabel = document.querySelector("[data-copy-label]");
  const copyStatus = document.querySelector("[data-copy-status]");
  const email = "jianbincui@yahoo.com";
  const themeStorageKey = "jianbin-cv-theme-v2";
  const languageStorageKey = "jianbin-cv-language";
  const mainContent = document.querySelector("#main-content");
  const languageTransitionDuration = 100;
  const reducedMotionLanguageTransitionDuration = 80;
  let languageTransitionId = 0;
  let pendingLanguage = null;

  const chineseTranslations = {
    "skip.content": "跳转到主要内容",
    "brand.home": "Cui Jianbin 主页",
    "navigation.primary": "主导航",
    "nav.about": "关于",
    "nav.experience": "工作经历",
    "nav.education": "教育经历",
    "nav.research": "研究",
    "nav.projects": "项目",
    "nav.contact": "联系",
    "actions.download": "下载简历",
    "actions.email": "联系我",
    "hero.photoAlt": "Cui Jianbin 在水边微笑的照片",
    "labels.technologies": "使用技术",
    "labels.researchTechnologies": "研究技术",
    "location.toronto": "多伦多，加拿大",
    "location.shandong": "山东，中国",
    "location.hamiltonCanada": "汉密尔顿，加拿大",
    "location.hamiltonOntario": "汉密尔顿，安大略省",
    "location.beijing": "北京，中国",
    "experience.index": "01 / 工作经历",
    "experience.title": "工作经历",
    "experience.toolbx.date": "02/2025—至今",
    "experience.toolbx.role": "软件开发工程师",
    "experience.toolbx.1": "在基于 TypeScript 的电商后端中构建并维护 ERP 集成服务，为订单、报价和支付提供实时状态追踪与前端可视化。",
    "experience.toolbx.2": "通过 queryBuilder 优化、索引、批处理和移除冗余查询，将旧版支付同步运行时间缩短 <strong>50%</strong>。",
    "experience.toolbx.3": "通过可靠的 RPA 重试机制，将远程经销商终端自动化中的人工干预减少超过 <strong>80%</strong>。",
    "experience.toolbx.4": "使用 Jest、mock、stub 和类型安全的 fixture 将单元测试覆盖率提升至 <strong>95%</strong> 以上。",
    "experience.fgf.role": ".NET 软件开发实习生",
    "experience.fgf.1": "开发并持续改进 .NET Core 和 Framework MVC 应用，服务于 <strong>5,000+</strong> 名员工。",
    "experience.fgf.2": "使用 HTML、CSS、React 和 Kendo UI 实现前端访问控制系统，使加载速度提升 <strong>30%</strong>。",
    "experience.fgf.3": "使用 ASP.NET 构建端到端的非一致性报告系统，覆盖验证与数据处理。",
    "experience.fgf.4": "搭建 Azure DevOps CI/CD 流水线，实现按时发布且无停机更新。",
    "experience.sinopec.role": "软件开发实习生",
    "experience.sinopec.1": "使用 Java Spring Boot、MySQL 和 Hibernate 重构内部采购平台的商品详情模块。",
    "experience.sinopec.2": "通过优化索引和异步数据处理，缩短查询响应时间并避免线程阻塞。",
    "experience.mcmaster.role": "人工智能研究实习生",
    "experience.mcmaster.1": "以第一作者身份发表 <em>Interpretable Deep Graph-level Clustering: A Prototype-based Approach</em>，论文发表于 ICPR 2024。",
    "experience.mcmaster.2": "提出并使用 PyTorch 实现无监督、可解释的图聚类框架。",
    "education.index": "02 / 教育经历",
    "education.title": "教育经历",
    "education.master.kicker": "研究生阶段",
    "education.master.degree": "计算与软件工程硕士（Co-op）· GPA 11/12",
    "education.bachelor.kicker": "本科阶段",
    "education.bachelor.degree": "计算机科学与技术工程学士 · GPA 89/100 · 专业排名前 10%",
    "research.index": "03 / 研究",
    "research.title": "研究",
    "research.label": "论文发表 · ICPR 2024",
    "research.paperTitle": "可解释的深度图级聚类：一种基于原型的方法",
    "research.summary": "提出一种可解释的深度图级聚类框架，在对未标注图数据进行聚类的同时解释样本归属原因，并在六个基准数据集上验证了方法效果。",
    "research.readPaper": "阅读论文",
    "research.sourceCode": "查看源码",
    "research.note": "Jianbin Cui & Lingyang Chu · ICPR 2024 Oral",
    "research.tags.graph": "图机器学习",
    "research.tags.interpretability": "可解释性",
    "research.tags.clustering": "聚类",
    "project.index": "04 / 项目",
    "project.title": "项目",
    "project.label": "开源项目 · 2024",
    "project.stars": "GitHub 3 万+ Stars",
    "project.starsLabel": "GitHub 3 万+ Stars",
    "project.summary": "一个由大语言模型驱动的开源求职申请代理，支持本地运行，将重复流程转化为有引导的操作。",
    "project.view": "查看项目",
    "project.note": "核心贡献者 / 协作者",
    "project.diagram.intent": "意图",
    "project.diagram.agent": "代理",
    "project.diagram.action": "行动",
    "contact.index": "05 / 联系",
    "contact.title": "有一个值得变得更清晰的系统？",
    "footer.backToTop": "返回顶部",
  };

  const i18nTextNodes = [...document.querySelectorAll("[data-i18n]")];
  const i18nHtmlNodes = [...document.querySelectorAll("[data-i18n-html]")];
  const i18nLabelNodes = [...document.querySelectorAll("[data-i18n-label]")];
  const i18nAltNodes = [...document.querySelectorAll("[data-i18n-alt]")];
  const defaultText = new Map(i18nTextNodes.map((node) => [node, node.textContent]));
  const defaultHtml = new Map(i18nHtmlNodes.map((node) => [node, node.innerHTML]));
  const defaultLabels = new Map(i18nLabelNodes.map((node) => [node, node.getAttribute("aria-label") || ""]));
  const defaultAlts = new Map(i18nAltNodes.map((node) => [node, node.getAttribute("alt") || ""]));
  const defaultMeta = {
    title: document.title,
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
  };

  const storedTheme = (() => {
    try {
      return window.localStorage.getItem(themeStorageKey);
    } catch {
      return null;
    }
  })();

  const storedLanguage = (() => {
    try {
      return window.localStorage.getItem(languageStorageKey);
    } catch {
      return null;
    }
  })();

  const preferredTheme = "light";

  function updateThemeLabel() {
    if (!themeToggle) return;
    const isChinese = root.dataset.language === "zh";
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute(
      "aria-label",
      isChinese
        ? isDark
          ? "切换到亮色模式"
          : "切换到暗色模式"
        : isDark
          ? "Switch to light mode"
          : "Switch to dark mode",
    );
  }

  function updateMenuLabel(isOpen = siteNav?.classList.contains("is-open") ?? false) {
    if (!menuToggle) return;
    const isChinese = root.dataset.language === "zh";
    menuToggle.setAttribute("aria-label", isOpen ? (isChinese ? "关闭导航" : "Close navigation") : isChinese ? "打开导航" : "Open navigation");
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      updateThemeLabel();
    }

    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
      // Private browsing can disable localStorage; the visual toggle still works.
    }
  }

  function applyLanguage(nextLanguage) {
    const isChinese = nextLanguage === "zh";
    root.dataset.language = nextLanguage;
    root.lang = isChinese ? "zh-CN" : "en";

    i18nTextNodes.forEach((node) => {
      const fallback = defaultText.get(node) || "";
      node.textContent = isChinese ? chineseTranslations[node.dataset.i18n] || fallback : fallback;
    });

    i18nHtmlNodes.forEach((node) => {
      const fallback = defaultHtml.get(node) || "";
      node.innerHTML = isChinese ? chineseTranslations[node.dataset.i18nHtml] || fallback : fallback;
    });

    i18nLabelNodes.forEach((node) => {
      const fallback = defaultLabels.get(node) || "";
      node.setAttribute("aria-label", isChinese ? chineseTranslations[node.dataset.i18nLabel] || fallback : fallback);
    });

    i18nAltNodes.forEach((node) => {
      const fallback = defaultAlts.get(node) || "";
      node.setAttribute("alt", isChinese ? chineseTranslations[node.dataset.i18nAlt] || fallback : fallback);
    });

    document.title = isChinese ? "Cui Jianbin 崔建彬 — 简历" : defaultMeta.title;
    document.querySelector('meta[property="og:title"]')?.setAttribute(
      "content",
      isChinese ? "Cui Jianbin 崔建彬 — 简历" : defaultMeta.ogTitle,
    );
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      isChinese ? "Cui Jianbin 崔建彬的个人简历与精选作品，现居多伦多的软件开发工程师。" : defaultMeta.description,
    );
    document.querySelector('meta[property="og:description"]')?.setAttribute(
      "content",
      isChinese ? "构建可靠系统与周到界面的软件开发工程师。" : defaultMeta.ogDescription,
    );

    if (languageToggle) {
      languageToggle.textContent = isChinese ? "EN" : "中文";
      languageToggle.setAttribute("aria-label", isChinese ? "切换到英文" : "Switch to Chinese");
      languageToggle.setAttribute("title", isChinese ? "切换到英文" : "Switch to Chinese");
      languageToggle.setAttribute("aria-pressed", String(isChinese));
    }

    updateThemeLabel();
    updateMenuLabel();

    try {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    } catch {
      // Private browsing can disable localStorage; the language toggle still works.
    }
  }

  function setLanguage(language, { animate = false } = {}) {
    const nextLanguage = language === "zh" ? "zh" : "en";

    if (!animate || !mainContent) {
      applyLanguage(nextLanguage);
      return;
    }

    const transitionId = ++languageTransitionId;
    pendingLanguage = nextLanguage;
    const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? reducedMotionLanguageTransitionDuration
      : languageTransitionDuration;

    mainContent.classList.add("is-language-switching");
    window.setTimeout(() => {
      if (transitionId !== languageTransitionId || pendingLanguage !== nextLanguage) return;

      pendingLanguage = null;
      applyLanguage(nextLanguage);
      window.requestAnimationFrame(() => {
        if (transitionId === languageTransitionId) {
          mainContent.classList.remove("is-language-switching");
        }
      });
    }, transitionDuration);
  }

  setTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme);
  setLanguage(storedLanguage === "zh" ? "zh" : "en");

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  languageToggle?.addEventListener("click", () => {
    const currentLanguage = pendingLanguage ?? root.dataset.language;
    setLanguage(currentLanguage === "zh" ? "en" : "zh", { animate: true });
  });

  function closeMenu() {
    siteNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    updateMenuLabel(false);
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = siteNav?.classList.toggle("is-open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    updateMenuLabel(isOpen);
  });

  siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      if (copyLabel) copyLabel.textContent = "Copied";
      if (copyStatus) copyStatus.textContent = "✓";
    } catch {
      window.location.href = `mailto:${email}`;
      if (copyLabel) copyLabel.textContent = "Opening mail";
    }

    window.setTimeout(() => {
      if (copyLabel) copyLabel.textContent = "Copy email";
      if (copyStatus) copyStatus.textContent = "";
    }, 2200);
  });

  let progressFrame = 0;

  function updateProgress() {
    progressFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
    },
    { passive: true },
  );
  updateProgress();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach((link) => {
            link.classList.remove("is-active");
            link.removeAttribute("aria-current");
          });
          const activeLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
          activeLink?.classList.add("is-active");
          activeLink?.setAttribute("aria-current", "page");
        });
      },
      { rootMargin: "-43% 0px -48% 0px", threshold: 0 },
    );
    sections.forEach((section) => activeObserver.observe(section));
  }

  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
