/** Ruta Clara — shell liviano para una app pública móvil de práctica MTC. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Legal, { CookieNotice } from "./pages/Legal";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/legal" component={Legal} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /><CookieNotice /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
