import { PageHead } from "@/components/Sections";
import { Btn } from "@/components/ui";

export default function NotFound() {
  return <PageHead eyebrow="404" title="Page not found">
    <div className="page-lede" data-rise><Btn href="/">Back to home</Btn></div>
  </PageHead>;
}
