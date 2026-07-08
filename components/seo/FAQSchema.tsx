import { FAQS } from "@/lib/faqs";
import { getServerLocale } from "@/lib/server-locale";

// JSON-LD FAQPage schema — emits the same Q/A pairs visible in the homepage FAQ
// component so Google can surface them as rich snippets. Localized to match the
// visible text on /es (Google requires the markup to match the visible copy).

export async function FAQSchema() {
  const lang = await getServerLocale();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: lang === "es" ? faq.questionEs : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: lang === "es" ? faq.answerEs : faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
