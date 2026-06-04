import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  LogOut, LayoutDashboard, FileText, Columns, Settings,
  Plus, Edit, Trash2, Save, Eye, Download, Upload, X, ChevronRight
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { posts as defaultPosts, PostType } from "@/data/posts";
import { columns as defaultColumns, ColumnType } from "@/data/columns";
import { categories } from "@/data/categories";

type Section = "dashboard" | "posts" | "columns" | "new-column" | "categories" | "settings";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("adminSession", "true");
      onLogin();
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">공</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">{siteConfig.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">관리자 로그인</p>
        </div>

        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground">
            이 관리자 화면은 브라우저 저장소 기반의 CMS-lite 데모입니다. 실제 보안 인증 시스템이 아닙니다. 데모 비밀번호: <strong>admin123</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-admin-password"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            data-testid="button-admin-login"
          >
            로그인
          </button>
        </form>
        <p className="text-center mt-4">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">← 사이트로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}

function Sidebar({
  section,
  setSection,
  onLogout,
}: {
  section: Section;
  setSection: (s: Section) => void;
  onLogout: () => void;
}) {
  const items: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
    { id: "posts", label: "일반 글 관리", icon: FileText },
    { id: "columns", label: "칼럼 관리", icon: Columns },
    { id: "categories", label: "카테고리", icon: ChevronRight },
    { id: "settings", label: "사이트 설정", icon: Settings },
  ];

  return (
    <aside className="w-56 shrink-0 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <p className="font-bold text-sm">{siteConfig.name}</p>
        <p className="text-xs text-sidebar-foreground/60 mt-0.5">관리자 패널</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              section === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <item.icon size={15} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-lg hover:bg-sidebar-accent/50 transition-colors"
          data-testid="button-admin-logout"
        >
          <LogOut size={14} />
          로그아웃
        </button>
        <Link
          href="/"
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-lg hover:bg-sidebar-accent/50 transition-colors mt-1"
        >
          <Eye size={14} />
          사이트 보기
        </Link>
      </div>
    </aside>
  );
}

function Dashboard({ posts, cols }: { posts: PostType[]; cols: ColumnType[] }) {
  const published = posts.filter((p) => p.status === "published").length;
  const featured = posts.filter((p) => p.featured).length;
  const colsCount = cols.filter((c) => c.status === "published").length;

  const stats = [
    { label: "총 글 수", value: posts.length },
    { label: "발행된 글", value: published },
    { label: "초안", value: posts.length - published },
    { label: "추천 글", value: featured },
    { label: "칼럼 수", value: colsCount },
    { label: "카테고리 수", value: categories.length },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">대시보드</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-card-border rounded-xl p-5">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-foreground mb-3">최근 글</h3>
      <div className="space-y-2">
        {[...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 5).map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-card border border-card-border rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground line-clamp-1">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.publishedAt} · {p.status === "published" ? "발행됨" : "초안"}</p>
            </div>
            {p.featured && <span className="text-xs bg-secondary/15 text-secondary px-2 py-0.5 rounded-full shrink-0 ml-2">추천</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function parseFaqText(value: string): PostType["faq"] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...answerParts] = line.split("|");
      return {
        question: (question || "").trim(),
        answer: answerParts.join("|").trim(),
      };
    })
    .filter((item) => item.question && item.answer);
}

function parseRelatedText(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((slug) => slug.trim())
    .filter(Boolean);
}

function formatFaqText(faq: PostType["faq"]): string {
  return faq.map((item) => item.question + " | " + item.answer).join("\n");
}

interface PostEditorProps {
  post: PostType | null;
  onSave: (p: PostType) => void;
  onCancel: () => void;
}

