/**
 * FAQ Item (collection) — for FAQPage schema and FAQ sections.
 */
export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'question', title: 'Question', type: 'localeString' },
    { name: 'answer', title: 'Answer', type: 'localeText' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: { question: 'question.en' },
    prepare({ question }: { question: string }) {
      return { title: question || 'Untitled FAQ' }
    },
  },
}
