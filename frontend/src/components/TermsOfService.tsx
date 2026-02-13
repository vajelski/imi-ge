import React from 'react';
import { FileText, AlertCircle, CheckCircle2, Scale, ShieldAlert, BadgeCheck } from 'lucide-react';
import SEO from './SEO';

interface TermsOfServiceProps {
  contactEmail?: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ contactEmail = 'contact@imi.ge' }) => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="Terms of Service — IMI.GE" description="Read our Terms of Service regarding the use of IMI.GE's AI solutions and services." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 border border-secondary/20 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            <FileText className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
            მომსახურების პირობები
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 tracking-wide font-sans">
            ძალაშია 2024 წლის 12 თებერვლიდან
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl mb-12 border-l-4 border-l-secondary">
          <p className="leading-loose text-gray-700 dark:text-gray-300 tracking-wide font-light text-lg">
            მოგესალმებით AI Solutions Georgia-ში. ჩვენი ვებ-გვერდის (<span className="text-secondary font-bold">imi.ge</span>) გამოყენებით, თქვენ აცხადებთ თანხმობას დაიცვათ ქვემოთ მოცემული წესები და პირობები.
            გთხოვთ, ყურადღებით გაეცნოთ მათ.
          </p>
        </div>

        <div className="space-y-12">

          {/* General Terms */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <BadgeCheck className="w-6 h-6 text-indigo-500" />
              </div>
              1. ზოგადი დებულებები
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-light">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>ჩვენი სერვისების გამოყენება ნებადართულია მხოლოდ 18 წელს მიღწეული პირებისთვის ან მშობლის/მეურვის თანხმობით.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>თქვენ ვალდებული ხართ მიაწოდოთ ზუსტი და უტყუარი ინფორმაცია რეგისტრაციისას ან საკონტაქტო ფორმების შევსებისას.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Scale className="w-6 h-6 text-purple-500" />
              </div>
              2. ინტელექტუალური საკუთრება
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 font-light">
                ვებ-გვერდზე განთავსებული ყველა მასალა, მათ შორის დიზაინი, ტექსტი, გრაფიკა, ლოგოები და პროგრამული კოდი წარმოადგენს
                <strong> AI Solutions Georgia</strong>-ს საკუთრებას და დაცულია საავტორო უფლებების შესახებ კანონმდებლობით.
                აკრძალულია მასალების კოპირება, გავრცელება ან მოდიფიცირება ჩვენი წერილობითი თანხმობის გარეშე.
              </p>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              3. აკრძალული ქმედებები
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 mb-4 font-light">
                სერვისის გამოყენებისას მკაცრად აკრძალულია:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "ვირუსების ან მავნე კოდის გავრცელება",
                  "სისტემაზე კიბერშეტევის მცდელობა",
                  "სხვა მომხმარებლების მონაცემების შეგროვება",
                  "სერვისის გადაყიდვა ნებართვის გარეშე",
                  "უკანონო ან შეურაცხმყოფელი შინაარსის განთავსება",
                  "ავტომატიზირებული სკრიპტების (ბოტების) გამოყენება"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-700 dark:text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
              4. პასუხისმგებლობის შეზღუდვა
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 font-light">
                AI Solutions Georgia არ იღებს პასუხისმგებლობას ნებისმიერ პირდაპირ ან ირიბ ზარალზე, რომელიც შეიძლება გამოწვეული იყოს
                სერვისის გამოყენებით, შეფერხებით ან მონაცემთა დაკარგვით. ჩვენი AI სისტემების მიერ გენერირებული ინფორმაცია არის
                დამხმარე ხასიათის და არ წარმოადგენს პროფესიულ, იურიდიულ ან ფინანსურ რჩევას.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-12 pb-8">
            ჩვენ ვიტოვებთ უფლებას ნებისმიერ დროს შევცვალოთ ეს პირობები.
            <br />
            შეკითხვების შემთხვევაში მოგვწერეთ: <a href={`mailto:${contactEmail}`} className="text-secondary hover:underline">{contactEmail}</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
