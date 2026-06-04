import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Categories from "@/pages/Categories";
import CategoryDetail from "@/pages/CategoryDetail";
import PostDetail from "@/pages/PostDetail";
import Columns from "@/pages/Columns";
import ColumnDetail from "@/pages/ColumnDetail";
import Author from "@/pages/Author";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import SitemapPage from "@/pages/SitemapPage";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:slug" component={CategoryDetail} />
      <Route path="/posts/:slug" component={PostDetail} />
      <Route path="/columns" component={Columns} />
      <Route path="/columns/:slug" component={ColumnDetail} />
      <Route path="/author" component={Author} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/sitemap-page" component={SitemapPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
