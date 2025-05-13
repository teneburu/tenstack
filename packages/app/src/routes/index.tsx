import { A } from "@solidjs/router";
import PageLayout from "~/components/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout 
      page="home" 
      containerClass="bg-base-200 p-6" 
      class="mb-6 container mx-auto max-w-7xl"
    >
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-3xl font-bold">Index</h1>
      </div>
    </PageLayout>
  );
}