function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [form, setForm] = useState<PostType>(
    post ?? {
      id: Date.now(),
      slug: "",
      title: "",
      summary: "",
      categorySlug: categories[0]?.slug ?? "",
      author: siteConfig.owner,
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      featured: false,
      status: "published",
      content: "",
      toc: [],
      faq: [],
      relatedPostSlugs: [],
    }
  );

  const [faqText, setFaqText] = useState(() => formatFaqText(form.faq));
  const [relatedText, setRelatedText] = useState(() => form.relatedPostSlugs.join(", "));
  const set = (k: keyof PostType, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const saveForm = () => onSave({
    ...form,
    faq: parseFaqText(faqText),
    relatedPostSlugs: parseRelatedText(relatedText),
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">{post ? "글 수정" : "새 글 작성"}</h3>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
            <X size={14} />취소
          </button>
          <Link href={form.slug ? `/posts/${form.slug}` : "/"} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
            <Eye size={14} />미리보기
          </Link>
          <button onClick={saveForm} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity" data-testid="button-save-post">
            <Save size={14} />저장
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">제목</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">슬러그 (URL)</label>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">카테고리</label>
          <select value={form.categorySlug} onChange={(e) => set("categorySlug", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">발행 상태</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value as "published" | "draft")} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
            <option value="published">발행됨</option>
            <option value="draft">초안</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">작성일</label>
          <input type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">수정일</label>
          <input type="date" value={form.updatedAt} onChange={(e) => set("updatedAt", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-foreground mb-1">요약</label>
        <textarea value={form.summary} onChange={(e) => set("summary", e.target.value)} rows={2} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
      </div>

      <div>
        <label className="block text-xs font-medium text-foreground mb-1">본문 (HTML)</label>
        <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={10} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-y font-mono" />
      </div>

      <div>
        <label className="block text-xs font-medium text-foreground mb-1">FAQ 입력</label>
        <textarea value={faqText} onChange={(e) => setFaqText(e.target.value)} rows={5} placeholder="질문 | 답변 형식으로 한 줄에 하나씩 입력" className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-y" />
        <p className="text-xs text-muted-foreground mt-1">예: 입점 신청은 언제 가능한가요? | 연중 신청 가능하지만 심사 일정은 달라질 수 있습니다.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-foreground mb-1">관련 글 슬러그</label>
        <input value={relatedText} onChange={(e) => setRelatedText(e.target.value)} placeholder="seolyeo-junbi, ipjeom-jagyeok-jogeon" className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        <p className="text-xs text-muted-foreground mt-1">쉼표 또는 줄바꿈으로 여러 글을 연결할 수 있습니다.</p>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded border-input" />
        <span className="text-sm text-foreground">추천 글로 표시</span>
      </label>
    </div>
  );
}

function PostsManager({ posts, setPosts }: { posts: PostType[]; setPosts: (p: PostType[]) => void }) {
  const [editing, setEditing] = useState<PostType | null | "new">(null);

  const handleSave = (post: PostType) => {
    if (editing === "new") {
      setPosts([...posts, post]);
    } else {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    }
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  if (editing !== null) {
    return (
      <PostEditor
        post={editing === "new" ? null : editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">일반 글 관리</h2>
        <button onClick={() => setEditing("new")} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity" data-testid="button-new-post">
          <Plus size={14} />새 글 작성
        </button>
      </div>
      <div className="space-y-2">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-card border border-card-border rounded-lg px-4 py-3 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.categorySlug} · {p.publishedAt} · {p.status === "published" ? "발행됨" : "초안"}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/posts/${p.slug}`} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Eye size={14} />
              </Link>
              <button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Edit size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColumnsManager({ cols, setCols, forceNew = false }: { cols: ColumnType[]; setCols: (c: ColumnType[]) => void; forceNew?: boolean }) {
  const [editing, setEditing] = useState<ColumnType | null | "new">(null);
  const [form, setForm] = useState<ColumnType | null>(null);

  const startNew = () => {
    setForm({
      id: Date.now(),
      slug: "",
      title: "",
      summary: "",
      author: siteConfig.owner,
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      content: "",
      status: "published",
    });
    setEditing("new");
  };

  const startEdit = (c: ColumnType) => {
    setForm(c);
    setEditing(c);
  };

  useEffect(() => {
    if (forceNew && editing === null) startNew();
  }, [forceNew]);

  const handleSave = () => {
    if (!form) return;
    if (editing === "new") {
      setCols([...cols, form]);
    } else {
      setCols(cols.map((c) => (c.id === form.id ? form : c)));
    }
    setEditing(null);
    setForm(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setCols(cols.filter((c) => c.id !== id));
    }
  };

  const set = (k: keyof ColumnType, v: unknown) => setForm((f) => f ? { ...f, [k]: v } : f);

  if (editing !== null && form) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground">{editing === "new" ? "새 칼럼 작성" : "칼럼 수정"}</h3>
          <div className="flex gap-2">
            <button onClick={() => { setEditing(null); setForm(null); }} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
              <X size={14} />취소
            </button>
            <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Save size={14} />저장
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">제목</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">슬러그 (URL)</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">요약</label>
          <textarea value={form.summary} onChange={(e) => set("summary", e.target.value)} rows={2} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">본문 (HTML)</label>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={10} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-y font-mono" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">발행 상태</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
            <option value="published">발행됨</option>
            <option value="draft">초안</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">칼럼 관리</h2>
        <button onClick={startNew} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={14} />새 칼럼 작성
        </button>
      </div>
      <div className="space-y-2">
        {cols.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-card border border-card-border rounded-lg px-4 py-3 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.publishedAt} · {c.status === "published" ? "발행됨" : "초안"}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/columns/${c.slug}`} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Eye size={14} />
              </Link>
              <button onClick={() => startEdit(c)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Edit size={14} />
              </button>
              <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">카테고리</h2>
      <p className="text-sm text-muted-foreground mb-4">카테고리는 현재 코드에서 관리됩니다.</p>
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.slug} className="bg-card border border-card-border rounded-lg px-4 py-3">
            <p className="text-sm font-medium text-foreground">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteSettings() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">사이트 설정</h2>
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground">
          이 설정은 브라우저 저장소에 저장됩니다. 기기 또는 브라우저가 바뀌면 유지되지 않을 수 있습니다. 현재 버전에서는 실제 사이트 설정 변경은 코드 파일을 수정해야 합니다.
        </p>
      </div>
      <div className="space-y-4 max-w-lg">
        {[
          { label: "사이트 이름", value: siteConfig.name },
          { label: "태그라인", value: siteConfig.tagline },
          { label: "운영자 이름", value: siteConfig.owner },
          { label: "운영자 소개", value: siteConfig.ownerBio },
          { label: "연락처 이메일", value: siteConfig.email },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-xs font-medium text-foreground mb-1">{field.label}</label>
            <input
              defaultValue={field.value}
              readOnly
              className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>
        ))}
        <button
          onClick={() => setSaved(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          data-testid="button-save-settings"
        >
          <Save size={14} />
          {saved ? "저장됨" : "저장"}
        </button>
      </div>
    </div>
  );
}

function DataPanel({ posts, cols }: { posts: PostType[]; cols: ColumnType[] }) {
  const handleExport = () => {
    const data = { posts, columns: cols, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "homeshopping-guide-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="font-semibold text-foreground mb-3">데이터 관리</h3>
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 border border-border px-4 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
        >
          <Download size={14} />JSON 내보내기
        </button>
        <label className="flex items-center gap-1.5 border border-border px-4 py-2 rounded-lg text-sm hover:bg-muted transition-colors cursor-pointer">
          <Upload size={14} />JSON 가져오기
          <input type="file" accept=".json" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState<Section>(() => new URLSearchParams(window.location.search).get("section") === "new-column" ? "new-column" : "dashboard");
  const [posts, setPostsState] = useState<PostType[]>(() => {
    const stored = localStorage.getItem("cms_posts");
    return stored ? JSON.parse(stored) : defaultPosts;
  });
  const [cols, setColsState] = useState<ColumnType[]>(() => {
    const stored = localStorage.getItem("cms_columns");
    return stored ? JSON.parse(stored) : defaultColumns;
  });

  useEffect(() => {
    setLoggedIn(localStorage.getItem("adminSession") === "true");
  }, []);

  const setPosts = (p: PostType[]) => {
    setPostsState(p);
    localStorage.setItem("cms_posts", JSON.stringify(p));
  };

  const setCols = (c: ColumnType[]) => {
    setColsState(c);
    localStorage.setItem("cms_columns", JSON.stringify(c));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar section={section} setSection={setSection} onLogout={handleLogout} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {section === "dashboard" && (
            <>
              <Dashboard posts={posts} cols={cols} />
              <DataPanel posts={posts} cols={cols} />
            </>
          )}
          {section === "posts" && <PostsManager posts={posts} setPosts={setPosts} />}
          {(section === "columns" || section === "new-column") && <ColumnsManager cols={cols} setCols={setCols} forceNew={section === "new-column"} />}
          {section === "categories" && <CategoriesPanel />}
          {section === "settings" && <SiteSettings />}
        </div>
      </main>
    </div>
  );
}
