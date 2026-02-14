import { getTopicById } from "@/lib/seed-data";

export default function TopicPage({ params }: { params: { topicId: string } }) {
  const topic = getTopicById(params.topicId);

  if (!topic) {
    return <div className="rounded-lg border border-[var(--border)] bg-white p-4">Topic not found.</div>;
  }

  return (
    <article className="rounded-xl border border-[var(--border)] bg-white p-6">
      <h1 className="text-2xl font-semibold">{topic.title}</h1>
      <p className="mt-3 whitespace-pre-wrap text-[var(--muted)]">{topic.content}</p>
    </article>
  );
}
