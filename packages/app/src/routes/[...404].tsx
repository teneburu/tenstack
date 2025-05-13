import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import PageLayout from "~/components/layouts/PageLayout";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <PageLayout 
      page="404" 
      containerClass="bg-base-200 p-6 text-center"
    >
      <h1 class="text-xl font-bold">404</h1>
      <p class="text-sm">page not found</p>
      <button class="btn btn-outline btn-sm mt-4" onClick={() => navigate("/")}>go back</button>
    </PageLayout>
  );
}
