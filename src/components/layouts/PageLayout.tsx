import { ParentComponent } from "solid-js";
import { Title } from "@solidjs/meta";
import { useI18n } from "~/i18n/context";
import { PageLayoutProps } from "~/types/layouts";

/**
 * PageLayout component that provides consistent responsive styling across pages
 * 
 * @param props.page - Optional page name to apply things
 * @param props.class - Additional classes to apply to the main content area
 * @param props.containerClass - Additional classes to apply to the container
 * @param props.fullWidth - Whether the content should take up the full width of the page
 */
const PageLayout: ParentComponent<PageLayoutProps> = (props) => {
  const { t } = useI18n();
  const title = t(`pages.${props.page}.title`) || "tenstack";

  return (
    <>
      <Title>{title}</Title>
      <main 
        class={`overflow-x-hidden min-h-screen ${props.containerClass || ""}`}
      >
        <div class={`w-full ${props.class || ""}`}>
          {props.children}
        </div>
      </main>
    </>
  );
};

export default PageLayout; 